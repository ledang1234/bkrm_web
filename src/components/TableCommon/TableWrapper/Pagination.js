import React from 'react'
import {Table,TableContainer,FormControlLabel,Switch,Paper, TablePagination} from '@material-ui/core';

const Pagination = ({ pagingState, setPagingState}) => {
  return (
    <TablePagination
        style={{marginTop:-25,marginBottom:60, marginLeft:-5}}
        rowsPerPageOptions={[10, 25, 100]}
        rowsPerPage={10}
        labelRowsPerPage={"Dòng"}
        component="div"
        count={pagingState?.total_rows}
        rowsPerPage={pagingState?.limit}
        page={pagingState?.page}
        onPageChange={(e, page) => setPagingState({ ...pagingState, page: page })}
        onRowsPerPageChange={(e) => setPagingState({ ...pagingState, page: 0, limit: +e.target.value })}
    />
  )
}

export default Pagination