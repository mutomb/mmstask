import React, {useState} from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/storage'

const ProjectDetails = (props) => {

  const { project, auth, time, id } = props;
  const path= (`ponds/${time}/${id}`);
  const [url, setUrl] = useState(null)
  firebase.storage().ref(path).list({maxResults:1}).then(res=>{
    res.items.map(item=>{
      item.getDownloadURL().then(url=>{
        setUrl(url);
        console.log(url)
      })
    })
  })
  if (!auth.uid) return <Redirect to='/signin' />
  if(!(project || url)) {
    return (
      <span className="spin"></span>
    )
  } 
  if (project) {
    return (
      <div className="container section project-details">
        <div className="card z-depth-0">
        <img style={{width:'100%', height: '20rem'}} className=" responsive-img" id="img" src={ url|| 'http://via.placeholder.com/400x300' } alt="Uploaded images" />
          <div className="card-action grey lighten-4 grey-text">
            <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
            <div>{project.createdAt}</div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="container center">
        <span className="spin"></span>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const time= ownProps.match.params.time;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[id] : null
  return {
    project: project,
    auth: state.firebase.auth,
    time,
    id
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{
    collection: 'projects'
  }])
)(ProjectDetails)
