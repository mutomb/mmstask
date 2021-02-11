import React from 'react'

//moment is third party library with various methods for timestamp formatting 
const ProjectSummary = ({ image}) => {
  return (
    <div className="card" style={{marginTop:'10rem'}}>
      <img style={{width:'100%', height: '10rem'}} className=" responsive-img" id="img" src={  image.url || 'http://via.placeholder.com/400x300'} alt="Uploaded images" />
      <div className="card z-depth-10 project-summary">
        <div className="card-content grey-text text-darken-3">  
          <p>Posted by {image.authorFirstName} {image.authorLastName}</p>    
        </div>
      </div>
    </div>
  )
}
export default ProjectSummary; 
