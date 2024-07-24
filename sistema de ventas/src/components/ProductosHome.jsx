import React, { useState, useEffect, useRef } from "react";
import { SumaProductos } from "./SumaProductos";
import { Searchbar } from "./Searchbar";
import { SearchSuggestionsList } from "./SearchSuggestionsList";
import categorias from "../data/categorias";
import productos from "../constants/productos";

export const ProductosHome = () => {
  const [searchSuggestions, setSearchSuggestions] = useState([]); //estado para las suggestions de la searchbar
  const [categorySuggestions, setCategorySuggestions] = useState([]); //estado para las suggestions de las categorias
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(null);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);
  const categoryRefs = useRef([]);

  //Funcion para cerrar todo
  const closeSuggestions = () => {
    setSearchSuggestions([]);
    setCategorySuggestions([]);
    setSelectedCategory(null);
    setActiveCategoryIndex(null);
  };

  //Funcion para agregar a la calculadora los productos seleccionados
  const addToCalculator = (product) => {
    setSelectedProducts([...selectedProducts, product]);
  };

  //Funcion para cuando hacemos click sobre el contenedor con la categoria
  const handleCategoryClick = (category, index) => {
    if (selectedCategory === category) {
      closeSuggestions();
    } else {
      setSelectedCategory(category);
      setActiveCategoryIndex(index);
      const filteredSuggestions = productos.filter(
        (producto) => producto.categoria.toLowerCase() === category.toLowerCase()
      );
      setCategorySuggestions(filteredSuggestions);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      let clickedOutside = true;
      if (searchRef.current && searchRef.current.contains(event.target)) {
        clickedOutside = false;
      }
      if (suggestionsRef.current && suggestionsRef.current.contains(event.target)) {
        clickedOutside = false;
      }
      categoryRefs.current.forEach((ref) => {
        if (ref && ref.contains(event.target)) {
          clickedOutside = false;
        }
      });

      if (clickedOutside) {
        closeSuggestions();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  //Funcion para setear los productos filtrados para la searchbar
  const handleSetSearchSuggestions = (filteredSuggestions) => { 
    setSearchSuggestions(filteredSuggestions);
  };

  return (
    <div>
      <Searchbar setSuggestions={handleSetSearchSuggestions} productos={productos} />
      <SearchSuggestionsList
        suggestions={searchSuggestions}
        closeSuggestions={closeSuggestions}
        addToCalculator={addToCalculator}
      />
      <div className="flex flex-row">
        <div className="space-y-10 ml-20 w-2/4 mt-10">
          {categorias.map((categoria, index) => (
            <div key={index} ref={(el) => (categoryRefs.current[index] = el)}>
              <div
                className="border border-gray-300 rounded-md p-5 font-raleway justify-between flex items-center cursor-pointer"
                onClick={() => handleCategoryClick(categoria, index)}
              >
                {categoria}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-chevron-compact-down"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"
                  />
                </svg>
              </div>
              {activeCategoryIndex === index && (
                <div ref={suggestionsRef} className="mt-2">
                  {categorySuggestions.map((suggestion, i) => (
                    <div
                      key={i}
                      className="border border-gray-300 rounded-md p-5 font-raleway cursor-pointer"
                      onClick={() => addToCalculator(suggestion)}
                    >
                      {suggestion.nombre} - ${suggestion.precio}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <SumaProductos
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
        />
      </div>
    </div>
  );
};