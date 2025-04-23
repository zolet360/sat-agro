import { api } from "@/config/api";

const URLBASE = "/analise";

async function adicionarAnalise(data: any) {
  console.log(data);
  const request = await api.post(URLBASE, data);
  return request;
}

async function imagens(id: any, page: number) {
  console.log(id);
  const response = await api.get(`${URLBASE}/${id}/${page || 1}`);
  return response.data;
}

export default { adicionarAnalise, imagens };
