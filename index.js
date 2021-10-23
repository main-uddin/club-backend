const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

let dbUrl =
  'mongodb+srv://mainuddin:main1234@cluster0.nn9eq.mongodb.net/my-db?retryWrites=true&w=majority';
mongoose
  .connect(dbUrl)
  .then((result) => console.log('connected', result))
  .catch((err) => console.log('errr', err));

const Schema = mongoose.Schema;

const memberSchema = new Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
});

const MyModel = mongoose.model('members', memberSchema);

app.post('/add', (req, res) => {
  const data = new MyModel(req.body);
  data
    .save()
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

app.get('/allmembers', (req, res) => {
  MyModel.find()
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

app.delete('/remove', (req, res) => {
  let id = req.body?.id;
  MyModel.findByIdAndDelete(id)
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

app.put('/update', (req, res) => {
  let { _id, ...rest } = req.body;
  MyModel.findByIdAndUpdate(_id, { ...rest })
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

app.listen(4000, () => console.log('server is running on 4000.....'));
