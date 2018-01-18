import axios from 'axios';
import _ from 'lodash';

const github_api_endpoint = "https://api.github.com";

export default class api_services {

  constructor() { }

  getReport = (username) => {

    return axios.get(`${github_api_endpoint}/users/${username}`)
  }

  getRepos = (url) => {
    return axios.get(`${url}`)
  }

  getLanguagesFromRepos = (username, repos) => {

    return new Promise((resolve, reject) => {
      let languages = [];
      let work_languages = [];
      let promises = [];
      let data = {};
      repos.forEach((repo) => {
        promises.push(axios.get(`${github_api_endpoint}/repos/${username}/${repo.name}/languages`));
      })

      Promise.all(promises).then((repos_results) => {
        console.log(repos_results);
        for (let single_repo in repos_results) {
          for (let key in repos_results[single_repo].data) {
            let obj = {};
            obj[key] = repos_results[single_repo].data[key]
            languages.push(obj);
            if (work_languages.indexOf(key) == -1)
              work_languages.push(key);
          }
        }
        console.log(languages)
        for (let workLang in work_languages) {
          data[work_languages[workLang]] = 0;
          for (let lang in languages) {
            if (Object.keys(languages[lang])[0] === work_languages[workLang]) {
              data[work_languages[workLang]] += languages[lang][work_languages[workLang]];
            }
          }
        }
        let total = 0;
        for (let key in data) {
          total += data[key]
        }
        for (let key in data) {
          data[key] = Math.ceil(((data[key] / total) * 100).toFixed(3));
        }
        resolve(data);
      })
    })
  }

  getObjectToArray(object_json) {
    console.log([object_json]);
    return [object_json];

  }

}