import mongoose from 'mongoose';
const UserSchema=new mongoose.Schema({
    name: String,
    id: {type: mongoose.Schema.Types.ObjectId},
    password: String,
    email:String
})
const EventSchema=new mongoose.Schema({
    title: String,
    id: {type: mongoose.Schema.Types.ObjectId},
    description: String,
    location:String,
    start: Date,
    end: Date,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema'}
})
// export const GoogleCalender= mongoose.model('UserSchema',UserSchema, 'EventSchema',EventSchema)
// module.exports=GoogleCalender

const User = mongoose.model('User', UserSchema);
const Event = mongoose.model('Event', EventSchema);

export { User, Event };