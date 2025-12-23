Daily State (estado diário)

-   Um registro por usuário por data.
-   Operação: UPSERT (criar ou atualizar).
-   Backend é a fonte da verdade: armazena o estado final consolidado.
-   Frontend calcula incrementalmente a partir do cache local e sincroniza com o backend.

Exemplo de schema (estado diário)

```json
{
    "id": "...",
    "userId": "...",
    "date": "YYYY-MM-DD",
    "...state": {},
    "updatedAt": "ISO8601"
}
```

Entidades de vida longa

-   Possuem identidade própria e ciclo de vida contínuo.
-   Usadas para dados que persistem além de um dia (ex.: medicamentos, perfis).

Exemplo de schema (entidade de vida longa)

```json
{
    "id": "...",
    "userId": "...",
    "...attributes": {},
    "createdAt": "ISO8601",
    "updatedAt": "ISO8601"
}
```

Entidades filhas (exemplo)

-   medication_schedule
    -   id
    -   medicationId
    -   time

Regras-chave

-   Backend = fonte da verdade.
-   Frontend = cache local com sincronização periódica.
-   Repository = camada de persistência (consultas/UPSET).
-   Service = regras do domínio (validações, transformações, lógica).
-   Não confiar em eventos individuais como fonte primária; trate eventos como inputs para construir o estado no backend.
