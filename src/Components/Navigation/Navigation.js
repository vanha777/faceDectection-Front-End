

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import './Navigation.css';
import { MotionConfig } from 'framer-motion';
import { motion } from "framer-motion"

export default function Navigation({ isSignedIn, onRouteChange }) {
    if (isSignedIn === true) {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar className='nav1' position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            EAZY.
                        </Typography>
                        <Button onClick={() => onRouteChange('signin')} color="inherit">Sign Out</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        );
    } else {
        return (
            <motion.div sx={{ flexGrow: 1 }} initial={{ y:-100}} animate={{ y: 40}}
                transition={{ ease: "easeOut", duration: 1 }}>
                <AppBar className='nav1' position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            EAZY.
                        </Typography>
                        <Button onClick={() => onRouteChange('register')} color="inherit">Register</Button>
                        <Button onClick={() => onRouteChange('signin')} color="inherit">Sign In</Button>
                    </Toolbar>
                </AppBar>
            </motion.div>
        )
    }
}