import "./App.css";
import { useEffect, useRef, useState } from "react";

function App() {
  let interval;
  const interval_id = window.setInterval(() => {}, Number.MAX_SAFE_INTEGER);

  const distance = useRef();
  const [pause, setPause] = useState(false);
  const [time, setTime] = useState({
    minutes: 0,
    seconds: 0,
  });

  const [countDown, setCountDown] = useState({
    minutes: 0,
    seconds: 0,
  });

  const handleChange = (e) => {
    setTime((prev) => {
      return { ...prev, [e.target.name]: Number(e.target.value) };
    });
  };

  const timer = () => {
    // Clear any timeout/interval up to  interval_id
    for (let i = 1; i < interval_id; i++) {
      window.clearInterval(i);
    }
    interval = setInterval(() => {
      let minutes = Math.floor(
        (distance.current % (1000 * 60 * 60)) / (1000 * 60)
      );
      let seconds = Math.floor((distance.current % (1000 * 60)) / 1000);
      if (distance.current >= 0) {
        setCountDown({
          minutes,
          seconds,
        });
        distance.current -= 1000;
      } else {
        clearInterval(interval);
      }
    }, 500);
  };

  const handleReset = () => {
    setTime({
      minutes: 0,
      seconds: 0,
    });
    setCountDown({
      minutes: 0,
      seconds: 0,
    });
    clearInterval(interval);
    setPause(false);
  };

  const handleStart = () => {
    for (let i = 1; i < interval_id; i++) {
      window.clearInterval(i);
    }
    setCountDown({
      minutes: time.minutes + Math.floor((time.seconds % 3600) / 60),
      seconds: Math.floor((time.seconds % 3600) % 60),
    });
    timer();
  };

  const handlePause = () => {
    pause === false ? setPause(true) : setPause(false);
    if (!pause) {
      for (let i = 1; i < interval_id; i++) {
        window.clearInterval(i);
      }
    } else {
      timer();
    }
  };

  useEffect(() => {
    distance.current = (countDown.minutes * 60 + countDown.seconds) * 1000;
  }, [countDown.minutes, countDown.seconds]);

  return (
    <>
      <div className="text-center my-5">
        <h1>React Countdown App</h1>
      </div>
      <div className="container">
        <div className="mb-3">
          <label htmlFor="minutes" className="form-label">
            Minutes
          </label>
          <input
            type="number"
            className="form-control"
            id="minutes"
            name="minutes"
            value={time.minutes}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="seconds" className="form-label">
            Seconds
          </label>
          <input
            type="number"
            className="form-control"
            id="seconds"
            name="seconds"
            value={time.seconds}
            onChange={handleChange}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary mx-1"
          onClick={handleStart}
        >
          Start
        </button>
        <button
          type="button"
          className="btn btn-secondary mx-1"
          onClick={handlePause}
        >
          Pause/Resume
        </button>
        <button
          type="button"
          className="btn btn-success mx-1"
          onClick={handleReset}
        >
          Reset
        </button>
        <div className="container text-center my-5">
          <h1 data-testid="running-clock">
            {("0" + countDown.minutes).slice(-2)}:
            {("0" + countDown.seconds).slice(-2)}
          </h1>
        </div>
      </div>
    </>
  );
}

export default App;