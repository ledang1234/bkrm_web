import React, { useState, useEffect } from "react";
import { useTheme, makeStyles, createStyles } from "@material-ui/core/styles";

import {
  Typography,
  Box,
  Card,
  Button,
  Grid,
  ButtonBase,
  Avatar,
  Tooltip,
  TableBody,
} from "@material-ui/core";
import * as HeadCells from "../../../assets/constant/tableHead";
import * as TableType from "../../../assets/constant/tableType";
import TableHeader from "../../../components/TableCommon/TableHeader/TableHeader";
import TableWrapper from "../../../components/TableCommon/TableWrapper/TableWrapper";
import InvoiceReturnSummary from "../../../components/CheckoutComponent/CheckoutSummary/InvoiceReturnSummary/InvoiceReturnSummary";

const useStyles = makeStyles((theme) =>
  createStyles({
    textTitle: {
      flexGrow: 1,
      textAlign: "center",
      marginBottom: 20,
    },
    card1: {
      boxShadow: "none",
    },
  })
);

const CartPage = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const cartData = [
    // QUANTITY có thể edit ->  truyền quatity edit ngược về cartData ??
    //dựa vào id của text field quatity ??

    //còn bị lỗi sort // tự generate stt
    {
      stt: 1,
      id: 123,
      name: "Áo dài Việt Nam Việt Nam",
      quantity: 2,
      price: 200,
    },
    { stt: 2, id: 12, name: "Quan", quantity: 1, price: 220 },
    { stt: 3, id: 134, name: "Bánh", quantity: 3, price: 240 },
  ];

  return (
    <Box style={{ marginTop: 100, marginLeft: 50, marginRight: 50 }}>
      <Typography style={{ flexGrow: 1, textAlign: "center" }} variant="h2">
        Giỏ hàng
      </Typography>
      <Typography className={classes.textTitle} variant="body2">
        ( 5 sản phẩm )
      </Typography>

      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12} sm={8}>
          <Card className={classes.card1}>
            <Box style={{ padding: 30, minHeight: "75vh" }}>
              <TableWrapper isCart={true}>
                <TableHeader
                  classes={classes}
                  headerData={HeadCells.CartHeadCells}
                />
                <TableBody>
                  {cartData.map((row, index) => {
                    return (
                      // <CartReturnTableRow row={row}/>
                      <></>
                    );
                  })}
                </TableBody>
              </TableWrapper>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4} className={classes.card}>
          <Card className={classes.card}>
            {/* <InvoiceReturnSummary  data={cartData}/> */}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartPage;
