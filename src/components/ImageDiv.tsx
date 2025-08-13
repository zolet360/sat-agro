import { PhotoIcon } from "@heroicons/react/24/outline";
import Loading from "./Loading";

interface imageDivProps {
  image: any;
  loading?: boolean;
}

export default function ImageDiv({ image, loading, ...props }: imageDivProps) {
  return (
    <div className=" rounded-3xl w-[500px] h-[500px] flex justify-center items-center bg-soft-black">
      {image && !loading && <img src={image} alt="Imagem" className="w-[500px] h-[500px] object-cover rounded-3xl" />}
      {!image && !loading && <PhotoIcon className="text-light-black" width={400} height={400} />}
      {loading && <Loading />}
    </div>
  );
}
