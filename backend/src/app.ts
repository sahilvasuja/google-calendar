import express from "express";
import cors from "cors";
// import dotenv from "dotenv";
import path from "path";
import { connect } from "./db/connection";
import axios from "axios";
const moment = require('moment');
import { gmail } from "googleapis/build/src/apis/gmail";
const nodemailer = require("nodemailer");
const cron = require("node-cron");
// const cron = require('cron');
const { auth } = require("express-oauth2-jwt-bearer");
const jwtCheck = auth({
  audience: "this is unique Identifier",
  issuerBaseURL: "https://sahilvasuja.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

// enforce on all endpoints

// const verifyJwt=jwt({
//   secret:Jwks.expressJwtSecret({}),
//   audience: 'this is unique Identifier',
//   issuer: '',
//   algorithms: ['RS256']
// })
// const todo=require('./model/dropdowntodo')
// dotenv.config({ path: "./config.env" });
const port = 4000;
const app = express();
app.use(cors());
app.use(jwtCheck);
app.use(express.json());
const staticpath = path.join(__dirname, "../public");
const router = express.Router();
const { User, Event } = require("./model/schema");
app.use(router);
app.use(express.static(staticpath));
app.use(express.urlencoded({ extended: false }));
// Add session middleware to your Express app

function timeBefore15Minutes(startTime) {
  // Split the start time string into components
  let timeComponents = startTime.split(":");
  let hour = parseInt(timeComponents[0]);
  let minute = parseInt(timeComponents[1]);
  let period = timeComponents[2].toUpperCase();

  // Adjust the hour based on the period (AM/PM)
  if (period === "PM" && hour !== 12) {
    hour += 12;
  } else if (period === "AM" && hour === 12) {
    hour = 0;
  }

  // Convert the start time to minutes
  let totalMinutes = hour * 60 + minute;

  // Subtract 15 minutes
  totalMinutes -= 15;
  if (totalMinutes < 0) {
    totalMinutes += 24 * 60;
  }

  // Convert the resulting minutes back to hours and minutes
  hour = Math.floor(totalMinutes / 60);
  minute = totalMinutes % 60;

  // Convert hour back to 12-hour format and determine the period
  if (hour >= 12) {
    period = "PM";
    if (hour > 12) {
      hour -= 12;
    }
  } else {
    period = "AM";
    if (hour === 0) {
      hour = 12;
    }
  }

  // Format the resulting time
  let formattedTime =
    hour.toString().padStart(2, "0") +
    ":" +
    minute.toString().padStart(2, "0") +
    ":" +
    period;
  return formattedTime;
}

function timeBefore4Hours(startTimes) {
  // Split the start time string into components
  let timeComponents = startTimes.split(":");
  let hour = parseInt(timeComponents[0]);
  let minute = parseInt(timeComponents[1]);
  let period = timeComponents[2].toUpperCase();

  // Adjust the hour based on the period (AM/PM)
  if (period === "PM" && hour !== 12) {
    hour += 12;
  } else if (period === "AM" && hour === 12) {
    hour = 0;
  }

  // Subtract 4 hours
  hour -= 4;
  if (hour < 0) {
    hour += 24;
  }

  // Convert hour back to 12-hour format and determine the period
  if (hour >= 12) {
    period = "PM";
    if (hour > 12) {
      hour -= 12;
    }
  } else {
    period = "AM";
    if (hour === 0) {
      hour = 12;
    }
  }

  // Format the resulting time
  let formattedTime =
    hour.toString().padStart(2, "0") +
    ":" +
    minute.toString().padStart(2, "0") +
    ":" +
    period;
  return formattedTime;
}

function getPreviousDayTime(startTime) {
  // Split the start time string into components
  let timeComponents = startTime.split(":");
  let hour = parseInt(timeComponents[0]);
  let minute = parseInt(timeComponents[1]);
  let period = timeComponents[2].toUpperCase();

  // Adjust the hour based on the period (AM/PM)
  if (period === "PM" && hour !== 12) {
    hour += 12;
  } else if (period === "AM" && hour === 12) {
    hour = 0;
  }

  // Subtract 24 hours (1 day)
  hour -= 24;
  if (hour < 0) {
    hour += 24;
  }

  // Convert hour back to 12-hour format and determine the period
  if (hour >= 12) {
    period = "PM";
    if (hour > 12) {
      hour -= 12;
    }
  } else {
    period = "AM";
    if (hour === 0) {
      hour = 12;
    }
  }

  // Format the resulting time
  let formattedTime =
    hour.toString().padStart(2, "0") +
    ":" +
    minute.toString().padStart(2, "0") +
    ":" +
    period;
  return formattedTime;
}
app.post("/addEvent", async (req, res) => {
  // console.log(req.body,'backend')
  const { startTime, endTime, title, date, userId, user } = req.body;
  // console.log(startTime,)
  try {
    // Create a new event document using the Event model
    const event = new Event({
      startTime: startTime,
      endTime: endTime,
      title: title,
      date: date,
      userId: userId,
      mail: user,
    });
    // Save the event document to the database
    await event.save();

    const allEvents = await Event.find();
    const userEvents = await Event.find({ userId: userId });
    res.status(201).json(userEvents);
   
// console.log(transporter, ":transporter");


    // const sendEmailFunction = (to, subject, text) => {
    //   console.log(sendEmailFunction, ":sendEmail");
    // }
//       let [hoursStr, minutesStr, period] = event.startTime.split(/:|(?<=\d)(?=[APM])/); // Split the time string into hours, minutes, and AM/PM

// let hours = parseInt(hoursStr);
// const minutes = parseInt(minutesStr);

// if (period.toUpperCase() === "PM" && hours !== 12) {
//   hours += 12; // Convert PM hours to 24-hour format
// } else if (period.toUpperCase() === "AM" && hours === 12) {
//   hours = 0; // Convert 12 AM to 0 (midnight) in 24-hour format
// }


// const eventDate = new Date(); // Assuming you have the event date stored
// eventDate.setHours(hours, minutes, 0); // Set the event time in the Date object

// eventDate.setHours(eventDate.getHours() - 4); // Subtract 4 hours from the event time
// console.log(eventDate,":eventDate")

// const notificationTime = new Date(eventDate.getTime() - 4 * 60 * 60 * 1000); // Subtract 4 hours from the event time
// const currentTime = new Date();

// console.log(notificationTime,':notificationTime')
// let hour = parseInt(hoursStr);
// const minute = parseInt(minutesStr);

// if (period.toUpperCase() === "PM" && hour !== 12) {
//   hours += 12; // Convert PM hours to 24-hour format
// } else if (period.toUpperCase() === "AM" && hour === 12) {
//   hours = 0; // Convert 12 AM to 0 (midnight) in 24-hour format
// }

// const oneHourBefore = new Date(); // Assuming you have the event date stored
// oneHourBefore.setHours(hours, minutes, 0); // Set the event time in the Date object

// const oneHourBeforeEventDate = new Date(oneHourBefore);
// oneHourBeforeEventDate.setHours(oneHourBefore.getHours() - 1); // Subtract 1 hour from the event time

// const delayOneHour = oneHourBeforeEventDate.getTime() - Date.now();
// const oneday = moment(event.date, 'DD-MM-YY');
// const previousDayDate = oneday.subtract(1, 'day').format('DD-MM-YY');

// console.log(previousDayDate,':previousDayDate');
// // console.log(mailOptions, ":85");
// console.log(Date.now(),"262")
// const eventStartDateStr = event.date;
// const eventStartDate = new Date(`20${eventStartDateStr.slice(6, 8)}-${eventStartDateStr.slice(3, 5)}-${eventStartDateStr.slice(0, 2)}`);
// eventStartDate.setHours(hour, minute, 0);
// const OneDayDelay = new Date(eventStartDate);
// OneDayDelay.setHours(OneDayDelay.getHours() - 24); // Assuming you have the event date stored
// const delayOneDay = OneDayDelay.getTime() - Date.now();
// console.log(OneDayDelay,":OneDayDelay")
// console.log(delayOneDay,':delayOneDay')
      

    //  const delay = eventDate.getTime() - Date.now(); // Calculate the time difference
      // console.log(delay,':delay')
      // setTimeout(() => {
      //   transporter.sendMail(mailOptions, (error, info) => {
      //     if (error) {
      //       console.log("Error occurred:", error);
      //     } else {
      //       console.log("Sending email 1 hours before the event start time:", eventStartDate);
      //       console.log("Email sent:", info.response);
      //     }
      //   });
      // }, delayOneHour);
      
      // setTimeout(() => {
      //   transporter.sendMail(mailOptions, (error, info) => {
      //     if (error) {
      //       console.log("Error occurred:", error);
      //     } else {
      //       console.log("Sending email 24 hours before the event start time:", eventStartDate);
      //       console.log("Email sent:", info.response);
      //     }
      //   });
      // }, delayOneDay);


      // if (delay > 0) {
      //   setTimeout(() => {
      //     transporter.sendMail(mailOptions, (error, info) => {
      //       if (error) {
      //         console.log("Error occurred:", error);
      //       } else {
      //         console.log("Sending email 4 hours before the event start time:", eventStartDate);
      //         console.log("Email sent:", info.response);
      //       }
      //     });
      //   }, delay);
      // } else {
      //   console.log("Event time has already passed. No email will be sent.");
      // }
 

// This updated code calculates the notification time correctly by subtracting 4 hours from the event time while taking into account whether it's in the morning or afternoon. It also includes a check to ensure that the notification time is in the future to avoid sending emails for past events.







// setTimeout(() => {
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log("Error occurred:", error);
//     } else {
//       console.log("Sending email 4 hours before the event start time:", eventStartDate);
//       console.log("Email sent:", info.response);
//     }
//   });
// }, delay);

    // };
//     const events = [
//       {
//         title: event.title,
//         date: event.date,
//         startTime: event.startTime,
//         endTime: event.endTime,
//       },
//       {
//         title: event.title,
//         date: event.date,
//         startTime: event.startTime,
//         endTime: event.endTime,
//       },
//     ];
    
//     // const events = {
//     //   title: event.title,
//     //   date: event.date,
//     //   startTime: event.startTime,
//     //   endTime: event.endTime,
//     // };
//     console.log(events[0].startTime);
//     let startTimes = events[0].startTime.toString(); // Convert to string if necessary

    
//     let previousTime = timeBefore15Minutes(startTimes);
//     console.log(previousTime);
//     let adjustedTime = timeBefore4Hours(startTimes);
//     console.log(adjustedTime);

//     let previousDayTime = getPreviousDayTime(startTimes);
//     console.log(previousDayTime);

//     const timeComponentBefore4Hours = adjustedTime.split(":");
//     console.log(timeComponentBefore4Hours, "238");
//     let fourhour = parseInt(timeComponentBefore4Hours[0]);
//     let fourhourminute = parseInt(timeComponentBefore4Hours[1]);
//     let fourhourperiod = timeComponentBefore4Hours[2].toUpperCase();

//     if (fourhourperiod=== "PM" && fourhour < 12) {
//       fourhour += 12;
//     } else if (fourhourperiod === "AM" && fourhour === 12) {
//       fourhour = 0;
//     }
//     console.log(fourhour, fourhourminute, fourhourperiod, ":minute");

//     // const sendEmailBefore4Hours = `0 ${fourhourminute} ${fourhour} * * *`;
//     const currentTime = new Date();
//     const targetTime = new Date();
//     targetTime.setHours(fourhour);
// targetTime.setMinutes(fourhourminute);
// targetTime.setSeconds(0);
// const delays = targetTime.getTime() - currentTime.getTime();
// console.log(delays,':delays')

//   setTimeout(() => {
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log("Error occurred:", error);
//       } else {
//         console.log("Sending email 4 hours before the event start time:", eventStartDate);
//         console.log("Email sent:", info.response);
//       }
//     });
//   }, delays);

//   setTimeout(() => {
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log("Error occurred:", error);
//       } else {
//         console.log("Sending email 1 hours before the event start time:", eventStartDate);
//         console.log("Email sent:", info.response);
//       }
//     });
//   }, delayOneHour);


//   setTimeout(() => {
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log("Error occurred:", error);
//       } else {
//         console.log("Sending email 24 hours before the event start time:", eventStartDate);
//         console.log("Email sent:", info.response);
//       }
//     });
//   }, delayOneDay);

//     const timeComponentBefore15minutes = previousTime.split(":");
//     console.log(timeComponentBefore15minutes,':timeComponentBefore15minutes')
//     let fifteenminutes = parseInt(timeComponentBefore15minutes[0]);
//     let fourhourminutetime = parseInt(timeComponentBefore15minutes[1]);
//     let fifteenminutesperiod = timeComponentBefore15minutes[2].toUpperCase();

//     if (fifteenminutesperiod=== "PM" && fifteenminutes < 12) {
//       fifteenminutes += 12;
//     } else if (fifteenminutesperiod === "AM" && fifteenminutes === 12) {
//       fifteenminutes = 0;
//     }
//     const sendEmailBefore15minutes = `0 ${fourhourminutetime} ${fifteenminutes} * * *`;
//     const timeComponentBefore1day = previousDayTime.split(":");
//     console.log(timeComponentBefore1day,':timeComponentBefore1day')
//     let onedayminutes = parseInt(timeComponentBefore1day[0]);
//     let fourhourdaytime = parseInt(timeComponentBefore1day[1]);
//     let onedayperiod = timeComponentBefore1day[2].toUpperCase();

//     if (onedayperiod=== "PM" && onedayminutes < 12) {
//       onedayminutes += 12;
//     } else if (onedayperiod === "AM" && onedayminutes === 12) {
//       onedayminutes = 0;
//     }
//     const sendEmailBefore1day = `0 ${fourhourdaytime} ${onedayminutes} * * *`;


  


  // const everyday9pm= 
  //  cron.schedule('0 21 * * *', () => {
  //     console.log('Cron job running')
  //     // Send email 15 minutes before the event
  //     sendEmailFunction('vasujasahil12@gmail.com', 'Reminder: Everyday 9 PM', `Event: ${event.title}`);
  //     console.log(timeBefore15Minutes,':timeBefore15Minutes')
  //   });

  // //  const eighttoEight=  
  //  cron.schedule('0 8-20 * * *', () => {
  //     // Send email 1 day before the event
  //     console.log('Cron job running')
  //      sendEmailFunction('vasujasahil12@gmail.com', 'Reminder: Event in 4 Hours', `Event: ${event.title}`);
  //     // console.log(timeBefore1Day,':timeBefore1Day')
  //   });
  // //   console.log(sendEmailBefore4Hours);
  // //  const onetoOne=  
  //  cron.schedule('0 8-20 * * *', () => {
  //     console.log("Cron job running");

  //     sendEmailFunction(
  //       "vasujasahil12@gmail.com",
  //       "Reminder: Event in 1 Hours",
  //       `Event: ${event.title}`
  //     );
  //   });

  //  const everyday=  cron.schedule(everyday9pm, () => {
  //     console.log('Cron job running')
  //     // Send email 15 minutes before the event
  //     sendEmailFunction('vasujasahil12@gmail.com', 'Reminder: Event in 15 Minutes', `Event: ${event.title}`);
  //     console.log(timeBefore15Minutes,':timeBefore15Minutes')
  //   });
    
    // const recentSend = cron.schedule(`2 * * * * *`, () => {
    //   console.log("Cron job running");

    //   sendEmailFunction(
    //     "vasujasahil12@gmail.com",
    //     `Reminder: ${event.title} `,
    //     `Event: ${event.title} ${event.startTime} ${event.endTime}`
    //   );
    //   // Before1day.stop()
    //   // Before4Hours.stop()
    //   // Before15minutes.stop()
    //   recentSend.stop()
    // });

  } catch (error) {
    console.error("Error occurred while saving event to MongoDB:", error);
    res.status(500).send("Internal Server Error");
  }
  // res.send(req.body)
});
app.delete(`/deleteEvent/:payload`, async (req, res) => {
  try {
    const eventId = req.params.payload;
    // Find the event by eventId and remove it from the database
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    const remainingEvents = await Event.find();
    res.send(remainingEvents);
    //   res.json({ message: 'Event deleted successfully',
    //             data: remainingEvents
    // });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.patch("/editEvent/:eventId", async (req, res) => {
  try {
    console.log("first");
    const updatedEventData = req.body;
    // Find the event by eventId and remove it from the database
    const eventId = req.body.eventId;
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      updatedEventData,
      {
        new: true, // Return the updated event
      }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    const allEvents = await Event.find();
    res.send(allEvents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.get("/", async (req, res) => {
  const accesstoken = req.headers.authorization.split(" ")[1];
  // console.log(accesstoken,'48')
  const response = await axios.get(
    "https://sahilvasuja.us.auth0.com/userinfo",
    {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    }
  );
  const userInfo = response.data;
  const existingUser = await User.findOne({ email: userInfo.email });
  if (existingUser) {
    // User already exists
    // console.log('User already exists:', existingUser);
    // res.status(200).json(existingUser);
    const userEvents = await Event.find({ userId: existingUser._id });
    res.status(200).json({ user: existingUser, events: userEvents });
   
  } else {
    // User doesn't exist, save the user data in MongoDB
    const newUser = new User({
      name: userInfo.name,
      email: userInfo.email,
      familyname: userInfo.familyname,
      picture: userInfo.picture,
    });
    await newUser.save();
    // console.log('User saved to MongoDB:', newUser);
    res.status(201).json(newUser);
  }
});
app.get("/authorized", async (req, res) => {
  const accesstoken = req.headers.authorization.split(" ")[1];
  // console.log(accesstoken,'48')
  const response = await axios.get(
    "https://sahilvasuja.us.auth0.com/userinfo",
    {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    }
  );
  const userInfo = response.data;
  // Store the token and user data in the session or database
  res.send(userInfo);
  // res.send('Secured Resource');
});
// app.get('/unauthorized', async (req, res) => {
//    res.send("from backend: 40")
//   });
//   app.get('/Secured', async (req, res)=> {
//     res.send('Secured Resource');
// });


const today = new Date();
const year = String(today.getFullYear()).slice(-2);
const month = String(today.getMonth() + 1).padStart(2, '0'); // January is month 0
const day = String(today.getDate()).padStart(2, '0');

const formattedDate = `${day}-${month}-${year}`;
console.log(formattedDate,":today")
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowYear = String(tomorrow.getFullYear()).slice(-2);
const tomorrowMonth = String(tomorrow.getMonth() + 1).padStart(2, '0');
const tomorrowDay = String(tomorrow.getDate()).padStart(2, '0');

const formattedTomorrow = `${tomorrowDay}-${tomorrowMonth}-${tomorrowYear}`;
console.log(formattedTomorrow, ": tomorrow");
// console.log(tomorrow,":tomorrow")
// const events = await Event.find({ date: { $eq: formattedTomorrow } });

//   console.log(event4hour,":event4hour")
// console.log(events,':events')
const transporter = nodemailer.createTransport({
service: "gmail",
auth: {
user: "sahilvasuja5@gmail.com",
pass: "infsfitjmjtqqmbw",
},
});

cron.schedule('0 9 * * *',async() => {
  let mergedEvents = '';
  const events = await Event.find({ date: { $eq: formattedTomorrow } });
  events.forEach((event) => {
    mergedEvents += `Event Details:
    Event Title: ${event.title}
    Event Date: ${event.date} Start Time: ${event.startTime} End Time: ${event.endTime}`
  });
  const mailOptions = {
    from: "sahilvasuja5@gmail.com",
    to:'vasujasahil12@gmail.com',
    subject: "events schedule for next day",
    text: mergedEvents,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error occurred:", error);
    } else {
     
      console.log("Email sent:", info.response);
    }
  });

})
cron.schedule('16 8-20 * * *',async() => {
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });
  const event4hour=await Event.find({date: {$eq:formattedDate }})
  console.log(currentTime,":::currentTime");
  const [currentHour, currentMinute] = currentTime.split(':').map(Number);
  console.log(`currentHour: ${currentHour}, currentMinute: ${currentMinute} `);
  let mergedEvents = '';
  event4hour.forEach((event) => {
    console.log(event.startTime,":event.StartTime");
    const [startHour, startMinute] = event.startTime.split(':').map(Number);
    
    let hourDiff =  startHour-currentHour ;
    let minuteDiff = startMinute-currentMinute ;
    console.log(currentMinute,startMinute,':currentMinute');
    if (minuteDiff<0) {
      hourDiff--;
      minuteDiff += 60;
    }

if (hourDiff < 0) {
  hourDiff += 24;
}
    console.log(event.startTime,hourDiff,minuteDiff,":hourDiff");
    if (hourDiff>= 4 && hourDiff< 5) {
      mergedEvents += `Event Details:
      Event Title: ${event.title}
      Event Date: ${event.date} Start Time: ${event.startTime} End Time: ${event.endTime}`
    }
  });
  if (mergedEvents !== '') {
      const mailOptions = {
        from: "sahilvasuja5@gmail.com",
        to:'vasujasahil12@gmail.com',
        subject: "events schedule after 4hour",
        text: mergedEvents,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error occurred:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
    }
    else{
      console.log('No events scheduled after the next 4hour to 5hour.');
    }
    console.log(mergedEvents,":mergedEvents");
  // console.log(event4hour,':event4hour');
 
  

  
})
cron.schedule('0 8-20 * * *',async() => {
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });
  const event4hour=await Event.find({date: {$eq:formattedDate }})
  console.log(currentTime,":::currentTime");
  const [currentHour, currentMinute] = currentTime.split(':').map(Number);
  console.log(`currentHour: ${currentHour}, currentMinute: ${currentMinute} `);
  let mergedEvents = '';
  event4hour.forEach((event) => {
    console.log(event.startTime,":event.StartTime");
    const [startHour, startMinute] = event.startTime.split(':').map(Number);
    
    let hourDiff =  startHour-currentHour ;
    let minuteDiff = startMinute-currentMinute ;
    console.log(currentMinute,startMinute,':currentMinute');
    if (minuteDiff<0) {
      hourDiff--;
      minuteDiff += 60;
    }

if (hourDiff < 0) {
  hourDiff += 24;
}
    console.log(event.startTime,hourDiff,minuteDiff,":hourDiff");
    if (hourDiff>= 0 && hourDiff<=1) {
      mergedEvents += `Event Details:
      Event Title: ${event.title}
      Event Date: ${event.date} Start Time: ${event.startTime} End Time: ${event.endTime}`
    }
    });
    if (mergedEvents !== '') {
      const mailOptions = {
        from: "sahilvasuja5@gmail.com",
        to:'vasujasahil12@gmail.com',
        subject: "events that schedule for next hour",
        text: mergedEvents,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error occurred:", error);
        } else {
         
          console.log("Email sent:", info.response);
        }
      });
    }
    else{
      console.log('No events scheduled for the next hour.');
    }
    console.log(mergedEvents,":mergedEvents");
  // console.log(event4hour,':event4hour');
 
  

  
})
connect();
app.listen(port, () => {
  console.log(`connected at ${port}`);
});
