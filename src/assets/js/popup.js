const GLEAM_URL = 'http://7c54ad94.ngrok.io/normalize';
const send = async url => { 
    const requestUrl = new URL(GLEAM_URL);
    const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({url})
    });
    return response;

} 

const loading = document.getElementById("loading");
chrome.tabs.query({active: true}, function(tab){
    const dataUrl = {url: tab[0].url};
    try {
        fetch(GLEAM_URL,{
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify(dataUrl)
        })
        .then(r => r.json())
        .then(data => {
            const newUrl = encodeURI(data.url);
            chrome.tabs.create({url: `/src/views/index.html?q=${newUrl}`}, function(tab){
                loading.setAttribute("style", "display: none");
                chrome.browserAction.setPopup({popup: ''});
            });
        })
    } catch(e) {
        console.error(e);
    }
    
})


