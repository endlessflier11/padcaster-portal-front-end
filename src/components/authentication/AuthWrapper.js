import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  TextField,
} from "@mui/material";
import Image from 'next/image';
import styles from './AuthWrapper.module.scss';
import ImageLoader from "../ImageLoader";

export default function AuthWrapper({ children }) {
  return (
    <div className={styles.container}>
      <Box className={styles.image}>
        <Image
          src="/images/login-image.jpg"
          alt="Padcaster promotional image"
          loader={ImageLoader}
          layout="fill"
          unoptimized={true}
          objectFit="cover"
        />
      </Box>
      <Box className={styles.content}>
        <div className={styles.form}>
          <div className={styles.logo}>
            <Image
              src="images/logo.png"
              alt="Padcaster logo"
              loader={ImageLoader}
              width={480}
              height={86}
            />
            <p className={styles.tagline}>Cloud-based asset management to make your video workflow faster and easier.</p>
          </div>
          {children}
        </div>
      </Box>
    </div>
  );
}
