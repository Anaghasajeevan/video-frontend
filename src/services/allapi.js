import { BASE_URL } from "./baseurl";
import { commonrequest } from "./commonrequest";

// add video

export const addVideo = async (body) => {

  return await commonrequest("POST", `${BASE_URL}/videos`, body)

}

// get video

export const getVideo = async () => {
  return await commonrequest("GET", `${BASE_URL}/videos`, "")

}

// delete

export const deleteVideo = async (id) => {

  return await commonrequest("DELETE", `${BASE_URL}/videos/${id}`, {})

}

//  add category

export const addCategory = async (body) => {
  return await commonrequest("POST", `${BASE_URL}/categories`, body,)
}

// get all actegories 

export const getallCategory = async () => {
  return await commonrequest("GET", `${BASE_URL}/Categories`, "")
}

//  delete category

export const deleteCategory = async (id) => {
  return await commonrequest("DELETE", `${BASE_URL}/Categories/${id}`, {})
}



//get wh=atch history


export const getWatchhistory = async()=>{
  return await commonrequest("GET",`${BASE_URL}/watch_history`,"")
}

// /add watch history

export const addWatchhistory = async(body)=>{
  return await commonrequest("POST",`${BASE_URL}/watch_history`,body)
}

// get single card details 

export const getVideos = async (id) => {
  return await commonrequest("GET", `${BASE_URL}/videos/${id}`, "")

}

// to update card details in category section

export const updateCategory = async (id,body) => {
  return await commonrequest("PUT", `${BASE_URL}/Categories/${id}`,body)
}
