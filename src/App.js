import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import React, { useState } from 'react';
import { nanoid } from 'nanoid';

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
}
const FILTER_NAMES = Object.keys(FILTER_MAP);


export default function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');

  const toggleTaskCompleted = (id) => {
    const updatedTasks = tasks.map(task => {
      if (id === task.id) {
        return {
          ...task,
          completed: !task.completed,
        }
      }
      return task;
    })
    setTasks(updatedTasks);
  }

  const deleteTask = (id) => {
    const remainingTask = tasks.filter(task => id !== task.id);
    setTasks(remainingTask);
  }

  const editTask = (id, newName) => {
    const editedTaskList = tasks.map(task => {
      if (id === task.id) {
        return { ...task, name: newName }
      }
      return task;
    })
    setTasks(editedTaskList)
  }


  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map(task =>
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />);

  const addTask = (name) => {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask])
  }

  const headingText = `${taskList.length} tasks remaining`;

  const filterList = FILTER_NAMES.map((name) =>
    <FilterButton
      name={name}
      key={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  )

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">
        {headingText}
      </h2>
      <ul

        className="todo-list stack-large stack-exception"

      >
        {taskList}
      </ul>
    </div>
  );
}