import PostgreProvider from './providers/postgre/PostreProvider';

type Provider = PostgreProvider;

export default class DatabaseHandler {
  private provider;

  constructor(provider: Provider) {
    this.provider = provider;
  }

  getUsers() {
    return this.provider.getUsers();
  }
}
