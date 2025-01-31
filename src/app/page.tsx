import { prisma } from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";

export default async function Home() {
  const products = await prisma.product.findMany();

  return (
    <Container>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              {product.images.length > 0 && (
                <CardMedia
                  component="img"
                  height="200"
                  image={product.images[0]}
                />
              )}
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography>${product.price.toFixed(2)}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
