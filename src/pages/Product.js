import React from 'react';
import {IonPage, IonRow, IonContent, IonGrid, IonCol, IonButton} from '@ionic/react'
import {closeCircleOutline} from 'ionicons/icons'
import productService from '../services/product'
import firebase from '../firebase'
import {Plugins} from '@capacitor/core'
import UserContext from '../Contexts/UserContext'
import NavHeader from '../components/Header/NavHeader'
import ProductItem from '../components/Product/ProductItem'
import ProductPhotos from '../components/Product/ProductPhotos'

const {Browser}=Plugins

const Product=(props)=>{
    const {user}=React.useContext(UserContext)
    const [product, setProduct]=React.useState(null)
    const productId=props.match.params.productId
    const productRef=firebase.db.collection("products").doc(productId)
    React.useEffect(()=>{
        getProduct()
    }, [productId])

    function getProduct(){
        productRef.get().then((doc)=>{
            setProduct({...doc.data(), id: doc.id})
        })
    }

    function handleAddVote(){
        if (!user){
            props.history.push("/login")
        } else {
            productService.addUpvote(user, productId).then((newProduct)=>setProduct(newProduct)).catch(()=>props.history.push("/login"))
        }
    }

    function handleDeleteProduct(){
        productRef.delete().then(()=>{
            console.log(`Document with ID ${product.id} deleted`)
        })
        .catch((err)=>{
            console.error("Error deleting documents", err)
        })
        props.history.push("/")
    }
    function postedByAuthUser(product){
        return user && user.uid === product.postedBy.id
    }

    async function openBrowser(){
        await Browser.open({
            url: product.url,
        })
    }

    return (
        <IonPage>
            <NavHeader title={product && product.description} option={product && postedByAuthUser(product)} icon={closeCircleOutline} action={handleDeleteProduct} />
            <IonContent>
                {product && (
                    <>
                    <IonGrid>
                        <IonRow>
                            <IonCol class="ion-text-center">
                                <ProductItem product={product} browser={openBrowser}/>
                                <ProductPhotos photos={product.photos}/>
                                <IonButton onClick={()=>handleAddVote()} size="small">Upvote</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    </>
                )}
            </IonContent>
        </IonPage>
    )
}

export default Product