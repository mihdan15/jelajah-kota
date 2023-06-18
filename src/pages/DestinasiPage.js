import { Typography, Input } from "@material-tailwind/react";
import CardDestinasi from "../components/CardDestinasi";
import React, { useState } from "react";

const DestinasiPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <div>
      <figure className="relative h-[50vh] w-full mb-11">
        <img
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
          alt="nature image"
        />
        <figcaption className="absolute bottom-40 left-2/4 -translate-x-2/4 rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm text-center">
          <div>
            <Typography variant="h3" color="blue-gray">
              Temukan Destinasi Yang Menarik
            </Typography>
          </div>
          <div className="w-80 flex justify-center mx-auto mt-5 bg-white rounded-lg">
            <Input
              size="lg"
              label="Cari destinasi"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </figcaption>
      </figure>
      <CardDestinasi limit={null} enableSearch={true} searchTerm={searchTerm} />
    </div>
  );
};

export default DestinasiPage;
