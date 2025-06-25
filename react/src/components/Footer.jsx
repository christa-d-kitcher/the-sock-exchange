import React from 'react';

const Footer = (props) => {
    let propEnv = props.environment;
    let bkgVal = (propEnv==="DEVELOPMENT" ? "bg-success" : (propEnv==="PRODUCTION" ? "bg-warning" : "bg-white")); 
   
    return (
        <footer className={"text-muted rounded " + bkgVal}>
            <div><strong className="text-dark">{propEnv}</strong></div>
        </footer>
    )
}

export default Footer;