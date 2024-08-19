import { useState, useEffect, useRef } from "react";
import { SumaProductos } from "./SumaProductos";
import { Searchbar } from "./Searchbar";
import { SearchSuggestionsList } from "./SearchSuggestionsList";
import categorias from "../data/categorias";
import productos from "../constants/productos";

export const ProductosHome = () => {
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [categorySuggestions, setCategorySuggestions] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(null);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);
  const categoryRefs = useRef([]);

  const closeSuggestions = () => {
    setSearchSuggestions([]);
    setCategorySuggestions([]);
    setSelectedCategory(null);
    setActiveCategoryIndex(null);
  };

  const addToCalculator = (product) => {
    const productIndex = selectedProducts.findIndex(
      (p) => p.nombre === product.nombre
    );
    if (productIndex !== -1) {
      // Producto ya está en la lista, aumentar la cantidad
      const updatedProducts = [...selectedProducts];
      updatedProducts[productIndex].cantidad += 1;
      setSelectedProducts(updatedProducts);
    } else {
      // Producto no está en la lista, agregarlo
      setSelectedProducts([...selectedProducts, { ...product, cantidad: 1 }]);
    }
  };

  const handleCategoryClick = (category, index) => {
    console.log("Clicked Category:", category);
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
      categoryRefs.current.forEach((ref, index) => {
        if (ref && ref.contains(event.target)) {
          clickedOutside = false;
          console.log("Clicked Inside Category Ref:", index);
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

  useEffect(() => {
    console.log("Category Refs:", categoryRefs.current);
    categoryRefs.current.forEach((ref, index) => {
      if (ref) {
        console.log(`Ref ${index}:`, ref);
      } else {
        console.log(`Ref ${index} is null`);
      }
    });
  }, [selectedCategory]);

  const handleSetSearchSuggestions = (filteredSuggestions) => {
    setSearchSuggestions(filteredSuggestions);
  };

  const setCategoryRef = (index, el) => {
    if (el) {
      categoryRefs.current[index] = el;
      console.log(`Assigned Ref ${index}:`, el);
    } else {
      console.log(`Ref ${index} is null`);
    }
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
          {/* Renderiza la categoría seleccionada en primer lugar */}
          {selectedCategory && (
            <div>
              <div
                className="border border-gray-300 rounded-md p-5 font-raleway justify-between flex items-center cursor-pointer"
                onClick={() => handleCategoryClick(selectedCategory, activeCategoryIndex)}
              >
                {selectedCategory}
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
              <div ref={suggestionsRef} className="max-h-96 overflow-y-auto border border-gray-300 rounded-md">
                {categorySuggestions.length > 0 ? (
                  categorySuggestions.map((suggestion, i) => (
                    <div
                      key={i}
                      className="p-5 font-raleway cursor-pointer flex items-center"
                      onClick={() => addToCalculator(suggestion)}
                    >
                      <img src={suggestion.imagen} alt={suggestion.nombre} className="w-10 h-10 mr-4" />{" "}
                      {suggestion.nombre} - ${suggestion.precio}
                    </div>
                  ))
                ) : (
                  <div className="p-5 text-center">No hay productos para esta categoría</div>
                )}
              </div>
            </div>
          )}
          {/* Renderiza el resto de las categorías */}
          {categorias
            .filter((categoria) => categoria !== selectedCategory)
            .map((categoria, index) => (
              <div
                key={index}
                ref={(el) => setCategoryRef(index, el)}
                className={selectedCategory ? "hidden" : ""}
              >
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
