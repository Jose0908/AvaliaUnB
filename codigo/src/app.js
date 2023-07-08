import express from 'express'
import { getUsers, createUser, deleteUser, updateUser} from './crud-usuario.js'
import { getTurma, getTurmas, createTurma, deleteTurma, updateTurma } from './crud-turmas.js'
import { getAvaliacao, updateAvaliacao, getAvaliacaoFromTurma, getAvaliacoes, createAvaliacao, deleteAvaliacao } from './crud-avaliacao.js'

const app = express()
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render("index.ejs")
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
  const [avaliacao] = await getAvaliacao(idAvaliacao)
  res.render("editAvaliacao.ejs", {avaliacao})
})

app.post('/turmas/edit/:idAvaliacao', async (req, res) => {
  const idAvaliacao = req.params.idAvaliacao
  const avaliacao = req.body
  const result = await updateAvaliacao(idAvaliacao, avaliacao)
  res.redirect("/turmas/"+avaliacao.id_turma)
})

app.get('/login', (req, res) => {
  res.render("login.ejs")
})

app.post('/login', (req, res) => {
  res.redirect("/")
})

app.get('/register', (req, res) => {
  res.render("register.ejs", {error: ''})
})
app.post('/register', async (req, res) => {
  const dados = req.body;
  const create = await createUser(dados);
  console.log(create)
  if (create === 'Usuário criado com sucesso') {
    res.redirect("/");
  } else if (create === 'Matrícula já cadastrada') {
    res.render("register.ejs", { error: 'Matrícula já cadastrada' });
  } else if (create === 'Email já cadastrado') {
    res.render("register.ejs", { error: 'E-mail já cadastrado' });
  } 
})

app.get('/ranking', (req, res) => {
  res.render("ranking.ejs")
})

app.listen(3000, () => {
  console.log(`Servidor rodando em localhost:3000`)
})