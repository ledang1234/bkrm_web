import React, { useEffect, useState } from "react";
import { useTheme, makeStyles, createStyles } from "@material-ui/core/styles";
//import library
import {
  Box,
  Grid,
  Collapse,
  Typography,
  Button,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@material-ui/core";
//import icon
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import HighlightOffTwoToneIcon from "@material-ui/icons/HighlightOffTwoTone";
import LocalOfferTwoToneIcon from "@material-ui/icons/LocalOfferTwoTone";
import VerifiedUserTwoToneIcon from "@material-ui/icons/VerifiedUserTwoTone";
//import image
import avaUpload from "../../../../../assets/img/product/img.jpeg";
//import project
import {
  StyledMenu,
  StyledMenuItem,
} from "../../../../../components/Button/MenuButton";
import productApi from "../../../../../api/productApi";
// carousel for images
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useDispatch, useSelector } from "react-redux";
import UpdateInventory from "./UpdateInventory/UpdateInventory";
import ConfirmPopUp from "../../../../../components/ConfirmPopUp/ConfirmPopUp";
import { statusAction } from "../../../../../store/slice/statusSlice";
import { VNDFormat } from "../../../../../components/TextField/NumberFormatCustom";
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        marginTop: theme.spacing(2),
      },
    },
    headerTitle: {
      fontSize: "1.125rem",
    },
    typo: {
      marginBottom: 20,
    },
  })
);

const UploadImage = () => {
  return (
    <Box
      component="img"
      sx={{
        height: 170,
        width: 170,
        borderRadius: 2,
        marginLeft: 15,
      }}
      src={avaUpload}
    />
  );
};
const InventoryDetail = (props) => {
  const { row, openRow } = props.parentProps;

  const theme = useTheme();
  const classes = useStyles(theme);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const [productDetail, setProductDetail] = useState({
    name: "",
    bar_code: "",
    category: { name: "" },
    images: [],
    suppliers: [],
  });
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseUpdate = (status) => {
    if (status) {
      props.parentProps.setReload(true);
    }
    setIsOpenUpdate(false);
  };
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const handleCloseDelete = () => {
    setDeleteConfirm(false);
  };
  const handleConfirmDelete = async () => {
    handleCloseDelete();
    try {
      const response = await productApi.deleteProduct(store_uuid, row.uuid);
      dispatch(statusAction.successfulStatus("Xóa thành công"));
      props.parentProps.setReload(true);
      console.log(response);
    } catch (error) {
      console.log(error);
      dispatch(statusAction.failedStatus("Xóa thất bại"));
    }
  };
  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productApi.getProduct(store_uuid, row.uuid);
        setProductDetail(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (openRow === row.uuid) {
      fetchProduct();
    }
  }, [store_uuid, openRow]);

  return (
    <Collapse in={openRow === row.uuid} timeout="auto" unmountOnExit>
      <UpdateInventory
        open={isOpenUpdate}
        handleClose={handleCloseUpdate}
        productInfo={productDetail}
      />
      <ConfirmPopUp
        open={deleteConfirm}
        handleClose={handleCloseDelete}
        handleConfirm={handleConfirmDelete}
        message={
          <Typography>
            Xóa vĩnh viễn sản phẩm <b>{productDetail.name} ?</b>
          </Typography>
        }
      />
      <Box margin={1}>
        <Typography
          variant="h3"
          gutterBottom
          component="div"
          className={classes.typo}
        >
          {row.name}
        </Typography>

        <Grid container direction="row" justifyContent="flex-start">
          <Grid item xs={4}>
            <Box
              sx={{
                height: 170,
                width: 170,
                borderRadius: 2,
                marginLeft: 15,
              }}
            >
              <Carousel showThumbs={false}>
                {productDetail.images.map((image) => (
                  <img
                    key={image.url}
                    src={image.url}
                    height="170"
                    width="170"
                  />
                ))}
              </Carousel>
            </Box>
          </Grid>

          <Grid container direction="column" item xs={8}>
            <Grid container direction="row">
              <Grid item xs={6}>
                <Grid container direction="row" justifyContent="flex-start">
                  <Grid item xs={6}>
                    <Typography variant="h5" gutterBottom component="div">
                      Mã hàng{" "}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" gutterBottom component="div">
                      {productDetail.uuid}{" "}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container direction="row" justifyContent="flex-start">
                  <Grid item xs={6}>
                    <Typography variant="h5" gutterBottom component="div">
                      Tên sản phẩm
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" gutterBottom component="div">
                      {productDetail.name}{" "}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container direction="row" justifyContent="flex-start">
                  <Grid item xs={6}>
                    <Typography variant="h5" gutterBottom component="div">
                      Mã vạch
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" gutterBottom component="div">
                      {productDetail.bar_code}{" "}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container direction="row" justifyContent="flex-start">
                  <Grid item xs={6}>
                    <Typography variant="h5" gutterBottom component="div">
                      Danh mục
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" gutterBottom component="div">
                      {productDetail.category.name}{" "}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container direction="row" justifyContent="flex-start">
                  <Grid item xs={6}>
                    <Typography variant="h5" gutterBottom component="div">
                      Đơn vị
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" gutterBottom component="div">
                      {productDetail.quantity_per_unit}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container direction="row" justifyContent="flex-start">
                  <Grid item xs={4}>
                    <Typography variant="h5" gutterBottom component="div">
                      Giá bán
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" gutterBottom component="div">
                      <VNDFormat value={productDetail.list_price}></VNDFormat>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container direction="row" justifyContent="flex-start">
                  <Grid item xs={4}>
                    <Typography variant="h5" gutterBottom component="div">
                      Giá vốn
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" gutterBottom component="div">
                      <VNDFormat
                        value={productDetail.standard_price}
                      ></VNDFormat>{" "}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container direction="row" justifyContent="flex-start">
                  <Grid item xs={4}>
                    <Typography variant="h5" gutterBottom component="div">
                      Tồn kho
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" gutterBottom component="div">
                      {row.branch_quantity}{" "}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              style={{ marginTop: 20 }}
            >
              <Button
                variant="contained"
                size="small"
                style={{ marginLeft: 15 }}
                onClick={() => {
                  setIsOpenUpdate(true);
                }}
              >
                Sửa
              </Button>
              <Button
                variant="contained"
                size="small"
                style={{ marginLeft: 15 }}
                onClick={() => {
                  setDeleteConfirm(true);
                }}
              >
                Xoá
              </Button>

              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
                size="small"
                style={{ marginLeft: 10 }}
              >
                <MoreVertIcon />
              </IconButton>

              <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <StyledMenuItem>
                  <ListItemIcon style={{ marginRight: -15 }}>
                    <InboxIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="In mã tem" />
                </StyledMenuItem>

                <StyledMenuItem>
                  <ListItemIcon style={{ marginRight: -15 }}>
                    <HighlightOffTwoToneIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Ngừng kinh doanh" />
                </StyledMenuItem>

                <StyledMenuItem>
                  <ListItemIcon style={{ marginRight: -15 }}>
                    <LocalOfferTwoToneIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Lịch sử giá" />
                </StyledMenuItem>

                <StyledMenuItem>
                  <ListItemIcon style={{ marginRight: -15 }}>
                    <VerifiedUserTwoToneIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Lịch sử kiểm kê" />
                </StyledMenuItem>
              </StyledMenu>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Collapse>
  );
};

export default InventoryDetail;
