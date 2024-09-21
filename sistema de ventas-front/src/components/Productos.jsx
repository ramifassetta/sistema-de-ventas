import { useEffect, useRef, useState } from "react";
import { ScrollProductos } from "./ScrollProductos";
import { EditarProductoModal } from "./Modals/EditarProductoModal";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategorias } from "../redux/slices/categoriaThunks";
import { deleteProducto, fetchProductos, updateProducto } from "../redux/slices/productoThunks";

export const Productos = () => {
  const [categorySuggestions, setCategorySuggestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    categoria_id: "",
    precio: 0,
    imagen: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const suggestionsRef = useRef(null);
  const categoryRefs = useRef([]);
  const dispatch = useDispatch();
  const categorias = useSelector((state) => state.categories.categorias);
  // const loading = useSelector((state) => state.categories.loading);
  const error = useSelector((state) => state.categories.error);
  const productos = useSelector((state) => state.products.productos);
  // const loadingProductos = useSelector((state) => state.products.loading);
  const errorProductos = useSelector((state) => state.products.error);


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
          producto.categoria_id.toLowerCase() === category.id.toLowerCase()
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

    dispatch(fetchCategorias());
    dispatch(fetchProductos());
    

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dispatch]);

  const setCategoryRef = (index, el) => {
    if (el) {
      categoryRefs.current[index] = el;
    }
  };


  const showDeleteAlert = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProducto(id))
          .then(() => {
            Swal.fire("Eliminado!", "El producto ha sido eliminado.", "success");
          })
          .catch(() => {
            Swal.fire("Error!", "Hubo un problema al eliminar el producto.", "error");
          });
      }
    });
  };

  const handleEditClick = (suggestion) => {
    setFormData({
      id: suggestion.id,
      nombre: suggestion.nombre,
      categoria_id: suggestion.categoria_id,
      precio: suggestion.precio,
      imagen: suggestion.imagen,
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
    dispatch(updateProducto(formData))
    .unwrap()
    .then(() => {
      console.log("Producto editado con éxito");
      setModalOpen(false);
    })
    .catch((error) => {
      console.error("Error al editar el producto:", error);
    });
  };

 

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
    <div>
      <div className="flex flex-col md:flex-row">
        <div className="space-y-2 w-full px-5 lg:space-y-10  md:w-full lg:w-2/4 mt-10 m-auto">
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
                            onClick={() => showDeleteAlert(suggestion.id)}
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
            .filter((categoria) => selectedCategory ? categoria.id !== selectedCategory.id : true)
            .map((categoria, index) => (
              <div
                key={index}
                ref={(el) => setCategoryRef(index, el)}
                className={selectedCategory ? "hidden" : ""}
              >
                <div
                  className="border border-gray-300 rounded-md p-5 font-raleway justify-between flex items-center cursor-pointer w-full"
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
