import axios from "axios";

const BASE_URL = "http://localhost:8000/api/practice";
const BASEE_URL = "http://localhost:8000/api/programming-practice";

export const getNextQuestion = async (studentId, subject) => {

  const response = await axios.get(
    `${BASE_URL}/next-question`,
    {
      params: {
        student_id: studentId,
        subject: subject
      }
    }
  );

  return response.data;
};


export const submitAnswer = async (data) => {

  const response = await axios.post(
    `${BASE_URL}/submit-answer`,
    data
  );

  return response.data;
};

export const getNextProgrammingQuestion = async (studentId, subject) => {
  const res = await axios.get(
    `${BASE_URL}/programming-next-question`,
    {
      params: {
        student_id: studentId,
        subject: subject
      }
    }
  );
  return res.data;
};

export const submitProgrammingAnswer = async (data) => {
  const res = await axios.post(
    `${BASE_URL}/programming-submit-answer`,
    data
  );
  return res.data;
};