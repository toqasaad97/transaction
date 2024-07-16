let data;

async function dataFetch() {
    try {
        const response = await fetch("../data.json");
        data = await response.json();
        console.log("Fetched data:", data);
        displays();
        createGraph();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
function findCustomer(customerId) {
    return data.customers.find((customer) => customer.id === customerId);
}
function displays() {
    const searchName = document.getElementById('searchName').value.toLowerCase();
    const searchAmount = parseFloat(document.getElementById('searchAmount').value);

    let filter = [];
    for (let i = 0; i < data.transactions.length; i++) {
        const transaction = data.transactions[i];
        const customer = findCustomer(transaction.customer_id);

        if ((!searchName || (customer && customer.name.toLowerCase().includes(searchName))) &&
            (isNaN(searchAmount) || transaction.amount == searchAmount)) {

            filter.push(transaction);
        }
    }

    let box = "";
    for (let i = 0; i < filter.length; i++) {
        const transaction = filter[i];
        const customer = findCustomer(transaction.customer_id);
        box += `
            <tr>
                <td>${customer ? customer.name : '-'}</td>
                <td>${transaction.date}</td>
                <td>${transaction.amount.toFixed(2)}</td>
            </tr>
        `;
    }
    document.getElementById("cus-table").innerHTML = box;
}
document.getElementById('searchName').addEventListener('input', displays);
document.getElementById('searchAmount').addEventListener('input', displays);
dataFetch();
function createGraph() {
    console.log("Creating graph with data:", data);

    const customerData = data.customers.reduce((acc, customer) => {
        acc[customer.name] = 0;
        return acc;
    }, {});

    data.transactions.forEach(transaction => {
        const customer = findCustomer(transaction.customer_id);
        customerData[customer.name] += transaction.amount;
    });

    console.log("Customer Data:", customerData);

    const labels = Object.keys(customerData);
    const amounts = Object.values(customerData);

    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Total Amount per Customer',
                data: amounts,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y.toFixed(2);
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 100
                    }
                }
            }
        }
    });

    // Adjust canvas dimensions via CSS
    document.getElementById('myChart').style.width = '100%';
    document.getElementById('myChart').style.height = '40vh';
}
