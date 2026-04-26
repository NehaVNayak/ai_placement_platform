import axios from "axios";
const AUTH_URL = "http://localhost:8000/api";
const API_URL = "http://localhost:8000/api";

export const tpoSignup = async (data) => {
  const response = await fetch(`${AUTH_URL}/tpo/signup`, {
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
  const response = await fetch(`${AUTH_URL}/login`, {
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
  const res = await axios.get(`${API_URL}/student/${studentId}`);
  return res.data;
};