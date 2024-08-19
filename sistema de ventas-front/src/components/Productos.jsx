import { useEffect, useRef, useState } from "react";
import { ScrollProductos } from "./ScrollProductos";
import { EditarProductoModal } from "./Modals/EditarProductoModal";
import productos from "../constants/productos";
import categorias from "../data/categorias";
import Swal from "sweetalert2";

export const Productos = () => {
  const [categorySuggestions, setCategorySuggestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const suggestionsRef = useRef(null);
  const categoryRefs = useRef([]);

  const closeSuggestions = () => {
    setCategorySuggestions([]);
    setSelectedCategory(null);
    setActiveCategoryIndex(null);
  };

  const handleCategoryClick = (category, index) => {
    if (selectedCategory === category) {
      closeSuggestions();
    } else {
      setSelectedCategory(category);
      setActiveCategoryIndex(index);
      const filteredSuggestions = productos.filter(
        (producto) =>
          producto.categoria.toLowerCase() === category.toLowerCase()
      );
      setCategorySuggestions(filteredSuggestions);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      let clickedOutside = true;
      if (
        suggestionsRef.current &&
        suggestionsRef.current.contains(event.target)
      ) {
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

  const setCategoryRef = (index, el) => {
    if (el) {
      categoryRefs.current[index] = el;
    }
  };

  //Hacer la logica del Delete (no se si se hace aca en la alerta, despues veo)
  const showDeleteAlert = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  const handleEditClick = (suggestion) => {
    setFormData({
      name: suggestion.nombre,
      category: suggestion.categoria,
      price: suggestion.precio,
      image: suggestion.imagen,
    });
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías manejar la lógica para guardar los cambios (HACER LA LOGICA DEL SUBMIT PARA EDIT CUANDO TENGA EL BACK)

    console.log("Form submitted", formData);
    setModalOpen(false);
  };

  return (
    <div>
      <div className="flex flex-row">
        <div className="space-y-10 ml-20 w-2/4 mt-10">
          {selectedCategory && (
            <div>
              <div
                className="border border-gray-300 rounded-md p-5 font-raleway justify-between flex items-center cursor-pointer"
                onClick={() =>
                  handleCategoryClick(selectedCategory, activeCategoryIndex)
                }
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
              <div
                ref={suggestionsRef}
                className="max-h-96 overflow-y-auto border border-gray-300 rounded-md"
              >
                {categorySuggestions.length > 0 ? (
                  categorySuggestions.map((suggestion, i) => (
                    <div
                      key={i}
                      className="p-5 font-raleway hover:bg-gray-100 flex items-center"
                    >
                      <div className="flex justify-between items-center w-full">
                        <div className="flex items-center">
                          <img
                            src={suggestion.imagen}
                            alt={suggestion.nombre}
                            className="w-10 h-10 mr-4"
                          />
                          <span>
                            {suggestion.nombre} - ${suggestion.precio}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            className="px-2 py-1 bg-yellow-500 text-white rounded font-semibold"
                            onClick={() => handleEditClick(suggestion)}
                          >
                            EDITAR
                          </button>
                          <button
                            className="px-2 py-1 bg-red-500 text-white rounded font-semibold"
                            onClick={showDeleteAlert}
                          >
                            BORRAR
                          </button>
                        </div>
                      </div>
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
        <ScrollProductos />
      </div>

      <EditarProductoModal 
        handleFormChange={handleFormChange}
        handleModalClose={handleModalClose}
        handleFormSubmit={handleFormSubmit}
        formData={formData}
        modalOpen={modalOpen}
      />
    </div>
  );
};
