import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppNewsUpdate,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

const DashboardAppPage = () => {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> BIT BOX | ADMIN</title>
      </Helmet>

      <Container maxWidth="xl">

        <Grid container spacing={3}>

          {/*   막대 그래프 기존 타이틀 : Website Visits */}
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Information"
              subheader="(+43%) than last year"
              chartLabels={[   
                '02/01/2022',
                '03/01/2022',
                '04/01/2022',
                '05/01/2022',
                '06/01/2022',
                '07/01/2022',
                '08/01/2022',
                '09/01/2022',
                '10/01/2022',
                '11/01/2022',
                '12/01/2022',
                '01/01/2023',
                '02/01/2023'
                
              ]}
              chartData={[
                {
                  name: '총 관람객 수',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 41,51],
                },
                {
                  name: '스토어 상품 판매량',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43,48],
                },
                {
                  name: '영화 개봉 개수',
                  type: 'line',
                  fill: 'solid',
                  data: [15, 25, 18, 30, 33, 41, 34, 52, 48, 36, 33,44],
                },
              ]}
            />
          </Grid>

          {/* 원 그래프  기존 타이틀: Current Visits*/}
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Reservation rate"
              chartData={[
                { label: '아바타: 물의 길', value: 5344 },
                { label: '더 퍼스트 슬램덩크', value: 3835 },
                { label: '교섭', value: 2443 },
                { label: '유령', value: 1443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          {/* 막대만 있는 그래프  기존 타이틀 : Conversion Rates */}
          <Grid item xs={12} md={6} lg={6}>
            <AppConversionRates
              title="TOTAL"
              subheader="(+43%) than last year"
              chartData={[
                { label: '천룡팔부-교봉전', value: 400 },
                { label: '3000년의 기다림', value: 430 },
                { label: '해시태그 시그네', value: 448 },
                { label: '장화신은 고양이-끝내주는 모험', value: 470 },
                { label: '유량의 달', value: 540 },
                { label: '라일 라일 크로커다일', value: 580 },
                { label: '유령', value: 690 },
                { label: '더 퍼스트 슬램덩크', value: 1000 },
                { label: '교섭', value: 1100 },
                { label: '아바타 : 물의 길', value: 1580 },
              ]}
            />
          </Grid>

          {/* 공지사항  NEWS(AdminBoard) */}
          <Grid item xs={12} md={4} lg={6}>
            <AppNewsUpdate
              title="NEWS"
              list={[...Array(1)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
export default DashboardAppPage;
