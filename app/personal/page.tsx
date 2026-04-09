'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { supabase } from '@/lib/supabase'

// ─── Types ────────────────────────────────────────────────────────────────────

type UserName = 'Alawi' | 'Mew' | 'Fakhri'
type FilterStatus = 'alla' | 'ej klara' | 'klara' | 'inaktiva'

interface SeedClient {
  id: number
  skr: string
  namn: string
  ansvarig: string
  bransch: string
  sprak: string
  freq: string
  bank: string
  mejl: string
}

interface ClientRow {
  id: number           // Supabase auto-increment PK
  client_id: number    // original client number from seed data
  skr: string
  namn: string
  ansvarig: string
  bransch: string
  sprak: string
  freq: string
  bank: string
  mejl: string
  month: string
  ku: boolean
  skt: boolean
  ul: boolean
  bf: boolean
  fsu: boolean
  col_1630: boolean
  avs: boolean
  agi: boolean
  mms: boolean
  u_f: boolean
  kommentar: string
  updated_by: string
  updated_at: string | null
}

// ─── Constants ────────────────────────────────────────────────────────────────

const USERS: UserName[] = ['Alawi', 'Mew', 'Fakhri']
const DEFAULT_MONTHS = ['Mars 2026', 'April 2026']
const SWEDISH_MONTHS = ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December']

const CHECKBOX_COLS = ['ku', 'skt', 'ul', 'bf', 'fsu', 'col_1630', 'avs', 'agi', 'mms', 'u_f'] as const
type CheckboxCol = typeof CHECKBOX_COLS[number]

const COL_LABELS: Record<CheckboxCol, string> = {
  ku: 'KU', skt: 'SKT', ul: 'UL', bf: 'BF', fsu: 'FSU',
  col_1630: '1630', avs: 'AVS', agi: 'AGI', mms: 'MMS', u_f: 'U&F',
}

const FORTNOX_COLS = new Set<CheckboxCol>(['ku', 'skt'])

// ─── Seed Data ────────────────────────────────────────────────────────────────

