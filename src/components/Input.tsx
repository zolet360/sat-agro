import { ChangeEvent } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value: any;
  id: string;
  className?: string;
  type?: string;
  setFormData: (data: any) => void;
}

export default function Input({ label, value, id, className, type = "text", setFormData, ...props }: InputProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  }

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label htmlFor={id} className="text-soft-gray font-semibold">
          {label}
        </label>
      )}
      <input className="px-2 py-1 rounded-lg border-2 border-light-black outline-none bg-soft-black placeholder:text-light-soft-black" type={type} value={value} id={id} name={id} {...props} onChange={handleChange} />
    </div>
  );
}
