import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import {Table, IconButton,ButtonGroup,Button,Grid,TextField, List} from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { grey} from '@material-ui/core/colors'
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import *  as TableType from '../../../assets/constant/tableType'
import * as Input from '../../TextField/NumberFormatCustom'

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// TABLE HEAD

function EnhancedTableHead(props) {
  const { classes, order, orderBy,  onRequestSort ,headCells} = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell/>
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
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
  boldText:{
    fontWeight:700,
    color: theme.customization.mode === "Light" ? grey[900]: null
  },
  groupedOutlined: {
    borderColor: grey[100],
  },

  rowHover:{
    '&:hover': {
      display:'none'
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
  textfieldClass: {
    '& .MuiInput-input': {
     '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
       '-webkit-appearance': 'none',
     },
    }
   }, 

  
}));



// TABLE ROW

export default function ListItem(props) {
  const {headCells,cartData, tableType} = props;
  const classes = useStyles();
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('stt');
 
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  // Chưa hoàn thành cái sort
  //-> sort hiện tại chỉ sort giá trị từ cartData còn nếu data thay đổi trong text field thì vẫn chua sort đc 
  // => sửa lại sau
  return (
    <div className={classes.root}>
        <TableContainer className={classes.container}>
          <Table
            stickyHeader
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={cartData.length}
              headCells={headCells}
            />
            <TableBody>
              {stableSort(cartData, getComparator(order, orderBy))
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      key={row.id}
                    >
                       <ReturnDataTable row={row} type={tableType}/> 
                    </TableRow>
                  );
                })}
 
            </TableBody>
          </Table>
        </TableContainer> 

   </div>
  );
}
// hiện tai component (cartcell & importcell ) - (CartReturnCell & ImportReturnCell ) giống nhau
//nhưng vẫn tách ra để dễ thay đổi + quản lý state -> nếu ko cần thiết thì gom chung lại cho clean code
function ReturnDataTable (props){
  const {type,row} = props;
  switch(type){
    case TableType.CART :
      return <CartCell row={row} />
    case TableType.IMPORT:
      return <CartCell row={row}/>
    case TableType.CART_RETURN:
        return <CartReturnCell row={row}/>
    case TableType.IMPORT_RETURN:
      return  <CartReturnCell row={row}/>
    default:
      return <CartCell row={row} />
  }
}

const CartCell = ({row}) =>{
  const classes = useStyles();
  
  const [quantity, setQuantity] = React.useState(row.quantity);
  const [show, setShow] = React.useState('none');
 
  return (
    <>
       <TableCell align="left" style={{width:5}}>{row.stt}</TableCell>
        <TableCell align="left">{row.id}</TableCell>
        <TableCell align="left" >{row.name}</TableCell>
        <TableCell align="right">
          <Input.ThousandSeperatedInput id="standard-basic" style={{width:70 }} size="small" inputProps={{style: { textAlign: "right" }}} defaultPrice={row.price}  />
        </TableCell>

        <TableCell align="right" >
          <ButtonQuantity quantity={quantity} setQuantity={setQuantity} show={show} setShow={setShow}/> 
        </TableCell> 
        
        <TableCell align="right" className={classes.boldText}>{row.price * row.quantity}</TableCell>
        <TableCell>
          <IconButton aria-label="expand row" size="small" >
              <DeleteForeverOutlinedIcon/>
          </IconButton>
        </TableCell>
    </>
  )
}

