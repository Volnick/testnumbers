// pages/api/save-number.js
import mysql from 'mysql2/promise';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { number } = req.body;

    try {
      const connection = await mysql.createConnection({
        host: process.env.MARIADB_HOST,
        user: process.env.MARIADB_USER,
        password: process.env.MARIADB_PASSWORD,
        database: process.env.MARIADB_DATABASE,
      });

      await connection.execute('INSERT INTO numbers (number) VALUES (?)', [number]);
      await connection.end();

      res.status(200).json({ message: 'Number saved successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to save number.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
