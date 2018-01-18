import React, { Component } from 'react';
import { render } from 'react-dom';
import api_services from '../services/api.service.js'
import '../style.css';
import { Pie } from "react-chartjs";


export default class Report extends React.Component {
  constructor(props) {

    this.api = new api_services();
    this.state = {
      repos: [],
      work_languages: []
    }

    this.rateRepos = this.rateRepos.bind(this);
  }

  getRepos(url) {
    this.api.getRepos(url).then(
      res => {
        this.setState(
          {
            repos: res.data
          }
        )
      },
      err => {
        console.log(err)
      }
    )
  }

  rateRepos() {
    this.api.getLanguagesFromRepos(this.props.userData.login, this.state.repos).then(

      res => {
        console.log(res);
        this.setState({
          work_languages: res
        })
      }
    )



  }

  render() {

    if (this.state.work_languages.length === 0) {
      var languages =
        <div className="head">
          <button className="btn btn-primary" onClick={this.rateRepos}>What you work</button>
        </div>
    }
    else {

      let langs = [];
      let work_languages = this.state.work_languages;
      let chartOptions = {
        animationSteps: 100,

        animationEasing: "easeOutBounce",

        animateRotate: true,
      }
      Object.keys(this.state.work_languages).forEach(function (key) {
        langs.push({
          label: key,
          value: work_languages[key]
        });
      });
      languages =
        <div>
          <h2 className="head">Languages you have work on</h2>
          <div className="flex-box wrap">
            {
              langs.map((lang) => {
                { console.log(lang) }
                return (
                  <div className="card" key={lang.language}>
                    <div className="card-block">
                      <p className="card-title">{lang.label}</p>
                      <p className="card-text">{lang.value} %</p>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className="centrize">
            <Pie data={langs} options={chartOptions} />
          </div>
        </div>
    }

    if (this.state.repos.length === 0) {
      var more_button = <button className="btn btn-primary w-20" onClick={() => this.getRepos(this.props.userData.repos_url)}>More</button>;
    }
    else {
      more_button =
        <div>
          <h2 className="head">Repos</h2>
          <div className="flex-box wrap">
            {console.log(this.state.repos)}
            {this.state.repos.map((repo) => {
              let fork = repo.fork ? <i class="fa fa-code-fork" aria-hidden="true"></i> : null;
              return (
                <div key={repo.id} className="card w-20">
                  <a className="card-title" target="_blank" href={repo.html_url} >
                    {repo.name}
                  </a>
                  <div className="flex-box wrap aligned-center">
                    <p className="star m-b-0 card-text">{repo.stargazers_count}<i class="fa fa-star" aria-hidden="true"></i></p>
                    <p className="star m-b-0 card-text">{repo.watchers}<i class="fa fa-eye" aria-hidden="true"></i></p>
                    {fork}
                  </div>
                </div>
              )
            })}
          </div>
          {languages}


        </div>;
    }

    return (
      <div>
        <div className="card">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Your Name : {this.props.userData.name}</li>
            <li className="list-group-item">Your Repository : {this.props.userData.public_repos}</li>
          </ul>

          {more_button}

          <div>


          </div>
        </div>

      </div>
    )

  }


}