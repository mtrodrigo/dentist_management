import Box from '@mui/material/Box';
import { InputLogin } from '../../components/Inputs/InputLogin';
import { Button } from '@mui/material';


export const Login = () => {
    return (
        <>
            <img className='max-w-60 md:max-w-md' src="../../../src/assets/logo.png" alt="Logo" />
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center', justifyContent: 'center', p: 2, border: '1px solid #424242', borderRadius: 2, boxShadow: 3, maxWidth: 500, minHeight: 300, bgcolor: '#424242' }}>
                <h1 className='text-2xl text-center text-blue-500'>Faça o login</h1>
                <InputLogin
                    label='Usuário'
                    type='email'
                />
                <InputLogin
                    label='Senha'
                    type='password'
                />
                <Button 
                    variant="outlined"
                    color='primary'
                >
                    Entrar
                </Button>
            </Box>
        </>
    )
}