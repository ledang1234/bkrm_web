import React ,{useState, useEffect}from 'react'
import {useTheme, makeStyles,createStyles} from "@material-ui/core/styles";
import {Typography,} from '@material-ui/core';

import Map from './Map/Map';
import BranchList from './BranchList/BranchList';


const useStyles = makeStyles((theme) =>
createStyles({
  textTitle:{
    flexGrow: 1,
    textAlign: "center",
    marginBottom:20
  },


}));

const Branch = () => {
    const theme = useTheme();
    const classes = useStyles(theme);

    //MAP
    const [currentLocation, setCurrentLocation] = React.useState(null);
    const handleSetLocation = (location) =>{
        setCurrentLocation(`${location.coords.latitude},${location.coords.longitude}`)
    }
    function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((location)=>{
            handleSetLocation(location)
            window.open(`https://www.google.com/maps/dir/${currentLocation}/10.7727173,106.7262802`, '_blank');  
        });
        } else {
            
        }
    }

    //map
    const [chosenBranch, setChosenBranch] = React.useState({lat:branchList[0].lat,lng: branchList[0].lng});
   

    return (
        <>

            <Typography className={classes.textTitle} variant="body2">
              ( {branchList.length} chi nhánh )
            </Typography>
            
            <Map branchList={branchList} chosenBranch={chosenBranch} getLocation={getLocation}/>
            <BranchList branchList={branchList} setChosenBranch={setChosenBranch}getLocation={getLocation}/>
           
            
        {/* </Card> */}
        </>


    )
}

export default Branch

const branchList = [
    {
        id:1,
        lat:10.772717,
        lng:106.626280,
        address:'271/34 Trịnh Đình Trọng P.Hoà Thạnh Q.Tân Phú',
        name:'Chi nhanh trung tâm'
    },
    {
      id:2,
        lat:10.772717,
        lng:106.726280,
        address:'235 Lý Thường Kiệt Q.5',
        name:'Chi nhanh quận 1'
    },
    {
      id:4,
        lat:10.99835602,
        lng:77.01502627,
        address:'235 Nguyễn Văn Cừ P.5 Q.5',
        name:'Chi nhanh quận 5'
    },
    {
      id:5,
      lat:11.772717,
      lng:106.626280,
      address:'271/34 Trịnh Đình Trọng P.Hoà Thạnh Q.Tân Phú',
      name:'Chi nhanh trung tâm'
  },
  {
    id:6,
      lat:12.772717,
      lng:106.726280,
      address:'235 Lý Thường Kiệt Q.5',
      name:'Chi nhanh quận 1'
  },
  {
    id:8,
      lat:12.99835602,
      lng:78.01502627,
      address:'235 Nguyễn Văn Cừ P.5 Q.5',
      name:'Chi nhanh quận 5'
  },
  {
    id:9,
      lat:10.99835602,
      lng:44.01502627,
      address:'235 Nguyễn Văn Cừ P.5 Q.5',
      name:'Chi nhanh quận 5'
  },

]