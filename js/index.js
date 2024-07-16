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
