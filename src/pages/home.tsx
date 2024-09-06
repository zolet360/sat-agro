import Button from "@/components/Button";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

import { useEffect } from "react";

type HomeProps = {
  setHeaderTitle: (title: string) => void;
};

export default function Home({ setHeaderTitle }: HomeProps) {
  useEffect(() => {
    setHeaderTitle("Home"); // Atualiza o título do Header para "Home" quando a página é montada
  }, [setHeaderTitle]);

  return (
    <div className="w-full h-full flex justify-center overflow-auto">
      <div className="fixed w-full h-full -z-10 rotate-180 blur-sm" style={{ backgroundImage: "url(assets/foto3.jpeg)", backgroundSize: "cover" }}></div>
      <div className=" flex justify-center w-[40%] p-10 text-2xl overflow-auto">
        <div className="flex flex-col">
          <span className=" bg-black shadow-custom-dark p-5 rounded-4xl mb-10 mt-28">
            O intuito dessa plataforma é trabalhar em cima do data set do satélite Sentinel-2 do projeto Copernicus da (ESA), com finalidade de calcular o NDVI de plantações, facilitando o dia a dia do produtor rural brasileiro.
          </span>
          <div className=" flex justify-center mt-10">
            <Button
              className=" w-auto h-auto text-white bg-black  hover:bg-white hover:text-black text-2xl active:bg-white focus:outline-none 
                focus:ring-2 focus:ring-gray-300"
            >
              {"Buscar Imagem"}
              {<MagnifyingGlassIcon className="size-8" />}
            </Button>
          </div>
        </div>
      </div>
      <div className="w-[50%]  h-full flex justify-end  overflow-hidden">
        <img src="assets/foto2.jpg" className="w-[1200px] h-[1100px] object-cover rounded-full fixed right-[-18%] shadow-custom-dark top-1/2 transform -translate-y-1/2 " />
      </div>
    </div>
  );
}
