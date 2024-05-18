import { v4 as uuid } from 'uuid';

export class Todo {
  /**
   *
   * @param {String} description
   * @param {Boolean} done
   * @param {Date} createAt
   */
  constructor(description) {
    this.id = uuid();
    this.description = description;
    this.done = false;
    this.createAt = new Date();
  }
}
