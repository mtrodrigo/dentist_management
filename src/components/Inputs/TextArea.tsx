interface InputProps {
    name: string;
    text: string;
    value?: string;
    onChange: () => void;
  }
  
  export default function TextArea({name, text, value, onChange}: InputProps) {
    return (
      <div className="flex flex-col gap-0.5 w-10/10">
        <label className="text-blue-500" htmlFor={name}>{text}</label>
        <textarea className="bg-blue-100 p-1" onChange={onChange}>{value}</textarea>
      </div>
    );
  }
  