import express from 'express';
import mongoose from 'mongoose';
import apirouter from './ApiRouter';

const app = express();
const PORT = 5000;

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Gym App Backend Running!');
});
app.use('/api', apirouter);

// connect to MongoDB
mongoose.connect('mongodb://localhost:27017/gymapp', {

}).then(() => {
  console.log('Connected to MongoDB');
}
).catch((error) => {
  console.error('MongoDB connection error:', error);
});


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
