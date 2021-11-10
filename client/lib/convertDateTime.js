export default function convertDateTime(dateTime) {

  let newDate = '';
  let newTime = '';

  const dateAndTime = dateTime.split('T');

  const date = dateAndTime[0];
  const dateArray = date.split('-');

  const [year, month, day] = dateArray;

  if (month === '01') {
    newDate = `Jan ${day}, ${year}`;
  } else if (month === '02') {
    newDate = `Feb ${day}, ${year}`;
  } else if (month === '03') {
    newDate = `Mar ${day}, ${year}`;
  } else if (month === '04') {
    newDate = `Apr ${day}, ${year}`;
  } else if (month === '05') {
    newDate = `May ${day}, ${year}`;
  } else if (month === '06') {
    newDate = `Jun ${day}, ${year}`;
  } else if (month === '07') {
    newDate = `Jul ${day}, ${year}`;
  } else if (month === '08') {
    newDate = `Aug ${day}, ${year}`;
  } else if (month === '09') {
    newDate = `Sep ${day}, ${year}`;
  } else if (month === '10') {
    newDate = `Oct ${day}, ${year}`;
  } else if (month === '11') {
    newDate = `Nov ${day}, ${year}`;
  } else if (month === '12') {
    newDate = `Dec ${day}, ${year}`;
  }

  const time = dateAndTime[1];
  const timeArray = time.split(':');
  timeArray.pop();

  const [hour, minute] = timeArray;

  if (hour === '01') {
    newTime = `1:${minute}AM`;
  } else if (hour === '02') {
    newTime = `2:${minute}AM`;
  } else if (hour === '03') {
    newTime = `3:${minute}AM`;
  } else if (hour === '04') {
    newTime = `4:${minute}AM`;
  } else if (hour === '05') {
    newTime = `5:${minute}AM`;
  } else if (hour === '06') {
    newTime = `6:${minute}AM`;
  } else if (hour === '07') {
    newTime = `7:${minute}AM`;
  } else if (hour === '08') {
    newTime = `8:${minute}AM`;
  } else if (hour === '09') {
    newTime = `9:${minute}AM`;
  } else if (hour === '10') {
    newTime = `10:${minute}AM`;
  } else if (hour === '11') {
    newTime = `11:${minute}AM`;
  } else if (hour === '12') {
    newTime = `12:${minute}PM`;
  } else if (hour === '13') {
    newTime = `1:${minute}PM`;
  } else if (hour === '14') {
    newTime = `2:${minute}PM`;
  } else if (hour === '15') {
    newTime = `3:${minute}PM`;
  } else if (hour === '16') {
    newTime = `4:${minute}PM`;
  } else if (hour === '17') {
    newTime = `5:${minute}PM`;
  } else if (hour === '18') {
    newTime = `6:${minute}PM`;
  } else if (hour === '19') {
    newTime = `7:${minute}PM`;
  } else if (hour === '20') {
    newTime = `8:${minute}PM`;
  } else if (hour === '21') {
    newTime = `9:${minute}PM`;
  } else if (hour === '22') {
    newTime = `10:${minute}PM`;
  } else if (hour === '23') {
    newTime = `11:${minute}PM`;
  } else if (hour === '00') {
    newTime = `12:${minute}AM`;
  }

  const datetime = `${newDate} at ${newTime}`;

  return datetime;
}
