import React from 'react'
import TaskTrackingIcon from "../../assets/planning.png";
import NotificationsIcon from "../../assets/notification.png";
import TeamManagementIcon from "../../assets/group.png";

import { Title } from 'chart.js'

const Work = () => {
    const workInfoData=[{
        image:TaskTrackingIcon,
        Title:"Suivi des tâches en temps réel",
        Text:"Visualisez l’avancement de vos projets en temps réel avec des tableaux interactifs",
    },
    {
        image:NotificationsIcon,
        Title:"Notifications et rappels personnalisés",
        Text:"Recevez des rappels personnalisés pour chaque tâche et ne manquez jamais une échéance",
    },
    {
        image:TeamManagementIcon,
        Title:"Gestion d'équipe et collaboration facile",
        Text:"Collaborez facilement avec votre équipe grâce à des outils de communication intégrés.",
    }];

  return (
    <div className='work-section-wrapper'>
        <div className='work-section-top'>
            <p className='primary-subheading'>
            Fonctionnalités
            </p>
            <h1 className=' primary-heading'>Les atouts de notre solution</h1>
            <p className='primary-text'>
            Explorez les principales fonctionnalités de notre application qui simplifient votre expérience et optimisent votre productivité.            </p>
        </div>
        <div className='work-section-bottom'>
            {
                workInfoData.map((data) => (
                    <div className='work-section-info'>
                        <div className='info-boxes-img-container'>
                            <img  src={data.image} alt=''></img>
                        </div>
                        
                        <h2>{data.Title}</h2>
                        <p>{data.Text}</p>
                    </div>
            ))}
        </div>
    </div>
  )
}

export default Work