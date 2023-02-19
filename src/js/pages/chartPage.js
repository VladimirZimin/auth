import Chart from 'chart.js/auto';
import * as Papa from 'papaparse';
import axios from 'axios';

export function papaParse() {
  console.log('Parser', Parser);
  console.log('papaparse', papaparse);
  console.log('Papa', Papa);
  console.log('hi');
  console.log(Chart);
}

export function getNasaData() {
  async function fetchData() {
    // const response = await axios.get(
    //   'https://api.nasa.gov/planetary/apod?api_key=NpJiuyKNopubd3NHnrKInOdWoM9m6gl2txGGOc1m',
    // );
    // console.log('response', response);

    return fetch(
      'https://api.nasa.gov/planetary/apod?api_key=NpJiuyKNopubd3NHnrKInOdWoM9m6gl2txGGOc1m',
    )
      .then(response => {
        console.log(response);
        return response.text();
      })
      .then(data => console.log(data));
  }

  fetchData();
}
