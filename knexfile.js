const path = require("path"); // bibloteca do node que encontra o caminho de arquivos independente do sistema operacional

module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: path.resolve(__dirname, "src", "database", "database.db") // mandando o path resolver o caminho do arquivo. serve para qualquer OS.
        },
    }
}