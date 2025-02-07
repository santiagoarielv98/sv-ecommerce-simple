import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

interface CartTotalProps {
  total: number;
}

export function CartTotal({ total }: CartTotalProps) {
  return (
    <TableRow>
      <TableCell colSpan={3}>
        <Typography variant="h6">Total</Typography>
      </TableCell>
      <TableCell align="right" colSpan={2}>
        <Typography variant="h6">${total.toFixed(2)}</Typography>
      </TableCell>
    </TableRow>
  );
}
