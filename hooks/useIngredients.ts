'use client';
import { Ingredient } from "@/lib/generated/prisma/client";
import { Api } from "@/services/api-client";
import React from 'react';

interface ReturnProps {
    ingredients: Ingredient[];
    loading : boolean;
}

export const useIngredients = () : ReturnProps => {
    const [ingredients, setIngredients] = React.useState<ReturnProps['ingredients']>([]);
    const [loading, setLoading] = React.useState(true);

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

    return { ingredients, loading };
};