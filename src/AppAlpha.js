import React, { Suspense } from 'react';
import './App.css';
import { createResource } from './utils/PersonApi';
import Person from './comps/Person';
import Number from './comps/Number';
// randomuser.me/api for toy data

/*
    In this version of App.js, we demonstrate a different <Suspense /> nesting strategy.
*/

const resource = createResource();

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h3 style={{ margin: 0 }}>Suspense First look</h3>
            </header>
            <div
                style={{
                    background: 'grey',
                    minHeight: '90vh',
                    color: 'white'
                }}
            >
                <h4 style={{ margin: 0 }}>
                    Adjacent, but not inside "Suspense"{' '}
                </h4>
                <Suspense
                    fallback={
                        <h1 style={{ color: 'blue' }}>AppAlpha fallback...</h1>
                    }
                >
                    <Person resource={resource} />
                    <Number resource={resource} />
                </Suspense>
            </div>
        </div>
    );
}

export default App;
