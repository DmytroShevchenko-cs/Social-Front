import { Sex } from "../User";
import { IBaseModel } from "./BaseModel";

export interface IFriend extends IBaseModel {
    onlineStatus: OnlineStatus;
    profile: ProfileFriendViewModel;
}

export enum OnlineStatus {
    Online = "Online",
    Offline = "Offline"
}


export interface ProfileFriendViewModel {
    name: string;
    surname: string;
    description: string;
    avatarImage: string;
    sex: Sex; 
}

export interface IFriendViewModel {
    data: IFriend[];
    currentPage: number;
    totalItems: number;
    totalDbItems : number;
}