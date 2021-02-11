import React from 'react'
import ProjectSummary from './ProjectSummary'
import { Link } from 'react-router-dom'

const ProjectList = ({images}) => {
  if (images) {
     return images.map(image => {
        return (
          <div className="project-list section col s12 m3">
          <Link to={`/project/${image.id}/${image.createdAt}`} key={image.id}>
            <ProjectSummary image={image}/>
          </Link>
          </div>
        ) 
    })
  }
  return null
}

export default ProjectList
