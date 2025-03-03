// src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    // Fetch tasks from Flask backend
    axios.get('http://127.0.0.1:5000/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const handleAddTask = () => {
    // Send new task to Flask backend
    axios.post('http://127.0.0.1:5000/tasks', { task: newTask })
      .then(response => {
        setTasks([...tasks, { id: tasks.length + 1, task: newTask }]);
        setNewTask('');
      })
      .catch(error => console.error('Error adding task:', error));
  };

  return (
    <div className="App">
      <h1>Task Manager!!</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={handleAddTask}>Add Task</button>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.task}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
