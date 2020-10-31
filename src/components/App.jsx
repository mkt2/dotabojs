import { React, useState, useEffect } from "react";
import Timer from "./Timer";

function generateNextTimeObject() {
    var today = new Date();

    //When do we play:
    //Fridays at 20:00:
    //5 for Friday; The rest for 20:00:00
    var helperForDate = [5, 20, 0, 0];
    var nextGameDate = nextWeekdayDate(today, helperForDate[0]);
    nextGameDate.setHours(helperForDate[1]);
    nextGameDate.setMinutes(helperForDate[2]);
    nextGameDate.setSeconds(helperForDate[3]);
    console.log(nextGameDate); //This will be the date for next Friday at 20:00

    var secondsToGameDate = timeBetweenDates(today, nextGameDate);
    return secondsToDaysHoursMinutesSeconds(secondsToGameDate);

}

function nextWeekdayDate(date, day_in_week) {
    var ret = new Date(date || new Date());
    ret.setDate(ret.getDate() + (day_in_week - 1 - ret.getDay() + 7) % 7 + 1);
    return ret;
}

function timeBetweenDates(startDate, endDate) {
    var seconds = (endDate - startDate) / 1000;
    return seconds;
}

function secondsToDaysHoursMinutesSeconds(s) {
    var d;
    var h;
    var m;
    d = Math.floor(s / (60 * 60 * 24));
    s = s - d * 60 * 60 * 24;
    console.log(s);
    h = Math.floor(s / (60 * 60));
    s = s - h * 60 * 60;
    m = Math.floor(s / 60);
    s = s - m * 60;

    return {
        days: d,
        hours: h,
        minutes: m,
        seconds: s
    }
}


function App() {
    const [B, setB] = useState(false);
    const [timeObject, setTimeObject] = useState({
        days: 1,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const interval = setInterval(() => {
            //This will run every second!
            setTimeObject(oldValue => {
                return generateNextTimeObject();
            })
            setB(true);
        }, 1000);
        return () => clearInterval(interval);
    }, [timeObject]);

    return (
        <div>
            {B && <Timer days={timeObject.days} hours={timeObject.hours} minutes={timeObject.minutes} seconds={timeObject.seconds} ></Timer> }
        </div>
    )
}

export default App;

