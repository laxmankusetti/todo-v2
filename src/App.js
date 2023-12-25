import React, { useState } from 'react';
import Header from './components/Header';
import TasksContainer from './components/TasksContainer';
import TasksWithDragAndDrp from './components/TasksWithDragAndDrop';


const App = () => {

  const [mode, setMode] = useState(true)

  return (
    <div className={`${mode ? 'App' : 'App light'}`}>
      <Header setMode={setMode} mode={mode}/>
      {/* <TasksContainer mode = {mode} setMode={setMode}  /> */}
      <TasksWithDragAndDrp />
    </div>
  )
}

export default App
