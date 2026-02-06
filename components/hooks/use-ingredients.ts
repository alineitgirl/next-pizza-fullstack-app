'use client';
import { Ingredient } from "@/lib/generated/prisma/client";
import { Api } from "@/services/api-client";
import React from 'react';
import { useSet } from "react-use";

interface ReturnProps {
    ingredients: Ingredient[];
    loading : boolean;
    selectedIds : Set<string>;
    onAddId: (id: string) => void;

}

export const useIngredients = (initialIds?: string[]) : ReturnProps => {
    const [ingredients, setIngredients] = React.useState<ReturnProps['ingredients']>([]);
    const [loading, setLoading] = React.useState(true);

    const [selectedIds, { toggle} ] = useSet(new Set<string>(initialIds || []));

    React.useEffect(() => {
        async function fetchIngredients() {
            try {
                const ingredients = await Api.ingredients.getAll();
                setIngredients(ingredients);
            } catch (error) {
                console.error('Error fetching ingredients:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchIngredients();
    }, []);

    const selectedIngredients = (ids: string[]) => {

    }

    return { ingredients, loading, onAddId: toggle, selectedIds, selectedIngredients };
};