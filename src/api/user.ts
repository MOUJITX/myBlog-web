import { ILogin, IUser } from '@/api/types';
import generateUUID from '@/utils/generateUUID';
import request from '@/utils/request';

export const userDefault: IUser = {
  uuid: generateUUID(),
  username: '',
  nickname: '',
};

export const loginDefault: ILogin = {
  username: '',
  password: '',
};

export const loginAdmin = (params: ILogin) =>
  request.post('/user/login', params);
