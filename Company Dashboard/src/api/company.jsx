import axios from 'axios'

const AXIOS_BASE_URL = 'http://localhost:8000'

export async function addInternship() {
    const response = await axios.post(`${AXIOS_BASE_URL}/api/internship/addinternship`);
    const data = response.data;

    return data;
}

export async function getAllInterships() {
  try {
    console.log("hi1");
    const response = await axios.get(`http://localhost:8000/api/internship/all`);
    console.log("hi1");

    const data = response.data;
    console.log("data>>>>", data);

  
    return data;
  } catch (error) {
    console.log("error in getting all interships", error);
  }

}

 
  export async function createPost(newPost) {
    const response = await fetch(`http://localhost:3000/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPost)
    });
    return response.json()
  }
  
  export async function updatePost(updatedPost) {
    const response = await fetch(`http://localhost:3000/posts/${updatedPost.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedPost)
    });
    return response.json()
  }
  
  export async function deletePost(id) {
    const response = await fetch(`http://localhost:3000/posts/${id}`, {
      method: "DELETE",
    });
    return response.json()
  }