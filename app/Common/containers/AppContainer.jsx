import React, { Component } from 'react'
import { connect } from 'react-redux'

import './AppContainer.css'

class AppContainer extends Component { 
  constructor(props) {
    super(props)
	}
  
  render() {
    const props = this.props
  
    return (
      <div>
        <div className="header">
          
        </div>
        <div className="side-menu">
          
        </div>
        <div className="main-content">
          {React.cloneElement(this.props.children)}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
	return state
}

export default connect(mapStateToProps)(AppContainer)