import Button from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image";
import { useState } from "react";
import logo from "../../../public/assets/logo.png";
import service from "@/services/usuario";
import { useRouter } from "next/router";

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

  function limpaForm() {
    setFormData({ nome: "", email: "", senha: "", confirmaSenha: "" });
  }

  const router = useRouter();

  function verificaSenha(formData: any): boolean {
    if (formData.senha != "" && formData.confirmaSenha != "") {
      const senha: string = formData.senha;
      const confirmaSenha: string = formData.confirmaSenha;
      return senha === confirmaSenha;
    }
    return false;
  }

  async function handleCriaUsuario() {
    try {
      if (verificaSenha(formData)) {
        await service.adicionarUsuario(formData);
        limpaForm();
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <div className="bg-black w-[400px] h-[600px] absolute rounded-3xl flex items-center flex-col p-7 shadow-custom-dark">
        <Image src={logo} alt="logo" className="size-14" />
        <h1 className="text-3xl mt-5">Cadastro</h1>
        <div className="mt-10 flex flex-col gap-5 w-full">
          <Input placeholder="Nome" value={formData.nome} id="nome" setFormData={setFormData} />
          <Input autoComplete="off" type="email" placeholder="E-mail" value={formData.email} id="email" setFormData={setFormData} />
          <Input autoComplete="off" type="password" placeholder="Senha" value={formData.senha} id="senha" setFormData={setFormData} />
          <Input type="password" placeholder="Confirmar Senha" value={formData.confirmaSenha} id="confirmaSenha" setFormData={setFormData} />
        </div>
        <Button className="text-white mt-16 h-12 w-40 text-xl hover:text-lg bg-green" onClick={handleCriaUsuario}>
          Confirmar
        </Button>
      </div>
      <div className="w-screen h-1/3 flex justify-center items-center bg-black"></div>
      <div className="w-screen h-2/3 flex justify-center items-center bg-green"></div>
    </div>
  );
}
