export function formattedDate(currentTime) {
  let dayOfMonth = currentTime.getDate();
  let dayOfWeek = currentTime.getDay();

  let padded = dayOfMonth < 10 ? "0" + dayOfMonth : dayOfMonth;
  let dow = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"][dayOfWeek].toUpperCase();

  return dow + " " + padded;
}

export function zeroPad(i) {
}

export function dayOfWeekText(d) {
}
