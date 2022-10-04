export interface IData<T> {
  data: T;
  setData: Function;
}

export interface IObj<TValue> {
  [id: string]: TValue;
}

export interface IDaoUserData {
  dao_id: number;
  followers: number[];
  following: number[];
  id: number;
  level: number;
  name: string;
  social_links: any;
  user_id: number;
  xp: number;
  bio: string;
  profile_img_url: string;
}

export interface IDaoUserRes {
  data: IDaoUserData;
}

export interface IEditUser {
  name: string;
  profile_img_url: string;
  bio: string;
  level?: number;
  xp?: number;
  social_links: any;
}

interface ITokenAmount {
  [token: string]: number;
}

export interface ITokenCheckResponse {
  totalTokens: number;
  totalFree: number;
  totalStaked: number;
  totalVested: number;
  free: ITokenAmount;
  staked: ITokenAmount;
  vested: ITokenAmount;
}
