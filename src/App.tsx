import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bankScore, setBankScore] = useState(0);
  const [seconds, setSeconds] = useState(120); // Start at 120 seconds (2 minutes)
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: any;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(interval);
      alert("Time's up!");
    }

    return () => clearInterval(interval); // Cleanup interval on component unmount or when timer stops
  }, [isActive, seconds]);

  const handleWrongAnswer = () => {
    setCurrentScore(0);
  };

  const handleRightAnswer = () => {
    if (!currentScore) setCurrentScore(1);
    else if (currentScore === 1) setCurrentScore(4); //BOOST score
    else setCurrentScore((prev) => prev * 2);
  };

  const handleClickingBank = () => {
    setBankScore((prev) => prev + currentScore);
    setCurrentScore(0);
  };

  const handleReset = (isActive: boolean) => {
    setCurrentScore(0);
    setBankScore(0);
    setSeconds(120);
    setIsActive(isActive);
  };

  const handleTogglePause = () => {
    setIsActive((prev) => !prev);
  };

  const formatTime = () => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };

  return (
    <div className="container">
      <div>
        <p style={{ fontSize: "28px", fontWeight: 500, color: "crimson" }}>
          {formatTime()}
        </p>
        <h2 style={{ marginBottom: "30px", fontSize: "32px" }}>
          الاسكور الحالي: {currentScore}
        </h2>
      </div>
      <div>
        <button onClick={handleWrongAnswer} className="buttom-wrong">
          اجابة خاطئة
        </button>
        <span style={{ margin: "0 20px" }}></span>
        <button onClick={handleRightAnswer} className="buttom-right">
          اجابة صحيحة
        </button>
      </div>
      <button onClick={handleClickingBank} className="buttom-bank">
        BANK
      </button>

      <h2 className="total-score">
        معاك في البنك: <span style={{ color: "crimson" }}>{bankScore}</span>{" "}
        نقطة
      </h2>
      <button onClick={() => handleReset(false)} className="action-btn">
        Reset
      </button>
      <span style={{ margin: "0 10px" }}></span>
      <button onClick={handleTogglePause} className="action-btn">
        توقف / أكمل
      </button>
      <span style={{ margin: "0 10px" }}></span>
      <button onClick={() => handleReset(true)} className="action-btn">
        أبدا دور جديد
      </button>
    </div>
  );
}

export default App;
