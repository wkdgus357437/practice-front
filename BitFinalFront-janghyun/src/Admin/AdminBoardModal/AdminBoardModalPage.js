import { Button } from '@mui/material';
import React, { useState } from 'react';
import AdminBoardWrite from './AdminBoardWrite';
import AdminModal from './AdminModal';

// 게시글 작성하기 .. AdminBoardWrite.js 
function AdminBoardModalPage(){
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
    <Button style={{color:'green'}} onClick={openModal}>Write</Button>
    <AdminModal open={modalOpen} close={closeModal} header="공지사항 & 게시판">
   <AdminBoardWrite/>
    </AdminModal>
  </>
  );
};

export default AdminBoardModalPage;