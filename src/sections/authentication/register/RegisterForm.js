/* eslint-disable */

import * as Yup from 'yup';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button
} from '@mui/material';
// import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { LoadingButton } from '@mui/lab';
import _ from 'lodash';
// component
import Iconify from '../../../components/Iconify';
// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const axios = require('axios');

  const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': '*'
};

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    company: Yup.string().required('Company is required'),
    tagid: Yup.string().required('TagID is required'),
    ethnicity: Yup.string().required('Ethnicity is required'),
    username: Yup.string().required('Username is required'),
    gender: Yup.string().required('Gender is required')
  });

  const addUsers = async (userObject) => {
    try {
      const response = await axios.post('https://express-vercel-rho-ecru.vercel.app/registeruser',userObject,{
        mode: 'cors',
        headers: headers
    });
    console.log(response)
      if(response){
        navigate('/dashboard', { replace: true });
      }
      else{
        navigate('/register', { replace: true });
      }
    
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      company: '',
      online: 0,
      tagid: '',
      hours: 0,
      temperature: 25,
      role: 1,
      gender: 0,
      ethnicity: '',
      accessType: 1,
      status: 0,
      username: '',
      biometricId: '0000000',
      faceId: '999999'
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      const registrationObject = {
        tenantID: 5,
        firstName: {...getFieldProps('firstName')}.value,
        lastName: {...getFieldProps('lastName')}.value,
        email: {...getFieldProps('email')}.value,
        password: {...getFieldProps('password')}.value,
        company: {...getFieldProps('company')}.value,
        online: 0,
        tagid: {...getFieldProps('tagid')}.value,
        hours: 0,
        temperature: 25,
        role: 1,
        gender: 0,
        ethnicity: {...getFieldProps('ethnicity')}.value,
        accessType: 1,
        status: 0,
        username: {...getFieldProps('username')}.value,
        biometricId: '0000000',
        faceId: '999999'
      };
      console.log("Values: ", registrationObject);
      addUsers(registrationObject);
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  const Input = styled('input')({
    display: 'none'
  });

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="company"
            label="Company"
            {...getFieldProps('company')}
            error={Boolean(touched.company && errors.company)}
            helperText={touched.company && errors.company}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Tag ID"
              {...getFieldProps('tagid')}
              error={Boolean(touched.tagid && errors.tagid)}
              helperText={touched.tagid && errors.tagid}
            />

            <TextField
              fullWidth
              label="Ethnicity"
              {...getFieldProps('ethnicity')}
              error={Boolean(touched.ethnicity && errors.ethnicity)}
              helperText={touched.ethnicity && errors.ethnicity}
            />
          </Stack>

          <TextField
            fullWidth
            label="Username"
            {...getFieldProps('username')}
            error={Boolean(touched.username && errors.username)}
            helperText={touched.username && errors.username}
          />

          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              {...getFieldProps('gender')}
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>

          {/* <Stack direction="row" alignItems="center" spacing={2}>
            <Input accept="image/*" id="contained-button-file" multiple type="file" />
            <Button variant="contained" component="span">
              Upload
            </Button>
            <Input accept="image/*" id="icon-button-file" type="file" />
            <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
          </Stack> */}

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Add User
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
