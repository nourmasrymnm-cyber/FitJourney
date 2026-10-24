import { useEffect, useRef, useState } from 'react';

// Countdown based on real clock time, so it stays correct if the app is slowed down.
export function useTimer(onEnd) {
  const [left, setLeft] = useState(0); // milliseconds
  const [running, setRunning] = useState(false);
  const last = useRef(0);
  const endRef = useRef(onEnd);
  endRef.current = onEnd;

  useEffect(() => {
    if (!running) return undefined;
    last.current = Date.now();
    const id = setInterval(() => {
      const now = Date.now();
      const dt = now - last.current;
      last.current = now;
      setLeft((l) => Math.max(0, l - dt));
    }, 250);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (running && left <= 0) {
      setRunning(false);
      endRef.current();
    }
  }, [left, running]);

  return {
    left,
    running,
    start: (sec) => { setLeft(sec * 1000); setRunning(true); },
    pause: () => setRunning(false),
    resume: () => setRunning(true),
    add: (sec) => setLeft((l) => l + sec * 1000),
    stop: () => { setRunning(false); setLeft(0); },
  };
}
