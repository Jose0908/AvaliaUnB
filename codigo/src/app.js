import express from 'express'
import { getUser, getUsers, createUser, deleteUser, updateUser} from './crud-usuario.js'
import { getTurma, getTurmas, createTurma, deleteTurma, updateTurma } from './crud-turmas.js'
import { getAvaliacao, getAvaliacaoFromTurma, getAvaliacoes, createAvaliacao, deleteAvaliacao } from './crud-avaliacao.js'

const app = express()
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render("index.ejs")
})

app.get('/avaliacoes', async (req, res) => {
  const avaliacoes = await deleteAvaliacao(10)
  res.send(avaliacoes)
})

app.get('/turmas', async (req, res) => {
  const turmas = await getTurmas()
  res.render("turmas.ejs", {turmas})
})

app.get('/turmas/:id', async (req, res) => {
  const [turma] = await getTurma(req.params.id)
  const avaliacoes = await getAvaliacaoFromTurma(req.params.id)
  const contexto = {
    turma: turma,
    avaliacoes: avaliacoes
  };
  res.render("turma.ejs", {contexto})
})

app.post('/turmas/create', async (req, res) => {
  const avaliacao = req.body
  const result = await createAvaliacao(avaliacao)
  res.redirect('/turmas/'+avaliacao.id_turma)
})

app.post('/turmas/:idTurma/delete/:idAvaliacao', async (req, res) => {
  const idTurma = req.params.idTurma
  const idAvaliacao = req.params.idAvaliacao
  const result = await deleteAvaliacao(idAvaliacao)
  res.redirect('/turmas/' + idTurma)
})

app.post('/turmas/:idTurma/edit/:idAvaliacao', async (req, res) => {
  const idTurma = req.params.idTurma
  const idAvaliacao = req.params.idAvaliacao
  res.redirect("/turmas/"+idTurma+"/edit/"+idAvaliacao)
})

app.get('/turmas/:idTurma/edit/:idAvaliacao', async (req, res) => {
  const idAvaliacao = req.params.idAvaliacao
  const avaliacao = await getAvaliacao(idAvaliacao)
  console.log(avaliacao)
  res.render("editAvaliacao.ejs", {avaliacao})
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