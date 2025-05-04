import "./globals.css";
import Navbar from "./components/Navbar";
import Prompt from "./components/Prompt";
import { useResultContext } from "./components/ContextProvider";
import Spinner from "./components/Spinner";
import { TypeAnimation } from 'react-type-animation';
import DOMPurify from 'dompurify';
import { useState } from "react";

function App() {
  const { picture, answer, loading } = useResultContext();
  const [modal, setModal] = useState(false);
  
  /* const createMarkup = (htmlString) => {
    console.log(htmlString)
    return { __html: htmlString };
  }; */
  
  const formatAnswer = (rawAnswer) => {
    // Split the raw answer into lines
    const lines = rawAnswer.split('\n');

    const processedLines = lines.map(line =>
      line.replace(/\*\*(.*?)\*\*/g, (_, boldText) => boldText.toUpperCase()) // simulate bold
    );

    return processedLines.join('\n');
  };
  

  const formattedAnswer = formatAnswer(answer.current);
  
  return (
    <div className="relative w-screen min-h-screen flex flex-col main-div overflow-x-hidden">
      <div className="mb-20">
        <Navbar />
      </div>
      <div className="w-full flex flex-col justify-center align-center min-h-[79vh]">
        <div className="flex justify-center align-center result-outer">
          <div
            className={`w-6/12 min-h-[72vh] result-container lg:mb-20 mb-24 p-4 text-gray-300 ${
              (!loading && answer.current) ? "result-has-answer" : ""
            }`}
          >
            {loading ? (
              <Spinner />
            ) : (
              <TypeAnimation
                sequence={[formattedAnswer]}
                wrapper="pre"
                speed={99}
                repeat={0}
                className="result-card text-sm sm:text-base md:text-lg lg:text-lg"
                cursor={false}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex relative gap-8 flex-row lg:w-screen lg:fixed justify-center align-center lg:ml-0 lg:mt-[90vh] ml-0 mr-0 mb-4 prompt-div">
        <div className="image-div absolute flex flex-row-reverse gap-2 mb-4 w-[10vw] lg:left-72 rounded-xl">
          {
            picture?.map((pic, idx) => (
              <div key={idx}><img className="prompt-image w-16 h-16 rounded-xl" src={URL.createObjectURL(pic)} alt={`preview-${idx}`}/></div>
            ))
          }
        </div>
        <Prompt />
      </div>
    </div>
  );
}

export default App;