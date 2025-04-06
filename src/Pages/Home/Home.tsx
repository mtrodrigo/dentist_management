import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PlusIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

interface Data {
  name: string;
  cpf: string;
  lastConsult: string;
}

const rows = [
  {
    name: "Teste 1",
    cpf: "11111111111",
    lastConsult: "25/02/2021",
  },
  {
    name: "Teste 2",
    cpf: "22222222222",
    lastConsult: "25/02/2021",
  },
  {
    name: "Teste 3",
    cpf: "33333333333",
    lastConsult: "25/02/2021",
  },
  {
    name: "Teste 4",
    cpf: "44444444444",
    lastConsult: "25/02/2021",
  },
  {
    name: "Teste 5",
    cpf: "55555555555",
    lastConsult: "25/02/2021",
  },
  {
    name: "Teste 6",
    cpf: "66666666666",
    lastConsult: "25/02/2021",
  },
  {
    name: "Teste 7",
    cpf: "77777777777",
    lastConsult: "25/02/2021",
  },
  {
    name: "Teste 8",
    cpf: "88888888888",
    lastConsult: "25/02/2021",
  } as Data,
];

export const Home = () => {
  return (
    <main className="px-3">
      <TableContainer component={Paper}>
        <Table
          sx={{ maxWidth: 650, color: "transparent" }}
          size="small"
          aria-label=""
        >
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="center">CPF</TableCell>
              <TableCell align="center">Ultima Consulta</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, id) => (
              <TableRow
                key={id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.cpf}</TableCell>
                <TableCell align="center">{row.lastConsult}</TableCell>
                <TableCell align="center">
                  <Link to="/details">
                    <PlusIcon color="info" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
};
