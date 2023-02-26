import React from 'react';
import './FaceRecognition.css';
import { v4 as uuidv4 } from 'uuid';
import { motion } from "framer-motion"

class FaceRecognition extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        if (this.props.imageURL.length != 0)
            return (
                <div className='center ma' >
                    <div className='absolute mt2' >
                        <img id='image' alt='' src={this.props.imageURL} width='500px' height='auto' className='animated bounce'  />
                        {this.props.box.length != 0
                            ? <div>
                                {this.props.box.map(values => <div className='faceBox' key={uuidv4()} style={{ top: values.top_row, right: values.right_col, bottom: values.bottom_row, left: values.left_col }}></div>)}
                            </div>
                            : (null)
                        }
                    </div>
                </div>

            );


    }
}
export default FaceRecognition;