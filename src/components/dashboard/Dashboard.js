import React, { Component } from 'react'
import ProjectList from '../projects/ProjectList'
import { connect } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/storage'
import { firebaseConnect, firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

class Dashboard extends Component {
  state ={
    images:[],
    timeFilter:''
  }
  filter= (time)=>{
    const { projects } = this.props;
    if(projects && projects.length>0) {
      projects.forEach(project=>{
        const projectDate=project.createdAt.toString();
        if(projectDate.startsWith(time)){
          const path=`/ponds/${projectDate}/`;
          firebase.storage().ref(path).listAll().then(res=>{
            res.prefixes.forEach(element=>{
              const id=element.name;
              if(project.id==id){
                  firebase.storage().ref(element.fullPath).list({maxResults:1}).then(res=>{
                  res.items.map(item=>{
                    item.getDownloadURL().then(url=>{
                      const image= {url, authorFirstName:project.authorFirstName, autherLastname:project.autherLastname, createdAt:projectDate, id: id}
                      this.setState({
                        images: [...this.state.images, image]
                      })
                    })
                  })
                })
              }
            })
          })
        }
      })
    }             
  }
  componentDidMount() {
    this.filter(this.state.timeFilter); 
  }
  componentDidUpdate() {
    //console.log(this.state.images)
  }

  render() {
    const { projects, auth} = this.props;
    if (!auth.uid) return <Redirect to='/signin' />
    if (typeof projects=="undefined") return <span className="spin"></span>
    if (projects.length==0) return (      
      <div className="dashboard container">
        <div className="row">
            <ProjectList images={this.state.images} />
        </div>
      </div>)
    return (
      <div className="dashboard container">
        <div className="row">
            <ProjectList images={this.state.images} />
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth,
  }
}
//whenever this component is active, this app should listen to the projects on firestore only
export default compose(
  connect(mapStateToProps),
  firestoreConnect([ 
    { collection: 'projects', orderBy: ['createdAt', 'desc']},
  ]),
  firebaseConnect()
)(Dashboard)
