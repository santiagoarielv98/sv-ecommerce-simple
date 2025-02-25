"use client";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const salesData = [
  { name: "Ene", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 2000 },
  { name: "Abr", value: 2780 },
  { name: "May", value: 1890 },
  { name: "Jun", value: 2390 },
];
const MonthlySalesChart = () => {
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: 340,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Ventas Mensuales
      </Typography>
      <ResponsiveContainer>
        <AreaChart
          data={salesData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default MonthlySalesChart;
