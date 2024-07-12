const form = document.getElementById('transactionForm');
const totalBudgetElement = document.getElementById('totalBudget');
const totalExpenseElement = document.getElementById('totalExpense');
const transactionList = document.getElementById('transactionList');
let totalBudget = 0;
let totalExpense = 0;
let transactions = [];

function updateTotalBudget() {
    totalBudgetElement.textContent = `Total Budget: ₹${totalBudget.toFixed(2)}`;
    totalBudgetElement.style.color = totalBudget >= 0 ? '#5cb85c' : '#d9534f';
}

function updateTotalExpense() {
    totalExpenseElement.textContent = `Total Expense: ₹${totalExpense.toFixed(2)}`;
}

function addTransaction(description, amount, type, category, tag, date) {
    transactions.push({ description, amount, type, category, tag, date });
    transactions.sort((a, b) => new Date(a.date) - new Date(b.date));
    renderTransactions();
}

function renderTransactions() {
    transactionList.innerHTML = '';
    transactions.forEach(transaction => {
        const transactionItem = document.createElement('li');
        transactionItem.classList.add('transaction', transaction.type);
        transactionItem.innerHTML = `
            <span>${transaction.date} - ${transaction.description} - ${transaction.category} ${transaction.tag ? `(${transaction.tag})` : ''}</span>
            <span>₹${transaction.amount.toFixed(2)}</span>
        `;
        transactionList.appendChild(transactionItem);
    });
}

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    const category = document.getElementById('category').value;
    const tag = document.getElementById('tag').value;
    const date = document.getElementById('date').value;

    if (type === 'expense') {
        totalBudget -= amount;
        totalExpense += amount;
    } else {
        totalBudget += amount;
    }

    updateTotalBudget();
    updateTotalExpense();
    addTransaction(description, amount, type, category, tag, date);
    form.reset();
});
