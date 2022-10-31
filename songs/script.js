let $ = document
const image = $.getElementById("cover")

const title = $.getElementById("title")

const artist = $.getElementById("artist")

const download = $.getElementById("download")

const music = $.querySelector("audio")

const currentTimeEl = $.getElementById("current-time")

const durationEl = $.getElementById("duration")

const progress = $.getElementById("progress")

const progressContainer = $.getElementById("progress-container")

const prevBtn = $.getElementById("prev")

const playBtn = $.getElementById("play")

const nextBtn = $.getElementById("next")

const background = $.getElementById("background")

const songs = [
	{path:"https://cdn.glitch.global/bf6ff2bc-dabf-410f-bdd1-bfe7a473fe1b/Anbeh.mp3?v=1667202060264",musicName:"Anbeh",artist:"Xonyagar",cover:"Anbeh.svg"},
	{path:"https://cdn.glitch.global/bf6ff2bc-dabf-410f-bdd1-bfe7a473fe1b/hadise-ma.mp3?v=1660230354292",musicName:"Hadise Ma",artist:"Xonyagar",cover:"Hadise Ma.svg"},
	{path:"https://cdn.glitch.global/bf6ff2bc-dabf-410f-bdd1-bfe7a473fe1b/pir.mp3?v=1660322909063",musicName:"Lotfe Sheykh",artist:"Xonyagar",cover:"Lotfe Sheykh.svg"},
	{path:"https://cdn.glitch.global/bf6ff2bc-dabf-410f-bdd1-bfe7a473fe1b/sang.mp3?v=1660230355160",musicName:"Sang Laàl Shavad",artist:"Xonyagar",cover:"Sang Laàl Shavad.svg"},
	{path:"https://cdn.glitch.global/bf6ff2bc-dabf-410f-bdd1-bfe7a473fe1b/Jari.mp3?v=1667201810639",musicName:"Jari",artist:"Xonyagar",cover:"Jari.svg"},
	{path:"https://cdn.glitch.global/bf6ff2bc-dabf-410f-bdd1-bfe7a473fe1b/harifan.mp3?v=1660322911388",musicName:"Harifan",artist:"Xonyagar",cover:"Harifan.svg"}
]

let isLoading = false

function playSong(){
	isLoading = true
	playBtn.classList.replace("fa-play", "fa-pause");
	playBtn.setAttribute("title", "Pause");
	music.play()
}

function pauseSong(){
	isLoading = false
	playBtn.classList.replace("fa-pause", "fa-play");
  	playBtn.setAttribute("title", "Play");
	music.pause()
}


function playToggle(){
	if (isLoading) {
		pauseSong()
	} else {
		playSong()
	}
}
function download_me(){
	if($.getElementById('notify').textContent != ''){
		$.getElementById('notify').textContent = '';
	}
	else{
		$.getElementById('notify').textContent = 'به زودی امکان دانلود فراهم خواهد شد. اگه نشد، ایمیل دهید!';
	}
}

function loadSongs(song){
	title.innerHTML = song.musicName
	artist.innerHTML = song.artist
	music.src = song.path
	changeCover(song.cover)
}

function changeCover(cover) {
	image.classList.remove("active");
	setTimeout(function(){
		image.src = cover
		image.classList.add("active");
	},100)
	background.src = cover
}

let songIndex = 0

function prevSong(){
	songIndex--
	if(songIndex < 0) {
		songIndex = 2
	}
	loadSongs(songs[songIndex])
	playSong()
}

function nextSong(){
	songIndex++
	if(songIndex > songs.length - 1) {
		songIndex = 0
	}
	loadSongs(songs[songIndex])
	playSong()
}

loadSongs(songs[songIndex])


function updateProgressBar(){
	if(isLoading){
		const duration = music.duration
	let currentTime = music.currentTime
	let progressPercent = (currentTime / duration) * 100
	progress.style.width = progressPercent + "%"
	const durationMinutes = Math.floor(duration / 60)
	let durationSeconds = Math.floor(duration % 60)
	if (durationSeconds < 10){
		durationSeconds = "0" + durationSeconds
	}
	if (durationSeconds){
		durationEl.innerHTML = durationMinutes + ":" + durationSeconds
	}
	const currentMinutes = Math.floor(currentTime / 60)
	let currentSeconds = Math.floor(currentTime % 60)
	if (currentSeconds < 10) {
		currentSeconds = "0" + currentSeconds
	}
	currentTimeEl.innerHTML = currentMinutes + ":" + currentSeconds
	}
}

function setProgressBar(e) {
	const width = this.clientWidth;
  	const clickX = e.offsetX;
  	const duration = music.duration;
  	music.currentTime = (clickX / width) * duration;
}

playBtn.addEventListener("click",playToggle)
prevBtn.addEventListener("click",prevSong)
download.addEventListener("click",download_me)
nextBtn.addEventListener("click",nextSong)
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);


