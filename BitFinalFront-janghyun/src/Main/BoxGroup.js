import Box from './Box';

const BoxGroup = (props) => {

    return (
        <ul>
            
            {props.movieList.map((movie, idx) =>
                <Box key={idx} movie={movie} />
            )}
            
        </ul>
    );
};

export default BoxGroup;
