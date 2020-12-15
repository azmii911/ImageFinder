import React from 'react'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import bg from '../img/hero2.jpg';
import { Container,Grid } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    hero: {
      height:'100%',
      padding:'80px',
      backgroundImage:`URL(${bg})`,
      backgroundPosition:'center',
      backgroundRepeat:'no-repeat',
      position:'relative',
      justifyContent:'center',
      alignContent:'center',
      display:'flex',
      
    },
  }));

function Navbar() {
  const[image,setImage] = React.useState([]);
  const[loading,setLoading] = React.useState(true);
  const[query,setQuery] = React.useState('');

  
      const handleChange = async (e)=>{
         await setQuery(e.target.value);
        }
  
React.useEffect(()=>{
  
  const request = async ()=>{
      setLoading(true);
      let url =  `https://pixabay.com/api/?key=19314223-8e5e5d7bb6f932e383652af01&q=${query}&image_type=photo&pretty=true`;
      const res = await fetch(url);
      const result = await res.json();
      while(res.hits)
      {
        setLoading(false);    
      }
      setImage(result.hits);
      setLoading(false);
  }
  request();
},[query]);
    const classes = useStyles();

    return (
        <div className={classes.root}>
   
        <Container className={classes.hero} maxWidth="lg">
  
          <Grid>
        <Box style={{marginTop:'40px'}}>
            <Typography variant="h4" style={{textAlign:'center',fontWeight:'600',color:'#3f51b5'}}>
            Stunning Free Images & Royalty Free Stock
          </Typography>
          <Typography variant="body2" style={{textAlign:'center',marginTop:'15px'}}>
          Over 1.8 million+ high quality stock images, videos and music shared by our talented community.
          </Typography>
        <TextField id="outlined-basic" label="Search Photos" variant="outlined" onChange={handleChange} style={{width:'100%',marginTop:'30px'}}/>
        </Box>
          </Grid> 
        </Container>
        {
          loading ? <div style={{textAlign:'center'}}><h1>Please wait...</h1> <h5>Fetching Stunning Photos</h5></div> :

                <div> 
                {
                    <div >
                        
                        <div>
                            <div style={{margin:'10px'}}>
                                {image.map(img => (
                                    <img key={img.id} src={img.webformatURL} alt={img.comments} style={{padding:'10px'}} />
                                    ))}
                                    
                            </div>
                        </div>

                    
                  </div>
                }
                </div>
            }
      
      </div>
    )
}

export default Navbar
