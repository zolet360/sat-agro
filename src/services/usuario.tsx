import { api } from "@/config/api";

const URLBASE = "/user";

async function usuarios(data: any) {
  const response = await api.get(URLBASE, { params: data });
  return response.data;
}

async function adicionarUsuario(data: any) {
  const request = await api.post(URLBASE, {
    nome: data.nome,
    email: data.email,
    senha: data.senha,
  });
  return request;
}

async function login(data: any) {
  console.log(data);
  const request = await api.post(`${URLBASE}/login`, {
    email: data.email,
    senha: data.senha,
  });
  return request;
}

async function editaUsuario(id: number, data: any) {
  const request = await api.put(`${URLBASE}/${id}`, {
    nome: data.nome,
    email: data.email,
  });
  return request;
}

async function me() {
  const request = await api.get(`${URLBASE}/me`);
  return request;
}

export default { adicionarUsuario, login, me, editaUsuario };
