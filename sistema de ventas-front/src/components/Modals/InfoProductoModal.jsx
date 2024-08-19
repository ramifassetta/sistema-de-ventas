import PropTypes from 'prop-types';

export const InfoProductoModal = ({ product, show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">{product.nombre}</h2>
        <p className="mb-2"><strong>Categoría:</strong> {product.categoria}</p>
        <p className="mb-2"><strong>Precio:</strong> ${product.precio}</p>
        <img src={product.imagen} alt={product.nombre} className="w-full h-auto mb-4" />
        <button 
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

InfoProductoModal.propTypes = {
  product: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    categoria: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired, // Asegúrate de que el tipo sea el correcto según cómo manejes el precio
    imagen: PropTypes.string.isRequired,
  }).isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
