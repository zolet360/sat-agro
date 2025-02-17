import { api } from "@/config/api";

const URLBASE = "/parametro";

async function parametros(id: any) {
  console.log(id);
  const response = await api.get(`${URLBASE}/${id}`);
  return response.data;
}

async function adicionarParametro(data: any) {
  console.log(data);
  const request = await api.post(URLBASE, data);
  return request;
}

async function buscaPorId(id: number, user_id: number) {
  console.log(id);
  const response = await api.get(`${URLBASE}/busca-parametro/${id}/${user_id}`);
  return response.data;
}

async function deletarParametro(id: number) {
  console.log(id);
  const response = await api.delete(`${URLBASE}/${id}`);
  return response.data;
}

export default { parametros, adicionarParametro, buscaPorId, deletarParametro };
