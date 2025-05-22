function Stopwatch() {
  return (
    <div className="stopwatch">
      <h1>Stopwatch</h1>
      <div className="time">00:00:00</div>
      <button className="start">Start</button>
      <button className="stop">Stop</button>
      <button className="reset">Reset</button>
    </div>
  );
}

export default Stopwatch;