let carrinho = [];
let total = 0;

// Adicionar produto pelo botão individual
function adicionarAoCarrinho(produto, preco) {
    carrinho.push({ produto, preco });
    total += preco;
    atualizarCarrinho();
}

// Adicionar produto via select (caso use selects)
function adicionarSelecionado(idSelect) {
    const select = document.getElementById(idSelect);
    const [produto, preco] = select.value.split("-");
    const precoNum = parseFloat(preco);
    adicionarAoCarrinho(produto, precoNum);
}

// Atualizar lista do carrinho e total
function atualizarCarrinho() {
    const lista = document.getElementById("listaCarrinho");
    const totalEl = document.getElementById("total");
    lista.innerHTML = "";

    carrinho.forEach((item, index) => {
        let li = document.createElement("li");
        li.textContent = item.produto + " - R$ " + item.preco.toFixed(2);

        let btn = document.createElement("button");
        btn.textContent = "Remover";
        btn.onclick = () => removerDoCarrinho(index);

        li.appendChild(btn);
        lista.appendChild(li);
    });

    totalEl.textContent = "Total: R$ " + total.toFixed(2);
}

// Remover produto do carrinho
function removerDoCarrinho(index) {
    total -= carrinho[index].preco;
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

// Finalizar compra via WhatsApp
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem = "Olá! Gostaria de comprar:\n";
    carrinho.forEach(item => {
        mensagem += "- " + item.produto + " (R$ " + item.preco.toFixed(2) + ")\n";
    });
    mensagem += "Total: R$ " + total.toFixed(2);

    window.open("https://wa.me/5547912345678?text=" + encodeURIComponent(mensagem), "_blank");
}

function enviarSugestao(idCampo, tipo) {
    const textarea = document.getElementById(idCampo);
    if (!textarea) return;

    const valor = textarea.value.trim();
    if (valor === "") {
        alert("Por favor, preencha antes de enviar!");
        return;
    }

    // Mostra no console
    console.log(`(${tipo}) -> ${valor}`);

    // Mostra na página (se existir lista para esse tipo)
    const lista = document.getElementById("lista-" + tipo);
    if (lista) {
        const li = document.createElement("li");
        li.textContent = valor;
        lista.appendChild(li);
    }

    alert("Obrigado pela sua contribuição!");
    textarea.value = ""; // limpa o campo
}