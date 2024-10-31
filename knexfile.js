const path = require("path"); // bibloteca do node que encontra o caminho de arquivos independente do sistema operacional

module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: path.resolve(__dirname, "src", "database", "database.db") // mandando o path resolver o caminho do arquivo. serve para qualquer OS.
        },
        pool: {
            afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb) // faz com que seja ativado a função de deleção em cascata. (o padrão é não ser possível apagar em cascata)
        },
        migrations: {
            directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
        },
        useNullAsDefault: true
    }
}