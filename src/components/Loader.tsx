import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Box
      component={"div"}
      sx={{ display: "grid", placeContent: "center", height: "100vh" }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
