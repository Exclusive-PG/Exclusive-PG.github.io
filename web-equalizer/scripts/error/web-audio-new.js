import MediaCircle from "./MediaContent.js";
import createElementsPlay from "./createElements.js";
import createPlaylist from "./createPlaylist.js";

const arrayRGB = ["#f50505", "#0054f0", "#05ff16"];
const audioBlock = document.getElementById("audioBlock");
const loadFile = document.getElementById("loadFile");
const fieldNameSong = document.getElementById("name-song");
const volumeSong = document.getElementById("volume");
const sliderDuration = document.getElementById("duration-song");
const dataSongs = document.getElementById("data-songs");
const btnPlaySVG = document.querySelector(".btn-play");
const PlayListField = document.getElementById("playlist-names");
const PlayListPanel = document.getElementById("playlist-panel");
const btnClosePlayList = document.getElementById("btn-close-playlist");
const loader = document.getElementById("loader");
// const progressBarSVG = document.querySelector(".progress-bar");
// const canvas = document.getElementById("canvas");

const timer = 2000;
let isClick = false;
let context, src, analyser, array;
let currentSong = 0;
let song = new Audio();
let newSong = new Audio();
let songs = new Array();
let nameSong = new Array();
let durSong = new Array();
let WIDTH, HEIGHT, barWidth, barHeight, ctx, bufferLength, x, dataArray;

PlayListField.addEventListener("load", loadMusic());
function ResetSong() {
  let showCurSong;
  if (isClick === true) {
    song.src = songs[currentSong];
    fieldNameSong.textContent = nameSong[currentSong];
    fieldNameSong.style.display = "block";
    document.title = nameSong[currentSong];
    showCurSong = currentSong;
    song.play();
  }
  document.querySelector(".count-tracks").innerHTML = `${++showCurSong} / ${
    songs.length
  }`;
}
const NextSong = () => {
  currentSong++;
  currentSong = currentSong === songs.length ? (currentSong = 0) : currentSong;
  ResetSong();
  showCurrentSongPlaylist();
  console.log(currentSong);
};
const PrevSong = () => {
  currentSong--;
  currentSong = currentSong < 0 ? songs.length - 1 : currentSong;
  ResetSong();
  showCurrentSongPlaylist();
};
//create to upload music from pc-user
let counter = 0;
loadFile.addEventListener("change", async function (e) {
  for (let i = 0; i < this.files.length; i++) {
    if (this.files[i].type !== "audio/mpeg") {
      throw new Error(`Inccorect format  the file ${[i + 1]}`);
    } else {
      let src = URL.createObjectURL(this.files[i]);
      let name = this.files[i].name;
      let replace = /.mp3/gi;
      let replacer;
      // if (i < 30) {
      if (name.includes(".mp3")) {
        replacer = name.replace(replace, " ");
        nameSong.push(replacer);
      }
      songs.push(src);
    }
  }

  counter++;
  console.log(durSong);
  console.log(songs);
  console.log(nameSong);
});

song.addEventListener("loadedmetadata", async () => {
  let AudioPlaylist = document.querySelectorAll(".audio-material");
  if (AudioPlaylist.length === 0) {
    for (let i = 0; i < songs.length; i++) {
      newSong.src = songs[i];
      setTimeout(() => {
        createPlaylist(
          "div",
          `audio-material`,
          "class",
          "data-serial-number",
          i,
          ConvertTimeLine(newSong.duration),
          PlayListField,
          nameSong[i],
          "name-song"
        );

        HandEventPlaylistSong();
      }, timer);
    }
  }

});
////Create duration field
const CreateFieldDur = () => {
  const FieldDur = document.getElementById("dur");
  createElementsPlay("duration-audio", FieldDur, "", "span");
};
////Create current time field
const CreateFieldCurrentTime = () => {
  const FieldDur = document.getElementById("cur");
  createElementsPlay("current-time-audio", FieldDur, "", "span");
};

//// Update and switch next song if ended
function UpdateSongSlider() {
  if (songs.length !== 0 && isClick === true) {
    document.getElementById("duration-audio").textContent = ConvertTimeLine(
      song.duration
    );
  } else {
    document.getElementById("duration-audio").textContent = "00:00";
  }
  showDurationSong();
  songSlider();
  if (song.ended) {
    NextSong();
    loop();
  }
}
////
//////Convert time line and show full duration song
////
const ConvertTimeLine = (time) => {
  let minutes = Math.floor(time / 60);
  let sec = Math.floor(time % 60);
  minutes = minutes < 10 ? "0" + minutes : minutes;
  sec = sec < 10 ? "0" + sec : sec;
  return `${minutes}:${sec}`;
};
///////
///show max value slider on page
///////
const showDurationSong = () => {
  let duration = Math.floor(song.duration);
  sliderDuration.setAttribute("max", duration);
  return duration;
};
///////
/// control slider song
//////

