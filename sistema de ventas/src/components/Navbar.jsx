
export const Navbar = () => {

  return (
    <nav className="bg-indigo-600 p-2">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-2xl text-white font-extrabold text-center">
          Sistema de Ventas
        </a>
        <ul className="my-5 text-sm md:flex md:items-center md:gap-3 font-bold text-white ">
          <li className="bg-indigo-800 rounded-md p-2 pl-3 pr-3">
            <a href="/productos">Productos</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
