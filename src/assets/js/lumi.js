chrome.runtime.sendMessage({action: "getUrl"}, function(response){
    console.log(response);
    const { url } = response
    const video = document.createElement('video');
    video.src = url;
    video.setAttribute("controls", "controls");
    document.getElementById("video").appendChild(video);
})