import { api } from "@/config/api";

const URLBASE = "/image";

async function buscarImagem(data: any) {
  const response = await api.post(URLBASE, data);
  return response.data;
}

export default { buscarImagem };
