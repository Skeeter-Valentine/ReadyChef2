import React from 'react';
import {IonCard, IonThumbnail, IonCardContent, IonList, IonItem, IonLabel, IonImg, IonButton} from '@ionic/react'

const Recipe=({title, calories, image, ingredients})=>{
    return(
        <IonCard>
            <IonCardContent>
                <IonList lines="none">
                    <IonItem>
                        <IonThumbnail>
                            <IonImg src={image}/>
                        </IonThumbnail>
                    </IonItem>
                    <IonItem>
                        <IonLabel>
                            <strong>{title}</strong>
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <ol>
                            {ingredients.map(ingredient=>(
                            <div>{ingredient.text}</div>
                            ))}
                        </ol>
                    </IonItem>
                    <IonItem>
                       <strong>{Math.floor(calories)} calories </strong>
                    </IonItem>
                    <IonButton>Favorite</IonButton>
                </IonList>
            </IonCardContent>
        </IonCard>
    )
}

export default Recipe;