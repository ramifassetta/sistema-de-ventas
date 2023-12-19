import { SumaProductos } from "./SumaProductos";

export const ProductosHome = () => {

  return (

    <div className="flex flex-row">
      <div className="space-y-10 ml-20 w-2/4 ">
        <div className="border border-gray-300 rounded-md p-5 font-raleway">Bebidas</div>
        <div className="border border-gray-300 rounded-md p-5 font-raleway">Productos Empaquetados</div>
        <div className="border border-gray-300 rounded-md p-5 font-raleway">Lacteos</div>
        <div className="border border-gray-300 rounded-md p-5 font-raleway">Panadería</div>
        <div className="border border-gray-300 rounded-md p-5 font-raleway">Embutidos</div>
        <div className="border border-gray-300 rounded-md p-5 font-raleway">
          Cuidado Personal y otros
        </div>
      </div>
      <SumaProductos />
    </div>
  );
};
