// @mui
import PropTypes from 'prop-types';
import { Box, Card, Button} from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import AdminBoardModalPage from '../../../AdminBoardModal/AdminBoardModalPage'
import AdminBoard from '../../../AdminBoardModal/AdminBoard';

// ----------------------------------------------------------------------

AppNewsUpdate.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

// 공지사항 틀
export default function AppNewsUpdate({ ...other }) {

  return (
    <Card  {...other} >
      {/* updatenews adminboard - list */}
      <Box sx={{ p: 1, textAlign: 'right' }} height={450} >
      <AdminBoard/>
        <Button  size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'}/>}>
        <AdminBoardModalPage/>
        </Button>
      </Box>
    </Card>
  );
}
