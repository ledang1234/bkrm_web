import React from 'react'

import TableWrapper from '../../../components/TableWrapper/TableWrapper'

import JSONdata from '../../../assets/JsonData/employee.json'
import * as HeadCells from '../../../assets/constant/tableHead'
import *  as TableType from '../../../assets/constant/tableType'

const Employee = () => {
    return (
     
        <TableWrapper title="Nhân viên"   dataTable={JSONdata} headerData={HeadCells.EmployeeHeadCells} tableType={TableType.EMPLOYEE}/>
       
    )
}

export default Employee
