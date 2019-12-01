// when the icon gets clicked on, every listener gets started
startListener = () => {
    document.addEventListener("mouseover", onHovered)
    document.addEventListener("mouseout", onHovered)
    document.addEventListener("click", onRemove)
}

// when user hovers over an element, then its background gets an greenish tone
// when user hovers out of the same element, then the background gets setted 
// to default (=transparent) again
onHovered = (e) => {
    const element = e.target
    bgColor = (e.type == "mouseover") ? "#b2dfe0;" : "transparent;"
    
    element.setAttribute("style", "background-color:" + bgColor)
}

// when user clicks on an element, then it gets removed from its parent elements children list
// and therefore from the dom
onRemove = (e) => {
    const parent = e.target.parentNode

    e.preventDefault()
    parent.removeChild(e.target)
}

// when the icon gets clicked off, every listener gets removed
finishListener = () => {
    document.removeEventListener("mouseover", onHovered)
    document.removeEventListener("mouseout", onHovered)
    document.removeEventListener("click", onRemove)
}

// listens to messages from the background script which comes in sync with the same tabId
chrome.runtime.onMessage.addListener((flag, sender, sendResponse) => {
    flag ? startListener() : finishListener()
})