'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion, Variants } from 'framer-motion';
import { 
  ArrowLeft, Save, Loader2, AlignLeft, Tags, User, Activity,
  Bold, Italic, Strikethrough, Heading2, Heading3, List, ListOrdered, Quote, Undo, Redo, Image as ImageIcon, Link as LinkIcon
} from 'lucide-react';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TipTapImage from '@tiptap/extension-image';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const categories = ["Travel Guide", "Wildlife", "Destinations", "Tips & Tricks", "Lifestyle", "Culinary"];

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  // Helper fungsi untuk gaya tombol aktif vs tidak aktif
  const buttonClass = (isActive: boolean) => `
    p-2 rounded-lg transition-colors
    ${isActive ? 'bg-[#11223a] text-white shadow-sm' : 'text-gray-500 hover:bg-gray-100 hover:text-[#11223a]'}
  `;

  const addImage = () => {
    const url = window.prompt('Masukkan URL Gambar (Contoh: Link Unsplash)');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50/80 border-b border-gray-200/80 rounded-t-xl sticky top-0 z-10 backdrop-blur-sm">
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().chain().focus().toggleBold().run()} className={buttonClass(editor.isActive('bold'))} title="Bold">
        <Bold className="w-4 h-4" />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editor.can().chain().focus().toggleItalic().run()} className={buttonClass(editor.isActive('italic'))} title="Italic">
        <Italic className="w-4 h-4" />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} disabled={!editor.can().chain().focus().toggleStrike().run()} className={buttonClass(editor.isActive('strike'))} title="Strikethrough">
        <Strikethrough className="w-4 h-4" />
      </button>

      <div className="w-px h-5 bg-gray-300 mx-1"></div>

      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={buttonClass(editor.isActive('heading', { level: 2 }))} title="Heading 2">
        <Heading2 className="w-4 h-4" />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={buttonClass(editor.isActive('heading', { level: 3 }))} title="Heading 3">
        <Heading3 className="w-4 h-4" />
      </button>

      <div className="w-px h-5 bg-gray-300 mx-1"></div>

      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={buttonClass(editor.isActive('bulletList'))} title="Bullet List">
        <List className="w-4 h-4" />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={buttonClass(editor.isActive('orderedList'))} title="Ordered List">
        <ListOrdered className="w-4 h-4" />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={buttonClass(editor.isActive('blockquote'))} title="Blockquote">
        <Quote className="w-4 h-4" />
      </button>

      <div className="w-px h-5 bg-gray-300 mx-1"></div>
      
      {/* Tombol Insert Gambar */}
      <button type="button" onClick={addImage} className="p-2 text-gray-500 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors" title="Insert Image via URL">
        <ImageIcon className="w-4 h-4" />
      </button>

      <div className="w-px h-5 bg-gray-300 mx-1"></div>

      <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()} className="p-2 text-gray-400 hover:text-[#11223a] transition-colors disabled:opacity-30" title="Undo">
        <Undo className="w-4 h-4" />
      </button>
      <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()} className="p-2 text-gray-400 hover:text-[#11223a] transition-colors disabled:opacity-30" title="Redo">
        <Redo className="w-4 h-4" />
      </button>
    </div>
  );
};

