import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [currentState,setCurrentState]=useState('Sign Up');
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [image,setImage] = useState('');

    const navigate=useNavigate();

    const {login} = useContext(AuthContext);
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

  const handleSubmit=async (e)=>{
    e.preventDefault();
    
  await login(currentState==='Sign Up'?'signup':'login',{name,email,password,image}) ; 
  navigate('/');
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden max-w-5xl w-full grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Side with Image */}
        <div className="hidden md:flex items-center justify-center bg-gray-100 p-8">
          <img src="/assets/barter.webp" alt="logo" className="w-3/4 object-contain" />
        </div>

        {/* Right Side - Form */}
        {currentState &&
        <div className="flex items-center justify-center p-8">
          <form className="w-full max-w-md space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 text-center">{currentState}</h2>
            {currentState=='Sign Up' &&
            <input
              type="text"
              onChange={(e)=>setName(e.target.value)}
              value={name}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
}
            <input
              type="email"
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {currentState ==='Sign Up' &&
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
            }

            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              {currentState}
            </button>
            {currentState == 'Sign Up' &&
            <p className='cursor-pointer' onClick={()=>setCurrentState('Sign In')}>already have an account</p>
}
            {currentState=='Sign In' &&
            <p className='cursor-pointer' onClick={()=>setCurrentState('Sign Up')}>Create a new account</p>
            }
          </form>
        </div>
}
      </div>
    </div>
  );
};

export default LoginPage;
