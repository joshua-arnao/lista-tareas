import todoStore, { Filters } from '../store/todo.store';
import html from './app.html?raw';
import { renderPending, renderTodos } from './use-cases';

const ElementIds = {
  ClearCompletedButton: '.clear-completed',
  TodoList: '.todo-list',
  NewTodoInput: '#new-todo-input',
  TodoFilters: '.filter', // clases
  PendingCountLable: '#pending-count' //ids
};

/**
 *
 * @param {String} elementId
 * @returns
 */

export const App = (elementId) => {
  const displayTodos = () => {
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());
    renderTodos(ElementIds.TodoList, todos);

    updatePending();
  };

  const updatePending = () => {
    renderPending(ElementIds.PendingCountLable);
  };

  // Función autoinvocada
  (() => {
    const app = document.createElement('div');
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTodos();
  })();

  //Referencias HTML
  const newDescriptionInput = document.querySelector(ElementIds.NewTodoInput);
  const todoListUL = document.querySelector(ElementIds.TodoList);
  const clearCompletedButton = document.querySelector(
    ElementIds.ClearCompletedButton
  );
  const filtersLIs = document.querySelectorAll(ElementIds.TodoFilters);

  // Listeners
  newDescriptionInput.addEventListener('keyup', (e) => {
    if (e.keyCode !== 13) return;
    if (e.target.value.trim().length === 0) return;

    todoStore.addTodo(e.target.value);
    displayTodos();
    e.target.value = '';
  });

  todoListUL.addEventListener('click', (e) => {
    const element = e.target.closest('[data-id]');
    todoStore.toggleTodo(element.getAttribute('data-id'));

    displayTodos();
  });

  todoListUL.addEventListener('click', () => {
    const isDestroyElement = event.target.className === 'destroy';
    const element = event.target.closest(`[data-id]`);
    if (!element || !isDestroyElement) return;

    todoStore.deleteTodo(element.getAttribute('data-id'));
    displayTodos();
  });

  clearCompletedButton.addEventListener('click', () => {
    todoStore.deleteCompleted();
    displayTodos();
  });

  filtersLIs.forEach((element) => {
    element.addEventListener('click', (element) => {
      filtersLIs.forEach((el) => el.classList.remove('selected'));
      element.target.classList.add('selected');

      switch (element.target.innerHTML) {
        case 'Todos':
          todoStore.setSelectedFilter(Filters.All);
          break;
        case 'Pendientes':
          todoStore.setSelectedFilter(Filters.Pending);
          break;
        case 'Completados':
          todoStore.setSelectedFilter(Filters.Completed);
          break;
      }

      displayTodos();
      console.log(element.target.innerHTML);
    });
  });
};
