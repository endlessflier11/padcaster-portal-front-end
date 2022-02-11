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
import Link from 'next/link';
import { useRouter } from "next/router";
import styles from './LoginForm.module.scss';
import ImageLoader from "../ImageLoader";
import { UserContext } from "../../contexts/UserContext";

export default function LoginForm() {
  const { devLogin, loggingIn } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(process.env.ADMIN_USERNAME);
  const [password, setPassword] = useState(process.env.ADMIN_PASSWORD);
  const router = useRouter();

  const loading = loggingIn;

  // TODO: Add error handling
  const handleSubmit = (event) => {
    event.preventDefault();
    devLogin(email, password, router.query.returnUrl || "/");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error ? <Alert severity="error">{error}</Alert> : null}

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
      <p className={styles.forgotPassword}>
        <Link href="/auth/forgot-password" passHref>
          <Button size="small" variant="text">Forgot password?</Button>
        </Link>
      </p>

      <LoadingButton
        type="submit"
        disabled={!email || !password}
        loading={loading}
        variant="contained"
        size="large"
        className={styles.submitButton}
      >
        Sign In
      </LoadingButton>

      {/* <p className={styles.signUp}>
        Don&apos;t yet have an account? <Link href="/auth/signup" passHref><Button size="small" variant="text">Create one</Button></Link>
      </p> */}
    </form>
  );
}
