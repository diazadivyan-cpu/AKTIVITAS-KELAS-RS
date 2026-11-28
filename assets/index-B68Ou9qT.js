(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`https://mtsdptkavsrpbmsxudad.supabase.co`,t=`sb_publishable_GprwADCeysx4vDZVAq-CaA_ouQcfxWs`,n=`00020101021126610014COM.GO-JEK.WWW01189360091435873754230210G5873754230303UMI51440014ID.CO.QRIS.WWW0215ID10254635538060303UMI5204569753033605802ID5915Mas_hy, Fashion6007CIREBON61054518562070703A016304BDA1`,r={SUPABASE_CFG:`r3s_supabase_cfg_v1`,REMEMBER_CREDS:`r3s_remember_creds_v1`,SESSION_USER:`r3s_session_user_id_v1`,LOCAL_DB:`r3s_local_db_v1`,THEME:`r3s_theme_v1`,HIDDEN_MATKUL:`r3s_hidden_matkul_v1`},i={mahasiswa:`Mahasiswa`,pj_matkul:`PJ Mata Kuliah`,ketua:`Ketua Kelas`,bendahara:`Bendahara Kelas`,admin:`Admin Utama`};function a(e){return e===`mahasiswa`||e===`pj_matkul`}function o(e){return e===`mahasiswa`||e===`pj_matkul`||e===`ketua`||e===`bendahara`}function s(e){return o(e)}function c(e){return e===`admin`?`tag-coral`:e===`ketua`?`tag-success`:e===`bendahara`?`tag-warning`:e===`pj_matkul`?`tag-pj-matkul`:`tag-info`}var l={mode:`local`,theme:`dark`,skyPreviewHour:null,supabase:null,currentUser:null,activeTab:`dashboard`,currentWibDateKey:d(new Date),profiles:[],pengaturan:null,sesiAbsensi:[],absensi:[],pengajuanCuti:[],iuranKas:[],transaksiKas:[],laporanKendala:[],pemberitahuan:[],filters:{riwayatSearch:``,riwayatStatus:`Semua`,manualAbsenSearch:``,manualAbsenMode:`manual`,manualSelectedIds:[],matkulSearch:``,matkulStatus:`Semua`,sesiMatkulSearch:``,katalogMatkulSearch:``,verifikasiAbsenSearch:``,pembayaranSearch:``,pembayaranStatus:`Semua`,matrixAbsenSearch:``,matrixMatkulSearch:``,matrixKasSearch:``,matrixKasStatus:`Semua`,kasSearch:``,kasJenis:`Semua`,kasKategori:`Semua`,laporanSearch:``,laporanKategori:`Semua`,akunSearch:``,selectedDiagramStudentId:``,selectedKasDiagramStudentId:``,pdfMonth:d(new Date).slice(0,7),pdfStudentId:``,pdfBendaharaId:``,pdfKetuaId:``,pdfAdminId:``,pdfEvaluationNote:``},loginCaptchaAnswer:0,forgotCaptchaAnswer:0,verifiedForgotUser:null,cameraStream:null,cameraMode:`self`,cameraContext:null,cameraFacingMode:`user`,cameraFlipHorizontal:!1,daringUseCamera:!1,daringImageFile:null,gpsCoords:null,gpsWatchId:null,capturedBlob:null,capturedPreviewUrl:``,selectedPayMethod:`QRIS`,qrisTimerInterval:null,qrisSecondsLeft:600,currentDynamicQrisString:n,waReminderContext:null};function u(e,t){let n=document.getElementById(e);n&&n.addEventListener(`input`,n=>{let r=n.target.selectionStart,i=n.target.selectionEnd;t(n.target.value),V();let a=document.getElementById(e);if(a){a.focus();let e=typeof r==`number`?r:a.value.length,t=typeof i==`number`?i:a.value.length;try{a.setSelectionRange(e,t)}catch{}}})}function d(e=new Date){let t=new Intl.DateTimeFormat(`en-CA`,{timeZone:`Asia/Jakarta`,year:`numeric`,month:`2-digit`,day:`2-digit`}).formatToParts(e),n=Object.fromEntries(t.map(e=>[e.type,e.value]));return`${n.year}-${n.month}-${n.day}`}function f(e=new Date){return`${new Intl.DateTimeFormat(`id-ID`,{timeZone:`Asia/Jakarta`,weekday:`long`,day:`numeric`,month:`long`,year:`numeric`}).format(e)} | ${new Intl.DateTimeFormat(`id-ID`,{timeZone:`Asia/Jakarta`,hour:`2-digit`,minute:`2-digit`,second:`2-digit`,hour12:!1}).format(e).replace(/\./g,`:`)} WIB`}function p(e){if(!e)return`-`;let t=new Date(e);return Number.isNaN(t.getTime())?`-`:`${new Intl.DateTimeFormat(`id-ID`,{timeZone:`Asia/Jakarta`,day:`2-digit`,month:`short`,year:`numeric`}).format(t)} · ${new Intl.DateTimeFormat(`id-ID`,{timeZone:`Asia/Jakarta`,hour:`2-digit`,minute:`2-digit`,hour12:!1}).format(t).replace(/\./g,`:`)} WIB`}function m(e=new Date){return new Intl.DateTimeFormat(`id-ID`,{timeZone:`Asia/Jakarta`,day:`numeric`,month:`long`,year:`numeric`}).format(e)}function h(e=new Date){return new Intl.DateTimeFormat(`id-ID`,{timeZone:`Asia/Jakarta`,hour:`2-digit`,minute:`2-digit`,second:`2-digit`,hour12:!1}).format(e).replace(/\./g,`:`)+` WIB`}function g(e){if(!e||!/^\d{4}-\d{2}$/.test(e))return e||`-`;let[t,n]=e.split(`-`).map(Number),r=new Date(Date.UTC(t,n-1,15));return new Intl.DateTimeFormat(`id-ID`,{timeZone:`Asia/Jakarta`,month:`long`,year:`numeric`}).format(r)}function _(e){if(!e)return`-`;let t=String(e).trim(),n=t.match(/^(\d{4})-(\d{2})-(\d{2})/);if(n)return`${n[3]}/${n[2]}/${n[1]}`;let r=new Date(t);if(Number.isNaN(r.getTime()))return t;let[i,a,o]=d(r).split(`-`);return`${o}/${a}/${i}`}function v(e){return`Rp `+Number(e||0).toLocaleString(`id-ID`)}function y(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`)}function b(e){let t=e.length>=3&&e.length<=8,n=/\d/.test(e),r=/[^A-Za-z0-9]/.test(e);return{lenOk:t,digitOk:n,symbolOk:r,valid:t&&n&&r}}function x(){return crypto?.randomUUID?crypto.randomUUID():`xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g,e=>{let t=Math.random()*16|0;return(e===`x`?t:t&3|8).toString(16)})}function S(e,t=`info`){let n=document.getElementById(`toast-container`);if(!n)return;let r=document.createElement(`div`);r.className=`toast toast-${t}`,r.textContent=e,n.appendChild(r),setTimeout(()=>{r.style.opacity=`0`,r.style.transform=`translateY(-8px)`,r.style.transition=`opacity 0.2s ease, transform 0.2s ease`,setTimeout(()=>r.remove(),220)},4200)}function C(e){let t=String(e||``).toLowerCase();return[`hadir`,`disetujui`,`lunas`,`selesai`,`pemasukan`].includes(t)?`tag-success`:[`menunggu`,`menunggu verifikasi`,`izin`].includes(t)?`tag-coral`:[`sakit`,`sebagian`].includes(t)?`tag-warning`:[`ditolak`,`alpha`,`belum absen!`,`belum lunas`,`pengeluaran`].includes(t)?`tag-danger`:`tag-info`}var w=`__PENDING__:`;function T(e){if(!e||e.status!==`Menunggu Verifikasi`)return 0;if(e.nominal_pending!==void 0&&e.nominal_pending!==null&&Number(e.nominal_pending)>0)return Number(e.nominal_pending);let t=String(e.pj_nama||``);if(t.startsWith(w)){let e=Number(t.slice(12));if(Number.isFinite(e)&&e>0)return e}let n=Number(e.nominal_dibayar||0);return n>0?n:Number(e.nominal_tagihan||0)}function E(e){if(!e)return 0;let t=Number(e.nominal_tagihan||0),n=Number(e.nominal_dibayar||0),r=Number(e.nominal_terverifikasi||0),i=e=>t>0?Math.min(t,Math.max(0,e)):Math.max(0,e);return e.status===`Menunggu Verifikasi`?e.nominal_pending!==void 0&&e.nominal_pending!==null&&Number(e.nominal_pending)>0||String(e.pj_nama||``).startsWith(w)?i(Math.max(r,n)):i(r):e.status===`Lunas`&&n===0&&r===0?Math.max(0,t):i(Math.max(r,n))}function D(e){if(!e)return 0;let t=Number(e.nominal_tagihan||0),n=E(e);return t>0?Math.max(0,t-n):0}function O(e){if(!e)return`Belum Lunas`;let t=Number(e.nominal_tagihan||0),n=E(e),r=Math.max(0,t-n);return e.status===`Menunggu Verifikasi`?`Menunggu Verifikasi`:t>0&&r<=0||t<=0&&e.status===`Lunas`?`Lunas`:e.status===`Ditolak`||e.status===`Belum Lunas`&&e.metode_bayar===`Ditolak`?`Ditolak`:n>0&&r>0?`Sebagian`:`Belum Lunas`}function k(e){return l.profiles.filter(t=>e.includes(t.role)).map(e=>e.id)}async function A(e){let t=(e||[]).filter(e=>e&&e.user_id);if(!t.length)return;let n=new Set,r=[];t.forEach(e=>{let t=`${e.user_id}::${e.judul}::${e.pesan}`;n.has(t)||(n.add(t),r.push({user_id:e.user_id,judul:e.judul,pesan:e.pesan,tipe:e.tipe||`info`,dibaca:!1}))}),r.length&&await R.insert(`pemberitahuan`,r)}function j(){try{let e=JSON.parse(localStorage.getItem(r.SUPABASE_CFG)||`null`);if(e?.url&&e?.anonKey)return e}catch{}return!e.includes(`YOUR_PROJECT_ID`)&&!t.includes(`YOUR_SUPABASE_ANON_KEY`)?{url:e,anonKey:t}:null}function M(){let e=j();e&&window.supabase?.createClient?(l.supabase=window.supabase.createClient(e.url,e.anonKey),l.mode=`supabase`):(l.supabase=null,l.mode=`local`)}var N={id:`00000000-0000-4000-8000-000000000001`,npm:`202443500001`,nama_lengkap:`Admin Utama RS`,username:`admin`,password:`qwerty4322.`,role:`admin`,no_wa:`6281200000001`,avatar_url:``},P=new Set([`ketua_r3s`,`bendahara_r3s`,`pjmatkul_r3s`,`adivya_r3s`,`siti_r3s`,`dimas_r3s`,`naufal_r3s`,`putri_r3s`]),F=new Set([`00000000-0000-4000-8000-000000000002`,`00000000-0000-4000-8000-000000000003`,`00000000-0000-4000-8000-000000000004`,`00000000-0000-4000-8000-000000000101`,`00000000-0000-4000-8000-000000000102`,`00000000-0000-4000-8000-000000000103`,`00000000-0000-4000-8000-000000000105`,`00000000-0000-4000-8000-000000000106`]),ee=new Set([`10000000-0000-4000-8000-000000000001`,`10000000-0000-4000-8000-000000000002`,`10000000-0000-4000-8000-000000000003`]);function te(){return{profiles:[{...N}],pengaturan_kelas:{id:1,nama_kelas:`R3S`,semester_aktif:3,pertemuan_berjalan:0,total_pertemuan_semester:14,nama_bank:`BCA`,no_rekening:`5210987654`,atas_nama_rekening:`Bendahara Kelas R3S`,qris_nmid:`ID1025463553806`,qris_merchant_name:`Mas_hy, Fashion`,qris_payload:n,nominal_kas_default:1e4},sesi_absensi:[],absensi:[],pengajuan_cuti:[],iuran_kas:[],transaksi_kas:[],laporan_kendala:[],pemberitahuan:[]}}function I(){try{let e=localStorage.getItem(r.LOCAL_DB);if(e){let t=JSON.parse(e);if(t&&Array.isArray(t.profiles)){let e=!1;if(!localStorage.getItem(`r3s_dummy_purged_v1`)){let n=t.profiles.length;if(t.profiles=t.profiles.filter(e=>!P.has(String(e.username||``).toLowerCase())&&!F.has(e.id)),t.profiles.length!==n&&(e=!0),t.profiles.some(e=>e.role===`admin`)||(t.profiles.unshift({...N}),e=!0),Array.isArray(t.sesi_absensi)){let n=t.sesi_absensi.length;t.sesi_absensi=t.sesi_absensi.filter(e=>!ee.has(e.id)),t.sesi_absensi.length!==n&&(e=!0)}if(Array.isArray(t.absensi)){let n=t.absensi.length;t.absensi=t.absensi.filter(e=>!ee.has(e.sesi_id)&&!F.has(e.user_id)),t.absensi.length!==n&&(e=!0)}if(Array.isArray(t.pengajuan_cuti)){let n=t.pengajuan_cuti.length;t.pengajuan_cuti=t.pengajuan_cuti.filter(e=>!F.has(e.user_id)),t.pengajuan_cuti.length!==n&&(e=!0)}if(Array.isArray(t.iuran_kas)){let n=t.iuran_kas.length;t.iuran_kas=t.iuran_kas.filter(e=>!F.has(e.user_id)),t.iuran_kas.length!==n&&(e=!0)}if(Array.isArray(t.transaksi_kas)){let n=t.transaksi_kas.length;t.transaksi_kas=t.transaksi_kas.filter(e=>!F.has(e.terkait_user_id)&&!F.has(e.pj_id)&&!F.has(e.dicatat_oleh)),t.transaksi_kas.length!==n&&(e=!0)}if(Array.isArray(t.laporan_kendala)){let n=t.laporan_kendala.length;t.laporan_kendala=t.laporan_kendala.filter(e=>!F.has(e.user_id)),t.laporan_kendala.length!==n&&(e=!0)}if(Array.isArray(t.pemberitahuan)){let n=t.pemberitahuan.length;t.pemberitahuan=t.pemberitahuan.filter(e=>!F.has(e.user_id)),t.pemberitahuan.length!==n&&(e=!0)}t.pengaturan_kelas&&(String(t.pengaturan_kelas.atas_nama_rekening||``).includes(`Nadia Kusuma`)&&(t.pengaturan_kelas.atas_nama_rekening=`Bendahara Kelas R3S`,e=!0),(t.sesi_absensi||[]).length===0&&t.pengaturan_kelas.pertemuan_berjalan===10&&(t.pengaturan_kelas.pertemuan_berjalan=0,e=!0)),localStorage.removeItem(`r3s_dummy_v2_seeded`),localStorage.setItem(`r3s_dummy_purged_v1`,`1`)}t.profiles.forEach(t=>{t.role===`admin`&&t.nama_lengkap===`Admin Utama R3S`&&(t.nama_lengkap=`Admin Utama RS`,e=!0),t.role===`admin`&&t.username===`admin_r3s`&&t.password===`Adm!n99`&&(t.username=N.username,t.password=N.password,e=!0)}),[`sesi_absensi`,`absensi`,`iuran_kas`,`transaksi_kas`].forEach(n=>{Array.isArray(t[n])&&t[n].forEach(t=>{t.pj_nama===`Admin Utama R3S`&&(t.pj_nama=`Admin Utama RS`,e=!0)})}),e&&L(t)}return t}}catch{}let e=te();return localStorage.setItem(r.LOCAL_DB,JSON.stringify(e)),localStorage.setItem(`r3s_dummy_purged_v1`,`1`),e}function L(e){localStorage.setItem(r.LOCAL_DB,JSON.stringify(e))}var R={async loadAll(){if(l.mode===`supabase`&&l.supabase){let[e,t,r,i,a,o,s,c,u]=await Promise.all([l.supabase.from(`profiles`).select(`*`).order(`npm`,{ascending:!0}),l.supabase.from(`pengaturan_kelas`).select(`*`).eq(`id`,1).maybeSingle(),l.supabase.from(`sesi_absensi`).select(`*`).order(`created_at`,{ascending:!1}),l.supabase.from(`absensi`).select(`*`).order(`waktu_kirim`,{ascending:!1}),l.supabase.from(`pengajuan_cuti`).select(`*`).order(`created_at`,{ascending:!1}),l.supabase.from(`iuran_kas`).select(`*`).order(`created_at`,{ascending:!1}),l.supabase.from(`transaksi_kas`).select(`*`).order(`tanggal`,{ascending:!1}),l.supabase.from(`laporan_kendala`).select(`*`).order(`created_at`,{ascending:!1}),l.supabase.from(`pemberitahuan`).select(`*`).order(`created_at`,{ascending:!1})]),d=[e.error,t.error,r.error,i.error,a.error,o.error,s.error,c.error,u.error].find(Boolean);if(d)throw Error(`Gagal memuat data Supabase: ${d.message}`);l.profiles=e.data||[],l.pengaturan=t.data||{id:1,nama_kelas:`R3S`,semester_aktif:3,pertemuan_berjalan:0,total_pertemuan_semester:14,nama_bank:`BCA`,no_rekening:`5210987654`,atas_nama_rekening:`Bendahara Kelas R3S`,qris_nmid:`ID1025463553806`,qris_merchant_name:`Mas_hy, Fashion`,qris_payload:n,nominal_kas_default:1e4},l.pengaturan=Ge(l.pengaturan),l.sesiAbsensi=r.data||[],l.absensi=i.data||[],l.pengajuanCuti=a.data||[],l.iuranKas=o.data||[],l.transaksiKas=s.data||[],l.laporanKendala=c.data||[],l.pemberitahuan=u.data||[];return}let e=I();l.profiles=e.profiles||[],l.pengaturan=Ge(e.pengaturan_kelas),l.sesiAbsensi=e.sesi_absensi||[],l.absensi=e.absensi||[],l.pengajuanCuti=e.pengajuan_cuti||[],l.iuranKas=e.iuran_kas||[],l.transaksiKas=e.transaksi_kas||[],l.laporanKendala=e.laporan_kendala||[],l.pemberitahuan=e.pemberitahuan||[]},async insert(e,t){if(l.mode===`supabase`&&l.supabase){let n=Array.isArray(t)?t.map(e=>({...e})):{...t};for(let t=0;t<6;t++){let{data:t,error:r}=await l.supabase.from(e).insert(n).select();if(!r)return t;let i=r.message?.match(/Could not find the '([^']+)' column|column "([^"]+)" of relation/i),a=i&&(i[1]||i[2]);if(a)Array.isArray(n)?n.forEach(e=>delete e[a]):delete n[a];else throw r}}let n=I(),r=(Array.isArray(t)?t:[t]).map(e=>({id:e.id||x(),created_at:e.created_at||new Date().toISOString(),...e}));return n[e]=[...r,...n[e]||[]],L(n),r},async upsert(e,t,n=`id`){if(l.mode===`supabase`&&l.supabase){let r={...t};for(let t=0;t<5;t++){let{data:t,error:i}=await l.supabase.from(e).upsert(r,{onConflict:n}).select();if(!i)return t;let a=i.message?.match(/Could not find the '([^']+)' column/);if(a)delete r[a[1]];else throw i}}let r=I(),i=r[e]||[],a=n.split(`,`).map(e=>e.trim()),o=i.findIndex(e=>a.every(n=>e[n]===t[n])),s={id:t.id||(o>=0?i[o].id:x()),created_at:t.created_at||(o>=0?i[o].created_at:new Date().toISOString()),...t};return o>=0?i[o]={...i[o],...s}:i.unshift(s),r[e]=i,L(r),[s]},async update(e,t,n){if(l.mode===`supabase`&&l.supabase){let r={...n};for(let n=0;n<6;n++){let{data:n,error:i}=await l.supabase.from(e).update(r).eq(`id`,t).select();if(!i)return n;let a=i.message?.match(/Could not find the '([^']+)' column|column "([^"]+)" of relation/i),o=a&&(a[1]||a[2]);if(o)delete r[o];else throw i}}let r=I();if(e===`pengaturan_kelas`)return r.pengaturan_kelas={...r.pengaturan_kelas,...n},L(r),[r.pengaturan_kelas];let i=r[e]||[],a=i.findIndex(e=>e.id===t);return a>=0?(i[a]={...i[a],...n,updated_at:new Date().toISOString()},r[e]=i,L(r),[i[a]]):[]},async remove(e,t){if(l.mode===`supabase`&&l.supabase){let{error:n}=await l.supabase.from(e).delete().eq(`id`,t);if(n)throw n;return}let n=I();n[e]=(n[e]||[]).filter(e=>e.id!==t),e===`sesi_absensi`&&(n.absensi=(n.absensi||[]).filter(e=>e.sesi_id!==t)),L(n)},async uploadFile(e,t=`umum`){if(!e)return``;if(l.mode===`supabase`&&l.supabase){let n=e.type?.includes(`png`)?`png`:`jpg`,r=`${t}/${Date.now()}_${Math.random().toString(36).slice(2,8)}.${n}`,{error:i}=await l.supabase.storage.from(`bukti_absensi`).upload(r,e,{contentType:e.type||`image/jpeg`,upsert:!1});if(i)throw Error(`Gagal unggah gambar ke Storage: ${i.message}`);let{data:a}=l.supabase.storage.from(`bukti_absensi`).getPublicUrl(r);return a?.publicUrl||``}return await ne(e,720,.68)}};function ne(e,t=720,n=.7){return new Promise((r,i)=>{let a=new FileReader;a.onload=()=>{let e=new Image;e.onload=()=>{let i=Math.min(1,t/Math.max(e.width,e.height)),a=Math.max(1,Math.round(e.width*i)),o=Math.max(1,Math.round(e.height*i)),s=document.createElement(`canvas`);s.width=a,s.height=o,s.getContext(`2d`).drawImage(e,0,0,a,o),r(s.toDataURL(`image/jpeg`,n))},e.onerror=()=>r(a.result),e.src=a.result},a.onerror=i,a.readAsDataURL(e)})}function re(){let e=document.getElementById(`stars-layer`);if(!e)return;e.innerHTML=``;let t=[``,``,``,`tint-cyan`,`tint-violet`];for(let n=0;n<64;n++){let r=document.createElement(`span`),i=t[n%t.length];r.className=i?`star-particle ${i}`:`star-particle`;let a=(1.2+Math.random()*2.4).toFixed(1);r.style.width=`${a}px`,r.style.height=`${a}px`,r.style.left=`${(Math.random()*99).toFixed(2)}%`,r.style.top=`${(Math.random()*96).toFixed(2)}%`,r.style.animationDuration=`${(2.4+Math.random()*4.2).toFixed(1)}s`,r.style.animationDelay=`${(-Math.random()*6).toFixed(2)}s`,e.appendChild(r)}}function ie(e=new Date){let t=document.getElementById(`sky-dome`),n=document.getElementById(`space-backdrop`),r=document.getElementById(`celestial-sun`),i=document.getElementById(`celestial-moon`),a=document.getElementById(`sky-stars-group`),o=document.getElementById(`sky-clouds-group`),s=document.querySelectorAll(`[data-celestial-phase-label]`),c=document.querySelectorAll(`[data-celestial-clock-badge]`),u=document.getElementById(`sky-horizon-glow`);if(!t||!r||!i)return;let d=12,f=``;if(l.skyPreviewHour!==null&&Number.isFinite(Number(l.skyPreviewHour)))d=Number(l.skyPreviewHour),f=`Simulasi ${String(Math.floor(d)).padStart(2,`0`)}:00 WIB`;else{let t=new Intl.DateTimeFormat(`en-GB`,{timeZone:`Asia/Jakarta`,hour:`2-digit`,minute:`2-digit`,second:`2-digit`,hour12:!1}).formatToParts(e),n=Object.fromEntries(t.map(e=>[e.type,e.value])),r=Number(n.hour)%24,i=Number(n.minute),a=Number(n.second);d=r+i/60+a/3600,f=`${String(r).padStart(2,`0`)}:${String(i).padStart(2,`0`)}:${String(a).padStart(2,`0`)} WIB`}c.forEach(e=>{e.textContent=f});let p=d>=6&&d<18,m=p?(d-6)/12:(d>=18?d-18:d+6)/12,h=Math.max(0,Math.min(1,m)),g=70+1300*h,_=590-2048*h*(1-h);t.classList.remove(`sky-dawn`,`sky-day`,`sky-sunset`,`sky-night`),n&&n.classList.remove(`sky-dawn-backdrop`,`sky-day-backdrop`,`sky-sunset-backdrop`,`sky-night-backdrop`);let v=``;p?(r.style.display=`block`,i.style.display=`none`,r.setAttribute(`transform`,`translate(${g.toFixed(1)}, ${_.toFixed(1)})`),o&&(o.style.opacity=`1`),d<8.25?(t.classList.add(`sky-dawn`),n&&n.classList.add(`sky-dawn-backdrop`),a&&(a.style.opacity=`0.45`),u&&(u.style.background=`radial-gradient(circle at 12% 65%, rgba(251, 146, 60, 0.55), transparent 52%)`,u.style.opacity=`1`),v=`Pagi · Matahari Terbit di Timur`):d<15.5?(t.classList.add(`sky-day`),n&&n.classList.add(`sky-day-backdrop`),a&&(a.style.opacity=`0`),u&&(u.style.background=`radial-gradient(circle at 50% 8%, rgba(254, 240, 138, 0.28), transparent 55%)`,u.style.opacity=`1`),v=d>=11&&d<=13.5?`Tengah Hari · Matahari di Tengah Langit`:`Siang Cerah · Matahari Melintas Langit`):(t.classList.add(`sky-sunset`),n&&n.classList.add(`sky-sunset-backdrop`),a&&(a.style.opacity=`0.5`),u&&(u.style.background=`radial-gradient(circle at 88% 65%, rgba(249, 115, 22, 0.58), transparent 54%)`,u.style.opacity=`1`),v=`Sore · Matahari Terbenam di Barat`)):(r.style.display=`none`,i.style.display=`block`,i.setAttribute(`transform`,`translate(${g.toFixed(1)}, ${_.toFixed(1)})`),t.classList.add(`sky-night`),n&&n.classList.add(`sky-night-backdrop`),a&&(a.style.opacity=`1`),o&&(o.style.opacity=`0.15`),u&&(u.style.background=`radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.16), transparent 60%)`,u.style.opacity=`1`),v=`Malam Galaksi · Bulan & Bintang Bersinar`),s.forEach(e=>{e.textContent=v})}function ae(){let e=()=>{let e=new Date,t=f(e),n=document.getElementById(`auth-clock-display`),r=document.getElementById(`global-clock-wib`),i=document.getElementById(`camera-time-status`),a=document.getElementById(`pdf-realtime-clock`);n&&(n.textContent=t),r&&(r.textContent=t),i&&(i.textContent=t),a&&(a.textContent=t),ie(e);let o=d(e);o!==l.currentWibDateKey&&(l.currentWibDateKey=o,l.currentUser&&l.activeTab===`dashboard`&&V()),document.querySelectorAll(`[data-deadline-iso]`).forEach(t=>{let n=new Date(t.getAttribute(`data-deadline-iso`)).getTime()-e.getTime();if(n<=0)t.textContent=`Sesi Ditutup`,t.classList.add(`text-danger`);else{let e=Math.floor(n/36e5),r=Math.floor(n%36e5/6e4),i=Math.floor(n%6e4/1e3);t.textContent=`${String(e).padStart(2,`0`)}:${String(r).padStart(2,`0`)}:${String(i).padStart(2,`0`)}`}})};e(),setInterval(e,1e3)}function z(e=`login`){let t=2+Math.floor(Math.random()*9),n=1+Math.floor(Math.random()*9);if(e===`login`){l.loginCaptchaAnswer=t+n;let e=document.getElementById(`login-captcha-question`),r=document.getElementById(`login-captcha-answer`);e&&(e.textContent=`${t} + ${n} = ?`),r&&(r.value=``)}else{l.forgotCaptchaAnswer=t+n;let e=document.getElementById(`forgot-captcha-question`),r=document.getElementById(`forgot-captcha-answer`);e&&(e.textContent=`${t} + ${n} = ?`),r&&(r.value=``)}}function oe(){try{let e=JSON.parse(localStorage.getItem(r.REMEMBER_CREDS)||`null`);e?.username&&(document.getElementById(`login-username`).value=e.username,document.getElementById(`login-password`).value=e.password||``,document.getElementById(`login-remember`).checked=!0)}catch{}}async function se(e){e.preventDefault();let t=document.getElementById(`login-username`).value.trim(),n=document.getElementById(`login-password`).value,i=Number(document.getElementById(`login-captcha-answer`).value),a=document.getElementById(`login-remember`).checked;if(i!==l.loginCaptchaAnswer)S(`Jawaban Captcha tidak sesuai. Silakan hitung ulang.`,`danger`),z(`login`);else try{await R.loadAll();let e=l.profiles.find(e=>e.username.toLowerCase()===t.toLowerCase()&&e.password===n);if(!e){S(`Nama pengguna atau kata sandi salah. Pastikan akun telah dibuat oleh Admin.`,`danger`),z(`login`);return}a?localStorage.setItem(r.REMEMBER_CREDS,JSON.stringify({username:t,password:n})):localStorage.removeItem(r.REMEMBER_CREDS),localStorage.setItem(r.SESSION_USER,e.id),fe(e),S(`Selamat datang kembali, ${e.nama_lengkap}!`,`success`)}catch(e){S(e.message||`Gagal menghubungi basis data.`,`danger`)}}async function ce(){let e=document.getElementById(`forgot-username`).value.trim();if(!e)S(`Masukkan nama pengguna Anda terlebih dahulu.`,`warning`);else try{await R.loadAll();let t=l.profiles.find(t=>t.username.toLowerCase()===e.toLowerCase());if(!t){l.verifiedForgotUser=null,document.getElementById(`forgot-verified-card`).classList.add(`hidden`),document.getElementById(`forgot-step-2`).classList.add(`hidden`),S(`Nama pengguna tidak ditemukan di basis data kelas R3S.`,`danger`);return}l.verifiedForgotUser=t,document.getElementById(`forgot-verified-name`).textContent=t.nama_lengkap,document.getElementById(`forgot-verified-username`).textContent=`@${t.username} · ${t.npm}`,document.getElementById(`forgot-verified-card`).classList.remove(`hidden`),document.getElementById(`forgot-step-2`).classList.remove(`hidden`),z(`forgot`),S(`Nama pengguna terverifikasi! Silakan buat kata sandi baru.`,`success`)}catch(e){S(e.message||`Gagal memverifikasi nama pengguna.`,`danger`)}}function le(e,t){let n=b(e),r=document.querySelector(t);return r&&(r.querySelector(`[data-rule="length"]`)?.classList.toggle(`valid`,n.lenOk),r.querySelector(`[data-rule="digit"]`)?.classList.toggle(`valid`,n.digitOk),r.querySelector(`[data-rule="symbol"]`)?.classList.toggle(`valid`,n.symbolOk)),n}async function ue(e){if(e.preventDefault(),!l.verifiedForgotUser){S(`Verifikasi nama pengguna terlebih dahulu.`,`warning`);return}let t=document.getElementById(`forgot-new-password`).value,n=document.getElementById(`forgot-confirm-password`).value,r=Number(document.getElementById(`forgot-captcha-answer`).value);if(!b(t).valid)S(`Kata sandi wajib maksimal 8 karakter, minimal 1 angka, dan minimal 1 simbol.`,`danger`);else if(t!==n)S(`Konfirmasi kata sandi baru tidak cocok.`,`danger`);else if(r!==l.forgotCaptchaAnswer)S(`Jawaban Captcha salah.`,`danger`),z(`forgot`);else try{let e=l.verifiedForgotUser;await R.update(`profiles`,e.id,{password:t});let n=[{user_id:e.id,judul:`Kata Sandi Akun Diperbarui`,pesan:`Kata sandi akun Anda baru saja diperbarui melalui fitur Lupa Kata Sandi Mandiri.`,tipe:`success`}];a(e.role)&&k([`admin`]).forEach(t=>{n.push({user_id:t,judul:`Mahasiswa Mengubah Kata Sandi`,pesan:`Mahasiswa ${e.nama_lengkap} (${e.npm} · @${e.username}) telah mengatur ulang kata sandi melalui Lupa Kata Sandi.`,tipe:`warning`})}),await A(n),await R.loadAll(),S(`Kata sandi baru berhasil disimpan! Silakan masuk.`,`success`),document.getElementById(`forgot-form`).reset(),document.getElementById(`forgot-verified-card`).classList.add(`hidden`),document.getElementById(`forgot-step-2`).classList.add(`hidden`),l.verifiedForgotUser=null,de(`login`)}catch(e){S(e.message||`Gagal memperbarui password.`,`danger`)}}function de(e){let t=document.getElementById(`login-form`),n=document.getElementById(`forgot-form`);e===`forgot`?(t.classList.add(`hidden`),n.classList.remove(`hidden`),z(`forgot`)):(n.classList.add(`hidden`),t.classList.remove(`hidden`),z(`login`))}function fe(e){l.currentUser=e,l.activeTab=`dashboard`,document.getElementById(`auth-screen`).classList.add(`hidden`),document.getElementById(`app-shell`).classList.remove(`hidden`),he(),B(),V()}function pe(){localStorage.removeItem(r.SESSION_USER),l.currentUser=null,document.getElementById(`app-shell`).classList.add(`hidden`),document.getElementById(`auth-screen`).classList.remove(`hidden`),z(`login`),oe()}function me(e){let t=_e().filter(e=>!e.dibaca).length,n=l.absensi.filter(e=>e.status_verifikasi===`Menunggu`).length,r=l.iuranKas.filter(e=>e.status===`Menunggu Verifikasi`).length,i=l.pengajuanCuti.filter(e=>e.status===`Menunggu`).length,o=l.laporanKendala.filter(e=>e.status===`Menunggu`).length,s=[{section:`Umum`,id:`dashboard`,label:`Dashboard`}];return a(e)?s.push({section:`Fitur Mahasiswa`,id:`absensi`,label:`Absensi Waktu Nyata`},{section:`Fitur Mahasiswa`,id:`cuti`,label:`Pengajuan Cuti`},{section:`Fitur Mahasiswa`,id:`kas_mahasiswa`,label:`Pembayaran Kas`},{section:`Layanan`,id:`pusat_info`,label:`Pusat Informasi`,count:t},{section:`Akun`,id:`profil`,label:`Profil Saya`}):e===`ketua`?s.push({section:`Fitur Mahasiswa`,id:`absensi`,label:`Absensi Waktu Nyata`},{section:`Fitur Mahasiswa`,id:`cuti`,label:`Pengajuan Cuti`},{section:`Fitur Mahasiswa`,id:`kas_mahasiswa`,label:`Pembayaran Kas`},{section:`Kepengurusan Absensi (Ketua)`,id:`sesi_absen`,label:`Absensi`},{section:`Kepengurusan Absensi (Ketua)`,id:`verifikasi_absen`,label:`Verifikasi Kehadiran`,count:n},{section:`Kepengurusan Absensi (Ketua)`,id:`manual_absen`,label:`Absensi Manual`},{section:`Kepengurusan Absensi (Ketua)`,id:`riwayat_monitoring`,label:`Riwayat & Cuti`,count:i},{section:`Laporan & Ekspor`,id:`monitoring_excel`,label:`Matriks, Rekap & Excel`},{section:`Laporan & Ekspor`,id:`laporan_pdf`,label:`Laporan PDF Bulanan`},{section:`Layanan`,id:`pusat_info`,label:`Pusat Informasi`,count:t},{section:`Akun`,id:`profil`,label:`Profil Saya`}):e===`bendahara`?s.push({section:`Fitur Mahasiswa`,id:`absensi`,label:`Absensi Waktu Nyata`},{section:`Fitur Mahasiswa`,id:`cuti`,label:`Pengajuan Cuti`},{section:`Fitur Mahasiswa`,id:`kas_mahasiswa`,label:`Pembayaran Kas`},{section:`Keuangan Kelas (Bendahara)`,id:`saluran_tagihan`,label:`Saluran Pembayaran & Tagihan Kas`},{section:`Keuangan Kelas (Bendahara)`,id:`daftar_pembayaran`,label:`Verifikasi & Pengingat WA`,count:r},{section:`Keuangan Kelas (Bendahara)`,id:`buku_kas`,label:`Catatan Kas Transparan`},{section:`Monitoring & Rekap`,id:`monitoring_excel`,label:`Matriks, Rekap & Excel`},{section:`Monitoring & Rekap`,id:`laporan_pdf`,label:`Laporan PDF Bulanan`},{section:`Layanan`,id:`pusat_info`,label:`Pusat Informasi`,count:t},{section:`Akun`,id:`profil`,label:`Profil Saya`}):e===`admin`&&s.push({section:`Monitoring & Ekspor`,id:`monitoring_excel`,label:`Matriks, Diagram & Excel`},{section:`Monitoring & Ekspor`,id:`laporan_pdf`,label:`Laporan PDF Bulanan`},{section:`Monitoring & Ekspor`,id:`monitoring_laporan`,label:`Laporan Masuk`,count:o},{section:`Manajemen Absensi`,id:`sesi_absen`,label:`Absensi`},{section:`Manajemen Absensi`,id:`verifikasi_absen`,label:`Verifikasi Kehadiran`,count:n},{section:`Manajemen Absensi`,id:`manual_absen`,label:`Absensi Manual`},{section:`Manajemen Absensi`,id:`riwayat_monitoring`,label:`Riwayat & Cuti`,count:i},{section:`Manajemen Kas`,id:`saluran_tagihan`,label:`Saluran Pembayaran & Tagihan Kas`},{section:`Manajemen Kas`,id:`daftar_pembayaran`,label:`Verifikasi & Pengingat WA`,count:r},{section:`Manajemen Kas`,id:`buku_kas`,label:`Catatan Kas Transparan`},{section:`Sistem`,id:`kelola_akun`,label:`Kelola Akun & Rekening`},{section:`Sistem`,id:`pusat_info`,label:`Pusat Informasi`,count:t},{section:`Sistem`,id:`profil`,label:`Profil Saya`}),s}function he(){let e=l.currentUser;if(!e)return;document.getElementById(`sidebar-role-label`).textContent=i[e.role]||e.role,document.getElementById(`topbar-user-name`).textContent=e.nama_lengkap,document.getElementById(`topbar-user-meta`).textContent=`${e.npm} · ${i[e.role]}`;let t=document.getElementById(`topbar-avatar`);e.avatar_url?t.innerHTML=`<img src="${y(e.avatar_url)}" alt="${y(e.nama_lengkap)}" />`:t.textContent=(e.nama_lengkap||`R`)[0].toUpperCase();let n=_e().filter(e=>!e.dibaca).length,r=document.getElementById(`topbar-notif-count`);n>0?(r.textContent=String(n),r.classList.remove(`hidden`)):r.classList.add(`hidden`)}function B(){let e=document.getElementById(`sidebar-nav`);if(!e||!l.currentUser)return;let t=me(l.currentUser.role),n=``,r=``;for(let e of t){e.section!==n&&(r+=`<div class="nav-section-title">${y(e.section)}</div>`,n=e.section);let t=l.activeTab===e.id?`active`:``,i=e.count>0?`<span class="nav-count tabular-nums">${e.count}</span>`:``;r+=`
      <button type="button" class="nav-item ${t}" data-tab="${e.id}">
        <span class="nav-item-left"><span class="nav-item-label">${y(e.label)}</span></span>
        ${i}
      </button>
    `}e.innerHTML=r,e.querySelectorAll(`.nav-item`).forEach(e=>{e.addEventListener(`click`,()=>{l.activeTab=e.getAttribute(`data-tab`),ge(),B(),V()})})}function ge(){document.getElementById(`app-sidebar`)?.classList.remove(`open`),document.getElementById(`sidebar-overlay`)?.classList.add(`hidden`)}function _e(){return l.currentUser?l.pemberitahuan.filter(e=>!e.user_id||e.user_id===l.currentUser.id).sort((e,t)=>new Date(t.created_at||0)-new Date(e.created_at||0)):[]}function V(){let e=document.getElementById(`main-content`);if(!e||!l.currentUser)return;let t=l.profiles.find(e=>e.id===l.currentUser.id);switch(t&&(l.currentUser=t),new Set(me(l.currentUser.role).map(e=>e.id)).has(l.activeTab)||(l.activeTab=`dashboard`,B()),he(),l.activeTab){case`dashboard`:e.innerHTML=ye(),be();break;case`absensi`:e.innerHTML=Fe(),Ie();break;case`cuti`:e.innerHTML=Ye(),Xe();break;case`kas_mahasiswa`:e.innerHTML=Le(),Re();break;case`pusat_info`:e.innerHTML=Ze(),Qe();break;case`profil`:e.innerHTML=$e(),et();break;case`sesi_absen`:e.innerHTML=lt(),ut();break;case`verifikasi_absen`:e.innerHTML=pt(),mt();break;case`manual_absen`:e.innerHTML=_t(),bt();break;case`riwayat_monitoring`:e.innerHTML=xt(),St();break;case`saluran_tagihan`:e.innerHTML=Ct(),wt();break;case`daftar_pembayaran`:e.innerHTML=Tt(),Et();break;case`buku_kas`:e.innerHTML=jt(),Mt();break;case`monitoring_excel`:e.innerHTML=Rt(),zt();break;case`laporan_pdf`:e.innerHTML=Zt(),gn();break;case`monitoring_laporan`:e.innerHTML=vn(),yn();break;case`kelola_akun`:e.innerHTML=bn(),xn();break;default:e.innerHTML=ye(),be()}}function ve(){let e=l.currentWibDateKey,t=l.currentUser,n=t?.role||`mahasiswa`,r=[],i=Object.fromEntries(l.profiles.map(e=>[e.id,e])),o=Object.fromEntries(l.sesiAbsensi.map(e=>[e.id,e]));return l.sesiAbsensi.forEach(t=>{let a=t.created_at||(t.tanggal?`${t.tanggal}T08:00:00Z`:``);if(!a||d(new Date(a))!==e&&t.tanggal!==e)return;let o=t.dibuka_oleh||t.pj_id,s=i[o]?.role,c=i[o]?.nama_lengkap||t.pj_nama||`Pengurus`;(n===`admin`||n===`ketua`&&s!==`admin`)&&r.push({ts:a,title:`Absensi · ${t.mata_kuliah}`,meta:`Pertemuan ${t.pertemuan_ke} (${t.mode_kuliah||`Luring`}) · PJ: ${c}`,tagClass:`tag-info`})}),l.absensi.forEach(s=>{let c=s.waktu_kirim||s.created_at;if(!c||d(new Date(c))!==e)return;let l=i[s.user_id]?.nama_lengkap||`Mahasiswa`,u=o[s.sesi_id]?.mata_kuliah||`Perkuliahan`,f=s.dicatat_oleh||s.pj_id,p=i[f]?.role;if(a(n)||n===`bendahara`){if(s.user_id!==t.id||s.is_manual)return}else if(n===`ketua`&&p===`admin`)return;r.push({ts:c,title:`Absensi ${u} · ${l}`,meta:`${s.status_kehadiran} · ${s.status_verifikasi}`,tagClass:C(s.status_verifikasi)})}),l.pengajuanCuti.forEach(o=>{let s=o.waktu_pengajuan||o.created_at;if(!s||d(new Date(s))!==e)return;let c=i[o.user_id]?.nama_lengkap||`Mahasiswa`,l=i[o.ditinjau_oleh]?.role;if(a(n)||n===`bendahara`){if(o.user_id!==t.id)return}else if(n===`ketua`&&l===`admin`&&o.status!==`Menunggu`)return;r.push({ts:s,title:`Pengajuan Cuti · ${c}`,meta:`${_(o.tanggal_mulai)} s.d. ${_(o.tanggal_selesai)} · ${o.status}`,tagClass:C(o.status)})}),l.iuranKas.forEach(o=>{let s=o.tanggal_bayar||o.created_at;if(!s||d(new Date(s))!==e||o.status===`Belum Lunas`)return;let c=i[o.user_id]?.nama_lengkap||`Anggota`,l=i[o.verified_by||o.pj_id]?.role;if(a(n)||n===`ketua`){if(o.user_id!==t.id||o.metode_bayar===`Tunai / Catatan Kas`)return}else if(n===`bendahara`&&l===`admin`&&o.user_id!==t.id)return;let u=O(o),f=o.status===`Menunggu Verifikasi`?T(o):E(o);r.push({ts:s,title:`Pembayaran Kas ${o.periode} · ${c}`,meta:`${v(f)} · ${u}`,tagClass:C(u)})}),(n===`admin`||n===`bendahara`)&&l.transaksiKas.forEach(t=>{let a=t.created_at||`${t.tanggal}T08:00:00Z`;if(t.tanggal!==e&&d(new Date(a))!==e)return;let o=t.dicatat_oleh||t.pj_id,s=i[o]?.role;(n!==`bendahara`||s!==`admin`)&&r.push({ts:a,title:`${t.jenis}: ${t.kategori}`,meta:`${t.keterangan} · ${v(t.nominal)}`,tagClass:C(t.jenis)})}),r.sort((e,t)=>new Date(t.ts)-new Date(e.ts)).slice(0,8)}function ye(){let e=l.currentUser,t=l.pengaturan||{},n=Number(t.pertemuan_berjalan??0),r=Math.max(1,Number(t.total_pertemuan_semester||14)),s=Number(t.semester_aktif||3),c=Math.min(100,Math.round(n/r*100)),u=2*Math.PI*50,d=u-c/100*u,f=l.iuranKas.filter(t=>t.user_id===e.id&&D(t)>0),m=f.reduce((e,t)=>e+D(t),0),h=l.iuranKas.filter(e=>D(e)>0),g=h.reduce((e,t)=>e+D(t),0),_=l.transaksiKas.filter(e=>e.jenis===`Pemasukan`).reduce((e,t)=>e+Number(t.nominal||0),0),b=l.transaksiKas.filter(e=>e.jenis===`Pengeluaran`).reduce((e,t)=>e+Number(t.nominal||0),0),x=_-b,S=Math.max(1,_,b,x),C=a(e.role)?l.absensi.filter(t=>t.user_id===e.id):l.absensi,w=C.filter(e=>e.status_kehadiran===`Hadir`).length,T=C.filter(e=>e.status_kehadiran===`Izin`).length,E=C.filter(e=>e.status_kehadiran===`Sakit`).length,O=C.filter(e=>e.status_kehadiran===`Alpha`||e.status_kehadiran===`Belum Absen!`).length,k=Math.max(1,w+T+E+O),A=[{label:`Hadir`,count:w,color:`#22c55e`},{label:`Izin`,count:T,color:`#00d4ff`},{label:`Sakit`,count:E,color:`#ff7b00`},{label:`Alpha / Belum`,count:O,color:`#ef4444`}],j=2*Math.PI*52,M=0,N=w+T+E+O===0?`<circle cx="74" cy="74" r="52" fill="none" stroke="var(--track-ring)" stroke-width="18"></circle>`:A.map(e=>{let t=e.count/k*j,n=`<circle cx="74" cy="74" r="52" fill="none" stroke="${e.color}" stroke-width="18" stroke-dasharray="${t} ${j-t}" stroke-dashoffset="${-M}" transform="rotate(-90 74 74)"></circle>`;return M+=t,n}).join(``),P=ve(),F=l.sesiAbsensi.filter(e=>e.is_active&&new Date(e.batas_waktu).getTime()>Date.now()),ee=F.length,te=F.map(e=>`${e.mata_kuliah||`Mata Kuliah`}${e.pertemuan_ke?` (Pert. ${e.pertemuan_ke})`:``}`),I=e.role===`pj_matkul`?Array.from(new Set(l.sesiAbsensi.filter(t=>t.pj_matkul_id===e.id||t.pj_matkul_nama===e.nama_lengkap||t.pj_id===e.id||t.pj_nama===e.nama_lengkap).map(e=>e.mata_kuliah).filter(Boolean))):[];return`
    <div class="page-header">
      <div>
        <span class="meta-line">Aktivitas Kelas RS · Pusat Absensi &amp; Kas Kelas ${y(t.nama_kelas||`R3S`)}</span>
        <h2>
          Dashboard ${y(i[e.role]||e.role)}
          ${e.role===`pj_matkul`?`<span class="status-tag tag-pj-matkul" style="margin-left:8px;vertical-align:middle;">Penanda PJ Mata Kuliah</span>`:``}
        </h2>
        ${e.role===`pj_matkul`?`<div class="meta-line" style="margin-top:4px;color:var(--pj-matkul-text);">
                Anda ditandai sebagai <strong>Penanggung Jawab Mata Kuliah</strong>${I.length?` (${y(I.join(`, `))})`:``}.
              </div>`:``}
      </div>
      <span class="meta-line tabular-nums">Pembaruan catatan harian WIB: ${y(l.currentWibDateKey)}</span>
    </div>

    <div class="grid-kpi">
      <div class="card glass-panel">
        <span class="meta-line">Pertemuan Berjalan</span>
        <div class="kpi-value">${n}/${r}</div>
        <div class="kpi-sub">Progres Semester ${s} (${c}%)</div>
      </div>

      <div class="card glass-panel">
        <span class="meta-line">${a(e.role)?`Sisa Tunggakan Kas Anda`:`Total Piutang Kas Kelas`}</span>
        <div class="kpi-value">${v(a(e.role)?m:g)}</div>
        <div class="kpi-sub tabular-nums">${a(e.role)?`${f.length} periode belum lunas`:`${h.length} tagihan belum lunas`}</div>
      </div>

      <div class="card glass-panel">
        <span class="meta-line">Saldo Kas Umum Kelas</span>
        <div class="kpi-value text-cyan">${v(x)}</div>
        <div class="kpi-sub">Transparansi pemasukan &amp; pengeluaran</div>
      </div>

      <div class="card glass-panel">
        <span class="meta-line">Sesi Absensi Aktif</span>
        <div class="kpi-value">${ee} Mata Kuliah</div>
        <div class="kpi-sub" style="color:var(--accent-cyan);font-weight:600;margin-top:6px;">
          ${te.length>0?`Mata Kuliah: ${y(te.join(`, `))}`:`Belum ada mata kuliah yang sedang berlangsung`}
        </div>
        <div class="kpi-sub" style="margin-top:4px;">Total anggota terdaftar: ${l.profiles.filter(e=>o(e.role)).length} mahasiswa</div>
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
          <span class="status-tag tag-warning tabular-nums">${n}/${r} Pertemuan</span>
        </div>
        <div class="ring-widget-wrap">
          <svg class="semester-ring-svg" viewBox="0 0 132 132" aria-label="Diagram progres semester">
            <circle cx="66" cy="66" r="50" fill="none" stroke="var(--track-ring)" stroke-width="12"></circle>
            <circle
              cx="66"
              cy="66"
              r="50"
              fill="none"
              stroke="var(--amber-semester)"
              stroke-width="12"
              stroke-linecap="round"
              stroke-dasharray="${u}"
              stroke-dashoffset="${d}"
              transform="rotate(-90 66 66)"
            ></circle>
            <text x="66" y="60" text-anchor="middle" fill="var(--text-muted)" font-size="11" font-family="DM Sans">Semester</text>
            <text x="66" y="84" text-anchor="middle" fill="var(--text-primary)" font-size="26" font-weight="700" font-family="JetBrains Mono">${s}</text>
          </svg>
          <div class="legend-list">
            <div class="legend-row">
              <span class="legend-label">Pertemuan Terlaksana</span>
              <strong class="tabular-nums">${n} Pertemuan</strong>
            </div>
            <div class="legend-row">
              <span class="legend-label">Target Semester</span>
              <strong class="tabular-nums">${r} Pertemuan</strong>
            </div>
            <div class="legend-row">
              <span class="legend-label">Persentase Berjalan</span>
              <strong class="tabular-nums text-warning">${c}%</strong>
            </div>
          </div>
        </div>
      </div>

      <!-- Diagram Persentase Kehadiran -->
      <div class="card glass-panel">
        <div class="card-header">
          <div>
            <h3>Diagram Persentase Kehadiran</h3>
            <span class="meta-line">${a(e.role)?`Rekap pribadi Anda`:`Akumulasi seluruh mahasiswa`}</span>
          </div>
          <span class="status-tag tag-info tabular-nums">${w+T+E+O} Catatan</span>
        </div>
        <div class="ring-widget-wrap">
          <svg class="donut-svg" viewBox="0 0 148 148" aria-label="Diagram persentase kehadiran">
            ${N}
            <text x="74" y="70" text-anchor="middle" fill="var(--text-muted)" font-size="11" font-family="DM Sans">Hadir</text>
            <text x="74" y="90" text-anchor="middle" fill="var(--text-primary)" font-size="20" font-weight="700" font-family="JetBrains Mono">
              ${w+T+E+O===0?`0%`:`${Math.round(w/k*100)}%`}
            </text>
          </svg>
          <div class="legend-list">
            ${A.map(e=>`
              <div class="legend-row">
                <span class="legend-label">
                  <span class="legend-swatch" style="background:${e.color}"></span>
                  ${e.label}
                </span>
                <strong class="tabular-nums">${e.count} (${w+T+E+O===0?0:Math.round(e.count/k*100)}%)</strong>
              </div>
            `).join(``)}
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
          <strong class="tabular-nums text-cyan">${v(x)}</strong>
        </div>
        <div class="cash-bars">
          <div class="cash-bar-item">
            <div class="cash-bar-top">
              <span>Total Pemasukan Kas</span>
              <strong class="tabular-nums text-success">${v(_)}</strong>
            </div>
            <div class="cash-bar-track">
              <div class="cash-bar-fill" style="width:${Math.round(_/S*100)}%; background:#22c55e;"></div>
            </div>
          </div>

          <div class="cash-bar-item">
            <div class="cash-bar-top">
              <span>Total Pengeluaran Kas</span>
              <strong class="tabular-nums text-danger">${v(b)}</strong>
            </div>
            <div class="cash-bar-track">
              <div class="cash-bar-fill" style="width:${Math.round(b/S*100)}%; background:#ef4444;"></div>
            </div>
          </div>

          <div class="cash-bar-item">
            <div class="cash-bar-top">
              <span>Saldo Bersih Tersedia</span>
              <strong class="tabular-nums text-cyan">${v(x)}</strong>
            </div>
            <div class="cash-bar-track">
              <div class="cash-bar-fill" style="width:${Math.max(0,Math.round(x/S*100))}%; background:linear-gradient(90deg,#00d4ff,#0077ff);"></div>
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
          <span class="meta-line tabular-nums">${P.length} aktivitas</span>
        </div>
        <div class="activity-list activity-scroll-5">
          ${P.length===0?`<p class="meta-line">Belum ada aktivitas tercatat hari ini (WIB).</p>`:P.map(e=>`
              <div class="activity-item">
                <div>
                  <div class="activity-title">${y(e.title)}</div>
                  <div class="meta-line">${y(e.meta)}</div>
                </div>
                <div class="activity-time">${y(p(e.ts).split(`·`)[1]||``)}</div>
              </div>
            `).join(``)}
        </div>
      </div>
    </div>

    ${e.role===`admin`||e.role===`ketua`?Nt():``}
    ${e.role===`admin`||e.role===`bendahara`?Pt():``}
  `}function be(){document.querySelectorAll(`.btn-dash-nav`).forEach(e=>{e.addEventListener(`click`,()=>{l.activeTab=e.getAttribute(`data-tab`),B(),V()})}),Ft()}function H(){let e=document.getElementById(`camera-video`),t=document.getElementById(`camera-orientation-label`),n=document.getElementById(`camera-orientation-controls`),r=document.getElementById(`btn-flip-camera`),i=document.getElementById(`btn-switch-camera`),a=l.cameraMode!==`daring`||l.daringUseCamera;n&&n.classList.toggle(`hidden`,!a),e&&e.classList.toggle(`cam-flipped`,!!l.cameraFlipHorizontal);let o=l.cameraFacingMode===`environment`?`Belakang`:`Depan`,s=l.cameraFlipHorizontal?`Dibalik Horizontal`:`Normal (Tanpa Pencerminan)`;t&&(t.textContent=`Kamera ${o} · ${s}`),r&&(r.textContent=l.cameraFlipHorizontal?`Kembalikan Normal`:`Balik Horizontal (Jika Terbalik)`),i&&(i.textContent=l.cameraFacingMode===`environment`?`Pakai Kamera Depan`:`Ganti Kamera (Depan/Belakang)`)}function xe(e,t){l.cameraMode=e,l.cameraContext=t,l.cameraFacingMode=`user`,l.cameraFlipHorizontal=!1,l.daringUseCamera=!1,l.daringImageFile=null,l.gpsCoords=null,l.capturedBlob=null,l.capturedPreviewUrl=``;let n=document.getElementById(`modal-camera`),r=document.getElementById(`modal-camera-title`),i=document.getElementById(`modal-camera-subtitle`),a=document.getElementById(`camera-video`),o=document.getElementById(`captured-preview`),s=document.getElementById(`daring-stage-placeholder`),c=document.getElementById(`camera-permission-warning`),u=document.getElementById(`camera-permission-warning-desc`),d=document.getElementById(`camera-gps-status`),f=e===`daring`;r.textContent=e===`manual_pj`?`Bukti Kamera Penanggung Jawab (Anti-Kecurangan)`:f?`Absen Daring Waktu Nyata · ${t.mata_kuliah}`:`Absensi Langsung · ${t.mata_kuliah}`,i.textContent=e===`manual_pj`?`Mengambil foto wajah Penanggung Jawab (${l.currentUser.nama_lengkap}) + GPS untuk absen manual ${t.studentName}.`:f?`Kirim bukti foto saat sedang daring dan pastikan lokasi GPS tetap menyala · Dosen: ${t.dosen} · Pertemuan ke-${t.pertemuan_ke}`:`Orientasi Kamera Normal (Tanpa Pencerminan) · Dosen: ${t.dosen} · Pertemuan ke-${t.pertemuan_ke}`;let p=document.getElementById(`camera-daring-panel`),m=document.getElementById(`daring-bukti-file`),h=document.getElementById(`btn-daring-use-camera`);if(p){p.classList.toggle(`hidden`,!f);let e=document.getElementById(`daring-catatan`);e&&(e.value=``),m&&(m.value=``),h&&(h.textContent=`Atau Ambil Dari Kamera`)}a.classList.toggle(`hidden`,f),o.classList.add(`hidden`),s&&s.classList.toggle(`hidden`,!f),c.classList.add(`hidden`),u&&(u.innerHTML=f?`Sistem mendeteksi akses lokasi GPS ditolak atau belum aktif. Saat absen daring, <strong>lokasi GPS wajib tetap menyala</strong>. Status absensi otomatis dicatat <strong>Belum Absen!</strong>.`:`Sistem mendeteksi akses kamera atau lokasi tidak diizinkan. Status absensi akan otomatis tercatat sebagai <strong>Belum Absen!</strong>.`),document.getElementById(`btn-capture-photo`).classList.toggle(`hidden`,f),document.getElementById(`btn-retake-photo`).classList.add(`hidden`),document.getElementById(`btn-submit-attendance`).classList.add(`hidden`),d.textContent=`Meminta izin & koordinat GPS...`,H(),n.classList.remove(`hidden`),U({needCamera:!f})}async function U(e={needCamera:!0}){let t=e?.needCamera!==!1,n=document.getElementById(`camera-video`),r=document.getElementById(`camera-permission-warning`),i=document.getElementById(`camera-gps-status`);Oe();let a=!t;if(t)try{if(!navigator.mediaDevices?.getUserMedia)throw Error(`Browser tidak mendukung akses kamera.`);let e=l.cameraFacingMode||`user`;try{l.cameraStream=await navigator.mediaDevices.getUserMedia({video:{facingMode:e,width:{ideal:960},height:{ideal:720}},audio:!1})}catch{l.cameraStream=await navigator.mediaDevices.getUserMedia({video:{width:{ideal:960},height:{ideal:720}},audio:!1}),l.cameraFacingMode=`user`}n.srcObject=l.cameraStream,a=!0,H()}catch{a=!1}let o=!1,s=e=>{l.gpsCoords={lat:e.latitude,lng:e.longitude,accuracy:e.accuracy??null};let t=l.gpsCoords.accuracy==null?``:` (±${Math.round(l.gpsCoords.accuracy)}m)`;i.textContent=`${l.gpsCoords.lat.toFixed(6)}, ${l.gpsCoords.lng.toFixed(6)}${t}`};try{s((await new Promise((e,t)=>{navigator.geolocation?navigator.geolocation.getCurrentPosition(e,t,{enableHighAccuracy:!0,timeout:1e4,maximumAge:0}):t(Error(`GPS tidak didukung`))})).coords),o=!0,navigator.geolocation.watchPosition&&(l.gpsWatchId=navigator.geolocation.watchPosition(e=>s(e.coords),()=>{},{enableHighAccuracy:!0,maximumAge:5e3}))}catch{o=!1,i.textContent=`Akses lokasi ditolak / tidak tersedia`}!a||!o?(r.classList.remove(`hidden`),document.getElementById(`btn-capture-photo`).disabled=!0,S(t?`Izin kamera atau lokasi GPS ditolak! Status absensi otomatis dicatat "Belum Absen!".`:`Lokasi GPS wajib menyala saat absen daring! Status absensi dicatat "Belum Absen!".`,`danger`),(l.cameraMode===`self`||l.cameraMode===`daring`)&&l.cameraContext?.sesiId&&await Se(l.cameraContext.sesiId)):(document.getElementById(`btn-capture-photo`).disabled=!1,l.cameraMode===`daring`&&l.daringImageFile&&!l.daringUseCamera&&await Te(l.daringImageFile))}async function Se(e){try{await R.upsert(`absensi`,{sesi_id:e,user_id:l.currentUser.id,status_kehadiran:`Belum Absen!`,status_verifikasi:`Belum Absen!`,foto_url:``,latitude:l.gpsCoords?.lat??null,longitude:l.gpsCoords?.lng??null,waktu_kirim:new Date().toISOString(),pj_id:null,pj_nama:``,is_manual:!1,catatan:`Izin kamera atau GPS ditolak oleh perangkat pengguna.`},`sesi_id,user_id`),await R.loadAll(),V()}catch(e){console.error(e)}}function Ce(e,t,n){let r=document.getElementById(`watermark-canvas`),i=document.getElementById(`captured-preview`),a=document.getElementById(`camera-video`),o=document.getElementById(`daring-stage-placeholder`),s=Math.min(1,1280/Math.max(1,t,n)),c=Math.max(320,Math.round(t*s)),u=Math.max(240,Math.round(n*s));r.width=c,r.height=u;let d=r.getContext(`2d`),p=(l.cameraMode!==`daring`||l.daringUseCamera)&&l.cameraFlipHorizontal;d.setTransform(1,0,0,1,0,0),p?(d.save(),d.translate(c,0),d.scale(-1,1),d.drawImage(e,0,0,c,u),d.restore()):d.drawImage(e,0,0,c,u),d.setTransform(1,0,0,1,0,0);let m=Math.max(94,Math.round(u*.22));d.fillStyle=`rgba(3, 19, 43, 0.84)`,d.fillRect(0,u-m,c,m),d.strokeStyle=`rgba(0, 212, 255, 0.75)`,d.lineWidth=2,d.beginPath(),d.moveTo(0,u-m),d.lineTo(c,u-m),d.stroke();let h=Math.max(14,Math.round(c*.024)),g=Math.round(c*.03),_=u-m+h+10,v=l.currentUser;d.fillStyle=`#00d4ff`,d.font=`700 ${h}px "Plus Jakarta Sans", sans-serif`;let y=document.getElementById(`daring-platform`)?.value||`Daring`,b=l.cameraMode===`manual_pj`?`Kelas R3S | PJ: ${l.cameraContext.pjNama||v.nama_lengkap} -> ${l.cameraContext.studentName} (${l.cameraContext.statusKehadiran})`:l.cameraMode===`daring`?`ABSENSI WAKTU NYATA DARING (${y}) | ${v.nama_lengkap} (${v.npm})`:`Kelas R3S | ${v.nama_lengkap} (${v.npm})`;d.fillText(b,g,_),d.fillStyle=`#f0f8ff`,d.font=`500 ${Math.round(h*.9)}px "JetBrains Mono", monospace`,d.fillText(f(new Date),g,_+h*1.45),d.fillText(`GPS: ${l.gpsCoords.lat.toFixed(6)}, ${l.gpsCoords.lng.toFixed(6)}`,g,_+h*2.8),r.toBlob(e=>{e&&(l.capturedBlob=e,l.capturedPreviewUrl=URL.createObjectURL(e),i.src=l.capturedPreviewUrl,a.classList.add(`hidden`),o&&o.classList.add(`hidden`),i.classList.remove(`hidden`),document.getElementById(`btn-capture-photo`).classList.add(`hidden`),document.getElementById(`btn-retake-photo`).classList.remove(`hidden`),document.getElementById(`btn-submit-attendance`).classList.remove(`hidden`))},`image/jpeg`,.78)}function we(){let e=document.getElementById(`camera-video`);!l.cameraStream||!l.gpsCoords?S(`Kamera dan GPS aktif wajib tersedia sebelum mengambil foto.`,`danger`):Ce(e,e.videoWidth||800,e.videoHeight||600)}async function Te(e){if(!e)return;if(l.daringImageFile=e,!l.gpsCoords){S(`Menunggu kunci lokasi GPS aktif sebelum menempelkan stempel waktu bukti daring...`,`warning`);return}let t=URL.createObjectURL(e),n=new Image;n.onload=()=>{Ce(n,n.naturalWidth||960,n.naturalHeight||720),URL.revokeObjectURL(t)},n.onerror=()=>{URL.revokeObjectURL(t),S(`Gagal membaca berkas gambar bukti daring.`,`danger`)},n.src=t}function Ee(){l.capturedBlob=null;let e=document.getElementById(`camera-video`),t=document.getElementById(`captured-preview`),n=document.getElementById(`daring-stage-placeholder`),r=l.cameraMode===`daring`&&!l.daringUseCamera;if(t.classList.add(`hidden`),document.getElementById(`btn-retake-photo`).classList.add(`hidden`),document.getElementById(`btn-submit-attendance`).classList.add(`hidden`),r){e.classList.add(`hidden`),n&&n.classList.remove(`hidden`),document.getElementById(`btn-capture-photo`).classList.add(`hidden`);let t=document.getElementById(`daring-bukti-file`);t&&(t.value=``),l.daringImageFile=null}else n&&n.classList.add(`hidden`),e.classList.remove(`hidden`),document.getElementById(`btn-capture-photo`).classList.remove(`hidden`)}async function De(){if(!l.capturedBlob||!l.gpsCoords){S(`Ambil foto bukti terlebih dahulu.`,`warning`);return}let e=document.getElementById(`btn-submit-attendance`);e.disabled=!0,e.textContent=`Mengirim...`;try{let e=await R.uploadFile(l.capturedBlob,l.cameraMode===`manual_pj`?`absen_manual_pj`:`absen_mahasiswa`);if(l.cameraMode===`self`||l.cameraMode===`daring`){let t=l.sesiAbsensi.find(e=>e.id===l.cameraContext.sesiId),n=l.cameraMode===`daring`,r=document.getElementById(`daring-platform`)?.value||`Zoom Meeting`,i=document.getElementById(`daring-catatan`)?.value.trim()||``,a=n?`[Daring Real-Time · ${r}]${i?` `+i:``}`:``;await R.upsert(`absensi`,{sesi_id:l.cameraContext.sesiId,user_id:l.currentUser.id,status_kehadiran:`Hadir`,status_verifikasi:`Menunggu`,foto_url:e,latitude:l.gpsCoords.lat,longitude:l.gpsCoords.lng,waktu_kirim:new Date().toISOString(),pj_id:t?.pj_id||null,pj_nama:t?.pj_nama||``,mode_absen:n?`Daring`:`Luring`,is_manual:!1,catatan:a},`sesi_id,user_id`);let o=t?.mata_kuliah||l.cameraContext.mata_kuliah||`Perkuliahan`,s=t?.pertemuan_ke||l.cameraContext.pertemuan_ke||`-`,c=[{user_id:l.currentUser.id,judul:`Absensi Berhasil Dikirim`,pesan:`Absensi ${n?`Daring (${r})`:`Luring Kamera + GPS`} untuk ${o} (Pertemuan ke-${s}) telah dikirim. Menunggu persetujuan Ketua/Admin.`,tipe:`info`}];k([`ketua`,`admin`]).forEach(e=>{e!==l.currentUser.id&&c.push({user_id:e,judul:`Absensi Mahasiswa Masuk`,pesan:`${l.currentUser.nama_lengkap} (${l.currentUser.npm}) mengirim absensi ${n?`Daring`:`Luring`} · ${o} (Pertemuan ke-${s}).`,tipe:`info`})}),await A(c),S(n?`Absen Daring Waktu Nyata (${r}) terkirim! Menunggu persetujuan Ketua/Admin maksimal 1x24 jam.`:`Absensi terkirim! Status: Menunggu persetujuan Ketua/Admin maksimal 1x24 jam. Jika belum berubah, silakan buat laporan di Pusat Informasi.`,`success`)}else{let t=l.cameraContext;await R.upsert(`absensi`,{sesi_id:t.sesiId,user_id:t.studentId,status_kehadiran:t.statusKehadiran,status_verifikasi:`Disetujui`,foto_url:e,latitude:l.gpsCoords.lat,longitude:l.gpsCoords.lng,waktu_kirim:new Date().toISOString(),pj_id:t.pjId||l.currentUser.id,pj_nama:t.pjNama||l.currentUser.nama_lengkap,dicatat_oleh:l.currentUser.id,is_manual:!0,catatan:t.catatan||`Dicatat manual oleh Penanggung Jawab dengan foto & GPS.`},`sesi_id,user_id`),S(`Absensi manual untuk ${t.studentName} berhasil disimpan!`,`success`)}await R.loadAll(),Q(`modal-camera`),B(),V()}catch(e){S(e.message||`Gagal mengirim absensi.`,`danger`)}finally{e.disabled=!1,e.textContent=`Kirim Absensi Sekarang`}}function Oe(){l.cameraStream&&=(l.cameraStream.getTracks().forEach(e=>e.stop()),null),l.gpsWatchId!=null&&navigator.geolocation?.clearWatch&&(navigator.geolocation.clearWatch(l.gpsWatchId),l.gpsWatchId=null)}function ke(e,t){let n=.0035;return`https://www.openstreetmap.org/export/embed.html?bbox=${(Number(t)-n).toFixed(6)}%2C${(Number(e)-n).toFixed(6)}%2C${(Number(t)+n).toFixed(6)}%2C${(Number(e)+n).toFixed(6)}&layer=mapnik&marker=${Number(e).toFixed(6)}%2C${Number(t).toFixed(6)}`}function Ae(e){if(e?.latitude==null||e?.longitude==null)return`<span class="meta-line">Tanpa koordinat GPS</span>`;let t=Number(e.latitude).toFixed(5),n=Number(e.longitude).toFixed(5);return`
    <button type="button" class="gps-link-btn btn-open-gps-map" data-absen-id="${e.id}" title="Klik untuk melihat posisi mahasiswa di peta">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
      <span>${t}, ${n}</span>
    </button>
  `}function je(e){let t=l.absensi.find(t=>t.id===e);if(!t||t.latitude==null||t.longitude==null){S(`Koordinat GPS tidak tersedia pada catatan ini.`,`warning`);return}let n=l.profiles.find(e=>e.id===t.user_id),r=l.sesiAbsensi.find(e=>e.id===t.sesi_id),i=Number(t.latitude),a=Number(t.longitude),o=`${i.toFixed(6)}, ${a.toFixed(6)}`;document.getElementById(`gps-map-title`).textContent=`Posisi GPS · ${n?.nama_lengkap||`Mahasiswa`}`,document.getElementById(`gps-map-subtitle`).textContent=`${n?.npm||`-`} · ${r?.mata_kuliah||`Perkuliahan`} · ${p(t.waktu_kirim)}`,document.getElementById(`gps-map-coords`).textContent=o,document.getElementById(`gps-map-iframe`).src=ke(i,a),document.getElementById(`gps-map-gmaps-link`).href=`https://www.google.com/maps?q=${i},${a}`,document.getElementById(`modal-gps-map`).classList.remove(`hidden`)}function Me(){document.querySelectorAll(`.btn-open-gps-map`).forEach(e=>{e.addEventListener(`click`,()=>{je(e.getAttribute(`data-absen-id`))})})}function Ne(e){return e?e.mode_absen===`Daring`||String(e.catatan||``).includes(`[Daring Real-Time`):!1}function Pe(e,t){let n=l.sesiAbsensi.find(e=>e.id===t),r=l.absensi.find(t=>t.id===e),i=r?l.profiles.find(e=>e.id===r.user_id):l.currentUser;document.getElementById(`detail-absen-subtitle`).textContent=n?`${n.mata_kuliah} · Pertemuan ke-${n.pertemuan_ke}`:`Detail Kehadiran`;let a=r?.latitude!=null&&r?.longitude!=null,o=a?`${Number(r.latitude).toFixed(6)}, ${Number(r.longitude).toFixed(6)}`:`Tidak tersedia`,s=a?`<a href="https://www.google.com/maps?q=${r.latitude},${r.longitude}" target="_blank" rel="noopener noreferrer">Buka di Google Maps</a>`:``,c=r?.is_manual?`Manual oleh PJ`:Ne(r)?`Absensi Waktu Nyata Daring`:`Absensi Kamera + GPS (Luring)`;r?.pj_nama||n?.pj_nama,document.getElementById(`detail-absen-body`).innerHTML=`
    ${r?.foto_url?`<img src="${y(r.foto_url)}" class="lightbox-img" style="width:100%;max-height:300px;object-fit:contain;" alt="Foto Penanda Waktu Absensi" />`:`<div class="payment-channel-box text-center"><span class="meta-line">Tidak ada lampiran foto pada catatan ini.</span></div>`}
    <div class="detail-kv-grid">
      <div class="detail-kv-item">
        <span class="meta-line">Mahasiswa</span>
        <strong>${y(i?.nama_lengkap||`-`)} (${y(i?.npm||`-`)})</strong>
      </div>
      <div class="detail-kv-item">
        <span class="meta-line">Dosen Pengampu</span>
        <strong>${y(n?.dosen||`-`)}</strong>
      </div>
      <div class="detail-kv-item">
        <span class="meta-line">Waktu Kirim (WIB)</span>
        <strong class="tabular-nums">${y(p(r?.waktu_kirim))}</strong>
      </div>
      <div class="detail-kv-item">
        <span class="meta-line">Mode Kehadiran</span>
        <strong>${y(c)}</strong>
      </div>
      <div class="detail-kv-item">
        <span class="meta-line">Koordinat GPS</span>
        <strong class="tabular-nums">${y(o)}</strong>
        <div>${s}</div>
      </div>
      <div class="detail-kv-item">
        <span class="meta-line">Status Kehadiran &amp; Verifikasi</span>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px;">
          <span class="status-tag ${C(r?.status_kehadiran)}">${y(r?.status_kehadiran||`Belum Absen!`)}</span>
          <span class="status-tag ${C(r?.status_verifikasi)}">${y(r?.status_verifikasi||`-`)}</span>
        </div>
      </div>
      <div class="detail-kv-item" style="grid-column:1 / -1;">
        <span class="meta-line">Penanggung Jawab (PJ)</span>
        <strong>PJ Absensi: ${y(r?.pj_nama||Yt(`ketua`).nama_lengkap)}</strong>
        <div class="meta-line" style="margin-top:2px;">
          PJ Mata Kuliah: <strong>${y(W(n))}</strong> · ${r?.pj_nama?`Diverifikasi / Dicatat oleh PJ Absensi`:`Menunggu Verifikasi PJ Absensi`}
        </div>
      </div>
    </div>
    ${a?`<div class="gps-inline-map">
            <iframe
              src="${y(ke(r.latitude,r.longitude))}"
              title="Posisi GPS Mahasiswa"
              loading="lazy"
            ></iframe>
          </div>`:``}
    ${r?.catatan?`<div class="detail-kv-item" style="margin-top:12px;"><span class="meta-line">Catatan</span><p>${y(r.catatan)}</p></div>`:``}
  `,document.getElementById(`modal-detail-absen`).classList.remove(`hidden`)}function Fe(){let e=l.currentUser,t=Date.now(),n=[...l.sesiAbsensi].sort((e,t)=>new Date(t.created_at)-new Date(e.created_at)),r=Object.fromEntries(l.sesiAbsensi.map(e=>[e.id,e])),i=l.absensi.filter(t=>t.user_id===e.id),a=(l.filters.matkulSearch||``).trim().toLowerCase(),o=l.filters.matkulStatus||`Semua`,s=n.filter(e=>{let n=e.is_active&&new Date(e.batas_waktu).getTime()>t;if(o===`Dibuka`&&!n||o===`Ditutup`&&n)return!1;if(!a)return!0;let r=W(e);return`${e.mata_kuliah||``} ${e.dosen||``} ${r} ${e.mode_kuliah||``} pertemuan ${e.pertemuan_ke||``}`.toLowerCase().includes(a)}),c=i.filter(e=>{if(!a)return!0;let t=r[e.sesi_id],n=e.pj_nama||t?.pj_nama||``;return`${t?.mata_kuliah||``} ${t?.dosen||``} ${n} ${e.status_kehadiran||``} ${e.status_verifikasi||``} pertemuan ${t?.pertemuan_ke||``}`.toLowerCase().includes(a)});return`
    <div class="page-header">
      <div>
        <span class="meta-line">Kamera Langsung + GPS + Absen Daring Waktu Nyata · Stempel Waktu WIB</span>
        <h2>Absensi Perkuliahan Waktu Nyata</h2>
      </div>
    </div>

    <div class="card glass-panel" style="margin-bottom:18px;padding:14px 16px;">
      <div class="toolbar-filters" style="margin-bottom:0;">
        <input
          type="search"
          id="filter-mahasiswa-matkul-search"
          placeholder="Cari mata kuliah, dosen pengampu, PJ matkul, mode, atau pertemuan..."
          value="${y(l.filters.matkulSearch||``)}"
        />
        <select id="filter-mahasiswa-matkul-status" aria-label="Filter status sesi">
          <option value="Semua" ${o===`Semua`?`selected`:``}>Semua Status Sesi</option>
          <option value="Dibuka" ${o===`Dibuka`?`selected`:``}>Sesi Dibuka</option>
          <option value="Ditutup" ${o===`Ditutup`?`selected`:``}>Sesi Ditutup</option>
        </select>
        <span class="status-tag tag-info tabular-nums">${s.length}/${n.length} Sesi</span>
      </div>
    </div>

    <div class="sessions-grid" style="margin-bottom:20px;">
      ${n.length===0?`<div class="card glass-panel"><p class="meta-line">Belum ada sesi absensi dibuka oleh Ketua Kelas atau Admin.</p></div>`:s.length===0?`<div class="card glass-panel"><p class="meta-line">Tidak ada mata kuliah yang cocok dengan pencarian "${y(l.filters.matkulSearch||o)}".</p></div>`:s.map(n=>{let r=n.is_active&&new Date(n.batas_waktu).getTime()>t,i=l.absensi.find(t=>t.sesi_id===n.id&&t.user_id===e.id),a=r&&(!i||i.status_verifikasi===`Belum Absen!`||i.status_verifikasi===`Ditolak`),o=n.mode_kuliah||`Luring`;return i?.pj_nama||n.pj_nama,`
                  <div class="session-card ${r?``:`locked`}">
                    <div>
                      <div class="form-row-between" style="margin-bottom:8px;gap:6px;flex-wrap:wrap;">
                        <span class="meta-line">Pertemuan ke-${n.pertemuan_ke} · ${y(o)}</span>
                        <span class="status-tag ${r?`tag-success`:`tag-danger`}">
                          ${r?`Sesi Dibuka`:`Sesi Ditutup`}
                        </span>
                      </div>
                      <h3>${y(n.mata_kuliah)}</h3>
                      <p class="meta-line" style="margin-top:4px;">Dosen: ${y(n.dosen)}</p>
                      <p class="meta-line" style="margin-top:2px;">PJ Mata Kuliah: <strong>${y(W(n))}</strong></p>
                      ${n.link_daring?`<div class="daring-link-callout">
                              <div class="daring-link-meta">
                                <span class="meta-line">Tautan Perkuliahan Daring (${y(o)})</span>
                                <span class="daring-link-url tabular-nums">${y(n.link_daring)}</span>
                              </div>
                              <a href="${y(n.link_daring)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">Buka Tautan Daring</a>
                            </div>`:``}
                    </div>

                    <div>
                      <span class="meta-line">Sisa Waktu Absensi</span>
                      <div class="session-countdown" data-deadline-iso="${y(n.batas_waktu)}">
                        ${r?`Menghitung...`:`Sesi Ditutup`}
                      </div>
                    </div>

                    ${i?`<div>
                            <span class="meta-line">Status Anda:</span>
                            <div style="display:flex;gap:8px;margin-top:4px;flex-wrap:wrap;">
                              <span class="status-tag ${C(i.status_kehadiran)}">${y(i.status_kehadiran)}</span>
                              <span class="status-tag ${C(i.status_verifikasi)}">${y(i.status_verifikasi)}</span>
                              ${Ne(i)?`<span class="status-tag tag-info">Daring Waktu Nyata</span>`:``}
                            </div>
                          </div>`:``}

                    <div class="session-actions">
                      ${a?`
                            ${o===`Daring`?``:`<button type="button" class="btn btn-primary btn-sm btn-open-absen" data-sesi-id="${n.id}">
                                    Absen Kamera + GPS
                                  </button>`}
                            <button type="button" class="btn ${o===`Daring`?`btn-primary`:`btn-coral`} btn-sm btn-open-absen-daring" data-sesi-id="${n.id}">
                              Absen Daring Waktu Nyata
                            </button>
                          `:`<button type="button" class="btn btn-secondary btn-sm" disabled>
                              ${i&&i.status_verifikasi!==`Belum Absen!`?`Sudah Mengirim Absen`:`Belum Waktunya / Tutup`}
                            </button>`}
                      ${i?`<button type="button" class="btn btn-secondary btn-sm btn-detail-absen" data-absen-id="${i.id}" data-sesi-id="${n.id}">
                              Detail
                            </button>`:``}
                    </div>
                  </div>
                `}).join(``)}
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
            ${c.length===0?`<tr><td colspan="7" class="text-center">${i.length===0?`Belum ada catatan kehadiran tersimpan.`:`Tidak ada riwayat mata kuliah yang cocok dengan pencarian.`}</td></tr>`:c.map(e=>{let t=r[e.sesi_id],n=e.pj_nama||t?.pj_nama||`-`,i=e.is_manual?`Manual PJ`:Ne(e)?`Daring Real-Time`:`Luring Kamera+GPS`;return`
                        <tr>
                          <td>
                            <strong>${y(t?.mata_kuliah||`-`)}</strong>
                            <div class="meta-line">Pertemuan ke-${t?.pertemuan_ke||`-`}</div>
                          </td>
                          <td class="tabular-nums">${y(p(e.waktu_kirim))}</td>
                          <td><span class="status-tag tag-info">${y(i)}</span></td>
                          <td><span class="status-tag ${C(e.status_kehadiran)}">${y(e.status_kehadiran)}</span></td>
                          <td><span class="status-tag ${C(e.status_verifikasi)}">${y(e.status_verifikasi)}</span></td>
                          <td><strong>${y(n)}</strong></td>
                          <td>
                            <button type="button" class="btn btn-secondary btn-sm btn-detail-absen" data-absen-id="${e.id}" data-sesi-id="${e.sesi_id}">
                              Detail
                            </button>
                          </td>
                        </tr>
                      `}).join(``)}
          </tbody>
        </table>
      </div>
    </div>
  `}function Ie(){document.querySelectorAll(`.btn-open-absen`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-sesi-id`),n=l.sesiAbsensi.find(e=>e.id===t);n&&xe(`self`,{sesiId:n.id,mata_kuliah:n.mata_kuliah,dosen:n.dosen,pertemuan_ke:n.pertemuan_ke})})}),document.querySelectorAll(`.btn-open-absen-daring`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-sesi-id`),n=l.sesiAbsensi.find(e=>e.id===t);n&&xe(`daring`,{sesiId:n.id,mata_kuliah:n.mata_kuliah,dosen:n.dosen,pertemuan_ke:n.pertemuan_ke})})}),u(`filter-mahasiswa-matkul-search`,e=>{l.filters.matkulSearch=e}),document.getElementById(`filter-mahasiswa-matkul-status`)?.addEventListener(`change`,e=>{l.filters.matkulStatus=e.target.value,V()}),document.querySelectorAll(`.btn-detail-absen`).forEach(e=>{e.addEventListener(`click`,()=>{Pe(e.getAttribute(`data-absen-id`),e.getAttribute(`data-sesi-id`))})})}function Le(){let e=l.currentUser,t=Object.fromEntries(l.profiles.map(e=>[e.id,e])),n=l.iuranKas.filter(t=>t.user_id===e.id),r=n.filter(e=>O(e)!==`Lunas`),i=n.filter(e=>O(e)===`Lunas`);return`
    <div class="page-header">
      <div>
        <span class="meta-line">Transparansi Keuangan Kelas R3S</span>
        <h2>Pembayaran Iuran Kas</h2>
      </div>
      <div class="card glass-panel" style="padding:12px 18px;">
        <span class="meta-line">Total Sisa Tunggakan</span>
        <strong class="kpi-value" style="font-size:1.2rem;">${v(r.reduce((e,t)=>e+D(t),0))} / ${r.length} periode</strong>
      </div>
    </div>

    <div class="card glass-panel" style="margin-bottom:20px;">
      <div class="card-header">
        <div>
          <h3>Daftar Tagihan &amp; Tunggakan Kas</h3>
          <span class="meta-line">Minimal pembayaran Rp 2.000 (atau sisa tagihan) melalui QRIS atau Transfer Bank · Mendukung pembayaran cicilan/sebagian</span>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Periode</th>
              <th>Nominal Tagihan</th>
              <th>Sudah Dibayar</th>
              <th>Sisa Tunggakan</th>
              <th>Metode</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${r.length===0?`<tr><td colspan="7" class="text-center">Tidak ada tunggakan kas saat ini.</td></tr>`:r.map(e=>{let t=O(e),n=E(e),r=D(e),i=T(e),a=t===`Ditolak`,o=t===`Belum Lunas`||t===`Sebagian`||a,s=a?`Bayar Ulang`:n>0?`Bayar Sisa (${v(r)})`:`Bayar Kas`;return`
                  <tr>
                    <td><strong>${y(e.periode)}</strong></td>
                    <td class="tabular-nums">${v(e.nominal_tagihan)}</td>
                    <td class="tabular-nums text-success">${v(n)}</td>
                    <td class="tabular-nums text-danger"><strong>${v(r)}</strong></td>
                    <td>${y(e.metode_bayar&&e.metode_bayar!==`Ditolak`?e.metode_bayar:`-`)}</td>
                    <td>
                      <span class="status-tag ${C(t)}">${y(t)}</span>
                      ${t===`Menunggu Verifikasi`&&i>0?`<div class="meta-line tabular-nums">Diajukan: ${v(i)}</div>`:``}
                    </td>
                    <td>
                      <div class="row-actions">
                        ${o?`<button type="button" class="btn btn-primary btn-sm btn-pay-iuran" data-id="${e.id}">${s}</button>`:`<span class="meta-line">Menunggu Verifikasi Bendahara</span>`}
                        ${e.bukti_url?`<button type="button" class="btn btn-secondary btn-sm btn-view-img" data-url="${y(e.bukti_url)}" data-title="Bukti Transfer ${y(e.periode)}">Lihat Bukti</button>`:``}
                      </div>
                    </td>
                  </tr>
                `}).join(``)}
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
            ${i.length===0?`<tr><td colspan="6" class="text-center">Belum ada riwayat kas lunas.</td></tr>`:i.map(e=>{let n=e.pj_nama||t[e.verified_by]?.nama_lengkap||`-`;return`
                        <tr>
                          <td>${y(e.periode)}</td>
                          <td class="tabular-nums text-success">${v(E(e))}</td>
                          <td>${y(e.metode_bayar||`-`)}</td>
                          <td class="tabular-nums">${y(p(e.tanggal_bayar))}</td>
                          <td><strong>${y(n)}</strong></td>
                          <td><span class="status-tag tag-success">Lunas</span></td>
                        </tr>
                      `}).join(``)}
          </tbody>
        </table>
      </div>
    </div>
  `}function Re(){document.querySelectorAll(`.btn-pay-iuran`).forEach(e=>{e.addEventListener(`click`,()=>{let t=l.iuranKas.find(t=>t.id===e.getAttribute(`data-id`));t&&ze(t,{previewOnly:!1,customPeriod:!1})})}),$()}function ze(e=null,t={previewOnly:!1,customPeriod:!1}){let r=l.pengaturan||{},i=!!t?.previewOnly,a=!!t?.customPeriod&&!i,o=e||{},s=o.id?E(o):0,c=o.nominal_tagihan?Math.max(0,Number(o.nominal_tagihan)-s):Number(r.nominal_kas_default||1e4),u=!a&&o.id&&c>0&&c<2e3?c:2e3,f=Math.max(u,c);document.getElementById(`pay-kas-id`).value=a?``:o.id||``,document.getElementById(`pay-kas-modal-title`).textContent=i?`QRIS Pembayaran Kelas (Batas Waktu 10 Menit)`:a?`Bayar Kas / Setoran Mandiri`:`Pembayaran Iuran Kas Kelas`,document.getElementById(`pay-kas-periode`).textContent=i?`${o.periode||`QRIS Pembayaran Resmi Kelas R3S`} · Nominal ${v(f)}`:a?`${l.currentUser?.nama_lengkap||`Anggota`} · Pembayaran kas mandiri via QRIS atau Transfer Bank`:`${o.periode||`Tagihan Kas`} · Tagihan ${v(o.nominal_tagihan||f)} · Terbayar ${v(s)} · Sisa ${v(c)}`;let p=document.getElementById(`pay-kas-periode-group`),m=document.getElementById(`pay-kas-periode-input`);p&&m&&(p.classList.toggle(`hidden`,!a),m.required=a,m.value=a?`Setoran Kas - ${g(d(new Date).slice(0,7))}`:``);let h=document.getElementById(`pay-kas-nominal`),_=document.querySelector(`#pay-kas-nominal-group label`),y=document.getElementById(`pay-kas-bukti`);h.min=String(u),h.step=`any`,!a&&o.id&&c>0?h.max=String(c):h.removeAttribute(`max`),_&&(_.textContent=!a&&o.id?`Nominal Pembayaran (Min ${v(u)} · Maks Sisa ${v(c)})`:`Nominal Pembayaran (Minimal Rp 2.000)`),h.value=f,h.required=!i,y.required=!i,y.value=``,document.getElementById(`pay-kas-preview`).classList.add(`hidden`),document.getElementById(`pay-kas-nominal-group`).classList.toggle(`hidden`,i),document.getElementById(`pay-kas-method-group`).classList.toggle(`hidden`,i),document.getElementById(`pay-kas-bukti-group`).classList.toggle(`hidden`,i),document.getElementById(`btn-pay-kas-submit`).classList.toggle(`hidden`,i),document.getElementById(`btn-pay-kas-close`).textContent=i?`Tutup`:`Batal`,document.getElementById(`qris-merchant-label`).textContent=r.qris_merchant_name||`Mas_hy, Fashion`,document.getElementById(`qris-nmid-label`).textContent=`NMID: ${r.qris_nmid||`ID1025463553806`}`,document.getElementById(`bank-name-display`).textContent=r.nama_bank||`BCA`,document.getElementById(`bank-holder-display`).textContent=r.atas_nama_rekening||`Bendahara R3S`,document.getElementById(`bank-number-display`).textContent=r.no_rekening||`-`,Be(`QRIS`),i&&document.getElementById(`panel-method-bank`).classList.add(`hidden`),qe(r.qris_payload||n,h.value),Ve(),document.getElementById(`modal-pay-kas`).classList.remove(`hidden`)}function Be(e){l.selectedPayMethod=e,document.querySelectorAll(`#modal-pay-kas .seg-btn`).forEach(t=>{t.classList.toggle(`active`,t.getAttribute(`data-method`)===e)}),document.getElementById(`panel-method-qris`).classList.toggle(`hidden`,e!==`QRIS`),document.getElementById(`panel-method-bank`).classList.toggle(`hidden`,e!==`Transfer Bank`)}function Ve(){clearInterval(l.qrisTimerInterval),l.qrisSecondsLeft=600;let e=document.getElementById(`qris-countdown-display`),t=()=>{let t=Math.floor(l.qrisSecondsLeft/60),n=l.qrisSecondsLeft%60;e&&(e.textContent=`${String(t).padStart(2,`0`)}:${String(n).padStart(2,`0`)}`),l.qrisSecondsLeft<=0?(clearInterval(l.qrisTimerInterval),e&&(e.textContent=`Kedaluwarsa`)):--l.qrisSecondsLeft};t(),l.qrisTimerInterval=setInterval(t,1e3)}function He(e){let t=String(e||``).trim(),n=[],r=0;for(;r+4<=t.length;){let e=t.slice(r,r+2),i=parseInt(t.slice(r+2,r+4),10);if(Number.isNaN(i)||i<0||r+4+i>t.length)break;let a=t.slice(r+4,r+4+i);if(n.push({tag:e,val:a}),r+=4+i,e===`63`)break}return n}function Ue(e){let t=65535;for(let n=0;n<e.length;n++){t^=e.charCodeAt(n)<<8;for(let e=0;e<8;e++)t=t&32768?(t<<1^4129)&65535:t<<1&65535}return t.toString(16).toUpperCase().padStart(4,`0`)}function We(e){let t=He(e),n=t.find(e=>e.tag===`59`)?.val||``,r=t.find(e=>e.tag===`60`)?.val||``,i=``,a=t.find(e=>e.tag===`51`);return a&&(i=He(a.val).find(e=>e.tag===`02`)?.val||``),{merchantName:n,city:r,nmid:i}}function Ge(e){let t={...e||{}};t.qris_payload&&String(t.qris_payload).trim().startsWith(`000201`)||(t.qris_payload=n);let r=We(t.qris_payload);return t.qris_nmid&&t.qris_nmid!==`ID1020304050607`||(t.qris_nmid=r.nmid||`ID1025463553806`),t.qris_merchant_name&&t.qris_merchant_name!==`KAS KELAS R3S`||(t.qris_merchant_name=r.merchantName||`Mas_hy, Fashion`),t}function Ke(e,t){let r=e&&String(e).trim().startsWith(`000201`)?String(e).trim():n,i=He(r).filter(e=>e.tag!==`63`&&e.tag!==`54`);if(i.length===0)return r;let a=Math.max(0,Math.round(Number(t||0))),o=[],s=!1;for(let e of i)e.tag===`01`?o.push({tag:`01`,val:a>0?`12`:`11`}):(!s&&a>0&&Number(e.tag)>54&&(o.push({tag:`54`,val:String(a)}),s=!0),o.push(e));!s&&a>0&&o.push({tag:`54`,val:String(a)});let c=o.map(e=>`${e.tag}${String(e.val.length).padStart(2,`0`)}${e.val}`).join(``)+`6304`;return c+Ue(c)}function qe(e,t){let r=document.getElementById(`qris-qr-canvas`);if(!r)return;let i=r.getContext(`2d`),a=e&&String(e).trim().startsWith(`000201`)?String(e).trim():l.pengaturan?.qris_payload||n,o=Math.max(0,Math.round(Number(t||0))),s=Ke(a,o);l.currentDynamicQrisString=s;let c=document.getElementById(`qris-dynamic-nominal-label`);if(c&&(c.textContent=o>0?`QRIS Dinamis · Nominal Otomatis: ${v(o)}`:`QRIS Dinamis · Nominal Fleksibel`),r.width!==244&&(r.width=244),r.height!==244&&(r.height=244),i.fillStyle=`#ffffff`,i.fillRect(0,0,244,244),typeof window.qrcode==`function`)try{let e=window.qrcode(0,`M`);e.addData(s,`Byte`),e.make();let t=e.getModuleCount(),n=t+8,r=Math.max(2,Math.floor(244/n)),a=n*r,o=Math.floor((244-a)/2);i.fillStyle=`#03132b`;for(let n=0;n<t;n++)for(let a=0;a<t;a++)e.isDark(n,a)&&i.fillRect(o+(a+4)*r,o+(n+4)*r,r,r);return}catch{}i.fillStyle=`#0f172a`,i.font=`bold 13px Arial, sans-serif`,i.textAlign=`center`,i.fillText(`QRIS Dinamis Siap Disalin`,122,114),i.font=`12px Arial, sans-serif`,i.fillText(o>0?v(o):`Klik Salin Kode QRIS`,122,136),i.textAlign=`left`}async function Je(e){e.preventDefault();let t=document.getElementById(`pay-kas-id`).value.trim(),n=document.getElementById(`pay-kas-periode-group`),r=!t&&!(!n||n.classList.contains(`hidden`));if(!t&&!r){Q(`modal-pay-kas`);return}let i=document.getElementById(`pay-kas-periode-input`)?.value.trim()||``,a=Number(document.getElementById(`pay-kas-nominal`).value),o=document.getElementById(`pay-kas-bukti`).files[0],s=t?l.iuranKas.find(e=>e.id===t):null,c=s?E(s):0,u=s?Math.max(0,Number(s.nominal_tagihan||0)-c):0,d=s&&u>0&&u<2e3?u:2e3;if(r&&!i)S(`Isi nama periode atau keterangan pembayaran kas terlebih dahulu.`,`danger`);else if(!Number.isFinite(a)||a<d)S(`Minimal pembayaran kas adalah ${v(d)}.`,`danger`);else if(s&&a>u)S(`Nominal melebihi sisa tunggakan (${v(u)}).`,`danger`);else if(!o)S(`Wajib mengunggah foto bukti transfer/QRIS.`,`danger`);else try{let e=await R.uploadFile(o,`bukti_kas`),n=new Date().toISOString();t&&s?await R.update(`iuran_kas`,t,{nominal_dibayar:c,nominal_terverifikasi:c,nominal_pending:a,pj_nama:`${w}${a}`,metode_bayar:l.selectedPayMethod,bukti_url:e,status:`Menunggu Verifikasi`,tanggal_bayar:n}):await R.insert(`iuran_kas`,{user_id:l.currentUser.id,periode:i,nominal_tagihan:a,nominal_dibayar:0,nominal_terverifikasi:0,nominal_pending:a,pj_nama:`${w}${a}`,metode_bayar:l.selectedPayMethod,bukti_url:e,status:`Menunggu Verifikasi`,tanggal_bayar:n});let r=s?.periode||i||`Iuran Kas`,u=[{user_id:l.currentUser.id,judul:`Bukti Pembayaran Kas Terkirim`,pesan:`Pembayaran ${r} sebesar ${v(a)} via ${l.selectedPayMethod} berhasil dikirim. Menunggu ACC Admin/Bendahara.`,tipe:`info`}];k([`admin`,`bendahara`]).forEach(e=>{e!==l.currentUser.id&&u.push({user_id:e,judul:`Pembayaran Kas Menunggu ACC`,pesan:`${l.currentUser.nama_lengkap} (${l.currentUser.npm}) membayar kas ${r} sebesar ${v(a)} (${l.selectedPayMethod}).`,tipe:`warning`})}),await A(u),await R.loadAll(),Q(`modal-pay-kas`),S(`Bukti pembayaran terkirim! Menunggu verifikasi Bendahara/Admin.`,`success`),B(),V()}catch(e){S(e.message||`Gagal mengirim bukti pembayaran.`,`danger`)}}function Ye(){let e=l.pengajuanCuti.filter(e=>e.user_id===l.currentUser.id);return`
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
              ${e.length===0?`<tr><td colspan="5" class="text-center">Belum ada pengajuan cuti.</td></tr>`:e.map(e=>{let t=e.waktu_pengajuan||e.created_at;return`
                    <tr>
                      <td class="tabular-nums">
                        <strong>${y(m(new Date(t)))}</strong>
                        <div class="meta-line">${y(h(new Date(t)))}</div>
                      </td>
                      <td class="tabular-nums">${y(e.tanggal_mulai)} s.d. ${y(e.tanggal_selesai)}</td>
                      <td>${y(e.alasan)}</td>
                      <td><span class="status-tag ${C(e.status)}">${y(e.status)}</span></td>
                      <td>
                        ${e.surat_url?`<button type="button" class="btn btn-secondary btn-sm btn-view-img" data-url="${y(e.surat_url)}" data-title="Surat Cuti Resmi">Lihat</button>`:`-`}
                      </td>
                    </tr>
                  `}).join(``)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `}function Xe(){document.getElementById(`form-ajukan-cuti`)?.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`cuti-mulai`).value,n=document.getElementById(`cuti-selesai`).value,r=document.getElementById(`cuti-alasan`).value.trim(),i=document.getElementById(`cuti-surat`).files[0];if(n<t)S(`Tanggal selesai tidak boleh lebih awal dari tanggal mulai.`,`danger`);else try{let e=i?await R.uploadFile(i,`surat_cuti`):``,a=new Date().toISOString();await R.insert(`pengajuan_cuti`,{user_id:l.currentUser.id,tanggal_mulai:t,tanggal_selesai:n,alasan:r,surat_url:e,status:`Menunggu`,waktu_pengajuan:a}),await R.loadAll(),S(`Pengajuan cuti berhasil dikirim!`,`success`),V()}catch(e){S(e.message||`Gagal mengirim pengajuan cuti.`,`danger`)}}),$()}function Ze(){let e=l.currentUser,t=e.role===`admin`,n=l.laporanKendala.filter(t=>t.user_id===e.id),r=_e(),i=r.filter(e=>!e.dibaca).length;return`
    <div class="page-header">
      <div>
        <span class="meta-line">Notifikasi Pembayaran Kas, Verifikasi Absensi, Akun &amp; Laporan Portal</span>
        <h2>Pusat Informasi Kelas R3S</h2>
      </div>
      <span class="status-tag ${i>0?`tag-coral`:`tag-success`} tabular-nums">${i} Pemberitahuan Baru</span>
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
          ${r.length===0?`<p class="meta-line">Belum ada pemberitahuan masuk.</p>`:r.map(e=>`
                <div class="activity-item">
                  <div>
                    <div class="activity-title">
                      ${y(e.judul)}
                      ${e.dibaca?``:`<span class="status-tag tag-coral" style="margin-left:6px;">Baru</span>`}
                    </div>
                    <p style="font-size:0.84rem;margin-top:2px;">${y(e.pesan)}</p>
                    <span class="meta-line tabular-nums">${y(p(e.created_at))}</span>
                  </div>
                </div>
              `).join(``)}
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

    ${t?`
          <div class="card glass-panel">
            <div class="card-header">
              <div>
                <h3>Pusat Kendali Notifikasi Admin</h3>
                <span class="meta-line">Seluruh aktivitas pembayaran kas mahasiswa, persetujuan kas dan absensi, laporan kendala, serta perubahan kata sandi mahasiswa terekam otomatis di Kotak Pemberitahuan Admin.</span>
              </div>
              <button type="button" class="btn btn-primary btn-sm btn-goto-laporan-masuk">Buka Laporan Masuk</button>
            </div>
          </div>
        `:`
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
                    ${n.length===0?`<tr><td colspan="3" class="text-center">Belum ada laporan dikirim.</td></tr>`:n.map(e=>`
                          <tr>
                            <td><strong>${y(e.kategori)}</strong></td>
                            <td>
                              <div>${y(e.keterangan)}</div>
                              ${e.tanggapan_admin?`<div class="meta-line text-cyan" style="margin-top:4px;">Tanggapan Admin: ${y(e.tanggapan_admin)}</div>`:``}
                            </td>
                            <td><span class="status-tag ${C(e.status)}">${y(e.status)}</span></td>
                          </tr>
                        `).join(``)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        `}
  `}function Qe(){document.getElementById(`btn-mark-all-read`)?.addEventListener(`click`,async()=>{let e=_e().filter(e=>!e.dibaca);try{await Promise.all(e.map(e=>R.update(`pemberitahuan`,e.id,{dibaca:!0}))),await R.loadAll(),B(),V(),S(`Semua pemberitahuan ditandai sudah dibaca.`,`success`)}catch(e){S(e.message||`Gagal memperbarui notifikasi.`,`danger`)}}),document.querySelector(`.btn-goto-laporan-masuk`)?.addEventListener(`click`,()=>{l.activeTab=`monitoring_laporan`,B(),V()}),document.getElementById(`form-kirim-laporan`)?.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`laporan-kategori`).value,n=document.getElementById(`laporan-keterangan`).value.trim(),r=document.getElementById(`laporan-bukti`).files[0];try{let e=r?await R.uploadFile(r,`laporan_kendala`):``;await R.insert(`laporan_kendala`,{user_id:l.currentUser.id,kategori:t,keterangan:n,bukti_url:e,tanggapan_admin:``,status:`Menunggu`});let a=l.currentUser,o=n.length>90?`${n.slice(0,90)}...`:n,s=[{user_id:a.id,judul:`Laporan Berhasil Dikirim`,pesan:`Laporan kategori "${t}" telah dikirim ke Admin Utama dan sedang menunggu tindak lanjut.`,tipe:`info`}];k([`admin`]).forEach(e=>{e!==a.id&&s.push({user_id:e,judul:`Laporan Masuk (${i[a.role]||a.role})`,pesan:`${a.nama_lengkap} (${a.npm}) mengirim laporan "${t}": ${o}`,tipe:`warning`})}),await A(s),await R.loadAll(),S(`Laporan berhasil dikirim ke Admin Utama.`,`success`),B(),V()}catch(e){S(e.message||`Gagal mengirim laporan.`,`danger`)}})}function $e(){let e=l.currentUser,t=(e.nama_lengkap||`R`)[0].toUpperCase();return`
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
            ${e.avatar_url?`<img src="${y(e.avatar_url)}" alt="${y(e.nama_lengkap)}" />`:`<span>${y(t)}</span>`}
          </div>
          <div>
            <strong>${y(e.nama_lengkap)}</strong>
            <div class="meta-line tabular-nums">${y(e.npm)} · <span class="status-tag ${c(e.role)}">${y(i[e.role]||e.role)}</span></div>
            <div class="meta-line">${e.avatar_url?`Foto profil aktif tersimpan`:`Belum mengunggah foto profil`}</div>
          </div>
        </div>

        <div class="field-group">
          <label>Nama Lengkap</label>
          <input type="text" value="${y(e.nama_lengkap)}" readonly />
        </div>
        <div class="field-group">
          <label>NPM / NIM</label>
          <input type="text" value="${y(e.npm)}" readonly class="tabular-nums" />
        </div>
        <div class="field-group">
          <label>Peran Akun</label>
          <input type="text" value="${y(i[e.role]||e.role)}${e.role===`pj_matkul`?` (Penanda Penanggung Jawab Mata Kuliah)`:``}" readonly />
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
            <input type="text" id="profil-username" value="${y(e.username)}" required />
          </div>
          <div class="field-group">
            <label for="profil-nowa">Nomor WhatsApp (Format 628...)</label>
            <input type="text" id="profil-nowa" value="${y(e.no_wa||``)}" placeholder="628123456789" />
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
  `}function et(){document.getElementById(`profil-password`)?.addEventListener(`input`,e=>{le(e.target.value,`#profil-pw-rules`)}),document.getElementById(`profil-avatar-file`)?.addEventListener(`change`,e=>{let t=e.target.files[0],n=document.getElementById(`profil-avatar-preview`);t&&n&&(n.innerHTML=`<img src="${URL.createObjectURL(t)}" alt="Pratinjau Foto Profil" />`)}),document.getElementById(`form-update-avatar`)?.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`profil-avatar-file`).files[0];if(t)try{let e=await R.uploadFile(t,`avatars`);await R.update(`profiles`,l.currentUser.id,{avatar_url:e}),await A([{user_id:l.currentUser.id,judul:`Foto Profil Diperbarui`,pesan:`Foto profil Anda berhasil diperbarui dan ditampilkan pada bilah navigasi serta halaman Profil.`,tipe:`success`}]),await R.loadAll(),S(`Foto profil berhasil diperbarui!`,`success`),B(),V()}catch(e){S(e.message||`Gagal mengunggah foto profil.`,`danger`)}}),document.getElementById(`form-update-credentials`)?.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`profil-username`).value.trim(),n=document.getElementById(`profil-nowa`).value.trim(),r=document.getElementById(`profil-password`).value;if(l.profiles.find(e=>e.id!==l.currentUser.id&&e.username.toLowerCase()===t.toLowerCase())){S(`Username sudah dipakai anggota lain.`,`danger`);return}let i={username:t,no_wa:n};if(r){if(!b(r).valid){S(`Password wajib maks 8 karakter, min 1 angka, dan min 1 simbol.`,`danger`);return}i.password=r}try{await R.update(`profiles`,l.currentUser.id,i);let e=l.currentUser,n=[{user_id:e.id,judul:`Kredensial Akun Diperbarui`,pesan:`Username (@${t})${r?` dan password`:``} berhasil diperbarui dan tersinkron ke sistem.`,tipe:`success`}];a(e.role)&&k([`admin`]).forEach(i=>{n.push({user_id:i,judul:`Mahasiswa Mengubah Username / Password`,pesan:`Mahasiswa ${e.nama_lengkap} (${e.npm}) memperbarui kredensial akun menjadi @${t}${r?` (beserta password baru)`:``}.`,tipe:`warning`})}),await A(n),await R.loadAll(),S(`Profil & kredensial tersinkron ke sistem Admin!`,`success`),B(),V()}catch(e){S(e.message||`Gagal memperbarui kredensial.`,`danger`)}})}var tt=[{mata_kuliah:`Pemrograman Web Lanjut`,dosen:`Dr. Hendra Kusuma, M.Kom.`,sks:3},{mata_kuliah:`Basis Data Terdistribusi`,dosen:`Ir. Maya Putri, M.T.`,sks:3},{mata_kuliah:`Rekayasa Perangkat Lunak`,dosen:`Budi Santoso, M.Kom.`,sks:2},{mata_kuliah:`Jaringan Komputer`,dosen:`Ahmad Fauzi, S.T., M.Kom.`,sks:2},{mata_kuliah:`Kecerdasan Buatan`,dosen:`Dr. Ratna Sari, M.Kom.`,sks:3},{mata_kuliah:`Sistem Operasi`,dosen:`Eko Prasetyo, M.T.`,sks:2}];function W(e){if(!e)return`-`;if(e.pj_matkul_id){let t=l.profiles.find(t=>t.id===e.pj_matkul_id&&t.role===`pj_matkul`);if(t)return t.nama_lengkap}if(e.pj_matkul_nama){let t=l.profiles.find(t=>t.nama_lengkap.toLowerCase()===String(e.pj_matkul_nama).toLowerCase()&&t.role===`pj_matkul`);if(t)return t.nama_lengkap}return`-`}function nt(){try{let e=JSON.parse(localStorage.getItem(r.HIDDEN_MATKUL)||`[]`);if(Array.isArray(e))return new Set(e.map(e=>String(e||``).trim().toLowerCase()).filter(Boolean))}catch{}return new Set}function rt(e){let t=String(e||``).trim().toLowerCase();if(!t)return;let n=nt();n.add(t),localStorage.setItem(r.HIDDEN_MATKUL,JSON.stringify(Array.from(n)))}function it(e){let t=String(e||``).trim().toLowerCase();if(!t)return;let n=nt();n.delete(t)&&localStorage.setItem(r.HIDDEN_MATKUL,JSON.stringify(Array.from(n)))}function at(){let e=l.profiles.find(e=>e.role===`pj_matkul`),t=nt(),n=new Map;return tt.forEach(r=>{let i=r.mata_kuliah.toLowerCase();t.has(i)||n.set(i,{...r,pj_matkul_id:e?.id||``,pj_matkul_nama:e?.nama_lengkap||``,is_default:!0})}),l.sesiAbsensi.forEach(e=>{if(e.mata_kuliah&&e.dosen){let t=n.get(e.mata_kuliah.toLowerCase()),r=l.profiles.find(t=>t.role===`pj_matkul`&&(t.id===e.pj_matkul_id||e.pj_matkul_nama&&t.nama_lengkap.toLowerCase()===String(e.pj_matkul_nama).toLowerCase()));n.set(e.mata_kuliah.toLowerCase(),{mata_kuliah:e.mata_kuliah,dosen:e.dosen,sks:Number(e.sks||2),pj_matkul_id:r?.id||t?.pj_matkul_id||``,pj_matkul_nama:r?.nama_lengkap||t?.pj_matkul_nama||``,is_default:!!t?.is_default})}}),Array.from(n.values())}function ot(){return l.profiles.filter(e=>e.role===`pj_matkul`)}function st(e=``,t=``){let n=ot();if(n.length===0)return`<option value="">-- Belum ada akun berlabel PJ Mata Kuliah --</option>`;let r=e&&n.some(t=>t.id===e)?e:n.find(e=>e.nama_lengkap.toLowerCase()===String(t).toLowerCase())?.id||n[0].id;return n.map(e=>`<option value="${e.id}" data-nama="${y(e.nama_lengkap)}" ${e.id===r?`selected`:``}>${y(e.nama_lengkap)} (${y(e.npm)} · ${y(i[e.role]||e.role)})</option>`).join(``)}function G(e,t=l.sesiAbsensi){let n=String(e||``).trim().toLowerCase();if(!n)return{maxPertemuan:0,minNextPertemuan:1,usedNumbers:[]};let r=new Set,i=0;return(t||[]).forEach(e=>{if(String(e.mata_kuliah||``).trim().toLowerCase()===n){let t=Number(e.pertemuan_ke||0);Number.isInteger(t)&&t>0&&(r.add(t),t>i&&(i=t))}}),{maxPertemuan:i,minNextPertemuan:i+1,usedNumbers:Array.from(r).sort((e,t)=>e-t)}}function ct(e){return G(e).maxPertemuan}function lt(){let e=at(),t=e[0]||{mata_kuliah:``,dosen:``,sks:2,pj_matkul_id:``,pj_matkul_nama:``},n=ot(),r=d(new Date),a=new Intl.DateTimeFormat(`en-GB`,{timeZone:`Asia/Jakarta`,hour:`2-digit`,minute:`2-digit`,hour12:!1}).format(new Date),o=Number(t.sks||2),s=o*50,c=ct(t.mata_kuliah),u=c+1,f=[...l.sesiAbsensi].sort((e,t)=>{let n=String(e.tanggal||d(new Date(e.created_at||0)));return String(t.tanggal||d(new Date(t.created_at||0))).localeCompare(n)||new Date(t.created_at||0)-new Date(e.created_at||0)}),m=(l.filters.sesiMatkulSearch||``).trim().toLowerCase(),h=f.filter(e=>{if(!m)return!0;let t=W(e);return`${e.mata_kuliah||``} ${e.dosen||``} ${t} ${e.pj_nama||``} pert ${e.pertemuan_ke||``}`.toLowerCase().includes(m)}),g=(l.filters.katalogMatkulSearch||``).trim().toLowerCase(),v=e.filter(e=>!g||`${e.mata_kuliah||``} ${e.dosen||``} ${e.sks||``} sks`.toLowerCase().includes(g));return`
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
            <div class="input-with-btn">
              <select id="sesi-matkul-preset">
                ${e.map((e,t)=>`<option value="${t}" data-matkul="${y(e.mata_kuliah)}" data-dosen="${y(e.dosen)}" data-sks="${e.sks}" data-pj-matkul-id="${y(e.pj_matkul_id||``)}" data-pj-matkul-nama="${y(e.pj_matkul_nama||``)}">${y(e.mata_kuliah)} — ${y(e.dosen)} (${e.sks} SKS)</option>`).join(``)}
                <option value="custom" ${e.length===0?`selected`:``}>-- Masukkan Mata Kuliah &amp; Dosen Baru --</option>
              </select>
              <button
                type="button"
                id="btn-delete-matkul-preset"
                class="btn btn-danger-soft btn-sm"
                ${e.length===0?`disabled`:``}
                title="Hapus mata kuliah yang dipilih dari daftar"
              >
                Hapus
              </button>
            </div>
          </div>

          <div class="grid-2" style="margin-bottom:0;">
            <div class="field-group">
              <label for="sesi-matkul">Nama Mata Kuliah</label>
              <input type="text" id="sesi-matkul" class="input-locked" value="${y(t.mata_kuliah)}" placeholder="Masukkan nama mata kuliah" readonly required />
            </div>
            <div class="field-group">
              <label for="sesi-dosen">Dosen Pengampu</label>
              <input type="text" id="sesi-dosen" class="input-locked" value="${y(t.dosen)}" placeholder="Masukkan nama dosen" readonly required />
            </div>
          </div>

          <div class="field-group">
            <label for="sesi-pj-matkul">Penanggung Jawab Mata Kuliah (Khusus Label PJ Mata Kuliah)</label>
            <select id="sesi-pj-matkul" required>
              ${st(t.pj_matkul_id,t.pj_matkul_nama)}
            </select>
            ${n.length===0?`<span class="meta-line" style="color:var(--accent-coral);display:block;margin-top:4px;">Belum ada mahasiswa dengan label <strong>PJ Mata Kuliah</strong>. Tetapkan peran PJ Mata Kuliah terlebih dahulu di menu Kelola Akun &amp; Rekening.</span>`:`<span class="meta-line" style="display:block;margin-top:4px;">Hanya akun yang memiliki label <strong>PJ Mata Kuliah</strong> yang dapat dipilih dan dicatat di sini.</span>`}
          </div>

          <div class="grid-3" style="margin-bottom:0;">
            <div class="field-group">
              <label for="sesi-tanggal">Tanggal Kuliah</label>
              <input type="date" id="sesi-tanggal" value="${r}" required />
            </div>
            <div class="field-group">
              <label for="sesi-jam-mulai">Jam Mulai (WIB)</label>
              <input type="time" id="sesi-jam-mulai" value="${a}" required />
            </div>
            <div class="field-group">
              <label for="sesi-sks">Jumlah SKS (50 mnt/SKS)</label>
              <select id="sesi-sks" class="input-locked" disabled required>
                ${[1,2,3,4,5,6].map(e=>`<option value="${e}" ${e===o?`selected`:``}>${e} SKS (${e*50} menit)</option>`).join(``)}
              </select>
            </div>
          </div>

          <div class="sks-duration-box">
            <div>
              <span class="meta-line">Perhitungan Durasi Otomatis (1 SKS = 50 Menit)</span>
              <strong id="sesi-durasi-label" class="tabular-nums text-cyan">${o} SKS × 50 menit = ${s} menit</strong>
            </div>
            <div style="text-align:right;">
              <span class="meta-line">Batas Jam Absen Selesai</span>
              <strong id="sesi-batas-preview" class="tabular-nums">-</strong>
            </div>
          </div>

          <div class="grid-2" style="margin-bottom:0;">
            <div class="field-group">
              <label for="sesi-pertemuan">Pertemuan Ke-</label>
              <input
                type="number"
                id="sesi-pertemuan"
                min="${u}"
                step="1"
                inputmode="numeric"
                value="${u}"
                required
              />
              <span id="sesi-pertemuan-hint" class="meta-line" style="display:block;margin-top:4px;">
                ${c>1?`Pertemuan ke-1 s.d. ke-${c} sudah digunakan · Minimal berikutnya: Pertemuan ke-${u}`:c===1?`Pertemuan ke-1 sudah digunakan · Minimal berikutnya: Pertemuan ke-2`:`Belum ada pertemuan · Mulai dari Pertemuan ke-1`}
              </span>
              <span id="sesi-pertemuan-error" class="meta-line hidden" style="display:block;margin-top:4px;color:#ef4444;font-weight:600;"></span>
            </div>
            <div class="field-group">
              <label for="sesi-pj">Penanggung Jawab Sesi (Akun Aktif · Terkunci)</label>
              <input
                type="text"
                id="sesi-pj"
                class="input-locked"
                value="${y(l.currentUser.nama_lengkap)} (${y(i[l.currentUser.role]||l.currentUser.role)})"
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

          <button type="submit" id="btn-submit-buka-sesi" class="btn btn-primary btn-block" ${n.length===0?`disabled`:``}>Simpan &amp; Aktifkan Absensi</button>
        </form>
      </div>

      <div class="card glass-panel sticky-side-card">
        <div class="card-header">
          <div>
            <h3>Daftar Sesi Mata Kuliah</h3>
            <span class="meta-line">Terurut terbaru · Tanggal (DD/MM/YYYY), SKS, durasi, &amp; penanggung jawab mata kuliah</span>
          </div>
          <span class="status-tag tag-info tabular-nums">${h.length}/${f.length} Sesi</span>
        </div>
        <div class="toolbar-filters">
          <input
            type="search"
            id="filter-sesi-matkul-search"
            placeholder="Cari mata kuliah, dosen, PJ matkul, atau pertemuan..."
            value="${y(l.filters.sesiMatkulSearch||``)}"
          />
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
              ${h.length===0?`<tr><td colspan="5" class="text-center">${f.length===0?`Belum ada sesi absensi.`:`Tidak ada sesi mata kuliah yang cocok dengan pencarian.`}</td></tr>`:h.map(e=>{let t=e.is_active&&new Date(e.batas_waktu).getTime()>Date.now(),n=Number(e.sks||2),r=Number(e.durasi_menit||n*50),i=e.tanggal||d(new Date(e.created_at)),a=W(e);return`
                          <tr>
                            <td>
                              <strong>${y(e.mata_kuliah)}</strong>
                              <div class="meta-line">${y(e.dosen)} · Pert. ${e.pertemuan_ke}</div>
                            </td>
                            <td class="tabular-nums">
                              <strong>${y(_(i))}</strong>
                              <div class="meta-line">${n} SKS (${r} mnt) · s.d. ${y(p(e.batas_waktu))}</div>
                            </td>
                            <td>
                              <strong>${y(a)}</strong>
                              <div class="meta-line">Sesi: ${y(e.pj_nama||`-`)}</div>
                            </td>
                            <td><span class="status-tag ${t?`tag-success`:`tag-danger`}">${t?`Dibuka`:`Ditutup`}</span></td>
                            <td>
                              <div class="row-actions">
                                <button type="button" class="btn btn-secondary btn-sm btn-toggle-sesi" data-id="${e.id}" data-active="${e.is_active}">
                                  ${e.is_active?`Tutup Sesi`:`Aktifkan`}
                                </button>
                                <button
                                  type="button"
                                  class="btn btn-danger-soft btn-sm btn-delete-sesi"
                                  data-id="${e.id}"
                                  data-matkul="${y(e.mata_kuliah)}"
                                  data-pertemuan="${y(String(e.pertemuan_ke||1))}"
                                  title="Hapus sesi mata kuliah"
                                >
                                  Hapus
                                </button>
                              </div>
                            </td>
                          </tr>
                        `}).join(``)}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="card glass-panel mt-4">
      <div class="card-header">
        <div>
          <h3>Daftar Mata Kuliah</h3>
          <span class="meta-line">Kelola daftar mata kuliah kelas · Klik Hapus untuk menghapus mata kuliah beserta sesinya jika salah input</span>
        </div>
        <span class="status-tag tag-info tabular-nums">${v.length}/${e.length} Mata Kuliah</span>
      </div>
      <div class="toolbar-filters">
        <input
          type="search"
          id="filter-katalog-matkul-search"
          placeholder="Cari nama mata kuliah, dosen pengampu, atau SKS..."
          value="${y(l.filters.katalogMatkulSearch||``)}"
        />
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Nama Mata Kuliah</th>
              <th>Dosen Pengampu</th>
              <th>SKS &amp; Durasi</th>
              <th>Total Sesi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${v.length===0?`<tr><td colspan="5" class="text-center">${e.length===0?`Belum ada mata kuliah di daftar.`:`Tidak ada mata kuliah yang cocok dengan pencarian.`}</td></tr>`:v.map(e=>{let t=l.sesiAbsensi.filter(t=>String(t.mata_kuliah||``).trim().toLowerCase()===e.mata_kuliah.trim().toLowerCase()).length,n=Number(e.sks||2);return`
                        <tr>
                          <td><strong>${y(e.mata_kuliah)}</strong></td>
                          <td>${y(e.dosen)}</td>
                          <td class="tabular-nums">${n} SKS (${n*50} menit)</td>
                          <td class="tabular-nums">${t} Sesi</td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-danger-soft btn-sm btn-delete-matkul"
                              data-matkul="${y(e.mata_kuliah)}"
                              title="Hapus mata kuliah ini"
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      `}).join(``)}
          </tbody>
        </table>
      </div>
    </div>
  `}function ut(){let e=e=>{let t=document.getElementById(`sesi-matkul`),n=document.getElementById(`sesi-dosen`),r=document.getElementById(`sesi-sks`);t&&(t.readOnly=!e,t.classList.toggle(`input-locked`,!e)),n&&(n.readOnly=!e,n.classList.toggle(`input-locked`,!e)),r&&(r.disabled=!e,r.classList.toggle(`input-locked`,!e))},t=()=>{let e=document.getElementById(`sesi-tanggal`)?.value,t=document.getElementById(`sesi-jam-mulai`)?.value,n=Number(document.getElementById(`sesi-sks`)?.value||2),r=n*50,i=document.getElementById(`sesi-durasi-label`),a=document.getElementById(`sesi-batas-preview`),o=document.getElementById(`sesi-batas`);if(i&&(i.textContent=`${n} SKS × 50 menit = ${r} menit`),!e||!t||!o)return;let s=new Date(`${e}T${t}:00`);if(Number.isNaN(s.getTime()))return;let c=new Date(s.getTime()+r*6e4);o.value=new Date(c.getTime()-c.getTimezoneOffset()*6e4).toISOString().slice(0,16),a&&(a.textContent=p(c.toISOString()))},n=e=>{let t=document.getElementById(`btn-delete-matkul-preset`);t&&(t.disabled=!!e)},r=(e=!1)=>{let t=document.getElementById(`btn-submit-buka-sesi`);t&&(t.disabled=!(ot().length>0)||!!e)},i=({autoSnap:e=!1,showNotice:t=!1}={})=>{let n=document.getElementById(`sesi-pertemuan`),i=document.getElementById(`sesi-pertemuan-error`),{maxPertemuan:a,minNextPertemuan:o,usedNumbers:s}=G(document.getElementById(`sesi-matkul`)?.value||``);if(!n)return!0;n.min=String(o);let c=String(n.value||``).trim(),l=Number(c),u=!c||!/^\d+$/.test(c)||!Number.isInteger(l),d=!u&&s.includes(l);if(u||d||!u&&l<o){let s=u?`Nomor pertemuan wajib berupa angka bulat minimal Pertemuan ke-${o}.`:d?`Pertemuan ke-${l} sudah pernah digunakan di database! Minimal berikutnya adalah Pertemuan ke-${o}.`:`Pertemuan ke-${l} tidak dapat digunakan karena pertemuan tertinggi saat ini ke-${a}. Minimal berikutnya adalah Pertemuan ke-${o}.`;return e?(n.value=String(o),n.setCustomValidity(``),n.style.borderColor=``,i&&(i.textContent=``,i.classList.add(`hidden`)),r(!1),t&&S(s,`warning`),!1):(n.setCustomValidity(s),n.style.borderColor=`#ef4444`,i&&(i.textContent=s,i.classList.remove(`hidden`)),r(!0),t&&S(s,`warning`),!1)}return n.setCustomValidity(``),n.style.borderColor=``,i&&(i.textContent=``,i.classList.add(`hidden`)),r(!1),!0},a=e=>{let t=document.getElementById(`sesi-pertemuan`),n=document.getElementById(`sesi-pertemuan-hint`),{maxPertemuan:r,minNextPertemuan:a}=G(e);t&&(t.min=String(a),t.value=String(a)),n&&(n.textContent=r>1?`Pertemuan ke-1 s.d. ke-${r} sudah digunakan · Minimal berikutnya: Pertemuan ke-${a}`:r===1?`Pertemuan ke-1 sudah digunakan · Minimal berikutnya: Pertemuan ke-2`:`Belum ada pertemuan · Mulai dari Pertemuan ke-1`),i({autoSnap:!1,showNotice:!1})},o=document.getElementById(`sesi-matkul-preset`),s=!o||o.value===`custom`;e(s),n(s),a(document.getElementById(`sesi-matkul`)?.value||``),t(),o?.addEventListener(`change`,r=>{let i=r.target.selectedOptions[0],o=document.getElementById(`sesi-matkul`),s=document.getElementById(`sesi-dosen`),c=document.getElementById(`sesi-sks`),l=document.getElementById(`sesi-pj-matkul`),u=r.target.value===`custom`;if(e(u),n(u),u)o.value=``,s.value=``,a(``),o.focus();else if(i){o.value=i.getAttribute(`data-matkul`)||``,s.value=i.getAttribute(`data-dosen`)||``;let e=i.getAttribute(`data-sks`);e&&c&&(c.value=e);let t=i.getAttribute(`data-pj-matkul-id`)||``,n=i.getAttribute(`data-pj-matkul-nama`)||``;if(l){if(t&&Array.from(l.options).some(e=>e.value===t))l.value=t;else if(n){let e=Array.from(l.options).find(e=>(e.getAttribute(`data-nama`)||``).toLowerCase()===n.toLowerCase());e&&(l.value=e.value)}}a(o.value)}t()}),document.getElementById(`sesi-matkul`)?.addEventListener(`input`,e=>{e.target.readOnly||a(e.target.value)});let c=document.getElementById(`sesi-pertemuan`);c?.addEventListener(`keydown`,e=>{if([`-`,`+`,`.`,`,`,`e`,`E`].includes(e.key))e.preventDefault();else if(e.key===`ArrowDown`){let{minNextPertemuan:t}=G(document.getElementById(`sesi-matkul`)?.value||``);Number(c.value||t)<=t&&(e.preventDefault(),c.value=String(t),i({autoSnap:!1,showNotice:!1}),S(`Tidak dapat menurunkan di bawah Pertemuan ke-${t}.`,`warning`))}}),c?.addEventListener(`input`,()=>{i({autoSnap:!1,showNotice:!1})}),c?.addEventListener(`change`,()=>{i({autoSnap:!0,showNotice:!0})}),c?.addEventListener(`blur`,()=>{i({autoSnap:!0,showNotice:!0})}),document.getElementById(`btn-delete-matkul-preset`)?.addEventListener(`click`,()=>{let e=o?.selectedOptions?.[0];if(!e||o.value===`custom`)return;let t=e.getAttribute(`data-matkul`)||``;t&&dt(t)}),[`sesi-tanggal`,`sesi-jam-mulai`,`sesi-sks`].forEach(e=>{document.getElementById(e)?.addEventListener(`change`,t)}),document.getElementById(`form-buka-sesi`)?.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`sesi-matkul`).value.trim(),n=document.getElementById(`sesi-dosen`).value.trim(),r=document.getElementById(`sesi-tanggal`).value,o=Number(document.getElementById(`sesi-sks`).value||2),s=o*50,c=Number(document.getElementById(`sesi-pertemuan`).value);if(!i({autoSnap:!0,showNotice:!0})){document.getElementById(`sesi-pertemuan`)?.focus();return}let u=l.currentUser.id,d=l.currentUser.nama_lengkap,f=document.getElementById(`sesi-pj-matkul`)?.value||``,p=l.profiles.find(e=>e.id===f&&e.role===`pj_matkul`);if(!p){S(`Hanya akun berlabel PJ Mata Kuliah yang boleh dicatat. Tetapkan role PJ Mata Kuliah di menu Kelola Anggota & Role.`,`warning`);return}let m=p.id,h=p.nama_lengkap,g=document.getElementById(`sesi-mode`)?.value||`Luring`,_=document.getElementById(`sesi-link-daring`)?.value.trim()||``,v=document.getElementById(`sesi-batas`).value,y=document.getElementById(`btn-submit-buka-sesi`);y&&(y.disabled=!0,y.textContent=`Memvalidasi & Menyimpan...`);try{let e=l.sesiAbsensi;if(l.mode===`supabase`&&l.supabase){let{data:t,error:n}=await l.supabase.from(`sesi_absensi`).select(`id, mata_kuliah, pertemuan_ke`);if(n)throw n;e=t||[]}else e=I().sesi_absensi||[];let i=G(t,e);if(!Number.isInteger(c)||i.usedNumbers.includes(c)||c<i.minNextPertemuan){await R.loadAll(),a(t),S(`Ditolak database: Pertemuan ke-${c} untuk "${t}" sudah digunakan atau lebih kecil dari pertemuan terakhir (ke-${i.maxPertemuan}). Minimal berikutnya: Pertemuan ke-${i.minNextPertemuan}.`,`danger`),document.getElementById(`sesi-pertemuan`)?.focus();return}it(t),await R.insert(`sesi_absensi`,{mata_kuliah:t,dosen:n,pertemuan_ke:c,tanggal:r,sks:o,durasi_menit:s,batas_waktu:new Date(v).toISOString(),pj_id:u,pj_nama:d,pj_matkul_id:m,pj_matkul_nama:h,mode_kuliah:g,link_daring:_,dibuka_oleh:l.currentUser.id,is_active:!0}),await R.loadAll(),S(`Sesi ${t} (${g} · ${o} SKS) · PJ Matkul: ${h} · PJ Sesi: ${d} dibuka!`,`success`),V()}catch(e){let n=String(e?.message||``);e?.code===`23505`||/pertemuan|duplicate|unique/i.test(n)?(await R.loadAll(),a(t),S(`Gagal menyimpan: Nomor pertemuan untuk "${t}" sudah terpakai atau lebih kecil dari pertemuan terakhir di database.`,`danger`)):S(n||`Gagal membuka sesi absensi.`,`danger`)}finally{y&&(y.textContent=`Simpan & Aktifkan Absensi`,i({autoSnap:!1,showNotice:!1}))}}),document.querySelectorAll(`.btn-toggle-sesi`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-id`),n=e.getAttribute(`data-active`)===`true`;try{await R.update(`sesi_absensi`,t,{is_active:!n}),await R.loadAll(),S(`Status sesi berhasil ${n?`ditutup`:`diaktifkan`}.`,`info`),V()}catch(e){S(e.message||`Gagal mengubah status sesi.`,`danger`)}})}),document.querySelectorAll(`.btn-delete-sesi`).forEach(e=>{e.addEventListener(`click`,()=>{ft(e.getAttribute(`data-id`),e.getAttribute(`data-matkul`)||`mata kuliah ini`,e.getAttribute(`data-pertemuan`)||``)})}),document.querySelectorAll(`.btn-delete-matkul`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-matkul`)||``;t&&dt(t)})}),u(`filter-sesi-matkul-search`,e=>{l.filters.sesiMatkulSearch=e}),u(`filter-katalog-matkul-search`,e=>{l.filters.katalogMatkulSearch=e})}function K({title:e=`Konfirmasi Penghapusan`,subtitle:t=`-`,message:n,onConfirm:r}){let i=document.getElementById(`modal-confirm-delete`),a=document.getElementById(`confirm-delete-title`),o=document.getElementById(`confirm-delete-subtitle`),s=document.getElementById(`confirm-delete-message`),c=document.getElementById(`btn-confirm-delete-exec`);if(!i||!c)return;a&&(a.textContent=e),o&&(o.textContent=t),s&&(s.textContent=n);let l=c.cloneNode(!0);c.parentNode.replaceChild(l,c),l.disabled=!1,l.textContent=`Ya, Hapus`,l.addEventListener(`click`,async()=>{l.disabled=!0,l.textContent=`Menghapus...`;try{await r(),Q(`modal-confirm-delete`)}finally{l.disabled=!1,l.textContent=`Ya, Hapus`}}),i.classList.remove(`hidden`)}function dt(e){let t=String(e||``).trim();if(!t)return;let n=l.sesiAbsensi.filter(e=>String(e.mata_kuliah||``).trim().toLowerCase()===t.toLowerCase()).map(e=>e.id),r=l.absensi.filter(e=>n.includes(e.sesi_id)).length;K({title:`Hapus Mata Kuliah`,subtitle:t,message:n.length>0?`Apakah Anda yakin ingin menghapus mata kuliah "${t}"? Tindakan ini juga akan menghapus ${n.length} sesi perkuliahan${r>0?` dan ${r} data absensi terkait`:``} di database.`:`Apakah Anda yakin ingin menghapus "${t}" dari daftar pilihan mata kuliah?`,onConfirm:async()=>{try{if(n.length>0){if(l.mode===`supabase`&&l.supabase){let{error:e}=await l.supabase.from(`sesi_absensi`).delete().in(`id`,n);if(e)throw e.code===`23503`||/foreign key|violates foreign key constraint/i.test(e.message||``)?Error(`Gagal menghapus: Mata kuliah ini masih berelasi dengan data absensi (Foreign Key). Hapus data absensi terkait terlebih dahulu atau aktifkan ON DELETE CASCADE di Supabase.`):e}else for(let e of n)await R.remove(`sesi_absensi`,e)}rt(t),await R.loadAll(),S(`Mata kuliah "${t}" berhasil dihapus.`,`success`),B(),V()}catch(e){console.error(`Error menghapus mata kuliah:`,e),S(e.message||`Gagal menghapus mata kuliah.`,`danger`)}}})}function ft(e,t=`mata kuliah ini`,n=``){if(!e)return;let r=l.absensi.filter(t=>t.sesi_id===e).length,i=n?`${t} (Pertemuan ke-${n})`:t;K({title:`Hapus Sesi Mata Kuliah`,subtitle:i,message:r>0?`Apakah Anda yakin ingin menghapus sesi "${i}"? Terdapat ${r} data absensi terkait yang juga akan ikut terhapus.`:`Apakah Anda yakin ingin menghapus sesi "${i}"? Tindakan ini tidak dapat dibatalkan.`,onConfirm:async()=>{try{if(l.mode===`supabase`&&l.supabase){let{error:t}=await l.supabase.from(`sesi_absensi`).delete().eq(`id`,e);if(t)throw t.code===`23503`||/foreign key|violates foreign key constraint/i.test(t.message||``)?Error(`Gagal menghapus: Data sesi mata kuliah ini masih berelasi dengan data absensi (Foreign Key). Hapus data absensi terkait terlebih dahulu atau aktifkan ON DELETE CASCADE pada relasi tabel di Supabase.`):t}else await R.remove(`sesi_absensi`,e);await R.loadAll(),S(`Sesi "${i}" berhasil dihapus.`,`success`),B(),V()}catch(e){console.error(`Error menghapus sesi mata kuliah:`,e),S(e.message||`Gagal menghapus data sesi mata kuliah.`,`danger`)}}})}function pt(){let e=l.absensi.filter(e=>e.status_verifikasi===`Menunggu`),t=Object.fromEntries(l.profiles.map(e=>[e.id,e])),n=Object.fromEntries(l.sesiAbsensi.map(e=>[e.id,e])),r=(l.filters.verifikasiAbsenSearch||``).trim().toLowerCase(),i=e.filter(e=>{if(!r)return!0;let i=t[e.user_id],a=n[e.sesi_id];return`${i?.nama_lengkap||``} ${i?.npm||``} ${a?.mata_kuliah||``} pertemuan ${a?.pertemuan_ke||``} ${e.status_kehadiran||``}`.toLowerCase().includes(r)});return`
    <div class="page-header">
      <div>
        <span class="meta-line">Periksa Foto Stempel Waktu &amp; Titik Koordinat GPS Mahasiswa</span>
        <h2>Antrean Verifikasi Kehadiran</h2>
      </div>
      <span class="status-tag tag-coral tabular-nums">${e.length} Menunggu Persetujuan</span>
    </div>

    <div class="card glass-panel">
      <div class="toolbar-filters">
        <input
          type="search"
          id="filter-verifikasi-absen-search"
          placeholder="Cari absensi mahasiswa (nama, NIM, mata kuliah, atau pertemuan)..."
          value="${y(l.filters.verifikasiAbsenSearch||``)}"
        />
        <span class="status-tag tag-info tabular-nums">${i.length}/${e.length} Data</span>
      </div>
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
            ${i.length===0?`<tr><td colspan="5" class="text-center">${e.length===0?`Antrean verifikasi kosong. Semua kiriman telah diproses.`:`Tidak ada antrean absensi mahasiswa yang cocok dengan pencarian.`}</td></tr>`:i.map(e=>{let r=t[e.user_id],i=n[e.sesi_id];return`
                        <tr>
                          <td>
                            <strong>${y(r?.nama_lengkap||`-`)}</strong>
                            <div class="meta-line tabular-nums">${y(r?.npm||`-`)}</div>
                          </td>
                          <td>
                            <strong>${y(i?.mata_kuliah||`-`)}</strong>
                            <div class="meta-line">Pertemuan ke-${i?.pertemuan_ke||`-`}</div>
                          </td>
                          <td>
                            <div class="tabular-nums">${y(p(e.waktu_kirim))}</div>
                            <div style="margin-top:5px;">${Ae(e)}</div>
                          </td>
                          <td>
                            ${e.foto_url?`<button type="button" class="btn btn-secondary btn-sm btn-view-img" data-url="${y(e.foto_url)}" data-title="Foto Stempel Waktu · ${y(r?.nama_lengkap||``)}">Periksa Foto</button>`:`<span class="meta-line">Tidak ada foto</span>`}
                          </td>
                          <td>
                            <div class="row-actions">
                              <button type="button" class="btn btn-success-soft btn-sm btn-acc-absen" data-id="${e.id}" data-user="${e.user_id}">Terima</button>
                              <button type="button" class="btn btn-danger-soft btn-sm btn-reject-absen" data-id="${e.id}" data-user="${e.user_id}">Tolak</button>
                            </div>
                          </td>
                        </tr>
                      `}).join(``)}
          </tbody>
        </table>
      </div>
    </div>
  `}function mt(){$(),Me(),u(`filter-verifikasi-absen-search`,e=>{l.filters.verifikasiAbsenSearch=e}),document.querySelectorAll(`.btn-acc-absen`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-id`),n=e.getAttribute(`data-user`),r=l.absensi.find(e=>e.id===t),i=l.profiles.find(e=>e.id===n),a=r?l.sesiAbsensi.find(e=>e.id===r.sesi_id):null,o=a?`${a.mata_kuliah} (Pertemuan ke-${a.pertemuan_ke})`:`perkuliahan`,s=l.currentUser.nama_lengkap,c=l.currentUser.id;try{await R.update(`absensi`,t,{status_verifikasi:`Disetujui`,pj_id:c,pj_nama:s,dicatat_oleh:c});let e=[{user_id:n,judul:`Absensi Disetujui`,pesan:`Kehadiran Anda pada ${o} telah disetujui oleh ${s}.`,tipe:`success`}];k([`ketua`,`admin`]).forEach(t=>{e.push({user_id:t,judul:`Persetujuan Absensi Mahasiswa`,pesan:`Absensi ${i?.nama_lengkap||`Mahasiswa`} (${i?.npm||`-`}) pada ${o} telah disetujui oleh ${s}.`,tipe:`success`})}),await A(e),await R.loadAll(),S(`Kehadiran mahasiswa disetujui!`,`success`),B(),V()}catch(e){S(e.message||`Gagal menyetujui absensi.`,`danger`)}})}),document.querySelectorAll(`.btn-reject-absen`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-id`),n=e.getAttribute(`data-user`),r=l.absensi.find(e=>e.id===t),i=l.profiles.find(e=>e.id===n),a=r?l.sesiAbsensi.find(e=>e.id===r.sesi_id):null,o=a?`${a.mata_kuliah} (Pertemuan ke-${a.pertemuan_ke})`:`perkuliahan`,s=l.currentUser.nama_lengkap,c=l.currentUser.id;try{await R.update(`absensi`,t,{status_kehadiran:`Alpha`,status_verifikasi:`Ditolak`,pj_id:c,pj_nama:s,dicatat_oleh:c});let e=[{user_id:n,judul:`Absensi Ditolak`,pesan:`Kiriman absensi Anda pada ${o} ditolak oleh ${s}. Hubungi Ketua/Admin jika terjadi kekeliruan.`,tipe:`danger`}];k([`ketua`,`admin`]).forEach(t=>{e.push({user_id:t,judul:`Absensi Mahasiswa Ditolak`,pesan:`Absensi ${i?.nama_lengkap||`Mahasiswa`} (${i?.npm||`-`}) pada ${o} ditolak oleh ${s}.`,tipe:`danger`})}),await A(e),await R.loadAll(),S(`Absensi ditolak dan dicatat Alpha.`,`warning`),B(),V()}catch(e){S(e.message||`Gagal menolak absensi.`,`danger`)}})})}function q(e,t){let n=t[e.sesi_id];return n&&n.mata_kuliah?`mk:${String(n.mata_kuliah||``).trim().toLowerCase()}::p${Number(n.pertemuan_ke||0)}::u:${e.user_id}`:`sesi:${e.sesi_id}::u:${e.user_id}`}function ht(){let e=Object.fromEntries(l.sesiAbsensi.map(e=>[e.id,e])),t=new Map;l.absensi.forEach(n=>{let r=q(n,e);t.has(r)||t.set(r,[]),t.get(r).push(n)});let n=[...l.absensi].sort((e,t)=>new Date(t.waktu_kirim||t.created_at||0)-new Date(e.waktu_kirim||e.created_at||0)),r=n.filter(n=>{let r=t.get(q(n,e))||[],i=String(n.catatan||``).toLowerCase().includes(`manual`);return!!n.is_manual||i||r.length>1}),i=n.filter(n=>(t.get(q(n,e))||[]).length>1),a=[];return t.forEach(e=>{e.length<=1||[...e].sort((e,t)=>new Date(t.waktu_kirim||t.created_at||0)-new Date(e.waktu_kirim||e.created_at||0)).slice(1).forEach(e=>{e?.id&&a.push(e.id)})}),{sesiMap:e,pairGroups:t,sortedAbsensi:n,manualRecords:r,duplicateRecords:i,duplicateIdsToDelete:a}}function gt(e,t){if(!e||!t)return``;let n=Object.fromEntries(l.sesiAbsensi.map(e=>[e.id,e])),r=q({sesi_id:e,user_id:t},n),i=l.absensi.filter(e=>q(e,n)===r).sort((e,t)=>new Date(t.waktu_kirim||t.created_at||0)-new Date(e.waktu_kirim||e.created_at||0));if(i.length===0)return``;let a=i[0];return`
    <div class="card glass-panel" style="padding:12px 14px;margin-bottom:14px;border-color:rgba(245,158,11,0.45);background:rgba(245,158,11,0.08);">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;">
        <div class="meta-line" style="margin:0;color:var(--text-primary);">
          <strong>Peringatan Data Sudah Ada:</strong> ${i.length>1?`Terdapat <strong>${i.length} data berulang/duplikat</strong> untuk mahasiswa &amp; pertemuan ini.`:`Mahasiswa ini sudah tercatat <strong>${y(a.status_kehadiran)}</strong> (${a.is_manual?`Manual PJ`:y(a.mode_absen||`Mandiri`)} · ${y(p(a.waktu_kirim))}).`}
        </div>
        <button type="button" class="btn btn-danger-soft btn-sm btn-del-manual-absen" data-id="${a.id}">
          Hapus Data Ini
        </button>
      </div>
    </div>
  `}function _t(){let e=l.profiles.filter(e=>o(e.role)),t=l.currentUser,n=Object.fromEntries(l.profiles.map(e=>[e.id,e])),r=Array.from(new Set(l.sesiAbsensi.map(e=>e.mata_kuliah).filter(Boolean))),a=r[0]||``,s=[...l.sesiAbsensi].filter(e=>!a||e.mata_kuliah===a).sort((e,t)=>Number(e.pertemuan_ke||0)-Number(t.pertemuan_ke||0)),c=s[0]?.id||``,u=e[0]?.id||``,{sesiMap:d,pairGroups:f,sortedAbsensi:m,manualRecords:h,duplicateRecords:g,duplicateIdsToDelete:_}=ht(),v=(l.filters.manualAbsenSearch||``).toLowerCase(),b=l.filters.manualAbsenMode||`manual`,x=(b===`dup`?g:b===`all`?m:h).filter(e=>{if(!v)return!0;let t=n[e.user_id],r=d[e.sesi_id];return`${t?.nama_lengkap||``} ${t?.npm||``} ${r?.mata_kuliah||``} ${e.status_kehadiran||``} ${e.pj_nama||``} ${e.catatan||``}`.toLowerCase().includes(v)}),S=new Set(x.map(e=>e.id));l.filters.manualSelectedIds=(l.filters.manualSelectedIds||[]).filter(e=>S.has(e));let w=new Set(l.filters.manualSelectedIds),T=x.length>0&&x.every(e=>w.has(e.id));return`
    <div class="page-header">
      <div>
        <span class="meta-line">Anti-Kecurangan · Wajib Foto Langsung Penanggung Jawab &amp; GPS</span>
        <h2>Absensi Manual</h2>
      </div>
    </div>

    <div class="card glass-panel" style="max-width:680px;margin-bottom:20px;">
      <div class="card-header">
        <div>
          <h3>Pencatatan Manual oleh ${y(i[t.role]||t.role)}</h3>
          <span class="meta-line">Pilih mata kuliah dan pertemuan secara terpisah untuk mencatat Alpha / Izin / Sakit / Hadir</span>
        </div>
      </div>

      <form id="form-manual-pj">
        <div class="grid-2" style="margin-bottom:0;">
          <div class="field-group">
            <label for="manual-matkul">Pilih Mata Kuliah</label>
            <select id="manual-matkul" required>
              ${r.length===0?`<option value="">Belum ada mata kuliah</option>`:r.map(e=>`<option value="${y(e)}">${y(e)}</option>`).join(``)}
            </select>
          </div>
          <div class="field-group">
            <label for="manual-pertemuan">Pilih Pertemuan</label>
            <select id="manual-pertemuan" required>
              ${s.length===0?`<option value="">Belum ada pertemuan</option>`:s.map(e=>`<option value="${e.id}">Pertemuan ${e.pertemuan_ke}</option>`).join(``)}
            </select>
          </div>
        </div>

        <div class="field-group">
          <label for="manual-student">Pilih Mahasiswa</label>
          <select id="manual-student" required>
            ${e.map(e=>`<option value="${e.id}">${y(e.nama_lengkap)} (${y(e.npm)})</option>`).join(``)}
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
              value="${y(t.nama_lengkap)} (${y(i[t.role]||t.role)})"
              readonly
              disabled
            />
          </div>
        </div>

        <div class="field-group">
          <label for="manual-catatan">Keterangan / Alasan Pencatatan Manual</label>
          <textarea id="manual-catatan" rows="2" placeholder="Contoh: Ponsel mahasiswa mengalami kendala saat di kelas" required></textarea>
        </div>

        <div id="manual-existing-notice">${gt(c,u)}</div>

        <button type="submit" class="btn btn-primary btn-block">
          Lanjut Ambil Foto Penanggung Jawab &amp; GPS
        </button>
      </form>
    </div>

    <div class="card glass-panel" id="manual-absensi-list-card">
      <div class="card-header">
        <div>
          <h3>Daftar &amp; Hapus Absensi Manual / Duplikat</h3>
          <span class="meta-line">
            ${h.length} catatan manual/duplikat · ${_.length>0?`<strong class="text-warning">${_.length} data duplikat berulang siap dihapus</strong>`:`Tidak ada duplikat berulang terdeteksi`}
          </span>
        </div>
        <div class="row-actions">
          ${w.size>0?`<button type="button" id="btn-delete-selected-manual" class="btn btn-danger-soft btn-sm">Hapus Terpilih (${w.size})</button>`:``}
          <button
            type="button"
            id="btn-cleanup-manual-dups"
            class="btn ${_.length>0?`btn-danger-soft`:`btn-secondary`} btn-sm"
            title="Hapus otomatis data absensi yang terinput berulang kali dan sisakan catatan terbaru"
          >
            Hapus Duplikat (${_.length})
          </button>
        </div>
      </div>

      <div class="toolbar-filters">
        <input
          type="search"
          id="filter-manual-search"
          placeholder="Cari nama mahasiswa, NPM, mata kuliah, PJ, atau alasan..."
          value="${y(l.filters.manualAbsenSearch||``)}"
        />
        <select id="filter-manual-mode">
          <option value="manual" ${b===`manual`?`selected`:``}>Data Manual &amp; Duplikat (${h.length})</option>
          <option value="dup" ${b===`dup`?`selected`:``}>Hanya Duplikat / Berulang (${g.length})</option>
          <option value="all" ${b===`all`?`selected`:``}>Semua Data Absensi (${m.length})</option>
        </select>
      </div>

      <div class="table-wrap table-scroll-5-compact">
        <table>
          <thead>
            <tr>
              <th style="width:38px;text-align:center;">
                <input
                  type="checkbox"
                  id="chk-manual-select-all"
                  aria-label="Pilih semua data yang tampil"
                  ${T?`checked`:``}
                  ${x.length===0?`disabled`:``}
                />
              </th>
              <th>Mahasiswa</th>
              <th>Mata Kuliah &amp; Pertemuan</th>
              <th>Status &amp; Keterangan</th>
              <th>Penanggung Jawab</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${x.length===0?`<tr><td colspan="6" class="text-center">Belum ada data absensi manual atau duplikat yang cocok.</td></tr>`:x.map(e=>{let t=n[e.user_id],r=d[e.sesi_id],i=f.get(q(e,d))||[],a=i.length,o=a>1?[...i].sort((e,t)=>new Date(t.waktu_kirim||t.created_at||0)-new Date(e.waktu_kirim||e.created_at||0)):[],s=a>1&&o[0]?.id!==e.id,c=w.has(e.id);return`
                        <tr>
                          <td style="text-align:center;">
                            <input
                              type="checkbox"
                              class="chk-manual-row"
                              data-id="${e.id}"
                              aria-label="Pilih baris absensi"
                              ${c?`checked`:``}
                            />
                          </td>
                          <td>
                            <strong>${y(t?.nama_lengkap||`-`)}</strong>
                            <div class="meta-line tabular-nums">${y(t?.npm||`-`)}</div>
                          </td>
                          <td>
                            <strong>${y(r?.mata_kuliah||`-`)}</strong>
                            <div class="meta-line tabular-nums">Pert. ${r?.pertemuan_ke||`-`} · ${y(p(e.waktu_kirim))}</div>
                          </td>
                          <td>
                            <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                              <span class="status-tag ${C(e.status_kehadiran)}">${y(e.status_kehadiran)}</span>
                              ${a>1?`<span class="status-tag ${s?`tag-danger`:`tag-warning`}" title="Terinput ${a} kali pada mata kuliah, pertemuan & mahasiswa yang sama">${s?`Duplikat Lama (${a}x)`:`Duplikat Terbaru (${a}x)`}</span>`:``}
                            </div>
                            <div class="meta-line">${y(e.catatan||`-`)}</div>
                          </td>
                          <td>
                            <span class="status-tag ${C(e.status_verifikasi)}">${y(e.status_verifikasi)}</span>
                            <div class="meta-line">${e.is_manual?`Manual PJ: `:`Mandiri: `}${y(e.pj_nama||`-`)}</div>
                          </td>
                          <td>
                            <div class="row-actions">
                              <button type="button" class="btn btn-secondary btn-sm btn-detail-absen" data-absen-id="${e.id}" data-sesi-id="${e.sesi_id}">Detail</button>
                              <button type="button" class="btn btn-danger-soft btn-sm btn-del-manual-absen" data-id="${e.id}" title="Hapus absensi ini">
                                Hapus
                              </button>
                            </div>
                          </td>
                        </tr>
                      `}).join(``)}
          </tbody>
        </table>
      </div>
    </div>
  `}async function vt(e){let t=Array.from(new Set((e||[]).filter(Boolean)));if(t.length){if(l.mode===`supabase`&&l.supabase){let{error:e}=await l.supabase.from(`absensi`).delete().in(`id`,t);if(e)throw e}else for(let e of t)await R.remove(`absensi`,e)}}function yt(){document.querySelectorAll(`.btn-del-manual-absen`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-id`),n=l.absensi.find(e=>e.id===t);if(!n)return;let r=l.profiles.find(e=>e.id===n.user_id),i=l.sesiAbsensi.find(e=>e.id===n.sesi_id),a=`${r?.nama_lengkap||`Mahasiswa`} (${r?.npm||`-`})`,o=i?`${i.mata_kuliah} Pertemuan ke-${i.pertemuan_ke}`:`sesi terkait`;K({title:`Hapus Data Absensi`,subtitle:a,message:`Apakah Anda yakin ingin menghapus data absensi "${n.status_kehadiran}" untuk ${a} pada ${o} (${p(n.waktu_kirim)})?`,onConfirm:async()=>{try{await R.remove(`absensi`,t),l.filters.manualSelectedIds=(l.filters.manualSelectedIds||[]).filter(e=>e!==t),await R.loadAll(),S(`Data absensi ${r?.nama_lengkap||``} berhasil dihapus.`,`success`),B(),V()}catch(e){S(e.message||`Gagal menghapus data absensi.`,`danger`)}}})})})}function bt(){let e=()=>{let e=document.getElementById(`manual-existing-notice`),t=document.getElementById(`manual-pertemuan`)?.value||``,n=document.getElementById(`manual-student`)?.value||``;e&&(e.innerHTML=gt(t,n),yt())};document.getElementById(`manual-matkul`)?.addEventListener(`change`,t=>{let n=t.target.value,r=document.getElementById(`manual-pertemuan`);if(!r)return;let i=[...l.sesiAbsensi].filter(e=>e.mata_kuliah===n).sort((e,t)=>Number(e.pertemuan_ke||0)-Number(t.pertemuan_ke||0));r.innerHTML=i.length===0?`<option value="">Belum ada pertemuan</option>`:i.map(e=>`<option value="${e.id}">Pertemuan ${e.pertemuan_ke}</option>`).join(``),e()}),document.getElementById(`manual-pertemuan`)?.addEventListener(`change`,e),document.getElementById(`manual-student`)?.addEventListener(`change`,e),document.getElementById(`form-manual-pj`)?.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`manual-pertemuan`)?.value,n=document.getElementById(`manual-student`).value,r=document.getElementById(`manual-status`).value,i=l.currentUser.id,a=l.currentUser.nama_lengkap,o=document.getElementById(`manual-catatan`).value.trim();!t||!n?S(`Pilih mata kuliah, pertemuan, dan mahasiswa terlebih dahulu.`,`warning`):xe(`manual_pj`,{sesiId:t,studentId:n,studentName:l.profiles.find(e=>e.id===n)?.nama_lengkap||`Mahasiswa`,statusKehadiran:r,pjId:i,pjNama:a,catatan:o})}),document.getElementById(`filter-manual-search`)?.addEventListener(`input`,e=>{l.filters.manualAbsenSearch=e.target.value,V();let t=document.getElementById(`filter-manual-search`);t&&(t.focus(),t.setSelectionRange(t.value.length,t.value.length))}),document.getElementById(`filter-manual-mode`)?.addEventListener(`change`,e=>{l.filters.manualAbsenMode=e.target.value,l.filters.manualSelectedIds=[],V()}),document.getElementById(`chk-manual-select-all`)?.addEventListener(`change`,e=>{let t=!!e.target.checked,n=Array.from(document.querySelectorAll(`.chk-manual-row`));l.filters.manualSelectedIds=t?n.map(e=>e.getAttribute(`data-id`)).filter(Boolean):[],V()}),document.querySelectorAll(`.chk-manual-row`).forEach(e=>{e.addEventListener(`change`,()=>{let t=e.getAttribute(`data-id`);if(!t)return;let n=new Set(l.filters.manualSelectedIds||[]);e.checked?n.add(t):n.delete(t),l.filters.manualSelectedIds=Array.from(n),V()})}),document.getElementById(`btn-delete-selected-manual`)?.addEventListener(`click`,()=>{let e=[...l.filters.manualSelectedIds||[]];e.length?K({title:`Hapus Data Absensi Terpilih`,subtitle:`${e.length} Data Dipilih`,message:`Apakah Anda yakin ingin menghapus ${e.length} data absensi yang Anda pilih? Tindakan ini tidak dapat dibatalkan.`,onConfirm:async()=>{try{await vt(e),l.filters.manualSelectedIds=[],await R.loadAll(),S(`${e.length} data absensi terpilih berhasil dihapus.`,`success`),B(),V()}catch(e){S(e.message||`Gagal menghapus data absensi terpilih.`,`danger`)}}}):S(`Pilih minimal satu data absensi untuk dihapus.`,`info`)}),document.querySelectorAll(`.btn-detail-absen`).forEach(e=>{e.addEventListener(`click`,()=>{Pe(e.getAttribute(`data-absen-id`),e.getAttribute(`data-sesi-id`))})}),document.getElementById(`btn-cleanup-manual-dups`)?.addEventListener(`click`,()=>{let{duplicateIdsToDelete:e}=ht();e.length?K({title:`Hapus Duplikat Absensi Berulang`,subtitle:`${e.length} Data Duplikat`,message:`Sistem akan menyimpan 1 catatan terbaru untuk setiap mahasiswa & pertemuan, lalu menghapus ${e.length} catatan duplikat lama yang terinput berulang kali. Lanjutkan?`,onConfirm:async()=>{try{await vt(e),l.filters.manualSelectedIds=[],await R.loadAll(),S(`${e.length} data absensi duplikat berhasil dihapus.`,`success`),B(),V()}catch(e){S(e.message||`Gagal menghapus data duplikat absensi.`,`danger`)}}}):S(`Tidak ada data absensi duplikat saat ini. Centang baris atau klik Hapus pada baris jika ingin menghapus data tertentu.`,`info`)}),yt()}function xt(){let e=Object.fromEntries(l.profiles.map(e=>[e.id,e])),t=Object.fromEntries(l.sesiAbsensi.map(e=>[e.id,e])),n=l.filters.riwayatSearch.toLowerCase(),r=l.filters.riwayatStatus,i=l.absensi.filter(i=>{let a=e[i.user_id],o=t[i.sesi_id],s=`${a?.nama_lengkap||``} ${a?.npm||``} ${o?.mata_kuliah||``} ${i.pj_nama||``}`.toLowerCase(),c=!n||s.includes(n),l=r===`Semua`||i.status_kehadiran===r;return c&&l});return`
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
          value="${y(l.filters.riwayatSearch)}"
        />
        <select id="filter-riwayat-status">
          ${[`Semua`,`Hadir`,`Izin`,`Sakit`,`Alpha`,`Belum Absen!`].map(e=>`<option value="${e}" ${r===e?`selected`:``}>Status: ${e}</option>`).join(``)}
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
            ${i.length===0?`<tr><td colspan="6" class="text-center">Tidak ada data kehadiran yang cocok.</td></tr>`:i.map(n=>{let r=e[n.user_id],i=t[n.sesi_id];return`
                        <tr>
                          <td>
                            <strong>${y(r?.nama_lengkap||`-`)}</strong>
                            <div class="meta-line tabular-nums">${y(r?.npm||`-`)}</div>
                          </td>
                          <td>
                            <strong>${y(i?.mata_kuliah||`-`)}</strong>
                            <div class="meta-line">Pert. ${i?.pertemuan_ke||`-`} · ${y(p(n.waktu_kirim))}</div>
                          </td>
                          <td>${Ae(n)}</td>
                          <td><span class="status-tag ${C(n.status_kehadiran)}">${y(n.status_kehadiran)}</span></td>
                          <td>
                            <span class="status-tag ${C(n.status_verifikasi)}">${y(n.status_verifikasi)}</span>
                            <div class="meta-line">${n.is_manual?`Manual PJ: `:`PJ: `}${y(n.pj_nama||`-`)}</div>
                          </td>
                          <td>
                            <div class="row-actions">
                              <button type="button" class="btn btn-secondary btn-sm btn-detail-absen" data-absen-id="${n.id}" data-sesi-id="${n.sesi_id}">Detail</button>
                              <button type="button" class="btn-icon-only btn-edit-absen" data-id="${n.id}" title="Edit status" aria-label="Edit status">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                              </button>
                              <button type="button" class="btn-icon-only danger btn-del-absen" data-id="${n.id}" title="Hapus data" aria-label="Hapus data">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      `}).join(``)}
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
            ${l.pengajuanCuti.length===0?`<tr><td colspan="6" class="text-center">Belum ada pengajuan cuti masuk.</td></tr>`:l.pengajuanCuti.map(t=>{let n=e[t.user_id],r=t.waktu_pengajuan||t.created_at;return`
                        <tr>
                          <td>
                            <strong>${y(n?.nama_lengkap||`-`)}</strong>
                            <div class="meta-line tabular-nums">${y(n?.npm||`-`)}</div>
                          </td>
                          <td class="tabular-nums">${y(p(r))}</td>
                          <td class="tabular-nums">${y(_(t.tanggal_mulai))} s.d. ${y(_(t.tanggal_selesai))}</td>
                          <td>
                            <div>${y(t.alasan)}</div>
                            ${t.surat_url?`<button type="button" class="btn-link-inline btn-view-img" data-url="${y(t.surat_url)}" data-title="Surat Cuti · ${y(n?.nama_lengkap||``)}">Lihat Surat Resmi</button>`:``}
                          </td>
                          <td><span class="status-tag ${C(t.status)}">${y(t.status)}</span></td>
                          <td>
                            <div class="row-actions">
                              <button type="button" class="btn btn-success-soft btn-sm btn-cuti-action" data-id="${t.id}" data-user="${t.user_id}" data-status="Disetujui">Setujui</button>
                              <button type="button" class="btn btn-danger-soft btn-sm btn-cuti-action" data-id="${t.id}" data-user="${t.user_id}" data-status="Ditolak">Tolak</button>
                            </div>
                          </td>
                        </tr>
                      `}).join(``)}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Riwayat Pengajuan Cuti Disetujui Per Mahasiswa -->
    ${(()=>{let t=l.pengajuanCuti.filter(e=>e.status===`Disetujui`).sort((e,t)=>new Date(t.waktu_pengajuan||t.created_at)-new Date(e.waktu_pengajuan||e.created_at));return`
        <div class="card glass-panel">
          <div class="card-header">
            <div>
              <h3>Riwayat Pengajuan Cuti</h3>
              <span class="meta-line">Daftar pengajuan cuti mahasiswa yang telah disetujui (${t.length} catatan)</span>
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
                ${t.length===0?`<tr><td colspan="6" class="text-center">Belum ada pengajuan cuti yang disetujui.</td></tr>`:t.map(t=>{let n=e[t.user_id],r=t.ditinjau_oleh?e[t.ditinjau_oleh]?.nama_lengkap:`-`,i=_(d(new Date(t.waktu_pengajuan||t.created_at)));return`
                            <tr>
                              <td>
                                <strong>${y(n?.nama_lengkap||`-`)}</strong>
                                <div class="meta-line tabular-nums">${y(n?.npm||`-`)}</div>
                              </td>
                              <td class="tabular-nums">${y(i)}</td>
                              <td class="tabular-nums">${y(_(t.tanggal_mulai))} s.d. ${y(_(t.tanggal_selesai))}</td>
                              <td>${y(t.alasan)}</td>
                              <td><strong>${y(r||`-`)}</strong></td>
                              <td>
                                ${t.surat_url?`<button type="button" class="btn btn-secondary btn-sm btn-view-img" data-url="${y(t.surat_url)}" data-title="Surat Cuti · ${y(n?.nama_lengkap||``)}">Lihat Surat</button>`:`-`}
                              </td>
                            </tr>
                          `}).join(``)}
              </tbody>
            </table>
          </div>
        </div>
      `})()}
  `}function St(){$(),Me(),document.getElementById(`filter-riwayat-search`)?.addEventListener(`input`,e=>{l.filters.riwayatSearch=e.target.value,V();let t=document.getElementById(`filter-riwayat-search`);t&&(t.focus(),t.setSelectionRange(t.value.length,t.value.length))}),document.getElementById(`filter-riwayat-status`)?.addEventListener(`change`,e=>{l.filters.riwayatStatus=e.target.value,V()}),document.querySelectorAll(`.btn-detail-absen`).forEach(e=>{e.addEventListener(`click`,()=>{Pe(e.getAttribute(`data-absen-id`),e.getAttribute(`data-sesi-id`))})}),document.querySelectorAll(`.btn-edit-absen`).forEach(e=>{e.addEventListener(`click`,()=>{let t=l.absensi.find(t=>t.id===e.getAttribute(`data-id`));if(!t)return;let n=l.profiles.find(e=>e.id===t.user_id);document.getElementById(`edit-absen-id`).value=t.id,document.getElementById(`edit-absen-student`).textContent=`${n?.nama_lengkap||`-`} (${n?.npm||`-`})`,document.getElementById(`edit-absen-status`).value=t.status_kehadiran,document.getElementById(`edit-absen-verif`).value=t.status_verifikasi;let r=document.getElementById(`edit-absen-pj`);r&&(r.value=`${l.currentUser.nama_lengkap} (${i[l.currentUser.role]||l.currentUser.role})`),document.getElementById(`edit-absen-catatan`).value=t.catatan||``,document.getElementById(`modal-edit-absen`).classList.remove(`hidden`)})}),document.querySelectorAll(`.btn-del-absen`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-id`);try{await R.remove(`absensi`,t),await R.loadAll(),S(`Catatan absensi dihapus.`,`info`),B(),V()}catch(e){S(e.message||`Gagal menghapus data absensi.`,`danger`)}})}),document.querySelectorAll(`.btn-cuti-action`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-id`),n=e.getAttribute(`data-user`),r=e.getAttribute(`data-status`);try{await R.update(`pengajuan_cuti`,t,{status:r,ditinjau_oleh:l.currentUser.id}),await R.insert(`pemberitahuan`,{user_id:n,judul:`Pengajuan Cuti ${r}`,pesan:`Pengajuan cuti Anda telah ${r.toLowerCase()} oleh ${l.currentUser.nama_lengkap}.`,tipe:r===`Disetujui`?`success`:`danger`,dibaca:!1}),await R.loadAll(),S(`Status pengajuan cuti diubah menjadi ${r}.`,`success`),B(),V()}catch(e){S(e.message||`Gagal memperbarui status cuti.`,`danger`)}})})}function Ct(){let e=l.pengaturan||{},[t,n]=d(new Date).split(`-`),r=Math.max(0,Math.min(11,Number(n||1)-1)),a=Number(t||2026),o=[`Januari`,`Februari`,`Maret`,`April`,`Mei`,`Juni`,`Juli`,`Agustus`,`September`,`Oktober`,`November`,`Desember`],s=o[r]||`Januari`,c=Array.from(new Set([2025,2026,2027,2028,2029,2030,a])).sort((e,t)=>e-t);return`
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
              <strong>${y(e.nama_bank||`BCA`)}</strong>
            </div>
            <div>
              <span class="meta-line">Atas Nama</span>
              <strong>${y(e.atas_nama_rekening||`-`)}</strong>
            </div>
          </div>
          <div class="bank-account-copy">
            <div>
              <span class="meta-line">Nomor Rekening</span>
              <strong class="tabular-nums">${y(e.no_rekening||`-`)}</strong>
            </div>
            <button type="button" id="btn-copy-rekening-bendahara" class="btn btn-secondary btn-sm" data-rek="${y(e.no_rekening||``)}">
              Salin Rekening
            </button>
          </div>
        </div>

        <div class="payment-channel-box">
          <div class="qris-header-row">
            <div>
              <strong>${y(e.qris_merchant_name||`Mas_hy, Fashion`)}</strong>
              <span class="meta-line tabular-nums">NMID: ${y(e.qris_nmid||`-`)}</span>
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
                  ${o.map(e=>`<option value="${e}" ${e===s?`selected`:``}>${e}</option>`).join(``)}
                </select>
                <select id="massal-tahun" aria-label="Pilih Tahun" required class="tabular-nums">
                  ${c.map(e=>`<option value="${e}" ${e===a?`selected`:``}>${e}</option>`).join(``)}
                </select>
              </div>
            </div>
          </div>
          <div class="field-group" style="margin-top:-2px;">
            <span class="meta-line">
              Format Periode Tagihan:
              <strong id="massal-periode-preview" class="text-cyan">Minggu 1 - ${y(s)} ${a}</strong>
            </span>
          </div>
          <div class="grid-2" style="margin-bottom:0;">
            <div class="field-group">
              <label for="massal-nominal">Nominal Tagihan (Min Rp 2.000)</label>
              <input type="number" id="massal-nominal" min="2000" step="500" value="${e.nominal_kas_default||1e4}" required class="tabular-nums" />
            </div>
            <div class="field-group">
              <label for="massal-pj">Penanggung Jawab Kas (Akun Aktif · Terkunci)</label>
              <input
                type="text"
                id="massal-pj"
                class="input-locked"
                value="${y(l.currentUser.nama_lengkap)} (${y(i[l.currentUser.role]||l.currentUser.role)})"
                readonly
                disabled
              />
            </div>
          </div>
          <button type="submit" class="btn btn-primary btn-block">Sebarkan Tagihan Kas ke Semua Mahasiswa</button>
        </form>
      </div>
    </div>
  `}function wt(){document.getElementById(`btn-copy-rekening-bendahara`)?.addEventListener(`click`,e=>{let t=e.target.getAttribute(`data-rek`);navigator.clipboard?.writeText(t),S(`Nomor rekening ${t} disalin!`,`success`)}),document.getElementById(`btn-preview-qris-10m`)?.addEventListener(`click`,()=>{ze({id:``,periode:`QRIS Pembayaran Resmi Kelas R3S`,nominal_tagihan:(l.pengaturan||{}).nominal_kas_default||1e4},{previewOnly:!0})});let e=document.getElementById(`massal-minggu`),t=document.getElementById(`massal-bulan`),n=document.getElementById(`massal-tahun`),r=document.getElementById(`massal-periode-preview`),i=()=>{let r=e?.value.trim()||``,i=t?.value.trim()||``,a=n?.value.trim()||``;return r&&i&&a?`${r} - ${i} ${a}`:``},a=()=>{r&&(r.textContent=i()||`-`)};e?.addEventListener(`change`,a),t?.addEventListener(`change`,a),n?.addEventListener(`change`,a),document.getElementById(`form-tagihan-massal`)?.addEventListener(`submit`,async e=>{e.preventDefault();let t=i(),n=Number(document.getElementById(`massal-nominal`).value),r=l.profiles.filter(e=>s(e.role));if(!t)S(`Pilih periode minggu, bulan, dan tahun terlebih dahulu.`,`danger`);else if(n<2e3)S(`Nominal tagihan kas minimal Rp 2.000.`,`danger`);else if(r.length===0)S(`Belum ada akun anggota kelas terdaftar.`,`warning`);else try{let i=t.trim().toLowerCase(),o=r.filter(e=>!l.iuranKas.some(t=>t.user_id===e.id&&String(t.periode||``).trim().toLowerCase()===i));if(o.length===0){S(`Tagihan untuk periode "${t}" sudah pernah diterbitkan ke seluruh anggota kelas.`,`warning`);return}let s=l.currentUser.id,c=l.currentUser.nama_lengkap,u=o.map(e=>({user_id:e.id,periode:t,nominal_tagihan:n,nominal_dibayar:0,nominal_terverifikasi:0,nominal_pending:0,metode_bayar:null,bukti_url:``,pj_id:s,pj_nama:c,dicatat_oleh:s,status:`Belum Lunas`}));await R.insert(`iuran_kas`,u);let d=o.map(e=>({user_id:e.id,judul:`Tagihan Kas Baru: ${t}`,pesan:`Tagihan kas sebesar ${v(n)} telah diterbitkan oleh ${c}.`,tipe:`info`,dibaca:!1}));await R.insert(`pemberitahuan`,d),await R.loadAll(),S(`Tagihan Kas ${t} (PJ: ${c}) berhasil disebar ke ${o.length} anggota kelas!`,`success`),e.target.reset(),a()}catch(e){S(e.message||`Gagal membuat tagihan kas.`,`danger`)}})}function Tt(){let e=l.profiles.filter(e=>s(e.role)),t=l.iuranKas.filter(e=>e.status===`Menunggu Verifikasi`),n=Object.fromEntries(l.profiles.map(e=>[e.id,e])),r=(l.filters.pembayaranSearch||``).trim().toLowerCase(),a=l.filters.pembayaranStatus||`Semua`,o=t.filter(e=>{if(!r)return!0;let t=n[e.user_id];return`${t?.nama_lengkap||``} ${t?.npm||``} ${i[t?.role]||t?.role||``} ${e.periode||``} ${e.metode_bayar||``}`.toLowerCase().includes(r)}),c=e.filter(e=>{let t=Y(e.id),n=t.sudahBayar,o=t.tunggakan<=0?`Lunas`:n>0?`Sebagian`:`Belum Lunas`;return a!==`Semua`&&o!==a?!1:!r||`${e.nama_lengkap||``} ${e.npm||``} ${i[e.role]||e.role||``} ${o}`.toLowerCase().includes(r)});return`
    <div class="page-header">
      <div>
        <span class="meta-line">Verifikasi Bukti Transfer &amp; Pengingat Tunggakan</span>
        <h2>Daftar Pembayaran &amp; Pengingat WA</h2>
      </div>
      <span class="status-tag tag-coral tabular-nums">${t.length} Bukti Menunggu Verifikasi</span>
    </div>

    <div class="card glass-panel" style="margin-bottom:20px;padding:14px 16px;">
      <div class="toolbar-filters" style="margin-bottom:0;">
        <input
          type="search"
          id="filter-pembayaran-search"
          placeholder="Cari daftar kas mahasiswa (nama, NIM, peran, periode, atau metode)..."
          value="${y(l.filters.pembayaranSearch||``)}"
        />
        <select id="filter-pembayaran-status" aria-label="Filter status kas mahasiswa">
          <option value="Semua" ${a===`Semua`?`selected`:``}>Semua Status Kas</option>
          <option value="Belum Lunas" ${a===`Belum Lunas`?`selected`:``}>Belum Lunas</option>
          <option value="Sebagian" ${a===`Sebagian`?`selected`:``}>Sebagian (Cicilan)</option>
          <option value="Lunas" ${a===`Lunas`?`selected`:``}>Lunas</option>
        </select>
        <span class="status-tag tag-info tabular-nums">${c.length}/${e.length} Anggota</span>
      </div>
    </div>

    <!-- Antrean Verifikasi Bukti Transfer -->
    <div class="card glass-panel" style="margin-bottom:20px;">
      <div class="card-header">
        <div>
          <h3>Antrean Verifikasi Pembayaran Kas</h3>
          <span class="meta-line">Klik Terima Kas untuk menyetujui setoran (otomatis Lunas jika penuh, atau Sebagian jika cicilan)</span>
        </div>
        <span class="status-tag tag-info tabular-nums">${o.length}/${t.length} Antrean</span>
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
            ${o.length===0?`<tr><td colspan="5" class="text-center">${t.length===0?`Tidak ada bukti pembayaran menunggu verifikasi.`:`Tidak ada antrean pembayaran yang cocok dengan pencarian.`}</td></tr>`:o.map(e=>{let t=n[e.user_id],r=T(e),i=E(e),a=Number(e.nominal_tagihan||0);return`
                        <tr>
                          <td>
                            <strong>${y(t?.nama_lengkap||`-`)}</strong>
                            <div class="meta-line tabular-nums">${y(t?.npm||`-`)}</div>
                          </td>
                          <td>
                            <strong>${y(e.periode)}</strong>
                            <div class="meta-line">${y(e.metode_bayar||`-`)} · ${y(p(e.tanggal_bayar))}</div>
                          </td>
                          <td class="tabular-nums">
                            <strong>${v(r)}</strong>
                            <div class="meta-line">Tagihan: ${v(a)} · Terbayar: ${v(i)}</div>
                          </td>
                          <td>
                            ${e.bukti_url?`<button type="button" class="btn btn-secondary btn-sm btn-view-img" data-url="${y(e.bukti_url)}" data-title="Bukti Kas · ${y(t?.nama_lengkap||``)}">Lihat Bukti</button>`:`<span class="meta-line">Tanpa lampiran</span>`}
                          </td>
                          <td>
                            <div class="row-actions">
                              <button type="button" class="btn btn-success-soft btn-sm btn-acc-kas" data-id="${e.id}">Terima Kas</button>
                              <button type="button" class="btn btn-danger-soft btn-sm btn-tolak-kas" data-id="${e.id}">Tolak</button>
                            </div>
                          </td>
                        </tr>
                      `}).join(``)}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Rekap Tunggakan per Mahasiswa & Tombol WA -->
    <div class="card glass-panel">
      <div class="card-header">
        <div>
          <h3>Rekapitulasi Pembayaran &amp; Tunggakan Anggota</h3>
          <span class="meta-line">Total sudah dibayar &amp; sisa tunggakan dihitung berdasarkan akumulasi nominal rupiah terverifikasi</span>
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
            ${c.length===0?`<tr><td colspan="5" class="text-center">${e.length===0?`Belum ada anggota kas terdaftar.`:`Tidak ada daftar kas mahasiswa yang cocok dengan pencarian.`}</td></tr>`:c.map(e=>{let t=Y(e.id),n=t.sudahBayar,r=t.tunggakan,i=r<=0?`Aman / Lunas`:n>0?`Sebagian`:`Belum Lunas`,a=r<=0?`tag-success`:n>0?`tag-warning`:`tag-danger`;return`
                        <tr>
                          <td>
                            <strong>${y(e.nama_lengkap)}</strong>
                            <div class="meta-line tabular-nums">${y(e.npm)}</div>
                          </td>
                          <td class="tabular-nums text-success">${v(n)}</td>
                          <td class="tabular-nums ${r>0?`text-danger`:`text-success`}">${v(r)}</td>
                          <td><span class="status-tag ${a}">${i}</span></td>
                          <td>
                            <div class="row-actions">
                              ${r>0?`<button type="button" class="btn btn-secondary btn-sm btn-remind-wa" data-user="${e.id}" data-nama="${y(e.nama_lengkap)}" data-sisa="${r}">Ingatkan via WhatsApp</button>
                                     <button type="button" class="btn btn-coral btn-sm btn-remind-portal" data-user="${e.id}" data-nama="${y(e.nama_lengkap)}" data-sisa="${r}">Notif Portal</button>`:`<span class="meta-line">Tidak ada tunggakan</span>`}
                            </div>
                          </td>
                        </tr>
                      `}).join(``)}
          </tbody>
        </table>
      </div>
    </div>
  `}function Et(){$(),u(`filter-pembayaran-search`,e=>{l.filters.pembayaranSearch=e}),document.getElementById(`filter-pembayaran-status`)?.addEventListener(`change`,e=>{l.filters.pembayaranStatus=e.target.value,V()}),document.querySelectorAll(`.btn-acc-kas`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-id`),n=l.iuranKas.find(e=>e.id===t);if(!n)return;let r=l.profiles.find(e=>e.id===n.user_id),i=T(n),a=E(n),o=Number(n.nominal_tagihan||0),s=Math.min(o,a+i),c=Math.max(0,o-s),u=c<=0,f=r?.nama_lengkap||`Mahasiswa`,p=l.currentUser.nama_lengkap,m=l.currentUser.id;try{try{await R.update(`iuran_kas`,t,{status:u?`Lunas`:`Sebagian`,nominal_dibayar:s,nominal_terverifikasi:s,nominal_pending:0,verified_by:m,pj_id:m,pj_nama:p})}catch(e){let n=String(e?.message||``).toLowerCase();if(!u&&(n.includes(`check`)||n.includes(`iuran_kas_status_check`)))await R.update(`iuran_kas`,t,{status:`Belum Lunas`,nominal_dibayar:s,nominal_terverifikasi:s,nominal_pending:0,verified_by:m,pj_id:m,pj_nama:p});else throw e}await R.insert(`transaksi_kas`,{jenis:`Pemasukan`,kategori:`Iuran Kas`,tanggal:d(new Date),keterangan:`Iuran Kas ${n.periode} (${u?`Lunas`:`Cicilan · Sisa ${v(c)}`}) · Pengirim: ${f} (${n.metode_bayar||`Transfer`})`,pengirim_nama:f,nominal:i,nota_url:n.bukti_url||``,terkait_user_id:n.user_id,pj_id:null,pj_nama:``,dicatat_oleh:l.currentUser.id});let e=u?`dan berstatus Lunas.`:`(Cicilan diterima. Sisa tunggakan: ${v(c)}).`,a=[{user_id:n.user_id,judul:u?`Pembayaran Kas Disetujui (Lunas)`:`Cicilan Pembayaran Kas Disetujui`,pesan:`Pembayaran kas ${n.periode} sebesar ${v(i)} telah disetujui oleh ${p} ${e}`,tipe:`success`}];k([`admin`]).forEach(t=>{a.push({user_id:t,judul:`Pembayaran Kas Mahasiswa Disetujui`,pesan:`Pembayaran kas ${f} (${r?.npm||`-`}) untuk ${n.periode} sebesar ${v(i)} disetujui oleh ${p} ${e}`,tipe:`success`})}),k([`bendahara`]).forEach(t=>{a.push({user_id:t,judul:`Verifikasi Pembayaran Kas Berhasil`,pesan:`Iuran kas ${f} (${n.periode}) sebesar ${v(i)} diverifikasi oleh ${p} ${e}`,tipe:`success`})}),await A(a),await R.loadAll(),S(u?`Pembayaran kas lunas & saldo pemasukan bertambah!`:`Cicilan ${v(i)} diterima! Sisa tunggakan: ${v(c)}.`,`success`),B(),V()}catch(e){S(e.message||`Gagal memverifikasi kas.`,`danger`)}})}),document.querySelectorAll(`.btn-tolak-kas`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-id`),n=l.iuranKas.find(e=>e.id===t);if(!n)return;let r=l.profiles.find(e=>e.id===n.user_id)?.nama_lengkap||`Mahasiswa`,i=l.currentUser.nama_lengkap,a=l.currentUser.id,o=E(n);try{try{await R.update(`iuran_kas`,t,{status:`Ditolak`,nominal_dibayar:o,nominal_terverifikasi:o,nominal_pending:0,pj_id:a,pj_nama:i})}catch(e){let n=String(e?.message||``).toLowerCase();if(n.includes(`check`)||n.includes(`iuran_kas_status_check`))await R.update(`iuran_kas`,t,{status:`Belum Lunas`,nominal_dibayar:o,nominal_terverifikasi:o,nominal_pending:0,metode_bayar:`Ditolak`,pj_id:a,pj_nama:i});else throw e}let e=[{user_id:n.user_id,judul:`Bukti Pembayaran Kas Ditolak`,pesan:`Bukti pembayaran kas ${n.periode} ditolak oleh ${i}. Silakan unggah ulang bukti yang valid.`,tipe:`danger`}];k([`admin`,`bendahara`]).forEach(t=>{e.push({user_id:t,judul:`Pembayaran Kas Ditolak`,pesan:`Bukti pembayaran kas ${r} untuk ${n.periode} ditolak oleh ${i}.`,tipe:`danger`})}),await A(e),await R.loadAll(),S(`Bukti pembayaran ditolak dan status diubah menjadi Ditolak.`,`warning`),B(),V()}catch(e){S(e.message||`Gagal menolak bukti pembayaran.`,`danger`)}})}),document.querySelectorAll(`.btn-remind-portal`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-user`),n=e.getAttribute(`data-nama`)||`Mahasiswa`,r=Number(e.getAttribute(`data-sisa`));try{await A([{user_id:t,judul:`Pengingat Tunggakan Kas Kelas`,pesan:`Anda memiliki sisa tunggakan kas sebesar ${v(r)}. Mohon segera melunasi di menu Pembayaran Kas.`,tipe:`warning`},{user_id:l.currentUser.id,judul:`Pengingat Portal Terkirim`,pesan:`Pengingat tunggakan kas sebesar ${v(r)} telah dikirim ke portal ${n}.`,tipe:`info`}]),await R.loadAll(),B(),S(`Notifikasi pengingat terkirim ke ${n}.`,`success`)}catch(e){S(e.message||`Gagal mengirim notifikasi.`,`danger`)}})}),document.querySelectorAll(`.btn-remind-wa`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-user`);t&&At(t)})})}function Dt(e,t){let n=l.pengaturan||{},r=(t.bills||[]).filter(e=>O(e)!==`Lunas`).map((e,t)=>{let n=Number(e.nominal_tagihan||0),r=E(e),i=D(e),a=O(e),o=a===`Ditolak`?`Bukti Ditolak`:a;return`${t+1}. ${e.periode} | Tagihan: ${v(n)} | Terbayar: ${v(r)} | Sisa: ${v(i)} (${o})`}),i=l.currentUser?.nama_lengkap||`Pengurus Kas Kelas`;return[`*PENGINGAT & BUKTI TUNGGAKAN KAS KELAS ${n.nama_kelas||`R3S`}*`,`--------------------------------`,`Nama  : ${e.nama_lengkap}`,`NIM   : ${e.npm||`-`}`,`Waktu : ${f(new Date)}`,``,`*Rincian Periode Tunggakan:*`,r.length?r.join(`
`):`- Total Tunggakan Berjalan: ${v(t.tunggakan)}`,``,`*Ringkasan Keuangan:*`,`- Total Sudah Dibayar : ${v(t.sudahBayar)}`,`- Total Sisa Tunggakan: *${v(t.tunggakan)}*`,``,`*Saluran Pembayaran Resmi:*`,`- Bank ${n.nama_bank||`BCA`}: ${n.no_rekening||`-`} (a.n. ${n.atas_nama_rekening||`Bendahara R3S`})`,`- QRIS: ${n.qris_merchant_name||`Mas_hy, Fashion`} (NMID: ${n.qris_nmid||`-`})`,``,`Mohon segera melakukan pembayaran melalui Portal Kas R3S dan mengunggah bukti pembayaran.`,`_(Terlampir gambar bukti rincian tunggakan kas resmi)_`,`Diterbitkan oleh: ${i}`].join(`
`)}function Ot(e,t){let n=l.pengaturan||{},r=(t.bills||[]).filter(e=>O(e)!==`Lunas`),a=r.slice(0,8),o=Math.max(0,r.length-8),s=450+Math.max(1,a.length+ +(o>0))*42,c=document.createElement(`canvas`);c.width=920,c.height=s;let u=c.getContext(`2d`);u.fillStyle=`#ffffff`,u.fillRect(0,0,920,s),u.strokeStyle=`#cbd5e1`,u.lineWidth=2,u.strokeRect(12,12,896,s-24),u.fillStyle=`#163a78`,u.fillRect(12,12,896,10),u.fillStyle=`#475569`,u.font=`bold 13px "Plus Jakarta Sans", Arial, sans-serif`,u.fillText(`AKTIVITAS KELAS RS · PUSAT ABSENSI & KAS KELAS ${String(n.nama_kelas||`R3S`).toUpperCase()}`,38,52),u.fillStyle=`#0f172a`,u.font=`bold 26px "Plus Jakarta Sans", Arial, sans-serif`,u.fillText(`BUKTI RINCIAN TUNGGAKAN KAS`,38,86),u.fillStyle=`#fee2e2`,u.strokeStyle=`#fca5a5`,u.lineWidth=1.5,u.fillRect(724,44,158,36),u.strokeRect(724,44,158,36),u.fillStyle=`#b91c1c`,u.font=`bold 14px "Plus Jakarta Sans", Arial, sans-serif`,u.textAlign=`center`,u.fillText(`BELUM LUNAS`,803,67),u.textAlign=`left`,u.strokeStyle=`#1e293b`,u.lineWidth=2,u.beginPath(),u.moveTo(38,104),u.lineTo(882,104),u.stroke(),u.fillStyle=`#f8fafc`,u.strokeStyle=`#e2e8f0`,u.lineWidth=1,u.fillRect(38,118,844,94),u.strokeRect(38,118,844,94);let d=[[`Nama Anggota`,e.nama_lengkap||`-`],[`NIM / NPM`,e.npm||`-`],[`No. WhatsApp`,e.no_wa||`-`]],p=[[`Tanggal Cetak`,f(new Date)],[`Diterbitkan Oleh`,`${l.currentUser?.nama_lengkap||`Bendahara`} (${i[l.currentUser?.role]||`Pengurus`})`],[`Status Tagihan`,`${r.length} Periode Belum Lunas`]];d.forEach(([e,t],n)=>{let r=142+n*26;u.fillStyle=`#475569`,u.font=`bold 13px Arial, sans-serif`,u.fillText(e,54,r),u.fillStyle=`#0f172a`,u.font=`13px Arial, sans-serif`,u.fillText(`: ${String(t).slice(0,34)}`,164,r)}),p.forEach(([e,t],n)=>{let r=142+n*26;u.fillStyle=`#475569`,u.font=`bold 13px Arial, sans-serif`,u.fillText(e,470,r),u.fillStyle=`#0f172a`,u.font=`13px Arial, sans-serif`,u.fillText(`: ${String(t).slice(0,34)}`,590,r)});let m=232,h=[38,76,405,530,655,775,882];return u.fillStyle=`#163a78`,u.fillRect(38,m,844,36),u.fillStyle=`#ffffff`,u.font=`bold 13px Arial, sans-serif`,u.fillText(`No`,h[0]+10,m+23),u.fillText(`Periode Tagihan`,h[1]+10,m+23),u.fillText(`Tagihan`,h[2]+10,m+23),u.fillText(`Terbayar`,h[3]+10,m+23),u.fillText(`Sisa`,h[4]+10,m+23),u.fillText(`Status`,h[5]+10,m+23),m+=36,a.length===0?(u.fillStyle=`#ffffff`,u.fillRect(38,m,844,42),u.strokeStyle=`#cbd5e1`,u.strokeRect(38,m,844,42),u.fillStyle=`#475569`,u.font=`13px Arial, sans-serif`,u.fillText(`Rincian tunggakan kas berjalan`,50,m+26),m+=42):(a.forEach((e,t)=>{let n=t%2==0?`#ffffff`:`#f8fafc`;u.fillStyle=n,u.fillRect(38,m,844,42),u.strokeStyle=`#cbd5e1`,u.lineWidth=1,u.strokeRect(38,m,844,42);let r=Number(e.nominal_tagihan||0),i=E(e),a=D(e),o=O(e),s=o===`Ditolak`?`Ditolak`:o===`Menunggu Verifikasi`?`Menunggu`:o===`Sebagian`?`Sebagian`:`Blm Lunas`;u.fillStyle=`#0f172a`,u.font=`13px Arial, sans-serif`,u.fillText(String(t+1),h[0]+12,m+26),u.font=`bold 13px Arial, sans-serif`,u.fillText(String(e.periode||`-`).slice(0,36),h[1]+10,m+26),u.font=`13px "JetBrains Mono", monospace`,u.fillText(v(r),h[2]+10,m+26),u.fillText(v(i),h[3]+10,m+26),u.fillStyle=`#dc2626`,u.font=`bold 13px "JetBrains Mono", monospace`,u.fillText(v(a),h[4]+10,m+26),u.fillStyle=s===`Menunggu`?`#d97706`:`#dc2626`,u.font=`bold 12px Arial, sans-serif`,u.fillText(s,h[5]+10,m+26),m+=42}),o>0&&(u.fillStyle=`#f1f5f9`,u.fillRect(38,m,844,42),u.strokeStyle=`#cbd5e1`,u.strokeRect(38,m,844,42),u.fillStyle=`#334155`,u.font=`italic 13px Arial, sans-serif`,u.fillText(`+ ${o} periode tunggakan lainnya (lihat rincian lengkap di Portal Kas R3S)`,50,m+26),m+=42)),m+=14,u.fillStyle=`#f0fdf4`,u.strokeStyle=`#86efac`,u.fillRect(38,m,414,64),u.strokeRect(38,m,414,64),u.fillStyle=`#166534`,u.font=`bold 12px Arial, sans-serif`,u.fillText(`TOTAL SUDAH DIBAYAR`,54,m+24),u.font=`bold 20px "JetBrains Mono", monospace`,u.fillText(v(t.sudahBayar),54,m+50),u.fillStyle=`#fef2f2`,u.strokeStyle=`#fca5a5`,u.fillRect(468,m,414,64),u.strokeRect(468,m,414,64),u.fillStyle=`#991b1b`,u.font=`bold 12px Arial, sans-serif`,u.fillText(`TOTAL SISA TUNGGAKAN`,484,m+24),u.font=`bold 20px "JetBrains Mono", monospace`,u.fillText(v(t.tunggakan),484,m+50),m+=80,u.fillStyle=`#f8fafc`,u.strokeStyle=`#cbd5e1`,u.fillRect(38,m,844,72),u.strokeRect(38,m,844,72),u.fillStyle=`#0f172a`,u.font=`bold 13px Arial, sans-serif`,u.fillText(`Saluran Transfer: ${n.nama_bank||`BCA`} · No. Rek ${n.no_rekening||`-`} (a.n. ${n.atas_nama_rekening||`Bendahara R3S`})`,54,m+26),u.fillStyle=`#334155`,u.font=`13px Arial, sans-serif`,u.fillText(`QRIS Resmi: ${n.qris_merchant_name||`Mas_hy, Fashion`} · NMID: ${n.qris_nmid||`-`}`,54,m+50),u.fillStyle=`#64748b`,u.font=`11px Arial, sans-serif`,u.fillText(`Dokumen bukti tagihan resmi ini dibuat otomatis oleh Aktivitas Kelas RS · Kelas ${n.nama_kelas||`R3S`}.`,38,s-22),{dataUrl:c.toDataURL(`image/png`),blobPromise:new Promise(e=>c.toBlob(t=>e(t),`image/png`))}}function kt(e,t){let n=(e?.no_wa||``).replace(/\D/g,``),r=encodeURIComponent(t||``);return n?`https://wa.me/${n}?text=${r}`:`https://wa.me/?text=${r}`}function At(e){let t=l.profiles.find(t=>t.id===e);if(!t)return;let n=Y(t.id),r=Dt(t,n),{dataUrl:i,blobPromise:a}=Ot(t,n),o=`Bukti_Tunggakan_Kas_${String(t.nama_lengkap||`Mahasiswa`).replace(/[^a-zA-Z0-9_-]+/g,`_`).replace(/^_+|_+$/g,``)}.png`;l.waReminderContext={student:t,sisa:n.tunggakan,fileName:o,dataUrl:i,blobPromise:a},document.getElementById(`wa-reminder-subtitle`).textContent=`${t.nama_lengkap} (${t.npm}) · Sisa Tunggakan ${v(n.tunggakan)}`;let s=document.getElementById(`wa-proof-preview-img`);s&&(s.src=i);let c=document.getElementById(`btn-wa-download-proof`);c&&(c.href=i,c.setAttribute(`download`,o));let u=document.getElementById(`wa-reminder-text`);u&&(u.value=r);let d=document.getElementById(`btn-wa-open-chat`);d&&(d.href=kt(t,r));let f=(n.bills||[]).filter(e=>O(e)!==`Lunas`&&e.bukti_url),p=document.getElementById(`wa-rejected-attachments`),m=document.getElementById(`wa-rejected-attachments-list`);p&&m&&(f.length>0?(m.innerHTML=f.map(e=>`<button type="button" class="btn btn-secondary btn-sm btn-view-img" data-url="${y(e.bukti_url)}" data-title="Lampiran ${y(e.periode)} (${y(e.status)})">Lihat Bukti ${y(e.periode)}</button>`).join(``),p.classList.remove(`hidden`),$()):(m.innerHTML=``,p.classList.add(`hidden`)));let h=document.getElementById(`btn-wa-share-native`);h&&h.classList.toggle(`hidden`,typeof navigator.share!=`function`),document.getElementById(`modal-wa-reminder`)?.classList.remove(`hidden`)}function jt(){let e=Object.fromEntries(l.profiles.map(e=>[e.id,e])),t=l.filters.kasSearch.toLowerCase(),n=l.filters.kasJenis,r=l.filters.kasKategori,a=l.transaksiKas.filter(i=>{let a=i.terkait_user_id?e[i.terkait_user_id]:null,o=i.pengirim_nama||a?.nama_lengkap||``,s=`${i.keterangan} ${i.kategori} ${i.pj_nama||``} ${o} ${a?.npm||``}`.toLowerCase();return(!t||s.includes(t))&&(n===`Semua`||i.jenis===n)&&(r===`Semua`||i.kategori===r)}).sort((e,t)=>{let n=String(e.tanggal||``);return String(t.tanggal||``).localeCompare(n)||new Date(t.created_at||0)-new Date(e.created_at||0)}),o=l.transaksiKas.filter(e=>e.jenis===`Pemasukan`).reduce((e,t)=>e+Number(t.nominal),0),c=l.transaksiKas.filter(e=>e.jenis===`Pengeluaran`).reduce((e,t)=>e+Number(t.nominal),0),u=l.profiles.filter(e=>s(e.role)),f=l.currentUser;return`
    <div class="page-header">
      <div>
        <span class="meta-line">Buku Besar Keuangan · Terbuka, PJ Tercatat &amp; Terverifikasi Nota</span>
        <h2>Catatan Pemasukan &amp; Pengeluaran Kas</h2>
      </div>
      <div style="display:flex;gap:14px;flex-wrap:wrap;">
        <span class="status-tag tag-success tabular-nums">Masuk: ${v(o)}</span>
        <span class="status-tag tag-danger tabular-nums">Keluar: ${v(c)}</span>
        <span class="status-tag tag-info tabular-nums">Saldo: ${v(o-c)}</span>
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
            <input type="date" id="kas-tanggal" value="${d(new Date)}" required />
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
            value="${y(f.nama_lengkap)} (${y(i[f.role]||f.role)})"
            readonly
            disabled
          />
        </div>

        <div class="field-group hidden" id="kas-pengirim-group">
          <label for="kas-pengirim">Pilih Nama Pengirim (Mahasiswa)</label>
          <select id="kas-pengirim">
            <option value="">-- Pilih Nama Mahasiswa --</option>
            ${u.map(e=>`<option value="${e.id}">${y(e.nama_lengkap)} (${y(e.npm)})</option>`).join(``)}
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
        <input type="search" id="filter-kas-search" placeholder="Cari nama, pengirim, PJ, atau keterangan..." value="${y(l.filters.kasSearch)}" />
        <select id="filter-kas-jenis">
          ${[`Semua`,`Pemasukan`,`Pengeluaran`].map(e=>`<option value="${e}" ${n===e?`selected`:``}>${e}</option>`).join(``)}
        </select>
        <select id="filter-kas-kategori">
          ${[`Semua`,`Iuran Kas`,`Modul & Belajar`,`Fotocopy`,`Konsumsi`,`Perlengkapan Kelas`,`Lainnya`].map(e=>`<option value="${e}" ${r===e?`selected`:``}>${e}</option>`).join(``)}
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
            ${a.length===0?`<tr><td colspan="5" class="text-center">Tidak ada transaksi kas yang cocok.</td></tr>`:a.map(t=>{let n=t.jenis===`Pemasukan`,r=t.pj_nama&&String(t.pj_nama).trim()?y(t.pj_nama):n?`<span class="meta-line"><em>- (Dari Mahasiswa Sendiri)</em></span>`:`-`,i=t.pengirim_nama||(t.terkait_user_id?e[t.terkait_user_id]?.nama_lengkap:``)||``;return`
                        <tr>
                          <td class="tabular-nums">${y(_(t.tanggal))}</td>
                          <td>
                            <span class="status-tag ${n?`tag-success`:`tag-danger`}">${y(t.jenis)}</span>
                            <strong style="margin-left:6px;">${y(t.kategori)}</strong>
                            ${n&&i?`<div class="meta-line" style="color:var(--accent-cyan);margin-top:3px;">Pengirim: <strong>${y(i)}</strong></div>`:``}
                            <div class="meta-line">${y(t.keterangan)}</div>
                          </td>
                          <td>${r}</td>
                          <td class="tabular-nums ${n?`text-success`:`text-danger`}">
                            <strong>${n?`+`:`-`}${v(t.nominal)}</strong>
                          </td>
                          <td>
                            ${t.nota_url?`<button type="button" class="btn btn-secondary btn-sm btn-view-img" data-url="${y(t.nota_url)}" data-title="Nota · ${y(t.kategori)}">Detail Nota</button>`:`<span class="meta-line">-</span>`}
                          </td>
                        </tr>
                      `}).join(``)}
          </tbody>
        </table>
      </div>
    </div>
  `}function Mt(){$();let e=document.getElementById(`kas-jenis`),t=document.getElementById(`kas-pengirim-group`),n=document.getElementById(`kas-pengirim`),r=()=>{let r=e?.value===`Pemasukan`;t?.classList.toggle(`hidden`,!r),n&&(n.required=r)};r(),e?.addEventListener(`change`,r),document.getElementById(`form-transaksi-kas`)?.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`kas-jenis`).value,n=document.getElementById(`kas-kategori`).value,r=document.getElementById(`kas-tanggal`).value,i=Number(document.getElementById(`kas-nominal`).value),a=l.currentUser.id,o=l.currentUser.nama_lengkap,s=t===`Pemasukan`&&document.getElementById(`kas-pengirim`)?.value||``,c=s?l.profiles.find(e=>e.id===s):null;if(t===`Pemasukan`&&!c){S(`Pilih nama mahasiswa pengirim terlebih dahulu.`,`warning`);return}let u=c?c.nama_lengkap:``,f=document.getElementById(`kas-keterangan`).value.trim(),p=t===`Pemasukan`&&u&&!f.toLowerCase().includes(u.toLowerCase())?`Pengirim: ${u} · ${f}`:f,m=document.getElementById(`kas-nota`).files[0];try{let e=m?await R.uploadFile(m,`nota_kas`):``;if(await R.insert(`transaksi_kas`,{jenis:t,kategori:n,tanggal:r,keterangan:p,terkait_user_id:c?c.id:null,pengirim_nama:u,nominal:i,nota_url:e,pj_id:a,pj_nama:o,dicatat_oleh:l.currentUser.id}),t===`Pemasukan`&&c){let t=i,n=new Date().toISOString(),s=[...l.iuranKas].filter(e=>e.user_id===c.id&&O(e)!==`Lunas`).sort((e,t)=>new Date(e.created_at||0)-new Date(t.created_at||0));for(let e of s){if(t<=0)break;let r=Number(e.nominal_tagihan||0),i=E(e),s=Math.max(0,r-i);if(!(s<=0)){if(t>=s)await R.update(`iuran_kas`,e.id,{status:`Lunas`,nominal_dibayar:r,nominal_terverifikasi:r,nominal_pending:0,metode_bayar:`Tunai`,tanggal_bayar:n,verified_by:a,pj_id:a,pj_nama:o}),t-=s;else{let r=i+t;try{await R.update(`iuran_kas`,e.id,{status:`Sebagian`,nominal_dibayar:r,nominal_terverifikasi:r,nominal_pending:0,metode_bayar:`Tunai`,tanggal_bayar:n,pj_id:a,pj_nama:o})}catch(t){let i=String(t?.message||``).toLowerCase();if(i.includes(`check`)||i.includes(`iuran_kas_status_check`))await R.update(`iuran_kas`,e.id,{status:`Belum Lunas`,nominal_dibayar:r,nominal_terverifikasi:r,nominal_pending:0,metode_bayar:`Tunai`,tanggal_bayar:n,pj_id:a,pj_nama:o});else throw t}t=0}}}if(t>0){let i=g((r||d(new Date)).slice(0,7));await R.insert(`iuran_kas`,{user_id:c.id,periode:`Setoran Kas - ${i}`,nominal_tagihan:t,nominal_dibayar:t,nominal_terverifikasi:t,nominal_pending:0,metode_bayar:`Tunai`,bukti_url:e||``,status:`Lunas`,tanggal_bayar:n,verified_by:a,pj_id:a,pj_nama:o})}await A([{user_id:c.id,judul:`Pembayaran Kas Dicatat`,pesan:`Pemasukan kas sebesar ${v(i)} atas nama Anda telah dicatat oleh ${o} dan otomatis menambah total kas Anda.`,tipe:`success`}])}await R.loadAll(),S(c?`Pemasukan ${v(i)} untuk ${u} berhasil dicatat & menambah kas mahasiswa!`:`${t} ${v(i)} (PJ: ${o}) berhasil dicatat!`,`success`),B(),V()}catch(e){S(e.message||`Gagal mencatat transaksi kas.`,`danger`)}}),document.getElementById(`filter-kas-search`)?.addEventListener(`input`,e=>{l.filters.kasSearch=e.target.value,V();let t=document.getElementById(`filter-kas-search`);t&&(t.focus(),t.setSelectionRange(t.value.length,t.value.length))}),document.getElementById(`filter-kas-jenis`)?.addEventListener(`change`,e=>{l.filters.kasJenis=e.target.value,V()}),document.getElementById(`filter-kas-kategori`)?.addEventListener(`change`,e=>{l.filters.kasKategori=e.target.value,V()})}function J(e){let t=l.absensi.filter(t=>t.user_id===e),n=t.filter(e=>e.status_kehadiran===`Hadir`).length,r=t.filter(e=>e.status_kehadiran===`Izin`).length,i=t.filter(e=>e.status_kehadiran===`Sakit`).length,a=t.filter(e=>e.status_kehadiran===`Alpha`||e.status_kehadiran===`Belum Absen!`).length,o=n+r+i+a;return{hadir:n,izin:r,sakit:i,alpha:a,total:o,pct:o>0?Math.round(n/o*100):0,recs:t}}function Y(e){let t=l.iuranKas.filter(t=>t.user_id===e),n=t.reduce((e,t)=>e+Number(t.nominal_tagihan||0),0),r=t.reduce((e,t)=>e+E(t),0),i=t.reduce((e,t)=>e+D(t),0),a=n>0?Math.round(r/n*100):100;return{totalTagihan:n,sudahBayar:r,tunggakan:i,pctBayar:a,pctTunggak:n>0?100-a:0,isLunas:i===0,bills:t}}function Nt(){let e=l.profiles.filter(e=>o(e.role));if(e.length===0)return`<div class="card glass-panel" style="margin-bottom:20px;"><p class="meta-line">Belum ada mahasiswa untuk diagram absensi.</p></div>`;let t=e.some(e=>e.id===l.filters.selectedDiagramStudentId)?l.filters.selectedDiagramStudentId:e[0].id;l.filters.selectedDiagramStudentId=t;let n=e.find(e=>e.id===t),r=n?[n,...e.filter(e=>e.id!==t)]:e,i=J(t),a=Math.max(1,i.total),s=[{label:`Hadir`,count:i.hadir,color:`#22c55e`},{label:`Izin`,count:i.izin,color:`#00d4ff`},{label:`Sakit`,count:i.sakit,color:`#ff7b00`},{label:`Alpha / Belum`,count:i.alpha,color:`#ef4444`}],c=2*Math.PI*52,u=0,d=i.total===0?`<circle cx="74" cy="74" r="52" fill="none" stroke="var(--track-ring)" stroke-width="18"></circle>`:s.map(e=>{let t=e.count/a*c,n=`<circle cx="74" cy="74" r="52" fill="none" stroke="${e.color}" stroke-width="18" stroke-dasharray="${t} ${c-t}" stroke-dashoffset="${-u}" transform="rotate(-90 74 74)"></circle>`;return u+=t,n}).join(``);return`
    <div class="card glass-panel" style="margin-bottom:20px;">
      <div class="card-header">
        <div>
          <h3>Diagram Absensi Mahasiswa</h3>
          <span class="meta-line">Mahasiswa terpilih otomatis tampil paling atas · Klik nama untuk melihat detail donat</span>
        </div>
        <select id="diagram-student-select" class="card-header-select">
          ${e.map(e=>`<option value="${e.id}" ${e.id===t?`selected`:``}>${y(e.nama_lengkap)} (${y(e.npm)})</option>`).join(``)}
        </select>
      </div>

      <div class="grid-2 grid-2-start" style="margin-bottom:0;">
        <div class="student-chart-list student-scroll-5">
          ${r.map(e=>{let n=J(e.id),r=Math.max(1,n.total);return`
                <div class="student-bar-row ${e.id===t?`selected`:``}" data-diagram-student="${e.id}">
                  <div class="student-bar-head">
                    <strong>${y(e.nama_lengkap)} <span class="meta-line" style="display:inline;">(${y(e.npm)})</span></strong>
                    <span class="tabular-nums text-cyan">${n.pct}% Hadir (${n.hadir}/${n.total})</span>
                  </div>
                  <div class="stacked-bar-track" title="Hadir: ${n.hadir}, Izin: ${n.izin}, Sakit: ${n.sakit}, Alpha/Belum: ${n.alpha}">
                    <div class="stacked-seg-hadir" style="width:${n.hadir/r*100}%"></div>
                    <div class="stacked-seg-izin" style="width:${n.izin/r*100}%"></div>
                    <div class="stacked-seg-sakit" style="width:${n.sakit/r*100}%"></div>
                    <div class="stacked-seg-alpha" style="width:${n.alpha/r*100}%"></div>
                  </div>
                </div>
              `}).join(``)}
        </div>

        <div class="ring-widget-wrap diagram-donut-sticky" style="align-content:flex-start;">
          <svg class="donut-svg" viewBox="0 0 148 148" aria-label="Diagram donat absensi mahasiswa">
            ${d}
            <text x="74" y="70" text-anchor="middle" fill="var(--text-muted)" font-size="11" font-family="DM Sans">Hadir</text>
            <text x="74" y="90" text-anchor="middle" fill="var(--text-primary)" font-size="20" font-weight="700" font-family="JetBrains Mono">${i.pct}%</text>
          </svg>
          <div class="legend-list">
            <div style="margin-bottom:6px;">
              <strong>${y(n?.nama_lengkap||`-`)}</strong>
              <span class="meta-line tabular-nums">NPM: ${y(n?.npm||`-`)}</span>
            </div>
            ${s.map(e=>`
              <div class="legend-row">
                <span class="legend-label">
                  <span class="legend-swatch" style="background:${e.color}"></span>
                  ${e.label}
                </span>
                <strong class="tabular-nums">${e.count} (${i.total===0?0:Math.round(e.count/a*100)}%)</strong>
              </div>
            `).join(``)}
          </div>
        </div>
      </div>
    </div>
  `}function Pt(){let e=l.profiles.filter(e=>s(e.role));if(e.length===0)return`<div class="card glass-panel" style="margin-bottom:20px;"><p class="meta-line">Belum ada mahasiswa untuk diagram kas.</p></div>`;let t=e.some(e=>e.id===l.filters.selectedKasDiagramStudentId)?l.filters.selectedKasDiagramStudentId:e[0].id;l.filters.selectedKasDiagramStudentId=t;let n=e.find(e=>e.id===t),r=n?[n,...e.filter(e=>e.id!==t)]:e,i=Y(t),a=2*Math.PI*52,o=[{label:`Sudah Bayar`,amount:i.sudahBayar,pct:i.pctBayar,color:`#22c55e`},{label:`Tunggakan`,amount:i.tunggakan,pct:i.pctTunggak,color:`#ef4444`}],c=0,u=i.totalTagihan===0?`<circle cx="74" cy="74" r="52" fill="none" stroke="#22c55e" stroke-width="18"></circle>`:o.map(e=>{let t=e.amount/Math.max(1,i.totalTagihan)*a,n=`<circle cx="74" cy="74" r="52" fill="none" stroke="${e.color}" stroke-width="18" stroke-dasharray="${t} ${a-t}" stroke-dashoffset="${-c}" transform="rotate(-90 74 74)"></circle>`;return c+=t,n}).join(``);return`
    <div class="card glass-panel" style="margin-bottom:20px;">
      <div class="card-header">
        <div>
          <h3>Diagram Kas Per Mahasiswa</h3>
          <span class="meta-line">Persentase lunas (Hijau) vs sisa tunggakan (Merah) · Mahasiswa terpilih tampil paling atas</span>
        </div>
        <select id="diagram-kas-student-select" class="card-header-select">
          ${e.map(e=>`<option value="${e.id}" ${e.id===t?`selected`:``}>${y(e.nama_lengkap)} (${y(e.npm)})</option>`).join(``)}
        </select>
      </div>

      <div class="grid-2 grid-2-start" style="margin-bottom:0;">
        <div class="student-chart-list student-scroll-5">
          ${r.map(e=>{let n=Y(e.id);return`
                <div class="student-bar-row ${e.id===t?`selected`:``}" data-kas-diagram-student="${e.id}">
                  <div class="student-bar-head">
                    <strong>
                      ${y(e.nama_lengkap)}
                      <span class="status-tag ${n.isLunas?`tag-success`:n.sudahBayar>0?`tag-warning`:`tag-danger`}" style="margin-left:6px;">
                        ${n.isLunas?`Sudah Lunas`:n.sudahBayar>0?`Sebagian`:`Belum Lunas`}
                      </span>
                    </strong>
                    <span class="tabular-nums ${n.isLunas?`text-success`:n.sudahBayar>0?`text-warning`:`text-danger`}">
                      ${v(n.sudahBayar)} (${n.pctBayar}%)
                    </span>
                  </div>
                  <div class="stacked-bar-track" title="Sudah Bayar: ${v(n.sudahBayar)} (${n.pctBayar}%), Tunggakan: ${v(n.tunggakan)} (${n.pctTunggak}%)">
                    <div class="stacked-seg-paid" style="width:${n.pctBayar}%"></div>
                    <div class="stacked-seg-unpaid" style="width:${n.pctTunggak}%"></div>
                  </div>
                </div>
              `}).join(``)}
        </div>

        <div class="ring-widget-wrap diagram-donut-sticky" style="align-content:flex-start;">
          <svg class="donut-svg" viewBox="0 0 148 148" aria-label="Diagram donat kas mahasiswa">
            ${u}
            <text x="74" y="70" text-anchor="middle" fill="var(--text-muted)" font-size="11" font-family="DM Sans">Terbayar</text>
            <text x="74" y="90" text-anchor="middle" fill="${i.isLunas?`#22c55e`:`var(--text-primary)`}" font-size="20" font-weight="700" font-family="JetBrains Mono">${i.pctBayar}%</text>
          </svg>
          <div class="legend-list">
            <div style="margin-bottom:6px;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
              <div>
                <strong>${y(n?.nama_lengkap||`-`)}</strong>
                <span class="meta-line tabular-nums">NPM: ${y(n?.npm||`-`)}</span>
              </div>
              <span class="status-tag ${i.isLunas?`tag-success`:i.sudahBayar>0?`tag-warning`:`tag-danger`}">${i.isLunas?`Sudah Lunas`:i.sudahBayar>0?`Sebagian`:`Belum Lunas`}</span>
            </div>
            ${o.map(e=>`
              <div class="legend-row">
                <span class="legend-label">
                  <span class="legend-swatch" style="background:${e.color}"></span>
                  ${e.label}
                </span>
                <strong class="tabular-nums">${v(e.amount)} (${e.pct}%)</strong>
              </div>
            `).join(``)}
            <div class="legend-row" style="border-top:1px solid var(--glass-border);padding-top:6px;margin-top:4px;">
              <span class="legend-label">Total Tagihan Kas</span>
              <strong class="tabular-nums text-cyan">${v(i.totalTagihan)}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  `}function Ft(){document.getElementById(`diagram-student-select`)?.addEventListener(`change`,e=>{l.filters.selectedDiagramStudentId=e.target.value,V()}),document.querySelectorAll(`[data-diagram-student]`).forEach(e=>{e.addEventListener(`click`,()=>{l.filters.selectedDiagramStudentId=e.getAttribute(`data-diagram-student`),V()})}),document.getElementById(`diagram-kas-student-select`)?.addEventListener(`change`,e=>{l.filters.selectedKasDiagramStudentId=e.target.value,V()}),document.querySelectorAll(`[data-kas-diagram-student]`).forEach(e=>{e.addEventListener(`click`,()=>{l.filters.selectedKasDiagramStudentId=e.getAttribute(`data-kas-diagram-student`),V()})})}function It(){let e=l.profiles.filter(e=>o(e.role)),t=[...l.sesiAbsensi].sort((e,t)=>Number(e.pertemuan_ke||0)-Number(t.pertemuan_ke||0)||new Date(e.created_at||0)-new Date(t.created_at||0)),n=t.reduce((e,t)=>Math.max(e,Number(t.pertemuan_ke||0)),0),r=Math.max(14,Number(l.pengaturan?.total_pertemuan_semester||14),n),i=[];for(let e=1;e<=r;e+=1){let n=t.filter(t=>Number(t.pertemuan_ke||1)===e),r=n.length>0?n.map(t=>({pertemuan:e,session:t,label:t.mata_kuliah||`-`})):[{pertemuan:e,session:null,label:`-`}];i.push({pertemuan:e,sessions:n,slots:r})}let a=i.flatMap(e=>e.slots),s=i.flatMap(e=>e.sessions);return{groups:i,orderedSlots:a,orderedSessions:s,rows:e.map(e=>{let t=J(e.id),n=a.map(t=>{if(!t.session)return{session:null,record:null,label:`-`};let n=l.absensi.find(n=>n.sesi_id===t.session.id&&n.user_id===e.id)||null;return{session:t.session,record:n,label:n?n.status_kehadiran:`-`}}),r=n.filter(e=>!!e.session),i=s.length>0?r.filter(e=>e.label===`Hadir`).length:t.hadir,o=s.length>0?r.filter(e=>e.record).length:t.total,c=s.length>0?s.length:t.total;return{student:e,cells:n,totalCatatan:o,pctHadir:c>0?Math.round(i/c*100):0,hadirCount:i}})}}function Lt(){let e=[`Januari`,`Februari`,`Maret`,`April`,`Mei`,`Juni`,`Juli`,`Agustus`,`September`,`Oktober`,`November`,`Desember`],t=l.profiles.filter(e=>s(e.role)),n=[],r=new Set;l.iuranKas.forEach(e=>{let t=String(e.periode||``).trim();t&&!r.has(t)&&(r.add(t),n.push(t))});let i=n.map(t=>{let n=t.toLowerCase(),r=e.findIndex(e=>n.includes(e.toLowerCase())),i=r>=0?e[r]:`Periode Lainnya`,a=t.match(/(20\d{2})/),o=a?Number(a[1]):9999,s=t.match(/(?:minggu|pekan|m|ke[- ]?)\s*(\d+)/i)||t.match(/^(\d+)/),c=s?Number(s[1]):99;return{periode:t,monthIdx:r>=0?r:99,monthLabel:i,yearNum:o,slotOrder:c}}).sort((e,t)=>e.yearNum-t.yearNum||e.monthIdx-t.monthIdx||e.slotOrder-t.slotOrder),a=new Set(i.map(e=>e.yearNum).filter(e=>e!==9999)),o=new Map;i.forEach(e=>{let t=`${e.yearNum}-${e.monthLabel}`,n=e.yearNum!==9999&&a.size>1?`${e.monthLabel} ${e.yearNum}`:e.monthLabel;o.has(t)||o.set(t,{monthLabel:n,slots:[]});let r=o.get(t),i=e.slotOrder===99?String(r.slots.length+1):String(e.slotOrder);r.slots.push({periode:e.periode,subLabel:i})});let c=Array.from(o.values()),u=c.flatMap(e=>e.slots);return{monthGroups:c,orderedSlots:u,rows:t.map(e=>{let t=Y(e.id);return{student:e,slotCells:u.map(t=>{let n=l.iuranKas.filter(n=>n.user_id===e.id&&String(n.periode||``).trim()===t.periode),r=n.reduce((e,t)=>e+Number(t.nominal_tagihan||0),0),i=n.reduce((e,t)=>e+E(t),0),a=n.reduce((e,t)=>e+D(t),0),o=n.some(e=>O(e)===`Menunggu Verifikasi`),s=n.some(e=>O(e)===`Ditolak`),c=`-`;return n.length>0&&(c=a<=0&&!o?`Lunas`:o?`Menunggu Verifikasi`:s&&i===0?`Ditolak`:i>0&&a>0?`Sebagian`:`Belum Lunas`),{slot:t,bills:n,bill:n[0]||null,tagihan:r,paid:i,sisa:a,dispStatus:c}}),totalDibayar:t.sudahBayar,tunggakan:t.tunggakan,isLunas:t.isLunas}})}}function Rt(){let e=l.currentUser?.role||`admin`,t=e===`admin`,n=e===`bendahara`,r=t||e===`ketua`,a=t||n||e===`ketua`,o=t||n,{groups:c,orderedSlots:u,orderedSessions:d,rows:f}=It(),{monthGroups:p,orderedSlots:m,rows:h}=Lt(),g=l.profiles.filter(e=>s(e.role)),_=(l.filters.matrixAbsenSearch||``).trim().toLowerCase(),b=(l.filters.matrixMatkulSearch||``).trim().toLowerCase(),x=u.map((e,t)=>({...e,_idx:t})),S=b?c.map(e=>{let t=x.filter(t=>t.pertemuan===e.pertemuan&&t.session&&String(t.label||``).toLowerCase().includes(b));return{...e,slots:t}}).filter(e=>e.slots.length>0):c.map(e=>({...e,slots:x.filter(t=>t.pertemuan===e.pertemuan)})),w=S.flatMap(e=>e.slots),T=f.filter(e=>{if(!_)return!0;let t=i[e.student.role]||e.student.role||``;return`${e.student.nama_lengkap||``} ${e.student.npm||``} ${t}`.toLowerCase().includes(_)}),E=(l.filters.matrixKasSearch||``).trim().toLowerCase(),D=l.filters.matrixKasStatus||`Semua`,O=h.filter(e=>{let t=e.isLunas?`Lunas`:e.totalDibayar>0?`Sebagian`:`Belum Lunas`;if(D!==`Semua`&&t!==D)return!1;if(!E)return!0;let n=i[e.student.role]||e.student.role||``;return`${e.student.nama_lengkap||``} ${e.student.npm||``} ${n} ${t}`.toLowerCase().includes(E)}),k=g.filter(e=>{let t=Y(e.id),n=t.isLunas?`Lunas`:t.sudahBayar>0?`Sebagian`:`Belum Lunas`;if(D!==`Semua`&&n!==D)return!1;if(!E)return!0;let r=i[e.role]||e.role||``;return`${e.nama_lengkap||``} ${e.npm||``} ${r} ${n}`.toLowerCase().includes(E)}),A=O.reduce((e,t)=>e+t.totalDibayar,0),j=O.reduce((e,t)=>e+t.tunggakan,0),M=O.filter(e=>e.isLunas).length;return`
    <div class="page-header">
      <div>
        <span class="meta-line">
          ${t?`Pemantauan Absensi &amp; Kas Menyeluruh · Diagram, Matriks Terpadu &amp; Ekspor Excel (.XLSX)`:n?`Pemantauan Kas &amp; Matriks Absensi Kelas · Diagram Kas, Matriks Periode &amp; Ekspor Excel (.XLSX)`:`Matriks Kehadiran, Rekap Absensi Mahasiswa &amp; Ekspor Excel (.XLSX)`}
        </span>
        <h2>${n?`Matriks, Rekap &amp; Excel`:t?`Matriks, Diagram &amp; Excel`:`Matriks, Rekap &amp; Excel`}</h2>
      </div>
      <div class="row-actions">
        ${n?`
      <button type="button" id="btn-export-kas-xlsx" class="btn btn-primary">Unduh Excel Kas (.XLSX)</button>
      <button type="button" id="btn-export-rekap-mhs-xlsx" class="btn btn-coral">Unduh Kas Mahasiswa (.XLSX)</button>
      <button type="button" id="btn-export-absensi-xlsx" class="btn btn-secondary">Unduh Matriks Absensi (.XLSX)</button>
      <button type="button" id="btn-export-csv" class="btn btn-secondary">Unduh CSV Kas</button>
    `:t?`
      <button type="button" id="btn-export-xlsx" class="btn btn-primary">Unduh Excel Lengkap (.XLSX)</button>
      <button type="button" id="btn-export-rekap-mhs-xlsx" class="btn btn-coral">Unduh Rekap Mahasiswa (.XLSX)</button>
      <button type="button" id="btn-export-kas-xlsx" class="btn btn-secondary">Unduh Rekap Kas (.XLSX)</button>
      <button type="button" id="btn-export-csv" class="btn btn-secondary">Unduh CSV</button>
    `:`
      <button type="button" id="btn-export-xlsx" class="btn btn-primary">Unduh Excel Absensi (.XLSX)</button>
      <button type="button" id="btn-export-rekap-mhs-xlsx" class="btn btn-coral">Unduh Rekap Mahasiswa (.XLSX)</button>
      <button type="button" id="btn-export-csv" class="btn btn-secondary">Unduh CSV</button>
    `}
      </div>
    </div>

    ${r?Nt():``}
    ${o?Pt():``}

    ${a?`
          <!-- Tabel Matriks Absensi Keseluruhan Mahasiswa (Pertemuan 1 - 14 & Mata Kuliah) -->
          ${l.currentUser?.role===`bendahara`?``:`
          <div class="card glass-panel" style="margin-bottom:20px;">
            <div class="card-header">
              <div>
                <h3>Tabel Matriks Absensi Keseluruhan Mahasiswa</h3>
                <span class="meta-line">Header 2 tingkat: Pertemuan 1 s.d. 14 &amp; nama Mata Kuliah · Klik status untuk Detail foto &amp; GPS</span>
              </div>
              <span class="status-tag tag-info tabular-nums">${T.length}/${f.length} Mahasiswa</span>
            </div>
            <div class="toolbar-filters">
              <input
                type="search"
                id="filter-matrix-absen-search"
                placeholder="Cari absensi mahasiswa (nama, NIM, atau peran)..."
                value="${y(l.filters.matrixAbsenSearch||``)}"
              />
              <input
                type="search"
                id="filter-matrix-matkul-search"
                placeholder="Cari mata kuliah pada matriks..."
                value="${y(l.filters.matrixMatkulSearch||``)}"
              />
            </div>
            <div class="table-wrap table-scroll-5-matrix">
              <table class="grouped-matrix-table">
                <thead>
                  <tr>
                    <th rowspan="2">NIM</th>
                    <th rowspan="2">Nama Mahasiswa</th>
                    ${S.length>0?S.map(e=>`<th colspan="${e.slots.length}">Pertemuan ${e.pertemuan}</th>`).join(``):`<th>Mata Kuliah</th>`}
                    <th rowspan="2">Persentase Hadir</th>
                  </tr>
                  <tr>
                    ${w.length>0?w.map(e=>`<th class="grouped-matrix-subth">${y(e.label)}</th>`).join(``):`<th class="grouped-matrix-subth">-</th>`}
                  </tr>
                </thead>
                <tbody>
                  ${T.length===0?`<tr><td colspan="${3+Math.max(1,w.length)}" class="text-center">${f.length===0?`Belum ada mahasiswa terdaftar.`:`Tidak ada data absensi mahasiswa yang cocok dengan pencarian.`}</td></tr>`:T.map(e=>{let t=w.map(t=>e.cells[t._idx]).filter(Boolean);return`
                        <tr>
                          <td class="tabular-nums">${y(e.student.npm)}</td>
                          <td><strong>${y(e.student.nama_lengkap)}</strong></td>
                          ${w.length===0?`<td class="grouped-matrix-cell-center"><span class="meta-line">-</span></td>`:t.map(e=>e.record?`<td class="grouped-matrix-cell-center">
                                        <button type="button" class="status-tag ${C(e.label)} btn-detail-absen" style="cursor:pointer;" data-absen-id="${e.record.id}" data-sesi-id="${e.session.id}" title="Klik untuk melihat foto, PJ, dan GPS">
                                          ${y(e.label)}
                                        </button>
                                      </td>`:`<td class="grouped-matrix-cell-center"><span class="${e.label===`-`?`meta-line`:`status-tag ${C(e.label)}`}">${y(e.label)}</span></td>`).join(``)}
                          <td class="tabular-nums grouped-matrix-cell-center" title="${e.hadirCount}/${d.length} sesi hadir"><strong>${e.pctHadir}%</strong></td>
                        </tr>
                      `}).join(``)}
                </tbody>
              </table>
            </div>
          </div>
          `}
        `:``}

    ${o?`
          <!-- Tabel Matriks Kas Per Periode -->
          <div class="card glass-panel" style="margin-bottom:20px;">
            <div class="card-header">
              <div>
                <h3>Tabel Matriks Kas Per Periode</h3>
                <span class="meta-line">Rincian pembayaran iuran kas per bulan &amp; minggu (1, 2, 3, 4) beserta total dibayar, tunggakan, &amp; status kelas</span>
              </div>
              <span class="status-tag tag-info tabular-nums">${O.length}/${h.length} Mahasiswa</span>
            </div>
            <div class="toolbar-filters">
              <input
                type="search"
                id="filter-matrix-kas-search"
                placeholder="Cari daftar kas mahasiswa (nama, NIM, atau peran)..."
                value="${y(l.filters.matrixKasSearch||``)}"
              />
              <select id="filter-matrix-kas-status" aria-label="Filter status kas">
                <option value="Semua" ${D===`Semua`?`selected`:``}>Semua Status Kas</option>
                <option value="Belum Lunas" ${D===`Belum Lunas`?`selected`:``}>Belum Lunas</option>
                <option value="Sebagian" ${D===`Sebagian`?`selected`:``}>Sebagian (Cicilan)</option>
                <option value="Lunas" ${D===`Lunas`?`selected`:``}>Lunas</option>
              </select>
            </div>
            <div class="table-wrap table-scroll-5-matrix">
              <table class="grouped-matrix-table">
                <thead>
                  <tr>
                    <th rowspan="2">NIM</th>
                    <th rowspan="2">Nama Mahasiswa</th>
                    ${p.length>0?p.map(e=>`<th colspan="${e.slots.length}">${y(e.monthLabel)}</th>`).join(``):`<th>Periode Kas</th>`}
                    <th rowspan="2">Total Dibayar</th>
                    <th rowspan="2">Tunggakan</th>
                    <th rowspan="2">Status</th>
                  </tr>
                  <tr>
                    ${m.length>0?m.map(e=>`<th class="grouped-matrix-subth" title="${y(e.periode)}">${y(e.subLabel)}</th>`).join(``):`<th class="grouped-matrix-subth">-</th>`}
                  </tr>
                </thead>
                <tbody>
                  ${O.length===0?`<tr><td colspan="${5+Math.max(1,m.length)}" class="text-center">${h.length===0?`Belum ada data kas mahasiswa.`:`Tidak ada data kas mahasiswa yang cocok dengan pencarian.`}</td></tr>`:O.map(e=>`
                        <tr>
                          <td class="tabular-nums">${y(e.student.npm)}</td>
                          <td><strong>${y(e.student.nama_lengkap)}</strong></td>
                          ${m.length===0?`<td class="grouped-matrix-cell-center"><span class="meta-line">-</span></td>`:e.slotCells.map(e=>{if(!e.bills||e.bills.length===0)return`<td class="grouped-matrix-cell-center"><span class="meta-line">-</span></td>`;let{paid:t,tagihan:n,sisa:r,dispStatus:i}=e;return i===`Lunas`?`<td class="tabular-nums text-success grouped-matrix-cell-center" title="${y(e.slot.periode)} · Lunas"><strong>${v(t||n)}</strong></td>`:i===`Menunggu Verifikasi`?`<td class="grouped-matrix-cell-center" title="${y(e.slot.periode)} · Menunggu ACC"><span class="status-tag tag-coral">Menunggu</span>${t>0?`<div class="meta-line tabular-nums text-success">${v(t)}</div>`:``}${r>0?`<div class="meta-line tabular-nums text-danger">Sisa ${v(r)}</div>`:``}</td>`:i===`Ditolak`?`<td class="grouped-matrix-cell-center" title="${y(e.slot.periode)} · Bukti Ditolak"><span class="status-tag tag-danger">Ditolak</span>${t>0?`<div class="meta-line tabular-nums">${v(t)}</div>`:``}${r>0?`<div class="meta-line tabular-nums text-danger">Sisa ${v(r)}</div>`:``}</td>`:t>0&&r>0?`<td class="tabular-nums text-warning grouped-matrix-cell-center" title="${y(e.slot.periode)} · Cicilan (Sisa ${v(r)})"><strong>${v(t)}</strong><div class="meta-line text-danger">Sisa ${v(r)}</div></td>`:`<td class="grouped-matrix-cell-center" title="${y(e.slot.periode)} · Tagihan ${v(n)}"><span class="meta-line text-danger">Sisa ${v(r)}</span></td>`}).join(``)}
                          <td class="tabular-nums text-success grouped-matrix-cell-center"><strong>${v(e.totalDibayar)}</strong></td>
                          <td class="tabular-nums ${e.tunggakan>0?`text-danger`:`text-success`} grouped-matrix-cell-center"><strong>${v(e.tunggakan)}</strong></td>
                          <td class="grouped-matrix-cell-center"><span class="status-tag ${e.isLunas?`tag-success`:e.totalDibayar>0?`tag-warning`:`tag-danger`}">${e.isLunas?`Lunas`:e.totalDibayar>0?`Sebagian`:`Belum Lunas`}</span></td>
                        </tr>
                      `).join(``)}
                </tbody>
                ${O.length>0?`
                      <tfoot>
                        <tr class="grouped-matrix-tfoot">
                          <td colspan="${2+Math.max(1,m.length)}"><strong>Total Akumulasi Kas Kelas (${O.length} Mahasiswa)</strong></td>
                          <td class="tabular-nums text-success grouped-matrix-cell-center"><strong>${v(A)}</strong></td>
                          <td class="tabular-nums ${j>0?`text-danger`:`text-success`} grouped-matrix-cell-center"><strong>${v(j)}</strong></td>
                          <td class="grouped-matrix-cell-center"><strong>${M}/${O.length} Lunas</strong></td>
                        </tr>
                      </tfoot>
                    `:``}
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
              <span class="status-tag tag-info tabular-nums">${k.length}/${g.length} Mahasiswa</span>
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
                  ${k.length===0?`<tr><td colspan="5" class="text-center">${g.length===0?`Belum ada mahasiswa terdaftar.`:`Tidak ada data kas mahasiswa yang cocok dengan pencarian.`}</td></tr>`:k.map(e=>{let t=Y(e.id);return`
                              <tr>
                                <td class="tabular-nums">${y(e.npm)}</td>
                                <td><strong>${y(e.nama_lengkap)}</strong></td>
                                <td class="tabular-nums text-success"><strong>${v(t.sudahBayar)}</strong></td>
                                <td class="tabular-nums ${t.tunggakan>0?`text-danger`:`text-success`}"><strong>${t.tunggakan>0?v(t.tunggakan):`-`}</strong></td>
                                <td><span class="status-tag ${t.isLunas?`tag-success`:t.sudahBayar>0?`tag-warning`:`tag-danger`}">${t.isLunas?`Lunas`:t.sudahBayar>0?`Sebagian`:`Belum Lunas`}</span></td>
                              </tr>
                            `}).join(``)}
                </tbody>
              </table>
            </div>
          </div>
        `:``}
  `}function zt(){Ft(),u(`filter-matrix-absen-search`,e=>{l.filters.matrixAbsenSearch=e}),u(`filter-matrix-matkul-search`,e=>{l.filters.matrixMatkulSearch=e}),u(`filter-matrix-kas-search`,e=>{l.filters.matrixKasSearch=e}),document.getElementById(`filter-matrix-kas-status`)?.addEventListener(`change`,e=>{l.filters.matrixKasStatus=e.target.value,V()}),document.querySelectorAll(`.btn-detail-absen`).forEach(e=>{e.addEventListener(`click`,()=>{Pe(e.getAttribute(`data-absen-id`),e.getAttribute(`data-sesi-id`))})});let e=l.currentUser?.role||`admin`,t=e===`admin`,n=e===`bendahara`,r=()=>{let{groups:e,orderedSlots:t,rows:n}=It(),r=[`NIM`,`Nama Mahasiswa`,...e.flatMap(e=>e.slots.map((t,n)=>n===0?`Pertemuan ${e.pertemuan}`:``)),`Persentase Hadir`],i=[``,``,...t.map(e=>e.label||`-`),``],a=[{r1:0,c1:0,r2:1,c2:0},{r1:0,c1:1,r2:1,c2:1}],o=2;e.forEach(e=>{e.slots.length>1&&a.push({r1:0,c1:o,r2:0,c2:o+e.slots.length-1}),o+=e.slots.length}),a.push({r1:0,c1:o,r2:1,c2:o});let s=n.map(e=>[e.student.npm,e.student.nama_lengkap,...e.cells.map(e=>e.label),`${e.pctHadir}%`]);return{name:`Matriks Kehadiran`,headerRows:[r,i],merges:a,rows:s}},i=()=>{let{orderedSlots:e,rows:t}=It();return t.map(t=>{let n={NIM:t.student.npm,"Nama Mahasiswa":t.student.nama_lengkap};return e.forEach((e,r)=>{let i=e.session?`Pertemuan ${e.pertemuan} - ${e.label}`:`Pertemuan ${e.pertemuan}`;n[i]=t.cells[r]?.label||`-`}),n[`Persentase Hadir`]=`${t.pctHadir}%`,n})},a=()=>l.profiles.filter(e=>o(e.role)).map(e=>{let t=J(e.id);return{NIM:e.npm,"Nama Mahasiswa":e.nama_lengkap,Hadir:t.hadir,Izin:t.izin,Sakit:t.sakit,"Alpha / Belum Absen":t.alpha,"Total Catatan":t.total,"Persentase Hadir":`${t.pct}%`}}),c=()=>l.profiles.filter(e=>s(e.role)).map(e=>{let t=Y(e.id);return{NIM:e.npm,"Nama Mahasiswa":e.nama_lengkap,"Total Dibayar":t.sudahBayar,Tunggakan:t.tunggakan,Status:t.isLunas?`Lunas`:t.sudahBayar>0?`Sebagian`:`Belum Lunas`}}),f=()=>{let{monthGroups:e,orderedSlots:t,rows:n}=Lt();if(!t.length)return{name:`Matriks Kas Periode`,rows:n.map(e=>({NIM:e.student.npm,"Nama Mahasiswa":e.student.nama_lengkap,"Periode Kas":`Belum ada tagihan`,"Total Dibayar":e.totalDibayar,Tunggakan:e.tunggakan,Status:e.isLunas?`Lunas`:e.totalDibayar>0?`Sebagian`:`Belum Lunas`}))};let r=[`NIM`,`Nama Mahasiswa`,...e.flatMap(e=>e.slots.map((t,n)=>n===0?e.monthLabel:``)),`Total Dibayar`,`Tunggakan`,`Status`],i=[``,``,...t.map(e=>`${e.subLabel}`),``,``,``],a=[{r1:0,c1:0,r2:1,c2:0},{r1:0,c1:1,r2:1,c2:1}],o=2;e.forEach(e=>{e.slots.length>1&&a.push({r1:0,c1:o,r2:0,c2:o+e.slots.length-1}),o+=e.slots.length}),a.push({r1:0,c1:o,r2:1,c2:o},{r1:0,c1:o+1,r2:1,c2:o+1},{r1:0,c1:o+2,r2:1,c2:o+2});let s=n.map(e=>[e.student.npm,e.student.nama_lengkap,...e.slotCells.map(e=>!e.bills||e.bills.length===0?0:e.dispStatus===`Menunggu Verifikasi`&&e.paid===0?`Menunggu`:e.dispStatus===`Ditolak`&&e.paid===0?`Ditolak`:e.paid),e.totalDibayar,e.tunggakan,e.isLunas?`Lunas`:e.totalDibayar>0?`Sebagian`:`Belum Lunas`]),c=n.reduce((e,t)=>e+t.totalDibayar,0),u=n.reduce((e,t)=>e+t.tunggakan,0),d=n.filter(e=>e.isLunas).length,f=[`TOTAL`,`${n.length} Mahasiswa`,...t.map(e=>l.iuranKas.filter(t=>String(t.periode||``).trim()===e.periode).reduce((e,t)=>e+E(t),0)),c,u,`${d}/${n.length} Lunas`];return{name:`Matriks Kas Periode`,headerRows:[r,i],merges:a,rows:s,footerRow:f}},p=()=>{let e=Object.fromEntries(l.profiles.map(e=>[e.id,e]));return l.transaksiKas.map((t,n)=>({No:n+1,Tanggal:_(t.tanggal),Jenis:t.jenis,Kategori:t.kategori,Keterangan:t.keterangan,"Nama Pengirim":t.pengirim_nama||`-`,"Penanggung Jawab":t.pj_nama||(t.jenis===`Pemasukan`&&!t.pj_id?`- (Dari Mahasiswa Sendiri)`:e[t.dicatat_oleh]?.nama_lengkap||`-`),Nominal:Number(t.nominal||0)}))};document.getElementById(`btn-export-xlsx`)?.addEventListener(`click`,()=>{if(n)return;let e=[r(),{name:`Rekap Absensi Mhs`,rows:a()}];t&&e.push(f(),{name:`Kas Per Mahasiswa`,rows:c()},{name:`Mutasi Kas`,rows:p()});let i=t?`Rekapan_Kelas_R3S_${d(new Date)}.xlsx`:`Rekap_Absensi_Kelas_R3S_${d(new Date)}.xlsx`;Jt(e,i),S(`File ${i} berhasil diunduh!`,`success`)}),document.getElementById(`btn-export-absensi-xlsx`)?.addEventListener(`click`,()=>{let e=`Matriks_Absensi_Keseluruhan_R3S_${d(new Date)}.xlsx`;Jt([r(),{name:`Rekap Absensi Mhs`,rows:a()}],e),S(`File ${e} berhasil diunduh!`,`success`)}),document.getElementById(`btn-export-rekap-mhs-xlsx`)?.addEventListener(`click`,()=>{if(n){let e=`Rekap_Kas_Per_Mahasiswa_R3S_${d(new Date)}.xlsx`;Jt([f(),{name:`Kas Per Mahasiswa`,rows:c()}],e),S(`File ${e} berhasil diunduh!`,`success`);return}let e=a(),t=`Rekap_Absensi_Per_Mahasiswa_R3S_${d(new Date)}.xlsx`;Jt([{name:`Rekap Per Mahasiswa`,rows:e}],t),S(`File ${t} berhasil diunduh!`,`success`)}),document.getElementById(`btn-export-kas-xlsx`)?.addEventListener(`click`,()=>{let e=`Rekap_Kas_Kelas_R3S_${d(new Date)}.xlsx`;Jt([f(),{name:`Kas Per Mahasiswa`,rows:c()},{name:`Mutasi Kas`,rows:p()}],e),S(`File ${e} berhasil diunduh!`,`success`)}),document.getElementById(`btn-export-csv`)?.addEventListener(`click`,()=>{if(n){let e=c(),t=`Rekap_Kas_Per_Mahasiswa_R3S_${d(new Date)}.csv`;_n(e,t),S(`File ${t} berhasil diunduh!`,`success`);return}let e=i(),t=`Rekapan_Absensi_R3S_${d(new Date)}.csv`;_n(e,t),S(`File ${t} berhasil diunduh!`,`success`)})}function Bt(e){return String(e??``).replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g,``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&apos;`)}function Vt(e){return String(e||`Sheet1`).replace(/[\\/*?:\[\]]/g,` `).trim().slice(0,31)||`Sheet1`}var Ht=(()=>{let e=new Uint32Array(256);for(let t=0;t<256;t++){let n=t;for(let e=0;e<8;e++)n=n&1?3988292384^n>>>1:n>>>1;e[t]=n>>>0}return e})();function Ut(e){let t=4294967295;for(let n=0;n<e.length;n++)t=Ht[(t^e[n])&255]^t>>>8;return(t^4294967295)>>>0}function Wt(e,t){let n=new TextEncoder,r=new Date,i=(r.getHours()&31)<<11|(r.getMinutes()&63)<<5|r.getSeconds()>>1&31,a=(Math.max(1980,r.getFullYear())-1980&127)<<9|(r.getMonth()+1&15)<<5|r.getDate()&31,o=[],s=[],c=0;e.forEach(e=>{let t=n.encode(e.path),r=e.content instanceof Uint8Array?e.content:n.encode(String(e.content??``)),l=Ut(r),u=new Uint8Array(30+t.length),d=new DataView(u.buffer);d.setUint32(0,67324752,!0),d.setUint16(4,20,!0),d.setUint16(6,2048,!0),d.setUint16(8,0,!0),d.setUint16(10,i,!0),d.setUint16(12,a,!0),d.setUint32(14,l,!0),d.setUint32(18,r.length,!0),d.setUint32(22,r.length,!0),d.setUint16(26,t.length,!0),d.setUint16(28,0,!0),u.set(t,30);let f=new Uint8Array(46+t.length),p=new DataView(f.buffer);p.setUint32(0,33639248,!0),p.setUint16(4,20,!0),p.setUint16(6,20,!0),p.setUint16(8,2048,!0),p.setUint16(10,0,!0),p.setUint16(12,i,!0),p.setUint16(14,a,!0),p.setUint32(16,l,!0),p.setUint32(20,r.length,!0),p.setUint32(24,r.length,!0),p.setUint16(28,t.length,!0),p.setUint16(30,0,!0),p.setUint16(32,0,!0),p.setUint16(34,0,!0),p.setUint16(36,0,!0),p.setUint32(38,0,!0),p.setUint32(42,c,!0),f.set(t,46),o.push(u,r),s.push(f),c+=u.length+r.length});let l=s.reduce((e,t)=>e+t.length,0),u=new Uint8Array(22),d=new DataView(u.buffer);return d.setUint32(0,101010256,!0),d.setUint16(4,0,!0),d.setUint16(6,0,!0),d.setUint16(8,e.length,!0),d.setUint16(10,e.length,!0),d.setUint32(12,l,!0),d.setUint32(16,c,!0),d.setUint16(20,0,!0),new Blob([...o,...s,u],{type:t})}function Gt(e){let t=e+1,n=``;for(;t>0;){let e=(t-1)%26;n=String.fromCharCode(65+e)+n,t=Math.floor((t-1)/26)}return n}function Kt(e,t,n,r){let i=`${Gt(e)}${t}`;if(typeof n==`number`&&Number.isFinite(n))return`<c r="${i}" t="n" s="${r}"><v>${n}</v></c>`;let a=String(n??``),o=Bt(a);return`<c r="${i}" t="inlineStr" s="${r}"><is><t${/^\s|\s$/.test(a)?` xml:space="preserve"`:``}>${o}</t></is></c>`}function qt(e){let t=[],n=[],r=[],i=null;if(Array.isArray(e.headerRows)&&e.headerRows.length)t=e.headerRows,n=Array.isArray(e.rows)?e.rows:[],r=Array.isArray(e.merges)?e.merges:[],i=Array.isArray(e.footerRow)?e.footerRow:null;else{let r=Array.isArray(e.rows)?e.rows:[],i=r.length?Object.keys(r[0]):[`Informasi`],a=r.length?r:[{Informasi:`Belum ada data tersedia`}];t=[i],n=a.map(e=>i.map(t=>e[t]??``))}let a=Math.max(1,...t.map(e=>e.length),...n.map(e=>e.length),i?i.length:0),o=`<cols>${Array.from({length:a},(e,r)=>{let a=[...t.map(e=>String(e[r]??``).length),...n.map(e=>String(e[r]??``).length),i?String(i[r]??``).length:0],o=Math.max(4,...a);return Math.min(44,Math.max(10,Math.round(o*1.15+4)))}).map((e,t)=>`<col min="${t+1}" max="${t+1}" width="${e}" customWidth="1"/>`).join(``)}</cols>`,s=[],c=1;if(t.forEach((e,t)=>{let n=t===0?1:2,r=Array.from({length:a},(t,r)=>Kt(r,c,e[r]??``,n)).join(``);s.push(`<row r="${c}" ht="24" customHeight="1">${r}</row>`),c+=1}),n.forEach(e=>{let t=Array.from({length:a},(t,n)=>Kt(n,c,e[n]??``,n>=2?3:0)).join(``);s.push(`<row r="${c}" ht="20" customHeight="1">${t}</row>`),c+=1}),i){let e=Array.from({length:a},(e,t)=>Kt(t,c,i[t]??``,4)).join(``);s.push(`<row r="${c}" ht="22" customHeight="1">${e}</row>`)}let l=r.length?`<mergeCells count="${r.length}">${r.map(e=>`<mergeCell ref="${Gt(e.c1)}${e.r1+1}:${Gt(e.c2)}${e.r2+1}"/>`).join(``)}</mergeCells>`:``;return`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetViews><sheetView workbookViewId="0"/></sheetViews><sheetFormatPr defaultRowHeight="20"/>`+o+`<sheetData>${s.join(``)}</sheetData>`+l+`</worksheet>`}function Jt(e,t){let n=(e&&e.length?e:[{name:`Data`,rows:[]}]).map((e,t)=>({...e,safeName:Vt(e.name||`Sheet${t+1}`),sheetNum:t+1})),r=new Set;n.forEach(e=>{let t=e.safeName,n=2;for(;r.has(t.toLowerCase());){let r=` ${n++}`;t=`${e.safeName.slice(0,Math.max(1,31-r.length))}${r}`}r.add(t.toLowerCase()),e.safeName=t});let i=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>`+n.map(e=>`<Override PartName="/xl/worksheets/sheet${e.sheetNum}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join(``)+`</Types>`,a=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">`+n.map(e=>`<Relationship Id="rId${e.sheetNum}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${e.sheetNum}.xml"/>`).join(``)+`<Relationship Id="rId${n.length+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`,o=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>`+n.map(e=>`<sheet name="${Bt(e.safeName)}" sheetId="${e.sheetNum}" r:id="rId${e.sheetNum}"/>`).join(``)+`</sheets></workbook>`,s=[{path:`[Content_Types].xml`,content:i},{path:`_rels/.rels`,content:`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`},{path:`xl/_rels/workbook.xml.rels`,content:a},{path:`xl/workbook.xml`,content:o},{path:`xl/styles.xml`,content:`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="3"><font><sz val="10"/><color rgb="FF0F172A"/><name val="Calibri"/></font><font><b/><sz val="10"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font><font><b/><sz val="10"/><color rgb="FF0F172A"/><name val="Calibri"/></font></fonts><fills count="5"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF0B2647"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FF1D4ED8"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFF1F5F9"/></patternFill></fill></fills><borders count="2"><border><left/><right/><top/><bottom/><diagonal/></border><border><left style="thin"><color rgb="FFCBD5E1"/></left><right style="thin"><color rgb="FFCBD5E1"/></right><top style="thin"><color rgb="FFCBD5E1"/></top><bottom style="thin"><color rgb="FFCBD5E1"/></bottom><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="5"><xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf><xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf><xf numFmtId="0" fontId="1" fillId="3" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf><xf numFmtId="0" fontId="2" fillId="4" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>`},...n.map(e=>({path:`xl/worksheets/sheet${e.sheetNum}.xml`,content:qt(e)}))],c=t.toLowerCase().endsWith(`.xlsx`)?t:`${t.replace(/\.xls$/i,``)}.xlsx`,l=Wt(s,`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`),u=URL.createObjectURL(l),d=document.createElement(`a`);d.href=u,d.download=c,d.click(),URL.revokeObjectURL(u)}function Yt(e){return l.profiles.find(t=>t.role===e)||l.currentUser||l.profiles[0]||{id:``,nama_lengkap:`-`}}function Xt(){let e=(l.pengaturan||{}).nama_kelas||`R3S`,t=Yt(`bendahara`),n=Yt(`ketua`),r=Yt(`admin`);return{bendahara:{id:t.id,nama:t.nama_lengkap||`-`,jabatan:`Bendahara Kelas ${e}`},ketua:{id:n.id,nama:n.nama_lengkap||`-`,jabatan:`Ketua Kelas ${e}`},admin:{id:r.id,nama:r.nama_lengkap||`-`,jabatan:`Admin Penandatangan`}}}function Zt(){let e=l.currentUser?.role||`admin`,t=e===`admin`,n=e===`ketua`,r=e===`bendahara`,a=l.profiles.filter(e=>o(e.role)),s=l.filters.pdfMonth||d(new Date).slice(0,7),c=a.some(e=>e.id===l.filters.pdfStudentId)?l.filters.pdfStudentId:a[0]?.id||``;l.filters.pdfStudentId=c;let u=Xt();l.filters.pdfBendaharaId=u.bendahara.id,l.filters.pdfKetuaId=u.ketua.id,l.filters.pdfAdminId=u.admin.id;let p=l.sesiAbsensi.filter(e=>(e.tanggal||d(new Date(e.created_at))).startsWith(s));return`
    <div class="page-header">
      <div>
        <span class="meta-line">Dokumen Resmi Siap Cetak · Tanggal Waktu Nyata WIB &amp; Lembar Pengesahan PJ Terkunci</span>
        <h2>Laporan PDF Bulanan &amp; Per Mahasiswa</h2>
      </div>
      <div class="status-tag tag-info tabular-nums" id="pdf-realtime-clock">${y(f(new Date))}</div>
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
          <input type="month" id="pdf-month-input" value="${y(s)}" class="tabular-nums" />
        </div>
        <div class="field-group">
          <label for="pdf-student-select">Pilih Mahasiswa (Untuk Laporan PDF Per Mahasiswa)</label>
          <select id="pdf-student-select">
            ${a.map(e=>`<option value="${e.id}" ${e.id===c?`selected`:``}>${y(e.nama_lengkap)} (${y(e.npm)})${e.role===`pj_matkul`?` · PJ Matkul`:``}</option>`).join(``)}
          </select>
        </div>
      </div>

      <div class="${t?`grid-3`:`grid-2`}" style="margin-bottom:0;">
        ${t||r?`<div class="field-group">
                <label for="pdf-sign-bendahara">Penanggung Jawab Kas (Bendahara · Terkunci)</label>
                <input
                  type="text"
                  id="pdf-sign-bendahara"
                  class="input-locked"
                  value="${y(u.bendahara.nama)} (${y(i.bendahara)})"
                  readonly
                  disabled
                />
              </div>`:``}
        ${t||n?`<div class="field-group">
                <label for="pdf-sign-ketua">Penanggung Jawab Absensi (Ketua Kelas · Terkunci)</label>
                <input
                  type="text"
                  id="pdf-sign-ketua"
                  class="input-locked"
                  value="${y(u.ketua.nama)} (${y(i.ketua)})"
                  readonly
                  disabled
                />
              </div>`:``}
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
                value="${y(u.admin.nama)} (${y(i.admin)})"
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
        >${y(l.filters.pdfEvaluationNote||``)}</textarea>
      </div>

      <div class="pdf-report-grid">
        ${t||r?`<div class="pdf-report-card">
                <div>
                  <h4>Laporan Kas Bulanan — Matriks, Total Uang &amp; Mutasi (PDF)</h4>
                  <p class="meta-line" style="margin-top:4px;">
                    Berisi tabel Uang Kas Per Periode Keseluruhan Mahasiswa, Total Uang Keseluruhan Mahasiswa, &amp; Mutasi Kas periode ${y(g(s))}.
                  </p>
                  <p class="meta-line" style="margin-top:6px;color:var(--accent-cyan);">
                    Dibuat Oleh: <strong>Bendahara</strong> (${y(u.bendahara.nama)})<br/>
                    Mengetahui / Disetujui Oleh: <strong>Admin</strong> (${y(u.admin.nama)})
                  </p>
                </div>
                <button type="button" id="btn-pdf-kas-bulanan" class="btn btn-primary btn-block">Unduh PDF Kas Keseluruhan</button>
              </div>`:``}

        ${t||n?`<div class="pdf-report-card">
                <div>
                  <h4>Laporan Absensi Bulanan — Keseluruhan Mahasiswa (PDF)</h4>
                  <p class="meta-line" style="margin-top:4px;">
                    Matriks kehadiran mahasiswa per pertemuan &amp; mata kuliah beserta persentase hadir bulan ${y(g(s))} (${p.length} sesi).
                  </p>
                  <p class="meta-line" style="margin-top:6px;color:var(--accent-cyan);">
                    Dibuat Oleh: <strong>Ketua</strong> (${y(u.ketua.nama)})<br/>
                    Mengetahui / Disetujui Oleh: <strong>Admin</strong> (${y(u.admin.nama)})
                  </p>
                </div>
                <button type="button" id="btn-pdf-absensi-bulanan" class="btn btn-primary btn-block">Unduh PDF Absensi Keseluruhan</button>
              </div>`:``}

        ${t?`<div class="pdf-report-card">
                <div>
                  <h4>Laporan Keseluruhan Rekapan (PDF)</h4>
                  <p class="meta-line" style="margin-top:4px;">
                    Gabungan lengkap matriks absensi keseluruhan, matriks kas per periode, total uang kas mahasiswa, &amp; mutasi kas bulan ${y(g(s))}.
                  </p>
                  <p class="meta-line" style="margin-top:6px;color:var(--accent-coral);">
                    Dibuat Oleh: <strong>Bendahara</strong> (${y(u.bendahara.nama)})<br/>
                    Mengetahui: <strong>Ketua</strong> (${y(u.ketua.nama)}) · Disetujui Oleh: <strong>Admin</strong> (${y(u.admin.nama)})
                  </p>
                </div>
                <button type="button" id="btn-pdf-keseluruhan" class="btn btn-coral btn-block">Unduh PDF Rekapan Keseluruhan</button>
              </div>`:``}

        <div class="pdf-report-card">
          <div>
            <h4>Laporan Per Mahasiswa (PDF)</h4>
            <p class="meta-line" style="margin-top:4px;">
              ${r?`Tabel matriks Kas Permahasiswa per bulan &amp; periode (Total Dibayar, Tunggakan, Status).`:n?`Tabel matriks Absensi Permahasiswa per pertemuan &amp; mata kuliah (H, I, Z, A, &amp; Persentase Hadir).`:`Tabel matriks Absensi Permahasiswa (H, I, Z, A, %) &amp; Kas Permahasiswa per bulan &amp; periode (Total Dibayar, Tunggakan, Status).`}
            </p>
            <p class="meta-line" style="margin-top:6px;color:var(--accent-cyan);">
              Dibuat Oleh: <strong>${r?`Bendahara`:`Ketua`}</strong> (${y(r?u.bendahara.nama:u.ketua.nama)})<br/>
              Mengetahui / Disetujui Oleh: <strong>Admin</strong> (${y(u.admin.nama)})
            </p>
          </div>
          <button type="button" id="btn-pdf-per-mahasiswa" class="btn btn-secondary btn-block">Unduh PDF Per Mahasiswa</button>
        </div>
      </div>
    </div>
  `}var Qt=`./assets/aistudio/Code_Generated_Image__1__6558f03f.png`,$t=null,en=null;async function X(){if($t)return $t;if(en)return en;en=new Promise(e=>{let t=new Image;t.crossOrigin=`anonymous`,t.onload=()=>{try{let n=t.naturalWidth||400,r=t.naturalHeight||400,i=Math.min(480,n),a=Math.max(1,Math.round(r/n*i)),o=document.createElement(`canvas`);o.width=i,o.height=a;let s=o.getContext(`2d`);s.fillStyle=`#ffffff`,s.fillRect(0,0,i,a),s.drawImage(t,0,0,i,a);let c=o.toDataURL(`image/jpeg`,.92).split(`,`)[1]||``,l=atob(c),u=new Uint8Array(l.length);for(let e=0;e<l.length;e+=1)u[e]=l.charCodeAt(e);$t={width:i,height:a,bytes:u},e($t)}catch{e(null)}},t.onerror=()=>e(null),t.src=Qt});let e=await en;return en=null,e}var tn=class{constructor(e={}){let t=e.orientation===`landscape`;this.pageWidth=t?841.89:595.28,this.pageHeight=t?595.28:841.89,this.pages=[[]],this.currentPageIndex=0,this.fontStyle=`normal`,this.fontSize=10,this.textColor=[15,23,42],this.drawColor=[15,23,42],this.fillColor=[11,38,71],this.lineWidth=.75,this.lastAutoTable={finalY:120},this.images=[],this.imageMap={}}addImageJpeg(e,t,n,r){if(this.imageMap[e])return this.imageMap[e];let i=`Im${this.images.length+1}`;return this.images.push({resName:i,width:Number(t),height:Number(n),bytes:r}),this.imageMap[e]=i,i}drawImage(e,t,n,r,i){let a=this.imageMap[e];if(!a)return this;let o=(this.pageHeight-n-i).toFixed(2);return this._pushCmd(`q ${r.toFixed(2)} 0 0 ${i.toFixed(2)} ${t.toFixed(2)} ${o} cm /${a} Do Q`),this}_sanitizeText(e){return String(e??``).replace(/[\u2013\u2014]/g,`-`).replace(/\u2022/g,`*`).replace(/\u00b7/g,`|`).replace(/\u00d7/g,`x`).replace(/[\u2018\u2019]/g,`'`).replace(/[\u201c\u201d]/g,`"`).replace(/[^\x20-\x7E]/g,` `)}_escapePdfLiteral(e){return this._sanitizeText(e).replace(/\\/g,`\\\\`).replace(/\(/g,`\\(`).replace(/\)/g,`\\)`)}_fontResourceName(e=this.fontStyle){return e===`bold`?`F2`:e===`italic`?`F3`:`F1`}_charWidthRatio(e){return e===` `?.28:`ilIjtf.,:;'"!|`.includes(e)?.27:"r-()[]/\\`".includes(e)?.34:`mwMW@%&`.includes(e)?.82:e>=`A`&&e<=`Z`?.67:e>=`0`&&e<=`9`?.56:.52}getTextWidth(e,t=this.fontSize,n=this.fontStyle){let r=this._sanitizeText(e),i=0;for(let e=0;e<r.length;e+=1)i+=this._charWidthRatio(r[e]);let a=n===`bold`?1.06:1;return i*t*a}splitTextToSize(e,t,n=this.fontSize,r=this.fontStyle){let i=this._sanitizeText(e).trim();if(!i)return[``];let a=i.split(/\r?\n/),o=[];return a.forEach(e=>{let i=e.split(/\s+/).filter(Boolean);if(!i.length){o.push(``);return}let a=``;i.forEach(e=>{let i=a?`${a} ${e}`:e;if(this.getTextWidth(i,n,r)<=t)a=i;else if(a)o.push(a),a=e;else{let i=``;for(let a=0;a<e.length;a+=1){let s=i+e[a];this.getTextWidth(s,n,r)>t&&i?(o.push(i),i=e[a]):i=s}a=i}}),a&&o.push(a)}),o.length?o:[``]}_pushCmd(e){this.pages[this.currentPageIndex].push(e)}_rgbStr(e){return e.map(e=>Math.max(0,Math.min(1,Number(e||0)/255)).toFixed(3)).join(` `)}_pdfY(e){return(this.pageHeight-e).toFixed(2)}addPage(){return this.pages.push([]),this.currentPageIndex=this.pages.length-1,this}getNumberOfPages(){return this.pages.length}setPage(e){let t=Math.max(0,Math.min(this.pages.length-1,e-1));return this.currentPageIndex=t,this}setFont(e,t=`normal`){return this.fontStyle=t||`normal`,this}setFontSize(e){return this.fontSize=Number(e)||10,this}setTextColor(e,t,n){return this.textColor=[e,t,n],this}setDrawColor(e,t,n){return this.drawColor=[e,t,n],this}setFillColor(e,t,n){return this.fillColor=[e,t,n],this}setLineWidth(e){return this.lineWidth=Number(e)||.5,this}line(e,t,n,r){return this._pushCmd(`q ${this.lineWidth.toFixed(2)} w ${this._rgbStr(this.drawColor)} RG ${e.toFixed(2)} ${this._pdfY(t)} m ${n.toFixed(2)} ${this._pdfY(r)} l S Q`),this}rect(e,t,n,r,i=`F`){let a=(this.pageHeight-t-r).toFixed(2);return i===`F`?this._pushCmd(`q ${this._rgbStr(this.fillColor)} rg ${e.toFixed(2)} ${a} ${n.toFixed(2)} ${r.toFixed(2)} re f Q`):i===`FD`?this._pushCmd(`q ${this.lineWidth.toFixed(2)} w ${this._rgbStr(this.fillColor)} rg ${this._rgbStr(this.drawColor)} RG ${e.toFixed(2)} ${a} ${n.toFixed(2)} ${r.toFixed(2)} re B Q`):this._pushCmd(`q ${this.lineWidth.toFixed(2)} w ${this._rgbStr(this.drawColor)} RG ${e.toFixed(2)} ${a} ${n.toFixed(2)} ${r.toFixed(2)} re S Q`),this}text(e,t,n,r={}){let i=Array.isArray(e)?e:[String(e??``)],a=r.align||`left`,o=this._fontResourceName(this.fontStyle),s=this.fontSize*1.28;return i.forEach((e,r)=>{let i=this._sanitizeText(e),c=this.getTextWidth(i,this.fontSize,this.fontStyle),l=t;a===`center`?l=t-c/2:a===`right`&&(l=t-c);let u=n+r*s;this._pushCmd(`BT /${o} ${this.fontSize.toFixed(2)} Tf ${this._rgbStr(this.textColor)} rg 1 0 0 1 ${l.toFixed(2)} ${this._pdfY(u)} Tm (${this._escapePdfLiteral(i)}) Tj ET`)}),this}autoTable(e={}){let t=e.margin?.left??40,n=e.margin?.right??40,r=this.pageHeight-46,i=this.pageWidth-t-n,a=e.styles||{},o=a.fontSize??8.5,s=a.cellPadding??5,c=a.lineColor||[30,41,59],l=a.lineWidth??.55,u=a.textColor||[15,23,42],d=e.alternateRowStyles?.fillColor||[255,255,255],f=e.headStyles?.fillColor||[22,58,120],p=e.subHeadStyles?.fillColor||[29,78,216],m=e.headStyles?.textColor||[255,255,255],h=e.headStyles?.lineColor||[30,41,59],g=e.head||[],_=e.body||[],v=e.foot||[],y=e.columnStyles||{},b=e=>e&&typeof e==`object`&&!Array.isArray(e)?{content:String(e.content??``),colSpan:Math.max(1,Number(e.colSpan||1)),rowSpan:Math.max(1,Number(e.rowSpan||1)),styles:e.styles||{}}:{content:String(e??``),colSpan:1,rowSpan:1,styles:{}},x=g.length?g[0].reduce((e,t)=>e+b(t).colSpan,0):0,S=Math.max(x,_[0]?.length||0,v[0]?.length||0);if(S===0)return this;let C=Array.from({length:g.length},()=>Array(S).fill(!1)),w=[];for(let e=0;e<g.length;e+=1){let t=0;g[e].forEach(n=>{for(;t<S&&C[e][t];)t+=1;if(t>=S)return;let r=b(n),i=Math.max(1,Math.min(r.colSpan,S-t)),a=Math.max(1,Math.min(r.rowSpan,g.length-e));for(let n=0;n<a;n+=1)for(let r=0;r<i;r+=1)C[e+n][t+r]=!0;w.push({row:e,col:t,colSpan:i,rowSpan:a,cell:r}),t+=i})}let T=Array(S).fill(null),E=Array(S).fill(28),D=i;for(let e=0;e<S;e+=1)y[e]?.cellWidth&&(T[e]=Number(y[e].cellWidth),D-=T[e]);w.forEach(({col:e,colSpan:t,cell:n})=>{let r=this.getTextWidth(n.content,o,`bold`)+s*2+6;if(t===1)E[e]=Math.max(E[e],Math.min(180,r));else{let n=r/t;for(let r=0;r<t;r+=1)E[e+r]=Math.max(E[e+r],Math.min(140,n))}});for(let e=0;e<S;e+=1)T[e]===null&&[..._.map(t=>b(t[e]).content),...v.map(t=>b(t[e]).content)].forEach(t=>{let n=this.getTextWidth(t,o,`bold`)+s*2+6;E[e]=Math.max(E[e],Math.min(185,n))});let O=E.reduce((e,t,n)=>T[n]===null?e+t:e,0)||1,k=T.map((e,t)=>e===null?Math.max(24,E[t]/O*Math.max(80,D)):e),A=i/(k.reduce((e,t)=>e+t,0)||i);for(let e=0;e<S;e+=1)k[e]*=A;let j=[t];for(let e=0;e<S;e+=1)j.push(j[e]+k[e]);let M=e.startY??95,N=o*1.24,P=()=>{if(!g.length)return;let t=Array(g.length).fill(o*1.3+s*2+4),n=new Map;w.forEach((e,r)=>{let i=j[e.col+e.colSpan]-j[e.col],a=Math.max(12,i-s*2),c=this.splitTextToSize(e.cell.content,a,o,`bold`);if(n.set(r,c),e.rowSpan===1){let n=c.length*N+s*2+2;t[e.row]=Math.max(t[e.row],n)}}),w.forEach((e,r)=>{if(e.rowSpan>1){let i=(n.get(r)||[e.cell.content]).length*N+s*2+2,a=0;for(let n=e.row;n<e.row+e.rowSpan;n+=1)a+=t[n];i>a&&(t[e.row+e.rowSpan-1]+=i-a)}});let i=t.reduce((e,t)=>e+t,0);M+i>r&&(this.addPage(),M=42);let a=[M];for(let e=0;e<g.length;e+=1)a.push(a[e]+t[e]);w.forEach((t,r)=>{let i=j[t.col],c=j[t.col+t.colSpan]-i,u=a[t.row],d=a[t.row+t.rowSpan]-u,g=t.row===0?f:p,_=t.cell.styles.fillColor||g,v=t.cell.styles.textColor||m,y=t.cell.styles.halign||e.headStyles?.halign||`center`,b=n.get(r)||[t.cell.content];this.setFillColor(..._),this.setDrawColor(...h),this.setLineWidth(l),this.rect(i,u,c,d,`FD`),this.setFont(`helvetica`,`bold`),this.setFontSize(o),this.setTextColor(...v);let x=i+s;y===`center`?x=i+c/2:y===`right`&&(x=i+c-s);let S=u+(d-b.length*N)/2+o*.85;b.forEach((e,t)=>{this.text(e,x,S+t*N,{align:y})})}),M+=i},F=(t,n,i=0)=>{let a=Array(S).fill(null).map((e,n)=>b(t[n])),f=a.map((e,t)=>{let r=Math.max(12,k[t]-s*2),i=e.styles.fontStyle||(n.isFoot?`bold`:y[t]?.fontStyle||`normal`);return this.splitTextToSize(e.content,r,o,i)}),p=Math.max(1,...f.map(e=>e.length))*N+s*2+2;M+p>r&&(this.addPage(),M=42,P());for(let t=0;t<S;t+=1){let r=a[t],m=j[t],h=k[t],g=r.styles.fillColor||n.fillColor||(i%2==1?d:[255,255,255]);this.setFillColor(...g),this.setDrawColor(...c),this.setLineWidth(l),this.rect(m,M,h,p,`FD`);let _=r.styles.halign||(n.isFoot?e.footStyles?.halign||y[t]?.halign||`center`:y[t]?.halign||`center`),v=r.styles.fontStyle||(n.isFoot?`bold`:y[t]?.fontStyle||`normal`),b=r.styles.textColor||n.textColor||u;this.setFont(`helvetica`,v),this.setFontSize(o),this.setTextColor(...b);let x=m+s;_===`center`?x=m+h/2:_===`right`&&(x=m+h-s);let S=f[t].length*N,C=M+(p-S)/2+o*.85;f[t].forEach((e,t)=>{this.text(e,x,C+t*N,{align:_})})}M+=p};return P(),_.forEach((e,t)=>{F(e,{isFoot:!1,textColor:u},t)}),v.forEach(t=>{F(t,{isFoot:!0,fillColor:e.footStyles?.fillColor||[241,245,249],textColor:e.footStyles?.textColor||[11,38,71]})}),this.lastAutoTable={finalY:M},this}toUint8Array(){let e=new TextEncoder,t=[],n=[0],r=0,i=n=>{let i=e.encode(n);t.push(i),r+=i.length},a=e=>{t.push(e),r+=e.length};i(`%PDF-1.4
%R3S
`);let o=this.pages.length,s=[3,4,5],c=this.images.map((e,t)=>6+t),l=6+this.images.length,u=[];for(let e=0;e<o;e+=1)u.push(l+e*2);let d=(e,t)=>{n[e]=r,i(`${e} 0 obj\n${t}\nendobj\n`)},f=(e,t,o)=>{n[e]=r,i(`${e} 0 obj\n${t}`),a(o),i(`
endstream
endobj
`)};d(1,`<< /Type /Catalog /Pages 2 0 R >>`),d(2,`<< /Type /Pages /Kids [${u.map(e=>`${e} 0 R`).join(` `)}] /Count ${o} >>`),d(s[0],`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>`),d(s[1],`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>`),d(s[2],`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>`),this.images.forEach((e,t)=>{let n=c[t];f(n,`<< /Type /XObject /Subtype /Image /Width ${e.width} /Height ${e.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${e.bytes.length} >>\nstream\n`,e.bytes)});let p=this.images.length?` /XObject << ${this.images.map((e,t)=>`/${e.resName} ${c[t]} 0 R`).join(` `)} >>`:``;this.pages.forEach((t,n)=>{let r=l+n*2,i=r+1,a=t.join(`
`),o=e.encode(a).length;d(r,`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${this.pageWidth.toFixed(2)} ${this.pageHeight.toFixed(2)}] /Resources << /Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R >>${p} >> /Contents ${i} 0 R >>`),d(i,`<< /Length ${o} >>\nstream\n${a}\nendstream`)});let m=l+o*2,h=r;i(`xref\n0 ${m}\n0000000000 65535 f \n`);for(let e=1;e<m;e+=1)i(`${String(n[e]||0).padStart(10,`0`)} 00000 n \n`);i(`trailer\n<< /Size ${m} /Root 1 0 R >>\nstartxref\n${h}\n%%EOF`);let g=new Uint8Array(r),_=0;return t.forEach(e=>{g.set(e,_),_+=e.length}),g}save(e){let t=this.toUint8Array(),n=new Blob([t],{type:`application/pdf`}),r=URL.createObjectURL(n),i=document.createElement(`a`);i.href=r,i.download=e,i.click(),URL.revokeObjectURL(r)}};function nn(){return l.transaksiKas.filter(e=>e.jenis===`Pemasukan`).reduce((e,t)=>e+Number(t.nominal||0),0)-l.transaksiKas.filter(e=>e.jenis===`Pengeluaran`).reduce((e,t)=>e+Number(t.nominal||0),0)}function rn(e,t,n=new Date,r={}){let i=new tn({orientation:`landscape`}),a=l.pengaturan||{},o=a.nama_kelas||`R3S`,s=Number(a.semester_aktif||3),c=Number(a.pertemuan_berjalan??0),u=Math.max(1,Number(a.total_pertemuan_semester||14)),d=i.pageWidth-40;i.setFont(`helvetica`,`bold`),i.setFontSize(8.5),i.setTextColor(71,85,105),i.text(`AKTIVITAS KELAS RS · PUSAT ABSENSI & KAS KELAS ${o.toUpperCase()}`,40,38),i.setFont(`helvetica`,`bold`),i.setFontSize(17.5),i.setTextColor(15,23,42),i.text(e,40,56),i.setDrawColor(15,23,42),i.setLineWidth(1.25),i.line(40,65,d,65);let p=[{label:`Kelas / Program`,value:`Kelas ${o}`},{label:`Semester / Pertemuan`,value:`Semester ${s} (${c}/${u} Pertemuan)`},{label:`Periode Laporan`,value:r.periodeLabel||t||`-`},{label:`Tanggal Cetak (Real-Time)`,value:f(n)},...Array.isArray(r.extraRows)?r.extraRows:[]],m=80;return p.forEach(e=>{i.setFont(`helvetica`,`normal`),i.setFontSize(9.2),i.setTextColor(71,85,105),i.text(e.label,40,m),i.text(`:`,182,m),i.setFont(`helvetica`,`bold`),i.setFontSize(9.2),i.setTextColor(15,23,42),i.text(String(e.value??`-`),192,m),m+=14}),{doc:i,startY:m+8,now:n}}function Z(e,t,n,r=``){n>e.pageHeight-110&&(e.addPage(),n=48);let i=e.pageWidth-40;e.setFont(`helvetica`,`bold`),e.setFontSize(14),e.setTextColor(15,23,42),e.text(t,40,n);let a=n+14;return r&&(e.setFont(`helvetica`,`bold`),e.setFontSize(9.5),e.setTextColor(71,85,105),e.text(r,40,a),a+=8),e.setDrawColor(15,23,42),e.setLineWidth(1),e.line(40,a,i,a),a+12}function an(e,t,n,r=new Date,i=null){let a=n+24;a>e.pageHeight-155&&(e.addPage(),a=48);let o=e.pageWidth,s=o-40;e.setFont(`helvetica`,`bold`),e.setFontSize(11),e.setTextColor(15,23,42),e.text(`Lembar Pengesahan & Penanggung Jawab`,40,a),e.setFont(`helvetica`,`normal`),e.setFontSize(9.2),e.setTextColor(51,65,85),e.text(`Jakarta, ${m(r)} · ${h(r)}`,s,a,{align:`right`}),a+=22,i&&i.bytes&&e.addImageJpeg(`admin_stamp`,i.width,i.height,i.bytes);let c=t.length===3?[o*.2,o*.5,o*.8]:t.length===2?[o*.28,o*.72]:[o*.5];return t.forEach((t,n)=>{let r=c[n];if(e.setFont(`helvetica`,`normal`),e.setFontSize(9.5),e.setTextColor(30,41,59),e.text(t.roleLabel,r,a,{align:`center`}),(t.showAdminLogo||/disetujui/i.test(t.roleLabel||``)||/admin/i.test(t.title||``))&&i&&i.bytes){let t=54*(i.width/Math.max(1,i.height));e.drawImage(`admin_stamp`,r-t/2,a+6,t,54)}let o=a+68;e.setFont(`helvetica`,`bold`),e.setFontSize(10),e.setTextColor(11,31,58),e.text(t.name,r,o,{align:`center`});let s=Math.max(105,e.getTextWidth(t.name)+16);e.setDrawColor(15,23,42),e.setLineWidth(.8),e.line(r-s/2,o+3,r+s/2,o+3),e.setFont(`helvetica`,`italic`),e.setFontSize(8.8),e.setTextColor(100,116,139),e.text(t.title,r,o+16,{align:`center`})}),a+94}function on(e,t){let n=(l.pengaturan||{}).nama_kelas||`R3S`,r=e.getNumberOfPages(),i=e.pageWidth-40,a=e.pageHeight-36,o=e.pageHeight-22;for(let s=1;s<=r;s++)e.setPage(s),e.setDrawColor(203,213,225),e.setLineWidth(.6),e.line(40,a,i,a),e.setFont(`helvetica`,`normal`),e.setFontSize(8.2),e.setTextColor(100,116,139),e.text(`Aktivitas Kelas RS · ${t} — Kelas ${n}`,40,o),e.text(`Halaman ${s} dari ${r}`,i,o,{align:`right`})}function sn(e){let t=String(e||`-`);return t===`Hadir`||t===`Lunas`?{content:t,styles:{textColor:[22,163,74],fontStyle:`bold`,halign:`center`}}:t===`Izin`||t===`Sebagian`?{content:t,styles:{textColor:[217,119,6],fontStyle:`bold`,halign:`center`}}:t===`Sakit`?{content:t,styles:{textColor:[2,132,199],fontStyle:`bold`,halign:`center`}}:t===`Alpha`||t===`Belum Absen!`||t===`Blm Lunas`||t===`Belum Lunas`?{content:t,styles:{textColor:[220,38,38],fontStyle:`bold`,halign:`center`}}:{content:t,styles:{textColor:[71,85,105],halign:`center`}}}function cn(e){let t=l.profiles.filter(e=>o(e.role)),n=[...e].sort((e,t)=>Number(e.pertemuan_ke||0)-Number(t.pertemuan_ke||0)),r=new Map;n.forEach(e=>{let t=Number(e.pertemuan_ke||1);r.has(t)||r.set(t,{pertemuan:t,sessions:[]}),r.get(t).sessions.push(e)});let i=Array.from(r.values()).sort((e,t)=>e.pertemuan-t.pertemuan),a=i.flatMap(e=>e.sessions);if(a.length===0)return{head:[[`NIM`,`Nama Mahasiswa`,`Keterangan`,`Persentase Hadir`]],body:t.length===0?[[`-`,`-`,`Belum ada data sesi absensi`,`0%`]]:t.map(e=>[{content:e.npm,styles:{fontStyle:`bold`}},e.nama_lengkap,`Belum ada sesi absensi pada periode ini`,{content:`0%`,styles:{fontStyle:`bold`}}]),columnStyles:{1:{halign:`left`}}};let s=[{content:`NIM`,rowSpan:2},{content:`Nama Mahasiswa`,rowSpan:2},...i.map(e=>({content:`Pertemuan ${e.pertemuan}`,colSpan:e.sessions.length})),{content:`Persentase Hadir`,rowSpan:2}],c=a.map(e=>e.mata_kuliah||`-`),u=t.map(e=>{let t=0,n=0,r=a.map(r=>{let i=l.absensi.find(t=>t.sesi_id===r.id&&t.user_id===e.id)||null;return i&&(n+=1,i.status_kehadiran===`Hadir`&&(t+=1)),sn(i?i.status_kehadiran:`-`)}),i=Math.max(n,a.length),o=i>0?Math.round(t/i*100):0;return[{content:e.npm,styles:{fontStyle:`bold`,halign:`center`}},{content:e.nama_lengkap,styles:{halign:`left`}},...r,{content:`${o}%`,styles:{fontStyle:`bold`,halign:`center`}}]}),d=3+a.length;return{head:[s,c],body:u,fontSize:d>11?7.2:d>8?7.8:8.5,columnStyles:{0:{cellWidth:68,halign:`center`},1:{halign:`left`}}}}function ln(){let{monthGroups:e,orderedSlots:t,rows:n}=Lt();if(t.length===0)return{head:[[`NIM`,`Nama Mahasiswa`,`Keterangan Tagihan`]],body:n.map(e=>[{content:e.student.npm,styles:{fontStyle:`bold`}},{content:e.student.nama_lengkap,styles:{halign:`left`}},`Belum ada tagihan periode kas`]),fontSize:8.5};let r=[{content:`NIM`,rowSpan:2},{content:`Nama Mahasiswa`,rowSpan:2},...e.map(e=>({content:e.monthLabel,colSpan:e.slots.length}))],i=t.map(e=>e.subLabel),a=n.map(e=>[{content:e.student.npm,styles:{fontStyle:`bold`,halign:`center`}},{content:e.student.nama_lengkap,styles:{halign:`left`}},...e.slotCells.map(e=>!e.bills||e.bills.length===0?`-`:e.paid>0?v(e.paid):`-`)]),o=2+t.length;return{head:[r,i],body:a,fontSize:o>12?7.2:o>9?7.8:8.5,columnStyles:{0:{cellWidth:72,halign:`center`},1:{halign:`left`}}}}function un(){let e=l.profiles.filter(e=>s(e.role)).map(e=>{let t=Y(e.id);return[{content:e.npm,styles:{fontStyle:`bold`,halign:`center`}},{content:e.nama_lengkap,styles:{halign:`left`}},{content:v(t.sudahBayar),styles:{fontStyle:`bold`,halign:`center`}},{content:t.tunggakan>0?v(t.tunggakan):`-`,styles:{halign:`center`}},sn(t.isLunas?`Lunas`:t.sudahBayar>0?`Sebagian`:`Blm Lunas`)]});return{head:[[`NIM`,`Nama Mahasiswa`,`Total Dibayar`,`Tunggakan`,`Status`]],body:e.length?e:[[`-`,`-`,`Rp 0`,`Rp 0`,`-`]],fontSize:9,columnStyles:{0:{cellWidth:85,halign:`center`},1:{halign:`left`}}}}function dn(e){let t=[...l.sesiAbsensi].sort((e,t)=>Number(e.pertemuan_ke||0)-Number(t.pertemuan_ke||0)),n=[],r=new Set;t.forEach(e=>{let t=String(e.mata_kuliah||``).trim();t&&!r.has(t)&&(r.add(t),n.push(t))});let i=Array.from(new Set(t.map(e=>Number(e.pertemuan_ke||1)))).sort((e,t)=>e-t);if(!n.length||!i.length)return{head:[[`Pertemuan`,`Keterangan`,`H`,`I`,`Z`,`A`,`Persentase Hadir`]],body:[[`-`,`Belum ada sesi absensi kelas`,`-`,`-`,`-`,`-`,`0%`]],fontSize:8.5};let a=[{content:`Pertemuan`,rowSpan:2},...n.map(e=>({content:e,rowSpan:2})),{content:`Total Catatan`,colSpan:4},{content:`Persentase Hadir`,rowSpan:2}],o=[`H`,`I`,`Z`,`A`],s=i.map(r=>{let i=0,a=0,o=0,s=0,c=0,u=n.map(n=>{let u=t.find(e=>Number(e.pertemuan_ke||1)===r&&e.mata_kuliah===n);if(!u)return`-`;let d=l.absensi.find(t=>t.sesi_id===u.id&&t.user_id===e);return d?(c+=1,d.status_kehadiran===`Hadir`?i+=1:d.status_kehadiran===`Izin`?a+=1:d.status_kehadiran===`Sakit`?o+=1:s+=1,sn(d.status_kehadiran)):`-`}),d=Math.max(c,n.filter(e=>t.some(t=>Number(t.pertemuan_ke||1)===r&&t.mata_kuliah===e)).length),f=d>0?Math.round(i/d*100):0;return[{content:String(r),styles:{fontStyle:`bold`,halign:`center`}},...u,i>0?String(i):`-`,a>0?String(a):`-`,o>0?String(o):`-`,s>0?String(s):`-`,{content:`${f}%`,styles:{fontStyle:`bold`,halign:`center`}}]});return{head:[a,o],body:s,fontSize:n.length>4?7.6:8.5,columnStyles:{0:{cellWidth:64,halign:`center`}}}}function fn(e){let t=[`Januari`,`Februari`,`Maret`,`April`,`Mei`,`Juni`,`Juli`,`Agustus`,`September`,`Oktober`,`November`,`Desember`],n=l.iuranKas.filter(t=>t.user_id===e);if(!n.length)return{head:[[`Bulan`,`Periode 1`,`Periode 2`,`Periode 3`,`Periode 4`,`Total Dibayar`,`Tunggakan`,`Status`]],body:[[`-`,`-`,`-`,`-`,`-`,`Rp 0`,`-`,`-`]],fontSize:8.8};let r=new Map;return n.forEach(e=>{let n=String(e.periode||``).trim(),i=n.toLowerCase(),a=t.findIndex(e=>i.includes(e.toLowerCase())),o=a>=0?t[a]:`Lainnya`,s=n.match(/(20\d{2})/),c=s?Number(s[1]):9999,l=n.match(/(?:minggu|pekan|m|ke[- ]?)\s*(\d+)/i)||n.match(/^(\d+)/),u=l?Number(l[1]):99;r.has(o)||r.set(o,{monthLabel:o,yearNum:c,monthIdx:a>=0?a:99,items:[]}),r.get(o).items.push({bill:e,slotOrder:u})}),{head:[[`Bulan`,`Periode 1`,`Periode 2`,`Periode 3`,`Periode 4`,`Total Dibayar`,`Tunggakan`,`Status`]],body:Array.from(r.values()).sort((e,t)=>e.yearNum-t.yearNum||e.monthIdx-t.monthIdx).map(e=>{let t=[...e.items].sort((e,t)=>e.slotOrder-t.slotOrder),n=[t[0]?.bill,t[1]?.bill,t[2]?.bill,t[3]?.bill],r=e.items.reduce((e,t)=>e+E(t.bill),0),i=e.items.reduce((e,t)=>e+Number(t.bill.nominal_tagihan||0),0),a=Math.max(0,i-r),o=a===0&&e.items.every(e=>O(e.bill)===`Lunas`);return[{content:e.monthLabel,styles:{fontStyle:`bold`,halign:`center`}},...n.map(e=>{let t=e?E(e):0;return t>0?v(t):`-`}),{content:v(r),styles:{fontStyle:`bold`,halign:`center`}},a>0?v(a):`-`,sn(o?`Lunas`:r>0?`Sebagian`:`Blm Lunas`)]}),fontSize:8.8}}function pn(e,t,n=[]){let r=(document.getElementById(`pdf-catatan-evaluasi`)?.value||l.filters.pdfEvaluationNote||``).trim(),i=[];if((n||[]).forEach(e=>{e&&String(e).trim()&&i.push(`- ${String(e).trim()}`)}),r&&i.push(`- Catatan Tambahan Pengurus: ${r}`),!i.length)return t;let a=e.pageWidth-80,o=a-28,s=[];i.forEach(t=>{e.splitTextToSize(t,o,8.8,`normal`).forEach(e=>s.push(e))});let c=12.2,u=26+s.length*c+10,d=t+14;return d+u>e.pageHeight-52&&(e.addPage(),d=48),e.setFillColor(248,250,252),e.setDrawColor(148,163,184),e.setLineWidth(.6),e.rect(40,d,a,u,`FD`),e.setFillColor(22,58,120),e.rect(40,d,4,u,`F`),e.setFont(`helvetica`,`bold`),e.setFontSize(9.8),e.setTextColor(22,58,120),e.text(`Catatan & Evaluasi Singkat`,52,d+16),e.setFont(`helvetica`,`normal`),e.setFontSize(8.8),e.setTextColor(30,41,59),s.forEach((t,n)=>{e.text(t,52,d+31+n*c)}),d+u}function mn(e,t={}){let n=l.profiles.filter(e=>o(e.role)),r=l.profiles.filter(e=>s(e.role));if(e===`kas_bulanan`){let e=r.filter(e=>Y(e.id).isLunas).length,n=r.reduce((e,t)=>e+Y(t.id).tunggakan,0),i=l.transaksiKas.filter(e=>e.jenis===`Pemasukan`&&(!t.monthVal||(e.tanggal||``).startsWith(t.monthVal))).reduce((e,t)=>e+Number(t.nominal||0),0),a=l.transaksiKas.filter(e=>e.jenis===`Pengeluaran`&&(!t.monthVal||(e.tanggal||``).startsWith(t.monthVal))).reduce((e,t)=>e+Number(t.nominal||0),0),o=i-a;return[`Periode ${t.monthLabel}: Pemasukan tercatat ${v(i)}, Pengeluaran ${v(a)}, selisih kas bulan ini ${v(o)}.`,`Evaluasi Kepatuhan Kas: ${e} dari ${r.length} anggota kas berstatus Lunas; total tunggakan berjalan ${v(n)}.`,n>0?`Tindak Lanjut: Bendahara disarankan mengirim pengingat WhatsApp berkala kepada mahasiswa yang masih memiliki tunggakan.`:`Evaluasi Baik: Seluruh tagihan kas mahasiswa telah terbayar lunas pada periode berjalan.`]}if(e===`absensi_bulanan`){let e=t.sessions||[],r=new Set(e.map(e=>e.id)),i=l.absensi.filter(e=>r.has(e.sesi_id)),a=i.filter(e=>e.status_kehadiran===`Hadir`).length,o=i.filter(e=>e.status_kehadiran===`Alpha`||e.status_kehadiran===`Belum Absen!`).length,s=i.filter(e=>e.status_verifikasi===`Menunggu`).length,c=Math.max(1,n.length*e.length),u=e.length>0&&n.length>0?Math.round(a/c*100):0;return[`Rekap ${t.monthLabel}: Terlaksana ${e.length} sesi perkuliahan dengan rata-rata tingkat kehadiran kelas ${u}% (${a} catatan Hadir).`,`Evaluasi Kedisiplinan: Tercatat ${o} Alpha/Belum Absen dan ${s} kiriman absensi menunggu verifikasi Ketua/Admin.`,s>0||o>0?`Tindak Lanjut: Mohon segera selesaikan verifikasi antrean kehadiran serta pembinaan bagi mahasiswa yang melewati batas sesi.`:`Evaluasi Baik: Seluruh presensi pada periode ini telah terverifikasi dengan tingkat kedisiplinan optimal.`]}if(e===`keseluruhan`){let e=t.sessions||[],i=new Set(e.map(e=>e.id)),a=l.absensi.filter(e=>i.has(e.sesi_id)).filter(e=>e.status_kehadiran===`Hadir`).length,o=Math.max(1,n.length*e.length),s=e.length>0&&n.length>0?Math.round(a/o*100):0,c=r.filter(e=>Y(e.id).isLunas).length,u=r.reduce((e,t)=>e+Y(t.id).tunggakan,0),d=l.transaksiKas.filter(e=>e.jenis===`Pemasukan`&&(!t.monthVal||(e.tanggal||``).startsWith(t.monthVal))).reduce((e,t)=>e+Number(t.nominal||0),0),f=l.transaksiKas.filter(e=>e.jenis===`Pengeluaran`&&(!t.monthVal||(e.tanggal||``).startsWith(t.monthVal))).reduce((e,t)=>e+Number(t.nominal||0),0);return[`Ringkasan Akademik (${t.monthLabel}): ${e.length} sesi kuliah terlaksana dengan rata-rata kehadiran kelas sebesar ${s}%.`,`Ringkasan Keuangan: Pemasukan bulan ini ${v(d)}, Pengeluaran ${v(f)}; ${c}/${n.length} mahasiswa berstatus kas Lunas (sisa piutang ${v(u)}).`,`Evaluasi Terpadu: Pengurus diharapkan menjaga konsistensi validasi kehadiran kamera+GPS dan ketertiban iuran kas kelas.`]}if(e===`per_mahasiswa`&&t.student){let e=J(t.student.id),n=Y(t.student.id),r=`Evaluasi Kas: Total dibayar ${v(n.sudahBayar)}, sisa tunggakan ${v(n.tunggakan)} (${n.isLunas?`Lunas`:`Belum Lunas`}).`;if(t.excludeAbsensi)return[r,n.isLunas?`Catatan Singkat: Seluruh tagihan kas mahasiswa telah terbayar lunas tanpa tunggakan.`:`Catatan Singkat: Masih terdapat sisa tunggakan iuran kas yang perlu segera diselesaikan.`];let i=`Evaluasi Kehadiran: ${t.student.nama_lengkap} memiliki tingkat kehadiran ${e.pct}% (${e.hadir} Hadir, ${e.izin} Izin, ${e.sakit} Sakit, ${e.alpha} Alpha/Belum Absen).`;return t.excludeKas?[i,e.pct>=75?`Catatan Singkat: Kehadiran memenuhi syarat minimal perkuliahan (>=75%), pertahankan konsistensi.`:`Catatan Singkat: Persentase kehadiran di bawah 75%, mohon tingkatkan kehadiran pada pertemuan berikutnya.`]:[i,r,e.pct>=75&&n.isLunas?`Kesimpulan: Performa akademik dan administrasi kas mahasiswa berstatus Sangat Baik.`:`Kesimpulan: Perlu perhatian pada peningkatan persentase kehadiran dan/atau penyelesaian tunggakan kas.`]}return[]}function hn(e,t){let n=Object.fromEntries(l.profiles.map(e=>[e.id,e])),r=l.transaksiKas.filter(t=>(t.tanggal||``).startsWith(e));return r.length===0?[[`-`,`-`,`-`,`-`,{content:`Belum ada mutasi transaksi kas pada bulan ${t}`,styles:{halign:`left`,fontStyle:`italic`}},`-`,`Rp 0`]]:r.map((e,t)=>[String(t+1),_(e.tanggal),e.jenis,e.kategori,{content:`${e.keterangan}${e.pengirim_nama?` (Pengirim: ${e.pengirim_nama})`:``}`,styles:{halign:`left`}},e.pj_nama||(e.jenis===`Pemasukan`&&!e.pj_id?`- (Dari Mahasiswa Sendiri)`:n[e.dicatat_oleh]?.nama_lengkap||`-`),{content:`${e.jenis===`Pemasukan`?`+`:`-`}${v(e.nominal)}`,styles:{fontStyle:`bold`,textColor:e.jenis===`Pemasukan`?[22,163,74]:[220,38,38],halign:`right`}}])}function gn(){document.getElementById(`pdf-month-input`)?.addEventListener(`change`,e=>{l.filters.pdfMonth=e.target.value,V()}),document.getElementById(`pdf-student-select`)?.addEventListener(`change`,e=>{l.filters.pdfStudentId=e.target.value}),document.getElementById(`pdf-catatan-evaluasi`)?.addEventListener(`input`,e=>{l.filters.pdfEvaluationNote=e.target.value});let e={cellPadding:5,textColor:[15,23,42],lineColor:[30,41,59],lineWidth:.55},t={fillColor:[22,58,120],textColor:[255,255,255],fontStyle:`bold`,halign:`center`,lineColor:[30,41,59]},n={fillColor:[29,78,216],textColor:[255,255,255],fontStyle:`bold`,halign:`center`};document.getElementById(`btn-pdf-kas-bulanan`)?.addEventListener(`click`,async()=>{let r=await X(),i=new Date,a=document.getElementById(`pdf-month-input`).value,o=g(a),s=Xt(),c=ln(),u=un(),d=l.transaksiKas.filter(e=>(e.tanggal||``).startsWith(a)),f=hn(a,o),p=nn(),{doc:m,startY:h}=rn(`Laporan Rekapitulasi Kas Bulanan`,`Periode ${o}`,i,{periodeLabel:o,extraRows:[{label:`Jumlah Transaksi Bulan Ini`,value:`${d.length} Transaksi (Saldo Umum: ${v(p)})`}]}),_=Z(m,`Tabel Uang Kas Per Periode Keseluruhan Mahasiswa`,h,`Rincian Iuran Kas Per Bulan & Minggu`);m.autoTable({startY:_,margin:{left:40,right:40},head:c.head,body:c.body,styles:{...e,fontSize:c.fontSize},headStyles:t,subHeadStyles:n,columnStyles:c.columnStyles||{}});let y=Z(m,`Tabel Total Uang Keseluruhan Mahasiswa`,m.lastAutoTable.finalY+24,`Rekapitulasi Pembayaran Kas`);m.autoTable({startY:y,margin:{left:40,right:40},head:u.head,body:u.body,styles:{...e,fontSize:u.fontSize},headStyles:t,columnStyles:u.columnStyles||{}});let b=Z(m,`Tabel Rekapitulasi Mutasi Kas`,m.lastAutoTable.finalY+22,`Mutasi Kas Bulan ${o}`);m.autoTable({startY:b,margin:{left:40,right:40},head:[[`No`,`Tanggal`,`Jenis`,`Kategori`,`Keterangan / Pengirim`,`PJ Pencatat`,`Nominal`]],body:f,styles:{...e,fontSize:8},headStyles:t,columnStyles:{0:{cellWidth:28,halign:`center`}}});let x=pn(m,m.lastAutoTable.finalY,mn(`kas_bulanan`,{monthLabel:o,monthVal:a}));an(m,[{roleLabel:`Dibuat Oleh,`,name:s.bendahara.nama,title:s.bendahara.jabatan},{roleLabel:`Mengetahui / Disetujui Oleh,`,name:s.admin.nama,title:s.admin.jabatan,showAdminLogo:!0}],x,i,r),on(m,`Laporan Rekapitulasi Kas Bulanan (${o})`),m.save(`Kas_Keseluruhan_Mahasiswa_R3S_${a}.pdf`),S(`Laporan Kas Keseluruhan ${o} (PDF) berhasil diunduh!`,`success`)}),document.getElementById(`btn-pdf-absensi-bulanan`)?.addEventListener(`click`,async()=>{let r=await X(),i=new Date,a=document.getElementById(`pdf-month-input`).value,o=g(a),s=Xt(),c=l.sesiAbsensi.filter(e=>(e.tanggal||d(new Date(e.created_at))).startsWith(a)),u=c.length>0?c:l.sesiAbsensi,f=cn(u),p=new Set(u.map(e=>e.id)),m=l.absensi.filter(e=>p.has(e.sesi_id)).length,{doc:h,startY:_}=rn(`Laporan Rekapitulasi Absensi Bulanan`,`Periode ${o}`,i,{periodeLabel:o,extraRows:[{label:`Jumlah Sesi Bulan Ini`,value:`${u.length} Sesi Kuliah (${m} Catatan Kehadiran)`}]}),v=Z(h,`Tabel Matriks Absensi Keseluruhan Mahasiswa`,_,`Periode ${o}`);h.autoTable({startY:v,margin:{left:40,right:40},head:f.head,body:f.body,styles:{...e,fontSize:f.fontSize||8.4},headStyles:t,subHeadStyles:n,columnStyles:f.columnStyles||{}});let y=pn(h,h.lastAutoTable.finalY,mn(`absensi_bulanan`,{monthLabel:o,sessions:u}));an(h,[{roleLabel:`Dibuat Oleh,`,name:s.ketua.nama,title:s.ketua.jabatan},{roleLabel:`Mengetahui / Disetujui Oleh,`,name:s.admin.nama,title:s.admin.jabatan,showAdminLogo:!0}],y,i,r),on(h,`Laporan Rekapitulasi Absensi Bulanan (${o})`),h.save(`Absensi_Keseluruhan_Mahasiswa_R3S_${a}.pdf`),S(`Laporan Absensi Keseluruhan ${o} (PDF) berhasil diunduh!`,`success`)}),document.getElementById(`btn-pdf-keseluruhan`)?.addEventListener(`click`,async()=>{let r=await X(),i=new Date,a=document.getElementById(`pdf-month-input`).value,o=g(a),s=Xt(),c=l.sesiAbsensi.filter(e=>(e.tanggal||d(new Date(e.created_at))).startsWith(a)),u=c.length>0?c:l.sesiAbsensi,f=cn(u),p=ln(),m=un(),h=l.transaksiKas.filter(e=>(e.tanggal||``).startsWith(a)),_=hn(a,o),y=nn(),{doc:b,startY:x}=rn(`Laporan Keseluruhan Rekapan Bulanan`,`Periode ${o}`,i,{periodeLabel:o,extraRows:[{label:`Jumlah Sesi & Transaksi`,value:`${u.length} Sesi · ${h.length} Transaksi Kas (Saldo Umum: ${v(y)})`}]}),C=Z(b,`Tabel Matriks Absensi Keseluruhan Mahasiswa`,x,`Periode ${o}`);b.autoTable({startY:C,margin:{left:40,right:40},head:f.head,body:f.body,styles:{...e,fontSize:f.fontSize||8.4},headStyles:t,subHeadStyles:n,columnStyles:f.columnStyles||{}});let w=Z(b,`Tabel Uang Kas Per Periode Keseluruhan Mahasiswa`,b.lastAutoTable.finalY+24,`Rincian Iuran Kas Per Bulan & Minggu`);b.autoTable({startY:w,margin:{left:40,right:40},head:p.head,body:p.body,styles:{...e,fontSize:p.fontSize},headStyles:t,subHeadStyles:n,columnStyles:p.columnStyles||{}});let T=Z(b,`Tabel Total Uang Keseluruhan Mahasiswa`,b.lastAutoTable.finalY+24,`Rekapitulasi Pembayaran Kas`);b.autoTable({startY:T,margin:{left:40,right:40},head:m.head,body:m.body,styles:{...e,fontSize:m.fontSize},headStyles:t,columnStyles:m.columnStyles||{}});let E=Z(b,`Tabel Rekapitulasi Mutasi Kas`,b.lastAutoTable.finalY+22,`Mutasi Kas Bulan ${o}`);b.autoTable({startY:E,margin:{left:40,right:40},head:[[`No`,`Tanggal`,`Jenis`,`Kategori`,`Keterangan / Pengirim`,`PJ Pencatat`,`Nominal`]],body:_,styles:{...e,fontSize:8},headStyles:t,columnStyles:{0:{cellWidth:28,halign:`center`}}});let D=pn(b,b.lastAutoTable.finalY,mn(`keseluruhan`,{monthLabel:o,monthVal:a,sessions:u}));an(b,[{roleLabel:`Dibuat Oleh,`,name:s.bendahara.nama,title:s.bendahara.jabatan},{roleLabel:`Mengetahui,`,name:s.ketua.nama,title:s.ketua.jabatan},{roleLabel:`Disetujui Oleh,`,name:s.admin.nama,title:s.admin.jabatan,showAdminLogo:!0}],D,i,r),on(b,`Rekapan Keseluruhan Mahasiswa (${o})`),b.save(`Rekapan_Keseluruhan_R3S_${a}.pdf`),S(`Laporan Keseluruhan Rekapan (PDF) berhasil diunduh!`,`success`)}),document.getElementById(`btn-pdf-per-mahasiswa`)?.addEventListener(`click`,async()=>{let r=await X(),i=new Date,a=document.getElementById(`pdf-month-input`).value,o=g(a),s=l.currentUser?.role||`admin`,c=s===`ketua`,u=s===`bendahara`,d=document.getElementById(`pdf-student-select`).value,f=l.profiles.find(e=>e.id===d);if(!f){S(`Pilih mahasiswa terlebih dahulu.`,`warning`);return}let p=Xt(),m=dn(f.id),h=fn(f.id),_=J(f.id),y=Y(f.id),b=u?`Laporan Rekapitulasi Kas Per Mahasiswa`:c?`Laporan Rekapitulasi Absensi Per Mahasiswa`:`Laporan Rekapitulasi Per Mahasiswa`,x=u?`Terbayar ${v(y.sudahBayar)} (Tunggakan: ${v(y.tunggakan)})`:c?`Kehadiran ${_.pct}% (${_.hadir} Hadir dari ${_.total} Catatan)`:`Hadir ${_.pct}% · Kas Terbayar ${v(y.sudahBayar)} (Tunggakan: ${v(y.tunggakan)})`,{doc:C,startY:w}=rn(b,`Permahasiswa · ${f.nama_lengkap} (${f.npm})`,i,{periodeLabel:o,extraRows:[{label:`Nama Mahasiswa`,value:`${f.nama_lengkap} (NIM: ${f.npm})`},{label:`Ringkasan Status`,value:x}]});if(u){let n=Z(C,`Tabel Rekapitulasi Kas Per Mahasiswa`,w,`${f.nama_lengkap} (${f.npm})`);C.autoTable({startY:n,margin:{left:40,right:40},head:h.head,body:h.body,styles:{...e,fontSize:h.fontSize},headStyles:t})}else{let r=Z(C,`Tabel Matriks Absensi Per Mahasiswa`,w,`${f.nama_lengkap} (${f.npm})`);if(C.autoTable({startY:r,margin:{left:40,right:40},head:m.head,body:m.body,styles:{...e,fontSize:m.fontSize},headStyles:t,subHeadStyles:n,columnStyles:m.columnStyles||{}}),!c){let n=Z(C,`Tabel Rekapitulasi Kas Per Mahasiswa`,C.lastAutoTable.finalY+24,`${f.nama_lengkap} (${f.npm})`);C.autoTable({startY:n,margin:{left:40,right:40},head:h.head,body:h.body,styles:{...e,fontSize:h.fontSize},headStyles:t})}}let T=pn(C,C.lastAutoTable.finalY,mn(`per_mahasiswa`,{student:f,excludeKas:c,excludeAbsensi:u}));an(C,[u?{roleLabel:`Dibuat Oleh,`,name:p.bendahara.nama,title:p.bendahara.jabatan}:{roleLabel:`Dibuat Oleh,`,name:p.ketua.nama,title:p.ketua.jabatan},{roleLabel:`Mengetahui / Disetujui Oleh,`,name:p.admin.nama,title:p.admin.jabatan,showAdminLogo:!0}],T,i,r),on(C,`Laporan Permahasiswa — ${f.nama_lengkap} (${f.npm})`),C.save(`Laporan_Permahasiswa_${f.npm}_${f.nama_lengkap.replace(/\s+/g,`_`)}.pdf`),S(`Laporan PDF ${f.nama_lengkap} berhasil diunduh!`,`success`)})}function _n(e,t){if(!e.length)return;let n=Object.keys(e[0]),r=[n.map(e=>`"${String(e).replace(/"/g,`""`)}"`).join(`,`),...e.map(e=>n.map(t=>`"${String(e[t]??``).replace(/"/g,`""`)}"`).join(`,`))],i=new Blob([`\uFEFF${r.join(`
`)}`],{type:`text/csv;charset=utf-8;`}),a=URL.createObjectURL(i),o=document.createElement(`a`);o.href=a,o.download=t,o.click(),URL.revokeObjectURL(a)}function vn(){let e=Object.fromEntries(l.profiles.map(e=>[e.id,e])),t=l.filters.laporanSearch.toLowerCase(),n=l.filters.laporanKategori,r=l.laporanKendala.filter(r=>{let i=e[r.user_id],a=`${i?.nama_lengkap||``} ${i?.npm||``} ${r.keterangan} ${r.kategori}`.toLowerCase();return(!t||a.includes(t))&&(n===`Semua`||r.kategori===n)});return`
    <div class="page-header">
      <div>
        <span class="meta-line">Tindak Lanjut Kendala Mahasiswa &amp; Permintaan Rekapan Excel</span>
        <h2>Monitoring Laporan Masuk</h2>
      </div>
    </div>

    <div class="card glass-panel">
      <div class="toolbar-filters">
        <input type="search" id="filter-laporan-search" placeholder="Cari nama pelapor atau isi laporan..." value="${y(l.filters.laporanSearch)}" />
        <select id="filter-laporan-kategori">
          ${[`Semua`,`Kendala Absensi`,`Permintaan Rekapan Excel`,`Kendala Pembayaran Kas`,`Bug / Teknis`,`Lainnya`].map(e=>`<option value="${e}" ${n===e?`selected`:``}>${e}</option>`).join(``)}
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
            ${r.length===0?`<tr><td colspan="4" class="text-center">Belum ada laporan masuk.</td></tr>`:r.map(t=>{let n=e[t.user_id];return`
                        <tr>
                          <td>
                            <strong>${y(n?.nama_lengkap||`-`)}</strong>
                            <div class="meta-line tabular-nums">${y(n?.npm||`-`)} · ${y(t.kategori)}</div>
                          </td>
                          <td>
                            <div>${y(t.keterangan)}</div>
                            ${t.bukti_url?`<button type="button" class="btn-link-inline btn-view-img" data-url="${y(t.bukti_url)}" data-title="Lampiran Laporan">Lihat Lampiran</button>`:``}
                          </td>
                          <td style="min-width:220px;">
                            <textarea class="laporan-reply-input" data-id="${t.id}" rows="2" placeholder="Tulis tanggapan Admin...">${y(t.tanggapan_admin||``)}</textarea>
                          </td>
                          <td>
                            <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-start;">
                              <span class="status-tag ${C(t.status)}">${y(t.status)}</span>
                              <div class="row-actions">
                                <button type="button" class="btn btn-secondary btn-sm btn-save-tanggapan" data-id="${t.id}" data-user="${t.user_id}">Simpan Tanggapan</button>
                                <button type="button" class="btn btn-success-soft btn-sm btn-finish-laporan" data-id="${t.id}" data-user="${t.user_id}">Konfirmasi Selesai</button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      `}).join(``)}
          </tbody>
        </table>
      </div>
    </div>
  `}function yn(){$(),document.getElementById(`filter-laporan-search`)?.addEventListener(`input`,e=>{l.filters.laporanSearch=e.target.value,V();let t=document.getElementById(`filter-laporan-search`);t&&(t.focus(),t.setSelectionRange(t.value.length,t.value.length))}),document.getElementById(`filter-laporan-kategori`)?.addEventListener(`change`,e=>{l.filters.laporanKategori=e.target.value,V()}),document.querySelectorAll(`.btn-save-tanggapan`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-id`),n=e.getAttribute(`data-user`),r=document.querySelector(`.laporan-reply-input[data-id="${t}"]`)?.value.trim()||``,i=l.laporanKendala.find(e=>e.id===t);try{await R.update(`laporan_kendala`,t,{tanggapan_admin:r,status:`Menunggu`,ditanggapi_oleh:l.currentUser.id}),n&&await A([{user_id:n,judul:`Tanggapan Laporan Masuk`,pesan:`Admin menanggapi laporan "${i?.kategori||`Kendala`}": "${r}"`,tipe:`info`}]),await R.loadAll(),S(`Tanggapan disimpan (Status tetap Menunggu sampai dikonfirmasi Selesai).`,`info`),B(),V()}catch(e){S(e.message||`Gagal menyimpan tanggapan.`,`danger`)}})}),document.querySelectorAll(`.btn-finish-laporan`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-id`),n=e.getAttribute(`data-user`),r=document.querySelector(`.laporan-reply-input[data-id="${t}"]`)?.value.trim()||`Laporan telah ditindaklanjuti.`,i=l.laporanKendala.find(e=>e.id===t),a=l.profiles.find(e=>e.id===n);try{await R.update(`laporan_kendala`,t,{tanggapan_admin:r,status:`Selesai`,ditanggapi_oleh:l.currentUser.id});let e=[{user_id:n,judul:`Laporan Kendala Selesai`,pesan:`Laporan "${i?.kategori||`Kendala`}" Anda telah dikonfirmasi Selesai oleh ${l.currentUser.nama_lengkap}: "${r}"`,tipe:`success`}];k([`admin`]).forEach(t=>{e.push({user_id:t,judul:`Laporan Masuk Telah Diselesaikan`,pesan:`Laporan "${i?.kategori||`Kendala`}" dari ${a?.nama_lengkap||`Anggota`} diselesaikan oleh ${l.currentUser.nama_lengkap}.`,tipe:`success`})}),await A(e),await R.loadAll(),S(`Laporan dikonfirmasi Selesai!`,`success`),B(),V()}catch(e){S(e.message||`Gagal menyelesaikan laporan.`,`danger`)}})})}function bn(){let e=l.pengaturan||{},t=l.filters.akunSearch.toLowerCase(),r={admin:0,ketua:1,bendahara:2,pj_matkul:3,mahasiswa:4},a=[...l.profiles].sort((e,t)=>{let n=r[e.role]??9,i=r[t.role]??9;return n===i?String(e.npm||``).localeCompare(String(t.npm||``)):n-i}).filter(e=>{let n=`${e.npm} ${e.nama_lengkap} ${e.username} ${e.role} ${i[e.role]||``}`.toLowerCase();return!t||n.includes(t)});return`
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
              <input type="number" id="set-semester" min="1" max="14" value="${e.semester_aktif||3}" required />
            </div>
            <div class="field-group">
              <label for="set-berjalan">Pertemuan Berjalan</label>
              <input type="number" id="set-berjalan" min="0" value="${Number(e.pertemuan_berjalan??0)}" required />
            </div>
            <div class="field-group">
              <label for="set-total">Total Pertemuan</label>
              <input type="number" id="set-total" min="1" value="${e.total_pertemuan_semester||14}" required />
            </div>
          </div>
          <div class="grid-2" style="margin-bottom:0;">
            <div class="field-group">
              <label for="set-bank">Bank / Dompet Digital</label>
              <input type="text" id="set-bank" value="${y(e.nama_bank||``)}" required />
            </div>
            <div class="field-group">
              <label for="set-norek">No. Rekening</label>
              <input type="text" id="set-norek" value="${y(e.no_rekening||``)}" required class="tabular-nums" />
            </div>
          </div>
          <div class="field-group">
            <label for="set-atasnama">Atas Nama Rekening</label>
            <input type="text" id="set-atasnama" value="${y(e.atas_nama_rekening||``)}" required />
          </div>
          <div class="grid-2" style="margin-bottom:0;">
            <div class="field-group">
              <label for="set-qris-merchant">Nama Toko QRIS</label>
              <input type="text" id="set-qris-merchant" value="${y(e.qris_merchant_name||`Mas_hy, Fashion`)}" required />
            </div>
            <div class="field-group">
              <label for="set-nmid">NMID QRIS</label>
              <input type="text" id="set-nmid" value="${y(e.qris_nmid||`ID1025463553806`)}" required class="tabular-nums" />
            </div>
          </div>
          <div class="field-group">
            <label for="set-qris-payload">Kode QRIS Statis / Data Dasar (Otomatis Dikonversi ke QRIS Dinamis)</label>
            <textarea id="set-qris-payload" rows="2" class="tabular-nums" required>${y(e.qris_payload||n)}</textarea>
          </div>
          <div class="field-group">
            <label for="set-nominal">Nominal Kas Standar (Rp)</label>
            <input type="number" id="set-nominal" min="2000" value="${e.nominal_kas_default||1e4}" required class="tabular-nums" />
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
          <span class="meta-line tabular-nums">${a.length} akun</span>
        </div>
      </div>

      <div class="toolbar-filters">
        <input type="search" id="filter-akun-search" placeholder="Cari NPM, nama, nama pengguna, atau peran..." value="${y(l.filters.akunSearch)}" />
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
            ${a.map(e=>`
              <tr>
                <td class="tabular-nums">${y(e.npm)}</td>
                <td><strong>${y(e.nama_lengkap)}</strong></td>
                <td><span class="status-tag ${c(e.role)}">${y(i[e.role]||e.role)}</span></td>
                <td class="tabular-nums">${y(e.username)}</td>
                <td class="tabular-nums">${y(e.password)}</td>
                <td>
                  <div class="row-actions" style="flex-wrap:wrap;">
                    ${e.id!==l.currentUser.id&&e.role!==`admin`?`<select
                            class="select-change-role"
                            data-id="${e.id}"
                            data-nama="${y(e.nama_lengkap)}"
                            data-prev-role="${y(e.role)}"
                            aria-label="Ubah role ${y(e.nama_lengkap)}"
                          >
                            <option value="mahasiswa" ${e.role===`mahasiswa`?`selected`:``}>Mahasiswa Biasa</option>
                            <option value="pj_matkul" ${e.role===`pj_matkul`?`selected`:``}>PJ Mata Kuliah</option>
                            <option value="ketua" ${e.role===`ketua`?`selected`:``}>Ketua Kelas</option>
                            <option value="bendahara" ${e.role===`bendahara`?`selected`:``}>Bendahara Kelas</option>
                          </select>`:``}
                    ${e.id===l.currentUser.id?`<span class="meta-line">Akun Aktif</span>`:`<button type="button" class="btn btn-danger-soft btn-sm btn-delete-akun" data-id="${e.id}" data-nama="${y(e.nama_lengkap)}">Hapus</button>`}
                  </div>
                </td>
              </tr>
            `).join(``)}
          </tbody>
        </table>
      </div>
    </div>
  `}function xn(){document.getElementById(`filter-akun-search`)?.addEventListener(`input`,e=>{l.filters.akunSearch=e.target.value,V();let t=document.getElementById(`filter-akun-search`);t&&(t.focus(),t.setSelectionRange(t.value.length,t.value.length))}),document.getElementById(`form-buat-akun`)?.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`akun-npm`).value.trim(),n=document.getElementById(`akun-nama`).value.trim(),r=document.getElementById(`akun-username`).value.trim(),a=document.getElementById(`akun-password`).value,o=document.getElementById(`akun-role`).value,s=document.getElementById(`akun-nowa`).value.trim();if(!b(a).valid)S(`Password wajib maks 8 karakter, min 1 angka, dan min 1 simbol.`,`danger`);else if(l.profiles.find(e=>e.username.toLowerCase()===r.toLowerCase()||e.npm===t))S(`NPM atau Username sudah terdaftar.`,`danger`);else try{await R.insert(`profiles`,{npm:t,nama_lengkap:n,username:r,password:a,role:o,no_wa:s,avatar_url:``}),await R.loadAll(),S(`Akun ${n} (${i[o]}) berhasil dibuat!`,`success`),V()}catch(e){S(e.message||`Gagal membuat akun baru.`,`danger`)}}),document.getElementById(`form-pengaturan-kelas`)?.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`set-qris-payload`)?.value.trim()||n,r=We(t),i=document.getElementById(`set-qris-merchant`)?.value.trim()||``,a=document.getElementById(`set-nmid`)?.value.trim()||``;try{await R.update(`pengaturan_kelas`,1,{semester_aktif:Number(document.getElementById(`set-semester`).value),pertemuan_berjalan:Number(document.getElementById(`set-berjalan`).value),total_pertemuan_semester:Number(document.getElementById(`set-total`).value),nama_bank:document.getElementById(`set-bank`).value.trim(),no_rekening:document.getElementById(`set-norek`).value.trim(),atas_nama_rekening:document.getElementById(`set-atasnama`).value.trim(),qris_merchant_name:i||r.merchantName||`Mas_hy, Fashion`,qris_nmid:a||r.nmid||`ID1025463553806`,qris_payload:t,nominal_kas_default:Number(document.getElementById(`set-nominal`).value)}),await R.loadAll(),S(`Pengaturan kelas, rekening & QRIS Dinamis berhasil disimpan!`,`success`),V()}catch(e){S(e.message||`Gagal menyimpan pengaturan kelas.`,`danger`)}}),document.querySelectorAll(`.select-change-role`).forEach(e=>{e.addEventListener(`change`,async()=>{let t=e.getAttribute(`data-id`),n=e.getAttribute(`data-nama`)||`Anggota`,r=e.getAttribute(`data-prev-role`)||`mahasiswa`,a=e.value;if(!new Set([`mahasiswa`,`pj_matkul`,`ketua`,`bendahara`]).has(a)||a===r)e.value=r;else{e.disabled=!0;try{await R.update(`profiles`,t,{role:a}),await A([{user_id:t,judul:`Perubahan Role Akun oleh Admin`,pesan:`Role akun Anda diubah oleh ${l.currentUser.nama_lengkap} dari ${i[r]||r} menjadi ${i[a]||a}.`,tipe:`info`}]),await R.loadAll(),S(`Role ${n} berhasil diubah menjadi ${i[a]||a}!`,`success`),B(),V()}catch(t){e.value=r,e.disabled=!1,S(t.message||`Gagal mengubah role anggota.`,`danger`)}}})}),document.querySelectorAll(`.btn-delete-akun`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-id`),n=e.getAttribute(`data-nama`);try{await R.remove(`profiles`,t),await R.loadAll(),S(`Akun ${n} berhasil dihapus.`,`info`),V()}catch(e){S(e.message||`Gagal menghapus akun.`,`danger`)}})})}function Q(e){let t=document.getElementById(e);t&&(t.classList.add(`hidden`),e===`modal-camera`&&Oe(),e===`modal-pay-kas`&&clearInterval(l.qrisTimerInterval))}function $(){document.querySelectorAll(`.btn-view-img`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-url`),n=e.getAttribute(`data-title`)||`Lampiran Gambar`;document.getElementById(`modal-image-title`).textContent=n,document.getElementById(`modal-image-meta`).textContent=`Pratinjau dokumen / bukti kelas R3S`,document.getElementById(`modal-image-src`).src=t,document.getElementById(`modal-image-preview`).classList.remove(`hidden`)})})}var Sn=`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>`,Cn=`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>`;function wn(e){let t=e===`light`?`light`:`dark`;l.theme=t,document.documentElement.setAttribute(`data-theme`,t);try{localStorage.setItem(r.THEME,t)}catch{}let n=t===`dark`;document.querySelectorAll(`[data-theme-toggle]`).forEach(e=>{let t=e.querySelector(`.theme-toggle-icon`),r=e.querySelector(`.theme-toggle-label`);t&&(t.innerHTML=n?Sn:Cn),r&&(r.textContent=n?`Tema Terang`:`Tema Gelap`),e.setAttribute(`aria-label`,n?`Aktifkan Tema Terang (Langit Cerah)`:`Aktifkan Tema Gelap (Galaksi Malam)`),e.setAttribute(`title`,n?`Beralih ke Tema Terang`:`Beralih ke Tema Gelap`)})}function Tn(){let e=`dark`;try{let t=localStorage.getItem(r.THEME);(t===`light`||t===`dark`)&&(e=t)}catch{e=`dark`}wn(e)}async function En(){Tn(),re(),M(),ae(),z(`login`),oe(),X(),document.querySelectorAll(`[data-theme-toggle]`).forEach(e=>{e.addEventListener(`click`,()=>{let e=l.theme===`light`?`dark`:`light`;wn(e),S(e===`light`?`Tema Terang (Langit Cerah) diaktifkan.`:`Tema Gelap (Galaksi Malam) diaktifkan.`,`info`)})}),document.querySelectorAll(`[data-sky-hour]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-sky-hour`);l.skyPreviewHour=t===`live`?null:Number(t),document.querySelectorAll(`[data-sky-hour]`).forEach(e=>{e.classList.toggle(`active`,e.getAttribute(`data-sky-hour`)===t)}),ie(new Date)})}),document.getElementById(`login-form`).addEventListener(`submit`,se),document.getElementById(`btn-refresh-login-captcha`).addEventListener(`click`,()=>z(`login`)),document.getElementById(`btn-refresh-forgot-captcha`).addEventListener(`click`,()=>z(`forgot`)),document.getElementById(`btn-goto-forgot`).addEventListener(`click`,()=>de(`forgot`)),document.getElementById(`btn-back-to-login`).addEventListener(`click`,()=>de(`login`)),document.getElementById(`btn-verify-username`).addEventListener(`click`,ce),document.getElementById(`forgot-new-password`).addEventListener(`input`,e=>{le(e.target.value,`#forgot-pw-rules`)}),document.getElementById(`forgot-form`).addEventListener(`submit`,ue),document.querySelectorAll(`.toggle-pw-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=document.getElementById(e.getAttribute(`data-target`));if(!t)return;let n=t.type===`password`;t.type=n?`text`:`password`,e.textContent=n?`Tutup`:`Lihat`})}),document.getElementById(`btn-mobile-menu`).addEventListener(`click`,()=>{document.getElementById(`app-sidebar`).classList.add(`open`),document.getElementById(`sidebar-overlay`).classList.remove(`hidden`)}),document.getElementById(`sidebar-overlay`).addEventListener(`click`,ge),document.getElementById(`btn-logout`).addEventListener(`click`,pe),document.getElementById(`btn-topbar-notif`).addEventListener(`click`,()=>{l.currentUser&&(l.activeTab=`pusat_info`,B(),V())}),document.getElementById(`topbar-user-trigger`).addEventListener(`click`,()=>{l.currentUser&&(l.activeTab=`profil`,B(),V())}),document.querySelectorAll(`[data-close-modal]`).forEach(e=>{e.addEventListener(`click`,()=>Q(e.getAttribute(`data-close-modal`)))}),document.getElementById(`btn-capture-photo`).addEventListener(`click`,we),document.getElementById(`btn-retake-photo`).addEventListener(`click`,Ee),document.getElementById(`btn-submit-attendance`).addEventListener(`click`,De),document.getElementById(`btn-switch-camera`)?.addEventListener(`click`,async()=>{l.cameraFacingMode=l.cameraFacingMode===`user`?`environment`:`user`,H(),(l.cameraMode===`kamera`||l.daringUseCamera)&&await U({needCamera:!0})}),document.getElementById(`btn-flip-camera`)?.addEventListener(`click`,()=>{l.cameraFlipHorizontal=!l.cameraFlipHorizontal,H()}),document.getElementById(`daring-bukti-file`)?.addEventListener(`change`,e=>{let t=e.target.files?.[0];t&&(l.daringUseCamera=!1,H(),l.cameraStream&&=(l.cameraStream.getTracks().forEach(e=>e.stop()),null),l.gpsCoords||U({needCamera:!1}),Te(t))}),document.getElementById(`daring-platform`)?.addEventListener(`change`,()=>{l.cameraMode===`daring`&&l.daringImageFile&&!l.daringUseCamera&&Te(l.daringImageFile)}),document.getElementById(`btn-daring-use-camera`)?.addEventListener(`click`,()=>{if(l.cameraMode!==`daring`)return;l.daringUseCamera=!l.daringUseCamera,l.capturedBlob=null;let e=document.getElementById(`camera-video`),t=document.getElementById(`captured-preview`),n=document.getElementById(`daring-stage-placeholder`),r=document.getElementById(`btn-daring-use-camera`);t.classList.add(`hidden`),document.getElementById(`btn-retake-photo`).classList.add(`hidden`),document.getElementById(`btn-submit-attendance`).classList.add(`hidden`),l.daringUseCamera?(n&&n.classList.add(`hidden`),e.classList.remove(`hidden`),document.getElementById(`btn-capture-photo`).classList.remove(`hidden`),r&&(r.textContent=`Kembali ke Unggah Bukti Foto`),H(),U({needCamera:!0})):(e.classList.add(`hidden`),n&&n.classList.remove(`hidden`),document.getElementById(`btn-capture-photo`).classList.add(`hidden`),r&&(r.textContent=`Atau Ambil Dari Kamera`),H(),U({needCamera:!1}))}),document.getElementById(`btn-copy-gps-coords`)?.addEventListener(`click`,()=>{let e=document.getElementById(`gps-map-coords`).textContent;navigator.clipboard?.writeText(e),S(`Koordinat ${e} disalin!`,`success`)}),document.getElementById(`wa-reminder-text`)?.addEventListener(`input`,e=>{let t=l.waReminderContext,n=document.getElementById(`btn-wa-open-chat`);t?.student&&n&&(n.href=kt(t.student,e.target.value))}),document.getElementById(`btn-wa-copy-text`)?.addEventListener(`click`,async()=>{let e=document.getElementById(`wa-reminder-text`)?.value||``;if(e)try{await navigator.clipboard?.writeText(e),S(`Pesan rincian tunggakan disalin ke clipboard!`,`success`)}catch{S(`Gagal menyalin teks. Silakan salin manual dari kotak pesan.`,`warning`)}}),document.getElementById(`btn-wa-copy-image`)?.addEventListener(`click`,async()=>{let e=l.waReminderContext;if(e?.blobPromise)try{let t=await e.blobPromise;t&&navigator.clipboard?.write&&typeof ClipboardItem<`u`?(await navigator.clipboard.write([new ClipboardItem({"image/png":t})]),S(`Gambar bukti disalin! Tinggal tempel (Paste) di chat WhatsApp.`,`success`)):(document.getElementById(`btn-wa-download-proof`)?.click(),S(`Browser tidak mendukung salin gambar langsung; bukti otomatis diunduh (.PNG).`,`info`))}catch{document.getElementById(`btn-wa-download-proof`)?.click(),S(`Gambar bukti otomatis diunduh (.PNG) untuk dilampirkan di WhatsApp.`,`info`)}}),document.getElementById(`btn-wa-share-native`)?.addEventListener(`click`,async()=>{let e=l.waReminderContext;if(!e?.blobPromise)return;let t=document.getElementById(`wa-reminder-text`)?.value||``;try{let n=await e.blobPromise,r=n?new File([n],e.fileName,{type:`image/png`}):null;r&&navigator.canShare?.({files:[r]})?await navigator.share({title:`Bukti Tunggakan Kas - ${e.student.nama_lengkap}`,text:t,files:[r]}):navigator.share&&await navigator.share({title:`Bukti Tunggakan Kas - ${e.student.nama_lengkap}`,text:t}),await A([{user_id:l.currentUser.id,judul:`Pengingat & Bukti WhatsApp Dibagikan`,pesan:`Anda membagikan bukti dan rincian tunggakan kas sebesar ${v(e.sisa)} untuk ${e.student.nama_lengkap}.`,tipe:`info`}]),await R.loadAll(),B()}catch(e){e?.name!==`AbortError`&&S(`Gunakan Unduh Bukti (.PNG) lalu klik Buka WhatsApp.`,`info`)}}),document.getElementById(`btn-wa-open-chat`)?.addEventListener(`click`,async()=>{let e=l.waReminderContext;if(e?.student&&l.currentUser)try{await A([{user_id:l.currentUser.id,judul:`Pengingat & Bukti WhatsApp Dibuka`,pesan:`Anda mengirim pengingat WhatsApp beserta rincian bukti tunggakan kas sebesar ${v(e.sisa)} kepada ${e.student.nama_lengkap}.`,tipe:`info`}]),await R.loadAll(),B()}catch{}}),document.querySelectorAll(`#modal-pay-kas .seg-btn`).forEach(e=>{e.addEventListener(`click`,()=>Be(e.getAttribute(`data-method`)))}),document.getElementById(`pay-kas-nominal`).addEventListener(`input`,e=>{qe(l.pengaturan?.qris_payload||n,e.target.value)}),document.getElementById(`btn-copy-qris-string`)?.addEventListener(`click`,async()=>{let e=l.currentDynamicQrisString||n;try{await navigator.clipboard?.writeText(e),S(`Kode QRIS Dinamis berhasil disalin!`,`success`)}catch{S(`Gagal menyalin kode QRIS.`,`warning`)}}),document.getElementById(`btn-download-qris-png`)?.addEventListener(`click`,()=>{let e=document.getElementById(`qris-qr-canvas`);if(!e)return;let t=l.pengaturan||{},n=Math.max(0,Math.round(Number(document.getElementById(`pay-kas-nominal`)?.value||0))),r=document.createElement(`canvas`);r.width=420,r.height=510;let i=r.getContext(`2d`);i.fillStyle=`#ffffff`,i.fillRect(0,0,r.width,r.height),i.strokeStyle=`#cbd5e1`,i.lineWidth=2,i.strokeRect(8,8,r.width-16,r.height-16),i.fillStyle=`#0f172a`,i.font=`bold 18px Arial, sans-serif`,i.textAlign=`center`,i.fillText(`QRIS DINAMIS PEMBAYARAN KAS`,r.width/2,42),i.fillStyle=`#163a78`,i.font=`bold 16px Arial, sans-serif`,i.fillText(t.qris_merchant_name||`Mas_hy, Fashion`,r.width/2,68),i.fillStyle=`#475569`,i.font=`13px monospace`,i.fillText(`NMID: ${t.qris_nmid||`ID1025463553806`}`,r.width/2,90),i.drawImage(e,(r.width-280)/2,108,280,280),i.fillStyle=`#0f172a`,i.font=`bold 20px monospace`,i.fillText(n>0?v(n):`Nominal Fleksibel`,r.width/2,426),i.fillStyle=`#64748b`,i.font=`12px Arial, sans-serif`,i.fillText(`Kelas ${t.nama_kelas||`R3S`} · Pindai via GoPay / DANA / OVO / Perbankan Seluler`,r.width/2,462);let a=document.createElement(`a`);a.href=r.toDataURL(`image/png`),a.download=`QRIS_Dinamis_${n>0?n:`R3S`}.png`,document.body.appendChild(a),a.click(),document.body.removeChild(a),S(`Gambar QRIS Dinamis (.PNG) diunduh!`,`success`)}),document.getElementById(`btn-copy-rekening`).addEventListener(`click`,()=>{let e=document.getElementById(`bank-number-display`).textContent;navigator.clipboard?.writeText(e),S(`Nomor rekening ${e} berhasil disalin!`,`success`)}),document.getElementById(`pay-kas-bukti`).addEventListener(`change`,e=>{let t=e.target.files[0],n=document.getElementById(`pay-kas-preview`);t?(n.src=URL.createObjectURL(t),n.classList.remove(`hidden`)):n.classList.add(`hidden`)}),document.getElementById(`form-pay-kas`).addEventListener(`submit`,Je),document.getElementById(`form-edit-absen`).addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`edit-absen-id`).value;try{await R.update(`absensi`,t,{status_kehadiran:document.getElementById(`edit-absen-status`).value,status_verifikasi:document.getElementById(`edit-absen-verif`).value,catatan:document.getElementById(`edit-absen-catatan`).value.trim(),pj_id:l.currentUser.id,pj_nama:l.currentUser.nama_lengkap,dicatat_oleh:l.currentUser.id}),await R.loadAll(),Q(`modal-edit-absen`),S(`Data kehadiran berhasil diperbarui!`,`success`),B(),V()}catch(e){S(e.message||`Gagal memperbarui absensi.`,`danger`)}});let e=localStorage.getItem(r.SESSION_USER);if(e)try{await R.loadAll();let t=l.profiles.find(t=>t.id===e);t&&fe(t)}catch{}}document.addEventListener(`DOMContentLoaded`,En);