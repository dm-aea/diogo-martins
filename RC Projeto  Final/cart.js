// Array de produtos no carrinho (exemplo com produtos e preços)
let cartItems = [
    { id: 1, nome: "Samsung S24", preco: 899.00, quantidade: 1 },
    { id: 2, nome: "iPhone 15", preco: 999.00, quantidade: 1 }
];

// Função para renderizar os itens no carrinho
function renderCart() {
    const cartTable = document.getElementById("cartTable");
    let total = 0; // Variável para calcular o total do carrinho

    // Limpa a tabela antes de renderizar os itens
    cartTable.innerHTML = `
        <tr>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Preço Unitário (€)</th>
            <th>Total (€)</th>
        </tr>
    `;

    // Iterar sobre cada item do carrinho e adicioná-lo à tabela
    cartItems.forEach((item, index) => {
        const itemTotal = item.preco * item.quantidade; // Calcula o total por produto
        total += itemTotal; // Adiciona o total do produto ao total geral

        // Adiciona a linha do produto na tabela
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.nome}</td>
            <td>
                <input type="number" min="1" value="${item.quantidade}" onchange="updateQuantity(${index}, this.value)">
            </td>
            <td>${item.preco.toFixed(2)}</td>
            <td>${itemTotal.toFixed(2)}</td>
        `;
        cartTable.appendChild(row);
    });

    // Atualiza o total do carrinho na página
    document.getElementById("totalCart").textContent = `Total a Pagar: ${total.toFixed(2)}€`;
}

// Função para atualizar a quantidade de um produto
function updateQuantity(index, newQuantity) {
    // Converte a quantidade para número inteiro
    const quantidade = parseInt(newQuantity);

    // Se a quantidade for válida, atualiza o produto e re-renderiza o carrinho
    if (quantidade > 0) {
        cartItems[index].quantidade = quantidade;
        renderCart();
    }
}

// Função para finalizar a compra
function checkout() {
    const selectedPayment = document.querySelector('input[name="payment"]:checked');
    
    // Verifica se foi selecionada uma forma de pagamento
    if (selectedPayment) {
        alert("Obrigado pela compra! A sua encomenda chegará em 12 a 15 dias úteis. Volte sempre!");
        // Redireciona para a página inicial ou realiza outra ação
        window.location.href = "index.html";
    } else {
        alert("Por favor, selecione uma forma de pagamento.");
    }
}

// Adiciona o evento ao botão de checkout
document.getElementById("checkoutButton").addEventListener("click", checkout);

// Renderiza o carrinho ao carregar a página
renderCart();
