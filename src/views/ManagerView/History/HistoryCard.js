import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function HistoryCard({data}) {
  return (
    <Card sx={{ minWidth: 275, marginBottom: 5, borderRadius: 5 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {"Tài liệu: " + data?.code}
        </Typography>
        <Typography component="div">
          {"Đối tác: " + data?.partner_name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {(data?.user_type === "owner" ? "Chủ cửa hàng - " : "Nhân viên - ") +
            data?.user_name}
        </Typography>
        <Typography variant="body2">
          {"Tổng giá trị: " + data?.total_amount}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">{"Thời gian: " + data?.created_at}</Button>
        <Button size="small">{"Địa điểm: " + data?.branch_name}</Button>
      </CardActions>
    </Card>
  );
}
