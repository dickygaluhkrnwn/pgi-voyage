'use client';

import { useState, useEffect, useRef } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Save, 
  Loader2, 
  AlertTriangle, 
  CheckCircle2, 
  Image as ImageIcon,
  Map,
  BedDouble,
  FileText,
  Navigation,
  UploadCloud,
  Plus,
  Trash2,
  Sunrise, 
  Sun, 
  Sunset, 
  Moon, 
  Anchor, 
  Coffee,
  ListOrdered,
  MessageCircleQuestion,
  XCircle
} from 'lucide-react';

// --- STYLING CONSTANTS ---
const inputClass = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#B88E52] focus:ring-2 focus:ring-[#B88E52]/20 outline-none transition-all text-[#11223a] font-medium placeholder-gray-400 shadow-sm";
const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";

// --- DEFAULT FALLBACK DATA ---
const defaultExpeditionData = {
  highlights: [
    { title: "Saleh Bay – Whale Sharks", desc: "Swim alongside majestic whale sharks in the calm waters of Sumbawa.", image: "", span: "md:col-span-2 row-span-1" },
    { title: "Komodo Park", desc: "Explore the natural habitat of the legendary Komodo dragons.", image: "", span: "md:col-span-1 row-span-2" },
    { title: "Padar Viewpoint", desc: "Hike to the famous panoramic viewpoint overlooking three spectacular bays.", image: "", span: "md:col-span-1 row-span-1" },
    { title: "Pink Beach", desc: "Relax on rare pink sands and snorkel in crystal-clear waters.", image: "", span: "md:col-span-1 row-span-1" }
  ],
  itinerary: [
    { 
      day: "DAY 1", 
      title: "Departure & Secret Islands", 
      image: "", 
      meals: "Dinner Included", 
      overnight: "Overnight onboard while sailing...", 
      activities: [
        { time: "Morning Pick-Up", text: "Lombok Hotel Pick-Up (08:00 - 10:00 AM)...", iconName: "sunrise" }
      ] 
    }
  ],
  cabinPackages: [
    { name: "Private Cabin Sea View", desc: "A premium cabin option...", price: "4,600K", features: ["Sea view window", "Comfortable sleeping area", "Air-conditioned room"], image: "", popular: true }
  ],
  inclusions: ["Meals onboard during the trip", "Snorkeling equipment"],
  exclusions: ["Flight tickets", "Personal Expenses"],
  testimonials: [],
  faqs: [
    { q: "What should I bring?", a: "Valid ID, comfortable clothing, sunscreen..." }
  ]
};

// --- HELPERS ---
const availableIcons = [
  { id: 'sunrise', icon: <Sunrise className="w-5 h-5" />, label: 'Sunrise' },
  { id: 'sun', icon: <Sun className="w-5 h-5" />, label: 'Sun' },
  { id: 'sunset', icon: <Sunset className="w-5 h-5" />, label: 'Sunset' },
  { id: 'moon', icon: <Moon className="w-5 h-5" />, label: 'Moon' },
  { id: 'anchor', icon: <Anchor className="w-5 h-5" />, label: 'Anchor' },
];

const getIconElement = (name: string, className: string) => {
  switch (name) {
    case 'sunrise': return <Sunrise className={className} />;
    case 'sun': return <Sun className={className} />;
    case 'sunset': return <Sunset className={className} />;
    case 'moon': return <Moon className={className} />;
    case 'anchor': return <Anchor className={className} />;
    default: return <Sun className={className} />;
  }
};

