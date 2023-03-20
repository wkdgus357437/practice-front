import axios from 'axios';
import React, { useEffect, useState } from 'react';


// 게시글 수정하기 
const AdminBoardUpdate = (props) => {
  // const as = props.adUpSeq1;
  
  const [title2,setTitle2] = useState('')
  const [content2,setContent2] = useState('')

  
  const [form, setForm] = useState({
    title:'',
    content:''
  })
  
  const {title,content} = form
  
  const [titleDiv, setTitleDiv] = useState('')
  const [contentDiv, setContentDiv] = useState('')
  
  const onInput = (e) => {
    const{name, value} = e.target
    setForm({
      ...form,
      [name] : value
    })
  }

  // 수정 하기전 데이터 가져오기 
  useEffect(()=>{
    axios.get(`https://jjh.herokuapp.com/adminBoard/getAdminBoard?adminBoardSeq=${props.props}`)
        .then(res=>{
          // setTitle2(res.data.title)
          // setContent2(res.data.content)
          // setForm(res.data)
          setForm({
            adminBoardSeq: res.data.adminBoardSeq,
            title:res.data.title,
            content:res.data.content,
            // logtime:res.data.logtime
          })
        })
        .catch(error => console.log(error))
  },[])


  // 게시글 업로드 (수정 ) 
  const onUpdateSubmit = (e) => {
    e.preventDefault();
      console.log(form)
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
      axios.put( "https://jjh.herokuapp.com/adminBoard/adminBoardUpdate",null,{params:form})
      .then(()=>{
         alert('수정 완료')
        window.location.reload()
      })
      .catch(error => console.log(error))
    }
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
              <td> 
                <input style={{width:250}}  type="text" name="title"  id={title}  value={title} onChange={onInput}/>
                <div id="titleDiv" style={{color:'red',fontSize:12,textAlign:'right'}}>{titleDiv}</div>
              </td>
            </tr>

          <tr>
             <td style={{textAlign:'left'}}>Content</td> 
            <td> 
              <textarea style={{width:250,height:200}} name='content' id={content}  value={content} onChange={onInput}/>
              <div id="contentDiv" style={{color:'red',fontSize:12,textAlign:'right'}}>{contentDiv}</div>
              </td>
          </tr>

          <tr >
            <td colSpan="2" align="right">
             <button style={{all:'unset', color:'black'}} onClick={onUpdateSubmit}>수정</button> 
             &emsp;&emsp;
            <button style={{all:'unset', color:'red'}} onClick={onClose}>취소</button>
           </td>
          </tr>

        </tbody>
      </table>
    </form>
    </>
  );
};

export default AdminBoardUpdate;