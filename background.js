chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'enclose',
    title: 'かっこで囲う',
    contexts: ['selection'],
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  console.log('info: ', info)
  console.log('tab: ', tab)

  const selectedText = info.selectionText;

  if (tab !== undefined) {
    switch (info.menuItemId) {
      case 'enclose':
        chrome.tabs.sendMessage(tab.id, {
          type: 'SHOW',
          data: {
            selectedText
          },
        });
        break;
    }
  }
});