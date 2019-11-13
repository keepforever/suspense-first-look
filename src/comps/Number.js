import React from 'react';

const Number = ({ resource }) => {
    const num = resource.num.read();
    return <div>your random number is: {num}</div>;
};

export default Number;
