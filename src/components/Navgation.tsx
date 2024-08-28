import { ChartBarIcon, EyeIcon, HomeIcon, PhotoIcon } from "@heroicons/react/16/solid";

export default function Navigation() {
  return (
    <div className=" w-full">
      <ul className="flex flex-col gap-5 uppercase ">
        <li className=" border-b p-2 border-white hover:text-xl transition-all duration-300">
          <div className=" flex  cursor-pointer space-x-3 ">
            <div className="w-1/3 flex justify-center">
              <HomeIcon width={25} height={25} />
            </div>
            <div className="w-2/3">Home</div>
          </div>
        </li>
        <li className=" border-b p-2 border-white hover:text-xl transition-all duration-300">
          <div className=" flex justify-center cursor-pointer space-x-3 ">
            <div className="w-1/3 flex justify-center">
              <PhotoIcon width={25} height={25} />
            </div>
            <div className="w-2/3">Suas Imagens</div>
          </div>
        </li>
        <li className=" border-b p-2 border-white hover:text-xl transition-all duration-300">
          <div className=" flex justify-center cursor-pointer space-x-3">
            <div className="w-1/3 flex justify-center">
              <ChartBarIcon width={25} height={25} />
            </div>
            <div className="w-2/3">Analise NDVI</div>
          </div>
        </li>
        <li className=" border-b p-2 border-white hover:text-xl transition-all duration-300">
          <div className=" flex justify-center cursor-pointer space-x-3 ">
            <div className="w-1/3 flex justify-center">
              <EyeIcon width={25} height={25} />
            </div>
            <div className="w-2/3">Resultados</div>
          </div>
        </li>
      </ul>
    </div>
  );
}
