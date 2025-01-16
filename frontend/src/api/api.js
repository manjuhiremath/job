import { baseUrl } from "./baseurl";
import { baseUrl } from "./baseurl";


export const registerUser = async(payload)=>{
    return await baseUrl.post('/auth/register',payload)
}

// const getCourseById = async (courseId, token) => {
//     return await baseUrl.get("course/id?id=" + courseId, {
//       headers: {
//         Authorization: token,
//       },
//     });
//   };