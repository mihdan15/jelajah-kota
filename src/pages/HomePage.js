import React, { useRef } from "react";
import CardHome from "../components/CardHome";
import CardDestinasi from "../components/CardDestinasi";
import Footer from "../components/Footer";
import { Typography, Button, Carousel } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const scrollRef = useRef(null);

  const handleExploreClick = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div>
      <Carousel className="h-screen">
        <div className="relative h-full w-full">
          <img
            src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
            alt="image 1"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
            <div className="w-3/4 text-center md:w-2/4">
              <Typography
                variant="h1"
                color="white"
                className="mb-4 sm:text-3xl md:text-4xl lg:text-5xl"
              >
                Jelajah Kota
              </Typography>
              <Typography
                variant="lead"
                color="white"
                className="mb-12 opacity-80 "
              >
                aplikasi eksklusif yang memperkenalkan keindahan, keberagaman
                budaya, dan petualangan tak terlupakan di berbagai kota di
                Indonesia. Menemukan pesona alam yang menakjubkan, merasakan
                atmosfer tempat-tempat bersejarah yang bersemayam, dan menikmati
                kelezatan kuliner lokal yang melegenda.
              </Typography>
              <div className="flex justify-center gap-2">
                <Button size="lg" color="white" onClick={handleExploreClick}>
                  Explore
                </Button>
                <Link to="/gallery">
                  <Button size="lg" color="white" variant="text">
                    Gallery
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Carousel>
      <div className="container mx-auto p-2">
        <Typography
          variant="h1"
          color="blue"
          className="mb-4 text-3xl md:text-4xl lg:text-4xl text-center mt-8"
        >
          Tour Populer
        </Typography>
        <CardHome />
      </div>
      <div className="container mx-auto p-2" ref={scrollRef}>
        <Typography
          variant="h1"
          color="blue"
          className="mb-4 text-3xl md:text-4xl lg:text-4xl text-center mt-8"
        >
          Semua Destinasi
        </Typography>
        <CardDestinasi limit={9} enableSearch={false} />
        <div className="flex justify-center">
          <Link to={"/destinasi"}>
            <Button size="lg" fullWidth={false} className="">
              Lihat Semua
            </Button>
          </Link>
        </div>
      </div>
      <div className="container mx-auto p-2 ">
        <figure className="relative h-[40vh] w-full">
          <img
            className="h-full w-full object-cover rounded-lg"
            src="https://images.unsplash.com/photo-1523592121529-f6dde35f079e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            alt="nature image"
          />
          <figcaption className="absolute inset-0 flex items-center justify-center bg-black/25">
            <div className="text-center">
              <Typography variant="h1" color="white" className="font-bold ">
                Jelajah Kota, Temukan Masa Depanmu
              </Typography>
            </div>
          </figcaption>
        </figure>
      </div>
    </div>
  );
};

export default HomePage;
