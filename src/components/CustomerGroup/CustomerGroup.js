import {
    Avatar,
    Dialog,
    Grid,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableRow,
    ButtonBase,
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
import CustomerGroupView from "./CustomerGroupView";

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

                {isAddOpen ? <CustomerGroupForm onSave={() => { }} onClose={() => setIsAddOpen(false)} /> :
                    <CustomerGroupView custGroups={custGroups} />
                }

            </Paper>
        </Dialog>
    )
}

export default CustomerGroup;