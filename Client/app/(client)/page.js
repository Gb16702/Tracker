import Hero from "../components/Pages/home/Hero";
import GameSlide from "../components/Pages/home/GameSlide";
import Testimonials from "../components/Pages/home/Testimonials";

export default async function Home() {
  const response = await fetch(
    `${process.env.DEV_API_URL}/testimonials/published`,
    {
      cache: "no-store",
    }
  );

  const data = await fetch(`${process.env.DEV_API_URL}/api/games`, {
    cache: "no-store",
  });

  const testimonials = await response.json();
  const { games } = await data.json();

  return (
    <>
      <Hero />
      <section className="flex flex-col items-center justify-center">
        <div className="bg-zinc-900 w-full flex justify-center items-center flex-1 border-y border-zinc-800">
          <div className="max-w-[1530px] w-[1600px] max-lg:overflow-auto sm:w-full">
            <GameSlide games={games} />
          </div>
        </div>

        <div className="max-w-[1530px] w-[1530px] max-2xl:max-w-[100%] max-2xl:px-5">
          <Testimonials testimonials={testimonials} />
        </div>
      </section>
    </>
  );
}
