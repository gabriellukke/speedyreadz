import { ChangeEvent, useState, useRef } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [speed, setSpeed] = useState(300); // WPS -> words per minute
  const [isPlaying, setIsPlaying] = useState(false);
  const [fontSize, setFontSize] = useState(24);

  const intervalRef = useRef<number | null>(null);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setWords(e.target.value.split(/\s+/));
    setCurrentWordIndex(0);
  };

  const handlePlay = () => {
    setIsPlaying(true);
    intervalRef.current = setInterval(() => {
      setCurrentWordIndex((prev) => {
        if (prev < words.length - 1) {
          return prev + 1;
        }
        setIsPlaying(false);
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
        }
        return prev;
      });
    }, 60000 / speed);
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
  };

  const handleFontSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFontSize(parseInt(e.target.value));
  };

  console.log("Current Word:", words[currentWordIndex]);

  return (
    <main className="container">
      <h1>SpeedyReadz</h1>

      <div className="text-container">
        {!isPlaying && (
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Paste your text here"
          />
        )}
        {isPlaying && (
          <p style={{ fontSize: `${fontSize}px`, color: "#fff" }}>
            {words[currentWordIndex]}
          </p>
        )}
      </div>

      <div className="controls">
        <label htmlFor="speed">Speed (WPM):</label>
        <input
          id="speed"
          type="number"
          value={speed}
          onChange={(e) => setSpeed(parseInt(e.target.value))}
        />
        <label htmlFor="fontSize">Font size:</label>
        <input
          id="fontSize"
          type="number"
          value={fontSize}
          onChange={handleFontSizeChange}
        />
        {isPlaying ? (
          <button onClick={handlePause}>Pause</button>
        ) : (
          <button onClick={handlePlay}>Play</button>
        )}
      </div>
    </main>
  );
}

export default App;