export default function CreateBlogPage() {
  const router = useRouter();
  
  // State Management untuk Form
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState(''); // NEW: State untuk Cover Image
  const [category, setCategory] = useState(categories[0]);
  const [author, setAuthor] = useState('Editorial Team');
  const [status, setStatus] = useState<'Published' | 'Draft'>('Draft');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Inisialisasi TipTap Editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      TipTapImage.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: 'rounded-xl shadow-md my-6 max-w-full h-auto', // Styling gambar otomatis
        },
      }),
    ],
    content: '',
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'p-6 min-h-[500px] focus:outline-none tiptap-editor',
      },
    },
  });

  // Fungsi untuk meng-generate URL Slug otomatis dari Judul
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    
    const autoSlug = newTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // Ganti karakter non-alphanumeric dengan strip
      .replace(/(^-|-$)+/g, ''); // Hapus strip di awal/akhir
    setSlug(autoSlug);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || content === '<p></p>') {
      return alert("Judul dan Konten tidak boleh kosong!");
    }
    if (!coverImage) {
      return alert("Mohon masukkan URL Cover Image / Thumbnail artikel.");
    }
    
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'blogs'), {
        title,
        slug,
        content,
        coverImage, // Menyimpan URL gambar ke database
        category,
        author,
        status,
        createdAt: serverTimestamp(),
      });
      
      router.push('/admin/blog');
    } catch (error) {
      console.error("Gagal menyimpan artikel:", error);
      alert("Gagal menyimpan artikel. Cek koneksi internet atau hak akses database.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="space-y-8 max-w-[1400px] mx-auto"
    >
      {/* Top Action Bar */}
      <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm sticky top-24 z-20">
        <div className="flex items-center gap-4">
          <button 
            type="button"
            onClick={() => router.back()}
            className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-[#11223a] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-[#11223a] leading-none mb-1">Tulis Artikel Baru</h1>
            <p className="text-sm text-gray-500">Buat jurnal, panduan, atau berita perjalanan PGI Voyage.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={() => setStatus('Draft')}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${status === 'Draft' ? 'bg-amber-100 text-amber-700' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
          >
            Simpan sbg Draft
          </button>
          <button 
            type="submit"
            disabled={isSubmitting}
            onClick={() => setStatus('Published')}
            className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-[#11223a] hover:bg-[#0f1f33] text-white text-sm font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isSubmitting ? 'Menyimpan...' : 'Publish Artikel'}
          </button>
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* KOLOM KIRI (Editor Utama) */}
        <motion.div variants={fadeInUp} className="w-full lg:w-2/3 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
            
            {/* Input Judul */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-[#11223a] mb-2">
                <AlignLeft className="w-4 h-4 text-[#B88E52]" /> Judul Artikel
              </label>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Contoh: The Ultimate Guide to Komodo 2026..."
                className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-xl text-xl font-bold text-[#11223a] focus:outline-none focus:border-[#B88E52] focus:bg-white focus:ring-4 focus:ring-[#B88E52]/10 transition-all placeholder:font-normal placeholder:text-gray-400"
                required
              />
            </div>

            {/* TipTap Rich Text Editor */}
            <div className="editor-container">
              <label className="flex items-center gap-2 text-sm font-bold text-[#11223a] mb-2">
                <AlignLeft className="w-4 h-4 text-[#B88E52]" /> Isi Konten Artikel
              </label>
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#B88E52] focus-within:ring-4 focus-within:ring-[#B88E52]/10 transition-all shadow-sm">
                {/* Menu Toolbar Khusus TipTap */}
                <MenuBar editor={editor} />
                {/* Area Mengetik */}
                <EditorContent editor={editor} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* KOLOM KANAN (Metadata & Settings) */}
        <motion.div variants={fadeInUp} className="w-full lg:w-1/3 space-y-6">
          
          {/* Card: Cover Image Settings */}
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
            <div>
              <label className="flex items-center justify-between text-sm font-bold text-[#11223a] mb-3">
                <span className="flex items-center gap-2"><ImageIcon className="w-4 h-4 text-[#B88E52]" /> Featured Image</span>
                <span className="text-[10px] uppercase tracking-wider bg-amber-100 text-amber-700 px-2 py-0.5 rounded-md font-bold">Wajib</span>
              </label>
              
              {/* Preview Box */}
              <div className="w-full aspect-video bg-gray-50 rounded-xl border border-dashed border-gray-300 mb-4 overflow-hidden relative flex items-center justify-center">
                {coverImage ? (
                  <img src={coverImage} alt="Cover Preview" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = ''; alert('URL Gambar tidak valid / tidak dapat dimuat.'); }} />
                ) : (
                  <div className="text-center text-gray-400">
                    <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <span className="text-xs">Preview Gambar</span>
                  </div>
                )}
              </div>

              {/* Input URL */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LinkIcon className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="url"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#11223a] focus:outline-none focus:border-[#B88E52] focus:bg-white focus:ring-4 focus:ring-[#B88E52]/10 transition-all"
                  required
                />
              </div>
              <p className="text-[11px] text-gray-400 mt-2 leading-relaxed">Masukkan URL gambar publik (Contoh: link Unsplash). Gambar ini akan muncul di halaman utama Blog.</p>
            </div>
          </div>

          {/* Card: Publish Settings */}
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
            
            {/* Input URL Slug Preview */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                URL Slug
              </label>
              <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-500 font-mono break-all">
                {slug ? `/blog/${slug}` : '/blog/url-akan-tampil-disini'}
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Select Kategori */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-[#11223a] mb-2">
                <Tags className="w-4 h-4 text-[#B88E52]" /> Kategori Topik
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#11223a] font-medium focus:outline-none focus:border-[#B88E52] focus:bg-white focus:ring-4 focus:ring-[#B88E52]/10 transition-all cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <hr className="border-gray-100" />

            {/* Input Author */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-[#11223a] mb-2">
                <User className="w-4 h-4 text-[#B88E52]" /> Penulis (Author)
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Nama Penulis"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-[#11223a] focus:outline-none focus:border-[#B88E52] focus:bg-white focus:ring-4 focus:ring-[#B88E52]/10 transition-all"
                required
              />
            </div>

            <hr className="border-gray-100" />

            {/* Status (Readonly indicator) */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-[#11223a] mb-2">
                <Activity className="w-4 h-4 text-[#B88E52]" /> Status Publikasi
              </label>
              <div className="flex items-start gap-3 flex-col sm:flex-row sm:items-center">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 ${
                  status === 'Published' 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${status === 'Published' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                  {status}
                </span>
                <span className="text-[11px] text-gray-400 italic leading-relaxed">Pilih tombol di header untuk menyimpan.</span>
              </div>
            </div>

          </div>
        </motion.div>

      </div>

      {/* Global Style overrides untuk TipTap Content */}
      <style dangerouslySetInnerHTML={{__html: `
        .tiptap-editor p { margin-bottom: 1rem; color: #374151; line-height: 1.8; font-size: 1.05rem; }
        .tiptap-editor h2 { font-size: 1.75rem; font-weight: 800; color: #11223a; margin-top: 2.5rem; margin-bottom: 1rem; line-height: 1.3; letter-spacing: -0.02em; }
        .tiptap-editor h3 { font-size: 1.35rem; font-weight: 700; color: #11223a; margin-top: 2rem; margin-bottom: 0.75rem; }
        .tiptap-editor ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; color: #374151; }
        .tiptap-editor ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1.5rem; color: #374151; }
        .tiptap-editor li { margin-bottom: 0.5rem; }
        .tiptap-editor blockquote { border-left-width: 4px; border-color: #B88E52; padding-left: 1.5rem; font-style: italic; color: #6b7280; margin: 2rem 0; background-color: #fdfaf5; padding-top: 1rem; padding-bottom: 1rem; border-radius: 0 0.75rem 0.75rem 0; }
        .tiptap-editor strong { font-weight: 700; color: #11223a; }
        .tiptap-editor img { max-width: 100%; height: auto; border-radius: 0.75rem; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); margin: 2rem auto; display: block; }
        .tiptap-editor p.is-editor-empty:first-child::before { content: 'Mulai menulis cerita perjalanan yang menakjubkan...'; color: #9ca3af; float: left; height: 0; pointer-events: none; }
      `}} />
    </motion.form>
  );
}