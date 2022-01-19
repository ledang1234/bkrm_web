import React, {useState, useEffect } from 'react'
import storeApi from "../../../api/storeApi";
import { useSelector } from "react-redux";
import HistoryCard from "./HistoryCard";

const History = () => {
    const info = useSelector((state) => state.info);
    const store_uuid = info.store.uuid;

    const [activities, setActivities] = useState([])

    
    useEffect(() => {
        const fetchActivities = async (period) => {
          try {
            const res = await storeApi.getActivities(store_uuid, period);
            console.log(res.data)
            setActivities(res.data)
          } catch (err) {
            console.log(err);
          }
        }
        
        fetchActivities(30);
    }, [])

    return (
    <div>
        {activities.map((activity, i) => {
        <HistoryCard data={activity} />})}
        <div>History</div>
    </div>);
}

export default History
