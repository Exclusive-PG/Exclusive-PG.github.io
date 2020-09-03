import MediaCircle from "./MediaContent.js";
import createElementsPlay from "./createElements.js";
import createPlaylist from "./createPlaylist.js";
import loaderPage from "./effects/loader.js";

const arrayRGB = ["#f50505", "#0054f0", "#05ff16"];
const audioBlock = document.getElementById("audioBlock");
const loadFile = document.getElementById("loadFile");
const fieldNameSong = document.getElementById("name-song");
const volumeSong = document.getElementById("volume");
const sliderDuration = document.getElementById("duration-song");
const PlayListField = document.getElementById("playlist-names");
const PlayListPanel = document.getElementById("playlist-panel");
const errorFile = document.querySelector(".error");
// const progressBarSVG = document.querySelector(".progress-bar");
// const canvas = document.getElementById("canvas");
const fixedLoadSongs = 25;
const timer = 2000;
let isClick = false;
let isPlayList = false;
let context, src, analyser, array;
let currentSong = 0;
let song = new Audio();
let songs = new Array();
let nameSong = new Array();
let WIDTH, HEIGHT, barWidth, barHeight, ctx, bufferLength, x, dataArray;

///// Load current song display
function ResetSong() {

  if (isClick === true) {
    song.src = songs[currentSong];
    fieldNameSong.textContent = nameSong[currentSong];
    fieldNameSong.style.display = "block";
    document.title = nameSong[currentSong];
    song.play();
    showCurrentSongPlaylist();
    updateStateListCount();
  }

}
///////Update state list count songs /////////
const updateStateListCount = () =>{
  let showCurSong;
  showCurSong = currentSong;
  document.querySelector(".count-tracks").innerHTML = `${++showCurSong} / ${
    songs.length
  }`;
}
/////// NEXT btn song ///////////

const NextSong = () => {
  currentSong++;
  currentSong = currentSong === songs.length ? (currentSong = 0) : currentSong;
  ResetSong();
  showCurrentSongPlaylist();
  console.log(currentSong);
};

/////// PREV btn song ///////////

const PrevSong = () => {
  currentSong--;
  currentSong = currentSong < 0 ? songs.length - 1 : currentSong;
  ResetSong();
  showCurrentSongPlaylist();
};

//create to upload music from pc-user

loadFile.addEventListener("change", function () {
  for (let i = 0; i < this.files.length; i++) {
    if (this.files[i].type !== "audio/mpeg") {
      throw new Error(`Inccorect format  the file ${[i + 1]}`);
    } else {
      let src = URL.createObjectURL(this.files[i]);
      let name = this.files[i].name;
      let replace = /.mp3/gi;

      if (i < fixedLoadSongs) {
        if (name.includes(".mp3")) {
          let replacer = name.replace(replace, " ");
          nameSong.push(replacer);
        }
        songs.push(src);
      } else {
        if (!errorFile.classList.contains("error-active")) {
          errorFile.classList.add("error-active");
          document.getElementById("txt-error").textContent =
            "Oops..So many files";
          document.getElementById(
            "description"
          ).textContent = `Files've been uploaded \n${i} / ${this.files.length}`;
          errorFile.addEventListener("click", () => {
            errorFile.classList.remove("error-active"), false;
          });
        }
      }
    }
  }

  delay(timer).then(() => loadMetadata());
  delay(5000).then(() => checkUndefinedDurSong());
});

const delay = (time) => {
  return new Promise((delay) => setTimeout(() => delay(), time));
};

// interval(5000).then (() =>checkUndefinedDurSong());

const loadMetadata = () => {
  let AudioPlaylist = document.querySelectorAll(".audio-material");
  if (AudioPlaylist.length === 0) {
    for (let i = 0; i < songs.length; i++) {
      let newSong = new Audio();
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
        updateStateListCount();
        isPlayList = false;
      }, timer);
    }
  } else if (AudioPlaylist.length > 0) {
    for (let k = AudioPlaylist.length; k < songs.length; k++) {
      let newSong = new Audio();
      newSong.src = songs[k];
      setTimeout(() => {
        createPlaylist(
          "div",
          `audio-material`,
          "class",
          "data-serial-number",
          k,
          ConvertTimeLine(newSong.duration),
          PlayListField,
          nameSong[k],
          "name-song"
        );
        updateStateListCount();
        HandEventPlaylistSong();
      }, timer);
    }
  }
};
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
  delay(2000).then(() => loaderPage());
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
    if (songs.length !== 0 && isClick === true) {
      if (song.paused) {
        NextSong();
        stateSwitchDurPause();
      } else {
        NextSong();
      }
    }
  });
  document.getElementById("button-prev").addEventListener("click", () => {
    if (songs.length !== 0 && isClick === true) {
      if (song.paused) {
        PrevSong();
        stateSwitchDurPause();
      } else {
        PrevSong();
      }
    }
  });
});

const stateSwitchDurPause = () => {
  song.play();
  document.getElementById("button-play").innerHTML =
    "<i class='far fa-play-circle fa-2x'></i>";
  loop();
};

const drawEqulaizerCanvas = () => {
  x = 0;
  dataArray = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(dataArray);
  analyser.fftSize = 1024;
  ctx = canvas.getContext("2d");

  WIDTH = canvas.width;
  HEIGHT = canvas.height;

  barWidth = (WIDTH / bufferLength) * 5.5;
  barHeight;
  x = 0;
  bufferLength = analyser.frequencyBinCount;
  console.log(bufferLength);

  ctx.fillStyle = "#000";

  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i];

    ctx.fillStyle = "rgb(" + 254 + "," + 45 + "," + 56 + ")";
    ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

    x += barWidth + 1;
  }
};

///////////////////////////////////////  Setting Playlist ///////////////////////////////////////
const HandEventPlaylistSong = () => {
  let AudioPlaylist = document.querySelectorAll(".audio-material");
  let counter = 0;
  if (AudioPlaylist.length !== 0) {
    for (let i = 0; i < AudioPlaylist.length; i++) {
      // let data  = AudioPlaylist[i].getAttribute("data-serial-number");
      AudioPlaylist[i].onclick = () => {
        let data = AudioPlaylist[i].getAttribute("data-serial-number");
        if (data !== "" || data !== null) {
          if (isClick === false) {
            currentSong = data;
            song.src = songs[currentSong];
            song.play();
            if (counter === 0) preLoad();
            showCurrentSongPlaylist();
            ++counter;
            console.log(isClick);
            isClick = true;
          } else {
            currentSong = data;
            showCurrentSongPlaylist();
            ResetSong();
            loop();
            console.log(isClick);
          }

          document.getElementById("button-play").innerHTML =
            "<i class='far fa-play-circle fa-2x'></i>";
          console.log(data);
        }
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

const checkUndefinedDurSong = () => {
  let timeSongs = document.querySelectorAll(".time-song");
  for (let i = 0; i < timeSongs.length; i++) {
    if (timeSongs[i].textContent.includes("NaN:NaN") && songs.length !== 0) {
      let newSong = new Audio();
      newSong.src = songs[i];
      setTimeout(() => {
        timeSongs[i].textContent = ConvertTimeLine(newSong.duration);
      }, timer);
    }
  }
};
