import React from 'react';

const Number = ({ resource }) => {
    const num = resource.num.read();
    return (
        <div
            style={{
                outline: '1px solid red',
                padding: 20,
                margin: `20px 0px`
            }}
        >
            your random number is: {num}
        </div>
    );
};

export default Number;
