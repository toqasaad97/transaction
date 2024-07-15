async function fetchData() {
  try {
      const response = await fetch("../data.json");
      const data = await response.json();
      console.log(data);
      displayCustomers(data.customers, data.transactions);
  } catch (error) {
      console.log("error", error);
  }
}

function displayCustomers(customers, transactions) {
  let tableContent = "";
  for (let i = 0; i < transactions.length; i++) {
      const customer = customers.find(e => e.id === transactions[i].customer_id);

      if (customer) {
          tableContent += `
              <tr>
                  <td>${customer.name}</td>
                  <td>${transactions[i].date}</td>
                  <td>${transactions[i].amount.toFixed(2)}</td>
              </tr>
          `;
      }
  }
  document.getElementById("customerTable").innerHTML = tableContent;
}

fetchData();
