import React, { Suspense, SuspenseList } from 'react';
import './App.css';
import { createResource } from './utils/PersonApi';
import Person from './comps/Person';
import Number from './comps/Number';
import ErrorBoundary from './comps/ErrorBoundary';
import { SuspenseGrid } from './comps/SuspenseGrid';
// randomuser.me/api for toy data

/*
    In this version of App.js, we demonstrate wrapping Suspense elements with SuspenseList
    to control the order which they render, depending on when they're all ready.

    This is best shown when the Network is slowed down to "slow 3g" and the randomNumber
    promise timeOut is set to 1500.
*/

const initialResource = createResource();

function App() {
    const [resource, setResource] = React.useState(initialResource);

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
                <ErrorBoundary>
                    <SuspenseList
                        // tail = hidden shows no loading indicators (fallbacks).
                        // tail = collapsed shows only the first loading indicator (Number FALLBACK...)
                        // tail="hidden"
                        // revealOrder = "together" shows both loading indicators until both resources are ready.
                        revealOrder="forwards"
                    >
                        {/*
                            With SuspenseList, even if Person loads faster than Number, SuspenseList will
                            wait for Number before showing either of them (so long as revealOrder = "forwards").
                         */}
                        <Suspense
                            fallback={
                                <h1 style={{ color: 'black' }}>
                                    Number FALLBACK...
                                </h1>
                            }
                        >
                            <Number resource={resource} />
                        </Suspense>
                        <Suspense
                            fallback={
                                <h1 style={{ color: 'black' }}>
                                    Person FALLBACK...
                                </h1>
                            }
                        >
                            <Person resource={resource} />
                        </Suspense>
                    </SuspenseList>
                </ErrorBoundary>
                <button
                    onClick={() => {
                        setResource(createResource());
                    }}
                    style={{
                        height: 50,
                        width: 175
                    }}
                >
                    Refetch Data
                </button>
                <SuspenseGrid />
            </div>
        </div>
    );
}

export default App;
