const player = document.querySelector(".player");
const video = document.querySelector("video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.querySelector("#play-btn");
const volumeIcon = document.getElementById("volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const currentTime = document.querySelector(".time-elapsed");
const duration = document.querySelector(".time-duration");
const fullscreenBtn = document.querySelector(".fullscreen");
const speed = document.querySelector(".player-speed");

// Play & Pause ----------------------------------- //

function onLoad() {
  let seconds = Math.floor(video.duration % 60);
  let minutes = Math.floor(video.duration / 60);
  if (minutes < 10 && seconds < 10) {
    duration.innerText = `0${minutes}:0${seconds}`;
  }
  if (minutes < 10) {
    duration.innerText = `0${minutes}:${seconds}`;
  } else if (seconds < 10) {
    duration.innerText = `${minutes}:0${seconds}`;
  } else {
    duration.innerText = `${minutes}:${seconds}`;
  }
}

function togglePlay() {
  if (video.paused) {
    video.play();
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
  } else {
    playBtn.classList.replace("fa-pause", "fa-play");
    playBtn.setAttribute("title", "Play");
    video.pause();
  }
}

// Progress Bar ---------------------------------- //

function displayTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${seconds}`;
}

function updateProgress() {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  currentTime.textContent = `${displayTime(video.currentTime)} /`;
  duration.textContent = `${displayTime(video.duration)}`;
}

// Volume Controls --------------------------- //

function volumeChange(e) {
  const percentage = Math.floor((e.offsetX / e.target.clientWidth) * 10);
  video.volume = percentage * 0.1;
  console.log(percentage);
  volumeBar.style.width = percentage * 10 + "%";
}

function progressBarUpdate(e) {
  const percentage = Math.floor((e.offsetX / e.target.clientWidth) * 100);
  const duration = Math.floor((video.duration * percentage) / 100);
  video.currentTime = duration;

  progressBar.style.width = percentage + "%";
  console.log(e.offsetX);
  console.log(percentage);
  console.log(e.target.clientWidth);
  console.log(e);
}

// Change Playback Speed -------------------- //

function changeSpeed() {
  video.playbackRate = speed.value;
}

// Fullscreen ------------------------------- //

function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullscreen) {
    elem.mozRequestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}

// close fullscreen --------------------------------//
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullscreen) {
    document.mozCancelFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

let fullscreen = false;

// Toggle Fullscreen
function toggleFullscreen() {
  if (!fullscreen) {
    openFullscreen(player);
  } else {
    closeFullscreen();
  }
  fullscreen = !fullscreen;
}

playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("canplay", onLoad);
speed.addEventListener("change", changeSpeed);
fullscreenBtn.addEventListener("click", toggleFullscreen);

let progressMouseDown = false;

progressRange.addEventListener("click", (e) => progressBarUpdate(e));
progressRange.addEventListener("mouseup", (e) => {
  progressMouseDown = false;
});
progressRange.addEventListener("mousemove", (e) => {
  progressMouseDown && progressBarUpdate(e);
});
progressRange.addEventListener("mousedown", (e) => {
  progressMouseDown = true;
  progressMouseDown && progressBarUpdate(e);
});

let mouseDown = false;

volumeRange.addEventListener("mouseup", (e) => {
  mouseDown = false;
});
volumeRange.addEventListener("mousemove", (e) => {
  mouseDown && volumeChange(e);
});
volumeRange.addEventListener("mousedown", (e) => {
  mouseDown = true;
  mouseDown && volumeChange(e);
});
volumeRange.addEventListener("click", (e) => volumeChange(e));
