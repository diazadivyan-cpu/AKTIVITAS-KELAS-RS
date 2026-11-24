-- ============================================================================
-- SKEMA DATABASE SUPABASE (POSTGRESQL + RLS + STORAGE)
-- Aplikasi: Aktivitas Kelas RS (Absensi Real-Time & Transparansi Uang Kas Kelas R3S)
-- Jalankan seluruh script ini di SQL Editor Dashboard Supabase Anda.
-- ============================================================================

-- Ekstensi UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 1. TABEL PROFILES (Pengguna & RBAC 4 Role)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  npm TEXT UNIQUE NOT NULL,
  nama_lengkap TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  -- Disimpan untuk sinkronisasi tampilan akun di POV Admin & verifikasi login username
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'mahasiswa' CHECK (role IN ('mahasiswa', 'pj_matkul', 'ketua', 'bendahara', 'admin')),
  no_wa TEXT DEFAULT '',
  avatar_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_role_check
  CHECK (role IN ('mahasiswa', 'pj_matkul', 'ketua', 'bendahara', 'admin'));

-- ============================================================================
-- 2. TABEL PENGATURAN KELAS (Semester, Pertemuan, Rekening & QRIS)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.pengaturan_kelas (
  id INTEGER PRIMARY KEY DEFAULT 1,
  nama_kelas TEXT NOT NULL DEFAULT 'R3S',
  semester_aktif INTEGER NOT NULL DEFAULT 3,
  pertemuan_berjalan INTEGER NOT NULL DEFAULT 0,
  total_pertemuan_semester INTEGER NOT NULL DEFAULT 14,
  nama_bank TEXT NOT NULL DEFAULT 'BCA',
  no_rekening TEXT NOT NULL DEFAULT '5210987654',
  atas_nama_rekening TEXT NOT NULL DEFAULT 'Bendahara Kelas R3S',
  qris_nmid TEXT NOT NULL DEFAULT 'ID1025463553806',
  qris_merchant_name TEXT NOT NULL DEFAULT 'Mas_hy, Fashion',
  qris_payload TEXT NOT NULL DEFAULT '00020101021126610014COM.GO-JEK.WWW01189360091435873754230210G5873754230303UMI51440014ID.CO.QRIS.WWW0215ID10254635538060303UMI5204569753033605802ID5915Mas_hy, Fashion6007CIREBON61054518562070703A016304BDA1',
  nominal_kas_default INTEGER NOT NULL DEFAULT 10000,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.pengaturan_kelas
  ADD COLUMN IF NOT EXISTS qris_payload TEXT NOT NULL DEFAULT '00020101021126610014COM.GO-JEK.WWW01189360091435873754230210G5873754230303UMI51440014ID.CO.QRIS.WWW0215ID10254635538060303UMI5204569753033605802ID5915Mas_hy, Fashion6007CIREBON61054518562070703A016304BDA1';

-- ============================================================================
-- 3. TABEL SESI ABSENSI (Dibuka oleh Ketua Kelas / Admin)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.sesi_absensi (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mata_kuliah TEXT NOT NULL,
  dosen TEXT NOT NULL,
  pertemuan_ke INTEGER NOT NULL CHECK (pertemuan_ke >= 1),
  tanggal DATE NOT NULL DEFAULT CURRENT_DATE,
  sks INTEGER NOT NULL DEFAULT 2 CHECK (sks >= 1),
  durasi_menit INTEGER NOT NULL DEFAULT 100 CHECK (durasi_menit >= 1),
  batas_waktu TIMESTAMPTZ NOT NULL,
  pj_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  pj_nama TEXT DEFAULT '',
  pj_matkul_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  pj_matkul_nama TEXT DEFAULT '',
  mode_kuliah TEXT NOT NULL DEFAULT 'Luring',
  link_daring TEXT DEFAULT '',
  dibuka_oleh UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.sesi_absensi ADD COLUMN IF NOT EXISTS tanggal DATE NOT NULL DEFAULT CURRENT_DATE;
ALTER TABLE public.sesi_absensi ADD COLUMN IF NOT EXISTS sks INTEGER NOT NULL DEFAULT 2;
ALTER TABLE public.sesi_absensi ADD COLUMN IF NOT EXISTS durasi_menit INTEGER NOT NULL DEFAULT 100;
ALTER TABLE public.sesi_absensi ADD COLUMN IF NOT EXISTS pj_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL;
ALTER TABLE public.sesi_absensi ADD COLUMN IF NOT EXISTS pj_nama TEXT DEFAULT '';
ALTER TABLE public.sesi_absensi ADD COLUMN IF NOT EXISTS pj_matkul_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL;
ALTER TABLE public.sesi_absensi ADD COLUMN IF NOT EXISTS pj_matkul_nama TEXT DEFAULT '';
ALTER TABLE public.sesi_absensi ADD COLUMN IF NOT EXISTS mode_kuliah TEXT NOT NULL DEFAULT 'Luring';
ALTER TABLE public.sesi_absensi ADD COLUMN IF NOT EXISTS link_daring TEXT DEFAULT '';

-- ============================================================================
-- 4. TABEL ABSENSI (Foto Watermark, GPS, Timestamp, Manual PJ, Verifikasi)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.absensi (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sesi_id UUID NOT NULL REFERENCES public.sesi_absensi(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status_kehadiran TEXT NOT NULL DEFAULT 'Hadir' CHECK (status_kehadiran IN ('Hadir', 'Izin', 'Sakit', 'Alpha', 'Belum Absen!')),
  status_verifikasi TEXT NOT NULL DEFAULT 'Menunggu' CHECK (status_verifikasi IN ('Menunggu', 'Disetujui', 'Ditolak', 'Belum Absen!')),
  foto_url TEXT DEFAULT '',
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  waktu_kirim TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  pj_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  pj_nama TEXT DEFAULT '',
  mode_absen TEXT NOT NULL DEFAULT 'Luring',
  is_manual BOOLEAN NOT NULL DEFAULT FALSE,
  catatan TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (sesi_id, user_id)
);

ALTER TABLE public.absensi ADD COLUMN IF NOT EXISTS mode_absen TEXT NOT NULL DEFAULT 'Luring';

-- ============================================================================
-- 5. TABEL PENGAJUAN CUTI (Surat Resmi & Verifikasi Ketua/Admin)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.pengajuan_cuti (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  tanggal_mulai DATE NOT NULL,
  tanggal_selesai DATE NOT NULL,
  alasan TEXT NOT NULL,
  surat_url TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'Menunggu' CHECK (status IN ('Menunggu', 'Disetujui', 'Ditolak')),
  ditinjau_oleh UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  catatan_pj TEXT DEFAULT '',
  waktu_pengajuan TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.pengajuan_cuti ADD COLUMN IF NOT EXISTS waktu_pengajuan TIMESTAMPTZ NOT NULL DEFAULT NOW();

-- ============================================================================
-- 6. TABEL IURAN KAS (Tagihan Massal & Pembayaran Mahasiswa)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.iuran_kas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  periode TEXT NOT NULL,
  nominal_tagihan INTEGER NOT NULL CHECK (nominal_tagihan >= 2000),
  nominal_dibayar INTEGER NOT NULL DEFAULT 0,
  metode_bayar TEXT CHECK (metode_bayar IN ('QRIS', 'Transfer Bank', 'Tunai')),
  bukti_url TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'Belum Lunas' CHECK (status IN ('Belum Lunas', 'Menunggu Verifikasi', 'Lunas', 'Ditolak')),
  tanggal_bayar TIMESTAMPTZ,
  verified_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  pj_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  pj_nama TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.iuran_kas ADD COLUMN IF NOT EXISTS pj_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL;
ALTER TABLE public.iuran_kas ADD COLUMN IF NOT EXISTS pj_nama TEXT DEFAULT '';
ALTER TABLE public.iuran_kas DROP CONSTRAINT IF EXISTS iuran_kas_status_check;
ALTER TABLE public.iuran_kas ADD CONSTRAINT iuran_kas_status_check CHECK (status IN ('Belum Lunas', 'Menunggu Verifikasi', 'Lunas', 'Ditolak'));

-- ============================================================================
-- 7. TABEL TRANSAKSI KAS (Buku Pemasukan & Pengeluaran Transparan)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.transaksi_kas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  jenis TEXT NOT NULL CHECK (jenis IN ('Pemasukan', 'Pengeluaran')),
  kategori TEXT NOT NULL,
  tanggal DATE NOT NULL DEFAULT CURRENT_DATE,
  keterangan TEXT NOT NULL,
  nominal INTEGER NOT NULL CHECK (nominal > 0),
  nota_url TEXT DEFAULT '',
  terkait_user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  pengirim_nama TEXT DEFAULT '',
  pj_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  pj_nama TEXT DEFAULT '',
  dicatat_oleh UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.transaksi_kas ADD COLUMN IF NOT EXISTS pengirim_nama TEXT DEFAULT '';
ALTER TABLE public.transaksi_kas ADD COLUMN IF NOT EXISTS pj_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL;
ALTER TABLE public.transaksi_kas ADD COLUMN IF NOT EXISTS pj_nama TEXT DEFAULT '';

-- ============================================================================
-- 8. TABEL LAPORAN KENDALA & PERMINTAAN REKAPAN EXCEL
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.laporan_kendala (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  kategori TEXT NOT NULL,
  keterangan TEXT NOT NULL,
  bukti_url TEXT DEFAULT '',
  tanggapan_admin TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'Menunggu' CHECK (status IN ('Menunggu', 'Selesai')),
  ditanggapi_oleh UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 9. TABEL PEMBERITAHUAN (Kotak Notifikasi Portal)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.pemberitahuan (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  judul TEXT NOT NULL,
  pesan TEXT NOT NULL,
  tipe TEXT NOT NULL DEFAULT 'info' CHECK (tipe IN ('info', 'success', 'warning', 'danger')),
  dibaca BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- INDEKS PERFORMA QUERY
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_absensi_sesi ON public.absensi(sesi_id);
CREATE INDEX IF NOT EXISTS idx_absensi_user ON public.absensi(user_id);
CREATE INDEX IF NOT EXISTS idx_iuran_user ON public.iuran_kas(user_id);
CREATE INDEX IF NOT EXISTS idx_transaksi_tanggal ON public.transaksi_kas(tanggal DESC);
CREATE INDEX IF NOT EXISTS idx_pemberitahuan_user ON public.pemberitahuan(user_id, created_at DESC);

-- ============================================================================
-- TRIGGER AUTO-UPDATE TIMESTAMP
-- ============================================================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_profiles_updated ON public.profiles;
CREATE TRIGGER trg_profiles_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_laporan_updated ON public.laporan_kendala;
CREATE TRIGGER trg_laporan_updated
  BEFORE UPDATE ON public.laporan_kendala
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_pengaturan_updated ON public.pengaturan_kelas;
CREATE TRIGGER trg_pengaturan_updated
  BEFORE UPDATE ON public.pengaturan_kelas
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================================
-- KONFIGURASI ROW LEVEL SECURITY (RLS)
-- Catatan: Aplikasi ini menggunakan autentikasi username/password buatan Admin
-- melalui klien Anon CDN. Policy di bawah mengizinkan operasi aplikasi web
-- sambil menjaga integritas skema. Untuk produksi dengan Supabase Auth JWT,
-- sesuaikan clause USING/WITH CHECK dengan auth.uid().
-- ============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pengaturan_kelas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sesi_absensi ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.absensi ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pengajuan_cuti ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.iuran_kas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transaksi_kas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.laporan_kendala ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pemberitahuan ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE
  t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'profiles',
    'pengaturan_kelas',
    'sesi_absensi',
    'absensi',
    'pengajuan_cuti',
    'iuran_kas',
    'transaksi_kas',
    'laporan_kendala',
    'pemberitahuan'
  ]
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS "Allow app full access on %I" ON public.%I;', t, t);
    EXECUTE format('CREATE POLICY "Allow app full access on %I" ON public.%I FOR ALL USING (true) WITH CHECK (true);', t, t);
  END LOOP;
END $$;

-- ============================================================================
-- STORAGE BUCKET: bukti_absensi
-- Digunakan untuk: foto watermark absensi, foto bukti kas, nota, surat cuti, avatar
-- ============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('bukti_absensi', 'bukti_absensi', TRUE)
ON CONFLICT (id) DO UPDATE SET public = TRUE;

DROP POLICY IF EXISTS "Public read bukti_absensi" ON storage.objects;
CREATE POLICY "Public read bukti_absensi"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'bukti_absensi');

DROP POLICY IF EXISTS "Public insert bukti_absensi" ON storage.objects;
CREATE POLICY "Public insert bukti_absensi"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'bukti_absensi');

DROP POLICY IF EXISTS "Public update bukti_absensi" ON storage.objects;
CREATE POLICY "Public update bukti_absensi"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'bukti_absensi');

DROP POLICY IF EXISTS "Public delete bukti_absensi" ON storage.objects;
CREATE POLICY "Public delete bukti_absensi"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'bukti_absensi');

-- ============================================================================
-- DATA AWAL (PENGATURAN DEFAULT & AKUN ADMIN UTAMA SUPABASE)
-- ============================================================================
INSERT INTO public.pengaturan_kelas (
  id, nama_kelas, semester_aktif, pertemuan_berjalan, total_pertemuan_semester,
  nama_bank, no_rekening, atas_nama_rekening, qris_nmid, qris_merchant_name, qris_payload, nominal_kas_default
)
VALUES (
  1, 'R3S', 3, 0, 14,
  'BCA', '5210987654', 'Bendahara Kelas R3S', 'ID1025463553806', 'Mas_hy, Fashion',
  '00020101021126610014COM.GO-JEK.WWW01189360091435873754230210G5873754230303UMI51440014ID.CO.QRIS.WWW0215ID10254635538060303UMI5204569753033605802ID5915Mas_hy, Fashion6007CIREBON61054518562070703A016304BDA1',
  10000
)
ON CONFLICT (id) DO NOTHING;

-- Bersihkan akun dummy lama & kredensial admin lama jika sebelumnya pernah dimasukkan
DELETE FROM public.profiles
WHERE username IN (
  'admin_r3s',
  'ketua_r3s',
  'bendahara_r3s',
  'pjmatkul_r3s',
  'adivya_r3s',
  'siti_r3s',
  'dimas_r3s',
  'naufal_r3s',
  'putri_r3s'
);

-- Data Akun Admin Utama di Supabase
INSERT INTO public.profiles (npm, nama_lengkap, username, password, role, no_wa)
VALUES
  ('202443500001', 'Admin Utama RS', 'admin', 'qwerty4322.', 'admin', '6281200000001')
ON CONFLICT (username) DO UPDATE
SET password = EXCLUDED.password,
    role = EXCLUDED.role;
