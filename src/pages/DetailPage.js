import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const GET_DESTINASI = gql`
    query GetDestinasiByID($id: Int!) {
      tb_destinasi_by_pk(id: $id) {
        deskripsi_dest
        id
        img_dest
        lokasi_dest
        nama_dest
        rating_dest
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_DESTINASI, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const destinasi = data.tb_destinasi_by_pk;

  return (
    <div>
      <div className="container mx-auto p-2 ">
        <figure className="relative h-[40vh] w-full">
          <img
            className="h-full w-full object-cover rounded-lg"
            src="https://images.unsplash.com/photo-1523592121529-f6dde35f079e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            alt="nature image"
          />
          <figcaption className="absolute inset-0 flex items-center justify-center bg-black/25">
            <div className="text-center">
              <Typography variant="h1" color="white" className="font-bold">
                Jelajah Kota: Temukan Masa Depanmu
              </Typography>
            </div>
          </figcaption>
        </figure>
      </div>
      <div className="container mx-auto p-32">
        <Typography variant="h1" className="text-center">
          Detail {destinasi.nama_dest}
        </Typography>
        <Card key={destinasi.id} className="w-full shadow-lg mt-11">
          <CardHeader floated={false} color="blue-gray">
            <img
              className="h-full w-full object-cover"
              src={destinasi.img_dest}
              alt={destinasi.nama_dest}
            />
            <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
          </CardHeader>
          <CardBody>
            <div className="flex items-center justify-between">
              <Typography variant="h5" color="blue-gray" className="font-bold">
                {destinasi.nama_dest}
              </Typography>
              <div className="mb-3 flex items-center justify-between">
                <Typography
                  color="blue-gray"
                  className="flex items-center gap-1.5 font-normal"
                >
                  Rating : {destinasi.rating_dest}
                </Typography>
              </div>
            </div>
            <Typography
              color="blue-gray"
              className=" mb-3 flex items-center gap-1.5 font-normal"
            ></Typography>
            <Typography color="gray">{destinasi.deskripsi_dest}</Typography>
          </CardBody>
        </Card>
        <div className="flex justify-center">
          <Button
            onClick={() => navigate(-1)}
            className="back-btn items-center mx-auto mt-11"
          >
            Kembali
          </Button>
        </div>
      </div>
    </div>
  );
}
