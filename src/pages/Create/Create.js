import {useEffect, useState} from 'react'
import './Create.css'
import { useFetch } from '../../hooks/useFetch'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase/config'


export default function Create() {

  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const [newIngredient, setNewIngredient] = useState('')
  const [ingredients, setIngredients] = useState([])

  // const {postData, data, error} = useFetch('http://localhost:3000/recipes', 'POST')
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    // postData({title, ingredients, method, cookingTime: cookingTime + ' minutes'})
    const doc = {title, ingredients, method, cookingTime: cookingTime + ' minutes'}

    try {
      const ref = collection(db, 'recipes')
      await addDoc(ref, doc)
      navigate('/')
    } catch (err){
      console.log(err)
    }
  } 

  const handleAdd = (e) => {
    e.preventDefault()
    if(newIngredient && !ingredients.includes(newIngredient)){
      setIngredients(preIngredients => [...preIngredients, newIngredient])
    }
    setNewIngredient('')
  }

  // useEffect(() => {
  //   if(data){
  //     navigate("/")
  //   }
  // }, [data, navigate]) 


  return (
    <div className="create">
      <h2 className='page-title'>Add a New Recipe</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title: </span>
          <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} required/>
        </label>
        <label>
          <span>Recipe Method: </span>
          <textarea onChange={(e) => setMethod(e.target.value)} value={method} required></textarea>
        </label>
        <label>
          <span>Cooking time(min): </span>
          <input type="number" onChange={(e) => setCookingTime(e.target.value)} value={cookingTime} required/>
        </label>

        <label>
          <span>Recipe Ingredients: </span>
          <div className="ingredients">
            <input type="text" onChange={(e) => setNewIngredient(e.target.value)} value={newIngredient}/>
            <button onClick={handleAdd} className='btn'>Add</button>
          </div>
          <ul>
            <span>Current Ingredients: </span>
            {ingredients.map(ingredient => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </label>
        <button className='btn'>Submit</button>
      </form>
    </div>
  )
}
