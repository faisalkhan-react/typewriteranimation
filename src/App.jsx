import { useState } from "react";
import TypewriterText from "./components/TypewriterText";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [submittedText, setSubmittedText] = useState("");
  const [hashtagColors, setHashtagColors] = useState({});

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputText.trim()) return;

    const hashtags = inputText.match(/(#\w+|@\w+)/g) || [];

    const newHashtagColors = {};
    hashtags.forEach((hashtag) => {
      let color;
      do {
        color = getRandomColor();
      } while (
        Object.values(newHashtagColors).includes(color) &&
        Object.values(newHashtagColors).length < 10
      );

      newHashtagColors[hashtag] = color;
    });

    setHashtagColors(newHashtagColors);
    setSubmittedText(inputText);
    setInputText("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Typewriter with Hashtag & Mention Highlighting
        </h1>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Enter your text with #hashtags..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
        </form>

        <div className="mb-2 text-sm font-medium text-gray-700">Output:</div>

        <div className="max-h-[100px] overflow-auto border-rounded bg-white">
          <TypewriterText text={submittedText} hashtagColors={hashtagColors} />
        </div>
      </div>
    </div>
  );
}

export default App;
