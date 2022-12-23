import {Component} from 'react';
import Section0 from './main_section/Section0';
import Section1 from './main_section/Section1';
import Section2 from './main_section/Section2';
import Section3 from './main_section/Section3';
import Section4 from './main_section/Section4';
import Section5 from './main_section/Section5';
import Section6 from './main_section/Section6';
import Section7 from './main_section/Section7';
class Main extends Component {
    render() {
        return(
            <div className='main'>
                <Section0/> 
                <Section1/> 
                <div className='bar'></div>
                <Section2/> 
                <div className='bar'></div>
                <Section3/>
                <div className='bar'></div>
                <Section4/>
                <div className='bar'></div>
                <Section5/>
                <Section6/>
                <Section7/>
            </div>
        )
    }
}

export default Main;