import React from 'react'
import './TableBox.css'
export default function TableBox({countries}) {
    return (
        <div className="table">
            {countries.map(({country, cases},i) =>(
               <div key={i}>
                   <tr >
                   <td>{country}</td>
                   <td><strong>{cases}</strong></td>
                   </tr>
                </div>
            ))}
        </div>
    )
}
