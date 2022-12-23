import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { RecipeRefContext } from './RecipeRef'

export default function ReportPush() {

  const context = React.useContext(RecipeRefContext);

  const onChange = (e) => {
    context.setReportCd(e.target.value)
  }

  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">신고사유</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel value="1" control={<Radio />} label="1.부적절한 내용" onChange={onChange} />
        <FormControlLabel value="2" control={<Radio />} label="2.상업성 광고" onChange={onChange}/>
        <FormControlLabel value="3" control={<Radio />} label="3.도배성 게시글" onChange={onChange}/>
        <FormControlLabel value="4" control={<Radio />} label="4.욕설 및 모욕"onChange={onChange}/>
      </RadioGroup>
    </FormControl>
  );
}