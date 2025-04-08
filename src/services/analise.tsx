import { api } from "@/config/api";

const URLBASE = "/analise";

async function adicionarAnalise(data: any) {
  console.log(data);
  const request = await api.post(URLBASE, data);
  return request;
}

export default { adicionarAnalise };
