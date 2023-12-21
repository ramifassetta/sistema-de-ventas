import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getUsersAndCompanies } from "../redux/actions";


export const Searchbar = ({ setSuggestions }) => {
  // const [name, setName] = useState("");
  // const dispatch = useDispatch();
  // const usersYcompanies = useSelector((state) => state.usersYcompanies);

  // useEffect(() => {
  //   dispatch(getUsersAndCompanies());
  // }, [dispatch]);

  // const handleChange = (event) => {
  //   const searchValue = event.target.value.toLowerCase();
  //   setName(searchValue);

  //   // Filtrar la lista de nombres según el valor de búsqueda
  //   const filteredSuggestions = usersYcompanies.filter(
  //     (user) => user.userName.toLowerCase().includes(searchValue)
  //   );
  

  //   setSuggestions(searchValue ? filteredSuggestions : []);
  // };

  return (
    <div className="d-flex flex-grow-2 w-50 ml-20 font-raleway">
      <input
        className="rounded-2xl border-2 border-indigo-200 p-2 pt-4 pl-3 outline-none mt-10 mb-10 w-1/3"
        type="search"
        placeholder="Buscar Producto"
        // value={name}
        // onChange={handleChange}
      />
    </div>
  );
};
