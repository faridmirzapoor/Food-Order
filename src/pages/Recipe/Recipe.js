import { useParams } from "react-router-dom";
// import { useFetch } from '../../hooks/useFetch'
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



import "./Recipe.css";
import useTheme from "../../hooks/useTheme";
import { useEffect, useState } from "react";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

export default function Recipe() {
  const { id } = useParams();
  // const url = "http://localhost:3000/recipes/" + id
  // const {data: recipe, isLoading, error} = useFetch(url)
  const { mode } = useTheme();

  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState('')

  const clickHandler = async () => {
    try {
      const ref = doc(db, "recipes", id);
      await updateDoc(ref, {
        title: inputValue,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setIsLoading(true);

    const ref = doc(db, "recipes", id);
    const unsub = onSnapshot(ref, (snapshot) => {
      if (snapshot.empty) {
        setError("No Recipe To Load...");
        setIsLoading(false);
      } else {
        setRecipe(snapshot.data());
        setIsLoading(false);
      }
    });
    return () => unsub();
  }, [id]);

  if (!recipe) return <div>Recipe not found</div>;

  return (
    <div>
      <div className={`recipe ${mode}`}>
        {error && <p className="error">{error}</p>}
        {isLoading && <p className="loading">Loading...</p>}
        {recipe && (
          <>
            <h2 className="page-title">{recipe.title}</h2>
            <p>Takes {recipe.cookingTime} to Cook.</p>
            <ul>
              {recipe.ingredients.map((ing) => (
                <li key={ing}>{ing}</li>
              ))}
            </ul>
            <p className="method">{recipe.method}</p>
            <TextField fullWidth label="fullWidth" id="fullWidth" color="secondary" onChange={(e) => setInputValue(e.target.value)} />
              <br />
              <br />
              <br />
            <Button className="btn" onClick={() => clickHandler(recipe.id, inputValue)} variant="contained">Update Title</Button>
          </>
        )}
      </div>
    </div>
  );
}

// export default function Recipe() {

//   return (
//     <div>
//       <span>Recipe {id}</span>
//       <h1>{recipe.title}</h1>
//       <p>Method: {recipe.method}</p>
//     </div>
//   )
// }
