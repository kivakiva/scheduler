import { useState } from "react";

export default function useVisualMode (initialMode) {
  const [mode, setMode] = useState(initialMode)
  const [history, setHistory] = useState([initialMode]);

  function transition (newMode, replace = false) {
    if (replace === false) {
      setMode(newMode)
      setHistory((prev) => [...prev, newMode])
    } else if (replace) {
      setMode(newMode)
      setHistory((prev) => {
        const replaceHistory = prev.slice(0, -1);
        return [...replaceHistory, newMode]
      }
      )
    }
  }

  function back () {
    if (history.length > 1) {      
      setHistory((prev) => {
        setMode(prev[prev.length - 2])
        return prev.slice(0, -1)
      }
      )
    }
  }

  return { mode, transition, back };
};
