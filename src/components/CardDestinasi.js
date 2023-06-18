import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import { MapPinIcon, StarIcon, HeartIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

export default function CardDestinasi({ limit, enableSearch, searchTerm }) {
  const GET_DATA = gql`
    query GetData {
      tb_destinasi(order_by: { nama_dest: asc }, limit: ${limit}) {
        id
        lokasi_dest
        deskripsi_dest
        nama_dest
        img_dest
        rating_dest
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_DATA);
  if (loading) return <p>Memuat Data...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Filter data berdasarkan searchTerm
  // const filteredData = data.tb_destinasi.filter(
  //   (dest) =>
  //     (dest &&
  //       dest.nama_dest &&
  //       dest.nama_dest.toLowerCase().includes(searchTerm.toLowerCase())) ||
  //     (dest &&
  //       dest.lokasi_dest &&
  //       dest.lokasi_dest.toLowerCase().includes(searchTerm.toLowerCase()))
  // );

  let filteredData = data.tb_destinasi;

  if (enableSearch && searchTerm) {
    filteredData = filteredData.filter(
      (dest) =>
        dest.nama_dest.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.lokasi_dest.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // const filteredData = data.tb_destinasi.filter((dest) =>
  //   dest.nama_dest.includes(searchTerm)
  // );

  return (
    <div class="container mx-auto p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-9 ">
        {filteredData.map((dest) => (
          <Card key={dest.id} className="w-full max-w-[26rem] shadow-lg">
            <CardHeader floated={false} color="blue-gray">
              <img
                style={{ aspectRatio: "6/4" }}
                className="object-fit"
                // src="https://source.unsplash.com/featured/300x206"
                src={dest.img_dest}
                alt={dest.nama_dest}
              />
              <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
              <IconButton
                size="sm"
                color="red"
                variant="text"
                className="!absolute top-4 right-4 rounded-full"
              >
                <HeartIcon className="h-6 w-6" />
              </IconButton>
            </CardHeader>
            <CardBody>
              <div className="flex items-center justify-between">
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="font-medium"
                >
                  {dest.nama_dest}
                </Typography>
                <div className="mb-3 flex items-center justify-between">
                  <Typography
                    color="blue-gray"
                    className="flex items-center gap-1.5 font-normal"
                  >
                    <StarIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
                    {dest.rating_dest}
                  </Typography>
                </div>
              </div>
              <Typography
                color="blue-gray"
                className=" mb-3 flex items-center gap-1.5 font-normal"
              >
                <MapPinIcon className="h-6 w-6" /> {dest.lokasi_dest}
              </Typography>
              <Typography color="gray">
                {dest.deskripsi_dest.slice(0, 150)}...
              </Typography>
            </CardBody>
            <CardFooter className="pt-3">
              <Link to={`/detail/${dest.id}`}>
                <Button size="lg" fullWidth={true}>
                  Detail
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
