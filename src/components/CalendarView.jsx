import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';

function CalendarView({ tasks, onDateClick, onAddTask, onTaskClick }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const startDay = startOfMonth(currentMonth);
  const endDay = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: startDay, end: endDay });

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4 text-center font-bold text-blue-800">Calendar View</h1>
      <div className="flex justify-between mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handlePrevMonth}>Previous</button>
        <span className="text-xl font-semibold">{format(currentMonth, 'MMMM yyyy')}</span>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleNextMonth}>Next</button>
      </div>
      <button className="bg-green-500 text-white px-4 py-2 mb-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400" onClick={onAddTask}>Add Task</button>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <div
            key={index}
            className={`border p-2 rounded-lg cursor-pointer transition transform hover:scale-105 ${
              isSameMonth(day, currentMonth) ? 'bg-white' : 'bg-gray-100'
            } ${isSameDay(day, new Date()) ? 'ring-2 ring-blue-600' : ''}`}
            onClick={() => onDateClick(day)}
          >
            <div className={isSameDay(day, new Date()) ? 'font-bold text-blue-600' : ''}>{format(day, 'd')}</div>
            {tasks.filter(t => isSameDay(new Date(t.date), day)).map(task => (
              <div
                key={task.id}
                className="bg-gray-200 mt-1 p-1 rounded-md"
                onClick={(e) => { e.stopPropagation(); onTaskClick(task); }}
              >
                {task.title}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalendarView;
