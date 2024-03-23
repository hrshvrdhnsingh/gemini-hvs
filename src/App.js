import "./globals.css";
import Navbar from "./components/Navbar";
import Prompt from "./components/Prompt";
import { useResultContext } from "./components/ContextProvider";
import Spinner from "./components/Spinner";
import { TypeAnimation } from 'react-type-animation';

function App() {
  const { answer, loading } = useResultContext();
  
  /* const createMarkup = (htmlString) => {
    console.log(htmlString)
    return { __html: htmlString };
  }; */
  const formatAnswer = (rawAnswer) => {
    // Split the raw answer into lines
    const lines = rawAnswer.split('\n');
    // Filter out any empty lines
    const filteredLines = lines.filter(line => line.trim() !== '');
    // Join the filtered lines with '\n\n' to maintain line breaks
    return filteredLines.join('\n\n');
  };

  const formattedAnswer = formatAnswer(answer.current);
  
  return (
    <div className="w-screen min-h-screen flex flex-col main-div">
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
                style={{ fontSize: '1.1em' }}
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
