import { SumaProductos } from "./SumaProductos";

export const ProductosHome = () => {

  return (

    <div className="flex flex-row">
      <div className="space-y-10 ml-20 w-2/4 ">
        <div className="border border-gray-300 rounded-md p-5">Bebidas</div>
        <div className="border border-gray-300 rounded-md p-5">
          Productos Empaquetados
        </div>
        <div className="border border-gray-300 rounded-md p-5">Lacteos</div>
        <div className="border border-gray-300 rounded-md p-5">Panadería</div>
        <div className="border border-gray-300 rounded-md p-5">Embutidos</div>
        <div className="border border-gray-300 rounded-md p-5">
          Cuidado Personal y otros
        </div>
      </div>
      <SumaProductos />
    </div>
  );
};
