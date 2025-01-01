import axios from "axios";
import { port } from ".";
import { Rating } from "../types";

const route : string = "api/ratings"

export const createRating = async (rating : Rating) => {
  try{
    // console.log("Authorization Header:", config.headers); // Log the authorization header
    const res = await axios.post(`http://localhost:${port}/${route}`, rating)
    console.log("message", res.statusText);
    console.log(res.data);
    return res.data as Rating
  }
  catch(error){
    console.error('Error:', error);
    return null
  }
}

export const getRatings = async () => {
  try{
    const res = await axios.get(`http://localhost:${port}/${route}`)
    console.log(res.data);
    return res.data as Rating[]
  }
  catch(error){
    console.error('Error:', error);
    return null
  }
}

export const getRating = async (id : string) => {
  try{
    const res = await axios.get(`http://localhost:${port}/${route}/${id}`)
    console.log(res.data);
    return res.data as Rating
  }
  catch(error){
    console.error('Error:', error);
    return null
  }
}

export const updateRating = async (id : string, rating : Rating) => {
  try{
    const res = await axios.put(`http://localhost:${port}/${route}/${id}`, rating)
    console.log(res.data);
    return res.data as Rating
  }
  catch(error){
    console.error('Error:', error);
    return null
  }
}

export const deleteRating = async (id : string) => {
  try{
    const res = await axios.delete(`http://localhost:${port}/${route}/${id}`)
    console.log(res.data);
    return res.data as Rating
  }
  catch(error){
    console.error('Error:', error);
    return null
  }
}

export const artistRatings = async (artistId : string) => {
  try{
    const res = await axios.get(`http://localhost:${port}/artist_ratings/${artistId}`)
    console.log(res.data);
    return res.data as Rating[]
  }
  catch(error){
    console.error('Error:', error);
    return null
  }
}