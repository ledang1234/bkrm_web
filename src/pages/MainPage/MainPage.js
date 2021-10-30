import React, { useState, useEffect } from "react";
import { useTheme, makeStyles,styled } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
//import library
import {
    AppBar,
    Toolbar,
    IconButton,
    Drawer,
    Typography,
    Box,
    Button,
    Grid,
    CardMedia,
    Container,
    Divider
  } from "@material-ui/core";
  //import icons
import MenuIcon from "@material-ui/icons/Menu";

import video from '../../assets/img/mainPage/video_thesis.mov'
import video1 from '../../assets/img/mainPage/clickVid.mov'
// import app from '../../assets/img/mainPage/Screen Shot 2021-10-26 at 21.16.29.png'
// import app1 from '../../assets/img/mainPage/Screen Shot 2021-10-26 at 21.17.43.png'
import app from '../../assets/img/mainPage/Order - new.png'
import app1 from '../../assets/img/mainPage/Create new product.png'
import web from '../../assets/img/mainPage/web.png'
import web1 from '../../assets/img/mainPage/web1.png'
import { borderColor } from "@material-ui/system";
import { grey} from '@material-ui/core/colors'
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        background: theme.palette.background.default,
    },
    appBar: {
        background: theme.palette.background.paper,
        padding:15,
        boxShadow: "none",
    },
    toolBar: {
        background: theme.palette.background.paper,
        color: theme.customization.themeGreyText,

    },
    btnNav:{
        textTransform: 'none',
        marginRight:10
    },
    videosm:{
        width: '50%'
    },
    videoupsm:{
        width: '95%'
    },
    color:{
        
    }
}));
const ColorButton = styled(Button)(({ theme }) => ({
    color: '#ffffff',
    backgroundColor: '#ff906d',
    width:100,
    '&:hover': {
      backgroundColor: '#fa6232',
    },
}));
const ColorOutlineButton = styled(Button)(({ theme }) => ({
    color: '#ff906d',
    borderColor:'#ff906d',
    '&:hover': {
      backgroundColor: '#fff0eb',
    },
}));

