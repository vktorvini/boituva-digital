import { useState, useEffect } from "react";
import {
  goldFinanceiroMensal,
  goldFinanceiroAnual,
  goldReceitaMensalFonte,
  goldDespesaMensalEvento,
  goldIndicadoresFiscais,
  type FinanceiroMensal,
  type FinanceiroAnual,
  type ReceitaMensalFonte,
  type DespesaMensalEvento,
  type IndicadorFiscal,
} from "@/data/mockData";

interface UseDataResult<T> {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  error: string | null;
}

// Simulates async fetch — swap internals for Supabase queries later
function useMockQuery<T>(fetcher: () => T, delay = 600): UseDataResult<T> {
  const [state, setState] = useState<UseDataResult<T>>({
    data: null,
    isLoading: true,
    isError: false,
    isEmpty: false,
    error: null,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const result = fetcher();
        const empty = Array.isArray(result) ? result.length === 0 : !result;
        setState({ data: result, isLoading: false, isError: false, isEmpty: empty, error: null });
      } catch (e) {
        setState({ data: null, isLoading: false, isError: true, isEmpty: false, error: (e as Error).message });
      }
    }, delay);
    return () => clearTimeout(timer);
  }, []);

  return state;
}

export function useFinanceiroMensal(): UseDataResult<FinanceiroMensal[]> {
  return useMockQuery(() => goldFinanceiroMensal);
}

export function useFinanceiroAnual(ano?: number): UseDataResult<FinanceiroAnual | null> {
  return useMockQuery(() => {
    if (ano) return goldFinanceiroAnual.find((a) => a.ano === ano) ?? null;
    return goldFinanceiroAnual[goldFinanceiroAnual.length - 1];
  });
}

export function useReceitaMensalFonte(): UseDataResult<ReceitaMensalFonte[]> {
  return useMockQuery(() => goldReceitaMensalFonte);
}

export function useDespesaMensalEvento(): UseDataResult<DespesaMensalEvento[]> {
  return useMockQuery(() => goldDespesaMensalEvento);
}

export function useIndicadoresFiscais(): UseDataResult<IndicadorFiscal[]> {
  return useMockQuery(() => goldIndicadoresFiscais);
}

export function useAlertasAtivos(): UseDataResult<IndicadorFiscal[]> {
  return useMockQuery(() => goldIndicadoresFiscais.filter((i) => i.status !== "normal"));
}
