import '../FaceRecognition/FaceRecognition.css'
import {createElement} from "react";

const FaceRecognitionBox = ({box}) => {

    return(
        createElement("div",
            {
                className: 'bounding-box',
                style: {
                    top: box.topRow,
                    right: box.rightCol,
                    bottom: box.bottomRow,
                    left: box.leftCol
                }
            },null)
        )
}
export default FaceRecognitionBox;