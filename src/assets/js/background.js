chrome.runtime.onInstalled.addListener(function() {
    alert('open')
  });

const GLEAM_URL = 'http://894b28f5.ngrok.io/normalize';
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

//   chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//     var url = message.url
//     if(url == 'nourl')
//         chrome.browserAction.disable();
//     else
//         chrome.browserAction.enable();

//     sendResponse("Gotcha!");
// });

// chrome.tabs.onUpdated.addListener(listenForChange);
// function listenForChange (tabId, changeInfo, tab) {
//     if(changeInfo.status == 'complete' && tab.status == 'complete' && tab.url != undefined && tab.url.includes("watch")){
//     console.log(tab.url);
//     chrome.browserAction.enable();
// }
// else
//     chrome.browserAction.disable();
// }
chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        var url = tabs[0].url;
        if(url.includes("watch")){
            chrome.browserAction.enable();
            chrome.browserAction.setIcon({path:"../images/active.png"});
        }
        else
            chrome.browserAction.disable();
    });
    try{
        chrome.webNavigation.onHistoryStateUpdated.addListener(function(details){
            chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
                var url = tabs[0].url;
                if(url.includes("watch")){
                    chrome.browserAction.enable();
                    chrome.browserAction.setIcon({path:"../images/active.png"});
                }
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
        var url = tabs[0].url;
        if(url.includes("watch")){
            chrome.browserAction.enable();
            chrome.browserAction.setIcon({path:"../images/active.png"});
        }
        else{
            chrome.browserAction.disable();
        }
    });
});

chrome.browserAction.onClicked.addListener(async function(tab){
    alert(tab.url)
    try {
        let data = {url:tab.url}
        fetch(GLEAM_URL,{
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify(data)
        }).then(r => {
            return r.json();
        }).then(data => {
            console.log(data);
            let {url} = data;
            chrome.tabs.create({url});  
        })
        } catch(e) {
        console.error(e);
        }
    // try {
    //     const response = await send(tab.url);
    //     console.log(response);
    //     } catch(e) {
    //     console.error(e);
    //     }
});