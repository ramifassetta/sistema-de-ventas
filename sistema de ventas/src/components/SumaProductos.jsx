

export const SumaProductos = () => {
  return (
    <div className="border border-gray-300 ml-36 rounded-md w-2/4 mr-20">
      <h1 className="ml-16 mt-10 text-lg">Total Suma</h1>
      <div className="w-full border border-gray-200 mt-5"></div>

      <div >
        {/* hago 3 productos estaticos y desp le agrego funcionalidad para agregar */}
        <div className="ml-16 mb-5 mt-5 border-2 border-gray-400 rounded-md p-5 mr-16">
          *foto* Producto 1 <span className="">x1</span><span className="">$300</span>
        </div>
        <div className="ml-16 mb-5 mt-5 border-2 border-gray-400 rounded-md p-5 mr-16">
          *foto* Producto 2 <span>x1</span><span className="">$300</span>
        </div>
        <div className="ml-16 mb-5 mt-5 border-2 border-gray-400 rounded-md p-5 mr-16">
          *foto* Producto 2 <span>x1</span><span className="">$300</span>
        </div>
      </div>

      <div className="w-full border border-gray-200 mt-5"></div>

      <div className="">
        <p className="ml-16 mt-5">Total: <span>$900</span></p>
      </div>
    </div>
  )
}
