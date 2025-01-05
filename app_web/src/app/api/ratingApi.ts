import axios from "axios";
import { link } from ".";
import { Rating } from "../types";

const route : string = "api/ratings"

export const createRating = async (rating : Rating, jwt : string) => {
  try{
    // console.log("Authorization Header:", config.headers); // Log the authorization header
    const res = await axios.post(`${link}/${route}`, rating)
    console.log("message", res.statusText);
    console.log(res.data.data);
    return res.data.data as Rating
  }
  catch(error){
    console.error('Error:', error);
    return null
  }
}

export const getRatings = async (jwt : string) => {
  try{
    const res = await axios.get(`${link}/${route}`)
    console.log(res.data.data);
    return res.data.data as Rating[]
  }
  catch(error){
    console.error('Error:', error);
    return null
  }
}

export const getRating = async (id : string, jwt : string) => {
  try{
    const res = await axios.get(`${link}/${route}/${id}`)
    console.log(res.data.data);
    return res.data.data as Rating
  }
  catch(error){
    console.error('Error:', error);
    return null
  }
}

export const updateRating = async (id : string, rating : Rating, jwt : string) => {
  try{
    const res = await axios.put(`${link}/${route}/${id}`, rating)
    console.log(res.data.data);
    return res.data.data as Rating
  }
  catch(error){
    console.error('Error:', error);
    return null
  }
}

export const deleteRating = async (id : string, jwt : string) => {
  try{
    const res = await axios.delete(`${link}/${route}/${id}`)
    console.log(res.data.data);
    return res.data.data as Rating
  }
  catch(error){
    console.error('Error:', error);
    return null
  }
}

export const artistRatings = async (artistId : string, jwt : string) => {
  try{
    const res = await axios.get(`${link}/artist_ratings/${artistId}`)
    console.log(res.data.data);
    return res.data.data as Rating[]
  }
  catch(error){
    console.error('Error:', error);
    return null
  }
}