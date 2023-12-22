export const ScrollProductos = () => {
  return (
    <div className="w-1/3 border border-gray-300 mt-10 ml-28 rounded-md">
      <div className="flex mr-5">
        <input
          type="search"
          className="rounded-2xl border-2 border-indigo-200 w-full mt-5 ml-5 mr-5 outline-none pl-3 "
          placeholder="Buscar Producto"
        />
        <button className="mt-5 bg-green-400 text-white font-raleway font-semibold p-2 rounded-md ml-auto">
          Agregar Producto
        </button>
      </div>
      <div className="w-full border border-gray-100 mt-5"></div>
    </div>
  );
};
