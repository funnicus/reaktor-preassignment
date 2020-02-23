import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import './Packages.css';

class Packages extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }
    render(){
        //Sorting our JSON data alphabetically.
        const data = this.props.packages.sort((a, b) => {
            return a.Package < b.Package ? -1 : a.Package > b.Package ? 1 : 0;
        });
        //Mapping trough  the sorted data and 
        //generating <li> tags for each package.
        const packageList = data.map(p => 
            <li 
            key={p.Package}
            id={p.Package}
            >
                <NavLink to={`/packageinfo/${p.Package}`}>{ p.Package }</NavLink>
            </li>
              
        );
        return(
            <div className="Packages">
                <h1>Packages</h1>
                <ul>
                    {packageList}
                </ul>
            </div>
        );
    }
}

export default Packages;
