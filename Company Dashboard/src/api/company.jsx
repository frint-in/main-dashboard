import axios from 'axios'

const AXIOS_BASE_URL = import.meta.env.VITE_REACT_API_BASE_ROUTE

export async function addInternship() {
    const response = await axios.post(`${AXIOS_BASE_URL}/api/internship/addinternship`);
    const data = response.data;

    return data;
}

export async function getAllInterships() {
  try {
    console.log("hi1");
    const response = await axios.get(`${AXIOS_BASE_URL}/api/internship/all`);
    console.log("hi1");

    const data = response.data;
    console.log("data>>>>", data);

  
    return data;
  } catch (error) {
    console.log("error in getting all interships", error);
  }

}

  