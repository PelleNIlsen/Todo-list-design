import React from 'react';
import './styles/App.css';
import TodoList from './components/TodoList';

function App() {
    return (
        <div className="App">
            <header className='App-header'>
                <h1>Welcome back!</h1>
                <p>Here's a list of your tasks for this month!</p>
            </header>
            <main className='App-main'>
                <TodoList />
            </main>
        </div>
    );
}

export default App;
