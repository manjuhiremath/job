import baseUrl from './baseurl';

export const registerUser = async (payload) => {
  return await baseUrl.post('/auth/register', payload)
}
export const loginUser = async (payload) => {
  return await baseUrl.post('/auth/login', payload)
}

export const getProfile = async (token) => {
  return await baseUrl.get("/auth/profile", {
    headers: {
      Authorization: token,
    },
  });
};

export const getJob = async (token) => {
  return await baseUrl.get("/job", {
    headers: {
      Authorization: token,
    },
  });
};

export const getCompany = async (token) => {
  return await baseUrl.get("/company", {
    headers: {
      Authorization: token,
    },
  });
};

export const postJob = async (formData, token) => {
  for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
}
  return await baseUrl.post("/job", formData, {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data', 
    },
  });
}

export const postRemainder = async (payload,token)=>{
  return await baseUrl.post("/remainder", payload, {
    headers: {
      Authorization: token,
    },
  });
}

export const postCompany = async (payload, token) => {
  return await baseUrl.post("/company", payload, {
    headers: {
      Authorization: token,
    },
  });
}
export const putProfile = async (payload,token) => {
  return await baseUrl.put("/auth/profile",payload, {
    headers: {
      Authorization: token,
    },
  });
};
export const putJob = async (id,payload, token) => {
  return await baseUrl.put("/job/"+id, payload, {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
    },
  });
}

export const putCompany = async (id,payload, token) => {
  return await baseUrl.put("/company/"+id, payload, {
    headers: {
      Authorization: token,
    },
  });
}


export const deleteJob = async (id, token) => {
  return await baseUrl.delete("/job/" + id, {
    headers: {
      Authorization: token,
    },
  });
}

export const deleteCompany = async (id, token) => {
  return await baseUrl.delete("/company/" + id, {
    headers: {
      Authorization: token,
    },
  });
}