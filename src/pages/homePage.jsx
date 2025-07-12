import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProductContext } from '../../context/productContext';
import { useEffect } from 'react';

const HomePage = () => {
 const [products,setProducts]=useState([]);
const loccation=useLocation();
  const{getProducts}=useContext(ProductContext);

  const navigate = useNavigate();
  const gotoProfile=()=>{
    navigate('/profile');
  }

useEffect(() => {
  (async () => {
    try {
      const data = await getProducts();
      if (data?.products) {
        setProducts(data.products);
      } else {
        console.error("No products found");
      }
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  })();
}, [location]);

  
  return (
    <div className='container'>
      <div className='flex justify-between'>
        <img src='/assets/barter.webp' alt='logo' className='w-24'/>
        <img src='/assets/profile_alison.png' onClick={gotoProfile} alt='profile image' className='w-18 rounded-full cursor-pointer'/>
      </div>
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-gray-100 p-6 rounded-xl shadow">
        {products.map((product, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow hover:shadow-md transition">
            <img className="w-full h-48 object-cover rounded-md mb-3 cursor-pointer" src={product.image} alt={`item-${index}`} />
            <h1 className="text-lg font-semibold mb-2">{product.item}</h1>
            <p className="text-lg font-semibold mb-2">{product.description}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              Interested?
            </button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default HomePage;
