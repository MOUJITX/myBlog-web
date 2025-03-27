import {IIcon, IResume} from "@/api/types";
import generateUUID from "@/utils/generateUUID";
import request from "@/utils/request";

export const defaultIcon: IIcon = {
    icon: "",
    backgroundColor: "#1e90ff",
    iconPadding: true,
    iconType: "round",
    size: 48,
    textColor: "#ffffff"
}

export const defaultResume: IResume = {
    uuid: generateUUID(),
    enabled: true,
    section: "",
    section_name: "",
    section_enabled: true,
    section_order: 0,
    title: "",
    subtitle: "",
    description: "",
    direction: "row",
    min_width: 0,
    max_width: 0,
    icon: defaultIcon,
    ordernum: 0,
    isopen: false,
    create_time: "",
    update_time: ""
}


export const getResumes = () => request.get('/resume/selectAll')

export const getResumesPage = (pageNum: number, pageSize: number, searchForm: IResume) =>
    request.post(`/resume/pageSelect?pageNum=${pageNum}&pageSize=${pageSize}`, searchForm)

export const insetResume = (resume: IResume) => request.post('/resume/add', resume)

export const updateResume = (resume: IResume) => request.put('/resume/update', resume)

export const selectResumeByID = (id: string) => request.get(`/resume/selectById/${id}`)

export const deleteResumeAPI = (id: string) => request.delete(`/resume/del/${id}`)

export const deleteResumesAPI = (ids: string[]) => request.delete('/resume/del/batch', {data: ids})

export const getResumesPublic = () => request.get('/resume/')
