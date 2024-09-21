import { useState, useEffect } from "react";

export const Searchbar = ({ setSuggestions, productos }) => {
  const [name, setName] = useState("");

  const handleChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setName(searchValue);

    // Filtrar la lista de productos según el valor de búsqueda
    const filteredSuggestions = productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(searchValue)
    );

    setSuggestions(searchValue ? filteredSuggestions : []);
  };

  return (
    <div className="flex justify-center w-full md:w-1/3 m-auto mt-10">
      <input
        className="rounded-2xl border-2 border-indigo-200 p-2 pt-4 pl-3 outline-none w-full mx-5"
        type="search"
        placeholder="Buscar Producto"
        value={name}
        onChange={handleChange}
      />
    </div>
  );
};
