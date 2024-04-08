import Express from 'express';
import User from './src/models/User';

const app = Express();
app.get('/', (req, res) => {
  res.send(User.getUsers());
});
app.listen(3001);
