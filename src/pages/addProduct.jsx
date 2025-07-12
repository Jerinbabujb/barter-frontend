import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { ProductContext } from '../../context/productContext';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const naviagte=useNavigate();
  const [item,setItem]=useState('');
  const [description,setDescription]=useState('');
  const [image,setImage]=useState('');

  const {addProduct}= useContext(ProductContext);
  const handleSubmit=(e)=>{
    e.preventDefault();
      addProduct({item,description,image});
    naviagte('/');
  }

const handleImage = (e) => {
  const file = e.target.files[0];
  if (!file || !file.type.startsWith("image/")) {
    alert("Select a valid image file");
    return;
  }

  const reader = new FileReader();
  reader.onloadend = () => {
    setImage(reader.result);  // ✅ store base64 in state
    e.target.value = "";
  };
  reader.readAsDataURL(file);
};


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Product</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Item Name"
            onChange={(e)=>setItem(e.target.value)}
            value={item}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            placeholder="Item Description"
            rows="4"
            onChange={(e)=>setDescription(e.target.value)}
            value={description}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex flex-col items-center">
            <input type="file" id="image" onChange={handleImage} accept="image/png, image/jpg" hidden />
            <label
              htmlFor="image"
              className="cursor-pointer hover:scale-105 transition"
            >
              {image?(
                 <img
                src={image}
                alt="Upload"
                
                className="w-32 h-32 object-cover border-2 border-dashed border-gray-300 rounded-lg"
              />
              ):(
                 <img
                src="/assets/image.png"
                alt="Upload"
                
                className="w-32 h-32 object-cover border-2 border-dashed border-gray-300 rounded-lg"
              />
              )}
             
              <p className="text-sm text-gray-500 mt-2">Click to upload image</p>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
