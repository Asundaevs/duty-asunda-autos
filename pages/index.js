import Head from 'next/head'
import { useState } from 'react'

export default function DutyCalculator() {
  const [year, setYear] = useState('')
  const [cc, setCC] = useState('')
  const [crsp, setCrsp] = useState('')
  const [result, setResult] = useState(null)

  const calculate = () => {
    const carYear = parseInt(year)
    const engineCC = parseInt(cc)
    const carValue = parseInt(crsp.replace(/,/g,''))
    
    if (!carYear || !engineCC || !carValue) return
    
    const age = 2026 - carYear
    const dep = Math.min(age * 0.10, 0.7)
    const currentCrsp = carValue * (1 - dep)
    
    const importDuty = currentCrsp * 0.25
    const exciseDuty = engineCC > 1500 ? currentCrsp * 0.25 : currentCrsp * 0.20
    const vat = (currentCrsp + importDuty + exciseDuty) * 0.16
    const idf = carValue * 0.0225
    const rdl = carValue * 0.02
    const ntsa = 5000
    
    const total = importDuty + exciseDuty + vat + idf + rdl + ntsa
    
    setResult({
      total: Math.round(total).toLocaleString(),
      importDuty: Math.round(importDuty).toLocaleString(),
      exciseDuty: Math.round(exciseDuty).toLocaleString(),
      vat: Math.round(vat).toLocaleString(),
      idf: Math.round(idf).toLocaleString(),
      rdl: Math.round(rdl).toLocaleString(),
      currentCrsp: Math.round(currentCrsp).toLocaleString()
    })
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "KRA Import Duty Calculator Kenya 2026",
    "description": "Free calculator for KRA import duty, excise duty, VAT for cars in Kenya. Instant breakdown for Toyota, Nissan, Subaru, Mazda.",
    "url": "https://duty.asunda.autos",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "KES"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Asunda Autos",
      "url": "https://hub.asunda.autos",
      "sameAs": [
        "https://www.facebook.com/share/1HTDMg8rxr/",
        "https://www.tiktok.com/@asundaautos?_r=1&_t=ZS-95rBbaN6FLr"
      ]
    }
  }

  return (
    <>
      <Head>
        <title>KRA Import Duty Calculator Kenya 2026 | Free Car Duty Check</title>
        <meta name="description" content="Calculate KRA import duty Kenya 2026 instantly. Free tool for import duty, excise, VAT, IDF, RDL. For Toyota Harrier, Prado, Subaru. Get agent quote via WhatsApp." />
        <meta name="keywords" content="KRA import duty calculator, car duty Kenya 2026, import duty Toyota, excise duty calculator, CRSP Kenya, duty calculator Mombasa" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Asunda Autos" />
        <link rel="canonical" href="https://duty.asunda.autos" />
        
        {/* GEO Tags */}
        <meta name="geo.region" content="KE" />
        <meta name="geo.placename" content="Kenya" />
        <meta name="geo.position" content="-0.303099;36.080025" />
        <meta name="ICBM" content="-0.303099, 36.080025" />
        
        {/* Open Graph for Social */}
        <meta property="og:title" content="KRA Import Duty Calculator Kenya 2026" />
        <meta property="og:description" content="Free instant KRA duty calculator. Check import duty for any car in 5 seconds. Nairobi, Mombasa, Nakuru." />
        <meta property="og:url" content="https://duty.asunda.autos" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_KE" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="KRA Duty Calculator Kenya 2026" />
        <meta name="twitter:description" content="Calculate car import duty Kenya free. Instant WhatsApp agent quote." />
        
        {/* AEO / Answer Engine Optimization */}
        <meta name="answer" content="KRA import duty Kenya 2026 is 25% of CRSP value, plus excise 20-25%, VAT 16%, IDF 2.25%, RDL 2%." />
        
        {/* JSON-LD Schema */}
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} 
        />
      </Head>
      
      <main style={{fontFamily:'system-ui',maxWidth:'600px',margin:'0 auto',padding:'16px'}}>
        <header>
          <h1>KRA Import Duty Calculator Kenya 2026</h1>
          <p>Calculate exact import duty, excise, VAT for any car. KRA rates updated 2026.</p>
        </header>

        <section aria-label="Calculator">
          <input value={year} onChange={e=>setYear(e.target.value)} placeholder="Year: 2018" type="number"
                 style={{width:'100%',padding:'12px',margin:'8px 0',border:'1px solid #ccc',borderRadius:'6px'}} />
          <input value={cc} onChange={e=>setCC(e.target.value)} placeholder="Engine CC: 1800" type="number"
                 style={{width:'100%',padding:'12px',margin:'8px 0',border:'1px solid #ccc',borderRadius:'6px'}} />
          <input value={crsp} onChange={e=>setCrsp(e.target.value)} placeholder="CRSP Value: 1,500,000" 
                 style={{width:'100%',padding:'12px',margin:'8px 0',border:'1px solid #ccc',borderRadius:'6px'}} />

          <button onClick={calculate} style={{width:'100%',padding:'14px',background:'#000',color:'#fff',border:'none',borderRadius:'6px',fontWeight:600,marginTop:'8px',cursor:'pointer'}}>
            Calculate Duty
          </button>
        </section>

        {result && (
          <section aria-label="Results" style={{marginTop:'20px',padding:'20px',background:'#f8f9fa',borderRadius:'8px'}}>
            <h2>Total KRA Duty: KES {result.total}</h2>
            <div style={{fontSize:'14px',marginTop:'12px',lineHeight:'1.8'}}>
              <div><b>Depreciated CRSP:</b> KES {result.currentCrsp}</div>
              <div><b>Import Duty 25%:</b> KES {result.importDuty}</div>
              <div><b>Excise Duty:</b> KES {result.exciseDuty}</div>
              <div><b>VAT 16%:</b> KES {result.vat}</div>
              <div><b>IDF 2.25%:</b> KES {result.idf}</div>
              <div><b>RDL 2%:</b> KES {result.rdl}</div>
              <div><b>NTSA Levy:</b> KES 5,000</div>
            </div>
            <a href={`https://wa.me/254115513320?text=Hi, duty for ${year} ${cc}cc is KES ${result.total}. Need import agent help.`}
               style={{display:'block',marginTop:'16px',padding:'12px',background:'#25D366',color:'#fff',borderRadius:'6px',textDecoration:'none',textAlign:'center',fontWeight:600}}>
              Get Import Agent Quote on WhatsApp
            </a>
          </section>
        )}

        <section aria-label="FAQ for AEO" style={{marginTop:'32px',fontSize:'14px'}}>
          <h3>How is KRA import duty calculated in Kenya 2026?</h3>
          <p>KRA duty = 25% Import Duty + 20-25% Excise Duty + 16% VAT + 2.25% IDF + 2% RDL + KES 5,000 NTSA. Based on depreciated CRSP value.</p>
          
          <h3>What is CRSP?</h3>
          <p>Current Retail Selling Price. KRA list of car values. Depreciates 10% per year, max 70%.</p>
        </section>

        <footer style={{marginTop:'40px',padding:'20px',borderTop:'1px solid #eee',textAlign:'center',fontSize:'14px'}}>
          <div style={{marginBottom:'16px'}}>
            <b>Asunda Ecosystem:</b><br/>
            <a href="https://hub.asunda.autos" style={{margin:'0 8px'}}>Asunda Hub</a> • 
            <a href="https://compliance.asunda.autos" style={{margin:'0 8px'}}>Logbook Transfer Help</a> • 
            <a href="https://parts.asunda.autos" style={{margin:'0 8px'}}>Spare Parts</a>
          </div>
          
          <div style={{marginBottom:'12px'}}>
            <b>Follow Asunda:</b><br/>
            <a href="https://www.facebook.com/share/1HTDMg8rxr/" target="_blank" rel="noopener" style={{margin:'0 8px'}}>Facebook</a> • 
            <a href="https://www.tiktok.com/@asundaautos?_r=1&_t=ZS-95rBbaN6FLr" target="_blank" rel="noopener" style={{margin:'0 8px'}}>TikTok</a>
          </div>
          
          <div style={{fontSize:'12px',color:'#666'}}>
            © 2026 Asunda Autos. Free KRA tools for Kenya.
          </div>
        </footer>
      </main>
    </>
  )
}
