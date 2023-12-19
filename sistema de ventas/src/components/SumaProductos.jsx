

export const SumaProductos = () => {
  
  return (
    <div className="border border-gray-300 ml-36 rounded-md w-2/4 mr-20">
      <h1 className="ml-16 mt-10 text-lg font-raleway font-semibold">Total Suma</h1>
      <div className="w-full border border-gray-200 mt-5"></div>

      <div >
        {/* hago 3 productos estaticos y desp le agrego funcionalidad para agregar */}
        <div className="ml-16 mb-5 mt-5 border-2 border-gray-300 rounded-md p-5 mr-16 font-raleway ">
          *foto* Producto 1 <span className="">x1</span><span className="">$300</span>
        </div>
        <div className="ml-16 mb-5 mt-5 border-2 border-gray-300 rounded-md p-5 mr-16 font-raleway ">
          *foto* Producto 2 <span>x1</span><span className="">$300</span>
        </div>
        <div className="ml-16 mb-5 mt-5 border-2 border-gray-300 rounded-md p-5 mr-16 font-raleway ">
          *foto* Producto 2 <span>x1</span><span className="">$300</span>
        </div>
      </div>

      <div className="w-full border border-gray-200 mt-5"></div>

      <div className="">
        <p className="ml-16 mt-5 font-raleway font-semibold text-green-500 text-xl">Total: <span>$900</span></p>
      </div>
    </div>
  )
}
