import { useState } from 'react';
import { Link } from 'react-router-dom';

import noneIcon from './img/grade-none.png';
import allIcon from './img/grade-all.png';
import twelveIcon from './img/grade-12.png';
import fifteenIcon from './img/grade-15.png';
import onlyAdultIcon from './img/grade-19.png';
import starIcon from './img/star.png';

const Box = (props) => {
    const [movie] = useState(props.movie);

    const ratingIcons = {
        NONE: noneIcon,
        ALL: allIcon,
        TWELVE: twelveIcon,
        FIFTEEN: fifteenIcon,
        ONLY_ADULT: onlyAdultIcon
    };

    const ratingAlts = {
        NONE: '미정',
        ALL: '전체 이용가',
        TWELVE: '12세 이용가',
        FIFTEEN: '15세 이용가',
        ONLY_ADULT: '19세 이용가'
    };

    return (

        
        <li>
            

            <div className="movie-poster">
                {/* <img src={movie.posterUrl} alt={movie.title} /> */}
                <img src={ratingIcons[movie.rating]} alt={ratingAlts[movie.rating]} />
                <div>
                    {/* <Link to={'/movie/detail?id=' + movie.id}>상세보기</Link> */}
                    <Link to="/">예매하기</Link>
                </div>
            </div>
            <div className="movie-info">
                <div>{movie.title}</div>
                <div>
                    <div>
                        <img src={starIcon} alt="별" />
                        <span>{movie.reviewStarAvg.toFixed(1)}</span>
                    </div>
                    <div>예매율 {(movie.ticketRatio * 100).toFixed(1)}%</div>
                </div>
            </div>

        
        </li>
    );
};

export default Box;
