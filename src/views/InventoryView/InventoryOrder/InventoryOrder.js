import React from 'react'

import TableWrapper from '../../../components/TableWrapper/TableWrapper'

import JSONdata from '../../../assets/JsonData/inventoryOrder.json'
import * as HeadCells from '../../../assets/constant/tableHead'
import *  as TableType from '../../../assets/constant/tableType'

const InventoryOrder = () => {
    return (
        <div>
            <TableWrapper title="Đơn nhập hàng"  dataTable={JSONdata} headerData={HeadCells.InventoryOrderHeadCells} tableType={TableType.INVENTORY_ORDER}/>
        </div>
    )
}

export default InventoryOrder
