export const predefinedQueries = [
  {
    name: "Customer Orders",
    query: `SELECT c.customer_id, c.name, c.email, COUNT(o.order_id) as total_orders, 
SUM(o.total_amount) as total_spent
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.name, c.email
ORDER BY total_spent DESC
LIMIT 10;`,
    description: "Shows top 10 customers by total amount spent",
  },
  {
    name: "Product Inventory",
    query: `SELECT p.product_id, p.name, p.category, p.price, i.quantity_in_stock,
(p.price * i.quantity_in_stock) as inventory_value
FROM products p
JOIN inventory i ON p.product_id = i.product_id
WHERE i.quantity_in_stock > 0
ORDER BY inventory_value DESC;`,
    description: "Shows all products in stock with their inventory value",
  },
  {
    name: "Sales by Region",
    query: `SELECT r.region_name, COUNT(s.sale_id) as total_sales,
SUM(s.amount) as revenue, AVG(s.amount) as avg_sale
FROM sales s
JOIN regions r ON s.region_id = r.region_id
WHERE s.sale_date BETWEEN '2023-01-01' AND '2023-12-31'
GROUP BY r.region_name
ORDER BY revenue DESC;`,
    description: "Shows sales performance by region for 2023",
  },
  {
    name: "Employee Performance",
    query: `SELECT e.employee_id, e.first_name, e.last_name, e.department,
COUNT(t.task_id) as tasks_completed, AVG(t.completion_time) as avg_completion_time
FROM employees e
JOIN tasks t ON e.employee_id = t.assigned_to
WHERE t.status = 'Completed'
GROUP BY e.employee_id, e.first_name, e.last_name, e.department
ORDER BY tasks_completed DESC;`,
    description: "Shows employee performance based on completed tasks",
  },
  {
    name: "Website Analytics",
    query: `SELECT p.page_url, COUNT(v.visit_id) as total_visits,
AVG(v.time_spent) as avg_time_spent, 
COUNT(DISTINCT v.visitor_id) as unique_visitors
FROM page_visits v
JOIN pages p ON v.page_id = p.page_id
WHERE v.visit_date >= DATEADD(day, -30, GETDATE())
GROUP BY p.page_url
ORDER BY total_visits DESC
LIMIT 20;`,
    description: "Shows website analytics for the last 30 days",
  },
];

