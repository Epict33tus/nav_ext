//chrome.action.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  //console.log('Turning ' + tab.url + ' red!');
  //chrome.scripting.executeScript({
    //code: 'document.body.style.backgroundColor="red"'
 // });
//});

const urls = [
  "https://www.coindesk.com/",
  "https://www.cnn.com/",
  "https://www.reuters.com/technology/nft-sales-surge-107-bln-q3-crypto-asset-frenzy-hits-new-highs-2021-10-04/",
  "https://medium.com/"
]

const code = `
 window.location.reload();
`

const run = async () => {
  const tab = await chrome.tabs.create({
    url: 'https://google.com/'
  })
  console.log({ tab })
  let i = 0
  const interval = setInterval(() => {
    // chrome.tabs.query({ active: true }, ([tab]) => {
      i++
      if (i === urls.length) i = 0
      console.log({ tab })
      chrome.tabs.update(tab.id, { url: urls[i] })
      console.log('trying to execute script')
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content-script.js']
      })
      console.log('after attempt to execute script')
      chrome.tabs.onUpdated.addListener(() => {
        chrome.storage.sync.set({ now: Date.now() })
      })
      //chrome.tabs.executeScript(tab.id, { code: `window.location.assign('${urls[i]}')` }, () => {
       // console.log('script injected...')
      //})
    // })
  }, 5000)

}

chrome.runtime.onInstalled.addListener(run)
chrome.runtime.onStartup.addListener(run)
