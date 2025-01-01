import axios from "axios";
import { port } from ".";
import { Artist } from "../types";

const route : string = "api/artists"

export const createArtist = async (artist : Artist) => {
  try{
    // console.log("Authorization Header:", config.headers); // Log the authorization header
    const res = await axios.post(`http://localhost:${port}/${route}`, artist)
    console.log("message", res.statusText);
    console.log(res.data);
    return res.data as Artist
  }
  catch(error){
    console.error('Error:', error);
    return null
  }
}

export const getArtists = async () => {
  try{
    const res = await axios.get(`http://localhost:${port}/${route}`)
    console.log(res.data);
    return res.data as Artist[]
  }
  catch(error){
    console.error('Error:', error);
    return null
  }
}

export const getArtist = async (id : string) => {
  try{
    const res = await axios.get(`http://localhost:${port}/${route}/${id}`)
    console.log(res.data);
    return res.data as Artist
  }
  catch(error){
    console.error('Error:', error);
    return null
  }
}

export const updateArtist = async (id : string, artist : Artist) => {
  try{
    const res = await axios.put(`http://localhost:${port}/${route}/${id}`, artist)
    console.log(res.data);
    return res.data as Artist
  }
  catch(error){
    console.error('Error:', error);
    return null
  }
}

export const deleteArtist = async (id : string) => {
  try{
    const res = await axios.delete(`http://localhost:${port}/${route}/${id}`)
    console.log(res.data);
    return res.data as Artist
  }
  catch(error){
    console.error('Error:', error);
    return null
  }
}