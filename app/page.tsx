import GenerateForm from "./components/GenerateForm";
import ImageArea from "./components/ImageArea";

export default function Home() {
  return (
    <section className="w-full pt-10 md:pt-20 flex flex-col gap-10 lg:flex-row items-center pl-5 pr-5">
      <GenerateForm></GenerateForm>
      <ImageArea></ImageArea>
    </section>
  );
}
