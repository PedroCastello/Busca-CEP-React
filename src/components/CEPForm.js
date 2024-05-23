import React, { useState } from 'react';
import axios from 'axios';

const CEPForm = () => {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [googleMapsUrl, setGoogleMapsUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const buscarEndereco = async () => {
    try {
      if (cep.length !== 8) {
        setErrorMessage('O CEP deve ter 8 dígitos. Por favor, insira um CEP válido.');
        setEndereco('');
        setGoogleMapsUrl('');
      } else {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (response.data.erro) {
          setErrorMessage('CEP não encontrado. Por favor, insira um CEP válido.');
          setEndereco('');
          setGoogleMapsUrl('');
        } else {
          const { logradouro, bairro, localidade, uf } = response.data;
          setEndereco(`${logradouro}, ${bairro}, ${localidade} - ${uf}`);
          
          // Construindo a URL do Google Maps com as coordenadas do CEP
          const enderecoParaUrl = `${logradouro}, ${bairro}, ${localidade}, ${uf}`;
          const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(enderecoParaUrl)}`;
          setGoogleMapsUrl(googleMapsUrl);
          setErrorMessage('');
        }
      }
    } catch (error) {
      console.error('Erro ao buscar o endereço:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    buscarEndereco();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={cep} 
          onChange={(e) => setCep(e.target.value)} 
          placeholder="Digite o CEP" 
        />
        <button type="submit">Buscar</button>
      </form>
      <p>{endereco}</p>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
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
