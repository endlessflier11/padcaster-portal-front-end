import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Image from 'next/image';
import { useRouter } from "next/router";
import styles from './ForgotPasswordForm.module.scss';
import ImageLoader from "../ImageLoader";
import { UserContext } from "../../contexts/UserContext";

export default function ForgotPasswordForm() {
  const { forgotPassword, resetPassword } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const router = useRouter();

  const resetCode = router.query?.resetCode

  const handleResetPassword = (event) => {
    event.preventDefault();
    console.log({ resetPassword: password, resetCode })
    resetPassword(resetCode, password)
  };

  const handleForgotPassword = (event) => {
    event.preventDefault();
    console.log({ handleForgotPassword: email })
    forgotPassword(email);
  };

  return (
    <div>
      {error ? <Alert severity="error">{error}</Alert> : null}

      {resetCode ?
        <form className={styles.form} onSubmit={handleResetPassword}>
          <p className={styles.title}>Create a new password:</p>

          <FormControl
            required
            className={styles.formControl}
          >
            <label htmlFor="password">Password</label>
            <TextField
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              name="password"
              type="password"
              variant="outlined"
            />
          </FormControl>

          <FormControl
            required
            className={styles.formControl}
          >
            <label htmlFor="password">Password Confirmation</label>
            <TextField
              value={passwordConfirmation}
              onChange={(event) => {
                setPasswordConfirmation(event.target.value);
              }}
              name="password"
              type="password"
              variant="outlined"
            />
          </FormControl>

          <LoadingButton
            type="submit"
            disabled={!email}
            loading={loading}
            variant="contained"
            size="large"
            className={styles.submitButton}
          >
            Create Password
          </LoadingButton>
        </form>
        :
        <form className={styles.form} onSubmit={handleForgotPassword}>
          <FormControl
            required
            className={styles.formControl}
          >
            <label htmlFor="email">Email</label>
            <TextField
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              id="email"
              name="email"
              type="email"
              variant="outlined"
            />
          </FormControl>

          <LoadingButton
            type="submit"
            disabled={!email}
            loading={loading}
            variant="contained"
            size="large"
            className={styles.submitButton}
          >
            Email Reset Link
          </LoadingButton>
        </form>
      }
    </div>

  );
}
