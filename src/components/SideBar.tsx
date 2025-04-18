import Navigation from "./Navgation";
import logo from "../../public/assets/logo.png";
import Image from "next/image";
import { Cog6ToothIcon, Cog8ToothIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/router";

interface SideBarProps {
  title: string;
  user?: any;
}

export default function SideBar({ title, user }: SideBarProps) {
  const router = useRouter();
  return (
    <div className="h-screen w-[300px] fixed bg-green shadow-custom-dark z-50">
      <div className="flex justify-center py-4 w-full">
        <Image onClick={() => router.push("/home")} className="w-32 h-32 cursor-pointer" src={logo} alt="logo" />
      </div>
      <div className="flex justify-center mt-20 w-full px-5">
        <Navigation />
      </div>
      <div className="w-full flex flex-col justify-center items-center mt-16 ">
        <UserCircleIcon className="size-20 " />
        <div className="flex flex-row items-center gap-3">
          <h1 className="text-lg">{user.nome}</h1>
          <Cog6ToothIcon className="size-5 hover:scale-110 cursor-pointer transition-transform duration-300" onClick={() => router.push("/usuario/editar")} />
        </div>
        <h1 className="text-sm">{user.email}</h1>
      </div>
    </div>
  );
}
