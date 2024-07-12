import axios from "axios";

export async function getAllApprovedApplicants() {
  try {
    // console.log("hi1");
    // const response = await axios.get(`${AXIOS_BASE_URL}/api/internship/all`);
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_API_URL}api/internship/getUsersWithapproved`
    );
    // console.log("hi1");

    const data = response.data;
    // console.log("data>>>>", data);

    return data;
  } catch (error) {
    // console.log("error in getting all interships", error);
  }
}

export async function getAllPendingApplicants() {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_API_URL}api/internship/getUsersWithpending`
    );
    // console.log("hi1");

    const data = response.data;
    // console.log("data>>>>", data);

    return data;
  } catch (error) {
    // console.log("error in getting all interships", error);
  }
}

export async function getIntershipById(id) {
  try {
    // console.log("hi1");
    // const response = await axios.get(`${AXIOS_BASE_URL}/api/internship/all`);
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_API_URL}api/internship/find/${id}`
    );
    // console.log("hi1");

    const data = response.data;
    // console.log("data>>>>", data);

    return data;
  } catch (error) {
    // console.log("error in getting intership by id", error);
  }
}

export async function getUsersWithIntershipId(id) {
  try {
    // console.log("hi1");
    // const response = await axios.get(`${AXIOS_BASE_URL}/api/internship/all`);
    const response = await axios.get(
      `${
        import.meta.env.VITE_REACT_API_URL
      }api/internship/getUsersWithInternship/${id}`
    );
    // console.log("hi1");

    const data = response.data;
    // console.log("data>>>>", data);

    const modifiedDataArray = [];

    // Iterate over each object in the response array
    data.forEach((obj) => {
      // Filter the applications array based on the internship key
      const filteredApplication = obj.applications.find(
        (app) => app.internship === id
      );

      // console.log('filteredApplications>>>>',filteredApplication);
      // Create a new object with required fields
      const newObj = {
        uname: obj.uname,
        email: obj.email,
        userId: obj._id,
        phone: obj.phno,
        specs: obj.specialisation,
        applicationsStatus: filteredApplication.status,
        companyName: filteredApplication.name,
      };

      // Push the new object into the separate array
      modifiedDataArray.push(newObj);
    });

    // Now modifiedDataArray contains the required data
    // console.log(modifiedDataArray);

    return modifiedDataArray;
  } catch (error) {
    // console.log("error in getting intership by id", error);
  }
}

export async function approveUserByIntershipId(internshipId, userId) {
  const instance = axios.create({
    id: userId,
  });
  try {
    // console.log("hi1");
    // const response = await axios.get(`${AXIOS_BASE_URL}/api/internship/all`);
    const response = await instance.post(
      `${
        import.meta.env.VITE_REACT_API_URL
      }api/internship/updatetoapprove/${internshipId}`,
      {
        id: userId,
      }
    );
    const data = response.data;
    // console.log("data>>>>", data);

    return data;
  } catch (error) {
    // console.log("error in getting intership by id", error);
  }
}

export async function completeUserByIntershipId(internshipId, userId) {
  const instance = axios.create({
    id: userId,
  });
  try {
    // console.log("hi1");
    // const response = await axios.get(`${AXIOS_BASE_URL}/api/internship/all`);
    const response = await instance.post(
      `${
        import.meta.env.VITE_REACT_API_URL
      }api/internship/updatetocomplete/${internshipId}`,
      {
        id: userId,
      }
    );
    // console.log("hi1");

    const data = response.data;
    // console.log("data>>>>", data);

    return data;
  } catch (error) {
    // console.log("error in getting intership by id", error);
  }
}
