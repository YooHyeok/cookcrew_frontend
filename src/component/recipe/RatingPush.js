import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { RecipeRefContext } from './RecipeRef'

export default function RatingPush() {
    const context = React.useContext(RecipeRefContext);

    // const [value, setValue] = React.useState(0);
    const onChange = (event, newValue) => {
      // setValue(newValue);
      console.log(newValue);      
      context.setRatingValue(newValue)
      console.log(context.ratingValue)
    }
    
    return (
      <Box 
        sx={{
          '& > legend': { mt: 2 },
        }}
      >
        <Typography component="legend">감사합니다! ^_^</Typography>
        <Rating
          name="simple-controlled"
          value={context.ratingValue}
          onChange={onChange}
          // onChange={(event, newValue) => {
          //   setValue(newValue);
          // }}
        />
      </Box>
    );
  }
