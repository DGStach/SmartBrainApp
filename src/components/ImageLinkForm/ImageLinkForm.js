import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit, image64code}) => {
    return (
        <div>
            <p className='f3'>
                {'Upload photo and click DETECT. App will recognize a faces on the picture.'}
            </p>
            <div className='center'>
                <div className='form pa4 br3 shadow-5'>
                    <div className="photoInputs">
                        <input id="photoHttp" clasename='placeholder f4 pa2 ' type='text' placeholder="past photo's url link" onChange={onInputChange}/>
                       <div className='f3 pa2'> or </div>
                        <form encType="multipart/form-data" action="/upload/image" method="post">
                            <label htmlFor="image-file" className=' grow f4 link ph3 pv2 dib white-90 choseFile'>Chose
                                png/jpg file</label>
                            <input id="image-file" type="file" onChange={image64code}/>
                        </form>
                    </div>
                    <button className='grow f4 link pv2 ph2 dib w-70 black-80 bgDetect'
                            onClick={onButtonSubmit}
                    >Detect
                    </button>

                </div>
            </div>
        </div>

    )
}
export default ImageLinkForm;