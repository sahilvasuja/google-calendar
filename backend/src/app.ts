
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import {connect} from './db/connection'
import axios from 'axios';
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
console.log(staticpath);
const router=express.Router()
const {User,Event}=require('./model/schema')
console.log(User, ":USER")
app.use(router)
app.use(express.static(staticpath))
app.use(express.urlencoded({ extended: false }));
// Add session middleware to your Express app
app.get('/', async(req,res)=>{
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
})
app.get('/unauthorized', async (req, res) => {
   res.send("from backend: 40")
  });
  app.get('/Secured', async (req, res)=> {
    res.send('Secured Resource');
});
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

  connect()
app.listen(port,()=>{
    console.log(`connected at ${port}`);
})