const songSlider = () => {
  let lineTime = Math.floor(song.currentTime);
  sliderDuration.value = lineTime;
  // circleProgressBar(lineTime, song.duration);
  document.getElementById("current-time-audio").textContent = ConvertTimeLine(
    lineTime
  );
};
sliderDuration.addEventListener("change", () => {
  song.currentTime = sliderDuration.value;
});

setInterval(() => {
  UpdateSongSlider();
  // canvas.width = window.innerWidth;
  // canvas.height = window.innerHeight;
}, 1000);
function preLoad() {
  try {
    context = new AudioContext();
    src = context.createMediaElementSource(song);
    analyser = context.createAnalyser();

    // canvas.width = window.innerWidth;
    // canvas.height = 128;

    src.connect(analyser);
    analyser.connect(context.destination);

    loop();
  } catch {
    fieldNameSong.textContent = "Your browser doesn't WEB-AUDIO API";
    throw new Error("Your browser doesn't WEB-AUDIO API");
  }
}

function loop() {
  //console.log(array);

  if (!song.paused) {
    window.requestAnimationFrame(loop);
  }
  //  drawEqulaizerCanvas();
  array = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(array);

  const DefaultFrequency = array[40];
  const mainCicle = document.getElementById("circleMusic");
  const highCircle = document.getElementById("high-frequency-circle");
  const lowCircle = document.getElementById("low-frequency-circle");
  mainCicle.style.height = document.getElementById("circleMusic").style.width =
    DefaultFrequency * 1.3 + "px";
  highCircle.style.height = highCircle.style.width =
    Math.max(...array) * 1.3 + "px";
  lowCircle.style.height = lowCircle.style.width = DefaultFrequency / 2 + "px";
  highCircle.style.border = DefaultFrequency / 35 + `px dashed #0054f0`;
  highCircle.style.animationPlayState = "running";

  // drawEqulaizerCanvas();
}

setInterval(() => {
  let indexRGB = Math.floor(Math.random() * arrayRGB.length);
  document.getElementById("circleMusic").style.backgroundColor =
    arrayRGB[indexRGB];
  document.getElementById("circleMusic").style.boxShadow =
    " 0 0 25px " + arrayRGB[indexRGB];
}, 5000);

volumeSong.addEventListener("input", () => {
  const spanContainerVolume = document.getElementById("volume-music");

  volumeSong.setAttribute("max", 1);
  volumeSong.setAttribute("step", 0.01);
  song.volume = volumeSong.value;
  if (song.volume === 0) {
    spanContainerVolume.innerHTML = "<i class='fas fa-volume-mute'></i>";
  } else {
    spanContainerVolume.innerHTML = "<i class='fas fa-volume-up'>";
  }
  console.log(song.volume);
});
window.addEventListener("load", () => {
  CreateFieldDur();
  CreateFieldCurrentTime();
  UpdateSongSlider();

  ///Create Circle Music #1
  createElementsPlay("circleMusic", audioBlock, "", "div");
  ///Create Circle Music #2
  createElementsPlay("high-frequency-circle", audioBlock, "", "div");
  ///Create Circle Music #3
  createElementsPlay("low-frequency-circle", audioBlock, "", "div");

  ///Create Button PrevSong
  createElementsPlay(
    "button-prev",
    document.getElementById("buttons-control"),
    "<i class='fas fa-arrow-circle-left fa-2x'></i>",
    "span"
  );

  ////Create Button Play
  createElementsPlay(
    "button-play",
    document.getElementById("buttons-control"),
    "<i class='fas fa-power-off fa-2x'></i>",
    "span"
  );
  ////Create Button NextSong
  createElementsPlay(
    "button-next",
    document.getElementById("buttons-control"),
    "<i class='fas fa-arrow-circle-right fa-2x'></i>",
    "span"
  );

  const circleSound = new MediaCircle({
    selector: "circleMusic",
    sizeCircle: 100,
    backColor: "#f50505",
    borderRadius: 50,
  });
  const HighFrequency = new MediaCircle({
    selector: "high-frequency-circle",
    sizeCircle: 200,
    backColor: "rgba(255, 255, 255,0)", //F4A233
    borderRadius: 50,
  });
  const LowFrequency = new MediaCircle({
    selector: "low-frequency-circle",
    sizeCircle: 50,
    backColor: "#fff",
    borderRadius: 50,
  });
  document.getElementById("button-play").addEventListener("click", () => {
    if (songs.length !== 0) {
      if (!context) {
        isClick = true;
        ResetSong();
        preLoad();
      }
      if (song.paused) {
        song.play();
        document.getElementById("button-play").innerHTML =
          "<i class='far fa-play-circle fa-2x'></i>";
        setTimeout(() => showCurrentSongPlaylist(), 1000);
        loop();
      } else {
        song.pause();
        document.getElementById("button-play").innerHTML =
          "<i class='far fa-pause-circle fa-2x'></i>";
        loop();
      }
    }
  });
  document.getElementById("button-next").addEventListener("click", () => {
    if (song.paused) {
      NextSong();
      stateSwitchDurPause();
    } else {
      NextSong();
    }
  });
  document.getElementById("button-prev").addEventListener("click", () => {
    if (song.paused) {
      PrevSong();
      stateSwitchDurPause();
    } else {
      PrevSong();
    }
  });
});

