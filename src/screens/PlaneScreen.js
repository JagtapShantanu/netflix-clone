import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import db from '../firebase';
import './PlaneScreen.css';
// import {loadStrip} from "@stripe/stripe-js";

function PlaneScreen() {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);

    useEffect(() => {
        db.collection('product')
        .where('active', "==", true)
        .get()
        .then((querySnapshot) => {
            const products = {};
            querySnapshot.forEach(async (productDoc) => {
                products[productDoc.id] = productDoc.data();
                const priceSnap = await productDoc.ref.collection
                ("prices").get();
                priceSnap.docs.forEach(price => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data()
                    }
                })
            });
            setProducts(products);
        });
    }, [])

console.log(products);
const loadCheckout = async (priceId) => {
    const docRef = await db.collection('custormer')
    .doc(user.uid).collection("checkout_session")
    .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
    });
    docRef.onSnapshot(async (snap) => {
        const {error, sessionId } = snap.data();
            if(error){
                //shoe
                //show
                alert('An error occured: ${error.message}');

            }
            if(sessionId){

                const strip = await loadStripe()
            }
    });

};

  return( <div className ="planeScreen">
    {Object.entries(products).map(([productId, productData]) => {
        // TODO

        return (
            < div clasName="planScreen_plan">
                <div className="planScreen_info">
                    <h5> {productData.name} </h5>
                    <h6> {productData.description}</h6>
                </div>
                <button onClick={() => loadCheckout(productData.prices.priceId)}>
                    Subscribe
                </button>
            </div>
        );
    })}
      
    </div>
  );
}

export default PlaneScreen;
