import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css'

const Logo = () =>{
    return (
    <div className='ma4 mt0'>
        <Tilt>
            <div className='br2 shadow-5 Tilt' style={{ height: '150px', width:'150px', backgroundColor: 'darkgreen' }}>
                <h1>React Parallax Tilt 👀</h1>
            </div>
        </Tilt>
        </div>
    )
}
export default Logo