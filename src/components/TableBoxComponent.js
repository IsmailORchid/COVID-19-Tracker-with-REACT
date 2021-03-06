import React from 'react'
import numeral from 'numeral';
import './TableBox.css'
export default function TableBox({countries}) {
    return (
        <div className="table">
            {countries.map(({country, cases},i) =>(
               <div key={i}>
                   <tr >
                   <td>{country}</td>
                   <td><strong>{numeral(cases).format("0.0a")}</strong></td>
                   </tr>
                </div>
            ))}
        </div>
    )
}
