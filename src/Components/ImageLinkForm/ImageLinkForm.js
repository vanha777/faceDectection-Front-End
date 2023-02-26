import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange,onClickChange,onClearChange}) => {
    return (
        <div>
            <p className='f3 black center fw6'>
                {'This MaGic Brain Will Detect Faces In Your Pictures. Give It A Try :)'}
            </p>
            <div className='center'>
                <div className=' grow pa4 br3 shadow-5 center' >
                    <input className='f4 pa2 w-70 ' type='text' onChange={onInputChange}/>
                    <button className=' w-30 f4 link ph3 pv2 dib fw6 white bgCustom' onClick={onClickChange}>Scan</button>
                </div>          
            </div>
        </div>
    )
}
export default ImageLinkForm;