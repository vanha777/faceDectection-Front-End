import React from 'react';

const Rank = ({name,entries}) => {
    return (
        <div >
            <div className='black f3 center fw6 '>
                {`Hi ${name}, Your current searches number is`}
            </div>
            <div className='black f1 center fw6'>
                {entries}
            </div>
        </div>
    )
}
export default Rank ;