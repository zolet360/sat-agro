import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import service from "@/services/analise";
import { formatData } from "@/utils/mask";
import ImagemFirebase from "@/components/ImagemFirebase";

interface SuasImagensProps {
  user: any;
  setHeaderTitle: (title: string) => void;
}

export default function Parametros({ user, setHeaderTitle }: SuasImagensProps) {
  const [formUser, setFormUser] = useState(user);
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setHeaderTitle("Suas Imagens");

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setFormUser(parsedUser);
    }
  }, [setHeaderTitle]);

  useEffect(() => {
    if (formUser?.id) {
      fetchData(formUser.id);
    }
  }, [formUser]);

  async function fetchData(id: number) {
    try {
      const response = await service.imagens(id, 1);
      console.log(response);
      setData(response.rows);
      setTotalPages(response.totalPages);
      setPage(response.page);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="w-full h-full flex items-center  justify-center">
        <div className="bg-black w-[1200px] min-h-[700px] rounded-4xl border border-light-soft-black pl-10 pr-10 pb-10 pt-5 flex flex-col gap-5">
          <h1 className="text-2xl font-semibold ">{"Lista de Imagens"}</h1>

          {data.length === 0 && (
            <div className="flex items-center justify-center h-[500px]">
              <h1 className="text-xl">Nenhuma imagem encontrada.</h1>
            </div>
          )}

          {data.map((imagem: any) => (
            <div className="bg-soft-black w-full h-32 rounded-2xl flex items-center p-5 gap-5">
              <ImagemFirebase path={imagem.path} userId={formUser.id} />
              <div className="h-24 justify-between flex flex-col">
                <div className="flex gap-2 ">
                  <span className="text-xl">Título:</span>
                  <h1 className="text-xl font-semibold">{imagem.titulo}</h1>
                </div>
                <div className="flex gap-2">
                  <span className="">Data Imagem:</span>
                  <h1 className="font-semibold">{formatData(imagem.dataImagem)}</h1>
                </div>
                <div className="flex gap-2">
                  <span className="">Data Análise:</span>
                  <h1 className="font-semibold">{formatData(imagem.createdAt)}</h1>
                </div>
              </div>
              <div className="h-24 items-end flex gap-2">
                <span className="text-xl">NDVI:</span>
                <h1 className="text-xl font-semibold">{imagem.ndvi ? parseFloat(imagem.ndvi).toFixed(2) : "--"}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
