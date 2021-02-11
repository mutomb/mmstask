import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
  return (
    <div>
      <ul className="right">
        <li><NavLink to='/create' className='navlink'>Report State</NavLink></li>
        <li><a onClick={props.signOut} className='navlink'>Log Out</a></li>
        <li><NavLink to='/' className="btn btn-floating green lighten-1">
          {props.profile.initials}
        </NavLink></li>
      </ul>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}
//mapStateToProps should always be first param
export default connect(null, mapDispatchToProps)(SignedInLinks)
