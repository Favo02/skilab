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
  