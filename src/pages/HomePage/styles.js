import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

export default makeStyles((theme) => ({
  root: {
    display: "flex",
    background: theme.palette.background.default,
  },
  appBar: {
    background: theme.palette.background.paper,
    boxShadow: "none",
  },
  hide: {
    display: "none",
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: 48 + 16 + 16,
    borderColor: theme.palette.background.paper,
    paddingLeft: 20,
  },
  _drawerPaper: {
    width: drawerWidth,
    borderColor: theme.palette.background.paper,
    paddingLeft: 20,
  },
  drawerHeader: {
    display: "flex",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: "100%",
  },

  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    marginLeft: drawerWidth,
  },

  background: {
    background:
      theme.customization.mode === "Light"
        ? theme.palette.primary.light
        : theme.customization.primaryColor[theme.customization.colorLevel],
    borderRadius: theme.customization.borderRadius,
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
  },
  toolBar: {
    background: theme.palette.background.paper,
  },
  searchEngine: {
    paddingLeft: 20,
  },
  scroll: {
    maxHeight: 100,
  },
}));
