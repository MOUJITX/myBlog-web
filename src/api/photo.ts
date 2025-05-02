import { IPhoto, IPhotoImage } from '@/api/types';
import request from '@/utils/request';

export const defaultPhotoImage: IPhotoImage = {
  title: '',
  subtitle: '',
  images: [],
  description: '',
};
export const defaultPhoto: IPhoto = {
  uuid: '',
  title: '',
  subtitle: '',
  index_img: '',
  images: [],
  is_public: false,
  create_time: '',
  update_time: '',
};

export const getPhotoList = (pageNum: number, pageSize: number) =>
  request.post(`/photo/list?pageNum=${pageNum}&pageSize=${pageSize}`, {});

export const getPhotoPage = (pageNum: number, pageSize: number) =>
  request.post(`/photo/pageSelect?pageNum=${pageNum}&pageSize=${pageSize}`, {});

export const insetPhoto = (photo: IPhoto) => request.post('/photo/add', photo);

export const updatePhoto = (photo: IPhoto) =>
  request.put('/photo/update', photo);

export const selectPhotoByID = (id: string) =>
  request.get(`/photo/selectById/${id}`);

export const deletePhotoAPI = (id: string) =>
  request.delete(`/photo/del/${id}`);

export const deletePhotosAPI = (ids: string[]) =>
  request.delete('/photo/del/batch', { data: ids });
