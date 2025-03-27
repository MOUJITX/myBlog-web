import generateUUID from "@/utils/generateUUID";
import {IArticleMenu} from "@/api/types";

const extractTitles = (htmlString: string): IArticleMenu[] => {
    // 使用DOMParser解析HTML字符串
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    // 初始化一个数组来存储结果
    const titles: IArticleMenu[] = [];

    // 定义标题标签
    const titleTags = ["H1", "H2", "H3", "H4", "H5", "H6"];

    // 递归函数来遍历DOM节点
    const traverseNodes = (node: Node): void => {
        // 遍历所有子节点
        node.childNodes.forEach(child => {
            // 如果是元素节点并且是我们关心的标题标签
            if (child.nodeType === Node.ELEMENT_NODE && titleTags.includes(child.nodeName)) {
                titles.push({
                    uuid: generateUUID(), // 假设generateUUID是已定义的函数
                    level: Number(child.nodeName.substring(1)),
                    title: child.textContent, // 添加trim以防文本内容前后有空格
                    elementID: (child as HTMLElement).id
                });
            }
            // 递归遍历子节点的子节点
            if (child.hasChildNodes()) {
                traverseNodes(child);
            }
        });
    };

    // 从body标签开始遍历
    const body = doc.body;
    if (body) {
        traverseNodes(body);
    }

    return titles;
};

export default extractTitles;
