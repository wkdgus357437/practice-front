import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import ApprovalIcon from '@mui/icons-material/Approval';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useNavigate} from "react-router-dom";


const theme = createTheme();

const AuthPopUpPage = () => {

    const navi = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const {IMP} = window;
        IMP.init('imp10391932');


    }
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <img src="../../img_member/mainLogo.png" alt="logo" width="50%"/>
                        <Avatar sx={{m: 1, backgroundColor: "#B20710"}}>
                            <ApprovalIcon fontSize={"large"} style={{backgroundColor: "#B20710"}}/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            본인인증이 필요합니다
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>

                            <Button
                                id="joinBtn"
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2, backgroundColor: "#B20710"}}
                            >
                                본인인증 하러가기
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
};

export default AuthPopUpPage;