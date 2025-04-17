import { TextField } from "@mui/material"

interface InputLoginProps {
    label: string,
    type: string,
    name: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export const InputLogin = ({label ,type, name, onChange, ...props }: InputLoginProps) => {
    return (
        <TextField
            hiddenLabel
            size='small'
            label={label}
            fullWidth
            type={type}
            color="primary"
            variant="outlined"
            name={name}
            onChange={onChange}
            {...props}
            defaultValue=""
            inputProps={{ style: { color: 'white' } }}
            sx={{
                '& .MuiInputLabel-root': { color: '#1976d2' },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'gray' },
                    '&:hover fieldset': { borderColor: '#1976d2' },
                }
            }}
        />
    )
}