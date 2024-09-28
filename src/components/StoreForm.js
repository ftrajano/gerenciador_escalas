import React, { useState } from 'react';

const StoreForm = ({ onAddStore }) => {
  const [storeName, setStoreName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (storeName.trim()) {
      onAddStore({ name: storeName.trim() });
      setStoreName('');
    } else {
      alert('Por favor, insira um nome para a loja.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">Nome da Loja</label>
        <input
          type="text"
          id="storeName"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Adicionar Loja
      </button>
    </form>
  );
};

export default StoreForm;