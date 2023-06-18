import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

export default function CardHome() {
  const GET_DATA = gql`
    query GetData {
      tb_destinasi(order_by: { id: asc }, limit: 3) {
        id
        lokasi_dest
        deskripsi_dest
        nama_dest
        img_dest
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_DATA);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.tb_destinasi.map((dest) => (
        <Link to={`/detail/${dest.id}`}>
          <Card
            shadow={true}
            className="relative grid h-[40rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center shadow-md"
          >
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center"
              style={{ backgroundImage: `url('${dest.img_dest}')` }}
            >
              <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
            </CardHeader>
            <CardBody className="relative py-14 px-6 md:px-12">
              <Typography
                variant="h4"
                color="white"
                className="mb-3 font-medium leading-[1.5]"
              >
                {dest.nama_dest}
                {/* {dest.img_dest} */}
              </Typography>
              <Typography
                variant="h4"
                color="white"
                className="mb-2 text-sm leading-[1.5]"
              >
                {dest.lokasi_dest}
              </Typography>
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  );
}