const stateSwitchDurPause = () => {
  song.play();
  document.getElementById("button-play").innerHTML =
    "<i class='far fa-play-circle fa-2x'></i>";
  loop();
};

// const drawEqulaizerCanvas = () => {
//   x = 0;
//   dataArray = new Uint8Array(analyser.frequencyBinCount);
//   analyser.getByteFrequencyData(dataArray);
//   analyser.fftSize = 1024;
//   ctx = canvas.getContext("2d");

//   WIDTH = canvas.width;
//   HEIGHT = canvas.height;

//   barWidth = (WIDTH / bufferLength) * 5.5;
//   barHeight;
//   x = 0;
//   bufferLength = analyser.frequencyBinCount;
//   console.log(bufferLength);

//   ctx.fillStyle = "#000";

//   ctx.fillRect(0, 0, WIDTH, HEIGHT);

//   for (let i = 0; i < bufferLength; i++) {
//     barHeight = dataArray[i];

//     ctx.fillStyle = "rgb(" + 254 + "," + 45 + "," + 56 + ")";
//     ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

//     x += barWidth + 1;
//   }
//};

const HandEventPlaylistSong = () => {
  let AudioPlaylist = document.querySelectorAll(".audio-material");
  if (AudioPlaylist.length !== 0) {
    for (let i = 0; i < AudioPlaylist.length; i++) {
      // let data  = AudioPlaylist[i].getAttribute("data-serial-number");
      AudioPlaylist[i].onclick = function () {
        let data = AudioPlaylist[i].getAttribute("data-serial-number");
        if (data !== "" || data !== null) {
          currentSong = data;
          showCurrentSongPlaylist();
          ResetSong();
          loop();
          document.getElementById("button-play").innerHTML =
            "<i class='far fa-play-circle fa-2x'></i>";
        }
        console.log(data);
      };
    }
  }
};

const showCurrentSongPlaylist = () => {
  let AudioPlaylist = document.querySelectorAll(".audio-material");

  for (let i = 0; i < AudioPlaylist.length; i++) {
    let data = AudioPlaylist[i].getAttribute("data-serial-number");
    if (currentSong == data) {
      AudioPlaylist[i].classList.add("active-song");
    } else {
      AudioPlaylist[i].classList.remove("active-song");
    }
  }
};

const CheckDuration = () => {
  let timeSong = document.querySelectorAll(".time-song");
  for (let i = 0; i < timeSong.length; i++) {
    if (timeSong[i].textContent === "NaN:NaN") {
      timeSong[i].textContent = "00:00";
    }
  }
};
setInterval(() => {
  CheckDuration();
}, 5000);


// showCurrentSongPlaylist();

// btnPlaySVG.addEventListener("click",()=>{
//   if (song.paused) {
//     song.play();
//     btnPlaySVG.innerHTML =
//       "<i class='far fa-play-circle fa-2x'></i>";
//     loop();
//   } else {
//     song.pause();
//     btnPlaySVG.innerHTML =
//       "<i class='far fa-pause-circle fa-2x'></i>";
//     loop();
//   }
// })
// const circleProgressBar = (percent, durSong) => {
//   const circle = document.querySelector(".progress-bar-circle");
//   const radius = circle.r.baseVal.value;
//   const circumFerence = 2 * Math.PI * radius;

//   const offset = circumFerence - (percent / durSong) * circumFerence;
//   circle.style.strokeDasharray = `${circumFerence} ${circumFerence}`;
//   circle.style.strokeDashoffset = offset;
// };
