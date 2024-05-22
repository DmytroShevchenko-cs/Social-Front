import { api } from "../api/api";
import { HttpMethodType } from "../types/HttpInfo"

import { IFriendViewModel } from "../types/Models/Friend";
import {IGetParams} from "../types/Pagination"

export const friendApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getFriends: builder.query<IFriendViewModel, IGetParams>({
            query: (get) => ({
                url: `/api/friendship?request=${get.request}&pageSize=${get.pageSize}&currentPage=${get.currentPage}&sortType=${get.sortBy}`,
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
        delFriend: builder.mutation<null, number>({
            query: (friendId) => ({
                url: `/api/friendship?FriendID=${friendId}`,
                method: HttpMethodType.DELETE,
                responseHandler: async (response) => {
                    if (!response.ok) {
                        const errorText = await response.text();
                        throw new Error(`HTTP error! Status: ${response.status}, ${errorText}`);
                    }
                    return response.json();
                }
            }),
        })
    }),
});

export const { useGetFriendsQuery, useDelFriendMutation } = friendApi;
