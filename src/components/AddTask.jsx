import React, { useState } from 'react';

function AddTask({ onSubmit, onCancel }) {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id: Date.now(), title, time, description, date: 1 }); // Mock date
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md">
      <h2 className="text-xl mb-4">Add Task</h2>
      <div className="mb-3">
        <label className="block mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1">Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="flex justify-between">
        <button type="button" onClick={onCancel} className="bg-gray-300 px-4 py-2">Cancel</button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Save Task</button>
      </div>
    </form>
  );
}

export default AddTask;
