import { Typography } from "@material-tailwind/react";

const AboutPage = () => {
  return (
    <div>
      <figure className="relative h-[50vh] w-full">
        <img
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1531303919131-9df51d2b0cc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          alt="nature image"
        />
        <figcaption className="absolute bottom-40 left-2/4 -translate-x-2/4 rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm text-center">
          <div>
            <Typography variant="h3" color="blue-gray">
              Tentang Kami
            </Typography>
          </div>
        </figcaption>
      </figure>
      <div className="container mx-auto flex justify-center items-center lg:px-16">
        <div className="flex  flex-col items-center justify-center mt-10 w-full lg:flex-row">
          <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
            <img
              className="h-auto max-w-full rounded-md"
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              alt="Foto"
            />
          </div>
          <div className="w-full lg:w-1/2 px-4">
            <h2 className="text-2xl font-bold mb-4">Mengapa Memilih Kami</h2>
            <p className="text-gray-600">
              Selamat datang di website kami! <br /> Kami adalah tim yang
              berdedikasi untuk memberikan informasi terkini tentang destinasi
              wisata di Indonesia. Dengan pengalaman dan pengetahuan yang luas,
              kami berusaha untuk memberikan panduan dan rekomendasi yang akurat
              serta bermanfaat bagi para wisatawan.
              <br />
              <br /> Tim kami terdiri dari pecinta perjalanan yang memiliki
              minat dalam menjelajahi keindahan alam, budaya, dan kuliner di
              berbagai kota di Indonesia. Kami percaya bahwa setiap kota
              memiliki cerita uniknya sendiri yang menunggu untuk diungkap.
              Melalui website ini, kami berkomitmen untuk memperkenalkan Anda
              pada keajaiban yang ada di setiap sudut Indonesia.
              <br />
              <br /> Kami melakukan riset menyeluruh dan menjelajahi setiap
              tempat yang kami rekomendasikan, sehingga Anda dapat memiliki
              pengalaman yang berarti dan tak terlupakan.
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-5 py-2 lg:px-16 lg:pt-24">
        <div className="-m-1 flex flex-wrap md:-m-2">
          <div className="flex w-1/2 flex-wrap">
            <div className="w-1/2 p-1 md:p-2">
              <img
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center"
                src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp"
              />
            </div>
            <div className="w-1/2 p-1 md:p-2">
              <img
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center"
                src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(72).webp"
              />
            </div>
            <div className="w-full p-1 md:p-2">
              <img
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center"
                src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
              />
            </div>
          </div>
          <div className="flex w-1/2 flex-wrap">
            <div className="w-full p-1 md:p-2">
              <img
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center"
                src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp"
              />
            </div>
            <div className="w-1/2 p-1 md:p-2">
              <img
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center"
                src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(75).webp"
              />
            </div>
            <div className="w-1/2 p-1 md:p-2">
              <img
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center"
                src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(77).webp"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
