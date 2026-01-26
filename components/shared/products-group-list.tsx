'use client';
import React from "react";
import { useIntersection } from "react-use";
import { ProductCard, Title } from "@/components/index";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  items: any[];
  listClassName?: string;
  className?: string;
  categoryId: number;
}

export const ProductsGroupList: React.FC<Props> = ({
  title,
  items,
  listClassName,
  className,
  categoryId,
}) => {
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4, 
  });

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
        console.log(`${title} ` + `${categoryId}`);
    }
  }, [categoryId, intersection?.isIntersecting, title]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
        {items.map((product, i) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.items[0].price}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};
