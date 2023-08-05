export async function getRealtimeWeatherByGPS(lat, lon) {
  
    let res = await fetch(`https://tourism.opendatahub.com/v1/Weather/Realtime?language=en&latitude=${lat}&longitude=${lon}`);
    res = await res.json();
    
    res = await res.map(e => ({
        temperature: e.t,
        windDirection: e.dd,
        windSpeed: e.ff
    }))
    console.log(res[0]);
    return res[0]
    
  
}
  

export async function getWeatherHistoryByGPS(lat, lom) {
    let res = await fetch(`https://tourism.opendatahub.com/v1/WeatherHistory?pagenumber=1&datefrom=08-01-2023&dateto=08-15-2023&latitude=${lat}&longitude=${lon}&removenullvalues=false`)

    res = await res.json();
}