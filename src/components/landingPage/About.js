import React from 'react'
import AboutBackground from "../../assets/about-background.png"
import AboutBackgroundImage from "../../assets/cercleImage.png"
import { BsFillPlayCircleFill } from 'react-icons/bs'

const About = () => {
  return (
    <div className='about-section-container'>
        <div className='about-background-image-container'>
            <img src={AboutBackground} alt=''></img>
        </div>
        <div className='about-section-image-container'>
            <img src={AboutBackgroundImage} alt='' className='circular-image'></img>
        </div>
        <div className='about-section-text-container'>
            <p className='primary-subheading'> À Propos de Nous</p>
            <h1 className='primary-heading'>Notre mission et nos valeurs  </h1>
            <p className='primary-text'>
            "Nous sommes une équipe passionnée qui crée des solutions innovantes pour simplifier votre quotidien. Notre mission est d'offrir des outils intuitifs qui boostent votre productivité. Nous croyons en l'importance de la collaboration et de l'efficacité            </p>
            <p className="primary-text">
            Nous nous engageons à répondre aux besoins de nos utilisateurs tout en offrant une expérience exceptionnelle pour transformer votre façon de travailler et de collaborer.
            </p>
            <div className='about-buttons-container'>
                <button className='secondary-button'> En savoir plus</button>
                <button className='watch-video-button'><BsFillPlayCircleFill/> Visionner la vidéo</button>
            </div>
        </div>
    </div>
  )
}

export default About