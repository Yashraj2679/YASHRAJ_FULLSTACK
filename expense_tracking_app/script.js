let expenses = [];

const amountInput = document.getElementById("amount");
const categorySelect = document.getElementById("category");
const addBtn = document.getElementById("addBtn");
const expenseList = document.getElementById("expenseList");

addBtn.addEventListener("click", addExpense);

function addExpense() {
    const amount = amountInput.value;
    const category = categorySelect.value;

    if (amount === "") {
        alert("Enter amount");
        return;
    }

    const expense = {
        id: Date.now(),
        amount: amount,
        category: category
    };

    expenses.push(expense);
    amountInput.value = "";
    displayExpenses();
}

function displayExpenses() {
    expenseList.innerHTML = "";

    expenses.forEach(expense => {
        const li = document.createElement("li");

        li.textContent = expense.amount + " - " + expense.category + " ";

        const updateBtn = document.createElement("button");
        updateBtn.textContent = "Update";
        updateBtn.addEventListener("click", function () {
            updateExpense(expense.id);
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", function () {
            deleteExpense(expense.id);
        });

        li.appendChild(updateBtn);
        li.appendChild(deleteBtn);

        expenseList.appendChild(li);
    });
}

function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    displayExpenses();
}

function updateExpense(id) {
    const expense = expenses.find(expense => expense.id === id);

    const newAmount = prompt("Enter new amount:", expense.amount);

    if (newAmount !== null && newAmount !== "") {
        expense.amount = newAmount;
        displayExpenses();
    }
}