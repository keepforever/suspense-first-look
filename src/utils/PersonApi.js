export const fetchPerson = () => {
    return fetch('https://randomuser.me/api')
        .then(x => x.json())
        .then(y => y.results[0]);
};

/* We must wrap this promise to work with how the Suspense api is designed. */

export const wrapPromise = promise => {
    let status = 'pending'; // keep track of if promise is complete
    let result = ''; // store extra data: i.e. data or error from promise.
    let suspender = promise.then(
        r => {
            // if we get a ".then" we know it worked
            status = 'success';
            result = r;
        },
        e => {
            // otherwise, there was an error
            status = 'error';
            result = e;
        }
    ); // wait for promise to resolve

    return {
        // a function where we can read and check the status of how everything is going.
        read() {
            if (status === 'pending') {
                // React Suspense expects us to throw the promise so that a Suspense boudary can catch it.
                throw suspender;
            } else if (status === 'error') {
                throw result; // because we assign e to result in the event of an error
            }

            // if not pending or error, we can return result
            return result;
        }
    };
};


/* Wait three seconds then return a random number */
export const randomNumber = () => {
    return new Promise(res => setTimeout(() => res(Math.random()), 3000));
  };

/* We call wrapPromise over our fetch person function */
export const createResource = () => {
    return {
        // our fetchPerson returns a Promise, and we wrap that Promise to make sure it fits the Suspense API.
        person: wrapPromise(fetchPerson()),
        num: wrapPromise(randomNumber())

    };
};
