import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <p className='f3'>
                {'This Magic Brain will detect your faces in your pictures. Git it a try.'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input claseName=' f4 pa2' type='text' onChange={onInputChange}/>
                    <button className=' grow f4 link ph3 pv2 dib white bgDetect'
                    onClick={onButtonSubmit}
                    >Detect</button>
                </div>
            </div>
        </div>

    )
}
export default ImageLinkForm;