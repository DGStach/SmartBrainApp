import React from "react";
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, box}) => {
    const listItems = box.map((box,i) =>
        <div className='bounding-box' key = {i}
             style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
    );

   return (
        <div className='center ma'>
            <div className='absolute mt2' id = "Box">
                <img id="inputImage" alt="" src={imageUrl} width='500px' height='auto'/>
                {listItems}
            </div>
        </div>
    );
}
export default FaceRecognition
