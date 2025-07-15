import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/userContext';
import { ProductContext } from '../../context/productContext';

const Profile = () => {
  const navigate = useNavigate();
  const {authUser}=useContext(AuthContext);
  const {getUserProducts}=useContext(ProductContext);
  const [image,setImage]=useState(authUser.image);
  const [name,setName]=useState(authUser.name);
  const [productImages,setProductImages]=useState([])

  const gotoAddProduct = () => {
    navigate('/new-product');
  };


  useEffect(()=>{
    const fetchProducts=async()=>{
      const data=await getUserProducts();
    setProductImages(data.products);
    }
    fetchProducts();
  },[])



  



  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile section */}
      <div className="flex flex-col md:flex-row items-start gap-6 bg-white p-6 rounded-xl shadow-md mb-8">
        <div className="w-32 h-32">
          <img
            src={image}
            alt="Profile"
            className="w-full h-full object-cover rounded-full border-2 border-gray-300"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">{name}</h1>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi perspiciatis, iure quod expedita enim provident possimus soluta, libero vero temporibus quo molestiae laboriosam accusamus harum porro sapiente repudiandae. Rem, quis.
          </p>
        </div>
      </div>

      {/* Add button */}
      <div className="mb-6 text-right">
        <button
          onClick={gotoAddProduct}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          + Add New Item
        </button>
      </div>

      {/* Your Items section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Items</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {productImages && productImages.length>0 ? (
          productImages.map((product, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <img
                src={product.image}
                alt=''
                className="w-full h-40 object-cover"
              />
            </div>
          )))
          :(<h1 className="text-2xl font-semibold text-gray-800 mb-2">Nothing to show</h1>)}
        </div>
      </div>
    </div>
  );
};

export default Profile;
