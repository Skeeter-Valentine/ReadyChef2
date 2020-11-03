import React, {useEffect, useState} from "react";
import {IonPage, IonContent,IonItem, IonLabel, IonInput, IonRow,IonCol, IonButton } from '@ionic/react';
import SmallHeader from '../components/Header/SmallHeader'
import LargeHeader from '../components/Header/LargeHeader'
import Recipe from '../components/Search/Recipe'

const Search = () => {
  
  const APP_ID="20e7ad11";
  const APP_KEY="d215d076978a29657527a3b30ac304d8"
  
const [recipes, setRecipes]= useState([]);
const [search, setSearch]= useState('');
const [query, setQuery]= useState('lasdngfdldasgb')

  useEffect(()=>{
    const getRecipes= async ()=>{
      const response=await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      const data= await response.json();
      setRecipes(data.hits);
      console.log(data)
    };
    getRecipes();
    }, [query]); 

        const updateSearch=e=>{
            setSearch(e.target.value)
        }

        const getSearch=e=>{
            e.preventDefault();
            setQuery(search);
        }
    
    return (
        <IonPage>
            <SmallHeader title="Search"/>
            <IonContent fullscreen>
                <LargeHeader title="Search"/>
                <IonItem lines="full">
                    <IonLabel position="floating">Search Recipes</IonLabel>
                    <IonInput name="url" type="url" onIonChange={updateSearch} required></IonInput>
                </IonItem>
                <IonRow>
                    <IonCol>
                        <IonButton type="submit" color="primary" expand="block" onClick={getSearch}>Search</IonButton>
                    </IonCol>
                </IonRow>
                <div>
                    {recipes.map(recipe=>(
                        <Recipe 
                        key={recipe.recipe.label}
                        title={recipe.recipe.label} 
                        calories={recipe.recipe.calories}
                        image={recipe.recipe.image}
                        ingredients={recipe.recipe.ingredients}
                        />
                    ))}
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Search;