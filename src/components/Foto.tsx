import { UserIcon } from "@heroicons/react/16/solid";
import React, { useEffect, useState } from "react";

interface FotoProps {
  id: string;
  formData: any;
  setFormData: any;
}

const Foto = ({ id, formData, setFormData }: FotoProps) => {
  const [previewUrl, setPreviewUrl] = useState("");

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    const name = event.target.name;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: typeof reader.result === "string" ? reader.result.split(",")[1] : "",
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (formData.foto && formData.foto.type === "Buffer" && Array.isArray(formData.foto.data)) {
      const uint8Array = new Uint8Array(formData.foto.data);
      const blob = new Blob([uint8Array], { type: "image/*" }); // ajuste o tipo conforme necessário
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
    }
  }, [formData.foto]);

  return (
    <div className="flex flex-col">
      <div className="w-32 h-32 bg-soft-black rounded-3xl border border-light-soft-black shadow-md hover:opacity-55 transition-all duration-300 mt-4">
        <input style={{ display: "none" }} id="photo-upload-input" type="file" accept="image/*" onChange={handleFileChange} name={id} />
        <label htmlFor="photo-upload-input" className="flex  flex-col items-center text-end cursor-pointer object-cover relative">
          {previewUrl ? <img src={previewUrl} alt="Preview" className="w-32 h-32 object-cover rounded-3xl" /> : <UserIcon className="size-32 text-black" />}
        </label>
      </div>
    </div>
  );
};

export default Foto;
