import { Box } from "@mui/material";
import { ChildrenProps } from "../../context/UserContext";

export function PatientContainer({ children }: ChildrenProps) {
  return (
    <Box
      sx={{
        p: 2,
        m: 3,
        border: "1px solid #BDBDBD",
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: 800,
        width: "100%",
        bgcolor: "#424242",
      }}
    >
      {children}
    </Box>
  );
}
