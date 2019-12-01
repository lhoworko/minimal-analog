import clock from "clock";
import document from "document";
// import { preferences } from "user-settings";
import * as util from "../common/utils";

clock.granularity = "seconds";

let hideSecondHand = false;
if (hideSecondHand) {
  document.getElementById("second-hand").style.display = "none";
}

const foregroundColor = "#dedede";
document.getElementById("marks").style.fill = foregroundColor;
document.getElementById("hands").style.fill = foregroundColor;
document.getElementById("text").style.fill = foregroundColor;
document.getElementById("pin-outer").style.fill = foregroundColor;

const backgroundColor = "#111111";
document.getElementById("background").style.fill = backgroundColor;
document.getElementById("pin-inner").style.fill = backgroundColor;

function hoursToAngle(hours, minutes) {
  return (hours + (minutes / 60)) * 30;
}

function minutesToAngle(minutes, seconds) {
  return (minutes + (seconds / 60)) * 6;
}

function secondsToAngle(seconds) {
  return seconds * 6;
}

function getHexColor(number) {
  // # 255 0 0 -> 255 255 0 -> 0 255 0 -> 0 255 255 -> 0 0 255 -> 255 0 255 -> 255 0 0
  let inRange = number % (255 * 6) / 6;

  switch (inRange) {
    case 0: return "#ff" + util.zeroPad((number % 255).toString(16)) + "00";
    case 1: return "#" + util.zeroPad((255 - (number % 255)).toString(16)) + "ff00";
    case 2: return "#00ff" + util.zeroPad((number % 255).toString(16));
    case 3: return "#00" + util.zeroPad((255 - (number % 255)).toString(16)) + "ff";
    case 4: return "#" + util.zeroPad((number % 255).toString(16)) + "00ff";
    default: return "#ff00" + util.zeroPad((255 - (number % 255)).toString(16));
  }
}

function updateClock(evt) {
  let hours = evt.date.getHours();
  let minutes = evt.date.getMinutes();
  let seconds = evt.date.getSeconds();

  document.getElementById("hour-hand").groupTransform.rotate.angle = hoursToAngle(hours, minutes);
  document.getElementById("minute-hand").groupTransform.rotate.angle = minutesToAngle(minutes, seconds);
  document.getElementById("second-hand").groupTransform.rotate.angle = secondsToAngle(seconds);

  document.getElementById("date").textContent = util.formattedDate(evt.date);
  let unix = parseInt(evt.date.getTime() / 1000).toFixed(0);
  document.getElementById("hour-hand-line").style.fill = getHexColor(unix);
}

clock.ontick = (evt) => updateClock(evt);
