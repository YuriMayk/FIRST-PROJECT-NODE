const express = require("express")
//Chamando(importando) o express.
const uuid = require("uuid")
//chamando(importando) a biblioteca uuid.

const cors = require("cors");
// importando o cors, que liberará o acesso À API.

const port = 3001
// Definindo porta a ser utilizada

const app = express()
//Armazenando o Express em uma variável
app.use(express.json())

//habilitando o cors para qualquer solicitador.
app.use(cors());


// Criando Array para armazenar usuários.
const users = []

//Criando Middlewares(consertar)
const CheckIdUser = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "User not found"})
    }

    request.userIndex = index
    request.id = id

    next()
}


//Abaixo estão quatro rotas.
app.get('/users', (request, response) => {

    return response.json(users)
})

app.post('/users', (request, response) => {
    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age }
    users.push(user)
    return response.status(201).json(user)
})

app.put('/users/:id', CheckIdUser, (request, response) => {
    const { name, age } = request.body
    const id = request.id
    const index = request.userIndex
    const userUpdate = { id, name, age }

    users[index] = userUpdate

    return response.json(userUpdate)
})

app.delete('/users/:id', CheckIdUser, (request, response) => {
    const index = request.userIndex
    users.splice(index, 1)
    return response.status(204).json()
})


/* 
app.get('/users/:id', (request, response) => {

    const name = request.query.name
    const age = request.query.age 
    Criando constantes uma à uma.

    criando constantes de uma só vez, assim que o Js encontrar no query o nome da variável ele irá armazenar.
    const { name, age } = request.query
    const { id } = request.params
    
    Abaixo há um exemplo mais verboso.
    return response.json({ name: name, age: age }) 
    
    console.log(request)
    return response.json({ id, name, age })
    Acima há um exemplo menos verboso.
})
*/

/* app.get('/projects', (request, response) => {
    return response.send('Initializing...')
}) */
//Criando rotas. Primeiro parâmetro é o nome da rota e o segundo parâmetro é uma função.

app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}`)
})
//Porta a ser utilizada pela aplicação.