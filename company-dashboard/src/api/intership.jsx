import axios from 'axios'

// const AXIOS_BASE_URL = import.meta.env.VITE_REACT_API_BASE_ROUTE

// // console.log("hello>>>",AXIOS_BASE_URL);

// export async function addInternship() {
//     const response = await axios.post(`${AXIOS_BASE_URL}/api/internship/addinternship`);
//     const data = response.data;

//     return data;
// }

export async function getAllApprovedApplicants() {
  try {
    // console.log("hi1");
    // const response = await axios.get(`${AXIOS_BASE_URL}/api/internship/all`);
    const response = await axios.get(`https://api.frint.in/api/internship/getUsersWithapproved`);
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
    const response = await axios.get(`https://api.frint.in/api/internship/getUsersWithpending`);
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
    const response = await axios.get(`https://api.frint.in/api/internship/find/${id}`);
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
    const response = await axios.get(`https://api.frint.in/api/internship/getUsersWithInternship/${id}`);
    // console.log("hi1");

    const data = response.data;
    // console.log("data>>>>", data);

    const modifiedDataArray = [];

    // Iterate over each object in the response array
    data.forEach(obj => {
        // Filter the applications array based on the internship key
        const filteredApplication = obj.applications.find(app => app.internship === id);

        // console.log('filteredApplications>>>>',filteredApplication);
        // Create a new object with required fields
        const newObj = {
            uname: obj.uname,
            email: obj.email,
            userId: obj._id,
            applicationsStatus: filteredApplication.status,
            companyName: filteredApplication.name
            
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
  try {
    // console.log("hi1");
    // const response = await axios.get(`${AXIOS_BASE_URL}/api/internship/all`);
    const response = await axios.post(`https://api.frint.in/api/internship/updatetoapprove/${internshipId}`, {
      id: userId
  });
  const data = response.data;
  // console.log("data>>>>", data);


  return data;
  } catch (error) {
    // console.log("error in getting intership by id", error);
  }

}

export async function completeUserByIntershipId(internshipId, userId) {
  try {
    // console.log("hi1");
    // const response = await axios.get(`${AXIOS_BASE_URL}/api/internship/all`);
    const response = await axios.post(`https://api.frint.in/api/internship/updatetocomplete/${internshipId}`, {
      id: userId
    });
    // console.log("hi1");

    const data = response.data;
    // console.log("data>>>>", data);

  
    return data;
  } catch (error) {
    // console.log("error in getting intership by id", error);
  }

}


