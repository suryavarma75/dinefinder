import React from 'react'
import './homepage.css'

const Homepage = () => {

    const handleButtonClick = () => {
        window.location.href = '/list';
    };
    return (
        <div className='main'>
            <h1 className="title">DineFinder</h1>
            <p className="subtitle">Discover, Explore, and Choose Restaurants</p>
            <div className="second">
                <button onClick={handleButtonClick}>Get all restaurants</button>
            </div>
        </div>
    )
}

export default Homepage;