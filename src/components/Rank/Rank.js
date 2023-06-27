import React from 'react';

const Rank = ({name, entries}) => {
    localStorage.setItem("UserDataEntries", entries)
    return (
        <div>
            <div className='white f3'>
                {`${name}, use smart brain app`}
            </div>
            <div className='white f1'>
                {entries}
            </div>
            <div className='white f3'>times</div>
        </div>
    )
}
export default Rank;