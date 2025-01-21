import React from 'react'
import Logo from "../../assets/logo_.png"
import { BsTwitter } from 'react-icons/bs'
import {SiLinkedin} from 'react-icons/si'
import { BsYoutube } from 'react-icons/bs'
import {FaFacebook} from 'react-icons/fa'
const Footer = () => {
  return (
    <div className='footer-wrapper'>
        <div className='footer-section-one'>
            <div className='footer-logo-container'>
                <img src={Logo} alt='' width="175" height="35"></img>
            </div>
            <div className='footer-icons'>
                <BsTwitter/>
                <SiLinkedin/>
                <BsYoutube/>
                <FaFacebook/>
            </div>
        </div>
        <div className='footer-section-two'>
            <div className='footer-section-columns'>
                <span>Quality</span>
                <span>Centre d'aide</span>
                <span>Share</span>
                <span>Carrers</span>
                <span>Testimonials</span>
                <span>Work</span>
            </div>
            <div className='footer-section-columns'>
                <span>244-5333</span>
                <span>hello@project.com</span>
                <span>pres@project.com</span>
                <span>contact@project.com</span>
            </div>
            <div className='footer-section-columns'>
                <span>Conditions</span>
                <span>Politique de confidentialité</span>
            </div>
        </div>
    </div>
  )
}

export default Footer