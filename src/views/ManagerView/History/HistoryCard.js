import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function HistoryCard(data) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {data?.code}
        </Typography>
        <Typography variant="h5" component="div">
          {data?.partner_name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {data?.user_name}
        </Typography>
        <Typography variant="body2">
          {data?.total_amount}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
