'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { 
  PlusCircle, 
  Search, 
  Edit3, 
  Trash2, 
  FileText, 
  Eye, 
  Loader2, 
  AlertTriangle,
  MoreVertical,
  X
} from 'lucide-react';

// Tipe data Blog sesuai skema Firestore kita
interface Blog {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  status: 'Published' | 'Draft';
  createdAt: any; // Firestore timestamp
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // State untuk Modal Hapus (Custom Confirm Box)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      // Menarik data dari collection 'blogs', diurutkan dari yang terbaru
      const blogsRef = collection(db, 'blogs');
      const q = query(blogsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const blogData: Blog[] = [];
      querySnapshot.forEach((doc) => {
        blogData.push({ id: doc.id, ...doc.data() } as Blog);
      });
      
      setBlogs(blogData);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      // Jika error (misal index belum terbuat), kita ambil tanpa orderBy dulu sebagai fallback
      try {
        const fallbackSnapshot = await getDocs(collection(db, 'blogs'));
        const fallbackData: Blog[] = [];
        fallbackSnapshot.forEach((doc) => {
          fallbackData.push({ id: doc.id, ...doc.data() } as Blog);
        });
        setBlogs(fallbackData);
      } catch (fallbackError) {
        console.error("Fallback fetch failed:", fallbackError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const confirmDelete = (blog: Blog) => {
    setBlogToDelete(blog);
    setIsDeleteModalOpen(true);
  };

  const executeDelete = async () => {
    if (!blogToDelete) return;
    
    setIsDeleting(true);
    try {
      await deleteDoc(doc(db, 'blogs', blogToDelete.id));
      // Hapus dari state lokal agar UI langsung update tanpa perlu refresh browser
      setBlogs(blogs.filter(b => b.id !== blogToDelete.id));
      setIsDeleteModalOpen(false);
      setBlogToDelete(null);
    } catch (error) {
      console.error("Error deleting blog:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="space-y-8"
      >
        {/* Header Section */}
        <motion.div variants={fadeInUp} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#11223a] mb-2">Journal & Articles</h1>
            <p className="text-gray-500">Kelola konten blog, panduan wisata, dan berita PGI Voyage.</p>
          </div>
          <a 
            href="/admin/blog/create" 
            className="inline-flex items-center gap-2 bg-[#11223a] hover:bg-[#0f1f33] text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <PlusCircle className="w-5 h-5" /> Tulis Artikel Baru
          </a>
        </motion.div>

        {/* Action Bar (Search & Filter) */}
        <motion.div variants={fadeInUp} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari judul artikel atau kategori..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#B88E52] focus:ring-1 focus:ring-[#B88E52] transition-all"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-sm font-medium text-gray-500 bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-200">
              Total: {blogs.length} Artikel
            </span>
          </div>
        </motion.div>

        {/* Data Table Section */}
        <motion.div variants={fadeInUp} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Judul Artikel</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Kategori</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Tanggal</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isLoading ? (
                  /* Loading State */
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <Loader2 className="w-8 h-8 animate-spin mb-4 text-[#B88E52]" />
                        <p>Memuat data artikel dari database...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredBlogs.length === 0 ? (
                  /* Empty State */
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <FileText className="w-12 h-12 mb-4 text-gray-300" />
                        <p className="text-lg font-medium text-[#11223a] mb-1">Belum Ada Artikel</p>
                        <p className="text-sm">Silakan buat artikel pertama Anda untuk ditampilkan di website.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  /* Data Mapping */
                  filteredBlogs.map((blog) => (
                    <tr key={blog.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-[#11223a] line-clamp-1">{blog.title}</span>
                          <span className="text-xs text-gray-400 mt-1">Oleh: {blog.author}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                          {blog.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                          blog.status === 'Published' 
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/50' 
                            : 'bg-amber-50 text-amber-600 border border-amber-200/50'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${blog.status === 'Published' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                          {blog.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {blog.createdAt ? new Date(blog.createdAt.seconds * 1000).toLocaleDateString('id-ID', {
                          day: 'numeric', month: 'short', year: 'numeric'
                        }) : '-'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a 
                            href={`/blog/${blog.slug}`} 
                            target="_blank"
                            title="Lihat di Website"
                            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </a>
                          <a 
                            href={`/admin/blog/edit/${blog.id}`}
                            title="Edit Artikel" 
                            className="p-2 text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </a>
                          <button 
                            onClick={() => confirmDelete(blog)}
                            title="Hapus Artikel"
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>

      {}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#11223a]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
              >
                <button 
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-6">
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
                
                <h3 className="text-2xl font-bold text-[#11223a] mb-2">Hapus Artikel?</h3>
                <p className="text-gray-600 mb-8">
                  Apakah Anda yakin ingin menghapus artikel <strong>"{blogToDelete?.title}"</strong>? Tindakan ini tidak dapat dibatalkan dan artikel akan terhapus dari website publik.
                </p>
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="flex-1 py-3.5 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    Batal
                  </button>
                  <button 
                    onClick={executeDelete}
                    disabled={isDeleting}
                    className="flex-1 py-3.5 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isDeleting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Ya, Hapus'}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}