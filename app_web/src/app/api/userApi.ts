import axios from "axios";
import { port } from ".";
import { User } from "../types";

const route : string = "api/users"

export const createUser = async (user : User) => {
  try{
    // console.log("Authorization Header:", config.headers); // Log the authorization header
    const res = await axios.post(`http://localhost:${port}/${route}`, user)
    console.log("message", res.statusText);
    console.log(res.data);
    return res.data as User
  }
  catch(error){
    console.error('Error:', error);
    return null
  }
}

export const getUsers = async () => {
  try{
    const res = await axios.get(`http://localhost:${port}/${route}`)
    console.log(res.data);
    return res.data as User[]
  }
  catch(error){
    console.error('Error:', error);
    return null
  }
}

export const getUser = async (id : string) => {
  try{
    const res = await axios.get(`http://localhost:${port}/${route}/${id}`)
    console.log(res.data);
    return res.data as User
  }
  catch(error){
    console.error('Error:', error);
    return null
  }
}

export const updateUser = async (id : string, user : User) => {
  try{
    const res = await axios.put(`http://localhost:${port}/${route}/${id}`, user)
    console.log(res.data);
    return res.data as User
  }
  catch(error){
    console.error('Error:', error);
    return null
  }
}

export const deleteUser = async (id : string) => {
  try{
    const res = await axios.delete(`http://localhost:${port}/${route}/${id}`)
    console.log(res.data);
    return res.data as User
  }
  catch(error){
    console.error('Error:', error);
    return null
  }
}

export const loginUser = async (email : string, password : string) => {
  try{
    const res = await axios.post(`http://localhost:${port}/${route}/login`, {email, password})
    console.log(res.data);
    return res.data as User
  }
  catch(error){
    console.error('Error:', error);
    return null
  }
}