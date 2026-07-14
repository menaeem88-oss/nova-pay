/**
 * Product rules — locked from PRODUCT_REFERENCE.md. Single source of truth
 * for fee/tenor math so every screen computes identically.
 */
export const TIERS = [5000, 10000, 15000];
export const FEE_RATE = 0.03; // 3% of disbursed, once

export function computeFee(disbursedAmount) {
  return Math.round(disbursedAmount * FEE_RATE);
}

export function computeTotal(disbursedAmount) {
  return disbursedAmount + computeFee(disbursedAmount);
}

// "Today" for this prototype, and the resulting payday ~3 weeks out.
export const TODAY = new Date("2026-07-14");
export const DUE_DATE = new Date("2026-08-04");

export function formatDateLabel(date) {
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export const DUE_DATE_LABEL = formatDateLabel(DUE_DATE);
