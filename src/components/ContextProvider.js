/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const answer = useRef('');
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [picture, setPicture] = useState([]);
  const apiKey = process.env.REACT_APP_GEMINI_KEY;
  //let response = '';

  async function generateAnswer() {
    if (!question || question.trim() === '') {
      console.error("Question is required.");
      return; // Do not proceed if question is empty
    }
    setLoading(true);

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        method: 'post',
        data: {
          "contents": [{ "parts": [{ "text": question }] }]
        },
      });
      if (response.data && response.data.candidates && response.data.candidates.length > 0) {
        const newAnswer = response.data.candidates[0].content.parts[0].text;
        answer.current = newAnswer; // Update the ref
        setLoading(false);
      } else {
        console.error("No answer found in response.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    generateAnswer();
  }, [question]); // Run generateAnswer when question changes

  useEffect(() => {
  }, [answer.current]); // Run this effect when answerRef.current changes

  const value={
    answer, question, setQuestion, loading, setLoading, picture, setPicture,
  }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useResultContext = () => useContext(AppContext);
