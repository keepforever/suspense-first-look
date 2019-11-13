import React from 'react';

const Person = ({ resource }) => {
    const person = resource.person.read();

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: '30px'
            }}
        >
            <h3>Hello Person</h3>
            <p>{person.gender}</p>
            <p>
                {person.name.title} {person.name.last}
            </p>
            {/* <pre>{JSON.stringify(person, null, 2)}</pre> */}
        </div>
    );
};

export default Person;