// --- SUB-COMPONENT: CLOUDINARY UPLOADER ---
const ImageUpload = ({ value, onChange, label }: { value: string, onChange: (url: string) => void, label: string }) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'pgi_voyage_preset'); 

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/danyx7uny/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const uploadData = await res.json();
      if (uploadData.secure_url) {
        onChange(uploadData.secure_url);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Gagal mengunggah gambar.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</label>
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="w-24 h-24 shrink-0 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-300 overflow-hidden flex items-center justify-center relative shadow-sm">
          {value ? (
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="w-8 h-8 text-gray-300" />
          )}
          {isUploading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-[#B88E52]" />
            </div>
          )}
        </div>
        <div className="flex-1 w-full space-y-3">
          <input 
            type="text" 
            value={value} 
            onChange={(e) => onChange(e.target.value)} 
            placeholder="Atau paste URL gambar..." 
            className={inputClass} 
          />
          <button 
            type="button" 
            onClick={() => fileInputRef.current?.click()} 
            disabled={isUploading} 
            className="px-5 py-2.5 bg-[#11223a] text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#0f1f33] transition-colors shadow-md w-full sm:w-auto"
          >
            <UploadCloud className="w-4 h-4" /> Upload Gambar Baru
          </button>
          <input type="file" ref={fileInputRef} onChange={handleUpload} accept="image/*" className="hidden" />
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---
export default function EditExpeditionPage() {
  const [data, setData] = useState<any>(defaultExpeditionData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{type: 'success'|'error', msg: string} | null>(null);
  
  const [activeTab, setActiveTab] = useState<'highlights' | 'itinerary' | 'cabins' | 'info'>('itinerary');
  const [activeDayIdx, setActiveDayIdx] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'settings', 'expedition');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const fetchedData = docSnap.data();
          if (!fetchedData.itinerary) fetchedData.itinerary = defaultExpeditionData.itinerary;
          if (!fetchedData.highlights) fetchedData.highlights = defaultExpeditionData.highlights;
          if (!fetchedData.cabinPackages) fetchedData.cabinPackages = defaultExpeditionData.cabinPackages;
          if (!fetchedData.faqs) fetchedData.faqs = defaultExpeditionData.faqs;
          
          setData({ ...defaultExpeditionData, ...fetchedData });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    try {
      const docRef = doc(db, 'settings', 'expedition');
      await setDoc(docRef, data);
      setSaveStatus({ type: 'success', msg: 'Berhasil disimpan dan live!' });
      setTimeout(() => setSaveStatus(null), 5000);
    } catch (err: any) {
      console.error(err);
      setSaveStatus({ type: 'error', msg: err.message || 'Gagal menyimpan data.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddCabin = () => {
    const newCabins = [
      ...data.cabinPackages,
      { name: "Nama Kabin Baru", desc: "", price: "0K", features: ["Fasilitas utama"], image: "", popular: false }
    ];
    setData({ ...data, cabinPackages: newCabins });
  };

  const handleRemoveCabin = (idx: number) => {
    if (confirm('Yakin ingin menghapus kabin ini?')) {
      const newCabins = [...data.cabinPackages];
      newCabins.splice(idx, 1);
      setData({ ...data, cabinPackages: newCabins });
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 animate-spin text-[#B88E52] mb-4" />
        <p className="text-gray-500 font-medium">Memuat konfigurasi Premium Expedition...</p>
      </div>
    );
  }

  const currentDayData = data.itinerary[activeDayIdx];

  return (
    <div className="max-w-[1500px] mx-auto space-y-6 pb-20">
      
      {/* HEADER STICKY */}
      <div className="sticky top-0 z-40 bg-[#f8f9fa]/90 backdrop-blur-md pt-4 pb-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#11223a]">Expedition Content Manager</h1>
          <p className="text-gray-500 font-medium">Desain, atur, dan ubah konten halaman publik secara dinamis.</p>
        </div>
        <div className="flex items-center gap-4">
          <AnimatePresence>
            {saveStatus && (
              <motion.span initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0}} className={`text-sm font-semibold flex items-center gap-2 px-4 py-2 rounded-lg ${saveStatus.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                {saveStatus.type === 'success' ? <CheckCircle2 className="w-4 h-4"/> : <AlertTriangle className="w-4 h-4"/>}
                {saveStatus.msg}
              </motion.span>
            )}
          </AnimatePresence>
          <button 
            onClick={handleSave} 
            disabled={isSaving}
            className="flex items-center gap-2 bg-gradient-to-r from-[#B88E52] to-[#a37c46] hover:from-[#a37c46] hover:to-[#8c693b] text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-[0_4px_20px_rgba(184,142,82,0.3)] hover:-translate-y-0.5 disabled:opacity-70 disabled:transform-none"
          >
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {isSaving ? 'Menyimpan...' : 'Publish Live'}
          </button>
        </div>
      </div>

      {/* TABS NAVIGATION */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar bg-white p-2 rounded-2xl border border-gray-200 shadow-sm sticky top-[88px] z-30">
        {[
          { id: 'itinerary', icon: <Navigation className="w-4 h-4" />, label: 'The Itinerary' },
          { id: 'highlights', icon: <Map className="w-4 h-4" />, label: 'Highlights Grid' },
          { id: 'cabins', icon: <BedDouble className="w-4 h-4" />, label: 'Cabin Packages' },
          { id: 'info', icon: <FileText className="w-4 h-4" />, label: 'Info & FAQs' }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)} 
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
              activeTab === tab.id 
                ? 'bg-[#11223a] text-white shadow-md' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-[#11223a]'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* --- CONTENT: ITINERARY --- */}
      {activeTab === 'itinerary' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {data.itinerary.map((day: any, idx: number) => (
              <button
                key={idx}
                onClick={() => setActiveDayIdx(idx)}
                className={`shrink-0 px-6 py-3 rounded-full font-bold text-sm transition-all border ${
                  activeDayIdx === idx 
                    ? 'bg-[#B88E52] border-[#B88E52] text-white shadow-lg shadow-[#B88E52]/30' 
                    : 'bg-white border-gray-200 text-gray-500 hover:border-[#B88E52]/50 hover:text-[#11223a]'
                }`}
              >
                {day.day}
              </button>
            ))}
            <button 
              onClick={() => {
                const newItin = [...data.itinerary, { day: `DAY ${data.itinerary.length + 1}`, title: "New Day Plan", image: "", meals: "Meals Not Included", overnight: "Overnight at...", activities: [] }];
                setData({...data, itinerary: newItin});
                setActiveDayIdx(newItin.length - 1);
              }}
              className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm bg-[#11223a]/5 text-[#11223a] border border-dashed border-[#11223a]/20 hover:bg-[#11223a]/10 transition-all"
            >
              <Plus className="w-4 h-4" /> Add Day
            </button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
            {/* LEFT: EDIT FORM */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-200 shadow-xl shadow-gray-200/40 space-y-8">
              <div className="flex items-center justify-between border-b border-gray-100 pb-6">
                <h2 className="text-2xl font-bold text-[#11223a] flex items-center gap-3">
                  <ListOrdered className="w-6 h-6 text-[#B88E52]" /> Editor {currentDayData.day}
                </h2>
                <button 
                  onClick={() => {
                    if (data.itinerary.length <= 1) return alert('Minimal harus ada 1 hari!');
                    if (confirm('Yakin ingin menghapus hari ini?')) {
                      const newItin = [...data.itinerary];
                      newItin.splice(activeDayIdx, 1);
                      setData({...data, itinerary: newItin});
                      setActiveDayIdx(0);
                    }
                  }}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                  title="Hapus Hari"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Label Hari (Contoh: DAY 1)</label>
                  <input type="text" value={currentDayData.day} onChange={(e) => { const newItin = [...data.itinerary]; newItin[activeDayIdx].day = e.target.value; setData({...data, itinerary: newItin}); }} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Judul Utama Rute</label>
                  <input type="text" value={currentDayData.title} onChange={(e) => { const newItin = [...data.itinerary]; newItin[activeDayIdx].title = e.target.value; setData({...data, itinerary: newItin}); }} className={inputClass} />
                </div>
              </div>

              <ImageUpload 
                label="Gambar Utama (Live Preview Kanan)" 
                value={currentDayData.image} 
                onChange={(url) => { const newItin = [...data.itinerary]; newItin[activeDayIdx].image = url; setData({...data, itinerary: newItin}); }} 
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div>
                  <label className={labelClass}>Info Makanan (Meals)</label>
                  <input type="text" value={currentDayData.meals} onChange={(e) => { const newItin = [...data.itinerary]; newItin[activeDayIdx].meals = e.target.value; setData({...data, itinerary: newItin}); }} className={inputClass} placeholder="Cth: Breakfast, Lunch & Dinner" />
                </div>
                <div>
                  <label className={labelClass}>Info Akomodasi</label>
                  <input type="text" value={currentDayData.overnight} onChange={(e) => { const newItin = [...data.itinerary]; newItin[activeDayIdx].overnight = e.target.value; setData({...data, itinerary: newItin}); }} className={inputClass} placeholder="Cth: Overnight onboard..." />
                </div>
              </div>

              {/* Activities Management */}
              <div className="pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <label className="text-lg font-bold text-[#11223a]">Rincian Aktivitas & Waktu</label>
                  <button 
                    onClick={() => {
                      const newItin = [...data.itinerary];
                      newItin[activeDayIdx].activities.push({ time: "00:00", text: "Aktivitas baru...", iconName: "sun" });
                      setData({...data, itinerary: newItin});
                    }}
                    className="flex items-center gap-2 text-sm font-bold text-[#B88E52] bg-[#B88E52]/10 px-4 py-2 rounded-xl hover:bg-[#B88E52] hover:text-white transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Tambah Aktivitas
                  </button>
                </div>
                
                <div className="space-y-6">
                  {currentDayData.activities.map((act: any, aIdx: number) => (
                    <div key={aIdx} className="relative p-6 bg-white border border-gray-200 shadow-sm rounded-2xl flex flex-col md:flex-row gap-6 group hover:border-[#B88E52]/40 transition-colors">
                      <button 
                        onClick={() => {
                          const newItin = [...data.itinerary];
                          newItin[activeDayIdx].activities.splice(aIdx, 1);
                          setData({...data, itinerary: newItin});
                        }}
                        className="absolute -top-3 -right-3 bg-white border border-gray-200 text-red-500 p-2 rounded-full shadow-md hover:bg-red-50 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all z-10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      
                      <div className="w-full md:w-1/3 space-y-4">
                        <div>
                          <label className={labelClass}>Waktu / Momen</label>
                          <input type="text" value={act.time} onChange={(e) => { const newItin = [...data.itinerary]; newItin[activeDayIdx].activities[aIdx].time = e.target.value; setData({...data, itinerary: newItin}); }} className={inputClass} placeholder="Cth: 08:00 AM / Morning" />
                        </div>
                        <div>
                          <label className={labelClass}>Visual Ikon</label>
                          <div className="flex flex-wrap gap-2">
                            {availableIcons.map(iconObj => (
                              <button
                                key={iconObj.id}
                                title={iconObj.label}
                                onClick={() => { const newItin = [...data.itinerary]; newItin[activeDayIdx].activities[aIdx].iconName = iconObj.id; setData({...data, itinerary: newItin}); }}
                                className={`p-2.5 rounded-lg border transition-all flex items-center justify-center ${
                                  act.iconName === iconObj.id ? 'bg-[#B88E52] text-white border-[#B88E52] shadow-md' : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                                }`}
                              >
                                {iconObj.icon}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="w-full md:w-2/3">
                        <label className={labelClass}>Deskripsi Detail Aktivitas</label>
                        <textarea 
                          rows={5} 
                          value={act.text} 
                          onChange={(e) => { const newItin = [...data.itinerary]; newItin[activeDayIdx].activities[aIdx].text = e.target.value; setData({...data, itinerary: newItin}); }} 
                          className={`${inputClass} resize-none leading-relaxed h-[calc(100%-28px)]`} 
                          placeholder="Jelaskan aktivitas yang akan dilakukan tamu..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: LIVE PREVIEW ITINERARY */}
            <div className="bg-[#f8f9fa] p-8 lg:p-10 rounded-[2.5rem] border border-gray-200 shadow-inner sticky top-[160px]">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-emerald-500 tracking-widest uppercase mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Live Preview
                  </h3>
                  <p className="text-gray-500 text-sm">Tampilan Itinerary di halaman publik.</p>
                </div>
              </div>

              <div className="flex flex-col gap-10">
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/3] group border border-gray-200">
                  {currentDayData.image ? (
                    <img src={currentDayData.image} alt={currentDayData.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex flex-col items-center justify-center text-gray-400">
                      <ImageIcon className="w-12 h-12 mb-2" /> <span className="text-sm font-semibold">No Image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11223a] via-[#11223a]/40 to-transparent opacity-90"></div>
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#B88E52] text-xs font-bold uppercase tracking-widest mb-4 shadow-md">
                      {currentDayData.day}
                    </span>
                    <h3 className="text-3xl font-bold leading-snug">{currentDayData.title || 'Untitled Day'}</h3>
                  </div>
                </div>

                <div className="flex flex-col justify-center pb-4">
                  <div className="space-y-10 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px before:h-full before:w-[2px] before:bg-gradient-to-b before:from-[#B88E52] before:via-gray-300 before:to-transparent">
                    {currentDayData.activities.map((act: any, i: number) => (
                      <div key={i} className="relative flex items-start gap-6 group/timeline">
                        <div className="absolute left-0 w-5 h-5 rounded-full border-[4px] border-white bg-[#B88E52] shadow-md z-10 mt-1"></div>
                        <div className="pl-10">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                                {getIconElement(act.iconName, "w-5 h-5 text-[#B88E52]")}
                            </div>
                            <h4 className="text-lg font-bold text-[#11223a]">{act.time || '00:00'}</h4>
                          </div>
                          <p className="text-gray-600 leading-relaxed text-sm">
                            {act.text || 'Deskripsi aktivitas...'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 bg-white border border-[#B88E52]/20 shadow-lg shadow-[#B88E52]/5 rounded-3xl p-8 relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-32 h-32 bg-[#B88E52]/5 rounded-bl-full pointer-events-none"></div>
                    <div className="flex items-start gap-4 mb-5">
                      <div className="p-2.5 bg-[#fdfaf5] rounded-xl text-[#B88E52]"><Coffee className="w-5 h-5" /></div>
                      <div>
                        <span className="block font-bold text-[#11223a] mb-1">Included Meals</span>
                        <span className="text-gray-600 text-sm">{currentDayData.meals || '-'}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 bg-[#fdfaf5] rounded-xl text-[#B88E52]"><Moon className="w-5 h-5" /></div>
                      <div>
                        <span className="block font-bold text-[#11223a] mb-1">Accommodation</span>
                        <span className="text-gray-600 text-sm">{currentDayData.overnight || '-'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* --- CONTENT: HIGHLIGHTS --- */}
      {activeTab === 'highlights' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
            
            {/* LEFT: EDIT FORM */}
            <div className="bg-white p-8 lg:p-10 rounded-[2.5rem] border border-gray-200 shadow-xl shadow-gray-200/40 space-y-8">
              <h2 className="text-2xl font-bold text-[#11223a] mb-6 border-b border-gray-100 pb-6 flex items-center gap-3">
                <Map className="w-6 h-6 text-[#B88E52]" /> Editor Bento Grid Highlights
              </h2>
              <div className="grid grid-cols-1 gap-10">
                {data.highlights.map((hl: any, idx: number) => (
                  <div key={idx} className="bg-gray-50 p-6 rounded-3xl border border-gray-200 space-y-6 relative overflow-hidden group hover:border-[#B88E52]/30 transition-colors">
                    <h3 className="font-bold text-[#B88E52] uppercase tracking-wider text-xs bg-[#B88E52]/10 inline-block px-4 py-1.5 rounded-full shadow-sm">Grid Card {idx + 1}</h3>
                    <div>
                      <label className={labelClass}>Judul Destinasi</label>
                      <input type="text" value={hl.title} onChange={(e) => { const newHl = [...data.highlights]; newHl[idx].title = e.target.value; setData({...data, highlights: newHl}); }} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Deskripsi Singkat</label>
                      <textarea rows={2} value={hl.desc} onChange={(e) => { const newHl = [...data.highlights]; newHl[idx].desc = e.target.value; setData({...data, highlights: newHl}); }} className={`${inputClass} resize-none leading-relaxed`} />
                    </div>
                    <div className="pt-2">
                      <ImageUpload label="Gambar Background" value={hl.image} onChange={(url) => { const newHl = [...data.highlights]; newHl[idx].image = url; setData({...data, highlights: newHl}); }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: LIVE PREVIEW HIGHLIGHTS */}
            <div className="bg-[#f8f9fa] p-8 lg:p-10 rounded-[2.5rem] border border-gray-200 shadow-inner sticky top-[160px]">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-emerald-500 tracking-widest uppercase mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Live Preview
                  </h3>
                  <p className="text-gray-500 text-sm">Tampilan Bento Grid di halaman publik.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3 h-[400px]">
                {data.highlights.map((hl: any, idx: number) => {
                  const gridSpan = hl.span || (idx === 0 ? "col-span-2 row-span-1" : idx === 1 ? "col-span-1 row-span-2" : "col-span-1 row-span-1");
                  return (
                    <div key={idx} className={`relative rounded-2xl overflow-hidden shadow-md group ${gridSpan}`}>
                      <img src={hl.image || "/images/Kapal_Pulau_Mas_88.png"} alt={hl.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#11223a]/90 via-[#11223a]/20 to-transparent opacity-80"></div>
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="text-sm md:text-lg font-bold mb-1 leading-tight">{hl.title || "Judul"}</h3>
                        <p className="text-white/80 text-[10px] md:text-xs leading-snug line-clamp-2 hidden sm:block">{hl.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
          </div>
        </motion.div>
      )}

      {/* --- CONTENT: CABINS --- */}
      {activeTab === 'cabins' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
            
            {/* LEFT: EDIT FORM */}
            <div className="bg-white p-8 lg:p-10 rounded-[2.5rem] border border-gray-200 shadow-xl shadow-gray-200/40 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
                <h2 className="text-2xl font-bold text-[#11223a] flex items-center gap-3">
                  <BedDouble className="w-6 h-6 text-[#B88E52]" /> Paket Kabin
                </h2>
                <button onClick={handleAddCabin} className="flex items-center gap-2 px-4 py-2.5 bg-[#11223a] text-white rounded-xl text-sm font-bold hover:bg-[#0f1f33] transition-all shadow-md">
                  <Plus className="w-4 h-4" /> Tambah Kabin
                </button>
              </div>
              
              <div className="space-y-10">
                {data.cabinPackages.map((cabin: any, idx: number) => (
                  <div key={idx} className="bg-[#f8f9fa] p-8 rounded-[2rem] border border-gray-200 shadow-sm relative group">
                    <button onClick={() => handleRemoveCabin(idx)} className="absolute -top-4 -right-4 bg-white text-red-500 p-3 rounded-full border border-gray-200 shadow-xl hover:bg-red-500 hover:text-white transition-all z-10 hidden group-hover:flex" title="Hapus Kabin">
                      <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-[#B88E52] uppercase tracking-wider text-xs bg-white border border-[#B88E52]/20 px-4 py-1.5 rounded-full shadow-sm">Kabin {idx + 1}</h3>
                        <label className="flex items-center gap-3 cursor-pointer group/toggle bg-white px-4 py-1.5 rounded-full border border-gray-200 shadow-sm">
                          <span className="text-sm font-bold text-gray-600 group-hover/toggle:text-[#11223a] transition-colors">Most Popular Badge</span>
                          <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${cabin.popular ? 'bg-[#B88E52]' : 'bg-gray-300'}`} onClick={() => { const newCb = [...data.cabinPackages]; newCb[idx].popular = !newCb[idx].popular; setData({...data, cabinPackages: newCb}); }}>
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 shadow-sm ${cabin.popular ? 'translate-x-6' : 'translate-x-1'}`} />
                          </div>
                        </label>
                      </div>

                      <div><label className={labelClass}>Nama Kabin</label><input type="text" value={cabin.name} onChange={(e) => { const newCb = [...data.cabinPackages]; newCb[idx].name = e.target.value; setData({...data, cabinPackages: newCb}); }} className={inputClass} /></div>
                      <div><label className={labelClass}>Harga (Cth: 4,600K)</label><input type="text" value={cabin.price} onChange={(e) => { const newCb = [...data.cabinPackages]; newCb[idx].price = e.target.value; setData({...data, cabinPackages: newCb}); }} className={`${inputClass} font-mono`} /></div>
                      <div><label className={labelClass}>Deskripsi Singkat</label><textarea rows={3} value={cabin.desc} onChange={(e) => { const newCb = [...data.cabinPackages]; newCb[idx].desc = e.target.value; setData({...data, cabinPackages: newCb}); }} className={`${inputClass} resize-none leading-relaxed`} /></div>
                    
                      <ImageUpload label="Foto Utama Kabin" value={cabin.image} onChange={(url) => { const newCb = [...data.cabinPackages]; newCb[idx].image = url; setData({...data, cabinPackages: newCb}); }} />
                      <div>
                        <label className={`${labelClass} flex justify-between items-center`}><span>Fasilitas Kabin</span> <span className="text-gray-400 font-normal text-xs bg-gray-100 px-2 py-1 rounded">(Pisahkan dgn Enter)</span></label>
                        <textarea rows={4} value={(cabin.features || []).join('\n')} onChange={(e) => { const newCb = [...data.cabinPackages]; newCb[idx].features = e.target.value.split('\n'); setData({...data, cabinPackages: newCb}); }} className={`${inputClass} leading-relaxed`} placeholder="Sea view window&#10;AC Central&#10;Comfortable Bed" />
                      </div>
                    </div>
                  </div>
                ))}
                {data.cabinPackages.length === 0 && (
                  <div className="text-center py-16 bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-300">
                    <BedDouble className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium text-lg">Belum ada paket kabin.</p>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT: LIVE PREVIEW CABINS */}
            <div className="bg-[#11223a] p-8 lg:p-10 rounded-[2.5rem] border border-[#1a3356] shadow-2xl sticky top-[160px]">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-emerald-400 tracking-widest uppercase mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Live Preview
                  </h3>
                  <p className="text-gray-400 text-sm">Tampilan Kabin di halaman publik.</p>
                </div>
              </div>
              
              {/* Scrollable Container for Preview */}
              <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar pb-10">
                {data.cabinPackages.map((cabin: any, idx: number) => {
                  const safeCabinName = cabin.name || `Cabin-${idx + 1}`;
                  return (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden flex flex-col group hover:bg-white/10 transition-colors duration-300 shadow-xl">
                    <div className="h-56 overflow-hidden relative">
                      <img src={cabin.image || "/images/Kapal_Pulau_Mas_88.png"} alt={safeCabinName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#11223a] to-transparent opacity-60"></div>
                      {cabin.popular && (
                        <div className="absolute top-4 right-4 bg-[#B88E52] text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">Most Popular</div>
                      )}
                      <div className="absolute bottom-4 left-4 text-white">
                         <h3 className="text-xl font-bold">{safeCabinName}</h3>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">{cabin.desc || ""}</p>
                      
                      <ul className="space-y-3 mb-8 flex-grow">
                        {(cabin.features || []).map((feat: string, i: number) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                            <CheckCircle2 className="w-4 h-4 text-[#B88E52] shrink-0 mt-0.5" /> 
                            <span className="leading-snug">{feat}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto pt-6 border-t border-white/10">
                        <div className="flex items-baseline gap-1 mb-6">
                          <span className="text-sm font-semibold text-[#B88E52]">IDR</span>
                          <span className="text-4xl font-bold text-white tracking-tight">{cabin.price || "0K"}</span>
                          <span className="text-gray-400 text-sm">/pax</span>
                        </div>
                        
                        <div className="flex items-center justify-center w-full py-4 rounded-xl bg-white text-[#11223a] font-bold hover:bg-[#B88E52] hover:text-white transition-colors shadow-lg cursor-pointer">
                          Select Package
                        </div>
                      </div>
                    </div>
                  </div>
                )})}
              </div>
            </div>
            
          </div>
        </motion.div>
      )}

      {/* --- CONTENT: INFO & FAQS --- */}
      {activeTab === 'info' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          
          <div className="bg-white p-8 lg:p-12 rounded-[3rem] border border-gray-200 shadow-xl shadow-gray-200/30 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-[#11223a] mb-6 border-b border-gray-100 pb-4 flex items-center gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500"/> What's Included</h2>
              <p className="text-sm text-gray-500 mb-4 bg-gray-50 p-3 rounded-lg border border-gray-100">Daftar fasilitas yang **termasuk** dalam harga tiket. Tekan `Enter` untuk memisahkan setiap item.</p>
              <textarea rows={10} value={(data.inclusions || []).join('\n')} onChange={(e) => setData({...data, inclusions: e.target.value.split('\n')})} className={`${inputClass} leading-relaxed`} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#11223a] mb-6 border-b border-gray-100 pb-4 flex items-center gap-3"><XCircle className="w-6 h-6 text-red-500"/> Not Included</h2>
              <p className="text-sm text-gray-500 mb-4 bg-gray-50 p-3 rounded-lg border border-gray-100">Daftar item yang **tidak termasuk** (pengeluaran pribadi). Tekan `Enter` untuk memisahkan.</p>
              <textarea rows={10} value={(data.exclusions || []).join('\n')} onChange={(e) => setData({...data, exclusions: e.target.value.split('\n')})} className={`${inputClass} leading-relaxed`} />
            </div>
          </div>

          <div className="bg-white p-8 lg:p-12 rounded-[3rem] border border-gray-200 shadow-xl shadow-gray-200/30">
            <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-8">
              <h2 className="text-2xl font-bold text-[#11223a] flex items-center gap-3">
                <MessageCircleQuestion className="w-6 h-6 text-[#B88E52]" /> Pusat Bantuan (FAQs)
              </h2>
              <button 
                onClick={() => {
                  const newFaqs = [...(data.faqs || []), { q: "Pertanyaan baru?", a: "Jawaban pertanyaan..." }];
                  setData({...data, faqs: newFaqs});
                }}
                className="flex items-center gap-2 px-6 py-3 bg-[#11223a] text-white rounded-xl text-sm font-bold hover:bg-[#0f1f33] transition-all shadow-md"
              >
                <Plus className="w-4 h-4" /> Tambah FAQ
              </button>
            </div>
            
            <div className="space-y-6">
              {(data.faqs || []).map((faq: any, idx: number) => (
                <div key={idx} className="bg-gray-50 p-6 rounded-2xl border border-gray-200 relative group flex flex-col md:flex-row gap-6">
                   <button onClick={() => { if(confirm('Hapus FAQ ini?')) { const newFaqs = [...data.faqs]; newFaqs.splice(idx, 1); setData({...data, faqs: newFaqs}); } }} className="absolute -top-3 -right-3 bg-white text-red-500 p-2 rounded-full border border-gray-200 shadow-md hover:bg-red-50 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all z-10">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="w-full md:w-1/3">
                    <label className={labelClass}>Pertanyaan (Tampil di Judul)</label>
                    <textarea rows={3} value={faq.q} onChange={(e) => { const newFaqs = [...data.faqs]; newFaqs[idx].q = e.target.value; setData({...data, faqs: newFaqs}); }} className={`${inputClass} resize-none h-[calc(100%-28px)] font-bold`} placeholder="What should I bring?" />
                  </div>
                  <div className="w-full md:w-2/3">
                    <label className={labelClass}>Jawaban Detail</label>
                    <textarea rows={4} value={faq.a} onChange={(e) => { const newFaqs = [...data.faqs]; newFaqs[idx].a = e.target.value; setData({...data, faqs: newFaqs}); }} className={`${inputClass} leading-relaxed h-[calc(100%-28px)]`} placeholder="Please bring valid ID, sunscreen..." />
                  </div>
                </div>
              ))}
              {(!data.faqs || data.faqs.length === 0) && (
                <p className="text-center text-gray-500 py-10 border-2 border-dashed border-gray-200 rounded-2xl">Belum ada FAQ. Tambahkan untuk membantu tamu.</p>
              )}
            </div>
          </div>
        </motion.div>
      )}

    </div>
  );
}