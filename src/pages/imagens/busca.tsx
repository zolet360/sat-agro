import Button from "@/components/Button";
import Input from "@/components/Input";
import { useEffect, useState } from "react";
import service from "@/services/imagem";
import parametroService from "@/services/parametro";
import ImageDiv from "@/components/ImageDiv";
import { Autocomplete } from "@/components/Autocomplete";
import { showToast } from "@/components/toast";
import CustomModal from "@/components/Modal";
import { formatarDataComTracos } from "@/utils/mask";
import serviceAnalise from "@/services/analise";

interface buscaImagemProps {
  user: any;
  setHeaderTitle: (title: string) => void;
}

export default function BuscaImagem({ setHeaderTitle, user }: buscaImagemProps) {
  const [formUser, setFormUser] = useState(user);
  const [imagem, setImagem] = useState<any>(null);
  const [ndvi, setNdvi] = useState<any>(null);
  const [loading, setLoading] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);
  const today = new Date();

  const [formData, setFormData] = useState({
    parametro: { label: null, value: null },
    titulo: "",
    dataImagem: null,
    ndvi: null,
    user_id: null,
    path: null,
  });

  const [formCoordenadas, setFormCoordenadas] = useState({
    coordenada1: "",
    coordenada2: "",
    coordenada3: "",
    coordenada4: "",
  });

  const [formBusca, setFormBusca] = useState({
    lat1: "",
    lon1: "",
    lat2: "",
    lon2: "",
    lat3: "",
    lon3: "",
    lat4: "",
    lon4: "",
    inicio: null,
    fim: null,
  });

  function limpaFormBusca() {
    setFormBusca({
      lat1: "",
      lon1: "",
      lat2: "",
      lon2: "",
      lat3: "",
      lon3: "",
      lat4: "",
      lon4: "",
      inicio: null,
      fim: null,
    });
  }

  function limpaFormData() {
    setFormData({
      parametro: { label: null, value: null },
      titulo: "",
      dataImagem: null,
      ndvi: null,
      user_id: null,
      path: null,
    });
    setImagem(null);
    setNdvi(null);
    setData(null);
  }

  useEffect(() => {
    setHeaderTitle("Buscar Imagens");
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setFormUser(parsedUser);
    }
    console.log(formUser);
  }, [setHeaderTitle]);

  function splitString(input: string) {
    if (!input.includes(",")) return [input.trim(), ""];
    return input.split(",").map((str) => str.trim());
  }

  function transformaCoordenadas() {
    const resultado1 = splitString(formCoordenadas.coordenada1);
    formBusca.lat1 = resultado1[0];
    formBusca.lon1 = resultado1[1];
    const resultado2 = splitString(formCoordenadas.coordenada2);
    formBusca.lat2 = resultado2[0];
    formBusca.lon2 = resultado2[1];
    const resultado3 = splitString(formCoordenadas.coordenada3);
    formBusca.lat3 = resultado3[0];
    formBusca.lon3 = resultado3[1];
    const resultado4 = splitString(formCoordenadas.coordenada4);
    formBusca.lat4 = resultado4[0];
    formBusca.lon4 = resultado4[1];
  }

  async function buscarImagens() {
    try {
      await transformaCoordenadas();
      setLoading(true);
      const response = await service.buscarImagem(formBusca);
      setImagem(response.object.url);
      setNdvi(response.object.ndviValue);
      setData(response.object.dateCaptured);
      setLoading(false);
    } catch (error) {
      console.log("erro: " + error);
      showToast("Porra", "error");
      setLoading(false);
    }
  }

  function descartarImagem() {
    setImagem(null);
    setNdvi(null);
  }

  async function importarParametro() {
    try {
      if (formData.parametro.value === "") return;
      const response = await parametroService.buscaPorId(formData.parametro.value, formUser.id);
      setFormCoordenadas({
        coordenada1: response.coordenada1,
        coordenada2: response.coordenada2,
        coordenada3: response.coordenada3,
        coordenada4: response.coordenada4,
      });
      formBusca.inicio = response.inicio?.split("T")[0];
      formBusca.fim = response.fim?.split("T")[0];
      console.log(formBusca);
    } catch (error) {}
  }

  function openModalSalvarImagem() {
    setOpenModal(true);
  }

  function cancelModal() {
    setOpenModal(false);
  }

  async function salvarImagem(e: any) {
    try {
      e?.preventDefault();
      setLoading(true);
      if (imagem === null) return;
      const dataFormatada = formatarDataComTracos(today);
      formData.user_id = formUser.id;
      formData.dataImagem = data;
      formData.ndvi = ndvi;
      formData.path = formData.titulo + "_" + dataFormatada;
      const responseImagem = await fetch(imagem);
      const blob = await responseImagem.blob();
      await uploadImage(blob, formUser.id, formData.titulo, dataFormatada);
      await serviceAnalise.adicionarAnalise(formData);
      limpaFormData();
      limpaFormBusca();
      cancelModal();
      setLoading(false);
      showToast("Imagem salva com sucesso!", "success");
    } catch (error) {
      console.log(error);
    }
  }

  async function uploadImage(blob: Blob, userId: any, filename: string, data: string) {
    try {
      await service.uploadImage(blob, userId, filename, data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <CustomModal
        isOpen={openModal}
        onClose={cancelModal}
        handleSubmit={salvarImagem}
        title="Salvar Análise"
        size="lg"
        buttons={
          <>
            <Button type={"buttom"} onClick={cancelModal} className="text-red-600 outline hover:shadow-custom-dark outlin hover:outline-none hover:bg-red-600 font-semibold hover:text-white">
              voltar
            </Button>
            <Button type={"buttom"} onClick={salvarImagem} className="text-green outline hover:shadow-custom-dark outlin hover:outline-none hover:bg-green font-semibold hover:text-white">
              Confirmar
            </Button>
          </>
        }
      >
        {loading ? (
          <div className="flex flex-col gap-5 items-center justify-center">
            <p className="text-white text-2xl">Salvando Imagem...</p>
            <div className="loader"></div>
          </div>
        ) : (
          <Input className="w-full" id="titulo" value={formData.titulo} setFormData={setFormData} label="Título da Análise"></Input>
        )}
      </CustomModal>
      <div className="p-10 flex justify-center items-center">
        <div className="w-[1400px] bg-black h-[700px] rounded-4xl border flex  gap-10 border-light-soft-black p-7">
          <div className=" flex flex-col gap-5 w-1/2 items-center">
            <div className="flex gap-5 w-full">
              <Autocomplete
                class_name="w-[70%]"
                label="Importar Parametros"
                setFormData={setFormData}
                placeholder="Importar Parametros Salvos"
                user_id={formUser.id}
                id="parametro"
                url="parametro/autocomplete"
                value={formData.parametro}
              ></Autocomplete>
              <Button onClick={importarParametro} className=" text-blue-600 outline hover:shadow-custom-dark outlin hover:outline-none hover:bg-blue-600 h-10 mt-5 font-semibold hover:text-white">
                Importar
              </Button>
            </div>
            <div className="flex gap-5 w-full">
              <Input className="w-full" id="coordenada1" value={formCoordenadas.coordenada1} setFormData={setFormCoordenadas} label="Coordenada 1"></Input>
            </div>
            <div className="flex gap-5 w-full">
              <Input className="w-full" id="coordenada2" value={formCoordenadas.coordenada2} setFormData={setFormCoordenadas} label="Coordenada 2"></Input>
            </div>
            <div className="flex gap-5 w-full">
              <Input className="w-full" id="coordenada3" value={formCoordenadas.coordenada3} setFormData={setFormCoordenadas} label="Coordenada 3"></Input>
            </div>
            <div className="flex gap-5 w-full">
              <Input className="w-full" id="coordenada4" value={formCoordenadas.coordenada4} setFormData={setFormCoordenadas} label="Coordenada 4"></Input>
            </div>
            <div className="flex gap-5 w-full">
              <Input className="w-full" id="inicio" value={formBusca.inicio} setFormData={setFormBusca} label="Data inicio " type="date"></Input>
              <Input className="w-full" id="fim" value={formBusca.fim} setFormData={setFormBusca} label="Data Fim" type="date"></Input>
            </div>
            <Button onClick={buscarImagens} className="bg-green text-xl hover:bg-green-more-dark w-1/3 rounded-4xl ">
              Buscar
            </Button>
          </div>
          <div className="flex flex-col items-center w-1/2 ">
            <ImageDiv image={imagem} loading={loading}></ImageDiv>
            {imagem && (
              <>
                <p className="text-white text-xl mt-5">NDVI: {ndvi ? ndvi.toFixed(2) : ""}</p>
                <div className="flex gap-4 mt-7">
                  <Button onClick={openModalSalvarImagem} className="text-blue-500 outline hover:shadow-custom-dark outlin hover:outline-none hover:bg-blue-500 font-semibold hover:text-white">
                    Salvar
                  </Button>
                  <Button className="text-red-600 outline hover:shadow-custom-dark outlin hover:outline-none hover:bg-red-600 font-semibold hover:text-white" onClick={descartarImagem}>
                    Descartar
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
