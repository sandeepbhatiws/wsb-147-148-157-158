import React, { useContext, useEffect, useState } from 'react'
import { ComoonContext } from '../ContextAPI/Context';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ViewCart() {

    let { cartItems, setCartItems } = useContext(ComoonContext);

    const [getCartItems, setGetCartItems] = useState(cartItems);

    const [totalAmount, setTotalAmount] = useState(0)

    useEffect(() => {
        var sum = 0;
        cartItems.forEach((v) => {
            sum += v.price * v.quantity;
        })
        setTotalAmount(sum);
    },[cartItems])

    const updateCart = (id, type) => {
        if(type == 'minus'){
            const cartData = cartItems.map((v) => {
                if(id == v.id){
                    if(v.quantity > 1){
                        v.quantity--;
                        toast.success('Cart update successfully !')
                        return v;
                    } else {
                        toast.error('Minimum 1 qty required !')
                        return v;
                    }
                    
                } else {
                    return v;
                }
                
            })

            const finalData = [...cartData];
            setCartItems(finalData);
            localStorage.setItem('cartItems', JSON.stringify(finalData));
        }
    }
    

    return (
        <>
            <div className='container-fluid p-5'>
                <div className='container'>
                    <div className='row'>
                        <div class="col-sm-12 col-md-12">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Description</th>
                                        <th>Quantity</th>
                                        <th class="text-center">Price</th>
                                        <th class="text-center">Total</th>
                                        <th> </th>
                                    </tr>
                                </thead>
                                <tbody>
            {
                getCartItems.length > 0

                    ?

                    getCartItems.map((cart, index) => {
                        return (
                            <tr key={index}>
                                <td class="col-sm-8 col-md-3">
                                    <div class="media">
                                        <a class="thumbnail pull-left" href="#"> <img class="media-object" src={cart.image}  width={150}/> </a>
                                        <div class="media-body">
                                            <h4 class="media-heading">
                                                <Link to={`/product-details/${cart.id}`} className='text-decoration-none text-black'>{cart.name}</Link>
                                            </h4>
                                            <h5 class="media-heading"> Category : { cart.category_name}</h5>
                                            
                                        </div>
                                    </div></td>
                                <td class="col-md-3 text-left"><strong class="label label-danger">{ cart.description ?? 'N/A' }</strong></td>
                                <td class=" text-center d-flex justify-content-between">
                                    <button onClick={ () => updateCart(cart.id,'minus') } >-</button>

                                    <div>
                                        <input type="text" class="form-control" id="exampleInputEmail1" defaultValue={cart.quantity} onChange={ () => updateCart(cart.id,'') } />
                                    </div>
                                    

                                    <button onClick={ () => updateCart(cart.id,'plus') }>+</button>
                                </td>
                                <td class="col-sm-1 col-md-1 text-center"><strong>${cart.price}</strong></td>
                                <td class="col-sm-1 col-md-1 text-center"><strong>${cart.price * cart.quantity}</strong></td>
                                <td class="col-sm-1 col-md-1">
                                    <button type="button" class="btn btn-danger">
                                        Remove
                                    </button></td>
                            </tr>
                        )
                    })

                    :
                    ""
            }



                                    <tr>
                                        <td>   </td>
                                        <td>   </td>
                                        <td>   </td>
                                        <td><h5>Subtotal</h5></td>
                                        <td class="text-right"><h5><strong>$999.99</strong></h5></td>
                                    </tr>
                                    <tr>
                                        <td>   </td>
                                        <td>   </td>
                                        <td>   </td>
                                        <td><h5>Estimated shipping</h5></td>
                                        <td class="text-right"><h5><strong>$9.999.99</strong></h5></td>
                                    </tr>
                                    <tr>
                                        <td>   </td>
                                        <td>   </td>
                                        <td>   </td>
                                        <td><h3>Total</h3></td>
                                        <td class="text-right"><h3><strong>${ totalAmount }</strong></h3></td>
                                    </tr>
                                    <tr>
                                        <td>   </td>
                                        <td>   </td>
                                        <td>   </td>
                                        <td>
                                            <button type="button" class="btn btn-default">
                                                <span class="fa fa-shopping-cart"></span> Continue Shopping
                                            </button></td>
                                        <td>
                                            <button type="button" class="btn btn-success">
                                                Checkout <span class="fa fa-play"></span>
                                            </button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
