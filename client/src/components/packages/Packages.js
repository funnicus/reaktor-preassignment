import React, { Component } from 'react';
import './Packages.css';

class Packages extends Component{
    constructor(props){
        super(props);
        this.state = {
            packages: []
        }
    }

    //Fetching the JSON data of our packages from the server...
    componentDidMount() {
        fetch('/api/packages')
        .then(res => res.json())
        .then(packages => this.setState({packages}, () => console.log('Packages fetched...',
        packages)));
    }

    render(){

        //Sorting our JSON data alphabetically
        //then mapping trough  the sorted data and 
        //generating <li> tags for each package.
        const data = this.state.packages.sort((a, b) => {
            return a.Package < b.Package ? -1 : a.Package > b.Package ? 1 : 0;
        }).map(p => 
            <li 
            key={p.Package}
            id={p.Package}
            >
                { p.Package }
            </li>    
        );

        return(
            <div className="Packages">
                <h1>Packages</h1>
                <ul>
                    {data}
                </ul>
            </div>
        );
    }
}

export default Packages;
