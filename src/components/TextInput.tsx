import { TextField, TextFieldProps } from "@mui/material";

const TextInput = (props: TextFieldProps) => {
  return (
    <TextField
      {...props}
      required
      autoComplete="new-password"
      sx={{
        input: { color: "white" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "rgba(255, 255, 255, 0.5)",
            transition: "all 0.3s ease",
          },
          "&:hover fieldset": {
            borderColor: "rgba(255, 255, 255, 0.8)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "rgba(255, 255, 255, 1)",
          },
        },
        "& label.Mui-focused ": {
          color: "white",
        },
        "& label": {
          color: "rgba(255, 255, 255, 0.85)",
        },
      }}
    />
  );
};

export default TextInput;
