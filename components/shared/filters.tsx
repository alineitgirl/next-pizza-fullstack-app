'use client';
import React from 'react';
import { Input, Title } from "@/components/index";
import { RangeSlider } from '@/components/index';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { useIngredients } from '@/components/hooks/use-ingredients';
import { useSet } from 'react-use';
import qs from 'qs';
import { useRouter, useSearchParams } from 'next/navigation';
import { search } from '@/services/products';

interface Props {
    className? : string;
}

interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}

interface QueryFilters extends PriceProps {
    pizzaTypes: string;
    sizes: string;
    ingredients: string;
}

export const Filters : React.FC<Props> = ({ className }) => {

    const router = useRouter();
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

    const { ingredients, loading,  onAddId, selectedIds } = useIngredients(
        searchParams.get('ingredients')?.split(',') || [],
    );

    const [prices, setPrice] = React.useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined, 
        priceTo: Number(searchParams.get('priceTo')) || undefined,
    });

    const [sizes, {toggle: toggleSizes}] = useSet(new Set<string>(searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : []));
    const [pizzaTypes, {toggle: togglePizzaTypes}] = useSet(new Set<string>((searchParams.has('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : [])));

    const items = ingredients.map((item) => ({ value: item.id.toString(), text: item.name }));

    const updatePrice = (name: keyof PriceProps, value: number)=> {
        setPrice({
            ...prices,
            [name]: value,
        })
    }
    
    React.useEffect(() => {
        const filters = {
            ...prices,
            pizzaTypes: Array.from(pizzaTypes),
            sizes: Array.from(sizes),
            ingredients: Array.from(selectedIds)
        };

       const query = qs.stringify(filters, {
            arrayFormat: 'comma'
        });

        router.push(`?${query}`, {
            scroll: false
        });

    }, [prices, pizzaTypes, sizes, selectedIds, router]);

    return (
        <div className={className}>
            <Title text="Фильтрация" size="sm" className='mb-5 font-bold' />

            <CheckboxFiltersGroup 
                title="Тип теста"
                items={[
                    { text: 'Тонкое', value: '1'},
                    { text: 'Традиционное', value: '2'},
                ]}
                className='mb-5'
                limit={5}
                onClickCheckbox={togglePizzaTypes}
                selectedIds={pizzaTypes}
                name='pizzaTypes'
            />

            <CheckboxFiltersGroup 
                title="Размеры"
                items={[
                    { text: '20 см', value: '20'},
                    { text: '30 см', value: '30'},
                    { text: '40 см', value: '40'},
                ]}
                className='mb-5'
                limit={5}
                onClickCheckbox={toggleSizes}
                selectedIds={sizes}
                name='sizes'
            />

            <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
                <p className='font-bold mb-3'>Цена от и до:</p>
                <div className='flex gap-3 mb-5'>
                    <Input type="number" placeholder='0' min={0} max={1000} value={String(prices.priceFrom)} onChange={(e) => updatePrice('priceFrom', Number(e.target.value))}/>
                    <Input type="number" placeholder='100' min={0} max={1000} value={String(prices.priceTo)} onChange={(e) => updatePrice('priceTo', Number(e.target.value))}/>
                </div>

                <RangeSlider min={0} max={5000} step={10} value={[
                    prices.priceFrom || 0,
                    prices.priceTo || 0
                ]} 
                onValueChange={([priceFrom, priceTo]) => setPrice({ priceFrom: priceFrom, priceTo: priceTo})}/>
            </div>

            <CheckboxFiltersGroup 
                title="Ингредиенты"
                items={items}
                defaultItems={items.slice(0, 6)}
                limit={5}
                searchInputPlaceholder="Поиск..."
                loading={loading}
                onClickCheckbox={onAddId}
                selectedIds={selectedIds}
                name='ingredients'
                className='mt-5'
            />
        </div>
    )
}