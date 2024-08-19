import { SearchSuggestions } from "./SearchSuggestions";

export const SearchSuggestionsList = ({ suggestions, closeSuggestions, addToCalculator }) => {
  const sortedSuggestions = suggestions.sort((a, b) => a.nombre.localeCompare(b.nombre)).slice(0, 5);

  return (
    <div className="absolute w-[400px] bg-white flex flex-col shadow-md rounded-lg max-h-300px overflow-y-auto left-0 ml-20"> 
      {sortedSuggestions.map((result, id) => (
        <div
          className="px-4 py-2 border-b border-gray-200 hover:bg-gray-100"
          key={id}
          onClick={() => addToCalculator(result)}
        >
          <SearchSuggestions suggestions={result} closeSuggestions={closeSuggestions} />
        </div>
      ))}
    </div>
  );
};