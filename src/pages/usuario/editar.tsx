import Button from "@/components/Button";
import Foto from "@/components/Foto";
import Input from "@/components/Input";
import { useEffect, useState } from "react";
import service from "@/services/usuario";
import { useRouter } from "next/router";
import { showToast } from "@/components/toast";

interface EditarUsuarioProps {
  user: any;
  setHeaderTitle: (title: string) => void;
}

export default function EditarUsuario({ user, setHeaderTitle }: EditarUsuarioProps) {
  const [formUser, setFormUser] = useState(user);

  const router = useRouter();

  useEffect(() => {
    setHeaderTitle("Editar Usuário");
    const storedUser = localStorage.getItem("user");
    setFormUser(JSON.parse(storedUser));
  }, [setHeaderTitle]);

  async function handleEditUser() {
    if (user.id) {
      try {
        const response = await service.editaUsuario(formUser.id, formUser);
        console.log(response.data);
        setFormUser(response.data);
        showToast("Usuário Editado!", "success");
      } catch (error) {
        console.log(error);
        showToast(`${error}`, "error");
      }
    }
  }

  return (
    <div className="w-full h-full flex items-center  justify-center">
      <div className="bg-black w-[1200px] h-[700px] rounded-4xl shadow-custom-dark p-10 flex flex-col justify-between">
        <div className="gap-5 flex flex-col">
          <Foto formData={formUser} setFormData={setFormUser} id="foto" />
          <Input value={formUser.nome} id="nome" setFormData={setFormUser} label="Nome" />
          <Input value={formUser.email} id="email" setFormData={setFormUser} label="E-mail" />
        </div>
        <div className="flex w-full justify-end space-x-3">
          <Button className="text-red-600 outline hover:shadow-custom-dark outlin hover:outline-none hover:bg-red-600 font-semibold hover:text-white" onClick={() => router.push("/home")}>
            voltar
          </Button>
          <Button className="text-green outline hover:shadow-custom-dark outlin hover:outline-none hover:bg-green font-semibold hover:text-white" onClick={handleEditUser}>
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
}
