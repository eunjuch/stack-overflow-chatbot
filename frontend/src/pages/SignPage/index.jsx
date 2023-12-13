import { useState } from 'react';
import * as S from './index.styles.js';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@material-ui/core';
import { SignIn, SignUp } from '../../components/Sign/index.jsx';

const SignPage = () => {
  const [tabValue, setTabValue] = useState("1");

  const handleTabChange = (e, value) => {
    setTabValue(value);
  }
  return (
    <>
      <div style={{ width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <S.SignWrapper>
          <TabContext value={tabValue} >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleTabChange} TabIndicatorProps={{
                style: {
                  backgroundColor: "#F0F0F0"
                }
              }}>
                <Tab label="Sign In" value="1" />
                <Tab label="Sign Up" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <SignIn />
            </TabPanel>
            <TabPanel value="2">
              <SignUp />
            </TabPanel>
          </TabContext>
        </S.SignWrapper>
      </div>
    </>
  )
}

export default SignPage;