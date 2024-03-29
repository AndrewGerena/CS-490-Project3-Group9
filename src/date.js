export default function findDate() {
  const d = new Date();
  let day = d.getDay();
  let month = d.getMonth();
  const date = d.getDate();
  const year = d.getFullYear();

  // Replace 0-6 number of day with the day's name.
  const weekday = new Array(7);
  weekday[0] = 'Sunday';
  weekday[1] = 'Monday';
  weekday[2] = 'Tuesday';
  weekday[3] = 'Wednesday';
  weekday[4] = 'Thursday';
  weekday[5] = 'Friday';
  weekday[6] = 'Saturday';
  day = weekday[day];

  // Replace 0-11 number of the month with the month's name.
  const months = new Array(12);
  months[0] = 'January';
  months[1] = 'February';
  months[2] = 'March';
  months[3] = 'April';
  months[4] = 'May';
  months[5] = 'June';
  months[6] = 'July';
  months[7] = 'August';
  months[8] = 'September';
  months[9] = 'October';
  months[10] = 'November';
  months[11] = 'December';
  month = months[month];

  return String(day + ', ' + month + ' ' + date + '  ' + year);
}
