import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function CartLoading() {
  return (
    <Container sx={{ my: 2 }}>
      <Skeleton height={23.5} width={200} sx={{ mb: 2 }} />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Skeleton height={23.5} width={150} />
              </TableCell>
              <TableCell align="right">
                <Skeleton height={23.5} width={60} />
              </TableCell>
              <TableCell align="right">
                <Skeleton height={23.5} width={100} />
              </TableCell>
              <TableCell align="right">
                <Skeleton height={23.5} width={80} />
              </TableCell>
              <TableCell align="right">
                <Skeleton height={23.5} width={40} />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[1, 2, 3].map((item) => (
              <TableRow key={item}>
                <TableCell>
                  <Skeleton height={23.5} width={150} />
                </TableCell>
                <TableCell align="right">
                  <Skeleton height={23.5} width={60} />
                </TableCell>
                <TableCell align="right">
                  <Skeleton variant="rectangular" height={23.5} width={100} />
                </TableCell>
                <TableCell align="right">
                  <Skeleton height={23.5} width={80} />
                </TableCell>
                <TableCell align="right">
                  <Skeleton variant="circular" height={23.5} width={23.5} />
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3} />
              <TableCell align="right" colSpan={2}>
                <Skeleton height={23.5} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Skeleton
        variant="rectangular"
        height={23.5}
        width={200}
        sx={{ mt: 4 }}
      />
    </Container>
  );
}
