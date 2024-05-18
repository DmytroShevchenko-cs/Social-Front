import { api } from "../api/api";
import { HttpMethodType } from "../types/HttpInfo"

export const blackListApi = api.injectEndpoints({
    endpoints: (builder) => ({
        addToBlackList: builder.mutation<null, number>({
            query: (friendId) => ({
                url: `/api/blacklist?wantToBanId=${friendId}`,
                method: HttpMethodType.POST,
                responseHandler: async (response) => {
                    if (!response.ok) {
                        const errorText = await response.text();
                        throw new Error(`HTTP error! Status: ${response.status}, ${errorText}`);
                    }
                    return response.json();
                }
            }),
        }),
        delfromBackList: builder.mutation<null, number>({
            query: (friendId) => ({
                url: `/api/blacklist?bannedID=${friendId}`,
                method: HttpMethodType.DELETE,
                responseHandler: async (response) => {
                    if (!response.ok) {
                        const errorText = await response.text();
                        throw new Error(`HTTP error! Status: ${response.status}, ${errorText}`);
                    }
                    return response.json();
                }
            }),
        }),
    }),
});

export const { useAddToBlackListMutation ,useDelfromBackListMutation, } = blackListApi;
