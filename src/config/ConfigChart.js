let options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
        tooltip: {
            displayColors: false,
            xAlign: 'center',
            yAlign: 'bottom',
            callbacks: {
                title: function () {
                    return 'Lượt nghe';
                },
            },
        },
    },
    scales: {
        x: {
            grid: {
                color: 'transparent',
            },
            ticks: {
                color: 'white',
                font: {
                    size: 14,
                    family: "'IBM Plex Sans', sans-serif",
                },
            },
        },
        y: {
            ticks: {
                display: false,
            },
            grid: {
                borderDash: [2, 4],
                color: 'rgb(150, 150, 150)',
                drawBorder: false,
                drawTicks: false,
                tickLength: 10,
            },
        },
    },
};

export { options };
