function formattedDate(currentTime) {
  return dayOfWeekText(currentTime.getDay()) + " " + zeroPad(currentTime.getDate());
}

function zeroPad(i) {
  return i < 10 ? "0" + i : i;
}

function dayOfWeekText(d) {
  return ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"][d];
}

export { formattedDate, zeroPad, dayOfWeekText };
