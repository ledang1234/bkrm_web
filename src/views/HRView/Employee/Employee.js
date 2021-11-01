import React, {useState, useEffect} from 'react'

import TableWrapper from '../../../components/TableWrapper/TableWrapper'

import JSONdata from '../../../assets/JsonData/employee.json'
import * as HeadCells from '../../../assets/constant/tableHead'
import *  as TableType from '../../../assets/constant/tableType'
import employeeApi  from '../../../api/employeeApi'

const Employee = () => {
    const [employeeList, setEmployeeList] = useState([]);
    const [reload, setReload] = useState(false);

    const onReload = () => setReload(!reload)
    
    useEffect(() => {
        employeeApi.getEmployees()
        .then(response => response.data, err => console.log(err))
        .then(data => {
            setEmployeeList(data)
           
        })

    }, [reload]);


    return (

            <TableWrapper title="Nhân viên" dataTable={employeeList} headerData={HeadCells.EmployeeHeadCells} tableType={TableType.EMPLOYEE} reload={onReload}/>

    )
}

export default Employee
