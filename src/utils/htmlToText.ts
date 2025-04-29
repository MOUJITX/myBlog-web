// const htmlToText = (html: string) => {
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(html, 'text/html');
//     const childNode: HTMLCollectionOf<HTMLElement> =  doc.getElementsByTagNameNS('http://www.w3.org/1999/xhtml','body');
//     return childNode[0].innerText.replace(/\r\n/g,"").replace(/\n/g,"").substring(0,254);
// }
//
// export default htmlToText;

const htmlToText = (html: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const traverseNode = (node: Node): string => {
    let text = '';

    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element; // 类型断言为 Element
      if (element.tagName.toLowerCase() === 'img') {
        const altText = element.getAttribute('alt') || '图片';
        text = altText;
      } else {
        // 递归遍历子节点
        Array.from(element.childNodes).forEach(childNode => {
          text += traverseNode(childNode);
        });
      }
    } else if (node.nodeType === Node.TEXT_NODE) {
      text = node.textContent || '';
    }

    // 忽略其他类型的节点，如注释节点

    return text;
  };

  const bodyText = traverseNode(doc.body);

  // 清理文本并截取前254个字符
  return bodyText.replace(/\s+/g, ' ').trim().substring(0, 254);
};

export default htmlToText;
