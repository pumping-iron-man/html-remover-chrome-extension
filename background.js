let removeElement = false
const off_icon_path = "images/removeIconOFF_16.png"
const on_icon_path = "images/removeIconON_16.png"

// sets the icon to the default "removeIconOFF"
setDefaultIcon = (tabId) => {
    removeElement = false
    chrome.browserAction.setIcon({path : off_icon_path})

    // if tab gets changed, then remove all listeners
    if(tabId){
        chrome.tabs.sendMessage(tabId, removeElement)
    }
}   

// when tabs get changed, setDefaultIcon is called
chrome.tabs.onActivated.addListener((activeInfo) => setDefaultIcon(activeInfo.tabId))

// when icon button gets clicked, then set icon corresponding to if it has been
// clicked on or off by user and send message to the content script so the 
// remove function gets started or finished
chrome.browserAction.onClicked.addListener((tab) => {
    removeElement = !removeElement
    chrome.browserAction.setIcon({path: removeElement ? on_icon_path : off_icon_path})
    chrome.tabs.sendMessage(tab.id, removeElement)            
})

// when tab is (re-)loaded, then setDefaultIcon is called
// since onUpdated is called at least two times (at loading and at completed), 
// the if clause prevents it from setting the icon multiple times
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) =>{
    status = changeInfo.status 
    if(status !== "loading") {
        return
    }
    setDefaultIcon()
})