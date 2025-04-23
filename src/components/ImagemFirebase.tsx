import { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";

type ImagemFirebaseProps = {
  path: string;
  userId: string;
};

const ImagemFirebase = ({ path, userId }: ImagemFirebaseProps) => {
  const [url, setUrl] = useState<string | null>(null);
  const [aberta, setAberta] = useState(false);

  useEffect(() => {
    const buscarUrl = async () => {
      try {
        const storageRef = ref(storage, `/users/${userId}/${path}`);
        const downloadUrl = await getDownloadURL(storageRef);
        setUrl(downloadUrl);
      } catch (err) {
        console.error("Erro ao buscar imagem:", err);
      }
    };

    buscarUrl();
  }, [path, userId]);

  return (
    <>
      {url ? (
        <img src={url} alt="Imagem" onClick={() => setAberta(true)} className="w-24 h-24 rounded-xl object-cover cursor-pointer transition hover:scale-105" />
      ) : (
        <div className="w-24 h-24 flex items-center justify-center bg-light-black rounded-xl text-sm text-gray-400">Carregando...</div>
      )}

      {/* Modal */}
      {aberta && url && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" onClick={() => setAberta(false)}>
          <img
            src={url}
            alt="Imagem grande"
            className="max-w-[90%] max-h-[90%] rounded-xl shadow-lg"
            onClick={(e) => e.stopPropagation()} // pra não fechar ao clicar na imagem
          />
        </div>
      )}
    </>
  );
};

export default ImagemFirebase;
