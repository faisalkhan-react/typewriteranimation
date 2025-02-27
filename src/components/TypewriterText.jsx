import { useState, useEffect } from "react";

const TypewriterText = ({ text, hashtagColors }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text]);

  useEffect(() => {
    setDisplayedText("");
    setCurrentIndex(0);
  }, [text]);

  const renderTextWithHashtags = () => {
    if (!displayedText) return null;

    const allHashtags = text.match(/(#\w+|@\w+)/g) || [];
    const allHashtagColors = { ...hashtagColors };

    const words = displayedText.split(/(\s+)/);

    return words.map((word, index) => {
      if (word.startsWith("#") || word.startsWith("@")) {
        const color = allHashtagColors[word] || "#000000";
        return (
          <span key={index} style={{ color }} className="font-bold">
            {word}
          </span>
        );
      }
      return <span key={index}>{word}</span>;
    });
  };

  return (
    <div className="min-h-[100px] p-4 border rounded-md bg-white text-black">
      {renderTextWithHashtags()}
    </div>
  );
};

export default TypewriterText;
