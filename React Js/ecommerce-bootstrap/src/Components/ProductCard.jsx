import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ComoonContext } from '../ContextAPI/Context';
import { toast } from 'react-toastify';
import { getDatabase, ref, set } from "firebase/database";
import app from '../config/firebase';

export default function ProductCard({ data }) {

    const [rating, setRating] = useState([]);

    var discount_price = data.price * data.discount_percentage / 100;
    var discount_price = data.price - discount_price;

    useEffect(() => {
        var rating = [];
        for (let i = 1; i <= data.rating; i++) {
            rating.push(i);
        }
        setRating(rating);

    }, [])

    let { cartItems, setCartItems, isLogin } = useContext(ComoonContext);

    const addToCart = (productInfo) => {

        const checkProduct = cartItems.filter((v) => {
            if (productInfo.id == v.id) {
                return v;
            }
        })

        if (checkProduct.length > 0) {

            const cartData = cartItems.map((v) => {
                if(productInfo.id == v.id){
                    if(v.quantity < 3){
                        v.quantity++;
                        toast.success('Cart update successfully !')
                        return v;
                    } else {
                        toast.error('Maximum value reached !')
                        return v;
                    }
                    
                } else {
                    return v;
                }
                
            })

            const finalData = [...cartData];
            setCartItems(finalData);
            localStorage.setItem('cartItems', JSON.stringify(finalData));

            const db = getDatabase(app);
            set(ref(db, 'user_carts/' + isLogin), finalData);

        } else {
            const info = {
                id: productInfo.id,
                name: productInfo.name,
                price: productInfo.price,
                image: productInfo.image,
                category_name: productInfo.category_name,
                description: productInfo.description,
                quantity: 1
            }

            const finalData = [info, ...cartItems];
            setCartItems(finalData);
            localStorage.setItem('cartItems', JSON.stringify(finalData));
            toast.success('Add to cart suuccesfully !!')

            const db = getDatabase(app);
            set(ref(db, 'user_carts/' + isLogin), finalData);

            console.log(info);
        }


    }

    return (
        <>
            <div class="col">
                <div class="card h-100 product-card">
                    <div class="position-relative">
                        <img src={data.image} class="card-img-top" alt="Ultra HD 4K Smart TV" />
                        {
                            (data.brand_name)
                                ?
                                <span class="position-absolute top-0 start-0 badge bg-danger m-2">{data.brand_name}</span>
                                :
                                ''
                        }

                    </div>
                    <div class="card-body">
                        <Link to={`/product-details/${data.id}`}>
                            <h5 class="card-title">{data.name}</h5>
                        </Link>

                        <p class="card-text text-muted small mb-0">{data.category_name}</p>
                        <div class="d-flex align-items-center mb-2">
                            <div class="text-warning me-1">

                                {
                                    rating.map((v, i) => {
                                        return (
                                            <i class="fa fa-star" key={i}></i>
                                        )
                                    })
                                }

                            </div>
                            <span class="text-muted small">4.5</span>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                {
                                    (data.discount_percentage > 0)
                                        ?
                                        <>
                                            <span class="fs-5 fw-bold">Rs. {discount_price.toFixed(2)}</span>
                                            <span class="text-decoration-line-through text-muted ms-2">Rs. {data.price}</span>
                                        </>

                                        :
                                        <>
                                            <span class="fs-5 fw-bold">Rs. {data.price}</span>
                                        </>

                                }

                            </div>
                            <button class="btn btn-sm btn-outline-primary" onClick={() => addToCart(data)}>
                                <i class="fa fa-shopping-cart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
