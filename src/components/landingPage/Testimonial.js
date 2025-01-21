import React from 'react'
import ProfilePic from "../../assets/john-doe-image.png"
import {AiFillStar} from "react-icons/ai"
const Testimonial = () => {
  return (
    <div className='work-section-wrapper'>
        <div className='work-section-top'>
            <p className='primary-subheading'>Témoignages</p>
            <h1 className='primary-heading'>Vos retours, notre fierté</h1>
            <p className='primary-text'>
                Découvrez ce que nos utilisateurs pensent de notre application et comment elle a amélioré leur quotidien.            </p>

        </div>
        <div className='testimonial-section-bottom'>
            <img src={ProfilePic} alt=''></img>
            <p>
            Cette application a révolutionné la manière dont nous gérons nos projets en équipe !
            </p>
            <div className='testimonials-stars-container'>
                <AiFillStar/>
                <AiFillStar/>
                <AiFillStar/>
                <AiFillStar/>
                <AiFillStar/>
            </div>
            <h2>Sarah, Manager</h2>
        </div>
    </div>
  )
}

export default Testimonial