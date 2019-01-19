
// chrome.tabs.query({'onUpdated': true, 'lastFocusedWindow': true}, function (tabs) {
//     var url = tabs[0].url;
//     alert(url);
// });    


let found = false;
let textA;

if(found)
    textA = "url"
else
    textA = "nourl"

chrome.runtime.sendMessage({url: textA}, function(response) {
    console.log("Response: ", response);
});