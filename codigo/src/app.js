import express from 'express'
import { getUser, getUsers, createUser, deleteUser, updateUser} from './database.js'

const app = express()
app.set("view engine", "ejs")


app.get('/', (req, res) => {
  res.render("index.ejs")
})

app.use(express.static("public"))

app.get('/turmas', async (req, res) => {
  const turmas = await getUsers()
  res.render("turmas.ejs", {turmas})
})

app.get('/usuarios', async (req, res) => {
  const usuarios = await getUsers()
  res.send(usuarios)
})

app.post('/usuarios', async (req, res) => {
  const { matricula, isADmin, nome, email, curso, senha } = req.body
  const result = await createUser(matricula, isADmin, nome, email, curso, senha)
  res.status(201).send('foi')
})

app.use(express.json())

app.listen(3000, () => {
  console.log(`Servidor rodando em localhost:3000`)
})