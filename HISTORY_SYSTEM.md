# Sistema de Histórico - Food Loop

Este documento descreve a implementação completa do sistema de histórico de atividades na aplicação Food Loop.

## 📊 Visão Geral

O sistema de histórico permite aos usuários acompanhar todas as suas atividades na plataforma, incluindo:

- **Trades** - Criação e finalização de trocas
- **Items do Pantry** - Adição de items à despensa
- **Receitas** - Criação de receitas
- **Amigos** - Adição de amigos e pedidos de amizade

## 🎯 Funcionalidades Implementadas

### 1. API de Histórico (`/api/history`)

**Localização:** `src/app/api/history/route.ts`

**Endpoint:** `GET /api/history`

**Parâmetros:**
- `email` (obrigatório) - Email do usuário
- `type` (opcional) - Tipo de atividade ('all', 'trades', 'items', 'recipes', 'friends')
- `days` (opcional) - Últimos N dias (padrão: 30)
- `limit` (opcional) - Limite de resultados (padrão: 20)
- `offset` (opcional) - Offset para paginação (padrão: 0)

**Resposta:**
```typescript
{
  activities: HistoryActivity[],
  total: number,
  hasMore: boolean,
  summary: {
    trades: number,
    items: number,
    recipes: number,
    friends: number
  }
}
```

### 2. HistoricCard no Dashboard

**Localização:** `src/components/dashboard/cards/HistoricCard.tsx`

**Funcionalidades:**
- Preview das últimas 4 atividades dos últimos 7 dias
- Estatísticas resumidas
- Loading state com skeleton
- Navegação para atividades relacionadas
- Botão para página completa de histórico

### 3. Página Completa de Histórico

**Localização:** `src/app/app/history/page.tsx`

**Funcionalidades:**
- Timeline completa de atividades
- Filtros por tipo de atividade
- Filtros por período (7 dias, 30 dias, 3 meses, 1 ano)
- Pesquisa por texto
- Paginação com "Load More"
- Estatísticas por categoria
- Navegação para detalhes das atividades

### 4. Hook Personalizado

**Localização:** `src/lib/hooks/useHistory.ts`

**Funcionalidades:**
- Gerenciamento de estado do histórico
- Funções de refresh e loadMore
- Formatação de datas
- Cores por tipo de atividade
- TypeScript types

## 🏗️ Arquitetura

### Tipos de Atividades

```typescript
type ActivityType = 
  | 'TRADE_CREATED'       // 🤝 Trade criado
  | 'TRADE_COMPLETED'     // ✅ Trade completado
  | 'ITEM_ADDED'          // 📦 Item adicionado
  | 'RECIPE_CREATED'      // 👨‍🍳 Receita criada
  | 'FRIEND_ADDED'        // 👥 Amigo adicionado
  | 'FRIEND_REQUEST_SENT' // 📨 Pedido enviado
```

### Estrutura de Dados

```typescript
interface HistoryActivity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: Date;
  icon: string;
  metadata: {
    itemName?: string;
    itemQuantity?: number;
    tradeName?: string;
    tradeId?: string;
    recipeName?: string;
    recipeId?: string;
    friendName?: string;
    friendId?: string;
    [key: string]: any;
  };
}
```

## 🔗 Integração com APIs Existentes

O sistema **não altera o schema da database**. Em vez disso, agrega dados de APIs existentes:

### 1. Trades
- **API:** `/api/trades`
- **Dados:** Box table com `price = 0`
- **Atividades:** Criação, finalização, participação

### 2. Items do Pantry
- **API:** `/api/pantry`
- **Dados:** Item table com `dateBought`
- **Atividades:** Adição de items

### 3. Receitas
- **API:** `/api/recipes`
- **Dados:** Recipe table
- **Atividades:** Criação de receitas

### 4. Amigos
- **API:** `/api/friends`
- **Dados:** FriendRequest table
- **Atividades:** Pedidos aceites, enviados

## 🎨 Interface do Usuário

### HistoricCard (Dashboard)
- **Layout:** Card compacto na página principal
- **Conteúdo:** Últimas 4 atividades + estatísticas
- **Interação:** Click nas atividades navega para páginas relacionadas

### Página de Histórico
- **Layout:** Página completa com filtros e timeline
- **Filtros:** Tipo, período, pesquisa
- **Timeline:** Cards expandidos com detalhes completos
- **Paginação:** Carregamento incremental

## 🚀 Como Usar

### No Dashboard
1. O HistoricCard aparece automaticamente
2. Mostra atividades dos últimos 7 dias
3. Click em "Ver Histórico Completo" para página completa

### Na Página de Histórico
1. Acesse `/app/history`
2. Use filtros para encontrar atividades específicas
3. Click nas atividades para navegar para detalhes

### Com o Hook
```typescript
import { useHistory } from '@/lib/hooks/useHistory';

// Uso básico
const { data, loading, refresh } = useHistory();

// Com opções
const { data, loading } = useHistory({
  type: 'trades',
  days: 7,
  limit: 10
});
```

## 📦 Performance

### Otimizações Implementadas
- **Paginação:** Resultados limitados por página
- **Cache:** Hook mantem dados em estado
- **Filtros server-side:** Reduz dados transferidos
- **Loading states:** UX durante carregamento

### Limitações
- **Receitas:** Timestamps estimados (não há createdAt)
- **Cache TTL:** Não implementado (refresh manual)
- **Real-time:** Updates não são automáticos

## 🔧 Manutenção

### Adicionar Novo Tipo de Atividade

1. **Atualizar tipos:**
```typescript
// src/lib/hooks/useHistory.ts
type ActivityType = 
  | 'TRADE_CREATED' 
  | 'NEW_ACTIVITY_TYPE' // Adicionar aqui
```

2. **Implementar na API:**
```typescript
// src/app/api/history/route.ts
if (type === 'all' || type === 'new_type') {
  // Lógica para buscar novos dados
}
```

3. **Atualizar UI:**
```typescript
// Cores, ícones, navegação
```

### Debugging

- **API:** Logs no console para cada tipo de atividade
- **UI:** Loading e error states
- **Network:** DevTools para verificar requests

## 🎯 Próximos Passos

### Possíveis Melhorias
1. **Real-time updates** com WebSockets
2. **Push notifications** para atividades importantes
3. **Exportar histórico** (PDF, CSV)
4. **Analytics dashboard** com gráficos
5. **Filtros avançados** (por friend, localização)
6. **Histórico de sistema** (login, logout)

### Schema Improvements (se permitido)
```sql
-- Tabela dedicada para tracking
CREATE TABLE activity_log (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  type VARCHAR(50) NOT NULL,
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 📝 Conclusão

O sistema de histórico foi implementado com sucesso **sem alterações ao schema**, usando uma abordagem de agregação de dados existentes. Oferece uma experiência de usuário completa com preview no dashboard e página dedicada com funcionalidades avançadas.

A arquitetura é extensível e permite facilmente adicionar novos tipos de atividades conforme a aplicação evolui.
