import {IArticle, IArticleByYear} from "@/api/types";
import generateUUID from "@/utils/generateUUID";
import request from "@/utils/request";

export const defaultArticle: IArticle = {
    uuid: generateUUID(),
    create_time: "",
    update_time: "",
    title: "",
    description: "",
    image_url: "",
    full_content: "",
    author: localStorage.getItem("nickname") || "",
    categories: [''],
    categories_name: [],
    tags: [],
    tags_name: [],
    is_comment: true,
    is_original: false,
    is_public: false,
    is_top: false,
    is_link: false,
    is_private: false,
    source_url: "",
    view_code: "",
}

export const defaultSearchArticle: IArticle = {
    uuid: generateUUID(),
    create_time: "",
    update_time: "",
    title: "",
    description: "",
    image_url: "",
    full_content: "",
    author: localStorage.getItem("nickname") || "",
    categories: [''],
    tags: [''],
    is_comment: true,
    is_original: true,
    is_public: false,
    is_top: false,
    is_link: false,
    is_private: false,
    source_url: "",
    view_code: "",
}

export const defaultYearArticle: IArticleByYear = {
    year: '',
    articles: []
}

export const getArticles = () => request.get('/article/selectAll')

export const getArticlesPage = (pageNum: number, pageSize: number, article: IArticle) =>
    request.post(`/article/pageSelect?pageNum=${pageNum}&pageSize=${pageSize}`, article)


export const getArticlesList = (pageNum: number, pageSize: number, article: IArticle) =>
    request.post(`/article/page?pageNum=${pageNum}&pageSize=${pageSize}`, article)

export const insetArticle = (article: IArticle) => request.post('/article/add', article)

export const updateArticle = (article: IArticle) => request.put('/article/update', article)

export const selectArticleByID = (id: string) => request.get(`/article/selectById/${id}`)

export const deleteArticleAPI = (id: string) => request.delete(`/article/del/${id}`)

export const deleteArticlesAPI = (ids: string[]) => request.delete('/article/del/batch', {data: ids})

export const getArticleByUUID = (id: string) => request.get(`/article/selectById/${id}`)

export const uploadImageByURL = (urlPath: string) => request.get(`/files/upload/imageURL?url=${urlPath}`)
