import { useState ,useEffect, useCallback } from 'react'
import '../App.css'
import fetchArrivals from '../api/kingslandFetcher'
import "@xyflow/react/dist/style.css"; 
import "../styles/Canvas.css";

export default function Canvas() {
  const[arrivals,setArrivals] = useState([]);
  
  const refreshArrivals = useCallback(async () => {
    try{
        const newArrivals = await fetchArrivals();
        setArrivals(newArrivals);
    }catch(error){
        window.alert(error.message);
    }}
  ,[]);

  useEffect(() =>{
    refreshArrivals();

    const intervalId = setInterval(()=>{refreshArrivals();},30000);

    return () => clearInterval(intervalId);

  },[refreshArrivals]);

  return (
<div>
        <div className="arrivals">
                {arrivals.map((train) => {
                  const minutesAway = Math.floor(
                    train.timeToStation / 60
                  );

                  const arrivalTime = new Date(
                    train.expectedArrival
                  ).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <div
                      className="arrival"
                      key={train.id}
                    >
                      <h2>{train.destinationName}, Exp:{arrivalTime}</h2>
                      <p>
                        {minutesAway === 0
                          ? "Due"
                          : `${minutesAway} minutes away`}
                      </p>
                    </div>
                  );
                })}
              </div>
        </div>

  )
}
