import { useEffect, useMemo, useState } from "react";
import {
  Plus, Search, Pencil, Power, Trash2, ImagePlus, X, Sparkles,
  Layers, Gauge, Droplet, ShieldCheck, Box, Car, Truck, Wrench
} from "lucide-react";
import SectionHeading from "../../components/SectionHeading.jsx";
import DataTable from "../../components/DataTable.jsx";
import { productAdminApi, categoryAdminApi } from "../../services/catalogAdmin.js";

const divisions = ["IINDLUBE", "IINDPURE", "IINDSTYL", "Corporate"];

/**
 * 10 Modules directly extracted from "IINDLUBE — THE MASTER DIGITAL CATALOGUE"
 */
const CATALOG_TEMPLATES = [
  {
    module: "Module 1: Automotive Petrol & CNG Engine Oils (Ultra-Low Viscosity & Hybrids)",
    categoryName: "Automotive Petrol & CNG Engine Oils",
    name: "ArcticFlow SAE 0W-20 API SP (Full Synthetic)",
    skuPrefix: "LUBE-AF-0W20",
    viscosityGrade: "SAE 0W-20",
    apiStandard: "API SP / ILSAC GF-6A",
    baseOilType: "Full Synthetic",
    drainInterval: "8,000 – 12,000 KM",
    recommendedVehicles: "Honda City e:HEV, Grand Vitara, Creta Turbo, VW Taigun",
    packSizes: "1L, 3L, 3.5L, 4L, 5L, 20L, 210L",
    shortDescription: "Modern turbo-petrol & hybrid passenger cars engine oil with low friction and peak thermal stability.",
    price: "850",
    distributorPrice: "590"
  },
  {
    module: "Module 1: RazorCool Micro-Hybrid Fluid",
    categoryName: "Automotive Petrol & CNG Engine Oils",
    name: "RazorCool SAE 0W-16 API SP",
    skuPrefix: "LUBE-RC-0W16",
    viscosityGrade: "SAE 0W-16",
    apiStandard: "API SP / ILSAC GF-6B",
    baseOilType: "Full Synthetic",
    drainInterval: "8,000 – 12,000 KM",
    recommendedVehicles: "Modern micro-hybrids and ultra-fuel-efficient new generation petrol cars",
    packSizes: "1L, 3L, 3.5L, 4L, 5L, 20L, 210L",
    shortDescription: "Ultra-fuel efficient specialized engine lubricant engineered for micro-hybrid start-stop systems.",
    price: "880",
    distributorPrice: "610"
  },
  {
    module: "Module 1: Premium Passenger Car Motor Oils (5W-30 / 5W-40)",
    categoryName: "Automotive Petrol & CNG Engine Oils",
    name: "Synth-Pro SAE 5W-30 API SN/CF (Full Synthetic)",
    skuPrefix: "LUBE-SP-5W30",
    viscosityGrade: "SAE 5W-30",
    apiStandard: "API SN/CF",
    baseOilType: "Full Synthetic",
    drainInterval: "10,000 – 15,000 KM",
    recommendedVehicles: "High-performance sedans, SUVs, European and Japanese engines",
    packSizes: "1L, 3.5L, 4L, 5L, 20L, 210L",
    shortDescription: "High-performance full synthetic motor oil designed for modern high-revving turbocharged engines.",
    price: "750",
    distributorPrice: "520"
  },
  {
    module: "Module 1: VersaGuard Turbo High-Load Oil",
    categoryName: "Automotive Petrol & CNG Engine Oils",
    name: "VersaGuard SAE 5W-40 API SP/SN",
    skuPrefix: "LUBE-VG-5W40",
    viscosityGrade: "SAE 5W-40",
    apiStandard: "API SP/SN",
    baseOilType: "Full Synthetic",
    drainInterval: "10,000 – 15,000 KM",
    recommendedVehicles: "Turbocharged engines, Scorpio, Creta, Harrier, hot-climate high-load passenger vehicles",
    packSizes: "1L, 3.5L, 4L, 5L, 20L, 210L",
    shortDescription: "Heavy shear stability formulation for turbocharged high-temperature and hot-climate usage.",
    price: "790",
    distributorPrice: "550"
  },
  {
    module: "Module 1: Mid-Range & City Petrol Oils (10W-30)",
    categoryName: "Automotive Petrol & CNG Engine Oils",
    name: "Compact Drive SAE 10W-30 API SM",
    skuPrefix: "LUBE-CD-10W30",
    viscosityGrade: "SAE 10W-30",
    apiStandard: "API SM",
    baseOilType: "Semi-Synthetic",
    drainInterval: "6,000 – 10,000 KM",
    recommendedVehicles: "City hatchbacks, stop-and-go traffic (Alto, WagonR, Swift, Tiago)",
    packSizes: "1L, 3L, 4L, 5L, 7L, 20L, 210L",
    shortDescription: "Engineered specifically for everyday city commute, stop-and-go traffic and engine sludge protection.",
    price: "420",
    distributorPrice: "295"
  },
  {
    module: "Module 1: Vintage & Classic High-Mileage Petrol Oils (20W-50)",
    categoryName: "Automotive Petrol & CNG Engine Oils",
    name: "MagmaForce SAE 20W-50 API SN",
    skuPrefix: "LUBE-MF-20W50",
    viscosityGrade: "SAE 20W-50",
    apiStandard: "API SN",
    baseOilType: "Mineral / Heavy-Duty",
    drainInterval: "3,000 – 8,000 KM",
    recommendedVehicles: "Premier Padmini, Ambassador, Maruti 800, Gypsy, vintage classic cars",
    packSizes: "1L, 3L, 3.5L, 4L, 5L, 20L, 210L",
    shortDescription: "High-film strength formulation preventing oil burning and cushion worn engine clearances.",
    price: "360",
    distributorPrice: "245"
  },
  {
    module: "Module 1: 2-Wheeler Commuter & Heavy-Duty (4T)",
    categoryName: "Automotive Petrol & CNG Engine Oils",
    name: "Valocity4T / RiderPro4T SAE 10W-30 API SN JASO MA2",
    skuPrefix: "LUBE-4T-10W30",
    viscosityGrade: "SAE 10W-30",
    apiStandard: "API SN / JASO MA2",
    baseOilType: "Semi-Synthetic",
    drainInterval: "2,000 – 5,000 KM",
    recommendedVehicles: "4-stroke commuter bikes (Splendor, Shine, Pulsar, Apache)",
    packSizes: "800ml, 900ml, 1L, 5L, 20L, 210L",
    shortDescription: "Optimized wet-clutch performance, non-slip friction profile and high-temperature valve gear protection.",
    price: "380",
    distributorPrice: "260"
  },
  {
    module: "Module 1: Gearless Scooter Automatic CVT Oil",
    categoryName: "Automotive Petrol & CNG Engine Oils",
    name: "ScootPro4T SAE 10W-30 API SL JASO MB",
    skuPrefix: "LUBE-SP4T-10W30",
    viscosityGrade: "SAE 10W-30",
    apiStandard: "API SL / JASO MB",
    baseOilType: "Semi-Synthetic",
    drainInterval: "2,000 – 5,000 KM",
    recommendedVehicles: "Gearless scooters and automatic CVT transmissions (Activa, Jupiter, Access)",
    packSizes: "800ml, 900ml, 1L, 5L, 20L, 210L",
    shortDescription: "Friction-modified low-drag JASO MB formulation maximizing scooter fuel economy and quick pick-up.",
    price: "390",
    distributorPrice: "270"
  },
  {
    module: "Module 1: Cruiser & Heavy Long-Stroke Motorcycles",
    categoryName: "Automotive Petrol & CNG Engine Oils",
    name: "ThumperPro SAE 15W-50 API SN JASO MA2 (Semi-Synthetic)",
    skuPrefix: "LUBE-TP-15W50",
    viscosityGrade: "SAE 15W-50",
    apiStandard: "API SN / JASO MA2",
    baseOilType: "Semi-Synthetic",
    drainInterval: "5,000 – 8,000 KM",
    recommendedVehicles: "Royal Enfield Classic 350, Hunter 350, Meteor 350, Bullet 350 (J-Series & UCE)",
    packSizes: "2.5L, 3.5L, 1L, 50L, 210L",
    shortDescription: "Engineered specifically for air/oil-cooled long-stroke classic engines. Superior vibration damping.",
    price: "680",
    distributorPrice: "475"
  },
  {
    module: "Module 1: Dedicated Low-Ash CNG / LPG Engine Oils",
    categoryName: "Automotive Petrol & CNG Engine Oils",
    name: "EcoGas CNG SAE 5W-30 Dedicated Low-Ash",
    skuPrefix: "LUBE-EG-5W30",
    viscosityGrade: "SAE 5W-30",
    apiStandard: "API SN / Low-Ash CNG",
    baseOilType: "Synthetic Blend",
    drainInterval: "5,000 – 12,000 KM",
    recommendedVehicles: "Modern CNG taxis, light commercial vehicles (WagonR CNG, Eeco CNG, Dzire Tour)",
    packSizes: "1L, 3L, 4L, 5L, 20L, 210L",
    shortDescription: "Low-ash detergent package preventing valve seat recession in high-temperature dry gaseous fuels.",
    price: "490",
    distributorPrice: "340"
  },
  {
    module: "Module 2: Modern Low-Viscosity Heavy-Duty Diesel (CK-4)",
    categoryName: "Heavy-Duty Diesel & Fleet Engine Oils",
    name: "LoadMaster SAE 10W-30 API CK-4/CJ-4/CI-4 Plus",
    skuPrefix: "LUBE-LM-10W30",
    viscosityGrade: "SAE 10W-30",
    apiStandard: "API CK-4 / CJ-4 / CI-4 Plus",
    baseOilType: "Heavy-Duty Synthetic Blend",
    drainInterval: "15,000 – 40,000 KM",
    recommendedVehicles: "Medium-duty trucks, buses, transit fleets, modern BS-VI commercial vehicles",
    packSizes: "4L, 5L, 20L, 210L",
    shortDescription: "Next-generation low-SAPS formulation compatible with DPF & SCR exhaust aftertreatment devices.",
    price: "560",
    distributorPrice: "390"
  },
  {
    module: "Module 2: Flagship Heavy Commercial Fleet Diesel (CI-4 Plus)",
    categoryName: "Heavy-Duty Diesel & Fleet Engine Oils",
    name: "FleetMaster Turbo SAE 15W-40 API CI-4 Plus / CH-4",
    skuPrefix: "LUBE-FM-15W40",
    viscosityGrade: "SAE 15W-40",
    apiStandard: "API CI-4 Plus / CH-4",
    baseOilType: "Heavy-Duty Mineral / Synthetic Fortified",
    drainInterval: "10,000 – 40,000 KM",
    recommendedVehicles: "Tata Signa, Eicher Pro, Ashok Leyland, Cummins, Kirloskar, tippers, multi-axle trucks",
    packSizes: "1L, 5L, 6.5L, 7.5L, 10L, 15L, 20L, 210L (Industrial L-Ring Barrels)",
    shortDescription: "Flagship heavy-duty turbo diesel lubricant built for severe load, soot control, and long-haul runs.",
    price: "410",
    distributorPrice: "285"
  },
  {
    module: "Module 3: Tractor & Farm Machinery Oils (UTTO)",
    categoryName: "Tractor & Agricultural Machinery Oils",
    name: "IINDLUBE UTTO (Universal Tractor Transmission Oil)",
    skuPrefix: "LUBE-UTTO-80W",
    viscosityGrade: "SAE 80W / 10W-30 (UTTO)",
    apiStandard: "API GL-4 / Allison C-4 / John Deere J20C",
    baseOilType: "High-VI Specialized Tractor Fluid",
    drainInterval: "Up to 500 – 1,000 Operating Hours",
    recommendedVehicles: "Mahindra, John Deere, Swaraj, Sonalika, New Holland, Combine Harvesters",
    packSizes: "7.5L, 10L, 20L, 50L, 210L",
    shortDescription: "Multi-functional fluid for tractor transmissions, hydraulic lifts, wet brakes, and power take-off.",
    price: "430",
    distributorPrice: "305"
  },
  {
    module: "Module 4: Automotive Gear Oils & Differentials (GL-5)",
    categoryName: "Automotive Gear Oils & Transmission Fluids",
    name: "TransGear5 SAE 75W-90 & DuraGear5 SAE 80W-90 (API GL-5)",
    skuPrefix: "LUBE-DG5-80W90",
    viscosityGrade: "SAE 80W-90",
    apiStandard: "API GL-5 / MIL-L-2105D",
    baseOilType: "Extreme Pressure (EP) Sulphur-Phosphorus",
    drainInterval: "40,000 – 80,000 KM",
    recommendedVehicles: "Rear differentials, hypoid axles, SUVs, 4x4 vehicles, commercial load carriers",
    packSizes: "500ml, 1L, 4L, 5L, 20L, 210L",
    shortDescription: "Extreme pressure hypoid gear oil resisting shock loads and high sliding tooth contact temperatures.",
    price: "370",
    distributorPrice: "255"
  },
  {
    module: "Module 5: Automotive Brake Fluids & ABS",
    categoryName: "Brake Fluids & Steering / Suspension Fluids",
    name: "ThermaGrip DOT 4 & DOT 4 LV (Low Viscosity)",
    skuPrefix: "LUBE-BF-DOT4",
    viscosityGrade: "DOT 4 LV",
    apiStandard: "FMVSS 116 DOT 4 / SAE J1704 / ISO 4925 Class 6",
    baseOilType: "Polyglycol Ether High Boiling Synthetic",
    drainInterval: "2 Years / 40,000 KM",
    recommendedVehicles: "Modern ABS, ESC, ESP-equipped passenger cars, SUVs, light commercial vehicles",
    packSizes: "250ml, 500ml, 1L, 5L, 20L, 210L",
    shortDescription: "High wet-boiling point brake fluid ensuring vapor lock resistance under severe panic braking.",
    price: "240",
    distributorPrice: "165"
  },
  {
    module: "Module 6: Diesel Exhaust Fluid (DEF / AdBlue)",
    categoryName: "Diesel Exhaust Fluid (DEF / AUS 32 / AdBlue)",
    name: "IINDLUBEDEF (AUS 32 / ISO 22241 / API Certified)",
    skuPrefix: "LUBE-DEF-AUS32",
    viscosityGrade: "AUS 32 (32.5% High Purity Urea)",
    apiStandard: "ISO 22241 / DIN 70070 / API Certified",
    baseOilType: "Aqueous Urea Solution",
    drainInterval: "Replenish as per SCR consumption (approx. 3-5% of diesel consumption)",
    recommendedVehicles: "SCR emission control for all BS-IV / BS-VI commercial vehicles, buses, and diesel passenger cars",
    packSizes: "10L, 20L, 210L HDPE Barrel, Bulk Supply",
    shortDescription: "High-purity aqueous urea solution transforming toxic NOx emissions into harmless nitrogen and water.",
    price: "70",
    distributorPrice: "48"
  },
  {
    module: "Module 7: Industrial Hydraulic Oils (Anti-Wear)",
    categoryName: "Industrial Hydraulic, Compressor, Turbine & Gear Oils",
    name: "HydroFlow ISO VG 46 / 68 (Standard Anti-Wear & High-VI)",
    skuPrefix: "LUBE-HF-ISO46",
    viscosityGrade: "ISO VG 46 / 68",
    apiStandard: "DIN 51524 Part 2 (HLP) / ISO 11158",
    baseOilType: "Zinc-Free / Anti-Wear Premium Mineral",
    drainInterval: "2,000 – 5,000 Operating Hours",
    recommendedVehicles: "CNC machines, injection molding, hydraulic presses, cranes, earthmovers",
    packSizes: "5L, 20L, 55L, 210L Drums, Bulk Tankers",
    shortDescription: "High thermal stability hydraulic fluid preventing pump wear, foam creation and valve sticking.",
    price: "220",
    distributorPrice: "155"
  },
  {
    module: "Module 8: Automotive & Wheel Bearing Greases",
    categoryName: "Greases & Specialty Compounds",
    name: "WheelPro HT (High-Temp Wheel Bearing Grease)",
    skuPrefix: "LUBE-GR-WPHT",
    viscosityGrade: "NLGI 2 / 3",
    apiStandard: "DIN 51825 KP2N-20 / Lithium Complex",
    baseOilType: "Lithium Complex Soap + EP Additives",
    drainInterval: "50,000 – 75,000 KM / Routine Maintenance Hub Service",
    recommendedVehicles: "Automotive front and rear wheel bearings, disc-brake heat zones, heavy truck hubs",
    packSizes: "100g, 250g, 500g, 1kg, 5kg, 18kg, 50kg, 180kg Barrels",
    shortDescription: "High drop-point lithium complex grease with extreme mechanical stability under severe braking heat.",
    price: "340",
    distributorPrice: "235"
  },
  {
    module: "Module 9: Performance Fuel & Engine Additives",
    categoryName: "Fuel, Oil & Performance Additives",
    name: "Flush ProDetox (Engine Flush) & InjectorMax D",
    skuPrefix: "LUBE-ADD-FLUSH",
    viscosityGrade: "Concentrated Additive Formulation",
    apiStandard: "OEM Safe Solvent & Ashless Detergent",
    baseOilType: "Synthetic Carrier Fluid + Solvent Cleaners",
    drainInterval: "Use during each periodic oil change service",
    recommendedVehicles: "All petrol, diesel and CNG cars, light commercial vehicles and fleet trucks",
    packSizes: "100ml, 250ml, 500ml, 1L",
    shortDescription: "Dissolves stubborn sludge, varnish and deposits before draining old oil to restore new oil efficiency.",
    price: "280",
    distributorPrice: "190"
  },
  {
    module: "Module 10: Workshop Maintenance Penetrating Aerosols",
    categoryName: "Workshop Maintenance & Specialty Assembly Lubricants",
    name: "RustBuster 40 (Penetrating Oil & Moisture Displacer)",
    skuPrefix: "LUBE-SP-RB40",
    viscosityGrade: "Low-Viscosity Penetrating Aerosol",
    apiStandard: "Workshop Grade 5-in-1 Specialty Formulation",
    baseOilType: "Solvent-Dispersed Micro-Film Lubricant",
    drainInterval: "On-demand workshop maintenance use",
    recommendedVehicles: "Seized nuts/bolts, locks, spark plugs, electrical terminals, universal workshop equipment",
    packSizes: "Aerosols (100ml-500ml), Pastes/Compounds (5g to 1kg), Bulk 5L/20L",
    shortDescription: "Fast-acting penetrating formulation loosening seized fasteners and displacing water moisture.",
    price: "185",
    distributorPrice: "125"
  }
];

