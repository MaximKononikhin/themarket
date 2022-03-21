import createApiInstance from "services/api";
import { IGender } from "lib/types/dictionary";

const api = createApiInstance();

export const dictionaryService = {
    getGenders: async (): Promise<IGender[]> => {
        const response = await api.get<IGender[]>("dictionaries/genders");
        return response.data;
    }
}