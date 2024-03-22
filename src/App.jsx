
import useAxios from 'axios-hooks'
import './App.css'
import { useState } from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
import { orange } from '@mui/material/colors';

function App() {
  const [{ data, loading, error }, refetch] = useAxios(
    'https://api.covidtracking.com/v1/us/daily.json'
  )

  const [filter, setFilter] = useState("positive")

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>
  const series = data.map(data=>data[filter]).slice(0, 10)
  const xaxis = data.map(data=>data.date).slice(0,10)

  const filters = ["positive", "negative", "death", "hospitalized", "totalTestResults"]



  return (
    <div className=''>
      <h1 className='' style={{color:"orange"}}>HISP Data</h1>
      <button onClick={refetch}>refetch</button>
      <BarChart
        series={[{data: series}]}
        height={290}
        colors={['#FFC658']}
        width={900}
        xAxis={[{ data: xaxis, scaleType: 'band' }]}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      />

      <div className='' style={{display:"flex", gap:"10px", alignItems:"center", width:"100%", justifyContent:"center", margin:"5px"}}>{filters.map((filter, index) => <button key={index} onClick={() => { setFilter(filter) }}>{filter}</button>)}</div> 
    </div>
  )
}

export default App
