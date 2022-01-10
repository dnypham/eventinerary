export default function formatTime(time) {
  let min = parseInt(time.slice(0, 2));
  const seconds = time.slice(3);
  let amOrPM = '';

  if (min > 12) {
    min = '0' + (min - 12);
    amOrPM = 'PM';
  } else {
    amOrPM = 'AM';
  }

  return `${min}:${seconds}${amOrPM}`;
}
