import React, { useEffect, useState } from 'react';
import styles from '../css/Movielist.css';
import Movielist_tab01 from '../nav/Movielist_tab01.js';
import Movielist_tab02 from '../nav/Movielist_tab02.js';
import Movielist_tab03 from '../nav/Movielist_tab03.js';
import Movielist_tab04 from '../nav/Movielist_tab04.js';
import Movielist_tab05 from '../nav/Movielist_tab05.js';
import Layout from 'src/Main/Layout';
import Footer from 'src/Main/Footer';


const Movielist = () => {

		const [selected, setSelected] = useState('boxoffice')
		const Movielist = (e) => {
			
			console.log(e.target.id)
			setSelected(e.target.id)
		}

    return (
		
		<>
		<Layout>
		<div className='Movielistmain_all'>
			<div className="Movielistmain_header">
				<h3 className="Movielistmain_header_title">전체영화</h3>
				<div className="Movielistmain_container">
					<ul className="Movielistmain_tab">
						<li><button type="button" className={selected==='boxoffice'? 'Movielist_selected':'Movielist_non-selected'} id='boxoffice' onClick={(e) => Movielist(e)}>박스오피스</button></li>
						<li><button type="button" className={selected==='scheduled'? 'Movielist_selected':'Movielist_non-selected'} id='scheduled' onClick={(e) => Movielist(e)}>상영예정작</button></li>
						<li><button type="button" className={selected==='special'? 'Movielist_selected':'Movielist_non-selected'} id='special' onClick={(e) => Movielist(e)}>특별상영</button></li>
						<li><button type="button" className={selected==='filmsociety'? 'Movielist_selected':'Movielist_non-selected'} id='filmsociety' onClick={(e) => Movielist(e)}>필름소사이어티</button></li>
						<li><button type="button" className={selected==='classicsociety'? 'Movielist_selected':'Movielist_non-selected'} id='classicsociety' onClick={(e) => Movielist(e)}>클래식소사이어티</button></li>

					</ul>

				</div>
			</div>

				{
					selected === "boxoffice" ? <Movielist_tab01/>:
					selected === "scheduled" ? <Movielist_tab02/>:
					selected === "special" ? <Movielist_tab03/>:
					selected === "filmsociety" ? <Movielist_tab04/>:
					selected === "classicsociety" ? <Movielist_tab05/>:false
				}
		</div>
		</Layout>
		<Footer/>
		
		</>
    );
};



export default Movielist;
