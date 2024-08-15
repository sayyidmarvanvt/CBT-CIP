import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const BudgetExpense = () => {
  const { currentEvent } = useSelector((state) => state.user);
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [expenseData, setExpenseData] = useState({
    amount: "",
    description: "",
    category: "",
  });
  const [editingExpense, setEditingExpense] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  const url = "https://eventplanner360-backend.onrender.com";

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${url}/api/budgets/${currentEvent._id}`,
          {
            withCredentials: true,
          }
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [currentEvent, categories]);

  // Fetch expenses
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(
          `${url}/api/expenses/${currentEvent._id}`,
          {
            withCredentials: true,
          }
        );
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
    fetchExpenses();
  }, [currentEvent, expenses]);

  // Handle adding or editing a category
  const handleSaveCategory = async () => {
    try {
      if (editingCategory) {
        // Edit existing category
        await axios.put(
          `${url}/api/budgets/categories/${editingCategory._id}`,
          {
            name: categoryName,
          },
          {
            withCredentials: true,
          }
        );
        setCategories(
          categories.map((category) =>
            category._id === editingCategory._id
              ? { ...category, name: categoryName }
              : category
          )
        );
      } else {
        // Add new category
        const response = await axios.post(
          `${url}/api/budgets/categories`,
          {
            name: categoryName,
            eventId: currentEvent._id,
          },
          {
            withCredentials: true,
          }
        );
        setCategories([...categories, response.data]);
      }
      setCategoryName("");
      setEditingCategory(null);
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  // Handle adding or editing an expense
  const handleSaveExpense = async () => {
    try {
      if (editingExpense) {
        // Edit existing expense
        await axios.put(
          `${url}/api/expenses/${editingExpense._id}`,
          expenseData,
          {
            withCredentials: true,
          }
        );
        setExpenses(
          expenses.map((expense) =>
            expense._id === editingExpense._id
              ? { ...expense, ...expenseData }
              : expense
          )
        );
      } else {
        // Add new expense
        const response = await axios.post(
          `${url}/api/expenses`,
          {
            ...expenseData,
            eventId: currentEvent._id,
          },
          {
            withCredentials: true,
          }
        );
        setExpenses([...expenses, response.data]);
      }
      setExpenseData({ amount: "", description: "", category: "" });
      setEditingExpense(null);
    } catch (error) {
      console.error("Error saving expense:", error);
    }
  };

  // Handle deleting a category
  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`${url}/api/budgets/categories/${id}`, {
        withCredentials: true,
      });
      setCategories(categories.filter((category) => category._id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // Handle deleting an expense
  const handleDeleteExpense = async (id) => {
    try {
      await axios.delete(`${url}/api/expenses/${id}`, {
        withCredentials: true,
      });
      setExpenses(expenses.filter((expense) => expense._id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <div className="flexCenter">
      <h2>Budget and Expense Management</h2>

      {/* Budget Category Section */}
      <div>
        <h4>Budget Categories</h4>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Category name"
        />
        <button onClick={handleSaveCategory}>
          {editingCategory ? "Update Category" : "Add Category"}
        </button>
        <ul>
          {categories.map((category) => (
            <li key={category._id}>
              {category.name}
              <div>
                <button
                  onClick={() => {
                    setEditingCategory(category);
                    setCategoryName(category.name);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handleDeleteCategory(category._id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Expense Section */}
      <div>
        <h4>Expenses</h4>
        <input
          type="number"
          value={expenseData.amount}
          onChange={(e) =>
            setExpenseData({ ...expenseData, amount: e.target.value })
          }
          placeholder="Amount"
        />
        <input
          type="text"
          value={expenseData.description}
          onChange={(e) =>
            setExpenseData({ ...expenseData, description: e.target.value })
          }
          placeholder="Description"
        />
        <select
          value={expenseData.category}
          onChange={(e) =>
            setExpenseData({ ...expenseData, category: e.target.value })
          }
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <button onClick={handleSaveExpense}>
          {editingExpense ? "Update Expense" : "Add Expense"}
        </button>

        <ul>
          {expenses.map((expense) => (
            <li key={expense._id}>
              {expense.amount} - {expense.description} | Category:
              {expense.category.name}
              <div>
                <button
                  onClick={() => {
                    setEditingExpense(expense);
                    setExpenseData({
                      amount: expense.amount,
                      description: expense.description,
                      category: expense.category,
                    });
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handleDeleteExpense(expense._id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BudgetExpense;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";

// const BudgetExpense = () => {
//   const { currentEvent } = useSelector((state) => state.user);
//   const [categories, setCategories] = useState([]);
//   const [expenses, setExpenses] = useState([]);
//   const [categoryName, setCategoryName] = useState("");
//   const [expenseData, setExpenseData] = useState({
//     amount: "",
//     description: "",
//     category: "",
//   });

//   // Fetch budget categories
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get(`/api/budgets/${currentEvent._id}`);
//         setCategories(response.data);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };
//     fetchCategories();
//   }, [currentEvent]);

//   // Fetch expenses
//   useEffect(() => {
//     const fetchExpenses = async () => {
//       try {
//         const response = await axios.get(`/api/expenses/${currentEvent._id}`);
//         setExpenses(response.data);
//       } catch (error) {
//         console.error("Error fetching expenses:", error);
//       }
//     };
//     fetchExpenses();
//   }, [currentEvent,categories]);
// console.log("expense",expenses);

//   // Handle adding a new category
//   const handleAddCategory = async () => {
//     try {
//       const response = await axios.post(`/api/budgets/categories`, {
//         name: categoryName,
//         eventId: currentEvent._id,
//       });
//       setCategories([...categories, response.data]);
//       setCategoryName("");
//     } catch (error) {
//       console.error("Error adding category:", error);
//     }
//   };
//   console.log("categories",categories);

//   // Handle adding a new expense
//   const handleAddExpense = async () => {
//     try {
//       const response = await axios.post(`/api/expenses`, {
//         ...expenseData,
//         eventId: currentEvent._id,
//       });
//       setExpenses([...expenses, response.data]);
//       setExpenseData({ amount: "", description: "", category: "" });
//     } catch (error) {
//       console.error("Error adding expense:", error);
//     }
//   };

//   return (
//     <div className="flexCenter">
//       <h1>Budget and Expense Management</h1>

//       {/* Budget Category Section */}
//       <div>
//         <h2>Budget Categories</h2>
//         <input
//           type="text"
//           value={categoryName}
//           onChange={(e) => setCategoryName(e.target.value)}
//           placeholder="New category name"
//         />
//         <button onClick={handleAddCategory}>Add Category</button>
//         <ul>
//           {categories.map((category) => (
//             <li key={category._id}>{category.name}</li>
//           ))}
//         </ul>
//       </div>

//       {/* Expense Section */}
//       <div>
//         <h2>Expenses</h2>
//         <input
//           type="number"
//           value={expenseData.amount}
//           onChange={(e) =>
//             setExpenseData({ ...expenseData, amount: e.target.value })
//           }
//           placeholder="Amount"
//         />
//         <input
//           type="text"
//           value={expenseData.description}
//           onChange={(e) =>
//             setExpenseData({ ...expenseData, description: e.target.value })
//           }
//           placeholder="Description"
//         />
//         <select
//           value={expenseData.category}
//           onChange={(e) =>
//             setExpenseData({ ...expenseData, category: e.target.value })
//           }
//         >
//           <option value="">Select Category</option>
//           {categories.map((category) => (
//             <option key={category._id} value={category._id}>
//               {category.name}
//             </option>
//           ))}
//         </select>
//         <button onClick={handleAddExpense}>Add Expense</button>

//         <ul>
//           {expenses.map((expense) => (
//             <li key={expense._id}>
//               {expense.amount} - {expense.description} | Category:
//                 {expense.category.name}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default BudgetExpense;
