import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FormParametros from "./form-parametros";
import Button from "@/components/Button";
import service from "@/services/parametro";
import { PencilIcon, XMarkIcon } from "@heroicons/react/16/solid";
import CustomModal from "@/components/Modal";
import { showToast } from "@/components/toast";

interface ParametrosProps {
  user: any;
  setHeaderTitle: (title: string) => void;
}

export default function Parametros({ user, setHeaderTitle }: ParametrosProps) {
  const [formUser, setFormUser] = useState(user);
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: null,
    descricao: "",
    coordenada1: "",
    coordenada2: "",
    coordenada3: "",
    coordenada4: "",
    inicio: null,
    fim: null,
    user_id: formUser.id,
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    setHeaderTitle("Parametros");

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setFormUser(parsedUser);
    }
  }, [setHeaderTitle]);

  useEffect(() => {
    if (formUser?.id) {
      fetchData(formUser.id);
      formData.user_id = formUser.id;
    }
  }, [formUser]);

  async function fetchData(id: number) {
    try {
      const response = await service.parametros(id);
      console.log(response);
      setData(response);
    } catch (error) {
      console.log(error);
    }
  }
  function cancelModal() {
    setOpenModal(false);
    setFormData({
      id: null,
      descricao: "",
      coordenada1: "",
      coordenada2: "",
      coordenada3: "",
      coordenada4: "",
      inicio: null,
      fim: null,
      user_id: formUser.id,
    });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      const response = await service.adicionarParametro(formData);
      cancelModal();
      showToast("Parâmetro adicionado com sucesso", "success");
      fetchData(formUser.id);
    } catch (error) {
      console.log(error);
      showToast("Erro ao adicionar parâmetro", "error");
    }
  }

  async function handleEdit(id: number) {
    try {
      const response = await service.buscaPorId(id, formUser.id);
      console.log(response);
      setFormData(response);
      setOpenModal(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(id: number) {
    try {
      const response = await service.deletarParametro(id);
      console.log(response);
      showToast("Parâmetro deletado com sucesso", "success");
      fetchData(formUser.id);
    } catch (error) {
      console.log(error);
      showToast("Erro ao deletar parâmetro", "error");
    }
  }

  return (
    <>
      <CustomModal
        isOpen={openModal}
        onClose={cancelModal}
        title="Novo Parâmetro"
        handleSubmit={handleSubmit}
        size="lg"
        buttons={
          <>
            <Button type={"buttom"} onClick={cancelModal} className="text-red-600 outline hover:shadow-custom-dark outlin hover:outline-none hover:bg-red-600 font-semibold hover:text-white">
              voltar
            </Button>
            <Button type={"submit"} className="text-green outline hover:shadow-custom-dark outlin hover:outline-none hover:bg-green font-semibold hover:text-white">
              Confirmar
            </Button>
          </>
        }
      >
        <FormParametros formData={formData} setFormData={setFormData} />
      </CustomModal>
      <div className="w-full h-full flex items-center  justify-center">
        <div className="bg-black w-[1200px] h-[700px] rounded-4xl shadow-custom-dark pl-10 pr-10 pb-10 pt-5 flex flex-col gap-5">
          <h1 className="text-2xl font-semibold ">{"Lista de Parametros"}</h1>
          <Button
            className="w-52 text-green outline hover:shadow-custom-dark outlin hover:outline-none hover:bg-green font-semibold hover:text-white"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Novo Parâmetro
          </Button>
          <div className="border-2 border-soft-black p-2 rounded-xl">
            <table className="table-auto w-full  ">
              <thead className="border-b-2 border-soft-black">
                <tr className="text-left pb-1 flex">
                  <th className="w-[15%]">ID</th>
                  <th className="w-[80%]">Descrição</th>
                  <th className="">Ações</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id} className={`py-1 flex border-b border-soft-black`}>
                    <td className="w-[15%]">{item.id}</td>
                    <td className="w-[80%]">{item.descricao}</td>
                    <td className=" flex items-center gap-2">
                      <PencilIcon width={23} className="bg-green p-1 hover:bg-green-more-dark transition-all rounded-sm cursor-pointer" onClick={() => handleEdit(item.id)} />
                      <XMarkIcon width={24} className="bg-red-600 hover:bg-red-800 p-1 transition-all rounded-sm cursor-pointer" onClick={() => handleDelete(item.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
