import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function ProductList({ products, list,movieDelete,...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {console.log(list)}
      {list.map((list,index) => (
        <Grid key={list.id} item xs={12} sm={6} md={3}>
          <ShopProductCard list={list} movieDelete={movieDelete}/>
        </Grid>
      ))}
    </Grid>
  );
}
