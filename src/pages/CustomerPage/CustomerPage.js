import React, { useState, useEffect } from "react";
import { useTheme, makeStyles, styled } from "@material-ui/core/styles";
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
import HoverMenuBtn from "../../components/Button/HoverMenuBtn";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    background: theme.palette.background.default,
  },
  appBar: {
    background: theme.palette.background.paper,
    padding: 15,
    boxShadow: "none",
  },
  toolBar: {
    background: theme.palette.background.paper,
    color: theme.customization.themeGreyText,
  },
  btnNav: {
    textTransform: "none",
    marginRight: 10,
  },
}));
const ColorButton = styled(Button)(({ theme }) => ({
  color: "#ffffff",
  backgroundColor: "#ff906d",
  width: 100,
  "&:hover": {
    backgroundColor: "#fa6232",
  },
}));
const ColorOutlineButton = styled(Button)(({ theme }) => ({
  color: "#ff906d",
  borderColor: "#ff906d",
  "&:hover": {
    backgroundColor: "#fff0eb",
  },
}));

const CustomerPage = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const matchDownXs = useMediaQuery(theme.breakpoints.down("xs"));
  const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  const [clickItem, setClickItem] = useState(null);
  function handleClickItem(item) {
    setClickItem(item);
  }
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item sm={2}>
              <Typography variant="h3" noWrap className={classes.searchEngine}>
                BKRM
              </Typography>
            </Grid>
            {matchDownSm ? (
              <Grid>
                <IconButton
                  aria-label="open drawer"
                  onClick={() => {}}
                  edge="start"
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            ) : (
              <Grid container item sm={10} direction="row" alignItems="center">
                <Grid container item sm={8} direction="row">
                  <Button className={classes.btnNav}>Trang chủ</Button>
                  <HoverMenuBtn
                    className={classes.btnNav}
                    handleClickItem={handleClickItem}
                  >
                    Giới thiệu
                  </HoverMenuBtn>
                  <Button className={classes.btnNav}>Giới thiệu</Button>
                  <Button className={classes.btnNav}>Giới thiệu</Button>
                  <Button className={classes.btnNav}>Giới thiệu</Button>
                </Grid>
                <Grid
                  container
                  item
                  sm={4}
                  direction="row"
                  justifyContent="flex-end"
                >
                  <ColorOutlineButton
                    className={classes.btnNav}
                    variant="outlined"
                    style={{ borderRadius: 20, marginBottom: 5 }}
                  >
                    Đăng nhập
                  </ColorOutlineButton>
                  <ColorButton
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

      <Box style={{ marginTop: 130 }}>
        {/* SECTION 1 */}
        <Button className={classes.btnNav}>{clickItem}</Button>
      </Box>
    </div>
  );
};

export default CustomerPage;
