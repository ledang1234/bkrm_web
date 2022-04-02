import React from 'react'
import { makeStyles, useTheme,withStyles } from "@material-ui/core/styles";
import { grey} from '@material-ui/core/colors'
import {Table,TableContainer,FormControlLabel,Switch,Paper, TablePagination,Grid} from '@material-ui/core';

import { Pagination } from 'antd';

const TableWrapper = (props) => {
    const {isCart, isReport, pagingState, setPagingState,list,tableRef} = props;

    console.log("pagingState",pagingState)
    const theme = useTheme();
    // const classes = useStyles(theme);
    // table
    const [dense, setDense] = React.useState(isReport?true:false);


    const handleChangeDense = (event) => {
      setDense(event.target.checked);
    };
    React.useEffect(()=>{
        tableRef?.current && tableRef?.current?.scrollIntoView();
    },[list])


    return (
    <>
        <StyledPaper style={{width: '100%', marginBottom: theme.spacing(2)}}>
            {/* Chinh size tablw */}
            <TableContainer style={{maxHeight: '90vh',}}>
            {/* <TableContainer style={{maxHeight: '84vh'}}> */}
                <Table
                    ref={tableRef}
                    aria-labelledby="tableTitle"
                    size={dense ? 'small' : 'medium'}
                    aria-label="enhanced table"
                    stickyHeader 
                >
                    {props.children}

                </Table>
                
            </TableContainer>
            
        </StyledPaper>

            {/* Add page navigation here...  */}
            {isCart ? null :
                // <div style={{display: 'flex', flexDirection: 'row-reverse', gap: 10,marginTop:-20, marginRight:20, marginBottom:-10 }}>
                //     <TablePagination
                //         rowsPerPageOptions={[10, 25, 100]}
                //         labelRowsPerPage={"Số dòng"}
                //         component="div"
                //         count={pagingState?.total_rows}
                //         rowsPerPage={pagingState?.limit}
                //         page={pagingState?.page}
                //         onPageChange={(e, page) => setPagingState({ ...pagingState, page: page })}
                //         onRowsPerPageChange={(e) => setPagingState({ ...pagingState, page: 0, limit: +e.target.value })}
            

                //     />
                   
                //     <FormControlLabel
                //         control={<Switch checked={dense} onChange={handleChangeDense} />}
                //         label="Thu nhỏ"
                //         style={{ display: "flex", justifyContent: "flex-end", }}
                //     />
                // </div>
                <Grid container justifyContent='flex-end' >

                        <FormControlLabel
                            control={<Switch checked={dense} onChange={handleChangeDense} />}
                            label="Thu nhỏ"
                            style={{ display: "flex", justifyContent: "flex-end", }}
                        />
                        <Pagination
                        style={{marginRight:40}}
                            showSizeChanger
                            total={pagingState?.total_rows}
                            current={pagingState?.page +1}
                            onChange={(newCurrent, newPageSize) => {
                                const pageSizeChange = pagingState?.limit !== newPageSize;
                                if (!pageSizeChange) {
                                    setPagingState({ ...pagingState, page: newCurrent -1 })
                                    // tableRef.current && tableRef.current.scrollIntoView();
                                } else {
                                    setPagingState({ ...pagingState, page: 0, limit: newPageSize})
                                    // tableRef.current && tableRef.current.scrollIntoView();

                                }
                              }}
                            />
                        
                </Grid>
                
            
            }
    </>
    )
}

const StyledPaper = withStyles((theme) => ({
    root: {
      boxShadow:"none",
      background: theme.customization.mode === "Light"? null: grey[800],
      color: theme.customization.mode === "Light"? null: grey[700]
    },
  }))(Paper);

export default TableWrapper
