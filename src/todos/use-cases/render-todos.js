import { createTodoHtml } from './';

let element;
/**
 *
 * @param {String} elementId
 * @param {Todo} todos
 * @returns
 */
export const renderTodos = (elementId, todos = []) => {
  if (!element) element = document.querySelector(elementId);
  if (!element) throw new Error(`Element ${elementId} not found`);

  element.innerHTML = '';
  todos.forEach((todo) => {
    element.append(createTodoHtml(todo));
  });
};
