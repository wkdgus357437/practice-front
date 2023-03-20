import axios from 'axios';
import React, { useState } from 'react';

// 게시글 쓰기 .. AdminBoardModalPage.js .. AdminModal.js .. 
const AdminBoardWrite = () => {

  const [form, setForm] = useState({
    title:'',
    content:''
  })

  const {title,content} = form

  const [titleDiv, setTitleDiv] = useState('')
  const [contentDiv, setContentDiv] = useState('')

  const onInput = (e) => {
 const {name, value} = e.target
 setForm({
  ...form,
  [name] : value
 })

  }

  // 게시글 유효성 검사 .. 
  const onWriteSubmit = (e) => {
    e.preventDefault();

     let sw = 1;

    if (!title){
      setTitleDiv('제목을 입력하세요.')
      sw = 0
    }
    if(!content){
      setContentDiv('내용을 입력하세요.')
      sw= 0
    }
    if(sw === 1){
      axios.post( "https://jjh.herokuapp.com/adminBoard/adminBoardWrite",null,{params:form})
      .then(()=>{
         alert('작성 완료')
        window.location.reload()
      })
      .catch(error => console.log(error))
    }
  }
  const onReset = (e) => {
    e.preventDefault();
  setForm({
    title:'',
    content:''
  })
  }

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
              <td> <input style={{width:250}} type="text" name="title" value={title} onChange={onInput}/>
                   <div id="titleDiv" style={{color:'red',fontSize:12,textAlign:'right'}}>{titleDiv}</div>
              </td>
            </tr>

           <tr>
              <td style={{textAlign:'left'}}>Content</td> 
            <td > 
               <textarea style={{width:250,height:200}} name='content' value={content} onChange={onInput}/>
                 <div id="contentDiv" style={{color:'red',fontSize:12,textAlign:'right'}}>{contentDiv}</div>
            </td>
          </tr>
               <br/>
          <tr >
          <td colSpan="2" align="right">
              <button style={{all:'unset',color:'black'}} onClick={onWriteSubmit}>등록</button> 
            &emsp;&emsp;
              <button style={{all:'unset',color:'blue'}} onClick={onReset}>다시 작성</button>
            &emsp;&emsp;
              <button style={{all:'unset',color:'red'}} onClick={onClose}>취소</button>
           </td>
          </tr>
        </tbody>
      </table>
    </form>
    </>
  );
};

export default AdminBoardWrite;