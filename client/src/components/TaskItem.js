import React from 'react';
import { format } from 'date-fns';

function TaskItem({ task, onEdit, onDelete, onStatusChange }) {
  const statusColors = {
    'To Do': 'bg-gray-100',
    'In Progress': 'bg-blue-100',
    'Done': 'bg-green-100'
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (error) {
      return dateString;
    }
  };
  
  return (
    <div className={`p-4 rounded-lg border ${statusColors[task.status]} shadow-sm`}>
      <div className="flex justify-between items-start">
        <h3 className="font-medium">{task.title}</h3>
        <div className="flex space-x-1">
          <button 
            onClick={() => onEdit(task)}
            className="text-gray-500 hover:text-blue-500 p-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          <button 
            onClick={() => onDelete(task.id)}
            className="text-gray-500 hover:text-red-500 p-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {task.description && (
        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
      )}
      
      <div className="mt-3 text-xs text-gray-500">
        Due: {formatDate(task.due_date)}
      </div>
      
      <div className="mt-4 flex gap-2">
        {task.status !== 'To Do' && (
          <button
            onClick={() => onStatusChange(task.id, 'To Do')}
            className="text-xs px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
          >
            To Do
          </button>
        )}
        
        {task.status !== 'In Progress' && (
          <button
            onClick={() => onStatusChange(task.id, 'In Progress')}
            className="text-xs px-2 py-1 bg-blue-200 hover:bg-blue-300 rounded"
          >
            In Progress
          </button>
        )}
        
        {task.status !== 'Done' && (
          <button
            onClick={() => onStatusChange(task.id, 'Done')}
            className="text-xs px-2 py-1 bg-green-200 hover:bg-green-300 rounded"
          >
            Done
          </button>
        )}
      </div>
    </div>
  );
}

export default TaskItem; 