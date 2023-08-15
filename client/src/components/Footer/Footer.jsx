import React from 'react';
import './Footer.css';
import Logo from '../../images/premiumLogoNoBg.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className='bg-color py-3'>
            <div className='container'>
                <div className='row footer-top py-5'>
                    <div className='col-md-6 mb-5'>
                        <img src={Logo} alt="white-logo" />
                    </div>
                    <div className='col-md-3'>
                        <ul className='list-unstyled'>
                            <li className=' text-dark fw-bold'>Support</li>
                            <li><Link to='/about'>About Us</Link></li>
                        </ul>
                    </div>
                    <div className='col-md-3'>
                        <ul className="list-unstyled">
                            <li  className=' text-dark fw-bold'>Get in touch</li>
                            <FontAwesomeIcon icon={faFacebook} />
                            <FontAwesomeIcon icon={faInstagram} />
                            <FontAwesomeIcon icon={faEnvelope} />
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;