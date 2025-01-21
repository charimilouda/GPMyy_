import React from 'react'
import Navbar from './navbar'
import BannerImage from "../../assets/TrelloUI.png"
import {FiArrowRight} from "react-icons/fi"
import { useNavigate } from 'react-router-dom';
const Home = ({ onStartClick }) => {
  const navigate = useNavigate(); 

  const handleStartClick = () => {
    navigate('/accueil'); 
  };
  return (
    <div className='home-container'>
        <Navbar/>
        <div className="home-banner-container">
            {<div className='home-bannerImage-container'>
               {/** <img src={BannerBackground}alt=""></img>*/} 
            </div>}
            <div className="home-text-section">
              <h1 className='primary-heading'>
              Gérez vos projets facilement, 
              boostez votre productivité !
              </h1>
            <p className='primary-text'>
            Une solution intuitive pour planifier et suivre vos projets en équipe.
            </p>
            <button className="secondary-button"  onClick={handleStartClick}> 
              Commencer maintenant<FiArrowRight></FiArrowRight>
            </button>
            </div>
        </div>
        <div className='home-image-section'>
          <img src={BannerImage}></img>
        </div>
    </div>
  )
}

export default Home