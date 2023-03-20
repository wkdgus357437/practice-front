import React, { useState } from 'react';
import { Button } from '@mui/material';
import AdminBoardUpdate from './AdminBoardUpdate';
import AdminModal from './AdminModal';


// 게시글 수정하기 .. AdminBoardUpdate.js 
function AdminBoardModalUpdatePage(props){
  const [modalOpen, setModalOpen] = useState(false);

  const [adUpSeq1, setAdUpSeq1] = useState([])

  const openModal = (e) => {
    const seq = e.target.parentNode.id
    console.log(seq)
    setAdUpSeq1(seq)
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };


  return (
    <>
    <button style={{ all:'unset',color:'blue',fontSize:12}} onClick={openModal}>Modify</button>
    <AdminModal open={modalOpen} close={closeModal} header="게시글 수정">
   <AdminBoardUpdate  props={adUpSeq1}/>
    </AdminModal> 
  </>
  );
};

export default AdminBoardModalUpdatePage;