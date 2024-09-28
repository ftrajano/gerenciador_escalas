import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const ScheduleTable = ({ shift, roles, employees, selectedStore, schedule }) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-2">{shift.name} ({shift.hours})</h3>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cargo
            </th>
            {[1, 2, 3, 4, 5].map(day => (
              <th key={day} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dia {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {roles.map(role => (
            <tr key={role}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {role}
              </td>
              {[1, 2, 3, 4, 5].map(day => {
                const droppableId = `${shift.id}-${role}-${day}`;
                return (
                  <td key={day} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Droppable droppableId={droppableId}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`min-h-[2rem] p-2 border-2 border-dashed ${
                            snapshot.isDraggingOver ? 'border-blue-500 bg-blue-100' : 'border-gray-200'
                          }`}
                        >
                          {(schedule[droppableId] || []).map((employeeId, index) => {
                            const employee = employees.find(emp => emp.id === employeeId);
                            return employee ? (
                              <Draggable key={employeeId} draggableId={employeeId.toString()} index={index}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`mb-1 p-2 rounded cursor-move ${
                                      snapshot.isDragging ? 'bg-yellow-200 shadow-lg' : 'bg-gray-100'
                                    }`}
                                  >
                                    {employee.name}
                                  </div>
                                )}
                              </Draggable>
                            ) : null;
                          })}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;