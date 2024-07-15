async function dataFetch() {
try {
    const response = await fetch ("../data.json");
    const data =await response.json();
    console.log(data);
    displays( data.customers, data.transactions);
} catch (error) {
console.log("errror");
}
}

function displays(cus ,trans) {
let box="";
for (let i = 0; i < trans.length; i++) {
const customer = cus.find(e => e.id === trans[i].customer_id);
if (customer) {
    box+=`
<tr>
<td>${customer.name}</td>
<td>${trans[i].date}</td>
<td>${trans[i].amount.toFixed(3)}</td>
</tr>
`
}

}
document.getElementById("cus-table").innerHTML=box;
}
dataFetch()
