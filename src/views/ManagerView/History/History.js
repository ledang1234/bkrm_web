import React, { useState } from "react";
import { useTheme, makeStyles, createStyles } from "@material-ui/core/styles";
import { Typography,Box, Card, Grid, ButtonBase, Tooltip } from "@material-ui/core";
import FilterListIcon from '@material-ui/icons/FilterList';
import { grey } from "@material-ui/core/colors";
import HistoryTable  from './HistoryTable.js'
import { useSelector } from "react-redux";
import HistoryFilter from "./HistoryFilter.js"

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      background: theme.customization.mode === "Light" ? null : grey[800],
      borderRadius: theme.customization.borderRadius,
      color: "#000000",
      padding: 18,
    },
    headerTitle: {
      flexGrow: 1,
      textAlign: "center",
      marginTop: 10,
      marginLeft: 40,
    },
    addIcon: {
      background: theme.customization.secondaryColor[500],
      borderRadius: 20,
      color: "#fff",
    },
    addBtn: {
      marginRight: 10,
      marginTop: 5,
    },
    textTitle: {
      flexGrow: 1,
      textAlign: "center",
      marginTop: 5,
      
    },
  })
);

const History = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

   //3.2. filter
   const [openFilter, setOpenFilter] = React.useState(false);
   const handleToggleFilter = () => {
     setOpenFilter(!openFilter);
   };

  const str = "2020-06-11";
  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;
 
  return (
    <Card className={classes.root}>

      <Grid container direction="row" alignItems="center">
        <Typography className={classes.headerTitle} variant="h2">
          Lịch sử hoạt động
        </Typography>
        <ButtonBase className={classes.addBtn} onClick={handleToggleFilter} >
          <Tooltip title="Lọc">
            <FilterListIcon size="small" />
          </Tooltip>
        </ButtonBase>
      </Grid>
      <Typography className={classes.textTitle} variant="body2">
        ( Chi nhánh {info.branch.name})
      </Typography>
     
      <Box style={{marginTop:15}}>
        <HistoryTable/>
      </Box>

      <HistoryFilter
        openFilter={openFilter}
        handleToggleFilter={handleToggleFilter}
      />
      
    </Card>
  );
};

export default History;
