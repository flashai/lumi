const GLEAM_URL = 'http://7c54ad94.ngrok.io/normalize';

const send = async url => { 
    const requestUrl = new URL(GLEAM_URL);
    const response = await fetch(requestUrl, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({url})
  });
    console.log(response);
    return response;

} 

chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        if(tabs[0].url && url.includes("watch?v="))
            chrome.browserAction.enable();
            // chrome.browserAction.setIcon('');
        else
            chrome.browserAction.disable();
    });
    try{
        chrome.webNavigation.onHistoryStateUpdated.addListener(function(details){
            chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
                if(tabs[0].url && url.includes("watch?v="))
                    chrome.browserAction.enable();
                else
                    chrome.browserAction.disable();
            });
        })
        }catch(err){
            console.log(err)
        }
})
chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        if(tabs[0].url && url.includes("watch?v="))
            chrome.browserAction.enable();
        else
            chrome.browserAction.disable();
    });
});

chrome.browserAction.onClicked.addListener(async function(tab){    
    chrome.browserAction.setPopup({popup: '/src/views/popup.html'});
    chrome.tabs.executeScript({
        code: "document.getElementsByTagName('video')[0].pause()"
    });
});