// Dummy data for each query
export const dummyData = {
  "Customer Orders": {
    columns: ["customer_id", "name", "email", "total_orders", "total_spent"],
    rows: [
      {
        customer_id: 1001,
        name: "John Smith",
        email: "john.smith@example.com",
        total_orders: 12,
        total_spent: 2450.75,
      },
      {
        customer_id: 1042,
        name: "Emily Johnson",
        email: "emily.j@example.com",
        total_orders: 8,
        total_spent: 1875.2,
      },
      {
        customer_id: 1103,
        name: "Michael Brown",
        email: "mbrown@example.com",
        total_orders: 15,
        total_spent: 1654.5,
      },
      {
        customer_id: 1027,
        name: "Sarah Davis",
        email: "sarah.davis@example.com",
        total_orders: 6,
        total_spent: 1245.8,
      },
      {
        customer_id: 1056,
        name: "David Wilson",
        email: "dwilson@example.com",
        total_orders: 9,
        total_spent: 1198.25,
      },
      {
        customer_id: 1078,
        name: "Jessica Taylor",
        email: "jtaylor@example.com",
        total_orders: 7,
        total_spent: 1087.4,
      },
      {
        customer_id: 1092,
        name: "Robert Martinez",
        email: "rmartinez@example.com",
        total_orders: 5,
        total_spent: 978.6,
      },
      {
        customer_id: 1115,
        name: "Jennifer Garcia",
        email: "jgarcia@example.com",
        total_orders: 4,
        total_spent: 876.3,
      },
      {
        customer_id: 1023,
        name: "Daniel Anderson",
        email: "danderson@example.com",
        total_orders: 3,
        total_spent: 765.45,
      },
      {
        customer_id: 1067,
        name: "Lisa Thomas",
        email: "lthomas@example.com",
        total_orders: 2,
        total_spent: 654.2,
      },
    ],
  },
  "Product Inventory": {
    columns: [
      "product_id",
      "name",
      "category",
      "price",
      "quantity_in_stock",
      "inventory_value",
    ],
    rows: [
      {
        product_id: 101,
        name: "Smartphone X",
        category: "Electronics",
        price: 899.99,
        quantity_in_stock: 45,
        inventory_value: 40499.55,
      },
      {
        product_id: 203,
        name: "Laptop Pro",
        category: "Electronics",
        price: 1299.99,
        quantity_in_stock: 30,
        inventory_value: 38999.7,
      },
      {
        product_id: 305,
        name: "Designer Watch",
        category: "Accessories",
        price: 249.99,
        quantity_in_stock: 120,
        inventory_value: 29998.8,
      },
      {
        product_id: 407,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 179.99,
        quantity_in_stock: 85,
        inventory_value: 15299.15,
      },
      {
        product_id: 509,
        name: "Running Shoes",
        category: "Footwear",
        price: 129.99,
        quantity_in_stock: 95,
        inventory_value: 12349.05,
      },
      {
        product_id: 611,
        name: "Coffee Maker",
        category: "Home Appliances",
        price: 89.99,
        quantity_in_stock: 60,
        inventory_value: 5399.4,
      },
      {
        product_id: 713,
        name: "Yoga Mat",
        category: "Fitness",
        price: 29.99,
        quantity_in_stock: 150,
        inventory_value: 4498.5,
      },
      {
        product_id: 815,
        name: "Desk Lamp",
        category: "Home Decor",
        price: 39.99,
        quantity_in_stock: 110,
        inventory_value: 4398.9,
      },
      {
        product_id: 917,
        name: "Water Bottle",
        category: "Accessories",
        price: 19.99,
        quantity_in_stock: 200,
        inventory_value: 3998.0,
      },
      {
        product_id: 1019,
        name: "Backpack",
        category: "Accessories",
        price: 59.99,
        quantity_in_stock: 65,
        inventory_value: 3899.35,
      },
      {
        product_id: 1121,
        name: "Bluetooth Speaker",
        category: "Electronics",
        price: 69.99,
        quantity_in_stock: 55,
        inventory_value: 3849.45,
      },
      {
        product_id: 1223,
        name: "Sunglasses",
        category: "Accessories",
        price: 99.99,
        quantity_in_stock: 35,
        inventory_value: 3499.65,
      },
    ],
  },
  "Sales by Region": {
    columns: ["region_name", "total_sales", "revenue", "avg_sale"],
    rows: [
      {
        region_name: "North America",
        total_sales: 1245,
        revenue: 875450.25,
        avg_sale: 702.37,
      },
      {
        region_name: "Europe",
        total_sales: 987,
        revenue: 654320.75,
        avg_sale: 662.94,
      },
      {
        region_name: "Asia Pacific",
        total_sales: 1102,
        revenue: 598760.5,
        avg_sale: 543.34,
      },
      {
        region_name: "Latin America",
        total_sales: 645,
        revenue: 321450.8,
        avg_sale: 498.37,
      },
      {
        region_name: "Middle East",
        total_sales: 478,
        revenue: 287650.4,
        avg_sale: 601.78,
      },
      {
        region_name: "Africa",
        total_sales: 325,
        revenue: 187540.3,
        avg_sale: 577.05,
      },
      {
        region_name: "Australia/Oceania",
        total_sales: 289,
        revenue: 176890.2,
        avg_sale: 612.08,
      },
    ],
  },
  "Employee Performance": {
    columns: [
      "employee_id",
      "first_name",
      "last_name",
      "department",
      "tasks_completed",
      "avg_completion_time",
    ],
    rows: [
      {
        employee_id: 1001,
        first_name: "James",
        last_name: "Wilson",
        department: "Sales",
        tasks_completed: 87,
        avg_completion_time: 3.2,
      },
      {
        employee_id: 1042,
        first_name: "Maria",
        last_name: "Garcia",
        department: "Marketing",
        tasks_completed: 76,
        avg_completion_time: 2.8,
      },
      {
        employee_id: 1103,
        first_name: "Robert",
        last_name: "Johnson",
        department: "IT",
        tasks_completed: 92,
        avg_completion_time: 4.1,
      },
      {
        employee_id: 1027,
        first_name: "Linda",
        last_name: "Chen",
        department: "HR",
        tasks_completed: 65,
        avg_completion_time: 2.5,
      },
      {
        employee_id: 1056,
        first_name: "Michael",
        last_name: "Brown",
        department: "Finance",
        tasks_completed: 71,
        avg_completion_time: 3.7,
      },
      {
        employee_id: 1078,
        first_name: "Susan",
        last_name: "Miller",
        department: "Operations",
        tasks_completed: 83,
        avg_completion_time: 3.9,
      },
      {
        employee_id: 1092,
        first_name: "David",
        last_name: "Taylor",
        department: "IT",
        tasks_completed: 89,
        avg_completion_time: 4.3,
      },
      {
        employee_id: 1115,
        first_name: "Jennifer",
        last_name: "Davis",
        department: "Marketing",
        tasks_completed: 74,
        avg_completion_time: 2.9,
      },
      {
        employee_id: 1023,
        first_name: "Thomas",
        last_name: "Martinez",
        department: "Sales",
        tasks_completed: 79,
        avg_completion_time: 3.4,
      },
      {
        employee_id: 1067,
        first_name: "Sarah",
        last_name: "Anderson",
        department: "Customer Support",
        tasks_completed: 81,
        avg_completion_time: 3.1,
      },
    ],
  },
  "Website Analytics": {
    columns: ["page_url", "total_visits", "avg_time_spent", "unique_visitors"],
    rows: [
      {
        page_url: "/home",
        total_visits: 45678,
        avg_time_spent: 120.5,
        unique_visitors: 28945,
      },
      {
        page_url: "/products",
        total_visits: 32456,
        avg_time_spent: 95.2,
        unique_visitors: 21567,
      },
      {
        page_url: "/about",
        total_visits: 12345,
        avg_time_spent: 45.8,
        unique_visitors: 10234,
      },
      {
        page_url: "/contact",
        total_visits: 9876,
        avg_time_spent: 65.3,
        unique_visitors: 8765,
      },
      {
        page_url: "/blog",
        total_visits: 21543,
        avg_time_spent: 180.7,
        unique_visitors: 15432,
      },
      {
        page_url: "/services",
        total_visits: 18765,
        avg_time_spent: 75.4,
        unique_visitors: 14321,
      },
      {
        page_url: "/login",
        total_visits: 34567,
        avg_time_spent: 25.6,
        unique_visitors: 23456,
      },
      {
        page_url: "/signup",
        total_visits: 23456,
        avg_time_spent: 40.2,
        unique_visitors: 18765,
      },
      {
        page_url: "/checkout",
        total_visits: 12345,
        avg_time_spent: 150.3,
        unique_visitors: 9876,
      },
      {
        page_url: "/cart",
        total_visits: 19876,
        avg_time_spent: 85.9,
        unique_visitors: 15678,
      },
      {
        page_url: "/faq",
        total_visits: 8765,
        avg_time_spent: 120.4,
        unique_visitors: 7654,
      },
      {
        page_url: "/terms",
        total_visits: 4321,
        avg_time_spent: 60.7,
        unique_visitors: 3987,
      },
      {
        page_url: "/privacy",
        total_visits: 5432,
        avg_time_spent: 55.3,
        unique_visitors: 4876,
      },
      {
        page_url: "/blog/latest-post",
        total_visits: 9876,
        avg_time_spent: 210.5,
        unique_visitors: 8765,
      },
      {
        page_url: "/products/featured",
        total_visits: 15678,
        avg_time_spent: 130.2,
        unique_visitors: 12345,
      },
      {
        page_url: "/support",
        total_visits: 7654,
        avg_time_spent: 95.8,
        unique_visitors: 6543,
      },
      {
        page_url: "/careers",
        total_visits: 6543,
        avg_time_spent: 85.4,
        unique_visitors: 5432,
      },
      {
        page_url: "/newsletter",
        total_visits: 5432,
        avg_time_spent: 35.6,
        unique_visitors: 4321,
      },
      {
        page_url: "/downloads",
        total_visits: 8765,
        avg_time_spent: 110.3,
        unique_visitors: 7654,
      },
      {
        page_url: "/partners",
        total_visits: 4321,
        avg_time_spent: 70.9,
        unique_visitors: 3456,
      },
    ],
  },
};

