import { translationApi as api } from "../api/api";
import { HttpMethodType } from "../types/HttpInfo";
import { ITranslationModel, ITranslationTextResponseModel } from "../types/Translation";

export const translateApi = api.injectEndpoints({
    endpoints: (builder) =>({
        translate: builder.mutation<ITranslationTextResponseModel, ITranslationModel>({
            query: (bodyData) => ({
                body: bodyData,
                url: "/translate",
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
    }),
});

export const { useTranslateMutation } = translateApi; 