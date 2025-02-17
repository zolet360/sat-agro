import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FormParametros from "./form-parametros";
import Button from "@/components/Button";
import service from "@/services/parametro";
import CustomModal from "@/components/Modal";

interface ParametrosProps {
  user: any;
  setHeaderTitle: (title: string) => void;
  formData: any;
  setFormData: (data: any) => void;
}

export default function Parametros({ user, setHeaderTitle, formData, setFormData }: ParametrosProps) {
  const [formUser, setFormUser] = useState(user);
  const router = useRouter();

  useEffect(() => {
    setHeaderTitle("Parametros");
    const storedUser = localStorage.getItem("user");
    setFormUser(JSON.parse(storedUser));
  }, [setHeaderTitle]);

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      const response = await service.adicionarParametro(formData);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="w-full h-full flex items-center  justify-center">
        <div className="bg-black w-[1200px] h-[700px] rounded-4xl shadow-custom-dark pl-10 pr-10 pb-10 pt-5 flex flex-col gap-5">
          <h1 className="text-2xl font-semibold ">{formData.id ? "Editar Parâmetro" : "Novo Parâmetro"}</h1>
          
            <FormParametros formData={formData} setFormData={setFormData} />
          </form>
        </div>
      </div>
    </>
  );
}
