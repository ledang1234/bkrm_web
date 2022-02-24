import React from "react";
import { useTheme, makeStyles, styled ,lighten,darken} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
//import library
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Grid,
} from "@material-ui/core";
//import icons
import MenuIcon from "@material-ui/icons/Menu";
import HoverMenuBtn from "../../../components/Button/HoverMenuBtn";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    appBar: {
        // background: theme.palette.background.paper,
        paddingLeft: 20,
        paddingRight: 20,
        boxShadow: "none",
    },
    toolBar: {
        // background: theme.palette.background.paper,
        color: theme.customization.themeGreyText,

    },
    btnNav: {
        textTransform: "none",
        marginRight: 10,
    },
    
}));

const ColorButton = styled(Button)(({ theme, mainColor,navColor }) => ({
    color: "#ffffff",
    backgroundColor: navColor? lighten(mainColor, 0.2):mainColor ,
    width: 100,
    "&:hover": {
      backgroundColor: navColor?lighten(mainColor, 0.1) :lighten(mainColor, 0.3),
      
    },
  }));
  const ColorOutlineButton = styled(Button)(({ theme ,mainColor,navColor}) => ({
    color: mainColor,
    borderColor: mainColor,
    boxShadow:navColor?'0px 2px 2px rgba(0,0,0,0.2)':null,
    backgroundColor: navColor?lighten(mainColor, 0.8):theme.palette.background.paper,
    "&:hover": {
      backgroundColor:navColor?lighten(mainColor, 0.6) :lighten(mainColor, 0.8),
    },
  }));

const NavBar = (props) => {
    const {handleClickItem,mainColor,category,navColor,textNav,storeInfo} = props;
    const theme = useTheme();
    const classes = useStyles(theme);
    const matchDownXs = useMediaQuery(theme.breakpoints.down("xs"));
    const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));

    function handleColor (type) {
      if(type===0){return '#000'}
      else if (type===1){return '#fff'}
      else if (type===3){return mainColor}
      else{return theme.darkTextPrimary }
  }
    const textColor = handleColor(textNav[0]);
    const textSize = textNav[1]?17:14
    const textBold = textNav[2]?600:500
   

    return (
      <AppBar
        position="fixed"
        className={classes.appBar}
        style={{
          background: navColor ? mainColor : theme.palette.background.paper,
        }}
      >
        <Toolbar
          className={classes.toolBar}
          style={{
            background: navColor ? mainColor : theme.palette.background.paper,
          }}
        >
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item sm={2}>
              <Typography variant="h3" noWrap className={classes.searchEngine}>
                LOGO
              </Typography>
            </Grid>
            {matchDownSm ? (
              <Grid>
                <IconButton
                  aria-label="open drawer"
                  onClick={() => {}}
                  edge="start"
                  style={{ marginBottom: -5 }}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            ) : (
              <Grid container item sm={10} direction="row" alignItems="center">
                <Grid container item sm={8} direction="row">
                  <Button
                    className={classes.btnNav}
                    component={Link}
                    to={`/store/${props.storeInfo?.web_page}/`}
                    style={{
                      color: textColor,
                      fontWeight: textBold,
                      fontSize: textSize,
                    }}
                  >
                    Trang chủ
                  </Button>
                  <HoverMenuBtn
                    className={classes.btnNav}
                    handleClickItem={handleClickItem}
                    category={category}
                    // style
                    textColor={textColor}
                    textSize={textSize}
                    textBold={textBold}
                  >
                    {/* Sản phẩm */}
                  </HoverMenuBtn>
                  <Button
                    className={classes.btnNav}
                    component={Link}
                    to={`/store/${props.storeInfo?.web_page}/promotion`}
                    style={{
                      color: textColor,
                      fontWeight: textBold,
                      fontSize: textSize,
                    }}
                  >
                    Khuyến mãi
                  </Button>
                  <Button
                    className={classes.btnNav}
                    component={Link}
                    to={`/store/${props.storeInfo?.web_page}/storeInfo`}
                    style={{
                      color: textColor,
                      fontWeight: textBold,
                      fontSize: textSize,
                    }}
                  >
                    Cửa hàng
                  </Button>
                  <Button
                    className={classes.btnNav}
                    component={Link}
                    to={`/store/${props.storeInfo?.web_page}/aboutUs`}
                    style={{
                      color: textColor,
                      fontWeight: textBold,
                      fontSize: textSize,
                    }}
                  >
                    Giới thiệu
                  </Button>
                </Grid>
                <Grid
                  container
                  item
                  sm={4}
                  direction="row"
                  justifyContent="flex-end"
                >
                  <ColorOutlineButton
                    mainColor={mainColor}
                    navColor={navColor}
                    className={classes.btnNav}
                    variant="outlined"
                    style={{ borderRadius: 20, marginBottom: 5 }}
                  >
                    Đăng nhập
                  </ColorOutlineButton>
                  <ColorButton
                    mainColor={mainColor}
                    navColor={navColor}
                    className={classes.btnNav}
                    variant="contained"
                    color="secondary"
                    style={{
                      borderRadius: 20,
                      marginLeft: 10,
                      marginBottom: 5,
                    }}
                  >
                    Đăng ký
                  </ColorButton>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    );
}

export default NavBar
