'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import * as XLSX from 'xlsx'

// ─── Types ────────────────────────────────────────────────────────────────────

type UserName = 'Alawi' | 'Mew' | 'Fakhri'
type FilterStatus = 'alla' | 'ej klara' | 'klara' | 'inaktiva'

interface SeedClient {
  id: number; skr: string; namn: string; ansvarig: string
  bransch: string; sprak: string; freq: string; bank: string; mejl: string
}

interface ClientRow {
  id: number
  client_id: number
  skr: string; namn: string; ansvarig: string; bransch: string
  sprak: string; freq: string; bank: string; mejl: string
  month: string
  kontoutdrag: boolean; skattekonto: boolean; underlag: boolean; bokforing: boolean; fatt_saknade: boolean
  konto1630: boolean; avstamning: boolean; agi: boolean; moms: boolean; utsk_faktura: boolean
  kommentar: string; updated_by: string; updated_at: string | null
  backlog_from: string | null
}

interface ExcelPreviewRow {
  client_id: number | null; namn: string; skr: string; ansvarig: string
  bransch: string; sprak: string; freq: string; bank: string; mejl: string
  warning?: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const USERS: UserName[] = ['Alawi', 'Mew', 'Fakhri']
const DEFAULT_MONTHS = ['Mars 2026', 'April 2026']
const BACKLOG_MONTH = 'Backlog'
const SWEDISH_MONTHS = ['Januari','Februari','Mars','April','Maj','Juni','Juli','Augusti','September','Oktober','November','December']

const CHECKBOX_COLS = ['kontoutdrag','skattekonto','underlag','bokforing','fatt_saknade','konto1630','avstamning','agi','moms','utsk_faktura'] as const
type CheckboxCol = typeof CHECKBOX_COLS[number]

const COL_LABELS: Record<CheckboxCol, string> = {
  kontoutdrag:'KU', skattekonto:'SKT', underlag:'UL', bokforing:'BF', fatt_saknade:'FSU',
  konto1630:'1630', avstamning:'AVS', agi:'AGI', moms:'MMS', utsk_faktura:'U&F',
}
const FORTNOX_COLS = new Set<CheckboxCol>(['kontoutdrag','skattekonto'])

// ─── Seed Data ────────────────────────────────────────────────────────────────

const SEED_CLIENTS: SeedClient[] = [
  { id:1,  skr:'AB', namn:'GP Transport AB',                        ansvarig:'Alawi',  bransch:'Taxi',          sprak:'Svenska',  freq:'Månad',   bank:'Bokio',         mejl:'gptransportab@outlook.com' },
  { id:2,  skr:'AB', namn:'Salong och Solarium Victoria AB',        ansvarig:'Alawi',  bransch:'Frisör',        sprak:'Arabiska', freq:'Månad',   bank:'Danske bank',   mejl:'mazentiger@hotmail.com' },
  { id:3,  skr:'AB', namn:'Memand Automotive AB',                   ansvarig:'Mew',    bransch:'Bilfirma',      sprak:'Svenska',  freq:'Månad',   bank:'Danske bank',   mejl:'haval.yusef@hotmail.com' },
  { id:4,  skr:'AB', namn:'QS Performance AB',                      ansvarig:'Alawi',  bransch:'Försäljning',   sprak:'Svenska',  freq:'Kvartal', bank:'Handelsbanken', mejl:'' },
  { id:5,  skr:'AB', namn:'Saunamarsalkka AB',                      ansvarig:'Alawi',  bransch:'Butik',         sprak:'Svenska',  freq:'År',      bank:'Handelsbanken', mejl:'' },
  { id:6,  skr:'AB', namn:'Brian & Company AB',                     ansvarig:'Alawi',  bransch:'Försäljning',   sprak:'Svenska',  freq:'Kvartal', bank:'Handelsbanken', mejl:'' },
  { id:7,  skr:'EF', namn:'Granebergs grill och café',              ansvarig:'Mew',    bransch:'Restaurang',    sprak:'Arabiska', freq:'Månad',   bank:'Handelsbanken', mejl:'' },
  { id:8,  skr:'EF', namn:'Daniel Grzywa',                          ansvarig:'Mew',    bransch:'',              sprak:'Svenska',  freq:'Kvartal', bank:'Handelsbanken', mejl:'' },
  { id:9,  skr:'AB', namn:'EM Projektpartner AB',                   ansvarig:'Fakhri', bransch:'',              sprak:'',         freq:'År',      bank:'Nordea',        mejl:'' },
  { id:16, skr:'EF', namn:'Gunay Yildiran - Eskilstuna Decor',      ansvarig:'Mew',    bransch:'Decor',         sprak:'Arabiska', freq:'Kvartal', bank:'ingen',         mejl:'' },
  { id:18, skr:'EF', namn:'Jessica Kelmendi',                       ansvarig:'Alawi',  bransch:'Frisör',        sprak:'Svenska',  freq:'Kvartal', bank:'Ingen',         mejl:'' },
  { id:19, skr:'AB', namn:'Löten 9 Fastigheter AB',                 ansvarig:'',       bransch:'Fastigheter',   sprak:'Arabiska', freq:'Kvartal', bank:'ingen',         mejl:'' },
  { id:20, skr:'AB', namn:'New Pulse AB',                           ansvarig:'Mew',    bransch:'E-handel',      sprak:'Svenska',  freq:'Månad',   bank:'Lunar',         mejl:'' },
  { id:22, skr:'AB', namn:'AR TRANSPORT & ENTREPRENAD AB',          ansvarig:'Mew',    bransch:'Transport',     sprak:'Svenska',  freq:'Kvartal', bank:'Lunar',         mejl:'' },
  { id:23, skr:'EF', namn:'Maha Alfeel / Klipp & Stil',             ansvarig:'Mew',    bransch:'Frisör',        sprak:'Arabiska', freq:'Månad',   bank:'Lunar',         mejl:'' },
  { id:24, skr:'AB', namn:'Cest La Vie AB',                         ansvarig:'Alawi',  bransch:'Mode',          sprak:'Svenska',  freq:'Månad',   bank:'Lunar',         mejl:'' },
  { id:25, skr:'EF', namn:'Aylas Bilar (EF Diana Ahmed)',           ansvarig:'Alawi',  bransch:'Bilfirma',      sprak:'Svenska',  freq:'Månad',   bank:'Marginalen',    mejl:'' },
  { id:26, skr:'HB', namn:'Twinky Grill & Restaurang',              ansvarig:'Alawi',  bransch:'Restaurang',    sprak:'Arabiska', freq:'Månad',   bank:'Marginalen',    mejl:'' },
  { id:27, skr:'AB', namn:'Bäckby Bageri och Tårtor AB',            ansvarig:'Alawi',  bransch:'Bageri',        sprak:'Arabiska', freq:'Kvartal', bank:'Marginalen',    mejl:'' },
  { id:28, skr:'AB', namn:'SKKK Trade AB',                          ansvarig:'Alawi',  bransch:'Aktiehandel',   sprak:'Engelska', freq:'År',      bank:'Marginalen',    mejl:'' },
  { id:29, skr:'EF', namn:'Homandski',                              ansvarig:'Alawi',  bransch:'Tatuerare',     sprak:'Engelska', freq:'År',      bank:'Mejl',          mejl:'' },
  { id:30, skr:'EF', namn:'FK Barbershop - Fuad Karavaliyev',       ansvarig:'Alawi',  bransch:'Frisör',        sprak:'Svenska',  freq:'Kvartal', bank:'Nordea',        mejl:'' },
  { id:31, skr:'AB', namn:'EMA Bygg Entreprenad',                   ansvarig:'Mew',    bransch:'Bygg',          sprak:'',         freq:'År',      bank:'Nordea',        mejl:'' },
  { id:32, skr:'AB', namn:'Malma Mek AB',                           ansvarig:'Mew',    bransch:'Bilservice',    sprak:'Svenska',  freq:'Kvartal', bank:'Nordea',        mejl:'' },
  { id:34, skr:'AB', namn:'Red team transport & logistics AB',      ansvarig:'',       bransch:'Transport',     sprak:'Svenska',  freq:'Kvartal', bank:'Nordea',        mejl:'' },
  { id:35, skr:'AB', namn:'Arbers Barbershop',                      ansvarig:'Mew',    bransch:'Frisör',        sprak:'Engelska', freq:'Kvartal', bank:'Nordea',        mejl:'' },
  { id:36, skr:'EF', namn:'Michele Gregoi (på god tass)',           ansvarig:'Alawi',  bransch:'Hunddagis',     sprak:'Svenska',  freq:'År',      bank:'Nordea',        mejl:'' },
  { id:37, skr:'EF', namn:'Pimrede Massage',                        ansvarig:'Mew',    bransch:'Massage',       sprak:'Svenska',  freq:'Månad',   bank:'Nordea',        mejl:'' },
  { id:38, skr:'EF', namn:'Anhur Hikmat Muttashar',                 ansvarig:'Mew',    bransch:'Bemanning',     sprak:'Svenska',  freq:'Månad',   bank:'Nordea',        mejl:'' },
  { id:39, skr:'AB', namn:'Flen Pizzeria AB',                       ansvarig:'Alawi',  bransch:'Pizzeria',      sprak:'Arabiska', freq:'Månad',   bank:'Nordea',        mejl:'' },
  { id:40, skr:'EF', namn:'Håkan Andersson',                        ansvarig:'Mew',    bransch:'PT',            sprak:'Svenska',  freq:'Månad',   bank:'Nordea',        mejl:'' },
  { id:41, skr:'AB', namn:'Trygg skuldsanering Stockholm AB',       ansvarig:'Alawi',  bransch:'Skuldsanering', sprak:'Svenska',  freq:'Månad',   bank:'Northmill',     mejl:'' },
  { id:42, skr:'AB', namn:'Nordiska Oljekompaniet AB',              ansvarig:'Fakhri', bransch:'Olja',          sprak:'Svenska',  freq:'Månad',   bank:'Northmill',     mejl:'' },
  { id:43, skr:'AB', namn:'JIW AB',                                 ansvarig:'Mew',    bransch:'AirBnb/Rest',   sprak:'Svenska',  freq:'Månad',   bank:'SEB',           mejl:'' },
  { id:44, skr:'AB', namn:'Roy Taxi AB',                            ansvarig:'Alawi',  bransch:'Taxi',          sprak:'',         freq:'Månad',   bank:'SEB',           mejl:'' },
  { id:45, skr:'EF', namn:'SH kläder (Ta7siiiiin el ras)',          ansvarig:'Alawi',  bransch:'Kläder',        sprak:'Arabiska', freq:'Månad',   bank:'SEB',           mejl:'' },
  { id:47, skr:'AB', namn:'Sirula AB',                              ansvarig:'Alawi',  bransch:'IT',            sprak:'Svenska',  freq:'År',      bank:'SEB',           mejl:'' },
  { id:48, skr:'AB', namn:'Megaloop AB',                            ansvarig:'Mew',    bransch:'Fordons lack',  sprak:'Arabiska', freq:'Månad',   bank:'SEB',           mejl:'' },
  { id:49, skr:'AB', namn:'New Look Salong i Eskilstuna AB',        ansvarig:'Mew',    bransch:'Frisör',        sprak:'Svenska',  freq:'Kvartal', bank:'SEB',           mejl:'' },
  { id:50, skr:'AB', namn:'JustPLMSCANDIC AB',                      ansvarig:'Mew',    bransch:'IT',            sprak:'Engelska', freq:'År',      bank:'SEB',           mejl:'' },
  { id:51, skr:'AB', namn:'Anna livs i norrköping AB',              ansvarig:'Mew',    bransch:'Livsmedel',     sprak:'Arabiska', freq:'År',      bank:'SEB',           mejl:'' },
  { id:52, skr:'EF', namn:'Zuher Alghader',                         ansvarig:'Mew',    bransch:'Bilfirma',      sprak:'Arabiska', freq:'Kvartal', bank:'Svea',          mejl:'' },
  { id:53, skr:'EF', namn:'Din Bil Partner Ahmad Al dulaimi',       ansvarig:'Mew',    bransch:'Bilfirma',      sprak:'Arabiska', freq:'Månad',   bank:'Svea',          mejl:'' },
  { id:54, skr:'AB', namn:'L&L Bilskade & Mek AB',                 ansvarig:'Mew',    bransch:'Mekaniker',     sprak:'Arabiska', freq:'Månad',   bank:'Svea',          mejl:'flensbilservice.ab@gmail.com' },
  { id:55, skr:'EF', namn:'Friskare Fötter Nyköping',               ansvarig:'Mew',    bransch:'Fotvård',       sprak:'Svenska',  freq:'Månad',   bank:'Svea',          mejl:'' },
  { id:56, skr:'AB', namn:'Wisam Retail AB',                        ansvarig:'Alawi',  bransch:'Retail',        sprak:'Svenska',  freq:'Månad',   bank:'Svea',          mejl:'' },
  { id:57, skr:'AB', namn:'Amberline Taxi AB',                      ansvarig:'Alawi',  bransch:'Taxi',          sprak:'Svenska',  freq:'År',      bank:'Swed',          mejl:'' },
  { id:58, skr:'EF', namn:'Basel Zanklo',                           ansvarig:'Mew',    bransch:'Taxi',          sprak:'Arabiska', freq:'Månad',   bank:'Swed',          mejl:'' },
  { id:59, skr:'AB', namn:'Rabi Bilservice AB',                     ansvarig:'Alawi',  bransch:'Bilservice',    sprak:'Svenska',  freq:'Månad',   bank:'Swed',          mejl:'' },
  { id:61, skr:'EF', namn:'MB Lokalatjänster (Mohamed Albakir)',    ansvarig:'Mew',    bransch:'Städ',          sprak:'Svenska',  freq:'Kvartal', bank:'Swed',          mejl:'' },
  { id:62, skr:'AB', namn:'MB Lokalatjänster AB',                   ansvarig:'Mew',    bransch:'Städ',          sprak:'Svenska',  freq:'Kvartal', bank:'Swed',          mejl:'' },
  { id:63, skr:'AB', namn:'DJ Lulle Music & Entertainment AB',      ansvarig:'Mew',    bransch:'DJ',            sprak:'Svenska',  freq:'Kvartal', bank:'Swed',          mejl:'' },
  { id:64, skr:'AB', namn:'Sörmlands Bygg och Ronevering AB',       ansvarig:'Mew',    bransch:'Bygg',          sprak:'Arabiska', freq:'Månad',   bank:'Swedbank',       mejl:'' },
  { id:65, skr:'AB', namn:'Strängnäs Bilvård AB',                   ansvarig:'Mew',    bransch:'Bilvård',       sprak:'Svenska',  freq:'Månad',   bank:'Danske bank',   mejl:'' },
  { id:66, skr:'EF', namn:'Skampa entreprenad/florian kelmendi',    ansvarig:'Fakhri', bransch:'Bygg',          sprak:'Svenska',  freq:'Kvartal', bank:'Swed',          mejl:'' },
  { id:67, skr:'AB', namn:'Phoenix Garden AB',                      ansvarig:'Alawi',  bransch:'Florist',       sprak:'Arabiska', freq:'Månad',   bank:'Swed',          mejl:'' },
  { id:68, skr:'AB', namn:'City Bilar I Eskilstuna AB',             ansvarig:'Mew',    bransch:'Bilfirma',      sprak:'Svenska',  freq:'Månad',   bank:'Swed',          mejl:'' },
  { id:69, skr:'AB', namn:'C tjänster AB',                          ansvarig:'Mew',    bransch:'Tjänster',      sprak:'Svenska',  freq:'Kvartal', bank:'Swed',          mejl:'' },
  { id:70, skr:'EF', namn:'Sara Livs - Haytham Mahmoud',            ansvarig:'Alawi',  bransch:'Livsmedel',     sprak:'Arabiska', freq:'Månad',   bank:'Swed',          mejl:'' },
  { id:71, skr:'EF', namn:'Bostanci, Nilüfer - Niffes Klippotek',   ansvarig:'Alawi',  bransch:'Frisör',        sprak:'Svenska',  freq:'Månad',   bank:'Swed',          mejl:'' },
  { id:72, skr:'AB', namn:'Aluh AB',                                 ansvarig:'Mew',    bransch:'Taxi',          sprak:'Svenska',  freq:'Månad',   bank:'Swed',          mejl:'' },
  { id:73, skr:'AB', namn:'Kd Mark & anläggning AB',                ansvarig:'Mew',    bransch:'Bygg',          sprak:'Svenska',  freq:'Månad',   bank:'Swed',          mejl:'Info@kdbygg.se' },
  { id:74, skr:'AB', namn:'Mix PLus AB',                            ansvarig:'Mew',    bransch:'Bygg/Taxi',     sprak:'Svenska',  freq:'Kvartal', bank:'Swed',          mejl:'' },
  { id:76, skr:'AB', namn:'Eskilstuna Trafikskola AB',              ansvarig:'Mew',    bransch:'Trafikskola',   sprak:'Arabiska', freq:'Månad',   bank:'Swed',          mejl:'' },
  { id:77, skr:'AB', namn:'Arbetsmatchen Sverige AB',               ansvarig:'Alawi',  bransch:'Bemanning',     sprak:'Svenska',  freq:'Kvartal', bank:'Swed',          mejl:'' },
  { id:78, skr:'AB', namn:'Mälardalens lagerinredningar AB',        ansvarig:'Alawi',  bransch:'Lager',         sprak:'Svenska',  freq:'Månad',   bank:'Swed',          mejl:'' },
  { id:79, skr:'EF', namn:'Abdulhakim Zamel, Rashed',               ansvarig:'Mew',    bransch:'Bilmekaniker',  sprak:'Arabiska', freq:'Månad',   bank:'Swed',          mejl:'' },
  { id:80, skr:'AB', namn:'Sk Gruppen AB',                          ansvarig:'Alawi',  bransch:'Bygg',          sprak:'Svenska',  freq:'Kvartal', bank:'Swed',          mejl:'' },
  { id:81, skr:'AB', namn:'Cut N Shave AB',                         ansvarig:'Mew',    bransch:'Frisör',        sprak:'Arabiska', freq:'Månad',   bank:'Swed',          mejl:'' },
  { id:82, skr:'EF', namn:'MS Phone, Al rubaie',                    ansvarig:'Mew',    bransch:'Telefonbutik',  sprak:'Arabiska', freq:'Månad',   bank:'Mejl',          mejl:'' },
  { id:83, skr:'AB', namn:'Ketryon AB',                             ansvarig:'Alawi',  bransch:'IT',            sprak:'Svenska',  freq:'Månad',   bank:'SEB',           mejl:'' },
  { id:84, skr:'EF', namn:'Fadi Harbi (Djurgårdsgrillen)',          ansvarig:'Alawi',  bransch:'Restaurang',    sprak:'Arabiska', freq:'Månad',   bank:'Swed',          mejl:'' },
  { id:85, skr:'EF', namn:'Abdulla Al-ghazi',                       ansvarig:'Mew',    bransch:'Bilfirma',      sprak:'Svenska',  freq:'Månad',   bank:'Swed',          mejl:'' },
  { id:86, skr:'EF', namn:'M Skrädderi (Abdalmajed Fares)',         ansvarig:'Alawi',  bransch:'Skrädderi',     sprak:'Arabiska', freq:'Kvartal', bank:'Swed',          mejl:'' },
  { id:87, skr:'AB', namn:'Sami Mohammed',                          ansvarig:'Alawi',  bransch:'Livsmedel',     sprak:'Arabiska', freq:'Kvartal', bank:'Swed',          mejl:'' },
  { id:88, skr:'EF', namn:'Kristian Drumaz',                        ansvarig:'Mew',    bransch:'Bygg',          sprak:'Svenska',  freq:'Månad',   bank:'Swedbank',       mejl:'' },
  { id:89, skr:'AB', namn:'Zakarya Taxi AB',                        ansvarig:'Alawi',  bransch:'Taxi',          sprak:'Arabiska', freq:'Månad',   bank:'Swed',          mejl:'' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function sortMonths(ms: string[]): string[] {
  return [...ms].sort((a, b) => {
    const [aM, aY] = a.split(' ')
    const [bM, bY] = b.split(' ')
    const yearDiff = parseInt(aY ?? '0') - parseInt(bY ?? '0')
    if (yearDiff !== 0) return yearDiff
    return SWEDISH_MONTHS.indexOf(aM ?? '') - SWEDISH_MONTHS.indexOf(bM ?? '')
  })
}

function isInactive(row: ClientRow): boolean {
  return [row.bransch, row.bank, row.freq].some(f => f?.toLowerCase().includes('inaktiv'))
}

function isComplete(row: ClientRow): boolean {
  return CHECKBOX_COLS.every(col => row[col] === true)
}

function formatTimestamp(updated_at: string | null, updated_by: string): string {
  if (!updated_at || !updated_by) return ''
  const d = new Date(updated_at)
  return `${updated_by} · ${d.toLocaleDateString('sv-SE', { month:'short', day:'numeric' })} ${d.toLocaleTimeString('sv-SE', { hour:'2-digit', minute:'2-digit' })}`
}

function makeEmptyRow(client: SeedClient, month: string): Omit<ClientRow, 'id'> {
  return {
    client_id: client.id, skr: client.skr, namn: client.namn, ansvarig: client.ansvarig,
    bransch: client.bransch, sprak: client.sprak, freq: client.freq, bank: client.bank, mejl: client.mejl,
    month,
    kontoutdrag: false, skattekonto: false, underlag: false, bokforing: false, fatt_saknade: false,
    konto1630: false, avstamning: false, agi: false, moms: false, utsk_faktura: false,
    kommentar: '', updated_by: '', updated_at: null, backlog_from: null,
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ label, value, colorClass = 'text-white' }: { label: string; value: string | number; colorClass?: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <div className="text-purple-300/60 text-xs mb-1">{label}</div>
      <div className={`text-2xl font-bold ${colorClass}`}>{value}</div>
    </div>
  )
}

function Modal({ title, children, onClose, maxW = 'max-w-md' }: { title: string; children: React.ReactNode; onClose: () => void; maxW?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className={`bg-[#1a0a2e] border border-white/10 rounded-2xl p-6 w-full ${maxW} shadow-2xl`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold">{title}</h2>
          <button onClick={onClose} className="text-purple-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

function FieldInput({ label, value, onChange, type = 'text', placeholder }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string
}) {
  return (
    <div>
      <label className="text-xs text-purple-300/70 mb-1 block">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-400/50 placeholder:text-purple-400/40" />
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PersonalDashboard() {
  const [currentUser, setCurrentUser] = useState<UserName>('Alawi')
  const [months, setMonths] = useState<string[]>(DEFAULT_MONTHS)
  const [selectedMonth, setSelectedMonth] = useState('April 2026')
  const [data, setData] = useState<ClientRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [closedMonths, setClosedMonths] = useState<Set<string>>(new Set())
  const [monthToClose, setMonthToClose] = useState<string | null>(null)
  const [closingInProgress, setClosingInProgress] = useState(false)

  const [search, setSearch] = useState('')
  const [filterAnsvarig, setFilterAnsvarig] = useState('Alla')
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('alla')
  const [filterFreq, setFilterFreq] = useState('Alla')

  const [showAddModal, setShowAddModal] = useState(false)
  const [showExportMenu, setShowExportMenu] = useState(false)
  const [showJsonImportModal, setShowJsonImportModal] = useState(false)
  const [showExcelImportModal, setShowExcelImportModal] = useState(false)
  const [showNewMonth, setShowNewMonth] = useState(false)
  const [jsonImportPreview, setJsonImportPreview] = useState<ClientRow[]>([])
  const [excelImportRows, setExcelImportRows] = useState<ExcelPreviewRow[]>([])
  const [newMonthInput, setNewMonthInput] = useState('')
  const [newClientForm, setNewClientForm] = useState<Omit<SeedClient, 'id'>>({
    skr: 'AB', namn: '', ansvarig: '', bransch: '', sprak: '', freq: 'Månad', bank: '', mejl: '',
  })

  const jsonFileRef  = useRef<HTMLInputElement>(null)
  const excelFileRef = useRef<HTMLInputElement>(null)

  // ── Init
  useEffect(() => {
    const savedUser = localStorage.getItem('bjornsta_user') as UserName | null
    if (savedUser && USERS.includes(savedUser)) setCurrentUser(savedUser)

    const savedMonths = localStorage.getItem('bjornsta_months')
    if (savedMonths) {
      try {
        const parsed = JSON.parse(savedMonths) as string[]
        if (Array.isArray(parsed) && parsed.length > 0) {
          const sorted = sortMonths(parsed)
          setMonths(sorted)
          setSelectedMonth(sorted[sorted.length - 1])
        }
      } catch { /* ignore */ }
    }

    const savedClosed = localStorage.getItem('bjornsta_closed_months')
    if (savedClosed) {
      try { setClosedMonths(new Set(JSON.parse(savedClosed) as string[])) } catch { /* ignore */ }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('bjornsta_months', JSON.stringify(months))
  }, [months])

  useEffect(() => {
    localStorage.setItem('bjornsta_closed_months', JSON.stringify([...closedMonths]))
  }, [closedMonths])

  // ── Load data
  const loadData = useCallback(async (month: string) => {
    setLoading(true)
    setError(null)
    try {
      const { data: rows, error: fetchErr } = await supabase
        .from('client_status').select('*').eq('month', month).order('client_id')
      if (fetchErr) throw fetchErr

      if (rows && rows.length > 0) {
        setData(rows as ClientRow[])
      } else if (month !== BACKLOG_MONTH) {
        const seedRows = SEED_CLIENTS.map(c => makeEmptyRow(c, month))
        const { data: inserted, error: insertErr } = await supabase
          .from('client_status').insert(seedRows).select()
        if (insertErr) throw insertErr
        setData((inserted ?? []) as ClientRow[])
      } else {
        setData([])
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadData(selectedMonth) }, [selectedMonth, loadData])

  const selectUser = (u: UserName) => {
    setCurrentUser(u); localStorage.setItem('bjornsta_user', u)
  }

  // ── Checkbox toggle (optimistic)
  const toggleCheckbox = async (rowId: number, col: CheckboxCol, currentVal: boolean) => {
    const now = new Date().toISOString()
    const newVal = !currentVal
    setData(prev => prev.map(r => r.id === rowId ? { ...r, [col]: newVal, updated_by: currentUser, updated_at: now } : r))
    const { error: updateErr } = await supabase.from('client_status')
      .update({ [col]: newVal, updated_by: currentUser, updated_at: now }).eq('id', rowId)
    if (updateErr) setData(prev => prev.map(r => r.id === rowId ? { ...r, [col]: currentVal } : r))
  }

  // ── Update text field
  const updateField = async (rowId: number, field: string, value: string) => {
    const now = new Date().toISOString()
    setData(prev => prev.map(r => r.id === rowId ? { ...r, [field]: value, updated_by: currentUser, updated_at: now } : r))
    await supabase.from('client_status')
      .update({ [field]: value, updated_by: currentUser, updated_at: now }).eq('id', rowId)
  }

  // ── Export JSON
  const exportData = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `klientstatus-${selectedMonth.replace(' ', '-')}.json`; a.click()
    URL.revokeObjectURL(url)
  }

  // ── Export Excel
  const exportExcel = () => {
    const headers = ['client_id','namn','skr','ansvarig','bransch','sprak','freq','bank','mejl',
      'kontoutdrag','skattekonto','underlag','bokforing','fatt_saknade','konto1630','avstamning','agi','moms','utsk_faktura','kommentar','updated_by','updated_at']
    const rows = data.map(r => [
      r.client_id, r.namn, r.skr, r.ansvarig, r.bransch, r.sprak, r.freq, r.bank, r.mejl,
      r.kontoutdrag, r.skattekonto, r.underlag, r.bokforing, r.fatt_saknade, r.konto1630, r.avstamning, r.agi, r.moms, r.utsk_faktura,
      r.kommentar, r.updated_by, r.updated_at,
    ])
    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows])
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, selectedMonth)
    const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' }) as unknown as Uint8Array & BlobPart
    const blob = new Blob([buf], { type: 'application/octet-stream' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `klientstatus-${selectedMonth.replace(' ', '-')}.xlsx`; a.click()
    URL.revokeObjectURL(url)
  }

  // ── JSON import
  const handleJsonFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      try {
        setJsonImportPreview(JSON.parse(ev.target?.result as string) as ClientRow[])
        setShowJsonImportModal(true)
      } catch { alert('Ogiltig JSON-fil') }
    }
    reader.readAsText(file)
    if (jsonFileRef.current) jsonFileRef.current.value = ''
  }

  const confirmJsonImport = async () => {
    setLoading(true)
    try {
      const { error: upsertErr } = await supabase.from('client_status')
        .upsert(jsonImportPreview.map(r => ({ ...r, month: selectedMonth })))
      if (upsertErr) throw upsertErr
      await loadData(selectedMonth)
      setShowJsonImportModal(false); setJsonImportPreview([])
    } catch (err: unknown) {
      alert('Import misslyckades: ' + (err instanceof Error ? err.message : String(err)))
    } finally { setLoading(false) }
  }

  // ── Excel import
  const handleExcelFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (excelFileRef.current) excelFileRef.current.value = ''
    try {
      const buf = await file.arrayBuffer()
      const wb = XLSX.read(buf, { type: 'array' })
      const ws = wb.Sheets[wb.SheetNames[0]]
      const raw = XLSX.utils.sheet_to_json<Record<string, unknown>>(ws)
      const rows: ExcelPreviewRow[] = raw.map(r => {
        const rawId = r['client_id']
        const parsed = rawId !== undefined && rawId !== '' ? parseInt(String(rawId)) : NaN
        const client_id = isNaN(parsed) ? null : parsed
        return {
          client_id,
          namn:      String(r['namn']      ?? ''),
          skr:       String(r['skr']       ?? 'AB'),
          ansvarig:  String(r['ansvarig']  ?? ''),
          bransch:   String(r['bransch']   ?? ''),
          sprak:     String(r['sprak']     ?? ''),
          freq:      String(r['freq']      ?? 'Månad'),
          bank:      String(r['bank']      ?? ''),
          mejl:      String(r['mejl']      ?? ''),
          warning:   client_id === null ? 'Saknar client_id — tilldelas auto-ID' : undefined,
        }
      })
      setExcelImportRows(rows)
      setShowExcelImportModal(true)
    } catch (err: unknown) {
      alert('Kunde inte läsa Excel-filen: ' + (err instanceof Error ? err.message : String(err)))
    }
  }

  const confirmExcelImport = async () => {
    setLoading(true)
    const now = new Date().toISOString()
    const maxExistingId = Math.max(...data.map(r => r.client_id), ...SEED_CLIENTS.map(s => s.id), 0)
    let nextId = maxExistingId + 1
    try {
      const rows = excelImportRows.map(r => ({
        client_id:   r.client_id ?? nextId++,
        skr:         r.skr || 'AB',
        namn:        r.namn,
        ansvarig:    r.ansvarig,
        bransch:     r.bransch,
        sprak:       r.sprak,
        freq:        r.freq,
        bank:        r.bank,
        mejl:        r.mejl,
        month:       selectedMonth,
        kontoutdrag: false, skattekonto: false, underlag: false, bokforing: false, fatt_saknade: false,
        konto1630: false, avstamning: false, agi: false, moms: false, utsk_faktura: false,
        kommentar:   '',
        updated_by:  currentUser,
        updated_at:  now,
        backlog_from: null,
      }))
      const { error: upsertErr } = await supabase.from('client_status')
        .upsert(rows, { onConflict: 'client_id,month' })
      if (upsertErr) throw upsertErr
      await loadData(selectedMonth)
      setShowExcelImportModal(false); setExcelImportRows([])
    } catch (err: unknown) {
      alert('Import misslyckades: ' + (err instanceof Error ? err.message : String(err)))
    } finally { setLoading(false) }
  }

  // ── Download Excel template
  const downloadTemplate = () => {
    try {
      const headers = ['client_id','namn','skr','ansvarig','bransch','sprak','freq','bank','mejl']
      const sample  = [90, 'Exempelföretag AB', 'AB', 'Alawi', 'Bransch', 'Svenska', 'Månad', 'SEB', '']
      const ws = XLSX.utils.aoa_to_sheet([headers, sample])
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Klienter')
      const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' }) as unknown as Uint8Array & BlobPart
      const blob = new Blob([buf], { type: 'application/octet-stream' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = 'klient-mall.xlsx'; a.click()
      URL.revokeObjectURL(url)
    } catch (err: unknown) {
      alert('Kunde inte skapa mall: ' + (err instanceof Error ? err.message : String(err)))
    }
  }

  // ── New month
  const createNewMonth = async () => {
    const month = newMonthInput.trim()
    if (!month) return
    if (months.includes(month)) {
      setSelectedMonth(month); setShowNewMonth(false); setNewMonthInput(''); return
    }
    const newRows = data.map(r => ({
      client_id: r.client_id, skr: r.skr, namn: r.namn, ansvarig: r.ansvarig,
      bransch: r.bransch, sprak: r.sprak, freq: r.freq, bank: r.bank, mejl: r.mejl,
      month,
      kontoutdrag: false, skattekonto: false, underlag: false, bokforing: false, fatt_saknade: false,
      konto1630: false, avstamning: false, agi: false, moms: false, utsk_faktura: false,
      kommentar: '', updated_by: '', updated_at: null, backlog_from: null,
    }))
    const { error: insertErr } = await supabase.from('client_status').insert(newRows)
    if (insertErr) { alert('Fel: ' + insertErr.message); return }
    const sorted = sortMonths([...months, month])
    setMonths(sorted); setSelectedMonth(month); setShowNewMonth(false); setNewMonthInput('')
  }

  // ── Add client (Fix 1: explicit column names, no spread)
  const addClient = async () => {
    if (!newClientForm.namn.trim()) return
    const maxId = Math.max(...data.map(r => r.client_id), ...SEED_CLIENTS.map(s => s.id), 0) + 1
    const now = new Date().toISOString()
    const row = {
      client_id:    maxId,
      skr:          newClientForm.skr,
      namn:         newClientForm.namn,
      ansvarig:     newClientForm.ansvarig,
      bransch:      newClientForm.bransch,
      sprak:        newClientForm.sprak,
      freq:         newClientForm.freq,
      bank:         newClientForm.bank,
      mejl:         newClientForm.mejl,
      month:        selectedMonth,
      kontoutdrag:  false,
      skattekonto:  false,
      underlag:     false,
      bokforing:    false,
      fatt_saknade: false,
      konto1630:    false,
      avstamning:   false,
      agi:          false,
      moms:         false,
      utsk_faktura: false,
      kommentar:    '',
      updated_by:   currentUser,
      updated_at:   now,
      backlog_from: null,
    }
    const { data: inserted, error: insertErr } = await supabase.from('client_status').insert([row]).select()
    if (insertErr) { alert('Fel: ' + insertErr.message); return }
    setData(prev => [...prev, ...(inserted ?? []) as ClientRow[]])
    setShowAddModal(false)
    setNewClientForm({ skr: 'AB', namn: '', ansvarig: '', bransch: '', sprak: '', freq: 'Månad', bank: '', mejl: '' })
  }

  // ── Close month (Fix 2)
  const closeMonth = async (month: string) => {
    setClosingInProgress(true)
    try {
      const now = new Date().toISOString()
      // Fetch that month's rows fresh
      const { data: monthRows, error: fetchErr } = await supabase
        .from('client_status').select('*').eq('month', month)
      if (fetchErr) throw fetchErr

      const incomplete = (monthRows ?? []).filter(r => !isComplete(r as ClientRow))

      if (incomplete.length > 0) {
        // Upsert incomplete rows into Backlog, preserving checkbox state
        const backlogRows = incomplete.map(r => ({
          client_id:    r.client_id,
          skr:          r.skr,
          namn:         r.namn,
          ansvarig:     r.ansvarig,
          bransch:      r.bransch,
          sprak:        r.sprak,
          freq:         r.freq,
          bank:         r.bank,
          mejl:         r.mejl,
          month:        BACKLOG_MONTH,
          kontoutdrag:  r.kontoutdrag,
          skattekonto:  r.skattekonto,
          underlag:     r.underlag,
          bokforing:    r.bokforing,
          fatt_saknade: r.fatt_saknade,
          konto1630:    r.konto1630,
          avstamning:   r.avstamning,
          agi:          r.agi,
          moms:         r.moms,
          utsk_faktura: r.utsk_faktura,
          kommentar:    r.kommentar,
          updated_by:   currentUser,
          updated_at:   now,
          backlog_from: month,
        }))

        const { error: upsertErr } = await supabase.from('client_status')
          .upsert(backlogRows, { onConflict: 'client_id,month' })
        if (upsertErr) throw upsertErr
      }

      // Mark closed
      setClosedMonths(prev => new Set([...prev, month]))
      setMonthToClose(null)

      // If currently viewing Backlog, reload it
      if (selectedMonth === BACKLOG_MONTH) await loadData(BACKLOG_MONTH)
    } catch (err: unknown) {
      alert('Fel vid stängning: ' + (err instanceof Error ? err.message : String(err)))
    } finally {
      setClosingInProgress(false)
    }
  }

  // ── Computed
  const isReadOnly = closedMonths.has(selectedMonth)
  const isBacklog  = selectedMonth === BACKLOG_MONTH

  const filteredData = data.filter(row => {
    if (search && !row.namn.toLowerCase().includes(search.toLowerCase())) return false
    if (filterAnsvarig !== 'Alla' && row.ansvarig !== filterAnsvarig) return false
    if (filterFreq !== 'Alla' && row.freq !== filterFreq) return false
    if (filterStatus === 'inaktiva') return isInactive(row)
    if (filterStatus === 'klara')    return !isInactive(row) && isComplete(row)
    if (filterStatus === 'ej klara') return !isInactive(row) && !isComplete(row)
    return true
  })

  const activeRows = data.filter(r => !isInactive(r))
  const klaraRows  = activeRows.filter(r => isComplete(r))
  const klaraPct   = activeRows.length > 0 ? Math.round(klaraRows.length / activeRows.length * 100) : 0

  const personStats = USERS.map(u => {
    const uRows  = activeRows.filter(r => r.ansvarig === u)
    const uKlara = uRows.filter(r => isComplete(r))
    const pct    = uRows.length > 0 ? Math.round(uKlara.length / uRows.length * 100) : 0
    return { name: u, total: uRows.length, klara: uKlara.length, pct }
  })

  // Tabs: regular months + Backlog always at end
  const allTabs = [...months, BACKLOG_MONTH]

  // ── Render
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-violet-900">

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-purple-950/90 backdrop-blur-sm">
        <div className="max-w-[1700px] mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/30 border border-purple-400/30 flex items-center justify-center">
              <svg className="w-4 h-4 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
              </svg>
            </div>
            <span className="text-white font-semibold text-sm">Björnsta · Klientstatus</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-purple-300/50 text-xs hidden sm:block">Inloggad som:</span>
            <div className="flex gap-1">
              {USERS.map(u => (
                <button key={u} onClick={() => selectUser(u)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${currentUser === u ? 'bg-purple-500/50 text-white border border-purple-400/40' : 'bg-white/5 text-purple-300 hover:bg-white/10 border border-transparent'}`}>
                  {u}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ── Month Tabs ── */}
      <div className="border-b border-white/10 bg-white/[0.02]">
        <div className="max-w-[1700px] mx-auto px-4">
          <div className="flex items-center gap-1 py-2 overflow-x-auto">
            {allTabs.map(m => {
              const isSelected = selectedMonth === m
              const isClosed   = closedMonths.has(m)
              const isBacklogTab = m === BACKLOG_MONTH
              return (
                <div key={m} className="flex-shrink-0 flex items-center gap-0.5">
                  <button
                    onClick={() => setSelectedMonth(m)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? isBacklogTab
                          ? 'bg-amber-500/20 text-amber-200 border border-amber-400/30'
                          : isClosed
                            ? 'bg-white/10 text-white/50 border border-white/10'
                            : 'bg-purple-500/30 text-white border border-purple-400/30'
                        : isBacklogTab
                          ? 'text-amber-300/60 hover:bg-amber-500/10 hover:text-amber-200 border border-transparent'
                          : isClosed
                            ? 'text-white/30 hover:text-white/50 hover:bg-white/5 border border-transparent'
                            : 'text-purple-300/60 hover:text-purple-200 hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    {isBacklogTab && (
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                      </svg>
                    )}
                    {isClosed && !isBacklogTab && (
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                    )}
                    {m}
                  </button>
                  {/* Close button — only on open regular months */}
                  {!isBacklogTab && !isClosed && (
                    <button
                      onClick={e => { e.stopPropagation(); setMonthToClose(m) }}
                      title={`Stäng ${m}`}
                      className="w-5 h-5 rounded flex items-center justify-center text-purple-400/40 hover:text-red-400 hover:bg-red-500/10 transition-all"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              )
            })}
            {/* Add new month */}
            <button onClick={() => setShowNewMonth(true)} title="Ny månad"
              className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-purple-300 flex items-center justify-center ml-1 transition-all border border-transparent hover:border-white/10">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Page Content ── */}
      <div className="max-w-[1700px] mx-auto px-4 py-5 space-y-4">

        {/* Read-only / closed banner */}
        {isReadOnly && (
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
            <svg className="w-4 h-4 text-white/40 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            <span className="text-white/40 text-sm">Den här månaden är stängd och visas i skrivskyddat läge.</span>
          </div>
        )}

        {/* Backlog banner */}
        {isBacklog && (
          <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-400/20 rounded-xl px-4 py-2.5">
            <svg className="w-4 h-4 text-amber-300/70 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
            <span className="text-amber-300/70 text-sm">Klienter som inte klarades av vid månadsslut. Kryssa av när de är klara.</span>
          </div>
        )}

        {/* Summary stats — skip for Backlog */}
        {!isBacklog && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatCard label="Aktiva klienter"  value={activeRows.length} />
              <StatCard label="Klara"            value={klaraRows.length}                      colorClass="text-green-400" />
              <StatCard label="Pågår"            value={activeRows.length - klaraRows.length}  colorClass="text-yellow-400" />
              <StatCard label="Klar %"           value={`${klaraPct}%`}                        colorClass="text-purple-300" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {personStats.map(ps => (
                <div key={ps.name} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-purple-200 font-medium text-sm">{ps.name}</span>
                    <span className="text-white font-bold text-lg">{ps.pct}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-400 rounded-full transition-all duration-500" style={{ width: `${ps.pct}%` }} />
                  </div>
                  <div className="text-purple-300/50 text-xs mt-1.5">{ps.klara} / {ps.total} klara</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-purple-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input type="text" placeholder="Sök klient..." value={search} onChange={e => setSearch(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-sm text-white placeholder:text-purple-400/40 focus:outline-none focus:border-purple-400/50 w-44" />
          </div>
          <select value={filterAnsvarig} onChange={e => setFilterAnsvarig(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-purple-200 focus:outline-none focus:border-purple-400/50 cursor-pointer">
            <option value="Alla" className="bg-purple-950">Alla ansvariga</option>
            {USERS.map(u => <option key={u} value={u} className="bg-purple-950">{u}</option>)}
          </select>
          <div className="flex gap-1">
            {(['alla','ej klara','klara','inaktiva'] as FilterStatus[]).map(s => (
              <button key={s} onClick={() => setFilterStatus(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${filterStatus === s ? 'bg-purple-500/30 text-white border-purple-400/30' : 'bg-white/5 text-purple-300/60 hover:bg-white/10 border-transparent'}`}>
                {s === 'alla' ? 'Alla' : s === 'ej klara' ? 'Ej klara' : s === 'klara' ? 'Klara' : 'Inaktiva'}
              </button>
            ))}
          </div>
          <select value={filterFreq} onChange={e => setFilterFreq(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-purple-200 focus:outline-none focus:border-purple-400/50 cursor-pointer">
            <option value="Alla" className="bg-purple-950">Alla frekvenser</option>
            {['Månad','Kvartal','År'].map(f => <option key={f} value={f} className="bg-purple-950">{f}</option>)}
          </select>
          <div className="flex-1" />

          {!isReadOnly && !isBacklog && (
            <button onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 bg-purple-600/30 hover:bg-purple-600/40 border border-purple-500/30 text-purple-200 px-3 py-1.5 rounded-lg text-sm font-medium transition-all">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Ny klient
            </button>
          )}

          {/* Export dropdown */}
          <div className="relative">
            <button onClick={() => setShowExportMenu(v => !v)}
              className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-purple-300 px-3 py-1.5 rounded-lg text-sm font-medium transition-all">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Exportera
              <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {showExportMenu && (
              <div className="absolute right-0 top-full mt-1 z-50 bg-[#1a1040] border border-white/15 rounded-xl shadow-2xl overflow-hidden min-w-[160px]">
                <button onClick={() => { exportData(); setShowExportMenu(false) }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-purple-200 hover:bg-white/10 transition-colors text-left">
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                  </svg>
                  Exportera JSON
                </button>
                <button onClick={() => { exportExcel(); setShowExportMenu(false) }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-green-300 hover:bg-white/10 transition-colors text-left border-t border-white/10">
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125h-1.5m1.5-1.5v-1.5c0-.621-.504-1.125-1.125-1.125M6 5.625v12.75" />
                  </svg>
                  Exportera Excel
                </button>
              </div>
            )}
          </div>

          {/* JSON import */}
          <input ref={jsonFileRef} type="file" accept=".json" className="hidden" onChange={handleJsonFile} />
          <button onClick={() => jsonFileRef.current?.click()}
            className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-purple-300 px-3 py-1.5 rounded-lg text-sm font-medium transition-all">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            Importera JSON
          </button>

          {/* Excel import + template */}
          <input ref={excelFileRef} type="file" accept=".xlsx" className="hidden" onChange={handleExcelFile} />
          <button onClick={() => excelFileRef.current?.click()}
            className="flex items-center gap-1.5 bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 text-green-300 px-3 py-1.5 rounded-lg text-sm font-medium transition-all">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            Importera Excel
          </button>
          <button onClick={downloadTemplate}
            className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-purple-300/70 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
            title="Ladda ned Excel-mall">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            Mall
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-10 h-10 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
            <p className="text-red-300 font-medium mb-1">Kunde inte hämta data</p>
            <p className="text-red-400/70 text-sm">{error}</p>
            <button onClick={() => loadData(selectedMonth)}
              className="mt-3 px-4 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg text-sm transition-all">
              Försök igen
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-white/10 shadow-xl">
            <table className="w-full text-sm border-collapse min-w-max">
              <thead>
                <tr className="border-b border-white/10 bg-purple-950/80">
                  <th className="sticky left-0 z-20 bg-purple-950 px-3 py-3 text-left text-purple-300/70 font-medium whitespace-nowrap text-xs border-r border-white/5 w-[70px]">Typ</th>
                  <th className="sticky left-[70px] z-20 bg-purple-950 px-3 py-3 text-left text-purple-300/70 font-medium whitespace-nowrap text-xs border-r border-white/10 min-w-[200px]">Klient</th>
                  {CHECKBOX_COLS.map(col => (
                    <th key={col} className={`px-2 py-3 text-center font-medium whitespace-nowrap text-xs ${FORTNOX_COLS.has(col) ? 'text-blue-300/80 bg-blue-500/10' : 'text-purple-300/70'}`}>
                      {COL_LABELS[col]}
                      {FORTNOX_COLS.has(col) && <div className="text-blue-400/40 text-[9px] font-normal leading-tight">Fortnox</div>}
                    </th>
                  ))}
                  {isBacklog && (
                    <th className="px-3 py-3 text-left text-amber-300/70 font-medium whitespace-nowrap text-xs">Från</th>
                  )}
                  <th className="px-3 py-3 text-left text-purple-300/70 font-medium whitespace-nowrap text-xs">Bransch</th>
                  <th className="px-3 py-3 text-left text-purple-300/70 font-medium whitespace-nowrap text-xs">Språk</th>
                  <th className="px-3 py-3 text-left text-purple-300/70 font-medium whitespace-nowrap text-xs">Ansvarig</th>
                  <th className="px-3 py-3 text-left text-purple-300/70 font-medium text-xs min-w-[180px]">Kommentar</th>
                  <th className="px-3 py-3 text-left text-purple-300/70 font-medium whitespace-nowrap text-xs min-w-[160px]">Uppdaterad</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, i) => {
                  const inactive  = isInactive(row)
                  const complete  = !inactive && isComplete(row)
                  const disabled  = inactive || isReadOnly
                  const rowBase   = inactive ? 'opacity-40' : complete ? 'bg-green-500/[0.06]' : i % 2 === 1 ? 'bg-white/[0.02]' : ''
                  return (
                    <tr key={row.id ?? `${row.client_id}-${i}`}
                      className={`border-b border-white/[0.05] transition-colors hover:bg-white/[0.04] ${rowBase}`}>
                      <td className="sticky left-0 z-10 bg-purple-950 px-3 py-2 border-r border-white/5 w-[70px]">
                        <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-bold ${row.skr === 'AB' ? 'bg-purple-500/20 text-purple-300' : row.skr === 'EF' ? 'bg-blue-500/20 text-blue-300' : 'bg-orange-500/20 text-orange-300'}`}>
                          {row.skr}
                        </span>
                      </td>
                      <td className="sticky left-[70px] z-10 bg-purple-950 px-3 py-2 border-r border-white/10 font-medium text-white/90 text-[13px]">
                        <span className="block max-w-[220px] truncate" title={row.namn}>{row.namn}</span>
                      </td>
                      {CHECKBOX_COLS.map(col => (
                        <td key={col} className={`px-2 py-2 text-center ${FORTNOX_COLS.has(col) ? 'bg-blue-500/[0.04]' : ''}`}>
                          <button
                            onClick={() => !disabled && toggleCheckbox(row.id, col, row[col])}
                            disabled={disabled}
                            className={`w-5 h-5 rounded border transition-all flex items-center justify-center mx-auto ${row[col] ? 'bg-green-500/20 border-green-400/40 text-green-400' : 'bg-white/5 border-white/20 text-transparent hover:border-purple-400/50 disabled:cursor-not-allowed'}`}>
                            {row[col] && (
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                            )}
                          </button>
                        </td>
                      ))}
                      {isBacklog && (
                        <td className="px-3 py-2 whitespace-nowrap">
                          {row.backlog_from ? (
                            <span className="text-[11px] bg-amber-500/15 text-amber-300/80 border border-amber-400/20 px-1.5 py-0.5 rounded">
                              {row.backlog_from}
                            </span>
                          ) : null}
                        </td>
                      )}
                      <td className="px-3 py-2 text-purple-200/60 whitespace-nowrap text-xs">{row.bransch}</td>
                      <td className="px-3 py-2 text-purple-200/60 whitespace-nowrap text-xs">{row.sprak}</td>
                      <td className="px-3 py-2">
                        <select value={row.ansvarig} onChange={e => updateField(row.id, 'ansvarig', e.target.value)}
                          disabled={disabled}
                          className="bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-xs text-purple-200 focus:outline-none focus:border-purple-400/50 cursor-pointer disabled:cursor-not-allowed">
                          <option value="" className="bg-purple-950">—</option>
                          {USERS.map(u => <option key={u} value={u} className="bg-purple-950">{u}</option>)}
                        </select>
                      </td>
                      <td className="px-3 py-2">
                        <input type="text" value={row.kommentar}
                          onChange={e => { const v = e.target.value; setData(prev => prev.map(r => r.id === row.id ? { ...r, kommentar: v } : r)) }}
                          onBlur={e => updateField(row.id, 'kommentar', e.target.value)}
                          disabled={disabled} placeholder="Anteckning..."
                          className="w-full bg-transparent border-b border-white/10 focus:border-purple-400/50 outline-none text-xs text-purple-200 placeholder:text-purple-400/25 py-0.5 transition-colors disabled:cursor-not-allowed" />
                      </td>
                      <td className="px-3 py-2 text-purple-300/40 text-[11px] whitespace-nowrap">
                        {formatTimestamp(row.updated_at, row.updated_by)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {filteredData.length === 0 && !loading && (
              <div className="py-16 text-center text-purple-300/40 text-sm">
                {isBacklog ? 'Ingen backlog — allt är klart!' : 'Inga klienter matchar filtret'}
              </div>
            )}
          </div>
        )}

        {!loading && !error && (
          <p className="text-purple-300/30 text-xs text-right">
            {filteredData.length} av {data.length} klienter visas
          </p>
        )}
      </div>

      {/* ── Close Month Confirmation Modal ── */}
      {monthToClose && (
        <Modal title={`Stäng ${monthToClose}?`} onClose={() => setMonthToClose(null)}>
          <div className="space-y-4">
            <p className="text-purple-200/80 text-sm">
              Klienter som inte är klara flyttas automatiskt till Backlog.
            </p>
            <div className="bg-amber-500/10 border border-amber-400/20 rounded-lg px-3 py-2 text-amber-300/70 text-xs">
              Månaden behåller alla sina rader i skrivskyddat läge så du kan fortsätta granska den.
            </div>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setMonthToClose(null)} className="px-4 py-2 text-sm text-purple-300 hover:text-white transition-colors">
                Avbryt
              </button>
              <button onClick={() => closeMonth(monthToClose)} disabled={closingInProgress}
                className="px-4 py-2 text-sm bg-red-600/30 hover:bg-red-600/50 border border-red-500/30 text-red-200 rounded-lg transition-all disabled:opacity-40 flex items-center gap-1.5">
                {closingInProgress && <div className="w-3.5 h-3.5 border border-red-300 border-t-transparent rounded-full animate-spin" />}
                Stäng månad
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ── New Month Modal ── */}
      {showNewMonth && (
        <Modal title="Lägg till månad" onClose={() => { setShowNewMonth(false); setNewMonthInput('') }}>
          <div className="space-y-3">
            <input type="text" placeholder="t.ex. Maj 2026" value={newMonthInput}
              onChange={e => setNewMonthInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && createNewMonth()}
              autoFocus
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-purple-400/40 focus:outline-none focus:border-purple-400/50 text-sm" />
            <p className="text-purple-300/40 text-xs">Alla nuvarande klienter ({data.length} st) kopieras med tomma checkboxar.</p>
            <div className="flex gap-2 justify-end pt-1">
              <button onClick={() => { setShowNewMonth(false); setNewMonthInput('') }} className="px-4 py-2 text-sm text-purple-300 hover:text-white transition-colors">Avbryt</button>
              <button onClick={createNewMonth} disabled={!newMonthInput.trim()}
                className="px-4 py-2 text-sm bg-purple-600/40 hover:bg-purple-600/60 border border-purple-500/30 text-white rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed">Skapa</button>
            </div>
          </div>
        </Modal>
      )}

      {/* ── JSON Import Preview Modal ── */}
      {showJsonImportModal && (
        <Modal title={`Importera JSON — ${jsonImportPreview.length} rader`} onClose={() => setShowJsonImportModal(false)}>
          <div className="space-y-3">
            <div className="max-h-52 overflow-y-auto rounded-lg bg-white/5 border border-white/10 p-3 space-y-0.5">
              {jsonImportPreview.slice(0, 15).map((r, i) => (
                <div key={i} className="text-xs text-purple-200/70 py-0.5 border-b border-white/5 last:border-0 truncate">{r.namn || '(namnlös)'}</div>
              ))}
              {jsonImportPreview.length > 15 && <div className="text-xs text-purple-300/40 pt-1">...och {jsonImportPreview.length - 15} till</div>}
            </div>
            <p className="text-purple-300/50 text-xs">Data importeras för månad: <strong className="text-purple-200">{selectedMonth}</strong></p>
            <div className="flex gap-2 justify-end pt-1">
              <button onClick={() => setShowJsonImportModal(false)} className="px-4 py-2 text-sm text-purple-300 hover:text-white transition-colors">Avbryt</button>
              <button onClick={confirmJsonImport} className="px-4 py-2 text-sm bg-purple-600/40 hover:bg-purple-600/60 border border-purple-500/30 text-white rounded-lg transition-all">Bekräfta import</button>
            </div>
          </div>
        </Modal>
      )}

      {/* ── Excel Import Preview Modal ── */}
      {showExcelImportModal && (
        <Modal title={`Importera Excel — ${excelImportRows.length} rader`} onClose={() => setShowExcelImportModal(false)}>
          <div className="space-y-3">
            <div className="max-h-52 overflow-y-auto rounded-lg bg-white/5 border border-white/10 p-3 space-y-0.5">
              {excelImportRows.slice(0, 15).map((r, i) => (
                <div key={i} className="flex items-center gap-2 py-0.5 border-b border-white/5 last:border-0">
                  <span className="text-xs text-purple-200/70 truncate flex-1">{r.namn || '(namnlös)'}</span>
                  {r.warning && (
                    <span className="text-[10px] text-yellow-400/80 bg-yellow-500/10 border border-yellow-400/20 rounded px-1.5 py-0.5 flex-shrink-0">
                      {r.warning}
                    </span>
                  )}
                </div>
              ))}
              {excelImportRows.length > 15 && <div className="text-xs text-purple-300/40 pt-1">...och {excelImportRows.length - 15} till</div>}
            </div>
            {excelImportRows.some(r => r.warning) && (
              <p className="text-yellow-400/70 text-xs">Rader med varning tilldelas auto-ID vid import.</p>
            )}
            <p className="text-purple-300/50 text-xs">Alla checkboxar sätts till false. Månad: <strong className="text-purple-200">{selectedMonth}</strong></p>
            <div className="flex gap-2 justify-end pt-1">
              <button onClick={() => setShowExcelImportModal(false)} className="px-4 py-2 text-sm text-purple-300 hover:text-white transition-colors">Avbryt</button>
              <button onClick={confirmExcelImport} className="px-4 py-2 text-sm bg-green-600/30 hover:bg-green-600/50 border border-green-500/30 text-green-200 rounded-lg transition-all">Bekräfta import</button>
            </div>
          </div>
        </Modal>
      )}

      {/* ── Add Client Modal ── */}
      {showAddModal && (
        <Modal title="Lägg till klient" onClose={() => setShowAddModal(false)}>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-purple-300/70 mb-1 block">Typ</label>
                <select value={newClientForm.skr} onChange={e => setNewClientForm(p => ({ ...p, skr: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-400/50">
                  {['AB','EF','HB'].map(t => <option key={t} value={t} className="bg-purple-950">{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-purple-300/70 mb-1 block">Ansvarig</label>
                <select value={newClientForm.ansvarig} onChange={e => setNewClientForm(p => ({ ...p, ansvarig: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-400/50">
                  <option value="" className="bg-purple-950">—</option>
                  {USERS.map(u => <option key={u} value={u} className="bg-purple-950">{u}</option>)}
                </select>
              </div>
            </div>
            <FieldInput label="Klientnamn *" value={newClientForm.namn} onChange={v => setNewClientForm(p => ({ ...p, namn: v }))} placeholder="Företagsnamn" />
            <div className="grid grid-cols-2 gap-3">
              <FieldInput label="Bransch" value={newClientForm.bransch} onChange={v => setNewClientForm(p => ({ ...p, bransch: v }))} />
              <FieldInput label="Språk"   value={newClientForm.sprak}   onChange={v => setNewClientForm(p => ({ ...p, sprak: v }))} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-purple-300/70 mb-1 block">Frekvens</label>
                <select value={newClientForm.freq} onChange={e => setNewClientForm(p => ({ ...p, freq: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-400/50">
                  {['Månad','Kvartal','År'].map(f => <option key={f} value={f} className="bg-purple-950">{f}</option>)}
                </select>
              </div>
              <FieldInput label="Bank" value={newClientForm.bank} onChange={v => setNewClientForm(p => ({ ...p, bank: v }))} />
            </div>
            <FieldInput label="E-post" value={newClientForm.mejl} onChange={v => setNewClientForm(p => ({ ...p, mejl: v }))} type="email" />
            <div className="flex gap-2 justify-end pt-1">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 text-sm text-purple-300 hover:text-white transition-colors">Avbryt</button>
              <button onClick={addClient} disabled={!newClientForm.namn.trim()}
                className="px-4 py-2 text-sm bg-purple-600/40 hover:bg-purple-600/60 border border-purple-500/30 text-white rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                Lägg till
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
