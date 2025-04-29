import { TextField } from "@mui/material";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputLoginProps {
  label: string;
  type: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
}

export const InputLogin = ({
  label,
  type,
  name,
  register,
  rules,
  error,
}: InputLoginProps) => {
  return (
    <>
      <TextField
        hiddenLabel
        size="small"
        label={label}
        fullWidth
        type={type}
        color="primary"
        variant="outlined"
        {...register(name, rules)}
        defaultValue=""
        inputProps={{ style: { color: "white" } }}
        sx={{
          "& .MuiInputLabel-root": { color: "#1976d2" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "gray" },
            "&:hover fieldset": { borderColor: "#1976d2" },
          },
        }}
      />
      {error && <small className="text-red-500">{error}</small>}
    </>
  );
};
