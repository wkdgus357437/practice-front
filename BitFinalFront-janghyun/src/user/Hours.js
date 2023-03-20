import React, { useState } from 'react';
import HourList from "./HourList";

function Hours() {
    const [hours, setHours] = useState(['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']);
    const [page, setPage] = useState(0);


    const handleClick = (hour) => {};

    return (
        <div className='hour-wrap2'>

            <button className="previous" onClick={() => {
                if(!page<1)
                setPage(page - 7)
            }}><span className='left2'/></button>
            <div className='hour-wrap2-2'>
            <HourList hours={hours.slice(page, page+7)} onClick={handleClick} />
            </div>
            <button className="next2" onClick={() => {
                if(page<21)
                setPage(page + 7)
            }}><span className='right2'/></button>
        </div>
    );
}
export default Hours;