export const randomDummyData = [
  {
    columns: ["id", "name", "category", "value", "created_at"],
    rows: [
      {
        id: 1,
        name: "Sample Item 1",
        category: "Category A",
        value: 123.45,
        created_at: "2023-01-15",
      },
      {
        id: 2,
        name: "Sample Item 2",
        category: "Category B",
        value: 67.89,
        created_at: "2023-02-20",
      },
      {
        id: 3,
        name: "Sample Item 3",
        category: "Category A",
        value: 456.78,
        created_at: "2023-03-10",
      },
      {
        id: 4,
        name: "Sample Item 4",
        category: "Category C",
        value: 234.56,
        created_at: "2023-04-05",
      },
      {
        id: 5,
        name: "Sample Item 5",
        category: "Category B",
        value: 789.12,
        created_at: "2023-05-12",
      },
    ],
  },
  {
    columns: ["user_id", "username", "email", "status", "last_login"],
    rows: [
      {
        user_id: 101,
        username: "user1",
        email: "user1@example.com",
        status: "Active",
        last_login: "2023-06-01 14:30:00",
      },
      {
        user_id: 102,
        username: "user2",
        email: "user2@example.com",
        status: "Inactive",
        last_login: "2023-05-28 09:15:00",
      },
      {
        user_id: 103,
        username: "user3",
        email: "user3@example.com",
        status: "Active",
        last_login: "2023-06-02 11:45:00",
      },
      {
        user_id: 104,
        username: "user4",
        email: "user4@example.com",
        status: "Pending",
        last_login: "2023-05-30 16:20:00",
      },
      {
        user_id: 105,
        username: "user5",
        email: "user5@example.com",
        status: "Active",
        last_login: "2023-06-03 08:10:00",
      },
    ],
  },
  {
    columns: ["transaction_id", "amount", "type", "status", "date"],
    rows: [
      {
        transaction_id: "TX001",
        amount: 150.0,
        type: "Payment",
        status: "Completed",
        date: "2023-06-01",
      },
      {
        transaction_id: "TX002",
        amount: 75.5,
        type: "Refund",
        status: "Pending",
        date: "2023-06-02",
      },
      {
        transaction_id: "TX003",
        amount: 200.25,
        type: "Payment",
        status: "Completed",
        date: "2023-06-02",
      },
      {
        transaction_id: "TX004",
        amount: 50.0,
        type: "Deposit",
        status: "Completed",
        date: "2023-06-03",
      },
      {
        transaction_id: "TX005",
        amount: 125.75,
        type: "Payment",
        status: "Failed",
        date: "2023-06-03",
      },
    ],
  },
];
