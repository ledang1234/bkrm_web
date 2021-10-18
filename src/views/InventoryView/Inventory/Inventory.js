import React from 'react'

import TableWrapper from '../../../components/TableWrapper/TableWrapper'
// import TableType from '../../../assets/constant/constants'

import JSONdata from '../../../assets/JsonData/inventory.json'
import * as HeadCells from '../../../assets/constant/tableHead'
import *  as TableType from '../../../assets/constant/tableType'

const Inventory = () => {
    return (
        // type={TableType.TEST} 
        <div>
            <TableWrapper title="Kho hàng" dataTable={JSONdata} headerData={HeadCells.InventoryHeadCells} tableType={TableType.INVENTORY}/>
        </div>
    )
}
export default Inventory
