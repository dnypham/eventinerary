export default function formatTime(time) {
  let hour = parseInt(time.slice(0, 3));

  if (hour > 12) {
    hour -= 12;

    return hour + time.slice(2, 5) + 'PM';
  } else if (hour === 12) {
    return hour + time.slice(2, 5) + 'PM';
  }

  if (hour === 0) {
    hour = 12;
  }

  return hour + time.slice(2, 5) + 'AM';
}
