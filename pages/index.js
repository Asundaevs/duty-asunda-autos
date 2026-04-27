import { useState } from 'react';
import Head from 'next/head';

export default function DutyCalculator() {
  const [make, setMake] = useState('Toyota');
  const [model, setModel] = useState('Harrier');
  const [year, setYear] = useState(2018);
  const [cc, setCc] = useState(1800);
  const [crsp, setCrsp] = useState(1500000);
  const [result, setResult] = useState(null);

  const calculateDuty = () => {
    const cleanYear = parseInt(year) || 2018;
    const cleanCc = parseInt(cc) || 1800;
    const cleanCrsp = parseFloat(crsp) || 1500000;
    
    if (cleanCrsp > 20000000) {
      alert('CRSP too high! Check zeros. Max for normal cars: 20M');
      return;
    }
    if (cleanCc > 6000) {
      alert('CC too high! Max 6000cc');
      return;
    }
    
    const currentYear = 2026;
    const vehicleAge = currentYear - cleanYear;
    const depreciationRate = Math.min(vehicleAge * 0.10, 0.70);
    const depreciatedValue = cleanCrsp * (1 - depreciationRate);
    const importDuty = depreciatedValue * 0.25;
    const exciseBase = depreciatedValue + importDuty;
    const exciseRate = cleanCc <= 1500 ? 0.20 : 0.25;
    const exciseDuty = exciseBase * exciseRate;
    const vatBase = depreciatedValue + importDuty + exciseDuty;
    const vat = vatBase * 0.16;
    const idf = depreciatedValue * 0.0225;
    const rdl = depreciatedValue * 0.02;
    const totalDuty = importDuty + exciseDuty + vat + idf + rdl;
    const totalCost = cleanCrsp + totalDuty;
    
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

  const formatKES = (num) => 'KES ' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const fullVehicleName = `${make} ${model}`;

  const whatsappMessage = result
    ? `Hi Asunda Autos, I checked KRA duty for ${year} ${fullVehicleName} ${cc}cc. CRSP: ${formatKES(crsp)}. Total duty: ${formatKES(result.totalDuty)}. Need import help from Mombasa.`
    : `Hi Asunda Autos, need help with car import duty.`;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "KRA Import Duty Calculator 2026 - Asunda Autos",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "KES"
    },
    "description": "Free KRA car import duty calculator for Kenya. Calculate Import Duty, Excise, VAT for Toyota, Nissan, Subaru, Mazda. Updated 2026 KRA rates. Serves Nairobi, Mombasa, Nakuru, Kisumu, Eldoret.",
    "url": "https://duty.asunda.autos",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Asunda Autos",
      "telephone": "+254115513320",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Nakuru",
        "addressRegion": "Rift Valley",
        "addressCountry": "KE"
      },
      "areaServed": [
        { "@type": "City", "name": "Nairobi" },
        { "@type": "City", "name": "Mombasa" },
        { "@type": "City", "name": "Nakuru" },
        { "@type": "City", "name": "Kisumu" },
        { "@type": "City", "name": "Eldoret" }
      ]
    }
  };

  return (
    <>
      <Head>
        <title>KRA Duty Calculator 2026 Kenya | {fullVehicleName} Import Duty | Asunda Autos</title>
        <meta name="description" content={`Free KRA import duty calculator for ${fullVehicleName} in Kenya. Check Import Duty, Excise 25%, VAT 16% for cars from Mombasa port. 2026 KRA rates. Nakuru, Nairobi, Mombasa agents.`} />
        <meta name="keywords" content={`KRA duty calculator, ${make} ${model} import duty Kenya, car import Mombasa, ${make} Kenya, ${model} duty, KRA 2026, Nakuru car import, Asunda Autos, import duty calculator Kenya`} />
        <meta property="og:title" content={`KRA Duty Calculator - ${fullVehicleName} 2026 | Asunda Autos`} />
        <meta property="og:description" content={`Calculate exact KRA import duty for ${fullVehicleName} in 5 seconds. Free 2026 calculator by Asunda Autos Kenya. Import from Mombasa.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://duty.asunda.autos" />
        <meta property="og:locale" content="en_KE" />
        <meta property="og:site_name" content="Asunda Autos" />
        <link rel="canonical" href="https://duty.asunda.autos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="geo.region" content="KE-30" />
        <meta name="geo.placename" content="Nakuru" />
        <meta name="geo.position" content="-0.3031;36.0800" />
        <meta name="ICBM" content="-0.3031, 36.0800" />
        <link rel="icon" href="/favicon.ico" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </Head>
      <main style={{
        fontFamily: 'system-ui,-apple-system,sans-serif',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f8fafc',
        minHeight: '100vh'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px 0' }}>
            KRA Import Duty Calculator 2026
          </h1>
          <p style={{ fontSize: '16px', color: '#475569', margin: 0 }}>
            Check exact duty for cars imported to Kenya 🇰🇪
          </p>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '8px 0 0 0' }}>
            Serving: Nairobi | Mombasa | Nakuru | Kisumu | Eldoret
          </p>
        </div>
        
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          marginBottom: '20px'
        }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#334155',
              marginBottom: '6px'
            }}>
              Vehicle Make
            </label>
            <input
              type="text"
              value={make}
              onChange={(e) => setMake(e.target.value)}
              placeholder="e.g. Toyota, Nissan, Subaru, Mazda"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#334155',
              marginBottom: '6px'
            }}>
              Vehicle Model
            </label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="e.g. Harrier, X-Trail, Forester, Demio"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#334155',
              marginBottom: '6px'
            }}>
              Year of Manufacture
            </label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              min="2010"
              max="2026"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#334155',
              marginBottom: '6px'
            }}>
              Engine CC
            </label>
            <input
              type="number"
              value={cc}
              onChange={(e) => setCc(e.target.value)}
              min="600"
              max="6000"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                boxSizing: 'border-box'
              }}
            />
            <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0 0' }}>
              ≤1500cc = 20% Excise | &gt;1500cc = 25% Excise
            </p>
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#334155',
              marginBottom: '6px'
            }}>
              CRSP Value (KES)
            </label>
            <input
              type="number"
              value={crsp}
              onChange={(e) => setCrsp(e.target.value)}
              min="100000"
              max="20000000"
              step="50000"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                boxSizing: 'border-box'
              }}
            />
            <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0 0' }}>
              Current Retail Selling Price from KRA list. e.g. 1500000
            </p>
          </div>
          
          <button
            onClick={calculateDuty}
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '16px',
              fontWeight: '700',
              color: 'white',
              backgroundColor: '#0f172a',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Calculate Duty for {fullVehicleName}
          </button>
        </div>
        
        {result && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            marginBottom: '20px'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', margin: '0 0 16px 0' }}>
              KRA Duty Breakdown - {fullVehicleName}
            </h2>
            <div style={{
              fontSize: '14px',
              color: '#475569',
              marginBottom: '16px',
              paddingBottom: '16px',
              borderBottom: '1px solid #e2e8f0'
            }}>
              {year} {fullVehicleName} {cc}cc | Age: {result.vehicleAge} years | Depreciation: {result.depreciationPercent}%
            </div>
            <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Depreciated CRSP:</span>
              <span style={{ fontWeight: '600', color: '#0f172a' }}>{formatKES(result.depreciatedValue)}</span>
            </div>
            <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Import Duty 25%:</span>
              <span style={{ fontWeight: '600', color: '#0f172a' }}>{formatKES(result.importDuty)}</span>
            </div>
            <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Excise Duty {result.exciseRate}%:</span>
              <span style={{ fontWeight: '600', color: '#0f172a' }}>{formatKES(result.exciseDuty)}</span>
            </div>
            <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>VAT 16%:</span>
              <span style={{ fontWeight: '600', color: '#0f172a' }}>{formatKES(result.vat)}</span>
            </div>
            <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>IDF 2.25%:</span>
              <span style={{ fontWeight: '600', color: '#0f172a' }}>{formatKES(result.idf)}</span>
            </div>
            <div style={{
              marginBottom: '16px',
              paddingBottom: '16px',
              borderBottom: '2px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <span style={{ color: '#64748b' }}>RDL 2%:</span>
              <span style={{ fontWeight: '600', color: '#0f172a' }}>{formatKES(result.rdl)}</span>
            </div>
            <div style={{
              marginBottom: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '18px'
            }}>
              <span style={{ fontWeight: '700', color: '#0f172a' }}>Total KRA Duty:</span>
              <span style={{ fontWeight: '700', color: '#dc2626' }}>{formatKES(result.totalDuty)}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '16px',
              paddingTop: '12px',
              borderTop: '1px solid #e2e8f0'
            }}>
              <span style={{ fontWeight: '600', color: '#475569' }}>Total Cost (Car + Duty):</span>
              <span style={{ fontWeight: '700', color: '#0f172a' }}>{formatKES(result.totalCost)}</span>
            </div>
            <a
              href={`https://wa.me/254115513320?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                width: '100%',
                padding: '14px',
                fontSize: '16px',
                fontWeight: '700',
                color: 'white',
                backgroundColor: '#25D366',
                textAlign: 'center',
                textDecoration: 'none',
                borderRadius: '8px',
                marginTop: '20px'
              }}
            >
              Get Mombasa Import Quote for {fullVehicleName}
            </a>
          </div>
        )}
        
        <div style={{ textAlign: 'center', fontSize: '14px', color: '#64748b', marginTop: '30px' }}>
          <p style={{ margin: '0 0 12px 0' }}>Asunda Autos - Nakuru, Kenya</p>
          <p style={{ margin: '0 0 12px 0', fontSize: '13px' }}>Serving Nairobi | Mombasa | Nakuru | Kisumu | Eldoret</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '16px' }}>
            <a href="https://hub.asunda.autos" style={{ color: '#0f172a', textDecoration: 'none', fontWeight: '600' }}>Hub</a>
            <a href="https://compliance.asunda.autos" style={{ color: '#0f172a', textDecoration: 'none', fontWeight: '600' }}>Logbook Transfer Help</a>
            <a href="https://parts.asunda.autos" style={{ color: '#0f172a', textDecoration: 'none', fontWeight: '600' }}>Parts</a>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
            <a href="https://www.facebook.com/Asundaautos/" target="_blank" rel="noopener noreferrer" style={{ color: '#475569', textDecoration: 'none' }}>Facebook</a>
            <a href="https://www.tiktok.com/@asundaautos" target="_blank" rel="noopener noreferrer" style={{ color: '#475569', textDecoration: 'none' }}>TikTok</a>
          </div>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>© 2026 Asunda Autos | WhatsApp: 0115 513 320</p>
          <p style={{ fontSize: '11px', color: '#cbd5e1', marginTop: '8px' }}>KRA rates updated 2026. For estimation only. Confirm with clearing agent.</p>
        </div>
      </main>
    </>
  );
        }
