import SettingsPlayer from './SettingsPlayer.js';


export default class EngineControllers {



settingsPlayer = new SettingsPlayer();



 _currentIndexTrack = 0;
 _modePlay = null;
_InitAudioContext = null;
_audio = null;

MAX_VALUE_VOLUME = 1; 
MIN_VALUE_VOLUME = 0;
    Init(modePlay,initAudioContext,audio){
        this._audio =  audio;
        initAudioContext !==null ? ( this._InitAudioContext = initAudioContext ) : console.log("Audio Context not found")
        modePlay !== null && (this._modePlay = modePlay);
        this._InitAudioContext();
    
    }

 
    playOrPause(btn,listTracks){
     
     
        
       
      (this._audioStream === null) &&  (this._audioStream = false); 

       console.log(this._audio)
       console.log(typeof this._audio.src)
       this.#setTitle(listTracks);
       
            if(this._audio.paused){
                
               
                //Fixed bug of play or pause song //repeats from the beginning 
                this._audio.src === "" | null  && (this._audio.src = listTracks[this._currentIndexTrack].src);

                this.#PlayAll();
                btn.innerHTML = '<i class="fas fa-pause fa-2x"></i>';
                this._audioStream = true;
                
             
             }else{
                this._audio.pause();
                btn.innerHTML = '<i class="fas fa-play fa-2x"></i>';
                cancelAnimationFrame(this._modePlay);
                this._audioStream = false;

              
             }
             return this._audioStream
            }  




    nextTrack(listTracks){
       this._currentIndexTrack ++
       this._currentIndexTrack = this._currentIndexTrack === listTracks.length ? (this._currentIndexTrack = 0) : this._currentIndexTrack;
       this._audio.src = listTracks[this._currentIndexTrack].src;
       this.#PlayAll();
       this.#setTitle(listTracks);
       console.log(`${this._currentIndexTrack}/${listTracks.length}`)
       
    }





    prevTrack(listTracks){
        this._currentIndexTrack--;
        this._currentIndexTrack = this._currentIndexTrack < 0 ? (this._currentIndexTrack = listTracks.length-1) : this._currentIndexTrack;
        this._audio.src = listTracks[this._currentIndexTrack].src;
        this.#PlayAll();
        this.#setTitle(listTracks);
        console.log(`${this._currentIndexTrack}/${listTracks.length}`)
        
    }

    TrackingEnd(listTracks){
        setInterval(()=>{ 
        console.log("track"); 
        this._audio.ended && this.nextTrack(listTracks);
    },1000)
      
    }



   set setVolume(value){
       if(value > this.MAX_VALUE_VOLUME || value < this.MIN_VALUE_VOLUME) return;
     
        this._audio.volume = value;
      
   }
  #PlayAll(){
    this._audio.play()
    this._modePlay()
  }
  #setTitle(listTracks){
    this.settingsPlayer.setTitleName(document.querySelector(".name_title"),listTracks[this._currentIndexTrack].name);
    this.settingsPlayer.setTitleArtist(document.querySelector(".artist_title"),listTracks[this._currentIndexTrack].artist);
  }
}