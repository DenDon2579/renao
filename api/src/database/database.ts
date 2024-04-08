import DatabaseHandler from './DatabaseHandler';
import PostgreProvider from './providers/postgre/PostreProvider';

export const database = new DatabaseHandler(new PostgreProvider('www.wewe'));
