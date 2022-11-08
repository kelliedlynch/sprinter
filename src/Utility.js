export function formatTimer(secs) {
  const pad = (n) => n < 10 ? `0${n}` : n;

  const h = Math.floor(secs / 3600);
  const m = Math.floor(secs / 60) - (h * 60);
  const s = Math.floor(secs - h * 3600 - m * 60);

  return (h !== 0 ? `${pad(h)}:` : "") + `${pad(m)}:${pad(s)}`;
}