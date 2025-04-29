import { Box } from "@mui/material";
import { ChildrenProps } from "../../context/UserContext";

export function LoginContainer({ children }: ChildrenProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        border: "1px solid #BDBDBD",
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
