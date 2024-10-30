const { hash } = require('bcryptjs'); //importa a biblioteca de criptografia de senhas
const AppError = require('../utils/AppError');

const sqliteConnection = require('../database/sqlite');
const { use } = require('express/lib/router');

class UsersController {
    async create(request, response) {
        const { name, email, password } = request.body;

        const database = await sqliteConnection(); // faz a conexão com o banco de dados
        const checkUserExists = await database.get('SELECT * FROM users WHERE email = (?)', [email]); // vai verificar se o email já não está em uso no bd e retornar um boleano. selecione toasd as colunas de users onde email é igual a email.

        if (checkUserExists) { // se já estiver em uso vai disparar o AppError
            throw new AppError('Este email já está em uso.');
        }

        const hashedPassword = await hash(password, 8);

        await database.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]); // caso não esteja em uso, segue o código. inicia uma função promessa (await), de ir no bd e inserir dentro de users o name, email e password

        return response.status(201).json(); // vai retornar um status de 201, significando que deu tudo certo e o user foi criado, retorna tbm um json vazio

    }

    async update(request, response) {
        const { name, email, password} = request.body;
        const { id } = request.params;

        const database = await sqliteConnection();
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

        if(!user) {
            throw new AppError("Usuário não encontrado");
        }

        const userWithUpdateEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        if(userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
            throw new AppError("Este e-mail já está em uso.");
        }

        user.name = name;
        user.email = email;

        await database.run(`
            UPDATE users SET
            name = ?,
            email = ?,
            updated_at = ?
            WHERE id = ?`,
            [user.name, user.email, new Date(), id]
        );

        return response.json();
    }
}

module.exports = UsersController;