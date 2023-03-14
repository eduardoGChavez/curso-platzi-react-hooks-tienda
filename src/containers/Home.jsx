import React from 'react';
import initialState from '../initialState'
import Products from '../components/Products';

const Home = () => {
    return (
        // <div>{console.log(initialState)}</div>
        <Products products={initialState.products} />
    );
}

export default Home;