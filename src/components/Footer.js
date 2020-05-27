import React from 'react'

const Footer = () => {
    return (
        <footer>
            <p>©{new Date().toISOString().slice(0, 4)} by skeppar.tech </p>
        </footer>
    )
}

export default Footer;