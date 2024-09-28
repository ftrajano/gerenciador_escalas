import React, { useState, useEffect, useMemo } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { Calendar, Store } from 'lucide-react';
import { DragDropContext } from 'react-beautiful-dnd';
import ScheduleTable from './ScheduleTable';
import EmployeeForm from './EmployeeForm';
import StoreForm from './StoreForm';

const StoreSpecificScheduleManager = () => {
  const [stores, setStores] = useState([
    { id: 1, name: 'Loja Centro' },
    { id: 2, name: 'Loja Shopping' }
  ]);
  const [employees, setEmployees] = useState([
    { 
      id: 1, 
      name: 'João Silva', 
      role: 'Líder de loja', 
      gender: 'Masculino',
      transports: { 1: 1, 2: 3 },
    },
    { 
      id: 2, 
      name: 'Maria Oliveira', 
      role: 'Média liderança', 
      gender: 'Feminino',
      transports: { 1: 2, 2: 1 },
    },
    { 
      id: 3, 
      name: 'Pedro Santos', 
      role: 'Caixa', 
      gender: 'Masculino',
      transports: { 1: 3, 2: 1 },
    },
  ]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [schedule, setSchedule] = useState({});

  const shifts = useMemo(() => [
    { id: 'opening', name: 'Abertura', hours: '8:00 - 16:20' },
    { id: 'middle', name: 'Intermédio', hours: '11:40 - 20:00' },
    { id: 'closing', name: 'Fechamento', hours: '14:20 - 22:00' },
  ], []);

  const roles = useMemo(() => ['Líder de loja', 'Média liderança', 'Caixa', 'Novatos'], []);

  useEffect(() => {
    const initialSchedule = {};
    shifts.forEach(shift => {
      roles.forEach(role => {
        [1, 2, 3, 4, 5].forEach(day => {
          const key = `${shift.id}-${role}-${day}`;
          initialSchedule[key] = [];
        });
      });
    });

    employees.forEach(employee => {
      const randomShift = shifts[Math.floor(Math.random() * shifts.length)];
      const randomDay = Math.floor(Math.random() * 5) + 1;
      const key = `${randomShift.id}-${employee.role}-${randomDay}`;
      if (initialSchedule[key]) {
        initialSchedule[key].push(employee.id);
      }
    });

    setSchedule(initialSchedule);
  }, [shifts, roles, employees]);

  const addEmployee = (newEmployee) => {
    const newEmployeeWithId = { ...newEmployee, id: employees.length + 1 };
    setEmployees([...employees, newEmployeeWithId]);
  };

  const addStore = (newStore) => {
    setStores([...stores, { ...newStore, id: stores.length + 1 }]);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    setSchedule(prevSchedule => {
      const newSchedule = {...prevSchedule};
      const sourceItems = Array.from(newSchedule[source.droppableId] || []);
      const destItems = Array.from(newSchedule[destination.droppableId] || []);
      const [movedItem] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, parseInt(draggableId));

      return {
        ...newSchedule,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destItems,
      };
    });
  };

  const renderStoreList = () => (
    <ul className="bg-gray-50 rounded-lg divide-y">
      {stores.map((store) => (
        <li 
          key={store.id} 
          className="flex items-center p-3 cursor-pointer hover:bg-gray-100"
          onClick={() => setSelectedStore(store.id)}
        >
          <Store className="h-5 w-5 text-gray-400 mr-2" />
          <span>{store.name}</span>
        </li>
      ))}
    </ul>
  );

  const renderSchedule = () => (
    <div>
      <button 
        onClick={() => setSelectedStore(null)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Voltar para lista de lojas
      </button>
      <h2 className="text-xl font-semibold mb-4">
        Escala: {stores.find(s => s.id === selectedStore)?.name}
      </h2>
      {shifts.map(shift => (
        <ScheduleTable 
          key={shift.id}
          shift={shift}
          roles={roles}
          employees={employees}
          selectedStore={selectedStore}
          schedule={schedule}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center mb-6">
          <Calendar className="mr-2" /> Gerenciador de Escalas por Loja
        </h1>
        <Tabs.Root defaultValue="schedule">
          <Tabs.List className="flex mb-6">
            <Tabs.Trigger value="schedule" className="flex-1 py-2 px-4">Escalas</Tabs.Trigger>
            <Tabs.Trigger value="employees" className="flex-1 py-2 px-4">Funcionários</Tabs.Trigger>
            <Tabs.Trigger value="stores" className="flex-1 py-2 px-4">Lojas</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="schedule">
            <DragDropContext onDragEnd={onDragEnd}>
              {selectedStore === null ? renderStoreList() : renderSchedule()}
            </DragDropContext>
          </Tabs.Content>
          <Tabs.Content value="employees">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Adicionar Funcionário</h2>
                <EmployeeForm onAddEmployee={addEmployee} stores={stores} />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4">Funcionários Cadastrados</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  {employees.map((employee) => (
                    <div key={employee.id} className="mb-4 p-3 bg-white rounded-lg shadow">
                      <div className="flex items-center mb-2">
                        <span className="font-medium">{employee.name}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <div>{employee.role}</div>
                        <div>Gênero: {employee.gender}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Tabs.Content>
          <Tabs.Content value="stores">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Adicionar Loja</h2>
                <StoreForm onAddStore={addStore} />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4">Lojas Existentes</h2>
                {renderStoreList()}
              </div>
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
};

export default StoreSpecificScheduleManager;