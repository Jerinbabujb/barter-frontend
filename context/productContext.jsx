import { createContext } from "react";
import { useContext } from "react";
import toast from 'react-hot-toast'



export const ProductContext=createContext();
const backend_url = import.meta.env.VITE_BACKEND_URL;

export const ProductProvider=({children})=>{

    const addProduct=async (product)=>{
        try{
        const response= await fetch(backend_url+'api/product/add-product',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(product)
        });
        const data= await response.json();
        if(response.ok){
            return data;
            toast.success(data.message);
        }
        else{
            toast.error(data.message);
        }
    }
    catch(error){
        toast.error(error.message);
    }
    }


    const getProducts=async(req,res)=>{
        try{
        const response= await fetch(backend_url+'api/product/getproduct');
        const data=await response.json();
        if(response.ok){
            return data;
            toast.success(data.message);
        }
        else{
            toast.error(data.message);
        }
    }
    catch(error){
        toast.error(error.message);
    }

    }

   const value={
        addProduct,
        getProducts
    }

    return(
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    )
}