const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const playerContainer= document.getElementById('music-player-container');
const title = document.getElementById('title');
const audio= document.getElementById('music');
const image= document.getElementById('album-pic');
const progress = document.getElementById('progress');
const progressConatiner= document.querySelector('div.progress-container');


let songs=['yaaron','in_the_name_of_Love','GOT']
var songIndex=2;
//load song into DOM
loadSong(songs[songIndex]);

function loadSong(song){
    audio.src=`${song}.mp3`;
    title.innerText=`${song}`;
    image.src=`${song}.jpg`
}

//change songs by nextsong and prev songs
function nextSong(){
    songIndex++;
    if(songIndex>songs.length-1){
        songIndex=0;
    }
    loadSong(songs[songIndex]);
    audio.play();
    playerContainer.classList.add('play');
    playBtn.querySelector('i').classList.remove('fa-play');
    playBtn.querySelector('i').classList.add('fa-pause');
}
function prevSong(){
    songIndex--;
    if(songIndex<0){
        songIndex=songs.length-1;
    }
    loadSong(songs[songIndex]);
    audio.play();
    playerContainer.classList.add('play');
    playBtn.querySelector('i').classList.remove('fa-play');
    playBtn.querySelector('i').classList.add('fa-pause');
}
//update progressbar and make it clickable
function updateProgress(){
    progress.style.width= `${(audio.currentTime/audio.duration)*100}%`
}
function setProgress(e){
    const clickPos = e.offsetX;
    const width= this.clientWidth;
    audio.currentTime=(clickPos/width)*audio.duration;
    
}


//event listeners
playBtn.addEventListener('click',()=>{
    const isPlaying = playerContainer.classList.contains('play');
    if (isPlaying) {
        playerContainer.classList.remove('play');
        audio.pause();
        playBtn.querySelector('i').classList.add('fa-play');
        playBtn.querySelector('i').classList.remove('fa-pause');
    } else {
        playerContainer.classList.add('play');
        audio.play();
        playBtn.querySelector('i').classList.remove('fa-play');
        playBtn.querySelector('i').classList.add('fa-pause');
        
    }
});
nextBtn.addEventListener('click',nextSong);
prevBtn.addEventListener('click',prevSong);
audio.addEventListener('timeupdate',updateProgress);
audio.addEventListener('ended',nextSong);
progressConatiner.addEventListener('click',setProgress);