const SEED_CLIENTS: SeedClient[] = [
  { id: 1,  skr: 'AB', namn: 'GP Transport AB',                         ansvarig: 'Alawi',  bransch: 'Taxi',         sprak: 'Svenska',  freq: 'Månad',   bank: 'Bokio',        mejl: 'gptransportab@outlook.com' },
  { id: 2,  skr: 'AB', namn: 'Salong och Solarium Victoria AB',         ansvarig: 'Alawi',  bransch: 'Frisör',       sprak: 'Arabiska', freq: 'Månad',   bank: 'Danske bank',  mejl: 'mazentiger@hotmail.com' },
  { id: 3,  skr: 'AB', namn: 'Memand Automotive AB',                    ansvarig: 'Mew',    bransch: 'Bilfirma',     sprak: 'Svenska',  freq: 'Månad',   bank: 'Danske bank',  mejl: 'haval.yusef@hotmail.com' },
  { id: 4,  skr: 'AB', namn: 'QS Performance AB',                       ansvarig: 'Alawi',  bransch: 'Försäljning',  sprak: 'Svenska',  freq: 'Kvartal', bank: 'Handelsbanken',mejl: '' },
  { id: 5,  skr: 'AB', namn: 'Saunamarsalkka AB',                       ansvarig: 'Alawi',  bransch: 'Butik',        sprak: 'Svenska',  freq: 'År',      bank: 'Handelsbanken',mejl: '' },
  { id: 6,  skr: 'AB', namn: 'Brian & Company AB',                      ansvarig: 'Alawi',  bransch: 'Försäljning',  sprak: 'Svenska',  freq: 'Kvartal', bank: 'Handelsbanken',mejl: '' },
  { id: 7,  skr: 'EF', namn: 'Granebergs grill och café',               ansvarig: 'Mew',    bransch: 'Restaurang',   sprak: 'Arabiska', freq: 'Månad',   bank: 'Handelsbanken',mejl: '' },
  { id: 8,  skr: 'EF', namn: 'Daniel Grzywa',                           ansvarig: 'Mew',    bransch: '',             sprak: 'Svenska',  freq: 'Kvartal', bank: 'Handelsbanken',mejl: '' },
  { id: 9,  skr: 'AB', namn: 'EM Projektpartner AB',                    ansvarig: 'Fakhri', bransch: '',             sprak: '',         freq: 'År',      bank: 'Nordea',       mejl: '' },
  { id: 16, skr: 'EF', namn: 'Gunay Yildiran - Eskilstuna Decor',       ansvarig: 'Mew',    bransch: 'Decor',        sprak: 'Arabiska', freq: 'Kvartal', bank: 'ingen',        mejl: '' },
  { id: 18, skr: 'EF', namn: 'Jessica Kelmendi',                        ansvarig: 'Alawi',  bransch: 'Frisör',       sprak: 'Svenska',  freq: 'Kvartal', bank: 'Ingen',        mejl: '' },
  { id: 19, skr: 'AB', namn: 'Löten 9 Fastigheter AB',                  ansvarig: '',       bransch: 'Fastigheter',  sprak: 'Arabiska', freq: 'Kvartal', bank: 'ingen',        mejl: '' },
  { id: 20, skr: 'AB', namn: 'New Pulse AB',                            ansvarig: 'Mew',    bransch: 'E-handel',     sprak: 'Svenska',  freq: 'Månad',   bank: 'Lunar',        mejl: '' },
  { id: 22, skr: 'AB', namn: 'AR TRANSPORT & ENTREPRENAD AB',           ansvarig: 'Mew',    bransch: 'Transport',    sprak: 'Svenska',  freq: 'Kvartal', bank: 'Lunar',        mejl: '' },
  { id: 23, skr: 'EF', namn: 'Maha Alfeel / Klipp & Stil',              ansvarig: 'Mew',    bransch: 'Frisör',       sprak: 'Arabiska', freq: 'Månad',   bank: 'Lunar',        mejl: '' },
  { id: 24, skr: 'AB', namn: 'Cest La Vie AB',                          ansvarig: 'Alawi',  bransch: 'Mode',         sprak: 'Svenska',  freq: 'Månad',   bank: 'Lunar',        mejl: '' },
  { id: 25, skr: 'EF', namn: 'Aylas Bilar (EF Diana Ahmed)',            ansvarig: 'Alawi',  bransch: 'Bilfirma',     sprak: 'Svenska',  freq: 'Månad',   bank: 'Marginalen',   mejl: '' },
  { id: 26, skr: 'HB', namn: 'Twinky Grill & Restaurang',               ansvarig: 'Alawi',  bransch: 'Restaurang',   sprak: 'Arabiska', freq: 'Månad',   bank: 'Marginalen',   mejl: '' },
  { id: 27, skr: 'AB', namn: 'Bäckby Bageri och Tårtor AB',             ansvarig: 'Alawi',  bransch: 'Bageri',       sprak: 'Arabiska', freq: 'Kvartal', bank: 'Marginalen',   mejl: '' },
  { id: 28, skr: 'AB', namn: 'SKKK Trade AB',                           ansvarig: 'Alawi',  bransch: 'Aktiehandel',  sprak: 'Engelska', freq: 'År',      bank: 'Marginalen',   mejl: '' },
  { id: 29, skr: 'EF', namn: 'Homandski',                               ansvarig: 'Alawi',  bransch: 'Tatuerare',    sprak: 'Engelska', freq: 'År',      bank: 'Mejl',         mejl: '' },
  { id: 30, skr: 'EF', namn: 'FK Barbershop - Fuad Karavaliyev',        ansvarig: 'Alawi',  bransch: 'Frisör',       sprak: 'Svenska',  freq: 'Kvartal', bank: 'Nordea',       mejl: '' },
  { id: 31, skr: 'AB', namn: 'EMA Bygg Entreprenad',                    ansvarig: 'Mew',    bransch: 'Bygg',         sprak: '',         freq: 'År',      bank: 'Nordea',       mejl: '' },
  { id: 32, skr: 'AB', namn: 'Malma Mek AB',                            ansvarig: 'Mew',    bransch: 'Bilservice',   sprak: 'Svenska',  freq: 'Kvartal', bank: 'Nordea',       mejl: '' },
  { id: 34, skr: 'AB', namn: 'Red team transport & logistics AB',       ansvarig: '',       bransch: 'Transport',    sprak: 'Svenska',  freq: 'Kvartal', bank: 'Nordea',       mejl: '' },
  { id: 35, skr: 'AB', namn: 'Arbers Barbershop',                       ansvarig: 'Mew',    bransch: 'Frisör',       sprak: 'Engelska', freq: 'Kvartal', bank: 'Nordea',       mejl: '' },
  { id: 36, skr: 'EF', namn: 'Michele Gregoi (på god tass)',            ansvarig: 'Alawi',  bransch: 'Hunddagis',    sprak: 'Svenska',  freq: 'År',      bank: 'Nordea',       mejl: '' },
  { id: 37, skr: 'EF', namn: 'Pimrede Massage',                         ansvarig: 'Mew',    bransch: 'Massage',      sprak: 'Svenska',  freq: 'Månad',   bank: 'Nordea',       mejl: '' },
  { id: 38, skr: 'EF', namn: 'Anhur Hikmat Muttashar',                  ansvarig: 'Mew',    bransch: 'Bemanning',    sprak: 'Svenska',  freq: 'Månad',   bank: 'Nordea',       mejl: '' },
  { id: 39, skr: 'AB', namn: 'Flen Pizzeria AB',                        ansvarig: 'Alawi',  bransch: 'Pizzeria',     sprak: 'Arabiska', freq: 'Månad',   bank: 'Nordea',       mejl: '' },
  { id: 40, skr: 'EF', namn: 'Håkan Andersson',                         ansvarig: 'Mew',    bransch: 'PT',           sprak: 'Svenska',  freq: 'Månad',   bank: 'Nordea',       mejl: '' },
  { id: 41, skr: 'AB', namn: 'Trygg skuldsanering Stockholm AB',        ansvarig: 'Alawi',  bransch: 'Skuldsanering',sprak: 'Svenska',  freq: 'Månad',   bank: 'Northmill',    mejl: '' },
  { id: 42, skr: 'AB', namn: 'Nordiska Oljekompaniet AB',               ansvarig: 'Fakhri', bransch: 'Olja',         sprak: 'Svenska',  freq: 'Månad',   bank: 'Northmill',    mejl: '' },
  { id: 43, skr: 'AB', namn: 'JIW AB',                                  ansvarig: 'Mew',    bransch: 'AirBnb/Rest',  sprak: 'Svenska',  freq: 'Månad',   bank: 'SEB',          mejl: '' },
  { id: 44, skr: 'AB', namn: 'Roy Taxi AB',                             ansvarig: 'Alawi',  bransch: 'Taxi',         sprak: '',         freq: 'Månad',   bank: 'SEB',          mejl: '' },
  { id: 45, skr: 'EF', namn: 'SH kläder (Ta7siiiiin el ras)',           ansvarig: 'Alawi',  bransch: 'Kläder',       sprak: 'Arabiska', freq: 'Månad',   bank: 'SEB',          mejl: '' },
  { id: 47, skr: 'AB', namn: 'Sirula AB',                               ansvarig: 'Alawi',  bransch: 'IT',           sprak: 'Svenska',  freq: 'År',      bank: 'SEB',          mejl: '' },
  { id: 48, skr: 'AB', namn: 'Megaloop AB',                             ansvarig: 'Mew',    bransch: 'Fordons lack', sprak: 'Arabiska', freq: 'Månad',   bank: 'SEB',          mejl: '' },
  { id: 49, skr: 'AB', namn: 'New Look Salong i Eskilstuna AB',         ansvarig: 'Mew',    bransch: 'Frisör',       sprak: 'Svenska',  freq: 'Kvartal', bank: 'SEB',          mejl: '' },
  { id: 50, skr: 'AB', namn: 'JustPLMSCANDIC AB',                       ansvarig: 'Mew',    bransch: 'IT',           sprak: 'Engelska', freq: 'År',      bank: 'SEB',          mejl: '' },
  { id: 51, skr: 'AB', namn: 'Anna livs i norrköping AB',               ansvarig: 'Mew',    bransch: 'Livsmedel',    sprak: 'Arabiska', freq: 'År',      bank: 'SEB',          mejl: '' },
  { id: 52, skr: 'EF', namn: 'Zuher Alghader',                          ansvarig: 'Mew',    bransch: 'Bilfirma',     sprak: 'Arabiska', freq: 'Kvartal', bank: 'Svea',         mejl: '' },
  { id: 53, skr: 'EF', namn: 'Din Bil Partner Ahmad Al dulaimi',        ansvarig: 'Mew',    bransch: 'Bilfirma',     sprak: 'Arabiska', freq: 'Månad',   bank: 'Svea',         mejl: '' },
  { id: 54, skr: 'AB', namn: 'L&L Bilskade & Mek AB',                  ansvarig: 'Mew',    bransch: 'Mekaniker',    sprak: 'Arabiska', freq: 'Månad',   bank: 'Svea',         mejl: 'flensbilservice.ab@gmail.com' },
  { id: 55, skr: 'EF', namn: 'Friskare Fötter Nyköping',                ansvarig: 'Mew',    bransch: 'Fotvård',      sprak: 'Svenska',  freq: 'Månad',   bank: 'Svea',         mejl: '' },
  { id: 56, skr: 'AB', namn: 'Wisam Retail AB',                         ansvarig: 'Alawi',  bransch: 'Retail',       sprak: 'Svenska',  freq: 'Månad',   bank: 'Svea',         mejl: '' },
  { id: 57, skr: 'AB', namn: 'Amberline Taxi AB',                       ansvarig: 'Alawi',  bransch: 'Taxi',         sprak: 'Svenska',  freq: 'År',      bank: 'Swed',         mejl: '' },
  { id: 58, skr: 'EF', namn: 'Basel Zanklo',                            ansvarig: 'Mew',    bransch: 'Taxi',         sprak: 'Arabiska', freq: 'Månad',   bank: 'Swed',         mejl: '' },
  { id: 59, skr: 'AB', namn: 'Rabi Bilservice AB',                      ansvarig: 'Alawi',  bransch: 'Bilservice',   sprak: 'Svenska',  freq: 'Månad',   bank: 'Swed',         mejl: '' },
  { id: 61, skr: 'EF', namn: 'MB Lokalatjänster (Mohamed Albakir)',     ansvarig: 'Mew',    bransch: 'Städ',         sprak: 'Svenska',  freq: 'Kvartal', bank: 'Swed',         mejl: '' },
  { id: 62, skr: 'AB', namn: 'MB Lokalatjänster AB',                    ansvarig: 'Mew',    bransch: 'Städ',         sprak: 'Svenska',  freq: 'Kvartal', bank: 'Swed',         mejl: '' },
  { id: 63, skr: 'AB', namn: 'DJ Lulle Music & Entertainment AB',       ansvarig: 'Mew',    bransch: 'DJ',           sprak: 'Svenska',  freq: 'Kvartal', bank: 'Swed',         mejl: '' },
  { id: 64, skr: 'AB', namn: 'Sörmlands Bygg och Ronevering AB',        ansvarig: 'Mew',    bransch: 'Bygg',         sprak: 'Arabiska', freq: 'Månad',   bank: 'Swedbank',      mejl: '' },
  { id: 65, skr: 'AB', namn: 'Strängnäs Bilvård AB',                    ansvarig: 'Mew',    bransch: 'Bilvård',      sprak: 'Svenska',  freq: 'Månad',   bank: 'Danske bank',  mejl: '' },
  { id: 66, skr: 'EF', namn: 'Skampa entreprenad/florian kelmendi',     ansvarig: 'Fakhri', bransch: 'Bygg',         sprak: 'Svenska',  freq: 'Kvartal', bank: 'Swed',         mejl: '' },
  { id: 67, skr: 'AB', namn: 'Phoenix Garden AB',                       ansvarig: 'Alawi',  bransch: 'Florist',      sprak: 'Arabiska', freq: 'Månad',   bank: 'Swed',         mejl: '' },
  { id: 68, skr: 'AB', namn: 'City Bilar I Eskilstuna AB',              ansvarig: 'Mew',    bransch: 'Bilfirma',     sprak: 'Svenska',  freq: 'Månad',   bank: 'Swed',         mejl: '' },
  { id: 69, skr: 'AB', namn: 'C tjänster AB',                           ansvarig: 'Mew',    bransch: 'Tjänster',     sprak: 'Svenska',  freq: 'Kvartal', bank: 'Swed',         mejl: '' },
  { id: 70, skr: 'EF', namn: 'Sara Livs - Haytham Mahmoud',             ansvarig: 'Alawi',  bransch: 'Livsmedel',    sprak: 'Arabiska', freq: 'Månad',   bank: 'Swed',         mejl: '' },
  { id: 71, skr: 'EF', namn: 'Bostanci, Nilüfer - Niffes Klippotek',    ansvarig: 'Alawi',  bransch: 'Frisör',       sprak: 'Svenska',  freq: 'Månad',   bank: 'Swed',         mejl: '' },
  { id: 72, skr: 'AB', namn: 'Aluh AB',                                  ansvarig: 'Mew',    bransch: 'Taxi',         sprak: 'Svenska',  freq: 'Månad',   bank: 'Swed',         mejl: '' },
  { id: 73, skr: 'AB', namn: 'Kd Mark & anläggning AB',                 ansvarig: 'Mew',    bransch: 'Bygg',         sprak: 'Svenska',  freq: 'Månad',   bank: 'Swed',         mejl: 'Info@kdbygg.se' },
  { id: 74, skr: 'AB', namn: 'Mix PLus AB',                             ansvarig: 'Mew',    bransch: 'Bygg/Taxi',    sprak: 'Svenska',  freq: 'Kvartal', bank: 'Swed',         mejl: '' },
  { id: 76, skr: 'AB', namn: 'Eskilstuna Trafikskola AB',               ansvarig: 'Mew',    bransch: 'Trafikskola',  sprak: 'Arabiska', freq: 'Månad',   bank: 'Swed',         mejl: '' },
  { id: 77, skr: 'AB', namn: 'Arbetsmatchen Sverige AB',                ansvarig: 'Alawi',  bransch: 'Bemanning',    sprak: 'Svenska',  freq: 'Kvartal', bank: 'Swed',         mejl: '' },
  { id: 78, skr: 'AB', namn: 'Mälardalens lagerinredningar AB',         ansvarig: 'Alawi',  bransch: 'Lager',        sprak: 'Svenska',  freq: 'Månad',   bank: 'Swed',         mejl: '' },
  { id: 79, skr: 'EF', namn: 'Abdulhakim Zamel, Rashed',                ansvarig: 'Mew',    bransch: 'Bilmekaniker', sprak: 'Arabiska', freq: 'Månad',   bank: 'Swed',         mejl: '' },
  { id: 80, skr: 'AB', namn: 'Sk Gruppen AB',                           ansvarig: 'Alawi',  bransch: 'Bygg',         sprak: 'Svenska',  freq: 'Kvartal', bank: 'Swed',         mejl: '' },
  { id: 81, skr: 'AB', namn: 'Cut N Shave AB',                          ansvarig: 'Mew',    bransch: 'Frisör',       sprak: 'Arabiska', freq: 'Månad',   bank: 'Swed',         mejl: '' },
  { id: 82, skr: 'EF', namn: 'MS Phone, Al rubaie',                     ansvarig: 'Mew',    bransch: 'Telefonbutik', sprak: 'Arabiska', freq: 'Månad',   bank: 'Mejl',         mejl: '' },
  { id: 83, skr: 'AB', namn: 'Ketryon AB',                              ansvarig: 'Alawi',  bransch: 'IT',           sprak: 'Svenska',  freq: 'Månad',   bank: 'SEB',          mejl: '' },
  { id: 84, skr: 'EF', namn: 'Fadi Harbi (Djurgårdsgrillen)',           ansvarig: 'Alawi',  bransch: 'Restaurang',   sprak: 'Arabiska', freq: 'Månad',   bank: 'Swed',         mejl: '' },
  { id: 85, skr: 'EF', namn: 'Abdulla Al-ghazi',                        ansvarig: 'Mew',    bransch: 'Bilfirma',     sprak: 'Svenska',  freq: 'Månad',   bank: 'Swed',         mejl: '' },
  { id: 86, skr: 'EF', namn: 'M Skrädderi (Abdalmajed Fares)',          ansvarig: 'Alawi',  bransch: 'Skrädderi',    sprak: 'Arabiska', freq: 'Kvartal', bank: 'Swed',         mejl: '' },
  { id: 87, skr: 'AB', namn: 'Sami Mohammed',                           ansvarig: 'Alawi',  bransch: 'Livsmedel',    sprak: 'Arabiska', freq: 'Kvartal', bank: 'Swed',         mejl: '' },
  { id: 88, skr: 'EF', namn: 'Kristian Drumaz',                         ansvarig: 'Mew',    bransch: 'Bygg',         sprak: 'Svenska',  freq: 'Månad',   bank: 'Swedbank',      mejl: '' },
  { id: 89, skr: 'AB', namn: 'Zakarya Taxi AB',                         ansvarig: 'Alawi',  bransch: 'Taxi',         sprak: 'Arabiska', freq: 'Månad',   bank: 'Swed',         mejl: '' },
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
  return [row.bransch, row.bank, row.freq].some(f =>
    f?.toLowerCase().includes('inaktiv')
  )
}

