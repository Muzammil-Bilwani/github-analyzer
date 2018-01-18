import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';
import Report from './components/Report';
import api_services from './services/api.service.js'

class App extends Component {


  constructor() {
    super();
    this.state = {
      username: '',
      userData: ''
    };
    this.api = new api_services();
    this.changeUserName = this.changeUserName.bind(this);
    this.getReport = this.getReport.bind(this);
    this.getReportMethod = this.getReportMethod.bind(this);
  }

  changeUserName(event) {
    this.setState({
      username: event.target.value
    })
  }

  getReportMethod(event) {
    this.setState({
      userData: ""
    })
    this.api.getReport(this.state.username).then(
      (res) => {
        console.log(res);
        this.setState({
          userData: res.data
        })
      },
      (err) => {
        console.log(err);
        this.setState({
          userData: null
        })
      }
    )
  }


  getReport(event) {
    if (event.key == 'Enter') {
      this.getReportMethod(event)
    }

  }




  render() {
    if (this.state.userData === null)
      let error = <div className="alert alert-danger" role="alert">
        User Not Found
      </div>;
    else if (this.state.userData) {
      let report = <Report userData={this.state.userData} />
    }

    return (
      <div className="main">
        <div className="form-group">
          <label>Username</label>
          <input className="form-control"
            value={this.state.username}
            onChange={this.changeUserName}
            onKeyPress={this.getReport}
          />
          <button onClick={this.getReportMethod} className="btn btn-primary">Go For it</button>
        </div>
        {error}
        {report}
      </div>
    );
  }
}


render(<App />, document.getElementById('root'));
