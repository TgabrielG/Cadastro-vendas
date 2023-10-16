const produtos = require("../bancoDeDadosProdutos");
const fs = require("fs/promises");

const listagemProdutos = async (req, res) => {
  return res.status(200).json(produtos);
  //listagem de produtos
};

const vendas = async (req, res) => {
  const { produto_id, quantidade } = req.body;
  const produtoEncontrado = produtos.find((produto) => {
    return produto.id === Number(produto_id);
  });
  if (!produtoEncontrado) {
    return res.status(404).json("O produto Não Foi Encontrado");
  }

  try {
    const vendas = await fs.readFile("./src/vendas.json");

    const parseVendas = JSON.parse(vendas); //converter o objetos de vendas para poder modificar no javascritps

    parseVendas.vendas.push({
      produto: produtoEncontrado,
      quantidade: quantidade,
    });

    await fs.writeFile("./src/vendas.json", JSON.stringify(parseVendas));
    return res.status(201).json("Vendas Registrada com sucesso");
  } catch (error) {
    return res.status(500).json("Erro do servidor");
  }
};

module.exports = { listagemProdutos, vendas };
