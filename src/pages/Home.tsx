export default function Home() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[1100px] h-[600px] rounded-4xl relative shadow-custom-dark bg-green overflow-hidden flex ">
        <div className=" flex justify-center w-[40%] p-10 text-2xl">
          <div>
            O intuito dessa plataforma é trabalhar em cima do data set do satélite Sentinel-2 do projeto Copernicus da
            (ESA), com finalidade de calcular o NDVI de plantações, facilitando o dia a dia do produtor rural brasileiro
          </div>
        </div>
        <div className="w-[60%] h-full flex justify-end ">
          <img
            src="assets/foto2.jpg"
            className="w-[850px] h-[850px] object-cover rounded-full absolute right-[-18%] shadow-custom-dark top-1/2 transform -translate-y-1/2"
          ></img>
        </div>
      </div>
    </div>
  );
}
