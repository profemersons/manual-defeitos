const symptoms = [
{title:"Computador não liga",tag:"ENERGIA",causes:["Tomada, cabo ou alimentação externa","Fonte ou carregador","Botão de energia / circuito de acionamento","Bateria ou placa-mãe","Conexões ou componente essencial"],tests:["Confirme a alimentação externa","Teste cabo compatível conhecido como funcional","Em notebook, verifique carregador e indicadores","Em desktop, compare com fonte compatível conhecida como funcional","Se necessário, avance para conexões e placa-mãe"],solution:"A solução depende da evidência: corrigir alimentação, reconectar, substituir fonte/carregador compatível ou encaminhar a investigação da placa-mãe. Não confunda “não liga” com “liga, mas não inicia.”",validate:"Ligar → verificar POST → vídeo → sistema → estabilidade."},
{title:"Liga, mas não apresenta imagem",tag:"VÍDEO / POST",causes:["Monitor, entrada ou cabo","RAM mal encaixada ou módulo com falha","GPU dedicada / alimentação da GPU","Saída de vídeo ou configuração","Placa-mãe, processador ou alimentação"],tests:["Verifique monitor, entrada, cabo e outra porta","Teste outro monitor/cabo","Observe bipes, LEDs ou códigos de diagnóstico","Teste RAM individualmente quando apropriado","Se houver vídeo integrado compatível, compare sem a GPU dedicada"],solution:"Corrija a causa encontrada: cabo/entrada, encaixe de RAM, alimentação/instalação da GPU, configuração ou componente defeituoso. Um código de diagnóstico deve ser interpretado de acordo com o modelo.",validate:"Novo ciclo de inicialização e verificação de vídeo/POST."},
{title:"Liga e desliga sozinho",tag:"ENERGIA / TÉRMICA",causes:["Temperatura","Alimentação","RAM / GPU","Placa-mãe ou processador","Software, quando a falha ocorre depois do sistema iniciar"],tests:["Descubra se ocorre imediatamente, no POST ou sob carga","Observe temperatura e comportamento das ventoinhas","Verifique poeira, dissipador e fluxo de ar","Investigue alimentação","Compare o comportamento em repouso e sob carga"],solution:"Não troque a fonte ou pasta térmica automaticamente. Primeiro determine em que condição ocorre a falha e confronte a hipótese com os testes.",validate:"Reproduza uma condição semelhante à que causava o desligamento."},
{title:"Computador trava",tag:"ESTABILIDADE",causes:["RAM","Armazenamento","Temperatura","Drivers / sistema operacional","GPU, alimentação ou aplicativo"],tests:["Descubra se apenas um aplicativo trava","Observe se o mouse/teclado ainda respondem","Verifique se ocorre após algum tempo ou sob carga","Investigue RAM, armazenamento e temperatura","Compare ambiente normal e modo de segurança quando pertinente"],solution:"Se apenas um aplicativo falha, comece pela camada do aplicativo. Se todo o sistema trava, amplie para hardware, drivers, armazenamento, temperatura e sistema.",validate:"Repita a atividade que provocava a falha e observe a estabilidade."},
{title:"Computador está muito lento",tag:"DESEMPENHO",causes:["Pouca RAM","Armazenamento lento ou com problemas","Excesso de processos","Temperatura","Software, sistema, driver ou malware","Hardware inadequado para a tarefa"],tests:["Defina exatamente o que está lento","Observe CPU, RAM e armazenamento","Verifique processos e inicialização","Observe temperatura e espaço disponível","Compare o comportamento em tarefas diferentes"],solution:"A solução pode ser otimização, correção de software, manutenção térmica, substituição/atualização de armazenamento ou memória — mas somente depois de identificar o gargalo.",validate:"Teste novamente a tarefa que apresentava lentidão."},
{title:"USB não é reconhecido",tag:"PERIFÉRICO",causes:["Dispositivo","Cabo","Porta USB","Driver / sistema","Hardware da porta"],tests:["Teste o dispositivo em outro computador","Teste outro dispositivo na mesma porta","Teste outra porta","Verifique cabo","Verifique sistema e drivers"],solution:"O padrão de comparação indica o caminho: se vários dispositivos falham em uma porta, investigue a porta; se o dispositivo falha em qualquer computador, investigue dispositivo/cabo.",validate:"Reconecte e confirme o reconhecimento e funcionamento."},
{title:"Armazenamento não aparece",tag:"SSD / HDD",causes:["Conexão ou alimentação","Porta/interface","Configuração BIOS/UEFI","Partição ou sistema de arquivos","Falha física do dispositivo"],tests:["Verifique se aparece na BIOS/UEFI","Confira conexão, porta e alimentação","Se aparece na BIOS, verifique o gerenciamento de discos","Observe erros de leitura e saúde do dispositivo","Antes de inicializar/formatar, proteja dados importantes"],solution:"A ação muda conforme a camada. Se não aparece na BIOS, investigue hardware/conexão/firmware. Se aparece na BIOS e não no sistema, investigue partições, sistema de arquivos e configuração.",validate:"Confirmar reconhecimento, acesso e estabilidade sem comprometer os dados."},
{title:"Tela azul / erro inesperado",tag:"EVIDÊNCIA",causes:["Driver","RAM","Armazenamento","Sistema operacional","GPU, temperatura ou outro hardware"],tests:["Registre código e mensagem","Anote quando e durante qual atividade ocorreu","Verifique alterações recentes","Investigue hardware e drivers conforme a evidência","Compare se ocorre em condições diferentes"],solution:"O código é uma pista, não uma sentença. Use a mensagem, o contexto e os testes para direcionar a investigação.",validate:"Reproduza a condição de uso que gerava o erro e confirme estabilidade."}
];

