import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TaskItem from '../components/TaskItem';
import TaskForm from '../components/TaskForm';

const API_URL = 'http://localhost:5001/api';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate();
  
  const username = localStorage.getItem('username');
  const userId = localStorage.getItem('userId');
  
  useEffect(() => {
    if (!username || !userId) {
      navigate('/login');
    }
  }, [username, userId, navigate]);
  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_URL}/tasks`, {
          params: { user_id: userId }
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTasks();
  }, [userId]);
  
  const handleCreateTask = async (taskData) => {
    try {
      const taskWithUserId = {
        ...taskData,
        user_id: userId
      };
      const response = await axios.post(`${API_URL}/tasks`, taskWithUserId);
      setTasks([...tasks, response.data]);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };
  
  const handleUpdateTask = async (taskData) => {
    try {
      const taskWithUserId = {
        ...taskData,
        user_id: userId
      };
      const response = await axios.put(`${API_URL}/tasks/${editingTask.id}`, taskWithUserId);
      setTasks(tasks.map(task => task.id === editingTask.id ? response.data : task));
      setIsFormOpen(false);
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  
  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`${API_URL}/tasks/${id}`);
        setTasks(tasks.filter(task => task.id !== id));
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };
  
  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };
  
  const handleStatusChange = async (id, newStatus) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      try {
        const updatedTask = { ...task, status: newStatus, user_id: userId };
        const response = await axios.put(`${API_URL}/tasks/${id}`, updatedTask);
        setTasks(tasks.map(t => t.id === id ? response.data : t));
      } catch (error) {
        console.error('Error updating task status:', error);
      }
    }
  };
  
  const filterTasks = (status) => {
    return tasks.filter(task => task.status === status);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    navigate('/login');
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            {username}'s Tasks
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setEditingTask(null);
                setIsFormOpen(true);
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Add New Task
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Loading tasks...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* To Do column */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-gray-200 font-medium">
                To Do
              </div>
              <div className="p-4 space-y-3 min-h-[12rem]">
                {filterTasks('To Do').length > 0 ? (
                  filterTasks('To Do').map(task => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onEdit={handleEditTask}
                      onDelete={handleDeleteTask}
                      onStatusChange={handleStatusChange}
                    />
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No tasks to do</p>
                )}
              </div>
            </div>
            
            {/* In Progress column */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-blue-200 font-medium">
                In Progress
              </div>
              <div className="p-4 space-y-3 min-h-[12rem]">
                {filterTasks('In Progress').length > 0 ? (
                  filterTasks('In Progress').map(task => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onEdit={handleEditTask}
                      onDelete={handleDeleteTask}
                      onStatusChange={handleStatusChange}
                    />
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No tasks in progress</p>
                )}
              </div>
            </div>
            
            {/* Done column */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-green-200 font-medium">
                Done
              </div>
              <div className="p-4 space-y-3 min-h-[12rem]">
                {filterTasks('Done').length > 0 ? (
                  filterTasks('Done').map(task => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onEdit={handleEditTask}
                      onDelete={handleDeleteTask}
                      onStatusChange={handleStatusChange}
                    />
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No completed tasks</p>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
      
      {/* Task form modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <TaskForm
              task={editingTask}
              onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingTask(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoList; 