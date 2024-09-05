import Button from "@/components/Button";
import Foto from "@/components/Foto";
import Input from "@/components/Input";
import { useEffect, useState } from "react";

interface EditarUsuarioProps {
  user: any;
  setHeaderTitle: (title: string) => void;
}

export default function EditarUsuario({ user, setHeaderTitle }: EditarUsuarioProps) {
  const [formUser, setFormUser] = useState(user);
  useEffect(() => {
    setHeaderTitle("Editar Usuário");
    const storedUser = localStorage.getItem("user");
    setFormUser(JSON.parse(storedUser));
  }, [setHeaderTitle]);

  return (
    <div className="w-full h-full flex items-center  justify-center">
      <div className="bg-black w-[1200px] h-[700px] rounded-4xl shadow-custom-dark p-10 flex flex-col justify-between">
        <div className="gap-5 flex flex-col">
          <Foto formData={formUser} setFormData={setFormUser} id="foto" />
          <Input value={formUser.nome} id="nome" setFormData={setFormUser} label="Nome" />
          <Input value={formUser.email} id="email" setFormData={setFormUser} label="E-mail" />
        </div>
        <div className="flex w-full justify-end space-x-3">
          <Button className="bg-red-400 hover:shadow-custom-dark">voltar</Button>
          <Button className="bg-green hover:shadow-custom-dark">Confirmar</Button>
        </div>
      </div>
    </div>
  );
}
