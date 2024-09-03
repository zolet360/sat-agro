import Header from "@/components/Header";
import { useRouter } from "next/router";
import SideBar from "@/components/SideBar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";

const font = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800", "900"] });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const isLoginPage = router.pathname === "/login";

  return (
    <div className={font.className}>
      {!isLoginPage && <Header />}
      {!isLoginPage && <SideBar />}
      <div className={!isLoginPage ? "ps-[300px] pt-16 w-screen h-screen" : "w-screen h-screen"}>
        <Component {...pageProps} />
      </div>
    </div>
  );
}
