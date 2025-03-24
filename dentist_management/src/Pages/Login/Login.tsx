import Box from '@mui/material/Box';

export const Login = () => {
    return (
        <div>
            <Box component="form" sx={{ p: 2, border: '1px solid #0B0B61', borderRadius: 2, boxShadow: 3, minWidth: 400, minHeight: 300, bgcolor: '#0B0B61' }}>
                <h1 className='text-2xl text-zinc-400 text-center'>Faça o login</h1>
            </Box>
        </div>
    )
}