import {ITag} from "@/api/types";
import generateUUID from "@/utils/generateUUID";
import request from "@/utils/request";

export const defaultTag: ITag = {
    uuid: generateUUID(),
    tag: "",
    tag_count: 0,
    description: "",
    banner_image: "",
    create_time: "",
    update_time: ""
}

export const getTags = () => request.get('/tag/')

export const getTagsPage = (pageNum: number, pageSize: number) =>
    request.post(`/tag/pageSelect?pageNum=${pageNum}&pageSize=${pageSize}`, {})

export const insetTag = (tag: ITag) => request.post('/tag/add', tag)

export const updateTag = (tag: ITag) => request.put('/tag/update', tag)

export const selectTagByID = (id: string) => request.get(`/tag/selectById/${id}`)

export const deleteTagAPI = (id: string) => request.delete(`/tag/del/${id}`)

export const deleteTagsAPI = (ids: string[]) => request.delete('/tag/del/batch', {data: ids})
