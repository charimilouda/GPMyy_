import React from 'react'

const Contact = () => {
  return (
    <div className='contact-page-wrapper'>
        <h1 className='primary-subheading'>
        Vous avez des questions ?
        </h1>
        <h1 className='primary-heading'>Nous avons des réponses !</h1>
        <div className='contact-form-container'>
            <input type='text' placeholder='abc@email.com'></input>
            <button className='secondary-button'>Envoyer</button>
        </div>
    </div>
  )
}

export default Contact