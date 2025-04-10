const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.post('/enviar', (req, res) => {
  console.log('Formulário recebido:');
  console.log(req.body);

  const dadosFormatados = `
======== NOVO ENVIO ========
Nome: ${req.body.nome}
Email: ${req.body.email}
============================
`;

  fs.appendFile('dados.txt', dadosFormatados, (err) => {
    if (err) {
      console.error('Erro ao salvar os dados:', err);
      return res.status(500).send('Erro ao salvar');
    }
    console.log('Dados salvos em dados.txt!');
    res.redirect('/obrigado.html');
  });
});

app.get('/', (req, res) => {
  res.send('Servidor rodando!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
