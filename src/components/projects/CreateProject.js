import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createProject } from '../../store/actions/projectActions'
import { Redirect } from 'react-router-dom'


class CreateProject extends Component {
  state = {
    images:[],
    url: null
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createProject(this.state);
    this.props.history.push('/');
  }
  onAddImage=(e) => {
    document.getElementById('takephoto').click();
  }
  handleCapture = (e) => {
    if(e.target.files[0].type.indexOf("image/") > -1){
      let image = e.target.files[0];
      this.setState({
        images: [...this.state.images, image]
      });
      let url = window.URL.createObjectURL( e.target.files[0]);
      this.setState({url})
    }
  }
  

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' /> 
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Report a Pond</h5>
          <div className="input-field center">
            <p><img src="" id="img" src={ this.state.url || 'http://via.placeholder.com/400x300'} alt="Uploading image" style ={{height:"20rem", width: "20rem" }}/></p>
            <a class="btn-floating btn-large waves-effect waves-light red" onClick={this.onAddImage}>
              <i style ={{fontSize:"3rem"}} class="material-icons right">add_a_photo</i>
            </a>
            <input style={{display:"none"}} accept="image/*" id="takephoto" type="file" capture onChange={this.handleCapture} />
          </div>
          <div className="input-field center">
            <button className="btn green lighten-1">Publish</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createProject: (project) => dispatch(createProject(project))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)
