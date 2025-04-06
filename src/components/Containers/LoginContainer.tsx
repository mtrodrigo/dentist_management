import { Box } from "@mui/material";
import { ChildrenProps } from "../../context/UserContext";

export function LoginContainer({ children }: ChildrenProps) {
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        border: "1px solid #424242",
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: 500,
        minHeight: 300,
        bgcolor: "#424242",
      }}
    >
      {children}
    </Box>
  );
}
