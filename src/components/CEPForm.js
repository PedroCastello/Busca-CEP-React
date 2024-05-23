import React, { useState } from 'react';
import axios from 'axios';

const CEPForm = () => {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');

  const buscarEndereco = async () => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      setEndereco(`${response.data.logradouro}, ${response.data.bairro}, ${response.data.localidade} - ${response.data.uf}`);
    } catch (error) {
      console.error('Erro ao buscar o endereço:', error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      buscarEndereco();
    }
  };

  return (
    <div>
      <input 
        type="text" 
        value={cep} 
        onChange={(e) => setCep(e.target.value)} 
        onKeyPress={handleKeyPress} // Chamar a função ao pressionar "Enter"
        placeholder="Digite o CEP" 
      />
      <p>{endereco}</p>
    </div>
  );
};

export default CEPForm;
