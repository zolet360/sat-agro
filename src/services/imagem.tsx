import { api } from "@/config/api";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase";

const URLBASE = "/image";

async function buscarImagem(data: any) {
  const response = await api.post(URLBASE, data);
  return response.data;
}

export async function uploadImage(file: File | Blob, userId: string, filename: string, data: string): Promise<string> {
  const storageRef = ref(storage, `users/${userId}/${filename + "_" + data}`);

  await uploadBytes(storageRef, file);
  const downloadUrl = await getDownloadURL(storageRef);

  return downloadUrl;
}

export default { buscarImagem, uploadImage };
