import { api } from "../api/api";
import { HttpMethodType } from "../types/HttpInfo"

import { IFriendViewModel } from "../types/Models/Friend";
import {IGetParams} from "../types/Pagination"

export const friendApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getFriends: builder.query<IFriendViewModel, IGetParams>({
            query: (get : IGetParams) => ({
                url: `/api/friendship?pageSize=${get.pageSize}&currentPage=${get.currentPage}&sortType=${get.sortBy}`,
                method: HttpMethodType.GET,
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

export const { useGetFriendsQuery } = friendApi;