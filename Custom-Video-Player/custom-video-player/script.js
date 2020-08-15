const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");

//Play and Pause

function toggleVideoStatus() {
    // if (video.paused) {
    //     video.play();
    // } else {
    //     video.pause();
    // }

    video.paused ? video.play() : video.pause();
}
//update play/pause icon
function updatePlayIcon() {
    if (video.paused) {
        play.innerHTML = '<i class="fa fa-play">';
    } else {
        play.innerHTML = '<i class="fa fa-pause">';
    }
}
// update progress and time stamp
function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100;
    //get the minutes

    let mins = Math.floor(video.currentTime / 60);
    if (mins < 10) {
        mins = '0' + String(mins);
    }
    let sec = Math.floor(video.currentTime % 60);
    if (sec < 10) {
        sec = '0' + String(sec);
    }

    timestamp.innerHTML = `${mins}:${sec}`;
}

//set video time to progress

function setVideoProgress() {
    video.currentTime = (progress.value * video.duration) / 100;


}

//stop video

function stopVideo() {
    video.currentTime = 0;
    video.pause();
}

// Event listeners

video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);

play.addEventListener("click", toggleVideoStatus);
stop.addEventListener("click", stopVideo);
progress.addEventListener("change", setVideoProgress);