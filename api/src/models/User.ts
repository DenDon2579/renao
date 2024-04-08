import { database } from '../database/database';

export default class User {
  static getUsers() {
    return database.getUsers();
  }
}
