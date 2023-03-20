import React, {useEffect, useState} from 'react';
import {filter} from 'lodash';
// @mui
import {
    Card,
    Table,
    Stack,
    Button,
    TableRow,
    MenuItem,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination,
} from '@mui/material';
// components
import axios from "axios";
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import AdminUserListHead from './AdminUserListHead';
import AdminBoardModalUpdatePage from './AdminBoardModalUpdatePage ';
import AdminBoardModalRead from './AdminBoardModalRead';

import {removeCookieToken} from "src/member/storage/Cookie";
import {useNavigate} from "react-router-dom";

// @DashBoard - app - AppNewsUpdate.js 로 들어감 
const AdminBoard = () => {

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function applySortFilter(array, comparator, query) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        if (query) {
            return filter(array, (_admin) => _admin.adminBoardSeq.toLowerCase().indexOf(query.toLowerCase()) !== -1);
        }
        return stabilizedThis.map((el) => el[0]);
    }

  // NEWS HEAD 
  const TABLE_HEAD = [
    // { id: '' },
    { id: 'adminBoardSeq', label:'NO.',alignRight: false  },
    { id: 'title', label: 'TITLE', alignRight: false },
    { id: 'content', label: 'CONTENT', alignRight: false },
    {id:'내용보기', label: 'BOARD', alignRight: false},
    { id: 'ect', label: 'ETC..', alignRight: false },
    // { id: '' },
  ];
 	 const [open, setOpen] = useState(null);

    const [page, setPage] = useState(0);

    const [adminList, setAdminList] = useState([])

    const [order, setOrder] = useState('desc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('adminBoardSeq');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [adminKeyword, setAdminKeyword] = useState('')
    const [adminSearchOption, setAdminSearchOption] = useState('title')

    const [adUpSeq, setAdUpSeq] = useState('')

    const date = new Date()
    const selectedDate = new Date()


    //  게시판 시간 (수정해야함)
    const getTime = (logtime) => {
        //  const year = date.getFullYear(logtime)
        //  const month = date.getMonth(logtime)+1
        //  const day = date.getDate(logtime)
        //  return `${year}/${month}/${day}`

    }

    const accessToken = localStorage.getItem("accessToken");

    const navi = useNavigate();

    // AdminBoard 리스트 출력
    useEffect(() => {
        axios.get('https://jjh.herokuapp.com/adminBoard/adminBoardList', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then((res) => {
                setAdminList(res.data)
            })
            .catch(error => {
                console.log(error.response);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('expireTime');
                removeCookieToken();
                alert("관리자 권한이 없습니다");
                navi("/");
            })

    }, [])

    // AdminBoard 리스트 검색
    const onAdminSearch = (e) => {
        e.preventDefault();
        axios.get('https://jjh.herokuapp.com/adminBoard/adminBoardSearch', {
            params: {
                adminSearchOption,
                adminKeyword
            }
        })
            .then(res => setAdminList(res.data))
            .catch(error => console.log(error))
    }

    // AdminBoard 게시판 삭제
    const onDeleteBoard = (boardSeq) => {
        const boardSeqList = adminList.filter((item) => item.adminBoardSeq !== boardSeq);
        setAdminList(boardSeqList);
        axios.delete(`https://jjh.herokuapp.com/adminBoard/adminBoardDelete?adminBoardSeq=${boardSeq}`)
            .then(() => {
                alert('삭제 완로')
            })
            .catch(error => console.log(error))
    }

    const BoardAdminList = adminList.filter(item => [{
        adminBoardSeq: item.adminBoardSeq,
        title: item.title,
        content: item.name,
        logtime: item.logtime,
        status: 'success',
    }]);

    const handleOpenMenu = (event) => {
        setAdUpSeq(event.target.id)
        setOpen(event.currentTarget);

    };

    const handleCloseMenu = () => {
        setOpen(null);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = BoardAdminList.map((e) => e.adminBoardSeq);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };


    const handleClick = (event, adminBoardSeq) => {
        const selectedIndex = selected.indexOf(adminBoardSeq);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, adminBoardSeq);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - BoardAdminList.length) : 0;

    const filteredUsers = applySortFilter(BoardAdminList, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredUsers.length && !!filterName;

    return (
    <>
      <Container >
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            <p/>
            NEWS
          </Typography>
        </Stack>
        <Card >
          <Scrollbar>
            <TableContainer sx={{ maxWidth: 700 ,maxHeight:280}}>
              <Table>
                <AdminUserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={BoardAdminList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const {adminBoardSeq,title,content,logtime } = row;
                    const selectedAdmin = selected.indexOf(adminBoardSeq) !== -1;

                    return (

                      <TableRow hover key={adminBoardSeq} id={adminBoardSeq} value={adminBoardSeq} tabIndex={-1} role="checkbox" selected={selectedAdmin} 
                      >
                        {/* <TableCell padding="checkbox"> */}
                          {/* 지우지 않기 (칸 망가짐... ㅠㅠ) */}
                          {/* <Checkbox
                           checked={selectedAdmin} onChange={(event) => handleClick(event, adminBoardSeq)} /> */}
                        {/* </TableCell> */}

                        <TableCell component="th" scope="row" padding="none" >
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap/>
                          </Stack>
                        </TableCell>
                        
                        {/* NEWS 리스트 라인 화 면 출력  */}
                        {/* adminBoardSeq */}
                        <TableCell align="left">{adminBoardSeq}</TableCell>
                        
                        {/* title */}
                        <TableCell align="left">{title}</TableCell>

                        {/* content */}
                        <TableCell align="left">{content}</TableCell>

                        {/* 내용 보기 */}
                        <TableCell align="left" id={adminBoardSeq}><AdminBoardModalRead/></TableCell>

                        {/* 시간  */}
                        {/* <TableCell align="left">{logtime}</TableCell> */}
                        {/* <TableCell align="left">{getTime(logtime)}</TableCell> */}

                          <MenuItem id={adminBoardSeq}  style={{fontSize:12,width:100}}  onClick={handleOpenMenu}>
                            <Iconify icon={'eva:edit-fill'}  sx={{ mr: 2 }}/>                           
                            <AdminBoardModalUpdatePage props={adUpSeq}/>
                          </MenuItem>
                            <MenuItem style={{fontSize:12,width:100}}
                            sx={{ color: 'error.main' }} onClick={ () => { if (window.confirm(`${adminBoardSeq}번 게시글을 삭제하시겠습니까?`)){ onDeleteBoard(adminBoardSeq); }} }  >
                          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                             Delete
                          </MenuItem>    
                    </TableRow>
                    );

                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>

          {/*  search  */}
          <div id="adminBoardListForm" style={{width: '450px',margin:'30px', align:'left'}}>
           <form id="searchForm" style={{textAlign:'left',width:400}}>
           
            {/* title 또는 content로 찾을 수 있는 박스 */}
            {/* <select  style={{width:120, height:30, textAlign:'center'}} name="adminSearchOption" onChange={e => setAdminSearchOption(e.target.value)}>
              <option id="adminTitle "value="title">TITLE</option>
              <option id="adminContent" value="content">CONTENT</option>
             </select>&nbsp; */}
              <input type="text" name="adminKeyword" value={adminKeyword} onChange={e => setAdminKeyword(e.target.value)}
              placeholder='Search Board..'style={{width:200}}
              />&nbsp;
              
            <Button onClick={onAdminSearch}>Search</Button>
           </form>
          </div>
  
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={BoardAdminList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>


    </>
  );
}
export default AdminBoard;