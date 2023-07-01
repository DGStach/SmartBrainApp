import React from 'react';
import './ImageLinkForm.css'
import UseLink from "../UseLink/UseLink";

const ImageLinkForm = ({onInputChange, onButtonSubmit, image64code, imageUrl, exampleImageUrl, message}) => {
    let link1 = "https://raw.githubusercontent.com/DGStach/smartBrainAppFrontend/master/public/people.jpeg";
    let link2 = "https://identity-mag.com/wp-content/uploads/2017/04/concert-audience-fans-at-a-concert-o.jpg";
    let link3 = "https://media1.popsugar-assets.com/files/thumbor/6TyTdApcuH5wEB0tNCS2W1FBsfg/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2020/03/10/740/n/24155406/17e998b8008adf20_GettyImages-1132179376/i/angelina-jolie-brad-pitt-kids.jpg";
    let link4 = "https://raw.githubusercontent.com/DGStach/smartBrainAppBackend/master/controllers/a.png";
    let link5 = "https://www.intouchweekly.com/wp-content/uploads/2022/09/Angelina-Jolie-Allegedly-Tipped-Off-Photographer-About-1st-Pics-With-Brad-Pitt-After-Jennifer-Aniston-Split-.jpg?crop=0px%2C0px%2C2400px%2C1359px&resize=1920%2C1080&quality=86&strip=all";

    const photoHttp = document.getElementById("photoHttp");

    return (
        <div>
            <p className='f3'>
                {'Upload photo and click DETECT. App will recognize a faces on the picture.'}
            </p>
            <div className='center'>
                <div className='form pa4 br3 shadow-5'>
                    <div className="photoInputs">
                        <input
                            id="photoHttp" clasename='placeholder f4 pa2 ' type='text'
                            placeholder="past photo's url link" onChange={onInputChange}
                        />
                        <div className='f3 pa2'> or</div>
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
            <div className="pv2 ph3 longtext">
                https example:
                <div className="inline-flex center">
                    <div onClick={() => {
                        exampleImageUrl(link1);
                        photoHttp.value = link1
                    }}>
                        <UseLink/>
                    </div>
                    <div onClick={() => {
                        exampleImageUrl(link2);
                        photoHttp.value = link2
                    }}>
                        <UseLink/>
                    </div>
                    <div onClick={() => {
                        exampleImageUrl(link3);
                        photoHttp.value = link3
                    }}>
                        <UseLink/>
                    </div>
                    <div onClick={() => {
                        exampleImageUrl(link4);
                        photoHttp.value = link4
                    }}>
                        <UseLink/>
                    </div>
                    <div onClick={() => {
                        exampleImageUrl(link5);
                        photoHttp.value = link5
                    }}>
                        <UseLink/>
                    </div>
                </div>
            </div>
            <div className='pt3 f3 b'>
                {message}
            </div>
        </div>
    )
}
export default ImageLinkForm;
