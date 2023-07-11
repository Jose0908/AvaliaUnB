import fs from "fs";
import dotenv from "dotenv";
import pool from "./src/services/initBd.js";

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

const dataSql = fs.readFileSync("./sql/createTables.sql").toString();
const viewCreate = fs.readFileSync("./sql/createView.sql").toString();
const procedureCreate = fs.readFileSync("./sql/createProcedure.sql").toString();
const insertData = fs.readFileSync("./sql/insertData.sql").toString();


// Dar split em uma linha vazia
const arraySqlCreateTables = dataSql.split("\n\n");
const arraySqlInsertTables = insertData.split("\n\n");

arraySqlCreateTables.pop();

async function createTables() {
  try {
    for (const query of arraySqlCreateTables) {
      await pool.query(query);
      console.log("Tabela criada com sucesso!");
    }
    console.log("Todas as queries foram concluídas.");
  } catch (err) {
    console.log("Erro ao executar as queries:", err);
  }
}

async function createViews() {
  try {
    await pool.query(viewCreate);
    console.log("View criada com sucesso!");
  } catch (err) {
    console.log("Erro ao executar as queries:", err);
  }
}

async function createProcedures() {
  try {
    await pool.query(procedureCreate);
    console.log("Procedure criada com sucesso!");
  }
  catch (err) {
    console.log("Erro ao executar as queries:", err);
  }
}

async function insertDataTable() {
  try {
    for (const query of arraySqlInsertTables) {
      await pool.query(query);
      console.log("Dados inseridos com sucesso!");
    }
  } catch (err) {
    console.log("Erro ao executar as queries:", err);
  } finally {
    pool.end(); // Fechar a pool após todas as queries serem concluídas ou em caso de erro
  }
}

const create1 = await createTables();
const create2 = await createViews();
const create3 = await createProcedures();
const create4 = await insertDataTable();
