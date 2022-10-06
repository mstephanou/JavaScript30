// Get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreenButton = player.querySelector('.fullscreen');

// Variables

let mousedown = false;
let isFullScreen = false;

// Build out our functions

function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}
function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
  console.log('Update the button');
}
function skip() {
  console.log('skipping');
  video.currentTime += parseFloat(this.dataset.skip);
}
function handleRangeUpdate() {
  console.log(this.value);
  video[this.name] = this.value;
}
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
function toggleFullScreen() {
  if (!isFullScreen) {
    video.requestFullscreen();
  } else if (isFullScreen) {
    document.exitFullscreen();
  }
}

// event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach((button) => button.addEventListener('click', skip));
ranges.forEach((range) => range.addEventListener('change', handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener('mousemove', handleRangeUpdate)
);
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => {
  mousedown && scrub(e);
});
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));

// Fullscreen event listeners
fullscreenButton.addEventListener('click', toggleFullScreen);
video.addEventListener('fullscreenchange', () => {
  isFullScreen = !isFullScreen;
});
