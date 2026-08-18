from fastapi import FastAPI, HTTPException  
from pydantic import BaseModel  
from typing import List, Optional  
import os  
import sqlite3

app = FastAPI()

DATABASE_URL = os.environ.get('DATABASE_URL')

def get_db_connection():
    conn = sqlite3.connect(DATABASE_URL)
    conn.row_factory = sqlite3.Row
    return conn

class Task(BaseModel):
    id: int
    title: str
    time: str
    description: str
    date: str

@app.get('/api/tasks', response_model=List[Task])
async def get_tasks():
    conn = get_db_connection()
    tasks = conn.execute('SELECT * FROM tasks').fetchall()  
    conn.close()  
    return [dict(task) for task in tasks]

@app.post('/api/tasks', response_model=Task)
async def add_task(task: Task):
    conn = get_db_connection()
    conn.execute('INSERT INTO tasks (id, title, time, description, date) VALUES (?, ?, ?, ?, ?)',  
                 (task.id, task.title, task.time, task.description, task.date))
    conn.commit()  
    conn.close()  
    return task

# Updated definition to include '/api/tasks/{id}'
@app.delete('/api/tasks/{id}')
async def delete_task(id: int):
    conn = get_db_connection()
    conn.execute('DELETE FROM tasks WHERE id = ?', (id,))
    conn.commit()  
    conn.close()  
    return None

# Initialize database for the first time
conn = get_db_connection()
conn.execute('CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, title TEXT, time TEXT, description TEXT, date TEXT)')
conn.close()