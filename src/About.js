import React from 'react';
import { Link } from 'react-router-dom';

class About extends React.Component {
   constructor(props) {
      super(props);
   }
   render() {
      return (
         <div>
            <h1>About</h1>
            <p><Link to="/">Click here</Link>to go home</p>
            
         </div>
      )
   }
}
export default About;