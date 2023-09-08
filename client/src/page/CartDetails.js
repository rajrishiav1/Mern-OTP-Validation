import React, { useEffect, useState } from 'react'
import './cartstyle.css'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart,emptyCartItem,removeSingleItem,removeToCart } from '../redux/features/cartSlice';
import toast from 'react-hot-toast';
import {loadStripe} from '@stripe/stripe-js';

const CartDetails = () => {
    const[totalprice, setTotalprice] =useState(0)
    const { carts } = useSelector((state) => state.allCart);

    const dispatch = useDispatch()

    //addto cart
    const handleIncrement =(e)=>{
        dispatch(addToCart(e))

    }

    //remove particula data
    const removeParticularData=(e)=>{
        dispatch(removeToCart(e))
        toast.success('Item removed successfully')
        
    }

    //decrement to cart
    const decrementvalue =(e)=>{
        dispatch(removeSingleItem(e))
        
    }
  
    //empty cart
    const emptycartdata =(e)=>{
        dispatch(emptyCartItem(e))
        toast.success('Item removed successfully')
    }

    //set total price
    const total =()=>{
        let totalprice =0;
        carts.map((ele,idx)=>{
            totalprice = ele.price * ele.qnty +totalprice
        })
        setTotalprice(totalprice)
    }

//payement Integeration
        const makePayement =async()=>{
        const stripe = await loadStripe('pk_test_51NhaGySCEm2mpCQOvUMXEy7vPoidN1tbPI6MFq8KcVlW3BUGqne3UlM8uz39Fb2uA1gpIT9i4YAhVBMsgeg4D0ot00YRrXB8Ya')
        const body ={
            products:carts
        }
        const headers={
            'Content-Type':'application/json'
        }
        const response = await fetch('http://localhost:7000/api/create-checkout-session',{
            method:'POST',
            headers:headers,
            body:JSON.stringify(body)
        })
        const session = await response.json()
        const result = stripe.redirectToCheckout({
            sessionId:session.id
        })
        if(result.error){
            console.log(result.error);
        }
}


    useEffect(()=>{
       total()
    },[total])


  return (
    <>
    <div className="row justify-content-center m-0" >
        <div className="col-md-8 mt-5 mb-5 cardsdetails">
            <div className="card">
                <div className="card_header bg-dark p-3">
                    <div className='card-header-flex'>
                    <h5 className='text-white m-0'>{`Cart Calculation ${carts.length}`}</h5>
                    {
                        carts.length>0 ? <button onClick={()=>emptycartdata()} className='btn btn-danger mt-0 btn-sm'><i className='fa fa-trash-alt mr-2'></i><span>EmptyCart</span></button>:""
                    }

                    </div>
                  
                </div>
                <div className="card-body p-0">
                    {
                        carts.length===0 ? <table className='table cart-table mb-0'>
                            <tbody>
                                <tr>
                                    <td colSpan={6}>
                                        <div className='cart-empty'>
                                            <i className='fa fa-shopping-cart'></i>
                                            <p>Your cart is empty</p>
                                        </div>
                                    </td>
                                    </tr>
                            </tbody>

                        </table>:
                        <table className='table cart-table mb-0 table-responsive-sm'>
                            <thead>
                                <tr>
                                    <th>Action</th>
                                    <th>Products</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                    <th className='text-right'><span id='amount' className='amount'> Total Amount</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    carts.map((data,index)=>{
                                        return(
                                            <>
                                            <tr>
                                                <td>
                                                    <button onClick={()=>removeParticularData(data.id)} className='prdct-delete'><i className='fa fa-trash-alt mr-2'></i></button>

                                                </td>
                                                <td>
                                                    <div className='product-img'>
                                                        <img src={data.imgdata} alt="" />
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className='product-name'>
                                                       <p>{data.dish}</p>
                                                    </div>
                                                </td>
                                                <td>{data.price}</td>
                                                <td>
                                                    <div className="prdct-qty-container">
                                                        <button onClick={data.qnty <=1 ?()=>removeParticularData(data.id) :()=>decrementvalue(data)} className='prdct-qty-btn' type='button'><i className='fa fa-minus'></i></button>
                                                       <input type="text " className='qty-input-box' value={data.qnty} name=''  id=''/>
                                                        <button onClick={()=>handleIncrement(data)} className='prdct-qty-btn' type='button'><i className='fa fa-plus'></i></button>
                                                    </div>
                                                </td>
                                                <td className='text-right'>
                                                    {data.price* data.qnty}
                                                </td>
                                            </tr>
                                            </>
                                        )
                                    })
                                }
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>&nbsp;</th>
                                    <th colSpan={2}> &nbsp;</th>
                                    <th >Item in Cart <span className='ml-2 mr-2'>:</span><span className='text-danger'>{carts.length}</span></th>
                                    <th className='text-right'>Total Price <span>:</span><span className='text-danger'>{totalprice}</span></th>
                                    <th className='text-right'><button onClick={makePayement} className='btn btn-success' type='button'>Checkout</button></th>
                                    </tr>
                            </tfoot>

                        </table>
                    }
                </div>
            </div>
        </div>
    </div>
 
    
    </>
  )
}

export default CartDetails
