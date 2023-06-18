import React from "react";
import {
  Typography,
  Card,
  Textarea,
  Input,
  Button,
} from "@material-tailwind/react";

export const ContactPage = () => {
  return (
    <div>
      {/* <figure className="relative h-[50vh] w-full mb-11">
        <img
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
          alt="nature image"
        />
        <figcaption className="absolute bottom-40 left-2/4 -translate-x-2/4 rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm text-center">
          <div>
            <Typography variant="h3" color="blue-gray">
              Contact Us
            </Typography>
          </div>
        </figcaption>
      </figure> */}
      <figure className="relative h-[100vh] w-full">
        <img
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
          alt="nature image"
        />
        <figcaption className="absolute bottom-44 left-2/4 -translate-x-2/4 w-[44rem] rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm text-center">
          <Card color="transparent" shadow={false} className="w-full">
            <Typography variant="h3" color="blue-gray">
              Hubungi Kami
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Hubungi kami dan dapatkan solusi yang Anda cari
            </Typography>
            <form className="mt-8 mb-2 max-w-screen-lg sm:w-96">
              <div className="mb-4 flex flex-col gap-6 w-[40rem]">
                <Input size="lg" label="Nama" name="nama" />
                <Input size="lg" label="Email" name="email" />
                <Textarea size="lg" label="Pesan" name="pesan" />
                <div className="flex justify-center space-x-4">
                  <Button fullWidth="true" color="blue">
                    Kirim
                  </Button>
                </div>
              </div>
            </form>
          </Card>
        </figcaption>
      </figure>
    </div>
  );
};