const blank = {
  sku: "",
  name: "",
  division: "IINDLUBE",
  category: "",
  brand: "IINDLUBE",
  shortDescription: "",
  description: "",
  price: "",
  distributorPrice: "",
  stockQuantity: "50",
  reorderLevel: "10",
  // Catalog-specific structured specifications
  viscosityGrade: "",
  apiStandard: "",
  baseOilType: "Full Synthetic",
  drainInterval: "",
  recommendedVehicles: "",
  packSizes: "1L, 3.5L, 5L, 20L, 210L"
};

export default function ProductsManager() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [q, setQ] = useState("");
  const [division, setDivision] = useState("");
  const [status, setStatus] = useState("");
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [files, setFiles] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function load() {
    setError("");
    try {
      const [p, c] = await Promise.all([
        productAdminApi.list({ search: q, division, status, limit: 100 }),
        categoryAdminApi.list({ division, includeInactive: "false" })
      ]);
      setItems(p.data.items || []);
      setCategories(c.data || []);
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {
    load();
  }, [q, division, status]);

  const availableCategories = useMemo(
    () => categories.filter((c) => !form.division || c.division === form.division),
    [categories, form.division]
  );

  function openCreate() {
    setEditing(null);
    setForm(blank);
    setFiles([]);
    setShowForm(true);
    setError("");
  }

  function applyCatalogPreset(tmpl) {
    const matchedCategory = categories.find(
      (c) => c.name.toLowerCase() === tmpl.categoryName.toLowerCase() && c.division === "IINDLUBE"
    );

    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const generatedDescription = tmpl.description || `${tmpl.shortDescription} Engineered specifically for ${tmpl.recommendedVehicles}. Meets and exceeds ${tmpl.apiStandard} performance criteria with high thermal shear stability, advanced sludge prevention, and extended service life up to ${tmpl.drainInterval}. Available in standard distribution packaging: ${tmpl.packSizes}.`;

    setForm((prev) => ({
      ...prev,
      division: "IINDLUBE",
      brand: "IINDLUBE",
      category: matchedCategory?._id || prev.category,
      name: tmpl.name,
      sku: `${tmpl.skuPrefix}-${randomSuffix}`,
      viscosityGrade: tmpl.viscosityGrade,
      apiStandard: tmpl.apiStandard,
      baseOilType: tmpl.baseOilType,
      drainInterval: tmpl.drainInterval,
      recommendedVehicles: tmpl.recommendedVehicles,
      packSizes: tmpl.packSizes,
      shortDescription: tmpl.shortDescription,
      description: generatedDescription,
      price: tmpl.price,
      distributorPrice: tmpl.distributorPrice
    }));
  }

  function openEdit(p) {
    setEditing(p._id);

    // Parse structured specifications back into form fields
    const specMap = {};
    if (Array.isArray(p.specifications)) {
      p.specifications.forEach((s) => {
        specMap[s.key] = s.value;
      });
    }

    setForm({
      ...blank,
      ...p,
      category: p.category?._id || p.category,
      price: String(p.price),
      distributorPrice: p.distributorPrice ?? "",
      stockQuantity: String(p.stockQuantity),
      reorderLevel: String(p.reorderLevel),
      viscosityGrade: specMap["Viscosity Grade"] || "",
      apiStandard: specMap["API / Quality Standard"] || "",
      baseOilType: specMap["Base Oil Type"] || "Full Synthetic",
      drainInterval: specMap["Drain Interval"] || "",
      recommendedVehicles: specMap["Recommended Vehicles / Applications"] || "",
      packSizes: specMap["Pack Sizes"] || "1L, 3.5L, 5L, 20L, 210L"
    });
    setFiles([]);
    setShowForm(true);
    setError("");
  }

  function change(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");
    try {
      // Build structured specifications array from catalog attributes
      const specs = [
        { key: "Viscosity Grade", value: form.viscosityGrade || "—" },
        { key: "API / Quality Standard", value: form.apiStandard || "—" },
        { key: "Base Oil Type", value: form.baseOilType || "—" },
        { key: "Drain Interval", value: form.drainInterval || "—" },
        { key: "Recommended Vehicles / Applications", value: form.recommendedVehicles || "—" },
        { key: "Pack Sizes", value: form.packSizes || "—" }
      ].filter((s) => s.value && s.value !== "—");

      const resolvedDescription = form.description?.trim() || form.shortDescription?.trim() || "High-performance industrial lubricant manufactured under strict ISO quality standards.";

      const payload = {
        sku: form.sku.trim().toUpperCase(),
        name: form.name.trim(),
        division: form.division,
        category: form.category,
        brand: form.brand.trim(),
        shortDescription: form.shortDescription || form.description?.slice(0, 160) || "",
        description: resolvedDescription,
        price: Number(form.price),
        distributorPrice: form.distributorPrice === "" ? null : Number(form.distributorPrice),
        stockQuantity: Number(form.stockQuantity),
        reorderLevel: Number(form.reorderLevel),
        specifications: specs
      };

      let saved;
      if (editing) {
        saved = await productAdminApi.update(editing, payload);
        if (files.length) await productAdminApi.uploadImages(editing, files);
      } else {
        saved = await productAdminApi.create(payload);
        if (files.length) await productAdminApi.uploadImages(saved.data._id, files);
      }
      setShowForm(false);
      setNotice(editing ? "Product updated successfully." : "Product created successfully.");
      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function toggle(p) {
    try {
      await productAdminApi.setActive(p._id, !p.isActive);
      setNotice("Product status updated.");
      await load();
    } catch (e) {
      setError(e.message);
    }
  }

  async function remove(p) {
    if (!window.confirm(`Delete ${p.name}? Products with stock cannot be deleted.`)) return;
    try {
      await productAdminApi.remove(p._id);
      setNotice("Product deleted.");
      await load();
    } catch (e) {
      setError(e.message);
    }
  }

  const rows = items.map((p) => ({
    sku: p.sku,
    name: (
      <div>
        <div className="font-semibold text-white">{p.name}</div>
        <div className="text-[11px] text-[#8e887d]">
          {p.specifications?.find((s) => s.key === "Viscosity Grade")?.value || p.brand}
        </div>
      </div>
    ),
    division: (
      <span className="rounded bg-gold/10 px-2 py-0.5 text-[10px] font-bold text-gold">
        {p.division}
      </span>
    ),
    category: p.category?.name || "—",
    brand: p.brand,
    price: `₹${Number(p.price).toLocaleString("en-IN")}`,
    distributorPrice: p.distributorPrice ? `₹${Number(p.distributorPrice).toLocaleString("en-IN")}` : "—",
    stock: (
      <span
        className={`font-semibold ${
          p.stockQuantity <= p.reorderLevel ? "text-amber-400" : "text-emerald-400"
        }`}
      >
        {p.stockQuantity}
      </span>
    ),
    status: (
      <span
        className={`rounded px-2 py-0.5 text-[10px] font-bold ${
          p.isActive ? "bg-emerald-950/60 text-emerald-300" : "bg-red-950/60 text-red-300"
        }`}
      >
        {p.isActive ? "Active" : "Inactive"}
      </span>
    ),
    actions: (
      <div className="flex gap-2">
        <button title="Edit" onClick={() => openEdit(p)} className="rounded border border-white/15 p-2 hover:border-gold hover:text-gold transition">
          <Pencil size={14} />
        </button>
        <button title="Activate/Deactivate" onClick={() => toggle(p)} className="rounded border border-white/15 p-2 hover:border-gold hover:text-gold transition">
          <Power size={14} />
        </button>
        <button title="Delete" onClick={() => remove(p)} className="rounded border border-white/15 p-2 text-red-300 hover:bg-red-950/40 transition">
          <Trash2 size={14} />
        </button>
      </div>
    )
  }));

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="CATALOGUE MANAGEMENT"
          title="Products"
          description="Manage lubricants, industrial fluids, specifications, automotive grades, pricing and stock according to the Master Digital Catalogue."
        />
        <button className="gold-button" onClick={openCreate}>
          <Plus size={15} /> Add Product
        </button>
      </div>

      <div className="my-6 flex flex-wrap gap-3">
        <div className="flex min-w-56 items-center gap-2 border border-white/15 px-3">
          <Search size={15} className="text-[#8e887d]" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full bg-transparent py-3 text-xs outline-none"
            placeholder="Search name, SKU, brand, viscosity..."
          />
        </div>
        <select className="dark-field" value={division} onChange={(e) => setDivision(e.target.value)}>
          <option value="">All divisions</option>
          {divisions.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
        <select className="dark-field" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {error && <p className="mb-4 text-sm text-red-300">{error}</p>}
      {notice && <p className="mb-4 text-sm text-emerald-300">{notice}</p>}

      <DataTable
        columns={[
          { key: "sku", label: "SKU" },
          { key: "name", label: "Product & Spec" },
          { key: "division", label: "Division" },
          { key: "category", label: "Category" },
          { key: "brand", label: "Brand" },
          { key: "price", label: "Retail (₹)" },
          { key: "distributorPrice", label: "Distributor (₹)" },
          { key: "stock", label: "Stock" },
          { key: "status", label: "Status" },
          { key: "actions", label: "Actions" }
        ]}
        rows={rows}
      />

      {/* ── Add / Edit Product Modal (Catalog-Driven) ── */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-sm">
          <form
            onSubmit={submit}
            className="my-8 w-full max-w-4xl border border-white/15 bg-[#141412] p-7 shadow-2xl"
          >
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="eyebrow">INDIRA INDUSTRIES CATALOGUE</span>
                <h2 className="serif text-2xl font-bold text-white">
                  {editing ? "Edit Catalogue Product" : "Create Catalogue Product"}
                </h2>
              </div>
              <button
                type="button"
                className="text-[#888] hover:text-white transition"
                onClick={() => setShowForm(false)}
              >
                <X size={20} />
              </button>
            </div>

            {error && <p className="mb-4 text-sm text-red-300">{error}</p>}

            {/* Quick Autofill from 10 Catalogue Modules */}
            {!editing && (
              <div className="mb-6 rounded border border-gold/30 bg-gold/5 p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-gold">
                  <Sparkles size={14} /> Quick-Fill from Master Digital Catalogue (Modules 1 to 10):
                </div>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {CATALOG_TEMPLATES.map((tmpl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => applyCatalogPreset(tmpl)}
                      className="rounded border border-gold/40 bg-[#1c1b17] px-2.5 py-1 text-[11px] text-[#e0d6c3] hover:border-gold hover:bg-gold/20 hover:text-gold transition"
                    >
                      {tmpl.name.split(" ")[0]} ({tmpl.viscosityGrade})
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-[10px] text-[#aaa]">
                  Clicking any preset populates all technical specifications, drain intervals, pack sizes, and standard application guides directly from the IINDLUBE catalogue.
                </p>
              </div>
            )}

            {/* Section 1: Basic Identifiers */}
            <div className="mb-6">
              <h3 className="serif mb-3 text-sm font-semibold text-gold flex items-center gap-2">
                <Box size={14} /> 1. Basic Product Identity
              </h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <label className="text-xs text-[#aaa]">
                  Division *
                  <select
                    name="division"
                    value={form.division}
                    onChange={change}
                    className="dark-field mt-1.5 w-full"
                  >
                    {divisions.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </label>

                <label className="text-xs text-[#aaa]">
                  Category *
                  <select
                    required
                    name="category"
                    value={form.category}
                    onChange={change}
                    className="dark-field mt-1.5 w-full"
                  >
                    <option value="">Select category</option>
                    {availableCategories.map((c) => (
                      <option value={c._id} key={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="text-xs text-[#aaa]">
                  Brand *
                  <input
                    required
                    name="brand"
                    value={form.brand}
                    onChange={change}
                    placeholder="e.g. IINDLUBE"
                    className="dark-field mt-1.5 w-full"
                  />
                </label>

                <label className="text-xs text-[#aaa] sm:col-span-2">
                  Product Name * (as per Catalogue)
                  <input
                    required
                    name="name"
                    value={form.name}
                    onChange={change}
                    placeholder="e.g. ArcticFlow SAE 0W-20 API SP (Full Synthetic)"
                    className="dark-field mt-1.5 w-full"
                  />
                </label>

                <label className="text-xs text-[#aaa]">
                  SKU Code *
                  <input
                    required
                    name="sku"
                    value={form.sku}
                    onChange={change}
                    placeholder="e.g. LUBE-AF-0W20"
                    className="dark-field mt-1.5 w-full uppercase"
                  />
                </label>
              </div>
            </div>

            {/* Section 2: Automotive / Lubricant Specifications (From Catalog) */}
            <div className="mb-6 border-t border-white/10 pt-5">
              <h3 className="serif mb-3 text-sm font-semibold text-gold flex items-center gap-2">
                <Gauge size={14} /> 2. Technical Specifications (From Master Catalogue)
              </h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <label className="text-xs text-[#aaa]">
                  Viscosity / ISO Grade
                  <input
                    name="viscosityGrade"
                    value={form.viscosityGrade}
                    onChange={change}
                    placeholder="e.g. SAE 0W-20 / 15W-40 / ISO VG 46"
                    className="dark-field mt-1.5 w-full"
                  />
                </label>

                <label className="text-xs text-[#aaa]">
                  API / Quality Standard
                  <input
                    name="apiStandard"
                    value={form.apiStandard}
                    onChange={change}
                    placeholder="e.g. API SP, API CI-4 Plus, JASO MA2"
                    className="dark-field mt-1.5 w-full"
                  />
                </label>

                <label className="text-xs text-[#aaa]">
                  Base Oil Technology
                  <select
                    name="baseOilType"
                    value={form.baseOilType}
                    onChange={change}
                    className="dark-field mt-1.5 w-full"
                  >
                    <option value="Full Synthetic">Full Synthetic</option>
                    <option value="Semi-Synthetic">Semi-Synthetic</option>
                    <option value="Synthetic Blend">Synthetic Blend</option>
                    <option value="Mineral / Heavy-Duty">Mineral / Heavy-Duty</option>
                    <option value="Lithium Complex Soap">Lithium Complex Soap</option>
                    <option value="Aqueous Urea Solution">Aqueous Urea Solution</option>
                    <option value="Specialized Chemical Additive">Specialized Chemical Additive</option>
                  </select>
                </label>

                <label className="text-xs text-[#aaa]">
                  Drain Interval
                  <input
                    name="drainInterval"
                    value={form.drainInterval}
                    onChange={change}
                    placeholder="e.g. 10,000 – 15,000 KM or 500 Hours"
                    className="dark-field mt-1.5 w-full"
                  />
                </label>

                <label className="text-xs text-[#aaa] sm:col-span-2">
                  Pack Sizes Available
                  <input
                    name="packSizes"
                    value={form.packSizes}
                    onChange={change}
                    placeholder="e.g. 1L, 3L, 3.5L, 4L, 5L, 20L, 210L Barrel"
                    className="dark-field mt-1.5 w-full"
                  />
                </label>

                <label className="text-xs text-[#aaa] sm:col-span-3">
                  Recommended Vehicles & OEM Applications
                  <input
                    name="recommendedVehicles"
                    value={form.recommendedVehicles}
                    onChange={change}
                    placeholder="e.g. Honda City e:HEV, Grand Vitara, Creta Turbo, VW Taigun / Ashok Leyland, Tata Signa"
                    className="dark-field mt-1.5 w-full"
                  />
                </label>
              </div>
            </div>

            {/* Section 3: Commercial Pricing & Inventory */}
            <div className="mb-6 border-t border-white/10 pt-5">
              <h3 className="serif mb-3 text-sm font-semibold text-gold flex items-center gap-2">
                <Layers size={14} /> 3. Commercial Pricing & Inventory
              </h3>
              <div className="grid gap-4 sm:grid-cols-4">
                <label className="text-xs text-[#aaa]">
                  Retail MRP (₹) *
                  <input
                    required
                    type="number"
                    min="0"
                    step="any"
                    name="price"
                    value={form.price}
                    onChange={change}
                    placeholder="850"
                    className="dark-field mt-1.5 w-full"
                  />
                </label>

                <label className="text-xs text-[#aaa]">
                  Distributor Price (₹)
                  <input
                    type="number"
                    min="0"
                    step="any"
                    name="distributorPrice"
                    value={form.distributorPrice}
                    onChange={change}
                    placeholder="590"
                    className="dark-field mt-1.5 w-full"
                  />
                </label>

                <label className="text-xs text-[#aaa]">
                  Opening Stock Quantity *
                  <input
                    required
                    type="number"
                    min="0"
                    name="stockQuantity"
                    value={form.stockQuantity}
                    onChange={change}
                    placeholder="50"
                    className="dark-field mt-1.5 w-full"
                  />
                </label>

                <label className="text-xs text-[#aaa]">
                  Low-Stock Reorder Level
                  <input
                    type="number"
                    min="0"
                    name="reorderLevel"
                    value={form.reorderLevel}
                    onChange={change}
                    placeholder="10"
                    className="dark-field mt-1.5 w-full"
                  />
                </label>
              </div>
            </div>

            {/* Section 4: Descriptions & Images */}
            <div className="mb-6 border-t border-white/10 pt-5">
              <h3 className="serif mb-3 text-sm font-semibold text-gold flex items-center gap-2">
                <ImagePlus size={14} /> 4. Descriptions & Media
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-xs text-[#aaa] sm:col-span-2">
                  Short Highlight / Catalogue Summary
                  <input
                    name="shortDescription"
                    value={form.shortDescription}
                    onChange={change}
                    placeholder="Brief 1-line feature summary from the catalogue"
                    className="dark-field mt-1.5 w-full"
                  />
                </label>

                <label className="text-xs text-[#aaa] sm:col-span-2">
                  Full Description & Performance Benefits
                  <textarea
                    rows={3}
                    name="description"
                    value={form.description}
                    onChange={change}
                    placeholder="Detailed performance benefits, shear stability, friction profile, environmental compliance..."
                    className="dark-field mt-1.5 w-full"
                  />
                </label>

                <label className="text-xs text-[#aaa] sm:col-span-2">
                  <span className="mb-2 flex items-center gap-2">
                    <ImagePlus size={15} /> Upload Product Photos (Streamed directly to Cloudinary)
                  </span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    multiple
                    onChange={(e) => setFiles(e.target.files)}
                    className="block w-full text-xs text-[#aaa] file:mr-3 file:rounded file:border-0 file:bg-gold file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-black hover:file:bg-[#b8963e]"
                  />
                </label>
              </div>
            </div>

            {/* Submit & Cancel Buttons */}
            <div className="mt-8 flex justify-end gap-3 border-t border-white/10 pt-5">
              <button
                type="button"
                className="border border-white/20 px-5 py-2.5 text-xs text-[#aaa] hover:text-white transition"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button disabled={busy} className="gold-button">
                {busy ? "Saving..." : editing ? "Save Changes" : "Create Product"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
