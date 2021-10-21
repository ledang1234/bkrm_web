import React from 'react'

import TableWrapper from '../../../components/TableWrapper/TableWrapper'

import JSONdata from '../../../assets/JsonData/inventory.json'
import * as HeadCells from '../../../assets/constant/tableHead'
import *  as TableType from '../../../assets/constant/tableType'

const Inventory = () => {
    return (
        <TableWrapper title="Kho hàng" dataTable={JSONdata} headerData={HeadCells.InventoryHeadCells} tableType={TableType.INVENTORY}/>
   
    )
}
export default Inventory
