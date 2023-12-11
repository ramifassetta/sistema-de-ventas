
export const Navbar = () => {

  return (
    <nav className="bg-indigo-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/home" className="text-2xl text-white font-extrabold text-center">
          Sistema de Ventas
        </a>
        <ul className="my-5 text-sm md:flex md:items-center md:gap-3 font-bold text-white ">
          <li>
            <a href="">Productos</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
