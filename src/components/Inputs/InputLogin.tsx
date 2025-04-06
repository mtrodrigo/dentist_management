import { TextField } from "@mui/material"

interface InputLoginProps {
    label: string,
    type: string,
}

export const InputLogin = ({label ,type }: InputLoginProps) => {
    return (
        <TextField
            hiddenLabel
            size='small'
            label={label}
            fullWidth
            type={type}
            name={name}
            onChange={onChange}
            color="primary"
            variant="outlined"
            inputProps={{ style: { color: 'white' } }}
            sx={{
                '& .MuiInputLabel-root': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'white' },
                    '&:hover fieldset': { borderColor: '#1976d2' },
                }
            }}
        />
    )
}