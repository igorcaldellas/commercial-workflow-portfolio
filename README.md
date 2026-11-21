# Commercial Workflow & Analytics Portfolio

Portfólio independente de **Igor Caldellas**, Business Development Manager com foco em soluções de TI, dados e IA.

O projeto demonstra como organizo um processo comercial e transformo atividades em informação para decisão. Estruturei e opero processos comerciais com ampla autonomia; esta implementação pública é uma demonstração independente, com dados inteiramente fictícios.

**Demonstração online:** [portfolio.igorcaldellas.workers.dev](https://portfolio.igorcaldellas.workers.dev) · [Português](https://portfolio.igorcaldellas.workers.dev/pt)

## O que explorar

### Laboratório do fluxo comercial

Jornada da prospecção à passagem para delivery: qualificação, abordagem, discovery, avaliação técnica, proposta, negociação e contrato. Cada etapa explica o objetivo, o que registrar e o critério para avançar.

A simulação de CRM permite consultar contatos fictícios, filtrar atividades, examinar hipóteses de abordagem, simular respostas e observar a pausa da cadência. O laboratório de oportunidades permite editar cenários de pipeline.

### Dashboard de desempenho comercial

Visões de prospecção, vendas, aquisição e margem, retenção e fórmulas. As premissas de custo são editáveis. Os números são didáticos, não resultados profissionais ou financeiros reais.

## Como executar

Pré-requisito: **Node.js 20 ou superior**. Não há dependências externas, conta, chave de API ou banco de dados.

Na pasta do projeto:

```sh
npm start
```

Abra [http://127.0.0.1:4174](http://127.0.0.1:4174). Para português, use `/pt.html`. Encerre com `Ctrl+C`. A porta pode ser alterada pela variável `PORT`.

Se o Node estiver disponível sem o comando `npm`, execute `node scripts/serve.cjs` diretamente. Não é necessário executar `npm install`.

## Como testar

```sh
npm test
```

Alternativa sem npm: execute `node tests/sales-model.test.cjs` e depois `node tests/public-files.test.cjs`.

Os testes verificam os totais do modelo, reconciliação das coortes, separação de custos de aquisição e retenção, sensibilidade do CAC, custos negativos e divisão por zero. Também conferem arquivos públicos permitidos, referências locais e alguns marcadores de conteúdo privado. Esse último teste é uma proteção adicional, não substitui revisão humana.

### Roteiro manual de cinco minutos

1. Abra a versão em português e o roteiro de um minuto. Confira os dois projetos e os botões de contato.
2. Em **Explorar o fluxo**, escolha Discovery. Verifique que apenas navegar não valida uma etapa. Marque o critério e avance; depois reinicie o cenário.
3. Abra a simulação de CRM, explore um contato e simule uma resposta. Confira a pausa da cadência e a próxima ação. Use **Reiniciar demonstração** para restaurar o exemplo.
4. No dashboard, abra Aquisição e margem. O CAC inicial é US$ 3.000. Ao alterar marketing de US$ 12.000 para US$ 24.000, o CAC passa para US$ 4.000. Restaure os custos.
5. Abra Retenção e consulte as fórmulas. Repita a navegação em inglês e numa tela estreita.

## Organização do código

Para entender a relação entre banco SQL, HubSpot, atividades e BI, consulte [a arquitetura de referência](ARCHITECTURE.md). Ela distingue o que é simulado do que precisaria ser desenvolvido numa integração real.

| Arquivo | Responsabilidade |
| --- | --- |
| `dist/index.html`, `dist/pt.html` | Conteúdo em inglês e português |
| `dist/app.js` | Dados fictícios, filtros e interações do CRM |
| `dist/enhancements.js` | Laboratório de oportunidades e roteiro do CRM |
| `dist/sales-model.js` | Modelo sintético e cálculos comerciais |
| `dist/sales-journey.js` | Jornada e critérios de avanço |
| `dist/sales-dashboard.js` | Dashboard e premissas de custo |
| `dist/compact.js` | Módulos expansíveis e navegação por âncoras |
| `dist/*.css` | Identidade visual e layouts responsivos |
| `scripts/serve.cjs` | Servidor local sem dependências |
| `tests/` | Verificações automatizadas |

## Definições e limites dos indicadores

- **Contatos alcançados:** pessoas únicas; não se somam os contatos de cada canal, pois há sobreposição.
- **Atividades:** cada abordagem é uma atividade, mesmo quando destinada ao mesmo contato.
- **CAC:** custos de aquisição atribuídos à coorte ÷ novos clientes. O cenário pressupõe essa atribuição; vendas enterprise reais podem atravessar vários períodos.
- **Custo por reunião realizada:** custos de aquisição ÷ reuniões realizadas. Agendamento e realização são etapas distintas.
- **Ciclo médio:** dias entre início e fechamento das oportunidades ganhas.
- **Win rate:** ganhas ÷ (ganhas + perdidas), excluindo oportunidades abertas.
- **Pipeline ponderado:** soma de valor × probabilidade manual. Não equivale a receita prevista ou reconhecida.
- **Retenção de clientes:** clientes retidos ÷ clientes no início, excluindo novos clientes.
- **GRR:** receita inicial menos churn e contração, dividida pela receita inicial. **NRR** inclui expansão.
- **Custo de retenção:** tem numerador próprio, separado do CAC.
- **Margem bruta estimada:** usa premissas ilustrativas de entrega. Não representa lucro líquido ou receita contábil.

Os módulos de CRM e dashboard usam cenários sintéticos separados. Interações na jornada não recalculam os indicadores do dashboard trimestral. O projeto não calcula LTV ou payback a partir de contratos de projeto, pois isso exigiria premissas adicionais.

## Privacidade

Todos os contatos, empresas, mensagens, valores e indicadores demonstrativos são inventados. Eventual coincidência com pessoas ou organizações reais é incidental. Nenhuma base real foi anonimizada ou incluída.

O repositório contém apenas a aplicação pública e documentação. Não contém currículo em PDF, propostas, transcrições, exportações de CRM, listas comerciais, histórico de clientes, credenciais, configuração de hospedagem ou arquivos internos de empregadores.

As simulações não enviam mensagens, não conectam contas e não alteram sistemas externos. Parte do estado do CRM fica em `localStorage` deste navegador; use o botão de reinício ou limpe os dados do site para removê-lo. Premissas do dashboard e estado da jornada são mantidos na página. Os links externos são o LinkedIn profissional do autor e a demonstração publicada. Não há analytics de visitantes ou bibliotecas carregadas de terceiros no código.

## Publicação no GitHub Pages

O projeto é estático. É possível publicar o conteúdo de `dist/` em qualquer hospedagem de arquivos estáticos.

Foi incluído um workflow do GitHub Pages que publica **somente `dist/`**, após os testes. No repositório do GitHub, acesse **Settings → Pages → Build and deployment → Source → GitHub Actions**. Faça o primeiro envio para a branch `main` ou execute o workflow manualmente. Isso cria um endereço próprio do GitHub Pages e não altera o endereço atual do portfólio.

## Autoria

Concepção do processo e direção do portfólio: Igor Caldellas. Implementação da demonstração realizada com assistência de IA. Este repositório apresenta raciocínio comercial, analytics e automação aplicada; não afirma que o autor escreveu manualmente cada linha de código.

Nenhuma licença de código aberto foi selecionada nesta preparação. A publicação do repositório, por si só, não concede uma licença ampla de reutilização. A escolha de licença pode ser feita pelo autor antes da publicação.
