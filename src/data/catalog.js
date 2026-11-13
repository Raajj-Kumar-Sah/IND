export const divisions = {
  iindlube: {
    name: "IINDLUBE", category: "AUTOMOTIVE & INDUSTRIAL LUBRICANTS",
    intro: "Engineered lubrication for demanding performance.",
    description: "Explore lubricant solutions designed for automotive care, industrial machinery and dependable day-to-day operations.",
    products: [
      { id:"il-001", name:"Industrial Gear Oil", category:"Industrial Lubricants", pack:"20 L", code:"IIL-GO-220", desc:"High-performance gear lubrication for industrial applications.", price:"Request quote", specs:["High load-carrying capacity","Oxidation stability","Wear protection"] },
      { id:"il-002", name:"Hydraulic Oil", category:"Hydraulic Fluids", pack:"20 L", code:"IIL-HO-68", desc:"Reliable hydraulic fluid for equipment and industrial systems.", price:"Request quote", specs:["Stable viscosity","Anti-wear formulation","Foam control"] },
      { id:"il-003", name:"Engine Oil", category:"Automotive", pack:"5 L", code:"IIL-EO-15W40", desc:"Engine oil range for dependable engine protection.", price:"Request quote", specs:["Engine cleanliness","Thermal stability","Wear control"] },
      { id:"il-004", name:"Multipurpose Grease", category:"Greases", pack:"5 kg", code:"IIL-MPG-3", desc:"Versatile grease for bearings and general lubrication.", price:"Request quote", specs:["Water resistance","Mechanical stability","Corrosion protection"] }
    ]
  },
  iindpure: {
    name: "IINDPURE", category: "FMCG & DAILY ESSENTIALS",
    intro: "Everyday essentials. A higher standard.",
    description: "A growing portfolio of consumer products built around quality, consistency and value.",
    products: [
      { id:"ip-001", name:"Home Care Cleaner", category:"Home Care", pack:"1 L", code:"IIP-HC-01", desc:"A household cleaning range for everyday home care.", price:"Request quote", specs:["Everyday cleaning","Convenient pack","Quality controlled"] },
      { id:"ip-002", name:"Personal Care Essentials", category:"Personal Care", pack:"500 ml", code:"IIP-PC-02", desc:"Consumer personal care essentials for daily routines.", price:"Request quote", specs:["Daily-use range","Consumer-focused","Multiple pack options"] },
      { id:"ip-003", name:"Kitchen Care Liquid", category:"Kitchen Care", pack:"500 ml", code:"IIP-KC-03", desc:"Kitchen cleaning product range for modern households.", price:"Request quote", specs:["Kitchen use","Easy handling","Retail-ready packs"] }
    ]
  },
  iindstyl: {
    name: "IINDSTYL", category: "GARMENTS & APPAREL",
    intro: "Designed for movement. Made for everyday.",
    description: "Apparel and garment solutions combining dependable manufacturing with contemporary design.",
    products: [
      { id:"is-001", name:"Corporate Essentials", category:"Workwear", pack:"Per piece", code:"IIS-CE-01", desc:"Versatile corporate apparel for teams and organisations.", price:"Request quote", specs:["Custom sizing","Bulk order support","Branding options"] },
      { id:"is-002", name:"Everyday Collection", category:"Casualwear", pack:"Per piece", code:"IIS-EC-02", desc:"A curated everyday apparel collection.", price:"Request quote", specs:["Multiple sizes","Seasonal styles","Bulk availability"] },
      { id:"is-003", name:"Institutional Uniforms", category:"Uniforms", pack:"Per piece", code:"IIS-IU-03", desc:"Uniform solutions for institutions and organisations.", price:"Request quote", specs:["Custom requirements","Size assortment","Bulk production"] }
    ]
  }
};

export const allProducts = Object.values(divisions).flatMap(d => d.products.map(p => ({...p, division:d.name})));
