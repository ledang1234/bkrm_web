import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    ListItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    ButtonBase,
    TextField,
    Typography,
    Tooltip
} from "@material-ui/core";
import React, { useEffect, useState } from 'react'
import AddIcon from '@material-ui/icons/Add';
import { useFormik } from 'formik'
import { useSelector } from "react-redux";
import useStyles from "../TableCommon/style/mainViewStyle";
import TableHeader from "../TableCommon/TableHeader/TableHeader";
import customerApi from "../../api/customerApi";
import CustomerGroupForm from "./CustomerGroupForm";
const CustomerGroup = ({ open, onClose }) => {
    const [custGroups, setCustGroups] = useState([]);

    const classes = useStyles()
    const info = useSelector(state => state.info)
    const store_uuid = info.store.uuid;

    const fetchData = async (query) => {
        try {
            const res = await customerApi.getCustomerGroups(store_uuid);
            setCustGroups(res.data);
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        // if (store_uuid) fetchData();
    }, [store_uuid])
    const [isAddOpen, setIsAddOpen] = useState(false);
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth={true} >

            <Paper style={{ padding: 15 }}>
                <Grid container justifyContent="space-between">
                    <Grid item><Typography style={{ marginBottom: 20, marginTop: 10 }} variant="h2">Nhóm khách hàng</Typography> </Grid>
                    <ButtonBase sx={{ borderRadius: '16px' }}
                        onClick={() => setIsAddOpen(!isAddOpen)}
                    >
                        <Avatar variant="rounded" className={classes.headerAvatar}  >
                            <Tooltip title='Thêm nhóm khách hàng'>
                                <AddIcon stroke={1.5} size="1.3rem" />
                            </Tooltip>
                        </Avatar>
                    </ButtonBase>
                </Grid>

                {isAddOpen ? <CustomerGroupForm /> :
                    <TableContainer style={{ maxHeight: '64vh', minHeight: '60vh' }}>
                        <Table size={'small'} >
                            <TableHeader
                                classes={classes}
                                // order={debtHistory}
                                color="#000"
                                headerData={DebtHistoryHeadCells}
                            />
                            <TableBody>
                                {custGroups.map((row, index) => {
                                    return (
                                        <TableRow>
                                            {/* <TableCell align="left" style={{color:'#000'}}> {row.date?.split(" ")[0].split('-').reverse().join('/').concat("\u00a0\u00a0"+ row.date?.split(" ")[1].substr(0, 5)) } </TableCell>
                  <TableCell align="left" style={{color:'#000'}} > {row.customer_name}  {row.customer_phone ? ` - ${row.customer_phone}` :null}</TableCell>
                  <TableCell align="left" style={{color:'#000'}} > {row.created_user_name}</TableCell>
                  <TableCell align="right" style={{color:'#000'}} > {row.amount} </TableCell> */}
                                        </TableRow>
                                    );
                                })}

                            </TableBody>
                        </Table>
                    </TableContainer>
                }

            </Paper>
        </Dialog>
    )
}

export default CustomerGroup;

const DebtHistoryHeadCells = [
    { id: "date", align: "left", disablePadding: false, label: "Tên nhóm" },
    { id: "customer", align: "left", disablePadding: false, label: "Y" },
    { id: "customer", align: "left", disablePadding: false, label: "Người thực hiện" },
    { id: "total", align: "right", disablePadding: false, label: "Tiền thu" },
]