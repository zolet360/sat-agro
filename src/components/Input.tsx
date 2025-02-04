interface inputProps {
  label?: string;
  value: any;
  id: string;
  className?: string;
  type?: string;
  setFormData: any;
}

export default function Input({ label, value, id, className, type, setFormData, ...props }: inputProps) {
  function handleChange(event: any) {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  }

  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-soft-gray font-semibold">{label}</label>
      <input className="px-3 py-2 rounded-lg border-2 border-light-black outline-none bg-soft-black placeholder:text-light-soft-black" type={type} value={value} id={id} name={id} {...props} onChange={handleChange} />
    </div>
  );
}
