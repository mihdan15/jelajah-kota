import React, { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const [openNav, setOpenNav] = React.useState(false);
  const location = useLocation();
  const [showAdminDialog, setShowAdminDialog] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [previousPage, setPreviousPage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedPreviousPage = sessionStorage.getItem("previousPage");
    setPreviousPage(storedPreviousPage);
    sessionStorage.setItem("previousPage", location.pathname);

    if (
      (storedPreviousPage === "/tambah" &&
        location.pathname.includes("/edit")) ||
      (!storedPreviousPage && location.pathname.includes("/edit"))
    ) {
      // Redirect to edit page without asking for the admin password
      navigate(location.pathname);
    } else if (
      storedPreviousPage !== "/tambah" &&
      location.pathname.includes("/edit")
    ) {
      // Redirect to home if trying to access edit page from a different page without admin password
      navigate("/");
    }
  }, [location.pathname, navigate]);

  const handleOpenAdminDialog = () => {
    setShowAdminDialog(true);
  };

  const handleCloseAdminDialog = () => {
    setShowAdminDialog(false);
    setPassword("");
    setPasswordError(false);
    navigate(-1);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(false);
  };

  const handleConfirmAdmin = () => {
    if (password === "123456") {
      if (location.pathname === "/tambah") {
        navigate("/tambah");
      }
      handleCloseAdminDialog();
      // Redirect to the desired page (tambah or edit)
      // You can use React Router's useNavigate hook here
    } else {
      setPasswordError(true);
    }
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Link to={"/"}>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className={`p-1 font-normal hover:text-blue-500 ${
            location.pathname === "/" ? "font-bold text-blue-500" : ""
          }`}
        >
          <a className="flex items-center">Home</a>
        </Typography>
      </Link>
      <Link to={"/destinasi"}>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className={`p-1 font-normal hover:text-blue-500 ${
            location.pathname === "/destinasi" ? "font-bold text-blue-500" : ""
          }`}
        >
          <a className="flex items-center">Destinasi</a>
        </Typography>
      </Link>
      <Link to={"/gallery"}>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className={`p-1 font-normal hover:text-blue-500 ${
            location.pathname === "/gallery" ? "font-bold text-blue-500" : ""
          }`}
        >
          <a className="flex items-center">Gallery</a>
        </Typography>
      </Link>
      <Link to={"/about"}>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className={`p-1 font-normal hover:text-blue-500 ${
            location.pathname === "/about" ? "font-bold text-blue-500" : ""
          }`}
        >
          <a className="flex items-center">About</a>
        </Typography>
      </Link>
      <Link to={"/contact"}>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className={`p-1 font-normal hover:text-blue-500 ${
            location.pathname === "/contact" ? "font-bold text-blue-500" : ""
          }`}
        >
          <a className="flex items-center">Contact Us</a>
        </Typography>
      </Link>
    </ul>
  );

  return (
    <>
      <Navbar className="sticky inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Link to={"/"}>
            <Typography
              as="a"
              className="mr-4 cursor-pointer py-1.5 font-medium"
            >
              Jelajah<span className="font-bold">Kota</span>
            </Typography>
          </Link>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <Link to="/tambah">
              {location.pathname !== "/tambah" &&
                location.pathname !== "/edit" && (
                  <Button
                    variant="gradient"
                    size="sm"
                    className="hidden lg:inline-block"
                    onClick={handleOpenAdminDialog}
                  >
                    <span>Admin</span>
                  </Button>
                )}
            </Link>
            <Dialog
              open={showAdminDialog}
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: -100 },
              }}
            >
              <DialogHeader>Enter Admin Password</DialogHeader>
              <DialogBody divider>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  error={passwordError}
                />
                {passwordError && (
                  <p className="text-red-500 mt-2">
                    Incorrect password. Please try again.
                  </p>
                )}
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={handleCloseAdminDialog}
                  className="mr-1"
                >
                  <span>Cancel</span>
                </Button>
                <Button
                  variant="gradient"
                  color="blue"
                  onClick={handleConfirmAdmin}
                >
                  <span>Confirm</span>
                </Button>
              </DialogFooter>
            </Dialog>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {navList}
          <Link to="/tambah">
            {location.pathname !== "/tambah" &&
              location.pathname !== "/edit" && (
                <Button variant="gradient" size="sm" fullWidth className="mb-2">
                  <span>Admin</span>
                </Button>
              )}
          </Link>
        </MobileNav>
      </Navbar>
    </>
  );
}
