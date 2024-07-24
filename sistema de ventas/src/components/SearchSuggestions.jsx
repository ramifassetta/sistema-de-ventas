

export const SearchSuggestions = ({ suggestions, closeSuggestions }) => {

  const handleClick = () => {
    closeSuggestions(); 
  };

  return (
      <div className="p-10px 20px hover:bg-efefef cursor-pointer" onClick={handleClick}>
        {suggestions.nombre}
      </div>
  );
};

