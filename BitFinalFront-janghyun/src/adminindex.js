import React from 'react';
import DashboardLayout from "./Admin/layouts/dashboard";
import {StyledChart} from "./Admin/components/chart";
import ScrollToTop from "./Admin/components/scroll-to-top";
import ThemeProvider from "./Admin/theme";
// ----------------------------------------------------------------------

const  Adminindex = () => {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      <DashboardLayout/>
    </ThemeProvider>
  );
}
export default Adminindex;