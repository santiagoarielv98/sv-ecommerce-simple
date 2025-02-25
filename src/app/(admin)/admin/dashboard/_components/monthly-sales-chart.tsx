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

interface MonthlySale {
  month: string;
  total: number;
}

interface MonthlySalesChartProps {
  salesData: MonthlySale[];
}

const MonthlySalesChart = ({ salesData }: MonthlySalesChartProps) => {
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
        Monthly Sales
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
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => [`$${value}`, "Ventas"]} />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default MonthlySalesChart;
