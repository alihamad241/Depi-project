import { CheckCircle, ArrowRight } from 'lucide-react';
import React, {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { useCartStore } from '../stores/useCartStore';
import axios from 'axios';
// import { class } from './../../node_modules/@babel/parser/lib/index';
import Confetti from 'react-confetti';
import number from './../../node_modules/d3-scale/src/number';

const PurchaseSuccessPage = () => {
  const [isProcessing, setIsProcessing] =useState(true);
  // const {clearCart}=useCartStore();
  const [error, setError]=useState(null);
  // useEffect(() => {
  //   const handleCheckoutSuccess = async (sessionId) => {
  //     try{
  //       // await axios.post('/payments/checkout-success', { sessionId });
  //       // clearCart();
  //     }catch(error){
  //       console.error("Error processing checkout success:", error);
  //     }finally{
  //       setIsProcessing(false);
  //     }
  //   }
  //   const sessionId = new URLSearchParams(window.location.search).get('session_id');
  //   if(sessionId){
  //     handleCheckoutSuccess(sessionId);
  //   }else{
  //     setIsProcessing(false);
  //     setError("No session ID found in URL");
  //   }
  // }, [clearCart]);

  // if(isProcessing) return "Processing...";

  // if (error) return `Error: ${error}`;

  return (
    <div className='h-screen flex items-center justify-center px-4'>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          gravity={0.1}
          style={{zIndex:99}}
          numberOfPieces={700}
          recycle={false}
        />
        <div className='max-w-md w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden relative z-10'>
            <div className='p-6 sm:p-8'>
              <div className='flex justify-center' >
                  <CheckCircle className='text-emerald-400 w-16 h-16 mb-4' />
              </div>
              <h1 className='text-2xl sm:text-3xl font-bold text-emerald-400 text-center mb-2'>
                Purchase Successful!
              </h1>
              <p className='text-gray-300 text-center mb-2'>
                Thank you for your order. {"we're"} processing it now.
              </p>
              <p className='text-emerald-400 text-center text-sm mb-6'>
                Check your email for order details and updates.
              </p>
              <div className='bg-gray-700 p-4 rounded-lg mb-6'>
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-sm text-gray-400'>Order Number:</span>
                  <span className='text-sm text-emerald-400 font-semibold'>#123456</span>
                </div>
                <div className='flex items-center justify-between '>
                  <span className='text-sm text-gray-400'>Estimated delivery:</span>
                  <span className='text-sm text-emerald-400 font-semibold'>3-5 business days</span>
                </div>
              </div>
              <div className='space-y-4'>
                <button className='w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 font-bold rounded-lg transition duration-300 flex items-center justify-center'>
                  Thanks for trusting us!
                </button>
                <Link to={"/"} className='w-full bg-gray-700 hover:bg-gray-600 text-emerald-400 py-2 px-4 font-bold rounded-lg transition duration-300 flex items-center justify-center'>
                  Continue Shopping
                  <ArrowRight className='ml-2' size={18} /> 
                </Link>
              </div>
              </div>
          </div>
      </div>
  )
}

export default PurchaseSuccessPage