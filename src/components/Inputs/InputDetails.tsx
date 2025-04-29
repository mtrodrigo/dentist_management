import { RegisterOptions } from 'react-hook-form';

interface InputProps {
  name: string;
  text: string;
  value?: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  rules?: RegisterOptions;
}

export default function InputDetails({
  name,
  text,
  value,
  type,
  onChange,
  onBlur,
  error,
  rules,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-0.5 w-10/10">
      <label className={error ? "text-red-500" : "text-blue-500"} htmlFor={name}>
        {error ? error : text}
      </label>
      <input
        className="bg-blue-100 p-1"
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        {...props}
      />
    </div>
  );
}
