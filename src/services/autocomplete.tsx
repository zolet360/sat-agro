import { api } from "../config/api";

async function buscaResultados(query: string, url: string, user_id?: number) {
  console.log(user_id);
  const response = await api.get(`${url}/${user_id}?query=${encodeURIComponent(query)}`);
  return response.data;
}

export default { buscaResultados };
