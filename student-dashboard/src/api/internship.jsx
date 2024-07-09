import axios from "axios";

const instance = axios.create({
  withCredentials: true,
});

export async function applyInternshipByStudentTokenAndInternshipId(id) {
  try {
    const response = await instance.put(
      `${import.meta.env.VITE_REACT_API_URL}api/internship/find/${id}`,
      { withCredentials: true }
    );

    const data = response.data;
    // console.log("data>>>>", data);

    return data;
  } catch (error) {
    if (error.response.status === "401") {
      localStorage.removeItem("token");
    }
    alert(error.response.data.error);
    if (error.response.status === "401") {
      navigate("/auth");
    } else {
      alert("Access Token Error");
    }
  }
}
