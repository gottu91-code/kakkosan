const encloseText = () => {
  const activeElement = document.activeElement;
  const activeTagName = activeElement.tagName;

  const selection = window.getSelection();

  if(activeTagName === 'TEXTAREA' || activeTagName === 'INPUT') {
    const selectedText = selection.toString();
    activeElement.setRangeText(`【${selectedText}】`)
  } else {
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    const newText = document.createTextNode(`【${selectedText}】`);
    range.deleteContents();
    range.insertNode(newText);
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  encloseText();
});