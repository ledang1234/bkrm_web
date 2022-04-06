import React from 'react'
import useRowStyles from '../../../../components/TableCommon/style/rowStyle'
import clsx from "clsx";

import {TableCell,TableRow} from '@material-ui/core';
import {ThousandFormat, VNDFormat} from "../../../../components/TextField/NumberFormatCustom"
import {FormatedStatusCheck} from '../../../../components/TableCommon/util/format'
import CheckHistoryDetail from './CheckHistoryDetail/CheckHistoryDetail'

const CheckHistoryTableRow = (props) => {
    const { row, handleOpenRow,openRow} = props;
    const classes = useRowStyles();

    const quantityDifference = row.details
      ?.map((detail) => detail.quantity)
      .reduce((total, ele) => total + ele, 0)
    
    const moneyDifference = row.details
      ?.map((detail) => Number(detail.quantity) * Number(detail.unit_price))
      .reduce((total, num) => total + num, 0)


    return (
      <>
        {/* ROW */}
        <TableRow
          onClick={() => handleOpenRow(row.uuid)}
          key={row.uuid}
          className={clsx(
            classes.row,
            openRow === row.uuid ? classes.rowClicked : null
          )}
        >
          <TableCell align="left">{row.inventory_check_code}</TableCell>
          <TableCell align="left" className={classes.fontName}>
            {/* {row.created_at} */}
            {row.created_at?.split(" ")[0].split('-').reverse().join('/').concat("\u00a0\u00a0"+ row.created_at?.split(" ")[1].substr(0, 5)) }

          </TableCell>
          {/* <TableCell align="left">{row.branch_name}</TableCell> */}
          <TableCell align="right" className={classes.fontName}>
           <ThousandFormat style={{fontWeight:700,color:quantityDifference >0 ?"green" :"red"}}value={quantityDifference} />
          </TableCell>
          <TableCell align="right" className={classes.fontName}>
          <VNDFormat style={{fontWeight:700,color:quantityDifference >0 ?"green" :"red"}} value={moneyDifference}/>
          </TableCell>
          {/* <TableCell align="center">
                    <FormatedStatusCheck status={row.tongSLthucte - row.tongtonkho}/>
                </TableCell> */}
          {/* <TableCell align="left">
            {row.created_user_type === "owner" ? "Chủ cửa hàng" : "Nhân viên"}
          </TableCell> */}
          <TableCell align="center">{row.user_name}</TableCell>
        </TableRow>

        {/* DETAIL */}
        <TableRow>
          {/* colspan  => số cột trong collapse */}
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
            <CheckHistoryDetail parentProps={props} />
          </TableCell>
        </TableRow>
      </>
    );
}

export default CheckHistoryTableRow
