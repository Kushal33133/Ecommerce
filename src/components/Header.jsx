import {
  AppBar,
  Badge,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { ShoppingCartSharp } from "@mui/icons-material";
import { Box, style } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import Autocomplete from "@mui/material/Autocomplete";
import { getItemCount } from "../utils";
import { useState } from "react";
import { useEffect } from "react";
import { TextField } from "@mui/material";
import { styled, alpha } from "@mui/system";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { fetchAllCategories } from "../features/categories-slice";
// import { useTheme } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Menu } from "@mui/material";
import { useAuth } from "../firebase/Auth";
import { signOut } from "@firebase/auth";
import { async } from "@firebase/util";

const Search = styled("section")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(16),
  marginLeft: 0,
  width: "100%",
}));

const StyleAutocomplete = styled(Autocomplete)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiTextField-root": {
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
  },
  "& .MuiInputBase-input": {
    color: theme.palette.common.white,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiSvgIcon-root": {
    fill: theme.palette.common.white,
  },
}));
const SearchIconWrapper = styled("section")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  right: 0,
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: "none",
}));

function SearchBar() {
  const theme = useTheme();
  const products = useSelector((state) => state.products.value);
  const categories = useSelector((state) => state.categories?.value);
  const [selectedCatgory, setSelectedCatgory] = useState("all");
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const category = searchParams.get("category");
  const searchTerm = searchParams.get("searchTerm");
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setSelectedCatgory(category ? category : "all");
  }, [category]);

  if (!categories.length) {
    dispatch(fetchAllCategories());
  }

  function handleCategoryChange(event) {
    const { value } = event.target;
    console.log(searchTerm);
    navigate(
      value === "all"
        ? "/"
        : `/?category=${value}${searchTerm ? "&searchterm=" + searchTerm : ""}`
    );
  }
  function handleSearchChange(searchText) {
    if (searchText) {
      navigate(
        selectedCatgory === "all"
          ? `?searchText=${searchText}`
          : `/?category=${selectedCatgory}&searchterm=${searchText}`
      );
      console.log(searchText);
    } else {
      navigate(
        selectedCatgory === "all" ? `/` : `/?category=${selectedCatgory}`
      );
    }
  }

  return (
    <Search>
      <Select
        value={selectedCatgory}
        size="small"
        sx={{
          textTransform: "capitalize ",
          m: 1,
          "&": {
            "::before": {
              ":hover": {
                border: "none",
              },
            },
            "::before, &::after": {
              border: "none",
            },
            ".MuiSelect-standard": {
              color: "common.white",
            },
            ".MuiSelect-icon": {
              // fill:"theme.palette.white"
              fill: "theme.palette.white",
            },
          },
        }}
        variant="standard"
        labelId="selected-category"
        id="selected-category-id"
        onChange={handleCategoryChange}
      >
        <MenuItem
          sx={{
            textTransform: "capitalize",
          }}
          value="all"
        >
          all
        </MenuItem>
        {categories?.map((category) => (
          <MenuItem
            sx={{ textTransform: "capitalize" }}
            key={category}
            value={category}
          >
            {category}
          </MenuItem>
        ))}
      </Select>
      <StyleAutocomplete
        freeSolo
        id="selected-product"
        value={selectedProduct}
        onChange={(e, value) => {
          handleSearchChange(value.label);
        }}
        disablePortal
        options={Array.from(
          selectedCatgory === "all"
            ? products
            : products.filter((prod) => prod.category === selectedCatgory),
          (prod) => ({ id: prod.id, label: prod.title })
        )}
        renderInput={(params) => <TextField {...params} />}
      />

      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
    </Search>
  );
}

export default function Header() {
  const { user, signOut } = useAuth();
  const cartItems = useSelector((state) => state.cart?.value);
  const count = getItemCount(cartItems);
  const [anchorEl, setanchorEl] = useState(null);
  const navigate = useNavigate();
  const isMenuOpen = Boolean(anchorEl);
  function navigateToCart() {
    navigate("/cart");
  }
  function handleProfileMenuOpen(e) {
    setanchorEl(e.currentTarget);
  }
  function handleMenuClose() {
    setanchorEl(null);
  }
  function handleProfile() {
    navigate("/profile");
  }
  async function logout() {
    await signOut();
    navigate("/login");
  }
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id="user-profile-menu"
      keepMounted
      transformOrigin={{
        horizontal: "right",
        vertical: "top",
      }}
      anchorOrigin={{
        horizontal: "right",
        vertical: "bottom",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfile}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          py: 1,
        }}
      >
        <Toolbar sx={{ display: "flex", gap: 2 }}>
          <Typography variant="h6" color="inherit">
            <StyledLink to="/">Ecomm</StyledLink>
          </Typography>
          <SearchBar />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              onClick={navigateToCart}
              size="large"
              aria-label="shows cart items count"
              color="inherit"
            >
              <Badge badgeContent={count} color="error">
                <ShoppingCartSharp />
              </Badge>
            </IconButton>
            {user ? (
              <Button color="inherit" onClick={handleProfileMenuOpen}>
                Hello,{user?.displayName ?? user.email}
              </Button>
            ) : (
              <Button color="inherit">Login</Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </>
  );
}
