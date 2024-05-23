import React from 'react';
import './App.css';
import CEPForm from './components/CEPForm';

function App() {
  return (
    <div className="App" style={{ backgroundImage: 'url(https://i.pinimg.com/originals/68/2a/a8/682aa81619f08a3e70882caabc02bf1a.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
     <div className="container">
        <h1 style={{ textAlign: 'center', color: '#fff', animation: 'crescer 0.5s ease-in-out forwards' }}>Consulta de Endereço por CEP</h1>
        <CEPForm />
      </div>
    </div>
  );
}

export default App;
