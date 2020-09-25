const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: '../../config.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`DB connection successful`);
  });

// Read json file
const tours = fs.readFileSync(`${__dirname}/tours.json`, 'utf-8');

// import data into database
const importData = async () => {
  try {
    await Tour.create(JSON.parse(tours));
    console.log('Data successfuly loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// delete all the data from collection
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data deleted successfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
