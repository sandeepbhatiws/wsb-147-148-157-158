import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ProductDetail() {

    const [productDetails, setProductDetails] = useState('');
    const [currentImage, setCurrentImage] = useState('');

    const params = useParams();

    useEffect(() => {
        axios.get(`https://wscubetech.co/ecommerce-api/productdetails.php?id=${params.id}`)
        .then((result) => {
            setProductDetails(result.data.product)
            setCurrentImage(result.data.product.multiple_images[0])
        })
        .catch(() => {
            toast.error('Something went wrong !!')
        })
    },[]);

    const changeImage = (i) => {
        setCurrentImage(i)
    }


    return (
        <>
            <div class="container-fluid mt-2 mb-3">
                <div class="container my-5">
                    <div class="row">
                        <div class="col-md-5">
                            <div class="main-img">
                                <img class="img-fluid" src={currentImage} alt="ProductS" />
                                <div class="row my-3 previews">
                                    {
                                        productDetails != ''
                                        ?
                                            productDetails.multiple_images.map((image, index) => {
                                                return(
                                                    <div class="col-md-3" key={index}>
                                                        <img class="w-100" src={image} alt="Sale"  onMouseOver={ () => changeImage(image) } />
                                                    </div>
                                                )
                                            })
                                        :

                                        ''
                                    }
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-md-7">
                            <div class="main-description px-2">
                                <div class="category text-bold">
                                    Category: Women
                                </div>
                                <div class="product-title text-bold my-3">
                                    Black dress for Women
                                </div>


                                <div class="price-area my-4">
                                    <p class="old-price mb-1"><del>$100</del> <span class="old-price-discount text-danger">(20% off)</span></p>
                                    <p class="new-price text-bold mb-1">$80</p>
                                    <p class="text-secondary mb-1">(Additional tax may apply on checkout)</p>

                                </div>


                                <div class="buttons d-flex my-5">
                                    <div class="block">
                                        <a href="#" class="shadow btn custom-btn ">Wishlist</a>
                                    </div>
                                    <div class="block">
                                        <button class="shadow btn custom-btn">Add to cart</button>
                                    </div>

                                    <div class="block quantity">
                                        <input type="number" class="form-control" id="cart_quantity" value="1" min="0" max="5" placeholder="Enter email" name="cart_quantity" />
                                    </div>
                                </div>




                            </div>

                            <div class="product-details my-4">
                                <p class="details-title text-color mb-1">Product Details</p>
                                <p class="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat excepturi odio recusandae aliquid ad impedit autem commodi earum voluptatem laboriosam? </p>
                            </div>

                            <div class="row questions bg-light p-3">
                                <div class="col-md-1 icon">
                                    <i class="fa-brands fa-rocketchat questions-icon"></i>
                                </div>
                                <div class="col-md-11 text">
                                    Have a question about our products at E-Store? Feel free to contact our representatives via live chat or email.
                                </div>
                            </div>

                            <div class="delivery my-4">
                                <p class="font-weight-bold mb-0"><span><i class="fa-solid fa-truck"></i></span> <b>Delivery done in 3 days from date of purchase</b> </p>
                                <p class="text-secondary">Order now to get this product delivery</p>
                            </div>
                            <div class="delivery-options my-4">
                                <p class="font-weight-bold mb-0"><span><i class="fa-solid fa-filter"></i></span> <b>Delivery options</b> </p>
                                <p class="text-secondary">View delivery options here</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </>
    )
}
