import React from 'react'
import { Card,CardContent,CardMedia, Container, Grid, Typography , Rating, CardActions,  Button} from '@mui/material'
// import { useTheme } from '@emotion/react'
// import { useTheme } from '@mui/material/styles';
import {useTheme} from '@mui/material';
import { ShoppingCartSharp } from '@mui/icons-material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cart-slice';
import { fetchAllProducts } from '../features/products-slice';
import { useSearchParams } from 'react-router-dom';


export default function Home() {
  const [searchParams]= useSearchParams();
  const category = searchParams.get("category");
  const searchTerm =searchParams.get("searchterm")
  const theme = useTheme();
  const state = useSelector((state) => state.products);
  const {value:products, loading } = state ?? {};
  const dispatch = useDispatch();
  
  if(!products?.length) {
    dispatch(fetchAllProducts());
}

  function addProductToCart(product){
    dispatch(addToCart({product, quantity:1}));
  }
let filteredProducts = category && category !=="all" ? products.filter(prod => (prod.category == category)) : products

filteredProducts = searchTerm? filteredProducts.filter(prod => prod.title.toLowerCase().includes(searchTerm.toLowerCase())):
filteredProducts


return (
  <Container sx={{py:8}} maxWidth="lg">
  <Grid2 container="true" spacing={4}>
  {filteredProducts?.map(({title, description,id, price, rating,image}) => (
    <Grid2 item key={id} xs={12} sm={6} md={3}>
    <Card sx={{height:"100%", display:"flex", flexDirection:"column", padding:theme.spacing(2, 0)}}>
    <CardMedia component="img" sx={{alignSelf:"center", width:theme.spacing(30),height:theme.spacing(30), objectFit:"contain", pt:theme.spacing()}} image={image} alt={title}/>
    <CardContent>
    <Typography variat="h5" component="h2" gutterBottom sx={{
     overflow:"hidden",
     textOverflow:"ellipsis",
     display:"-webkit-box",  
     WebkitLineClamp:"1",
     WebkitBoxOrient:"vertical",
    //  "-webkit-line-clamp":"1",
    //  "-webkit-box-orient":"vertical",
    }}>{title}</Typography>
    <Typography
    color="text.secondary"
    paragraph
    sx={{
      overflow:"hidden",
     textOverflow:"ellipsis",
     display:"-webkit-box",  
     WebkitLineClamp:"2",
    //  "-webkit-line-clamp":"2",
    //  "-webkit-box-orient":"vertical",
    WebkitBoxOrient:"vertical"
    }}>{description}</Typography>
    <Typography fontSize="large" paragraph>{price}</Typography>
    <Rating readOnly precision={0.5} value={rating.rate} />
    </CardContent>
    <CardActions sx={{
      alignSelf:"center",
    }}>
    <Button variant="contained" onClick= {()=> addProductToCart({title, description,id, price, rating,image})}>
    <ShoppingCartSharp/>
    Add to cart
    </Button>
    </CardActions>
    </Card>
    </Grid2>
    ))}
  </Grid2>
  </Container>
  
  )
}
