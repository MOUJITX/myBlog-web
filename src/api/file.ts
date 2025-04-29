import { IFile } from '@/api/types';
import generateUUID from '@/utils/generateUUID';
import request from '@/utils/request';

export const defaultFile: IFile = {
  uuid: generateUUID(),
  file_name: '',
  original_name: '',
  end_name: '',
  type: '',
  size: 0,
  user_agent: '',
  source_url: '',
  download_url: '',
  create_time: '',
  update_time: '',
};

export const getFilesPage = (pageNum: number, pageSize: number) =>
  request.post(`/files/pageSelect?pageNum=${pageNum}&pageSize=${pageSize}`, {});

export const getImagesPage = (
  pageNum: number,
  pageSize: number,
  searchForm?: IFile,
) =>
  request.post(
    `/files/pageSelectImage?pageNum=${pageNum}&pageSize=${pageSize}`,
    searchForm || {},
  );

export const deleteFileAPI = (id: string) => request.delete(`/files/del/${id}`);

export const deleteFilesAPI = (ids: string[]) =>
  request.delete('/files/del/batch', { data: ids });

export const renameFileAPI = (id: string, file_name: string) =>
  request.post(`/files/rename/${id}`, { file_name });
