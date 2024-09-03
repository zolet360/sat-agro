import Button from "@/components/Button";
import Input from "@/components/Input";
import { useState } from "react";

interface User {
  nome: string;
  email: string;
  senha: string;
  confirmaSenha: string;
}

export default function Usuario() {
  const [formData, setFormData] = useState<User>({
    nome: "",
    email: "",
    senha: "",
    confirmaSenha: "",
  });

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <div className="bg-white w-[400px] h-[600px] absolute rounded-3xl flex items-center flex-col p-7 shadow-custom-dark text-black">
        <h1 className="text-3xl">Cadastro</h1>
        <div className="mt-16 flex flex-col gap-5">
          <Input placeHolder="Nome" value={formData.nome} id="nome" setFormData={setFormData} />
          <Input type="email" placeHolder="E-mail" value={formData.email} id="email" setFormData={setFormData} />
          <Input placeHolder="Senha" value={formData.senha} id="senha" setFormData={setFormData} />
          <Input placeHolder="Confirmar Senha" value={formData.confirmaSenha} id="confirmaSenha" setFormData={setFormData} />
        </div>
        <Button className="text-white mt-28 h-12 w-40 text-xl hover:text-lg">Confirmar</Button>
      </div>
      <div className="w-screen h-1/3 flex justify-center items-center bg-black"></div>
      <div className="w-screen h-2/3 flex justify-center items-center bg-green"></div>
    </div>
  );
}
