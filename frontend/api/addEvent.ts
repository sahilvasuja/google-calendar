import axios from "axios";
export const baseAPI = axios.create({
    baseURL: "http://localhost:4000",
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
    },
    timeout: 30000,
  });



  export const deleteEventApi=async(payload:any)=>{
    return baseAPI.delete(`/deleteEvent/${payload}`)
  }
  export  const addEventApi=async(payload: any)=>{
        return baseAPI.post('/addEvent',payload)
    }
    export const editEventApi=async(payload:any)=>{
      const eventId=payload.eventId
      return baseAPI.patch(`/editEvent/${eventId}`,payload)
    }