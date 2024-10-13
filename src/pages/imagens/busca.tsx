import Button from "@/components/Button";
import Input from "@/components/Input";
import { useEffect, useState } from "react";

interface buscaImagemProps {
  setHeaderTitle: (title: string) => void;
}

export default function BuscaImagem({ setHeaderTitle }: buscaImagemProps) {
  useEffect(() => {
    setHeaderTitle("Buscar Imagens");
  }, [setHeaderTitle]);

  const [formBusca, setFormBusca] = useState({
    longitude1: "",
    longitude2: "",
    longitude3: "",
    longitude4: "",
    latitude1: "",
    latitude2: "",
    latitude3: "",
    latitude4: "",
  });

  return (
    <div className="p-10 flex justify-center items-center">
      <div className="w-[1400px] bg-black h-[700px] rounded-4xl border flex  border-light-soft-black p-7">
        <div className=" flex flex-col gap-10 w-1/2 items-center">
          <div className="flex gap-5 w-full">
            <Input className="w-1/2" id="longitude1" value={formBusca.longitude1} setFormData={setFormBusca} label="Longitude 1" type="date"></Input>
            <Input className="w-1/2" id="latitude1" value={formBusca.latitude1} setFormData={setFormBusca} label="Latitude 1" type="date"></Input>
          </div>
          <div className="flex gap-5 w-full">
            <Input className="w-1/2" id="longitude2" value={formBusca.longitude2} setFormData={setFormBusca} label="Longitude 2" type="date"></Input>
            <Input className="w-1/2" id="latitude2" value={formBusca.latitude2} setFormData={setFormBusca} label="Latitude 2" type="date"></Input>
          </div>
          <div className="flex gap-5 w-full">
            <Input className="w-1/2" id="longitude3" value={formBusca.longitude3} setFormData={setFormBusca} label="Longitude 3" type="date"></Input>
            <Input className="w-1/2" id="latitude3" value={formBusca.latitude3} setFormData={setFormBusca} label="Latitude 3" type="date"></Input>
          </div>
          <div className="flex gap-5 w-full">
            <Input className="w-1/2" id="longitude4" value={formBusca.longitude4} setFormData={setFormBusca} label="Longitude 4" type="date"></Input>
            <Input className="w-1/2" id="latitude4" value={formBusca.latitude4} setFormData={setFormBusca} label="Latitude 4" type="date"></Input>
          </div>
          <Button className="bg-green text-xl hover:bg-green-more-dark w-1/2 rounded-4xl ">Buscar</Button>
        </div>
      </div>
    </div>
  );
}
