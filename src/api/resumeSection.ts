import { IResumeSection, IResumeSectionSearch } from '@/api/types';
import generateUUID from '@/utils/generateUUID';
import { nowString } from '@/utils/date';
import request from '@/utils/request';

export const defaultResumeSection: IResumeSection = {
  ordernum: 0,
  uuid: generateUUID(),
  enabled: true,
  isrow: false,
  section: nowString('YYYYMMDDHHmmss') + '新建模块',
  description: '',
  min_width: 0,
  max_width: 100,
  create_time: '',
  update_time: '',
};

export const getResumeSections = () => request.get('/resumeSection/selectAll');

export const searchResumeSections = (resumeSection: IResumeSectionSearch) =>
  request.post('/resumeSection/select', resumeSection);

export const insetResumeSection = (resumeSection: IResumeSection) =>
  request.post('/resumeSection/add', resumeSection);

export const updateResumeSection = (resumeSection: IResumeSection) =>
  request.put('/resumeSection/update', resumeSection);

export const updateResumeSectionRange = (oldIndex: number, newIndex: number) =>
  request.post(
    `/resumeSection/updateRange?oldIndex=${oldIndex}&newIndex=${newIndex}`,
    {},
  );

export const selectResumeSectionByID = (id: string) =>
  request.get(`/resumeSection/selectById/${id}`);

export const deleteResumeSectionAPI = (id: string) =>
  request.delete(`/resumeSection/del/${id}`);

export const deleteResumeSectionsAPI = (ids: string[]) =>
  request.delete('/resumeSection/del/batch', { data: ids });
