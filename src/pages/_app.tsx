import Header from "@/components/Header";
import { useRouter } from "next/router";
import SideBar from "@/components/SideBar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Kanit } from "next/font/google";
import { useEffect, useState } from "react";

const font = Kanit({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800", "900"] });

export default function App({ Component, pageProps }: AppProps) {
  const [url, setUrl] = useState<any>(null);
  const router = useRouter();
  function verificaURL() {
    const currentURL = router.asPath;
    setUrl(currentURL);
  }

  useEffect(() => {
    verificaURL();
  }, []);

  return (
    <>
      {url !== "/login" ? (
        <div className={font.className}>
          <Header />
          <SideBar />
          <div className=" ps-[300px] pt-16 w-screen h-screen ">
            <Component {...pageProps} />
          </div>
        </div>
      ) : (
        <div className={font.className}>
          <Component {...pageProps} />
        </div>
      )}
    </>
  );
}
