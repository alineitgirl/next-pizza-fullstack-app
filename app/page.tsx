import { Categories, SortPopup, Title, TopBar, Filters, ProductCard } from "@/components/index";
import { Container } from "@/components/index";
import { ProductsGroupList } from "@/components/index";

export default function Home() {
  return <>
    <Container className="mt-10">
      <Title text="Все пиццы" size="lg" className="font-extrabold"/>
    </Container>

    <TopBar />

    <Container className="mt-10 pb-14">
      <div className="flex gap-[80px]">
        <div className="w-[250px]">
           <Filters/>
        </div>
     
      <div className="flex-1">
        <div className="flex flex-col gap-16">
          <ProductsGroupList
            title="Пиццы"
            categoryId={1}
            items={[
              {
                id: 1,
                name: "Пепперони Фреш",
                imageUrl: "https://media.dodostatic.net/image/r:584x584/0198bf57bc517218ab93c762f4b0193e.avif",
                items: [
                  {
                    price: 515,
                  },
                ],
              },
              {
                id: 2,
                name: "Пепперони Фреш",
                imageUrl: "https://media.dodostatic.net/image/r:584x584/0198bf57bc517218ab93c762f4b0193e.avif",
                items: [
                  {
                    price: 515,
                  },
                ],
              },
              {
                id: 3,
                name: "Пепперони Фреш",
                imageUrl: "https://media.dodostatic.net/image/r:584x584/0198bf57bc517218ab93c762f4b0193e.avif",
                items: [
                  {
                    price: 515,
                  },
                ],
              },
              {
                id: 4,
                name: "Пепперони Фреш",
                imageUrl: "https://media.dodostatic.net/image/r:584x584/0198bf57bc517218ab93c762f4b0193e.avif",
                items: [
                  {
                    price: 515,
                  },
                ],
              },
              {
                id: 5,
                name: "Пепперони Фреш",
                imageUrl: "https://media.dodostatic.net/image/r:584x584/0198bf57bc517218ab93c762f4b0193e.avif",
                items: [
                  {
                    price: 515,
                  },
                ],
              }
            ]}
          />

           <ProductsGroupList
            title="Завтрак"
            categoryId={2}
            items={[
              {
                id: 1,
                name: "Пепперони Фреш",
                imageUrl: "https://media.dodostatic.net/image/r:584x584/0198bf57bc517218ab93c762f4b0193e.avif",
                items: [
                  {
                    price: 515,
                  },
                ],
              },
              {
                id: 2,
                name: "Пепперони Фреш",
                imageUrl: "https://media.dodostatic.net/image/r:584x584/0198bf57bc517218ab93c762f4b0193e.avif",
                items: [
                  {
                    price: 515,
                  },
                ],
              },
              {
                id: 3,
                name: "Пепперони Фреш",
                imageUrl: "https://media.dodostatic.net/image/r:584x584/0198bf57bc517218ab93c762f4b0193e.avif",
                items: [
                  {
                    price: 515,
                  },
                ],
              },
              {
                id: 4,
                name: "Пепперони Фреш",
                imageUrl: "https://media.dodostatic.net/image/r:584x584/0198bf57bc517218ab93c762f4b0193e.avif",
                items: [
                  {
                    price: 515,
                  },
                ],
              },
              {
                id: 5,
                name: "Пепперони Фреш",
                imageUrl: "https://media.dodostatic.net/image/r:584x584/0198bf57bc517218ab93c762f4b0193e.avif",
                items: [
                  {
                    price: 515,
                  },
                ],
              }
            ]}
          />
        </div>
      </div>
      </div>
    </Container>
  </>
}
