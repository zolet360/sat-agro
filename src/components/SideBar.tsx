import Navigation from "./Navgation";
import logo from "../../public/assets/logo.png";
import Image from "next/image";

export default function SideBar() {
  return (
    <div className="h-screen w-[300px] fixed bg-green shadow-custom-dark">
      <div className="flex justify-center py-4 w-full">
        <Image className="w-32 h-32" src={logo} alt="logo" />
      </div>
      <div className="flex justify-center mt-20 w-full px-5">
        <Navigation />
      </div>
    </div>
  );
}
