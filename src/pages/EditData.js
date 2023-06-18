import { Fragment, useState, useEffect, useRef } from "react";
import {
  Card,
  Input,
  Button,
  IconButton,
  Typography,
  Textarea,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Alert,
} from "@material-tailwind/react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { BellIcon, ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";

const TABLE_HEAD = [
  "id",
  "Nama Destinasi",
  "Lokasi",
  "Deskripsi",
  "rating",
  "Image Url",
  "Action",
];

const DeleteDialog = ({ handleDelete, closeModal }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <Fragment>
      <Button onClick={handleOpen} color="red" size="sm">
        Hapus
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          <Typography variant="h5" color="blue-gray">
            Perhatian!
          </Typography>
        </DialogHeader>
        <DialogBody divider className="grid place-items-center gap-4">
          <BellIcon className="h-16 w-16 text-red-500" />
          <Typography color="red" variant="h4">
            Anda yakin ingin menghapus data ini?
          </Typography>
          <Typography className="text-center font-normal">
            Tindakan ini tidak dapat diurungkan. Data yang dihapus tidak dapat
            dikembalikan.
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handleOpen}>
            Batal
          </Button>
          <Button
            variant="gradient"
            color="red"
            onClick={() => {
              handleDelete();
              handleOpen();
            }}
          >
            Hapus
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
};

