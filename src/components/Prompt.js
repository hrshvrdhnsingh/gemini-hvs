import React, { useState } from "react";
import "../globals.css";
import { useResultContext } from "./ContextProvider";
const Prompt = () => {
  const {setQuestion, picture, setPicture} = useResultContext();
  const [query, setQuery] = useState();
  
  const changeHandler =(e) => {
      setQuery(e.target.value)
  }
  const handleFileChange = (e) => {
    const files = e.target.files;
    const newPictures = Array.from(files);
    setPicture((prevPictures) => [...prevPictures, ...newPictures]);
  };
  const submitHandler = () => {
    setQuestion(query)
    setQuery('')
  }
  return (
    <div className="messageBox w-[40vw] ">
      <div className="fileUploadWrapper">
        <div>
            <label htmlFor="file">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 337 337"
              >
                <circle
                    strokeWidth="10"
                    stroke="#6c6c6c"
                    fill="none"
                    r="158.5"
                    cy="168.5"
                    cx="168.5"
                ></circle>
                <path
                    strokecap="round"
                    strokeWidth="25"
                    stroke="#6c6c6c"
                    d="M167.759 79V259"
                ></path>
                <path
                    strokeLinecap="round"
                    strokeWidth="25"
                    stroke="#6c6c6c"
                    d="M79 167.138H259"
                ></path>
              </svg>
              <span className="tooltip">Add an image</span>
            </label>
            <input type="file" id="file" name="file" 
                onChange={handleFileChange}
                multiple
            />
          </div>
            <input
                required=""
                value={query}
                placeholder="Message ChatGemini..."
                type="text"
                id="messageInput"
                className='w-full'
                autoComplete="off"
                onChange={changeHandler}
            />
        </div>
            <button id="sendButton" onClick={submitHandler}>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 664 663"
                >
                <path
                    fill="none"
                    d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                ></path>
                <path
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="33.67"
                    stroke="#6c6c6c"
                    d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                ></path>
                </svg>
            </button>
    </div>
  );
};

export default Prompt;
