import {BrowserRouter,Route, Routes} from 'react-router-dom'
import React from 'react';
import View from './pages/view';  
import AddEdit from './pages/addEdit';
import About from './pages/about';
import Homepage from './pages/homepage';
import Header from './component/Header';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header />
      <ToastContainer />
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/view/:id" element={<View />} />
        <Route path="/add" element={<AddEdit />} />
        <Route path="/update/:id" element={<AddEdit />} />
        <Route path="/about" element={<About />} />
        
      </Routes>
        </div>
      </BrowserRouter>

  );
}

export default App;
