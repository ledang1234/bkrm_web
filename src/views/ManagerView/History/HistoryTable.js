import React, {useState, useEffect} from 'react';
import storeApi from "../../../api/storeApi";
import { useSelector } from "react-redux";
import HistoryCard from "./HistoryCard";

const HistoryTable = () => {
  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;

  const [activities, setActivities] = useState([]);

  const fetchActivities = async (period) => {
    try {
      const res = await storeApi.getActivities(store_uuid, period);
      setActivities(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchActivities(30);
  }, []);

  return (
    <>
      {activities.map(activity => <HistoryCard data={activity} />)}
    </>
  )
}

export default HistoryTable;