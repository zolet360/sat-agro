interface inputProps {
  label?: string;
  value: any;
  id: string;
  className: string;
  type: string;
}

export default function Input({ label, value, id, className, type, ...props }: inputProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-black font-semibold">{label}</label>
      <input
        className="px-3 py-3 rounded-lg shadow-md text-black outline-none"
        type={type}
        value={value}
        id={id}
        name={id}
        {...props}
      />
    </div>
  );
}
