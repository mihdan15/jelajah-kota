import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { Typography, Button } from "@material-tailwind/react";

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
      <div>
        <h1>{destinasi.nama_dest}</h1>
        <p>{destinasi.deskripsi_dest}</p>
        <p>{destinasi.lokasi_dest}</p>
        <p>{destinasi.rating_dest}</p>
        <img src={destinasi.img_dest} alt={destinasi.nama_dest} />
      </div>
      <Button onClick={() => navigate(-1)} className="back-btn">
        Kembali
      </Button>
      {/* Tampilkan informasi detail destinasi di sini */}
    </div>
  );
}
