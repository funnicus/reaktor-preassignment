import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import './PackageInfo.css';

class PackageInfo extends Component{
    render(){
       const packages = this.props.packages;
       const name = this.props.match.params.name;
       let desc = "";
       let dep = undefined;
       let otherDep = undefined;
       let reverseDep = [];

       //Extracting the package specific information from
       //the JSON received from props
        for(let i = 0; i < packages.length; i++){
            if(packages[i].Package === name && packages[i].Depends !== undefined){
                desc = packages[i].Description;
                dep = packages[i].Depends.split(', ');
                for(let j = 0; j<dep.length;j++){
                    dep[j] = dep[j].split(" ");
                    dep[j].splice(1, dep[j].length);
                }
            }
            if(packages[i].Package !== name && packages[i].Depends !== undefined){
                otherDep = packages[i].Depends.split(', ');
                for(let j = 0; j<otherDep.length;j++){
                    otherDep[j] = otherDep[j].split(" ");
                    //if a reverse dependency is found
                    //its added into reverseDep
                    if(otherDep[j][0] === name){
                        reverseDep.push(packages[i].Package);
                    }
                }
            }
        }
        //filtering out duplicates
        reverseDep = [...new Set(reverseDep)];
        function removeDuplicate(arr){
            let a = []
            for(let i = 0; i < arr.length; i++){
                if(a.indexOf(arr[i][0]) === -1){
                    a.push(arr[i][0]);
                }
            }
            return a;
        }
        //Generating the lists for the dependencies and
        //reverse dependencies
        if(dep !== undefined){
            dep = removeDuplicate(dep).map(d => 
                <li
                key={d}
                >
                    <NavLink to={`/packageinfo/${d}`}>{d}</NavLink>
                </li>  
                );
        }
        if(reverseDep !== undefined){
            reverseDep = reverseDep.map(d => 
                <li
                key={d + "#2"}
                >
                    <NavLink to={`/packageinfo/${d}`}>{d}</NavLink>
                </li>  
                );
        }
        return(
            <div className="PackageInfo">
                <NavLink to="/" id="GoBack">close</NavLink>
                <div id="info">
                    <h1>{name}</h1>
                    <p>{desc}</p>
                </div>
                <div id="Dependencies">
                    <div className="Depends">
                        <h2>Dependencies:</h2>
                        <ul>
                            {dep === undefined ? <p>Doesn't depend on anything</p>: dep}
                        </ul>
                    </div>
                    <div className="ReverseDep">
                        <h2>Reverse dependencies:</h2>
                        <ul>
                            {typeof reverseDep === undefined || reverseDep.length === 0 ? <p>No package depends on this package</p>: reverseDep}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default PackageInfo;