const EditData = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("");
  //Query Get Data
  const GET_DATA = gql`
    query GetData {
      tb_destinasi(order_by: { id: asc }) {
        id
        lokasi_dest
        deskripsi_dest
        nama_dest
        rating_dest
        img_dest
      }
    }
  `;
  //Query Delete Data
  const DELETE_DATA = gql`
    mutation DeleteData($id: Int!) {
      delete_tb_destinasi(where: { id: { _eq: $id } }) {
        affected_rows
      }
    }
  `;
  //Query Update Data
  const UPDATE_DATA = gql`
    mutation UpdateData(
      $id: Int!
      $nama_dest: String
      $lokasi_dest: String
      $deskripsi_dest: String
      $rating_dest: float8
      $img_dest: String
    ) {
      update_tb_destinasi(
        where: { id: { _eq: $id } }
        _set: {
          nama_dest: $nama_dest
          lokasi_dest: $lokasi_dest
          deskripsi_dest: $deskripsi_dest
          rating_dest: $rating_dest
          img_dest: $img_dest
        }
      ) {
        affected_rows
      }
    }
  `;

  const { loading, error, data, refetch } = useQuery(GET_DATA);
  const [deleteData] = useMutation(DELETE_DATA, {
    refetchQueries: [{ query: GET_DATA }],
  });
  const [updateData] = useMutation(UPDATE_DATA, {
    refetchQueries: [{ query: GET_DATA }],
  });
  const [deleteId, setDeleteId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState({
    id: null,
    nama_dest: "",
    lokasi_dest: "",
    deskripsi_dest: "",
    rating_dest: "",
    img_dest: "",
  });
  const handleDeleteConfirmation = (id) => {
    setDeleteId(id);
  };
  const handleDelete = async (id) => {
    try {
      await deleteData({ variables: { id } });
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleEditConfirmation = async () => {
    if (
      editData.nama_dest === "" ||
      editData.lokasi_dest === "" ||
      editData.deskripsi_dest === "" ||
      editData.rating_dest === "" ||
      editData.img_dest === ""
    ) {
      setAlertMessage("Inputan tidak boleh ada yang kosong!");
      setAlertColor("red");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 1000);
      return;
    }
    try {
      await updateData({
        variables: {
          id: editData.id,
          nama_dest: editData.nama_dest,
          lokasi_dest: editData.lokasi_dest,
          deskripsi_dest: editData.deskripsi_dest,
          rating_dest: editData.rating_dest,
          img_dest: editData.img_dest,
        },
      });
      setAlertMessage("Berhasil tambah destinasi");
      setAlertColor("green");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      setIsEditMode(false);
      setEditData({
        id: null,
        nama_dest: "",
        lokasi_dest: "",
        deskripsi_dest: "",
        rating_dest: "",
        img_dest: "",
      });
      refetch();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditData({
      id: null,
      nama_dest: "",
      lokasi_dest: "",
      deskripsi_dest: "",
    });
  };

  const formRef = useRef(null);
  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [data]);

  //pagination
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const getPaginatedData = () => {
    // Ambil data yang sudah difilter
    const filteredData = data.tb_destinasi.filter(
      (dest) =>
        dest.nama_dest.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.lokasi_dest.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Hitung jumlah total halaman berdasarkan data yang terfilter
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Ambil data yang sesuai dengan halaman aktif
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return paginatedData;
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  if (loading) return <p>Memuat data...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="justify-center items-center">
      <div ref={formRef}></div>
      {isEditMode && (
        <figure className="relative h-[100vh] w-full">
          <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            alt="nature image"
          />
          <figcaption className="absolute bottom-20 left-2/4 -translate-x-2/4 w-[44rem] rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm text-center">
            <Card color="transparent" shadow={false} className="w-full">
              <Typography variant="h3" color="blue-gray">
                Edit Destinasi
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Edit destinasi yang ada
              </Typography>
              {showAlert && (
                <Alert color={alertColor} variant="gradient">
                  <span>{alertMessage}</span>
                </Alert>
              )}
              <form className="mt-8 mb-2 max-w-screen-lg sm:w-96">
                <div className="mb-4 flex flex-col gap-6 w-[40rem]">
                  <Input
                    size="lg"
                    label="Nama Destinasi"
                    name="nama_dest"
                    value={editData.nama_dest}
                    onChange={handleInputChange}
                  />
                  <Input
                    size="lg"
                    label="Lokasi"
                    name="lokasi_dest"
                    value={editData.lokasi_dest}
                    onChange={handleInputChange}
                  />
                  <Input
                    size="sm"
                    label="Rating"
                    name="rating_dest"
                    value={editData.rating_dest}
                    onChange={handleInputChange}
                  />
                  <Input
                    size="sm"
                    label="Image URL"
                    name="img_dest"
                    value={editData.img_dest}
                    onChange={handleInputChange}
                  />
                  <Textarea
                    size="lg"
                    label="Deskripsi"
                    name="deskripsi_dest"
                    value={editData.deskripsi_dest}
                    onChange={handleInputChange}
                  />
                  <div className="flex justify-end space-x-4">
                    <Button onClick={handleEditConfirmation} color="blue">
                      Simpan Perubahan
                    </Button>
                    <Button onClick={handleCancelEdit}>Batal</Button>
                  </div>
                </div>
              </form>
            </Card>
          </figcaption>
        </figure>
      )}
      <Typography
        variant="h1"
        color="blue"
        className="mb-4 text-3xl md:text-4xl lg:text-4xl text-center mt-8"
      >
        Destinasi
      </Typography>
      <div className="w-72 flex justify-center mx-auto">
        <Input
          label="Cari destinasi"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="container flex justify-center mx-auto">
        <Card className="overflow-scroll h-full w-full mt-5 items-center">
          <table className="w-full table-auto text-left">
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
              {getPaginatedData().map((dest, index) => {
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
                    <td className={`${classes} w-1/5`}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {dest.img_dest}
                      </Typography>
                    </td>
                    <td className={`${classes} flex items-center`}>
                      <Button
                        href="#"
                        onClick={() => {
                          setIsEditMode(true);
                          setEditData({
                            id: dest.id,
                            nama_dest: dest.nama_dest,
                            lokasi_dest: dest.lokasi_dest,
                            deskripsi_dest: dest.deskripsi_dest,
                            rating_dest: dest.rating_dest,
                            img_dest: dest.img_dest,
                          });
                          if (formRef.current) {
                            formRef.current.scrollIntoView({
                              behavior: "smooth",
                            });
                          }
                        }}
                        color="blue"
                        size="sm"
                        className="mr-3"
                      >
                        Edit
                      </Button>
                      <DeleteDialog
                        handleDelete={() => handleDelete(dest.id)}
                        closeModal={() => handleDeleteConfirmation(null)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={Math.ceil(data.tb_destinasi.length / itemsPerPage)}
            />
          </div>
        </Card>
      </div>

      <Link to={"/tambah"}>
        <Button
          variant="text"
          className="mx-auto flex items-center justify-center gap-2 mt-9"
        >
          <ArrowLongLeftIcon strokeWidth={2} className="h-5 w-5" /> Kembali
        </Button>
      </Link>
    </div>
  );
};

export default EditData;
