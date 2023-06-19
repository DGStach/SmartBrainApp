import React from 'react';
import './ImageLinkForm.css'
import logo from './file-folder.png'

const ImageLinkForm = ({onInputChange, onButtonSubmit, image64code}) => {
    return (
        <div>
            <p className='f3'>
                {'This Magic Brain will detect your faces in your pictures. Git it a try.'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input clasename=' f4 pa2' type='text' onChange={onInputChange}/>
                    <form encType="multipart/form-data" action="/upload/image" method="post">
                       <label for = "image-file" className=' grow f4 link ph3 pv2 dib white bgDetect'>Chose File</label>
                        <input id="image-file" type="file" onChange={image64code}/>
                    </form>
                    <button className=' grow f4 link ph3 pv2 dib white bgDetect'
                            onClick={onButtonSubmit}
                    >Detect
                    </button>

                </div>
            </div>
        </div>

    )
}
export default ImageLinkForm;