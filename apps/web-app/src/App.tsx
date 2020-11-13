import React from 'react';
import SimpleCounter from './components/SimpleCounter';
import TaskList from './components/TaskList';
import './App.css';
import TaskListSummary from './components/TaskListSummary';

function App() {
    
    return (
        <div className="App">
            <div style={{ width:"25%", float:"left" }}>{" "}</div>
            <div style={{ width:"25%", float:"left" }}>
                <TaskListSummary />
            </div>
            <div style={{ width:"25%", float:"left" }}>
                <TaskList />
            </div>
        </div>
    );
}

export default App;
