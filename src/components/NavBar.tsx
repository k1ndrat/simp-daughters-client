"use client";

import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import { Canvas } from "@react-three/fiber";
import Simpson from "@/models/Simpson";

import {
  Avatar,
  Box,
  Container,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { Logout } from "@mui/icons-material";
import { useLogoutMutation } from "@/features/auth/authApiSlice";
import useAuth from "@/hooks/useAuth";

const NavBar = () => {
  const router = useRouter();

  const { isAuth, user } = useAuth();

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    await logout(null);
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
        {isAuth && user?.email && (
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

            <Tooltip title={user?.email}>
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
                  src={user?.picture && user.picture}
                  alt={user?.name}
                >
                  {user?.name.split(" ")[0][0]}
                  {user?.name.split(" ").length > 1
                    ? user?.name.split(" ")[1][0]
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
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleClose} href="profile">
                <Avatar src={user?.picture} /> {user?.name}
              </MenuItem>
              <Divider />
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
