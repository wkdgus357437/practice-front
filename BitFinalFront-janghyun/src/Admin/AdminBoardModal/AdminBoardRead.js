import axios from 'axios';
import React, { useEffect, useState } from 'react';

// 게시글 확인 AdminBoardModalRead.js .. 

const AdminBoardRead = (props) => {
  
  const [form, setForm] = useState({
    title:'',
    content:''
  })
  
  const {title,content} = form

  // 찾기
  useEffect(()=>{
    axios.get(`https://jjh.herokuapp.com/adminBoard/getAdminBoard?adminBoardSeq=${props.props}`)
        .then(res=>{
          setForm({
            adminBoardSeq: res.data.adminBoardSeq,
            title:res.data.title,
            content:res.data.content,
          })
        })
        .catch(error => console.log(error))
  },[])

  const onClose = (e) => {
    e.preventDefault();
   window.location.reload()
  }

  return (
    <>
    <form >
       <table style={{width:330}}>
        <tbody>
           <tr> 
           <td style={{textAlign:'left',textDecorationColor:'black',width:80,fontSize:15}}>Title</td>
              <td> 
                <input style={{width:250}}  type="text" name="title"  id={title}  value={title} readOnly/>
              </td>
            </tr>

          <tr>
             <td style={{textAlign:'left'}}>Content</td> 
            <td> 
              <textarea style={{width:250,height:200}} name='content' id={content}  value={content} readOnly/>
              </td>
          </tr>

          <tr >
            <td colSpan="2" align="right">
             &emsp;&emsp;
            <button style={{all:'unset',color:'red'}} onClick={onClose}>닫기</button>
           </td>
          </tr>

        </tbody>
      </table>
    </form>
    </>
  );
};

export default AdminBoardRead;