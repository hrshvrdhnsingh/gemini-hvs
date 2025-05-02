import "./globals.css";
import Navbar from "./components/Navbar";
import Prompt from "./components/Prompt";
import { useResultContext } from "./components/ContextProvider";
import Spinner from "./components/Spinner";
import { TypeAnimation } from 'react-type-animation';
import DOMPurify from 'dompurify';
function App() {
  const { answer, loading } = useResultContext();
  
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
    <div className="relative w-screen min-h-screen flex flex-col main-div">
      <div className="mb-20">
        <Navbar />
      </div>
      <div className="w-full flex flex-col justify-center align-center min-h-[79vh]">
        <div className="flex justify-center align-center result-outer">
          <div
            className={`w-6/12 min-h-[72vh] result-container mb-10 p-4 text-gray-300 ${
              (!loading && answer.current) ? "result-has-answer" : ""
            }`}
          >
            {loading ? (
              <Spinner />
            ) : (
              <TypeAnimation
                sequence={[formattedAnswer]}
                wrapper="pre"
                speed={90}
                style={{ fontSize: '1em' }}
                repeat={0}
                className="result-card"
                cursor={false}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center align-center ml-0 mr-0 mb-4 prompt-div">
        <Prompt />
      </div>
    </div>
  );
}

export default App;