import React from "react";
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, box, imagePath}) => {
    const listItems = box.map((box,i) =>
        <div className='bounding-box' key = {i}
             style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
    );


    if(imagePath) {
        const fileInput = document.getElementById("image-file");
        const inputImage = document.getElementById('inputImage');
        const photoHttp = document.getElementById('photoHttp');
        photoHttp.value = "";

        const file = fileInput.files[0];
        const reader = new FileReader();


        reader.onload = function (event) {
            inputImage.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }

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