const symptomGrid=document.getElementById("symptomGrid");
symptoms.forEach((s,i)=>{
 const el=document.createElement("article"); el.className="symptom";
 el.innerHTML=`<div class="symptom-head"><h3>${s.title}</h3><span class="tag">${s.tag}</span></div>
 <div class="symptom-body">
 <h4>O que pode causar?</h4><ul>${s.causes.map(x=>`<li>${x}</li>`).join("")}</ul>
 <h4>Como investigar?</h4><ul>${s.tests.map(x=>`<li>${x}</li>`).join("")}</ul>
 <h4>Como resolver?</h4><p>${s.solution}</p>
 <div class="route"><span>SINTOMA</span><span>TESTE</span><span>EVIDÊNCIA</span><span>DECISÃO</span></div>
 <h4>Como validar?</h4><p>${s.validate}</p>
 </div>`;
 el.querySelector(".symptom-head").onclick=()=>el.classList.toggle("open");
 symptomGrid.appendChild(el);
});

const cases=[
{title:"O PC liga, mas está sem imagem.",text:"O monitor está ligado e o cabo parece conectado. Antes de desmontar, qual é o melhor próximo passo?",opts:["Trocar imediatamente a placa-mãe","Verificar entrada do monitor, cabo e testar outra porta","Formatar o sistema operacional","Trocar a memória e a GPU ao mesmo tempo"],correct:1,why:"Comece pelo teste externo, simples e reversível. Se ele resolver, você evita uma desmontagem desnecessária."},
{title:"A imagem continua ausente.",text:"Você testou outro cabo e outro monitor. Há dois módulos de RAM. Qual teste ajuda a isolar a memória?",opts:["Atualizar todos os drivers","Formatar o SSD","Testar um módulo de RAM por vez, quando apropriado","Trocar o processador"],correct:2,why:"Testar individualmente permite descobrir se a falha acompanha um módulo, um slot ou permanece independentemente da RAM."},
{title:"Um SSD não aparece no sistema.",text:"Qual pergunta deve vir antes de pensar em formatar?",opts:["Qual antivírus está instalado?","Ele aparece na BIOS/UEFI?","Qual navegador o usuário usa?","A área de trabalho está organizada?"],correct:1,why:"Se o SSD nem aparece na BIOS/UEFI, a investigação está em outra camada: conexão, alimentação, porta, compatibilidade ou dispositivo."},
{title:"O computador desliga apenas em jogos.",text:"Qual informação é mais útil para orientar a próxima investigação?",opts:["A cor do gabinete","A temperatura e o comportamento sob carga","O papel de parede","A versão do navegador"],correct:1,why:"O fato de ocorrer sob carga aponta para uma condição que precisa ser reproduzida e comparada, incluindo temperatura e alimentação."},
{title:"Você substituiu uma peça e o PC voltou a funcionar.",text:"O que ainda falta para encerrar profissionalmente o atendimento?",opts:["Nada: ligar já prova que está resolvido","Formatar sempre","Validar reproduzindo o problema original e documentar","Trocar outra peça para garantir"],correct:2,why:"O reparo só termina quando a condição original é validada. Depois, registre sintoma, testes, causa, reparo e validação."}
];
let caseIndex=0, caseScore=0, answered=false;
const caseBox=document.getElementById("caseBox"), choiceBox=document.getElementById("choiceBox"), feedbackBox=document.getElementById("feedbackBox"), nextCase=document.getElementById("nextCase");
function renderCase(){
 answered=false; feedbackBox.innerHTML=""; nextCase.classList.add("hidden");
 const c=cases[caseIndex]; document.getElementById("caseLabel").textContent=`CASO ${String(caseIndex+1).padStart(2,"0")}`; document.getElementById("caseProgress").textContent=`${caseIndex+1} / ${cases.length}`;
 caseBox.innerHTML=`<h3>${c.title}</h3><p>${c.text}</p>`;
 choiceBox.innerHTML="";
 c.opts.forEach((o,i)=>{const b=document.createElement("button");b.className="choice";b.textContent=o;b.onclick=()=>answerCase(i,b);choiceBox.appendChild(b)});
}
function answerCase(i,b){
 if(answered)return; answered=true; const c=cases[caseIndex]; [...choiceBox.children].forEach((x,j)=>{if(j===c.correct)x.classList.add("correct")}); 
 if(i===c.correct){caseScore++;b.classList.add("correct");feedbackBox.innerHTML=`<div class="feedback"><strong>Boa decisão. ✓</strong> ${c.why}</div>`}
 else {b.classList.add("wrong");feedbackBox.innerHTML=`<div class="feedback"><strong>Não é o melhor próximo passo.</strong> ${c.why}</div>`}
 nextCase.classList.remove("hidden");
}
nextCase.onclick=()=>{caseIndex++; if(caseIndex<cases.length)renderCase();else{caseBox.innerHTML=`<h3>Laboratório concluído.</h3><p>Você tomou ${caseScore} de ${cases.length} decisões corretas de primeira. O mais importante: perceba que o simulador nunca pediu “qual peça trocar?”, e sim “qual teste reduz a incerteza?”.</p>`;choiceBox.innerHTML="";feedbackBox.innerHTML=`<div class="feedback"><strong>Resultado: ${caseScore}/${cases.length}</strong> — volte aos casos e tente novamente se quiser melhorar seu raciocínio.</div>`;nextCase.classList.add("hidden")}};
renderCase();

