import Button from "@/components/Button";
import Input from "@/components/Input";
import { UserCircleIcon, UserIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/router";
import { useState } from "react";
import logo from "../../public/assets/logo.png";
import Image from "next/image";
import service from "@/services/usuario";

export default function Login() {
  const [formData, setFormData] = useState({
    email: null,
    senha: null,
  });

  const router = useRouter();

  function handleNavigation(route: string): void {
    router.push(route);
  }

  async function handleLogin() {
    try {
      const response = await service.login(formData);
      localStorage.setItem("token", response.data.token);
      router.push("/home");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <div className="bg-black w-[400px] h-[550px] absolute rounded-3xl flex flex-col items-center p-7 shadow-custom-dark">
        <Image src={logo} alt="logo" className=" text-green w-40 h-40" />

        <div className="w-full mt-12 flex flex-col gap-4">
          <Input type="email" setFormData={setFormData} value={formData.email} id="email" placeholder={"E-mail"} />
          <Input type="password" setFormData={setFormData} value={formData.senha} id="senha" placeholder={"Senha"} />
        </div>

        <div className="w-full mt-10 flex items-center flex-col gap-4">
          <Button className="text-white bg-soft-black  h-12 w-40 text-xl hover:text-lg border-gray-500" onClick={handleLogin}>
            Login
          </Button>
          <a className="text-white shadow-none text-sm hover:text-md cursor-pointer transition-all  border-gray-500 border-solid" onClick={() => handleNavigation("/usuario/cadastro")}>
            Cadastre-se
          </a>
        </div>
      </div>
      <div className="w-screen h-1/3 flex justify-center items-center bg-black"></div>
      <div className="w-screen h-2/3 flex justify-center items-center bg-green"></div>
    </div>
  );
}
