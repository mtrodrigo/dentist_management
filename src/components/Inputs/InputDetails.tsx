interface InputProps {
  name: string;
  text: string;
  value?: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function InputDetails({
  name,
  text,
  value,
  type,
  onChange,
  onBlur,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-0.5 w-10/10">
      <label className="text-blue-500" htmlFor={name}>
        {text}
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
