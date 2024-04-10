import axios from 'axios'

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
