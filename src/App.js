import React ,{useState, useEffect} from 'react';
import {MenuItem,FormControl,Select,Card,CardContent} from '@material-ui/core'
import InfoBox from './components/InfoBoxComponent'
import MapBox from './components/MapComponent'
import TableBox from './components/TableBoxComponent'
import LineGraphBox from './components/LineGraphComponent'
import {sortData,prettyPrintStat}from './util'
import "leaflet/dist/leaflet.css"
import './App.css';





function App() {
  const [conutries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat:34.80746,lng:-40.4796})
  const [mapZoom, setMapZoom] = useState(3)
  const [mapCountries,setMapCountries] = useState([]);
  const [casesType,setCasesType] = useState('cases');
  const baseUrl = "https://disease.sh/v3/covid-19/countries";
  const worldwideUrl = "https://disease.sh/v3/covid-19/all";
  useEffect(() => {
    (async function(){
      // async ->  send a request wait fo it to do something 
       await fetch(worldwideUrl)
             .then(response => response.json())
             .then(data => {
               console.log(data);
               setCountryInfo(data)
               
             })
     })()
    
  }, [country])
  
  useEffect(()=>{
    // The code inside here will run once
    // when the component loads and not again
     (async function(){
      // async ->  send a request wait fo it to do something 
       await fetch(baseUrl)
             .then(response => response.json())
             .then(data => {
              setTableData(sortData(data));
              setMapCountries(data);
               const countries = data.map(country=>(
                 {
                   name: country.country,
                   value:country.countryInfo.iso2
                 }
               ));
               setCountries(countries);
             })
     })()
  },[country]);
  const onCountryyChange = async (event)=>{
    const countryCode = event.target.value;
    
    const fillterUrl = countryCode === 'worldwide' ? worldwideUrl :baseUrl+"/"+countryCode;
    setCountry(countryCode);
    (async function(){
      // async ->  send a request wait fo it to do something 
       await fetch(fillterUrl)
             .then(response => response.json())
             .then(data => {
               console.log(data);
               setCountryInfo(data)
               setMapCenter([data.countryInfo.lat,data.countryInfo.long])
               setMapZoom(4);
               
             })
     })()
    console.log("Yooooo <<<< ",countryCode);

  }
  return (
    <div className="app">
    
       <div className="app__left">
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
            <InfoBox
            isRed
            active={casesType === "cases"}
            onClick={e=>setCasesType('cases')}
             title="Coronavirus Cases" cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)}></InfoBox>
            <InfoBox 
            
            active={casesType === "recovered"}
            onClick={e=>setCasesType('recovered')}
            title="Recovered" cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)}></InfoBox>
            <InfoBox 
            isRed
            active={casesType === "deaths"}
            onClick={e=>setCasesType('deaths')}
            title="Deaths " cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)}></InfoBox>
          
          </div>
            
            
            <MapBox
             casesType={casesType}
             countries={mapCountries}
             center={mapCenter} 
             zoom={mapZoom}/>
       </div>
       <Card className="app_right">
         <CardContent>
            <h3>Live Cases by Country</h3>
            <TableBox countries={tableData}/>  
            <h3>Worldwide new {casesType}</h3>
            <LineGraphBox className="app__graph" casesType={casesType}/>
         </CardContent>
       </Card>
    </div>
  );
}

export default App;
