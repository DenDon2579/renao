export default class PostgreProvider {
  private database;
  constructor(connectURL: string) {
    this.database = 'DATABASE';
  }

  getUsers() {
    return 'USERS FROM POSTGRE';
  }
}
