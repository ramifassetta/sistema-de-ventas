import { useState } from "react";
import productos from "../constants/productos";
import { AgregarProductoModal } from "./Modals/AgregarProductoModal";
import { InfoProductoModal } from "./Modals/InfoProductoModal";

export const ScrollProductos = () => {
  const [productName, setProductName] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
  });
  const [addModal, setAddModal] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Estado para almacenar el producto seleccionado

  const handleChangeProductName = (e) => {
    const searchProduct = e.target.value.toLowerCase();
    setProductName(searchProduct);
  };

  const filteredProducts = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(productName)
  );

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías manejar la lógica para agregar el producto (HACER LA LOGICA DEL SUBMIT PARA AGREGAR PRODUCTO CUANDO TENGA EL BACK)

    console.log("Product added", formData);
    setAddModal(false);
  };

  const handleInfoClick = (producto) => {
    setSelectedProduct(producto);
    setInfoModal(true);
  };

  return (
    <div className="w-1/3 border border-gray-300 mt-10 ml-28 rounded-md max-h-[600px] flex flex-col">
      <div className="flex mr-5">
        <input
          type="search"
          className="rounded-2xl border-2 border-indigo-200 w-full mt-5 ml-5 mr-5 outline-none pl-3"
          placeholder="Buscar Producto"
          value={productName}
          onChange={handleChangeProductName}
        />
        <button
          className="mt-5 bg-green-400 text-white font-raleway font-semibold p-2 rounded-md ml-auto"
          onClick={() => setAddModal(true)}
        >
          Agregar Producto
        </button>
      </div>
      <div className="w-full border border-gray-100 mt-5 overflow-auto flex-grow">
        {filteredProducts.map((producto, i) => (
          <div
            key={i}
            className="p-5 font-raleway flex items-center hover:bg-gray-100 justify-between"
          >
            <span className="flex items-center">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-10 h-10 mr-4"
              />
              {producto.nombre}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-info-circle text-blue-500 cursor-pointer"
              viewBox="0 0 16 16"
              onClick={() => handleInfoClick(producto)}
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
            </svg>
          </div>
        ))}
      </div>
      <AgregarProductoModal
        handleModalClose={() => setAddModal(false)}
        handleFormChange={handleFormChange}
        handleFormSubmit={handleFormSubmit}
        formData={formData}
        addModal={addModal}
        setAddModal={setAddModal}
      />
      {selectedProduct && (
        <InfoProductoModal
          product={selectedProduct}
          show={infoModal}
          onClose={() => setInfoModal(false)}
        />
      )}
    </div>
  );
};
