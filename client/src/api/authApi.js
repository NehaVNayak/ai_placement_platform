import axios from "axios";
const BASE_URL = "http://127.0.0.1:8000/api";

export const tpoSignup = async (data) => {
  const response = await fetch(`${BASE_URL}/tpo/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || "Signup failed");
  }

  return result;
};

export const loginUser = async (data) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || "Login failed");
  }

  return result;
};

export const getStudentProfile = async (studentId) => {
  const res = await axios.get(`${BASE_URL}/student/${studentId}`);
  return res.data;
};