export const Action = {
  insert: '新增',
  update: '编辑',
  copy: '复制',
  delete: '删除',
};

export interface IValueAndLabel {
  value: string;
  label: string;
}

export interface IValueAndText {
  value: string;
  text: string;
}

export interface ResponseAPI {
  code: number;
  message: string;
  data: any;
}

export interface readOnlyData {
  readonly uuid: string;
  readonly create_time?: string;
  readonly update_time?: string;
}

export interface IUser extends readOnlyData {
  username: string;
  nickname?: string;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface IWebsiteSetting extends readOnlyData {
  name: string;
  label: string;
  value: { value: string | boolean | IWebsiteNavigation[] | IWebsiteConcat[] };
  description: string;
  order_num: number;
}

export interface IWebsiteNavigation {
  nav_name: string;
  nav_url: string;
  nav_title: string;
  nav_subtitle: string;
  nav_enabled: boolean;
  nav_banner: string[];
}

export interface IWebsiteConcat {
  cc_icon: string;
  cc_name: string;
  cc_value: string;
  cc_url: string;
}

export interface IArticle extends readOnlyData {
  title?: string; //标题
  description?: string; //描述
  image_url?: string; //封面
  full_content?: string; //全文
  source_url?: string; //来源
  author?: string; //作者
  tags?: string[]; //标签
  tags_name?: string[];
  categories?: string[]; //目录
  categories_name?: string[];
  is_top?: boolean; //是否置顶
  is_original?: boolean; //是否原创
  is_public?: boolean; //是否公开
  is_comment?: boolean; //是否开启评论
  is_link?: boolean;
  is_private?: boolean;
  view_code?: string; //查看密码
}

export interface IArticleByYear {
  year: string;
  articles: IArticle[];
}

export interface IArticleMenu {
  uuid: string;
  level: number;
  title: string | null;
  elementID: string;
}

export interface ITag extends readOnlyData {
  tag: string;
  description?: string;
  banner_image?: string;
  tag_count?: number;
}

export interface ICategory extends readOnlyData {
  category: string;
  description?: string;
  banner_image?: string;
  father_uuid?: string;
  children?: [];
  hasChildren?: boolean;
}

export interface IResumeSection extends readOnlyData {
  enabled: boolean;
  section: string;
  description?: string;
  isrow: boolean;
  ordernum: number;
  min_width: number;
  max_width: number;
  resumes?: IResume[];
}

export interface IResumeSectionSearch {
  enabled?: boolean;
  section?: string;
  description?: string;
  isrow?: boolean;
  ordernum?: number;
}

export interface IIcon {
  size?: number;
  backgroundColor?: string;
  textColor?: string;
  icon: string;
  iconType?: 'circle' | 'round' | 'square';
  iconPadding?: boolean;
}

export interface IResume extends readOnlyData {
  title: string;
  subtitle?: string;
  description?: string;
  icon: IIcon;
  direction: 'row' | 'column';
  min_width: number;
  max_width: number;
  enabled: boolean;
  section: string;
  ordernum: number;
  isopen: boolean;
  section_name: string;
  section_enabled: boolean;
  section_order: number;
}

export interface IFile extends readOnlyData {
  file_name: string;
  original_name: string;
  end_name: string;
  type: string;
  size: number;
  user_agent: string;
  source_url: string;
  download_url: string;
}

export interface IPhotoImage {
  title?: string;
  subtitle?: string;
  description?: string;
  images: string[];
}

export interface IPhoto extends readOnlyData {
  title: string;
  subtitle?: string;
  images: IPhotoImage[];
  index_img: string;
  is_public: boolean;
}