const MainPage = () => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const matchDownXs = useMediaQuery(theme.breakpoints.down("xs"));
    const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
    

    return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
            
            <Grid container direction="row" alignItems="center" justifyContent="space-between"> 
                <Grid item sm={2} >
                    <Typography variant="h3" noWrap className={classes.searchEngine}>
                        BKRM
                    </Typography>
                </Grid>
                {matchDownSm ?
                 <Grid>
                     <IconButton
                        aria-label="open drawer"
                        onClick={() => {}}
                        edge="start"
           
                    >
                        <MenuIcon />
                    </IconButton>
                </Grid> 
                :
                <Grid container item sm={10}  direction="row" alignItems="center" >
                    <Grid container item sm={8}  direction="row" >
                        <Button className={classes.btnNav}>Trang chủ</Button>
                        <Button className={classes.btnNav}>Giới thiệu</Button>
                        <Button className={classes.btnNav}>Giới thiệu</Button>
                        <Button className={classes.btnNav}>Giới thiệu</Button>
                        <Button className={classes.btnNav}>Giới thiệu</Button>
                    </Grid>
                    <Grid container item sm={4}  direction="row" justifyContent="flex-end"  >
                        <ColorOutlineButton className={classes.btnNav}  variant="outlined"   style={{borderRadius:20,marginBottom:5}}>Đăng nhập</ColorOutlineButton>           
                        <ColorButton className={classes.btnNav} variant="contained"  color="secondary" style={{borderRadius:20,marginLeft:10,marginBottom:5}}>Đăng ký</ColorButton>
                    </Grid>  
                </Grid>
                }
                
            </Grid>
        </Toolbar>
      </AppBar>

      <Box style={{ marginTop:130}}>
          {/* SECTION 1 */}
          <Grid container direction="row" justifyContent="space-between"  alignItems="center" >

                <Grid container item xs={12} sm={6} direction="column" style={{paddingLeft:45, paddingRight:20}} >
                    
                    {matchDownXs? null:
                     <Grid  container   direction="row" justifyContent="flex-end" >
                        <video loop={false} autoPlay={true} muted={true} style={{width:'12%'}}>
                            <source src={video1} type="video/mp4" />
                        </video>
                    </Grid>
                    }
                    <Typography  style={{fontSize:matchDownXs?'10vw':'6vw',color:theme.customization.themeText}}>
                        Phần mềm
                    </Typography>
                    <Typography style={{fontSize: matchDownXs?'10vw':'6vw',color:theme.customization.themeText, marginBottom:20}}>
                        Quản lý bán lẻ
                    </Typography>
                    <Grid  container style={{ marginBottom:40}}   direction="row">
                        <Grid container item xs={1} style={{marginRight:-10}}>
                            <Divider orientation="vertical" flexItem style={{width:2, backgroundColor:'#ff906d'}}/>
                        </Grid>
                        <Grid container item xs={11}>
                            <Typography style={{fontSize:14,color:theme.customization.themeGreyText, paddingRight:50}}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non felis efficitur, aliquet lectus in, luctus nisi. Proin mattis mollis nibh, sed feugiat orci tristique vitae. 
                            </Typography>
                        </Grid>
                    </Grid>
                    <ColorButton className={classes.btnNav} variant="contained"  color="secondary" style={{borderRadius:20, width:100}}>Dùng thử</ColorButton>
                </Grid>

                <Grid container item  xs={12} sm={6} justifyContent="center">
                    <video loop={false} autoPlay={true} muted={true} className={matchDownXs ? classes.videosm :classes.videoupsm}>
                        <source src={video} type="video/mp4" />
                    </video>
                </Grid>
          </Grid>
          
         
            {/* SECTION 2 */}
          <Grid>
            <Container style={{backgroundColor:'#f3fdff', marginTop:150, justifyContent:'center'}}>      
                <Grid container direction="row" justifyContent="center"  alignItems="center" >
                    <Box
                        component="img"
                        sx={{
                        height:matchDownSm?'90%':'70%',
                        width: matchDownSm?'90%':'70%', 
                        borderRadius: matchDownXs?10:20,
                        // marginRight:15,
                        }}
                        border={1}
                        borderColor={grey[400]}
                        src={web1}
                    />
                </Grid>
            </Container>
        </Grid>

          {/* SECTION 3 */}
          <Grid>
            <Container style={{backgroundColor:'#f3fdff', marginTop:150, justifyContent:'center'}}>      
                <Grid container direction="row" justifyContent="center"  alignItems="center" >
                <Box
                    component="img"
                    sx={{
                    height:'22%',
                    width: '22%', 
                    borderRadius:matchDownXs? 10:30,
                    marginRight:15,
                    }}
                    border={1}
                    borderColor={grey[400]}
                    src={app1}
                />
                <Box
                    component="img"
                    sx={{
                    height:'22%',
                    width: '22%', 
                    borderRadius:matchDownXs? 10:30,
                    
                    }}
                    border={1}
                    borderColor={grey[400]}
                    src={app}
                />
                </Grid>
            </Container>
        </Grid>

        {/* SECTION 4 */}



         {/* FOOTER */}
         <Grid>
            <Container style={{backgroundColor:'#ff906d', marginTop:150, justifyContent:'center'}}>      
                <Grid container direction="row" justifyContent="center"  alignItems="center" >
                    <Box
                        sx={{
                        height:200,
                        width: matchDownSm?'90%':'70%', 
                        borderRadius: matchDownXs?10:20,
                        marginRight:15,
                        }}
                    />
                </Grid>
            </Container>
        </Grid>
      </Box>

   
    </div>
    )
}

export default MainPage


    