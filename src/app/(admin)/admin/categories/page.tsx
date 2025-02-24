"use client";

import { useState } from "react";
import {
  Add,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import {
  Button,
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

const categories = [
  { id: "1", name: "Electrónicos", productCount: 15 },
  { id: "2", name: "Ropa", productCount: 25 },
  { id: "3", name: "Hogar", productCount: 10 },
];

const CategoriesPage = () => {
  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<{
    id?: string;
    name: string;
  } | null>(null);

  const handleOpen = (category?: (typeof categories)[0]) => {
    setEditingCategory(category ? category : { name: "" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingCategory(null);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Typography variant="h5" component="h2">
            Categorías
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpen()}
          >
            Nueva Categoría
          </Button>
        </div>

        <List>
          {categories.map((category) => (
            <ListItem
              key={category.id}
              divider
              secondaryAction={
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => handleOpen(category)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" color="error">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              }
            >
              <ListItemText
                primary={category.name}
                secondary={`${category.productCount} productos`}
              />
            </ListItem>
          ))}
        </List>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            {editingCategory?.id ? "Editar Categoría" : "Nueva Categoría"}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Nombre de la categoría"
              type="text"
              fullWidth
              variant="outlined"
              value={editingCategory?.name || ""}
              onChange={(e) =>
                setEditingCategory({
                  ...editingCategory!,
                  name: e.target.value,
                })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleClose} variant="contained">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default CategoriesPage;
