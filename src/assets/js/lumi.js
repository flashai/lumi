let params = new URLSearchParams(document.location.search.substring(1));
const url = params.get('q');
const video = document.createElement('video');
video.src = url;
video.setAttribute("controls", "controls");
video.autoplay = true;
document.getElementById("video").appendChild(video);
