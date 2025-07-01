import React from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Courses from './components/Courses';
import Contact from './components/Contact';
import Footer from './components/Footer';
import UserList from './components/UserList';
import TeacherList from './components/TeacherList';

function App() {
  return (
    <div className="App">
      {<Header />
      /* <Hero />
      <About />
      <Courses />
      <Contact /> */}
      {/* <UserList /> */}
      <TeacherList />
      <Footer />
    </div>
  );
}

export default App;
