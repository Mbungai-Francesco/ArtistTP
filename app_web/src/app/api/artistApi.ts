import axios from "axios";
import { port, link } from ".";
import { Artist } from "../types";

const route : string = "api/artists"

export const createArtist = async (artist : Artist) => {
  try{
    // console.log("Authorization Header:", config.headers); // Log the authorization header
    const res = await axios.post(`${link}/${route}`, artist)
    console.log("message", res.statusText);
    console.log(res.data.data);
    return res.data.data as Artist
  }
  catch(error){
    console.error('Error:', error);
    return null
  }
}

export const getArtists = async (jwt : string) => {
  try{
    const res = await axios.get(`${link}/${route}`)
    console.log(res.data.data);
    return res.data.data as Artist[]
  }
  catch(error){
    console.error('Error:', error);
    return null
  }
}

export const getArtist = async (id : string,jwt : string) => {
  try{
    const res = await axios.get(`${link}/${route}/${id}`)
    console.log(res.data.data);
    return res.data.data as Artist
  }
  catch(error){
    console.error('Error:', error);
    return null
  }
}

export const updateArtist = async (id : string, artist : Artist,jwt : string) => {
  try{
    const res = await axios.put(`${link}/${route}/${id}`, artist)
    console.log(res.data.data);
    return res.data.data as Artist
  }
  catch(error){
    console.error('Error:', error);
    return null
  }
}

export const deleteArtist = async (id : string,jwt : string) => {
  try{
    const res = await axios.delete(`${link}/${route}/${id}`)
    console.log(res.data.data);
    return res.data.data as Artist
  }
  catch(error){
    console.error('Error:', error);
    return null
  }
}