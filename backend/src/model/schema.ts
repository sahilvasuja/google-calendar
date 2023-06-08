import mongoose from 'mongoose';
const UserSchema=new mongoose.Schema({
    name: String,
    id: {type: mongoose.Schema.Types.ObjectId},
    email:String
})
const EventSchema=new mongoose.Schema({
    title: String,
    id: {type: mongoose.Schema.Types.ObjectId},
    description: String,
    location:String,
    startTime: String,
    endTime: String,
    date:String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema'}
})
// export const GoogleCalender= mongoose.model('UserSchema',UserSchema, 'EventSchema',EventSchema)
// module.exports=GoogleCalender

const User = mongoose.model('User', UserSchema);
const Event = mongoose.model('Event', EventSchema);

export { User, Event };