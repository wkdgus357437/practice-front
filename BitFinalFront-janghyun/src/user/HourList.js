import React, {useEffect} from 'react';



function HourList(props) {
    const hours = props.hours;
    const handleClick = (hour) => {

  /*      const element = document.getElementById(hour);
        element.scrollIntoView();*/
        window.location.href=`#${hour}`
        setTimeout(handleAnotherEvent,1000)

    };
    const handleAnotherEvent = () => {
       window.scroll(0,220)
    }
    return (
        <div>
            {hours.map((hour) => (
                <button
                    className="hour-button"
                    key={hour}
                    onClick={() => {
                                    handleClick(hour)
                                    props.onClick(hour)
                                    }}
                >
                    {hour}
                </button>
            ))}
        </div>
    );
}
export default HourList;