import React from 'react';

const Rank = ({name, entries}) => {

    const UserDataName = localStorage.getItem("UserDataName")
    const UserDataEntries = localStorage.getItem("UserDataEntries")


    if (UserDataName) {
        name = UserDataName;
        entries = UserDataEntries;
    }

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