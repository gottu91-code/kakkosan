chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading') {
    const url = tab.url;

    chrome.contextMenus.remove('enclose', () => {
      const lastError = chrome.runtime.lastError;
      if (lastError) {
        console.log(lastError);
      }

      if (url.startsWith('http:') || url.startsWith('https:')) {
        chrome.contextMenus.create({
          id: 'enclose',
          title: 'かっこで囲う',
          contexts: ['selection'],
          documentUrlPatterns: ['http://*/*', 'https://*/*']
        });
      }
    });
  }
});


chrome.contextMenus.onClicked.addListener(async (info, tabInfo) => {
  console.log(info)
  console.log(tabInfo)

  const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
  await chrome.tabs.sendMessage(tab.id, {});
});