import Header from './Header';
import './Layout.css'
const Layout = (props) => {
    return (
        <>
            <p className='topbaner01'>
                <img src="https://adimg.cgv.co.kr/images/202212/PussinBoots/1228_980x80.jpg" alt="장화신은고양이2" border="0" />
            </p>
            <Header />
            {props.children}
            
        </>
    );
};

export default Layout;
