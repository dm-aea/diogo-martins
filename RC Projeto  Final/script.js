// Função para adicionar o produto ao carrinho
function adicionarAoCarrinho(nomeProduto, precoUnitario) {
    // Captura a quantidade inserida pelo usuário
    var quantidade = document.getElementById("quantidade").value;

    // Verifica se a quantidade é válida
    if (quantidade < 1 || isNaN(quantidade)) {
        alert("Por favor, insira uma quantidade válida.");
        return;
    }

    // Cria o produto e seu total
    var totalProduto = precoUnitario * quantidade;
    
    // Adiciona o produto ao localStorage (para simular o carrinho)
    var carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    // Verifica se o produto já existe no carrinho
    var produtoExistente = carrinho.find(item => item.nome === nomeProduto);

    if (produtoExistente) {
        // Se o produto já existe, apenas aumenta a quantidade
        produtoExistente.quantidade += parseInt(quantidade);
        produtoExistente.total += totalProduto;
    } else {
        // Caso contrário, adiciona o produto novo ao carrinho
        carrinho.push({
            nome: nomeProduto,
            preco: precoUnitario,
            quantidade: parseInt(quantidade),
            total: totalProduto
        });
    }

    // Salva o carrinho atualizado no localStorage
    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    alert(nomeProduto + " foi adicionado ao carrinho!");
}

// Função para atualizar o carrinho (exibindo na página do carrinho)
function exibirCarrinho() {
    var carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    var carrinhoTabela = document.getElementById("tabelaCarrinho");
    var totalCarrinho = 0;

    // Limpa a tabela antes de re-exibir os itens
    carrinhoTabela.innerHTML = "";

    // Adiciona as linhas da tabela para cada produto no carrinho
    carrinho.forEach(item => {
        var row = carrinhoTabela.insertRow();
        row.innerHTML = `
            <td>${item.nome}</td>
            <td>${item.quantidade}</td>
            <td>${item.preco.toFixed(2)} €</td>
            <td>${item.total.toFixed(2)} €</td>
            <td><button onclick="removerProduto('${item.nome}')">Remover</button></td>
        `;
        totalCarrinho += item.total;
    });

    // Exibe o total do carrinho
    document.getElementById("totalCarrinho").innerText = `Total: ${totalCarrinho.toFixed(2)} €`;
}

// Função para remover produto do carrinho
function removerProduto(nomeProduto) {
    var carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    // Filtra o produto removido
    carrinho = carrinho.filter(item => item.nome !== nomeProduto);

    // Salva o carrinho atualizado
    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    // Atualiza a tabela do carrinho
    exibirCarrinho();
}

// Chama a função para exibir o carrinho ao carregar a página
window.onload = exibirCarrinho;
