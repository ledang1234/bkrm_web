import React, { useEffect, useState } from "react";
//import style
import useStyles from "../../../../components/TableCommon/style/mainViewStyle";
//impỏrt library
import {
  Box,
  TextField,
  ListItem,
  IconButton,
  TableRow,
  TableCell,
  Tooltip,
  Chip,
  Button,
  Typography,
  Grid
} from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
//import project
import * as Input from "../../../../components/TextField/NumberFormatCustom";
import ButtonQuantity from "../../../../components/Button/ButtonQuantity";
import { VNDFormat } from "../../../../components/TextField/NumberFormatCustom";
import DiscountPopUp from "../DiscountPopup/DiscountPopup";
import icon from "../../../../assets/img/product/tch.jpeg";
import SelectBatch from "../../../../components/SelectBatch/SelectBatch";
import { useDispatch, useSelector } from "react-redux";

import MoreInfo from "../../../../components/MoreInfo/MoreInfo"
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { List } from "@mui/material";

import defaultProduct from '../../../../assets/img/product/default-product.png'

export const CartRow = (props) => {
  const classes = useStyles();
  const haveDiscount = true;
  const info = useSelector((state) => state.info);
  const branch = info.branch;

console.log("branch",branch)
  const {
    row,
    branchs,
    discountData,
    handleDeleteItemCart,
    handleChangeItemQuantity,
    handleUpdateBatches,
    handleChangeItemPrice,
  } = props;

  const updateQuantity = (newQuantity) => {
    handleChangeItemQuantity(row.uuid, newQuantity);
  };
  const [openDiscount, setOpenDiscount] = React.useState(false);
  const handleOpenDiscount = () => {
    setOpenDiscount(!openDiscount);
  };

  const [selectBatchOpen, setSelectBatchOpen] = useState(false);
  const [selectedBatches, setSelectedBatches] = useState([]);

  useEffect(() => {
    if (row.batches.length >= 1) {
      setSelectedBatches([{ ...row.batches[0], additional_quantity: 0 }]);
    }
  }, []);

  useEffect(() => {
    let total = 0;
    selectedBatches.forEach((batch) => {
      total += Number(batch.additional_quantity);
    });
    console.log(total);
    updateQuantity(total);
    handleUpdateBatches(row.uuid, selectedBatches);
  }, [selectedBatches]);

  const handleSelectBatches = (batches) => {
    const newBatches = [];
    selectedBatches.forEach((selectedBatch) => {
      const newBatch = batches.find(
        (batch) => batch.batch_code === selectedBatch.batch_code
      );
      if (newBatch) {
        newBatches.push({
          ...selectedBatch,
          additional_quantity:
            Number(selectedBatch.additional_quantity) +
            Number(newBatch.additional_quantity),
        });
      } else {
        newBatches.push(selectedBatch);
      }
    });
    batches.forEach((newBatch) => {
      if (
        !newBatches.find((batch) => newBatch.batch_code === batch.batch_code)
      ) {
        newBatches.push(newBatch);
      }
    });
    console.log(newBatches);
    setSelectedBatches(newBatches);
  };

  const canFixPriceSell= JSON.parse(info.store.general_configuration).canFixPriceSell

const [show, setShow] = React.useState(false);


const findBranchQuantity = (id) => {
  const rs = row.branch_inventories.find(x => x.uuid === id)?.quantity_available
  if(rs){return rs }
  else{ return 0}
}
return (
    <>
      <TableRow hover key={props.row.uuid} onMouseOver={()=>  setShow(true)}  onMouseLeave={()=> setShow(false)} >
        <TableCell align="left">{row.id + 1}</TableCell>
        {/* Sửa lại thành product_code */}
        <TableCell align="left" style={{ width: 5 }}>
          {row.product_code}
        </TableCell>
        <TableCell align="left" style={{ minWidth: 200 }}>
          <ListItem
            style={{ marginLeft: -30, marginTop: -10, marginBottom: -10 }}
           alignItems='center'
          >
            <Box
              component="img"
              sx={{ height: 40, width: 40, borderRadius: 10, marginRight: 15 }}

              src={JSON.parse(row.img_urls ? row.img_urls : "[]").at(0) || defaultProduct}

            />
            <Typography  style={{marginRight:5}} 
             >{row.name}</Typography>
            {show? 
             <MoreInfo  >     
              <ListItem >
                  <Typography style={{width:180}}></Typography>
                  <Typography style={{fontWeight:700}}>Tồn</Typography>
                </ListItem>
                {branchs.map((item) => {
                  console.log("itemm", item)
                  return(
                  <ListItem >
                      <ListItem style={{width:180, margin:0, padding:0}}>
                          <Typography style={{fontWeight:700, marginRight:10}}>{item.name}</Typography>
                          {item.uuid === branch.uuid ? <CheckCircleIcon fontSize="small" color='primary'/> :null} 
                      </ListItem>
                      <Grid justifyContent='flex-end'>
                      <Typography >{findBranchQuantity(item.uuid)}</Typography>
                    </Grid>
                </ListItem>
                 ) })}
               {/* {row.branch_inventories.map(item =>(
                   <ListItem >
                      <ListItem style={{width:280, margin:0, padding:0}}>
                          <Typography style={{fontWeight:700, marginRight:10}}>{item.name}</Typography>
                          {item.uuid === branch.uuid ? <CheckCircleIcon fontSize="small" color='primary'/> :null} 
                      </ListItem>
                      <Typography>{item.quantity_available}</Typography>
                    </ListItem>
                ))}   */}
            </MoreInfo>
    
           :null}
            {haveDiscount ? (
              <img
                id="gift"
                src={require("../../../../assets/img/icon/giftbox.png").default}
                style={{ height: 16, width: 16, marginLeft: 10, marginTop: -3 }}
                onClick={() => setOpenDiscount(true)}
              />
            ) : null}
          </ListItem>
          {openDiscount && (
            <DiscountPopUp
              open={openDiscount}
              title={`Khuyến mãi trên ${row.product_code} - ${row.name}`}
              onClose={() => {
                setOpenDiscount(false);
              }}
            />
          )}
        </TableCell>
        {/* <TableCell align="left">{row.bar_code}</TableCell> */}
        <TableCell align="right">
          {canFixPriceSell.status && canFixPriceSell.cart ?
          <Input.ThousandSeperatedInput
            id="standard-basic"
            style={{ width: 72 }}
            size="small"
            inputProps={{ style: { textAlign: "right" } }}
            defaultPrice={row.unit_price}
            value={row.unit_price}
            onChange={(e) =>
              handleChangeItemPrice(props.row.uuid, e.target.value)
            }
          />
          :
          <Input.ThousandFormat  value={row.unit_price} > </Input.ThousandFormat>
        }
        </TableCell>
        {row.has_batches ? (
          <TableCell align="center" padding="none">
            {row.quantity}
          </TableCell>
        ) : (
          <TableCell align="left" padding="none">
            <ButtonQuantity
              quantity={row.quantity}
              setQuantity={updateQuantity}
              branch_quantity={row.branch_quantity}
            />
          </TableCell>
        )}

        <TableCell align="right" className={classes.boldText}>
          <VNDFormat value={row.unit_price * row.quantity} />
        </TableCell>
        <TableCell align="right">
          <IconButton aria-label="expand row" size="small">
            <DeleteForeverOutlinedIcon
              onClick={() => handleDeleteItemCart(row.uuid)}
            />
          </IconButton>
        </TableCell>
      </TableRow>
      {row.has_batches ? (
        <TableRow>
          <TableCell colSpan={1}></TableCell>
          <TableCell colSpan={10}>
            <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
              <Button
                variant="contained"
                size="small"
                onClick={() => setSelectBatchOpen(true)}
              >
                Chọn lô
              </Button>
              {selectedBatches.map((batch) => (
                <Tooltip title={`Tồn kho - ${batch.quantity}`}>
                  <Chip
                    label={`${
                      batch?.batch_code ? batch?.batch_code : "Mới"
                    } - ${batch?.expiry_date ? batch?.expiry_date : ""} - ${
                      batch.additional_quantity
                    }`}
                    key={batch.id}
                    onDelete={() => {
                      const newBatches = selectedBatches.filter(
                        (selectedBatch) => selectedBatch.id !== batch.id
                      );
                      setSelectedBatches(newBatches);
                    }}
                    color={batch.is_new ? "primary" : "secondary"}
                    deleteIcon={<DeleteOutline />}
                    variant="outlined"
                  />
                </Tooltip>
              ))}
              {selectBatchOpen && (
                <SelectBatch
                  handleSubmit={handleSelectBatches}
                  row={row}
                  handleClose={() => setSelectBatchOpen(false)}
                />
              )}
            </div>
          </TableCell>
        </TableRow>
      ) : null}
    </>
  );
};
export const CartRowMini = ({ row }) => {
  const classes = useStyles();

  return (
    <>
      <TableRow hover key={row.id}>
        <TableCell align="left">
          <ListItem
            style={{ marginLeft: -30, marginTop: -10, marginBottom: -10 }}
          >
            <Box
              component="img"
              sx={{ height: 40, width: 40, borderRadius: 10, marginRight: 15 }}
              src={icon}
            />
            <Box direction="column">
              <Typography
                className={classes.boldText}
                style={{
                  marginBottom: 3,
                  fontSize: 14.5,
                  width: 135,
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {row.name}
              </Typography>
              {/* <Typography>{row.price}</Typography> */}
              <Input.ThousandSeperatedInput
                id="standard-basic"
                style={{ width: 70 }}
                size="small"
                defaultPrice={row.price}
              />
            </Box>
          </ListItem>
        </TableCell>

        <TableCell align="left" padding="none">
          <TextField
            variant="outlined"
            defaultValue={row.quantity}
            style={{ width: 37, margin: 0 }}
            size="small"
            inputProps={{
              style: { paddingLeft: 5, paddingRight: 5, textAlign: "center" },
            }}
          />
        </TableCell>

        <TableCell align="right" className={classes.boldText}>
          700.000
        </TableCell>
        <TableCell align="left">
          <IconButton
            aria-label="expand row"
            size="small"
            style={{ marginLeft: -25 }}
          >
            <DeleteForeverOutlinedIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
};
