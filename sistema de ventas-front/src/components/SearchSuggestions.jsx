
export const SearchSuggestions = ({ suggestions, closeSuggestions }) => {

  const handleClick = () => {
    closeSuggestions(); 
  };

  return (
      <div className="p-10px 20px hover:bg-efefef cursor-pointer flex items-center " onClick={handleClick}>
        <img src={suggestions.imagen} alt="" className="w-10 h-10 mr-4"/>
        {suggestions.nombre}
      </div>
  );
};

