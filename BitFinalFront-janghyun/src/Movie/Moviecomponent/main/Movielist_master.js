import React from 'react';
import { Link } from 'react-router-dom'

const Movielist_master = () => {
    return (
        <div>
            <h3>*** 메인화면 ***</h3>
            <hr/>
            <p><Link to="/master/write">입력</Link></p>
            <p><Link to="/master/list">출력</Link></p>
            <p><Link to="/master/delete">삭제</Link></p>
        </div>

    );

    
};

export default Movielist_master;