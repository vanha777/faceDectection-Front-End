import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import logo from './Logo.png';

const Logo = () => {
    return (
        <div >
            <Tilt className='ma4 mt0 ' options={{max:55}} style={{height:250,width:250}} >
                <div className='pa3 tc'>
                    <img className='br-100 ba h3 w3 dib' style={{height:250,width:250}} alt='logo' src={logo} />
                </div>
            </Tilt>

        </div>
    )
}
export default Logo;