const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
app.use(bodyParser.json());

const pool = new Pool({
	user: 'your_user',
	host: 'localhost',
	database: 'your_database',
	password: 'your_password',
	port: 5432,
});

app.post('/orders', async (req, res) => {
	const { userId, product, quantity, address } = req.body;

	if (!userId || !product || !quantity || !address) {
		return res.status(400).json({ error: 'All fields are required' });
	}

	try {
		const result = await pool.query(
			`INSERT INTO orders (user_id, product, quantity, address, status) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
			[userId, product, quantity, address, 'Pending']
		);

		const orderId = result.rows[0].id;
		res.status(201).json({ orderId });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to create order' });
	}
});

app.put('/orders/:orderId', async (req, res) => {
	const { orderId } = req.params;
	const { userId, status } = req.body;

	if (!['Approved', 'Rejected'].includes(status)) {
		return res
			.status(400)
			.json({ error: 'Invalid status. Use "Approved" or "Rejected"' });
	}

	try {
		const adminCheck = await pool.query(
			`SELECT is_admin FROM users WHERE id = $1`,
			[userId]
		);
		if (!adminCheck.rows[0] || !adminCheck.rows[0].is_admin) {
			return res.status(403).json({ error: 'Admin access required' });
		}

		const result = await pool.query(
			`UPDATE orders SET status = $1 WHERE id = $2 RETURNING id`,
			[status, orderId]
		);

		if (result.rowCount === 0) {
			return res.status(404).json({ error: 'Order not found' });
		}

		res.status(200).json({ message: `Order ${orderId} has been ${status}` });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to update order status' });
	}
});

app.get('/orders/:orderId/status', async (req, res) => {
	const { orderId } = req.params;

	try {
		const result = await pool.query(
			`SELECT status FROM orders WHERE id = $1`,
			[orderId]
		);

		if (result.rows.length === 0) {
			return res.status(404).json({ error: 'Order not found' });
		}

		res.status(200).json({ status: result.rows[0].status });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to fetch order status' });
	}
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

// SQL schema for PostgreSQL
// CREATE TABLE orders (
//   id SERIAL PRIMARY KEY,
//   user_id INT NOT NULL,
//   product TEXT NOT NULL,
//   quantity INT NOT NULL,
//   address TEXT NOT NULL,
//   status TEXT NOT NULL
// );

// CREATE TABLE users (
//   id SERIAL PRIMARY KEY,
//   is_admin BOOLEAN NOT NULL
// );
