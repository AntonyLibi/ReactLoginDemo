import { AnyArray } from "immer/dist/internal";
import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import { SpinnerCircularFixed } from 'spinners-react';

export const DisplayCountries=()=>{
    const [countryData,setCountryData]=useState([])
    const [loaders,setLoaders]=useState(false);
   
    useEffect(() => {
        setLoaders(true);
        fetch('https://countriesnow.space/api/v0.1/countries/capital')
        .then(res=>res.json()
        .then(res=>setCountryData(res.data)))
        setLoaders(false);
    }, [])

    const columns=[
        {
            title:"Country",
            field:"name"
        },
        {
            title:"Capital",
            field:"capital"
        },
        {
            title:"ISO2",
            field:"iso2"
        },
        {
            title:"ISO3",
            field:"iso3"
        }
    ]

    return(
          <div>
              {loaders===false?
               <MaterialTable 
                   columns={columns}
                   data={countryData}
                   title="Country Table"
                   options={{
                    headerStyle: {
                      backgroundColor: '#7D3CED',
                    },
                    rowStyle: {
                        backgroundColor: '#EEE',
                      },
                    }}
               />:
               <div className="loader">
           <SpinnerCircularFixed size={52} thickness={158} speed={134} color="rgba(57, 172, 80, 1)" secondaryColor="rgba(57, 172, 80, 0)" />
           </div>}
            </div>
        )
}
