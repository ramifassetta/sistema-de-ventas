import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategorias } from "../../redux/slices/categoriaThunks";

export const AgregarProductoModal = ({
  handleModalClose,
  handleFormChange,
  handleFormSubmit,
  formData,
  addModal,
}) => {
  const dispatch = useDispatch();
  const categorias = useSelector((state) => state.categories.categorias);
  const loading = useSelector((state) => state.categories.loading);
  const error = useSelector((state) => state.categories.error);

  useEffect(() => {
    dispatch(fetchCategorias());
  }, [dispatch]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return (
      <div>
        Error al cargar datos:
        {error && <div>{error}</div>}
      </div>
    );
  }

  if (!addModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Agregar Producto</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre:
            </label>
            <input
              type="text"
              id="productName"
              name="nombre"
              value={formData.nombre}
              onChange={handleFormChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="productCategory"
              className="block text-sm font-medium text-gray-700"
            >
              Categoría:
            </label>
            <select
              id="productCategory"
              name="categoria_id"
              value={formData.categoria_id}
              onChange={handleFormChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            >
              <option value="">Selecciona una categoría</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="productPrice"
              className="block text-sm font-medium text-gray-700"
            >
              Precio:
            </label>
            <input
              type="number"
              id="productPrice"
              name="precio"
              value={formData.precio}
              onChange={handleFormChange}
              step="0.01"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="productImage"
              className="block text-sm font-medium text-gray-700"
            >
              Imagen (URL):
            </label>
            <input
              type="text"
              id="productImage"
              name="imagen"
              value={formData.imagen}
              onChange={handleFormChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleModalClose}
              className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AgregarProductoModal.propTypes = {
  handleModalClose: PropTypes.func.isRequired,
  handleFormChange: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    categoria_id: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    imagen: PropTypes.string.isRequired,
  }).isRequired,
  addModal: PropTypes.bool.isRequired,
  setAddModal: PropTypes.func.isRequired,
};
