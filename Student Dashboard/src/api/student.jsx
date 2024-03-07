import axios from 'axios'

const AXIOS_BASE_URL = import.meta.env.VITE_REACT_API_BASE_ROUTE

console.log("hello>>>",AXIOS_BASE_URL);

export async function getStudentByToken() {
    const response = await axios.get(`${AXIOS_BASE_URL}/api/user/finduserbytoken`, {withCredentials: true});
    const data = response.data;

    return data;
}

export async function getAllInterships() {
  try {
    console.log("hi1");
    // const response = await axios.get(`${AXIOS_BASE_URL}/api/internship/all`);
    const response = await axios.get(`${import.meta.env.VITE_REACT_API_BASE_ROUTE}/api/internship/all`);
    console.log("hi1");

    const data = response.data;
    console.log("data>>>>", data);

  
    return data;
  } catch (error) {
    console.log("error in getting all interships", error);
  }

}

  