
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import {connect} from './db/connection'
import axios from 'axios';
import bodyParser from "body-parser";
const { auth } = require('express-oauth2-jwt-bearer');
const jwtCheck = auth({
  audience: 'this is unique Identifier',
  issuerBaseURL: 'https://sahilvasuja.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

// enforce on all endpoints


// const verifyJwt=jwt({
//   secret:Jwks.expressJwtSecret({}),
//   audience: 'this is unique Identifier',
//   issuer: '',
//   algorithms: ['RS256']
// })
// const todo=require('./model/dropdowntodo')
dotenv.config({ path: "./config.env" });
const port=4000
const app=express();
app.use(cors())
app.use(jwtCheck);
app.use(express.json())
const staticpath = path.join(__dirname, "../public");
const router=express.Router()
const {User,Event}=require('./model/schema')
app.use(router)
app.use(express.static(staticpath))
app.use(express.urlencoded({ extended: false }));
// Add session middleware to your Express app
app.post('/addEvent',async(req,res)=>{
  console.log(req.body,'backend')
  const { startTime, endTime, title,date } = req.body;
  console.log(startTime,)
  try {
    console.log("from try")
    // Create a new event document using the Event model
    const event = new Event({
      startTime:startTime,
      endTime:endTime,
      title:title,
      date:date
    });
    console.log(event,'50')
    // Save the event document to the database
    await event.save();
    const allEvents = await Event.find();
    res.status(201).json(allEvents);
    console.log('Event saved to MongoDB:', event);

    // res.send(event);
  } catch (error) {
    console.error('Error occurred while saving event to MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
  // res.send(req.body)

})
app.delete(`/deleteEvent/:payload`,async(req,res)=>{
  try {
    const eventId = req.params.payload;
    // Find the event by eventId and remove it from the database
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    const remainingEvents = await Event.find();
    res.send(remainingEvents)
  //   res.json({ message: 'Event deleted successfully',
  //             data: remainingEvents
  // });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error',
    
  });
  }
})
app.patch('/editEvent/:eventId',async(req,res)=>{
  try {
    console.log("first")
    const updatedEventData = req.body;
    // Find the event by eventId and remove it from the database
    const eventId = req.body.eventId;
    const updatedEvent = await Event.findByIdAndUpdate(eventId, updatedEventData, {
      new: true, // Return the updated event
    });
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    const allEvents = await Event.find();
    res.send(allEvents)
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error',
    
  });
  }
})
app.get('/', async(req,res)=>{
  const accesstoken=req.headers.authorization.split(' ')[1]
  console.log(accesstoken,'48')
  const response=await axios.get('https://sahilvasuja.us.auth0.com/userinfo',{
    headers: {
     Authorization: `Bearer ${accesstoken}`
    }
  })
  const userInfo=response.data
  const existingUser = await User.findOne({ email: userInfo.email });
  if (existingUser) {
    // User already exists
    console.log('User already exists:', existingUser);
    res.status(200).json(existingUser);
  } else {
    // User doesn't exist, save the user data in MongoDB
    const newUser = new User({
      name: userInfo.name,
      email: userInfo.email,
      familyname: userInfo.familyname,
      picture: userInfo.picture,
    });
    await newUser.save();
    console.log('User saved to MongoDB:', newUser);
    res.status(201).json(newUser);

  }

})
app.get('/authorized', async (req, res)=> {

  const accesstoken=req.headers.authorization.split(' ')[1]
  console.log(accesstoken,'48')
  const response=await axios.get('https://sahilvasuja.us.auth0.com/userinfo',{
    headers: {
     Authorization: `Bearer ${accesstoken}`
    }
  })
  const userInfo=response.data
  // Store the token and user data in the session or database
  

  console.log(userInfo,'51')
  res.send(userInfo);
  // res.send('Secured Resource');
});
// app.get('/unauthorized', async (req, res) => {
//    res.send("from backend: 40")
//   });
//   app.get('/Secured', async (req, res)=> {
//     res.send('Secured Resource');
// });


  connect()
app.listen(port,()=>{
    console.log(`connected at ${port}`);
})