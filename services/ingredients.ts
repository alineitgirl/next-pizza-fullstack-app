import { Ingredient } from "@/lib/generated/prisma/client"
import { axiosIntance } from "./instance"
import { ApiRoutes } from "./constants";

export const getAll = async () : Promise<Ingredient[]> => {
    const { data } = await axiosIntance.get<Ingredient[]>(ApiRoutes.SEARCH_INGREDIENTS);

    return data;
}