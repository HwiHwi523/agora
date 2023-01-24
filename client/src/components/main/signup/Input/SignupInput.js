import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import CustomTextInput from './NameInput';
import NickNameInput from './NickNameInput';
import BirthInput from './BirthInput';
import PhoneNumInput from './PhoneNumInput';
import ImageInput from './ProfileImgInput';

import { SubText } from '../content/ContentBox';

const theme = createTheme({
  palette: {
    custom: {
      main: "#F6C026"
    },
    button: {
      fontStyle: 'italic',
    }
  },
});

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      nickName: data.get('nickName'),
      name: data.get('name'),
      profileImage: data.get('profileImage')
    });
    console.log({data})
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <SubText>
                  필수 정보를 입력해 주세요
                </SubText>
              </Grid>
              <CustomTextInput color="custom"/>
              <NickNameInput color="custom"/>
              <BirthInput color="custom"/>
              <PhoneNumInput color="custom"/>
            </Grid>
            <ImageInput color="custom"/>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, height: 55, color: '#ffffff', fontWeight: 'bold', fontSize: 20 }}
              color="custom"
            >
              완료 후 계속
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}