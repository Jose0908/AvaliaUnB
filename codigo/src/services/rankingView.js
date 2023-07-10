import pool from './initBd.js';

export async function getRanking() {
    const [rows] = await pool.query("SELECT * FROM Ranking");
    return rows;
  }