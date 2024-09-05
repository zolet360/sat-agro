import Header from "@/components/Header";
import { useRouter } from "next/router";
import SideBar from "@/components/SideBar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import service from "@/services/usuario";

const font = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800", "900"] });

export default function App({ Component, pageProps }: AppProps) {
  const [headerTitle, setHeaderTitle] = useState("");
  const [user, setUser] = useState({});
  const router = useRouter();

  const isLoginPage = router.pathname === "/login" || router.pathname === "/usuario/cadastro";

  async function buscaUserLogado() {
    try {
      const response = await service.me();
      console.log(response.data);
      const userGuadado = localStorage.getItem("user");
      console.log(user);
      if (userGuadado) {
        setUser(JSON.parse(userGuadado));
      } else {
        localStorage.setItem("user", JSON.stringify(response.data));
        setUser(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log(isLoginPage);
    if (!isLoginPage) {
      buscaUserLogado();
    }
  }, [router.pathname]);

  return (
    <div className={font.className}>
      {!isLoginPage && <Header title={headerTitle} user={user} />}
      {!isLoginPage && <SideBar title={headerTitle} user={user} />}
      <div className={!isLoginPage ? "ps-[300px] pt-16 w-screen h-screen" : "w-screen h-screen"}>
        <Component {...pageProps} setHeaderTitle={setHeaderTitle} user={user} />
      </div>
    </div>
  );
}
