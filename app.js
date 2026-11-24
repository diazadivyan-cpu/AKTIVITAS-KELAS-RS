  /* ============================================================================
   SISTEM ABSENSI REAL-TIME (FOTO, GPS, TIMESTAMP) & TRANSPARANSI KAS KELAS R3S
   Vanilla JavaScript (ES6+) + Supabase CDN (@supabase/supabase-js v2)
   ============================================================================ */

// ----------------------------------------------------------------------------
// 1. KONFIGURASI SUPABASE CDN
//    Isi URL & Anon Key proyek Supabase Anda di bawah ini jika ingin terhubung
//    ke backend Supabase.
// ----------------------------------------------------------------------------
const DEFAULT_SUPABASE_URL = 'https://mtsdptkavsrpbmsxudad.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_GprwADCeysx4vDZVAq-CaA_ouQcfxWs';

const DEFAULT_QRIS_PAYLOAD =
  '00020101021126610014COM.GO-JEK.WWW01189360091435873754230210G5873754230303UMI51440014ID.CO.QRIS.WWW0215ID10254635538060303UMI5204569753033605802ID5915Mas_hy, Fashion6007CIREBON61054518562070703A016304BDA1';

const STORAGE_KEYS = {
  SUPABASE_CFG: 'r3s_supabase_cfg_v1',
  REMEMBER_CREDS: 'r3s_remember_creds_v1',
  SESSION_USER: 'r3s_session_user_id_v1',
  LOCAL_DB: 'r3s_local_db_v1',
  THEME: 'r3s_theme_v1',
};
  
const ROLE_LABELS = {
  mahasiswa: 'Mahasiswa',
  pj_matkul: 'PJ Mata Kuliah',
  ketua: 'Ketua Kelas',
  bendahara: 'Bendahara Kelas',
  admin: 'Admin Utama',
};

function isStudentRole(role) {
  return role === 'mahasiswa' || role === 'pj_matkul';
}

function isKasMemberRole(role) {
  return role === 'mahasiswa' || role === 'pj_matkul' || role === 'ketua' || role === 'bendahara';
}

function getRoleTagClass(role) {
  if (role === 'admin') return 'tag-coral';
  if (role === 'ketua') return 'tag-success';
  if (role === 'bendahara') return 'tag-warning';
  if (role === 'pj_matkul') return 'tag-pj-matkul';
  return 'tag-info';
}

// ----------------------------------------------------------------------------
// 2. STATE GLOBAL APLIKASI
// ----------------------------------------------------------------------------
const state = {
  mode: 'local', // 'supabase' | 'local'
  theme: 'dark', // 'dark' | 'light'
  skyPreviewHour: null, // null = real-time WIB, or numeric hour for preview
  supabase: null,
  currentUser: null,
  activeTab: 'dashboard',
  currentWibDateKey: getWibDateKey(new Date()),

  // Data dari 9 Tabel Supabase
  profiles: [],
  pengaturan: null,
  sesiAbsensi: [],
  absensi: [],
  pengajuanCuti: [],
  iuranKas: [],
  transaksiKas: [],
  laporanKendala: [],
  pemberitahuan: [],

  // State UI Filter & Pencarian
  filters: {
    riwayatSearch: '',
    riwayatStatus: 'Semua',
    kasSearch: '',
    kasJenis: 'Semua',
    kasKategori: 'Semua',
    laporanSearch: '',
    laporanKategori: 'Semua',
    akunSearch: '',
    selectedDiagramStudentId: '',
    selectedKasDiagramStudentId: '',
    pdfMonth: getWibDateKey(new Date()).slice(0, 7),
    pdfStudentId: '',
    pdfBendaharaId: '',
    pdfKetuaId: '',
    pdfAdminId: '',
    pdfEvaluationNote: '',
  },

  // State Captcha & Reset Password
  loginCaptchaAnswer: 0,
  forgotCaptchaAnswer: 0,
  verifiedForgotUser: null,

  // State Kamera & GPS
  cameraStream: null,
  cameraMode: 'self', // 'self' | 'daring' | 'manual_pj'
  cameraContext: null,
  cameraFacingMode: 'user', // 'user' | 'environment'
  cameraFlipHorizontal: false,
  daringUseCamera: false,
  daringImageFile: null,
  gpsCoords: null,
  gpsWatchId: null,
  capturedBlob: null,
  capturedPreviewUrl: '',

  // State Pembayaran QRIS & Pengingat WA
  selectedPayMethod: 'QRIS',
  qrisTimerInterval: null,
  qrisSecondsLeft: 600,
  currentDynamicQrisString: DEFAULT_QRIS_PAYLOAD,
  waReminderContext: null,
};

// ----------------------------------------------------------------------------
// 3. UTILITAS WAKTU WIB (Asia/Jakarta), FORMATTER & VALIDATOR
// ----------------------------------------------------------------------------
function getWibDateKey(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const map = Object.fromEntries(parts.map((p) => [p.type, p.value]));
  return `${map.year}-${map.month}-${map.day}`;
}

function formatWibClock(date = new Date()) {
  const tanggal = new Intl.DateTimeFormat('id-ID', {
    timeZone: 'Asia/Jakarta',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);

  const jam = new Intl.DateTimeFormat('id-ID', {
    timeZone: 'Asia/Jakarta',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
    .format(date)
    .replace(/\./g, ':');

  return `${tanggal} | ${jam} WIB`;
}

function formatWibShort(isoStr) {
  if (!isoStr) return '-';
  const d = new Date(isoStr);
  if (Number.isNaN(d.getTime())) return '-';
  const tgl = new Intl.DateTimeFormat('id-ID', {
    timeZone: 'Asia/Jakarta',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(d);
  const jam = new Intl.DateTimeFormat('id-ID', {
    timeZone: 'Asia/Jakarta',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
    .format(d)
    .replace(/\./g, ':');
  return `${tgl} · ${jam} WIB`;
}

function formatWibDateFormal(date = new Date()) {
  return new Intl.DateTimeFormat('id-ID', {
    timeZone: 'Asia/Jakarta',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function formatWibTimeOnly(date = new Date()) {
  return (
    new Intl.DateTimeFormat('id-ID', {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
      .format(date)
      .replace(/\./g, ':') + ' WIB'
  );
}

function formatIndonesianMonthYear(monthStr) {
  if (!monthStr || !/^\d{4}-\d{2}$/.test(monthStr)) return monthStr || '-';
  const [yr, mo] = monthStr.split('-').map(Number);
  const d = new Date(Date.UTC(yr, mo - 1, 15));
  return new Intl.DateTimeFormat('id-ID', {
    timeZone: 'Asia/Jakarta',
    month: 'long',
    year: 'numeric',
  }).format(d);
}

function formatDateDdMmYyyy(val) {
  if (!val) return '-';
  const str = String(val).trim();
  const isoMatch = str.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) {
    return `${isoMatch[3]}/${isoMatch[2]}/${isoMatch[1]}`;
  }
  const d = new Date(str);
  if (Number.isNaN(d.getTime())) return str;
  const key = getWibDateKey(d);
  const [y, m, day] = key.split('-');
  return `${day}/${m}/${y}`;
}

function formatRupiah(num) {
  const n = Number(num || 0);
  return 'Rp ' + n.toLocaleString('id-ID');
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function validatePasswordRule(pw) {
  const lenOk = pw.length >= 3 && pw.length <= 8;
  const digitOk = /\d/.test(pw);
  const symbolOk = /[^A-Za-z0-9]/.test(pw);
  return {
    lenOk,
    digitOk,
    symbolOk,
    valid: lenOk && digitOk && symbolOk,
  };
}

function generateUuid() {
  if (crypto?.randomUUID) return crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.textContent = message;
  container.appendChild(el);
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(-8px)';
    el.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    setTimeout(() => el.remove(), 220);
  }, 4200);
}

function getStatusTagClass(status) {
  const s = String(status || '').toLowerCase();
  if (['hadir', 'disetujui', 'lunas', 'selesai', 'pemasukan'].includes(s)) return 'tag-success';
  if (['menunggu', 'menunggu verifikasi', 'izin'].includes(s)) return 'tag-coral';
  if (['sakit'].includes(s)) return 'tag-warning';
  if (['ditolak', 'alpha', 'belum absen!', 'belum lunas', 'pengeluaran'].includes(s)) return 'tag-danger';
  return 'tag-info';
}

function getUserIdsByRoles(roles) {
  return state.profiles.filter((p) => roles.includes(p.role)).map((p) => p.id);
}

async function emitNotifications(items) {
  const valid = (items || []).filter((item) => item && item.user_id);
  if (!valid.length) return;
  const seen = new Set();
  const payload = [];
  valid.forEach((item) => {
    const key = `${item.user_id}::${item.judul}::${item.pesan}`;
    if (seen.has(key)) return;
    seen.add(key);
    payload.push({
      user_id: item.user_id,
      judul: item.judul,
      pesan: item.pesan,
      tipe: item.tipe || 'info',
      dibaca: false,
    });
  });
  if (payload.length) {
    await db.insert('pemberitahuan', payload);
  }
}

// ----------------------------------------------------------------------------
// 4. INISIALISASI KONEKSI SUPABASE & SEED LOCAL PREVIEW (JIKA BELUM DIATUR)
// ----------------------------------------------------------------------------
function getSupabaseConfig() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.SUPABASE_CFG) || 'null');
    if (saved?.url && saved?.anonKey) return saved;
  } catch {
    // Abaikan error parse
  }
  if (
    DEFAULT_SUPABASE_URL &&
    !DEFAULT_SUPABASE_URL.includes('YOUR_PROJECT_ID') &&
    DEFAULT_SUPABASE_ANON_KEY &&
    !DEFAULT_SUPABASE_ANON_KEY.includes('YOUR_SUPABASE_ANON_KEY')
  ) {
    return { url: DEFAULT_SUPABASE_URL, anonKey: DEFAULT_SUPABASE_ANON_KEY };
  }
  return null;
}

function initSupabaseConnection() {
  const cfg = getSupabaseConfig();
  if (cfg && window.supabase?.createClient) {
    state.supabase = window.supabase.createClient(cfg.url, cfg.anonKey);
    state.mode = 'supabase';
  } else {
    state.supabase = null;
    state.mode = 'local';
  }
}

const ADMIN_DEFAULT_PROFILE = {
  id: '00000000-0000-4000-8000-000000000001',
  npm: '202443500001',
  nama_lengkap: 'Admin Utama RS',
  username: 'admin',
  password: 'qwerty4322.',
  role: 'admin',
  no_wa: '6281200000001',
  avatar_url: '',
};

const DUMMY_USERNAMES_TO_PURGE = new Set([
  'ketua_r3s',
  'bendahara_r3s',
  'pjmatkul_r3s',
  'adivya_r3s',
  'siti_r3s',
  'dimas_r3s',
  'naufal_r3s',
  'putri_r3s',
]);

const DUMMY_PROFILE_IDS_TO_PURGE = new Set([
  '00000000-0000-4000-8000-000000000002',
  '00000000-0000-4000-8000-000000000003',
  '00000000-0000-4000-8000-000000000004',
  '00000000-0000-4000-8000-000000000101',
  '00000000-0000-4000-8000-000000000102',
  '00000000-0000-4000-8000-000000000103',
  '00000000-0000-4000-8000-000000000105',
  '00000000-0000-4000-8000-000000000106',
]);

const DUMMY_SESI_IDS_TO_PURGE = new Set([
  '10000000-0000-4000-8000-000000000001',
  '10000000-0000-4000-8000-000000000002',
  '10000000-0000-4000-8000-000000000003',
]);

function createInitialLocalDb() {
  return {
    profiles: [{ ...ADMIN_DEFAULT_PROFILE }],
    pengaturan_kelas: {
      id: 1,
      nama_kelas: 'R3S',
      semester_aktif: 3,
      pertemuan_berjalan: 0,
      total_pertemuan_semester: 14,
      nama_bank: 'BCA',
      no_rekening: '5210987654',
      atas_nama_rekening: 'Bendahara Kelas R3S',
      qris_nmid: 'ID1025463553806',
      qris_merchant_name: 'Mas_hy, Fashion',
      qris_payload: DEFAULT_QRIS_PAYLOAD,
      nominal_kas_default: 10000,
    },
    sesi_absensi: [],
    absensi: [],
    pengajuan_cuti: [],
    iuran_kas: [],
    transaksi_kas: [],
    laporan_kendala: [],
    pemberitahuan: [],
  };
}

function getLocalDb() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LOCAL_DB);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.profiles)) {
        let dirty = false;

        if (!localStorage.getItem('r3s_dummy_purged_v1')) {
          const prevProfileLen = parsed.profiles.length;
          parsed.profiles = parsed.profiles.filter(
            (p) =>
              !DUMMY_USERNAMES_TO_PURGE.has(String(p.username || '').toLowerCase()) &&
              !DUMMY_PROFILE_IDS_TO_PURGE.has(p.id)
          );
          if (parsed.profiles.length !== prevProfileLen) dirty = true;

          if (!parsed.profiles.some((p) => p.role === 'admin')) {
            parsed.profiles.unshift({ ...ADMIN_DEFAULT_PROFILE });
            dirty = true;
          }

          if (Array.isArray(parsed.sesi_absensi)) {
            const prevLen = parsed.sesi_absensi.length;
            parsed.sesi_absensi = parsed.sesi_absensi.filter((s) => !DUMMY_SESI_IDS_TO_PURGE.has(s.id));
            if (parsed.sesi_absensi.length !== prevLen) dirty = true;
          }
          if (Array.isArray(parsed.absensi)) {
            const prevLen = parsed.absensi.length;
            parsed.absensi = parsed.absensi.filter(
              (a) => !DUMMY_SESI_IDS_TO_PURGE.has(a.sesi_id) && !DUMMY_PROFILE_IDS_TO_PURGE.has(a.user_id)
            );
            if (parsed.absensi.length !== prevLen) dirty = true;
          }
          if (Array.isArray(parsed.pengajuan_cuti)) {
            const prevLen = parsed.pengajuan_cuti.length;
            parsed.pengajuan_cuti = parsed.pengajuan_cuti.filter(
              (c) => !DUMMY_PROFILE_IDS_TO_PURGE.has(c.user_id)
            );
            if (parsed.pengajuan_cuti.length !== prevLen) dirty = true;
          }
          if (Array.isArray(parsed.iuran_kas)) {
            const prevLen = parsed.iuran_kas.length;
            parsed.iuran_kas = parsed.iuran_kas.filter(
              (i) => !DUMMY_PROFILE_IDS_TO_PURGE.has(i.user_id)
            );
            if (parsed.iuran_kas.length !== prevLen) dirty = true;
          }
          if (Array.isArray(parsed.transaksi_kas)) {
            const prevLen = parsed.transaksi_kas.length;
            parsed.transaksi_kas = parsed.transaksi_kas.filter(
              (t) =>
                !DUMMY_PROFILE_IDS_TO_PURGE.has(t.terkait_user_id) &&
                !DUMMY_PROFILE_IDS_TO_PURGE.has(t.pj_id) &&
                !DUMMY_PROFILE_IDS_TO_PURGE.has(t.dicatat_oleh)
            );
            if (parsed.transaksi_kas.length !== prevLen) dirty = true;
          }
          if (Array.isArray(parsed.laporan_kendala)) {
            const prevLen = parsed.laporan_kendala.length;
            parsed.laporan_kendala = parsed.laporan_kendala.filter(
              (l) => !DUMMY_PROFILE_IDS_TO_PURGE.has(l.user_id)
            );
            if (parsed.laporan_kendala.length !== prevLen) dirty = true;
          }
          if (Array.isArray(parsed.pemberitahuan)) {
            const prevLen = parsed.pemberitahuan.length;
            parsed.pemberitahuan = parsed.pemberitahuan.filter(
              (n) => !DUMMY_PROFILE_IDS_TO_PURGE.has(n.user_id)
            );
            if (parsed.pemberitahuan.length !== prevLen) dirty = true;
          }

          if (parsed.pengaturan_kelas) {
            if (String(parsed.pengaturan_kelas.atas_nama_rekening || '').includes('Nadia Kusuma')) {
              parsed.pengaturan_kelas.atas_nama_rekening = 'Bendahara Kelas R3S';
              dirty = true;
            }
            if ((parsed.sesi_absensi || []).length === 0 && parsed.pengaturan_kelas.pertemuan_berjalan === 10) {
              parsed.pengaturan_kelas.pertemuan_berjalan = 0;
              dirty = true;
            }
          }

          localStorage.removeItem('r3s_dummy_v2_seeded');
          localStorage.setItem('r3s_dummy_purged_v1', '1');
        }

        parsed.profiles.forEach((p) => {
          if (p.role === 'admin' && p.nama_lengkap === 'Admin Utama R3S') {
            p.nama_lengkap = 'Admin Utama RS';
            dirty = true;
          }
          if (p.role === 'admin' && p.username === 'admin_r3s' && p.password === 'Adm!n99') {
            p.username = ADMIN_DEFAULT_PROFILE.username;
            p.password = ADMIN_DEFAULT_PROFILE.password;
            dirty = true;
          }
        });
        ['sesi_absensi', 'absensi', 'iuran_kas', 'transaksi_kas'].forEach((tbl) => {
          if (Array.isArray(parsed[tbl])) {
            parsed[tbl].forEach((row) => {
              if (row.pj_nama === 'Admin Utama R3S') {
                row.pj_nama = 'Admin Utama RS';
                dirty = true;
              }
            });
          }
        });
        if (dirty) saveLocalDb(parsed);
      }
      return parsed;
    }
  } catch {
    // Abaikan
  }
  const fresh = createInitialLocalDb();
  localStorage.setItem(STORAGE_KEYS.LOCAL_DB, JSON.stringify(fresh));
  localStorage.setItem('r3s_dummy_purged_v1', '1');
  return fresh;
}

function saveLocalDb(db) {
  localStorage.setItem(STORAGE_KEYS.LOCAL_DB, JSON.stringify(db));
}

// ----------------------------------------------------------------------------
// 5. LAYER DATA ABSTRAKSI (SUPABASE POSTGRESQL + STORAGE / LOCAL PREVIEW)
// ----------------------------------------------------------------------------
const db = {
  async loadAll() {
    if (state.mode === 'supabase' && state.supabase) {
      const [
        resProfiles,
        resSettings,
        resSesi,
        resAbsen,
        resCuti,
        resIuran,
        resTransaksi,
        resLaporan,
        resNotif,
      ] = await Promise.all([
        state.supabase.from('profiles').select('*').order('npm', { ascending: true }),
        state.supabase.from('pengaturan_kelas').select('*').eq('id', 1).maybeSingle(),
        state.supabase.from('sesi_absensi').select('*').order('created_at', { ascending: false }),
        state.supabase.from('absensi').select('*').order('waktu_kirim', { ascending: false }),
        state.supabase.from('pengajuan_cuti').select('*').order('created_at', { ascending: false }),
        state.supabase.from('iuran_kas').select('*').order('created_at', { ascending: false }),
        state.supabase.from('transaksi_kas').select('*').order('tanggal', { ascending: false }),
        state.supabase.from('laporan_kendala').select('*').order('created_at', { ascending: false }),
        state.supabase.from('pemberitahuan').select('*').order('created_at', { ascending: false }),
      ]);

      const firstErr = [
        resProfiles.error,
        resSettings.error,
        resSesi.error,
        resAbsen.error,
        resCuti.error,
        resIuran.error,
        resTransaksi.error,
        resLaporan.error,
        resNotif.error,
      ].find(Boolean);

      if (firstErr) {
        throw new Error(`Gagal memuat data Supabase: ${firstErr.message}`);
      }

      state.profiles = resProfiles.data || [];
      state.pengaturan = resSettings.data || {
        id: 1,
        nama_kelas: 'R3S',
        semester_aktif: 3,
        pertemuan_berjalan: 0,
        total_pertemuan_semester: 14,
        nama_bank: 'BCA',
        no_rekening: '5210987654',
        atas_nama_rekening: 'Bendahara Kelas R3S',
        qris_nmid: 'ID1025463553806',
        qris_merchant_name: 'Mas_hy, Fashion',
        qris_payload: DEFAULT_QRIS_PAYLOAD,
        nominal_kas_default: 10000,
      };
      state.pengaturan = normalizePengaturanQrisDefaults(state.pengaturan);
      state.sesiAbsensi = resSesi.data || [];
      state.absensi = resAbsen.data || [];
      state.pengajuanCuti = resCuti.data || [];
      state.iuranKas = resIuran.data || [];
      state.transaksiKas = resTransaksi.data || [];
      state.laporanKendala = resLaporan.data || [];
      state.pemberitahuan = resNotif.data || [];
      return;
    }

    // Mode Preview Lokal
    const local = getLocalDb();
    state.profiles = local.profiles || [];
    state.pengaturan = normalizePengaturanQrisDefaults(local.pengaturan_kelas);
    state.sesiAbsensi = local.sesi_absensi || [];
    state.absensi = local.absensi || [];
    state.pengajuanCuti = local.pengajuan_cuti || [];
    state.iuranKas = local.iuran_kas || [];
    state.transaksiKas = local.transaksi_kas || [];
    state.laporanKendala = local.laporan_kendala || [];
    state.pemberitahuan = local.pemberitahuan || [];
  },

  async insert(table, payload) {
    if (state.mode === 'supabase' && state.supabase) {
      let cleanPayload = Array.isArray(payload) ? payload.map((r) => ({ ...r })) : { ...payload };
      for (let attempt = 0; attempt < 5; attempt++) {
        const { data, error } = await state.supabase.from(table).insert(cleanPayload).select();
        if (!error) return data;
        const m = error.message?.match(/Could not find the '([^']+)' column/);
        if (m) {
          const missingCol = m[1];
          if (Array.isArray(cleanPayload)) cleanPayload.forEach((r) => delete r[missingCol]);
          else delete cleanPayload[missingCol];
          continue;
        }
        throw error;
      }
    }
    const local = getLocalDb();
    const rows = Array.isArray(payload) ? payload : [payload];
    const inserted = rows.map((r) => ({
      id: r.id || generateUuid(),
      created_at: r.created_at || new Date().toISOString(),
      ...r,
    }));
    local[table] = [...inserted, ...(local[table] || [])];
    saveLocalDb(local);
    return inserted;
  },

  async upsert(table, payload, onConflict = 'id') {
    if (state.mode === 'supabase' && state.supabase) {
      let cleanPayload = { ...payload };
      for (let attempt = 0; attempt < 5; attempt++) {
        const { data, error } = await state.supabase
          .from(table)
          .upsert(cleanPayload, { onConflict })
          .select();
        if (!error) return data;
        const m = error.message?.match(/Could not find the '([^']+)' column/);
        if (m) {
          delete cleanPayload[m[1]];
          continue;
        }
        throw error;
      }
    }
    const local = getLocalDb();
    const list = local[table] || [];
    const keys = onConflict.split(',').map((s) => s.trim());
    const idx = list.findIndex((item) => keys.every((k) => item[k] === payload[k]));
    const row = {
      id: payload.id || (idx >= 0 ? list[idx].id : generateUuid()),
      created_at: payload.created_at || (idx >= 0 ? list[idx].created_at : new Date().toISOString()),
      ...payload,
    };
    if (idx >= 0) {
      list[idx] = { ...list[idx], ...row };
    } else {
      list.unshift(row);
    }
    local[table] = list;
    saveLocalDb(local);
    return [row];
  },

  async update(table, id, patch) {
    if (state.mode === 'supabase' && state.supabase) {
      let cleanPatch = { ...patch };
      for (let attempt = 0; attempt < 5; attempt++) {
        const { data, error } = await state.supabase
          .from(table)
          .update(cleanPatch)
          .eq('id', id)
          .select();
        if (!error) return data;
        const m = error.message?.match(/Could not find the '([^']+)' column/);
        if (m) {
          delete cleanPatch[m[1]];
          continue;
        }
        throw error;
      }
    }
    const local = getLocalDb();
    if (table === 'pengaturan_kelas') {
      local.pengaturan_kelas = { ...local.pengaturan_kelas, ...patch };
      saveLocalDb(local);
      return [local.pengaturan_kelas];
    }
    const list = local[table] || [];
    const idx = list.findIndex((item) => item.id === id);
    if (idx >= 0) {
      list[idx] = { ...list[idx], ...patch, updated_at: new Date().toISOString() };
      local[table] = list;
      saveLocalDb(local);
      return [list[idx]];
    }
    return [];
  },

  async remove(table, id) {
    if (state.mode === 'supabase' && state.supabase) {
      const { error } = await state.supabase.from(table).delete().eq('id', id);
      if (error) throw error;
      return;
    }
    const local = getLocalDb();
    local[table] = (local[table] || []).filter((item) => item.id !== id);
    saveLocalDb(local);
  },

  async uploadFile(fileOrBlob, folder = 'umum') {
    if (!fileOrBlob) return '';
    if (state.mode === 'supabase' && state.supabase) {
      const ext = fileOrBlob.type?.includes('png') ? 'png' : 'jpg';
      const filePath = `${folder}/${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await state.supabase.storage
        .from('bukti_absensi')
        .upload(filePath, fileOrBlob, {
          contentType: fileOrBlob.type || 'image/jpeg',
          upsert: false,
        });
      if (error) throw new Error(`Gagal unggah gambar ke Storage: ${error.message}`);
      const { data } = state.supabase.storage.from('bukti_absensi').getPublicUrl(filePath);
      return data?.publicUrl || '';
    }

    // Mode Preview Lokal: kompres ke DataURL agar hemat ruang localStorage
    return await compressImageToDataUrl(fileOrBlob, 720, 0.68);
  },
};

function compressImageToDataUrl(fileOrBlob, maxDim = 720, quality = 0.7) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        const w = Math.max(1, Math.round(img.width * scale));
        const h = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => resolve(reader.result);
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(fileOrBlob);
  });
}

// ----------------------------------------------------------------------------
// 6. TEMA ANTARIKSA & GALAKSI, BINTANG & ANIMASI LANGIT REAL-TIME
// ----------------------------------------------------------------------------

function initSpaceBackdrop() {
  const layer = document.getElementById('stars-layer');
  if (!layer) return;
  layer.innerHTML = '';
  const tints = ['', '', '', 'tint-cyan', 'tint-violet'];
  for (let i = 0; i < 64; i++) {
    const star = document.createElement('span');
    const tint = tints[i % tints.length];
    star.className = tint ? `star-particle ${tint}` : 'star-particle';
    const size = (1.2 + Math.random() * 2.4).toFixed(1);
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${(Math.random() * 99).toFixed(2)}%`;
    star.style.top = `${(Math.random() * 96).toFixed(2)}%`;
    star.style.animationDuration = `${(2.4 + Math.random() * 4.2).toFixed(1)}s`;
    star.style.animationDelay = `${(-Math.random() * 6).toFixed(2)}s`;
    layer.appendChild(star);
  }
}

function updateCelestialLoginAnimation(now = new Date()) {
  const skyDome = document.getElementById('sky-dome');
  const spaceBackdrop = document.getElementById('space-backdrop');
  const sunEl = document.getElementById('celestial-sun');
  const moonEl = document.getElementById('celestial-moon');
  const starsGroup = document.getElementById('sky-stars-group');
  const cloudsGroup = document.getElementById('sky-clouds-group');
  const phaseLabels = document.querySelectorAll('[data-celestial-phase-label]');
  const clockBadges = document.querySelectorAll('[data-celestial-clock-badge]');
  const horizonGlow = document.getElementById('sky-horizon-glow');
  if (!skyDome || !sunEl || !moonEl) return;

  let hoursFloat = 12;
  let clockLabel = '';

  if (state.skyPreviewHour !== null && Number.isFinite(Number(state.skyPreviewHour))) {
    hoursFloat = Number(state.skyPreviewHour);
    const hh = String(Math.floor(hoursFloat)).padStart(2, '0');
    clockLabel = `Simulasi ${hh}:00 WIB`;
  } else {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).formatToParts(now);
    const map = Object.fromEntries(parts.map((p) => [p.type, p.value]));
    const h = Number(map.hour) % 24;
    const m = Number(map.minute);
    const s = Number(map.second);
    hoursFloat = h + m / 60 + s / 3600;
    clockLabel = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')} WIB`;
  }

  clockBadges.forEach((el) => {
    el.textContent = clockLabel;
  });

  const isDaytime = hoursFloat >= 6 && hoursFloat < 18;
  const progress = isDaytime
    ? (hoursFloat - 6) / 12
    : (hoursFloat >= 18 ? hoursFloat - 18 : hoursFloat + 6) / 12;
  const t = Math.max(0, Math.min(1, progress));

  // Koordinat kurva Bezier kuadratik cover 1440x820: P0(70,590), P1(720,-434), P2(1370,590)
  const orbX = 70 + 1300 * t;
  const orbY = 590 - 2048 * t * (1 - t);

  skyDome.classList.remove('sky-dawn', 'sky-day', 'sky-sunset', 'sky-night');
  if (spaceBackdrop) {
    spaceBackdrop.classList.remove(
      'sky-dawn-backdrop',
      'sky-day-backdrop',
      'sky-sunset-backdrop',
      'sky-night-backdrop'
    );
  }

  let phaseText = '';

  if (isDaytime) {
    sunEl.style.display = 'block';
    moonEl.style.display = 'none';
    sunEl.setAttribute('transform', `translate(${orbX.toFixed(1)}, ${orbY.toFixed(1)})`);
    if (cloudsGroup) cloudsGroup.style.opacity = '1';

    if (hoursFloat < 8.25) {
      skyDome.classList.add('sky-dawn');
      if (spaceBackdrop) spaceBackdrop.classList.add('sky-dawn-backdrop');
      if (starsGroup) starsGroup.style.opacity = '0.45';
      if (horizonGlow) {
        horizonGlow.style.background =
          'radial-gradient(circle at 12% 65%, rgba(251, 146, 60, 0.55), transparent 52%)';
        horizonGlow.style.opacity = '1';
      }
      phaseText = 'Pagi · Matahari Terbit di Timur';
    } else if (hoursFloat < 15.5) {
      skyDome.classList.add('sky-day');
      if (spaceBackdrop) spaceBackdrop.classList.add('sky-day-backdrop');
      if (starsGroup) starsGroup.style.opacity = '0';
      if (horizonGlow) {
        horizonGlow.style.background =
          'radial-gradient(circle at 50% 8%, rgba(254, 240, 138, 0.28), transparent 55%)';
        horizonGlow.style.opacity = '1';
      }
      phaseText =
        hoursFloat >= 11 && hoursFloat <= 13.5
          ? 'Tengah Hari · Matahari di Tengah Langit'
          : 'Siang Cerah · Matahari Melintas Langit';
    } else {
      skyDome.classList.add('sky-sunset');
      if (spaceBackdrop) spaceBackdrop.classList.add('sky-sunset-backdrop');
      if (starsGroup) starsGroup.style.opacity = '0.5';
      if (horizonGlow) {
        horizonGlow.style.background =
          'radial-gradient(circle at 88% 65%, rgba(249, 115, 22, 0.58), transparent 54%)';
        horizonGlow.style.opacity = '1';
      }
      phaseText = 'Sore · Matahari Terbenam di Barat';
    }
  } else {
    sunEl.style.display = 'none';
    moonEl.style.display = 'block';
    moonEl.setAttribute('transform', `translate(${orbX.toFixed(1)}, ${orbY.toFixed(1)})`);
    skyDome.classList.add('sky-night');
    if (spaceBackdrop) spaceBackdrop.classList.add('sky-night-backdrop');
    if (starsGroup) starsGroup.style.opacity = '1';
    if (cloudsGroup) cloudsGroup.style.opacity = '0.15';
    if (horizonGlow) {
      horizonGlow.style.background =
        'radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.16), transparent 60%)';
      horizonGlow.style.opacity = '1';
    }
    phaseText = 'Malam Galaksi · Bulan & Bintang Bersinar';
  }

  phaseLabels.forEach((el) => {
    el.textContent = phaseText;
  });
}

function startGlobalClocks() {
  const tick = () => {
    const now = new Date();
    const formatted = formatWibClock(now);
    const authClock = document.getElementById('auth-clock-display');
    const globalClock = document.getElementById('global-clock-wib');
    const camClock = document.getElementById('camera-time-status');
    const pdfClock = document.getElementById('pdf-realtime-clock');
    if (authClock) authClock.textContent = formatted;
    if (globalClock) globalClock.textContent = formatted;
    if (camClock) camClock.textContent = formatted;
    if (pdfClock) pdfClock.textContent = formatted;

    updateCelestialLoginAnimation(now);

    // Auto-reset Aktivitas Terbaru 24 Jam saat pergantian hari WIB
    const newKey = getWibDateKey(now);
    if (newKey !== state.currentWibDateKey) {
      state.currentWibDateKey = newKey;
      if (state.currentUser && state.activeTab === 'dashboard') {
        renderActiveTab();
      }
    }

    // Perbarui hitung mundur semua sesi mata kuliah aktif secara langsung
    document.querySelectorAll('[data-deadline-iso]').forEach((el) => {
      const deadline = new Date(el.getAttribute('data-deadline-iso')).getTime();
      const diff = deadline - now.getTime();
      if (diff <= 0) {
        el.textContent = 'Sesi Ditutup';
        el.classList.add('text-danger');
      } else {
        const hrs = Math.floor(diff / 3600000);
        const mins = Math.floor((diff % 3600000) / 60000);
        const secs = Math.floor((diff % 60000) / 1000);
        el.textContent = `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      }
    });
  };
  tick();
  setInterval(tick, 1000);
}

// ----------------------------------------------------------------------------
// 7. AUTENTIKASI: LOGIN, REMEMBER ME, CAPTCHA, LUPA PASSWORD MANDIRI
// ----------------------------------------------------------------------------
function refreshCaptcha(type = 'login') {
  const a = 2 + Math.floor(Math.random() * 9);
  const b = 1 + Math.floor(Math.random() * 9);
  if (type === 'login') {
    state.loginCaptchaAnswer = a + b;
    const q = document.getElementById('login-captcha-question');
    const inp = document.getElementById('login-captcha-answer');
    if (q) q.textContent = `${a} + ${b} = ?`;
    if (inp) inp.value = '';
  } else {
    state.forgotCaptchaAnswer = a + b;
    const q = document.getElementById('forgot-captcha-question');
    const inp = document.getElementById('forgot-captcha-answer');
    if (q) q.textContent = `${a} + ${b} = ?`;
    if (inp) inp.value = '';
  }
}

function loadRememberedCredentials() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.REMEMBER_CREDS) || 'null');
    if (saved?.username) {
      document.getElementById('login-username').value = saved.username;
      document.getElementById('login-password').value = saved.password || '';
      document.getElementById('login-remember').checked = true;
    }
  } catch {
    // Abaikan
  }
}

async function handleLoginSubmit(e) {
  e.preventDefault();
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;
  const captchaVal = Number(document.getElementById('login-captcha-answer').value);
  const remember = document.getElementById('login-remember').checked;

  if (captchaVal !== state.loginCaptchaAnswer) {
    showToast('Jawaban Captcha tidak sesuai. Silakan hitung ulang.', 'danger');
    refreshCaptcha('login');
    return;
  }

  try {
    await db.loadAll();
    const user = state.profiles.find(
      (p) => p.username.toLowerCase() === username.toLowerCase() && p.password === password
    );
    if (!user) {
      showToast('Nama pengguna atau kata sandi salah. Pastikan akun telah dibuat oleh Admin.', 'danger');
      refreshCaptcha('login');
      return;
    }

    if (remember) {
      localStorage.setItem(STORAGE_KEYS.REMEMBER_CREDS, JSON.stringify({ username, password }));
    } else {
      localStorage.removeItem(STORAGE_KEYS.REMEMBER_CREDS);
    }

    localStorage.setItem(STORAGE_KEYS.SESSION_USER, user.id);
    enterAuthenticatedApp(user);
    showToast(`Selamat datang kembali, ${user.nama_lengkap}!`, 'success');
  } catch (err) {
    showToast(err.message || 'Gagal menghubungi basis data.', 'danger');
  }
}

async function handleVerifyForgotUsername() {
  const username = document.getElementById('forgot-username').value.trim();
  if (!username) {
    showToast('Masukkan nama pengguna Anda terlebih dahulu.', 'warning');
    return;
  }
  try {
    await db.loadAll();
    const found = state.profiles.find((p) => p.username.toLowerCase() === username.toLowerCase());
    if (!found) {
      state.verifiedForgotUser = null;
      document.getElementById('forgot-verified-card').classList.add('hidden');
      document.getElementById('forgot-step-2').classList.add('hidden');
      showToast('Nama pengguna tidak ditemukan di basis data kelas R3S.', 'danger');
      return;
    }
    state.verifiedForgotUser = found;
    document.getElementById('forgot-verified-name').textContent = found.nama_lengkap;
    document.getElementById('forgot-verified-username').textContent = `@${found.username} · ${found.npm}`;
    document.getElementById('forgot-verified-card').classList.remove('hidden');
    document.getElementById('forgot-step-2').classList.remove('hidden');
    refreshCaptcha('forgot');
    showToast('Nama pengguna terverifikasi! Silakan buat kata sandi baru.', 'success');
  } catch (err) {
    showToast(err.message || 'Gagal memverifikasi nama pengguna.', 'danger');
  }
}

function updatePasswordRuleUI(pw, listSelector) {
  const res = validatePasswordRule(pw);
  const ul = document.querySelector(listSelector);
  if (!ul) return res;
  ul.querySelector('[data-rule="length"]')?.classList.toggle('valid', res.lenOk);
  ul.querySelector('[data-rule="digit"]')?.classList.toggle('valid', res.digitOk);
  ul.querySelector('[data-rule="symbol"]')?.classList.toggle('valid', res.symbolOk);
  return res;
}

async function handleForgotSubmit(e) {
  e.preventDefault();
  if (!state.verifiedForgotUser) {
    showToast('Verifikasi nama pengguna terlebih dahulu.', 'warning');
    return;
  }
  const newPw = document.getElementById('forgot-new-password').value;
  const confirmPw = document.getElementById('forgot-confirm-password').value;
  const captchaVal = Number(document.getElementById('forgot-captcha-answer').value);

  const check = validatePasswordRule(newPw);
  if (!check.valid) {
    showToast('Kata sandi wajib maksimal 8 karakter, minimal 1 angka, dan minimal 1 simbol.', 'danger');
    return;
  }
  if (newPw !== confirmPw) {
    showToast('Konfirmasi kata sandi baru tidak cocok.', 'danger');
    return;
  }
  if (captchaVal !== state.forgotCaptchaAnswer) {
    showToast('Jawaban Captcha salah.', 'danger');
    refreshCaptcha('forgot');
    return;
  }

  try {
    const targetUser = state.verifiedForgotUser;
    await db.update('profiles', targetUser.id, { password: newPw });
    const notifs = [
      {
        user_id: targetUser.id,
        judul: 'Kata Sandi Akun Diperbarui',
        pesan: 'Kata sandi akun Anda baru saja diperbarui melalui fitur Lupa Kata Sandi Mandiri.',
        tipe: 'success',
      },
    ];
    if (isStudentRole(targetUser.role)) {
      getUserIdsByRoles(['admin']).forEach((adminId) => {
        notifs.push({
          user_id: adminId,
          judul: 'Mahasiswa Mengubah Kata Sandi',
          pesan: `Mahasiswa ${targetUser.nama_lengkap} (${targetUser.npm} · @${targetUser.username}) telah mengatur ulang kata sandi melalui Lupa Kata Sandi.`,
          tipe: 'warning',
        });
      });
    }
    await emitNotifications(notifs);
    await db.loadAll();
    showToast('Kata sandi baru berhasil disimpan! Silakan masuk.', 'success');

    // Reset form & kembali ke login
    document.getElementById('forgot-form').reset();
    document.getElementById('forgot-verified-card').classList.add('hidden');
    document.getElementById('forgot-step-2').classList.add('hidden');
    state.verifiedForgotUser = null;
    toggleAuthView('login');
  } catch (err) {
    showToast(err.message || 'Gagal memperbarui password.', 'danger');
  }
}

function toggleAuthView(view) {
  const loginForm = document.getElementById('login-form');
  const forgotForm = document.getElementById('forgot-form');
  if (view === 'forgot') {
    loginForm.classList.add('hidden');
    forgotForm.classList.remove('hidden');
    refreshCaptcha('forgot');
  } else {
    forgotForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
    refreshCaptcha('login');
  }
}

function enterAuthenticatedApp(user) {
  state.currentUser = user;
  state.activeTab = 'dashboard';
  document.getElementById('auth-screen').classList.add('hidden');
  document.getElementById('app-shell').classList.remove('hidden');
  renderChromeUser();
  renderSidebarNav();
  renderActiveTab();
}

function logoutApp() {
  localStorage.removeItem(STORAGE_KEYS.SESSION_USER);
  state.currentUser = null;
  document.getElementById('app-shell').classList.add('hidden');
  document.getElementById('auth-screen').classList.remove('hidden');
  refreshCaptcha('login');
  loadRememberedCredentials();
}

// ----------------------------------------------------------------------------
// 8. NAVIGASI RBAC 4 ROLE & TOPBAR
// ----------------------------------------------------------------------------
function getNavigationConfig(role) {
  const notifUnread = getUserNotifications().filter((n) => !n.dibaca).length;
  const pendingAbsen = state.absensi.filter((a) => a.status_verifikasi === 'Menunggu').length;
  const pendingKas = state.iuranKas.filter((i) => i.status === 'Menunggu Verifikasi').length;
  const pendingCuti = state.pengajuanCuti.filter((c) => c.status === 'Menunggu').length;
  const pendingLaporan = state.laporanKendala.filter((l) => l.status === 'Menunggu').length;

  const menu = [{ section: 'Umum', id: 'dashboard', label: 'Dashboard' }];

  if (isStudentRole(role)) {
    menu.push(
      { section: 'Fitur Mahasiswa', id: 'absensi', label: 'Absensi Waktu Nyata' },
      { section: 'Fitur Mahasiswa', id: 'cuti', label: 'Pengajuan Cuti' },
      { section: 'Fitur Mahasiswa', id: 'kas_mahasiswa', label: 'Pembayaran Kas' },
      { section: 'Layanan', id: 'pusat_info', label: 'Pusat Informasi', count: notifUnread },
      { section: 'Akun', id: 'profil', label: 'Profil Saya' }
    );
  } else if (role === 'ketua') {
    menu.push(
      { section: 'Fitur Mahasiswa', id: 'absensi', label: 'Absensi Waktu Nyata' },
      { section: 'Fitur Mahasiswa', id: 'cuti', label: 'Pengajuan Cuti' },
      { section: 'Fitur Mahasiswa', id: 'kas_mahasiswa', label: 'Pembayaran Kas' },
      { section: 'Kepengurusan Absensi (Ketua)', id: 'sesi_absen', label: 'Absensi' },
      { section: 'Kepengurusan Absensi (Ketua)', id: 'verifikasi_absen', label: 'Verifikasi Kehadiran', count: pendingAbsen },
      { section: 'Kepengurusan Absensi (Ketua)', id: 'manual_absen', label: 'Absensi Manual' },
      { section: 'Kepengurusan Absensi (Ketua)', id: 'riwayat_monitoring', label: 'Riwayat & Cuti', count: pendingCuti },
      { section: 'Laporan & Ekspor', id: 'monitoring_excel', label: 'Matriks, Rekap & Excel' },
      { section: 'Laporan & Ekspor', id: 'laporan_pdf', label: 'Laporan PDF Bulanan' },
      { section: 'Layanan', id: 'pusat_info', label: 'Pusat Informasi', count: notifUnread },
      { section: 'Akun', id: 'profil', label: 'Profil Saya' }
    );
  } else if (role === 'bendahara') {
    menu.push(
      { section: 'Fitur Mahasiswa', id: 'absensi', label: 'Absensi Waktu Nyata' },
      { section: 'Fitur Mahasiswa', id: 'cuti', label: 'Pengajuan Cuti' },
      { section: 'Fitur Mahasiswa', id: 'kas_mahasiswa', label: 'Pembayaran Kas' },
      { section: 'Keuangan Kelas (Bendahara)', id: 'saluran_tagihan', label: 'Saluran Pembayaran & Tagihan Kas' },
      { section: 'Keuangan Kelas (Bendahara)', id: 'daftar_pembayaran', label: 'Verifikasi & Pengingat WA', count: pendingKas },
      { section: 'Keuangan Kelas (Bendahara)', id: 'buku_kas', label: 'Catatan Kas Transparan' },
      { section: 'Monitoring & Rekap', id: 'monitoring_excel', label: 'Matriks, Rekap & Excel' },
      { section: 'Monitoring & Rekap', id: 'laporan_pdf', label: 'Laporan PDF Bulanan' },
      { section: 'Layanan', id: 'pusat_info', label: 'Pusat Informasi', count: notifUnread },
      { section: 'Akun', id: 'profil', label: 'Profil Saya' }
    );
  } else if (role === 'admin') {
    menu.push(
      { section: 'Monitoring & Ekspor', id: 'monitoring_excel', label: 'Matriks, Diagram & Excel' },
      { section: 'Monitoring & Ekspor', id: 'laporan_pdf', label: 'Laporan PDF Bulanan' },
      { section: 'Monitoring & Ekspor', id: 'monitoring_laporan', label: 'Laporan Masuk', count: pendingLaporan },
      { section: 'Manajemen Absensi', id: 'sesi_absen', label: 'Absensi' },
      { section: 'Manajemen Absensi', id: 'verifikasi_absen', label: 'Verifikasi Kehadiran', count: pendingAbsen },
      { section: 'Manajemen Absensi', id: 'manual_absen', label: 'Absensi Manual' },
      { section: 'Manajemen Absensi', id: 'riwayat_monitoring', label: 'Riwayat & Cuti', count: pendingCuti },
      { section: 'Manajemen Kas', id: 'saluran_tagihan', label: 'Saluran Pembayaran & Tagihan Kas' },
      { section: 'Manajemen Kas', id: 'daftar_pembayaran', label: 'Verifikasi & Pengingat WA', count: pendingKas },
      { section: 'Manajemen Kas', id: 'buku_kas', label: 'Catatan Kas Transparan' },
      { section: 'Sistem', id: 'kelola_akun', label: 'Kelola Akun & Rekening' },
      { section: 'Sistem', id: 'pusat_info', label: 'Pusat Informasi', count: notifUnread },
      { section: 'Sistem', id: 'profil', label: 'Profil Saya' }
    );
  }

  return menu;
}

function renderChromeUser() {
  const u = state.currentUser;
  if (!u) return;
  document.getElementById('sidebar-role-label').textContent = ROLE_LABELS[u.role] || u.role;
  document.getElementById('topbar-user-name').textContent = u.nama_lengkap;
  document.getElementById('topbar-user-meta').textContent = `${u.npm} · ${ROLE_LABELS[u.role]}`;

  const avatarEl = document.getElementById('topbar-avatar');
  if (u.avatar_url) {
    avatarEl.innerHTML = `<img src="${escapeHtml(u.avatar_url)}" alt="${escapeHtml(u.nama_lengkap)}" />`;
  } else {
    avatarEl.textContent = (u.nama_lengkap || 'R')[0].toUpperCase();
  }

  const unread = getUserNotifications().filter((n) => !n.dibaca).length;
  const notifCountEl = document.getElementById('topbar-notif-count');
  if (unread > 0) {
    notifCountEl.textContent = String(unread);
    notifCountEl.classList.remove('hidden');
  } else {
    notifCountEl.classList.add('hidden');
  }
}

function renderSidebarNav() {
  const nav = document.getElementById('sidebar-nav');
  if (!nav || !state.currentUser) return;
  const items = getNavigationConfig(state.currentUser.role);
  let lastSection = '';
  let html = '';

  for (const item of items) {
    if (item.section !== lastSection) {
      html += `<div class="nav-section-title">${escapeHtml(item.section)}</div>`;
      lastSection = item.section;
    }
    const activeClass = state.activeTab === item.id ? 'active' : '';
    const countHtml = item.count > 0 ? `<span class="nav-count tabular-nums">${item.count}</span>` : '';
    html += `
      <button type="button" class="nav-item ${activeClass}" data-tab="${item.id}">
        <span class="nav-item-left"><span class="nav-item-label">${escapeHtml(item.label)}</span></span>
        ${countHtml}
      </button>
    `;
  }
  nav.innerHTML = html;

  nav.querySelectorAll('.nav-item').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.activeTab = btn.getAttribute('data-tab');
      closeMobileSidebar();
      renderSidebarNav();
      renderActiveTab();
    });
  });
}

function closeMobileSidebar() {
  document.getElementById('app-sidebar')?.classList.remove('open');
  document.getElementById('sidebar-overlay')?.classList.add('hidden');
}

function getUserNotifications() {
  if (!state.currentUser) return [];
  return state.pemberitahuan
    .filter((n) => !n.user_id || n.user_id === state.currentUser.id)
    .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
}

// ----------------------------------------------------------------------------
// 9. ROUTER TAB SPA & RENDERER KONTEN
// ----------------------------------------------------------------------------
function renderActiveTab() {
  const container = document.getElementById('main-content');
  if (!container || !state.currentUser) return;

  // Refresh data user terkini dari state.profiles
  const freshUser = state.profiles.find((p) => p.id === state.currentUser.id);
  if (freshUser) state.currentUser = freshUser;
  const allowedTabIds = new Set(getNavigationConfig(state.currentUser.role).map((m) => m.id));
  if (!allowedTabIds.has(state.activeTab)) {
    state.activeTab = 'dashboard';
    renderSidebarNav();
  }
  renderChromeUser();

  switch (state.activeTab) {
    case 'dashboard':
      container.innerHTML = renderDashboardView();
      bindDashboardEvents();
      break;
    case 'absensi':
      container.innerHTML = renderMahasiswaAbsensiView();
      bindMahasiswaAbsensiEvents();
      break;
    case 'cuti':
      container.innerHTML = renderMahasiswaCutiView();
      bindMahasiswaCutiEvents();
      break;
    case 'kas_mahasiswa':
      container.innerHTML = renderMahasiswaKasView();
      bindMahasiswaKasEvents();
      break;
    case 'pusat_info':
      container.innerHTML = renderPusatInfoView();
      bindPusatInfoEvents();
      break;
    case 'profil':
      container.innerHTML = renderProfilView();
      bindProfilEvents();
      break;
    case 'sesi_absen':
      container.innerHTML = renderBukaSesiView();
      bindBukaSesiEvents();
      break;
    case 'verifikasi_absen':
      container.innerHTML = renderVerifikasiAbsenView();
      bindVerifikasiAbsenEvents();
      break;
    case 'manual_absen':
      container.innerHTML = renderManualAbsenView();
      bindManualAbsenEvents();
      break;
    case 'riwayat_monitoring':
      container.innerHTML = renderRiwayatDanCutiView();
      bindRiwayatDanCutiEvents();
      break;
    case 'saluran_tagihan':
      container.innerHTML = renderSaluranTagihanView();
      bindSaluranTagihanEvents();
      break;
    case 'daftar_pembayaran':
      container.innerHTML = renderDaftarPembayaranView();
      bindDaftarPembayaranEvents();
      break;
    case 'buku_kas':
      container.innerHTML = renderBukuKasView();
      bindBukuKasEvents();
      break;
    case 'monitoring_excel':
      container.innerHTML = renderMonitoringExcelView();
      bindMonitoringExcelEvents();
      break;
    case 'laporan_pdf':
      container.innerHTML = renderLaporanPdfView();
      bindLaporanPdfEvents();
      break;
    case 'monitoring_laporan':
      container.innerHTML = renderMonitoringLaporanView();
      bindMonitoringLaporanEvents();
      break;
    case 'kelola_akun':
      container.innerHTML = renderKelolaAkunView();
      bindKelolaAkunEvents();
      break;
    default:
      container.innerHTML = renderDashboardView();
      bindDashboardEvents();
  }
}

// ----------------------------------------------------------------------------
// 10. VIEW: DASHBOARD (SEMESTER RING, DONUT KEHADIRAN, KAS UMUM, LOG 24 JAM)
// ----------------------------------------------------------------------------
function buildTodayActivities24h() {
  const today = state.currentWibDateKey;
  const u = state.currentUser;
  const role = u?.role || 'mahasiswa';
  const items = [];
  const profileMap = Object.fromEntries(state.profiles.map((p) => [p.id, p]));
  const sesiMap = Object.fromEntries(state.sesiAbsensi.map((s) => [s.id, s]));

  // 1. Sesi absensi yang dibuka hari ini (tampil di Admin & Ketua; aktivitas Admin tidak masuk ke Ketua/Bendahara/Mahasiswa)
  state.sesiAbsensi.forEach((s) => {
    const ts = s.created_at || (s.tanggal ? `${s.tanggal}T08:00:00Z` : '');
    if (!ts) return;
    if (getWibDateKey(new Date(ts)) !== today && s.tanggal !== today) return;
    const openerId = s.dibuka_oleh || s.pj_id;
    const openerRole = profileMap[openerId]?.role;
    const openerName = profileMap[openerId]?.nama_lengkap || s.pj_nama || 'Pengurus';

    if (role === 'admin') {
      items.push({
        ts,
        title: `Absensi · ${s.mata_kuliah}`,
        meta: `Pertemuan ${s.pertemuan_ke} (${s.mode_kuliah || 'Luring'}) · PJ: ${openerName}`,
        tagClass: 'tag-info',
      });
    } else if (role === 'ketua' && openerRole !== 'admin') {
      items.push({
        ts,
        title: `Absensi · ${s.mata_kuliah}`,
        meta: `Pertemuan ${s.pertemuan_ke} (${s.mode_kuliah || 'Luring'}) · PJ: ${openerName}`,
        tagClass: 'tag-info',
      });
    }
  });

  // 2. Aktivitas Absensi (terisolasi per role & tidak membocorkan aksi Admin ke role lain)
  state.absensi.forEach((a) => {
    const ts = a.waktu_kirim || a.created_at;
    if (!ts || getWibDateKey(new Date(ts)) !== today) return;
    const mhs = profileMap[a.user_id]?.nama_lengkap || 'Mahasiswa';
    const mk = sesiMap[a.sesi_id]?.mata_kuliah || 'Perkuliahan';
    const actorId = a.dicatat_oleh || a.pj_id;
    const actorRole = profileMap[actorId]?.role;

    if (isStudentRole(role) || role === 'bendahara') {
      // Mahasiswa & Bendahara hanya melihat pengiriman absensinya sendiri (bukan pencatatan Admin/Ketua)
      if (a.user_id !== u.id || a.is_manual) return;
    } else if (role === 'ketua') {
      // Ketua tidak melihat pencatatan/verifikasi yang dilakukan oleh Admin
      if (actorRole === 'admin') return;
    }

    items.push({
      ts,
      title: `Absensi ${mk} · ${mhs}`,
      meta: `${a.status_kehadiran} · ${a.status_verifikasi}`,
      tagClass: getStatusTagClass(a.status_verifikasi),
    });
  });

  // 3. Aktivitas Pengajuan Cuti hari ini
  state.pengajuanCuti.forEach((c) => {
    const ts = c.waktu_pengajuan || c.created_at;
    if (!ts || getWibDateKey(new Date(ts)) !== today) return;
    const mhs = profileMap[c.user_id]?.nama_lengkap || 'Mahasiswa';
    const reviewerRole = profileMap[c.ditinjau_oleh]?.role;

    if (isStudentRole(role) || role === 'bendahara') {
      if (c.user_id !== u.id) return;
    } else if (role === 'ketua') {
      if (reviewerRole === 'admin' && c.status !== 'Menunggu') return;
    }

    items.push({
      ts,
      title: `Pengajuan Cuti · ${mhs}`,
      meta: `${formatDateDdMmYyyy(c.tanggal_mulai)} s.d. ${formatDateDdMmYyyy(c.tanggal_selesai)} · ${c.status}`,
      tagClass: getStatusTagClass(c.status),
    });
  });

  // 4. Pembayaran Iuran Kas Mahasiswa
  state.iuranKas.forEach((i) => {
    const ts = i.tanggal_bayar || i.created_at;
    if (!ts || getWibDateKey(new Date(ts)) !== today || i.status === 'Belum Lunas') return;
    const mhs = profileMap[i.user_id]?.nama_lengkap || 'Anggota';
    const verifierRole = profileMap[i.verified_by || i.pj_id]?.role;

    if (isStudentRole(role) || role === 'ketua') {
      // Mahasiswa & Ketua hanya melihat pembayaran kas miliknya sendiri (bukan pencatatan kas Admin/Bendahara)
      if (i.user_id !== u.id || i.metode_bayar === 'Tunai / Catatan Kas') return;
    } else if (role === 'bendahara') {
      if (verifierRole === 'admin' && i.user_id !== u.id) return;
    }

    items.push({
      ts,
      title: `Pembayaran Kas ${i.periode} · ${mhs}`,
      meta: `${formatRupiah(i.nominal_dibayar)} · ${i.status}`,
      tagClass: getStatusTagClass(i.status),
    });
  });

  // 5. Catatan Mutasi Kas Transparan (HANYA tampil di Admin & Bendahara; aksi Admin tidak masuk ke Bendahara/Ketua/Mahasiswa)
  if (role === 'admin' || role === 'bendahara') {
    state.transaksiKas.forEach((t) => {
      const ts = t.created_at || `${t.tanggal}T08:00:00Z`;
      if (t.tanggal !== today && getWibDateKey(new Date(ts)) !== today) return;
      const actorId = t.dicatat_oleh || t.pj_id;
      const actorRole = profileMap[actorId]?.role;
      if (role === 'bendahara' && actorRole === 'admin') return;

      items.push({
        ts,
        title: `${t.jenis}: ${t.kategori}`,
        meta: `${t.keterangan} · ${formatRupiah(t.nominal)}`,
        tagClass: getStatusTagClass(t.jenis),
      });
    });
  }

  return items.sort((a, b) => new Date(b.ts) - new Date(a.ts)).slice(0, 8);
}

function renderDashboardView() {
  const u = state.currentUser;
  const cfg = state.pengaturan || {};
  const berjalan = Number(cfg.pertemuan_berjalan ?? 0);
  const totalPertemuan = Math.max(1, Number(cfg.total_pertemuan_semester || 14));
  const semester = Number(cfg.semester_aktif || 3);
  const pctSemester = Math.min(100, Math.round((berjalan / totalPertemuan) * 100));
  const radius = 50;
  const circ = 2 * Math.PI * radius;
  const dashOffset = circ - (pctSemester / 100) * circ;

  // Hitung tunggakan kas pengguna (atau seluruh kelas untuk Bendahara/Admin)
  const myBills = state.iuranKas.filter((i) => i.user_id === u.id && i.status !== 'Lunas');
  const myTunggakanRp = myBills.reduce((sum, i) => sum + Math.max(0, i.nominal_tagihan - i.nominal_dibayar), 0);

  const allUnpaid = state.iuranKas.filter((i) => i.status !== 'Lunas');
  const totalPiutangKelas = allUnpaid.reduce(
    (sum, i) => sum + Math.max(0, i.nominal_tagihan - i.nominal_dibayar),
    0
  );

  // Hitung kas umum kelas
  const totalMasuk = state.transaksiKas
    .filter((t) => t.jenis === 'Pemasukan')
    .reduce((s, t) => s + Number(t.nominal || 0), 0);
  const totalKeluar = state.transaksiKas
    .filter((t) => t.jenis === 'Pengeluaran')
    .reduce((s, t) => s + Number(t.nominal || 0), 0);
  const saldoKas = totalMasuk - totalKeluar;
  const maxCashScale = Math.max(1, totalMasuk, totalKeluar, saldoKas);

  // Hitung persentase kehadiran (untuk Mahasiswa / PJ Matkul: miliknya; untuk Pengurus: seluruh kelas)
  const scopeAbsen = isStudentRole(u.role)
    ? state.absensi.filter((a) => a.user_id === u.id)
    : state.absensi;
  const cntHadir = scopeAbsen.filter((a) => a.status_kehadiran === 'Hadir').length;
  const cntIzin = scopeAbsen.filter((a) => a.status_kehadiran === 'Izin').length;
  const cntSakit = scopeAbsen.filter((a) => a.status_kehadiran === 'Sakit').length;
  const cntAlpha = scopeAbsen.filter(
    (a) => a.status_kehadiran === 'Alpha' || a.status_kehadiran === 'Belum Absen!'
  ).length;
  const totalAbs = Math.max(1, cntHadir + cntIzin + cntSakit + cntAlpha);

  const segs = [
    { label: 'Hadir', count: cntHadir, color: '#22c55e' },
    { label: 'Izin', count: cntIzin, color: '#00d4ff' },
    { label: 'Sakit', count: cntSakit, color: '#ff7b00' },
    { label: 'Alpha / Belum', count: cntAlpha, color: '#ef4444' },
  ];

  // Bangun SVG Donut Multi-Segmen
  const rDonut = 52;
  const cDonut = 2 * Math.PI * rDonut;
  let accOffset = 0;
  const donutArcs =
    cntHadir + cntIzin + cntSakit + cntAlpha === 0
      ? `<circle cx="74" cy="74" r="${rDonut}" fill="none" stroke="var(--track-ring)" stroke-width="18"></circle>`
      : segs
          .map((s) => {
            const len = (s.count / totalAbs) * cDonut;
            const arc = `<circle cx="74" cy="74" r="${rDonut}" fill="none" stroke="${s.color}" stroke-width="18" stroke-dasharray="${len} ${cDonut - len}" stroke-dashoffset="${-accOffset}" transform="rotate(-90 74 74)"></circle>`;
            accOffset += len;
            return arc;
          })
          .join('');

  const activities = buildTodayActivities24h();
  const activeSessionsList = state.sesiAbsensi.filter(
    (s) => s.is_active && new Date(s.batas_waktu).getTime() > Date.now()
  );
  const activeSessionsCount = activeSessionsList.length;
  const activeSessionCourseNames = activeSessionsList.map(
    (s) => `${s.mata_kuliah || 'Mata Kuliah'}${s.pertemuan_ke ? ` (Pert. ${s.pertemuan_ke})` : ''}`
  );

  const myPjCourses =
    u.role === 'pj_matkul'
      ? Array.from(
          new Set(
            state.sesiAbsensi
              .filter(
                (s) =>
                  s.pj_matkul_id === u.id ||
                  s.pj_matkul_nama === u.nama_lengkap ||
                  s.pj_id === u.id ||
                  s.pj_nama === u.nama_lengkap
              )
              .map((s) => s.mata_kuliah)
              .filter(Boolean)
          )
        )
      : [];

  return `
    <div class="page-header">
      <div>
        <span class="meta-line">Aktivitas Kelas RS · Pusat Absensi &amp; Kas Kelas ${escapeHtml(cfg.nama_kelas || 'R3S')}</span>
        <h2>
          Dashboard ${escapeHtml(ROLE_LABELS[u.role] || u.role)}
          ${
            u.role === 'pj_matkul'
              ? '<span class="status-tag tag-pj-matkul" style="margin-left:8px;vertical-align:middle;">Penanda PJ Mata Kuliah</span>'
              : ''
          }
        </h2>
        ${
          u.role === 'pj_matkul'
            ? `<div class="meta-line" style="margin-top:4px;color:var(--pj-matkul-text);">
                Anda ditandai sebagai <strong>Penanggung Jawab Mata Kuliah</strong>${
                  myPjCourses.length ? ` (${escapeHtml(myPjCourses.join(', '))})` : ''
                }.
              </div>`
            : ''
        }
      </div>
      <span class="meta-line tabular-nums">Pembaruan catatan harian WIB: ${escapeHtml(state.currentWibDateKey)}</span>
    </div>

    <div class="grid-kpi">
      <div class="card glass-panel">
        <span class="meta-line">Pertemuan Berjalan</span>
        <div class="kpi-value">${berjalan}/${totalPertemuan}</div>
        <div class="kpi-sub">Progres Semester ${semester} (${pctSemester}%)</div>
      </div>

      <div class="card glass-panel">
        <span class="meta-line">${isStudentRole(u.role) ? 'Sisa Tunggakan Kas Anda' : 'Total Piutang Kas Kelas'}</span>
        <div class="kpi-value">${formatRupiah(isStudentRole(u.role) ? myTunggakanRp : totalPiutangKelas)}</div>
        <div class="kpi-sub tabular-nums">${isStudentRole(u.role) ? `${myBills.length} periode belum lunas` : `${allUnpaid.length} tagihan belum lunas`}</div>
      </div>

      <div class="card glass-panel">
        <span class="meta-line">Saldo Kas Umum Kelas</span>
        <div class="kpi-value text-cyan">${formatRupiah(saldoKas)}</div>
        <div class="kpi-sub">Transparansi pemasukan &amp; pengeluaran</div>
      </div>

      <div class="card glass-panel">
        <span class="meta-line">Sesi Absensi Aktif</span>
        <div class="kpi-value">${activeSessionsCount} Mata Kuliah</div>
        <div class="kpi-sub" style="color:var(--accent-cyan);font-weight:600;margin-top:6px;">
          ${
            activeSessionCourseNames.length > 0
              ? `Mata Kuliah: ${escapeHtml(activeSessionCourseNames.join(', '))}`
              : 'Belum ada mata kuliah yang sedang berlangsung'
          }
        </div>
        <div class="kpi-sub" style="margin-top:4px;">Total anggota terdaftar: ${state.profiles.filter((p) => isStudentRole(p.role)).length} mahasiswa</div>
      </div>
    </div>

    <div class="grid-2">
      <!-- Diagram Lingkaran Semester -->
      <div class="card glass-panel">
        <div class="card-header">
          <div>
            <h3>Diagram Lingkaran Semester</h3>
            <span class="meta-line">Progres pertemuan semester berjalan</span>
          </div>
          <span class="status-tag tag-warning tabular-nums">${berjalan}/${totalPertemuan} Pertemuan</span>
        </div>
        <div class="ring-widget-wrap">
          <svg class="semester-ring-svg" viewBox="0 0 132 132" aria-label="Diagram progres semester">
            <circle cx="66" cy="66" r="${radius}" fill="none" stroke="var(--track-ring)" stroke-width="12"></circle>
            <circle
              cx="66"
              cy="66"
              r="${radius}"
              fill="none"
              stroke="var(--amber-semester)"
              stroke-width="12"
              stroke-linecap="round"
              stroke-dasharray="${circ}"
              stroke-dashoffset="${dashOffset}"
              transform="rotate(-90 66 66)"
            ></circle>
            <text x="66" y="60" text-anchor="middle" fill="var(--text-muted)" font-size="11" font-family="DM Sans">Semester</text>
            <text x="66" y="84" text-anchor="middle" fill="var(--text-primary)" font-size="26" font-weight="700" font-family="JetBrains Mono">${semester}</text>
          </svg>
          <div class="legend-list">
            <div class="legend-row">
              <span class="legend-label">Pertemuan Terlaksana</span>
              <strong class="tabular-nums">${berjalan} Pertemuan</strong>
            </div>
            <div class="legend-row">
              <span class="legend-label">Target Semester</span>
              <strong class="tabular-nums">${totalPertemuan} Pertemuan</strong>
            </div>
            <div class="legend-row">
              <span class="legend-label">Persentase Berjalan</span>
              <strong class="tabular-nums text-warning">${pctSemester}%</strong>
            </div>
          </div>
        </div>
      </div>

      <!-- Diagram Persentase Kehadiran -->
      <div class="card glass-panel">
        <div class="card-header">
          <div>
            <h3>Diagram Persentase Kehadiran</h3>
            <span class="meta-line">${isStudentRole(u.role) ? 'Rekap pribadi Anda' : 'Akumulasi seluruh mahasiswa'}</span>
          </div>
          <span class="status-tag tag-info tabular-nums">${cntHadir + cntIzin + cntSakit + cntAlpha} Catatan</span>
        </div>
        <div class="ring-widget-wrap">
          <svg class="donut-svg" viewBox="0 0 148 148" aria-label="Diagram persentase kehadiran">
            ${donutArcs}
            <text x="74" y="70" text-anchor="middle" fill="var(--text-muted)" font-size="11" font-family="DM Sans">Hadir</text>
            <text x="74" y="90" text-anchor="middle" fill="var(--text-primary)" font-size="20" font-weight="700" font-family="JetBrains Mono">
              ${cntHadir + cntIzin + cntSakit + cntAlpha === 0 ? '0%' : `${Math.round((cntHadir / totalAbs) * 100)}%`}
            </text>
          </svg>
          <div class="legend-list">
            ${segs
              .map(
                (s) => `
              <div class="legend-row">
                <span class="legend-label">
                  <span class="legend-swatch" style="background:${s.color}"></span>
                  ${s.label}
                </span>
                <strong class="tabular-nums">${s.count} (${cntHadir + cntIzin + cntSakit + cntAlpha === 0 ? 0 : Math.round((s.count / totalAbs) * 100)}%)</strong>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      </div>
    </div>

    <div class="grid-2 grid-2-start">
      <!-- Grafik Transparansi Kas Umum -->
      <div class="card glass-panel">
        <div class="card-header">
          <div>
            <h3>Grafik Transparansi Kas Umum</h3>
            <span class="meta-line">Arus kas kelas yang terbuka bagi seluruh anggota</span>
          </div>
          <strong class="tabular-nums text-cyan">${formatRupiah(saldoKas)}</strong>
        </div>
        <div class="cash-bars">
          <div class="cash-bar-item">
            <div class="cash-bar-top">
              <span>Total Pemasukan Kas</span>
              <strong class="tabular-nums text-success">${formatRupiah(totalMasuk)}</strong>
            </div>
            <div class="cash-bar-track">
              <div class="cash-bar-fill" style="width:${Math.round((totalMasuk / maxCashScale) * 100)}%; background:#22c55e;"></div>
            </div>
          </div>

          <div class="cash-bar-item">
            <div class="cash-bar-top">
              <span>Total Pengeluaran Kas</span>
              <strong class="tabular-nums text-danger">${formatRupiah(totalKeluar)}</strong>
            </div>
            <div class="cash-bar-track">
              <div class="cash-bar-fill" style="width:${Math.round((totalKeluar / maxCashScale) * 100)}%; background:#ef4444;"></div>
            </div>
          </div>

          <div class="cash-bar-item">
            <div class="cash-bar-top">
              <span>Saldo Bersih Tersedia</span>
              <strong class="tabular-nums text-cyan">${formatRupiah(saldoKas)}</strong>
            </div>
            <div class="cash-bar-track">
              <div class="cash-bar-fill" style="width:${Math.max(0, Math.round((saldoKas / maxCashScale) * 100))}%; background:linear-gradient(90deg,#00d4ff,#0077ff);"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Aktivitas Terbaru (Pembaruan Otomatis 24 Jam WIB) -->
      <div class="card glass-panel">
        <div class="card-header">
          <div>
            <h3>Aktivitas Terbaru (24 Jam)</h3>
            <span class="meta-line">Diperbarui otomatis setiap pergantian hari pukul 00:00 WIB</span>
          </div>
          <span class="meta-line tabular-nums">${activities.length} aktivitas</span>
        </div>
        <div class="activity-list activity-scroll-5">
          ${
            activities.length === 0
              ? '<p class="meta-line">Belum ada aktivitas tercatat hari ini (WIB).</p>'
              : activities
                  .map(
                    (act) => `
              <div class="activity-item">
                <div>
                  <div class="activity-title">${escapeHtml(act.title)}</div>
                  <div class="meta-line">${escapeHtml(act.meta)}</div>
                </div>
                <div class="activity-time">${escapeHtml(formatWibShort(act.ts).split('·')[1] || '')}</div>
              </div>
            `
                  )
                  .join('')
          }
        </div>
      </div>
    </div>

    ${u.role === 'admin' || u.role === 'ketua' ? renderStudentAttendanceDiagramSection() : ''}
    ${u.role === 'admin' || u.role === 'bendahara' ? renderStudentKasDiagramSection() : ''}
  `;
}

function bindDashboardEvents() {
  document.querySelectorAll('.btn-dash-nav').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.activeTab = btn.getAttribute('data-tab');
      renderSidebarNav();
      renderActiveTab();
    });
  });
  bindStudentDiagramEvents();
}

// ----------------------------------------------------------------------------
// 11. KAMERA LANGSUNG + GPS + WATERMARK CANVAS (SELF & MANUAL PJ)
// ----------------------------------------------------------------------------
function syncCameraOrientationUi() {
  const videoEl = document.getElementById('camera-video');
  const labelEl = document.getElementById('camera-orientation-label');
  const controlsEl = document.getElementById('camera-orientation-controls');
  const flipBtn = document.getElementById('btn-flip-camera');
  const switchBtn = document.getElementById('btn-switch-camera');

  const isCameraActiveView = state.cameraMode !== 'daring' || state.daringUseCamera;
  if (controlsEl) {
    controlsEl.classList.toggle('hidden', !isCameraActiveView);
  }
  if (videoEl) {
    videoEl.classList.toggle('cam-flipped', Boolean(state.cameraFlipHorizontal));
  }
  const facingText = state.cameraFacingMode === 'environment' ? 'Belakang' : 'Depan';
  const flipText = state.cameraFlipHorizontal ? 'Dibalik Horizontal' : 'Normal (Tanpa Pencerminan)';
  if (labelEl) {
    labelEl.textContent = `Kamera ${facingText} · ${flipText}`;
  }
  if (flipBtn) {
    flipBtn.textContent = state.cameraFlipHorizontal
      ? 'Kembalikan Normal'
      : 'Balik Horizontal (Jika Terbalik)';
  }
  if (switchBtn) {
    switchBtn.textContent =
      state.cameraFacingMode === 'environment'
        ? 'Pakai Kamera Depan'
        : 'Ganti Kamera (Depan/Belakang)';
  }
}

function openAttendanceCameraModal(mode, context) {
  state.cameraMode = mode;
  state.cameraContext = context;
  state.cameraFacingMode = 'user';
  state.cameraFlipHorizontal = false;
  state.daringUseCamera = false;
  state.daringImageFile = null;
  state.gpsCoords = null;
  state.capturedBlob = null;
  state.capturedPreviewUrl = '';

  const modal = document.getElementById('modal-camera');
  const titleEl = document.getElementById('modal-camera-title');
  const subEl = document.getElementById('modal-camera-subtitle');
  const videoEl = document.getElementById('camera-video');
  const previewEl = document.getElementById('captured-preview');
  const daringPlaceholder = document.getElementById('daring-stage-placeholder');
  const warnEl = document.getElementById('camera-permission-warning');
  const warnDescEl = document.getElementById('camera-permission-warning-desc');
  const gpsEl = document.getElementById('camera-gps-status');

  const isDaring = mode === 'daring';
  titleEl.textContent =
    mode === 'manual_pj'
      ? 'Bukti Kamera Penanggung Jawab (Anti-Kecurangan)'
      : isDaring
      ? `Absen Daring Waktu Nyata · ${context.mata_kuliah}`
      : `Absensi Langsung · ${context.mata_kuliah}`;
  subEl.textContent =
    mode === 'manual_pj'
      ? `Mengambil foto wajah Penanggung Jawab (${state.currentUser.nama_lengkap}) + GPS untuk absen manual ${context.studentName}.`
      : isDaring
      ? `Kirim bukti foto saat sedang daring dan pastikan lokasi GPS tetap menyala · Dosen: ${context.dosen} · Pertemuan ke-${context.pertemuan_ke}`
      : `Orientasi Kamera Normal (Tanpa Pencerminan) · Dosen: ${context.dosen} · Pertemuan ke-${context.pertemuan_ke}`;

  const daringPanel = document.getElementById('camera-daring-panel');
  const daringFileInput = document.getElementById('daring-bukti-file');
  const daringCamBtn = document.getElementById('btn-daring-use-camera');
  if (daringPanel) {
    daringPanel.classList.toggle('hidden', !isDaring);
    const catatanEl = document.getElementById('daring-catatan');
    if (catatanEl) catatanEl.value = '';
    if (daringFileInput) daringFileInput.value = '';
    if (daringCamBtn) daringCamBtn.textContent = 'Atau Ambil Dari Kamera';
  }

  videoEl.classList.toggle('hidden', isDaring);
  previewEl.classList.add('hidden');
  if (daringPlaceholder) daringPlaceholder.classList.toggle('hidden', !isDaring);
  warnEl.classList.add('hidden');
  if (warnDescEl) {
    warnDescEl.innerHTML = isDaring
      ? 'Sistem mendeteksi akses lokasi GPS ditolak atau belum aktif. Saat absen daring, <strong>lokasi GPS wajib tetap menyala</strong>. Status absensi otomatis dicatat <strong>Belum Absen!</strong>.'
      : 'Sistem mendeteksi akses kamera atau lokasi tidak diizinkan. Status absensi akan otomatis tercatat sebagai <strong>Belum Absen!</strong>.';
  }

  document.getElementById('btn-capture-photo').classList.toggle('hidden', isDaring);
  document.getElementById('btn-retake-photo').classList.add('hidden');
  document.getElementById('btn-submit-attendance').classList.add('hidden');
  gpsEl.textContent = 'Meminta izin & koordinat GPS...';
  syncCameraOrientationUi();

  modal.classList.remove('hidden');
  initCameraAndGpsStreams({ needCamera: !isDaring });
}

async function initCameraAndGpsStreams(opts = { needCamera: true }) {
  const needCamera = opts?.needCamera !== false;
  const videoEl = document.getElementById('camera-video');
  const warnEl = document.getElementById('camera-permission-warning');
  const gpsEl = document.getElementById('camera-gps-status');

  stopCameraStream();

  // 1. Minta izin Kamera Langsung jika dibutuhkan (Non-Mirror)
  let cameraGranted = !needCamera;
  if (needCamera) {
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error('Browser tidak mendukung akses kamera.');
      }
      const preferredFacing = state.cameraFacingMode || 'user';
      try {
        state.cameraStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: preferredFacing, width: { ideal: 960 }, height: { ideal: 720 } },
          audio: false,
        });
      } catch {
        state.cameraStream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 960 }, height: { ideal: 720 } },
          audio: false,
        });
        state.cameraFacingMode = 'user';
      }
      videoEl.srcObject = state.cameraStream;
      cameraGranted = true;
      syncCameraOrientationUi();
    } catch {
      cameraGranted = false;
    }
  }

  // 2. Minta izin GPS Geolocation + watchPosition agar lokasi GPS tetap menyala & akurat
  let gpsGranted = false;
  const applyCoords = (coords) => {
    state.gpsCoords = {
      lat: coords.latitude,
      lng: coords.longitude,
      accuracy: coords.accuracy ?? null,
    };
    const accText =
      state.gpsCoords.accuracy != null ? ` (±${Math.round(state.gpsCoords.accuracy)}m)` : '';
    gpsEl.textContent = `${state.gpsCoords.lat.toFixed(6)}, ${state.gpsCoords.lng.toFixed(6)}${accText}`;
  };

  try {
    const pos = await new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('GPS tidak didukung'));
        return;
      }
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      });
    });
    applyCoords(pos.coords);
    gpsGranted = true;

    if (navigator.geolocation.watchPosition) {
      state.gpsWatchId = navigator.geolocation.watchPosition(
        (updated) => applyCoords(updated.coords),
        () => {},
        { enableHighAccuracy: true, maximumAge: 5000 }
      );
    }
  } catch {
    gpsGranted = false;
    gpsEl.textContent = 'Akses lokasi ditolak / tidak tersedia';
  }

  // Jika kamera (saat mode kamera) ATAU GPS ditolak, gagalkan & catat otomatis "Belum Absen!"
  if (!cameraGranted || !gpsGranted) {
    warnEl.classList.remove('hidden');
    document.getElementById('btn-capture-photo').disabled = true;
    showToast(
      needCamera
        ? 'Izin kamera atau lokasi GPS ditolak! Status absensi otomatis dicatat "Belum Absen!".'
        : 'Lokasi GPS wajib menyala saat absen daring! Status absensi dicatat "Belum Absen!".',
      'danger'
    );
    if ((state.cameraMode === 'self' || state.cameraMode === 'daring') && state.cameraContext?.sesiId) {
      await recordDeniedPermissionStatus(state.cameraContext.sesiId);
    }
  } else {
    document.getElementById('btn-capture-photo').disabled = false;
    if (state.cameraMode === 'daring' && state.daringImageFile && !state.daringUseCamera) {
      await processDaringImageFile(state.daringImageFile);
    }
  }
}

async function recordDeniedPermissionStatus(sesiId) {
  try {
    await db.upsert(
      'absensi',
      {
        sesi_id: sesiId,
        user_id: state.currentUser.id,
        status_kehadiran: 'Belum Absen!',
        status_verifikasi: 'Belum Absen!',
        foto_url: '',
        latitude: state.gpsCoords?.lat ?? null,
        longitude: state.gpsCoords?.lng ?? null,
        waktu_kirim: new Date().toISOString(),
        pj_id: null,
        pj_nama: '',
        is_manual: false,
        catatan: 'Izin kamera atau GPS ditolak oleh perangkat pengguna.',
      },
      'sesi_id,user_id'
    );
    await db.loadAll();
    renderActiveTab();
  } catch (err) {
    console.error(err);
  }
}

function drawWatermarkedSourceToCanvas(sourceEl, srcW, srcH) {
  const canvas = document.getElementById('watermark-canvas');
  const previewEl = document.getElementById('captured-preview');
  const videoEl = document.getElementById('camera-video');
  const daringPlaceholder = document.getElementById('daring-stage-placeholder');

  const maxSide = 1280;
  const scale = Math.min(1, maxSide / Math.max(1, srcW, srcH));
  const w = Math.max(320, Math.round(srcW * scale));
  const h = Math.max(240, Math.round(srcH * scale));
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');

  // Gambar sumber video/gambar (terapkan balik horizontal hanya jika pengguna mengaktifkan opsi flip)
  const shouldFlip =
    (state.cameraMode !== 'daring' || state.daringUseCamera) && state.cameraFlipHorizontal;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  if (shouldFlip) {
    ctx.save();
    ctx.translate(w, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(sourceEl, 0, 0, w, h);
    ctx.restore();
  } else {
    ctx.drawImage(sourceEl, 0, 0, w, h);
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  // Scrim gelap bawah untuk keterbacaan watermark permanen
  const barH = Math.max(94, Math.round(h * 0.22));
  ctx.fillStyle = 'rgba(3, 19, 43, 0.84)';
  ctx.fillRect(0, h - barH, w, barH);

  ctx.strokeStyle = 'rgba(0, 212, 255, 0.75)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, h - barH);
  ctx.lineTo(w, h - barH);
  ctx.stroke();

  const fontBase = Math.max(14, Math.round(w * 0.024));
  const padX = Math.round(w * 0.03);
  const startY = h - barH + fontBase + 10;
  const u = state.currentUser;

  ctx.fillStyle = '#00d4ff';
  ctx.font = `700 ${fontBase}px "Plus Jakarta Sans", sans-serif`;
  const daringPlat = document.getElementById('daring-platform')?.value || 'Daring';
  const line1 =
    state.cameraMode === 'manual_pj'
      ? `Kelas R3S | PJ: ${state.cameraContext.pjNama || u.nama_lengkap} -> ${state.cameraContext.studentName} (${state.cameraContext.statusKehadiran})`
      : state.cameraMode === 'daring'
      ? `ABSENSI WAKTU NYATA DARING (${daringPlat}) | ${u.nama_lengkap} (${u.npm})`
      : `Kelas R3S | ${u.nama_lengkap} (${u.npm})`;
  ctx.fillText(line1, padX, startY);

  ctx.fillStyle = '#f0f8ff';
  ctx.font = `500 ${Math.round(fontBase * 0.9)}px "JetBrains Mono", monospace`;
  ctx.fillText(formatWibClock(new Date()), padX, startY + fontBase * 1.45);
  ctx.fillText(
    `GPS: ${state.gpsCoords.lat.toFixed(6)}, ${state.gpsCoords.lng.toFixed(6)}`,
    padX,
    startY + fontBase * 2.8
  );

  canvas.toBlob(
    (blob) => {
      if (!blob) return;
      state.capturedBlob = blob;
      state.capturedPreviewUrl = URL.createObjectURL(blob);
      previewEl.src = state.capturedPreviewUrl;
      videoEl.classList.add('hidden');
      if (daringPlaceholder) daringPlaceholder.classList.add('hidden');
      previewEl.classList.remove('hidden');
      document.getElementById('btn-capture-photo').classList.add('hidden');
      document.getElementById('btn-retake-photo').classList.remove('hidden');
      document.getElementById('btn-submit-attendance').classList.remove('hidden');
    },
    'image/jpeg',
    0.78
  );
}

function captureWatermarkedPhoto() {
  const videoEl = document.getElementById('camera-video');
  if (!state.cameraStream || !state.gpsCoords) {
    showToast('Kamera dan GPS aktif wajib tersedia sebelum mengambil foto.', 'danger');
    return;
  }
  const w = videoEl.videoWidth || 800;
  const h = videoEl.videoHeight || 600;
  drawWatermarkedSourceToCanvas(videoEl, w, h);
}

async function processDaringImageFile(file) {
  if (!file) return;
  state.daringImageFile = file;
  if (!state.gpsCoords) {
    showToast('Menunggu kunci lokasi GPS aktif sebelum menempelkan stempel waktu bukti daring...', 'warning');
    return;
  }
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.onload = () => {
    drawWatermarkedSourceToCanvas(img, img.naturalWidth || 960, img.naturalHeight || 720);
    URL.revokeObjectURL(url);
  };
  img.onerror = () => {
    URL.revokeObjectURL(url);
    showToast('Gagal membaca berkas gambar bukti daring.', 'danger');
  };
  img.src = url;
}

function retakeWatermarkedPhoto() {
  state.capturedBlob = null;
  const videoEl = document.getElementById('camera-video');
  const previewEl = document.getElementById('captured-preview');
  const daringPlaceholder = document.getElementById('daring-stage-placeholder');
  const isDaringUploadOnly = state.cameraMode === 'daring' && !state.daringUseCamera;

  previewEl.classList.add('hidden');
  document.getElementById('btn-retake-photo').classList.add('hidden');
  document.getElementById('btn-submit-attendance').classList.add('hidden');

  if (isDaringUploadOnly) {
    videoEl.classList.add('hidden');
    if (daringPlaceholder) daringPlaceholder.classList.remove('hidden');
    document.getElementById('btn-capture-photo').classList.add('hidden');
    const fileInput = document.getElementById('daring-bukti-file');
    if (fileInput) fileInput.value = '';
    state.daringImageFile = null;
  } else {
    if (daringPlaceholder) daringPlaceholder.classList.add('hidden');
    videoEl.classList.remove('hidden');
    document.getElementById('btn-capture-photo').classList.remove('hidden');
  }
}

async function submitCapturedAttendance() {
  if (!state.capturedBlob || !state.gpsCoords) {
    showToast('Ambil foto bukti terlebih dahulu.', 'warning');
    return;
  }
  const btn = document.getElementById('btn-submit-attendance');
  btn.disabled = true;
  btn.textContent = 'Mengirim...';

  try {
    const fotoUrl = await db.uploadFile(
      state.capturedBlob,
      state.cameraMode === 'manual_pj' ? 'absen_manual_pj' : 'absen_mahasiswa'
    );

    if (state.cameraMode === 'self' || state.cameraMode === 'daring') {
      const sesi = state.sesiAbsensi.find((s) => s.id === state.cameraContext.sesiId);
      const isDaring = state.cameraMode === 'daring';
      const platform = document.getElementById('daring-platform')?.value || 'Zoom Meeting';
      const noteExtra = document.getElementById('daring-catatan')?.value.trim() || '';
      const catatanFinal = isDaring
        ? `[Daring Real-Time · ${platform}]${noteExtra ? ' ' + noteExtra : ''}`
        : '';

      await db.upsert(
        'absensi',
        {
          sesi_id: state.cameraContext.sesiId,
          user_id: state.currentUser.id,
          status_kehadiran: 'Hadir',
          status_verifikasi: 'Menunggu',
          foto_url: fotoUrl,
          latitude: state.gpsCoords.lat,
          longitude: state.gpsCoords.lng,
          waktu_kirim: new Date().toISOString(),
          pj_id: sesi?.pj_id || null,
          pj_nama: sesi?.pj_nama || '',
          mode_absen: isDaring ? 'Daring' : 'Luring',
          is_manual: false,
          catatan: catatanFinal,
        },
        'sesi_id,user_id'
      );

      const matkulLabel = sesi?.mata_kuliah || state.cameraContext.mata_kuliah || 'Perkuliahan';
      const pertLabel = sesi?.pertemuan_ke || state.cameraContext.pertemuan_ke || '-';
      const notifItems = [
        {
          user_id: state.currentUser.id,
          judul: 'Absensi Berhasil Dikirim',
          pesan: `Absensi ${isDaring ? `Daring (${platform})` : 'Luring Kamera + GPS'} untuk ${matkulLabel} (Pertemuan ke-${pertLabel}) telah dikirim. Menunggu persetujuan Ketua/Admin.`,
          tipe: 'info',
        },
      ];
      getUserIdsByRoles(['ketua', 'admin']).forEach((targetId) => {
        if (targetId === state.currentUser.id) return;
        notifItems.push({
          user_id: targetId,
          judul: 'Absensi Mahasiswa Masuk',
          pesan: `${state.currentUser.nama_lengkap} (${state.currentUser.npm}) mengirim absensi ${isDaring ? 'Daring' : 'Luring'} · ${matkulLabel} (Pertemuan ke-${pertLabel}).`,
          tipe: 'info',
        });
      });
      await emitNotifications(notifItems);

      showToast(
        isDaring
          ? `Absen Daring Waktu Nyata (${platform}) terkirim! Menunggu persetujuan Ketua/Admin maksimal 1x24 jam.`
          : 'Absensi terkirim! Status: Menunggu persetujuan Ketua/Admin maksimal 1x24 jam. Jika belum berubah, silakan buat laporan di Pusat Informasi.',
        'success'
      );
    } else {
      const ctx = state.cameraContext;
      await db.upsert(
        'absensi',
        {
          sesi_id: ctx.sesiId,
          user_id: ctx.studentId,
          status_kehadiran: ctx.statusKehadiran,
          status_verifikasi: 'Disetujui',
          foto_url: fotoUrl,
          latitude: state.gpsCoords.lat,
          longitude: state.gpsCoords.lng,
          waktu_kirim: new Date().toISOString(),
          pj_id: ctx.pjId || state.currentUser.id,
          pj_nama: ctx.pjNama || state.currentUser.nama_lengkap,
          dicatat_oleh: state.currentUser.id,
          is_manual: true,
          catatan: ctx.catatan || 'Dicatat manual oleh Penanggung Jawab dengan foto & GPS.',
        },
        'sesi_id,user_id'
      );
      showToast(`Absensi manual untuk ${ctx.studentName} berhasil disimpan!`, 'success');
    }

    await db.loadAll();
    closeModal('modal-camera');
    renderSidebarNav();
    renderActiveTab();
  } catch (err) {
    showToast(err.message || 'Gagal mengirim absensi.', 'danger');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Kirim Absensi Sekarang';
  }
}

function stopCameraStream() {
  if (state.cameraStream) {
    state.cameraStream.getTracks().forEach((t) => t.stop());
    state.cameraStream = null;
  }
  if (state.gpsWatchId != null && navigator.geolocation?.clearWatch) {
    navigator.geolocation.clearWatch(state.gpsWatchId);
    state.gpsWatchId = null;
  }
}

function buildOsmEmbedUrl(lat, lng) {
  const delta = 0.0035;
  const minLon = (Number(lng) - delta).toFixed(6);
  const minLat = (Number(lat) - delta).toFixed(6);
  const maxLon = (Number(lng) + delta).toFixed(6);
  const maxLat = (Number(lat) + delta).toFixed(6);
  return `https://www.openstreetmap.org/export/embed.html?bbox=${minLon}%2C${minLat}%2C${maxLon}%2C${maxLat}&layer=mapnik&marker=${Number(lat).toFixed(6)}%2C${Number(lng).toFixed(6)}`;
}

function renderGpsTriggerButton(absen) {
  if (absen?.latitude == null || absen?.longitude == null) {
    return '<span class="meta-line">Tanpa koordinat GPS</span>';
  }
  const lat = Number(absen.latitude).toFixed(5);
  const lng = Number(absen.longitude).toFixed(5);
  return `
    <button type="button" class="gps-link-btn btn-open-gps-map" data-absen-id="${absen.id}" title="Klik untuk melihat posisi mahasiswa di peta">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
      <span>${lat}, ${lng}</span>
    </button>
  `;
}

function openGpsMapModal(absenId) {
  const absen = state.absensi.find((a) => a.id === absenId);
  if (!absen || absen.latitude == null || absen.longitude == null) {
    showToast('Koordinat GPS tidak tersedia pada catatan ini.', 'warning');
    return;
  }
  const mhs = state.profiles.find((p) => p.id === absen.user_id);
  const sesi = state.sesiAbsensi.find((s) => s.id === absen.sesi_id);
  const lat = Number(absen.latitude);
  const lng = Number(absen.longitude);
  const coordStr = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;

  document.getElementById('gps-map-title').textContent = `Posisi GPS · ${mhs?.nama_lengkap || 'Mahasiswa'}`;
  document.getElementById('gps-map-subtitle').textContent = `${mhs?.npm || '-'} · ${sesi?.mata_kuliah || 'Perkuliahan'} · ${formatWibShort(absen.waktu_kirim)}`;
  document.getElementById('gps-map-coords').textContent = coordStr;
  document.getElementById('gps-map-iframe').src = buildOsmEmbedUrl(lat, lng);
  document.getElementById('gps-map-gmaps-link').href = `https://www.google.com/maps?q=${lat},${lng}`;
  document.getElementById('modal-gps-map').classList.remove('hidden');
}

function bindGpsMapButtons() {
  document.querySelectorAll('.btn-open-gps-map').forEach((btn) => {
    btn.addEventListener('click', () => {
      openGpsMapModal(btn.getAttribute('data-absen-id'));
    });
  });
}

function isDaringAttendanceRecord(absen) {
  if (!absen) return false;
  return (
    absen.mode_absen === 'Daring' ||
    String(absen.catatan || '').includes('[Daring Real-Time')
  );
}

function openDetailAbsenModal(absenId, sesiId) {
  const sesi = state.sesiAbsensi.find((s) => s.id === sesiId);
  const absen = state.absensi.find((a) => a.id === absenId);
  const mhs = absen ? state.profiles.find((p) => p.id === absen.user_id) : state.currentUser;

  document.getElementById('detail-absen-subtitle').textContent = sesi
    ? `${sesi.mata_kuliah} · Pertemuan ke-${sesi.pertemuan_ke}`
    : 'Detail Kehadiran';

  const hasCoords = absen?.latitude != null && absen?.longitude != null;
  const gpsText = hasCoords
    ? `${Number(absen.latitude).toFixed(6)}, ${Number(absen.longitude).toFixed(6)}`
    : 'Tidak tersedia';

  const mapsLink = hasCoords
    ? `<a href="https://www.google.com/maps?q=${absen.latitude},${absen.longitude}" target="_blank" rel="noopener noreferrer">Buka di Google Maps</a>`
    : '';

  const modeLabel = absen?.is_manual
    ? 'Manual oleh PJ'
    : isDaringAttendanceRecord(absen)
    ? 'Absensi Waktu Nyata Daring'
    : 'Absensi Kamera + GPS (Luring)';
  const pjCatatan = absen?.pj_nama || sesi?.pj_nama || 'Menunggu Penetapan PJ';

  document.getElementById('detail-absen-body').innerHTML = `
    ${
      absen?.foto_url
        ? `<img src="${escapeHtml(absen.foto_url)}" class="lightbox-img" style="width:100%;max-height:300px;object-fit:contain;" alt="Foto Penanda Waktu Absensi" />`
        : '<div class="payment-channel-box text-center"><span class="meta-line">Tidak ada lampiran foto pada catatan ini.</span></div>'
    }
    <div class="detail-kv-grid">
      <div class="detail-kv-item">
        <span class="meta-line">Mahasiswa</span>
        <strong>${escapeHtml(mhs?.nama_lengkap || '-')} (${escapeHtml(mhs?.npm || '-')})</strong>
      </div>
      <div class="detail-kv-item">
        <span class="meta-line">Dosen Pengampu</span>
        <strong>${escapeHtml(sesi?.dosen || '-')}</strong>
      </div>
      <div class="detail-kv-item">
        <span class="meta-line">Waktu Kirim (WIB)</span>
        <strong class="tabular-nums">${escapeHtml(formatWibShort(absen?.waktu_kirim))}</strong>
      </div>
      <div class="detail-kv-item">
        <span class="meta-line">Mode Kehadiran</span>
        <strong>${escapeHtml(modeLabel)}</strong>
      </div>
      <div class="detail-kv-item">
        <span class="meta-line">Koordinat GPS</span>
        <strong class="tabular-nums">${escapeHtml(gpsText)}</strong>
        <div>${mapsLink}</div>
      </div>
      <div class="detail-kv-item">
        <span class="meta-line">Status Kehadiran &amp; Verifikasi</span>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px;">
          <span class="status-tag ${getStatusTagClass(absen?.status_kehadiran)}">${escapeHtml(absen?.status_kehadiran || 'Belum Absen!')}</span>
          <span class="status-tag ${getStatusTagClass(absen?.status_verifikasi)}">${escapeHtml(absen?.status_verifikasi || '-')}</span>
        </div>
      </div>
      <div class="detail-kv-item" style="grid-column:1 / -1;">
        <span class="meta-line">Penanggung Jawab (PJ)</span>
        <strong>PJ Absensi: ${escapeHtml(absen?.pj_nama || getDefaultSignatoryByRole('ketua').nama_lengkap)}</strong>
        <div class="meta-line" style="margin-top:2px;">
          PJ Mata Kuliah: <strong>${escapeHtml(resolveSessionPjMatkulName(sesi))}</strong> · ${absen?.pj_nama ? 'Diverifikasi / Dicatat oleh PJ Absensi' : 'Menunggu Verifikasi PJ Absensi'}
        </div>
      </div>
    </div>
    ${
      hasCoords
        ? `<div class="gps-inline-map">
            <iframe
              src="${escapeHtml(buildOsmEmbedUrl(absen.latitude, absen.longitude))}"
              title="Posisi GPS Mahasiswa"
              loading="lazy"
            ></iframe>
          </div>`
        : ''
    }
    ${
      absen?.catatan
        ? `<div class="detail-kv-item" style="margin-top:12px;"><span class="meta-line">Catatan</span><p>${escapeHtml(absen.catatan)}</p></div>`
        : ''
    }
  `;
  document.getElementById('modal-detail-absen').classList.remove('hidden');
}

// ----------------------------------------------------------------------------
// 12. VIEW MAHASISWA: ABSENSI, KAS (QRIS 10 MENIT + TRANSFER), CUTI, INFO, PROFIL
// ----------------------------------------------------------------------------
function renderMahasiswaAbsensiView() {
  const u = state.currentUser;
  const nowMs = Date.now();
  const sesiSorted = [...state.sesiAbsensi].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const sesiMap = Object.fromEntries(state.sesiAbsensi.map((s) => [s.id, s]));
  const myHistory = state.absensi.filter((a) => a.user_id === u.id);

  return `
    <div class="page-header">
      <div>
        <span class="meta-line">Kamera Langsung + GPS + Absen Daring Waktu Nyata · Stempel Waktu WIB</span>
        <h2>Absensi Perkuliahan Waktu Nyata</h2>
      </div>
    </div>

    <div class="sessions-grid" style="margin-bottom:20px;">
      ${
        sesiSorted.length === 0
          ? '<div class="card glass-panel"><p class="meta-line">Belum ada sesi absensi dibuka oleh Ketua Kelas atau Admin.</p></div>'
          : sesiSorted
              .map((sesi) => {
                const isOpen = sesi.is_active && new Date(sesi.batas_waktu).getTime() > nowMs;
                const myRecord = state.absensi.find(
                  (a) => a.sesi_id === sesi.id && a.user_id === u.id
                );
                const canAttend = isOpen && (!myRecord || myRecord.status_verifikasi === 'Belum Absen!' || myRecord.status_verifikasi === 'Ditolak');
                const modeKuliah = sesi.mode_kuliah || 'Luring';
                const pjDisplay = myRecord?.pj_nama || sesi.pj_nama || '-';

                return `
                  <div class="session-card ${isOpen ? '' : 'locked'}">
                    <div>
                      <div class="form-row-between" style="margin-bottom:8px;gap:6px;flex-wrap:wrap;">
                        <span class="meta-line">Pertemuan ke-${sesi.pertemuan_ke} · ${escapeHtml(modeKuliah)}</span>
                        <span class="status-tag ${isOpen ? 'tag-success' : 'tag-danger'}">
                          ${isOpen ? 'Sesi Dibuka' : 'Sesi Ditutup'}
                        </span>
                      </div>
                      <h3>${escapeHtml(sesi.mata_kuliah)}</h3>
                      <p class="meta-line" style="margin-top:4px;">Dosen: ${escapeHtml(sesi.dosen)}</p>
                      <p class="meta-line" style="margin-top:2px;">PJ Mata Kuliah: <strong>${escapeHtml(resolveSessionPjMatkulName(sesi))}</strong></p>
                      ${
                        sesi.link_daring
                          ? `<div class="daring-link-callout">
                              <div class="daring-link-meta">
                                <span class="meta-line">Tautan Perkuliahan Daring (${escapeHtml(modeKuliah)})</span>
                                <span class="daring-link-url tabular-nums">${escapeHtml(sesi.link_daring)}</span>
                              </div>
                              <a href="${escapeHtml(sesi.link_daring)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">Buka Tautan Daring</a>
                            </div>`
                          : ''
                      }
                    </div>

                    <div>
                      <span class="meta-line">Sisa Waktu Absensi</span>
                      <div class="session-countdown" data-deadline-iso="${escapeHtml(sesi.batas_waktu)}">
                        ${isOpen ? 'Menghitung...' : 'Sesi Ditutup'}
                      </div>
                    </div>

                    ${
                      myRecord
                        ? `<div>
                            <span class="meta-line">Status Anda:</span>
                            <div style="display:flex;gap:8px;margin-top:4px;flex-wrap:wrap;">
                              <span class="status-tag ${getStatusTagClass(myRecord.status_kehadiran)}">${escapeHtml(myRecord.status_kehadiran)}</span>
                              <span class="status-tag ${getStatusTagClass(myRecord.status_verifikasi)}">${escapeHtml(myRecord.status_verifikasi)}</span>
                              ${isDaringAttendanceRecord(myRecord) ? '<span class="status-tag tag-info">Daring Waktu Nyata</span>' : ''}
                            </div>
                          </div>`
                        : ''
                    }

                    <div class="session-actions">
                      ${
                        canAttend
                          ? `
                            ${
                              modeKuliah !== 'Daring'
                                ? `<button type="button" class="btn btn-primary btn-sm btn-open-absen" data-sesi-id="${sesi.id}">
                                    Absen Kamera + GPS
                                  </button>`
                                : ''
                            }
                            <button type="button" class="btn ${modeKuliah === 'Daring' ? 'btn-primary' : 'btn-coral'} btn-sm btn-open-absen-daring" data-sesi-id="${sesi.id}">
                              Absen Daring Waktu Nyata
                            </button>
                          `
                          : `<button type="button" class="btn btn-secondary btn-sm" disabled>
                              ${myRecord && myRecord.status_verifikasi !== 'Belum Absen!' ? 'Sudah Mengirim Absen' : 'Belum Waktunya / Tutup'}
                            </button>`
                      }
                      ${
                        myRecord
                          ? `<button type="button" class="btn btn-secondary btn-sm btn-detail-absen" data-absen-id="${myRecord.id}" data-sesi-id="${sesi.id}">
                              Detail
                            </button>`
                          : ''
                      }
                    </div>
                  </div>
                `;
              })
              .join('')
      }
    </div>

    <div class="card glass-panel">
      <div class="card-header">
        <div>
          <h3>Riwayat &amp; Detail Catatan Kehadiran Saya</h3>
          <span class="meta-line">Menampilkan status, mode Luring/Daring, Penanggung Jawab (PJ), serta tombol Detail lengkap</span>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Mata Kuliah</th>
              <th>Waktu Kirim (WIB)</th>
              <th>Mode</th>
              <th>Status</th>
              <th>Verifikasi</th>
              <th>Penanggung Jawab (PJ)</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${
              myHistory.length === 0
                ? '<tr><td colspan="7" class="text-center">Belum ada catatan kehadiran tersimpan.</td></tr>'
                : myHistory
                    .map((a) => {
                      const s = sesiMap[a.sesi_id];
                      const pjNama = a.pj_nama || s?.pj_nama || '-';
                      const modeText = a.is_manual
                        ? 'Manual PJ'
                        : isDaringAttendanceRecord(a)
                        ? 'Daring Real-Time'
                        : 'Luring Kamera+GPS';
                      return `
                        <tr>
                          <td>
                            <strong>${escapeHtml(s?.mata_kuliah || '-')}</strong>
                            <div class="meta-line">Pertemuan ke-${s?.pertemuan_ke || '-'}</div>
                          </td>
                          <td class="tabular-nums">${escapeHtml(formatWibShort(a.waktu_kirim))}</td>
                          <td><span class="status-tag tag-info">${escapeHtml(modeText)}</span></td>
                          <td><span class="status-tag ${getStatusTagClass(a.status_kehadiran)}">${escapeHtml(a.status_kehadiran)}</span></td>
                          <td><span class="status-tag ${getStatusTagClass(a.status_verifikasi)}">${escapeHtml(a.status_verifikasi)}</span></td>
                          <td><strong>${escapeHtml(pjNama)}</strong></td>
                          <td>
                            <button type="button" class="btn btn-secondary btn-sm btn-detail-absen" data-absen-id="${a.id}" data-sesi-id="${a.sesi_id}">
                              Detail
                            </button>
                          </td>
                        </tr>
                      `;
                    })
                    .join('')
            }
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function bindMahasiswaAbsensiEvents() {
  document.querySelectorAll('.btn-open-absen').forEach((btn) => {
    btn.addEventListener('click', () => {
      const sesiId = btn.getAttribute('data-sesi-id');
      const sesi = state.sesiAbsensi.find((s) => s.id === sesiId);
      if (!sesi) return;
      openAttendanceCameraModal('self', {
        sesiId: sesi.id,
        mata_kuliah: sesi.mata_kuliah,
        dosen: sesi.dosen,
        pertemuan_ke: sesi.pertemuan_ke,
      });
    });
  });

  document.querySelectorAll('.btn-open-absen-daring').forEach((btn) => {
    btn.addEventListener('click', () => {
      const sesiId = btn.getAttribute('data-sesi-id');
      const sesi = state.sesiAbsensi.find((s) => s.id === sesiId);
      if (!sesi) return;
      openAttendanceCameraModal('daring', {
        sesiId: sesi.id,
        mata_kuliah: sesi.mata_kuliah,
        dosen: sesi.dosen,
        pertemuan_ke: sesi.pertemuan_ke,
      });
    });
  });

  document.querySelectorAll('.btn-detail-absen').forEach((btn) => {
    btn.addEventListener('click', () => {
      openDetailAbsenModal(
        btn.getAttribute('data-absen-id'),
        btn.getAttribute('data-sesi-id')
      );
    });
  });
}

// Pembayaran Kas Mahasiswa
function renderMahasiswaKasView() {
  const u = state.currentUser;
  const profileMap = Object.fromEntries(state.profiles.map((p) => [p.id, p]));
  const myBills = state.iuranKas.filter((i) => i.user_id === u.id);
  const unpaid = myBills.filter((i) => i.status !== 'Lunas');
  const paid = myBills.filter((i) => i.status === 'Lunas');
  const totalTunggakan = unpaid.reduce(
    (sum, i) => sum + Math.max(0, i.nominal_tagihan - i.nominal_dibayar),
    0
  );

  return `
    <div class="page-header">
      <div>
        <span class="meta-line">Transparansi Keuangan Kelas R3S</span>
        <h2>Pembayaran Iuran Kas</h2>
      </div>
      <div class="card glass-panel" style="padding:12px 18px;">
        <span class="meta-line">Total Sisa Tunggakan</span>
        <strong class="kpi-value" style="font-size:1.2rem;">${formatRupiah(totalTunggakan)} / ${unpaid.length} periode</strong>
      </div>
    </div>

    <div class="card glass-panel" style="margin-bottom:20px;">
      <div class="card-header">
        <div>
          <h3>Daftar Tagihan &amp; Tunggakan Kas</h3>
          <span class="meta-line">Minimal pembayaran Rp 2.000 melalui QRIS (batas waktu 10 menit) atau Transfer Bank</span>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Periode</th>
              <th>Nominal Tagihan</th>
              <th>Metode</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${
              unpaid.length === 0
                ? '<tr><td colspan="5" class="text-center">Tidak ada tunggakan kas saat ini.</td></tr>'
                : unpaid
                    .map((b) => {
                      const isRejected =
                        b.status === 'Ditolak' ||
                        (b.status === 'Belum Lunas' && b.metode_bayar === 'Ditolak');
                      const statusLabel = isRejected ? 'Ditolak' : b.status;
                      const canPay = b.status === 'Belum Lunas' || isRejected;
                      return `
                  <tr>
                    <td><strong>${escapeHtml(b.periode)}</strong></td>
                    <td class="tabular-nums">${formatRupiah(b.nominal_tagihan)}</td>
                    <td>${escapeHtml(b.metode_bayar && b.metode_bayar !== 'Ditolak' ? b.metode_bayar : '-')}</td>
                    <td><span class="status-tag ${getStatusTagClass(statusLabel)}">${escapeHtml(statusLabel)}</span></td>
                    <td>
                      <div class="row-actions">
                        ${
                          canPay
                            ? `<button type="button" class="btn btn-primary btn-sm btn-pay-iuran" data-id="${b.id}">${isRejected ? 'Bayar Ulang' : 'Bayar Kas'}</button>`
                            : `<span class="meta-line">Menunggu Verifikasi Bendahara</span>`
                        }
                        ${
                          b.bukti_url
                            ? `<button type="button" class="btn btn-secondary btn-sm btn-view-img" data-url="${escapeHtml(b.bukti_url)}" data-title="Bukti Transfer ${escapeHtml(b.periode)}">Lihat Bukti</button>`
                            : ''
                        }
                      </div>
                    </td>
                  </tr>
                `;
                    })
                    .join('')
            }
          </tbody>
        </table>
      </div>
    </div>

    <div class="card glass-panel">
      <div class="card-header">
        <div>
          <h3>Riwayat Pembayaran Lunas</h3>
          <span class="meta-line">Telah diverifikasi lengkap dengan Penanggung Jawab (PJ) Bendahara/Admin</span>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Periode</th>
              <th>Nominal Dibayar</th>
              <th>Metode</th>
              <th>Tanggal Bayar</th>
              <th>Penanggung Jawab (PJ)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${
              paid.length === 0
                ? '<tr><td colspan="6" class="text-center">Belum ada riwayat kas lunas.</td></tr>'
                : paid
                    .map((b) => {
                      const pjNama = b.pj_nama || profileMap[b.verified_by]?.nama_lengkap || '-';
                      return `
                        <tr>
                          <td>${escapeHtml(b.periode)}</td>
                          <td class="tabular-nums text-success">${formatRupiah(b.nominal_dibayar)}</td>
                          <td>${escapeHtml(b.metode_bayar || '-')}</td>
                          <td class="tabular-nums">${escapeHtml(formatWibShort(b.tanggal_bayar))}</td>
                          <td><strong>${escapeHtml(pjNama)}</strong></td>
                          <td><span class="status-tag tag-success">Lunas</span></td>
                        </tr>
                      `;
                    })
                    .join('')
            }
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function bindMahasiswaKasEvents() {
  document.querySelectorAll('.btn-pay-iuran').forEach((btn) => {
    btn.addEventListener('click', () => {
      const bill = state.iuranKas.find((i) => i.id === btn.getAttribute('data-id'));
      if (bill) openPayKasModal(bill, { previewOnly: false, customPeriod: false });
    });
  });
  bindImagePreviewButtons();
}

function openPayKasModal(bill = null, opts = { previewOnly: false, customPeriod: false }) {
  const cfg = state.pengaturan || {};
  const previewOnly = Boolean(opts?.previewOnly);
  const customPeriod = Boolean(opts?.customPeriod) && !previewOnly;
  const safeBill = bill || {};
  const defaultNom = Math.max(2000, Number(safeBill.nominal_tagihan || cfg.nominal_kas_default || 10000));

  document.getElementById('pay-kas-id').value = customPeriod ? '' : safeBill.id || '';
  document.getElementById('pay-kas-modal-title').textContent = previewOnly
    ? 'QRIS Pembayaran Kelas (Batas Waktu 10 Menit)'
    : customPeriod
    ? 'Bayar Kas / Setoran Mandiri'
    : 'Pembayaran Iuran Kas Kelas';
  document.getElementById('pay-kas-periode').textContent = previewOnly
    ? `${safeBill.periode || 'QRIS Pembayaran Resmi Kelas R3S'} · Nominal ${formatRupiah(defaultNom)}`
    : customPeriod
    ? `${state.currentUser?.nama_lengkap || 'Anggota'} · Pembayaran kas mandiri via QRIS atau Transfer Bank`
    : `${safeBill.periode || 'Tagihan Kas'} · Tagihan ${formatRupiah(defaultNom)}`;

  const periodeGroup = document.getElementById('pay-kas-periode-group');
  const periodeInput = document.getElementById('pay-kas-periode-input');
  if (periodeGroup && periodeInput) {
    periodeGroup.classList.toggle('hidden', !customPeriod);
    periodeInput.required = customPeriod;
    if (customPeriod) {
      const monthLabel = formatIndonesianMonthYear(getWibDateKey(new Date()).slice(0, 7));
      periodeInput.value = `Setoran Kas - ${monthLabel}`;
    } else {
      periodeInput.value = '';
    }
  }

  const nomInput = document.getElementById('pay-kas-nominal');
  const buktiInput = document.getElementById('pay-kas-bukti');
  nomInput.value = defaultNom;
  nomInput.required = !previewOnly;
  buktiInput.required = !previewOnly;
  buktiInput.value = '';
  document.getElementById('pay-kas-preview').classList.add('hidden');

  document.getElementById('pay-kas-nominal-group').classList.toggle('hidden', previewOnly);
  document.getElementById('pay-kas-method-group').classList.toggle('hidden', previewOnly);
  document.getElementById('pay-kas-bukti-group').classList.toggle('hidden', previewOnly);
  document.getElementById('btn-pay-kas-submit').classList.toggle('hidden', previewOnly);
  document.getElementById('btn-pay-kas-close').textContent = previewOnly ? 'Tutup' : 'Batal';

  document.getElementById('qris-merchant-label').textContent = cfg.qris_merchant_name || 'Mas_hy, Fashion';
  document.getElementById('qris-nmid-label').textContent = `NMID: ${cfg.qris_nmid || 'ID1025463553806'}`;
  document.getElementById('bank-name-display').textContent = cfg.nama_bank || 'BCA';
  document.getElementById('bank-holder-display').textContent = cfg.atas_nama_rekening || 'Bendahara R3S';
  document.getElementById('bank-number-display').textContent = cfg.no_rekening || '-';

  setPaymentMethodTab('QRIS');
  if (previewOnly) {
    document.getElementById('panel-method-bank').classList.add('hidden');
  }
  drawQrisMatrixCanvas(cfg.qris_payload || DEFAULT_QRIS_PAYLOAD, nomInput.value);
  startQrisTimer();

  document.getElementById('modal-pay-kas').classList.remove('hidden');
}

function setPaymentMethodTab(method) {
  state.selectedPayMethod = method;
  document.querySelectorAll('#modal-pay-kas .seg-btn').forEach((b) => {
    b.classList.toggle('active', b.getAttribute('data-method') === method);
  });
  document.getElementById('panel-method-qris').classList.toggle('hidden', method !== 'QRIS');
  document.getElementById('panel-method-bank').classList.toggle('hidden', method !== 'Transfer Bank');
}

function startQrisTimer() {
  clearInterval(state.qrisTimerInterval);
  state.qrisSecondsLeft = 600;
  const display = document.getElementById('qris-countdown-display');
  const update = () => {
    const m = Math.floor(state.qrisSecondsLeft / 60);
    const s = state.qrisSecondsLeft % 60;
    if (display) {
      display.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
    if (state.qrisSecondsLeft <= 0) {
      clearInterval(state.qrisTimerInterval);
      if (display) display.textContent = 'Kedaluwarsa';
    } else {
      state.qrisSecondsLeft -= 1;
    }
  };
  update();
  state.qrisTimerInterval = setInterval(update, 1000);
}

function parseEmvQrisTlv(rawStr) {
  const str = String(rawStr || '').trim();
  const tags = [];
  let i = 0;
  while (i + 4 <= str.length) {
    const tag = str.slice(i, i + 2);
    const len = parseInt(str.slice(i + 2, i + 4), 10);
    if (Number.isNaN(len) || len < 0 || i + 4 + len > str.length) break;
    const val = str.slice(i + 4, i + 4 + len);
    tags.push({ tag, val });
    i += 4 + len;
    if (tag === '63') break;
  }
  return tags;
}

function crc16CcittFalse(str) {
  let crc = 0xffff;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if (crc & 0x8000) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

function extractQrisMetadata(rawStr) {
  const tags = parseEmvQrisTlv(rawStr);
  const merchantName = tags.find((t) => t.tag === '59')?.val || '';
  const city = tags.find((t) => t.tag === '60')?.val || '';
  let nmid = '';
  const tag51 = tags.find((t) => t.tag === '51');
  if (tag51) {
    nmid = parseEmvQrisTlv(tag51.val).find((st) => st.tag === '02')?.val || '';
  }
  return { merchantName, city, nmid };
}

function normalizePengaturanQrisDefaults(cfg) {
  const safe = { ...(cfg || {}) };
  if (!safe.qris_payload || !String(safe.qris_payload).trim().startsWith('000201')) {
    safe.qris_payload = DEFAULT_QRIS_PAYLOAD;
  }
  const meta = extractQrisMetadata(safe.qris_payload);
  if (!safe.qris_nmid || safe.qris_nmid === 'ID1020304050607') {
    safe.qris_nmid = meta.nmid || 'ID1025463553806';
  }
  if (!safe.qris_merchant_name || safe.qris_merchant_name === 'KAS KELAS R3S') {
    safe.qris_merchant_name = meta.merchantName || 'Mas_hy, Fashion';
  }
  return safe;
}

function buildDynamicQrisPayload(baseQris, nominal) {
  const source =
    baseQris && String(baseQris).trim().startsWith('000201')
      ? String(baseQris).trim()
      : DEFAULT_QRIS_PAYLOAD;
  const parsed = parseEmvQrisTlv(source).filter((t) => t.tag !== '63' && t.tag !== '54');
  if (parsed.length === 0) return source;

  const amt = Math.max(0, Math.round(Number(nominal || 0)));
  const out = [];
  let insertedAmt = false;
  for (const t of parsed) {
    if (t.tag === '01') {
      out.push({ tag: '01', val: amt > 0 ? '12' : '11' });
      continue;
    }
    if (!insertedAmt && amt > 0 && Number(t.tag) > 54) {
      out.push({ tag: '54', val: String(amt) });
      insertedAmt = true;
    }
    out.push(t);
  }
  if (!insertedAmt && amt > 0) {
    out.push({ tag: '54', val: String(amt) });
  }
  const body =
    out.map((t) => `${t.tag}${String(t.val.length).padStart(2, '0')}${t.val}`).join('') + '6304';
  return body + crc16CcittFalse(body);
}

function drawQrisMatrixCanvas(payloadOrNmid, nominal) {
  const canvas = document.getElementById('qris-qr-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const basePayload =
    payloadOrNmid && String(payloadOrNmid).trim().startsWith('000201')
      ? String(payloadOrNmid).trim()
      : state.pengaturan?.qris_payload || DEFAULT_QRIS_PAYLOAD;

  const amt = Math.max(0, Math.round(Number(nominal || 0)));
  const dynamicQris = buildDynamicQrisPayload(basePayload, amt);
  state.currentDynamicQrisString = dynamicQris;

  const dynLabel = document.getElementById('qris-dynamic-nominal-label');
  if (dynLabel) {
    dynLabel.textContent =
      amt > 0
        ? `QRIS Dinamis · Nominal Otomatis: ${formatRupiah(amt)}`
        : 'QRIS Dinamis · Nominal Fleksibel';
  }

  const size = 244;
  if (canvas.width !== size) canvas.width = size;
  if (canvas.height !== size) canvas.height = size;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);

  if (typeof window.qrcode === 'function') {
    try {
      const qr = window.qrcode(0, 'M');
      qr.addData(dynamicQris, 'Byte');
      qr.make();
      const count = qr.getModuleCount();
      const quiet = 4;
      const totalModules = count + quiet * 2;
      const cell = Math.max(2, Math.floor(size / totalModules));
      const drawnSize = totalModules * cell;
      const offset = Math.floor((size - drawnSize) / 2);

      ctx.fillStyle = '#03132b';
      for (let r = 0; r < count; r++) {
        for (let c = 0; c < count; c++) {
          if (qr.isDark(r, c)) {
            ctx.fillRect(offset + (c + quiet) * cell, offset + (r + quiet) * cell, cell, cell);
          }
        }
      }
      return;
    } catch {
      // Fallback jika modul QR gagal
    }
  }

  // Fallback jika library CDN belum termuat
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 13px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('QRIS Dinamis Siap Disalin', size / 2, size / 2 - 8);
  ctx.font = '12px Arial, sans-serif';
  ctx.fillText(amt > 0 ? formatRupiah(amt) : 'Klik Salin Kode QRIS', size / 2, size / 2 + 14);
  ctx.textAlign = 'left';
}

async function handleSubmitPayKas(e) {
  e.preventDefault();
  const id = document.getElementById('pay-kas-id').value.trim();
  const periodeGroup = document.getElementById('pay-kas-periode-group');
  const isCustomMode = !id && Boolean(periodeGroup && !periodeGroup.classList.contains('hidden'));
  if (!id && !isCustomMode) {
    closeModal('modal-pay-kas');
    return;
  }

  const customPeriode = document.getElementById('pay-kas-periode-input')?.value.trim() || '';
  const nominal = Number(document.getElementById('pay-kas-nominal').value);
  const file = document.getElementById('pay-kas-bukti').files[0];

  if (isCustomMode && !customPeriode) {
    showToast('Isi nama periode atau keterangan pembayaran kas terlebih dahulu.', 'danger');
    return;
  }
  if (!Number.isFinite(nominal) || nominal < 2000) {
    showToast('Minimal pembayaran kas adalah Rp 2.000.', 'danger');
    return;
  }
  if (!file) {
    showToast('Wajib mengunggah foto bukti transfer/QRIS.', 'danger');
    return;
  }

  try {
    const bill = id ? state.iuranKas.find((i) => i.id === id) : null;
    const buktiUrl = await db.uploadFile(file, 'bukti_kas');
    const nowIso = new Date().toISOString();

    if (id && bill) {
      await db.update('iuran_kas', id, {
        nominal_dibayar: nominal,
        metode_bayar: state.selectedPayMethod,
        bukti_url: buktiUrl,
        status: 'Menunggu Verifikasi',
        tanggal_bayar: nowIso,
      });
    } else {
      await db.insert('iuran_kas', {
        user_id: state.currentUser.id,
        periode: customPeriode,
        nominal_tagihan: nominal,
        nominal_dibayar: nominal,
        metode_bayar: state.selectedPayMethod,
        bukti_url: buktiUrl,
        status: 'Menunggu Verifikasi',
        tanggal_bayar: nowIso,
      });
    }

    const periodeText = bill?.periode || customPeriode || 'Iuran Kas';
    const notifItems = [
      {
        user_id: state.currentUser.id,
        judul: 'Bukti Pembayaran Kas Terkirim',
        pesan: `Pembayaran ${periodeText} sebesar ${formatRupiah(nominal)} via ${state.selectedPayMethod} berhasil dikirim. Menunggu ACC Admin/Bendahara.`,
        tipe: 'info',
      },
    ];
    getUserIdsByRoles(['admin', 'bendahara']).forEach((targetId) => {
      if (targetId === state.currentUser.id) return;
      notifItems.push({
        user_id: targetId,
        judul: 'Pembayaran Kas Menunggu ACC',
        pesan: `${state.currentUser.nama_lengkap} (${state.currentUser.npm}) membayar kas ${periodeText} sebesar ${formatRupiah(nominal)} (${state.selectedPayMethod}).`,
        tipe: 'warning',
      });
    });
    await emitNotifications(notifItems);

    await db.loadAll();
    closeModal('modal-pay-kas');
    showToast('Bukti pembayaran terkirim! Menunggu verifikasi Bendahara/Admin.', 'success');
    renderSidebarNav();
    renderActiveTab();
  } catch (err) {
    showToast(err.message || 'Gagal mengirim bukti pembayaran.', 'danger');
  }
}

// Pengajuan Cuti Mahasiswa
function renderMahasiswaCutiView() {
  const myCuti = state.pengajuanCuti.filter((c) => c.user_id === state.currentUser.id);

  return `
    <div class="page-header">
      <div>
        <span class="meta-line">Layanan Perizinan Akademik · Kelas R3S</span>
        <h2>Pengajuan Cuti Kuliah</h2>
      </div>
    </div>

    <div class="grid-2">
      <div class="card glass-panel">
        <div class="card-header">
          <div>
            <h3>Formulir Pengajuan Cuti</h3>
            <span class="meta-line">Lampirkan foto surat resmi kampus agar dapat diverifikasi Ketua/Admin</span>
          </div>
        </div>
        <form id="form-ajukan-cuti">
          <div class="grid-2" style="margin-bottom:0;">
            <div class="field-group">
              <label for="cuti-mulai">Tanggal Mulai</label>
              <input type="date" id="cuti-mulai" required />
            </div>
            <div class="field-group">
              <label for="cuti-selesai">Tanggal Selesai</label>
              <input type="date" id="cuti-selesai" required />
            </div>
          </div>
          <div class="field-group">
            <label for="cuti-alasan">Alasan Pengajuan Cuti</label>
            <textarea id="cuti-alasan" rows="3" placeholder="Jelaskan alasan cuti secara jelas" required></textarea>
          </div>
          <div class="field-group">
            <label for="cuti-surat">Unggah Foto Surat Resmi Kampus</label>
            <input type="file" id="cuti-surat" accept="image/*" required />
          </div>
          <button type="submit" class="btn btn-primary btn-block">Kirim Pengajuan Cuti</button>
        </form>
      </div>

      <div class="card glass-panel">
        <div class="card-header">
          <div>
            <h3>Riwayat Pengajuan Cuti Anda</h3>
            <span class="meta-line">Dipantau oleh Ketua Kelas &amp; Admin Utama</span>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Tanggal &amp; Jam Pengajuan (WIB)</th>
                <th>Rentang Tanggal</th>
                <th>Alasan</th>
                <th>Status</th>
                <th>Surat</th>
              </tr>
            </thead>
            <tbody>
              ${
                myCuti.length === 0
                  ? '<tr><td colspan="5" class="text-center">Belum ada pengajuan cuti.</td></tr>'
                  : myCuti
                      .map((c) => {
                        const tglJam = c.waktu_pengajuan || c.created_at;
                        return `
                    <tr>
                      <td class="tabular-nums">
                        <strong>${escapeHtml(formatWibDateFormal(new Date(tglJam)))}</strong>
                        <div class="meta-line">${escapeHtml(formatWibTimeOnly(new Date(tglJam)))}</div>
                      </td>
                      <td class="tabular-nums">${escapeHtml(c.tanggal_mulai)} s.d. ${escapeHtml(c.tanggal_selesai)}</td>
                      <td>${escapeHtml(c.alasan)}</td>
                      <td><span class="status-tag ${getStatusTagClass(c.status)}">${escapeHtml(c.status)}</span></td>
                      <td>
                        ${
                          c.surat_url
                            ? `<button type="button" class="btn btn-secondary btn-sm btn-view-img" data-url="${escapeHtml(c.surat_url)}" data-title="Surat Cuti Resmi">Lihat</button>`
                            : '-'
                        }
                      </td>
                    </tr>
                  `;
                      })
                      .join('')
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function bindMahasiswaCutiEvents() {
  document.getElementById('form-ajukan-cuti')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const mulai = document.getElementById('cuti-mulai').value;
    const selesai = document.getElementById('cuti-selesai').value;
    const alasan = document.getElementById('cuti-alasan').value.trim();
    const file = document.getElementById('cuti-surat').files[0];

    if (selesai < mulai) {
      showToast('Tanggal selesai tidak boleh lebih awal dari tanggal mulai.', 'danger');
      return;
    }

    try {
      const suratUrl = file ? await db.uploadFile(file, 'surat_cuti') : '';
      const nowIso = new Date().toISOString();
      await db.insert('pengajuan_cuti', {
        user_id: state.currentUser.id,
        tanggal_mulai: mulai,
        tanggal_selesai: selesai,
        alasan,
        surat_url: suratUrl,
        status: 'Menunggu',
        waktu_pengajuan: nowIso,
      });
      await db.loadAll();
      showToast('Pengajuan cuti berhasil dikirim!', 'success');
      renderActiveTab();
    } catch (err) {
      showToast(err.message || 'Gagal mengirim pengajuan cuti.', 'danger');
    }
  });
  bindImagePreviewButtons();
}

// Pusat Informasi (FAQ, Laporan Kendala / Permintaan Excel, Kotak Pemberitahuan)
function renderPusatInfoView() {
  const u = state.currentUser;
  const isAdmin = u.role === 'admin';
  const myReports = state.laporanKendala.filter((l) => l.user_id === u.id);
  const notifs = getUserNotifications();
  const unreadCount = notifs.filter((n) => !n.dibaca).length;

  return `
    <div class="page-header">
      <div>
        <span class="meta-line">Notifikasi Pembayaran Kas, Verifikasi Absensi, Akun &amp; Laporan Portal</span>
        <h2>Pusat Informasi Kelas R3S</h2>
      </div>
      <span class="status-tag ${unreadCount > 0 ? 'tag-coral' : 'tag-success'} tabular-nums">${unreadCount} Pemberitahuan Baru</span>
    </div>

    <div class="grid-2 grid-2-start">
      <!-- Kotak Pemberitahuan -->
      <div class="card glass-panel">
        <div class="card-header">
          <div>
            <h3>Kotak Pemberitahuan</h3>
            <span class="meta-line">Pembayaran kas, persetujuan kas dan absensi, pengingat tunggakan, serta pembaruan akun</span>
          </div>
          <button type="button" id="btn-mark-all-read" class="btn btn-secondary btn-sm">Tandai Semua Dibaca</button>
        </div>
        <div class="activity-list activity-scroll-5-notif">
          ${
            notifs.length === 0
              ? '<p class="meta-line">Belum ada pemberitahuan masuk.</p>'
              : notifs
                  .map(
                    (n) => `
                <div class="activity-item">
                  <div>
                    <div class="activity-title">
                      ${escapeHtml(n.judul)}
                      ${!n.dibaca ? '<span class="status-tag tag-coral" style="margin-left:6px;">Baru</span>' : ''}
                    </div>
                    <p style="font-size:0.84rem;margin-top:2px;">${escapeHtml(n.pesan)}</p>
                    <span class="meta-line tabular-nums">${escapeHtml(formatWibShort(n.created_at))}</span>
                  </div>
                </div>
              `
                  )
                  .join('')
          }
        </div>
      </div>

      <!-- Panduan Pengguna -->
      <div class="card glass-panel sticky-side-card">
        <div class="card-header">
          <div>
            <h3>Panduan Pengguna</h3>
            <span class="meta-line">Pertanyaan umum seputar absensi, kas, &amp; akun</span>
          </div>
        </div>
        <div class="faq-list">
          <details class="faq-item" open>
            <summary>Bagaimana cara melakukan absensi kamera langsung &amp; GPS?</summary>
            <p>
              Buka menu <strong>Absensi Waktu Nyata</strong>, pilih mata kuliah yang sedang dibuka, lalu izinkan akses
              kamera depan dan lokasi GPS. Ambil foto hingga stempel kelas, jam WIB, dan koordinat GPS muncul,
              kemudian kirim. Status menjadi <strong>Menunggu</strong> hingga disetujui Ketua/Admin maksimal 1x24 jam.
            </p>
          </details>
          <details class="faq-item">
            <summary>Bagaimana jika status absensi belum berubah lebih dari 1x24 jam?</summary>
            <p>
              Gunakan formulir <strong>Laporan Kendala / Permintaan Rekapan Excel</strong> di menu Pusat Informasi dengan kategori
              <em>Kendala Absensi</em> dan sertakan tangkapan layar agar Admin dapat menindaklanjuti.
            </p>
          </details>
          <details class="faq-item">
            <summary>Bagaimana cara membayar iuran kas via QRIS atau Transfer Bank?</summary>
            <p>
              Masuk ke menu <strong>Pembayaran Kas</strong>, klik <em>Bayar Kas</em> pada periode tertunggak (minimal
              Rp 2.000), pilih QRIS (berlaku 10 menit) atau Transfer Bank (gunakan tombol Salin Rekening), lalu unggah
              foto bukti transfer.
            </p>
          </details>
          <details class="faq-item">
            <summary>Apa aturan penggantian kata sandi akun?</summary>
            <p>
              Kata sandi baru maksimal 8 karakter, harus mengandung minimal 1 angka dan minimal 1 simbol. Perubahan
              di menu Profil atau Lupa Kata Sandi langsung tersinkron ke daftar akun Admin.
            </p>
          </details>
        </div>
      </div>
    </div>

    ${
      isAdmin
        ? `
          <div class="card glass-panel">
            <div class="card-header">
              <div>
                <h3>Pusat Kendali Notifikasi Admin</h3>
                <span class="meta-line">Seluruh aktivitas pembayaran kas mahasiswa, persetujuan kas dan absensi, laporan kendala, serta perubahan kata sandi mahasiswa terekam otomatis di Kotak Pemberitahuan Admin.</span>
              </div>
              <button type="button" class="btn btn-primary btn-sm btn-goto-laporan-masuk">Buka Laporan Masuk</button>
            </div>
          </div>
        `
        : `
          <!-- Formulir Laporan Kendala / Permintaan Rekapan Excel -->
          <div class="grid-2">
            <div class="card glass-panel">
              <div class="card-header">
                <div>
                  <h3>Kirim Laporan Kendala / Permintaan Excel</h3>
                  <span class="meta-line">Ditinjau langsung oleh Admin Utama Kelas</span>
                </div>
              </div>
              <form id="form-kirim-laporan">
                <div class="field-group">
                  <label for="laporan-kategori">Kategori Laporan</label>
                  <select id="laporan-kategori" required>
                    <option value="Kendala Absensi">Kendala Absensi (&gt;24 jam belum disetujui / GPS)</option>
                    <option value="Permintaan Rekapan Excel">Permintaan Rekapan Excel</option>
                    <option value="Kendala Pembayaran Kas">Kendala Pembayaran Kas</option>
                    <option value="Bug / Teknis">Kendala Teknis / Sistem</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
                <div class="field-group">
                  <label for="laporan-keterangan">Keterangan Lengkap</label>
                  <textarea id="laporan-keterangan" rows="3" placeholder="Jelaskan rincian kendala atau rentang rekapan yang diminta" required></textarea>
                </div>
                <div class="field-group">
                  <label for="laporan-bukti">Lampiran Bukti Foto (Opsional)</label>
                  <input type="file" id="laporan-bukti" accept="image/*" />
                </div>
                <button type="submit" class="btn btn-primary btn-block">Kirim ke Admin</button>
              </form>
            </div>

            <div class="card glass-panel">
              <div class="card-header">
                <div>
                  <h3>Status Laporan Anda</h3>
                  <span class="meta-line">Berubah menjadi Selesai setelah dikonfirmasi Admin</span>
                </div>
              </div>
              <div class="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Kategori</th>
                      <th>Keterangan &amp; Tanggapan</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${
                      myReports.length === 0
                        ? '<tr><td colspan="3" class="text-center">Belum ada laporan dikirim.</td></tr>'
                        : myReports
                            .map(
                              (r) => `
                          <tr>
                            <td><strong>${escapeHtml(r.kategori)}</strong></td>
                            <td>
                              <div>${escapeHtml(r.keterangan)}</div>
                              ${
                                r.tanggapan_admin
                                  ? `<div class="meta-line text-cyan" style="margin-top:4px;">Tanggapan Admin: ${escapeHtml(r.tanggapan_admin)}</div>`
                                  : ''
                              }
                            </td>
                            <td><span class="status-tag ${getStatusTagClass(r.status)}">${escapeHtml(r.status)}</span></td>
                          </tr>
                        `
                            )
                            .join('')
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        `
    }
  `;
}

function bindPusatInfoEvents() {
  document.getElementById('btn-mark-all-read')?.addEventListener('click', async () => {
    const unread = getUserNotifications().filter((n) => !n.dibaca);
    try {
      await Promise.all(unread.map((n) => db.update('pemberitahuan', n.id, { dibaca: true })));
      await db.loadAll();
      renderSidebarNav();
      renderActiveTab();
      showToast('Semua pemberitahuan ditandai sudah dibaca.', 'success');
    } catch (err) {
      showToast(err.message || 'Gagal memperbarui notifikasi.', 'danger');
    }
  });

  document.querySelector('.btn-goto-laporan-masuk')?.addEventListener('click', () => {
    state.activeTab = 'monitoring_laporan';
    renderSidebarNav();
    renderActiveTab();
  });

  document.getElementById('form-kirim-laporan')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const kategori = document.getElementById('laporan-kategori').value;
    const keterangan = document.getElementById('laporan-keterangan').value.trim();
    const file = document.getElementById('laporan-bukti').files[0];

    try {
      const buktiUrl = file ? await db.uploadFile(file, 'laporan_kendala') : '';
      await db.insert('laporan_kendala', {
        user_id: state.currentUser.id,
        kategori,
        keterangan,
        bukti_url: buktiUrl,
        tanggapan_admin: '',
        status: 'Menunggu',
      });

      const sender = state.currentUser;
      const snippet = keterangan.length > 90 ? `${keterangan.slice(0, 90)}...` : keterangan;
      const notifItems = [
        {
          user_id: sender.id,
          judul: 'Laporan Berhasil Dikirim',
          pesan: `Laporan kategori "${kategori}" telah dikirim ke Admin Utama dan sedang menunggu tindak lanjut.`,
          tipe: 'info',
        },
      ];
      getUserIdsByRoles(['admin']).forEach((adminId) => {
        if (adminId === sender.id) return;
        notifItems.push({
          user_id: adminId,
          judul: `Laporan Masuk (${ROLE_LABELS[sender.role] || sender.role})`,
          pesan: `${sender.nama_lengkap} (${sender.npm}) mengirim laporan "${kategori}": ${snippet}`,
          tipe: 'warning',
        });
      });
      await emitNotifications(notifItems);

      await db.loadAll();
      showToast('Laporan berhasil dikirim ke Admin Utama.', 'success');
      renderSidebarNav();
      renderActiveTab();
    } catch (err) {
      showToast(err.message || 'Gagal mengirim laporan.', 'danger');
    }
  });
}

// Profil Pengguna (Nama & NPM terkunci; Foto, Username & Password sinkron ke Admin)
function renderProfilView() {
  const u = state.currentUser;
  const initialChar = (u.nama_lengkap || 'R')[0].toUpperCase();
  return `
    <div class="page-header">
      <div>
        <span class="meta-line">Pengaturan Akun &amp; Kredensial</span>
        <h2>Profil Saya</h2>
      </div>
    </div>

    <div class="grid-2">
      <div class="card glass-panel">
        <div class="card-header">
          <div>
            <h3>Identitas Akademik (Terkunci)</h3>
            <span class="meta-line">Nama lengkap dan NPM dikunci oleh Admin Utama</span>
          </div>
        </div>

        <div class="profil-avatar-showcase">
          <div class="profil-avatar-frame" id="profil-avatar-preview">
            ${
              u.avatar_url
                ? `<img src="${escapeHtml(u.avatar_url)}" alt="${escapeHtml(u.nama_lengkap)}" />`
                : `<span>${escapeHtml(initialChar)}</span>`
            }
          </div>
          <div>
            <strong>${escapeHtml(u.nama_lengkap)}</strong>
            <div class="meta-line tabular-nums">${escapeHtml(u.npm)} · <span class="status-tag ${getRoleTagClass(u.role)}">${escapeHtml(ROLE_LABELS[u.role] || u.role)}</span></div>
            <div class="meta-line">${u.avatar_url ? 'Foto profil aktif tersimpan' : 'Belum mengunggah foto profil'}</div>
          </div>
        </div>

        <div class="field-group">
          <label>Nama Lengkap</label>
          <input type="text" value="${escapeHtml(u.nama_lengkap)}" readonly />
        </div>
        <div class="field-group">
          <label>NPM / NIM</label>
          <input type="text" value="${escapeHtml(u.npm)}" readonly class="tabular-nums" />
        </div>
        <div class="field-group">
          <label>Peran Akun</label>
          <input type="text" value="${escapeHtml(ROLE_LABELS[u.role] || u.role)}${u.role === 'pj_matkul' ? ' (Penanda Penanggung Jawab Mata Kuliah)' : ''}" readonly />
        </div>

        <form id="form-update-avatar">
          <div class="field-group">
            <label for="profil-avatar-file">Ganti Foto Profil</label>
            <input type="file" id="profil-avatar-file" accept="image/*" required />
          </div>
          <button type="submit" class="btn btn-secondary">Simpan Foto Profil</button>
        </form>
      </div>

      <div class="card glass-panel">
        <div class="card-header">
          <div>
            <h3>Ubah Nama Pengguna &amp; Kata Sandi</h3>
            <span class="meta-line">Perubahan otomatis tersinkron ke daftar akun pada halaman Admin Utama</span>
          </div>
        </div>

        <form id="form-update-credentials">
          <div class="field-group">
            <label for="profil-username">Nama Pengguna</label>
            <input type="text" id="profil-username" value="${escapeHtml(u.username)}" required />
          </div>
          <div class="field-group">
            <label for="profil-nowa">Nomor WhatsApp (Format 628...)</label>
            <input type="text" id="profil-nowa" value="${escapeHtml(u.no_wa || '')}" placeholder="628123456789" />
          </div>
          <div class="field-group">
            <label for="profil-password">Kata Sandi Baru (Kosongkan jika tidak diubah)</label>
            <input type="password" id="profil-password" maxlength="8" placeholder="Maksimal 8 karakter" />
            <ul class="pw-rules-list" id="profil-pw-rules">
              <li data-rule="length">Maksimal 8 karakter (minimal 3 karakter)</li>
              <li data-rule="digit">Minimal 1 angka (0-9)</li>
              <li data-rule="symbol">Minimal 1 simbol (!@#$%^&amp;* dll.)</li>
            </ul>
          </div>
          <button type="submit" class="btn btn-primary btn-block">Simpan Perubahan Kredensial</button>
        </form>
      </div>
    </div>
  `;
}

function bindProfilEvents() {
  document.getElementById('profil-password')?.addEventListener('input', (e) => {
    updatePasswordRuleUI(e.target.value, '#profil-pw-rules');
  });

  document.getElementById('profil-avatar-file')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const frame = document.getElementById('profil-avatar-preview');
    if (!file || !frame) return;
    const previewUrl = URL.createObjectURL(file);
    frame.innerHTML = `<img src="${previewUrl}" alt="Pratinjau Foto Profil" />`;
  });

  document.getElementById('form-update-avatar')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const file = document.getElementById('profil-avatar-file').files[0];
    if (!file) return;
    try {
      const avatarUrl = await db.uploadFile(file, 'avatars');
      await db.update('profiles', state.currentUser.id, { avatar_url: avatarUrl });
      await emitNotifications([
        {
          user_id: state.currentUser.id,
          judul: 'Foto Profil Diperbarui',
          pesan: 'Foto profil Anda berhasil diperbarui dan ditampilkan pada bilah navigasi serta halaman Profil.',
          tipe: 'success',
        },
      ]);
      await db.loadAll();
      showToast('Foto profil berhasil diperbarui!', 'success');
      renderSidebarNav();
      renderActiveTab();
    } catch (err) {
      showToast(err.message || 'Gagal mengunggah foto profil.', 'danger');
    }
  });

  document.getElementById('form-update-credentials')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newUsername = document.getElementById('profil-username').value.trim();
    const newWa = document.getElementById('profil-nowa').value.trim();
    const newPw = document.getElementById('profil-password').value;

    const dup = state.profiles.find(
      (p) => p.id !== state.currentUser.id && p.username.toLowerCase() === newUsername.toLowerCase()
    );
    if (dup) {
      showToast('Username sudah dipakai anggota lain.', 'danger');
      return;
    }

    const patch = { username: newUsername, no_wa: newWa };
    if (newPw) {
      const check = validatePasswordRule(newPw);
      if (!check.valid) {
        showToast('Password wajib maks 8 karakter, min 1 angka, dan min 1 simbol.', 'danger');
        return;
      }
      patch.password = newPw;
    }

    try {
      await db.update('profiles', state.currentUser.id, patch);

      const u = state.currentUser;
      const notifItems = [
        {
          user_id: u.id,
          judul: 'Kredensial Akun Diperbarui',
          pesan: `Username (@${newUsername})${newPw ? ' dan password' : ''} berhasil diperbarui dan tersinkron ke sistem.`,
          tipe: 'success',
        },
      ];
      if (isStudentRole(u.role)) {
        getUserIdsByRoles(['admin']).forEach((adminId) => {
          notifItems.push({
            user_id: adminId,
            judul: 'Mahasiswa Mengubah Username / Password',
            pesan: `Mahasiswa ${u.nama_lengkap} (${u.npm}) memperbarui kredensial akun menjadi @${newUsername}${newPw ? ' (beserta password baru)' : ''}.`,
            tipe: 'warning',
          });
        });
      }
      await emitNotifications(notifItems);

      await db.loadAll();
      showToast('Profil & kredensial tersinkron ke sistem Admin!', 'success');
      renderSidebarNav();
      renderActiveTab();
    } catch (err) {
      showToast(err.message || 'Gagal memperbarui kredensial.', 'danger');
    }
  });
}

// ----------------------------------------------------------------------------
// 13. VIEW KETUA KELAS & ADMIN: BUKA SESI, VERIFIKASI, MANUAL PJ, RIWAYAT & CUTI
// ----------------------------------------------------------------------------
const DEFAULT_MATKUL_CATALOG = [
  { mata_kuliah: 'Pemrograman Web Lanjut', dosen: 'Dr. Hendra Kusuma, M.Kom.', sks: 3 },
  { mata_kuliah: 'Basis Data Terdistribusi', dosen: 'Ir. Maya Putri, M.T.', sks: 3 },
  { mata_kuliah: 'Rekayasa Perangkat Lunak', dosen: 'Budi Santoso, M.Kom.', sks: 2 },
  { mata_kuliah: 'Jaringan Komputer', dosen: 'Ahmad Fauzi, S.T., M.Kom.', sks: 2 },
  { mata_kuliah: 'Kecerdasan Buatan', dosen: 'Dr. Ratna Sari, M.Kom.', sks: 3 },
  { mata_kuliah: 'Sistem Operasi', dosen: 'Eko Prasetyo, M.T.', sks: 2 },
];

function resolveSessionPjMatkulName(sesi) {
  if (!sesi) return '-';
  if (sesi.pj_matkul_id) {
    const byId = state.profiles.find((p) => p.id === sesi.pj_matkul_id && p.role === 'pj_matkul');
    if (byId) return byId.nama_lengkap;
  }
  if (sesi.pj_matkul_nama) {
    const byName = state.profiles.find(
      (p) =>
        p.nama_lengkap.toLowerCase() === String(sesi.pj_matkul_nama).toLowerCase() &&
        p.role === 'pj_matkul'
    );
    if (byName) return byName.nama_lengkap;
  }
  return '-';
}

function getMatkulCatalog() {
  const defaultPj = state.profiles.find((p) => p.role === 'pj_matkul');
  const map = new Map();
  DEFAULT_MATKUL_CATALOG.forEach((m) =>
    map.set(m.mata_kuliah.toLowerCase(), {
      ...m,
      pj_matkul_id: defaultPj?.id || '',
      pj_matkul_nama: defaultPj?.nama_lengkap || '',
    })
  );
  state.sesiAbsensi.forEach((s) => {
    if (s.mata_kuliah && s.dosen) {
      const existing = map.get(s.mata_kuliah.toLowerCase());
      const validPj = state.profiles.find(
        (p) =>
          p.role === 'pj_matkul' &&
          (p.id === s.pj_matkul_id ||
            (s.pj_matkul_nama && p.nama_lengkap.toLowerCase() === String(s.pj_matkul_nama).toLowerCase()))
      );
      map.set(s.mata_kuliah.toLowerCase(), {
        mata_kuliah: s.mata_kuliah,
        dosen: s.dosen,
        sks: Number(s.sks || 2),
        pj_matkul_id: validPj?.id || existing?.pj_matkul_id || '',
        pj_matkul_nama: validPj?.nama_lengkap || existing?.pj_matkul_nama || '',
      });
    }
  });
  return Array.from(map.values());
}

function getPjProfiles() {
  const list = state.profiles.filter((p) => ['pj_matkul', 'admin', 'ketua', 'bendahara'].includes(p.role));
  return list.length > 0 ? list : state.profiles;
}

function getPjMatkulProfiles() {
  return state.profiles.filter((p) => p.role === 'pj_matkul');
}

function renderPjMatkulSelectOptions(selectedId = '', selectedName = '') {
  const list = getPjMatkulProfiles();
  if (list.length === 0) {
    return '<option value="">-- Belum ada akun berlabel PJ Mata Kuliah --</option>';
  }
  const resolvedId =
    selectedId && list.some((p) => p.id === selectedId)
      ? selectedId
      : list.find((p) => p.nama_lengkap.toLowerCase() === String(selectedName).toLowerCase())?.id ||
        list[0].id;

  return list
    .map(
      (p) =>
        `<option value="${p.id}" data-nama="${escapeHtml(p.nama_lengkap)}" ${p.id === resolvedId ? 'selected' : ''}>${escapeHtml(p.nama_lengkap)} (${escapeHtml(p.npm)} · ${escapeHtml(ROLE_LABELS[p.role] || p.role)})</option>`
    )
    .join('');
}

function renderCurrentUserPjOption() {
  const u = state.currentUser;
  if (!u) return '';
  return `<option value="${u.id}" selected>${escapeHtml(u.nama_lengkap)} (${escapeHtml(ROLE_LABELS[u.role] || u.role)})</option>`;
}

function renderPjSelectOptions(selectedId = '') {
  const pjs = getPjProfiles();
  const targetId = selectedId || state.currentUser?.id || '';
  return pjs
    .map(
      (p) =>
        `<option value="${p.id}" ${p.id === targetId ? 'selected' : ''}>${escapeHtml(p.nama_lengkap)} (${escapeHtml(ROLE_LABELS[p.role] || p.role)})</option>`
    )
    .join('');
}

function renderBukaSesiView() {
  const catalog = getMatkulCatalog();
  const firstMatkul = catalog[0] || { mata_kuliah: '', dosen: '', sks: 2, pj_matkul_id: '', pj_matkul_nama: '' };
  const pjMatkulList = getPjMatkulProfiles();
  const todayDate = getWibDateKey(new Date());
  const wibTimeParts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Jakarta',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date());

  const initSks = Number(firstMatkul.sks || 2);
  const initDurasi = initSks * 50;
  const sortedSesi = [...state.sesiAbsensi].sort((a, b) => {
    const da = String(a.tanggal || getWibDateKey(new Date(a.created_at || 0)));
    const dbDate = String(b.tanggal || getWibDateKey(new Date(b.created_at || 0)));
    return dbDate.localeCompare(da) || new Date(b.created_at || 0) - new Date(a.created_at || 0);
  });

  return `
    <div class="page-header">
      <div>
        <span class="meta-line">Otomatisasi Mata Kuliah &amp; Dosen · Durasi 1 SKS = 50 Menit · Khusus Akun Berlabel PJ Mata Kuliah</span>
        <h2>Absensi</h2>
      </div>
    </div>

    <div class="grid-2 grid-2-start">
      <div class="card glass-panel">
        <div class="card-header">
          <div>
            <h3>Buat Sesi Absensi Baru</h3>
            <span class="meta-line">Nama mata kuliah, dosen, dan SKS otomatis terkunci saat memilih dari katalog</span>
          </div>
        </div>
        <form id="form-buka-sesi">
          <div class="field-group">
            <label for="sesi-matkul-preset">Pilih Mata Kuliah (Otomatis Isi &amp; Kunci Mata Kuliah, Dosen, SKS)</label>
            <select id="sesi-matkul-preset">
              ${catalog
                .map(
                  (m, idx) =>
                    `<option value="${idx}" data-matkul="${escapeHtml(m.mata_kuliah)}" data-dosen="${escapeHtml(m.dosen)}" data-sks="${m.sks}" data-pj-matkul-id="${escapeHtml(m.pj_matkul_id || '')}" data-pj-matkul-nama="${escapeHtml(m.pj_matkul_nama || '')}">${escapeHtml(m.mata_kuliah)} — ${escapeHtml(m.dosen)} (${m.sks} SKS)</option>`
                )
                .join('')}
              <option value="custom">-- Masukkan Mata Kuliah &amp; Dosen Baru --</option>
            </select>
          </div>

          <div class="grid-2" style="margin-bottom:0;">
            <div class="field-group">
              <label for="sesi-matkul">Nama Mata Kuliah</label>
              <input type="text" id="sesi-matkul" class="input-locked" value="${escapeHtml(firstMatkul.mata_kuliah)}" placeholder="Masukkan nama mata kuliah" readonly required />
            </div>
            <div class="field-group">
              <label for="sesi-dosen">Dosen Pengampu</label>
              <input type="text" id="sesi-dosen" class="input-locked" value="${escapeHtml(firstMatkul.dosen)}" placeholder="Masukkan nama dosen" readonly required />
            </div>
          </div>

          <div class="field-group">
            <label for="sesi-pj-matkul">Penanggung Jawab Mata Kuliah (Khusus Label PJ Mata Kuliah)</label>
            <select id="sesi-pj-matkul" required>
              ${renderPjMatkulSelectOptions(firstMatkul.pj_matkul_id, firstMatkul.pj_matkul_nama)}
            </select>
            ${
              pjMatkulList.length === 0
                ? '<span class="meta-line" style="color:var(--accent-coral);display:block;margin-top:4px;">Belum ada mahasiswa dengan label <strong>PJ Mata Kuliah</strong>. Tetapkan peran PJ Mata Kuliah terlebih dahulu di menu Kelola Akun &amp; Rekening.</span>'
                : '<span class="meta-line" style="display:block;margin-top:4px;">Hanya akun yang memiliki label <strong>PJ Mata Kuliah</strong> yang dapat dipilih dan dicatat di sini.</span>'
            }
          </div>

          <div class="grid-3" style="margin-bottom:0;">
            <div class="field-group">
              <label for="sesi-tanggal">Tanggal Kuliah</label>
              <input type="date" id="sesi-tanggal" value="${todayDate}" required />
            </div>
            <div class="field-group">
              <label for="sesi-jam-mulai">Jam Mulai (WIB)</label>
              <input type="time" id="sesi-jam-mulai" value="${wibTimeParts}" required />
            </div>
            <div class="field-group">
              <label for="sesi-sks">Jumlah SKS (50 mnt/SKS)</label>
              <select id="sesi-sks" class="input-locked" disabled required>
                ${[1, 2, 3, 4, 5, 6]
                  .map(
                    (n) =>
                      `<option value="${n}" ${n === initSks ? 'selected' : ''}>${n} SKS (${n * 50} menit)</option>`
                  )
                  .join('')}
              </select>
            </div>
          </div>

          <div class="sks-duration-box">
            <div>
              <span class="meta-line">Perhitungan Durasi Otomatis (1 SKS = 50 Menit)</span>
              <strong id="sesi-durasi-label" class="tabular-nums text-cyan">${initSks} SKS × 50 menit = ${initDurasi} menit</strong>
            </div>
            <div style="text-align:right;">
              <span class="meta-line">Batas Jam Absen Selesai</span>
              <strong id="sesi-batas-preview" class="tabular-nums">-</strong>
            </div>
          </div>

          <div class="grid-2" style="margin-bottom:0;">
            <div class="field-group">
              <label for="sesi-pertemuan">Pertemuan Ke-</label>
              <input type="number" id="sesi-pertemuan" min="1" value="${Number(state.pengaturan?.pertemuan_berjalan ?? 0) + 1}" required />
            </div>
            <div class="field-group">
              <label for="sesi-pj">Penanggung Jawab Sesi (Akun Aktif · Terkunci)</label>
              <input
                type="text"
                id="sesi-pj"
                class="input-locked"
                value="${escapeHtml(state.currentUser.nama_lengkap)} (${escapeHtml(ROLE_LABELS[state.currentUser.role] || state.currentUser.role)})"
                readonly
                disabled
              />
            </div>
          </div>

          <div class="grid-2" style="margin-bottom:0;">
            <div class="field-group">
              <label for="sesi-mode">Mode Perkuliahan</label>
              <select id="sesi-mode" required>
                <option value="Luring">Luring (Tatap Muka)</option>
                <option value="Daring">Daring (Tatap Muka Virtual)</option>
                <option value="Hybrid">Hybrid (Luring &amp; Daring)</option>
              </select>
            </div>
            <div class="field-group">
              <label for="sesi-link-daring">Tautan Pertemuan Daring (Opsional)</label>
              <input type="url" id="sesi-link-daring" placeholder="https://zoom.us/... atau https://meet.google.com/..." />
            </div>
          </div>

          <div class="field-group">
            <label for="sesi-batas">Batas Waktu Absen (Otomatis dari Tanggal + Jam Mulai + Durasi SKS)</label>
            <input type="datetime-local" id="sesi-batas" required />
          </div>

          <button type="submit" class="btn btn-primary btn-block" ${pjMatkulList.length === 0 ? 'disabled' : ''}>Simpan &amp; Aktifkan Absensi</button>
        </form>
      </div>

      <div class="card glass-panel sticky-side-card">
        <div class="card-header">
          <div>
            <h3>Daftar Sesi Mata Kuliah</h3>
            <span class="meta-line">Terurut terbaru · Tanggal (DD/MM/YYYY), SKS, durasi, &amp; penanggung jawab mata kuliah</span>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Mata Kuliah &amp; Dosen</th>
                <th>Tanggal &amp; SKS</th>
                <th>PJ Mata Kuliah</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              ${
                sortedSesi.length === 0
                  ? '<tr><td colspan="5" class="text-center">Belum ada sesi absensi.</td></tr>'
                  : sortedSesi
                      .map((s) => {
                        const open = s.is_active && new Date(s.batas_waktu).getTime() > Date.now();
                        const sks = Number(s.sks || 2);
                        const dur = Number(s.durasi_menit || sks * 50);
                        const rawDate = s.tanggal || getWibDateKey(new Date(s.created_at));
                        const pjMatkulDisp = resolveSessionPjMatkulName(s);
                        return `
                          <tr>
                            <td>
                              <strong>${escapeHtml(s.mata_kuliah)}</strong>
                              <div class="meta-line">${escapeHtml(s.dosen)} · Pert. ${s.pertemuan_ke}</div>
                            </td>
                            <td class="tabular-nums">
                              <strong>${escapeHtml(formatDateDdMmYyyy(rawDate))}</strong>
                              <div class="meta-line">${sks} SKS (${dur} mnt) · s.d. ${escapeHtml(formatWibShort(s.batas_waktu))}</div>
                            </td>
                            <td>
                              <strong>${escapeHtml(pjMatkulDisp)}</strong>
                              <div class="meta-line">Sesi: ${escapeHtml(s.pj_nama || '-')}</div>
                            </td>
                            <td><span class="status-tag ${open ? 'tag-success' : 'tag-danger'}">${open ? 'Dibuka' : 'Ditutup'}</span></td>
                            <td>
                              <button type="button" class="btn btn-secondary btn-sm btn-toggle-sesi" data-id="${s.id}" data-active="${s.is_active}">
                                ${s.is_active ? 'Tutup Sesi' : 'Aktifkan'}
                              </button>
                            </td>
                          </tr>
                        `;
                      })
                      .join('')
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function bindBukaSesiEvents() {
  const applyMatkulPresetLockState = (isCustom) => {
    const matkulInput = document.getElementById('sesi-matkul');
    const dosenInput = document.getElementById('sesi-dosen');
    const sksSelect = document.getElementById('sesi-sks');
    if (matkulInput) {
      matkulInput.readOnly = !isCustom;
      matkulInput.classList.toggle('input-locked', !isCustom);
    }
    if (dosenInput) {
      dosenInput.readOnly = !isCustom;
      dosenInput.classList.toggle('input-locked', !isCustom);
    }
    if (sksSelect) {
      sksSelect.disabled = !isCustom;
      sksSelect.classList.toggle('input-locked', !isCustom);
    }
  };

  const recalcSesiDeadline = () => {
    const tgl = document.getElementById('sesi-tanggal')?.value;
    const jam = document.getElementById('sesi-jam-mulai')?.value;
    const sks = Number(document.getElementById('sesi-sks')?.value || 2);
    const durasi = sks * 50;
    const durLabel = document.getElementById('sesi-durasi-label');
    const previewLabel = document.getElementById('sesi-batas-preview');
    const batasInput = document.getElementById('sesi-batas');

    if (durLabel) durLabel.textContent = `${sks} SKS × 50 menit = ${durasi} menit`;
    if (!tgl || !jam || !batasInput) return;

    const start = new Date(`${tgl}T${jam}:00`);
    if (Number.isNaN(start.getTime())) return;
    const end = new Date(start.getTime() + durasi * 60000);
    const localIso = new Date(end.getTime() - end.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
    batasInput.value = localIso;
    if (previewLabel) previewLabel.textContent = formatWibShort(end.toISOString());
  };

  const presetEl = document.getElementById('sesi-matkul-preset');
  applyMatkulPresetLockState(presetEl?.value === 'custom');
  recalcSesiDeadline();

  presetEl?.addEventListener('change', (e) => {
    const opt = e.target.selectedOptions[0];
    const matkulInput = document.getElementById('sesi-matkul');
    const dosenInput = document.getElementById('sesi-dosen');
    const sksSelect = document.getElementById('sesi-sks');
    const pjSelect = document.getElementById('sesi-pj-matkul');
    const isCustom = e.target.value === 'custom';

    applyMatkulPresetLockState(isCustom);
    if (isCustom) {
      matkulInput.value = '';
      dosenInput.value = '';
      matkulInput.focus();
    } else if (opt) {
      matkulInput.value = opt.getAttribute('data-matkul') || '';
      dosenInput.value = opt.getAttribute('data-dosen') || '';
      const sks = opt.getAttribute('data-sks');
      if (sks && sksSelect) sksSelect.value = sks;

      const presetPjId = opt.getAttribute('data-pj-matkul-id') || '';
      const presetPjNama = opt.getAttribute('data-pj-matkul-nama') || '';
      if (pjSelect) {
        if (presetPjId && Array.from(pjSelect.options).some((o) => o.value === presetPjId)) {
          pjSelect.value = presetPjId;
        } else if (presetPjNama) {
          const matchByName = Array.from(pjSelect.options).find(
            (o) => (o.getAttribute('data-nama') || '').toLowerCase() === presetPjNama.toLowerCase()
          );
          if (matchByName) {
            pjSelect.value = matchByName.value;
          }
        }
      }
    }
    recalcSesiDeadline();
  });

  ['sesi-tanggal', 'sesi-jam-mulai', 'sesi-sks'].forEach((id) => {
    document.getElementById(id)?.addEventListener('change', recalcSesiDeadline);
  });

  document.getElementById('form-buka-sesi')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const mata_kuliah = document.getElementById('sesi-matkul').value.trim();
    const dosen = document.getElementById('sesi-dosen').value.trim();
    const tanggal = document.getElementById('sesi-tanggal').value;
    const sks = Number(document.getElementById('sesi-sks').value || 2);
    const durasi_menit = sks * 50;
    const pertemuan_ke = Number(document.getElementById('sesi-pertemuan').value);
    const pjId = state.currentUser.id;
    const pjNama = state.currentUser.nama_lengkap;

    const pjMatkulVal = document.getElementById('sesi-pj-matkul')?.value || '';
    const pObj = state.profiles.find((p) => p.id === pjMatkulVal && p.role === 'pj_matkul');
    if (!pObj) {
      showToast(
        'Hanya akun berlabel PJ Mata Kuliah yang boleh dicatat. Tetapkan role PJ Mata Kuliah di menu Kelola Anggota & Role.',
        'warning'
      );
      return;
    }
    const pjMatkulId = pObj.id;
    const pjMatkulNama = pObj.nama_lengkap;

    const mode_kuliah = document.getElementById('sesi-mode')?.value || 'Luring';
    const link_daring = document.getElementById('sesi-link-daring')?.value.trim() || '';
    const batasRaw = document.getElementById('sesi-batas').value;

    try {
      await db.insert('sesi_absensi', {
        mata_kuliah,
        dosen,
        pertemuan_ke,
        tanggal,
        sks,
        durasi_menit,
        batas_waktu: new Date(batasRaw).toISOString(),
        pj_id: pjId,
        pj_nama: pjNama,
        pj_matkul_id: pjMatkulId,
        pj_matkul_nama: pjMatkulNama,
        mode_kuliah,
        link_daring,
        dibuka_oleh: state.currentUser.id,
        is_active: true,
      });
      await db.loadAll();
      showToast(
        `Sesi ${mata_kuliah} (${mode_kuliah} · ${sks} SKS) · PJ Matkul: ${pjMatkulNama} · PJ Sesi: ${pjNama} dibuka!`,
        'success'
      );
      renderActiveTab();
    } catch (err) {
      showToast(err.message || 'Gagal membuka sesi absensi.', 'danger');
    }
  });

  document.querySelectorAll('.btn-toggle-sesi').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      const cur = btn.getAttribute('data-active') === 'true';
      try {
        await db.update('sesi_absensi', id, { is_active: !cur });
        await db.loadAll();
        showToast(`Status sesi berhasil ${!cur ? 'diaktifkan' : 'ditutup'}.`, 'info');
        renderActiveTab();
      } catch (err) {
        showToast(err.message || 'Gagal mengubah status sesi.', 'danger');
      }
    });
  });
}

function renderVerifikasiAbsenView() {
  const queue = state.absensi.filter((a) => a.status_verifikasi === 'Menunggu');
  const profileMap = Object.fromEntries(state.profiles.map((p) => [p.id, p]));
  const sesiMap = Object.fromEntries(state.sesiAbsensi.map((s) => [s.id, s]));

  return `
    <div class="page-header">
      <div>
        <span class="meta-line">Periksa Foto Stempel Waktu &amp; Titik Koordinat GPS Mahasiswa</span>
        <h2>Antrean Verifikasi Kehadiran</h2>
      </div>
      <span class="status-tag tag-coral tabular-nums">${queue.length} Menunggu Persetujuan</span>
    </div>

    <div class="card glass-panel">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Mahasiswa</th>
              <th>Mata Kuliah</th>
              <th>Waktu &amp; GPS</th>
              <th>Foto Stempel Waktu</th>
              <th>Keputusan</th>
            </tr>
          </thead>
          <tbody>
            ${
              queue.length === 0
                ? '<tr><td colspan="5" class="text-center">Antrean verifikasi kosong. Semua kiriman telah diproses.</td></tr>'
                  : queue
                    .map((a) => {
                      const mhs = profileMap[a.user_id];
                      const sesi = sesiMap[a.sesi_id];
                      return `
                        <tr>
                          <td>
                            <strong>${escapeHtml(mhs?.nama_lengkap || '-')}</strong>
                            <div class="meta-line tabular-nums">${escapeHtml(mhs?.npm || '-')}</div>
                          </td>
                          <td>
                            <strong>${escapeHtml(sesi?.mata_kuliah || '-')}</strong>
                            <div class="meta-line">Pertemuan ke-${sesi?.pertemuan_ke || '-'}</div>
                          </td>
                          <td>
                            <div class="tabular-nums">${escapeHtml(formatWibShort(a.waktu_kirim))}</div>
                            <div style="margin-top:5px;">${renderGpsTriggerButton(a)}</div>
                          </td>
                          <td>
                            ${
                              a.foto_url
                                ? `<button type="button" class="btn btn-secondary btn-sm btn-view-img" data-url="${escapeHtml(a.foto_url)}" data-title="Foto Stempel Waktu · ${escapeHtml(mhs?.nama_lengkap || '')}">Periksa Foto</button>`
                                : '<span class="meta-line">Tidak ada foto</span>'
                            }
                          </td>
                          <td>
                            <div class="row-actions">
                              <button type="button" class="btn btn-success-soft btn-sm btn-acc-absen" data-id="${a.id}" data-user="${a.user_id}">Terima</button>
                              <button type="button" class="btn btn-danger-soft btn-sm btn-reject-absen" data-id="${a.id}" data-user="${a.user_id}">Tolak</button>
                            </div>
                          </td>
                        </tr>
                      `;
                    })
                    .join('')
            }
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function bindVerifikasiAbsenEvents() {
  bindImagePreviewButtons();
  bindGpsMapButtons();

  document.querySelectorAll('.btn-acc-absen').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      const userId = btn.getAttribute('data-user');
      const absen = state.absensi.find((a) => a.id === id);
      const mhs = state.profiles.find((p) => p.id === userId);
      const sesi = absen ? state.sesiAbsensi.find((s) => s.id === absen.sesi_id) : null;
      const matkulLabel = sesi ? `${sesi.mata_kuliah} (Pertemuan ke-${sesi.pertemuan_ke})` : 'perkuliahan';
      const pjNama = state.currentUser.nama_lengkap;
      const pjId = state.currentUser.id;
      try {
        await db.update('absensi', id, {
          status_verifikasi: 'Disetujui',
          pj_id: pjId,
          pj_nama: pjNama,
          dicatat_oleh: pjId,
        });
        const notifItems = [
          {
            user_id: userId,
            judul: 'Absensi Disetujui',
            pesan: `Kehadiran Anda pada ${matkulLabel} telah disetujui oleh ${pjNama}.`,
            tipe: 'success',
          },
        ];
        getUserIdsByRoles(['ketua', 'admin']).forEach((targetId) => {
          notifItems.push({
            user_id: targetId,
            judul: 'Persetujuan Absensi Mahasiswa',
            pesan: `Absensi ${mhs?.nama_lengkap || 'Mahasiswa'} (${mhs?.npm || '-'}) pada ${matkulLabel} telah disetujui oleh ${pjNama}.`,
            tipe: 'success',
          });
        });
        await emitNotifications(notifItems);
        await db.loadAll();
        showToast('Kehadiran mahasiswa disetujui!', 'success');
        renderSidebarNav();
        renderActiveTab();
      } catch (err) {
        showToast(err.message || 'Gagal menyetujui absensi.', 'danger');
      }
    });
  });

  document.querySelectorAll('.btn-reject-absen').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      const userId = btn.getAttribute('data-user');
      const absen = state.absensi.find((a) => a.id === id);
      const mhs = state.profiles.find((p) => p.id === userId);
      const sesi = absen ? state.sesiAbsensi.find((s) => s.id === absen.sesi_id) : null;
      const matkulLabel = sesi ? `${sesi.mata_kuliah} (Pertemuan ke-${sesi.pertemuan_ke})` : 'perkuliahan';
      const pjNama = state.currentUser.nama_lengkap;
      const pjId = state.currentUser.id;
      try {
        await db.update('absensi', id, {
          status_kehadiran: 'Alpha',
          status_verifikasi: 'Ditolak',
          pj_id: pjId,
          pj_nama: pjNama,
          dicatat_oleh: pjId,
        });
        const notifItems = [
          {
            user_id: userId,
            judul: 'Absensi Ditolak',
            pesan: `Kiriman absensi Anda pada ${matkulLabel} ditolak oleh ${pjNama}. Hubungi Ketua/Admin jika terjadi kekeliruan.`,
            tipe: 'danger',
          },
        ];
        getUserIdsByRoles(['ketua', 'admin']).forEach((targetId) => {
          notifItems.push({
            user_id: targetId,
            judul: 'Absensi Mahasiswa Ditolak',
            pesan: `Absensi ${mhs?.nama_lengkap || 'Mahasiswa'} (${mhs?.npm || '-'}) pada ${matkulLabel} ditolak oleh ${pjNama}.`,
            tipe: 'danger',
          });
        });
        await emitNotifications(notifItems);
        await db.loadAll();
        showToast('Absensi ditolak dan dicatat Alpha.', 'warning');
        renderSidebarNav();
        renderActiveTab();
      } catch (err) {
        showToast(err.message || 'Gagal menolak absensi.', 'danger');
      }
    });
  });
}

function renderManualAbsenView() {
  const students = state.profiles.filter((p) => isStudentRole(p.role));
  const u = state.currentUser;
  const matkulList = Array.from(
    new Set(state.sesiAbsensi.map((s) => s.mata_kuliah).filter(Boolean))
  );
  const firstMatkul = matkulList[0] || '';
  const initialSessions = [...state.sesiAbsensi]
    .filter((s) => !firstMatkul || s.mata_kuliah === firstMatkul)
    .sort((a, b) => Number(a.pertemuan_ke || 0) - Number(b.pertemuan_ke || 0));

  return `
    <div class="page-header">
      <div>
        <span class="meta-line">Anti-Kecurangan · Wajib Foto Langsung Penanggung Jawab &amp; GPS</span>
        <h2>Absensi Manual</h2>
      </div>
    </div>

    <div class="card glass-panel" style="max-width:680px;">
      <div class="card-header">
        <div>
          <h3>Pencatatan Manual oleh ${escapeHtml(ROLE_LABELS[u.role] || u.role)}</h3>
          <span class="meta-line">Pilih mata kuliah dan pertemuan secara terpisah untuk mencatat Alpha / Izin / Sakit / Hadir</span>
        </div>
      </div>

      <form id="form-manual-pj">
        <div class="grid-2" style="margin-bottom:0;">
          <div class="field-group">
            <label for="manual-matkul">Pilih Mata Kuliah</label>
            <select id="manual-matkul" required>
              ${
                matkulList.length === 0
                  ? '<option value="">Belum ada mata kuliah</option>'
                  : matkulList
                      .map((mk) => `<option value="${escapeHtml(mk)}">${escapeHtml(mk)}</option>`)
                      .join('')
              }
            </select>
          </div>
          <div class="field-group">
            <label for="manual-pertemuan">Pilih Pertemuan</label>
            <select id="manual-pertemuan" required>
              ${
                initialSessions.length === 0
                  ? '<option value="">Belum ada pertemuan</option>'
                  : initialSessions
                      .map((s) => `<option value="${s.id}">Pertemuan ${s.pertemuan_ke}</option>`)
                      .join('')
              }
            </select>
          </div>
        </div>

        <div class="field-group">
          <label for="manual-student">Pilih Mahasiswa</label>
          <select id="manual-student" required>
            ${students
              .map((m) => `<option value="${m.id}">${escapeHtml(m.nama_lengkap)} (${escapeHtml(m.npm)})</option>`)
              .join('')}
          </select>
        </div>

        <div class="grid-2" style="margin-bottom:0;">
          <div class="field-group">
            <label for="manual-status">Status Kehadiran</label>
            <select id="manual-status" required>
              <option value="Hadir">Hadir</option>
              <option value="Izin">Izin</option>
              <option value="Sakit">Sakit</option>
              <option value="Alpha">Alpha</option>
            </select>
          </div>
          <div class="field-group">
            <label for="manual-pj">Penanggung Jawab Absensi (Akun Aktif · Terkunci)</label>
            <input
              type="text"
              id="manual-pj"
              class="input-locked"
              value="${escapeHtml(u.nama_lengkap)} (${escapeHtml(ROLE_LABELS[u.role] || u.role)})"
              readonly
              disabled
            />
          </div>
        </div>

        <div class="field-group">
          <label for="manual-catatan">Keterangan / Alasan Pencatatan Manual</label>
          <textarea id="manual-catatan" rows="2" placeholder="Contoh: Ponsel mahasiswa mengalami kendala saat di kelas" required></textarea>
        </div>

        <button type="submit" class="btn btn-primary btn-block">
          Lanjut Ambil Foto Penanggung Jawab &amp; GPS
        </button>
      </form>
    </div>
  `;
}

function bindManualAbsenEvents() {
  document.getElementById('manual-matkul')?.addEventListener('change', (e) => {
    const selectedMatkul = e.target.value;
    const pertSelect = document.getElementById('manual-pertemuan');
    if (!pertSelect) return;
    const matching = [...state.sesiAbsensi]
      .filter((s) => s.mata_kuliah === selectedMatkul)
      .sort((a, b) => Number(a.pertemuan_ke || 0) - Number(b.pertemuan_ke || 0));
    pertSelect.innerHTML =
      matching.length === 0
        ? '<option value="">Belum ada pertemuan</option>'
        : matching
            .map((s) => `<option value="${s.id}">Pertemuan ${s.pertemuan_ke}</option>`)
            .join('');
  });

  document.getElementById('form-manual-pj')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const sesiId = document.getElementById('manual-pertemuan')?.value;
    const studentId = document.getElementById('manual-student').value;
    const statusKehadiran = document.getElementById('manual-status').value;
    const pjId = state.currentUser.id;
    const pjNama = state.currentUser.nama_lengkap;
    const catatan = document.getElementById('manual-catatan').value.trim();

    if (!sesiId || !studentId) {
      showToast('Pilih mata kuliah, pertemuan, dan mahasiswa terlebih dahulu.', 'warning');
      return;
    }

    const student = state.profiles.find((p) => p.id === studentId);
    openAttendanceCameraModal('manual_pj', {
      sesiId,
      studentId,
      studentName: student?.nama_lengkap || 'Mahasiswa',
      statusKehadiran,
      pjId,
      pjNama,
      catatan,
    });
  });
}

function renderRiwayatDanCutiView() {
  const profileMap = Object.fromEntries(state.profiles.map((p) => [p.id, p]));
  const sesiMap = Object.fromEntries(state.sesiAbsensi.map((s) => [s.id, s]));
  const q = state.filters.riwayatSearch.toLowerCase();
  const st = state.filters.riwayatStatus;

  const filtered = state.absensi.filter((a) => {
    const mhs = profileMap[a.user_id];
    const sesi = sesiMap[a.sesi_id];
    const text = `${mhs?.nama_lengkap || ''} ${mhs?.npm || ''} ${sesi?.mata_kuliah || ''} ${a.pj_nama || ''}`.toLowerCase();
    const matchQ = !q || text.includes(q);
    const matchSt = st === 'Semua' || a.status_kehadiran === st;
    return matchQ && matchSt;
  });

  return `
    <div class="page-header">
      <div>
        <span class="meta-line">Monitoring Kehadiran Lengkap &amp; Verifikasi Surat Cuti</span>
        <h2>Riwayat Kehadiran &amp; Pengajuan Cuti</h2>
      </div>
    </div>

    <div class="card glass-panel" style="margin-bottom:20px;">
      <div class="card-header">
        <div>
          <h3>Riwayat Seluruh Kehadiran</h3>
          <span class="meta-line">Gunakan ikon edit untuk koreksi status atau ikon hapus untuk data keliru</span>
        </div>
      </div>

      <div class="toolbar-filters">
        <input
          type="search"
          id="filter-riwayat-search"
          placeholder="Cari nama mahasiswa, NPM, matkul, atau PJ..."
          value="${escapeHtml(state.filters.riwayatSearch)}"
        />
        <select id="filter-riwayat-status">
          ${['Semua', 'Hadir', 'Izin', 'Sakit', 'Alpha', 'Belum Absen!']
            .map((opt) => `<option value="${opt}" ${st === opt ? 'selected' : ''}>Status: ${opt}</option>`)
            .join('')}
        </select>
      </div>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Mahasiswa</th>
              <th>Mata Kuliah</th>
              <th>Lokasi GPS</th>
              <th>Kehadiran</th>
              <th>Verifikasi &amp; PJ</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${
              filtered.length === 0
                ? '<tr><td colspan="6" class="text-center">Tidak ada data kehadiran yang cocok.</td></tr>'
                : filtered
                    .map((a) => {
                      const mhs = profileMap[a.user_id];
                      const sesi = sesiMap[a.sesi_id];
                      return `
                        <tr>
                          <td>
                            <strong>${escapeHtml(mhs?.nama_lengkap || '-')}</strong>
                            <div class="meta-line tabular-nums">${escapeHtml(mhs?.npm || '-')}</div>
                          </td>
                          <td>
                            <strong>${escapeHtml(sesi?.mata_kuliah || '-')}</strong>
                            <div class="meta-line">Pert. ${sesi?.pertemuan_ke || '-'} · ${escapeHtml(formatWibShort(a.waktu_kirim))}</div>
                          </td>
                          <td>${renderGpsTriggerButton(a)}</td>
                          <td><span class="status-tag ${getStatusTagClass(a.status_kehadiran)}">${escapeHtml(a.status_kehadiran)}</span></td>
                          <td>
                            <span class="status-tag ${getStatusTagClass(a.status_verifikasi)}">${escapeHtml(a.status_verifikasi)}</span>
                            <div class="meta-line">${a.is_manual ? 'Manual PJ: ' : 'PJ: '}${escapeHtml(a.pj_nama || '-')}</div>
                          </td>
                          <td>
                            <div class="row-actions">
                              <button type="button" class="btn btn-secondary btn-sm btn-detail-absen" data-absen-id="${a.id}" data-sesi-id="${a.sesi_id}">Detail</button>
                              <button type="button" class="btn-icon-only btn-edit-absen" data-id="${a.id}" title="Edit status" aria-label="Edit status">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                              </button>
                              <button type="button" class="btn-icon-only danger btn-del-absen" data-id="${a.id}" title="Hapus data" aria-label="Hapus data">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      `;
                    })
                    .join('')
            }
          </tbody>
        </table>
      </div>
    </div>

    <!-- Verifikasi Pengajuan Cuti -->
    <div class="card glass-panel" style="margin-bottom:20px;">
      <div class="card-header">
        <div>
          <h3>Verifikasi Pengajuan Cuti Mahasiswa</h3>
          <span class="meta-line">Periksa surat resmi kampus sebelum menyetujui cuti</span>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Mahasiswa</th>
              <th>Waktu Pengajuan (WIB)</th>
              <th>Rentang Tanggal</th>
              <th>Alasan &amp; Surat</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${
              state.pengajuanCuti.length === 0
                ? '<tr><td colspan="6" class="text-center">Belum ada pengajuan cuti masuk.</td></tr>'
                : state.pengajuanCuti
                    .map((c) => {
                      const mhs = profileMap[c.user_id];
                      const tglJam = c.waktu_pengajuan || c.created_at;
                      return `
                        <tr>
                          <td>
                            <strong>${escapeHtml(mhs?.nama_lengkap || '-')}</strong>
                            <div class="meta-line tabular-nums">${escapeHtml(mhs?.npm || '-')}</div>
                          </td>
                          <td class="tabular-nums">${escapeHtml(formatWibShort(tglJam))}</td>
                          <td class="tabular-nums">${escapeHtml(formatDateDdMmYyyy(c.tanggal_mulai))} s.d. ${escapeHtml(formatDateDdMmYyyy(c.tanggal_selesai))}</td>
                          <td>
                            <div>${escapeHtml(c.alasan)}</div>
                            ${
                              c.surat_url
                                ? `<button type="button" class="btn-link-inline btn-view-img" data-url="${escapeHtml(c.surat_url)}" data-title="Surat Cuti · ${escapeHtml(mhs?.nama_lengkap || '')}">Lihat Surat Resmi</button>`
                                : ''
                            }
                          </td>
                          <td><span class="status-tag ${getStatusTagClass(c.status)}">${escapeHtml(c.status)}</span></td>
                          <td>
                            <div class="row-actions">
                              <button type="button" class="btn btn-success-soft btn-sm btn-cuti-action" data-id="${c.id}" data-user="${c.user_id}" data-status="Disetujui">Setujui</button>
                              <button type="button" class="btn btn-danger-soft btn-sm btn-cuti-action" data-id="${c.id}" data-user="${c.user_id}" data-status="Ditolak">Tolak</button>
                            </div>
                          </td>
                        </tr>
                      `;
                    })
                    .join('')
            }
          </tbody>
        </table>
      </div>
    </div>

    <!-- Riwayat Pengajuan Cuti Disetujui Per Mahasiswa -->
    ${(() => {
      const approvedCuti = state.pengajuanCuti
        .filter((c) => c.status === 'Disetujui')
        .sort((a, b) => new Date(b.waktu_pengajuan || b.created_at) - new Date(a.waktu_pengajuan || a.created_at));
      return `
        <div class="card glass-panel">
          <div class="card-header">
            <div>
              <h3>Riwayat Pengajuan Cuti</h3>
              <span class="meta-line">Daftar pengajuan cuti mahasiswa yang telah disetujui (${approvedCuti.length} catatan)</span>
            </div>
          </div>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Mahasiswa</th>
                  <th>Tanggal Pengajuan</th>
                  <th>Rentang Cuti</th>
                  <th>Alasan</th>
                  <th>Disetujui Oleh (PJ)</th>
                  <th>Surat</th>
                </tr>
              </thead>
              <tbody>
                ${
                  approvedCuti.length === 0
                    ? '<tr><td colspan="6" class="text-center">Belum ada pengajuan cuti yang disetujui.</td></tr>'
                    : approvedCuti
                        .map((c) => {
                          const mhs = profileMap[c.user_id];
                          const reviewer = c.ditinjau_oleh ? profileMap[c.ditinjau_oleh]?.nama_lengkap : '-';
                          const tglAjukan = formatDateDdMmYyyy(getWibDateKey(new Date(c.waktu_pengajuan || c.created_at)));
                          return `
                            <tr>
                              <td>
                                <strong>${escapeHtml(mhs?.nama_lengkap || '-')}</strong>
                                <div class="meta-line tabular-nums">${escapeHtml(mhs?.npm || '-')}</div>
                              </td>
                              <td class="tabular-nums">${escapeHtml(tglAjukan)}</td>
                              <td class="tabular-nums">${escapeHtml(formatDateDdMmYyyy(c.tanggal_mulai))} s.d. ${escapeHtml(formatDateDdMmYyyy(c.tanggal_selesai))}</td>
                              <td>${escapeHtml(c.alasan)}</td>
                              <td><strong>${escapeHtml(reviewer || '-')}</strong></td>
                              <td>
                                ${
                                  c.surat_url
                                    ? `<button type="button" class="btn btn-secondary btn-sm btn-view-img" data-url="${escapeHtml(c.surat_url)}" data-title="Surat Cuti · ${escapeHtml(mhs?.nama_lengkap || '')}">Lihat Surat</button>`
                                    : '-'
                                }
                              </td>
                            </tr>
                          `;
                        })
                        .join('')
                }
              </tbody>
            </table>
          </div>
        </div>
      `;
    })()}
  `;
}

function bindRiwayatDanCutiEvents() {
  bindImagePreviewButtons();
  bindGpsMapButtons();

  document.getElementById('filter-riwayat-search')?.addEventListener('input', (e) => {
    state.filters.riwayatSearch = e.target.value;
    renderActiveTab();
    const el = document.getElementById('filter-riwayat-search');
    if (el) {
      el.focus();
      el.setSelectionRange(el.value.length, el.value.length);
    }
  });

  document.getElementById('filter-riwayat-status')?.addEventListener('change', (e) => {
    state.filters.riwayatStatus = e.target.value;
    renderActiveTab();
  });

  document.querySelectorAll('.btn-detail-absen').forEach((btn) => {
    btn.addEventListener('click', () => {
      openDetailAbsenModal(
        btn.getAttribute('data-absen-id'),
        btn.getAttribute('data-sesi-id')
      );
    });
  });

  document.querySelectorAll('.btn-edit-absen').forEach((btn) => {
    btn.addEventListener('click', () => {
      const a = state.absensi.find((item) => item.id === btn.getAttribute('data-id'));
      if (!a) return;
      const mhs = state.profiles.find((p) => p.id === a.user_id);
      document.getElementById('edit-absen-id').value = a.id;
      document.getElementById('edit-absen-student').textContent = `${mhs?.nama_lengkap || '-'} (${mhs?.npm || '-'})`;
      document.getElementById('edit-absen-status').value = a.status_kehadiran;
      document.getElementById('edit-absen-verif').value = a.status_verifikasi;
      const pjInput = document.getElementById('edit-absen-pj');
      if (pjInput) {
        pjInput.value = `${state.currentUser.nama_lengkap} (${ROLE_LABELS[state.currentUser.role] || state.currentUser.role})`;
      }
      document.getElementById('edit-absen-catatan').value = a.catatan || '';
      document.getElementById('modal-edit-absen').classList.remove('hidden');
    });
  });

  document.querySelectorAll('.btn-del-absen').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      try {
        await db.remove('absensi', id);
        await db.loadAll();
        showToast('Catatan absensi dihapus.', 'info');
        renderSidebarNav();
        renderActiveTab();
      } catch (err) {
        showToast(err.message || 'Gagal menghapus data absensi.', 'danger');
      }
    });
  });

  document.querySelectorAll('.btn-cuti-action').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      const userId = btn.getAttribute('data-user');
      const status = btn.getAttribute('data-status');
      try {
        await db.update('pengajuan_cuti', id, {
          status,
          ditinjau_oleh: state.currentUser.id,
        });
        await db.insert('pemberitahuan', {
          user_id: userId,
          judul: `Pengajuan Cuti ${status}`,
          pesan: `Pengajuan cuti Anda telah ${status.toLowerCase()} oleh ${state.currentUser.nama_lengkap}.`,
          tipe: status === 'Disetujui' ? 'success' : 'danger',
          dibaca: false,
        });
        await db.loadAll();
        showToast(`Status pengajuan cuti diubah menjadi ${status}.`, 'success');
        renderSidebarNav();
        renderActiveTab();
      } catch (err) {
        showToast(err.message || 'Gagal memperbarui status cuti.', 'danger');
      }
    });
  });
}

// ----------------------------------------------------------------------------
// 14. VIEW BENDAHARA & ADMIN: SALURAN PEMBAYARAN & TAGIHAN KAS, REMINDER WA, BUKU KAS
// ----------------------------------------------------------------------------
function renderSaluranTagihanView() {
  const cfg = state.pengaturan || {};
  const [curYearStr, curMonthStr] = getWibDateKey(new Date()).split('-');
  const curMonthIdx = Math.max(0, Math.min(11, Number(curMonthStr || 1) - 1));
  const curYearNum = Number(curYearStr || 2026);
  const bulanOptions = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];
  const defaultBulan = bulanOptions[curMonthIdx] || 'Januari';
  const tahunOptions = Array.from(
    new Set([2025, 2026, 2027, 2028, 2029, 2030, curYearNum])
  ).sort((a, b) => a - b);

  return `
    <div class="page-header">
      <div>
        <span class="meta-line">Saluran Penerimaan Dana &amp; Distribusi Tagihan</span>
        <h2>Saluran Pembayaran &amp; Tagihan Kas</h2>
      </div>
    </div>

    <div class="grid-2">
      <div class="card glass-panel">
        <div class="card-header">
          <div>
            <h3>Info Rekening &amp; QRIS Kelas</h3>
            <span class="meta-line">Ditampilkan otomatis pada halaman pembayaran mahasiswa</span>
          </div>
        </div>

        <div class="payment-channel-box">
          <div class="bank-info-row">
            <div>
              <span class="meta-line">Bank / Dompet Digital</span>
              <strong>${escapeHtml(cfg.nama_bank || 'BCA')}</strong>
            </div>
            <div>
              <span class="meta-line">Atas Nama</span>
              <strong>${escapeHtml(cfg.atas_nama_rekening || '-')}</strong>
            </div>
          </div>
          <div class="bank-account-copy">
            <div>
              <span class="meta-line">Nomor Rekening</span>
              <strong class="tabular-nums">${escapeHtml(cfg.no_rekening || '-')}</strong>
            </div>
            <button type="button" id="btn-copy-rekening-bendahara" class="btn btn-secondary btn-sm" data-rek="${escapeHtml(cfg.no_rekening || '')}">
              Salin Rekening
            </button>
          </div>
        </div>

        <div class="payment-channel-box">
          <div class="qris-header-row">
            <div>
              <strong>${escapeHtml(cfg.qris_merchant_name || 'Mas_hy, Fashion')}</strong>
              <span class="meta-line tabular-nums">NMID: ${escapeHtml(cfg.qris_nmid || '-')}</span>
            </div>
            <button type="button" id="btn-preview-qris-10m" class="btn btn-coral btn-sm">
              Buka QRIS Batas Waktu 10 Menit
            </button>
          </div>
        </div>
      </div>

      <div class="card glass-panel">
        <div class="card-header">
          <div>
            <h3>Buat Tagihan Kas</h3>
            <span class="meta-line">Otomatis muncul di tabel tagihan seluruh mahasiswa kelas R3S</span>
          </div>
        </div>

        <form id="form-tagihan-massal">
          <div class="grid-2" style="margin-bottom:0;">
            <div class="field-group">
              <label for="massal-minggu">Periode Minggu</label>
              <select id="massal-minggu" required>
                <option value="Minggu 1" selected>Minggu 1</option>
                <option value="Minggu 2">Minggu 2</option>
                <option value="Minggu 3">Minggu 3</option>
                <option value="Minggu 4">Minggu 4</option>
              </select>
            </div>
            <div class="field-group">
              <label for="massal-bulan">Bulan &amp; Tahun</label>
              <div class="inline-select-pair">
                <select id="massal-bulan" aria-label="Pilih Bulan" required>
                  ${bulanOptions
                    .map(
                      (bln) =>
                        `<option value="${bln}" ${bln === defaultBulan ? 'selected' : ''}>${bln}</option>`
                    )
                    .join('')}
                </select>
                <select id="massal-tahun" aria-label="Pilih Tahun" required class="tabular-nums">
                  ${tahunOptions
                    .map(
                      (thn) =>
                        `<option value="${thn}" ${thn === curYearNum ? 'selected' : ''}>${thn}</option>`
                    )
                    .join('')}
                </select>
              </div>
            </div>
          </div>
          <div class="field-group" style="margin-top:-2px;">
            <span class="meta-line">
              Format Periode Tagihan:
              <strong id="massal-periode-preview" class="text-cyan">Minggu 1 - ${escapeHtml(defaultBulan)} ${curYearNum}</strong>
            </span>
          </div>
          <div class="grid-2" style="margin-bottom:0;">
            <div class="field-group">
              <label for="massal-nominal">Nominal Tagihan (Min Rp 2.000)</label>
              <input type="number" id="massal-nominal" min="2000" step="500" value="${cfg.nominal_kas_default || 10000}" required class="tabular-nums" />
            </div>
            <div class="field-group">
              <label for="massal-pj">Penanggung Jawab Kas (Akun Aktif · Terkunci)</label>
              <input
                type="text"
                id="massal-pj"
                class="input-locked"
                value="${escapeHtml(state.currentUser.nama_lengkap)} (${escapeHtml(ROLE_LABELS[state.currentUser.role] || state.currentUser.role)})"
                readonly
                disabled
              />
            </div>
          </div>
          <button type="submit" class="btn btn-primary btn-block">Sebarkan Tagihan Kas ke Semua Mahasiswa</button>
        </form>
      </div>
    </div>
  `;
}

function bindSaluranTagihanEvents() {
  document.getElementById('btn-copy-rekening-bendahara')?.addEventListener('click', (e) => {
    const rek = e.target.getAttribute('data-rek');
    navigator.clipboard?.writeText(rek);
    showToast(`Nomor rekening ${rek} disalin!`, 'success');
  });

  document.getElementById('btn-preview-qris-10m')?.addEventListener('click', () => {
    const cfg = state.pengaturan || {};
    openPayKasModal(
      {
        id: '',
        periode: 'QRIS Pembayaran Resmi Kelas R3S',
        nominal_tagihan: cfg.nominal_kas_default || 10000,
      },
      { previewOnly: true }
    );
  });

  const mingguSelect = document.getElementById('massal-minggu');
  const bulanSelect = document.getElementById('massal-bulan');
  const tahunSelect = document.getElementById('massal-tahun');
  const previewEl = document.getElementById('massal-periode-preview');
  const getFormattedPeriode = () => {
    const minggu = mingguSelect?.value.trim() || '';
    const bulan = bulanSelect?.value.trim() || '';
    const tahun = tahunSelect?.value.trim() || '';
    return minggu && bulan && tahun ? `${minggu} - ${bulan} ${tahun}` : '';
  };
  const updatePeriodePreview = () => {
    if (previewEl) {
      previewEl.textContent = getFormattedPeriode() || '-';
    }
  };
  mingguSelect?.addEventListener('change', updatePeriodePreview);
  bulanSelect?.addEventListener('change', updatePeriodePreview);
  tahunSelect?.addEventListener('change', updatePeriodePreview);

  document.getElementById('form-tagihan-massal')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const periode = getFormattedPeriode();
    const nominal = Number(document.getElementById('massal-nominal').value);
    const students = state.profiles.filter((p) => isKasMemberRole(p.role));

    if (!periode) {
      showToast('Pilih periode minggu, bulan, dan tahun terlebih dahulu.', 'danger');
      return;
    }
    if (nominal < 2000) {
      showToast('Nominal tagihan kas minimal Rp 2.000.', 'danger');
      return;
    }
    if (students.length === 0) {
      showToast('Belum ada akun anggota kelas terdaftar.', 'warning');
      return;
    }

    try {
      const pjId = state.currentUser.id;
      const pjNama = state.currentUser.nama_lengkap;
      const payloads = students.map((m) => ({
        user_id: m.id,
        periode,
        nominal_tagihan: nominal,
        nominal_dibayar: 0,
        metode_bayar: null,
        bukti_url: '',
        pj_id: pjId,
        pj_nama: pjNama,
        dicatat_oleh: pjId,
        status: 'Belum Lunas',
      }));
      await db.insert('iuran_kas', payloads);

      const notifPayloads = students.map((m) => ({
        user_id: m.id,
        judul: `Tagihan Kas Baru: ${periode}`,
        pesan: `Tagihan kas sebesar ${formatRupiah(nominal)} telah diterbitkan oleh ${pjNama}.`,
        tipe: 'info',
        dibaca: false,
      }));
      await db.insert('pemberitahuan', notifPayloads);
      await db.loadAll();
      showToast(`Tagihan Kas ${periode} (PJ: ${pjNama}) berhasil disebar ke ${students.length} anggota kelas!`, 'success');
      e.target.reset();
      updatePeriodePreview();
    } catch (err) {
      showToast(err.message || 'Gagal membuat tagihan kas.', 'danger');
    }
  });
}

function renderDaftarPembayaranView() {
  const students = state.profiles.filter((p) => isKasMemberRole(p.role));
  const pendingBills = state.iuranKas.filter((i) => i.status === 'Menunggu Verifikasi');
  const profileMap = Object.fromEntries(state.profiles.map((p) => [p.id, p]));

  return `
    <div class="page-header">
      <div>
        <span class="meta-line">Verifikasi Bukti Transfer &amp; Pengingat Tunggakan</span>
        <h2>Daftar Pembayaran &amp; Pengingat WA</h2>
      </div>
      <span class="status-tag tag-coral tabular-nums">${pendingBills.length} Bukti Menunggu Verifikasi</span>
    </div>

    <!-- Antrean Verifikasi Bukti Transfer -->
    <div class="card glass-panel" style="margin-bottom:20px;">
      <div class="card-header">
        <div>
          <h3>Antrean Verifikasi Pembayaran Kas</h3>
          <span class="meta-line">Klik Terima Kas untuk mengubah status Lunas dan otomatis menambah pemasukan kas</span>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Mahasiswa</th>
              <th>Periode &amp; Metode</th>
              <th>Nominal</th>
              <th>Bukti</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${
              pendingBills.length === 0
                ? '<tr><td colspan="5" class="text-center">Tidak ada bukti pembayaran menunggu verifikasi.</td></tr>'
                : pendingBills
                    .map((b) => {
                      const mhs = profileMap[b.user_id];
                      return `
                        <tr>
                          <td>
                            <strong>${escapeHtml(mhs?.nama_lengkap || '-')}</strong>
                            <div class="meta-line tabular-nums">${escapeHtml(mhs?.npm || '-')}</div>
                          </td>
                          <td>
                            <strong>${escapeHtml(b.periode)}</strong>
                            <div class="meta-line">${escapeHtml(b.metode_bayar || '-')} · ${escapeHtml(formatWibShort(b.tanggal_bayar))}</div>
                          </td>
                          <td class="tabular-nums">${formatRupiah(b.nominal_dibayar || b.nominal_tagihan)}</td>
                          <td>
                            ${
                              b.bukti_url
                                ? `<button type="button" class="btn btn-secondary btn-sm btn-view-img" data-url="${escapeHtml(b.bukti_url)}" data-title="Bukti Kas · ${escapeHtml(mhs?.nama_lengkap || '')}">Lihat Bukti</button>`
                                : '<span class="meta-line">Tanpa lampiran</span>'
                            }
                          </td>
                          <td>
                            <div class="row-actions">
                              <button type="button" class="btn btn-success-soft btn-sm btn-acc-kas" data-id="${b.id}">Terima Kas</button>
                              <button type="button" class="btn btn-danger-soft btn-sm btn-tolak-kas" data-id="${b.id}">Tolak</button>
                            </div>
                          </td>
                        </tr>
                      `;
                    })
                    .join('')
            }
          </tbody>
        </table>
      </div>
    </div>

    <!-- Rekap Tunggakan per Mahasiswa & Tombol WA -->
    <div class="card glass-panel">
      <div class="card-header">
        <div>
          <h3>Rekapitulasi Pembayaran &amp; Tunggakan Anggota</h3>
          <span class="meta-line">Kirim pengingat lewat WhatsApp atau kotak notifikasi portal</span>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Mahasiswa</th>
              <th>Total Sudah Dibayar</th>
              <th>Sisa Tunggakan</th>
              <th>Status</th>
              <th>Pengingat</th>
            </tr>
          </thead>
          <tbody>
            ${students
              .map((m) => {
                const ks = getStudentKasStats(m.id);
                const totalBayar = ks.sudahBayar;
                const sisa = ks.tunggakan;

                return `
                  <tr>
                    <td>
                      <strong>${escapeHtml(m.nama_lengkap)}</strong>
                      <div class="meta-line tabular-nums">${escapeHtml(m.npm)}</div>
                    </td>
                    <td class="tabular-nums text-success">${formatRupiah(totalBayar)}</td>
                    <td class="tabular-nums ${sisa > 0 ? 'text-danger' : 'text-success'}">${formatRupiah(sisa)}</td>
                    <td><span class="status-tag ${sisa > 0 ? 'tag-danger' : 'tag-success'}">${sisa > 0 ? 'Belum Lunas' : 'Aman / Lunas'}</span></td>
                    <td>
                      <div class="row-actions">
                        ${
                          sisa > 0
                            ? `<button type="button" class="btn btn-secondary btn-sm btn-remind-wa" data-user="${m.id}" data-nama="${escapeHtml(m.nama_lengkap)}" data-sisa="${sisa}">Ingatkan via WhatsApp</button>
                               <button type="button" class="btn btn-coral btn-sm btn-remind-portal" data-user="${m.id}" data-nama="${escapeHtml(m.nama_lengkap)}" data-sisa="${sisa}">Notif Portal</button>`
                            : '<span class="meta-line">Tidak ada tunggakan</span>'
                        }
                      </div>
                    </td>
                  </tr>
                `;
              })
              .join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function bindDaftarPembayaranEvents() {
  bindImagePreviewButtons();

  document.querySelectorAll('.btn-acc-kas').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      const bill = state.iuranKas.find((i) => i.id === id);
      if (!bill) return;
      const mhs = state.profiles.find((p) => p.id === bill.user_id);
      const nom = Number(bill.nominal_dibayar || bill.nominal_tagihan);
      const senderName = mhs?.nama_lengkap || 'Mahasiswa';
      const verifierName = state.currentUser.nama_lengkap;
      const verifierId = state.currentUser.id;

      try {
        await db.update('iuran_kas', id, {
          status: 'Lunas',
          nominal_dibayar: nom,
          verified_by: verifierId,
          pj_id: verifierId,
          pj_nama: verifierName,
        });
        await db.insert('transaksi_kas', {
          jenis: 'Pemasukan',
          kategori: 'Iuran Kas',
          tanggal: getWibDateKey(new Date()),
          keterangan: `Iuran Kas ${bill.periode} · Pengirim: ${senderName} (${bill.metode_bayar || 'Transfer'})`,
          pengirim_nama: senderName,
          nominal: nom,
          nota_url: bill.bukti_url || '',
          terkait_user_id: bill.user_id,
          pj_id: null,
          pj_nama: '',
          dicatat_oleh: state.currentUser.id,
        });

        const notifItems = [
          {
            user_id: bill.user_id,
            judul: 'Pembayaran Kas Disetujui (Lunas)',
            pesan: `Pembayaran kas ${bill.periode} sebesar ${formatRupiah(nom)} telah disetujui oleh ${verifierName} dan berstatus Lunas.`,
            tipe: 'success',
          },
        ];
        getUserIdsByRoles(['admin']).forEach((adminId) => {
          notifItems.push({
            user_id: adminId,
            judul: 'Pembayaran Kas Mahasiswa Disetujui',
            pesan: `Pembayaran kas ${senderName} (${mhs?.npm || '-'}) untuk ${bill.periode} (${formatRupiah(nom)}) telah disetujui oleh ${verifierName}.`,
            tipe: 'success',
          });
        });
        getUserIdsByRoles(['bendahara']).forEach((bendaharaId) => {
          notifItems.push({
            user_id: bendaharaId,
            judul: 'Verifikasi Pembayaran Kas Berhasil',
            pesan: `Iuran kas ${senderName} (${bill.periode}) sebesar ${formatRupiah(nom)} resmi berstatus Lunas (PJ: ${verifierName}).`,
            tipe: 'success',
          });
        });
        await emitNotifications(notifItems);

        await db.loadAll();
        showToast('Pembayaran kas diterima & saldo pemasukan bertambah!', 'success');
        renderSidebarNav();
        renderActiveTab();
      } catch (err) {
        showToast(err.message || 'Gagal memverifikasi kas.', 'danger');
      }
    });
  });

  document.querySelectorAll('.btn-tolak-kas').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      const bill = state.iuranKas.find((i) => i.id === id);
      if (!bill) return;
      const mhs = state.profiles.find((p) => p.id === bill.user_id);
      const senderName = mhs?.nama_lengkap || 'Mahasiswa';
      const verifierName = state.currentUser.nama_lengkap;
      const verifierId = state.currentUser.id;
      try {
        try {
          await db.update('iuran_kas', id, {
            status: 'Ditolak',
            nominal_dibayar: 0,
            pj_id: verifierId,
            pj_nama: verifierName,
          });
        } catch (constraintErr) {
          const msg = String(constraintErr?.message || '').toLowerCase();
          if (msg.includes('check') || msg.includes('iuran_kas_status_check')) {
            await db.update('iuran_kas', id, {
              status: 'Belum Lunas',
              nominal_dibayar: 0,
              metode_bayar: 'Ditolak',
              pj_id: verifierId,
              pj_nama: verifierName,
            });
          } else {
            throw constraintErr;
          }
        }

        const notifItems = [
          {
            user_id: bill.user_id,
            judul: 'Bukti Pembayaran Kas Ditolak',
            pesan: `Bukti pembayaran kas ${bill.periode} ditolak oleh ${verifierName}. Silakan unggah ulang bukti yang valid.`,
            tipe: 'danger',
          },
        ];
        getUserIdsByRoles(['admin', 'bendahara']).forEach((targetId) => {
          notifItems.push({
            user_id: targetId,
            judul: 'Pembayaran Kas Ditolak',
            pesan: `Bukti pembayaran kas ${senderName} untuk ${bill.periode} ditolak oleh ${verifierName}.`,
            tipe: 'danger',
          });
        });
        await emitNotifications(notifItems);

        await db.loadAll();
        showToast('Bukti pembayaran ditolak dan status diubah menjadi Ditolak.', 'warning');
        renderSidebarNav();
        renderActiveTab();
      } catch (err) {
        showToast(err.message || 'Gagal menolak bukti pembayaran.', 'danger');
      }
    });
  });

  document.querySelectorAll('.btn-remind-portal').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const userId = btn.getAttribute('data-user');
      const nama = btn.getAttribute('data-nama') || 'Mahasiswa';
      const sisa = Number(btn.getAttribute('data-sisa'));
      try {
        await emitNotifications([
          {
            user_id: userId,
            judul: 'Pengingat Tunggakan Kas Kelas',
            pesan: `Anda memiliki sisa tunggakan kas sebesar ${formatRupiah(sisa)}. Mohon segera melunasi di menu Pembayaran Kas.`,
            tipe: 'warning',
          },
          {
            user_id: state.currentUser.id,
            judul: 'Pengingat Portal Terkirim',
            pesan: `Pengingat tunggakan kas sebesar ${formatRupiah(sisa)} telah dikirim ke portal ${nama}.`,
            tipe: 'info',
          },
        ]);
        await db.loadAll();
        renderSidebarNav();
        showToast(`Notifikasi pengingat terkirim ke ${nama}.`, 'success');
      } catch (err) {
        showToast(err.message || 'Gagal mengirim notifikasi.', 'danger');
      }
    });
  });

  document.querySelectorAll('.btn-remind-wa').forEach((btn) => {
    btn.addEventListener('click', () => {
      const userId = btn.getAttribute('data-user');
      if (userId) openWaReminderModal(userId);
    });
  });
}

function getUnpaidBillSisa(bill) {
  if (!bill || bill.status === 'Lunas') return 0;
  if (bill.status === 'Menunggu Verifikasi' || bill.status === 'Ditolak') {
    return Number(bill.nominal_tagihan || 0);
  }
  return Math.max(0, Number(bill.nominal_tagihan || 0) - Number(bill.nominal_dibayar || 0));
}

function buildWaKasReminderMessage(student, ks) {
  const cfg = state.pengaturan || {};
  const unpaidBills = (ks.bills || []).filter((b) => b.status !== 'Lunas');
  const lines = unpaidBills.map((b, idx) => {
    const tagihan = Number(b.nominal_tagihan || 0);
    const sisaBill = getUnpaidBillSisa(b);
    const statusText =
      b.status === 'Ditolak' || (b.status === 'Belum Lunas' && b.metode_bayar === 'Ditolak')
        ? 'Bukti Ditolak'
        : b.status;
    return `${idx + 1}. ${b.periode} | Tagihan: ${formatRupiah(tagihan)} | Sisa: ${formatRupiah(sisaBill)} (${statusText})`;
  });

  const issuer = state.currentUser?.nama_lengkap || 'Pengurus Kas Kelas';
  return [
    `*PENGINGAT & BUKTI TUNGGAKAN KAS KELAS ${cfg.nama_kelas || 'R3S'}*`,
    `--------------------------------`,
    `Nama  : ${student.nama_lengkap}`,
    `NIM   : ${student.npm || '-'}`,
    `Waktu : ${formatWibClock(new Date())}`,
    ``,
    `*Rincian Periode Tunggakan:*`,
    lines.length ? lines.join('\n') : `- Total Tunggakan Berjalan: ${formatRupiah(ks.tunggakan)}`,
    ``,
    `*Ringkasan Keuangan:*`,
    `- Total Sudah Dibayar : ${formatRupiah(ks.sudahBayar)}`,
    `- Total Sisa Tunggakan: *${formatRupiah(ks.tunggakan)}*`,
    ``,
    `*Saluran Pembayaran Resmi:*`,
    `- Bank ${cfg.nama_bank || 'BCA'}: ${cfg.no_rekening || '-'} (a.n. ${cfg.atas_nama_rekening || 'Bendahara R3S'})`,
    `- QRIS: ${cfg.qris_merchant_name || 'Mas_hy, Fashion'} (NMID: ${cfg.qris_nmid || '-'})`,
    ``,
    `Mohon segera melakukan pembayaran melalui Portal Kas R3S dan mengunggah bukti pembayaran.`,
    `_(Terlampir gambar bukti rincian tunggakan kas resmi)_`,
    `Diterbitkan oleh: ${issuer}`,
  ].join('\n');
}

function generateKasReminderProofPng(student, ks) {
  const cfg = state.pengaturan || {};
  const unpaidBills = (ks.bills || []).filter((b) => b.status !== 'Lunas');
  const maxVisible = 8;
  const visibleBills = unpaidBills.slice(0, maxVisible);
  const extraCount = Math.max(0, unpaidBills.length - maxVisible);
  const tableRowsCount = Math.max(1, visibleBills.length + (extraCount > 0 ? 1 : 0));

  const W = 920;
  const H = 450 + tableRowsCount * 42;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  // Latar putih bersih seperti dokumen resmi
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  // Bingkai luar dokumen
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 2;
  ctx.strokeRect(12, 12, W - 24, H - 24);

  // Garis aksen biru navy di atas
  ctx.fillStyle = '#163a78';
  ctx.fillRect(12, 12, W - 24, 10);

  // Header Kop
  ctx.fillStyle = '#475569';
  ctx.font = 'bold 13px "Plus Jakarta Sans", Arial, sans-serif';
  ctx.fillText(`AKTIVITAS KELAS RS · PUSAT ABSENSI & KAS KELAS ${String(cfg.nama_kelas || 'R3S').toUpperCase()}`, 38, 52);

  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 26px "Plus Jakarta Sans", Arial, sans-serif';
  ctx.fillText('BUKTI RINCIAN TUNGGAKAN KAS', 38, 86);

  // Badge status kanan atas
  ctx.fillStyle = '#fee2e2';
  ctx.strokeStyle = '#fca5a5';
  ctx.lineWidth = 1.5;
  ctx.fillRect(W - 196, 44, 158, 36);
  ctx.strokeRect(W - 196, 44, 158, 36);
  ctx.fillStyle = '#b91c1c';
  ctx.font = 'bold 14px "Plus Jakarta Sans", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('BELUM LUNAS', W - 117, 67);
  ctx.textAlign = 'left';

  // Garis pemisah header
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(38, 104);
  ctx.lineTo(W - 38, 104);
  ctx.stroke();

  // Blok Metadata Anggota
  ctx.fillStyle = '#f8fafc';
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1;
  ctx.fillRect(38, 118, W - 76, 94);
  ctx.strokeRect(38, 118, W - 76, 94);

  const metaLeft = [
    ['Nama Anggota', student.nama_lengkap || '-'],
    ['NIM / NPM', student.npm || '-'],
    ['No. WhatsApp', student.no_wa || '-'],
  ];
  const metaRight = [
    ['Tanggal Cetak', formatWibClock(new Date())],
    ['Diterbitkan Oleh', `${state.currentUser?.nama_lengkap || 'Bendahara'} (${ROLE_LABELS[state.currentUser?.role] || 'Pengurus'})`],
    ['Status Tagihan', `${unpaidBills.length} Periode Belum Lunas`],
  ];

  metaLeft.forEach(([k, v], i) => {
    const ry = 142 + i * 26;
    ctx.fillStyle = '#475569';
    ctx.font = 'bold 13px Arial, sans-serif';
    ctx.fillText(k, 54, ry);
    ctx.fillStyle = '#0f172a';
    ctx.font = '13px Arial, sans-serif';
    ctx.fillText(`: ${String(v).slice(0, 34)}`, 164, ry);
  });
  metaRight.forEach(([k, v], i) => {
    const ry = 142 + i * 26;
    ctx.fillStyle = '#475569';
    ctx.font = 'bold 13px Arial, sans-serif';
    ctx.fillText(k, 470, ry);
    ctx.fillStyle = '#0f172a';
    ctx.font = '13px Arial, sans-serif';
    ctx.fillText(`: ${String(v).slice(0, 34)}`, 590, ry);
  });

  // Header Tabel Rincian Tunggakan
  let ty = 232;
  const colX = [38, 76, 405, 530, 655, 775, W - 38];
  ctx.fillStyle = '#163a78';
  ctx.fillRect(38, ty, W - 76, 36);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 13px Arial, sans-serif';
  ctx.fillText('No', colX[0] + 10, ty + 23);
  ctx.fillText('Periode Tagihan', colX[1] + 10, ty + 23);
  ctx.fillText('Tagihan', colX[2] + 10, ty + 23);
  ctx.fillText('Terbayar', colX[3] + 10, ty + 23);
  ctx.fillText('Sisa', colX[4] + 10, ty + 23);
  ctx.fillText('Status', colX[5] + 10, ty + 23);

  ty += 36;
  if (visibleBills.length === 0) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(38, ty, W - 76, 42);
    ctx.strokeStyle = '#cbd5e1';
    ctx.strokeRect(38, ty, W - 76, 42);
    ctx.fillStyle = '#475569';
    ctx.font = '13px Arial, sans-serif';
    ctx.fillText('Rincian tunggakan kas berjalan', 50, ty + 26);
    ty += 42;
  } else {
    visibleBills.forEach((b, idx) => {
      const bg = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
      ctx.fillStyle = bg;
      ctx.fillRect(38, ty, W - 76, 42);
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1;
      ctx.strokeRect(38, ty, W - 76, 42);

      const tagihan = Number(b.nominal_tagihan || 0);
      const terbayar = b.status === 'Menunggu Verifikasi' || b.status === 'Ditolak' ? 0 : Number(b.nominal_dibayar || 0);
      const sisaBill = getUnpaidBillSisa(b);
      const statusTxt =
        b.status === 'Ditolak' || (b.status === 'Belum Lunas' && b.metode_bayar === 'Ditolak')
          ? 'Ditolak'
          : b.status === 'Menunggu Verifikasi'
          ? 'Menunggu'
          : 'Blm Lunas';

      ctx.fillStyle = '#0f172a';
      ctx.font = '13px Arial, sans-serif';
      ctx.fillText(String(idx + 1), colX[0] + 12, ty + 26);
      ctx.font = 'bold 13px Arial, sans-serif';
      ctx.fillText(String(b.periode || '-').slice(0, 36), colX[1] + 10, ty + 26);
      ctx.font = '13px "JetBrains Mono", monospace';
      ctx.fillText(formatRupiah(tagihan), colX[2] + 10, ty + 26);
      ctx.fillText(formatRupiah(terbayar), colX[3] + 10, ty + 26);
      ctx.fillStyle = '#dc2626';
      ctx.font = 'bold 13px "JetBrains Mono", monospace';
      ctx.fillText(formatRupiah(sisaBill), colX[4] + 10, ty + 26);
      ctx.fillStyle = statusTxt === 'Menunggu' ? '#d97706' : '#dc2626';
      ctx.font = 'bold 12px Arial, sans-serif';
      ctx.fillText(statusTxt, colX[5] + 10, ty + 26);

      ty += 42;
    });

    if (extraCount > 0) {
      ctx.fillStyle = '#f1f5f9';
      ctx.fillRect(38, ty, W - 76, 42);
      ctx.strokeStyle = '#cbd5e1';
      ctx.strokeRect(38, ty, W - 76, 42);
      ctx.fillStyle = '#334155';
      ctx.font = 'italic 13px Arial, sans-serif';
      ctx.fillText(`+ ${extraCount} periode tunggakan lainnya (lihat rincian lengkap di Portal Kas R3S)`, 50, ty + 26);
      ty += 42;
    }
  }

  // Ringkasan Total
  ty += 14;
  const halfW = (W - 92) / 2;
  ctx.fillStyle = '#f0fdf4';
  ctx.strokeStyle = '#86efac';
  ctx.fillRect(38, ty, halfW, 64);
  ctx.strokeRect(38, ty, halfW, 64);
  ctx.fillStyle = '#166534';
  ctx.font = 'bold 12px Arial, sans-serif';
  ctx.fillText('TOTAL SUDAH DIBAYAR', 54, ty + 24);
  ctx.font = 'bold 20px "JetBrains Mono", monospace';
  ctx.fillText(formatRupiah(ks.sudahBayar), 54, ty + 50);

  const rightBoxX = 38 + halfW + 16;
  ctx.fillStyle = '#fef2f2';
  ctx.strokeStyle = '#fca5a5';
  ctx.fillRect(rightBoxX, ty, halfW, 64);
  ctx.strokeRect(rightBoxX, ty, halfW, 64);
  ctx.fillStyle = '#991b1b';
  ctx.font = 'bold 12px Arial, sans-serif';
  ctx.fillText('TOTAL SISA TUNGGAKAN', rightBoxX + 16, ty + 24);
  ctx.font = 'bold 20px "JetBrains Mono", monospace';
  ctx.fillText(formatRupiah(ks.tunggakan), rightBoxX + 16, ty + 50);

  // Saluran Pembayaran & Footer
  ty += 80;
  ctx.fillStyle = '#f8fafc';
  ctx.strokeStyle = '#cbd5e1';
  ctx.fillRect(38, ty, W - 76, 72);
  ctx.strokeRect(38, ty, W - 76, 72);
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 13px Arial, sans-serif';
  ctx.fillText(
    `Saluran Transfer: ${cfg.nama_bank || 'BCA'} · No. Rek ${cfg.no_rekening || '-'} (a.n. ${cfg.atas_nama_rekening || 'Bendahara R3S'})`,
    54,
    ty + 26
  );
  ctx.fillStyle = '#334155';
  ctx.font = '13px Arial, sans-serif';
  ctx.fillText(
    `QRIS Resmi: ${cfg.qris_merchant_name || 'Mas_hy, Fashion'} · NMID: ${cfg.qris_nmid || '-'}`,
    54,
    ty + 50
  );

  ctx.fillStyle = '#64748b';
  ctx.font = '11px Arial, sans-serif';
  ctx.fillText(
    `Dokumen bukti tagihan resmi ini dibuat otomatis oleh Aktivitas Kelas RS · Kelas ${cfg.nama_kelas || 'R3S'}.`,
    38,
    H - 22
  );

  const dataUrl = canvas.toDataURL('image/png');
  const blobPromise = new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), 'image/png'));
  return { dataUrl, blobPromise };
}

function buildWaHrefForStudent(student, messageText) {
  const waNumber = (student?.no_wa || '').replace(/\D/g, '');
  const encoded = encodeURIComponent(messageText || '');
  return waNumber ? `https://wa.me/${waNumber}?text=${encoded}` : `https://wa.me/?text=${encoded}`;
}

function openWaReminderModal(studentId) {
  const student = state.profiles.find((p) => p.id === studentId);
  if (!student) return;
  const ks = getStudentKasStats(student.id);
  const message = buildWaKasReminderMessage(student, ks);
  const { dataUrl, blobPromise } = generateKasReminderProofPng(student, ks);
  const safeName = String(student.nama_lengkap || 'Mahasiswa')
    .replace(/[^a-zA-Z0-9_-]+/g, '_')
    .replace(/^_+|_+$/g, '');
  const fileName = `Bukti_Tunggakan_Kas_${safeName}.png`;

  state.waReminderContext = {
    student,
    sisa: ks.tunggakan,
    fileName,
    dataUrl,
    blobPromise,
  };

  document.getElementById('wa-reminder-subtitle').textContent = `${student.nama_lengkap} (${student.npm}) · Sisa Tunggakan ${formatRupiah(ks.tunggakan)}`;
  const previewImg = document.getElementById('wa-proof-preview-img');
  if (previewImg) previewImg.src = dataUrl;

  const dlBtn = document.getElementById('btn-wa-download-proof');
  if (dlBtn) {
    dlBtn.href = dataUrl;
    dlBtn.setAttribute('download', fileName);
  }

  const textArea = document.getElementById('wa-reminder-text');
  if (textArea) textArea.value = message;

  const openChatBtn = document.getElementById('btn-wa-open-chat');
  if (openChatBtn) {
    openChatBtn.href = buildWaHrefForStudent(student, message);
  }

  // Lampiran bukti terkait (jika sebelumnya ada tagihan ditolak / pending dengan foto bukti)
  const billsWithProof = (ks.bills || []).filter((b) => b.status !== 'Lunas' && b.bukti_url);
  const attachBox = document.getElementById('wa-rejected-attachments');
  const attachList = document.getElementById('wa-rejected-attachments-list');
  if (attachBox && attachList) {
    if (billsWithProof.length > 0) {
      attachList.innerHTML = billsWithProof
        .map(
          (b) =>
            `<button type="button" class="btn btn-secondary btn-sm btn-view-img" data-url="${escapeHtml(b.bukti_url)}" data-title="Lampiran ${escapeHtml(b.periode)} (${escapeHtml(b.status)})">Lihat Bukti ${escapeHtml(b.periode)}</button>`
        )
        .join('');
      attachBox.classList.remove('hidden');
      bindImagePreviewButtons();
    } else {
      attachList.innerHTML = '';
      attachBox.classList.add('hidden');
    }
  }

  const shareBtn = document.getElementById('btn-wa-share-native');
  if (shareBtn) {
    shareBtn.classList.toggle('hidden', typeof navigator.share !== 'function');
  }

  document.getElementById('modal-wa-reminder')?.classList.remove('hidden');
}

function renderBukuKasView() {
  const profileMap = Object.fromEntries(state.profiles.map((p) => [p.id, p]));
  const q = state.filters.kasSearch.toLowerCase();
  const fJenis = state.filters.kasJenis;
  const fKat = state.filters.kasKategori;

  const filtered = state.transaksiKas
    .filter((t) => {
      const terkait = t.terkait_user_id ? profileMap[t.terkait_user_id] : null;
      const pengirim = t.pengirim_nama || terkait?.nama_lengkap || '';
      const text = `${t.keterangan} ${t.kategori} ${t.pj_nama || ''} ${pengirim} ${terkait?.npm || ''}`.toLowerCase();
      return (
        (!q || text.includes(q)) &&
        (fJenis === 'Semua' || t.jenis === fJenis) &&
        (fKat === 'Semua' || t.kategori === fKat)
      );
    })
    .sort((a, b) => {
      const da = String(a.tanggal || '');
      const dbDate = String(b.tanggal || '');
      return dbDate.localeCompare(da) || new Date(b.created_at || 0) - new Date(a.created_at || 0);
    });

  const totalMasuk = state.transaksiKas
    .filter((t) => t.jenis === 'Pemasukan')
    .reduce((s, t) => s + Number(t.nominal), 0);
  const totalKeluar = state.transaksiKas
    .filter((t) => t.jenis === 'Pengeluaran')
    .reduce((s, t) => s + Number(t.nominal), 0);

  const students = state.profiles.filter((p) => isKasMemberRole(p.role));
  const u = state.currentUser;

  return `
    <div class="page-header">
      <div>
        <span class="meta-line">Buku Besar Keuangan · Terbuka, PJ Tercatat &amp; Terverifikasi Nota</span>
        <h2>Catatan Pemasukan &amp; Pengeluaran Kas</h2>
      </div>
      <div style="display:flex;gap:14px;flex-wrap:wrap;">
        <span class="status-tag tag-success tabular-nums">Masuk: ${formatRupiah(totalMasuk)}</span>
        <span class="status-tag tag-danger tabular-nums">Keluar: ${formatRupiah(totalKeluar)}</span>
        <span class="status-tag tag-info tabular-nums">Saldo: ${formatRupiah(totalMasuk - totalKeluar)}</span>
      </div>
    </div>

    <div class="card glass-panel" id="section-catat-transaksi-kas" style="margin-bottom:20px;">
      <div class="card-header">
        <div>
          <h3>Catat Transaksi &amp; Mutasi Kas</h3>
          <span class="meta-line">Pemasukan mahasiswa terpilih otomatis menambah uang kas mahasiswa tersebut</span>
        </div>
      </div>
      <form id="form-transaksi-kas">
        <div class="grid-2" style="margin-bottom:0;">
          <div class="field-group">
            <label for="kas-jenis">Jenis Transaksi</label>
            <select id="kas-jenis" required>
              <option value="Pengeluaran">Pengeluaran</option>
              <option value="Pemasukan">Pemasukan</option>
            </select>
          </div>
          <div class="field-group">
            <label for="kas-kategori">Kategori</label>
            <select id="kas-kategori" required>
              <option value="Modul & Belajar">Modul &amp; Belajar</option>
              <option value="Fotocopy">Fotocopy</option>
              <option value="Konsumsi">Konsumsi</option>
              <option value="Iuran Kas">Iuran Kas</option>
              <option value="Perlengkapan Kelas">Perlengkapan Kelas</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>
        </div>

        <div class="grid-2" style="margin-bottom:0;">
          <div class="field-group">
            <label for="kas-tanggal">Tanggal</label>
            <input type="date" id="kas-tanggal" value="${getWibDateKey(new Date())}" required />
          </div>
          <div class="field-group">
            <label for="kas-nominal">Nominal (Rp)</label>
            <input type="number" id="kas-nominal" min="500" step="500" placeholder="Contoh: 10000" required class="tabular-nums" />
          </div>
        </div>

        <div class="field-group">
          <label for="kas-pj">Penanggung Jawab Kas (Akun Aktif · Terkunci)</label>
          <input
            type="text"
            id="kas-pj"
            class="input-locked"
            value="${escapeHtml(u.nama_lengkap)} (${escapeHtml(ROLE_LABELS[u.role] || u.role)})"
            readonly
            disabled
          />
        </div>

        <div class="field-group hidden" id="kas-pengirim-group">
          <label for="kas-pengirim">Pilih Nama Pengirim (Mahasiswa)</label>
          <select id="kas-pengirim">
            <option value="">-- Pilih Nama Mahasiswa --</option>
            ${students
              .map(
                (m) =>
                  `<option value="${m.id}">${escapeHtml(m.nama_lengkap)} (${escapeHtml(m.npm)})</option>`
              )
              .join('')}
          </select>
          <span class="meta-line" style="margin-top:4px;">Uang kas pada mahasiswa yang dipilih akan bertambah otomatis</span>
        </div>

        <div class="field-group">
          <label for="kas-keterangan">Keterangan Transaksi</label>
          <input type="text" id="kas-keterangan" placeholder="Contoh: Beli spidol papan tulis &amp; penghapus" required />
        </div>

        <div class="field-group">
          <label for="kas-nota">Foto Nota / Kuitansi (Opsional)</label>
          <input type="file" id="kas-nota" accept="image/*" />
        </div>

        <button type="submit" class="btn btn-primary btn-block">Simpan Transaksi Kas</button>
      </form>
    </div>

    <div class="card glass-panel" id="section-riwayat-mutasi-kas">
      <div class="card-header">
        <div>
          <h3>Riwayat Mutasi Kas</h3>
          <span class="meta-line">Penanggung jawab kosong (-) menandakan pemasukan berasal dari mahasiswa itu sendiri</span>
        </div>
      </div>

      <div class="toolbar-filters">
        <input type="search" id="filter-kas-search" placeholder="Cari nama, pengirim, PJ, atau keterangan..." value="${escapeHtml(state.filters.kasSearch)}" />
        <select id="filter-kas-jenis">
          ${['Semua', 'Pemasukan', 'Pengeluaran'].map((j) => `<option value="${j}" ${fJenis === j ? 'selected' : ''}>${j}</option>`).join('')}
        </select>
        <select id="filter-kas-kategori">
          ${['Semua', 'Iuran Kas', 'Modul & Belajar', 'Fotocopy', 'Konsumsi', 'Perlengkapan Kelas', 'Lainnya']
            .map((k) => `<option value="${k}" ${fKat === k ? 'selected' : ''}>${k}</option>`)
            .join('')}
        </select>
      </div>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Kategori &amp; Keterangan</th>
              <th>Penanggung Jawab</th>
              <th>Nominal</th>
              <th>Nota</th>
            </tr>
          </thead>
          <tbody>
            ${
              filtered.length === 0
                ? '<tr><td colspan="5" class="text-center">Tidak ada transaksi kas yang cocok.</td></tr>'
                : filtered
                    .map((t) => {
                      const isIn = t.jenis === 'Pemasukan';
                      const hasPj = Boolean(t.pj_nama && String(t.pj_nama).trim());
                      const pjDisplayHtml = hasPj
                        ? escapeHtml(t.pj_nama)
                        : isIn
                        ? '<span class="meta-line"><em>- (Dari Mahasiswa Sendiri)</em></span>'
                        : '-';
                      const senderName =
                        t.pengirim_nama ||
                        (t.terkait_user_id ? profileMap[t.terkait_user_id]?.nama_lengkap : '') ||
                        '';
                      return `
                        <tr>
                          <td class="tabular-nums">${escapeHtml(formatDateDdMmYyyy(t.tanggal))}</td>
                          <td>
                            <span class="status-tag ${isIn ? 'tag-success' : 'tag-danger'}">${escapeHtml(t.jenis)}</span>
                            <strong style="margin-left:6px;">${escapeHtml(t.kategori)}</strong>
                            ${
                              isIn && senderName
                                ? `<div class="meta-line" style="color:var(--accent-cyan);margin-top:3px;">Pengirim: <strong>${escapeHtml(senderName)}</strong></div>`
                                : ''
                            }
                            <div class="meta-line">${escapeHtml(t.keterangan)}</div>
                          </td>
                          <td>${pjDisplayHtml}</td>
                          <td class="tabular-nums ${isIn ? 'text-success' : 'text-danger'}">
                            <strong>${isIn ? '+' : '-'}${formatRupiah(t.nominal)}</strong>
                          </td>
                          <td>
                            ${
                              t.nota_url
                                ? `<button type="button" class="btn btn-secondary btn-sm btn-view-img" data-url="${escapeHtml(t.nota_url)}" data-title="Nota · ${escapeHtml(t.kategori)}">Detail Nota</button>`
                                : '<span class="meta-line">-</span>'
                            }
                          </td>
                        </tr>
                      `;
                    })
                    .join('')
            }
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function bindBukuKasEvents() {
  bindImagePreviewButtons();

  const jenisSelect = document.getElementById('kas-jenis');
  const pengirimGroup = document.getElementById('kas-pengirim-group');
  const pengirimInput = document.getElementById('kas-pengirim');
  const syncPengirimField = () => {
    const isMasuk = jenisSelect?.value === 'Pemasukan';
    pengirimGroup?.classList.toggle('hidden', !isMasuk);
    if (pengirimInput) pengirimInput.required = isMasuk;
  };
  syncPengirimField();
  jenisSelect?.addEventListener('change', syncPengirimField);

  document.getElementById('form-transaksi-kas')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const jenis = document.getElementById('kas-jenis').value;
    const kategori = document.getElementById('kas-kategori').value;
    const tanggal = document.getElementById('kas-tanggal').value;
    const nominal = Number(document.getElementById('kas-nominal').value);
    const pjId = state.currentUser.id;
    const pjNama = state.currentUser.nama_lengkap;
    const selectedStudentId = jenis === 'Pemasukan' ? (document.getElementById('kas-pengirim')?.value || '') : '';
    const selectedStudent = selectedStudentId
      ? state.profiles.find((p) => p.id === selectedStudentId)
      : null;

    if (jenis === 'Pemasukan' && !selectedStudent) {
      showToast('Pilih nama mahasiswa pengirim terlebih dahulu.', 'warning');
      return;
    }

    const pengirimNama = selectedStudent ? selectedStudent.nama_lengkap : '';
    const ketRaw = document.getElementById('kas-keterangan').value.trim();
    const keterangan =
      jenis === 'Pemasukan' && pengirimNama && !ketRaw.toLowerCase().includes(pengirimNama.toLowerCase())
        ? `Pengirim: ${pengirimNama} · ${ketRaw}`
        : ketRaw;
    const file = document.getElementById('kas-nota').files[0];

    try {
      const notaUrl = file ? await db.uploadFile(file, 'nota_kas') : '';
      await db.insert('transaksi_kas', {
        jenis,
        kategori,
        tanggal,
        keterangan,
        terkait_user_id: selectedStudent ? selectedStudent.id : null,
        pengirim_nama: pengirimNama,
        nominal,
        nota_url: notaUrl,
        pj_id: pjId,
        pj_nama: pjNama,
        dicatat_oleh: state.currentUser.id,
      });

      // Jika pemasukan dari mahasiswa terpilih, otomatis tambahkan ke kas mahasiswa tersebut
      if (jenis === 'Pemasukan' && selectedStudent) {
        let remaining = nominal;
        const nowIso = new Date().toISOString();
        const studentUnpaidBills = [...state.iuranKas]
          .filter((i) => i.user_id === selectedStudent.id && i.status !== 'Lunas')
          .sort((a, b) => new Date(a.created_at || 0) - new Date(b.created_at || 0));

        for (const bill of studentUnpaidBills) {
          if (remaining <= 0) break;
          const tagihan = Number(bill.nominal_tagihan || 0);
          const alreadyPaid =
            bill.status === 'Menunggu Verifikasi' ? 0 : Math.max(0, Number(bill.nominal_dibayar || 0));
          const need = Math.max(0, tagihan - alreadyPaid);
          if (need <= 0) continue;

          if (remaining >= need) {
            await db.update('iuran_kas', bill.id, {
              status: 'Lunas',
              nominal_dibayar: tagihan,
              metode_bayar: 'Tunai',
              tanggal_bayar: nowIso,
              verified_by: pjId,
              pj_id: pjId,
              pj_nama: pjNama,
            });
            remaining -= need;
          } else {
            await db.update('iuran_kas', bill.id, {
              nominal_dibayar: alreadyPaid + remaining,
              metode_bayar: 'Tunai',
              tanggal_bayar: nowIso,
              pj_id: pjId,
              pj_nama: pjNama,
            });
            remaining = 0;
          }
        }

        if (remaining > 0) {
          const monthText = formatIndonesianMonthYear((tanggal || getWibDateKey(new Date())).slice(0, 7));
          await db.insert('iuran_kas', {
            user_id: selectedStudent.id,
            periode: `Setoran Kas - ${monthText}`,
            nominal_tagihan: remaining,
            nominal_dibayar: remaining,
            metode_bayar: 'Tunai',
            bukti_url: notaUrl || '',
            status: 'Lunas',
            tanggal_bayar: nowIso,
            verified_by: pjId,
            pj_id: pjId,
            pj_nama: pjNama,
          });
        }

        await emitNotifications([
          {
            user_id: selectedStudent.id,
            judul: 'Pembayaran Kas Dicatat',
            pesan: `Pemasukan kas sebesar ${formatRupiah(nominal)} atas nama Anda telah dicatat oleh ${pjNama} dan otomatis menambah total kas Anda.`,
            tipe: 'success',
          },
        ]);
      }

      await db.loadAll();
      showToast(
        selectedStudent
          ? `Pemasukan ${formatRupiah(nominal)} untuk ${pengirimNama} berhasil dicatat & menambah kas mahasiswa!`
          : `${jenis} ${formatRupiah(nominal)} (PJ: ${pjNama}) berhasil dicatat!`,
        'success'
      );
      renderSidebarNav();
      renderActiveTab();
    } catch (err) {
      showToast(err.message || 'Gagal mencatat transaksi kas.', 'danger');
    }
  });

  document.getElementById('filter-kas-search')?.addEventListener('input', (e) => {
    state.filters.kasSearch = e.target.value;
    renderActiveTab();
    const el = document.getElementById('filter-kas-search');
    if (el) {
      el.focus();
      el.setSelectionRange(el.value.length, el.value.length);
    }
  });
  document.getElementById('filter-kas-jenis')?.addEventListener('change', (e) => {
    state.filters.kasJenis = e.target.value;
    renderActiveTab();
  });
  document.getElementById('filter-kas-kategori')?.addEventListener('change', (e) => {
    state.filters.kasKategori = e.target.value;
    renderActiveTab();
  });
}

// ----------------------------------------------------------------------------
// 15. VIEW ADMIN UTAMA: MATRIKS EXCEL, MONITORING LAPORAN, KELOLA AKUN & REKENING
// ----------------------------------------------------------------------------
function buildAttendanceMatrixData() {
  const students = state.profiles.filter((p) => isStudentRole(p.role));
  const sessions = [...state.sesiAbsensi].sort((a, b) => a.pertemuan_ke - b.pertemuan_ke);

  return {
    sessions,
    rows: students.map((m) => {
      const records = sessions.map((s) =>
        state.absensi.find((a) => a.sesi_id === s.id && a.user_id === m.id) || null
      );
      const cells = records.map((rec) => (rec ? rec.status_kehadiran : '-'));
      const hadirCount = cells.filter((c) => c === 'Hadir').length;
      const pct = sessions.length > 0 ? Math.round((hadirCount / sessions.length) * 100) : 0;
      return { student: m, records, cells, hadirCount, pct };
    }),
  };
}

function getStudentAttendanceStats(studentId) {
  const recs = state.absensi.filter((a) => a.user_id === studentId);
  const hadir = recs.filter((a) => a.status_kehadiran === 'Hadir').length;
  const izin = recs.filter((a) => a.status_kehadiran === 'Izin').length;
  const sakit = recs.filter((a) => a.status_kehadiran === 'Sakit').length;
  const alpha = recs.filter(
    (a) => a.status_kehadiran === 'Alpha' || a.status_kehadiran === 'Belum Absen!'
  ).length;
  const total = hadir + izin + sakit + alpha;
  const pct = total > 0 ? Math.round((hadir / total) * 100) : 0;
  return { hadir, izin, sakit, alpha, total, pct, recs };
}

function getStudentKasStats(studentId) {
  const bills = state.iuranKas.filter((i) => i.user_id === studentId);
  const sudahBayar = bills.reduce((sum, i) => {
    if (i.status === 'Lunas') {
      return sum + Number(i.nominal_dibayar || i.nominal_tagihan || 0);
    }
    if (i.status === 'Belum Lunas') {
      return sum + Math.min(Number(i.nominal_tagihan || 0), Math.max(0, Number(i.nominal_dibayar || 0)));
    }
    return sum;
  }, 0);
  const tunggakan = bills.reduce((sum, i) => {
    if (i.status === 'Lunas') return sum;
    if (i.status === 'Menunggu Verifikasi' || i.status === 'Ditolak') {
      return sum + Number(i.nominal_tagihan || 0);
    }
    return sum + Math.max(0, Number(i.nominal_tagihan || 0) - Number(i.nominal_dibayar || 0));
  }, 0);
  const totalTagihan = sudahBayar + tunggakan;
  const pctBayar = totalTagihan > 0 ? Math.round((sudahBayar / totalTagihan) * 100) : 100;
  const pctTunggak = totalTagihan > 0 ? 100 - pctBayar : 0;
  return {
    totalTagihan,
    sudahBayar,
    tunggakan,
    pctBayar,
    pctTunggak,
    isLunas: tunggakan === 0,
    bills,
  };
}

function renderStudentAttendanceDiagramSection() {
  const students = state.profiles.filter((p) => isStudentRole(p.role));
  if (students.length === 0) {
    return `<div class="card glass-panel" style="margin-bottom:20px;"><p class="meta-line">Belum ada mahasiswa untuk diagram absensi.</p></div>`;
  }
  const selectedId =
    students.some((s) => s.id === state.filters.selectedDiagramStudentId)
      ? state.filters.selectedDiagramStudentId
      : students[0].id;
  state.filters.selectedDiagramStudentId = selectedId;

  const selectedStudent = students.find((s) => s.id === selectedId);
  const orderedStudents = selectedStudent
    ? [selectedStudent, ...students.filter((s) => s.id !== selectedId)]
    : students;

  const st = getStudentAttendanceStats(selectedId);
  const denom = Math.max(1, st.total);
  const segs = [
    { label: 'Hadir', count: st.hadir, color: '#22c55e' },
    { label: 'Izin', count: st.izin, color: '#00d4ff' },
    { label: 'Sakit', count: st.sakit, color: '#ff7b00' },
    { label: 'Alpha / Belum', count: st.alpha, color: '#ef4444' },
  ];
  const rDonut = 52;
  const cDonut = 2 * Math.PI * rDonut;
  let offset = 0;
  const arcs =
    st.total === 0
      ? `<circle cx="74" cy="74" r="${rDonut}" fill="none" stroke="var(--track-ring)" stroke-width="18"></circle>`
      : segs
          .map((s) => {
            const len = (s.count / denom) * cDonut;
            const el = `<circle cx="74" cy="74" r="${rDonut}" fill="none" stroke="${s.color}" stroke-width="18" stroke-dasharray="${len} ${cDonut - len}" stroke-dashoffset="${-offset}" transform="rotate(-90 74 74)"></circle>`;
            offset += len;
            return el;
          })
          .join('');

  return `
    <div class="card glass-panel" style="margin-bottom:20px;">
      <div class="card-header">
        <div>
          <h3>Diagram Absensi Mahasiswa</h3>
          <span class="meta-line">Mahasiswa terpilih otomatis tampil paling atas · Klik nama untuk melihat detail donat</span>
        </div>
        <select id="diagram-student-select" class="card-header-select">
          ${students
            .map(
              (m) =>
                `<option value="${m.id}" ${m.id === selectedId ? 'selected' : ''}>${escapeHtml(m.nama_lengkap)} (${escapeHtml(m.npm)})</option>`
            )
            .join('')}
        </select>
      </div>

      <div class="grid-2 grid-2-start" style="margin-bottom:0;">
        <div class="student-chart-list student-scroll-5">
          ${orderedStudents
            .map((m) => {
              const s = getStudentAttendanceStats(m.id);
              const d = Math.max(1, s.total);
              return `
                <div class="student-bar-row ${m.id === selectedId ? 'selected' : ''}" data-diagram-student="${m.id}">
                  <div class="student-bar-head">
                    <strong>${escapeHtml(m.nama_lengkap)} <span class="meta-line" style="display:inline;">(${escapeHtml(m.npm)})</span></strong>
                    <span class="tabular-nums text-cyan">${s.pct}% Hadir (${s.hadir}/${s.total})</span>
                  </div>
                  <div class="stacked-bar-track" title="Hadir: ${s.hadir}, Izin: ${s.izin}, Sakit: ${s.sakit}, Alpha/Belum: ${s.alpha}">
                    <div class="stacked-seg-hadir" style="width:${(s.hadir / d) * 100}%"></div>
                    <div class="stacked-seg-izin" style="width:${(s.izin / d) * 100}%"></div>
                    <div class="stacked-seg-sakit" style="width:${(s.sakit / d) * 100}%"></div>
                    <div class="stacked-seg-alpha" style="width:${(s.alpha / d) * 100}%"></div>
                  </div>
                </div>
              `;
            })
            .join('')}
        </div>

        <div class="ring-widget-wrap diagram-donut-sticky" style="align-content:flex-start;">
          <svg class="donut-svg" viewBox="0 0 148 148" aria-label="Diagram donat absensi mahasiswa">
            ${arcs}
            <text x="74" y="70" text-anchor="middle" fill="var(--text-muted)" font-size="11" font-family="DM Sans">Hadir</text>
            <text x="74" y="90" text-anchor="middle" fill="var(--text-primary)" font-size="20" font-weight="700" font-family="JetBrains Mono">${st.pct}%</text>
          </svg>
          <div class="legend-list">
            <div style="margin-bottom:6px;">
              <strong>${escapeHtml(selectedStudent?.nama_lengkap || '-')}</strong>
              <span class="meta-line tabular-nums">NPM: ${escapeHtml(selectedStudent?.npm || '-')}</span>
            </div>
            ${segs
              .map(
                (s) => `
              <div class="legend-row">
                <span class="legend-label">
                  <span class="legend-swatch" style="background:${s.color}"></span>
                  ${s.label}
                </span>
                <strong class="tabular-nums">${s.count} (${st.total === 0 ? 0 : Math.round((s.count / denom) * 100)}%)</strong>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderStudentKasDiagramSection() {
  const students = state.profiles.filter((p) => isKasMemberRole(p.role));
  if (students.length === 0) {
    return `<div class="card glass-panel" style="margin-bottom:20px;"><p class="meta-line">Belum ada mahasiswa untuk diagram kas.</p></div>`;
  }
  const selectedId =
    students.some((s) => s.id === state.filters.selectedKasDiagramStudentId)
      ? state.filters.selectedKasDiagramStudentId
      : students[0].id;
  state.filters.selectedKasDiagramStudentId = selectedId;

  const selectedStudent = students.find((s) => s.id === selectedId);
  const orderedStudents = selectedStudent
    ? [selectedStudent, ...students.filter((s) => s.id !== selectedId)]
    : students;

  const st = getStudentKasStats(selectedId);
  const rDonut = 52;
  const cDonut = 2 * Math.PI * rDonut;
  const segs = [
    { label: 'Sudah Bayar', amount: st.sudahBayar, pct: st.pctBayar, color: '#22c55e' },
    { label: 'Tunggakan', amount: st.tunggakan, pct: st.pctTunggak, color: '#ef4444' },
  ];
  let offset = 0;
  const arcs =
    st.totalTagihan === 0
      ? `<circle cx="74" cy="74" r="${rDonut}" fill="none" stroke="#22c55e" stroke-width="18"></circle>`
      : segs
          .map((s) => {
            const len = (s.amount / Math.max(1, st.totalTagihan)) * cDonut;
            const el = `<circle cx="74" cy="74" r="${rDonut}" fill="none" stroke="${s.color}" stroke-width="18" stroke-dasharray="${len} ${cDonut - len}" stroke-dashoffset="${-offset}" transform="rotate(-90 74 74)"></circle>`;
            offset += len;
            return el;
          })
          .join('');

  return `
    <div class="card glass-panel" style="margin-bottom:20px;">
      <div class="card-header">
        <div>
          <h3>Diagram Kas Per Mahasiswa</h3>
          <span class="meta-line">Persentase lunas (Hijau) vs sisa tunggakan (Merah) · Mahasiswa terpilih tampil paling atas</span>
        </div>
        <select id="diagram-kas-student-select" class="card-header-select">
          ${students
            .map(
              (m) =>
                `<option value="${m.id}" ${m.id === selectedId ? 'selected' : ''}>${escapeHtml(m.nama_lengkap)} (${escapeHtml(m.npm)})</option>`
            )
            .join('')}
        </select>
      </div>

      <div class="grid-2 grid-2-start" style="margin-bottom:0;">
        <div class="student-chart-list student-scroll-5">
          ${orderedStudents
            .map((m) => {
              const ks = getStudentKasStats(m.id);
              return `
                <div class="student-bar-row ${m.id === selectedId ? 'selected' : ''}" data-kas-diagram-student="${m.id}">
                  <div class="student-bar-head">
                    <strong>
                      ${escapeHtml(m.nama_lengkap)}
                      <span class="status-tag ${ks.isLunas ? 'tag-success' : 'tag-danger'}" style="margin-left:6px;">
                        ${ks.isLunas ? 'Sudah Lunas' : 'Belum Lunas'}
                      </span>
                    </strong>
                    <span class="tabular-nums ${ks.isLunas ? 'text-success' : 'text-danger'}">
                      ${formatRupiah(ks.sudahBayar)} (${ks.pctBayar}%)
                    </span>
                  </div>
                  <div class="stacked-bar-track" title="Sudah Bayar: ${formatRupiah(ks.sudahBayar)} (${ks.pctBayar}%), Tunggakan: ${formatRupiah(ks.tunggakan)} (${ks.pctTunggak}%)">
                    <div class="stacked-seg-paid" style="width:${ks.pctBayar}%"></div>
                    <div class="stacked-seg-unpaid" style="width:${ks.pctTunggak}%"></div>
                  </div>
                </div>
              `;
            })
            .join('')}
        </div>

        <div class="ring-widget-wrap diagram-donut-sticky" style="align-content:flex-start;">
          <svg class="donut-svg" viewBox="0 0 148 148" aria-label="Diagram donat kas mahasiswa">
            ${arcs}
            <text x="74" y="70" text-anchor="middle" fill="var(--text-muted)" font-size="11" font-family="DM Sans">Terbayar</text>
            <text x="74" y="90" text-anchor="middle" fill="${st.isLunas ? '#22c55e' : 'var(--text-primary)'}" font-size="20" font-weight="700" font-family="JetBrains Mono">${st.pctBayar}%</text>
          </svg>
          <div class="legend-list">
            <div style="margin-bottom:6px;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
              <div>
                <strong>${escapeHtml(selectedStudent?.nama_lengkap || '-')}</strong>
                <span class="meta-line tabular-nums">NPM: ${escapeHtml(selectedStudent?.npm || '-')}</span>
              </div>
              <span class="status-tag ${st.isLunas ? 'tag-success' : 'tag-danger'}">${st.isLunas ? 'Sudah Lunas' : 'Belum Lunas'}</span>
            </div>
            ${segs
              .map(
                (s) => `
              <div class="legend-row">
                <span class="legend-label">
                  <span class="legend-swatch" style="background:${s.color}"></span>
                  ${s.label}
                </span>
                <strong class="tabular-nums">${formatRupiah(s.amount)} (${s.pct}%)</strong>
              </div>
            `
              )
              .join('')}
            <div class="legend-row" style="border-top:1px solid var(--glass-border);padding-top:6px;margin-top:4px;">
              <span class="legend-label">Total Tagihan Kas</span>
              <strong class="tabular-nums text-cyan">${formatRupiah(st.totalTagihan)}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function bindStudentDiagramEvents() {
  document.getElementById('diagram-student-select')?.addEventListener('change', (e) => {
    state.filters.selectedDiagramStudentId = e.target.value;
    renderActiveTab();
  });
  document.querySelectorAll('[data-diagram-student]').forEach((row) => {
    row.addEventListener('click', () => {
      state.filters.selectedDiagramStudentId = row.getAttribute('data-diagram-student');
      renderActiveTab();
    });
  });

  document.getElementById('diagram-kas-student-select')?.addEventListener('change', (e) => {
    state.filters.selectedKasDiagramStudentId = e.target.value;
    renderActiveTab();
  });
  document.querySelectorAll('[data-kas-diagram-student]').forEach((row) => {
    row.addEventListener('click', () => {
      state.filters.selectedKasDiagramStudentId = row.getAttribute('data-kas-diagram-student');
      renderActiveTab();
    });
  });
}

function buildGroupedAttendanceMatrix() {
  const students = state.profiles.filter((p) => isStudentRole(p.role));
  const sessions = [...state.sesiAbsensi].sort(
    (a, b) =>
      Number(a.pertemuan_ke || 0) - Number(b.pertemuan_ke || 0) ||
      new Date(a.created_at || 0) - new Date(b.created_at || 0)
  );
  const maxSessionPertemuan = sessions.reduce(
    (maxP, s) => Math.max(maxP, Number(s.pertemuan_ke || 0)),
    0
  );
  const totalPertemuan = Math.max(
    14,
    Number(state.pengaturan?.total_pertemuan_semester || 14),
    maxSessionPertemuan
  );

  const groups = [];
  for (let pNum = 1; pNum <= totalPertemuan; pNum += 1) {
    const pSessions = sessions.filter((s) => Number(s.pertemuan_ke || 1) === pNum);
    const slots =
      pSessions.length > 0
        ? pSessions.map((s) => ({
            pertemuan: pNum,
            session: s,
            label: s.mata_kuliah || '-',
          }))
        : [
            {
              pertemuan: pNum,
              session: null,
              label: '-',
            },
          ];
    groups.push({
      pertemuan: pNum,
      sessions: pSessions,
      slots,
    });
  }

  const orderedSlots = groups.flatMap((g) => g.slots);
  const orderedSessions = groups.flatMap((g) => g.sessions);

  const rows = students.map((m) => {
    const stats = getStudentAttendanceStats(m.id);
    const cells = orderedSlots.map((slot) => {
      if (!slot.session) {
        return { session: null, record: null, label: '-' };
      }
      const rec =
        state.absensi.find((a) => a.sesi_id === slot.session.id && a.user_id === m.id) || null;
      return {
        session: slot.session,
        record: rec,
        label: rec ? rec.status_kehadiran : '-',
      };
    });
    const actualCells = cells.filter((c) => Boolean(c.session));
    const hadirCount =
      orderedSessions.length > 0
        ? actualCells.filter((c) => c.label === 'Hadir').length
        : stats.hadir;
    const totalRecorded =
      orderedSessions.length > 0
        ? actualCells.filter((c) => c.record).length
        : stats.total;
    const denom = orderedSessions.length > 0 ? orderedSessions.length : stats.total;
    const pctHadir = denom > 0 ? Math.round((hadirCount / denom) * 100) : 0;
    return {
      student: m,
      cells,
      totalCatatan: totalRecorded,
      pctHadir,
      hadirCount,
    };
  });

  return { groups, orderedSlots, orderedSessions, rows };
}

function buildKasPeriodMatrix() {
  const MONTHS = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];
  const students = state.profiles.filter((p) => isKasMemberRole(p.role));
  const rawPeriods = [];
  const seenPeriod = new Set();
  state.iuranKas.forEach((b) => {
    const per = String(b.periode || '').trim();
    if (!per || seenPeriod.has(per)) return;
    seenPeriod.add(per);
    rawPeriods.push(per);
  });

  const parsePeriodInfo = (per) => {
    const lower = per.toLowerCase();
    const monthIdx = MONTHS.findIndex((m) => lower.includes(m.toLowerCase()));
    const monthLabel = monthIdx >= 0 ? MONTHS[monthIdx] : 'Periode Lainnya';
    const yearMatch = per.match(/(20\d{2})/);
    const yearNum = yearMatch ? Number(yearMatch[1]) : 9999;
    const slotMatch = per.match(/(?:minggu|pekan|m|ke[- ]?)\s*(\d+)/i) || per.match(/^(\d+)/);
    const slotOrder = slotMatch ? Number(slotMatch[1]) : 99;
    return {
      periode: per,
      monthIdx: monthIdx >= 0 ? monthIdx : 99,
      monthLabel,
      yearNum,
      slotOrder,
    };
  };

  const parsed = rawPeriods
    .map(parsePeriodInfo)
    .sort((a, b) => a.yearNum - b.yearNum || a.monthIdx - b.monthIdx || a.slotOrder - b.slotOrder);

  const distinctYears = new Set(parsed.map((p) => p.yearNum).filter((y) => y !== 9999));
  const monthMap = new Map();
  parsed.forEach((item) => {
    const groupKey = `${item.yearNum}-${item.monthLabel}`;
    const displayLabel =
      item.yearNum !== 9999 && distinctYears.size > 1
        ? `${item.monthLabel} ${item.yearNum}`
        : item.monthLabel;
    if (!monthMap.has(groupKey)) {
      monthMap.set(groupKey, { monthLabel: displayLabel, slots: [] });
    }
    const grp = monthMap.get(groupKey);
    const subLabel =
      item.slotOrder !== 99 ? String(item.slotOrder) : String(grp.slots.length + 1);
    grp.slots.push({ periode: item.periode, subLabel });
  });

  const monthGroups = Array.from(monthMap.values());
  const orderedSlots = monthGroups.flatMap((g) => g.slots);

  const rows = students.map((m) => {
    const ks = getStudentKasStats(m.id);
    const slotCells = orderedSlots.map((slot) => {
      const bill = state.iuranKas.find((i) => i.user_id === m.id && i.periode === slot.periode) || null;
      return { slot, bill };
    });
    return {
      student: m,
      slotCells,
      totalDibayar: ks.sudahBayar,
      tunggakan: ks.tunggakan,
      isLunas: ks.isLunas,
    };
  });

  return { monthGroups, orderedSlots, rows };
}

function renderMonitoringExcelView() {
  const role = state.currentUser?.role || 'admin';
  const isAdmin = role === 'admin';
  const isBendahara = role === 'bendahara';
  const showAttendanceDiagram = isAdmin || role === 'ketua';
  const showAttendanceMatrix = isAdmin || isBendahara || role === 'ketua';
  const showKasSection = isAdmin || isBendahara;

  const { groups, orderedSlots: absenSlots, orderedSessions, rows: absenRows } =
    buildGroupedAttendanceMatrix();
  const { monthGroups, orderedSlots, rows: kasRows } = buildKasPeriodMatrix();
  const kasMembers = state.profiles.filter((p) => isKasMemberRole(p.role));

  const totalKasDibayarClass = kasRows.reduce((s, r) => s + r.totalDibayar, 0);
  const totalKasTunggakanClass = kasRows.reduce((s, r) => s + r.tunggakan, 0);
  const totalKasLunasCount = kasRows.filter((r) => r.isLunas).length;

  const headerButtons = isBendahara
    ? `
      <button type="button" id="btn-export-kas-xlsx" class="btn btn-primary">Unduh Excel Kas (.XLSX)</button>
      <button type="button" id="btn-export-rekap-mhs-xlsx" class="btn btn-coral">Unduh Kas Mahasiswa (.XLSX)</button>
      <button type="button" id="btn-export-absensi-xlsx" class="btn btn-secondary">Unduh Matriks Absensi (.XLSX)</button>
      <button type="button" id="btn-export-csv" class="btn btn-secondary">Unduh CSV Kas</button>
    `
    : isAdmin
    ? `
      <button type="button" id="btn-export-xlsx" class="btn btn-primary">Unduh Excel Lengkap (.XLSX)</button>
      <button type="button" id="btn-export-rekap-mhs-xlsx" class="btn btn-coral">Unduh Rekap Mahasiswa (.XLSX)</button>
      <button type="button" id="btn-export-kas-xlsx" class="btn btn-secondary">Unduh Rekap Kas (.XLSX)</button>
      <button type="button" id="btn-export-csv" class="btn btn-secondary">Unduh CSV</button>
    `
    : `
      <button type="button" id="btn-export-xlsx" class="btn btn-primary">Unduh Excel Absensi (.XLSX)</button>
      <button type="button" id="btn-export-rekap-mhs-xlsx" class="btn btn-coral">Unduh Rekap Mahasiswa (.XLSX)</button>
      <button type="button" id="btn-export-csv" class="btn btn-secondary">Unduh CSV</button>
    `;

  return `
    <div class="page-header">
      <div>
        <span class="meta-line">
          ${
            isAdmin
              ? 'Pemantauan Absensi &amp; Kas Menyeluruh · Diagram, Matriks Terpadu &amp; Ekspor Excel (.XLSX)'
              : isBendahara
              ? 'Pemantauan Kas &amp; Matriks Absensi Kelas · Diagram Kas, Matriks Periode &amp; Ekspor Excel (.XLSX)'
              : 'Matriks Kehadiran, Rekap Absensi Mahasiswa &amp; Ekspor Excel (.XLSX)'
          }
        </span>
        <h2>${isBendahara ? 'Matriks, Rekap &amp; Excel' : isAdmin ? 'Matriks, Diagram &amp; Excel' : 'Matriks, Rekap &amp; Excel'}</h2>
      </div>
      <div class="row-actions">
        ${headerButtons}
      </div>
    </div>

    ${showAttendanceDiagram ? renderStudentAttendanceDiagramSection() : ''}
    ${showKasSection ? renderStudentKasDiagramSection() : ''}

    ${
      showAttendanceMatrix
        ? `
          <!-- Tabel Matriks Absensi Keseluruhan Mahasiswa (Pertemuan 1 - 14 & Mata Kuliah) -->
          <div class="card glass-panel" style="margin-bottom:20px;">
            <div class="card-header">
              <div>
                <h3>Tabel Matriks Absensi Keseluruhan Mahasiswa</h3>
                <span class="meta-line">Header 2 tingkat: Pertemuan 1 s.d. 14 &amp; nama Mata Kuliah · Klik status untuk Detail foto &amp; GPS</span>
              </div>
            </div>
            <div class="table-wrap table-scroll-5-matrix">
              <table class="grouped-matrix-table">
                <thead>
                  <tr>
                    <th rowspan="2">NIM</th>
                    <th rowspan="2">Nama Mahasiswa</th>
                    ${groups
                      .map((g) => `<th colspan="${g.slots.length}">Pertemuan ${g.pertemuan}</th>`)
                      .join('')}
                    <th rowspan="2">Persentase Hadir</th>
                  </tr>
                  <tr>
                    ${absenSlots
                      .map((sl) => `<th class="grouped-matrix-subth">${escapeHtml(sl.label)}</th>`)
                      .join('')}
                  </tr>
                </thead>
                <tbody>
                  ${
                    absenRows.length === 0
                      ? `<tr><td colspan="${3 + absenSlots.length}" class="text-center">Belum ada mahasiswa terdaftar.</td></tr>`
                      : absenRows
                          .map(
                            (r) => `
                        <tr>
                          <td class="tabular-nums">${escapeHtml(r.student.npm)}</td>
                          <td><strong>${escapeHtml(r.student.nama_lengkap)}</strong></td>
                          ${r.cells
                            .map((c) => {
                              if (c.record) {
                                return `<td class="grouped-matrix-cell-center">
                                  <button type="button" class="status-tag ${getStatusTagClass(c.label)} btn-detail-absen" style="cursor:pointer;" data-absen-id="${c.record.id}" data-sesi-id="${c.session.id}" title="Klik untuk melihat foto, PJ, dan GPS">
                                    ${escapeHtml(c.label)}
                                  </button>
                                </td>`;
                              }
                              return `<td class="grouped-matrix-cell-center"><span class="${c.label === '-' ? 'meta-line' : `status-tag ${getStatusTagClass(c.label)}`}">${escapeHtml(c.label)}</span></td>`;
                            })
                            .join('')}
                          <td class="tabular-nums grouped-matrix-cell-center" title="${r.hadirCount}/${orderedSessions.length} sesi hadir"><strong>${r.pctHadir}%</strong></td>
                        </tr>
                      `
                          )
                          .join('')
                  }
                </tbody>
              </table>
            </div>
          </div>
        `
        : ''
    }

    ${
      showKasSection
        ? `
          <!-- Tabel Matriks Kas Per Periode -->
          <div class="card glass-panel" style="margin-bottom:20px;">
            <div class="card-header">
              <div>
                <h3>Tabel Matriks Kas Per Periode</h3>
                <span class="meta-line">Rincian pembayaran iuran kas per bulan &amp; minggu (1, 2, 3, 4) beserta total dibayar, tunggakan, &amp; status kelas</span>
              </div>
            </div>
            <div class="table-wrap table-scroll-5-matrix">
              <table class="grouped-matrix-table">
                <thead>
                  <tr>
                    <th rowspan="2">NIM</th>
                    <th rowspan="2">Nama Mahasiswa</th>
                    ${
                      monthGroups.length > 0
                        ? monthGroups
                            .map((mg) => `<th colspan="${mg.slots.length}">${escapeHtml(mg.monthLabel)}</th>`)
                            .join('')
                        : '<th>Periode Kas</th>'
                    }
                    <th rowspan="2">Total Dibayar</th>
                    <th rowspan="2">Tunggakan</th>
                    <th rowspan="2">Status</th>
                  </tr>
                  <tr>
                    ${
                      orderedSlots.length > 0
                        ? orderedSlots
                            .map(
                              (sl) =>
                                `<th class="grouped-matrix-subth" title="${escapeHtml(sl.periode)}">${escapeHtml(sl.subLabel)}</th>`
                            )
                            .join('')
                        : '<th class="grouped-matrix-subth">-</th>'
                    }
                  </tr>
                </thead>
                <tbody>
                  ${
                    kasRows.length === 0
                      ? `<tr><td colspan="${5 + Math.max(1, orderedSlots.length)}" class="text-center">Belum ada data kas mahasiswa.</td></tr>`
                      : kasRows
                          .map(
                            (r) => `
                        <tr>
                          <td class="tabular-nums">${escapeHtml(r.student.npm)}</td>
                          <td><strong>${escapeHtml(r.student.nama_lengkap)}</strong></td>
                          ${
                            orderedSlots.length === 0
                              ? '<td class="grouped-matrix-cell-center"><span class="meta-line">-</span></td>'
                              : r.slotCells
                                  .map((sc) => {
                                    const b = sc.bill;
                                    if (!b) return '<td class="grouped-matrix-cell-center"><span class="meta-line">-</span></td>';
                                    if (b.status === 'Lunas') {
                                      return `<td class="tabular-nums text-success grouped-matrix-cell-center" title="${escapeHtml(sc.slot.periode)}"><strong>${formatRupiah(b.nominal_dibayar || b.nominal_tagihan)}</strong></td>`;
                                    }
                                    if (b.status === 'Menunggu Verifikasi') {
                                      return `<td class="grouped-matrix-cell-center" title="${escapeHtml(sc.slot.periode)}"><span class="status-tag tag-coral">Menunggu</span></td>`;
                                    }
                                    if (b.status === 'Ditolak') {
                                      return `<td class="grouped-matrix-cell-center" title="${escapeHtml(sc.slot.periode)}"><span class="status-tag tag-danger">Ditolak</span></td>`;
                                    }
                                    if (Number(b.nominal_dibayar || 0) > 0) {
                                      return `<td class="tabular-nums text-warning grouped-matrix-cell-center" title="${escapeHtml(sc.slot.periode)}">${formatRupiah(b.nominal_dibayar)}</td>`;
                                    }
                                    return `<td class="grouped-matrix-cell-center" title="${escapeHtml(sc.slot.periode)}"><span class="meta-line">-</span></td>`;
                                  })
                                  .join('')
                          }
                          <td class="tabular-nums text-success grouped-matrix-cell-center"><strong>${formatRupiah(r.totalDibayar)}</strong></td>
                          <td class="tabular-nums ${r.tunggakan > 0 ? 'text-danger' : 'text-success'} grouped-matrix-cell-center"><strong>${formatRupiah(r.tunggakan)}</strong></td>
                          <td class="grouped-matrix-cell-center"><span class="status-tag ${r.isLunas ? 'tag-success' : 'tag-danger'}">${r.isLunas ? 'Lunas' : 'Belum Lunas'}</span></td>
                        </tr>
                      `
                          )
                          .join('')
                  }
                </tbody>
                ${
                  kasRows.length > 0
                    ? `
                      <tfoot>
                        <tr class="grouped-matrix-tfoot">
                          <td colspan="${2 + Math.max(1, orderedSlots.length)}"><strong>Total Akumulasi Kas Kelas (${kasRows.length} Mahasiswa)</strong></td>
                          <td class="tabular-nums text-success grouped-matrix-cell-center"><strong>${formatRupiah(totalKasDibayarClass)}</strong></td>
                          <td class="tabular-nums ${totalKasTunggakanClass > 0 ? 'text-danger' : 'text-success'} grouped-matrix-cell-center"><strong>${formatRupiah(totalKasTunggakanClass)}</strong></td>
                          <td class="grouped-matrix-cell-center"><strong>${totalKasLunasCount}/${kasRows.length} Lunas</strong></td>
                        </tr>
                      </tfoot>
                    `
                    : ''
                }
              </table>
            </div>
          </div>

          <!-- Tabel Kas Per Mahasiswa -->
          <div class="card glass-panel">
            <div class="card-header">
              <div>
                <h3>Tabel Kas Per Mahasiswa</h3>
                <span class="meta-line">Rekap total uang kas keseluruhan mahasiswa (NIM, Nama Mahasiswa, Total Dibayar, Tunggakan, Status)</span>
              </div>
            </div>
            <div class="table-wrap table-scroll-5-compact">
              <table>
                <thead>
                  <tr>
                    <th>NIM</th>
                    <th>Nama Mahasiswa</th>
                    <th>Total Dibayar</th>
                    <th>Tunggakan</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${
                    kasMembers.length === 0
                      ? '<tr><td colspan="5" class="text-center">Belum ada mahasiswa terdaftar.</td></tr>'
                      : kasMembers
                          .map((m) => {
                            const ks = getStudentKasStats(m.id);
                            return `
                              <tr>
                                <td class="tabular-nums">${escapeHtml(m.npm)}</td>
                                <td><strong>${escapeHtml(m.nama_lengkap)}</strong></td>
                                <td class="tabular-nums text-success"><strong>${formatRupiah(ks.sudahBayar)}</strong></td>
                                <td class="tabular-nums ${ks.tunggakan > 0 ? 'text-danger' : 'text-success'}"><strong>${ks.tunggakan > 0 ? formatRupiah(ks.tunggakan) : '-'}</strong></td>
                                <td><span class="status-tag ${ks.isLunas ? 'tag-success' : 'tag-danger'}">${ks.isLunas ? 'Lunas' : 'Belum Lunas'}</span></td>
                              </tr>
                            `;
                          })
                          .join('')
                  }
                </tbody>
              </table>
            </div>
          </div>
        `
        : ''
    }
  `;
}

function bindMonitoringExcelEvents() {
  bindStudentDiagramEvents();
  document.querySelectorAll('.btn-detail-absen').forEach((btn) => {
    btn.addEventListener('click', () => {
      openDetailAbsenModal(
        btn.getAttribute('data-absen-id'),
        btn.getAttribute('data-sesi-id')
      );
    });
  });

  const role = state.currentUser?.role || 'admin';
  const isAdmin = role === 'admin';
  const isBendahara = role === 'bendahara';

  const getAttendanceMatrixSheetConfig = () => {
    const { groups, orderedSlots, rows } = buildGroupedAttendanceMatrix();
    const headRow0 = [
      'NIM',
      'Nama Mahasiswa',
      ...groups.flatMap((g) =>
        g.slots.map((_, idx) => (idx === 0 ? `Pertemuan ${g.pertemuan}` : ''))
      ),
      'Persentase Hadir',
    ];
    const headRow1 = [
      '',
      '',
      ...orderedSlots.map((sl) => sl.label || '-'),
      '',
    ];
    const merges = [
      { r1: 0, c1: 0, r2: 1, c2: 0 },
      { r1: 0, c1: 1, r2: 1, c2: 1 },
    ];
    let colCursor = 2;
    groups.forEach((g) => {
      if (g.slots.length > 1) {
        merges.push({ r1: 0, c1: colCursor, r2: 0, c2: colCursor + g.slots.length - 1 });
      }
      colCursor += g.slots.length;
    });
    merges.push({ r1: 0, c1: colCursor, r2: 1, c2: colCursor });
    const dataRows = rows.map((r) => [
      r.student.npm,
      r.student.nama_lengkap,
      ...r.cells.map((c) => c.label),
      `${r.pctHadir}%`,
    ]);
    return {
      name: 'Matriks Kehadiran',
      headerRows: [headRow0, headRow1],
      merges,
      rows: dataRows,
    };
  };

  const getExportObjects = () => {
    const { orderedSlots, rows } = buildGroupedAttendanceMatrix();
    return rows.map((r) => {
      const obj = {
        NIM: r.student.npm,
        'Nama Mahasiswa': r.student.nama_lengkap,
      };
      orderedSlots.forEach((sl, idx) => {
        const colKey = sl.session
          ? `Pertemuan ${sl.pertemuan} - ${sl.label}`
          : `Pertemuan ${sl.pertemuan}`;
        obj[colKey] = r.cells[idx]?.label || '-';
      });
      obj['Persentase Hadir'] = `${r.pctHadir}%`;
      return obj;
    });
  };

  const getStudentRekapObjects = () => {
    return state.profiles
      .filter((p) => isStudentRole(p.role))
      .map((m) => {
        const st = getStudentAttendanceStats(m.id);
        return {
          NIM: m.npm,
          'Nama Mahasiswa': m.nama_lengkap,
          Hadir: st.hadir,
          Izin: st.izin,
          Sakit: st.sakit,
          'Alpha / Belum Absen': st.alpha,
          'Total Catatan': st.total,
          'Persentase Hadir': `${st.pct}%`,
        };
      });
  };

  const getKasPerStudentObjects = () => {
    return state.profiles
      .filter((p) => isKasMemberRole(p.role))
      .map((m) => {
        const ks = getStudentKasStats(m.id);
        return {
          NIM: m.npm,
          'Nama Mahasiswa': m.nama_lengkap,
          'Total Dibayar': ks.sudahBayar,
          Tunggakan: ks.tunggakan,
          Status: ks.isLunas ? 'Lunas' : 'Belum Lunas',
        };
      });
  };

  const getKasPeriodMatrixSheetConfig = () => {
    const { monthGroups, orderedSlots, rows } = buildKasPeriodMatrix();
    if (!orderedSlots.length) {
      return {
        name: 'Matriks Kas Periode',
        rows: rows.map((r) => ({
          NIM: r.student.npm,
          'Nama Mahasiswa': r.student.nama_lengkap,
          'Periode Kas': 'Belum ada tagihan',
          'Total Dibayar': r.totalDibayar,
          Tunggakan: r.tunggakan,
          Status: r.isLunas ? 'Lunas' : 'Belum Lunas',
        })),
      };
    }
    const headRow0 = [
      'NIM',
      'Nama Mahasiswa',
      ...monthGroups.flatMap((mg) => mg.slots.map((_, idx) => (idx === 0 ? mg.monthLabel : ''))),
      'Total Dibayar',
      'Tunggakan',
      'Status',
    ];
    const headRow1 = [
      '',
      '',
      ...orderedSlots.map((sl) => `${sl.subLabel}`),
      '',
      '',
      '',
    ];
    const merges = [
      { r1: 0, c1: 0, r2: 1, c2: 0 },
      { r1: 0, c1: 1, r2: 1, c2: 1 },
    ];
    let colCursor = 2;
    monthGroups.forEach((mg) => {
      if (mg.slots.length > 1) {
        merges.push({ r1: 0, c1: colCursor, r2: 0, c2: colCursor + mg.slots.length - 1 });
      }
      colCursor += mg.slots.length;
    });
    merges.push(
      { r1: 0, c1: colCursor, r2: 1, c2: colCursor },
      { r1: 0, c1: colCursor + 1, r2: 1, c2: colCursor + 1 },
      { r1: 0, c1: colCursor + 2, r2: 1, c2: colCursor + 2 }
    );
    const dataRows = rows.map((r) => [
      r.student.npm,
      r.student.nama_lengkap,
      ...r.slotCells.map(({ bill }) => {
        if (!bill) return 0;
        if (bill.status === 'Menunggu Verifikasi') return 'Menunggu';
        if (bill.status === 'Ditolak') return 'Ditolak';
        return Number(bill.nominal_dibayar || 0);
      }),
      r.totalDibayar,
      r.tunggakan,
      r.isLunas ? 'Lunas' : 'Belum Lunas',
    ]);
    const totalDibayarAll = rows.reduce((s, r) => s + r.totalDibayar, 0);
    const totalTunggakanAll = rows.reduce((s, r) => s + r.tunggakan, 0);
    const totalLunasAll = rows.filter((r) => r.isLunas).length;
    const footerRow = [
      'TOTAL',
      `${rows.length} Mahasiswa`,
      ...orderedSlots.map((sl) =>
        state.iuranKas
          .filter((b) => b.periode === sl.periode && (b.status === 'Lunas' || b.status === 'Belum Lunas'))
          .reduce((s, b) => s + Number(b.nominal_dibayar || 0), 0)
      ),
      totalDibayarAll,
      totalTunggakanAll,
      `${totalLunasAll}/${rows.length} Lunas`,
    ];
    return {
      name: 'Matriks Kas Periode',
      headerRows: [headRow0, headRow1],
      merges,
      rows: dataRows,
      footerRow,
    };
  };

  const getMutasiKasObjects = () => {
    const profileMap = Object.fromEntries(state.profiles.map((p) => [p.id, p]));
    return state.transaksiKas.map((t, idx) => ({
      No: idx + 1,
      Tanggal: formatDateDdMmYyyy(t.tanggal),
      Jenis: t.jenis,
      Kategori: t.kategori,
      Keterangan: t.keterangan,
      'Nama Pengirim': t.pengirim_nama || '-',
      'Penanggung Jawab':
        t.pj_nama ||
        (t.jenis === 'Pemasukan' && !t.pj_id
          ? '- (Dari Mahasiswa Sendiri)'
          : profileMap[t.dicatat_oleh]?.nama_lengkap || '-'),
      Nominal: Number(t.nominal || 0),
    }));
  };

  document.getElementById('btn-export-xlsx')?.addEventListener('click', () => {
    if (isBendahara) return;
    const sheets = [
      getAttendanceMatrixSheetConfig(),
      { name: 'Rekap Absensi Mhs', rows: getStudentRekapObjects() },
    ];
    if (isAdmin) {
      sheets.push(
        getKasPeriodMatrixSheetConfig(),
        { name: 'Kas Per Mahasiswa', rows: getKasPerStudentObjects() },
        { name: 'Mutasi Kas', rows: getMutasiKasObjects() }
      );
    }
    const filename = isAdmin
      ? `Rekapan_Kelas_R3S_${getWibDateKey(new Date())}.xlsx`
      : `Rekap_Absensi_Kelas_R3S_${getWibDateKey(new Date())}.xlsx`;
    downloadExcelWorkbook(sheets, filename);
    showToast(`File ${filename} berhasil diunduh!`, 'success');
  });

  document.getElementById('btn-export-absensi-xlsx')?.addEventListener('click', () => {
    const filename = `Matriks_Absensi_Keseluruhan_R3S_${getWibDateKey(new Date())}.xlsx`;
    downloadExcelWorkbook(
      [
        getAttendanceMatrixSheetConfig(),
        { name: 'Rekap Absensi Mhs', rows: getStudentRekapObjects() },
      ],
      filename
    );
    showToast(`File ${filename} berhasil diunduh!`, 'success');
  });

  document.getElementById('btn-export-rekap-mhs-xlsx')?.addEventListener('click', () => {
    if (isBendahara) {
      const filename = `Rekap_Kas_Per_Mahasiswa_R3S_${getWibDateKey(new Date())}.xlsx`;
      downloadExcelWorkbook(
        [
          getKasPeriodMatrixSheetConfig(),
          { name: 'Kas Per Mahasiswa', rows: getKasPerStudentObjects() },
        ],
        filename
      );
      showToast(`File ${filename} berhasil diunduh!`, 'success');
      return;
    }
    const rekapData = getStudentRekapObjects();
    const filename = `Rekap_Absensi_Per_Mahasiswa_R3S_${getWibDateKey(new Date())}.xlsx`;
    downloadExcelWorkbook(
      [{ name: 'Rekap Per Mahasiswa', rows: rekapData }],
      filename
    );
    showToast(`File ${filename} berhasil diunduh!`, 'success');
  });

  document.getElementById('btn-export-kas-xlsx')?.addEventListener('click', () => {
    const filename = `Rekap_Kas_Kelas_R3S_${getWibDateKey(new Date())}.xlsx`;
    downloadExcelWorkbook(
      [
        getKasPeriodMatrixSheetConfig(),
        { name: 'Kas Per Mahasiswa', rows: getKasPerStudentObjects() },
        { name: 'Mutasi Kas', rows: getMutasiKasObjects() },
      ],
      filename
    );
    showToast(`File ${filename} berhasil diunduh!`, 'success');
  });

  document.getElementById('btn-export-csv')?.addEventListener('click', () => {
    if (isBendahara) {
      const data = getKasPerStudentObjects();
      const filename = `Rekap_Kas_Per_Mahasiswa_R3S_${getWibDateKey(new Date())}.csv`;
      downloadCsvFromObjects(data, filename);
      showToast(`File ${filename} berhasil diunduh!`, 'success');
      return;
    }
    const data = getExportObjects();
    const filename = `Rekapan_Absensi_R3S_${getWibDateKey(new Date())}.csv`;
    downloadCsvFromObjects(data, filename);
    showToast(`File ${filename} berhasil diunduh!`, 'success');
  });
}

function escapeXmlValue(value) {
  return String(value ?? '')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function sanitizeWorksheetName(name) {
  return (
    String(name || 'Sheet1')
      .replace(/[\\/*?:\[\]]/g, ' ')
      .trim()
      .slice(0, 31) || 'Sheet1'
  );
}

const XLSX_CRC32_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c >>> 0;
  }
  return table;
})();

function computeCrc32(bytes) {
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) {
    crc = XLSX_CRC32_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function createStoredZipBlob(entries, mimeType) {
  const encoder = new TextEncoder();
  const now = new Date();
  const dosTime =
    ((now.getHours() & 0x1f) << 11) |
    ((now.getMinutes() & 0x3f) << 5) |
    ((now.getSeconds() >> 1) & 0x1f);
  const dosDate =
    (((Math.max(1980, now.getFullYear()) - 1980) & 0x7f) << 9) |
    (((now.getMonth() + 1) & 0x0f) << 5) |
    (now.getDate() & 0x1f);

  const localParts = [];
  const centralParts = [];
  let offset = 0;

  entries.forEach((entry) => {
    const nameBytes = encoder.encode(entry.path);
    const dataBytes =
      entry.content instanceof Uint8Array
        ? entry.content
        : encoder.encode(String(entry.content ?? ''));
    const crc = computeCrc32(dataBytes);

    const localHeader = new Uint8Array(30 + nameBytes.length);
    const lv = new DataView(localHeader.buffer);
    lv.setUint32(0, 0x04034b50, true);
    lv.setUint16(4, 20, true);
    lv.setUint16(6, 0x0800, true);
    lv.setUint16(8, 0, true);
    lv.setUint16(10, dosTime, true);
    lv.setUint16(12, dosDate, true);
    lv.setUint32(14, crc, true);
    lv.setUint32(18, dataBytes.length, true);
    lv.setUint32(22, dataBytes.length, true);
    lv.setUint16(26, nameBytes.length, true);
    lv.setUint16(28, 0, true);
    localHeader.set(nameBytes, 30);

    const centralHeader = new Uint8Array(46 + nameBytes.length);
    const cv = new DataView(centralHeader.buffer);
    cv.setUint32(0, 0x02014b50, true);
    cv.setUint16(4, 20, true);
    cv.setUint16(6, 20, true);
    cv.setUint16(8, 0x0800, true);
    cv.setUint16(10, 0, true);
    cv.setUint16(12, dosTime, true);
    cv.setUint16(14, dosDate, true);
    cv.setUint32(16, crc, true);
    cv.setUint32(20, dataBytes.length, true);
    cv.setUint32(24, dataBytes.length, true);
    cv.setUint16(28, nameBytes.length, true);
    cv.setUint16(30, 0, true);
    cv.setUint16(32, 0, true);
    cv.setUint16(34, 0, true);
    cv.setUint16(36, 0, true);
    cv.setUint32(38, 0, true);
    cv.setUint32(42, offset, true);
    centralHeader.set(nameBytes, 46);

    localParts.push(localHeader, dataBytes);
    centralParts.push(centralHeader);
    offset += localHeader.length + dataBytes.length;
  });

  const centralSize = centralParts.reduce((s, p) => s + p.length, 0);
  const eocd = new Uint8Array(22);
  const ev = new DataView(eocd.buffer);
  ev.setUint32(0, 0x06054b50, true);
  ev.setUint16(4, 0, true);
  ev.setUint16(6, 0, true);
  ev.setUint16(8, entries.length, true);
  ev.setUint16(10, entries.length, true);
  ev.setUint32(12, centralSize, true);
  ev.setUint32(16, offset, true);
  ev.setUint16(20, 0, true);

  return new Blob([...localParts, ...centralParts, eocd], { type: mimeType });
}

function xlsxColumnLetter(index) {
  let n = index + 1;
  let col = '';
  while (n > 0) {
    const rem = (n - 1) % 26;
    col = String.fromCharCode(65 + rem) + col;
    n = Math.floor((n - 1) / 26);
  }
  return col;
}

function buildXlsxCellXml(colIdx, rowNum, rawVal, styleId) {
  const ref = `${xlsxColumnLetter(colIdx)}${rowNum}`;
  if (typeof rawVal === 'number' && Number.isFinite(rawVal)) {
    return `<c r="${ref}" t="n" s="${styleId}"><v>${rawVal}</v></c>`;
  }
  const str = String(rawVal ?? '');
  const escaped = escapeXmlValue(str);
  const preserve = /^\s|\s$/.test(str) ? ' xml:space="preserve"' : '';
  return `<c r="${ref}" t="inlineStr" s="${styleId}"><is><t${preserve}>${escaped}</t></is></c>`;
}

function buildXlsxWorksheetXml(sheet) {
  let headerRows = [];
  let dataMatrix = [];
  let merges = [];
  let footerRow = null;

  if (Array.isArray(sheet.headerRows) && sheet.headerRows.length) {
    headerRows = sheet.headerRows;
    dataMatrix = Array.isArray(sheet.rows) ? sheet.rows : [];
    merges = Array.isArray(sheet.merges) ? sheet.merges : [];
    footerRow = Array.isArray(sheet.footerRow) ? sheet.footerRow : null;
  } else {
    const rawRows = Array.isArray(sheet.rows) ? sheet.rows : [];
    const headers = rawRows.length ? Object.keys(rawRows[0]) : ['Informasi'];
    const effectiveRows = rawRows.length ? rawRows : [{ Informasi: 'Belum ada data tersedia' }];
    headerRows = [headers];
    dataMatrix = effectiveRows.map((row) => headers.map((h) => row[h] ?? ''));
  }

  const colCount = Math.max(
    1,
    ...headerRows.map((r) => r.length),
    ...dataMatrix.map((r) => r.length),
    footerRow ? footerRow.length : 0
  );

  const colWidths = Array.from({ length: colCount }, (_, cIdx) => {
    const candidates = [
      ...headerRows.map((r) => String(r[cIdx] ?? '').length),
      ...dataMatrix.map((r) => String(r[cIdx] ?? '').length),
      footerRow ? String(footerRow[cIdx] ?? '').length : 0,
    ];
    const maxLen = Math.max(4, ...candidates);
    return Math.min(44, Math.max(10, Math.round(maxLen * 1.15 + 4)));
  });

  const colsXml = `<cols>${colWidths
    .map((w, idx) => `<col min="${idx + 1}" max="${idx + 1}" width="${w}" customWidth="1"/>`)
    .join('')}</cols>`;

  const sheetRowsXml = [];
  let rowCursor = 1;

  headerRows.forEach((hRow, hIdx) => {
    const styleId = hIdx === 0 ? 1 : 2;
    const cellsXml = Array.from({ length: colCount }, (_, cIdx) =>
      buildXlsxCellXml(cIdx, rowCursor, hRow[cIdx] ?? '', styleId)
    ).join('');
    sheetRowsXml.push(`<row r="${rowCursor}" ht="24" customHeight="1">${cellsXml}</row>`);
    rowCursor += 1;
  });

  dataMatrix.forEach((dRow) => {
    const cellsXml = Array.from({ length: colCount }, (_, cIdx) =>
      buildXlsxCellXml(cIdx, rowCursor, dRow[cIdx] ?? '', cIdx >= 2 ? 3 : 0)
    ).join('');
    sheetRowsXml.push(`<row r="${rowCursor}" ht="20" customHeight="1">${cellsXml}</row>`);
    rowCursor += 1;
  });

  if (footerRow) {
    const cellsXml = Array.from({ length: colCount }, (_, cIdx) =>
      buildXlsxCellXml(cIdx, rowCursor, footerRow[cIdx] ?? '', 4)
    ).join('');
    sheetRowsXml.push(`<row r="${rowCursor}" ht="22" customHeight="1">${cellsXml}</row>`);
  }

  const mergeCellsXml = merges.length
    ? `<mergeCells count="${merges.length}">${merges
        .map(
          (m) =>
            `<mergeCell ref="${xlsxColumnLetter(m.c1)}${m.r1 + 1}:${xlsxColumnLetter(m.c2)}${m.r2 + 1}"/>`
        )
        .join('')}</mergeCells>`
    : '';

  return (
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
    `<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">` +
    `<sheetViews><sheetView workbookViewId="0"/></sheetViews>` +
    `<sheetFormatPr defaultRowHeight="20"/>` +
    colsXml +
    `<sheetData>${sheetRowsXml.join('')}</sheetData>` +
    mergeCellsXml +
    `</worksheet>`
  );
}

function downloadExcelWorkbook(sheets, filename) {
  const safeSheets = (sheets && sheets.length ? sheets : [{ name: 'Data', rows: [] }]).map(
    (s, idx) => ({
      ...s,
      safeName: sanitizeWorksheetName(s.name || `Sheet${idx + 1}`),
      sheetNum: idx + 1,
    })
  );

  const usedNames = new Set();
  safeSheets.forEach((s) => {
    let candidate = s.safeName;
    let suffix = 2;
    while (usedNames.has(candidate.toLowerCase())) {
      const tail = ` ${suffix++}`;
      candidate = `${s.safeName.slice(0, Math.max(1, 31 - tail.length))}${tail}`;
    }
    usedNames.add(candidate.toLowerCase());
    s.safeName = candidate;
  });

  const contentTypesXml =
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
    `<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">` +
    `<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>` +
    `<Default Extension="xml" ContentType="application/xml"/>` +
    `<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>` +
    `<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>` +
    safeSheets
      .map(
        (s) =>
          `<Override PartName="/xl/worksheets/sheet${s.sheetNum}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`
      )
      .join('') +
    `</Types>`;

  const rootRelsXml =
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
    `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
    `<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>` +
    `</Relationships>`;

  const workbookRelsXml =
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
    `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
    safeSheets
      .map(
        (s) =>
          `<Relationship Id="rId${s.sheetNum}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${s.sheetNum}.xml"/>`
      )
      .join('') +
    `<Relationship Id="rId${safeSheets.length + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>` +
    `</Relationships>`;

  const workbookXml =
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
    `<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">` +
    `<sheets>` +
    safeSheets
      .map(
        (s) =>
          `<sheet name="${escapeXmlValue(s.safeName)}" sheetId="${s.sheetNum}" r:id="rId${s.sheetNum}"/>`
      )
      .join('') +
    `</sheets>` +
    `</workbook>`;

  const stylesXml =
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
    `<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">` +
    `<fonts count="3">` +
    `<font><sz val="10"/><color rgb="FF0F172A"/><name val="Calibri"/></font>` +
    `<font><b/><sz val="10"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font>` +
    `<font><b/><sz val="10"/><color rgb="FF0F172A"/><name val="Calibri"/></font>` +
    `</fonts>` +
    `<fills count="5">` +
    `<fill><patternFill patternType="none"/></fill>` +
    `<fill><patternFill patternType="gray125"/></fill>` +
    `<fill><patternFill patternType="solid"><fgColor rgb="FF0B2647"/></patternFill></fill>` +
    `<fill><patternFill patternType="solid"><fgColor rgb="FF1D4ED8"/></patternFill></fill>` +
    `<fill><patternFill patternType="solid"><fgColor rgb="FFF1F5F9"/></patternFill></fill>` +
    `</fills>` +
    `<borders count="2">` +
    `<border><left/><right/><top/><bottom/><diagonal/></border>` +
    `<border>` +
    `<left style="thin"><color rgb="FFCBD5E1"/></left>` +
    `<right style="thin"><color rgb="FFCBD5E1"/></right>` +
    `<top style="thin"><color rgb="FFCBD5E1"/></top>` +
    `<bottom style="thin"><color rgb="FFCBD5E1"/></bottom>` +
    `<diagonal/>` +
    `</border>` +
    `</borders>` +
    `<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>` +
    `<cellXfs count="5">` +
    `<xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf>` +
    `<xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>` +
    `<xf numFmtId="0" fontId="1" fillId="3" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>` +
    `<xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>` +
    `<xf numFmtId="0" fontId="2" fillId="4" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>` +
    `</cellXfs>` +
    `<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>` +
    `</styleSheet>`;

  const entries = [
    { path: '[Content_Types].xml', content: contentTypesXml },
    { path: '_rels/.rels', content: rootRelsXml },
    { path: 'xl/_rels/workbook.xml.rels', content: workbookRelsXml },
    { path: 'xl/workbook.xml', content: workbookXml },
    { path: 'xl/styles.xml', content: stylesXml },
    ...safeSheets.map((s) => ({
      path: `xl/worksheets/sheet${s.sheetNum}.xml`,
      content: buildXlsxWorksheetXml(s),
    })),
  ];

  const finalFilename = filename.toLowerCase().endsWith('.xlsx')
    ? filename
    : `${filename.replace(/\.xls$/i, '')}.xlsx`;
  const blob = createStoredZipBlob(
    entries,
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = finalFilename;
  a.click();
  URL.revokeObjectURL(url);
}

// ----------------------------------------------------------------------------
// 15B. LAPORAN PDF BULANAN (KAS, ABSENSI, KESELURUHAN REKAPAN, & PER MAHASISWA)
// ----------------------------------------------------------------------------
function getDefaultSignatoryByRole(role) {
  const match = state.profiles.find((p) => p.role === role);
  if (match) return match;
  return state.currentUser || state.profiles[0] || { id: '', nama_lengkap: '-' };
}

function getResolvedPdfSignatories() {
  const cfg = state.pengaturan || {};
  const kelas = cfg.nama_kelas || 'R3S';
  const bendahara = getDefaultSignatoryByRole('bendahara');
  const ketua = getDefaultSignatoryByRole('ketua');
  const admin = getDefaultSignatoryByRole('admin');

  return {
    bendahara: { id: bendahara.id, nama: bendahara.nama_lengkap || '-', jabatan: `Bendahara Kelas ${kelas}` },
    ketua: { id: ketua.id, nama: ketua.nama_lengkap || '-', jabatan: `Ketua Kelas ${kelas}` },
    admin: { id: admin.id, nama: admin.nama_lengkap || '-', jabatan: 'Admin Penandatangan' },
  };
}

function renderLaporanPdfView() {
  const role = state.currentUser?.role || 'admin';
  const isAdmin = role === 'admin';
  const isKetua = role === 'ketua';
  const isBendahara = role === 'bendahara';

  const students = state.profiles.filter((p) =>
    isBendahara || isAdmin ? isKasMemberRole(p.role) : isStudentRole(p.role)
  );
  const monthVal = state.filters.pdfMonth || getWibDateKey(new Date()).slice(0, 7);
  const selectedStudent =
    students.some((s) => s.id === state.filters.pdfStudentId)
      ? state.filters.pdfStudentId
      : students[0]?.id || '';
  state.filters.pdfStudentId = selectedStudent;

  const sig = getResolvedPdfSignatories();
  state.filters.pdfBendaharaId = sig.bendahara.id;
  state.filters.pdfKetuaId = sig.ketua.id;
  state.filters.pdfAdminId = sig.admin.id;

  const sesiMonth = state.sesiAbsensi.filter((s) =>
    (s.tanggal || getWibDateKey(new Date(s.created_at))).startsWith(monthVal)
  );

  return `
    <div class="page-header">
      <div>
        <span class="meta-line">Dokumen Resmi Siap Cetak · Tanggal Waktu Nyata WIB &amp; Lembar Pengesahan PJ Terkunci</span>
        <h2>Laporan PDF Bulanan &amp; Per Mahasiswa</h2>
      </div>
      <div class="status-tag tag-info tabular-nums" id="pdf-realtime-clock">${escapeHtml(formatWibClock(new Date()))}</div>
    </div>

    <div class="card glass-panel" style="margin-bottom:20px;">
      <div class="card-header">
        <div>
          <h3>Filter Periode, Mahasiswa &amp; Admin Penandatangan</h3>
          <span class="meta-line">Penanggung Jawab Absensi (Ketua Kelas), PJ Kas (Bendahara), dan Admin Penandatangan terkunci permanen dan tidak dapat diubah</span>
        </div>
      </div>

      <div class="grid-2" style="margin-bottom:0;">
        <div class="field-group">
          <label for="pdf-month-input">Pilih Bulan &amp; Tahun Laporan</label>
          <input type="month" id="pdf-month-input" value="${escapeHtml(monthVal)}" class="tabular-nums" />
        </div>
        <div class="field-group">
          <label for="pdf-student-select">Pilih Mahasiswa (Untuk Laporan PDF Per Mahasiswa)</label>
          <select id="pdf-student-select">
            ${students
              .map(
                (m) =>
                  `<option value="${m.id}" ${m.id === selectedStudent ? 'selected' : ''}>${escapeHtml(m.nama_lengkap)} (${escapeHtml(m.npm)})${m.role === 'pj_matkul' ? ' · PJ Matkul' : ''}</option>`
              )
              .join('')}
          </select>
        </div>
      </div>

      <div class="${isAdmin ? 'grid-3' : 'grid-2'}" style="margin-bottom:0;">
        ${
          isAdmin || isBendahara
            ? `<div class="field-group">
                <label for="pdf-sign-bendahara">Penanggung Jawab Kas (Bendahara · Terkunci)</label>
                <input
                  type="text"
                  id="pdf-sign-bendahara"
                  class="input-locked"
                  value="${escapeHtml(sig.bendahara.nama)} (${escapeHtml(ROLE_LABELS.bendahara)})"
                  readonly
                  disabled
                />
              </div>`
            : ''
        }
        ${
          isAdmin || isKetua
            ? `<div class="field-group">
                <label for="pdf-sign-ketua">Penanggung Jawab Absensi (Ketua Kelas · Terkunci)</label>
                <input
                  type="text"
                  id="pdf-sign-ketua"
                  class="input-locked"
                  value="${escapeHtml(sig.ketua.nama)} (${escapeHtml(ROLE_LABELS.ketua)})"
                  readonly
                  disabled
                />
              </div>`
            : ''
        }
        <div class="field-group">
          <label for="pdf-sign-admin">Penyetuju / Admin (Dengan Stempel Logo Resmi · Terkunci)</label>
          <div style="display:flex;align-items:center;gap:10px;">
            <img
              src="./assets/aistudio/Code_Generated_Image__1__6558f03f.png"
              alt="Logo Stempel Admin"
              style="width:40px;height:40px;object-fit:contain;border-radius:50%;background:#ffffff;padding:2px;border:1px solid var(--border-glass);flex-shrink:0;"
            />
            <div style="flex:1;min-width:0;">
              <input
                type="text"
                id="pdf-sign-admin"
                class="input-locked"
                value="${escapeHtml(sig.admin.nama)} (${escapeHtml(ROLE_LABELS.admin)})"
                readonly
                disabled
              />
            </div>
          </div>
        </div>
      </div>

      <div class="field-group" style="margin-top:8px;margin-bottom:4px;">
        <label for="pdf-catatan-evaluasi">Catatan &amp; Evaluasi Singkat Laporan PDF (Opsional — Otomatis Terisi Jika Kosong)</label>
        <textarea
          id="pdf-catatan-evaluasi"
          rows="2"
          placeholder="Kosongkan untuk catatan & evaluasi otomatis berdasarkan data bulan terpilih, atau tulis catatan tambahan Anda di sini..."
        >${escapeHtml(state.filters.pdfEvaluationNote || '')}</textarea>
      </div>

      <div class="pdf-report-grid">
        ${
          isAdmin || isBendahara
            ? `<div class="pdf-report-card">
                <div>
                  <h4>Laporan Kas Bulanan — Matriks, Total Uang &amp; Mutasi (PDF)</h4>
                  <p class="meta-line" style="margin-top:4px;">
                    Berisi tabel Uang Kas Per Periode Keseluruhan Mahasiswa, Total Uang Keseluruhan Mahasiswa, &amp; Mutasi Kas periode ${escapeHtml(formatIndonesianMonthYear(monthVal))}.
                  </p>
                  <p class="meta-line" style="margin-top:6px;color:var(--accent-cyan);">
                    Dibuat Oleh: <strong>Bendahara</strong> (${escapeHtml(sig.bendahara.nama)})<br/>
                    Mengetahui / Disetujui Oleh: <strong>Admin</strong> (${escapeHtml(sig.admin.nama)})
                  </p>
                </div>
                <button type="button" id="btn-pdf-kas-bulanan" class="btn btn-primary btn-block">Unduh PDF Kas Keseluruhan</button>
              </div>`
            : ''
        }

        ${
          isAdmin || isKetua
            ? `<div class="pdf-report-card">
                <div>
                  <h4>Laporan Absensi Bulanan — Keseluruhan Mahasiswa (PDF)</h4>
                  <p class="meta-line" style="margin-top:4px;">
                    Matriks kehadiran mahasiswa per pertemuan &amp; mata kuliah beserta persentase hadir bulan ${escapeHtml(formatIndonesianMonthYear(monthVal))} (${sesiMonth.length} sesi).
                  </p>
                  <p class="meta-line" style="margin-top:6px;color:var(--accent-cyan);">
                    Dibuat Oleh: <strong>Ketua</strong> (${escapeHtml(sig.ketua.nama)})<br/>
                    Mengetahui / Disetujui Oleh: <strong>Admin</strong> (${escapeHtml(sig.admin.nama)})
                  </p>
                </div>
                <button type="button" id="btn-pdf-absensi-bulanan" class="btn btn-primary btn-block">Unduh PDF Absensi Keseluruhan</button>
              </div>`
            : ''
        }

        ${
          isAdmin
            ? `<div class="pdf-report-card">
                <div>
                  <h4>Laporan Keseluruhan Rekapan (PDF)</h4>
                  <p class="meta-line" style="margin-top:4px;">
                    Gabungan lengkap matriks absensi keseluruhan, matriks kas per periode, total uang kas mahasiswa, &amp; mutasi kas bulan ${escapeHtml(formatIndonesianMonthYear(monthVal))}.
                  </p>
                  <p class="meta-line" style="margin-top:6px;color:var(--accent-coral);">
                    Dibuat Oleh: <strong>Bendahara</strong> (${escapeHtml(sig.bendahara.nama)})<br/>
                    Mengetahui: <strong>Ketua</strong> (${escapeHtml(sig.ketua.nama)}) · Disetujui Oleh: <strong>Admin</strong> (${escapeHtml(sig.admin.nama)})
                  </p>
                </div>
                <button type="button" id="btn-pdf-keseluruhan" class="btn btn-coral btn-block">Unduh PDF Rekapan Keseluruhan</button>
              </div>`
            : ''
        }

        <div class="pdf-report-card">
          <div>
            <h4>Laporan Per Mahasiswa (PDF)</h4>
            <p class="meta-line" style="margin-top:4px;">
              ${
                isBendahara
                  ? 'Tabel matriks Kas Permahasiswa per bulan &amp; periode (Total Dibayar, Tunggakan, Status).'
                  : isKetua
                  ? 'Tabel matriks Absensi Permahasiswa per pertemuan &amp; mata kuliah (H, I, Z, A, &amp; Persentase Hadir).'
                  : 'Tabel matriks Absensi Permahasiswa (H, I, Z, A, %) &amp; Kas Permahasiswa per bulan &amp; periode (Total Dibayar, Tunggakan, Status).'
              }
            </p>
            <p class="meta-line" style="margin-top:6px;color:var(--accent-cyan);">
              Dibuat Oleh: <strong>${isBendahara ? 'Bendahara' : 'Ketua'}</strong> (${escapeHtml(isBendahara ? sig.bendahara.nama : sig.ketua.nama)})<br/>
              Mengetahui / Disetujui Oleh: <strong>Admin</strong> (${escapeHtml(sig.admin.nama)})
            </p>
          </div>
          <button type="button" id="btn-pdf-per-mahasiswa" class="btn btn-secondary btn-block">Unduh PDF Per Mahasiswa</button>
        </div>
      </div>
    </div>
  `;
}

const ADMIN_STAMP_LOGO_PATH = './assets/aistudio/Code_Generated_Image__1__6558f03f.png';
let cachedAdminStampJpeg = null;
let pendingAdminStampPromise = null;

async function loadAdminStampJpegAsset() {
  if (cachedAdminStampJpeg) return cachedAdminStampJpeg;
  if (pendingAdminStampPromise) return pendingAdminStampPromise;

  pendingAdminStampPromise = new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const natW = img.naturalWidth || 400;
        const natH = img.naturalHeight || 400;
        const targetW = Math.min(480, natW);
        const targetH = Math.max(1, Math.round(targetW * (natH / natW)));
        const canvas = document.createElement('canvas');
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, targetW, targetH);
        ctx.drawImage(img, 0, 0, targetW, targetH);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
        const base64 = dataUrl.split(',')[1] || '';
        const binStr = atob(base64);
        const bytes = new Uint8Array(binStr.length);
        for (let i = 0; i < binStr.length; i += 1) {
          bytes[i] = binStr.charCodeAt(i);
        }
        cachedAdminStampJpeg = { width: targetW, height: targetH, bytes };
        resolve(cachedAdminStampJpeg);
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = ADMIN_STAMP_LOGO_PATH;
  });

  const result = await pendingAdminStampPromise;
  pendingAdminStampPromise = null;
  return result;
}

// Generator PDF 1.4 murni Vanilla JavaScript (Standard 14 Fonts + AutoTable + JPEG XObject Engine)
class VanillaPdfDoc {
  constructor(options = {}) {
    const isLandscape = options.orientation === 'landscape';
    this.pageWidth = isLandscape ? 841.89 : 595.28; // A4 landscape or portrait in pt
    this.pageHeight = isLandscape ? 595.28 : 841.89;
    this.pages = [[]];
    this.currentPageIndex = 0;
    this.fontStyle = 'normal';
    this.fontSize = 10;
    this.textColor = [15, 23, 42];
    this.drawColor = [15, 23, 42];
    this.fillColor = [11, 38, 71];
    this.lineWidth = 0.75;
    this.lastAutoTable = { finalY: 120 };
    this.images = [];
    this.imageMap = {};
  }

  addImageJpeg(key, width, height, bytes) {
    if (this.imageMap[key]) return this.imageMap[key];
    const resName = `Im${this.images.length + 1}`;
    this.images.push({ resName, width: Number(width), height: Number(height), bytes });
    this.imageMap[key] = resName;
    return resName;
  }

  drawImage(key, x, topY, w, h) {
    const resName = this.imageMap[key];
    if (!resName) return this;
    const bottomPdfY = (this.pageHeight - topY - h).toFixed(2);
    this._pushCmd(
      `q ${w.toFixed(2)} 0 0 ${h.toFixed(2)} ${x.toFixed(2)} ${bottomPdfY} cm /${resName} Do Q`
    );
    return this;
  }

  _sanitizeText(input) {
    return String(input ?? '')
      .replace(/[\u2013\u2014]/g, '-')
      .replace(/\u2022/g, '*')
      .replace(/\u00b7/g, '|')
      .replace(/\u00d7/g, 'x')
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201c\u201d]/g, '"')
      .replace(/[^\x20-\x7E]/g, ' ');
  }

  _escapePdfLiteral(str) {
    return this._sanitizeText(str)
      .replace(/\\/g, '\\\\')
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)');
  }

  _fontResourceName(style = this.fontStyle) {
    if (style === 'bold') return 'F2';
    if (style === 'italic') return 'F3';
    return 'F1';
  }

  _charWidthRatio(ch) {
    if (ch === ' ') return 0.28;
    if ('ilIjtf.,:;\'"!|'.includes(ch)) return 0.27;
    if ('r-()[]/\\`'.includes(ch)) return 0.34;
    if ('mwMW@%&'.includes(ch)) return 0.82;
    if (ch >= 'A' && ch <= 'Z') return 0.67;
    if (ch >= '0' && ch <= '9') return 0.56;
    return 0.52;
  }

  getTextWidth(str, size = this.fontSize, style = this.fontStyle) {
    const clean = this._sanitizeText(str);
    let ratioSum = 0;
    for (let i = 0; i < clean.length; i += 1) {
      ratioSum += this._charWidthRatio(clean[i]);
    }
    const boldBoost = style === 'bold' ? 1.06 : 1;
    return ratioSum * size * boldBoost;
  }

  splitTextToSize(str, maxWidth, size = this.fontSize, style = this.fontStyle) {
    const clean = this._sanitizeText(str).trim();
    if (!clean) return [''];
    const paragraphs = clean.split(/\r?\n/);
    const lines = [];

    paragraphs.forEach((para) => {
      const words = para.split(/\s+/).filter(Boolean);
      if (!words.length) {
        lines.push('');
        return;
      }
      let current = '';
      words.forEach((word) => {
        const candidate = current ? `${current} ${word}` : word;
        if (this.getTextWidth(candidate, size, style) <= maxWidth) {
          current = candidate;
        } else if (!current) {
          // Pecah kata panjang agar tidak melebihi batas kolom
          let chunk = '';
          for (let i = 0; i < word.length; i += 1) {
            const nextChunk = chunk + word[i];
            if (this.getTextWidth(nextChunk, size, style) > maxWidth && chunk) {
              lines.push(chunk);
              chunk = word[i];
            } else {
              chunk = nextChunk;
            }
          }
          current = chunk;
        } else {
          lines.push(current);
          current = word;
        }
      });
      if (current) lines.push(current);
    });

    return lines.length ? lines : [''];
  }

  _pushCmd(cmd) {
    this.pages[this.currentPageIndex].push(cmd);
  }

  _rgbStr(rgb) {
    return rgb
      .map((v) => Math.max(0, Math.min(1, Number(v || 0) / 255)).toFixed(3))
      .join(' ');
  }

  _pdfY(topY) {
    return (this.pageHeight - topY).toFixed(2);
  }

  addPage() {
    this.pages.push([]);
    this.currentPageIndex = this.pages.length - 1;
    return this;
  }

  getNumberOfPages() {
    return this.pages.length;
  }

  setPage(pageNum) {
    const idx = Math.max(0, Math.min(this.pages.length - 1, pageNum - 1));
    this.currentPageIndex = idx;
    return this;
  }

  setFont(_family, style = 'normal') {
    this.fontStyle = style || 'normal';
    return this;
  }

  setFontSize(size) {
    this.fontSize = Number(size) || 10;
    return this;
  }

  setTextColor(r, g, b) {
    this.textColor = [r, g, b];
    return this;
  }

  setDrawColor(r, g, b) {
    this.drawColor = [r, g, b];
    return this;
  }

  setFillColor(r, g, b) {
    this.fillColor = [r, g, b];
    return this;
  }

  setLineWidth(w) {
    this.lineWidth = Number(w) || 0.5;
    return this;
  }

  line(x1, y1, x2, y2) {
    this._pushCmd(
      `q ${this.lineWidth.toFixed(2)} w ${this._rgbStr(this.drawColor)} RG ${x1.toFixed(2)} ${this._pdfY(y1)} m ${x2.toFixed(2)} ${this._pdfY(y2)} l S Q`
    );
    return this;
  }

  rect(x, topY, w, h, mode = 'F') {
    const bottomPdfY = (this.pageHeight - topY - h).toFixed(2);
    if (mode === 'F') {
      this._pushCmd(
        `q ${this._rgbStr(this.fillColor)} rg ${x.toFixed(2)} ${bottomPdfY} ${w.toFixed(2)} ${h.toFixed(2)} re f Q`
      );
    } else if (mode === 'FD') {
      this._pushCmd(
        `q ${this.lineWidth.toFixed(2)} w ${this._rgbStr(this.fillColor)} rg ${this._rgbStr(this.drawColor)} RG ${x.toFixed(2)} ${bottomPdfY} ${w.toFixed(2)} ${h.toFixed(2)} re B Q`
      );
    } else {
      this._pushCmd(
        `q ${this.lineWidth.toFixed(2)} w ${this._rgbStr(this.drawColor)} RG ${x.toFixed(2)} ${bottomPdfY} ${w.toFixed(2)} ${h.toFixed(2)} re S Q`
      );
    }
    return this;
  }

  text(input, x, y, opts = {}) {
    const lines = Array.isArray(input) ? input : [String(input ?? '')];
    const align = opts.align || 'left';
    const fontRes = this._fontResourceName(this.fontStyle);
    const lineHeight = this.fontSize * 1.28;

    lines.forEach((lineStr, idx) => {
      const clean = this._sanitizeText(lineStr);
      const w = this.getTextWidth(clean, this.fontSize, this.fontStyle);
      let drawX = x;
      if (align === 'center') drawX = x - w / 2;
      else if (align === 'right') drawX = x - w;

      const drawY = y + idx * lineHeight;
      this._pushCmd(
        `BT /${fontRes} ${this.fontSize.toFixed(2)} Tf ${this._rgbStr(this.textColor)} rg 1 0 0 1 ${drawX.toFixed(2)} ${this._pdfY(drawY)} Tm (${this._escapePdfLiteral(clean)}) Tj ET`
      );
    });
    return this;
  }

  autoTable(options = {}) {
    const marginLeft = options.margin?.left ?? 40;
    const marginRight = options.margin?.right ?? 40;
    const maxY = this.pageHeight - 46;
    const tableWidth = this.pageWidth - marginLeft - marginRight;

    const styles = options.styles || {};
    const fontSize = styles.fontSize ?? 8.5;
    const padding = styles.cellPadding ?? 5;
    const lineColor = styles.lineColor || [30, 41, 59];
    const lineWidth = styles.lineWidth ?? 0.55;
    const bodyTextColor = styles.textColor || [15, 23, 42];
    const altFill = options.alternateRowStyles?.fillColor || [255, 255, 255];
    const headFill0 = options.headStyles?.fillColor || [22, 58, 120];
    const headFill1 = options.subHeadStyles?.fillColor || [29, 78, 216];
    const headTextColor = options.headStyles?.textColor || [255, 255, 255];
    const headLineColor = options.headStyles?.lineColor || [30, 41, 59];

    const headRows = options.head || [];
    const bodyRows = options.body || [];
    const footRows = options.foot || [];
    const colStyles = options.columnStyles || {};

    const normCell = (c) =>
      c && typeof c === 'object' && !Array.isArray(c)
        ? {
            content: String(c.content ?? ''),
            colSpan: Math.max(1, Number(c.colSpan || 1)),
            rowSpan: Math.max(1, Number(c.rowSpan || 1)),
            styles: c.styles || {},
          }
        : { content: String(c ?? ''), colSpan: 1, rowSpan: 1, styles: {} };

    const headColCount = headRows.length
      ? headRows[0].reduce((sum, cell) => sum + normCell(cell).colSpan, 0)
      : 0;
    const colCount = Math.max(
      headColCount,
      bodyRows[0]?.length || 0,
      footRows[0]?.length || 0
    );
    if (colCount === 0) return this;

    // Bangun tata letak sel header multi-baris (rowSpan & colSpan)
    const occ = Array.from({ length: headRows.length }, () => new Array(colCount).fill(false));
    const placedHeadCells = [];
    for (let r = 0; r < headRows.length; r += 1) {
      let c = 0;
      headRows[r].forEach((raw) => {
        while (c < colCount && occ[r][c]) c += 1;
        if (c >= colCount) return;
        const cell = normCell(raw);
        const cs = Math.max(1, Math.min(cell.colSpan, colCount - c));
        const rs = Math.max(1, Math.min(cell.rowSpan, headRows.length - r));
        for (let dr = 0; dr < rs; dr += 1) {
          for (let dc = 0; dc < cs; dc += 1) {
            occ[r + dr][c + dc] = true;
          }
        }
        placedHeadCells.push({ row: r, col: c, colSpan: cs, rowSpan: rs, cell });
        c += cs;
      });
    }

    // Hitung lebar tiap kolom leaf secara proporsional
    const fixedWidths = new Array(colCount).fill(null);
    const desiredWidths = new Array(colCount).fill(28);
    let remainingWidth = tableWidth;

    for (let c = 0; c < colCount; c += 1) {
      if (colStyles[c]?.cellWidth) {
        fixedWidths[c] = Number(colStyles[c].cellWidth);
        remainingWidth -= fixedWidths[c];
      }
    }

    placedHeadCells.forEach(({ col, colSpan, cell }) => {
      const wNeeded = this.getTextWidth(cell.content, fontSize, 'bold') + padding * 2 + 6;
      if (colSpan === 1) {
        desiredWidths[col] = Math.max(desiredWidths[col], Math.min(180, wNeeded));
      } else {
        const share = wNeeded / colSpan;
        for (let dc = 0; dc < colSpan; dc += 1) {
          desiredWidths[col + dc] = Math.max(desiredWidths[col + dc], Math.min(140, share));
        }
      }
    });

    for (let c = 0; c < colCount; c += 1) {
      if (fixedWidths[c] !== null) continue;
      const bodyTexts = [
        ...bodyRows.map((r) => normCell(r[c]).content),
        ...footRows.map((r) => normCell(r[c]).content),
      ];
      bodyTexts.forEach((txt) => {
        const w = this.getTextWidth(txt, fontSize, 'bold') + padding * 2 + 6;
        desiredWidths[c] = Math.max(desiredWidths[c], Math.min(185, w));
      });
    }

    const totalDesired = desiredWidths.reduce((s, w, c) => (fixedWidths[c] !== null ? s : s + w), 0) || 1;
    const colWidths = fixedWidths.map((fw, c) =>
      fw !== null ? fw : Math.max(24, (desiredWidths[c] / totalDesired) * Math.max(80, remainingWidth))
    );
    const widthSum = colWidths.reduce((s, w) => s + w, 0) || tableWidth;
    const scale = tableWidth / widthSum;
    for (let c = 0; c < colCount; c += 1) {
      colWidths[c] *= scale;
    }

    const colOffsets = [marginLeft];
    for (let c = 0; c < colCount; c += 1) {
      colOffsets.push(colOffsets[c] + colWidths[c]);
    }

    let cursorY = options.startY ?? 95;
    const lineHeight = fontSize * 1.24;

    const drawHeaderBlock = () => {
      if (!headRows.length) return;
      const rowHeights = new Array(headRows.length).fill(fontSize * 1.3 + padding * 2 + 4);
      const wrappedMap = new Map();

      placedHeadCells.forEach((item, idx) => {
        const cw = colOffsets[item.col + item.colSpan] - colOffsets[item.col];
        const maxW = Math.max(12, cw - padding * 2);
        const lines = this.splitTextToSize(item.cell.content, maxW, fontSize, 'bold');
        wrappedMap.set(idx, lines);
        if (item.rowSpan === 1) {
          const neededH = lines.length * lineHeight + padding * 2 + 2;
          rowHeights[item.row] = Math.max(rowHeights[item.row], neededH);
        }
      });

      placedHeadCells.forEach((item, idx) => {
        if (item.rowSpan > 1) {
          const lines = wrappedMap.get(idx) || [item.cell.content];
          const neededH = lines.length * lineHeight + padding * 2 + 2;
          let spanH = 0;
          for (let r = item.row; r < item.row + item.rowSpan; r += 1) spanH += rowHeights[r];
          if (neededH > spanH) {
            rowHeights[item.row + item.rowSpan - 1] += neededH - spanH;
          }
        }
      });

      const totalHeadH = rowHeights.reduce((s, h) => s + h, 0);
      if (cursorY + totalHeadH > maxY) {
        this.addPage();
        cursorY = 42;
      }

      const rowTops = [cursorY];
      for (let r = 0; r < headRows.length; r += 1) {
        rowTops.push(rowTops[r] + rowHeights[r]);
      }

      placedHeadCells.forEach((item, idx) => {
        const cx = colOffsets[item.col];
        const cw = colOffsets[item.col + item.colSpan] - cx;
        const cy = rowTops[item.row];
        const ch = rowTops[item.row + item.rowSpan] - cy;
        const defaultBg = item.row === 0 ? headFill0 : headFill1;
        const bg = item.cell.styles.fillColor || defaultBg;
        const fg = item.cell.styles.textColor || headTextColor;
        const align = item.cell.styles.halign || options.headStyles?.halign || 'center';
        const lines = wrappedMap.get(idx) || [item.cell.content];

        this.setFillColor(...bg);
        this.setDrawColor(...headLineColor);
        this.setLineWidth(lineWidth);
        this.rect(cx, cy, cw, ch, 'FD');

        this.setFont('helvetica', 'bold');
        this.setFontSize(fontSize);
        this.setTextColor(...fg);

        let textX = cx + padding;
        if (align === 'center') textX = cx + cw / 2;
        else if (align === 'right') textX = cx + cw - padding;

        const blockTextH = lines.length * lineHeight;
        const baseTopY = cy + (ch - blockTextH) / 2 + fontSize * 0.85;
        lines.forEach((lineStr, li) => {
          this.text(lineStr, textX, baseTopY + li * lineHeight, { align });
        });
      });

      cursorY += totalHeadH;
    };

    const drawSimpleRow = (rowCells, rowConfig, rowIndex = 0) => {
      const normalized = new Array(colCount).fill(null).map((_, c) => normCell(rowCells[c]));
      const wrappedCols = normalized.map((cell, c) => {
        const maxCellTextW = Math.max(12, colWidths[c] - padding * 2);
        const fStyle = cell.styles.fontStyle || (rowConfig.isFoot ? 'bold' : colStyles[c]?.fontStyle || 'normal');
        return this.splitTextToSize(cell.content, maxCellTextW, fontSize, fStyle);
      });
      const maxLines = Math.max(1, ...wrappedCols.map((lines) => lines.length));
      const rowHeight = maxLines * lineHeight + padding * 2 + 2;

      if (cursorY + rowHeight > maxY) {
        this.addPage();
        cursorY = 42;
        drawHeaderBlock();
      }

      for (let c = 0; c < colCount; c += 1) {
        const cell = normalized[c];
        const x = colOffsets[c];
        const w = colWidths[c];
        const bg =
          cell.styles.fillColor ||
          rowConfig.fillColor ||
          (rowIndex % 2 === 1 ? altFill : [255, 255, 255]);
        this.setFillColor(...bg);
        this.setDrawColor(...lineColor);
        this.setLineWidth(lineWidth);
        this.rect(x, cursorY, w, rowHeight, 'FD');

        const align =
          cell.styles.halign ||
          (rowConfig.isFoot
            ? options.footStyles?.halign || colStyles[c]?.halign || 'center'
            : colStyles[c]?.halign || 'center');

        const fStyle =
          cell.styles.fontStyle ||
          (rowConfig.isFoot ? 'bold' : colStyles[c]?.fontStyle || 'normal');

        const fg = cell.styles.textColor || rowConfig.textColor || bodyTextColor;
        this.setFont('helvetica', fStyle);
        this.setFontSize(fontSize);
        this.setTextColor(...fg);

        let textX = x + padding;
        if (align === 'center') textX = x + w / 2;
        else if (align === 'right') textX = x + w - padding;

        const blockTextH = wrappedCols[c].length * lineHeight;
        const baseTopY = cursorY + (rowHeight - blockTextH) / 2 + fontSize * 0.85;
        wrappedCols[c].forEach((lineStr, li) => {
          this.text(lineStr, textX, baseTopY + li * lineHeight, { align });
        });
      }

      cursorY += rowHeight;
    };

    drawHeaderBlock();

    bodyRows.forEach((br, idx) => {
      drawSimpleRow(
        br,
        {
          isFoot: false,
          textColor: bodyTextColor,
        },
        idx
      );
    });

    footRows.forEach((fr) => {
      drawSimpleRow(fr, {
        isFoot: true,
        fillColor: options.footStyles?.fillColor || [241, 245, 249],
        textColor: options.footStyles?.textColor || [11, 38, 71],
      });
    });

    this.lastAutoTable = { finalY: cursorY };
    return this;
  }

  toUint8Array() {
    const encoder = new TextEncoder();
    const parts = [];
    const offsets = [0];
    let byteLength = 0;

    const pushAscii = (str) => {
      const bytes = encoder.encode(str);
      parts.push(bytes);
      byteLength += bytes.length;
    };

    const pushBytes = (uint8) => {
      parts.push(uint8);
      byteLength += uint8.length;
    };

    pushAscii('%PDF-1.4\n%R3S\n');

    const totalPages = this.pages.length;
    const fontIds = [3, 4, 5]; // F1 Helvetica, F2 Helvetica-Bold, F3 Helvetica-Oblique
    const firstImgObjId = 6;
    const imgObjIds = this.images.map((_, idx) => firstImgObjId + idx);
    const firstPageObjId = firstImgObjId + this.images.length;
    const pageObjIds = [];
    for (let i = 0; i < totalPages; i += 1) {
      pageObjIds.push(firstPageObjId + i * 2);
    }

    const addObj = (id, bodyStr) => {
      offsets[id] = byteLength;
      pushAscii(`${id} 0 obj\n${bodyStr}\nendobj\n`);
    };

    const addBinaryObj = (id, headerStr, binaryBytes) => {
      offsets[id] = byteLength;
      pushAscii(`${id} 0 obj\n${headerStr}`);
      pushBytes(binaryBytes);
      pushAscii('\nendstream\nendobj\n');
    };

    addObj(1, '<< /Type /Catalog /Pages 2 0 R >>');
    addObj(
      2,
      `<< /Type /Pages /Kids [${pageObjIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${totalPages} >>`
    );
    addObj(
      fontIds[0],
      '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>'
    );
    addObj(
      fontIds[1],
      '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>'
    );
    addObj(
      fontIds[2],
      '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>'
    );

    this.images.forEach((img, idx) => {
      const imgId = imgObjIds[idx];
      addBinaryObj(
        imgId,
        `<< /Type /XObject /Subtype /Image /Width ${img.width} /Height ${img.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${img.bytes.length} >>\nstream\n`,
        img.bytes
      );
    });

    const xObjectDict = this.images.length
      ? ` /XObject << ${this.images
          .map((im, idx) => `/${im.resName} ${imgObjIds[idx]} 0 R`)
          .join(' ')} >>`
      : '';

    this.pages.forEach((cmds, idx) => {
      const pageId = firstPageObjId + idx * 2;
      const streamId = pageId + 1;
      const streamStr = cmds.join('\n');
      const streamBytesLen = encoder.encode(streamStr).length;

      addObj(
        pageId,
        `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${this.pageWidth.toFixed(2)} ${this.pageHeight.toFixed(2)}] /Resources << /Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R >>${xObjectDict} >> /Contents ${streamId} 0 R >>`
      );
      addObj(
        streamId,
        `<< /Length ${streamBytesLen} >>\nstream\n${streamStr}\nendstream`
      );
    });

    const totalObjs = firstPageObjId + totalPages * 2;
    const xrefOffset = byteLength;
    pushAscii(`xref\n0 ${totalObjs}\n0000000000 65535 f \n`);
    for (let id = 1; id < totalObjs; id += 1) {
      pushAscii(`${String(offsets[id] || 0).padStart(10, '0')} 00000 n \n`);
    }
    pushAscii(
      `trailer\n<< /Size ${totalObjs} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`
    );

    const out = new Uint8Array(byteLength);
    let cursor = 0;
    parts.forEach((chunk) => {
      out.set(chunk, cursor);
      cursor += chunk.length;
    });
    return out;
  }

  save(filename) {
    const bytes = this.toUint8Array();
    const blob = new Blob([bytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
}

function getGlobalKasSaldo() {
  const totalMasuk = state.transaksiKas
    .filter((t) => t.jenis === 'Pemasukan')
    .reduce((s, t) => s + Number(t.nominal || 0), 0);
  const totalKeluar = state.transaksiKas
    .filter((t) => t.jenis === 'Pengeluaran')
    .reduce((s, t) => s + Number(t.nominal || 0), 0);
  return totalMasuk - totalKeluar;
}

function createCleanReportPdfDoc(title, subtitle, now = new Date(), metaOpts = {}) {
  const doc = new VanillaPdfDoc({ orientation: 'landscape' });
  const cfg = state.pengaturan || {};
  const kelasNama = cfg.nama_kelas || 'R3S';
  const semester = Number(cfg.semester_aktif || 3);
  const berjalan = Number(cfg.pertemuan_berjalan ?? 0);
  const totalPertemuan = Math.max(1, Number(cfg.total_pertemuan_semester || 14));
  const rightEdge = doc.pageWidth - 40;

  // Baris eyebrow resmi sesuai kop dokumen kelas
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text(`AKTIVITAS KELAS RS · PUSAT ABSENSI & KAS KELAS ${kelasNama.toUpperCase()}`, 40, 38);

  // Judul utama laporan
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(17.5);
  doc.setTextColor(15, 23, 42);
  doc.text(title, 40, 56);

  // Garis pemisah header
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(1.25);
  doc.line(40, 65, rightEdge, 65);

  // Blok metadata terstruktur (Kelas, Semester/Pertemuan, Periode, Real-Time WIB, dll)
  const metaRows = [
    { label: 'Kelas / Program', value: `Kelas ${kelasNama}` },
    { label: 'Semester / Pertemuan', value: `Semester ${semester} (${berjalan}/${totalPertemuan} Pertemuan)` },
    { label: 'Periode Laporan', value: metaOpts.periodeLabel || subtitle || '-' },
    { label: 'Tanggal Cetak (Real-Time)', value: formatWibClock(now) },
    ...(Array.isArray(metaOpts.extraRows) ? metaOpts.extraRows : []),
  ];

  let metaY = 80;
  metaRows.forEach((row) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.2);
    doc.setTextColor(71, 85, 105);
    doc.text(row.label, 40, metaY);

    doc.text(':', 182, metaY);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.2);
    doc.setTextColor(15, 23, 42);
    doc.text(String(row.value ?? '-'), 192, metaY);
    metaY += 14;
  });

  return { doc, startY: metaY + 8, now };
}

function drawPdfSectionHeading(doc, title, y, subtitle = '') {
  if (y > doc.pageHeight - 110) {
    doc.addPage();
    y = 48;
  }
  const rightEdge = doc.pageWidth - 40;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text(title, 40, y);

  let nextY = y + 14;
  if (subtitle) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(71, 85, 105);
    doc.text(subtitle, 40, nextY);
    nextY += 8;
  }
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(1.0);
  doc.line(40, nextY, rightEdge, nextY);
  return nextY + 12;
}

function drawPdfLembarPengesahan(doc, columns, startY, now = new Date(), adminStamp = null) {
  let y = startY + 24;
  if (y > doc.pageHeight - 155) {
    doc.addPage();
    y = 48;
  }

  const pageW = doc.pageWidth;
  const rightEdge = pageW - 40;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('Lembar Pengesahan & Penanggung Jawab', 40, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.2);
  doc.setTextColor(51, 65, 85);
  doc.text(`Jakarta, ${formatWibDateFormal(now)} · ${formatWibTimeOnly(now)}`, rightEdge, y, {
    align: 'right',
  });
  y += 22;

  if (adminStamp && adminStamp.bytes) {
    doc.addImageJpeg('admin_stamp', adminStamp.width, adminStamp.height, adminStamp.bytes);
  }

  const centers =
    columns.length === 3
      ? [pageW * 0.2, pageW * 0.5, pageW * 0.8]
      : columns.length === 2
      ? [pageW * 0.28, pageW * 0.72]
      : [pageW * 0.5];

  columns.forEach((col, idx) => {
    const cx = centers[idx];
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(30, 41, 59);
    doc.text(col.roleLabel, cx, y, { align: 'center' });

    const isAdminApproval =
      col.showAdminLogo || /disetujui/i.test(col.roleLabel || '') || /admin/i.test(col.title || '');
    if (isAdminApproval && adminStamp && adminStamp.bytes) {
      const drawH = 54;
      const drawW = drawH * (adminStamp.width / Math.max(1, adminStamp.height));
      doc.drawImage('admin_stamp', cx - drawW / 2, y + 6, drawW, drawH);
    }

    const nameY = y + 68;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(11, 31, 58);
    doc.text(col.name, cx, nameY, { align: 'center' });

    const nameW = Math.max(105, doc.getTextWidth(col.name) + 16);
    doc.setDrawColor(15, 23, 42);
    doc.setLineWidth(0.8);
    doc.line(cx - nameW / 2, nameY + 3, cx + nameW / 2, nameY + 3);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.8);
    doc.setTextColor(100, 116, 139);
    doc.text(col.title, cx, nameY + 16, { align: 'center' });
  });

  return y + 94;
}

function finalizePdfPages(doc, footerTitle) {
  const cfg = state.pengaturan || {};
  const kelasNama = cfg.nama_kelas || 'R3S';
  const totalPages = doc.getNumberOfPages();
  const rightEdge = doc.pageWidth - 40;
  const lineY = doc.pageHeight - 36;
  const textY = doc.pageHeight - 22;
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.6);
    doc.line(40, lineY, rightEdge, lineY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(100, 116, 139);
    doc.text(`Aktivitas Kelas RS · ${footerTitle} — Kelas ${kelasNama}`, 40, textY);
    doc.text(`Halaman ${p} dari ${totalPages}`, rightEdge, textY, { align: 'right' });
  }
}

function pdfStatusCell(label) {
  const str = String(label || '-');
  if (str === 'Hadir' || str === 'Lunas') {
    return { content: str, styles: { textColor: [22, 163, 74], fontStyle: 'bold', halign: 'center' } };
  }
  if (str === 'Izin') {
    return { content: str, styles: { textColor: [217, 119, 6], fontStyle: 'bold', halign: 'center' } };
  }
  if (str === 'Sakit') {
    return { content: str, styles: { textColor: [2, 132, 199], fontStyle: 'bold', halign: 'center' } };
  }
  if (str === 'Alpha' || str === 'Belum Absen!' || str === 'Blm Lunas' || str === 'Belum Lunas') {
    return { content: str, styles: { textColor: [220, 38, 38], fontStyle: 'bold', halign: 'center' } };
  }
  return { content: str, styles: { textColor: [71, 85, 105], halign: 'center' } };
}

function buildAbsensiKeseluruhanPdfConfig(sessionsList) {
  const students = state.profiles.filter((p) => isStudentRole(p.role));
  const sessions = [...sessionsList].sort(
    (a, b) => Number(a.pertemuan_ke || 0) - Number(b.pertemuan_ke || 0)
  );
  const groupMap = new Map();
  sessions.forEach((s) => {
    const pNum = Number(s.pertemuan_ke || 1);
    if (!groupMap.has(pNum)) groupMap.set(pNum, { pertemuan: pNum, sessions: [] });
    groupMap.get(pNum).sessions.push(s);
  });
  const groups = Array.from(groupMap.values()).sort((a, b) => a.pertemuan - b.pertemuan);
  const orderedSessions = groups.flatMap((g) => g.sessions);

  if (orderedSessions.length === 0) {
    return {
      head: [['NIM', 'Nama Mahasiswa', 'Keterangan', 'Persentase Hadir']],
      body:
        students.length === 0
          ? [['-', '-', 'Belum ada data sesi absensi', '0%']]
          : students.map((m) => [
              { content: m.npm, styles: { fontStyle: 'bold' } },
              m.nama_lengkap,
              'Belum ada sesi absensi pada periode ini',
              { content: '0%', styles: { fontStyle: 'bold' } },
            ]),
      columnStyles: { 1: { halign: 'left' } },
    };
  }

  const headRow0 = [
    { content: 'NIM', rowSpan: 2 },
    { content: 'Nama Mahasiswa', rowSpan: 2 },
    ...groups.map((g) => ({ content: `Pertemuan ${g.pertemuan}`, colSpan: g.sessions.length })),
    { content: 'Persentase Hadir', rowSpan: 2 },
  ];
  const headRow1 = orderedSessions.map((s) => s.mata_kuliah || '-');

  const body = students.map((m) => {
    let hadir = 0;
    let total = 0;
    const statusCells = orderedSessions.map((s) => {
      const rec = state.absensi.find((a) => a.sesi_id === s.id && a.user_id === m.id) || null;
      if (rec) {
        total += 1;
        if (rec.status_kehadiran === 'Hadir') hadir += 1;
      }
      return pdfStatusCell(rec ? rec.status_kehadiran : '-');
    });
    const denom = Math.max(total, orderedSessions.length);
    const pct = denom > 0 ? Math.round((hadir / denom) * 100) : 0;
    return [
      { content: m.npm, styles: { fontStyle: 'bold', halign: 'center' } },
      { content: m.nama_lengkap, styles: { halign: 'left' } },
      ...statusCells,
      { content: `${pct}%`, styles: { fontStyle: 'bold', halign: 'center' } },
    ];
  });

  const colCount = 3 + orderedSessions.length;
  return {
    head: [headRow0, headRow1],
    body,
    fontSize: colCount > 11 ? 7.2 : colCount > 8 ? 7.8 : 8.5,
    columnStyles: {
      0: { cellWidth: 68, halign: 'center' },
      1: { halign: 'left' },
    },
  };
}

function buildKasPeriodPdfConfig() {
  const { monthGroups, orderedSlots, rows } = buildKasPeriodMatrix();
  if (orderedSlots.length === 0) {
    return {
      head: [['NIM', 'Nama Mahasiswa', 'Keterangan Tagihan']],
      body: rows.map((r) => [
        { content: r.student.npm, styles: { fontStyle: 'bold' } },
        { content: r.student.nama_lengkap, styles: { halign: 'left' } },
        'Belum ada tagihan periode kas',
      ]),
      fontSize: 8.5,
    };
  }

  const headRow0 = [
    { content: 'NIM', rowSpan: 2 },
    { content: 'Nama Mahasiswa', rowSpan: 2 },
    ...monthGroups.map((g) => ({ content: g.monthLabel, colSpan: g.slots.length })),
  ];
  const headRow1 = orderedSlots.map((s) => s.subLabel);

  const body = rows.map((r) => [
    { content: r.student.npm, styles: { fontStyle: 'bold', halign: 'center' } },
    { content: r.student.nama_lengkap, styles: { halign: 'left' } },
    ...r.slotCells.map(({ bill }) => {
      if (!bill) return '-';
      const paid = Number(bill.nominal_dibayar || 0);
      return paid > 0 ? formatRupiah(paid) : '-';
    }),
  ]);

  const colCount = 2 + orderedSlots.length;
  return {
    head: [headRow0, headRow1],
    body,
    fontSize: colCount > 12 ? 7.2 : colCount > 9 ? 7.8 : 8.5,
    columnStyles: {
      0: { cellWidth: 72, halign: 'center' },
      1: { halign: 'left' },
    },
  };
}

function buildTotalUangKeseluruhanPdfConfig() {
  const students = state.profiles.filter((p) => isKasMemberRole(p.role));
  const body = students.map((m) => {
    const ks = getStudentKasStats(m.id);
    return [
      { content: m.npm, styles: { fontStyle: 'bold', halign: 'center' } },
      { content: m.nama_lengkap, styles: { halign: 'left' } },
      { content: formatRupiah(ks.sudahBayar), styles: { fontStyle: 'bold', halign: 'center' } },
      { content: ks.tunggakan > 0 ? formatRupiah(ks.tunggakan) : '-', styles: { halign: 'center' } },
      pdfStatusCell(ks.isLunas ? 'Lunas' : 'Blm Lunas'),
    ];
  });

  return {
    head: [['NIM', 'Nama Mahasiswa', 'Total Dibayar', 'Tunggakan', 'Status']],
    body: body.length ? body : [['-', '-', 'Rp 0', 'Rp 0', '-']],
    fontSize: 9,
    columnStyles: {
      0: { cellWidth: 85, halign: 'center' },
      1: { halign: 'left' },
    },
  };
}

function buildPerStudentAttendancePdfConfig(studentId) {
  const sessions = [...state.sesiAbsensi].sort(
    (a, b) => Number(a.pertemuan_ke || 0) - Number(b.pertemuan_ke || 0)
  );
  const matkulList = [];
  const seenMk = new Set();
  sessions.forEach((s) => {
    const mk = String(s.mata_kuliah || '').trim();
    if (mk && !seenMk.has(mk)) {
      seenMk.add(mk);
      matkulList.push(mk);
    }
  });
  const meetingNums = Array.from(new Set(sessions.map((s) => Number(s.pertemuan_ke || 1)))).sort(
    (a, b) => a - b
  );

  if (!matkulList.length || !meetingNums.length) {
    return {
      head: [['Pertemuan', 'Keterangan', 'H', 'I', 'Z', 'A', 'Persentase Hadir']],
      body: [['-', 'Belum ada sesi absensi kelas', '-', '-', '-', '-', '0%']],
      fontSize: 8.5,
    };
  }

  const headRow0 = [
    { content: 'Pertemuan', rowSpan: 2 },
    ...matkulList.map((mk) => ({ content: mk, rowSpan: 2 })),
    { content: 'Total Catatan', colSpan: 4 },
    { content: 'Persentase Hadir', rowSpan: 2 },
  ];
  const headRow1 = ['H', 'I', 'Z', 'A'];

  const body = meetingNums.map((pNum) => {
    let h = 0;
    let i = 0;
    let z = 0;
    let a = 0;
    let totalTaken = 0;
    const mkCells = matkulList.map((mk) => {
      const sesi = sessions.find(
        (s) => Number(s.pertemuan_ke || 1) === pNum && s.mata_kuliah === mk
      );
      if (!sesi) return '-';
      const rec = state.absensi.find((x) => x.sesi_id === sesi.id && x.user_id === studentId);
      if (!rec) return '-';
      totalTaken += 1;
      if (rec.status_kehadiran === 'Hadir') h += 1;
      else if (rec.status_kehadiran === 'Izin') i += 1;
      else if (rec.status_kehadiran === 'Sakit') z += 1;
      else a += 1;
      return pdfStatusCell(rec.status_kehadiran);
    });
    const denom = Math.max(totalTaken, matkulList.filter((mk) =>
      sessions.some((s) => Number(s.pertemuan_ke || 1) === pNum && s.mata_kuliah === mk)
    ).length);
    const pct = denom > 0 ? Math.round((h / denom) * 100) : 0;

    return [
      { content: String(pNum), styles: { fontStyle: 'bold', halign: 'center' } },
      ...mkCells,
      h > 0 ? String(h) : '-',
      i > 0 ? String(i) : '-',
      z > 0 ? String(z) : '-',
      a > 0 ? String(a) : '-',
      { content: `${pct}%`, styles: { fontStyle: 'bold', halign: 'center' } },
    ];
  });

  return {
    head: [headRow0, headRow1],
    body,
    fontSize: matkulList.length > 4 ? 7.6 : 8.5,
    columnStyles: {
      0: { cellWidth: 64, halign: 'center' },
    },
  };
}

function buildPerStudentKasPdfConfig(studentId) {
  const MONTHS = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];
  const bills = state.iuranKas.filter((i) => i.user_id === studentId);
  if (!bills.length) {
    return {
      head: [['Bulan', 'Periode 1', 'Periode 2', 'Periode 3', 'Periode 4', 'Total Dibayar', 'Tunggakan', 'Status']],
      body: [['-', '-', '-', '-', '-', 'Rp 0', '-', '-']],
      fontSize: 8.8,
    };
  }

  const monthMap = new Map();
  bills.forEach((b) => {
    const per = String(b.periode || '').trim();
    const lower = per.toLowerCase();
    const monthIdx = MONTHS.findIndex((m) => lower.includes(m.toLowerCase()));
    const monthLabel = monthIdx >= 0 ? MONTHS[monthIdx] : 'Lainnya';
    const yearMatch = per.match(/(20\d{2})/);
    const yearNum = yearMatch ? Number(yearMatch[1]) : 9999;
    const slotMatch = per.match(/(?:minggu|pekan|m|ke[- ]?)\s*(\d+)/i) || per.match(/^(\d+)/);
    const slotOrder = slotMatch ? Number(slotMatch[1]) : 99;
    if (!monthMap.has(monthLabel)) {
      monthMap.set(monthLabel, { monthLabel, yearNum, monthIdx: monthIdx >= 0 ? monthIdx : 99, items: [] });
    }
    monthMap.get(monthLabel).items.push({ bill: b, slotOrder });
  });

  const groups = Array.from(monthMap.values()).sort(
    (a, b) => a.yearNum - b.yearNum || a.monthIdx - b.monthIdx
  );

  const body = groups.map((g) => {
    const sorted = [...g.items].sort((a, b) => a.slotOrder - b.slotOrder);
    const slots = [sorted[0]?.bill, sorted[1]?.bill, sorted[2]?.bill, sorted[3]?.bill];
    const paidSum = g.items.reduce((s, x) => s + Number(x.bill.nominal_dibayar || 0), 0);
    const tagihanSum = g.items.reduce((s, x) => s + Number(x.bill.nominal_tagihan || 0), 0);
    const tunggakanSum = Math.max(0, tagihanSum - paidSum);
    const isLunas = tunggakanSum === 0 && g.items.every((x) => x.bill.status === 'Lunas');

    return [
      { content: g.monthLabel, styles: { fontStyle: 'bold', halign: 'center' } },
      ...slots.map((b) => (b && Number(b.nominal_dibayar || 0) > 0 ? formatRupiah(b.nominal_dibayar) : '-')),
      { content: formatRupiah(paidSum), styles: { fontStyle: 'bold', halign: 'center' } },
      tunggakanSum > 0 ? formatRupiah(tunggakanSum) : '-',
      pdfStatusCell(isLunas ? 'Lunas' : 'Blm Lunas'),
    ];
  });

  return {
    head: [['Bulan', 'Periode 1', 'Periode 2', 'Periode 3', 'Periode 4', 'Total Dibayar', 'Tunggakan', 'Status']],
    body,
    fontSize: 8.8,
  };
}

function drawPdfCatatanEvaluasi(doc, startY, noteLines = []) {
  const customNote = (
    document.getElementById('pdf-catatan-evaluasi')?.value ||
    state.filters.pdfEvaluationNote ||
    ''
  ).trim();

  const linesToRender = [];
  (noteLines || []).forEach((item) => {
    if (item && String(item).trim()) linesToRender.push(`- ${String(item).trim()}`);
  });
  if (customNote) {
    linesToRender.push(`- Catatan Tambahan Pengurus: ${customNote}`);
  }
  if (!linesToRender.length) return startY;

  const boxX = 40;
  const boxW = doc.pageWidth - 80;
  const textMaxW = boxW - 28;
  const wrappedLines = [];
  linesToRender.forEach((raw) => {
    doc.splitTextToSize(raw, textMaxW, 8.8, 'normal').forEach((wl) => wrappedLines.push(wl));
  });

  const lineH = 12.2;
  const boxH = 26 + wrappedLines.length * lineH + 10;
  let y = startY + 14;
  if (y + boxH > doc.pageHeight - 52) {
    doc.addPage();
    y = 48;
  }

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(148, 163, 184);
  doc.setLineWidth(0.6);
  doc.rect(boxX, y, boxW, boxH, 'FD');

  doc.setFillColor(22, 58, 120);
  doc.rect(boxX, y, 4, boxH, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.8);
  doc.setTextColor(22, 58, 120);
  doc.text('Catatan & Evaluasi Singkat', boxX + 12, y + 16);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.8);
  doc.setTextColor(30, 41, 59);
  wrappedLines.forEach((lineStr, idx) => {
    doc.text(lineStr, boxX + 12, y + 31 + idx * lineH);
  });

  return y + boxH;
}

function buildAutoPdfEvaluationNotes(reportType, ctx = {}) {
  const students = state.profiles.filter((p) => isStudentRole(p.role));
  const kasMembers = state.profiles.filter((p) => isKasMemberRole(p.role));
  if (reportType === 'kas_bulanan') {
    const lunasCount = kasMembers.filter((m) => getStudentKasStats(m.id).isLunas).length;
    const totalPiutang = kasMembers.reduce((s, m) => s + getStudentKasStats(m.id).tunggakan, 0);
    const totalMasuk = state.transaksiKas
      .filter((t) => t.jenis === 'Pemasukan' && (!ctx.monthVal || (t.tanggal || '').startsWith(ctx.monthVal)))
      .reduce((s, t) => s + Number(t.nominal || 0), 0);
    const totalKeluar = state.transaksiKas
      .filter((t) => t.jenis === 'Pengeluaran' && (!ctx.monthVal || (t.tanggal || '').startsWith(ctx.monthVal)))
      .reduce((s, t) => s + Number(t.nominal || 0), 0);
    const saldoNet = totalMasuk - totalKeluar;
    return [
      `Periode ${ctx.monthLabel}: Pemasukan tercatat ${formatRupiah(totalMasuk)}, Pengeluaran ${formatRupiah(totalKeluar)}, selisih kas bulan ini ${formatRupiah(saldoNet)}.`,
      `Evaluasi Kepatuhan Kas: ${lunasCount} dari ${kasMembers.length} anggota kas berstatus Lunas; total tunggakan berjalan ${formatRupiah(totalPiutang)}.`,
      totalPiutang > 0
        ? 'Tindak Lanjut: Bendahara disarankan mengirim pengingat WhatsApp berkala kepada mahasiswa yang masih memiliki tunggakan.'
        : 'Evaluasi Baik: Seluruh tagihan kas mahasiswa telah terbayar lunas pada periode berjalan.',
    ];
  }
  if (reportType === 'absensi_bulanan') {
    const sessions = ctx.sessions || [];
    const sesiIds = new Set(sessions.map((s) => s.id));
    const recs = state.absensi.filter((a) => sesiIds.has(a.sesi_id));
    const hadir = recs.filter((a) => a.status_kehadiran === 'Hadir').length;
    const alpha = recs.filter((a) => a.status_kehadiran === 'Alpha' || a.status_kehadiran === 'Belum Absen!').length;
    const pending = recs.filter((a) => a.status_verifikasi === 'Menunggu').length;
    const denom = Math.max(1, students.length * sessions.length);
    const pct = sessions.length > 0 && students.length > 0 ? Math.round((hadir / denom) * 100) : 0;
    return [
      `Rekap ${ctx.monthLabel}: Terlaksana ${sessions.length} sesi perkuliahan dengan rata-rata tingkat kehadiran kelas ${pct}% (${hadir} catatan Hadir).`,
      `Evaluasi Kedisiplinan: Tercatat ${alpha} Alpha/Belum Absen dan ${pending} kiriman absensi menunggu verifikasi Ketua/Admin.`,
      pending > 0 || alpha > 0
        ? 'Tindak Lanjut: Mohon segera selesaikan verifikasi antrean kehadiran serta pembinaan bagi mahasiswa yang melewati batas sesi.'
        : 'Evaluasi Baik: Seluruh presensi pada periode ini telah terverifikasi dengan tingkat kedisiplinan optimal.',
    ];
  }
  if (reportType === 'keseluruhan') {
    const sessions = ctx.sessions || [];
    const sesiIds = new Set(sessions.map((s) => s.id));
    const recs = state.absensi.filter((a) => sesiIds.has(a.sesi_id));
    const hadir = recs.filter((a) => a.status_kehadiran === 'Hadir').length;
    const denom = Math.max(1, students.length * sessions.length);
    const pctHadir = sessions.length > 0 && students.length > 0 ? Math.round((hadir / denom) * 100) : 0;
    const lunasCount = kasMembers.filter((m) => getStudentKasStats(m.id).isLunas).length;
    const totalPiutang = kasMembers.reduce((s, m) => s + getStudentKasStats(m.id).tunggakan, 0);
    const totalMasuk = state.transaksiKas
      .filter((t) => t.jenis === 'Pemasukan' && (!ctx.monthVal || (t.tanggal || '').startsWith(ctx.monthVal)))
      .reduce((s, t) => s + Number(t.nominal || 0), 0);
    const totalKeluar = state.transaksiKas
      .filter((t) => t.jenis === 'Pengeluaran' && (!ctx.monthVal || (t.tanggal || '').startsWith(ctx.monthVal)))
      .reduce((s, t) => s + Number(t.nominal || 0), 0);
    return [
      `Ringkasan Akademik (${ctx.monthLabel}): ${sessions.length} sesi kuliah terlaksana dengan rata-rata kehadiran kelas sebesar ${pctHadir}%.`,
      `Ringkasan Keuangan: Pemasukan bulan ini ${formatRupiah(totalMasuk)}, Pengeluaran ${formatRupiah(totalKeluar)}; ${lunasCount}/${students.length} mahasiswa berstatus kas Lunas (sisa piutang ${formatRupiah(totalPiutang)}).`,
      'Evaluasi Terpadu: Pengurus diharapkan menjaga konsistensi validasi kehadiran kamera+GPS dan ketertiban iuran kas kelas.',
    ];
  }
  if (reportType === 'per_mahasiswa' && ctx.student) {
    const st = getStudentAttendanceStats(ctx.student.id);
    const ks = getStudentKasStats(ctx.student.id);
    const kasNote = `Evaluasi Kas: Total dibayar ${formatRupiah(ks.sudahBayar)}, sisa tunggakan ${formatRupiah(ks.tunggakan)} (${ks.isLunas ? 'Lunas' : 'Belum Lunas'}).`;
    if (ctx.excludeAbsensi) {
      return [
        kasNote,
        ks.isLunas
          ? 'Catatan Singkat: Seluruh tagihan kas mahasiswa telah terbayar lunas tanpa tunggakan.'
          : 'Catatan Singkat: Masih terdapat sisa tunggakan iuran kas yang perlu segera diselesaikan.',
      ];
    }
    const absNote = `Evaluasi Kehadiran: ${ctx.student.nama_lengkap} memiliki tingkat kehadiran ${st.pct}% (${st.hadir} Hadir, ${st.izin} Izin, ${st.sakit} Sakit, ${st.alpha} Alpha/Belum Absen).`;
    if (ctx.excludeKas) {
      return [
        absNote,
        st.pct >= 75
          ? 'Catatan Singkat: Kehadiran memenuhi syarat minimal perkuliahan (>=75%), pertahankan konsistensi.'
          : 'Catatan Singkat: Persentase kehadiran di bawah 75%, mohon tingkatkan kehadiran pada pertemuan berikutnya.',
      ];
    }
    return [
      absNote,
      kasNote,
      st.pct >= 75 && ks.isLunas
        ? 'Kesimpulan: Performa akademik dan administrasi kas mahasiswa berstatus Sangat Baik.'
        : 'Kesimpulan: Perlu perhatian pada peningkatan persentase kehadiran dan/atau penyelesaian tunggakan kas.',
    ];
  }
  return [];
}

function buildMutasiKasMonthlyPdfRows(monthVal, monthLabel) {
  const profileMap = Object.fromEntries(state.profiles.map((p) => [p.id, p]));
  const rows = state.transaksiKas.filter((t) => (t.tanggal || '').startsWith(monthVal));
  if (rows.length === 0) {
    return [
      [
        '-',
        '-',
        '-',
        '-',
        {
          content: `Belum ada mutasi transaksi kas pada bulan ${monthLabel}`,
          styles: { halign: 'left', fontStyle: 'italic' },
        },
        '-',
        'Rp 0',
      ],
    ];
  }
  return rows.map((t, idx) => [
    String(idx + 1),
    formatDateDdMmYyyy(t.tanggal),
    t.jenis,
    t.kategori,
    {
      content: `${t.keterangan}${t.pengirim_nama ? ` (Pengirim: ${t.pengirim_nama})` : ''}`,
      styles: { halign: 'left' },
    },
    t.pj_nama ||
      (t.jenis === 'Pemasukan' && !t.pj_id
        ? '- (Dari Mahasiswa Sendiri)'
        : profileMap[t.dicatat_oleh]?.nama_lengkap || '-'),
    {
      content: `${t.jenis === 'Pemasukan' ? '+' : '-'}${formatRupiah(t.nominal)}`,
      styles: {
        fontStyle: 'bold',
        textColor: t.jenis === 'Pemasukan' ? [22, 163, 74] : [220, 38, 38],
        halign: 'right',
      },
    },
  ]);
}

function bindLaporanPdfEvents() {
  document.getElementById('pdf-month-input')?.addEventListener('change', (e) => {
    state.filters.pdfMonth = e.target.value;
    renderActiveTab();
  });
  document.getElementById('pdf-student-select')?.addEventListener('change', (e) => {
    state.filters.pdfStudentId = e.target.value;
  });
  document.getElementById('pdf-catatan-evaluasi')?.addEventListener('input', (e) => {
    state.filters.pdfEvaluationNote = e.target.value;
  });

  const tableCommonStyle = {
    cellPadding: 5,
    textColor: [15, 23, 42],
    lineColor: [30, 41, 59],
    lineWidth: 0.55,
  };
  const headCommonStyle = {
    fillColor: [22, 58, 120],
    textColor: [255, 255, 255],
    fontStyle: 'bold',
    halign: 'center',
    lineColor: [30, 41, 59],
  };
  const subHeadCommonStyle = {
    fillColor: [29, 78, 216],
    textColor: [255, 255, 255],
    fontStyle: 'bold',
    halign: 'center',
  };

  // 1. PDF Kas Keseluruhan (Periode Kas Keseluruhan + Total Uang + Mutasi Bulanan)
  document.getElementById('btn-pdf-kas-bulanan')?.addEventListener('click', async () => {
    const adminStamp = await loadAdminStampJpegAsset();
    const now = new Date();
    const monthVal = document.getElementById('pdf-month-input').value;
    const monthLabel = formatIndonesianMonthYear(monthVal);
    const sig = getResolvedPdfSignatories();
    const kasPeriodCfg = buildKasPeriodPdfConfig();
    const totalUangCfg = buildTotalUangKeseluruhanPdfConfig();
    const mutasiMonthRows = state.transaksiKas.filter((t) => (t.tanggal || '').startsWith(monthVal));
    const mutasiBody = buildMutasiKasMonthlyPdfRows(monthVal, monthLabel);
    const saldoUmum = getGlobalKasSaldo();

    const { doc, startY } = createCleanReportPdfDoc(
      'Laporan Rekapitulasi Kas Bulanan',
      `Periode ${monthLabel}`,
      now,
      {
        periodeLabel: monthLabel,
        extraRows: [
          {
            label: 'Jumlah Transaksi Bulan Ini',
            value: `${mutasiMonthRows.length} Transaksi (Saldo Umum: ${formatRupiah(saldoUmum)})`,
          },
        ],
      }
    );

    const sec1Y = drawPdfSectionHeading(
      doc,
      'Tabel Uang Kas Per Periode Keseluruhan Mahasiswa',
      startY,
      'Rincian Iuran Kas Per Bulan & Minggu'
    );
    doc.autoTable({
      startY: sec1Y,
      margin: { left: 40, right: 40 },
      head: kasPeriodCfg.head,
      body: kasPeriodCfg.body,
      styles: { ...tableCommonStyle, fontSize: kasPeriodCfg.fontSize },
      headStyles: headCommonStyle,
      subHeadStyles: subHeadCommonStyle,
      columnStyles: kasPeriodCfg.columnStyles || {},
    });

    const sec2Y = drawPdfSectionHeading(
      doc,
      'Tabel Total Uang Keseluruhan Mahasiswa',
      doc.lastAutoTable.finalY + 24,
      'Rekapitulasi Pembayaran Kas'
    );
    doc.autoTable({
      startY: sec2Y,
      margin: { left: 40, right: 40 },
      head: totalUangCfg.head,
      body: totalUangCfg.body,
      styles: { ...tableCommonStyle, fontSize: totalUangCfg.fontSize },
      headStyles: headCommonStyle,
      columnStyles: totalUangCfg.columnStyles || {},
    });

    const sec3Y = drawPdfSectionHeading(
      doc,
      'Tabel Rekapitulasi Mutasi Kas',
      doc.lastAutoTable.finalY + 22,
      `Mutasi Kas Bulan ${monthLabel}`
    );
    doc.autoTable({
      startY: sec3Y,
      margin: { left: 40, right: 40 },
      head: [['No', 'Tanggal', 'Jenis', 'Kategori', 'Keterangan / Pengirim', 'PJ Pencatat', 'Nominal']],
      body: mutasiBody,
      styles: { ...tableCommonStyle, fontSize: 8 },
      headStyles: headCommonStyle,
      columnStyles: { 0: { cellWidth: 28, halign: 'center' } },
    });

    const evalKasY = drawPdfCatatanEvaluasi(
      doc,
      doc.lastAutoTable.finalY,
      buildAutoPdfEvaluationNotes('kas_bulanan', { monthLabel, monthVal })
    );

    drawPdfLembarPengesahan(
      doc,
      [
        { roleLabel: 'Dibuat Oleh,', name: sig.bendahara.nama, title: sig.bendahara.jabatan },
        { roleLabel: 'Mengetahui / Disetujui Oleh,', name: sig.admin.nama, title: sig.admin.jabatan, showAdminLogo: true },
      ],
      evalKasY,
      now,
      adminStamp
    );

    finalizePdfPages(doc, `Laporan Rekapitulasi Kas Bulanan (${monthLabel})`);
    doc.save(`Kas_Keseluruhan_Mahasiswa_R3S_${monthVal}.pdf`);
    showToast(`Laporan Kas Keseluruhan ${monthLabel} (PDF) berhasil diunduh!`, 'success');
  });

  // 2. PDF Absensi Bulanan — Keseluruhan Mahasiswa
  document.getElementById('btn-pdf-absensi-bulanan')?.addEventListener('click', async () => {
    const adminStamp = await loadAdminStampJpegAsset();
    const now = new Date();
    const monthVal = document.getElementById('pdf-month-input').value;
    const monthLabel = formatIndonesianMonthYear(monthVal);
    const sig = getResolvedPdfSignatories();

    const monthSessions = state.sesiAbsensi.filter((s) =>
      (s.tanggal || getWibDateKey(new Date(s.created_at))).startsWith(monthVal)
    );
    const targetSessions = monthSessions.length > 0 ? monthSessions : state.sesiAbsensi;
    const absenCfg = buildAbsensiKeseluruhanPdfConfig(targetSessions);
    const sesiIds = new Set(targetSessions.map((s) => s.id));
    const totalCatatanAbsen = state.absensi.filter((a) => sesiIds.has(a.sesi_id)).length;

    const { doc, startY } = createCleanReportPdfDoc(
      'Laporan Rekapitulasi Absensi Bulanan',
      `Periode ${monthLabel}`,
      now,
      {
        periodeLabel: monthLabel,
        extraRows: [
          {
            label: 'Jumlah Sesi Bulan Ini',
            value: `${targetSessions.length} Sesi Kuliah (${totalCatatanAbsen} Catatan Kehadiran)`,
          },
        ],
      }
    );

    const absenHeadingY = drawPdfSectionHeading(
      doc,
      'Tabel Matriks Absensi Keseluruhan Mahasiswa',
      startY,
      `Periode ${monthLabel}`
    );

    doc.autoTable({
      startY: absenHeadingY,
      margin: { left: 40, right: 40 },
      head: absenCfg.head,
      body: absenCfg.body,
      styles: { ...tableCommonStyle, fontSize: absenCfg.fontSize || 8.4 },
      headStyles: headCommonStyle,
      subHeadStyles: subHeadCommonStyle,
      columnStyles: absenCfg.columnStyles || {},
    });

    const evalAbsenY = drawPdfCatatanEvaluasi(
      doc,
      doc.lastAutoTable.finalY,
      buildAutoPdfEvaluationNotes('absensi_bulanan', { monthLabel, sessions: targetSessions })
    );

    drawPdfLembarPengesahan(
      doc,
      [
        { roleLabel: 'Dibuat Oleh,', name: sig.ketua.nama, title: sig.ketua.jabatan },
        { roleLabel: 'Mengetahui / Disetujui Oleh,', name: sig.admin.nama, title: sig.admin.jabatan, showAdminLogo: true },
      ],
      evalAbsenY,
      now,
      adminStamp
    );

    finalizePdfPages(doc, `Laporan Rekapitulasi Absensi Bulanan (${monthLabel})`);
    doc.save(`Absensi_Keseluruhan_Mahasiswa_R3S_${monthVal}.pdf`);
    showToast(`Laporan Absensi Keseluruhan ${monthLabel} (PDF) berhasil diunduh!`, 'success');
  });

  // 3. PDF Keseluruhan Rekapan (Absensi + Kas Periode + Total Uang + Mutasi Kas Bulanan)
  document.getElementById('btn-pdf-keseluruhan')?.addEventListener('click', async () => {
    const adminStamp = await loadAdminStampJpegAsset();
    const now = new Date();
    const monthVal = document.getElementById('pdf-month-input').value;
    const monthLabel = formatIndonesianMonthYear(monthVal);
    const sig = getResolvedPdfSignatories();

    const monthSessions = state.sesiAbsensi.filter((s) =>
      (s.tanggal || getWibDateKey(new Date(s.created_at))).startsWith(monthVal)
    );
    const targetSessions = monthSessions.length > 0 ? monthSessions : state.sesiAbsensi;
    const absenCfg = buildAbsensiKeseluruhanPdfConfig(targetSessions);
    const kasPeriodCfg = buildKasPeriodPdfConfig();
    const totalUangCfg = buildTotalUangKeseluruhanPdfConfig();
    const mutasiMonthRows = state.transaksiKas.filter((t) => (t.tanggal || '').startsWith(monthVal));
    const mutasiBody = buildMutasiKasMonthlyPdfRows(monthVal, monthLabel);
    const saldoUmum = getGlobalKasSaldo();

    const { doc, startY } = createCleanReportPdfDoc(
      'Laporan Keseluruhan Rekapan Bulanan',
      `Periode ${monthLabel}`,
      now,
      {
        periodeLabel: monthLabel,
        extraRows: [
          {
            label: 'Jumlah Sesi & Transaksi',
            value: `${targetSessions.length} Sesi · ${mutasiMonthRows.length} Transaksi Kas (Saldo Umum: ${formatRupiah(saldoUmum)})`,
          },
        ],
      }
    );

    const absenSecY = drawPdfSectionHeading(
      doc,
      'Tabel Matriks Absensi Keseluruhan Mahasiswa',
      startY,
      `Periode ${monthLabel}`
    );

    doc.autoTable({
      startY: absenSecY,
      margin: { left: 40, right: 40 },
      head: absenCfg.head,
      body: absenCfg.body,
      styles: { ...tableCommonStyle, fontSize: absenCfg.fontSize || 8.4 },
      headStyles: headCommonStyle,
      subHeadStyles: subHeadCommonStyle,
      columnStyles: absenCfg.columnStyles || {},
    });

    const kasSecY = drawPdfSectionHeading(
      doc,
      'Tabel Uang Kas Per Periode Keseluruhan Mahasiswa',
      doc.lastAutoTable.finalY + 24,
      'Rincian Iuran Kas Per Bulan & Minggu'
    );
    doc.autoTable({
      startY: kasSecY,
      margin: { left: 40, right: 40 },
      head: kasPeriodCfg.head,
      body: kasPeriodCfg.body,
      styles: { ...tableCommonStyle, fontSize: kasPeriodCfg.fontSize },
      headStyles: headCommonStyle,
      subHeadStyles: subHeadCommonStyle,
      columnStyles: kasPeriodCfg.columnStyles || {},
    });

    const totalSecY = drawPdfSectionHeading(
      doc,
      'Tabel Total Uang Keseluruhan Mahasiswa',
      doc.lastAutoTable.finalY + 24,
      'Rekapitulasi Pembayaran Kas'
    );
    doc.autoTable({
      startY: totalSecY,
      margin: { left: 40, right: 40 },
      head: totalUangCfg.head,
      body: totalUangCfg.body,
      styles: { ...tableCommonStyle, fontSize: totalUangCfg.fontSize },
      headStyles: headCommonStyle,
      columnStyles: totalUangCfg.columnStyles || {},
    });

    const mutasiSecY = drawPdfSectionHeading(
      doc,
      'Tabel Rekapitulasi Mutasi Kas',
      doc.lastAutoTable.finalY + 22,
      `Mutasi Kas Bulan ${monthLabel}`
    );
    doc.autoTable({
      startY: mutasiSecY,
      margin: { left: 40, right: 40 },
      head: [['No', 'Tanggal', 'Jenis', 'Kategori', 'Keterangan / Pengirim', 'PJ Pencatat', 'Nominal']],
      body: mutasiBody,
      styles: { ...tableCommonStyle, fontSize: 8 },
      headStyles: headCommonStyle,
      columnStyles: { 0: { cellWidth: 28, halign: 'center' } },
    });

    const evalAllY = drawPdfCatatanEvaluasi(
      doc,
      doc.lastAutoTable.finalY,
      buildAutoPdfEvaluationNotes('keseluruhan', { monthLabel, monthVal, sessions: targetSessions })
    );

    drawPdfLembarPengesahan(
      doc,
      [
        { roleLabel: 'Dibuat Oleh,', name: sig.bendahara.nama, title: sig.bendahara.jabatan },
        { roleLabel: 'Mengetahui,', name: sig.ketua.nama, title: sig.ketua.jabatan },
        { roleLabel: 'Disetujui Oleh,', name: sig.admin.nama, title: sig.admin.jabatan, showAdminLogo: true },
      ],
      evalAllY,
      now,
      adminStamp
    );

    finalizePdfPages(doc, `Rekapan Keseluruhan Mahasiswa (${monthLabel})`);
    doc.save(`Rekapan_Keseluruhan_R3S_${monthVal}.pdf`);
    showToast('Laporan Keseluruhan Rekapan (PDF) berhasil diunduh!', 'success');
  });

  // 4. PDF Laporan Per Mahasiswa (Role-Isolated: Bendahara = Kas only, Ketua = Absensi only, Admin = Keduanya)
  document.getElementById('btn-pdf-per-mahasiswa')?.addEventListener('click', async () => {
    const adminStamp = await loadAdminStampJpegAsset();
    const now = new Date();
    const monthVal = document.getElementById('pdf-month-input').value;
    const monthLabel = formatIndonesianMonthYear(monthVal);
    const role = state.currentUser?.role || 'admin';
    const isKetuaOnly = role === 'ketua';
    const isBendaharaOnly = role === 'bendahara';

    const studentId = document.getElementById('pdf-student-select').value;
    const mhs = state.profiles.find((p) => p.id === studentId);
    if (!mhs) {
      showToast('Pilih mahasiswa terlebih dahulu.', 'warning');
      return;
    }
    const sig = getResolvedPdfSignatories();
    const absenMhsCfg = buildPerStudentAttendancePdfConfig(mhs.id);
    const kasMhsCfg = buildPerStudentKasPdfConfig(mhs.id);
    const stMhs = getStudentAttendanceStats(mhs.id);
    const ksMhs = getStudentKasStats(mhs.id);

    const docTitle = isBendaharaOnly
      ? 'Laporan Rekapitulasi Kas Per Mahasiswa'
      : isKetuaOnly
      ? 'Laporan Rekapitulasi Absensi Per Mahasiswa'
      : 'Laporan Rekapitulasi Per Mahasiswa';

    const statusSummaryValue = isBendaharaOnly
      ? `Terbayar ${formatRupiah(ksMhs.sudahBayar)} (Tunggakan: ${formatRupiah(ksMhs.tunggakan)})`
      : isKetuaOnly
      ? `Kehadiran ${stMhs.pct}% (${stMhs.hadir} Hadir dari ${stMhs.total} Catatan)`
      : `Hadir ${stMhs.pct}% · Kas Terbayar ${formatRupiah(ksMhs.sudahBayar)} (Tunggakan: ${formatRupiah(ksMhs.tunggakan)})`;

    const { doc, startY } = createCleanReportPdfDoc(
      docTitle,
      `Permahasiswa · ${mhs.nama_lengkap} (${mhs.npm})`,
      now,
      {
        periodeLabel: monthLabel,
        extraRows: [
          { label: 'Nama Mahasiswa', value: `${mhs.nama_lengkap} (NIM: ${mhs.npm})` },
          { label: 'Ringkasan Status', value: statusSummaryValue },
        ],
      }
    );

    if (isBendaharaOnly) {
      const kasOnlyY = drawPdfSectionHeading(
        doc,
        'Tabel Rekapitulasi Kas Per Mahasiswa',
        startY,
        `${mhs.nama_lengkap} (${mhs.npm})`
      );
      doc.autoTable({
        startY: kasOnlyY,
        margin: { left: 40, right: 40 },
        head: kasMhsCfg.head,
        body: kasMhsCfg.body,
        styles: { ...tableCommonStyle, fontSize: kasMhsCfg.fontSize },
        headStyles: headCommonStyle,
      });
    } else {
      const absenMhsY = drawPdfSectionHeading(
        doc,
        'Tabel Matriks Absensi Per Mahasiswa',
        startY,
        `${mhs.nama_lengkap} (${mhs.npm})`
      );
      doc.autoTable({
        startY: absenMhsY,
        margin: { left: 40, right: 40 },
        head: absenMhsCfg.head,
        body: absenMhsCfg.body,
        styles: { ...tableCommonStyle, fontSize: absenMhsCfg.fontSize },
        headStyles: headCommonStyle,
        subHeadStyles: subHeadCommonStyle,
        columnStyles: absenMhsCfg.columnStyles || {},
      });

      if (!isKetuaOnly) {
        const kasSecY = drawPdfSectionHeading(
          doc,
          'Tabel Rekapitulasi Kas Per Mahasiswa',
          doc.lastAutoTable.finalY + 24,
          `${mhs.nama_lengkap} (${mhs.npm})`
        );
        doc.autoTable({
          startY: kasSecY,
          margin: { left: 40, right: 40 },
          head: kasMhsCfg.head,
          body: kasMhsCfg.body,
          styles: { ...tableCommonStyle, fontSize: kasMhsCfg.fontSize },
          headStyles: headCommonStyle,
        });
      }
    }

    const evalMhsY = drawPdfCatatanEvaluasi(
      doc,
      doc.lastAutoTable.finalY,
      buildAutoPdfEvaluationNotes('per_mahasiswa', {
        student: mhs,
        excludeKas: isKetuaOnly,
        excludeAbsensi: isBendaharaOnly,
      })
    );

    drawPdfLembarPengesahan(
      doc,
      [
        isBendaharaOnly
          ? { roleLabel: 'Dibuat Oleh,', name: sig.bendahara.nama, title: sig.bendahara.jabatan }
          : { roleLabel: 'Dibuat Oleh,', name: sig.ketua.nama, title: sig.ketua.jabatan },
        { roleLabel: 'Mengetahui / Disetujui Oleh,', name: sig.admin.nama, title: sig.admin.jabatan, showAdminLogo: true },
      ],
      evalMhsY,
      now,
      adminStamp
    );

    finalizePdfPages(doc, `Laporan Permahasiswa — ${mhs.nama_lengkap} (${mhs.npm})`);
    doc.save(`Laporan_Permahasiswa_${mhs.npm}_${mhs.nama_lengkap.replace(/\s+/g, '_')}.pdf`);
    showToast(`Laporan PDF ${mhs.nama_lengkap} berhasil diunduh!`, 'success');
  });
}

function downloadCsvFromObjects(rows, filename) {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const csvLines = [
    headers.map((h) => `"${String(h).replace(/"/g, '""')}"`).join(','),
    ...rows.map((r) =>
      headers.map((h) => `"${String(r[h] ?? '').replace(/"/g, '""')}"`).join(',')
    ),
  ];
  const blob = new Blob([`\uFEFF${csvLines.join('\n')}`], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function renderMonitoringLaporanView() {
  const profileMap = Object.fromEntries(state.profiles.map((p) => [p.id, p]));
  const q = state.filters.laporanSearch.toLowerCase();
  const kat = state.filters.laporanKategori;

  const filtered = state.laporanKendala.filter((l) => {
    const pelapor = profileMap[l.user_id];
    const txt = `${pelapor?.nama_lengkap || ''} ${pelapor?.npm || ''} ${l.keterangan} ${l.kategori}`.toLowerCase();
    return (!q || txt.includes(q)) && (kat === 'Semua' || l.kategori === kat);
  });

  return `
    <div class="page-header">
      <div>
        <span class="meta-line">Tindak Lanjut Kendala Mahasiswa &amp; Permintaan Rekapan Excel</span>
        <h2>Monitoring Laporan Masuk</h2>
      </div>
    </div>

    <div class="card glass-panel">
      <div class="toolbar-filters">
        <input type="search" id="filter-laporan-search" placeholder="Cari nama pelapor atau isi laporan..." value="${escapeHtml(state.filters.laporanSearch)}" />
        <select id="filter-laporan-kategori">
          ${['Semua', 'Kendala Absensi', 'Permintaan Rekapan Excel', 'Kendala Pembayaran Kas', 'Bug / Teknis', 'Lainnya']
            .map((k) => `<option value="${k}" ${kat === k ? 'selected' : ''}>${k}</option>`)
            .join('')}
        </select>
      </div>

      <div class="table-wrap table-scroll-5-tall">
        <table>
          <thead>
            <tr>
              <th>Pelapor &amp; Kategori</th>
              <th>Keterangan &amp; Bukti</th>
              <th>Tanggapan Admin</th>
              <th>Status &amp; Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${
              filtered.length === 0
                ? '<tr><td colspan="4" class="text-center">Belum ada laporan masuk.</td></tr>'
                : filtered
                    .map((l) => {
                      const pelapor = profileMap[l.user_id];
                      return `
                        <tr>
                          <td>
                            <strong>${escapeHtml(pelapor?.nama_lengkap || '-')}</strong>
                            <div class="meta-line tabular-nums">${escapeHtml(pelapor?.npm || '-')} · ${escapeHtml(l.kategori)}</div>
                          </td>
                          <td>
                            <div>${escapeHtml(l.keterangan)}</div>
                            ${
                              l.bukti_url
                                ? `<button type="button" class="btn-link-inline btn-view-img" data-url="${escapeHtml(l.bukti_url)}" data-title="Lampiran Laporan">Lihat Lampiran</button>`
                                : ''
                            }
                          </td>
                          <td style="min-width:220px;">
                            <textarea class="laporan-reply-input" data-id="${l.id}" rows="2" placeholder="Tulis tanggapan Admin...">${escapeHtml(l.tanggapan_admin || '')}</textarea>
                          </td>
                          <td>
                            <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-start;">
                              <span class="status-tag ${getStatusTagClass(l.status)}">${escapeHtml(l.status)}</span>
                              <div class="row-actions">
                                <button type="button" class="btn btn-secondary btn-sm btn-save-tanggapan" data-id="${l.id}" data-user="${l.user_id}">Simpan Tanggapan</button>
                                <button type="button" class="btn btn-success-soft btn-sm btn-finish-laporan" data-id="${l.id}" data-user="${l.user_id}">Konfirmasi Selesai</button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      `;
                    })
                    .join('')
            }
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function bindMonitoringLaporanEvents() {
  bindImagePreviewButtons();

  document.getElementById('filter-laporan-search')?.addEventListener('input', (e) => {
    state.filters.laporanSearch = e.target.value;
    renderActiveTab();
    const el = document.getElementById('filter-laporan-search');
    if (el) {
      el.focus();
      el.setSelectionRange(el.value.length, el.value.length);
    }
  });
  document.getElementById('filter-laporan-kategori')?.addEventListener('change', (e) => {
    state.filters.laporanKategori = e.target.value;
    renderActiveTab();
  });

  document.querySelectorAll('.btn-save-tanggapan').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      const userId = btn.getAttribute('data-user');
      const reply = document.querySelector(`.laporan-reply-input[data-id="${id}"]`)?.value.trim() || '';
      const lap = state.laporanKendala.find((l) => l.id === id);
      try {
        // Menyimpan tanggapan menjaga status tetap "Menunggu" hingga dikonfirmasi Selesai
        await db.update('laporan_kendala', id, {
          tanggapan_admin: reply,
          status: 'Menunggu',
          ditanggapi_oleh: state.currentUser.id,
        });
        if (userId) {
          await emitNotifications([
            {
              user_id: userId,
              judul: 'Tanggapan Laporan Masuk',
              pesan: `Admin menanggapi laporan "${lap?.kategori || 'Kendala'}": "${reply}"`,
              tipe: 'info',
            },
          ]);
        }
        await db.loadAll();
        showToast('Tanggapan disimpan (Status tetap Menunggu sampai dikonfirmasi Selesai).', 'info');
        renderSidebarNav();
        renderActiveTab();
      } catch (err) {
        showToast(err.message || 'Gagal menyimpan tanggapan.', 'danger');
      }
    });
  });

  document.querySelectorAll('.btn-finish-laporan').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      const userId = btn.getAttribute('data-user');
      const reply = document.querySelector(`.laporan-reply-input[data-id="${id}"]`)?.value.trim() || 'Laporan telah ditindaklanjuti.';
      const lap = state.laporanKendala.find((l) => l.id === id);
      const pelapor = state.profiles.find((p) => p.id === userId);
      try {
        await db.update('laporan_kendala', id, {
          tanggapan_admin: reply,
          status: 'Selesai',
          ditanggapi_oleh: state.currentUser.id,
        });
        const notifItems = [
          {
            user_id: userId,
            judul: 'Laporan Kendala Selesai',
            pesan: `Laporan "${lap?.kategori || 'Kendala'}" Anda telah dikonfirmasi Selesai oleh ${state.currentUser.nama_lengkap}: "${reply}"`,
            tipe: 'success',
          },
        ];
        getUserIdsByRoles(['admin']).forEach((adminId) => {
          notifItems.push({
            user_id: adminId,
            judul: 'Laporan Masuk Telah Diselesaikan',
            pesan: `Laporan "${lap?.kategori || 'Kendala'}" dari ${pelapor?.nama_lengkap || 'Anggota'} diselesaikan oleh ${state.currentUser.nama_lengkap}.`,
            tipe: 'success',
          });
        });
        await emitNotifications(notifItems);
        await db.loadAll();
        showToast('Laporan dikonfirmasi Selesai!', 'success');
        renderSidebarNav();
        renderActiveTab();
      } catch (err) {
        showToast(err.message || 'Gagal menyelesaikan laporan.', 'danger');
      }
    });
  });
}

function renderKelolaAkunView() {
  const cfg = state.pengaturan || {};
  const q = state.filters.akunSearch.toLowerCase();
  const ROLE_ORDER = { admin: 0, ketua: 1, bendahara: 2, pj_matkul: 3, mahasiswa: 4 };
  const filteredAccounts = [...state.profiles]
    .sort((a, b) => {
      const ra = ROLE_ORDER[a.role] ?? 9;
      const rb = ROLE_ORDER[b.role] ?? 9;
      if (ra !== rb) return ra - rb;
      return String(a.npm || '').localeCompare(String(b.npm || ''));
    })
    .filter((p) => {
      const t = `${p.npm} ${p.nama_lengkap} ${p.username} ${p.role} ${ROLE_LABELS[p.role] || ''}`.toLowerCase();
      return !q || t.includes(q);
    });

  return `
    <div class="page-header">
      <div>
        <span class="meta-line">Administrasi Akun 5 Peran (Termasuk Penanda PJ Mata Kuliah) &amp; Pengaturan Kelas R3S</span>
        <h2>Kelola Akun &amp; Rekening Kelas</h2>
      </div>
    </div>

    <div class="grid-2">
      <!-- Form Buat Akun Baru -->
      <div class="card glass-panel">
        <div class="card-header">
          <div>
            <h3>Buat Akun Anggota Baru</h3>
            <span class="meta-line">Nama pengguna dan kata sandi awal dibuat oleh Admin</span>
          </div>
        </div>
        <form id="form-buat-akun">
          <div class="grid-2" style="margin-bottom:0;">
            <div class="field-group">
              <label for="akun-npm">NPM</label>
              <input type="text" id="akun-npm" placeholder="202443500104" required class="tabular-nums" />
            </div>
            <div class="field-group">
              <label for="akun-role">Peran Akun</label>
              <select id="akun-role" required>
                <option value="mahasiswa">Mahasiswa</option>
                <option value="pj_matkul">PJ Mata Kuliah (Penanda PJ Matkul)</option>
                <option value="ketua">Ketua Kelas</option>
                <option value="bendahara">Bendahara Kelas</option>
                <option value="admin">Admin Utama</option>
              </select>
            </div>
          </div>
          <div class="field-group">
            <label for="akun-nama">Nama Lengkap</label>
            <input type="text" id="akun-nama" placeholder="Masukkan nama lengkap anggota" required />
          </div>
          <div class="grid-2" style="margin-bottom:0;">
            <div class="field-group">
              <label for="akun-username">Nama Pengguna</label>
              <input type="text" id="akun-username" placeholder="nama_pengguna_r3s" required />
            </div>
            <div class="field-group">
              <label for="akun-password">Kata Sandi (Maks. 8 karakter, 1 angka, 1 simbol)</label>
              <input type="text" id="akun-password" maxlength="8" placeholder="R3s!2026" required />
            </div>
          </div>
          <div class="field-group">
            <label for="akun-nowa">Nomor WhatsApp (628...)</label>
            <input type="text" id="akun-nowa" placeholder="6281234567890" />
          </div>
          <button type="submit" class="btn btn-primary btn-block">Tambah Akun ke Sistem</button>
        </form>
      </div>

      <!-- Pengaturan Rekening & Progres Semester -->
      <div class="card glass-panel">
        <div class="card-header">
          <div>
            <h3>Pengaturan Rekening &amp; Progres Semester</h3>
            <span class="meta-line">Sinkron ke Dashboard Mahasiswa &amp; Jendela Pembayaran Kas</span>
          </div>
        </div>
        <form id="form-pengaturan-kelas">
          <div class="grid-3" style="margin-bottom:0;">
            <div class="field-group">
              <label for="set-semester">Semester</label>
              <input type="number" id="set-semester" min="1" max="14" value="${cfg.semester_aktif || 3}" required />
            </div>
            <div class="field-group">
              <label for="set-berjalan">Pertemuan Berjalan</label>
              <input type="number" id="set-berjalan" min="0" value="${Number(cfg.pertemuan_berjalan ?? 0)}" required />
            </div>
            <div class="field-group">
              <label for="set-total">Total Pertemuan</label>
              <input type="number" id="set-total" min="1" value="${cfg.total_pertemuan_semester || 14}" required />
            </div>
          </div>
          <div class="grid-2" style="margin-bottom:0;">
            <div class="field-group">
              <label for="set-bank">Bank / Dompet Digital</label>
              <input type="text" id="set-bank" value="${escapeHtml(cfg.nama_bank || '')}" required />
            </div>
            <div class="field-group">
              <label for="set-norek">No. Rekening</label>
              <input type="text" id="set-norek" value="${escapeHtml(cfg.no_rekening || '')}" required class="tabular-nums" />
            </div>
          </div>
          <div class="field-group">
            <label for="set-atasnama">Atas Nama Rekening</label>
            <input type="text" id="set-atasnama" value="${escapeHtml(cfg.atas_nama_rekening || '')}" required />
          </div>
          <div class="grid-2" style="margin-bottom:0;">
            <div class="field-group">
              <label for="set-qris-merchant">Nama Toko QRIS</label>
              <input type="text" id="set-qris-merchant" value="${escapeHtml(cfg.qris_merchant_name || 'Mas_hy, Fashion')}" required />
            </div>
            <div class="field-group">
              <label for="set-nmid">NMID QRIS</label>
              <input type="text" id="set-nmid" value="${escapeHtml(cfg.qris_nmid || 'ID1025463553806')}" required class="tabular-nums" />
            </div>
          </div>
          <div class="field-group">
            <label for="set-qris-payload">Kode QRIS Statis / Data Dasar (Otomatis Dikonversi ke QRIS Dinamis)</label>
            <textarea id="set-qris-payload" rows="2" class="tabular-nums" required>${escapeHtml(cfg.qris_payload || DEFAULT_QRIS_PAYLOAD)}</textarea>
          </div>
          <div class="field-group">
            <label for="set-nominal">Nominal Kas Standar (Rp)</label>
            <input type="number" id="set-nominal" min="2000" value="${cfg.nominal_kas_default || 10000}" required class="tabular-nums" />
          </div>
          <button type="submit" class="btn btn-secondary btn-block">Simpan Pengaturan Kelas</button>
        </form>
      </div>
    </div>

    <!-- Daftar Seluruh Nama Pengguna & Kata Sandi Anggota (Tersinkron Otomatis) -->
    <div class="card glass-panel">
      <div class="card-header">
        <div>
          <h3>Daftar Akun, Nama Pengguna &amp; Kata Sandi Anggota</h3>
          <span class="meta-line">Otomatis diperbarui ketika mahasiswa mengubah nama pengguna atau kata sandi melalui menu Profil atau Lupa Kata Sandi</span>
        </div>
        <div class="row-actions">
          <span class="meta-line tabular-nums">${filteredAccounts.length} akun</span>
        </div>
      </div>

      <div class="toolbar-filters">
        <input type="search" id="filter-akun-search" placeholder="Cari NPM, nama, nama pengguna, atau peran..." value="${escapeHtml(state.filters.akunSearch)}" />
      </div>

      <div class="table-wrap table-scroll-5-accounts">
        <table>
          <thead>
            <tr>
              <th>NPM</th>
              <th>Nama Lengkap</th>
              <th>Peran</th>
              <th>Nama Pengguna</th>
              <th>Kata Sandi Tersinkron</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${filteredAccounts
              .map(
                (p) => `
              <tr>
                <td class="tabular-nums">${escapeHtml(p.npm)}</td>
                <td><strong>${escapeHtml(p.nama_lengkap)}</strong></td>
                <td><span class="status-tag ${getRoleTagClass(p.role)}">${escapeHtml(ROLE_LABELS[p.role] || p.role)}</span></td>
                <td class="tabular-nums">${escapeHtml(p.username)}</td>
                <td class="tabular-nums">${escapeHtml(p.password)}</td>
                <td>
                  <div class="row-actions" style="flex-wrap:wrap;">
                    ${
                      p.id !== state.currentUser.id && p.role !== 'admin'
                        ? `<select
                            class="select-change-role"
                            data-id="${p.id}"
                            data-nama="${escapeHtml(p.nama_lengkap)}"
                            data-prev-role="${escapeHtml(p.role)}"
                            aria-label="Ubah role ${escapeHtml(p.nama_lengkap)}"
                          >
                            <option value="mahasiswa" ${p.role === 'mahasiswa' ? 'selected' : ''}>Mahasiswa Biasa</option>
                            <option value="pj_matkul" ${p.role === 'pj_matkul' ? 'selected' : ''}>PJ Mata Kuliah</option>
                            <option value="ketua" ${p.role === 'ketua' ? 'selected' : ''}>Ketua Kelas</option>
                            <option value="bendahara" ${p.role === 'bendahara' ? 'selected' : ''}>Bendahara Kelas</option>
                          </select>`
                        : ''
                    }
                    ${
                      p.id === state.currentUser.id
                        ? '<span class="meta-line">Akun Aktif</span>'
                        : `<button type="button" class="btn btn-danger-soft btn-sm btn-delete-akun" data-id="${p.id}" data-nama="${escapeHtml(p.nama_lengkap)}">Hapus</button>`
                    }
                  </div>
                </td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function bindKelolaAkunEvents() {
  document.getElementById('filter-akun-search')?.addEventListener('input', (e) => {
    state.filters.akunSearch = e.target.value;
    renderActiveTab();
    const el = document.getElementById('filter-akun-search');
    if (el) {
      el.focus();
      el.setSelectionRange(el.value.length, el.value.length);
    }
  });

  document.getElementById('form-buat-akun')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const npm = document.getElementById('akun-npm').value.trim();
    const nama_lengkap = document.getElementById('akun-nama').value.trim();
    const username = document.getElementById('akun-username').value.trim();
    const password = document.getElementById('akun-password').value;
    const role = document.getElementById('akun-role').value;
    const no_wa = document.getElementById('akun-nowa').value.trim();

    const check = validatePasswordRule(password);
    if (!check.valid) {
      showToast('Password wajib maks 8 karakter, min 1 angka, dan min 1 simbol.', 'danger');
      return;
    }

    const dup = state.profiles.find(
      (p) => p.username.toLowerCase() === username.toLowerCase() || p.npm === npm
    );
    if (dup) {
      showToast('NPM atau Username sudah terdaftar.', 'danger');
      return;
    }

    try {
      await db.insert('profiles', { npm, nama_lengkap, username, password, role, no_wa, avatar_url: '' });
      await db.loadAll();
      showToast(`Akun ${nama_lengkap} (${ROLE_LABELS[role]}) berhasil dibuat!`, 'success');
      renderActiveTab();
    } catch (err) {
      showToast(err.message || 'Gagal membuat akun baru.', 'danger');
    }
  });

  document.getElementById('form-pengaturan-kelas')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const rawQris = document.getElementById('set-qris-payload')?.value.trim() || DEFAULT_QRIS_PAYLOAD;
    const meta = extractQrisMetadata(rawQris);
    const merchantInput = document.getElementById('set-qris-merchant')?.value.trim() || '';
    const nmidInput = document.getElementById('set-nmid')?.value.trim() || '';
    try {
      await db.update('pengaturan_kelas', 1, {
        semester_aktif: Number(document.getElementById('set-semester').value),
        pertemuan_berjalan: Number(document.getElementById('set-berjalan').value),
        total_pertemuan_semester: Number(document.getElementById('set-total').value),
        nama_bank: document.getElementById('set-bank').value.trim(),
        no_rekening: document.getElementById('set-norek').value.trim(),
        atas_nama_rekening: document.getElementById('set-atasnama').value.trim(),
        qris_merchant_name: merchantInput || meta.merchantName || 'Mas_hy, Fashion',
        qris_nmid: nmidInput || meta.nmid || 'ID1025463553806',
        qris_payload: rawQris,
        nominal_kas_default: Number(document.getElementById('set-nominal').value),
      });
      await db.loadAll();
      showToast('Pengaturan kelas, rekening & QRIS Dinamis berhasil disimpan!', 'success');
      renderActiveTab();
    } catch (err) {
      showToast(err.message || 'Gagal menyimpan pengaturan kelas.', 'danger');
    }
  });

  document.querySelectorAll('.select-change-role').forEach((sel) => {
    sel.addEventListener('change', async () => {
      const id = sel.getAttribute('data-id');
      const nama = sel.getAttribute('data-nama') || 'Anggota';
      const prevRole = sel.getAttribute('data-prev-role') || 'mahasiswa';
      const nextRole = sel.value;
      const allowedRoles = new Set(['mahasiswa', 'pj_matkul', 'ketua', 'bendahara']);
      if (!allowedRoles.has(nextRole) || nextRole === prevRole) {
        sel.value = prevRole;
        return;
      }

      sel.disabled = true;
      try {
        await db.update('profiles', id, { role: nextRole });
        await emitNotifications([
          {
            user_id: id,
            judul: 'Perubahan Role Akun oleh Admin',
            pesan: `Role akun Anda diubah oleh ${state.currentUser.nama_lengkap} dari ${ROLE_LABELS[prevRole] || prevRole} menjadi ${ROLE_LABELS[nextRole] || nextRole}.`,
            tipe: 'info',
          },
        ]);
        await db.loadAll();
        showToast(
          `Role ${nama} berhasil diubah menjadi ${ROLE_LABELS[nextRole] || nextRole}!`,
          'success'
        );
        renderSidebarNav();
        renderActiveTab();
      } catch (err) {
        sel.value = prevRole;
        sel.disabled = false;
        showToast(err.message || 'Gagal mengubah role anggota.', 'danger');
      }
    });
  });

  document.querySelectorAll('.btn-delete-akun').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      const nama = btn.getAttribute('data-nama');
      try {
        await db.remove('profiles', id);
        await db.loadAll();
        showToast(`Akun ${nama} berhasil dihapus.`, 'info');
        renderActiveTab();
      } catch (err) {
        showToast(err.message || 'Gagal menghapus akun.', 'danger');
      }
    });
  });
}

// ----------------------------------------------------------------------------
// 16. HELPER MODAL GLOBAL & EVENT LISTENER BOOTSTRAP
// ----------------------------------------------------------------------------
function closeModal(modalId) {
  const m = document.getElementById(modalId);
  if (!m) return;
  m.classList.add('hidden');
  if (modalId === 'modal-camera') {
    stopCameraStream();
  }
  if (modalId === 'modal-pay-kas') {
    clearInterval(state.qrisTimerInterval);
  }
}

function bindImagePreviewButtons() {
  document.querySelectorAll('.btn-view-img').forEach((btn) => {
    btn.addEventListener('click', () => {
      const url = btn.getAttribute('data-url');
      const title = btn.getAttribute('data-title') || 'Lampiran Gambar';
      document.getElementById('modal-image-title').textContent = title;
      document.getElementById('modal-image-meta').textContent = 'Pratinjau dokumen / bukti kelas R3S';
      document.getElementById('modal-image-src').src = url;
      document.getElementById('modal-image-preview').classList.remove('hidden');
    });
  });
}

const THEME_ICON_SUN =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>';

const THEME_ICON_MOON =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>';

function applyTheme(theme) {
  const normalized = theme === 'light' ? 'light' : 'dark';
  state.theme = normalized;
  document.documentElement.setAttribute('data-theme', normalized);
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, normalized);
  } catch {
    // Abaikan jika storage penuh / dibatasi
  }

  const isDark = normalized === 'dark';
  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
    const iconEl = btn.querySelector('.theme-toggle-icon');
    const labelEl = btn.querySelector('.theme-toggle-label');
    if (iconEl) iconEl.innerHTML = isDark ? THEME_ICON_SUN : THEME_ICON_MOON;
    if (labelEl) labelEl.textContent = isDark ? 'Tema Terang' : 'Tema Gelap';
    btn.setAttribute(
      'aria-label',
      isDark ? 'Aktifkan Tema Terang (Langit Cerah)' : 'Aktifkan Tema Gelap (Galaksi Malam)'
    );
    btn.setAttribute(
      'title',
      isDark ? 'Beralih ke Tema Terang' : 'Beralih ke Tema Gelap'
    );
  });
}

function initThemePreference() {
  let saved = 'dark';
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.THEME);
    if (raw === 'light' || raw === 'dark') {
      saved = raw;
    }
  } catch {
    saved = 'dark';
  }
  applyTheme(saved);
}

async function bootstrapApp() {
  initThemePreference();
  initSpaceBackdrop();
  initSupabaseConnection();
  startGlobalClocks();
  refreshCaptcha('login');
  loadRememberedCredentials();
  loadAdminStampJpegAsset();

  // Event Toggle Tema Terang / Gelap (Tersinkron Login & App Header)
  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const nextTheme = state.theme === 'light' ? 'dark' : 'light';
      applyTheme(nextTheme);
      showToast(
        nextTheme === 'light'
          ? 'Tema Terang (Langit Cerah) diaktifkan.'
          : 'Tema Gelap (Galaksi Malam) diaktifkan.',
        'info'
      );
    });
  });

  // Event Kontrol Simulasi / Live Langit Real-Time (Tersinkron Login & Index)
  document.querySelectorAll('[data-sky-hour]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-sky-hour');
      state.skyPreviewHour = val === 'live' ? null : Number(val);
      document.querySelectorAll('[data-sky-hour]').forEach((b) => {
        b.classList.toggle('active', b.getAttribute('data-sky-hour') === val);
      });
      updateCelestialLoginAnimation(new Date());
    });
  });

  // Event Auth & Captcha
  document.getElementById('login-form').addEventListener('submit', handleLoginSubmit);
  document.getElementById('btn-refresh-login-captcha').addEventListener('click', () => refreshCaptcha('login'));
  document.getElementById('btn-refresh-forgot-captcha').addEventListener('click', () => refreshCaptcha('forgot'));
  document.getElementById('btn-goto-forgot').addEventListener('click', () => toggleAuthView('forgot'));
  document.getElementById('btn-back-to-login').addEventListener('click', () => toggleAuthView('login'));
  document.getElementById('btn-verify-username').addEventListener('click', handleVerifyForgotUsername);
  document.getElementById('forgot-new-password').addEventListener('input', (e) => {
    updatePasswordRuleUI(e.target.value, '#forgot-pw-rules');
  });
  document.getElementById('forgot-form').addEventListener('submit', handleForgotSubmit);

  // Toggle Show/Hide Password
  document.querySelectorAll('.toggle-pw-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.getAttribute('data-target'));
      if (!target) return;
      const isPw = target.type === 'password';
      target.type = isPw ? 'text' : 'password';
      btn.textContent = isPw ? 'Tutup' : 'Lihat';
    });
  });

  // Topbar & Sidebar Controls
  document.getElementById('btn-mobile-menu').addEventListener('click', () => {
    document.getElementById('app-sidebar').classList.add('open');
    document.getElementById('sidebar-overlay').classList.remove('hidden');
  });
  document.getElementById('sidebar-overlay').addEventListener('click', closeMobileSidebar);
  document.getElementById('btn-logout').addEventListener('click', logoutApp);

  document.getElementById('btn-topbar-notif').addEventListener('click', () => {
    if (!state.currentUser) return;
    state.activeTab = 'pusat_info';
    renderSidebarNav();
    renderActiveTab();
  });

  document.getElementById('topbar-user-trigger').addEventListener('click', () => {
    if (!state.currentUser) return;
    state.activeTab = 'profil';
    renderSidebarNav();
    renderActiveTab();
  });

  // Modal Close Buttons
  document.querySelectorAll('[data-close-modal]').forEach((btn) => {
    btn.addEventListener('click', () => closeModal(btn.getAttribute('data-close-modal')));
  });

  // Modal Kamera & Bukti Daring Events
  document.getElementById('btn-capture-photo').addEventListener('click', captureWatermarkedPhoto);
  document.getElementById('btn-retake-photo').addEventListener('click', retakeWatermarkedPhoto);
  document.getElementById('btn-submit-attendance').addEventListener('click', submitCapturedAttendance);
  document.getElementById('btn-switch-camera')?.addEventListener('click', async () => {
    state.cameraFacingMode = state.cameraFacingMode === 'user' ? 'environment' : 'user';
    syncCameraOrientationUi();
    if (state.cameraMode === 'kamera' || state.daringUseCamera) {
      await initCameraAndGpsStreams({ needCamera: true });
    }
  });
  document.getElementById('btn-flip-camera')?.addEventListener('click', () => {
    state.cameraFlipHorizontal = !state.cameraFlipHorizontal;
    syncCameraOrientationUi();
  });
  document.getElementById('daring-bukti-file')?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (file) {
      state.daringUseCamera = false;
      syncCameraOrientationUi();
      if (state.cameraStream) {
        state.cameraStream.getTracks().forEach((t) => t.stop());
        state.cameraStream = null;
      }
      if (!state.gpsCoords) {
        initCameraAndGpsStreams({ needCamera: false });
      }
      processDaringImageFile(file);
    }
  });
  document.getElementById('daring-platform')?.addEventListener('change', () => {
    if (state.cameraMode === 'daring' && state.daringImageFile && !state.daringUseCamera) {
      processDaringImageFile(state.daringImageFile);
    }
  });
  document.getElementById('btn-daring-use-camera')?.addEventListener('click', () => {
    if (state.cameraMode !== 'daring') return;
    state.daringUseCamera = !state.daringUseCamera;
    state.capturedBlob = null;
    const videoEl = document.getElementById('camera-video');
    const previewEl = document.getElementById('captured-preview');
    const placeholderEl = document.getElementById('daring-stage-placeholder');
    const btnCamToggle = document.getElementById('btn-daring-use-camera');

    previewEl.classList.add('hidden');
    document.getElementById('btn-retake-photo').classList.add('hidden');
    document.getElementById('btn-submit-attendance').classList.add('hidden');

    if (state.daringUseCamera) {
      if (placeholderEl) placeholderEl.classList.add('hidden');
      videoEl.classList.remove('hidden');
      document.getElementById('btn-capture-photo').classList.remove('hidden');
      if (btnCamToggle) btnCamToggle.textContent = 'Kembali ke Unggah Bukti Foto';
      syncCameraOrientationUi();
      initCameraAndGpsStreams({ needCamera: true });
    } else {
      videoEl.classList.add('hidden');
      if (placeholderEl) placeholderEl.classList.remove('hidden');
      document.getElementById('btn-capture-photo').classList.add('hidden');
      if (btnCamToggle) btnCamToggle.textContent = 'Atau Ambil Dari Kamera';
      syncCameraOrientationUi();
      initCameraAndGpsStreams({ needCamera: false });
    }
  });

  // Salin Koordinat di Modal Peta GPS
  document.getElementById('btn-copy-gps-coords')?.addEventListener('click', () => {
    const coords = document.getElementById('gps-map-coords').textContent;
    navigator.clipboard?.writeText(coords);
    showToast(`Koordinat ${coords} disalin!`, 'success');
  });

  // Modal Pengingat WhatsApp & Bukti Tunggakan Events
  document.getElementById('wa-reminder-text')?.addEventListener('input', (e) => {
    const ctx = state.waReminderContext;
    const openChatBtn = document.getElementById('btn-wa-open-chat');
    if (ctx?.student && openChatBtn) {
      openChatBtn.href = buildWaHrefForStudent(ctx.student, e.target.value);
    }
  });

  document.getElementById('btn-wa-copy-text')?.addEventListener('click', async () => {
    const txt = document.getElementById('wa-reminder-text')?.value || '';
    if (!txt) return;
    try {
      await navigator.clipboard?.writeText(txt);
      showToast('Pesan rincian tunggakan disalin ke clipboard!', 'success');
    } catch {
      showToast('Gagal menyalin teks. Silakan salin manual dari kotak pesan.', 'warning');
    }
  });

  document.getElementById('btn-wa-copy-image')?.addEventListener('click', async () => {
    const ctx = state.waReminderContext;
    if (!ctx?.blobPromise) return;
    try {
      const blob = await ctx.blobPromise;
      if (blob && navigator.clipboard?.write && typeof ClipboardItem !== 'undefined') {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        showToast('Gambar bukti disalin! Tinggal tempel (Paste) di chat WhatsApp.', 'success');
      } else {
        document.getElementById('btn-wa-download-proof')?.click();
        showToast('Browser tidak mendukung salin gambar langsung; bukti otomatis diunduh (.PNG).', 'info');
      }
    } catch {
      document.getElementById('btn-wa-download-proof')?.click();
      showToast('Gambar bukti otomatis diunduh (.PNG) untuk dilampirkan di WhatsApp.', 'info');
    }
  });

  document.getElementById('btn-wa-share-native')?.addEventListener('click', async () => {
    const ctx = state.waReminderContext;
    if (!ctx?.blobPromise) return;
    const txt = document.getElementById('wa-reminder-text')?.value || '';
    try {
      const blob = await ctx.blobPromise;
      const file = blob ? new File([blob], ctx.fileName, { type: 'image/png' }) : null;
      if (file && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: `Bukti Tunggakan Kas - ${ctx.student.nama_lengkap}`,
          text: txt,
          files: [file],
        });
      } else if (navigator.share) {
        await navigator.share({
          title: `Bukti Tunggakan Kas - ${ctx.student.nama_lengkap}`,
          text: txt,
        });
      }
      await emitNotifications([
        {
          user_id: state.currentUser.id,
          judul: 'Pengingat & Bukti WhatsApp Dibagikan',
          pesan: `Anda membagikan bukti dan rincian tunggakan kas sebesar ${formatRupiah(ctx.sisa)} untuk ${ctx.student.nama_lengkap}.`,
          tipe: 'info',
        },
      ]);
      await db.loadAll();
      renderSidebarNav();
    } catch (err) {
      if (err?.name !== 'AbortError') {
        showToast('Gunakan Unduh Bukti (.PNG) lalu klik Buka WhatsApp.', 'info');
      }
    }
  });

  document.getElementById('btn-wa-open-chat')?.addEventListener('click', async () => {
    const ctx = state.waReminderContext;
    if (!ctx?.student || !state.currentUser) return;
    try {
      await emitNotifications([
        {
          user_id: state.currentUser.id,
          judul: 'Pengingat & Bukti WhatsApp Dibuka',
          pesan: `Anda mengirim pengingat WhatsApp beserta rincian bukti tunggakan kas sebesar ${formatRupiah(ctx.sisa)} kepada ${ctx.student.nama_lengkap}.`,
          tipe: 'info',
        },
      ]);
      await db.loadAll();
      renderSidebarNav();
    } catch {
      // Biarkan tab WhatsApp tetap berjalan
    }
  });

  // Modal Pembayaran Kas Events
  document.querySelectorAll('#modal-pay-kas .seg-btn').forEach((btn) => {
    btn.addEventListener('click', () => setPaymentMethodTab(btn.getAttribute('data-method')));
  });
  document.getElementById('pay-kas-nominal').addEventListener('input', (e) => {
    drawQrisMatrixCanvas(state.pengaturan?.qris_payload || DEFAULT_QRIS_PAYLOAD, e.target.value);
  });
  document.getElementById('btn-copy-qris-string')?.addEventListener('click', async () => {
    const code = state.currentDynamicQrisString || DEFAULT_QRIS_PAYLOAD;
    try {
      await navigator.clipboard?.writeText(code);
      showToast('Kode QRIS Dinamis berhasil disalin!', 'success');
    } catch {
      showToast('Gagal menyalin kode QRIS.', 'warning');
    }
  });
  document.getElementById('btn-download-qris-png')?.addEventListener('click', () => {
    const qrCanvas = document.getElementById('qris-qr-canvas');
    if (!qrCanvas) return;
    const cfg = state.pengaturan || {};
    const nominal = Math.max(0, Math.round(Number(document.getElementById('pay-kas-nominal')?.value || 0)));
    const card = document.createElement('canvas');
    card.width = 420;
    card.height = 510;
    const cctx = card.getContext('2d');
    cctx.fillStyle = '#ffffff';
    cctx.fillRect(0, 0, card.width, card.height);
    cctx.strokeStyle = '#cbd5e1';
    cctx.lineWidth = 2;
    cctx.strokeRect(8, 8, card.width - 16, card.height - 16);

    cctx.fillStyle = '#0f172a';
    cctx.font = 'bold 18px Arial, sans-serif';
    cctx.textAlign = 'center';
    cctx.fillText('QRIS DINAMIS PEMBAYARAN KAS', card.width / 2, 42);
    cctx.fillStyle = '#163a78';
    cctx.font = 'bold 16px Arial, sans-serif';
    cctx.fillText(cfg.qris_merchant_name || 'Mas_hy, Fashion', card.width / 2, 68);
    cctx.fillStyle = '#475569';
    cctx.font = '13px monospace';
    cctx.fillText(`NMID: ${cfg.qris_nmid || 'ID1025463553806'}`, card.width / 2, 90);

    cctx.drawImage(qrCanvas, (card.width - 280) / 2, 108, 280, 280);

    cctx.fillStyle = '#0f172a';
    cctx.font = 'bold 20px monospace';
    cctx.fillText(nominal > 0 ? formatRupiah(nominal) : 'Nominal Fleksibel', card.width / 2, 426);
    cctx.fillStyle = '#64748b';
    cctx.font = '12px Arial, sans-serif';
    cctx.fillText(`Kelas ${cfg.nama_kelas || 'R3S'} · Pindai via GoPay / DANA / OVO / Perbankan Seluler`, card.width / 2, 462);

    const a = document.createElement('a');
    a.href = card.toDataURL('image/png');
    a.download = `QRIS_Dinamis_${nominal > 0 ? nominal : 'R3S'}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('Gambar QRIS Dinamis (.PNG) diunduh!', 'success');
  });
  document.getElementById('btn-copy-rekening').addEventListener('click', () => {
    const rek = document.getElementById('bank-number-display').textContent;
    navigator.clipboard?.writeText(rek);
    showToast(`Nomor rekening ${rek} berhasil disalin!`, 'success');
  });
  document.getElementById('pay-kas-bukti').addEventListener('change', (e) => {
    const file = e.target.files[0];
    const prev = document.getElementById('pay-kas-preview');
    if (file) {
      prev.src = URL.createObjectURL(file);
      prev.classList.remove('hidden');
    } else {
      prev.classList.add('hidden');
    }
  });
  document.getElementById('form-pay-kas').addEventListener('submit', handleSubmitPayKas);

  // Modal Edit Status Absensi (Ketua / Admin) — PJ dikunci ke akun yang login
  document.getElementById('form-edit-absen').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('edit-absen-id').value;
    try {
      await db.update('absensi', id, {
        status_kehadiran: document.getElementById('edit-absen-status').value,
        status_verifikasi: document.getElementById('edit-absen-verif').value,
        catatan: document.getElementById('edit-absen-catatan').value.trim(),
        pj_id: state.currentUser.id,
        pj_nama: state.currentUser.nama_lengkap,
        dicatat_oleh: state.currentUser.id,
      });
      await db.loadAll();
      closeModal('modal-edit-absen');
      showToast('Data kehadiran berhasil diperbarui!', 'success');
      renderSidebarNav();
      renderActiveTab();
    } catch (err) {
      showToast(err.message || 'Gagal memperbarui absensi.', 'danger');
    }
  });

  // Auto-restore sesi jika pengguna sebelumnya login
  const savedUserId = localStorage.getItem(STORAGE_KEYS.SESSION_USER);
  if (savedUserId) {
    try {
      await db.loadAll();
      const u = state.profiles.find((p) => p.id === savedUserId);
      if (u) {
        enterAuthenticatedApp(u);
      }
    } catch {
      // Tetap di layar login jika gagal load
    }
  }
}

document.addEventListener('DOMContentLoaded', bootstrapApp);
