import React from 'react'

import TableWrapper from '../../../components/TableWrapper/TableWrapper'

import JSONdata from '../../../assets/JsonData/inventoryReturn.json'
import * as HeadCells from '../../../assets/constant/tableHead'
import *  as TableType from '../../../assets/constant/tableType'

const InventoryReturnOrder = () => {
    return (
        <div>
            <TableWrapper title="Đơn trả hàng nhập" dataTable={JSONdata} headerData={HeadCells.InventoryReturnOrderHeadCells} tableType={TableType.INVENTORY_RETURN} />
        </div>
    )
}

export default InventoryReturnOrder
