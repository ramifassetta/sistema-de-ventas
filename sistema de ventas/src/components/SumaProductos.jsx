

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
          *foto* Producto 3 <span>x1</span><span className="">$300</span>
        </div>
      </div>

      <div className="w-full border border-gray-200 mt-32"></div>

      <div className="justify-between flex flex-row">
        <p className="ml-16 mt-10 font-raleway font-semibold text-green-500 text-2xl ">Total: </p>
        <p className="ml-16 mt-7 mr-16 font-raleway font-semibold text-white text-2xl border  p-3 rounded-md bg-green-500">$900</p>
      </div>
    </div>
  )
}