const questions=[
["Um computador “não funciona”. Qual é a primeira tarefa técnica?",["Trocar a fonte","Formatar","Transformar a reclamação em sintoma observável","Instalar drivers"],2],
["Por que mudar uma variável por vez?",["Para trabalhar mais rápido","Para relacionar melhor ação, resultado e conclusão","Para evitar documentação","Para trocar mais peças"],1],
["Se um SSD aparece na BIOS/UEFI, mas não no sistema operacional, qual camada merece investigação?",["Monitor","Partições, sistema de arquivos e configuração do sistema","Tomada","GPU"],1],
["Qual afirmação sobre um código de diagnóstico é correta?",["É universal","Sempre significa trocar a peça indicada","Deve ser interpretado de acordo com fabricante/modelo/documentação","Pode ser ignorado"],2],
["Quando um reparo pode ser considerado validado?",["Quando o computador acende","Quando o técnico acha que resolveu","Quando a condição original é reproduzida e o problema não reaparece","Quando outra peça também é trocada"],2]
];
let qi=0, qscore=0, qanswered=false;
const quizBox=document.getElementById("quizBox");
function renderQuiz(){
 if(qi>=questions.length){quizBox.innerHTML=`<div class="result"><span>RESULTADO</span><strong>${qscore}/${questions.length}</strong><p>${qscore===5?"Excelente. Você está pensando como técnico.":"O raciocínio melhora com investigação: volte aos sintomas e tente novamente."}</p><button class="btn primary" onclick="qi=0;qscore=0;renderQuiz()">Refazer quiz</button></div>`;return}
 const q=questions[qi]; qanswered=false; quizBox.innerHTML=`<div class="q-card active"><div class="q-number">QUESTÃO ${qi+1} DE ${questions.length}</div><h3>${q[0]}</h3><div class="q-options">${q[1].map((x,i)=>`<button class="q-option" data-i="${i}">${x}</button>`).join("")}</div><div class="quiz-controls"><span class="score">Pontuação: ${qscore}</span><button id="nextQ" class="btn primary hidden">Continuar →</button></div></div>`;
 document.querySelectorAll(".q-option").forEach(btn=>btn.onclick=()=>answerQ(Number(btn.dataset.i),btn));
}
function answerQ(i,b){if(qanswered)return;qanswered=true;const q=questions[qi];document.querySelectorAll(".q-option").forEach((x,j)=>{if(j===q[2])x.classList.add("right")});if(i===q[2]){qscore++;b.classList.add("right")}else b.classList.add("wrong");document.querySelector(".score").textContent=`Pontuação: ${qscore}`;const n=document.getElementById("nextQ");n.classList.remove("hidden");n.onclick=()=>{qi++;renderQuiz()}}
renderQuiz();

document.getElementById("themeBtn").onclick=()=>{document.body.classList.toggle("light");document.getElementById("themeBtn").textContent=document.body.classList.contains("light")?"☀":"☾";localStorage.setItem("diag-theme",document.body.classList.contains("light")?"light":"dark")};
if(localStorage.getItem("diag-theme")==="light"){document.body.classList.add("light");document.getElementById("themeBtn").textContent="☀"}

document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{const t=document.querySelector(a.getAttribute("href"));if(t){e.preventDefault();t.scrollIntoView({behavior:"smooth"})}}));
