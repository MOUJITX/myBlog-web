import generateUUID from "@/utils/generateUUID";
import request from "@/utils/request";
import {ICategory} from "@/api/types";

export const defaultCategory: ICategory = {
    uuid: generateUUID(),
    category: "",
    description: "",
    banner_image: "",
    father_uuid: "root",
    create_time: "",
    update_time: ""
}

export const rootCategory: ICategory = {
    uuid: generateUUID(),
    category: "根目录",
    father_uuid: "root",
    children: [],
    hasChildren: true
}

export const getCategories = () => request.get('/category/')

export const getCategoriesPage = (pageNum: number, pageSize: number, father_uuid: string) =>
    request.post(`/category/pageSelect?pageNum=${pageNum}&pageSize=${pageSize}&father=${father_uuid}`, {})

export const insetCategory = (category: ICategory) => request.post('/category/add', category)

export const updateCategory = (category: ICategory) => request.put('/category/update', category)

export const selectCategoryByID = (id: string) => request.get(`/category/selectById/${id}`)

export const deleteCategoryAPI = (id: string) => request.delete(`/category/del/${id}`)

export const deleteCategoriesAPI = (ids: string[]) => request.delete('/category/del/batch', {data: ids})
