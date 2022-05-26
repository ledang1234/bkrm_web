import React from 'react'
import useRowStyles from '../../../../components/TableCommon/style/rowStyle'
import clsx from "clsx";

import {TableCell,TableRow,Chip, Button} from '@material-ui/core';

import {FormatedStatus} from '../../../../components/TableCommon/util/format'
import InventoryOrderDetail from './InventoryOrderDetail/InventoryOrderDetail'
import {VNDFormat} from '../../../../components/TextField/NumberFormatCustom'
import { useSelector } from 'react-redux';
const TransferInventoryTableRow = (props) => {
    const { row, handleOpenRow,openRow,hidenCollumn,colorText, update} = props;
    const classes = useRowStyles();
    const info = useSelector(state => state.info);
    const branch_id = info.branch.id;
    console.log(branch_id)
    return (
        <>
        {/* ROW */}
            <TableRow
            onClick={() => handleOpenRow(row.code)}   
            key={row.code}
            className={ clsx(classes.row,(openRow === row.code) ? classes.rowClicked : null)}
            style={{color:colorText}}
            >
                <TableCell align="left" style={{color:colorText}}>{row.code}</TableCell>
                {/* <TableCell align="left" >{row.creation_date}</TableCell> */}

                <TableCell align="left"style={{color:colorText}}>{row.name}</TableCell>
                <TableCell align="left"style={{color:colorText}}>{row.quantity}</TableCell>
                <TableCell align="left"style={{color:colorText}}>
                    
                    <div>
                    {row.from_name}<br/>
                    <div>
                      {JSON.parse(row.from_batches).map((batch) => (
                            <Chip
                              size="small"
                              label={`${
                                batch?.batch_code ? batch?.batch_code : "Mới"
                              }(${
                                batch?.expiry_date
                                  ? batch?.expiry_date.substring(0, 10)
                                  : ""
                              })-${batch.quantity}`}
                              key={batch.id}
                              color={batch.is_new ? "primary" : "secondary"}
                              variant="outlined"
                            />
                          ))
                        }
                    </div>
                  </div>
                </TableCell>
                <TableCell align="left"style={{color:colorText}}>
                    <div>
                        {row.to_name}<br/>
                      {JSON.parse(row.to_batches)?.map((batch) => (
                            <Chip
                              size="small"
                              label={`${
                                batch?.batch_code ? batch?.batch_code : "Mới"
                              }(${
                                batch?.expiry_date
                                  ? batch?.expiry_date.substring(0, 10)
                                  : ""
                              })-${batch.quantity}`}
                              key={batch.id}
                              color={batch.is_new ? "primary" : "secondary"}
                              variant="outlined"
                            />
                          ))
                        }
                    </div>
                </TableCell>
                <TableCell align="left"style={{color:colorText}}>{`${row.created_user_name} - ${row.created_user_type === 'owner' ? "Chủ cửa hàng" : "Nhân viên"}`}</TableCell>
                <TableCell align="left" className={colorText?null:classes.fontName}style={{color:colorText}}>{row.created_at?.split(" ")[0].split('-').reverse().join('/').concat("\u00a0\u00a0"+ row.created_at?.split(" ")[1].substr(0, 5)) }</TableCell>
                <TableCell align="left">{row.status ==="pending" && row.to_id === info.branch.id ? <Button size='small' color="primary" variant="outlined" autoCapitalize="false" onClick={() => update({...row, status: "closed"})}>Nhập</Button> : null}</TableCell>
                
            </TableRow>

        {/* DETAIL */}
            <TableRow>
              {/* colspan  => số cột trong collapse */}
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>           
                    {/* <InventoryOrderDetail parentProps={props}/>        */}
              </TableCell>
            </TableRow>
        </>
    )
}

export default TransferInventoryTableRow
