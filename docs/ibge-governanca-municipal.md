# Módulo IBGE — Indicadores de Governança Municipal

## Objetivo
Adicionar ao app **Boituva Governança** um módulo de contexto municipal com dados do IBGE para enriquecer os painéis executivos e analíticos.

## Problema
O app já possui foco em governança e finanças, mas ainda falta contexto estrutural do município.
Sem população, domicílios, faixas etárias e capacidade institucional, a leitura de receita e despesa fica incompleta.

## Resultado esperado
- Exibir indicadores demográficos e territoriais do IBGE
- Cruzar IBGE com dados financeiros do TCE
- Gerar KPIs per capita e por faixa etária
- Criar uma nova página front-end no app para o módulo IBGE
- Documentar a engenharia e as regras no Notion e no GitHub

## Fontes prioritárias
### 1. IBGE Localidades
Uso: dimensão territorial, códigos e padronização do município.

### 2. IBGE Censo / agregados / indicadores
Uso: população, domicílios, sexo, idade, educação e características territoriais.

### 3. IBGE MUNIC
Uso: capacidade institucional e estrutura administrativa municipal.

## MVP recomendado
### Bloco A — Contexto Demográfico
- população total
- crescimento populacional
- domicílios totais
- moradores por domicílio
- percentual de crianças 0–5 anos
- percentual de idosos 60+

### Bloco B — Finanças Contextualizadas
- receita per capita
- despesa per capita
- despesa com educação per capita
- despesa com saúde per capita
- gasto por domicílio
- gasto por criança 0–5
- gasto por idoso

### Bloco C — Governança Institucional
- existência de estruturas institucionais municipais
- instrumentos de planejamento
- maturidade institucional com base na MUNIC

## Arquitetura de dados sugerida
### Raw
- raw/ibge/localidades
- raw/ibge/populacao
- raw/ibge/domicilios
- raw/ibge/faixa_etaria
- raw/ibge/munic

### Bronze
- brz_ibge_localidades
- brz_ibge_populacao
- brz_ibge_domicilios
- brz_ibge_faixa_etaria
- brz_ibge_munic

### Silver
- slv_ibge_municipio
- slv_ibge_populacao_anual
- slv_ibge_domicilios
- slv_ibge_faixa_etaria
- slv_ibge_munic_capacidade

### Gold
- gold_kpi_contexto_municipal
- gold_kpi_per_capita
- gold_kpi_pressao_servicos
- gold_kpi_maturidade_institucional

## Chaves e modelagem
- municipio_id_ibge
- ano
- indicador_codigo
- indicador_nome
- valor
- unidade_medida
- fonte
- data_extracao
- hash_linha

## Regras de negócio iniciais
1. Sempre manter o código IBGE do município como chave oficial.
2. Não misturar estimativa populacional com censo sem indicar a fonte e o ano.
3. Todo KPI per capita deve carregar numerador, denominador e referência temporal.
4. MUNIC deve ficar separada do censo em silver, unificando apenas na gold.

## Estrutura da página no app
### Nome sugerido da rota
`/indicadores-ibge`

### Seções da página
1. Cabeçalho executivo com contexto do município
2. Cards de KPIs principais
3. Gráficos de população, domicílios e faixas etárias
4. Bloco de finanças contextualizadas
5. Bloco de maturidade institucional
6. Tabela de metodologia e fontes

## Componentes sugeridos
- `IBGEKpiCards`
- `IBGEPopulationChart`
- `IBGEAgeChart`
- `IBGEMethodologyTable`

## Próximos arquivos esperados
- `src/pages/IndicadoresIBGE.tsx`
- `src/components/ibge/IBGEKpiCards.tsx`
- `src/components/ibge/IBGEPopulationChart.tsx`
- `src/components/ibge/IBGEAgeChart.tsx`
- `src/components/ibge/IBGEMethodologyTable.tsx`

## Plano de execução
### Etapa 1 — Descoberta da API
Mapear endpoints reais do IBGE, parâmetros, paginação, formato e granularidade.

### Etapa 2 — Ingestão
Criar cliente Python para extrair e salvar dados raw com logs e rastreabilidade.

### Etapa 3 — Transformação
Padronizar campos, granularidade, tipos e chaves em bronze e silver.

### Etapa 4 — Gold
Construir KPIs prontos para dashboard e app.

### Etapa 5 — Front-end
Criar tela dedicada no app com rota, cards, gráficos e metodologia.

### Etapa 6 — Governança
Versionar documentação técnica no GitHub e manter o projeto vivo no Notion.

## Checklist técnico
- confirmar endpoints e payloads do IBGE
- criar função base de request
- tratar timeout e retry
- salvar raw em JSON/CSV
- criar tabelas bronze/silver/gold
- definir dicionário de dados
- integrar rota no app
- conectar consulta do front ao dataset gold
