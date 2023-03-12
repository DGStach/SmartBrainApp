import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css'
import brain from './brainIcon.png'

const Logo = () =>{
    return (
    <div className='ma4 mt0' style={{width:'150px'}}>
        <Tilt>
            <div className='br2 shadow-5 Tilt' style={{ height: '150px', width:'150px', backgroundColor: 'darkgreen' }}>
                <h1><img style={{paddingTop: '30px'}} src={brain} alt='brain.logo'/></h1>
            </div>
        </Tilt>
        </div>
    )
}
export default Logo