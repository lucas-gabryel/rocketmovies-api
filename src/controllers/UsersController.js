const AppError = require('../utils/AppError');

const sqliteConnection = require('../database/sqlite');

class UsersController {
    async create(request, response) {
        const { name, email, password } = request.body;

        const database = await sqliteConnection(); // faz a conexão com o banco de dados
        const checkUserExists = await database.get('SELECT * FROM users WHERE email = (?)', [email]); // vai verificar se o email já não está em uso no bd e retornar um boleano. selecione toasd as colunas de users onde email é igual a email.

        if (checkUserExists) { // se já estiver em uso vai disparar o AppError
            throw new AppError('Este email já está em uso.');
        }

        await database.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]); // caso não esteja em uso, segue o código. inicia uma função promessa (await), de ir no bd e inserir dentro de users o name, email e password

        return response.status(201).json(); // vai retornar um status de 201, significando que deu tudo certo e o user foi criado, retorna tbm um json vazio

    }
}

module.exports = UsersController;