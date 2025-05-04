/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const answer = useRef('');
  let [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [picture, setPicture] = useState([]);
  const apiKey = process.env.REACT_APP_GEMINI_KEY;
  //let response = '';

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
  });

  async function generateAnswer() {
    if (!question || question.trim() === '') {
      console.error("Either Image or Question is required.");
      return; // Do not proceed if question is empty
    }
    setLoading(true);
    
    try {
      const imageParts = await Promise.all(
        picture.map(async (file) => {
          const base64 = await toBase64(file);
          const mimeType = file.type; // e.g., image/jpeg or image/png
          return {
            inlineData: {
              mimeType: mimeType,
              data: base64.split(',')[1], // Remove the data URL prefix
            }
          };
        })
      );
  
      if(question) question = question + " with no html tags";
      const requestBody = {
        contents: [
          {
            parts: [
              ...imageParts,
              ...(question ? [{ text: question }] : [])
            ]
          }
        ]
      };

      setPicture([]);
  
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        method: 'post',
        data: requestBody,
      });
  
      if (response.data?.candidates?.length > 0) {
        const newAnswer = response.data.candidates[0].content.parts[0].text;
        answer.current = newAnswer;
      } else {
        console.error("No answer found in response.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  
    setLoading(false);
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