function isComplete(row: ClientRow): boolean {
  return CHECKBOX_COLS.every(col => row[col] === true)
}

function formatTimestamp(updated_at: string | null, updated_by: string): string {
  if (!updated_at || !updated_by) return ''
  const d = new Date(updated_at)
  const date = d.toLocaleDateString('sv-SE', { month: 'short', day: 'numeric' })
  const time = d.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })
  return `${updated_by} · ${date} ${time}`
}

function makeEmptyRow(client: SeedClient, month: string): Omit<ClientRow, 'id'> {
  return {
    client_id: client.id,
    skr: client.skr,
    namn: client.namn,
    ansvarig: client.ansvarig,
    bransch: client.bransch,
    sprak: client.sprak,
    freq: client.freq,
    bank: client.bank,
    mejl: client.mejl,
    month,
    ku: false, skt: false, ul: false, bf: false, fsu: false,
    col_1630: false, avs: false, agi: false, mms: false, u_f: false,
    kommentar: '',
    updated_by: '',
    updated_at: null,
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

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1a0a2e] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl">
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
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-400/50 placeholder:text-purple-400/40"
      />
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PersonalDashboard() {
  // ── State
  const [currentUser, setCurrentUser] = useState<UserName>('Alawi')
  const [months, setMonths] = useState<string[]>(DEFAULT_MONTHS)
  const [selectedMonth, setSelectedMonth] = useState('April 2026')
  const [data, setData] = useState<ClientRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [search, setSearch] = useState('')
  const [filterAnsvarig, setFilterAnsvarig] = useState('Alla')
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('alla')
  const [filterFreq, setFilterFreq] = useState('Alla')

  const [showAddModal, setShowAddModal] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
  const [showNewMonth, setShowNewMonth] = useState(false)
  const [importPreview, setImportPreview] = useState<ClientRow[]>([])
  const [newMonthInput, setNewMonthInput] = useState('')
  const [newClientForm, setNewClientForm] = useState<Omit<SeedClient, 'id'>>({
    skr: 'AB', namn: '', ansvarig: '', bransch: '', sprak: '', freq: 'Månad', bank: '', mejl: '',
  })

  const importFileRef = useRef<HTMLInputElement>(null)

  // ── Init: restore user & months from localStorage
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
      } catch {
        // ignore parse errors
      }
    }
  }, [])

  // ── Persist months
  useEffect(() => {
    localStorage.setItem('bjornsta_months', JSON.stringify(months))
  }, [months])

  // ── Load data
  const loadData = useCallback(async (month: string) => {
    setLoading(true)
    setError(null)
    try {
      const { data: rows, error: fetchErr } = await supabase
        .from('client_status')
        .select('*')
        .eq('month', month)
        .order('client_id')

      if (fetchErr) throw fetchErr

      if (rows && rows.length > 0) {
        setData(rows as ClientRow[])
      } else {
        // Seed this month with all clients
        const seedRows = SEED_CLIENTS.map(c => makeEmptyRow(c, month))
        const { data: inserted, error: insertErr } = await supabase
          .from('client_status')
          .insert(seedRows)
          .select()

        if (insertErr) throw insertErr
        setData((inserted ?? []) as ClientRow[])
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData(selectedMonth)
  }, [selectedMonth, loadData])

  // ── User selector
  const selectUser = (u: UserName) => {
    setCurrentUser(u)
    localStorage.setItem('bjornsta_user', u)
  }

  // ── Checkbox toggle (optimistic)
  const toggleCheckbox = async (rowId: number, col: CheckboxCol, currentVal: boolean) => {
    const now = new Date().toISOString()
    const newVal = !currentVal

    setData(prev => prev.map(r =>
      r.id === rowId ? { ...r, [col]: newVal, updated_by: currentUser, updated_at: now } : r
    ))

    const { error: updateErr } = await supabase
      .from('client_status')
      .update({ [col]: newVal, updated_by: currentUser, updated_at: now })
      .eq('id', rowId)

    if (updateErr) {
      // Revert
      setData(prev => prev.map(r =>
        r.id === rowId ? { ...r, [col]: currentVal } : r
      ))
    }
  }

  // ── Update text field (ansvarig, kommentar)
  const updateField = async (rowId: number, field: string, value: string) => {
    const now = new Date().toISOString()
    setData(prev => prev.map(r =>
      r.id === rowId ? { ...r, [field]: value, updated_by: currentUser, updated_at: now } : r
    ))
    await supabase
      .from('client_status')
      .update({ [field]: value, updated_by: currentUser, updated_at: now })
      .eq('id', rowId)
  }

  // ── Export
  const exportData = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `klientstatus-${selectedMonth.replace(' ', '-')}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  // ── Import file parse
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      try {
        const parsed = JSON.parse(ev.target?.result as string) as ClientRow[]
        setImportPreview(parsed)
        setShowImportModal(true)
      } catch {
        alert('Ogiltig JSON-fil')
      }
    }
    reader.readAsText(file)
    if (importFileRef.current) importFileRef.current.value = ''
  }

  // ── Confirm import
  const confirmImport = async () => {
    setLoading(true)
    try {
      const upsertRows = importPreview.map(r => ({ ...r, month: selectedMonth }))
      const { error: upsertErr } = await supabase
        .from('client_status')
        .upsert(upsertRows)
      if (upsertErr) throw upsertErr
      await loadData(selectedMonth)
      setShowImportModal(false)
      setImportPreview([])
    } catch (err: unknown) {
      alert('Import misslyckades: ' + (err instanceof Error ? err.message : String(err)))
    } finally {
      setLoading(false)
    }
  }

  // ── New month
  const createNewMonth = async () => {
    const month = newMonthInput.trim()
    if (!month) return

    if (months.includes(month)) {
      setSelectedMonth(month)
      setShowNewMonth(false)
      setNewMonthInput('')
      return
    }

    const newRows = data.map(r => ({
      client_id: r.client_id,
      skr: r.skr,
      namn: r.namn,
      ansvarig: r.ansvarig,
      bransch: r.bransch,
      sprak: r.sprak,
      freq: r.freq,
      bank: r.bank,
      mejl: r.mejl,
      month,
      ku: false, skt: false, ul: false, bf: false, fsu: false,
      col_1630: false, avs: false, agi: false, mms: false, u_f: false,
      kommentar: '',
      updated_by: '',
      updated_at: null,
    }))

    const { error: insertErr } = await supabase.from('client_status').insert(newRows)
    if (insertErr) { alert('Fel: ' + insertErr.message); return }

    const sorted = sortMonths([...months, month])
    setMonths(sorted)
    setSelectedMonth(month)
    setShowNewMonth(false)
    setNewMonthInput('')
  }

  // ── Add client
  const addClient = async () => {
    if (!newClientForm.namn.trim()) return

    const maxId = Math.max(
      ...data.map(r => r.client_id),
      ...SEED_CLIENTS.map(s => s.id),
      0
    ) + 1

    const row = {
      client_id: maxId,
      ...newClientForm,
      month: selectedMonth,
      ku: false, skt: false, ul: false, bf: false, fsu: false,
      col_1630: false, avs: false, agi: false, mms: false, u_f: false,
      kommentar: '',
      updated_by: currentUser,
      updated_at: new Date().toISOString(),
    }

    const { data: inserted, error: insertErr } = await supabase
      .from('client_status')
      .insert([row])
      .select()

    if (insertErr) { alert('Fel: ' + insertErr.message); return }

    setData(prev => [...prev, ...(inserted ?? []) as ClientRow[]])
    setShowAddModal(false)
    setNewClientForm({ skr: 'AB', namn: '', ansvarig: '', bransch: '', sprak: '', freq: 'Månad', bank: '', mejl: '' })
  }

  // ── Computed
  const filteredData = data.filter(row => {
    if (search && !row.namn.toLowerCase().includes(search.toLowerCase())) return false
    if (filterAnsvarig !== 'Alla' && row.ansvarig !== filterAnsvarig) return false
    if (filterFreq !== 'Alla' && row.freq !== filterFreq) return false
    if (filterStatus === 'inaktiva') return isInactive(row)
    if (filterStatus === 'klara')    return !isInactive(row) && isComplete(row)
    if (filterStatus === 'ej klara') return !isInactive(row) && !isComplete(row)
    return true
  })

  const activeRows  = data.filter(r => !isInactive(r))
  const klaraRows   = activeRows.filter(r => isComplete(r))
  const klaraPct    = activeRows.length > 0 ? Math.round(klaraRows.length / activeRows.length * 100) : 0

  const personStats = USERS.map(u => {
    const uRows  = activeRows.filter(r => r.ansvarig === u)
    const uKlara = uRows.filter(r => isComplete(r))
    const pct    = uRows.length > 0 ? Math.round(uKlara.length / uRows.length * 100) : 0
    return { name: u, total: uRows.length, klara: uKlara.length, pct }
  })

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

          {/* User selector */}
          <div className="flex items-center gap-2">
            <span className="text-purple-300/50 text-xs hidden sm:block">Inloggad som:</span>
            <div className="flex gap-1">
              {USERS.map(u => (
                <button
                  key={u}
                  onClick={() => selectUser(u)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    currentUser === u
                      ? 'bg-purple-500/50 text-white border border-purple-400/40'
                      : 'bg-white/5 text-purple-300 hover:bg-white/10 border border-transparent'
                  }`}
                >
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
            {months.map(m => (
              <button
                key={m}
                onClick={() => setSelectedMonth(m)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedMonth === m
                    ? 'bg-purple-500/30 text-white border border-purple-400/30'
                    : 'text-purple-300/60 hover:text-purple-200 hover:bg-white/5 border border-transparent'
                }`}
              >
                {m}
              </button>
            ))}
            <button
              onClick={() => setShowNewMonth(true)}
              title="Ny månad"
              className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-purple-300 flex items-center justify-center ml-1 transition-all border border-transparent hover:border-white/10"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Page Content ── */}
      <div className="max-w-[1700px] mx-auto px-4 py-5 space-y-4">

        {/* ── Summary stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard label="Aktiva klienter"     value={activeRows.length} />
          <StatCard label="Klara"               value={klaraRows.length}                       colorClass="text-green-400" />
          <StatCard label="Pågår"               value={activeRows.length - klaraRows.length}   colorClass="text-yellow-400" />
          <StatCard label="Klar %"              value={`${klaraPct}%`}                         colorClass="text-purple-300" />
        </div>

        {/* ── Per-person stats ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {personStats.map(ps => (
            <div key={ps.name} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-purple-200 font-medium text-sm">{ps.name}</span>
                <span className="text-white font-bold text-lg">{ps.pct}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-400 rounded-full transition-all duration-500"
                  style={{ width: `${ps.pct}%` }}
                />
              </div>
              <div className="text-purple-300/50 text-xs mt-1.5">{ps.klara} / {ps.total} klara</div>
            </div>
          ))}
        </div>

        {/* ── Filter bar ── */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative">
            <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-purple-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              placeholder="Sök klient..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-sm text-white placeholder:text-purple-400/40 focus:outline-none focus:border-purple-400/50 w-44"
            />
          </div>

          {/* Ansvarig */}
          <select
            value={filterAnsvarig}
            onChange={e => setFilterAnsvarig(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-purple-200 focus:outline-none focus:border-purple-400/50 cursor-pointer"
          >
            <option value="Alla" className="bg-purple-950">Alla ansvariga</option>
            {USERS.map(u => <option key={u} value={u} className="bg-purple-950">{u}</option>)}
          </select>

          {/* Status */}
          <div className="flex gap-1">
            {(['alla', 'ej klara', 'klara', 'inaktiva'] as FilterStatus[]).map(s => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                  filterStatus === s
                    ? 'bg-purple-500/30 text-white border-purple-400/30'
                    : 'bg-white/5 text-purple-300/60 hover:bg-white/10 border-transparent'
                }`}
              >
                {s === 'alla' ? 'Alla' : s === 'ej klara' ? 'Ej klara' : s === 'klara' ? 'Klara' : 'Inaktiva'}
              </button>
            ))}
          </div>

          {/* Freq */}
          <select
            value={filterFreq}
            onChange={e => setFilterFreq(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-purple-200 focus:outline-none focus:border-purple-400/50 cursor-pointer"
          >
            <option value="Alla" className="bg-purple-950">Alla frekvenser</option>
            {['Månad', 'Kvartal', 'År'].map(f => (
              <option key={f} value={f} className="bg-purple-950">{f}</option>
            ))}
          </select>

          <div className="flex-1" />

          {/* Action buttons */}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 bg-purple-600/30 hover:bg-purple-600/40 border border-purple-500/30 text-purple-200 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Ny klient
          </button>

          <button
            onClick={exportData}
            className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-purple-300 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Exportera
          </button>

          <input ref={importFileRef} type="file" accept=".json" className="hidden" onChange={handleImportFile} />
          <button
            onClick={() => importFileRef.current?.click()}
            className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-purple-300 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            Importera
          </button>
        </div>

        {/* ── Table / Loading / Error ── */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-10 h-10 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
            <p className="text-red-300 font-medium mb-1">Kunde inte hämta data</p>
            <p className="text-red-400/70 text-sm">{error}</p>
            <button
              onClick={() => loadData(selectedMonth)}
              className="mt-3 px-4 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg text-sm transition-all"
            >
              Försök igen
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-white/10 shadow-xl">
            <table className="w-full text-sm border-collapse min-w-max">
              <thead>
                <tr className="border-b border-white/10 bg-purple-950/80">
                  {/* Sticky: Typ */}
                  <th className="sticky left-0 z-20 bg-purple-950 px-3 py-3 text-left text-purple-300/70 font-medium whitespace-nowrap text-xs border-r border-white/5 w-[70px]">
                    Typ
                  </th>
                  {/* Sticky: Klient */}
                  <th className="sticky left-[70px] z-20 bg-purple-950 px-3 py-3 text-left text-purple-300/70 font-medium whitespace-nowrap text-xs border-r border-white/10 min-w-[200px]">
                    Klient
                  </th>
                  {/* Checkbox columns */}
                  {CHECKBOX_COLS.map(col => (
                    <th
                      key={col}
                      className={`px-2 py-3 text-center font-medium whitespace-nowrap text-xs ${
                        FORTNOX_COLS.has(col)
                          ? 'text-blue-300/80 bg-blue-500/10'
                          : 'text-purple-300/70'
                      }`}
                    >
                      {COL_LABELS[col]}
                      {FORTNOX_COLS.has(col) && (
                        <div className="text-blue-400/40 text-[9px] font-normal leading-tight">Fortnox</div>
                      )}
                    </th>
                  ))}
                  <th className="px-3 py-3 text-left text-purple-300/70 font-medium whitespace-nowrap text-xs">Bransch</th>
                  <th className="px-3 py-3 text-left text-purple-300/70 font-medium whitespace-nowrap text-xs">Språk</th>
                  <th className="px-3 py-3 text-left text-purple-300/70 font-medium whitespace-nowrap text-xs">Ansvarig</th>
                  <th className="px-3 py-3 text-left text-purple-300/70 font-medium text-xs min-w-[180px]">Kommentar</th>
                  <th className="px-3 py-3 text-left text-purple-300/70 font-medium whitespace-nowrap text-xs min-w-[160px]">Uppdaterad</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, i) => {
                  const inactive = isInactive(row)
                  const complete = !inactive && isComplete(row)
                  const rowBase = inactive
                    ? 'opacity-40'
                    : complete
                      ? 'bg-green-500/[0.06]'
                      : i % 2 === 1
                        ? 'bg-white/[0.02]'
                        : ''

                  return (
                    <tr
                      key={row.id ?? `${row.client_id}-${i}`}
                      className={`border-b border-white/[0.05] transition-colors hover:bg-white/[0.04] ${rowBase}`}
                    >
                      {/* Typ badge — sticky */}
                      <td className="sticky left-0 z-10 bg-purple-950 px-3 py-2 border-r border-white/5 w-[70px]">
                        <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-bold ${
                          row.skr === 'AB' ? 'bg-purple-500/20 text-purple-300' :
                          row.skr === 'EF' ? 'bg-blue-500/20 text-blue-300' :
                                             'bg-orange-500/20 text-orange-300'
                        }`}>
                          {row.skr}
                        </span>
                      </td>

                      {/* Klient namn — sticky */}
                      <td className="sticky left-[70px] z-10 bg-purple-950 px-3 py-2 border-r border-white/10 font-medium text-white/90 text-[13px]">
                        <span className="block max-w-[220px] truncate" title={row.namn}>{row.namn}</span>
                      </td>

                      {/* Checkboxes */}
                      {CHECKBOX_COLS.map(col => (
                        <td key={col} className={`px-2 py-2 text-center ${FORTNOX_COLS.has(col) ? 'bg-blue-500/[0.04]' : ''}`}>
                          <button
                            onClick={() => !inactive && toggleCheckbox(row.id, col, row[col])}
                            disabled={inactive}
                            className={`w-5 h-5 rounded border transition-all flex items-center justify-center mx-auto ${
                              row[col]
                                ? 'bg-green-500/20 border-green-400/40 text-green-400'
                                : 'bg-white/5 border-white/20 text-transparent hover:border-purple-400/50 disabled:cursor-not-allowed'
                            }`}
                          >
                            {row[col] && (
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                            )}
                          </button>
                        </td>
                      ))}

                      {/* Bransch */}
                      <td className="px-3 py-2 text-purple-200/60 whitespace-nowrap text-xs">{row.bransch}</td>

                      {/* Språk */}
                      <td className="px-3 py-2 text-purple-200/60 whitespace-nowrap text-xs">{row.sprak}</td>

                      {/* Ansvarig dropdown */}
                      <td className="px-3 py-2">
                        <select
                          value={row.ansvarig}
                          onChange={e => updateField(row.id, 'ansvarig', e.target.value)}
                          disabled={inactive}
                          className="bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-xs text-purple-200 focus:outline-none focus:border-purple-400/50 cursor-pointer disabled:cursor-not-allowed"
                        >
                          <option value="" className="bg-purple-950">—</option>
                          {USERS.map(u => (
                            <option key={u} value={u} className="bg-purple-950">{u}</option>
                          ))}
                        </select>
                      </td>

                      {/* Kommentar */}
                      <td className="px-3 py-2">
                        <input
                          type="text"
                          value={row.kommentar}
                          onChange={e => {
                            const val = e.target.value
                            setData(prev => prev.map(r =>
                              r.id === row.id ? { ...r, kommentar: val } : r
                            ))
                          }}
                          onBlur={e => updateField(row.id, 'kommentar', e.target.value)}
                          disabled={inactive}
                          placeholder="Anteckning..."
                          className="w-full bg-transparent border-b border-white/10 focus:border-purple-400/50 outline-none text-xs text-purple-200 placeholder:text-purple-400/25 py-0.5 transition-colors disabled:cursor-not-allowed"
                        />
                      </td>

                      {/* Uppdaterad */}
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
                Inga klienter matchar filtret
              </div>
            )}
          </div>
        )}

        {/* Row count */}
        {!loading && !error && (
          <p className="text-purple-300/30 text-xs text-right">
            {filteredData.length} av {data.length} klienter visas
          </p>
        )}
      </div>

      {/* ── New Month Modal ── */}
      {showNewMonth && (
        <Modal title="Lägg till månad" onClose={() => { setShowNewMonth(false); setNewMonthInput('') }}>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="t.ex. Maj 2026"
              value={newMonthInput}
              onChange={e => setNewMonthInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && createNewMonth()}
              autoFocus
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-purple-400/40 focus:outline-none focus:border-purple-400/50 text-sm"
            />
            <p className="text-purple-300/40 text-xs">
              Alla nuvarande klienter ({data.length} st) kopieras med tomma checkboxar.
            </p>
            <div className="flex gap-2 justify-end pt-1">
              <button
                onClick={() => { setShowNewMonth(false); setNewMonthInput('') }}
                className="px-4 py-2 text-sm text-purple-300 hover:text-white transition-colors"
              >
                Avbryt
              </button>
              <button
                onClick={createNewMonth}
                disabled={!newMonthInput.trim()}
                className="px-4 py-2 text-sm bg-purple-600/40 hover:bg-purple-600/60 border border-purple-500/30 text-white rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Skapa
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ── Import Preview Modal ── */}
      {showImportModal && (
        <Modal title={`Importera — ${importPreview.length} rader`} onClose={() => setShowImportModal(false)}>
          <div className="space-y-3">
            <div className="max-h-52 overflow-y-auto rounded-lg bg-white/5 border border-white/10 p-3 space-y-0.5">
              {importPreview.slice(0, 15).map((r, i) => (
                <div key={i} className="text-xs text-purple-200/70 py-0.5 border-b border-white/5 last:border-0 truncate">
                  {r.namn || '(namnlös)'}
                </div>
              ))}
              {importPreview.length > 15 && (
                <div className="text-xs text-purple-300/40 pt-1">...och {importPreview.length - 15} till</div>
              )}
            </div>
            <p className="text-purple-300/50 text-xs">
              Data importeras för månad: <strong className="text-purple-200">{selectedMonth}</strong>
            </p>
            <div className="flex gap-2 justify-end pt-1">
              <button
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 text-sm text-purple-300 hover:text-white transition-colors"
              >
                Avbryt
              </button>
              <button
                onClick={confirmImport}
                className="px-4 py-2 text-sm bg-purple-600/40 hover:bg-purple-600/60 border border-purple-500/30 text-white rounded-lg transition-all"
              >
                Bekräfta import
              </button>
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
                <select
                  value={newClientForm.skr}
                  onChange={e => setNewClientForm(p => ({ ...p, skr: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-400/50"
                >
                  {['AB', 'EF', 'HB'].map(t => <option key={t} value={t} className="bg-purple-950">{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-purple-300/70 mb-1 block">Ansvarig</label>
                <select
                  value={newClientForm.ansvarig}
                  onChange={e => setNewClientForm(p => ({ ...p, ansvarig: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-400/50"
                >
                  <option value="" className="bg-purple-950">—</option>
                  {USERS.map(u => <option key={u} value={u} className="bg-purple-950">{u}</option>)}
                </select>
              </div>
            </div>

            <FieldInput
              label="Klientnamn *"
              value={newClientForm.namn}
              onChange={v => setNewClientForm(p => ({ ...p, namn: v }))}
              placeholder="Företagsnamn"
            />

            <div className="grid grid-cols-2 gap-3">
              <FieldInput label="Bransch" value={newClientForm.bransch} onChange={v => setNewClientForm(p => ({ ...p, bransch: v }))} />
              <FieldInput label="Språk"   value={newClientForm.sprak}   onChange={v => setNewClientForm(p => ({ ...p, sprak: v }))} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-purple-300/70 mb-1 block">Frekvens</label>
                <select
                  value={newClientForm.freq}
                  onChange={e => setNewClientForm(p => ({ ...p, freq: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-400/50"
                >
                  {['Månad', 'Kvartal', 'År'].map(f => <option key={f} value={f} className="bg-purple-950">{f}</option>)}
                </select>
              </div>
              <FieldInput label="Bank" value={newClientForm.bank} onChange={v => setNewClientForm(p => ({ ...p, bank: v }))} />
            </div>

            <FieldInput label="E-post" value={newClientForm.mejl} onChange={v => setNewClientForm(p => ({ ...p, mejl: v }))} type="email" />

            <div className="flex gap-2 justify-end pt-1">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-sm text-purple-300 hover:text-white transition-colors"
              >
                Avbryt
              </button>
              <button
                onClick={addClient}
                disabled={!newClientForm.namn.trim()}
                className="px-4 py-2 text-sm bg-purple-600/40 hover:bg-purple-600/60 border border-purple-500/30 text-white rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Lägg till
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
