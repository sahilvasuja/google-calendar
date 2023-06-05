import * as Mongoose from 'mongoose';
export const connect = () => {
  Mongoose.connect('mongodb://localhost:27017/googleCalender')
    .then(() => {
      console.log('Connection successful');
    })
    .catch((err: Error) => {
      console.log(err);
    });
};

