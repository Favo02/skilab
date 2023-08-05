const ctx = document.getElementById('myChart');
var massima = [31, 28, 30, 27, 26, 30, 27];  // esempio
var minima = [23, 18, 19, 21, 21, 20, 20];   // esempio
var media = Array.apply(null, Array(massima.length)).map(function () {});

for (var i = 0; i < media.length; i++ ) 
    media[i] =( massima[i] + minima[i]) / 2;


new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['trePrima', 'duePrima', 'unoPrima', 'oggi', 'domani', 'dopodomani', 'treDopo'],
    datasets: [
        {
      label: 'massima',
      data: massima,
      borderWidth: 1,
      borderColor: "#ff0000",
      
    },    
    {
        label: 'media',
        data: media,
        borderWidth: 1,
        borderDash: [5, 5],
        borderColor: "#ff8000",
        
    }, 
    {
        label: 'minima',
        data: minima,
        borderWidth: 1,
        borderColor: "#00bfff",

    }

]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});