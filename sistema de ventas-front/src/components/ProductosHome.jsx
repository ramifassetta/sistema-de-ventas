import { useState, useEffect, useRef } from "react";
import { SumaProductos } from "./SumaProductos";
import { Searchbar } from "./Searchbar";
import { SearchSuggestionsList } from "./SearchSuggestionsList";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategorias } from "../redux/slices/categoriaThunks";
import { fetchProductos } from "../redux/slices/productoThunks";

export const ProductosHome = () => {
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [categorySuggestions, setCategorySuggestions] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(null);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);
  const categoryRefs = useRef([]);
  const dispatch = useDispatch();
  const categorias = useSelector((state) => state.categories.categorias);
  const loading = useSelector((state) => state.categories.loading);
  const error = useSelector((state) => state.categories.error);
  const productos = useSelector((state) => state.products.productos);
  const loadingProductos = useSelector((state) => state.products.loading);
  const errorProductos = useSelector((state) => state.products.error);

  console.log(categorias);
  console.log("Productos existentes:", productos);

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
      
      const updatedProducts = [...selectedProducts];
      updatedProducts[productIndex].cantidad += 1;
      setSelectedProducts(updatedProducts);
    } else {
      
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
        (producto) =>
          producto.categoria_id.toLowerCase() === category.id.toLowerCase()
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
      if (
        suggestionsRef.current &&
        suggestionsRef.current.contains(event.target)
      ) {
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

    dispatch(fetchCategorias());
    dispatch(fetchProductos());

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dispatch]);

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

  if (loading || loadingProductos) {
    return <div>Cargando...</div>;
  }

  if (error || errorProductos) {
    return (
      <div>
        Error al cargar datos:
        {error && <div>{error}</div>}
        {errorProductos && <div>{errorProductos}</div>}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div>
        <Searchbar
          setSuggestions={handleSetSearchSuggestions}
          productos={productos}
        />
        <SearchSuggestionsList
          suggestions={searchSuggestions}
          closeSuggestions={closeSuggestions}
          addToCalculator={addToCalculator}
        />
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="space-y-2 w-full px-5 lg:space-y-10 md:mx-20 md:w-full lg:w-2/4 mt-10 m-auto">
          {selectedCategory && (
            <div>
              <div
                className="border border-gray-300 rounded-md p-5 font-raleway justify-between flex items-center cursor-pointer"
                onClick={() =>
                  handleCategoryClick(selectedCategory, activeCategoryIndex)
                }
              >
                {selectedCategory.nombre}
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
              <div
                ref={suggestionsRef}
                className="max-h-96 overflow-y-auto border border-gray-300 rounded-md"
              >
                {categorySuggestions.length > 0 ? (
                  categorySuggestions.map((suggestion, i) => (
                    <div
                      key={i}
                      className="p-5 font-raleway cursor-pointer flex items-center"
                      onClick={() => addToCalculator(suggestion)}
                    >
                      <img
                        src={suggestion.imagen}
                        alt={suggestion.nombre}
                        className="w-10 h-10 mr-4"
                      />{" "}
                      {suggestion.nombre} - ${suggestion.precio}
                    </div>
                  ))
                ) : (
                  <div className="p-5 text-center">
                    No hay productos para esta categoría
                  </div>
                )}
              </div>
            </div>
          )}
          {categorias
            .filter((categoria) => selectedCategory ? categoria.id !== selectedCategory.id : true)
            .map((categoria, index) => (
              <div
                key={index}
                ref={(el) => setCategoryRef(index, el)}
                className={selectedCategory ? "hidden" : ""}
              >
                <div
                  className="border border-gray-300 rounded-md p-5 font-raleway justify-between flex items-center cursor-pointer w-full "
                  onClick={() => handleCategoryClick(categoria, index)}
                >
                  {categoria.nombre}
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
