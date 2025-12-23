1. Visão Geral do Sistema

O sistema permite que usuários registrem e acompanhem informações relacionadas à saúde e bem-estar, incluindo:

• Hidratação diária;
• Humor diário;
• Medicação e rotinas contínuas;

O foco do sistema não é registrar eventos, mas representar o estado relevante do usuário ao longo do tempo, de forma consistente, simples e sincronizável.

2. Princípio Central

O backend é a única fonte da verdade.
O frontend pode manter cache local, mas nunca é a autoridade final.

Todos os dados do sistema são:

• associados a um usuário;
• isolados por conta;
• sincronizáveis entre dispositivos;
• persistidos de forma idempotente.

3. Classificação dos Domínios

Todo domínio do sistema deve obrigatoriamente se encaixar em uma das categorias abaixo.

Essa classificação define:

• como os dados são armazenados;
• como são sincronizados;
• como evoluem ao longo do tempo;
• quais garantias de consistência são necessárias.

4. Estado Diário (Daily State)

Representa o estado consolidado de um usuário em um período de 24 horas. O que importa é o resultado final do dia, não o caminho até ele.

Características

• exatamente 1 registro por usuário por data;
• pode ser atualizado várias vezes no mesmo dia;
• sobrescrevível via UPSERT;
• idempotente;
• adequado para cache local no frontend;
• sincronização simples (last write wins).

5. Entidades de Longa Duração (Long-lived Entities)

Representam objetos que existem ao longo do tempo, com identidade própria e ciclo de vida definido.

Características

• possuem id próprio;
• associadas a um usuário;
• não dependem de uma data específica;
• podem ser criadas, atualizadas, pausadas ou encerradas;
• alterações são menos frequentes;
• podem possuir entidades filhas (ex: schedules).

6. Configurações de Usuário (User Settings)

Representam preferências do usuário que alteram o comportamento do sistema, mas não representam estado ou histórico.

Características

• não dependem de data;
• normalmente 1 registro por usuário;
• carregadas no login;
• raramente alteradas;
• não possuem histórico;
• não afetam sincronização complexa.

7. Regras Gerais de Modelagem

Estas regras se aplicam a todos os domínios do sistema:

• Todo dado pertence a um usuário;
• Nenhuma feature pode usar localStorage como fonte de verdade;
• Dados diários devem ter unicidade por (userId, date);
• Entidades não devem armazenar estados diários;
• Dados deriváveis não devem ser persistidos;
• O sistema prioriza consistência e simplicidade sobre granularidade excessiva;
• Repositories não contêm regra de negócio;
• Services não persistem dados derivados.

8. Evolução do Sistema

Toda nova funcionalidade deve seguir obrigatoriamente o fluxo:

• Definir o conceito no domínio;
• Classificar (estado diário, entidade ou configuração);
• Validar contra este documento;
• Só então definir schema, sincronização e APIs.
