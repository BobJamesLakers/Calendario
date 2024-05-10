// Função para obter o número de dias em um determinado mês e ano
function diasNoMes(ano, mes) {
    return new Date(ano, mes, 0).getDate();
}

// Função para gerar o calendário
function gerarCalendario(ano, mes) {
    var primeiroDiaDaSemana = new Date(ano, mes - 1, 1).getDay();
    var diasNoMesAtual = diasNoMes(ano, mes);
    var corpoCalendario = document.getElementById("corpo-calendario");
    var conteudoHTML = "";

    // Limpa o conteúdo do corpo do calendário
    corpoCalendario.innerHTML = "";

    // Loop para criar as células para os dias do mês
    var contador = 1;
    for (var i = 0; i < 6; i++) { // 6 linhas para garantir que todos os meses tenham espaço suficiente
        conteudoHTML += "<tr>";
        for (var j = 0; j < 7; j++) { // 7 dias da semana
            if ((i === 0 && j < primeiroDiaDaSemana) || contador > diasNoMesAtual) {
                conteudoHTML += "<td></td>"; // Célula vazia antes do primeiro dia do mês e após o último dia do mês
            } else {
                conteudoHTML += "<td>" + contador + "</td>";
                contador++;
            }
        }
        conteudoHTML += "</tr>";
        if (contador > diasNoMesAtual) break; // Sai do loop se todos os dias do mês forem preenchidos
    }

    // Adiciona o conteúdo ao corpo do calendário
    corpoCalendario.innerHTML = conteudoHTML;

    // Atualiza o título do mês e ano
    document.getElementById("titulo-mes-ano").textContent = mesesDoAno[mes - 1] + " " + ano;

    // Obtém e exibe os feriados do mês
    var feriados = obterFeriados(ano, mes);
    var feriadosHTML = "<h2>Feriados</h2><table>";
    feriadosHTML += "<thead><tr><th>Data</th><th>Descrição</th></tr></thead><tbody>";
    feriados.forEach(function(feriado) {
        feriadosHTML += "<tr><td>" + feriado.data + "</td><td>" + feriado.descricao + "</td></tr>";
    });
    feriadosHTML += "</tbody></table>";
    document.getElementById("feriados").innerHTML = feriadosHTML;

    // Exibe as fases da lua para o mês atual
    var faseDaLua = exibirFasesDaLua(mes);
    document.getElementById("fase-lua").textContent = "Fase da Lua: " + faseDaLua;

    // Adiciona os podcasts
    var podcasts = [
        { imagem: "imagem1.jpg", audio: "audio1.mp3" },
        { imagem: "imagem2.jpg", audio: "audio2.mp3" },
        { imagem: "imagem3.jpg", audio: "audio3.mp3" }
    ];
    var podcastsHTML = "<h2>Podcasts</h2><table>";
    podcastsHTML += "<thead><tr><th>Imagem</th><th>Áudio</th></tr></thead><tbody>";
    podcasts.forEach(function(podcast) {
        podcastsHTML += "<tr><td><img src='" + podcast.imagem + "' alt='Imagem'></td><td><audio controls><source src='" + podcast.audio + "' type='audio/mpeg'></audio></td></tr>";
    });
    podcastsHTML += "</tbody></table>";
    document.getElementById("podcasts").innerHTML = podcastsHTML;

    // Adiciona a publicidade e o relógio
    var publicidadeHTML = "<h2>Publicidade</h2><table>";
    publicidadeHTML += "<thead><tr><th>Imagem</th><th>Relógio</th></tr></thead><tbody>";
    publicidadeHTML += "<tr><td><img src='imagem_publicidade.jpg' alt='Publicidade'></td><td id='relogio'></td></tr>";
    publicidadeHTML += "</tbody></table>";
    document.getElementById("publicidade").innerHTML = publicidadeHTML;

    // Atualiza o relógio a cada segundo
    setInterval(atualizarRelogio, 1000);
}

// Função para avançar ou retroceder no calendário
function mudarMes(delta) {
    mesAtual += delta;
    if (mesAtual < 1) {
        mesAtual = 12;
        anoAtual--;
    } else if (mesAtual > 12) {
        mesAtual = 1;
        anoAtual++;
    }
    gerarCalendario(anoAtual, mesAtual);
}

// Array com os nomes dos meses
var mesesDoAno = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

// Obtém a data atual
var dataAtual = new Date();
var anoAtual = dataAtual.getFullYear();
var mesAtual = dataAtual.getMonth() + 1;

// Gera o calendário para o mês atual
gerarCalendario(anoAtual, mesAtual);

// Vincula os botões de navegação aos eventos de clique
document.getElementById("anterior-btn").addEventListener("click", function() {
    mudarMes(-1);
});

document.getElementById("proximo-btn").addEventListener("click", function() {
    mudarMes(1);
});

function atualizarRelogio() {
    var agora = new Date();
    var horas = agora.getHours();
    var minutos = agora.getMinutes();
    var segundos = agora.getSeconds();

    // Formata os números menores que 10 com um zero
    horas = (horas < 10 ? "0" : "") + horas;
    minutos = (minutos < 10 ? "0" : "") + minutos;
    segundos = (segundos < 10 ? "0" : "") + segundos;

    // Monta a hora no formato HH:MM:SS
    var horaString = horas + ':' + minutos + ':' + segundos;

    // Atualiza o conteúdo da div com o ID 'relogio'
    document.getElementById('relogio').innerHTML = horaString;
}

// Atualiza o relógio a cada segundo
setInterval(atualizarRelogio, 1000);
