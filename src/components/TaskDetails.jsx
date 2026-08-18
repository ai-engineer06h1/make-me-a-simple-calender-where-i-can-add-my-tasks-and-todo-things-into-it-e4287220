import React from 'react';

function TaskDetails({ task, onDelete }) {
  return (
    <div className="bg-white p-4 shadow-md">
      <h2 className="text-xl mb-4">Task Details</h2>
      <div className="mb-2">
        <strong>Title:</strong> {task.title}
      </div>
      <div className="mb-2">
        <strong>Time:</strong> {task.time}
      </div>
      <div className="mb-4">
        <strong>Description:</strong> {task.description}
      </div>
      <button
        className="bg-red-500 text-white px-4 py-2"
        onClick={() => onDelete(task.id)}
      >
        Delete Task
      </button>
    </div>
  );
}

export default TaskDetails;
