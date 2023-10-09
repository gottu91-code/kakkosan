// document.body.style.backgroundColor = "#6d6d6d"; // デバッグ用

function encloseTextInNode(node, targetText) {
  const walk = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
  while (n = walk.nextNode()) {
    const regex = new RegExp(targetText, 'g');
    if (regex.test(n.nodeValue)) {
      const replacedText = n.nodeValue.replace(regex, `【${targetText}】`);
      n.nodeValue = replacedText;
      console.log('cccccccccc')
    }
  }
  console.log('bbbbbb')
}

function encloseText(targetText) {
  encloseTextInNode(document.body, targetText);
}

chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
    const selectedText = message.data.selectedText;
    const kakkoText = selectedText.replace(selectedText, `【${selectedText}】`);

    console.log(kakkoText)
    console.log('aaaaaaa')
    encloseText(selectedText);
});