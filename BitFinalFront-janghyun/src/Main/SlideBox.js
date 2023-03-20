import { useState, useEffect } from 'react';
import { getTwentyMovies } from './services/movies';
import BoxGroup from './BoxGroup';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SlideBox = (props) => {
    const [page, setPage] = useState(0);
    const [movieList, setMovieList] = useState([]);

     const fetchData = async () => {
        setMovieList(await getTwentyMovies());
     };

     useEffect(() => {
         fetchData();
     }, []);

    const bodyStyle = getComputedStyle(document.body);
    const boxWidth = bodyStyle.getPropertyValue('--boxWidth').slice(0, -2) * 1;
    const boxSpace = bodyStyle.getPropertyValue('--boxSpace').slice(0, -2) * 1;
    const boxNum = bodyStyle.getPropertyValue('--boxNum') * 1;
    const boxGroupWidth = boxNum * (boxWidth + boxSpace);

    const totalPage = Number((movieList.length - 1) / boxNum);

    const slideBoxLeft = () => {
        setPage(page - 1);
    };

    const slideBoxRight = () => {
        setPage(page + 1);
    };

    return (
        <section>
            <div id="poster-box">
                <div style={{marginLeft: `${-1 * page * boxGroupWidth}px`}}>
                    <BoxGroupList movieList={movieList} chunkSize={boxNum} />
                </div>
            </div>
             <div role="button" tabIndex={0} aria-label="Previous Movie" onKeyDown={slideBoxLeft} id="movie-prev-btn" className={page > 0 ? 'active' : ''}/>
             <div role="button" tabIndex={0} aria-label="Previous Movie" onKeyDown={slideBoxRight} id="movie-next-btn" className={page < totalPage ? 'active' : ''} />

        
        </section>
        
        
    );
};

const BoxGroupList = (props) => {
    const len = props.movieList.length;
    const chunckSize = props.chunkSize;

    const chunkedList = [];
    for (let i = 0; i < len; i += chunckSize) {
        const end = (i + chunckSize) < len ? (i + chunckSize) : len;
        chunkedList.push(props.movieList.slice(i, end));
    }

    return chunkedList.map((chunk, idx) =>
        <BoxGroup key={idx} movieList={chunk} />
    );
};

export default SlideBox;
