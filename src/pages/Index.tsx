import { AppLayout } from "@/components/layout/AppLayout";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { AlertCard } from "@/components/dashboard/AlertCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { RevenueSourcesTable } from "@/components/dashboard/RevenueSourcesTable";
import { FiscalIndicators } from "@/components/dashboard/FiscalIndicators";
import {
  goldFinanceiroAnual,
  goldIndicadoresFiscais,
  formatCurrency,
  formatPercent,
} from "@/data/mockData";

const anoAtual = goldFinanceiroAnual.find((a) => a.ano === 2025)!;
const alertas = goldIndicadoresFiscais.filter((i) => i.status !== "normal");

export default function Index() {
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Painel Executivo</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Visão consolidada da situação fiscal e financeira do município — exercício 2025.
          </p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            title="Receita Realizada"
            value={formatCurrency(anoAtual.receita_realizada)}
            subtitle={`de ${formatCurrency(anoAtual.receita_prevista)} previsto`}
            trend="up"
            trendValue={formatPercent(anoAtual.percentual_execucao_receita)}
            trendPositive
          />
          <KpiCard
            title="Despesa Empenhada"
            value={formatCurrency(anoAtual.despesa_empenhada)}
            subtitle={`de ${formatCurrency(anoAtual.despesa_autorizada)} autorizado`}
            trend="stable"
            trendValue={formatPercent(anoAtual.percentual_execucao_despesa)}
            trendPositive
          />
          <KpiCard
            title="Pessoal / RCL"
            value="48,2%"
            subtitle="Limite: 54%"
            status="atencao"
            trend="up"
            trendValue="+1,2pp"
            trendPositive={false}
          />
          <KpiCard
            title="Restos a Pagar"
            value="78,5%"
            subtitle="da disponibilidade"
            status="atencao"
            trend="up"
            trendValue="+3,1pp"
            trendPositive={false}
          />
        </div>

        {/* Alerts */}
        {alertas.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-base font-semibold text-foreground">Pontos de Atenção</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {alertas.map((alerta) => (
                <AlertCard
                  key={alerta.id}
                  title={alerta.indicador}
                  description={alerta.descricao}
                  status={alerta.status}
                  value={formatPercent(alerta.valor)}
                  indicator={`Limite legal: ${formatPercent(alerta.limite_legal)}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <RevenueChart />
          <RevenueSourcesTable />
        </div>

        {/* Fiscal Indicators */}
        <FiscalIndicators />
      </div>
    </AppLayout>
  );
}
