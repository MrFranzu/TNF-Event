import React, { useState } from 'react';

import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import Menu from './Components/Menu/Menu'; // Adjust the path as needed
import BookingForm from './Components/BookingForm/BookingForm';
import Contact from './Components/Contact/Contact';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
          
            <Home setCurrentPage={setCurrentPage}/>
          </>
        );
        case 'menu':
          return <Menu />;
      case 'about':
        return <About />;
      case 'booking':
        return (
          <>
            <BookingForm />
          </>
        );
      case 'contact':
        return <Contact />;
      default:
        return <Home />;
        
    }
  };

  return (
    <div className="app">
      <Header 
        setCurrentPage={setCurrentPage} 
        currentPage={currentPage} 
        toggleNav={toggleNav} 
        isNavOpen={isNavOpen} 
      />
      <main>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
