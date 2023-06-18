import { Typography } from "@material-tailwind/react";
import Logo from "../img/logo192.png";

export default function Footer() {
  return (
    <footer className="w-full bg-white p-8 ">
      <hr className="my-8 border-blue-gray-50" />
      <div className="flex items-center justify-center bg-white text-center md:justify-center">
        {/* <img src={Logo} alt="logo-jk" className="w-10" /> */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <Typography variant="h4">
            "Setiap langkah adalah kesempatan untuk menemukan diri sendiri,
            memperluas wawasan, <br />
            dan menciptakan kenangan yang abadi"
          </Typography>
        </div>
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <Typography color="blue-gray" className="text-center font-normal">
        &copy; 2023 Jelajah Kota | Mihdan Advani
      </Typography>
    </footer>
  );
}
