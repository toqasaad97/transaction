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
