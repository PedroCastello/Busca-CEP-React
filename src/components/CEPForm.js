import React, { useState } from 'react';
import axios from 'axios';

const CEPForm = () => {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [googleMapsUrl, setGoogleMapsUrl] = useState('');

  const buscarEndereco = async () => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const { logradouro, bairro, localidade, uf } = response.data;
      setEndereco(`${logradouro}, ${bairro}, ${localidade} - ${uf}`);
      
      // Construindo a URL do Google Maps com as coordenadas do CEP
      const enderecoParaUrl = `${logradouro}, ${bairro}, ${localidade}, ${uf}`;
      const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(enderecoParaUrl)}`;
      setGoogleMapsUrl(googleMapsUrl);
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
      {googleMapsUrl && (
        <p>
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
            Google Maps
          </a>
        </p>
      )}
    </div>
  );
};

export default CEPForm;
