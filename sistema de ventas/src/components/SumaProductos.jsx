export const SumaProductos = ({ selectedProducts, setSelectedProducts }) => {

  const total = selectedProducts.reduce(
    (sum, product) => sum + product.precio,
    0
  );

  const deleteProduct = (index) => {
    const updateProducts = selectedProducts.filter((_, i) => i !== index);

    setSelectedProducts(updateProducts);
  };

  return (
    <div className="border border-gray-300 ml-36 rounded-md w-2/4 mr-20 flex flex-col h-full mb-16">
      <h1 className="ml-16 mt-10 text-lg font-raleway font-semibold">
        Total Suma
      </h1>
      <div className="w-full border border-gray-200 mt-5"></div>

      <div className="flex-grow h-96 overflow-y-auto ">
        {selectedProducts.map((product, index) => (
          <div
            key={index}
            className="ml-16 mb-5 mt-5 border-2 border-gray-300 rounded-md p-5 mr-16 font-raleway flex justify-between "
          >
            <span>
              *foto* {product.nombre} <span>x1 </span>
              <span className="">${product.precio}</span>
            </span>
            <button onClick={() => deleteProduct(index)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash3-fill text-red-500 "
                viewBox="0 0 16 16"
              >
                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
              </svg>
            </button>
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
