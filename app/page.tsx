import { Categories, SortPopup, Title, TopBar } from "@/components/index";
import { Container } from "@/components/index";

export default function Home() {
  return <>
    <Container className="mt-10">
      <Title text="Все пиццы" size="lg" className="font-extrabold"/>
    </Container>

    <TopBar />

    <div style={{height: '3000px'}}></div>
  </>
}
