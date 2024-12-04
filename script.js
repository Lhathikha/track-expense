// Get references to DOM elements
const totalIncomeElem = document.getElementById("total-income");
const totalExpensesElem = document.getElementById("total-expenses");
const netIncomeElem = document.getElementById("net-income");
const transactionListElem = document.getElementById("transaction-list");
const form = document.getElementById("add-transaction-form");

// Variables to store data
let transactions = [];

// Function to update calculations
function updateSummary() {
    const totalIncome = transactions
        .filter(t => t.type === "income")
        .reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpenses = transactions
        .filter(t => t.type === "expense")
        .reduce((acc, curr) => acc + curr.amount, 0);
    const netIncome = totalIncome - totalExpenses;

    totalIncomeElem.textContent = totalIncome.toFixed(2);
    totalExpensesElem.textContent = totalExpenses.toFixed(2);
    netIncomeElem.textContent = netIncome.toFixed(2);
}

// Function to render transactions
function renderTransactions() {
    transactionListElem.innerHTML = "";
    transactions.forEach((t, index) => {
        const item = document.createElement("li");
        item.className = `transaction-item ${t.type}`;
        item.innerHTML = `
            ${t.date} - ${t.description} (${t.category}): ${t.type === "income" ? "+" : "-"}$${t.amount}
            <button onclick="deleteTransaction(${index})">Delete</button>
        `;
        transactionListElem.appendChild(item);
    });
}

// Function to handle form submission
form.addEventListener("submit", function (e) {
    e.preventDefault();
    const date = document.getElementById("date").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const type = document.getElementById("type").value;

    if (!date || !description || !category || isNaN(amount) || !type) {
        alert("Please fill in all fields correctly!");
        return;
    }

    transactions.push({ date, description, category, amount, type });
    form.reset();
    updateSummary();
    renderTransactions();
});

// Function to delete a transaction
function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateSummary();
    renderTransactions();
}

// Initialize the app
updateSummary();
