import clock from "clock";
import document from "document";
import * as util from "../common/utils";
import { today } from "user-activity"

var activities = [
  {"image": "icons/steps.png", "method": getSteps },
  {"image": "icons/cals.png", "method": getCalories },
  {"image": "icons/dist.png", "method": getDistance },
  {"image": "icons/active.png", "method": getActiveMins },
];

clock.granularity = "seconds";

let activityIndex = 0;
let activityMethod = null;
setActivity(0);

let container = document.getElementById("container");
container.onclick = function(e) {
  activityIndex = (activityIndex + 1) % activities.length;
  setActivity(activityIndex);
}

function setActivity(index) {
  document.getElementById("activity-image").href = activities[index]["image"];
  activityMethod = activities[index]["method"];
  document.getElementById("activity-value").textContent = activityMethod();
}

function getSteps() {
  return today.adjusted.steps;
}

function getCalories() {
  return today.adjusted.calories;
}

function getDistance() {
  return today.adjusted.distance;
}

function getActiveMins() {
  return today.adjusted.activeMinutes;
}

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
  let inRange = Math.floor(number % (255 * 6) / 255);

  switch (inRange) {
    case 0: return "#ff" + util.zeroPad((number % 255).toString(16)) + "00";
    case 1: return "#" + util.zeroPad((254 - (number % 255)).toString(16)) + "ff00";
    case 2: return "#00ff" + util.zeroPad((number % 255).toString(16));
    case 3: return "#00" + util.zeroPad((254 - (number % 255)).toString(16)) + "ff";
    case 4: return "#" + util.zeroPad((number % 255).toString(16)) + "00ff";
    default: return "#ff00" + util.zeroPad((254 - (number % 255)).toString(16));
  }
}

function updateClock(evt) {
  let hours = evt.date.getHours();
  let minutes = evt.date.getMinutes()
  let seconds = evt.date.getSeconds();

  document.getElementById("hour").groupTransform.rotate.angle = hoursToAngle(hours, minutes);
  document.getElementById("minute").groupTransform.rotate.angle = minutesToAngle(minutes, seconds);
  document.getElementById("second").groupTransform.rotate.angle = secondsToAngle(seconds);

  let unix = parseInt(evt.date.getTime() / 1000).toFixed(0);
  document.getElementById("date").textContent = util.formattedDate(evt.date);
  document.getElementById("activity-value").textContent = activityMethod();

  let coloredElems = document.getElementsByClassName("colored");
  let color = getHexColor(unix);
  coloredElems.forEach(function(elem) {
    elem.style.fill = color;
  });
}

clock.ontick = (evt) => updateClock(evt);
