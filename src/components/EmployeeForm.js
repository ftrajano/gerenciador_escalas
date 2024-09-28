import React, { useState } from 'react';

const EmployeeForm = ({ onAddEmployee, stores }) => {
  const [employee, setEmployee] = useState({
    name: '',
    role: '',
    gender: '',
    transports: {}
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee(prev => ({ ...prev, [name]: value }));
  };

  const handleTransportChange = (storeId, value) => {
    setEmployee(prev => ({
      ...prev,
      transports: {
        ...prev.transports,
        [storeId]: parseInt(value)
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (employee.name && employee.role && employee.gender) {
      onAddEmployee(employee);
      setEmployee({ name: '', role: '', gender: '', transports: {} });
    } else {
      alert('Por favor, preencha todos os campos e informe o número de transportes para cada loja.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
        <input
          type="text"
          id="name"
          name="name"
          value={employee.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Função</label>
        <select
          id="role"
          name="role"
          value={employee.role}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Selecione uma função</option>
          <option value="Líder de loja">Líder de loja</option>
          <option value="Média liderança">Média liderança</option>
          <option value="Caixa">Caixa</option>
          <option value="Novatos">Novatos</option>
        </select>
      </div>
      <div>
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gênero</label>
        <select
          id="gender"
          name="gender"
          value={employee.gender}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Selecione o gênero</option>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Número de transportes para cada loja</label>
        {stores.map(store => (
          <div key={store.id} className="mt-1 flex items-center">
            <span className="mr-2">{store.name}:</span>
            <input
              type="number"
              min="0"
              value={employee.transports[store.id] || ''}
              onChange={(e) => handleTransportChange(store.id, e.target.value)}
              className="block w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Adicionar Funcionário
      </button>
    </form>
  );
};

export default EmployeeForm;