export const htmlToImgList = (html?: string) => {
  if (!html) return [];

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // 查找所有的<img>标签
  const imgTags = doc.getElementsByTagName('img');

  // 提取<img>标签的src属性
  const imgList = [];
  for (let i = 0; i < imgTags.length; i++) {
    const imgSrc = imgTags[i].getAttribute('src');
    imgSrc && imgList.push(imgSrc);
  }

  return imgList;
};
