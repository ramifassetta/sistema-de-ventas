export const SumaProductos = ({ selectedProducts, setSelectedProducts }) => {
  
  const handleQuantityChange = (index, value) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index].cantidad = Math.max(1, value); // Asegurar que la cantidad no sea menor que 1
    setSelectedProducts(updatedProducts);
  };

  const total = selectedProducts.reduce((sum, product) => {
    return sum + product.precio * product.cantidad;
  }, 0);

  const deleteProduct = (index) => {
    const updateProducts = selectedProducts.filter((_, i) => i !== index);
    setSelectedProducts(updateProducts);
  };

  return (
    <div className="border border-gray-300 m-auto mt-5 md:mr-10  rounded-md lg:w-2/4 lg:mr-20 flex flex-col h-full mb-16 w-full">
      <h1 className="ml-16 mt-10 text-lg font-raleway font-semibold">
        Total Suma
      </h1>
      <div className="w-full border border-gray-200 mt-5"></div>

      <div className="flex-grow h-96 overflow-y-auto">
        {selectedProducts.map((product, index) => (
          <div
            key={index}
            className="ml-4 mb-5 mt-5 border-2 border-gray-300 rounded-md p-3 lg:p-5 mr-4 lg:mr-16 font-raleway flex flex-col xl:flex-row justify-between items-center"
          >
            <div className="flex items-center mb-3 lg:mb-0">
              <img
                src={product.imagen}
                alt={product.nombre}
                className="w-10 h-10 mr-4"
              />
              <span className="mr-2 text-sm lg:text-base">{product.nombre}</span>
              <span className="font-semibold text-sm lg:text-base">
                ${product.precio}
              </span>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => handleQuantityChange(index, product.cantidad - 1)}
                className="px-2 py-1 bg-red-400 text-white rounded-lg mx-1 focus:outline-none"
              >
                -
              </button>
              <input
                type="number"
                value={product.cantidad || 1}
                min="1"
                onChange={(e) =>
                  handleQuantityChange(index, parseInt(e.target.value))
                }
                className="border border-gray-300 rounded-md w-12 text-center"
                disabled
              />
              <button
                onClick={() => handleQuantityChange(index, product.cantidad + 1)}
                className="px-2 py-1 bg-green-400 text-white rounded-lg mx-1 focus:outline-none"
              >
                +
              </button>
              <button
                onClick={() => deleteProduct(index)}
                className="focus:outline-none ml-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-trash3-fill text-red-500"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full border border-gray-200 mt-12"></div>

      <div className="justify-between flex flex-row mt-auto p-4">
        <p className="ml-16 mt-10 font-raleway font-semibold text-green-400 text-2xl">
          Total:{" "}
        </p>
        <p className="ml-16 mt-7 mr-16 font-raleway font-semibold text-white text-2xl border p-3 rounded-md bg-green-400">
          ${total}
        </p>
      </div>
    </div>
  );
};
