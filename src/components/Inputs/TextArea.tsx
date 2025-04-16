interface InputProps {
  name: string;
  text: string;
  value?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export default function TextArea({ name, text, value, onChange }: InputProps) {
  return (
    <div className="flex flex-col gap-0.5 w-10/10">
      <label className="text-blue-500">
        {text}
      </label>
      <textarea className="bg-blue-100 p-1" name={name} onChange={onChange} value={value}/>
    
    </div>
  );
}
