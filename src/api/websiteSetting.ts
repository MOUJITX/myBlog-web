import request from "@/utils/request";
import {IWebsiteConcat, IWebsiteNavigation, IWebsiteSetting} from "@/api/types";

export const defaultsWebsiteSetting: IWebsiteSetting = {
    uuid: "",
    name: "",
    label: "",
    value: {value: ""},
    description: "",
    order_num: 0,
    create_time: "",
    update_time: "",
}

export const defaultWebsiteNavigation: IWebsiteNavigation = {
    nav_name: "",
    nav_title: "",
    nav_subtitle: "",
    nav_url: "",
    nav_enabled: true,
    nav_banner: []
}

export const defaultWebsiteConcat: IWebsiteConcat = {
    cc_icon: "",
    cc_name: "",
    cc_value: "",
    cc_url: ""
}

export const getWebsiteSetting = () => request.get('/website/')

export const getWebsiteSettingAdmin = () => request.get('/website/selectAll');

export const updateWebsite = (websiteSetting: IWebsiteSetting) => request.put('/website/update', websiteSetting)
