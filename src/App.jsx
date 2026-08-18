import React, { useState, useEffect } from 'react';
import CalendarView from './components/CalendarView';
import AddTask from './components/AddTask';
import TaskDetails from './components/TaskDetails';

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetch('/api/tasks')
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setSelectedTask(null);
  };

  const handleAddTask = () => {
    setIsAddingTask(true);
  };

  const handleTaskSubmit = (task) => {
    fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
      .then(response => response.json())
      .then(newTask => {
        setTasks([...tasks, newTask]);
        setIsAddingTask(false);
      });
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleDeleteTask = (taskId) => {
    fetch(`/api/tasks/${taskId}`, {
      method: 'DELETE',
    }).then(() => {
      setTasks(tasks.filter(t => t.id !== taskId));
      setSelectedTask(null);
    });
  };

  return (
    <div className="p-4">
      {isAddingTask ? (
        <AddTask 
          onSubmit={(task) => handleTaskSubmit({ ...task, date: selectedDate })} 
          onCancel={() => setIsAddingTask(false)} 
        />
      ) : selectedTask ? (
        <TaskDetails task={selectedTask} onDelete={handleDeleteTask} />
      ) : (
        <CalendarView
          tasks={tasks}
          onDateClick={handleDateClick}
          onAddTask={handleAddTask}
          onTaskClick={handleTaskClick}
        />
      )}
    </div>
  );
}

export default App;
