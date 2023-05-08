import React from "react";
import './FaceRecognition.css';
import FaceRecognitionBox from "../FaceRecognitionBox/FaceRecognitionBox";

const FaceRecognition = ({imageUrl, box}) => {
   return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id="inputImage" alt="" src={imageUrl} width='500px' height='auto'/>
                <FaceRecognitionBox box={box}/>
            </div>
        </div>
    );
}
export default FaceRecognition
