import pool from "./initBd.js";

export async function getRanking() {
  const [rows] = await pool.query("SELECT * FROM ranking_turmas");
  return rows;
}
