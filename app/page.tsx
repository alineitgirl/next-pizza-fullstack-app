import { Categories, SortPopup, Title, TopBar, Filters, ProductCard } from "@/components/index";
import { Container } from "@/components/index";
import { ProductsGroupList } from "@/components/index";
import prisma from "@/lib/prisma";

export default async function Home() {

  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          items: true
        }
      }
    }
  });



  return <>
    <Container className="mt-10">
      <Title text="Все пиццы" size="lg" className="font-extrabold"/>
    </Container>

    <TopBar categories={categories.filter((category) => category.products.length > 0)}/>

    <Container className="mt-10 pb-14">
      <div className="flex gap-[80px]">
        <div className="w-[250px]">
           <Filters/>
        </div>
     
      <div className="flex-1">
        <div className="flex flex-col gap-16">
          {categories.map((category) => (
            category.products.length > 0 && (
              <ProductsGroupList
              title={category.name}
              key={category.id} 
              categoryId={category.id}
              items={category.products}
              />
            )
          ))}
        </div>
      </div>
      </div>
    </Container>
  </>
}
