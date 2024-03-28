"use client";

import { Suspense, lazy, useEffect, useState } from "react";
import { logOut, selectCurrentTokens } from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { Canvas } from "@react-three/fiber";

import Cookies from "js-cookie";
// import Link from "next/link";
import Simpson from "@/models/Simpson";
import useAuth from "@/hooks/useAuth";
import {
  Avatar,
  Box,
  Button,
  ButtonProps,
  Container,
  Divider,
  IconButton,
  ListItemIcon,
  // ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import Link from "next/link";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";

const NavBar = () => {
  const router = useRouter();

  const { isAuth, tokens } = useAuth();

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    Cookies.remove("tokens");
    dispatch(logOut({}));

    router.push("/login");
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header
      style={{
        position: "fixed",
        width: "100%",
        left: 0,
        top: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        zIndex: 50,
      }}
    >
      <Container
        component={"div"}
        style={{
          maxWidth: "1600px",
          padding: "0 15px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          href={"/"}
          style={{
            width: "75px",
            overflow: "none",
          }}
        >
          <Canvas
            camera={{ fov: 30, near: 0.1, far: 1000 }}
            style={{
              // display: "flex",
              // alignItems: "center",
              // justifyContent: "center",
              // overflow: "none",
              transition: "all 0.3s ease",
            }}
          >
            <Suspense fallback={"loading"}>
              {/* <OrbitControls /> */}
              <directionalLight intensity={2} />
              <hemisphereLight intensity={0.5} />
              {/* <directionalLight
              color="orange"
              position={[0, 0, 5]}
              intensity={0.2}
            /> */}

              <Simpson />
            </Suspense>
          </Canvas>
        </Link>
        {isAuth && tokens.user && (
          <Box
            component={"div"}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "2.5rem",
            }}
          >
            <Link href={"/onlater"}>
              <Typography
                sx={{
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#00a2ff",
                  },
                }}
              >
                On Later
              </Typography>
            </Link>
            <Link href={"/liked"}>
              <Typography
                sx={{
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#00a2ff",
                  },
                }}
              >
                Liked
              </Typography>
            </Link>

            {/* <Button
              variant="outlined"
              sx={{ color: "white" }}
              onClick={handleLogout}
            >
              Log Out
            </Button> */}

            <Tooltip title={tokens.user?.email}>
              <IconButton
                onClick={handleClick}
                size="small"
                aria-controls={open ? "account-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar
                  sx={{
                    width: 42,
                    height: 42,
                    userSelect: "none",
                    backgroundColor: "#00a2ff",
                    fontSize: "1rem",
                  }}
                  src={tokens?.user?.picture && tokens.user.picture}
                  alt={tokens.user?.name}
                >
                  {tokens.user?.name.split(" ")[0][0]}
                  {tokens.user?.name.split(" ").length > 1
                    ? tokens.user?.name.split(" ")[1][0]
                    : ""}
                </Avatar>
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              sx={{
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                // "&::before": {
                //   content: '""',
                //   display: "block",
                //   position: "absolute",
                //   top: 0,
                //   right: 14,
                //   width: 10,
                //   height: 10,
                //   bgcolor: "background.paper",
                //   transform: "translateY(-50%) rotate(45deg)",
                //   zIndex: 0,
                // },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleClose} href="profile">
                <Avatar src={tokens.user?.picture} /> {tokens.user?.name}
              </MenuItem>
              {/* <MenuItem onClick={handleClose}>
                <Avatar /> My account
              </MenuItem> */}
              <Divider />
              {/* <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                Add another account
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem> */}
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Container>
    </header>
  );
};

export default NavBar;
