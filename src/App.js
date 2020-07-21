import React ,{useState, useEffect} from 'react';
import {MenuItem,FormControl,Select} from '@material-ui/core'
import './App.css';

function App() {
  const [conutries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide')
  //https://disease.sh/v3/covid-19/countries
  const baseUrl = "https://disease.sh/v3/covid-19/countries";
  useEffect(()=>{
    // The code inside here will run once
    // when the component loads and not again
     (async function(){
      // async ->  send a request wait fo it to do something 
       await fetch(baseUrl)
             .then(response => response.json())
             .then(data => {
               const countries = data.map(country=>(
                 {
                   name: country.country,
                   value:country.countryInfo.iso2
                 }
               ));
               setCountries(countries);
             })
     })()
  },[conutries]);
  const onCountryyChange = async (event)=>{
    const countryCode = event.target.value;
    console.log("Yooooo <<<< ",countryCode);
  }
  return (
    <div className="app">
    
       <div className="app__header">
       <h1>COVID-19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select
          variant="outlined"
          value={country}
          onChange={onCountryyChange}
          >
            <MenuItem value="worldwide">Worldwide</MenuItem>
           {conutries.map( (country,i) =>(
             <MenuItem key={i} value={country.value}>{country.name}</MenuItem>
           ))}
          </Select>
          
        </FormControl>
       </div>
     
     <div className="app__stats">
      
     </div>
      
      {/**Table */}
      {/**Graph */}
      {/**Mapclear
       * 
       */}
    </div>
  );
}

export default App;
