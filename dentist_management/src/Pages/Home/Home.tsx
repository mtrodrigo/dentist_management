import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PlusIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';


interface Data {
    name: string;
    cpf: string;
    lastConsult: string;
}

const rows = [
    {
        name: 'Rodrigo Marques Tavares',
        cpf: '07540522658',
        lastConsult: '25/02/2021'
    },
    {
        name: 'Marilia de Souza Dias',
        cpf: '07997287647',
        lastConsult: '25/02/2021'
    },
    {
        name: 'Rodrigo Marques Tavares',
        cpf: '07540522658',
        lastConsult: '25/02/2021'
    },
    {
        name: 'Marilia de Souza Dias',
        cpf: '07997287647',
        lastConsult: '25/02/2021'    
    }
];

export const Home = () => {
    return (
        <main className='px-3'>
            <TableContainer component={Paper}>
                <Table sx={{ maxWidth: 650, color: 'transparent' }} size="small" aria-label="">
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
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.cpf}</TableCell>
                                <TableCell align="center">{row.lastConsult}</TableCell>
                                <TableCell align="center">
                                    <Link to="/details">
                                        <PlusIcon color='info' />
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </main>

    )
}