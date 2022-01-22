import { useState } from "react";

export default function useVisualMode (initialMode) {
  const [mode, setMode] = useState(initialMode)
  const [history, setHistory] = useState([initialMode]);

  function transition (newMode, replace = false) {
    if (replace === false) {
      setMode(newMode)
      setHistory([...history, newMode])
    } else if (replace) {
      setMode(newMode)
      const replaceHistory = history.slice(0, -1);
      setHistory([...replaceHistory, newMode])
    }
  }

  function back () {
    if (history.length > 1) {      
      setMode(history[history.length - 2])
      setHistory(history.slice(0, -1))
    }
  }

  return { mode, transition, back };
};
