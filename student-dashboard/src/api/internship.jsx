import axios from 'axios'

// const AXIOS_BASE_URL = import.meta.env.VITE_REACT_BASE_ROUTE
// const AXIOS_API_BASE_URL = import.meta.env.VITE_REACT_BASE_ROUTE


// // console.log("hello>>>",AXIOS_BASE_URL);

const instance = axios.create({
withCredentials: true
})


export async function applyInternshipByStudentTokenAndInternshipId(id) {
  try {
    const response = await instance.put(`${import.meta.env.VITE_REACT_API_URL}api/internship/addapplicants/${id}`, {withCredentials: true});

    const data = response.data;
    // console.log("data>>>>", data);

    return data;
  } catch (error) {
    // console.log("error in adding applicants", error);
  }
}
