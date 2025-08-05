import Input from "@/components/Input";

interface FormParametrosProps {
  formData: any;
  setFormData: any;
}

export default function FormParametros({ formData, setFormData }: FormParametrosProps) {
  return (
    <div className="gap-5 flex flex-col">
      <span>O Sistema reconhece primeiro Latitude e depois Longitude. Na duvida, copie e cole diretamente do google maps</span>
      <div className="flex gap-5 w-full">
        <Input className="w-full" id="descricao" value={formData.descricao} setFormData={setFormData} label="Nome do Parâmetro" required={true}></Input>
      </div>
      <div className="flex gap-5 w-full">
        <Input className="w-full" id="coordenada1" placeholder="Ex: -23.586945253991747, -46.68877650651415" value={formData.coordenada1} setFormData={setFormData} label="Coordenada 1" required={true}></Input>
      </div>
      <div className="flex gap-5 w-full">
        <Input className="w-full" id="coordenada2" value={formData.coordenada2} setFormData={setFormData} label="Coordenada 2" required={true}></Input>
      </div>
      <div className="flex gap-5 w-full">
        <Input className="w-full" id="coordenada3" value={formData.coordenada3} setFormData={setFormData} label="Coordenada 3" required={true}></Input>
      </div>
      <div className="flex gap-5 w-full">
        <Input className="w-full" id="coordenada4" value={formData.coordenada4} setFormData={setFormData} label="Coordenada 4" required={true}></Input>
      </div>
      <div className="flex gap-5 w-full">
        <Input className="w-full" id="inicio" value={formData.inicio} setFormData={setFormData} label="Data inicio " type="date"></Input>
        <Input className="w-full" id="fim" value={formData.fim} setFormData={setFormData} label="Data Fim" type="date"></Input>
      </div>
    </div>
  );
}
