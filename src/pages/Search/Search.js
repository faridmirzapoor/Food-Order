import RecipeList from '../../Components/RecipeList';
import './Search.css';
import { useLocation } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';

export default function Search() {
  // Get the query parameter from the URL
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get('q') || '';

  // Fetch all recipes from the local JSON file
  const { error, isLoading, data } = useFetch('http://localhost:3000/recipes');

  // Filter the recipes based on the query
  const filteredRecipes = data
    ? data.filter(recipe =>
        recipe.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div>
      <h2 className='page-title'>Recipes Including: "{query}"</h2>
      {error && <p className='error'>{error}</p>}
      {isLoading && <p className='loading'>Loading...</p>}
      {filteredRecipes.length > 0 ? (
        <RecipeList recipes={filteredRecipes} />
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
}
