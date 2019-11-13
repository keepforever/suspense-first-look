import React, { Suspense } from 'react';
import './App.css';
import { createResource } from './utils/PersonApi';
import Person from './comps/Person';
import Number from './comps/Number';
import ErrorBoundary from './comps/ErrorBoundary';
import { wrapPromise } from './utils/PersonApi';
import { PostResult } from './comps/PostResult';
// randomuser.me/api for toy data

/*
    In this version of App.js, we demonstrate fetching new data, handling errors and posting.
*/

// const resource = createResource(); // the resource will be moved into state because the data is going to be dynamic.

/* we initialize the resource with a createResource call when we initialize state with useState() */
const initialResource = createResource();

function App() {
    /*
        Whenever we want to update the resource, i.e. send fetch request with an updated a paramter,
        we can call setResource with the new param.
    */
    const [resource, setResource] = React.useState(initialResource);
    /*
        The docs hint that it is a bad idea to initialize a resource inside a render method.
        A better practice might be. That way, createResource is only call when the component is initialized
        and NOT ever single time the component re-renders.

        BEST PRACTICES ARE NOT YET ESTABLISHED.
    */
    // const [resource, setResource] = React.useState(() => createResource());

    /* FOR OUR POST REQUEST */
    const [postResource, setPostResource] = React.useState({
        result: {
            read() {
                return null;
            }
        }
    });

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
                {/* 
                    Wherever you "read" your promise, that's where you want to rap Suspense.
                    We read a promise in both Number and Person.
                */}
                <Suspense fallback={
                        <h1 style={{ color: 'black' }}>PostResult FALLBACK...</h1>
                    }>
                    <PostResult resource={postResource} />
                </Suspense>
                <Suspense
                    fallback={
                        <h1 style={{ color: 'black' }}>Person FALLBACK...</h1>
                    }
                >
                    <p>paraph inside Person wrapping "Suspense" component</p>
                    {/*
                        Placing ErrorBoundary here because this is where the error will be thrown up
                        if/when the fetch call fails.  This will avoid crashing the app and display the 
                        error message when the fetch fails (i.e. we put the application in offline mode via the Network tab)
                    */}
                    <ErrorBoundary>
                        <Person resource={resource} />
                    </ErrorBoundary>
                </Suspense>
                <Suspense
                    fallback={
                        <h1 style={{ color: 'black' }}>Number FALLBACK...</h1>
                    }
                >
                    <p>paraph inside Number wrapping "Suspense" component</p>
                    <Number resource={resource} />
                </Suspense>
                <button
                    onClick={() => {
                        /*
                            
                        */
                        const promise = fetch(
                            'https://enkrmfg9kv4vb.x.pipedream.net/',
                            {
                                method: 'POST',
                                body: JSON.stringify({ hello: 'world' })
                            }
                        )
                            .then(x => x.json())
                            .then(x => {
                                console.log('\n', '\n', `x = `, x, '\n', '\n');
                                // history.push, setState, etc.
                                return x;
                            });
                        /* 
                            In order for this to work with Suspense, we must wrap the promise in the same
                            manner as when we created our resource.
                            setPostResource argument must match shape { result: ... }
                        */
                        setPostResource({ result: wrapPromise(promise) });
                    }}
                    style={{
                        height: 50,
                        width: 175,
                        marginBottom: 20
                    }}
                >
                    Call Post Request
                </button>

                <button
                    onClick={() => {
                        /*
                            Since we're just fetching random data each time, we pass no params to create resource.
                            We could do something like setResource(createResource({ page: 5 })); to fetch based on an options object.
                        */
                        setResource(createResource());
                    }}
                    style={{
                        height: 50,
                        width: 175
                    }}
                >
                    Refetch Data
                </button>
            </div>
        </div>
    );
}

export default App;
