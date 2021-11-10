import { makeStyles, useTheme,withStyles } from "@material-ui/core/styles";
import { grey} from '@material-ui/core/colors'

export default  makeStyles((theme) =>({
    root: {
      background: theme.customization.mode === "Light"? null: grey[800],
      borderRadius:theme.customization.borderRadius,
      color: '#000000',
      boxShadow: "none",
    },
  
    headerTitle:{
      padding: '24px',
      fontSize: '1.125rem'
    },

    table:{
      width:"100%",
    },
    button: {
      margin: theme.spacing(1),
      paddingRight:-10
    },

    headerAvatar: {
      ...theme.typography.commonAvatar,
      ...theme.typography.mediumAvatar,
      transition: 'all .05s ease-in-out',
      background:theme.palette.primary.main ,
      '&:hover': {
        background: theme.customization.primaryColor[400],
      },

    },
    btngroup:{
      marginRight:20,
      marginTop:10
    },
    btngroup1:{
      marginRight:20,
      marginTop:20
    },

    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    padding:{
      marginLeft:24,
      marginRight:24

    },
    tab: {
      minWidth: 60,
      width: 60, 

      color:theme.customization.primaryColor[200],
      // fontSize:20,
      // fontWeight:500
  },
  indicator:{
    backgroundColor:theme.customization.primaryColor[200],
  },
  boldText:{
    fontWeight:700,
    
  },
  hoverCard:{
    // backgroundColor:'#fff',
    boxShadow:'0px 10px 20px rgba(0,0,0,0.1)',
    "&:hover": {
      // backgroundColor: theme.customization.primaryColor[50],
      boxShadow:'0px 10px 10px rgba(0,0,0,0.2)',
    }
},
cardRoot: {
  width: 200,
},
media: {
  height: 140,
},

}));