const CartReturnCell = ({row}) =>{
  const classes = useStyles();
  
  const [quantity, setQuantity] = React.useState(row.quantity);
  const [show, setShow] = React.useState('none');
  return (
    <>
       <TableCell align="left" style={{width:5}}>{row.stt}</TableCell>
        <TableCell align="left">{row.id}</TableCell>
        <TableCell align="left" >{row.name}</TableCell>
        <TableCell align="right">{row.price}</TableCell>
        <TableCell align="right">
          <Input.ThousandSeperatedInput id="standard-basic" style={{width:70 }} size="small" inputProps={{style: { textAlign: "right" }}} defaultPrice={row.price}  />
        </TableCell>
        <TableCell align="right" >
          {/* <ButtonQuantity quantity={quantity} setQuantity={setQuantity} show={show} setShow={setShow}/>  */}
          <TextField InputProps={{ inputProps: { min: 0 } }}type="number" id="standard-basic" style={{width:35 }} size="small" inputProps={{style: { textAlign: "right" }}} defaultValue={row.quantity} /> 
          {/* <TextField type="number" id="standard-basic" style={{width:35 }} className={classes.textfieldClass} size="small" inputProps={{style: { textAlign: "right" }}} defaultPrice={row.quantity} /> */}

        </TableCell> 
        

        <TableCell align="right" className={classes.boldText}>{row.price * row.quantity}</TableCell>
        <TableCell>
          <IconButton aria-label="expand row" size="small" >
              <DeleteForeverOutlinedIcon/>
          </IconButton>
        </TableCell>
    </>
  )
}




const ButtonQuantity = (props) =>{
  const classes = useStyles();
  const {quantity,setQuantity, show,setShow} = props;

  const handleIncrement = () => {
    setQuantity(quantity+ 1);
  };

  const handleDecrement = () => {
    if(quantity >=1){setQuantity(quantity- 1);}
  };
  const handleShow = () => {
    setShow('block');
  };
  const handleClose = () => {
    setShow('none');
  };
  return(
    <Grid container direction="row"  alignItems="center" justifyContent="flex-end" onMouseOver={handleShow} onMouseOut={handleClose}>      
        <IconButton style={{ display: show }} aria-label="delete" className={classes.margin} size="small" onClick={handleDecrement} >
          <RemoveIcon fontSize="inherit" />
        </IconButton>
      
        <TextField type="number" id="standard-basic" style={{width:35 }} className={classes.textfieldClass} size="small" inputProps={{style: { textAlign: "right" }}} value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))}/>
        
        <IconButton style={{ display: show }} aria-label="delete" className={classes.margin} size="small" onClick={handleIncrement}>
          <AddIcon fontSize="inherit" />
        </IconButton>
    </Grid>
  )
}









// const ImportCell = ({row}) =>{
//   const classes = useStyles();
//   const [quantity, setQuantity] = React.useState(row.quantity);
//   const [show, setShow] = React.useState('none');
//   return (
//     <>
//        <TableCell align="left" style={{width:5}}>{row.stt}</TableCell>
//         <TableCell align="left">{row.id}</TableCell>
//         <TableCell align="left" >{row.name}</TableCell>
//         <TableCell align="right">
//           <Input.ThousandSeperatedInput id="standard-basic" style={{width:70 }} size="small" inputProps={{style: { textAlign: "right" }}} defaultPrice={row.price}  />
//         </TableCell>

//         <TableCell align="right" >
//           <ButtonQuantity quantity={quantity} setQuantity={setQuantity} show={show} setShow={setShow}/> 
//         </TableCell> 
        
//         <TableCell align="right" className={classes.boldText}>{row.price * row.quantity}</TableCell>
//         <TableCell>
//           <IconButton aria-label="expand row" size="small" >
//               <DeleteForeverOutlinedIcon/>
//           </IconButton>
//         </TableCell>
//     </>
//   )
// }

// const ImportReturnCell = ({row}) =>{
//   return (
//     <>
//        <TableCell align="left" style={{width:5}}>{row.stt}</TableCell>
//         <TableCell align="left">{row.id}</TableCell>
//         <TableCell align="left" >{row.name}</TableCell>
//         <TableCell align="right">{row.price}</TableCell>
//         <TableCell align="right">
//           <Input.ThousandSeperatedInput id="standard-basic" style={{width:70 }} size="small" inputProps={{style: { textAlign: "right" }}} defaultPrice={row.price}  />
//         </TableCell>
//         <TableCell align="right" >
//           <ButtonQuantity quantity={quantity} setQuantity={setQuantity} show={show} setShow={setShow}/> 
//         </TableCell> 

//         <TableCell align="right" className={classes.boldText}>{row.price * row.quantity}</TableCell>
//         <TableCell>
//           <IconButton aria-label="expand row" size="small" >
//               <DeleteForeverOutlinedIcon/>
//           </IconButton>
//         </TableCell>
//     </>
//   )
// }
