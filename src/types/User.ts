export interface ILoginData {
  login: string;
  password: string;
  isNeedToRemember: boolean;
}

export interface IUser {
  profile: IProfile
}

export interface IUserRegisterData extends IUser {
  login: string,
  password: string
}

export interface IProfile {
  name: string,
  surname: string
  email: string,
  birthday: Date
  avatarImage?: string,
  description?: string
  sex: Sex,
}

export enum Sex {
  Male = 'Male',
  Female = 'Female'
}
