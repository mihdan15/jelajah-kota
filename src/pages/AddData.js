import { useEffect, useState, useRef } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
  Alert,
} from "@material-tailwind/react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const AddData = () => {
  const [namaDest, setNamaDest] = useState("");
  const [lokasiDest, setLokasiDest] = useState("");
  const [deskripsiDest, setDeskripsiDest] = useState("");
  const [ratingDest, setRatingDest] = useState("");
  const [imgDest, setImgDest] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("");

  const TABLE_HEAD = [
    "id",
    "Nama Destinasi",
    "Lokasi",
    "Deskripsi",
    "rating",
    "Image Url",
  ];

  const ADD_DESTINATION_MUTATION = gql`
    mutation InsertDestination(
      $nama_dest: String!
      $lokasi_dest: String!
      $deskripsi_dest: String!
      $rating_dest: float8!
      $img_dest: String!
    ) {
      insert_tb_destinasi(
        objects: {
          nama_dest: $nama_dest
          lokasi_dest: $lokasi_dest
          deskripsi_dest: $deskripsi_dest
          rating_dest: $rating_dest
          img_dest: $img_dest
        }
      ) {
        returning {
          id
          nama_dest
          lokasi_dest
          deskripsi_dest
          rating_dest
          img_dest
        }
      }
    }
  `;

  //Query Get Data
  const GET_DATA = gql`
    query GetData {
      tb_destinasi(order_by: { id: desc }, limit: 5) {
        id
        lokasi_dest
        deskripsi_dest
        nama_dest
        rating_dest
        img_dest
      }
    }
  `;

  const { loading, error, data, refetch } = useQuery(GET_DATA);

  const [addData] = useMutation(ADD_DESTINATION_MUTATION, {
    onCompleted: () => {
      setAlertMessage("Berhasil tambah destinasi");
      setAlertColor("green");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      console.log("Data inserted successfully");
      setNamaDest("");
      setLokasiDest("");
      setDeskripsiDest("");
      setRatingDest("");
      setImgDest("");
      refetch();
      // if (tableRef.current) {
      //   tableRef.current.scrollIntoView({ behavior: "smooth" });
      // }
    },
    onError: (error) => {
      console.error("Error adding data:", error);
    },
  });

  const handleTambah = async () => {
    if (namaDest === "" || lokasiDest === "" || deskripsiDest === "") {
      setAlertMessage("Inputan tidak boleh ada yang kosong!");
      setAlertColor("red");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 1000);
      return;
    }
    try {
      await addData({
        variables: {
          nama_dest: namaDest,
          lokasi_dest: lokasiDest,
          deskripsi_dest: deskripsiDest,
          rating_dest: ratingDest,
          img_dest: imgDest,
        },
      });
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const tableRef = useRef(null);
  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [data]);

  return (
    <div className="justify-center items-center">
      <figure className="relative h-[100vh] w-full">
        <img
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
          alt="nature image"
        />
        <figcaption className="absolute bottom-36 left-2/4 -translate-x-2/4 w-[44rem] rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm text-center">
          <Card color="transparent" shadow={false} className="w-full">
            <Typography variant="h3" color="blue-gray">
              Tambah Destinasi
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Tambah destinasi baru
            </Typography>
            {showAlert && (
              <Alert color={alertColor} variant="gradient">
                <span>{alertMessage}</span>
              </Alert>
            )}
            <form className="mt-4 mb-2 max-w-screen-lg sm:w-96">
              <div className="mb-2 flex flex-col gap-6 w-[40rem]">
                <Input
                  size="lg"
                  label="Nama Destinasi"
                  name="nama_dest"
                  value={namaDest}
                  onChange={(e) => setNamaDest(e.target.value)}
                />
                <Input
                  size="lg"
                  label="Lokasi"
                  name="lokasi_dest"
                  value={lokasiDest}
                  onChange={(e) => setLokasiDest(e.target.value)}
                />
                <Input
                  size="sm"
                  label="Rating"
                  name="rating_dest"
                  type="number"
                  value={ratingDest}
                  onChange={(e) => setRatingDest(e.target.value)}
                />
                <Input
                  size="lg"
                  label="Image URL"
                  name="img_dest"
                  value={imgDest}
                  onChange={(e) => setImgDest(e.target.value)}
                />
                <Textarea
                  size="lg"
                  label="Deskripsi"
                  name="deskripsi_dest"
                  value={deskripsiDest}
                  onChange={(e) => setDeskripsiDest(e.target.value)}
                />
                <div className="flex justify-between space-x-4">
                  <Button onClick={handleTambah} color="blue">
                    Tambah
                  </Button>
                  <Link to={"/edit"}>
                    <Button
                      variant="text"
                      className="mx-auto flex items-center justify-center gap-2 mt-5"
                    >
                      <ArrowLongRightIcon strokeWidth={2} className="h-5 w-5" />{" "}
                      Lihat Data
                    </Button>
                  </Link>
                </div>
              </div>
            </form>
          </Card>
        </figcaption>
      </figure>

      <Typography
        variant="h1"
        color="blue"
        className="mb-4 text-3xl md:text-4xl lg:text-4xl text-center mt-8"
      >
        Destinasi
      </Typography>
      <div className="container flex justify-center mx-auto">
        <Card className="overflow-scroll h-full w-full mt-5 items-center">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            <table className="w-full table-auto text-left" ref={tableRef}>
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.tb_destinasi.map((dest, index) => {
                    const isLast = index === data.tb_destinasi.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={dest.id}>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {dest.id}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {dest.nama_dest}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {dest.lokasi_dest}
                          </Typography>
                        </td>
                        <td className={`${classes} w-96`}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {dest.deskripsi_dest}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {dest.rating_dest}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {dest.img_dest}
                          </Typography>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
        </Card>
      </div>
      <div className=" mt-5 flex justify-center">
        <Link to={"/edit"}>
          <Button color="amber">Lihat Semua Data</Button>
        </Link>
      </div>
    </div>
  );
};

export default AddData;
