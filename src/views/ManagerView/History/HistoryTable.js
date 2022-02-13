import React, {useState, useEffect} from 'react';
import storeApi from "../../../api/storeApi";
import { useSelector } from "react-redux";
import HistoryCard from "./HistoryCard";
import { format, toDate,parseISO } from 'date-fns'

import Timeline from '@material-ui/lab/Timeline';
import { Typography } from '@mui/material';

import { useTheme, makeStyles, createStyles } from "@material-ui/core/styles";

const HistoryTable = () => {
  const theme = useTheme();

  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;

  const [activities, setActivities] = useState([]);

  const fetchActivities = async (period) => {
    try {
      const res = await storeApi.getActivities(store_uuid, period);
      setActivities(res.data);
      console.log(res.data)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchActivities(30);
  }, []);

  let date = "";
  return (
    <>
      <Timeline>
      {activities.map(activity => {
        
        if(date !== format(parseISO(activity?.created_at), 'dd/MM/yyyy')){
          date = format(parseISO(activity?.created_at), 'dd/MM/yyyy')
          return ( 
            <>
              <Typography style={{marginBottom:20, marginTop:20,marginLeft:10, fontWeight:500, color:theme.customization.primaryColor[500]}}>{date}</Typography>
              <HistoryCard data={activity} />
          </>
          )
        }else{
          return <HistoryCard data={activity}/>
        }
      }
          
            
       )} 
    
    </Timeline>
    </>
  )
}

export default HistoryTable;