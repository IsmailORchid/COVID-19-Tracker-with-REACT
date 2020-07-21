import React ,{useState,useEffect}from 'react';
import { Line } from "react-chartjs-2";
import numeral from 'numeral';

const options ={
   legend :{
       display :false,
   },
    elements :{
        point :{
            raduis:0,
        },
    },
    maintainAspectRatio : false,
    tooltips:{
        mode:"index",
        intersect:false,
        callbacks:{
            label:function(tooltipItem,data){
                return numeral(tooltipItem.value).format("+0,0")
            },
        },
    },
    scales:{
        xAxes:[
            {
                type:"time",
                time:{
                    format:'MM/DD/YY',
                    tooltipFormat:'ll'
                },
            },
        ],
        yAxes:[
            {
                gridLines:{
                    display:false,
                },
                ticks:{
                    callback:function(value,index,values){
                        return numeral(value).format("0a")
                    }
                }
            },

        ]
    },

   
}
export default function LineGraphBox({casesType='cases'}) {
    const [data, setData] = useState({})
    const fetchUrl = "https://disease.sh/v3/covid-19/historical/all?lastdays=120";
    useEffect(() => {

      (async function(){
        await fetch(fetchUrl)
        .then(response=> response.json())
        .then(data =>{
            console.log(data);
            setData(builChardData(data));
        })
      })()
    }, [casesType])

    const builChardData = (data,casesType='cases')=>{
        const chartData = [];
        let  lastDataPoint;
        for(let date in data.cases){
            if(lastDataPoint){
                const newDataPoint = {
                    x:date,
                    y:data[casesType][date] - lastDataPoint
                }
                chartData.push(newDataPoint)
            }
            lastDataPoint = data[casesType][date];
        }
        return chartData;
    }
    return (
        <div>
            {
                data?.length > 0 &&(
                    <Line
                    options = {options}
                    data ={{

                        datasets:[{
                            data:data,
                            backgroundColor:'rgba{204,16,52,0.5}',
                            borderColor:'#CC1034'

                        }]
                    }}
               
                    />
                )
            }
        </div>
    )
}