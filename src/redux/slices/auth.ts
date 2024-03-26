import { createSlice } from "@reduxjs/toolkit";
import { IReduxAuthModel } from "../../types/Redux"
import { IAuthInformation } from "../../types/AuthInfo"
import { getValue, setValue, removItem } from "../../Helpers/LocalStorageHelper"
import { AccessKey, RefreshToken } from '../../Helpers/Сonstants'
import { IsNullOrEmpty } from "../../Helpers/StringHelper";

const accessKey = getValue(AccessKey);
const refreshToken = getValue(RefreshToken);
const initialState: IReduxAuthModel = {
  isAuth: !IsNullOrEmpty(accessKey),
  accessKey: accessKey,
  refreshToken: refreshToken
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogout: (state: IReduxAuthModel) => {
      state.isAuth = false;
      removItem(AccessKey);
      removItem(RefreshToken)
    },
    userLogin: (state: IReduxAuthModel, action: { payload: IAuthInformation }) => {
      state.isAuth = !IsNullOrEmpty(action.payload.accessKey);
      state.accessKey = action.payload.accessKey;
      state.refreshToken = action.payload.refresh_token;
      setValue(AccessKey, action.payload.accessKey);
      setValue(AccessKey, action.payload.refresh_token);
    }
  }
});

export const { actions, reducer } = authSlice;
