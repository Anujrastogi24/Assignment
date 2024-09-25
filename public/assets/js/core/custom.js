function renderMBRTChart(filter) {
    const ctx = document.getElementById('dailyAverageMBRT').getContext('2d');

    // Fetch data for the current filter/view type
    fetch(`getDailyAverageMBRT/${filter}`)
        .then(response => response.json())
        .then(data => {
            if (!Array.isArray(data) || data.length === 0) {
                console.error('No data available for the given filter');
                return;
            }

            let labels = [];
            if (filter === 'day') {
                // Labels for the last 15 days, e.g., Sun, Mon, etc.
                labels = data.map(item => new Date(item.time_period).toLocaleString('en-US', { weekday: 'short' }));
            } else if (filter === 'week') {
                // Labels like 1st Week, 2nd Week...
                labels = data.map((item, index) => `Week ${index + 1}`);
            } else if (filter === 'month') {
                // Labels like January, February...
                labels = data.map(item => new Date(item.time_period).toLocaleString('en-US', { month: 'long' }));
            }

            const mbrtData = data.map(item => item.avg_mbrt);

            if (window.mbrtChart) {
                window.mbrtChart.destroy();
            }
            window.mbrtChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Average MBRT',
                            data: mbrtData,
                            backgroundColor: 'rgba(255, 159, 64, 0.8)',
                            borderColor: 'rgba(23, 125, 255, 1)',
                            borderWidth: 2,
                            hoverBackgroundColor: 'rgba(255, 205, 86, 0.9)',
                            hoverBorderColor: 'rgba(54, 162, 235, 1)'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        duration: 1500,
                        easing: 'easeInOutCubic'
                    },
                    plugins: {
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            titleColor: '#ffffff',
                            bodyColor: '#ffffff',
                            bodyFont: {
                                size: 14
                            },
                            padding: 12
                        },
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                color: '#333',
                                font: {
                                    size: 14
                                },
                                padding: 20
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(200, 200, 200, 0.3)',
                                borderDash: [5, 5]
                            },
                            title: {
                                display: true,
                                text: 'MBRT Value',
                                color: '#666',
                                font: {
                                    size: 16,
                                    weight: 'bold'
                                }
                            }
                        },
                        x: {
                            grid: {
                                drawBorder: false,
                                color: 'rgba(200, 200, 200, 0.3)'
                            },
                            title: {
                                display: true,
                                text: filter === 'month' ? 'Months' : filter === 'week' ? 'Weeks' : 'Days',
                                color: '#666',
                                font: {
                                    size: 16,
                                    weight: 'bold'
                                }
                            },
                            ticks: {
                                color: '#555',
                                font: {
                                    size: 14
                                }
                            }
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Fetch data based on selected range and view type
function fetchCustomRangeData() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    if (!startDate || !endDate) {
        alert("Please select both start and end dates.");
        return;
    }

    // Determine the current view type (default to 'day')
    const viewType = 'day';

    // Fetch data from the backend for the selected range
    fetch(`/getDailyAverageMBRT/${viewType}?startDate=${startDate}&endDate=${endDate}`)
        .then(response => response.json())
        .then(data => {
            if (!Array.isArray(data) || data.length === 0) {
                console.error('No data available for the selected range');
                return;
            }
            renderChart(data, viewType);
        })
}

// Render the chart with the fetched data
function renderChart(data, viewType) {
    const ctx = document.getElementById('dailyAverageMBRT').getContext('2d');

    const labels = data.map(item => {
        if (viewType === 'month') {
            return new Date(item.time_period).toLocaleString('en-US', { month: 'long' });
        } else if (viewType === 'week') {
            return `Week ${item.week_number}`;  // Ensure you pass week number from your backend
        } else { // Default to 'day'
            return new Date(item.time_period).toLocaleString('en-US', { weekday: 'short' });
        }
    });

    const mbrtData = data.map(item => item.avg_mbrt);

    if (window.mbrtChart) {
        window.mbrtChart.destroy();
    }
    window.mbrtChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Average MBRT',
                    data: mbrtData,
                    backgroundColor: 'rgba(255, 159, 64, 0.8)',
                    borderColor: 'rgba(23, 125, 255, 1)',
                    borderWidth: 2,
                    hoverBackgroundColor: 'rgba(255, 205, 86, 0.9)',
                    hoverBorderColor: 'rgba(54, 162, 235, 1)'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1500,
                easing: 'easeInOutCubic'
            },
            plugins: {
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    bodyFont: {
                        size: 14
                    },
                    padding: 12
                },
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: '#333',
                        font: {
                            size: 14
                        },
                        padding: 20
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(200, 200, 200, 0.3)',
                        borderDash: [5, 5]
                    },
                    title: {
                        display: true,
                        text: 'MBRT Value',
                        color: '#666',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    }
                },
                x: {
                    grid: {
                        drawBorder: false,
                        color: 'rgba(200, 200, 200, 0.3)'
                    },
                    title: {
                        display: true,
                        text:  'Days',
                        color: '#666',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        color: '#555',
                        font: {
                            size: 14
                        }
                    }
                }
            }
        }
        
    });

        


}
renderMBRTChart('day');

