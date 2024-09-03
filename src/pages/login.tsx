import Button from "@/components/Button";
import Input from "@/components/Input";
import { UserCircleIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({
    email: null,
    senha: null,
  });

  const router = useRouter();

  function handleNavigation(): void {
    router.push("/home");
  }

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <div className="bg-white w-[450px] h-[600px] absolute rounded-3xl flex flex-col items-center p-7 shadow-custom-dark">
        <UserCircleIcon className=" text-green w-40 h-40" />

        <div className="w-full mt-14 flex flex-col gap-7">
          <Input type="email" value={formData.email} id="email" placeHolder={"E-mail"} />
          <Input type="password" value={formData.senha} id="senha" placeHolder={"Senha"} />
        </div>

        <div className="w-full mt-10 flex flex-col gap-7">
          <Button className="bg-green hover:bg-green-more-dark font-medium" onClick={handleNavigation}>
            Login
          </Button>
          <Button className="bg-green hover:bg-green-more-dark font-medium">Cadastre-se</Button>
        </div>
      </div>
      <div className="w-screen h-1/3 flex justify-center items-center bg-black"></div>
      <div className="w-screen h-2/3 flex justify-center items-center bg-green"></div>
    </div>
  );
}
