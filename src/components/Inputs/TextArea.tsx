interface InputProps {
  name: string;
  text: string;
  value?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: string;
}

export default function TextArea({ name, text, value, onChange, error, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-0.5 w-10/10">
      <label className={error ? "text-red-500" : "text-blue-500"}>
        {error ? error : text}
      </label>
      <textarea className="bg-blue-100 p-1" name={name} onChange={onChange} value={value} {...props}/>
    
    </div>
  );
}
