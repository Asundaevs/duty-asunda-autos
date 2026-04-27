import { useState } from 'react';
import Head from 'next/head';

export default function DutyCalculator() {
  const [year, setYear] = useState(2018);
  const [cc, setCc] = useState(1800);
  const [crsp, setCrsp] = useState(1500000);
  const [result, setResult] = useState(null);

  // KRA 2026 Calculation - FIXED & VERIFIED
  const calculateDuty = () => {
    const currentYear = 2026;
    const vehicleAge = currentYear - parseInt(year);
    const depreciationRate = Math.min(vehicleAge * 0.10, 0.70); // Cap 70%
    const depreciatedValue = parseFloat(crsp) * (1 - depreciationRate);
    
    // 1. Import Duty 25% of Depreciated Value
    const importDuty = depreciatedValue * 0.25;
    
    // 2. Excise Duty - CORRECT BASE: Depreciated + Import Duty ONLY
    const exciseBase = depreciatedValue + importDuty;
    const exciseRate = parseInt(cc) <= 1500 ? 0.20 : 0.25; // 20% if ≤1500cc, else 25%
    const exciseDuty = exciseBase * exciseRate;
    
    // 3. VAT 16% - Base: Depreciated + Import + Excise
    const vatBase = depreciatedValue + importDuty + exciseDuty;
    const vat = vatBase * 0.16;
    
    // 4. IDF 2.25% + RDL 2% - Base: Depreciated Value ONLY
    const idf = depreciatedValue * 0.0225;
    const rdl = depreciatedValue * 0.02;
    
    // Total Duty
    const totalDuty = importDuty + exciseDuty + vat + idf + rdl;
    const totalCost = parseFloat(crsp) + totalDuty;
    
    setResult({
      vehicleAge,
      depreciationPercent: (depreciationRate * 100).toFixed(0),
      depreciatedValue: Math.round(depreciatedValue),
      importDuty: Math.round(importDuty),
      exciseDuty: Math.round(exciseDuty),
      exciseRate: (exciseRate * 100).toFixed(0),
      vat: Math.round(vat),
      idf: Math.round(idf),
      rdl: Math.round(rdl),
      totalDuty: Math.round(totalDuty),
      totalCost: Math.round(totalCost)
    });
  };

  const formatKES = (num) => {
    return 'KES ' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const whatsappMessage = result 
    ? `Hi Asunda Autos, I checked duty for ${year} ${cc}cc car CRSP ${formatKES(crsp)}. Total duty: ${formatKES(result.totalDuty)}. Need import help.`
    : `Hi Asunda Autos, need help with car import duty.`;

  return (
    <>
      <Head>
        <title>KRA Import Duty Calculator 2026 | Asunda Autos Kenya</title>
        <meta name="description" content="Free KRA car import duty calculator Kenya 2026. Check Import Duty, Excise, VAT, IDF, RDL for Toyota, Nissan, Subaru. Accurate 70% depreciation rule." />
        <meta name="keywords" content="KRA duty calculator, car import Kenya, Mombasa duty, Toyota Harrier duty, KRA 2026 rates" />
        <meta property="og:title" content="Free KRA Duty Calculator 2026
