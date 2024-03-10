import React from "react";
import { Link } from 'react-router-dom';
export default function Logo() {
    return (
        <div className="Logo w-40 ml-4 sm:w-56 md:w-72">
            <Link to="/">
                <img src="./vit_logo.png" alt="VIT Chennai Logo" />
            </Link>
        </div> 
    );
}
