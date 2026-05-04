import { useEffect, useMemo, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const API = 'http://localhost:3000/api';

type Product = {
  id: number;
  name: string;
  type: string;
  price: number;
  image: string;
};

function App() {
  const [storeName, setStoreName] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);
  const [selectedType, setSelectedType] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Load initial data on mount (store name, products, and wishlist state)
    fetch(`${API}/store-name`)
      .then((res) => res.json())
      .then((data) => setStoreName(data.name))
      .catch(() => setError('Failed to load store name'));

    fetch(`${API}/products`)
      .then((res) => res.json())
      .then(setProducts)
      .catch(() => setError('Failed to load products'));

    // Sync wishlist state from backend so UI reflects existing selections
    fetch(`${API}/wishlist`)
      .then((res) => res.json())
      .then((data: Product[]) =>
        setWishlistIds(data.map((p) => p.id)),
      )
      .catch(() => {});
  }, []);

  // Derive unique product types for filter dropdown
  const types = useMemo(
    () => Array.from(new Set(products.map((p) => p.type))),
    [products],
  );

  // Filter products based on selected type
  const visibleProducts = useMemo(() => {
    if (!selectedType) return products;
    return products.filter((p) => p.type === selectedType);
  }, [products, selectedType]);

  const addToWishlist = async (id: number) => {
    setError('');

    try {
      // Call backend to persist wishlist update
      const res = await fetch(`${API}/wishlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: id }),
      });

      // Backend enforces validation (e.g. duplicate prevention)
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message);
      }

      // Update local state to reflect successful addition
      setWishlistIds((prev) => [...prev, id]);
    } catch (err: any) {
      setError(err.message || 'Failed to add item');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            {storeName || 'Product Catalog'}
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 4 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <FormControl sx={{ mb: 3, minWidth: 200 }}>
          <InputLabel shrink>Filter by type</InputLabel>
          <Select
            value={selectedType}
            label="Filter by type"
            displayEmpty
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <MenuItem value="">
              All products
            </MenuItem>
            {types.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Grid container spacing={3}>
          {visibleProducts.map((p) => {
            const added = wishlistIds.includes(p.id);

            return (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={p.id}>
                <Card
                  sx={{
                    transition: '0.2s',
                    '&:hover': {
                      boxShadow: 6,
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={p.image}
                    alt={p.name}
                  />
                  <CardContent>
                    <Typography variant="h6">{p.name}</Typography>
                    <Typography>{p.type}</Typography>
                    <Typography>£{p.price.toFixed(2)}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      disabled={added}
                      onClick={() => addToWishlist(p.id)}
                    >
                      {added ? 'Added' : 'Add to Wishlist'}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}

export default App;