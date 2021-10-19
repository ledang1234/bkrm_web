import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";
import MenuList from "../../components/MenuList/MenuList";
// import NavBar from "../../components/NavBar/NavBar";
import { Box } from "@material-ui/core";
import { Route, Switch, useRouteMatch } from "react-router-dom";
// import SalesModule from "../../components/Modules/SalesModule/SalesModule";
// import HRModule from "../../components/Modules/HRModule/HRModule";
// import InventoryModule from "../../components/Modules/InventoryModule/InventoryModule";
// import ReportModule from "../../components/Modules/ReportModule/ReportModule";
// import NoMatchScreen from "../NoMatchScreen/NoMatchScreen";
// import StickyLabel from "../../components/StickyLabel/StickyLabel";
import TableTest from "../../components/TableWrapper/Test/TableTest"
import Test from "../../components/TableWrapper/TableWrapper"

import TableWrapper from '../../components/TableWrapper/TableWrapper'
import JSONdata from '../../assets/JsonData/employee.json'
import * as HeadCells from '../../assets/constant/tableHead'
import *  as TableType from '../../assets/constant/tableType'
import {AppBar, Toolbar,IconButton} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";


const HomePage = (props) => {
  const { window } = props;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const container =
    window !== undefined ? () => window().document.body : undefined;

  let { path } = useRouteMatch();
  return (
    <div className={classes.root}>
      {/* <NavBar handleDrawerToggle={handleDrawerToggle} /> */}
      <AppBar
        position="fixed"
        className={classes.appBar} 
      >
        <Toolbar className={classes.toolBar} >
          {/* {divLogo()} */}
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            // className={ !smallScreen && classes.hide}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h3" noWrap className={classes.searchEngine}>
            BKRM
          </Typography>
        </Toolbar>
      </AppBar>

      <Hidden mdUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <MenuList />
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          <MenuList />
        </Drawer>
      </Hidden>
      <Box component="main" className={classes.content}>
        <div className={classes.toolbar} />
        

        <TableWrapper title="Kho hàng" dataTable={JSONdata} headerData={HeadCells.EmployeeHeadCells} tableType={TableType.EMPLOYEE}/>
        <div style={{width:500, height:300}}> </div>
      </Box>
    </div>
  );
};
export default HomePage;
