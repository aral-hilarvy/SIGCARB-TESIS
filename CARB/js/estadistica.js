var ctx = document.getElementById('myChart').getContext('2d');
/*var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Bosque', 'Sabana', 'Matorral', 'Pastizal', 'Centro Poblado', 'Cuerpo de Agua'],
        datasets: [{
            label: '% Distribucion de Capas',
            data: [83.5, 8.67, 0.99, 6.37, 0.33, 0.13],
            backgroundColor: [
                'rgba(0, 128, 0, 0.5)',
                'rgba(255, 255, 0, 0.5)',
                'rgba(77, 47, 179, 0.5)',
                'rgba(152, 218, 73, 0.5)',
                'rgba(185, 119, 14, 0.5)',
                'rgba(50, 139, 224, 0.5)'
            ],
            borderColor: [
                'rgba(0, 128, 0, 1)',
                'rgba(255, 255, 0, 1)',
                'rgba(77, 47, 179, 1)',
                'rgba(152, 218, 73, 1)',
                'rgba(185, 119, 14, 1)',
                'rgba(50, 139, 224, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});*/

var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['2011','2012','2013','2014','2015','2016','2017'],
        datasets: [{
            label: '% Perdida de Bosque Anual: 0.71%',
            data: [83.5,82.79, 82.08, 81.36, 80.65,79.94, 79.23],
            backgroundColor: [
                'rgba(0, 128, 0, 0.5)',
                'rgba(0, 128, 0, 0.5)',
                'rgba(0, 128, 0, 0.5)',
                'rgba(0, 128, 0, 0.5)',
                'rgba(0, 128, 0, 0.5)',
                'rgba(0, 128, 0, 0.5)',
                'rgba(0, 128, 0, 0.5)',
            ],
            borderColor: [
                'rgba(0, 128, 0, 1)',
                'rgba(0, 128, 0, 1)',
                'rgba(0, 128, 0, 1)',
                'rgba(0, 128, 0, 1)',
                'rgba(0, 128, 0, 1)',
                'rgba(0, 128, 0, 1)',
                'rgba(0, 128, 0, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
