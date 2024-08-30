// import React from 'react';
// import { AppBar, Toolbar, Typography, IconButton, InputBase, Button, Box } from '@mui/material';
// import { Search, Facebook, YouTube, Instagram } from '@mui/icons-material';
// import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//     textAlign: 'center',
//     fontSize: '24px',
//     fontWeight: 'bold',
//   },
//   toolbar: {
//     display: 'flex',
//     justifyContent: 'space-between',
//   },
//   icons: {
//     display: 'flex',
//     gap: theme.spacing(1),
//   },
//   search: {
//     position: 'relative',
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: theme.palette.common.white,
//     marginRight: theme.spacing(2),
//     marginLeft: 0,
//     width: 'auto',
//   },
//   searchIcon: {
//     padding: theme.spacing(0, 2),
//     height: '100%',
//     position: 'absolute',
//     pointerEvents: 'none',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   inputRoot: {
//     color: 'inherit',
//   },
//   inputInput: {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//   },
// }));

// const Header = () => {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <AppBar position="static" color="default">
//         <Toolbar className={classes.toolbar}>
//           <Box className={classes.search}>
//             <div className={classes.searchIcon}>
//               <Search />
//             </div>
//             <InputBase
//               placeholder="Search…"
//               classes={{
//                 root: classes.inputRoot,
//                 input: classes.inputInput,
//               }}
//               inputProps={{ 'aria-label': 'search' }}
//             />
//           </Box>
//           <Typography variant="h6" className={classes.title}>
//             Puber Kolom
//           </Typography>
//           <Box className={classes.icons}>
//             <IconButton color="inherit">
//               <Facebook />
//             </IconButton>
//             <IconButton color="inherit">
//               <YouTube />
//             </IconButton>
//             <IconButton color="inherit">
//               <Instagram />
//             </IconButton>
//           </Box>
//           <Button variant="contained" color="primary">ই-পেপার</Button>
//           <Button variant="contained" color="primary">English</Button>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }

// export default Header;
