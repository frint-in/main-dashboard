import axios from 'axios'
// const VITE_REACT_API_URL = import.meta.env.VITE_REACT_API_URL
// const AXIOS_BASE_URL = import.meta.env.VITE_REACT_API_BASE_ROUTE

// // console.log("hello>>>",AXIOS_BASE_URL);

export async function addInternship() {
    const response = await axios.post(`${import.meta.env.VITE_REACT_API_URL}api/internship/addinternship`, {withCredentials: true},);
    const data = response.data;

    return data;
}

export async function getAllInterships() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_REACT_API_URL}api/internship/all`, {withCredentials: true});
    const data = response.data;
    return data
  } catch (error) {
    return error.response.data.error
  }

}

  