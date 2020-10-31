import { React } from "react";

//Helper functions:
function arrayToTimeString(a) {
    return a[0] + ' dagar, ' + a[1] + '  klukkutímar, ' + a[2] + ' mínútur og ' + a[3] + ' sekúndur í næsta stomp';
}
//===============end of helper functions=======================




function Timer(props) {
    return (
        <div className = "timer">
            <p>{arrayToTimeString([props.days, props.hours, props.minutes, props.seconds])}</p>
        </div>
    );
}

export default Timer;