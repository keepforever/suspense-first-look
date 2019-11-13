import React from 'react';

const Person = ({ resource }) => {
    const person = resource.person.read();

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                paddingLeft: '30px',
                outline: '1px solid yellow'
            }}
        >
            <h3>Person</h3>
            <p>{person.gender}</p>
            <p>
                {person.name.title} {person.name.last}
            </p>
            {/* <pre>{JSON.stringify(person, null, 2)}</pre> */}
        </div>
    );
};

export default Person;
