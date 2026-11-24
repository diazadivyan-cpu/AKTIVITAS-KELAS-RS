(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`https://mtsdptkavsrpbmsxudad.supabase.co`,t=`sb_publishable_GprwADCeysx4vDZVAq-CaA_ouQcfxWs`,n=`00020101021126610014COM.GO-JEK.WWW01189360091435873754230210G5873754230303UMI51440014ID.CO.QRIS.WWW0215ID10254635538060303UMI5204569753033605802ID5915Mas_hy, Fashion6007CIREBON61054518562070703A016304BDA1`,r={SUPABASE_CFG:`r3s_supabase_cfg_v1`,REMEMBER_CREDS:`r3s_remember_creds_v1`,SESSION_USER:`r3s_session_user_id_v1`,LOCAL_DB:`r3s_local_db_v1`,THEME:`r3s_theme_v1`},i={mahasiswa:`Mahasiswa`,pj_matkul:`PJ Mata Kuliah`,ketua:`Ketua Kelas`,bendahara:`Bendahara Kelas`,admin:`Admin Utama`};function a(e){return e===`mahasiswa`||e===`pj_matkul`}function o(e){return e===`mahasiswa`||e===`pj_matkul`||e===`ketua`||e===`bendahara`}function s(e){return e===`admin`?`tag-coral`:e===`ketua`?`tag-success`:e===`bendahara`?`tag-warning`:e===`pj_matkul`?`tag-pj-matkul`:`tag-info`}var c={mode:`local`,theme:`dark`,skyPreviewHour:null,supabase:null,currentUser:null,activeTab:`dashboard`,currentWibDateKey:l(new Date),profiles:[],pengaturan:null,sesiAbsensi:[],absensi:[],pengajuanCuti:[],iuranKas:[],transaksiKas:[],laporanKendala:[],pemberitahuan:[],filters:{riwayatSearch:``,riwayatStatus:`Semua`,kasSearch:``,kasJenis:`Semua`,kasKategori:`Semua`,laporanSearch:``,laporanKategori:`Semua`,akunSearch:``,selectedDiagramStudentId:``,selectedKasDiagramStudentId:``,pdfMonth:l(new Date).slice(0,7),pdfStudentId:``,pdfBendaharaId:``,pdfKetuaId:``,pdfAdminId:``,pdfEvaluationNote:``},loginCaptchaAnswer:0,forgotCaptchaAnswer:0,verifiedForgotUser:null,cameraStream:null,cameraMode:`self`,cameraContext:null,cameraFacingMode:`user`,cameraFlipHorizontal:!1,daringUseCamera:!1,daringImageFile:null,gpsCoords:null,gpsWatchId:null,capturedBlob:null,capturedPreviewUrl:``,selectedPayMethod:`QRIS`,qrisTimerInterval:null,qrisSecondsLeft:600,currentDynamicQrisString:n,waReminderContext:null};function l(e=new Date){let t=new Intl.DateTimeFormat(`en-CA`,{timeZone:`Asia/Jakarta`,year:`numeric`,month:`2-digit`,day:`2-digit`}).formatToParts(e),n=Object.fromEntries(t.map(e=>[e.type,e.value]));return`${n.year}-${n.month}-${n.day}`}function u(e=new Date){return`${new Intl.DateTimeFormat(`id-ID`,{timeZone:`Asia/Jakarta`,weekday:`long`,day:`numeric`,month:`long`,year:`numeric`}).format(e)} | ${new Intl.DateTimeFormat(`id-ID`,{timeZone:`Asia/Jakarta`,hour:`2-digit`,minute:`2-digit`,second:`2-digit`,hour12:!1}).format(e).replace(/\./g,`:`)} WIB`}function d(e){if(!e)return`-`;let t=new Date(e);return Number.isNaN(t.getTime())?`-`:`${new Intl.DateTimeFormat(`id-ID`,{timeZone:`Asia/Jakarta`,day:`2-digit`,month:`short`,year:`numeric`}).format(t)} · ${new Intl.DateTimeFormat(`id-ID`,{timeZone:`Asia/Jakarta`,hour:`2-digit`,minute:`2-digit`,hour12:!1}).format(t).replace(/\./g,`:`)} WIB`}function f(e=new Date){return new Intl.DateTimeFormat(`id-ID`,{timeZone:`Asia/Jakarta`,day:`numeric`,month:`long`,year:`numeric`}).format(e)}function p(e=new Date){return new Intl.DateTimeFormat(`id-ID`,{timeZone:`Asia/Jakarta`,hour:`2-digit`,minute:`2-digit`,second:`2-digit`,hour12:!1}).format(e).replace(/\./g,`:`)+` WIB`}function m(e){if(!e||!/^\d{4}-\d{2}$/.test(e))return e||`-`;let[t,n]=e.split(`-`).map(Number),r=new Date(Date.UTC(t,n-1,15));return new Intl.DateTimeFormat(`id-ID`,{timeZone:`Asia/Jakarta`,month:`long`,year:`numeric`}).format(r)}function h(e){if(!e)return`-`;let t=String(e).trim(),n=t.match(/^(\d{4})-(\d{2})-(\d{2})/);if(n)return`${n[3]}/${n[2]}/${n[1]}`;let r=new Date(t);if(Number.isNaN(r.getTime()))return t;let[i,a,o]=l(r).split(`-`);return`${o}/${a}/${i}`}function g(e){return`Rp `+Number(e||0).toLocaleString(`id-ID`)}function _(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`)}function v(e){let t=e.length>=3&&e.length<=8,n=/\d/.test(e),r=/[^A-Za-z0-9]/.test(e);return{lenOk:t,digitOk:n,symbolOk:r,valid:t&&n&&r}}function y(){return crypto?.randomUUID?crypto.randomUUID():`xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g,e=>{let t=Math.random()*16|0;return(e===`x`?t:t&3|8).toString(16)})}function b(e,t=`info`){let n=document.getElementById(`toast-container`);if(!n)return;let r=document.createElement(`div`);r.className=`toast toast-${t}`,r.textContent=e,n.appendChild(r),setTimeout(()=>{r.style.opacity=`0`,r.style.transform=`translateY(-8px)`,r.style.transition=`opacity 0.2s ease, transform 0.2s ease`,setTimeout(()=>r.remove(),220)},4200)}function x(e){let t=String(e||``).toLowerCase();return[`hadir`,`disetujui`,`lunas`,`selesai`,`pemasukan`].includes(t)?`tag-success`:[`menunggu`,`menunggu verifikasi`,`izin`].includes(t)?`tag-coral`:[`sakit`].includes(t)?`tag-warning`:[`ditolak`,`alpha`,`belum absen!`,`belum lunas`,`pengeluaran`].includes(t)?`tag-danger`:`tag-info`}function S(e){return c.profiles.filter(t=>e.includes(t.role)).map(e=>e.id)}async function C(e){let t=(e||[]).filter(e=>e&&e.user_id);if(!t.length)return;let n=new Set,r=[];t.forEach(e=>{let t=`${e.user_id}::${e.judul}::${e.pesan}`;n.has(t)||(n.add(t),r.push({user_id:e.user_id,judul:e.judul,pesan:e.pesan,tipe:e.tipe||`info`,dibaca:!1}))}),r.length&&await N.insert(`pemberitahuan`,r)}function w(){try{let e=JSON.parse(localStorage.getItem(r.SUPABASE_CFG)||`null`);if(e?.url&&e?.anonKey)return e}catch{}return!e.includes(`YOUR_PROJECT_ID`)&&!t.includes(`YOUR_SUPABASE_ANON_KEY`)?{url:e,anonKey:t}:null}function T(){let e=w();e&&window.supabase?.createClient?(c.supabase=window.supabase.createClient(e.url,e.anonKey),c.mode=`supabase`):(c.supabase=null,c.mode=`local`)}var E={id:`00000000-0000-4000-8000-000000000001`,npm:`202443500001`,nama_lengkap:`Admin Utama RS`,username:`admin`,password:`qwerty4322.`,role:`admin`,no_wa:`6281200000001`,avatar_url:``},D=new Set([`ketua_r3s`,`bendahara_r3s`,`pjmatkul_r3s`,`adivya_r3s`,`siti_r3s`,`dimas_r3s`,`naufal_r3s`,`putri_r3s`]),O=new Set([`00000000-0000-4000-8000-000000000002`,`00000000-0000-4000-8000-000000000003`,`00000000-0000-4000-8000-000000000004`,`00000000-0000-4000-8000-000000000101`,`00000000-0000-4000-8000-000000000102`,`00000000-0000-4000-8000-000000000103`,`00000000-0000-4000-8000-000000000105`,`00000000-0000-4000-8000-000000000106`]),k=new Set([`10000000-0000-4000-8000-000000000001`,`10000000-0000-4000-8000-000000000002`,`10000000-0000-4000-8000-000000000003`]);function A(){return{profiles:[{...E}],pengaturan_kelas:{id:1,nama_kelas:`R3S`,semester_aktif:3,pertemuan_berjalan:0,total_pertemuan_semester:14,nama_bank:`BCA`,no_rekening:`5210987654`,atas_nama_rekening:`Bendahara Kelas R3S`,qris_nmid:`ID1025463553806`,qris_merchant_name:`Mas_hy, Fashion`,qris_payload:n,nominal_kas_default:1e4},sesi_absensi:[],absensi:[],pengajuan_cuti:[],iuran_kas:[],transaksi_kas:[],laporan_kendala:[],pemberitahuan:[]}}function j(){try{let e=localStorage.getItem(r.LOCAL_DB);if(e){let t=JSON.parse(e);if(t&&Array.isArray(t.profiles)){let e=!1;if(!localStorage.getItem(`r3s_dummy_purged_v1`)){let n=t.profiles.length;if(t.profiles=t.profiles.filter(e=>!D.has(String(e.username||``).toLowerCase())&&!O.has(e.id)),t.profiles.length!==n&&(e=!0),t.profiles.some(e=>e.role===`admin`)||(t.profiles.unshift({...E}),e=!0),Array.isArray(t.sesi_absensi)){let n=t.sesi_absensi.length;t.sesi_absensi=t.sesi_absensi.filter(e=>!k.has(e.id)),t.sesi_absensi.length!==n&&(e=!0)}if(Array.isArray(t.absensi)){let n=t.absensi.length;t.absensi=t.absensi.filter(e=>!k.has(e.sesi_id)&&!O.has(e.user_id)),t.absensi.length!==n&&(e=!0)}if(Array.isArray(t.pengajuan_cuti)){let n=t.pengajuan_cuti.length;t.pengajuan_cuti=t.pengajuan_cuti.filter(e=>!O.has(e.user_id)),t.pengajuan_cuti.length!==n&&(e=!0)}if(Array.isArray(t.iuran_kas)){let n=t.iuran_kas.length;t.iuran_kas=t.iuran_kas.filter(e=>!O.has(e.user_id)),t.iuran_kas.length!==n&&(e=!0)}if(Array.isArray(t.transaksi_kas)){let n=t.transaksi_kas.length;t.transaksi_kas=t.transaksi_kas.filter(e=>!O.has(e.terkait_user_id)&&!O.has(e.pj_id)&&!O.has(e.dicatat_oleh)),t.transaksi_kas.length!==n&&(e=!0)}if(Array.isArray(t.laporan_kendala)){let n=t.laporan_kendala.length;t.laporan_kendala=t.laporan_kendala.filter(e=>!O.has(e.user_id)),t.laporan_kendala.length!==n&&(e=!0)}if(Array.isArray(t.pemberitahuan)){let n=t.pemberitahuan.length;t.pemberitahuan=t.pemberitahuan.filter(e=>!O.has(e.user_id)),t.pemberitahuan.length!==n&&(e=!0)}t.pengaturan_kelas&&(String(t.pengaturan_kelas.atas_nama_rekening||``).includes(`Nadia Kusuma`)&&(t.pengaturan_kelas.atas_nama_rekening=`Bendahara Kelas R3S`,e=!0),(t.sesi_absensi||[]).length===0&&t.pengaturan_kelas.pertemuan_berjalan===10&&(t.pengaturan_kelas.pertemuan_berjalan=0,e=!0)),localStorage.removeItem(`r3s_dummy_v2_seeded`),localStorage.setItem(`r3s_dummy_purged_v1`,`1`)}t.profiles.forEach(t=>{t.role===`admin`&&t.nama_lengkap===`Admin Utama R3S`&&(t.nama_lengkap=`Admin Utama RS`,e=!0),t.role===`admin`&&t.username===`admin_r3s`&&t.password===`Adm!n99`&&(t.username=E.username,t.password=E.password,e=!0)}),[`sesi_absensi`,`absensi`,`iuran_kas`,`transaksi_kas`].forEach(n=>{Array.isArray(t[n])&&t[n].forEach(t=>{t.pj_nama===`Admin Utama R3S`&&(t.pj_nama=`Admin Utama RS`,e=!0)})}),e&&M(t)}return t}}catch{}let e=A();return localStorage.setItem(r.LOCAL_DB,JSON.stringify(e)),localStorage.setItem(`r3s_dummy_purged_v1`,`1`),e}function M(e){localStorage.setItem(r.LOCAL_DB,JSON.stringify(e))}var N={async loadAll(){if(c.mode===`supabase`&&c.supabase){let[e,t,r,i,a,o,s,l,u]=await Promise.all([c.supabase.from(`profiles`).select(`*`).order(`npm`,{ascending:!0}),c.supabase.from(`pengaturan_kelas`).select(`*`).eq(`id`,1).maybeSingle(),c.supabase.from(`sesi_absensi`).select(`*`).order(`created_at`,{ascending:!1}),c.supabase.from(`absensi`).select(`*`).order(`waktu_kirim`,{ascending:!1}),c.supabase.from(`pengajuan_cuti`).select(`*`).order(`created_at`,{ascending:!1}),c.supabase.from(`iuran_kas`).select(`*`).order(`created_at`,{ascending:!1}),c.supabase.from(`transaksi_kas`).select(`*`).order(`tanggal`,{ascending:!1}),c.supabase.from(`laporan_kendala`).select(`*`).order(`created_at`,{ascending:!1}),c.supabase.from(`pemberitahuan`).select(`*`).order(`created_at`,{ascending:!1})]),d=[e.error,t.error,r.error,i.error,a.error,o.error,s.error,l.error,u.error].find(Boolean);if(d)throw Error(`Gagal memuat data Supabase: ${d.message}`);c.profiles=e.data||[],c.pengaturan=t.data||{id:1,nama_kelas:`R3S`,semester_aktif:3,pertemuan_berjalan:0,total_pertemuan_semester:14,nama_bank:`BCA`,no_rekening:`5210987654`,atas_nama_rekening:`Bendahara Kelas R3S`,qris_nmid:`ID1025463553806`,qris_merchant_name:`Mas_hy, Fashion`,qris_payload:n,nominal_kas_default:1e4},c.pengaturan=Ve(c.pengaturan),c.sesiAbsensi=r.data||[],c.absensi=i.data||[],c.pengajuanCuti=a.data||[],c.iuranKas=o.data||[],c.transaksiKas=s.data||[],c.laporanKendala=l.data||[],c.pemberitahuan=u.data||[];return}let e=j();c.profiles=e.profiles||[],c.pengaturan=Ve(e.pengaturan_kelas),c.sesiAbsensi=e.sesi_absensi||[],c.absensi=e.absensi||[],c.pengajuanCuti=e.pengajuan_cuti||[],c.iuranKas=e.iuran_kas||[],c.transaksiKas=e.transaksi_kas||[],c.laporanKendala=e.laporan_kendala||[],c.pemberitahuan=e.pemberitahuan||[]},async insert(e,t){if(c.mode===`supabase`&&c.supabase){let n=Array.isArray(t)?t.map(e=>({...e})):{...t};for(let t=0;t<5;t++){let{data:t,error:r}=await c.supabase.from(e).insert(n).select();if(!r)return t;let i=r.message?.match(/Could not find the '([^']+)' column/);if(i){let e=i[1];Array.isArray(n)?n.forEach(t=>delete t[e]):delete n[e]}else throw r}}let n=j(),r=(Array.isArray(t)?t:[t]).map(e=>({id:e.id||y(),created_at:e.created_at||new Date().toISOString(),...e}));return n[e]=[...r,...n[e]||[]],M(n),r},async upsert(e,t,n=`id`){if(c.mode===`supabase`&&c.supabase){let r={...t};for(let t=0;t<5;t++){let{data:t,error:i}=await c.supabase.from(e).upsert(r,{onConflict:n}).select();if(!i)return t;let a=i.message?.match(/Could not find the '([^']+)' column/);if(a)delete r[a[1]];else throw i}}let r=j(),i=r[e]||[],a=n.split(`,`).map(e=>e.trim()),o=i.findIndex(e=>a.every(n=>e[n]===t[n])),s={id:t.id||(o>=0?i[o].id:y()),created_at:t.created_at||(o>=0?i[o].created_at:new Date().toISOString()),...t};return o>=0?i[o]={...i[o],...s}:i.unshift(s),r[e]=i,M(r),[s]},async update(e,t,n){if(c.mode===`supabase`&&c.supabase){let r={...n};for(let n=0;n<5;n++){let{data:n,error:i}=await c.supabase.from(e).update(r).eq(`id`,t).select();if(!i)return n;let a=i.message?.match(/Could not find the '([^']+)' column/);if(a)delete r[a[1]];else throw i}}let r=j();if(e===`pengaturan_kelas`)return r.pengaturan_kelas={...r.pengaturan_kelas,...n},M(r),[r.pengaturan_kelas];let i=r[e]||[],a=i.findIndex(e=>e.id===t);return a>=0?(i[a]={...i[a],...n,updated_at:new Date().toISOString()},r[e]=i,M(r),[i[a]]):[]},async remove(e,t){if(c.mode===`supabase`&&c.supabase){let{error:n}=await c.supabase.from(e).delete().eq(`id`,t);if(n)throw n;return}let n=j();n[e]=(n[e]||[]).filter(e=>e.id!==t),M(n)},async uploadFile(e,t=`umum`){if(!e)return``;if(c.mode===`supabase`&&c.supabase){let n=e.type?.includes(`png`)?`png`:`jpg`,r=`${t}/${Date.now()}_${Math.random().toString(36).slice(2,8)}.${n}`,{error:i}=await c.supabase.storage.from(`bukti_absensi`).upload(r,e,{contentType:e.type||`image/jpeg`,upsert:!1});if(i)throw Error(`Gagal unggah gambar ke Storage: ${i.message}`);let{data:a}=c.supabase.storage.from(`bukti_absensi`).getPublicUrl(r);return a?.publicUrl||``}return await P(e,720,.68)}};function P(e,t=720,n=.7){return new Promise((r,i)=>{let a=new FileReader;a.onload=()=>{let e=new Image;e.onload=()=>{let i=Math.min(1,t/Math.max(e.width,e.height)),a=Math.max(1,Math.round(e.width*i)),o=Math.max(1,Math.round(e.height*i)),s=document.createElement(`canvas`);s.width=a,s.height=o,s.getContext(`2d`).drawImage(e,0,0,a,o),r(s.toDataURL(`image/jpeg`,n))},e.onerror=()=>r(a.result),e.src=a.result},a.onerror=i,a.readAsDataURL(e)})}function F(){let e=document.getElementById(`stars-layer`);if(!e)return;e.innerHTML=``;let t=[``,``,``,`tint-cyan`,`tint-violet`];for(let n=0;n<64;n++){let r=document.createElement(`span`),i=t[n%t.length];r.className=i?`star-particle ${i}`:`star-particle`;let a=(1.2+Math.random()*2.4).toFixed(1);r.style.width=`${a}px`,r.style.height=`${a}px`,r.style.left=`${(Math.random()*99).toFixed(2)}%`,r.style.top=`${(Math.random()*96).toFixed(2)}%`,r.style.animationDuration=`${(2.4+Math.random()*4.2).toFixed(1)}s`,r.style.animationDelay=`${(-Math.random()*6).toFixed(2)}s`,e.appendChild(r)}}function ee(e=new Date){let t=document.getElementById(`sky-dome`),n=document.getElementById(`space-backdrop`),r=document.getElementById(`celestial-sun`),i=document.getElementById(`celestial-moon`),a=document.getElementById(`sky-stars-group`),o=document.getElementById(`sky-clouds-group`),s=document.querySelectorAll(`[data-celestial-phase-label]`),l=document.querySelectorAll(`[data-celestial-clock-badge]`),u=document.getElementById(`sky-horizon-glow`);if(!t||!r||!i)return;let d=12,f=``;if(c.skyPreviewHour!==null&&Number.isFinite(Number(c.skyPreviewHour)))d=Number(c.skyPreviewHour),f=`Simulasi ${String(Math.floor(d)).padStart(2,`0`)}:00 WIB`;else{let t=new Intl.DateTimeFormat(`en-GB`,{timeZone:`Asia/Jakarta`,hour:`2-digit`,minute:`2-digit`,second:`2-digit`,hour12:!1}).formatToParts(e),n=Object.fromEntries(t.map(e=>[e.type,e.value])),r=Number(n.hour)%24,i=Number(n.minute),a=Number(n.second);d=r+i/60+a/3600,f=`${String(r).padStart(2,`0`)}:${String(i).padStart(2,`0`)}:${String(a).padStart(2,`0`)} WIB`}l.forEach(e=>{e.textContent=f});let p=d>=6&&d<18,m=p?(d-6)/12:(d>=18?d-18:d+6)/12,h=Math.max(0,Math.min(1,m)),g=70+1300*h,_=590-2048*h*(1-h);t.classList.remove(`sky-dawn`,`sky-day`,`sky-sunset`,`sky-night`),n&&n.classList.remove(`sky-dawn-backdrop`,`sky-day-backdrop`,`sky-sunset-backdrop`,`sky-night-backdrop`);let v=``;p?(r.style.display=`block`,i.style.display=`none`,r.setAttribute(`transform`,`translate(${g.toFixed(1)}, ${_.toFixed(1)})`),o&&(o.style.opacity=`1`),d<8.25?(t.classList.add(`sky-dawn`),n&&n.classList.add(`sky-dawn-backdrop`),a&&(a.style.opacity=`0.45`),u&&(u.style.background=`radial-gradient(circle at 12% 65%, rgba(251, 146, 60, 0.55), transparent 52%)`,u.style.opacity=`1`),v=`Pagi · Matahari Terbit di Timur`):d<15.5?(t.classList.add(`sky-day`),n&&n.classList.add(`sky-day-backdrop`),a&&(a.style.opacity=`0`),u&&(u.style.background=`radial-gradient(circle at 50% 8%, rgba(254, 240, 138, 0.28), transparent 55%)`,u.style.opacity=`1`),v=d>=11&&d<=13.5?`Tengah Hari · Matahari di Tengah Langit`:`Siang Cerah · Matahari Melintas Langit`):(t.classList.add(`sky-sunset`),n&&n.classList.add(`sky-sunset-backdrop`),a&&(a.style.opacity=`0.5`),u&&(u.style.background=`radial-gradient(circle at 88% 65%, rgba(249, 115, 22, 0.58), transparent 54%)`,u.style.opacity=`1`),v=`Sore · Matahari Terbenam di Barat`)):(r.style.display=`none`,i.style.display=`block`,i.setAttribute(`transform`,`translate(${g.toFixed(1)}, ${_.toFixed(1)})`),t.classList.add(`sky-night`),n&&n.classList.add(`sky-night-backdrop`),a&&(a.style.opacity=`1`),o&&(o.style.opacity=`0.15`),u&&(u.style.background=`radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.16), transparent 60%)`,u.style.opacity=`1`),v=`Malam Galaksi · Bulan & Bintang Bersinar`),s.forEach(e=>{e.textContent=v})}function te(){let e=()=>{let e=new Date,t=u(e),n=document.getElementById(`auth-clock-display`),r=document.getElementById(`global-clock-wib`),i=document.getElementById(`camera-time-status`),a=document.getElementById(`pdf-realtime-clock`);n&&(n.textContent=t),r&&(r.textContent=t),i&&(i.textContent=t),a&&(a.textContent=t),ee(e);let o=l(e);o!==c.currentWibDateKey&&(c.currentWibDateKey=o,c.currentUser&&c.activeTab===`dashboard`&&R()),document.querySelectorAll(`[data-deadline-iso]`).forEach(t=>{let n=new Date(t.getAttribute(`data-deadline-iso`)).getTime()-e.getTime();if(n<=0)t.textContent=`Sesi Ditutup`,t.classList.add(`text-danger`);else{let e=Math.floor(n/36e5),r=Math.floor(n%36e5/6e4),i=Math.floor(n%6e4/1e3);t.textContent=`${String(e).padStart(2,`0`)}:${String(r).padStart(2,`0`)}:${String(i).padStart(2,`0`)}`}})};e(),setInterval(e,1e3)}function I(e=`login`){let t=2+Math.floor(Math.random()*9),n=1+Math.floor(Math.random()*9);if(e===`login`){c.loginCaptchaAnswer=t+n;let e=document.getElementById(`login-captcha-question`),r=document.getElementById(`login-captcha-answer`);e&&(e.textContent=`${t} + ${n} = ?`),r&&(r.value=``)}else{c.forgotCaptchaAnswer=t+n;let e=document.getElementById(`forgot-captcha-question`),r=document.getElementById(`forgot-captcha-answer`);e&&(e.textContent=`${t} + ${n} = ?`),r&&(r.value=``)}}function ne(){try{let e=JSON.parse(localStorage.getItem(r.REMEMBER_CREDS)||`null`);e?.username&&(document.getElementById(`login-username`).value=e.username,document.getElementById(`login-password`).value=e.password||``,document.getElementById(`login-remember`).checked=!0)}catch{}}async function re(e){e.preventDefault();let t=document.getElementById(`login-username`).value.trim(),n=document.getElementById(`login-password`).value,i=Number(document.getElementById(`login-captcha-answer`).value),a=document.getElementById(`login-remember`).checked;if(i!==c.loginCaptchaAnswer)b(`Jawaban Captcha tidak sesuai. Silakan hitung ulang.`,`danger`),I(`login`);else try{await N.loadAll();let e=c.profiles.find(e=>e.username.toLowerCase()===t.toLowerCase()&&e.password===n);if(!e){b(`Nama pengguna atau kata sandi salah. Pastikan akun telah dibuat oleh Admin.`,`danger`),I(`login`);return}a?localStorage.setItem(r.REMEMBER_CREDS,JSON.stringify({username:t,password:n})):localStorage.removeItem(r.REMEMBER_CREDS),localStorage.setItem(r.SESSION_USER,e.id),ce(e),b(`Selamat datang kembali, ${e.nama_lengkap}!`,`success`)}catch(e){b(e.message||`Gagal menghubungi basis data.`,`danger`)}}async function ie(){let e=document.getElementById(`forgot-username`).value.trim();if(!e)b(`Masukkan nama pengguna Anda terlebih dahulu.`,`warning`);else try{await N.loadAll();let t=c.profiles.find(t=>t.username.toLowerCase()===e.toLowerCase());if(!t){c.verifiedForgotUser=null,document.getElementById(`forgot-verified-card`).classList.add(`hidden`),document.getElementById(`forgot-step-2`).classList.add(`hidden`),b(`Nama pengguna tidak ditemukan di basis data kelas R3S.`,`danger`);return}c.verifiedForgotUser=t,document.getElementById(`forgot-verified-name`).textContent=t.nama_lengkap,document.getElementById(`forgot-verified-username`).textContent=`@${t.username} · ${t.npm}`,document.getElementById(`forgot-verified-card`).classList.remove(`hidden`),document.getElementById(`forgot-step-2`).classList.remove(`hidden`),I(`forgot`),b(`Nama pengguna terverifikasi! Silakan buat kata sandi baru.`,`success`)}catch(e){b(e.message||`Gagal memverifikasi nama pengguna.`,`danger`)}}function ae(e,t){let n=v(e),r=document.querySelector(t);return r&&(r.querySelector(`[data-rule="length"]`)?.classList.toggle(`valid`,n.lenOk),r.querySelector(`[data-rule="digit"]`)?.classList.toggle(`valid`,n.digitOk),r.querySelector(`[data-rule="symbol"]`)?.classList.toggle(`valid`,n.symbolOk)),n}async function oe(e){if(e.preventDefault(),!c.verifiedForgotUser){b(`Verifikasi nama pengguna terlebih dahulu.`,`warning`);return}let t=document.getElementById(`forgot-new-password`).value,n=document.getElementById(`forgot-confirm-password`).value,r=Number(document.getElementById(`forgot-captcha-answer`).value);if(!v(t).valid)b(`Kata sandi wajib maksimal 8 karakter, minimal 1 angka, dan minimal 1 simbol.`,`danger`);else if(t!==n)b(`Konfirmasi kata sandi baru tidak cocok.`,`danger`);else if(r!==c.forgotCaptchaAnswer)b(`Jawaban Captcha salah.`,`danger`),I(`forgot`);else try{let e=c.verifiedForgotUser;await N.update(`profiles`,e.id,{password:t});let n=[{user_id:e.id,judul:`Kata Sandi Akun Diperbarui`,pesan:`Kata sandi akun Anda baru saja diperbarui melalui fitur Lupa Kata Sandi Mandiri.`,tipe:`success`}];a(e.role)&&S([`admin`]).forEach(t=>{n.push({user_id:t,judul:`Mahasiswa Mengubah Kata Sandi`,pesan:`Mahasiswa ${e.nama_lengkap} (${e.npm} · @${e.username}) telah mengatur ulang kata sandi melalui Lupa Kata Sandi.`,tipe:`warning`})}),await C(n),await N.loadAll(),b(`Kata sandi baru berhasil disimpan! Silakan masuk.`,`success`),document.getElementById(`forgot-form`).reset(),document.getElementById(`forgot-verified-card`).classList.add(`hidden`),document.getElementById(`forgot-step-2`).classList.add(`hidden`),c.verifiedForgotUser=null,se(`login`)}catch(e){b(e.message||`Gagal memperbarui password.`,`danger`)}}function se(e){let t=document.getElementById(`login-form`),n=document.getElementById(`forgot-form`);e===`forgot`?(t.classList.add(`hidden`),n.classList.remove(`hidden`),I(`forgot`)):(n.classList.add(`hidden`),t.classList.remove(`hidden`),I(`login`))}function ce(e){c.currentUser=e,c.activeTab=`dashboard`,document.getElementById(`auth-screen`).classList.add(`hidden`),document.getElementById(`app-shell`).classList.remove(`hidden`),de(),L(),R()}function le(){localStorage.removeItem(r.SESSION_USER),c.currentUser=null,document.getElementById(`app-shell`).classList.add(`hidden`),document.getElementById(`auth-screen`).classList.remove(`hidden`),I(`login`),ne()}function ue(e){let t=pe().filter(e=>!e.dibaca).length,n=c.absensi.filter(e=>e.status_verifikasi===`Menunggu`).length,r=c.iuranKas.filter(e=>e.status===`Menunggu Verifikasi`).length,i=c.pengajuanCuti.filter(e=>e.status===`Menunggu`).length,o=c.laporanKendala.filter(e=>e.status===`Menunggu`).length,s=[{section:`Umum`,id:`dashboard`,label:`Dashboard`}];return a(e)?s.push({section:`Fitur Mahasiswa`,id:`absensi`,label:`Absensi Waktu Nyata`},{section:`Fitur Mahasiswa`,id:`cuti`,label:`Pengajuan Cuti`},{section:`Fitur Mahasiswa`,id:`kas_mahasiswa`,label:`Pembayaran Kas`},{section:`Layanan`,id:`pusat_info`,label:`Pusat Informasi`,count:t},{section:`Akun`,id:`profil`,label:`Profil Saya`}):e===`ketua`?s.push({section:`Fitur Mahasiswa`,id:`absensi`,label:`Absensi Waktu Nyata`},{section:`Fitur Mahasiswa`,id:`cuti`,label:`Pengajuan Cuti`},{section:`Fitur Mahasiswa`,id:`kas_mahasiswa`,label:`Pembayaran Kas`},{section:`Kepengurusan Absensi (Ketua)`,id:`sesi_absen`,label:`Absensi`},{section:`Kepengurusan Absensi (Ketua)`,id:`verifikasi_absen`,label:`Verifikasi Kehadiran`,count:n},{section:`Kepengurusan Absensi (Ketua)`,id:`manual_absen`,label:`Absensi Manual`},{section:`Kepengurusan Absensi (Ketua)`,id:`riwayat_monitoring`,label:`Riwayat & Cuti`,count:i},{section:`Laporan & Ekspor`,id:`monitoring_excel`,label:`Matriks, Rekap & Excel`},{section:`Laporan & Ekspor`,id:`laporan_pdf`,label:`Laporan PDF Bulanan`},{section:`Layanan`,id:`pusat_info`,label:`Pusat Informasi`,count:t},{section:`Akun`,id:`profil`,label:`Profil Saya`}):e===`bendahara`?s.push({section:`Fitur Mahasiswa`,id:`absensi`,label:`Absensi Waktu Nyata`},{section:`Fitur Mahasiswa`,id:`cuti`,label:`Pengajuan Cuti`},{section:`Fitur Mahasiswa`,id:`kas_mahasiswa`,label:`Pembayaran Kas`},{section:`Keuangan Kelas (Bendahara)`,id:`saluran_tagihan`,label:`Saluran Pembayaran & Tagihan Kas`},{section:`Keuangan Kelas (Bendahara)`,id:`daftar_pembayaran`,label:`Verifikasi & Pengingat WA`,count:r},{section:`Keuangan Kelas (Bendahara)`,id:`buku_kas`,label:`Catatan Kas Transparan`},{section:`Monitoring & Rekap`,id:`monitoring_excel`,label:`Matriks, Rekap & Excel`},{section:`Monitoring & Rekap`,id:`laporan_pdf`,label:`Laporan PDF Bulanan`},{section:`Layanan`,id:`pusat_info`,label:`Pusat Informasi`,count:t},{section:`Akun`,id:`profil`,label:`Profil Saya`}):e===`admin`&&s.push({section:`Monitoring & Ekspor`,id:`monitoring_excel`,label:`Matriks, Diagram & Excel`},{section:`Monitoring & Ekspor`,id:`laporan_pdf`,label:`Laporan PDF Bulanan`},{section:`Monitoring & Ekspor`,id:`monitoring_laporan`,label:`Laporan Masuk`,count:o},{section:`Manajemen Absensi`,id:`sesi_absen`,label:`Absensi`},{section:`Manajemen Absensi`,id:`verifikasi_absen`,label:`Verifikasi Kehadiran`,count:n},{section:`Manajemen Absensi`,id:`manual_absen`,label:`Absensi Manual`},{section:`Manajemen Absensi`,id:`riwayat_monitoring`,label:`Riwayat & Cuti`,count:i},{section:`Manajemen Kas`,id:`saluran_tagihan`,label:`Saluran Pembayaran & Tagihan Kas`},{section:`Manajemen Kas`,id:`daftar_pembayaran`,label:`Verifikasi & Pengingat WA`,count:r},{section:`Manajemen Kas`,id:`buku_kas`,label:`Catatan Kas Transparan`},{section:`Sistem`,id:`kelola_akun`,label:`Kelola Akun & Rekening`},{section:`Sistem`,id:`pusat_info`,label:`Pusat Informasi`,count:t},{section:`Sistem`,id:`profil`,label:`Profil Saya`}),s}function de(){let e=c.currentUser;if(!e)return;document.getElementById(`sidebar-role-label`).textContent=i[e.role]||e.role,document.getElementById(`topbar-user-name`).textContent=e.nama_lengkap,document.getElementById(`topbar-user-meta`).textContent=`${e.npm} · ${i[e.role]}`;let t=document.getElementById(`topbar-avatar`);e.avatar_url?t.innerHTML=`<img src="${_(e.avatar_url)}" alt="${_(e.nama_lengkap)}" />`:t.textContent=(e.nama_lengkap||`R`)[0].toUpperCase();let n=pe().filter(e=>!e.dibaca).length,r=document.getElementById(`topbar-notif-count`);n>0?(r.textContent=String(n),r.classList.remove(`hidden`)):r.classList.add(`hidden`)}function L(){let e=document.getElementById(`sidebar-nav`);if(!e||!c.currentUser)return;let t=ue(c.currentUser.role),n=``,r=``;for(let e of t){e.section!==n&&(r+=`<div class="nav-section-title">${_(e.section)}</div>`,n=e.section);let t=c.activeTab===e.id?`active`:``,i=e.count>0?`<span class="nav-count tabular-nums">${e.count}</span>`:``;r+=`
      <button type="button" class="nav-item ${t}" data-tab="${e.id}">
        <span class="nav-item-left"><span class="nav-item-label">${_(e.label)}</span></span>
        ${i}
      </button>
    `}e.innerHTML=r,e.querySelectorAll(`.nav-item`).forEach(e=>{e.addEventListener(`click`,()=>{c.activeTab=e.getAttribute(`data-tab`),fe(),L(),R()})})}function fe(){document.getElementById(`app-sidebar`)?.classList.remove(`open`),document.getElementById(`sidebar-overlay`)?.classList.add(`hidden`)}function pe(){return c.currentUser?c.pemberitahuan.filter(e=>!e.user_id||e.user_id===c.currentUser.id).sort((e,t)=>new Date(t.created_at||0)-new Date(e.created_at||0)):[]}function R(){let e=document.getElementById(`main-content`);if(!e||!c.currentUser)return;let t=c.profiles.find(e=>e.id===c.currentUser.id);switch(t&&(c.currentUser=t),new Set(ue(c.currentUser.role).map(e=>e.id)).has(c.activeTab)||(c.activeTab=`dashboard`,L()),de(),c.activeTab){case`dashboard`:e.innerHTML=he(),ge();break;case`absensi`:e.innerHTML=je(),Me();break;case`cuti`:e.innerHTML=Ge(),Ke();break;case`kas_mahasiswa`:e.innerHTML=Ne(),Pe();break;case`pusat_info`:e.innerHTML=qe(),Je();break;case`profil`:e.innerHTML=Ye(),Xe();break;case`sesi_absen`:e.innerHTML=nt(),rt();break;case`verifikasi_absen`:e.innerHTML=it(),at();break;case`manual_absen`:e.innerHTML=ot(),st();break;case`riwayat_monitoring`:e.innerHTML=ct(),lt();break;case`saluran_tagihan`:e.innerHTML=ut(),dt();break;case`daftar_pembayaran`:e.innerHTML=ft(),pt();break;case`buku_kas`:e.innerHTML=yt(),bt();break;case`monitoring_excel`:e.innerHTML=Et(),Dt();break;case`laporan_pdf`:e.innerHTML=It(),Xt();break;case`monitoring_laporan`:e.innerHTML=Qt(),$t();break;case`kelola_akun`:e.innerHTML=en(),tn();break;default:e.innerHTML=he(),ge()}}function me(){let e=c.currentWibDateKey,t=c.currentUser,n=t?.role||`mahasiswa`,r=[],i=Object.fromEntries(c.profiles.map(e=>[e.id,e])),o=Object.fromEntries(c.sesiAbsensi.map(e=>[e.id,e]));return c.sesiAbsensi.forEach(t=>{let a=t.created_at||(t.tanggal?`${t.tanggal}T08:00:00Z`:``);if(!a||l(new Date(a))!==e&&t.tanggal!==e)return;let o=t.dibuka_oleh||t.pj_id,s=i[o]?.role,c=i[o]?.nama_lengkap||t.pj_nama||`Pengurus`;(n===`admin`||n===`ketua`&&s!==`admin`)&&r.push({ts:a,title:`Absensi · ${t.mata_kuliah}`,meta:`Pertemuan ${t.pertemuan_ke} (${t.mode_kuliah||`Luring`}) · PJ: ${c}`,tagClass:`tag-info`})}),c.absensi.forEach(s=>{let c=s.waktu_kirim||s.created_at;if(!c||l(new Date(c))!==e)return;let u=i[s.user_id]?.nama_lengkap||`Mahasiswa`,d=o[s.sesi_id]?.mata_kuliah||`Perkuliahan`,f=s.dicatat_oleh||s.pj_id,p=i[f]?.role;if(a(n)||n===`bendahara`){if(s.user_id!==t.id||s.is_manual)return}else if(n===`ketua`&&p===`admin`)return;r.push({ts:c,title:`Absensi ${d} · ${u}`,meta:`${s.status_kehadiran} · ${s.status_verifikasi}`,tagClass:x(s.status_verifikasi)})}),c.pengajuanCuti.forEach(o=>{let s=o.waktu_pengajuan||o.created_at;if(!s||l(new Date(s))!==e)return;let c=i[o.user_id]?.nama_lengkap||`Mahasiswa`,u=i[o.ditinjau_oleh]?.role;if(a(n)||n===`bendahara`){if(o.user_id!==t.id)return}else if(n===`ketua`&&u===`admin`&&o.status!==`Menunggu`)return;r.push({ts:s,title:`Pengajuan Cuti · ${c}`,meta:`${h(o.tanggal_mulai)} s.d. ${h(o.tanggal_selesai)} · ${o.status}`,tagClass:x(o.status)})}),c.iuranKas.forEach(o=>{let s=o.tanggal_bayar||o.created_at;if(!s||l(new Date(s))!==e||o.status===`Belum Lunas`)return;let c=i[o.user_id]?.nama_lengkap||`Anggota`,u=i[o.verified_by||o.pj_id]?.role;if(a(n)||n===`ketua`){if(o.user_id!==t.id||o.metode_bayar===`Tunai / Catatan Kas`)return}else if(n===`bendahara`&&u===`admin`&&o.user_id!==t.id)return;r.push({ts:s,title:`Pembayaran Kas ${o.periode} · ${c}`,meta:`${g(o.nominal_dibayar)} · ${o.status}`,tagClass:x(o.status)})}),(n===`admin`||n===`bendahara`)&&c.transaksiKas.forEach(t=>{let a=t.created_at||`${t.tanggal}T08:00:00Z`;if(t.tanggal!==e&&l(new Date(a))!==e)return;let o=t.dicatat_oleh||t.pj_id,s=i[o]?.role;(n!==`bendahara`||s!==`admin`)&&r.push({ts:a,title:`${t.jenis}: ${t.kategori}`,meta:`${t.keterangan} · ${g(t.nominal)}`,tagClass:x(t.jenis)})}),r.sort((e,t)=>new Date(t.ts)-new Date(e.ts)).slice(0,8)}function he(){let e=c.currentUser,t=c.pengaturan||{},n=Number(t.pertemuan_berjalan??0),r=Math.max(1,Number(t.total_pertemuan_semester||14)),o=Number(t.semester_aktif||3),s=Math.min(100,Math.round(n/r*100)),l=2*Math.PI*50,u=l-s/100*l,f=c.iuranKas.filter(t=>t.user_id===e.id&&t.status!==`Lunas`),p=f.reduce((e,t)=>e+Math.max(0,t.nominal_tagihan-t.nominal_dibayar),0),m=c.iuranKas.filter(e=>e.status!==`Lunas`),h=m.reduce((e,t)=>e+Math.max(0,t.nominal_tagihan-t.nominal_dibayar),0),v=c.transaksiKas.filter(e=>e.jenis===`Pemasukan`).reduce((e,t)=>e+Number(t.nominal||0),0),y=c.transaksiKas.filter(e=>e.jenis===`Pengeluaran`).reduce((e,t)=>e+Number(t.nominal||0),0),b=v-y,x=Math.max(1,v,y,b),S=a(e.role)?c.absensi.filter(t=>t.user_id===e.id):c.absensi,C=S.filter(e=>e.status_kehadiran===`Hadir`).length,w=S.filter(e=>e.status_kehadiran===`Izin`).length,T=S.filter(e=>e.status_kehadiran===`Sakit`).length,E=S.filter(e=>e.status_kehadiran===`Alpha`||e.status_kehadiran===`Belum Absen!`).length,D=Math.max(1,C+w+T+E),O=[{label:`Hadir`,count:C,color:`#22c55e`},{label:`Izin`,count:w,color:`#00d4ff`},{label:`Sakit`,count:T,color:`#ff7b00`},{label:`Alpha / Belum`,count:E,color:`#ef4444`}],k=2*Math.PI*52,A=0,j=C+w+T+E===0?`<circle cx="74" cy="74" r="52" fill="none" stroke="var(--track-ring)" stroke-width="18"></circle>`:O.map(e=>{let t=e.count/D*k,n=`<circle cx="74" cy="74" r="52" fill="none" stroke="${e.color}" stroke-width="18" stroke-dasharray="${t} ${k-t}" stroke-dashoffset="${-A}" transform="rotate(-90 74 74)"></circle>`;return A+=t,n}).join(``),M=me(),N=c.sesiAbsensi.filter(e=>e.is_active&&new Date(e.batas_waktu).getTime()>Date.now()),P=N.length,F=N.map(e=>`${e.mata_kuliah||`Mata Kuliah`}${e.pertemuan_ke?` (Pert. ${e.pertemuan_ke})`:``}`),ee=e.role===`pj_matkul`?Array.from(new Set(c.sesiAbsensi.filter(t=>t.pj_matkul_id===e.id||t.pj_matkul_nama===e.nama_lengkap||t.pj_id===e.id||t.pj_nama===e.nama_lengkap).map(e=>e.mata_kuliah).filter(Boolean))):[];return`
    <div class="page-header">
      <div>
        <span class="meta-line">Aktivitas Kelas RS · Pusat Absensi &amp; Kas Kelas ${_(t.nama_kelas||`R3S`)}</span>
        <h2>
          Dashboard ${_(i[e.role]||e.role)}
          ${e.role===`pj_matkul`?`<span class="status-tag tag-pj-matkul" style="margin-left:8px;vertical-align:middle;">Penanda PJ Mata Kuliah</span>`:``}
        </h2>
        ${e.role===`pj_matkul`?`<div class="meta-line" style="margin-top:4px;color:var(--pj-matkul-text);">
                Anda ditandai sebagai <strong>Penanggung Jawab Mata Kuliah</strong>${ee.length?` (${_(ee.join(`, `))})`:``}.
              </div>`:``}
      </div>
      <span class="meta-line tabular-nums">Pembaruan catatan harian WIB: ${_(c.currentWibDateKey)}</span>
    </div>

    <div class="grid-kpi">
      <div class="card glass-panel">
        <span class="meta-line">Pertemuan Berjalan</span>
        <div class="kpi-value">${n}/${r}</div>
        <div class="kpi-sub">Progres Semester ${o} (${s}%)</div>
      </div>

      <div class="card glass-panel">
        <span class="meta-line">${a(e.role)?`Sisa Tunggakan Kas Anda`:`Total Piutang Kas Kelas`}</span>
        <div class="kpi-value">${g(a(e.role)?p:h)}</div>
        <div class="kpi-sub tabular-nums">${a(e.role)?`${f.length} periode belum lunas`:`${m.length} tagihan belum lunas`}</div>
      </div>

      <div class="card glass-panel">
        <span class="meta-line">Saldo Kas Umum Kelas</span>
        <div class="kpi-value text-cyan">${g(b)}</div>
        <div class="kpi-sub">Transparansi pemasukan &amp; pengeluaran</div>
      </div>

      <div class="card glass-panel">
        <span class="meta-line">Sesi Absensi Aktif</span>
        <div class="kpi-value">${P} Mata Kuliah</div>
        <div class="kpi-sub" style="color:var(--accent-cyan);font-weight:600;margin-top:6px;">
          ${F.length>0?`Mata Kuliah: ${_(F.join(`, `))}`:`Belum ada mata kuliah yang sedang berlangsung`}
        </div>
        <div class="kpi-sub" style="margin-top:4px;">Total anggota terdaftar: ${c.profiles.filter(e=>a(e.role)).length} mahasiswa</div>
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
              stroke-dasharray="${l}"
              stroke-dashoffset="${u}"
              transform="rotate(-90 66 66)"
            ></circle>
            <text x="66" y="60" text-anchor="middle" fill="var(--text-muted)" font-size="11" font-family="DM Sans">Semester</text>
            <text x="66" y="84" text-anchor="middle" fill="var(--text-primary)" font-size="26" font-weight="700" font-family="JetBrains Mono">${o}</text>
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
              <strong class="tabular-nums text-warning">${s}%</strong>
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
          <span class="status-tag tag-info tabular-nums">${C+w+T+E} Catatan</span>
        </div>
        <div class="ring-widget-wrap">
          <svg class="donut-svg" viewBox="0 0 148 148" aria-label="Diagram persentase kehadiran">
            ${j}
            <text x="74" y="70" text-anchor="middle" fill="var(--text-muted)" font-size="11" font-family="DM Sans">Hadir</text>
            <text x="74" y="90" text-anchor="middle" fill="var(--text-primary)" font-size="20" font-weight="700" font-family="JetBrains Mono">
              ${C+w+T+E===0?`0%`:`${Math.round(C/D*100)}%`}
            </text>
          </svg>
          <div class="legend-list">
            ${O.map(e=>`
              <div class="legend-row">
                <span class="legend-label">
                  <span class="legend-swatch" style="background:${e.color}"></span>
                  ${e.label}
                </span>
                <strong class="tabular-nums">${e.count} (${C+w+T+E===0?0:Math.round(e.count/D*100)}%)</strong>
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
          <strong class="tabular-nums text-cyan">${g(b)}</strong>
        </div>
        <div class="cash-bars">
          <div class="cash-bar-item">
            <div class="cash-bar-top">
              <span>Total Pemasukan Kas</span>
              <strong class="tabular-nums text-success">${g(v)}</strong>
            </div>
            <div class="cash-bar-track">
              <div class="cash-bar-fill" style="width:${Math.round(v/x*100)}%; background:#22c55e;"></div>
            </div>
          </div>

          <div class="cash-bar-item">
            <div class="cash-bar-top">
              <span>Total Pengeluaran Kas</span>
              <strong class="tabular-nums text-danger">${g(y)}</strong>
            </div>
            <div class="cash-bar-track">
              <div class="cash-bar-fill" style="width:${Math.round(y/x*100)}%; background:#ef4444;"></div>
            </div>
          </div>

          <div class="cash-bar-item">
            <div class="cash-bar-top">
              <span>Saldo Bersih Tersedia</span>
              <strong class="tabular-nums text-cyan">${g(b)}</strong>
            </div>
            <div class="cash-bar-track">
              <div class="cash-bar-fill" style="width:${Math.max(0,Math.round(b/x*100))}%; background:linear-gradient(90deg,#00d4ff,#0077ff);"></div>
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
          <span class="meta-line tabular-nums">${M.length} aktivitas</span>
        </div>
        <div class="activity-list activity-scroll-5">
          ${M.length===0?`<p class="meta-line">Belum ada aktivitas tercatat hari ini (WIB).</p>`:M.map(e=>`
              <div class="activity-item">
                <div>
                  <div class="activity-title">${_(e.title)}</div>
                  <div class="meta-line">${_(e.meta)}</div>
                </div>
                <div class="activity-time">${_(d(e.ts).split(`·`)[1]||``)}</div>
              </div>
            `).join(``)}
        </div>
      </div>
    </div>

    ${e.role===`admin`||e.role===`ketua`?xt():``}
    ${e.role===`admin`||e.role===`bendahara`?St():``}
  `}function ge(){document.querySelectorAll(`.btn-dash-nav`).forEach(e=>{e.addEventListener(`click`,()=>{c.activeTab=e.getAttribute(`data-tab`),L(),R()})}),Ct()}function z(){let e=document.getElementById(`camera-video`),t=document.getElementById(`camera-orientation-label`),n=document.getElementById(`camera-orientation-controls`),r=document.getElementById(`btn-flip-camera`),i=document.getElementById(`btn-switch-camera`),a=c.cameraMode!==`daring`||c.daringUseCamera;n&&n.classList.toggle(`hidden`,!a),e&&e.classList.toggle(`cam-flipped`,!!c.cameraFlipHorizontal);let o=c.cameraFacingMode===`environment`?`Belakang`:`Depan`,s=c.cameraFlipHorizontal?`Dibalik Horizontal`:`Normal (Tanpa Pencerminan)`;t&&(t.textContent=`Kamera ${o} · ${s}`),r&&(r.textContent=c.cameraFlipHorizontal?`Kembalikan Normal`:`Balik Horizontal (Jika Terbalik)`),i&&(i.textContent=c.cameraFacingMode===`environment`?`Pakai Kamera Depan`:`Ganti Kamera (Depan/Belakang)`)}function _e(e,t){c.cameraMode=e,c.cameraContext=t,c.cameraFacingMode=`user`,c.cameraFlipHorizontal=!1,c.daringUseCamera=!1,c.daringImageFile=null,c.gpsCoords=null,c.capturedBlob=null,c.capturedPreviewUrl=``;let n=document.getElementById(`modal-camera`),r=document.getElementById(`modal-camera-title`),i=document.getElementById(`modal-camera-subtitle`),a=document.getElementById(`camera-video`),o=document.getElementById(`captured-preview`),s=document.getElementById(`daring-stage-placeholder`),l=document.getElementById(`camera-permission-warning`),u=document.getElementById(`camera-permission-warning-desc`),d=document.getElementById(`camera-gps-status`),f=e===`daring`;r.textContent=e===`manual_pj`?`Bukti Kamera Penanggung Jawab (Anti-Kecurangan)`:f?`Absen Daring Waktu Nyata · ${t.mata_kuliah}`:`Absensi Langsung · ${t.mata_kuliah}`,i.textContent=e===`manual_pj`?`Mengambil foto wajah Penanggung Jawab (${c.currentUser.nama_lengkap}) + GPS untuk absen manual ${t.studentName}.`:f?`Kirim bukti foto saat sedang daring dan pastikan lokasi GPS tetap menyala · Dosen: ${t.dosen} · Pertemuan ke-${t.pertemuan_ke}`:`Orientasi Kamera Normal (Tanpa Pencerminan) · Dosen: ${t.dosen} · Pertemuan ke-${t.pertemuan_ke}`;let p=document.getElementById(`camera-daring-panel`),m=document.getElementById(`daring-bukti-file`),h=document.getElementById(`btn-daring-use-camera`);if(p){p.classList.toggle(`hidden`,!f);let e=document.getElementById(`daring-catatan`);e&&(e.value=``),m&&(m.value=``),h&&(h.textContent=`Atau Ambil Dari Kamera`)}a.classList.toggle(`hidden`,f),o.classList.add(`hidden`),s&&s.classList.toggle(`hidden`,!f),l.classList.add(`hidden`),u&&(u.innerHTML=f?`Sistem mendeteksi akses lokasi GPS ditolak atau belum aktif. Saat absen daring, <strong>lokasi GPS wajib tetap menyala</strong>. Status absensi otomatis dicatat <strong>Belum Absen!</strong>.`:`Sistem mendeteksi akses kamera atau lokasi tidak diizinkan. Status absensi akan otomatis tercatat sebagai <strong>Belum Absen!</strong>.`),document.getElementById(`btn-capture-photo`).classList.toggle(`hidden`,f),document.getElementById(`btn-retake-photo`).classList.add(`hidden`),document.getElementById(`btn-submit-attendance`).classList.add(`hidden`),d.textContent=`Meminta izin & koordinat GPS...`,z(),n.classList.remove(`hidden`),B({needCamera:!f})}async function B(e={needCamera:!0}){let t=e?.needCamera!==!1,n=document.getElementById(`camera-video`),r=document.getElementById(`camera-permission-warning`),i=document.getElementById(`camera-gps-status`);we();let a=!t;if(t)try{if(!navigator.mediaDevices?.getUserMedia)throw Error(`Browser tidak mendukung akses kamera.`);let e=c.cameraFacingMode||`user`;try{c.cameraStream=await navigator.mediaDevices.getUserMedia({video:{facingMode:e,width:{ideal:960},height:{ideal:720}},audio:!1})}catch{c.cameraStream=await navigator.mediaDevices.getUserMedia({video:{width:{ideal:960},height:{ideal:720}},audio:!1}),c.cameraFacingMode=`user`}n.srcObject=c.cameraStream,a=!0,z()}catch{a=!1}let o=!1,s=e=>{c.gpsCoords={lat:e.latitude,lng:e.longitude,accuracy:e.accuracy??null};let t=c.gpsCoords.accuracy==null?``:` (±${Math.round(c.gpsCoords.accuracy)}m)`;i.textContent=`${c.gpsCoords.lat.toFixed(6)}, ${c.gpsCoords.lng.toFixed(6)}${t}`};try{s((await new Promise((e,t)=>{navigator.geolocation?navigator.geolocation.getCurrentPosition(e,t,{enableHighAccuracy:!0,timeout:1e4,maximumAge:0}):t(Error(`GPS tidak didukung`))})).coords),o=!0,navigator.geolocation.watchPosition&&(c.gpsWatchId=navigator.geolocation.watchPosition(e=>s(e.coords),()=>{},{enableHighAccuracy:!0,maximumAge:5e3}))}catch{o=!1,i.textContent=`Akses lokasi ditolak / tidak tersedia`}!a||!o?(r.classList.remove(`hidden`),document.getElementById(`btn-capture-photo`).disabled=!0,b(t?`Izin kamera atau lokasi GPS ditolak! Status absensi otomatis dicatat "Belum Absen!".`:`Lokasi GPS wajib menyala saat absen daring! Status absensi dicatat "Belum Absen!".`,`danger`),(c.cameraMode===`self`||c.cameraMode===`daring`)&&c.cameraContext?.sesiId&&await ve(c.cameraContext.sesiId)):(document.getElementById(`btn-capture-photo`).disabled=!1,c.cameraMode===`daring`&&c.daringImageFile&&!c.daringUseCamera&&await xe(c.daringImageFile))}async function ve(e){try{await N.upsert(`absensi`,{sesi_id:e,user_id:c.currentUser.id,status_kehadiran:`Belum Absen!`,status_verifikasi:`Belum Absen!`,foto_url:``,latitude:c.gpsCoords?.lat??null,longitude:c.gpsCoords?.lng??null,waktu_kirim:new Date().toISOString(),pj_id:null,pj_nama:``,is_manual:!1,catatan:`Izin kamera atau GPS ditolak oleh perangkat pengguna.`},`sesi_id,user_id`),await N.loadAll(),R()}catch(e){console.error(e)}}function ye(e,t,n){let r=document.getElementById(`watermark-canvas`),i=document.getElementById(`captured-preview`),a=document.getElementById(`camera-video`),o=document.getElementById(`daring-stage-placeholder`),s=Math.min(1,1280/Math.max(1,t,n)),l=Math.max(320,Math.round(t*s)),d=Math.max(240,Math.round(n*s));r.width=l,r.height=d;let f=r.getContext(`2d`),p=(c.cameraMode!==`daring`||c.daringUseCamera)&&c.cameraFlipHorizontal;f.setTransform(1,0,0,1,0,0),p?(f.save(),f.translate(l,0),f.scale(-1,1),f.drawImage(e,0,0,l,d),f.restore()):f.drawImage(e,0,0,l,d),f.setTransform(1,0,0,1,0,0);let m=Math.max(94,Math.round(d*.22));f.fillStyle=`rgba(3, 19, 43, 0.84)`,f.fillRect(0,d-m,l,m),f.strokeStyle=`rgba(0, 212, 255, 0.75)`,f.lineWidth=2,f.beginPath(),f.moveTo(0,d-m),f.lineTo(l,d-m),f.stroke();let h=Math.max(14,Math.round(l*.024)),g=Math.round(l*.03),_=d-m+h+10,v=c.currentUser;f.fillStyle=`#00d4ff`,f.font=`700 ${h}px "Plus Jakarta Sans", sans-serif`;let y=document.getElementById(`daring-platform`)?.value||`Daring`,b=c.cameraMode===`manual_pj`?`Kelas R3S | PJ: ${c.cameraContext.pjNama||v.nama_lengkap} -> ${c.cameraContext.studentName} (${c.cameraContext.statusKehadiran})`:c.cameraMode===`daring`?`ABSENSI WAKTU NYATA DARING (${y}) | ${v.nama_lengkap} (${v.npm})`:`Kelas R3S | ${v.nama_lengkap} (${v.npm})`;f.fillText(b,g,_),f.fillStyle=`#f0f8ff`,f.font=`500 ${Math.round(h*.9)}px "JetBrains Mono", monospace`,f.fillText(u(new Date),g,_+h*1.45),f.fillText(`GPS: ${c.gpsCoords.lat.toFixed(6)}, ${c.gpsCoords.lng.toFixed(6)}`,g,_+h*2.8),r.toBlob(e=>{e&&(c.capturedBlob=e,c.capturedPreviewUrl=URL.createObjectURL(e),i.src=c.capturedPreviewUrl,a.classList.add(`hidden`),o&&o.classList.add(`hidden`),i.classList.remove(`hidden`),document.getElementById(`btn-capture-photo`).classList.add(`hidden`),document.getElementById(`btn-retake-photo`).classList.remove(`hidden`),document.getElementById(`btn-submit-attendance`).classList.remove(`hidden`))},`image/jpeg`,.78)}function be(){let e=document.getElementById(`camera-video`);!c.cameraStream||!c.gpsCoords?b(`Kamera dan GPS aktif wajib tersedia sebelum mengambil foto.`,`danger`):ye(e,e.videoWidth||800,e.videoHeight||600)}async function xe(e){if(!e)return;if(c.daringImageFile=e,!c.gpsCoords){b(`Menunggu kunci lokasi GPS aktif sebelum menempelkan stempel waktu bukti daring...`,`warning`);return}let t=URL.createObjectURL(e),n=new Image;n.onload=()=>{ye(n,n.naturalWidth||960,n.naturalHeight||720),URL.revokeObjectURL(t)},n.onerror=()=>{URL.revokeObjectURL(t),b(`Gagal membaca berkas gambar bukti daring.`,`danger`)},n.src=t}function Se(){c.capturedBlob=null;let e=document.getElementById(`camera-video`),t=document.getElementById(`captured-preview`),n=document.getElementById(`daring-stage-placeholder`),r=c.cameraMode===`daring`&&!c.daringUseCamera;if(t.classList.add(`hidden`),document.getElementById(`btn-retake-photo`).classList.add(`hidden`),document.getElementById(`btn-submit-attendance`).classList.add(`hidden`),r){e.classList.add(`hidden`),n&&n.classList.remove(`hidden`),document.getElementById(`btn-capture-photo`).classList.add(`hidden`);let t=document.getElementById(`daring-bukti-file`);t&&(t.value=``),c.daringImageFile=null}else n&&n.classList.add(`hidden`),e.classList.remove(`hidden`),document.getElementById(`btn-capture-photo`).classList.remove(`hidden`)}async function Ce(){if(!c.capturedBlob||!c.gpsCoords){b(`Ambil foto bukti terlebih dahulu.`,`warning`);return}let e=document.getElementById(`btn-submit-attendance`);e.disabled=!0,e.textContent=`Mengirim...`;try{let e=await N.uploadFile(c.capturedBlob,c.cameraMode===`manual_pj`?`absen_manual_pj`:`absen_mahasiswa`);if(c.cameraMode===`self`||c.cameraMode===`daring`){let t=c.sesiAbsensi.find(e=>e.id===c.cameraContext.sesiId),n=c.cameraMode===`daring`,r=document.getElementById(`daring-platform`)?.value||`Zoom Meeting`,i=document.getElementById(`daring-catatan`)?.value.trim()||``,a=n?`[Daring Real-Time · ${r}]${i?` `+i:``}`:``;await N.upsert(`absensi`,{sesi_id:c.cameraContext.sesiId,user_id:c.currentUser.id,status_kehadiran:`Hadir`,status_verifikasi:`Menunggu`,foto_url:e,latitude:c.gpsCoords.lat,longitude:c.gpsCoords.lng,waktu_kirim:new Date().toISOString(),pj_id:t?.pj_id||null,pj_nama:t?.pj_nama||``,mode_absen:n?`Daring`:`Luring`,is_manual:!1,catatan:a},`sesi_id,user_id`);let o=t?.mata_kuliah||c.cameraContext.mata_kuliah||`Perkuliahan`,s=t?.pertemuan_ke||c.cameraContext.pertemuan_ke||`-`,l=[{user_id:c.currentUser.id,judul:`Absensi Berhasil Dikirim`,pesan:`Absensi ${n?`Daring (${r})`:`Luring Kamera + GPS`} untuk ${o} (Pertemuan ke-${s}) telah dikirim. Menunggu persetujuan Ketua/Admin.`,tipe:`info`}];S([`ketua`,`admin`]).forEach(e=>{e!==c.currentUser.id&&l.push({user_id:e,judul:`Absensi Mahasiswa Masuk`,pesan:`${c.currentUser.nama_lengkap} (${c.currentUser.npm}) mengirim absensi ${n?`Daring`:`Luring`} · ${o} (Pertemuan ke-${s}).`,tipe:`info`})}),await C(l),b(n?`Absen Daring Waktu Nyata (${r}) terkirim! Menunggu persetujuan Ketua/Admin maksimal 1x24 jam.`:`Absensi terkirim! Status: Menunggu persetujuan Ketua/Admin maksimal 1x24 jam. Jika belum berubah, silakan buat laporan di Pusat Informasi.`,`success`)}else{let t=c.cameraContext;await N.upsert(`absensi`,{sesi_id:t.sesiId,user_id:t.studentId,status_kehadiran:t.statusKehadiran,status_verifikasi:`Disetujui`,foto_url:e,latitude:c.gpsCoords.lat,longitude:c.gpsCoords.lng,waktu_kirim:new Date().toISOString(),pj_id:t.pjId||c.currentUser.id,pj_nama:t.pjNama||c.currentUser.nama_lengkap,dicatat_oleh:c.currentUser.id,is_manual:!0,catatan:t.catatan||`Dicatat manual oleh Penanggung Jawab dengan foto & GPS.`},`sesi_id,user_id`),b(`Absensi manual untuk ${t.studentName} berhasil disimpan!`,`success`)}await N.loadAll(),Q(`modal-camera`),L(),R()}catch(e){b(e.message||`Gagal mengirim absensi.`,`danger`)}finally{e.disabled=!1,e.textContent=`Kirim Absensi Sekarang`}}function we(){c.cameraStream&&=(c.cameraStream.getTracks().forEach(e=>e.stop()),null),c.gpsWatchId!=null&&navigator.geolocation?.clearWatch&&(navigator.geolocation.clearWatch(c.gpsWatchId),c.gpsWatchId=null)}function Te(e,t){let n=.0035;return`https://www.openstreetmap.org/export/embed.html?bbox=${(Number(t)-n).toFixed(6)}%2C${(Number(e)-n).toFixed(6)}%2C${(Number(t)+n).toFixed(6)}%2C${(Number(e)+n).toFixed(6)}&layer=mapnik&marker=${Number(e).toFixed(6)}%2C${Number(t).toFixed(6)}`}function Ee(e){if(e?.latitude==null||e?.longitude==null)return`<span class="meta-line">Tanpa koordinat GPS</span>`;let t=Number(e.latitude).toFixed(5),n=Number(e.longitude).toFixed(5);return`
    <button type="button" class="gps-link-btn btn-open-gps-map" data-absen-id="${e.id}" title="Klik untuk melihat posisi mahasiswa di peta">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
      <span>${t}, ${n}</span>
    </button>
  `}function De(e){let t=c.absensi.find(t=>t.id===e);if(!t||t.latitude==null||t.longitude==null){b(`Koordinat GPS tidak tersedia pada catatan ini.`,`warning`);return}let n=c.profiles.find(e=>e.id===t.user_id),r=c.sesiAbsensi.find(e=>e.id===t.sesi_id),i=Number(t.latitude),a=Number(t.longitude),o=`${i.toFixed(6)}, ${a.toFixed(6)}`;document.getElementById(`gps-map-title`).textContent=`Posisi GPS · ${n?.nama_lengkap||`Mahasiswa`}`,document.getElementById(`gps-map-subtitle`).textContent=`${n?.npm||`-`} · ${r?.mata_kuliah||`Perkuliahan`} · ${d(t.waktu_kirim)}`,document.getElementById(`gps-map-coords`).textContent=o,document.getElementById(`gps-map-iframe`).src=Te(i,a),document.getElementById(`gps-map-gmaps-link`).href=`https://www.google.com/maps?q=${i},${a}`,document.getElementById(`modal-gps-map`).classList.remove(`hidden`)}function Oe(){document.querySelectorAll(`.btn-open-gps-map`).forEach(e=>{e.addEventListener(`click`,()=>{De(e.getAttribute(`data-absen-id`))})})}function ke(e){return e?e.mode_absen===`Daring`||String(e.catatan||``).includes(`[Daring Real-Time`):!1}function Ae(e,t){let n=c.sesiAbsensi.find(e=>e.id===t),r=c.absensi.find(t=>t.id===e),i=r?c.profiles.find(e=>e.id===r.user_id):c.currentUser;document.getElementById(`detail-absen-subtitle`).textContent=n?`${n.mata_kuliah} · Pertemuan ke-${n.pertemuan_ke}`:`Detail Kehadiran`;let a=r?.latitude!=null&&r?.longitude!=null,o=a?`${Number(r.latitude).toFixed(6)}, ${Number(r.longitude).toFixed(6)}`:`Tidak tersedia`,s=a?`<a href="https://www.google.com/maps?q=${r.latitude},${r.longitude}" target="_blank" rel="noopener noreferrer">Buka di Google Maps</a>`:``,l=r?.is_manual?`Manual oleh PJ`:ke(r)?`Absensi Waktu Nyata Daring`:`Absensi Kamera + GPS (Luring)`;r?.pj_nama||n?.pj_nama,document.getElementById(`detail-absen-body`).innerHTML=`
    ${r?.foto_url?`<img src="${_(r.foto_url)}" class="lightbox-img" style="width:100%;max-height:300px;object-fit:contain;" alt="Foto Penanda Waktu Absensi" />`:`<div class="payment-channel-box text-center"><span class="meta-line">Tidak ada lampiran foto pada catatan ini.</span></div>`}
    <div class="detail-kv-grid">
      <div class="detail-kv-item">
        <span class="meta-line">Mahasiswa</span>
        <strong>${_(i?.nama_lengkap||`-`)} (${_(i?.npm||`-`)})</strong>
      </div>
      <div class="detail-kv-item">
        <span class="meta-line">Dosen Pengampu</span>
        <strong>${_(n?.dosen||`-`)}</strong>
      </div>
      <div class="detail-kv-item">
        <span class="meta-line">Waktu Kirim (WIB)</span>
        <strong class="tabular-nums">${_(d(r?.waktu_kirim))}</strong>
      </div>
      <div class="detail-kv-item">
        <span class="meta-line">Mode Kehadiran</span>
        <strong>${_(l)}</strong>
      </div>
      <div class="detail-kv-item">
        <span class="meta-line">Koordinat GPS</span>
        <strong class="tabular-nums">${_(o)}</strong>
        <div>${s}</div>
      </div>
      <div class="detail-kv-item">
        <span class="meta-line">Status Kehadiran &amp; Verifikasi</span>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px;">
          <span class="status-tag ${x(r?.status_kehadiran)}">${_(r?.status_kehadiran||`Belum Absen!`)}</span>
          <span class="status-tag ${x(r?.status_verifikasi)}">${_(r?.status_verifikasi||`-`)}</span>
        </div>
      </div>
      <div class="detail-kv-item" style="grid-column:1 / -1;">
        <span class="meta-line">Penanggung Jawab (PJ)</span>
        <strong>PJ Absensi: ${_(r?.pj_nama||W(`ketua`).nama_lengkap)}</strong>
        <div class="meta-line" style="margin-top:2px;">
          PJ Mata Kuliah: <strong>${_(Qe(n))}</strong> · ${r?.pj_nama?`Diverifikasi / Dicatat oleh PJ Absensi`:`Menunggu Verifikasi PJ Absensi`}
        </div>
      </div>
    </div>
    ${a?`<div class="gps-inline-map">
            <iframe
              src="${_(Te(r.latitude,r.longitude))}"
              title="Posisi GPS Mahasiswa"
              loading="lazy"
            ></iframe>
          </div>`:``}
    ${r?.catatan?`<div class="detail-kv-item" style="margin-top:12px;"><span class="meta-line">Catatan</span><p>${_(r.catatan)}</p></div>`:``}
  `,document.getElementById(`modal-detail-absen`).classList.remove(`hidden`)}function je(){let e=c.currentUser,t=Date.now(),n=[...c.sesiAbsensi].sort((e,t)=>new Date(t.created_at)-new Date(e.created_at)),r=Object.fromEntries(c.sesiAbsensi.map(e=>[e.id,e])),i=c.absensi.filter(t=>t.user_id===e.id);return`
    <div class="page-header">
      <div>
        <span class="meta-line">Kamera Langsung + GPS + Absen Daring Waktu Nyata · Stempel Waktu WIB</span>
        <h2>Absensi Perkuliahan Waktu Nyata</h2>
      </div>
    </div>

    <div class="sessions-grid" style="margin-bottom:20px;">
      ${n.length===0?`<div class="card glass-panel"><p class="meta-line">Belum ada sesi absensi dibuka oleh Ketua Kelas atau Admin.</p></div>`:n.map(n=>{let r=n.is_active&&new Date(n.batas_waktu).getTime()>t,i=c.absensi.find(t=>t.sesi_id===n.id&&t.user_id===e.id),a=r&&(!i||i.status_verifikasi===`Belum Absen!`||i.status_verifikasi===`Ditolak`),o=n.mode_kuliah||`Luring`;return i?.pj_nama||n.pj_nama,`
                  <div class="session-card ${r?``:`locked`}">
                    <div>
                      <div class="form-row-between" style="margin-bottom:8px;gap:6px;flex-wrap:wrap;">
                        <span class="meta-line">Pertemuan ke-${n.pertemuan_ke} · ${_(o)}</span>
                        <span class="status-tag ${r?`tag-success`:`tag-danger`}">
                          ${r?`Sesi Dibuka`:`Sesi Ditutup`}
                        </span>
                      </div>
                      <h3>${_(n.mata_kuliah)}</h3>
                      <p class="meta-line" style="margin-top:4px;">Dosen: ${_(n.dosen)}</p>
                      <p class="meta-line" style="margin-top:2px;">PJ Mata Kuliah: <strong>${_(Qe(n))}</strong></p>
                      ${n.link_daring?`<div class="daring-link-callout">
                              <div class="daring-link-meta">
                                <span class="meta-line">Tautan Perkuliahan Daring (${_(o)})</span>
                                <span class="daring-link-url tabular-nums">${_(n.link_daring)}</span>
                              </div>
                              <a href="${_(n.link_daring)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">Buka Tautan Daring</a>
                            </div>`:``}
                    </div>

                    <div>
                      <span class="meta-line">Sisa Waktu Absensi</span>
                      <div class="session-countdown" data-deadline-iso="${_(n.batas_waktu)}">
                        ${r?`Menghitung...`:`Sesi Ditutup`}
                      </div>
                    </div>

                    ${i?`<div>
                            <span class="meta-line">Status Anda:</span>
                            <div style="display:flex;gap:8px;margin-top:4px;flex-wrap:wrap;">
                              <span class="status-tag ${x(i.status_kehadiran)}">${_(i.status_kehadiran)}</span>
                              <span class="status-tag ${x(i.status_verifikasi)}">${_(i.status_verifikasi)}</span>
                              ${ke(i)?`<span class="status-tag tag-info">Daring Waktu Nyata</span>`:``}
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
            ${i.length===0?`<tr><td colspan="7" class="text-center">Belum ada catatan kehadiran tersimpan.</td></tr>`:i.map(e=>{let t=r[e.sesi_id],n=e.pj_nama||t?.pj_nama||`-`,i=e.is_manual?`Manual PJ`:ke(e)?`Daring Real-Time`:`Luring Kamera+GPS`;return`
                        <tr>
                          <td>
                            <strong>${_(t?.mata_kuliah||`-`)}</strong>
                            <div class="meta-line">Pertemuan ke-${t?.pertemuan_ke||`-`}</div>
                          </td>
                          <td class="tabular-nums">${_(d(e.waktu_kirim))}</td>
                          <td><span class="status-tag tag-info">${_(i)}</span></td>
                          <td><span class="status-tag ${x(e.status_kehadiran)}">${_(e.status_kehadiran)}</span></td>
                          <td><span class="status-tag ${x(e.status_verifikasi)}">${_(e.status_verifikasi)}</span></td>
                          <td><strong>${_(n)}</strong></td>
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
  `}function Me(){document.querySelectorAll(`.btn-open-absen`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-sesi-id`),n=c.sesiAbsensi.find(e=>e.id===t);n&&_e(`self`,{sesiId:n.id,mata_kuliah:n.mata_kuliah,dosen:n.dosen,pertemuan_ke:n.pertemuan_ke})})}),document.querySelectorAll(`.btn-open-absen-daring`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-sesi-id`),n=c.sesiAbsensi.find(e=>e.id===t);n&&_e(`daring`,{sesiId:n.id,mata_kuliah:n.mata_kuliah,dosen:n.dosen,pertemuan_ke:n.pertemuan_ke})})}),document.querySelectorAll(`.btn-detail-absen`).forEach(e=>{e.addEventListener(`click`,()=>{Ae(e.getAttribute(`data-absen-id`),e.getAttribute(`data-sesi-id`))})})}function Ne(){let e=c.currentUser,t=Object.fromEntries(c.profiles.map(e=>[e.id,e])),n=c.iuranKas.filter(t=>t.user_id===e.id),r=n.filter(e=>e.status!==`Lunas`),i=n.filter(e=>e.status===`Lunas`);return`
    <div class="page-header">
      <div>
        <span class="meta-line">Transparansi Keuangan Kelas R3S</span>
        <h2>Pembayaran Iuran Kas</h2>
      </div>
      <div class="card glass-panel" style="padding:12px 18px;">
        <span class="meta-line">Total Sisa Tunggakan</span>
        <strong class="kpi-value" style="font-size:1.2rem;">${g(r.reduce((e,t)=>e+Math.max(0,t.nominal_tagihan-t.nominal_dibayar),0))} / ${r.length} periode</strong>
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
            ${r.length===0?`<tr><td colspan="5" class="text-center">Tidak ada tunggakan kas saat ini.</td></tr>`:r.map(e=>{let t=e.status===`Ditolak`||e.status===`Belum Lunas`&&e.metode_bayar===`Ditolak`,n=t?`Ditolak`:e.status,r=e.status===`Belum Lunas`||t;return`
                  <tr>
                    <td><strong>${_(e.periode)}</strong></td>
                    <td class="tabular-nums">${g(e.nominal_tagihan)}</td>
                    <td>${_(e.metode_bayar&&e.metode_bayar!==`Ditolak`?e.metode_bayar:`-`)}</td>
                    <td><span class="status-tag ${x(n)}">${_(n)}</span></td>
                    <td>
                      <div class="row-actions">
                        ${r?`<button type="button" class="btn btn-primary btn-sm btn-pay-iuran" data-id="${e.id}">${t?`Bayar Ulang`:`Bayar Kas`}</button>`:`<span class="meta-line">Menunggu Verifikasi Bendahara</span>`}
                        ${e.bukti_url?`<button type="button" class="btn btn-secondary btn-sm btn-view-img" data-url="${_(e.bukti_url)}" data-title="Bukti Transfer ${_(e.periode)}">Lihat Bukti</button>`:``}
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
                          <td>${_(e.periode)}</td>
                          <td class="tabular-nums text-success">${g(e.nominal_dibayar)}</td>
                          <td>${_(e.metode_bayar||`-`)}</td>
                          <td class="tabular-nums">${_(d(e.tanggal_bayar))}</td>
                          <td><strong>${_(n)}</strong></td>
                          <td><span class="status-tag tag-success">Lunas</span></td>
                        </tr>
                      `}).join(``)}
          </tbody>
        </table>
      </div>
    </div>
  `}function Pe(){document.querySelectorAll(`.btn-pay-iuran`).forEach(e=>{e.addEventListener(`click`,()=>{let t=c.iuranKas.find(t=>t.id===e.getAttribute(`data-id`));t&&Fe(t,{previewOnly:!1,customPeriod:!1})})}),$()}function Fe(e=null,t={previewOnly:!1,customPeriod:!1}){let r=c.pengaturan||{},i=!!t?.previewOnly,a=!!t?.customPeriod&&!i,o=e||{},s=Math.max(2e3,Number(o.nominal_tagihan||r.nominal_kas_default||1e4));document.getElementById(`pay-kas-id`).value=a?``:o.id||``,document.getElementById(`pay-kas-modal-title`).textContent=i?`QRIS Pembayaran Kelas (Batas Waktu 10 Menit)`:a?`Bayar Kas / Setoran Mandiri`:`Pembayaran Iuran Kas Kelas`,document.getElementById(`pay-kas-periode`).textContent=i?`${o.periode||`QRIS Pembayaran Resmi Kelas R3S`} · Nominal ${g(s)}`:a?`${c.currentUser?.nama_lengkap||`Anggota`} · Pembayaran kas mandiri via QRIS atau Transfer Bank`:`${o.periode||`Tagihan Kas`} · Tagihan ${g(s)}`;let u=document.getElementById(`pay-kas-periode-group`),d=document.getElementById(`pay-kas-periode-input`);u&&d&&(u.classList.toggle(`hidden`,!a),d.required=a,d.value=a?`Setoran Kas - ${m(l(new Date).slice(0,7))}`:``);let f=document.getElementById(`pay-kas-nominal`),p=document.getElementById(`pay-kas-bukti`);f.value=s,f.required=!i,p.required=!i,p.value=``,document.getElementById(`pay-kas-preview`).classList.add(`hidden`),document.getElementById(`pay-kas-nominal-group`).classList.toggle(`hidden`,i),document.getElementById(`pay-kas-method-group`).classList.toggle(`hidden`,i),document.getElementById(`pay-kas-bukti-group`).classList.toggle(`hidden`,i),document.getElementById(`btn-pay-kas-submit`).classList.toggle(`hidden`,i),document.getElementById(`btn-pay-kas-close`).textContent=i?`Tutup`:`Batal`,document.getElementById(`qris-merchant-label`).textContent=r.qris_merchant_name||`Mas_hy, Fashion`,document.getElementById(`qris-nmid-label`).textContent=`NMID: ${r.qris_nmid||`ID1025463553806`}`,document.getElementById(`bank-name-display`).textContent=r.nama_bank||`BCA`,document.getElementById(`bank-holder-display`).textContent=r.atas_nama_rekening||`Bendahara R3S`,document.getElementById(`bank-number-display`).textContent=r.no_rekening||`-`,Ie(`QRIS`),i&&document.getElementById(`panel-method-bank`).classList.add(`hidden`),Ue(r.qris_payload||n,f.value),Le(),document.getElementById(`modal-pay-kas`).classList.remove(`hidden`)}function Ie(e){c.selectedPayMethod=e,document.querySelectorAll(`#modal-pay-kas .seg-btn`).forEach(t=>{t.classList.toggle(`active`,t.getAttribute(`data-method`)===e)}),document.getElementById(`panel-method-qris`).classList.toggle(`hidden`,e!==`QRIS`),document.getElementById(`panel-method-bank`).classList.toggle(`hidden`,e!==`Transfer Bank`)}function Le(){clearInterval(c.qrisTimerInterval),c.qrisSecondsLeft=600;let e=document.getElementById(`qris-countdown-display`),t=()=>{let t=Math.floor(c.qrisSecondsLeft/60),n=c.qrisSecondsLeft%60;e&&(e.textContent=`${String(t).padStart(2,`0`)}:${String(n).padStart(2,`0`)}`),c.qrisSecondsLeft<=0?(clearInterval(c.qrisTimerInterval),e&&(e.textContent=`Kedaluwarsa`)):--c.qrisSecondsLeft};t(),c.qrisTimerInterval=setInterval(t,1e3)}function Re(e){let t=String(e||``).trim(),n=[],r=0;for(;r+4<=t.length;){let e=t.slice(r,r+2),i=parseInt(t.slice(r+2,r+4),10);if(Number.isNaN(i)||i<0||r+4+i>t.length)break;let a=t.slice(r+4,r+4+i);if(n.push({tag:e,val:a}),r+=4+i,e===`63`)break}return n}function ze(e){let t=65535;for(let n=0;n<e.length;n++){t^=e.charCodeAt(n)<<8;for(let e=0;e<8;e++)t=t&32768?(t<<1^4129)&65535:t<<1&65535}return t.toString(16).toUpperCase().padStart(4,`0`)}function Be(e){let t=Re(e),n=t.find(e=>e.tag===`59`)?.val||``,r=t.find(e=>e.tag===`60`)?.val||``,i=``,a=t.find(e=>e.tag===`51`);return a&&(i=Re(a.val).find(e=>e.tag===`02`)?.val||``),{merchantName:n,city:r,nmid:i}}function Ve(e){let t={...e||{}};t.qris_payload&&String(t.qris_payload).trim().startsWith(`000201`)||(t.qris_payload=n);let r=Be(t.qris_payload);return t.qris_nmid&&t.qris_nmid!==`ID1020304050607`||(t.qris_nmid=r.nmid||`ID1025463553806`),t.qris_merchant_name&&t.qris_merchant_name!==`KAS KELAS R3S`||(t.qris_merchant_name=r.merchantName||`Mas_hy, Fashion`),t}function He(e,t){let r=e&&String(e).trim().startsWith(`000201`)?String(e).trim():n,i=Re(r).filter(e=>e.tag!==`63`&&e.tag!==`54`);if(i.length===0)return r;let a=Math.max(0,Math.round(Number(t||0))),o=[],s=!1;for(let e of i)e.tag===`01`?o.push({tag:`01`,val:a>0?`12`:`11`}):(!s&&a>0&&Number(e.tag)>54&&(o.push({tag:`54`,val:String(a)}),s=!0),o.push(e));!s&&a>0&&o.push({tag:`54`,val:String(a)});let c=o.map(e=>`${e.tag}${String(e.val.length).padStart(2,`0`)}${e.val}`).join(``)+`6304`;return c+ze(c)}function Ue(e,t){let r=document.getElementById(`qris-qr-canvas`);if(!r)return;let i=r.getContext(`2d`),a=e&&String(e).trim().startsWith(`000201`)?String(e).trim():c.pengaturan?.qris_payload||n,o=Math.max(0,Math.round(Number(t||0))),s=He(a,o);c.currentDynamicQrisString=s;let l=document.getElementById(`qris-dynamic-nominal-label`);if(l&&(l.textContent=o>0?`QRIS Dinamis · Nominal Otomatis: ${g(o)}`:`QRIS Dinamis · Nominal Fleksibel`),r.width!==244&&(r.width=244),r.height!==244&&(r.height=244),i.fillStyle=`#ffffff`,i.fillRect(0,0,244,244),typeof window.qrcode==`function`)try{let e=window.qrcode(0,`M`);e.addData(s,`Byte`),e.make();let t=e.getModuleCount(),n=t+8,r=Math.max(2,Math.floor(244/n)),a=n*r,o=Math.floor((244-a)/2);i.fillStyle=`#03132b`;for(let n=0;n<t;n++)for(let a=0;a<t;a++)e.isDark(n,a)&&i.fillRect(o+(a+4)*r,o+(n+4)*r,r,r);return}catch{}i.fillStyle=`#0f172a`,i.font=`bold 13px Arial, sans-serif`,i.textAlign=`center`,i.fillText(`QRIS Dinamis Siap Disalin`,122,114),i.font=`12px Arial, sans-serif`,i.fillText(o>0?g(o):`Klik Salin Kode QRIS`,122,136),i.textAlign=`left`}async function We(e){e.preventDefault();let t=document.getElementById(`pay-kas-id`).value.trim(),n=document.getElementById(`pay-kas-periode-group`),r=!t&&!(!n||n.classList.contains(`hidden`));if(!t&&!r){Q(`modal-pay-kas`);return}let i=document.getElementById(`pay-kas-periode-input`)?.value.trim()||``,a=Number(document.getElementById(`pay-kas-nominal`).value),o=document.getElementById(`pay-kas-bukti`).files[0];if(r&&!i)b(`Isi nama periode atau keterangan pembayaran kas terlebih dahulu.`,`danger`);else if(!Number.isFinite(a)||a<2e3)b(`Minimal pembayaran kas adalah Rp 2.000.`,`danger`);else if(!o)b(`Wajib mengunggah foto bukti transfer/QRIS.`,`danger`);else try{let e=t?c.iuranKas.find(e=>e.id===t):null,n=await N.uploadFile(o,`bukti_kas`),r=new Date().toISOString();t&&e?await N.update(`iuran_kas`,t,{nominal_dibayar:a,metode_bayar:c.selectedPayMethod,bukti_url:n,status:`Menunggu Verifikasi`,tanggal_bayar:r}):await N.insert(`iuran_kas`,{user_id:c.currentUser.id,periode:i,nominal_tagihan:a,nominal_dibayar:a,metode_bayar:c.selectedPayMethod,bukti_url:n,status:`Menunggu Verifikasi`,tanggal_bayar:r});let s=e?.periode||i||`Iuran Kas`,l=[{user_id:c.currentUser.id,judul:`Bukti Pembayaran Kas Terkirim`,pesan:`Pembayaran ${s} sebesar ${g(a)} via ${c.selectedPayMethod} berhasil dikirim. Menunggu ACC Admin/Bendahara.`,tipe:`info`}];S([`admin`,`bendahara`]).forEach(e=>{e!==c.currentUser.id&&l.push({user_id:e,judul:`Pembayaran Kas Menunggu ACC`,pesan:`${c.currentUser.nama_lengkap} (${c.currentUser.npm}) membayar kas ${s} sebesar ${g(a)} (${c.selectedPayMethod}).`,tipe:`warning`})}),await C(l),await N.loadAll(),Q(`modal-pay-kas`),b(`Bukti pembayaran terkirim! Menunggu verifikasi Bendahara/Admin.`,`success`),L(),R()}catch(e){b(e.message||`Gagal mengirim bukti pembayaran.`,`danger`)}}function Ge(){let e=c.pengajuanCuti.filter(e=>e.user_id===c.currentUser.id);return`
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
                        <strong>${_(f(new Date(t)))}</strong>
                        <div class="meta-line">${_(p(new Date(t)))}</div>
                      </td>
                      <td class="tabular-nums">${_(e.tanggal_mulai)} s.d. ${_(e.tanggal_selesai)}</td>
                      <td>${_(e.alasan)}</td>
                      <td><span class="status-tag ${x(e.status)}">${_(e.status)}</span></td>
                      <td>
                        ${e.surat_url?`<button type="button" class="btn btn-secondary btn-sm btn-view-img" data-url="${_(e.surat_url)}" data-title="Surat Cuti Resmi">Lihat</button>`:`-`}
                      </td>
                    </tr>
                  `}).join(``)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `}function Ke(){document.getElementById(`form-ajukan-cuti`)?.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`cuti-mulai`).value,n=document.getElementById(`cuti-selesai`).value,r=document.getElementById(`cuti-alasan`).value.trim(),i=document.getElementById(`cuti-surat`).files[0];if(n<t)b(`Tanggal selesai tidak boleh lebih awal dari tanggal mulai.`,`danger`);else try{let e=i?await N.uploadFile(i,`surat_cuti`):``,a=new Date().toISOString();await N.insert(`pengajuan_cuti`,{user_id:c.currentUser.id,tanggal_mulai:t,tanggal_selesai:n,alasan:r,surat_url:e,status:`Menunggu`,waktu_pengajuan:a}),await N.loadAll(),b(`Pengajuan cuti berhasil dikirim!`,`success`),R()}catch(e){b(e.message||`Gagal mengirim pengajuan cuti.`,`danger`)}}),$()}function qe(){let e=c.currentUser,t=e.role===`admin`,n=c.laporanKendala.filter(t=>t.user_id===e.id),r=pe(),i=r.filter(e=>!e.dibaca).length;return`
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
                      ${_(e.judul)}
                      ${e.dibaca?``:`<span class="status-tag tag-coral" style="margin-left:6px;">Baru</span>`}
                    </div>
                    <p style="font-size:0.84rem;margin-top:2px;">${_(e.pesan)}</p>
                    <span class="meta-line tabular-nums">${_(d(e.created_at))}</span>
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
                            <td><strong>${_(e.kategori)}</strong></td>
                            <td>
                              <div>${_(e.keterangan)}</div>
                              ${e.tanggapan_admin?`<div class="meta-line text-cyan" style="margin-top:4px;">Tanggapan Admin: ${_(e.tanggapan_admin)}</div>`:``}
                            </td>
                            <td><span class="status-tag ${x(e.status)}">${_(e.status)}</span></td>
                          </tr>
                        `).join(``)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        `}
  `}function Je(){document.getElementById(`btn-mark-all-read`)?.addEventListener(`click`,async()=>{let e=pe().filter(e=>!e.dibaca);try{await Promise.all(e.map(e=>N.update(`pemberitahuan`,e.id,{dibaca:!0}))),await N.loadAll(),L(),R(),b(`Semua pemberitahuan ditandai sudah dibaca.`,`success`)}catch(e){b(e.message||`Gagal memperbarui notifikasi.`,`danger`)}}),document.querySelector(`.btn-goto-laporan-masuk`)?.addEventListener(`click`,()=>{c.activeTab=`monitoring_laporan`,L(),R()}),document.getElementById(`form-kirim-laporan`)?.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`laporan-kategori`).value,n=document.getElementById(`laporan-keterangan`).value.trim(),r=document.getElementById(`laporan-bukti`).files[0];try{let e=r?await N.uploadFile(r,`laporan_kendala`):``;await N.insert(`laporan_kendala`,{user_id:c.currentUser.id,kategori:t,keterangan:n,bukti_url:e,tanggapan_admin:``,status:`Menunggu`});let a=c.currentUser,o=n.length>90?`${n.slice(0,90)}...`:n,s=[{user_id:a.id,judul:`Laporan Berhasil Dikirim`,pesan:`Laporan kategori "${t}" telah dikirim ke Admin Utama dan sedang menunggu tindak lanjut.`,tipe:`info`}];S([`admin`]).forEach(e=>{e!==a.id&&s.push({user_id:e,judul:`Laporan Masuk (${i[a.role]||a.role})`,pesan:`${a.nama_lengkap} (${a.npm}) mengirim laporan "${t}": ${o}`,tipe:`warning`})}),await C(s),await N.loadAll(),b(`Laporan berhasil dikirim ke Admin Utama.`,`success`),L(),R()}catch(e){b(e.message||`Gagal mengirim laporan.`,`danger`)}})}function Ye(){let e=c.currentUser,t=(e.nama_lengkap||`R`)[0].toUpperCase();return`
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
            ${e.avatar_url?`<img src="${_(e.avatar_url)}" alt="${_(e.nama_lengkap)}" />`:`<span>${_(t)}</span>`}
          </div>
          <div>
            <strong>${_(e.nama_lengkap)}</strong>
            <div class="meta-line tabular-nums">${_(e.npm)} · <span class="status-tag ${s(e.role)}">${_(i[e.role]||e.role)}</span></div>
            <div class="meta-line">${e.avatar_url?`Foto profil aktif tersimpan`:`Belum mengunggah foto profil`}</div>
          </div>
        </div>

        <div class="field-group">
          <label>Nama Lengkap</label>
          <input type="text" value="${_(e.nama_lengkap)}" readonly />
        </div>
        <div class="field-group">
          <label>NPM / NIM</label>
          <input type="text" value="${_(e.npm)}" readonly class="tabular-nums" />
        </div>
        <div class="field-group">
          <label>Peran Akun</label>
          <input type="text" value="${_(i[e.role]||e.role)}${e.role===`pj_matkul`?` (Penanda Penanggung Jawab Mata Kuliah)`:``}" readonly />
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
            <input type="text" id="profil-username" value="${_(e.username)}" required />
          </div>
          <div class="field-group">
            <label for="profil-nowa">Nomor WhatsApp (Format 628...)</label>
            <input type="text" id="profil-nowa" value="${_(e.no_wa||``)}" placeholder="628123456789" />
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
  `}function Xe(){document.getElementById(`profil-password`)?.addEventListener(`input`,e=>{ae(e.target.value,`#profil-pw-rules`)}),document.getElementById(`profil-avatar-file`)?.addEventListener(`change`,e=>{let t=e.target.files[0],n=document.getElementById(`profil-avatar-preview`);t&&n&&(n.innerHTML=`<img src="${URL.createObjectURL(t)}" alt="Pratinjau Foto Profil" />`)}),document.getElementById(`form-update-avatar`)?.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`profil-avatar-file`).files[0];if(t)try{let e=await N.uploadFile(t,`avatars`);await N.update(`profiles`,c.currentUser.id,{avatar_url:e}),await C([{user_id:c.currentUser.id,judul:`Foto Profil Diperbarui`,pesan:`Foto profil Anda berhasil diperbarui dan ditampilkan pada bilah navigasi serta halaman Profil.`,tipe:`success`}]),await N.loadAll(),b(`Foto profil berhasil diperbarui!`,`success`),L(),R()}catch(e){b(e.message||`Gagal mengunggah foto profil.`,`danger`)}}),document.getElementById(`form-update-credentials`)?.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`profil-username`).value.trim(),n=document.getElementById(`profil-nowa`).value.trim(),r=document.getElementById(`profil-password`).value;if(c.profiles.find(e=>e.id!==c.currentUser.id&&e.username.toLowerCase()===t.toLowerCase())){b(`Username sudah dipakai anggota lain.`,`danger`);return}let i={username:t,no_wa:n};if(r){if(!v(r).valid){b(`Password wajib maks 8 karakter, min 1 angka, dan min 1 simbol.`,`danger`);return}i.password=r}try{await N.update(`profiles`,c.currentUser.id,i);let e=c.currentUser,n=[{user_id:e.id,judul:`Kredensial Akun Diperbarui`,pesan:`Username (@${t})${r?` dan password`:``} berhasil diperbarui dan tersinkron ke sistem.`,tipe:`success`}];a(e.role)&&S([`admin`]).forEach(i=>{n.push({user_id:i,judul:`Mahasiswa Mengubah Username / Password`,pesan:`Mahasiswa ${e.nama_lengkap} (${e.npm}) memperbarui kredensial akun menjadi @${t}${r?` (beserta password baru)`:``}.`,tipe:`warning`})}),await C(n),await N.loadAll(),b(`Profil & kredensial tersinkron ke sistem Admin!`,`success`),L(),R()}catch(e){b(e.message||`Gagal memperbarui kredensial.`,`danger`)}})}var Ze=[{mata_kuliah:`Pemrograman Web Lanjut`,dosen:`Dr. Hendra Kusuma, M.Kom.`,sks:3},{mata_kuliah:`Basis Data Terdistribusi`,dosen:`Ir. Maya Putri, M.T.`,sks:3},{mata_kuliah:`Rekayasa Perangkat Lunak`,dosen:`Budi Santoso, M.Kom.`,sks:2},{mata_kuliah:`Jaringan Komputer`,dosen:`Ahmad Fauzi, S.T., M.Kom.`,sks:2},{mata_kuliah:`Kecerdasan Buatan`,dosen:`Dr. Ratna Sari, M.Kom.`,sks:3},{mata_kuliah:`Sistem Operasi`,dosen:`Eko Prasetyo, M.T.`,sks:2}];function Qe(e){if(!e)return`-`;if(e.pj_matkul_id){let t=c.profiles.find(t=>t.id===e.pj_matkul_id&&t.role===`pj_matkul`);if(t)return t.nama_lengkap}if(e.pj_matkul_nama){let t=c.profiles.find(t=>t.nama_lengkap.toLowerCase()===String(e.pj_matkul_nama).toLowerCase()&&t.role===`pj_matkul`);if(t)return t.nama_lengkap}return`-`}function $e(){let e=c.profiles.find(e=>e.role===`pj_matkul`),t=new Map;return Ze.forEach(n=>t.set(n.mata_kuliah.toLowerCase(),{...n,pj_matkul_id:e?.id||``,pj_matkul_nama:e?.nama_lengkap||``})),c.sesiAbsensi.forEach(e=>{if(e.mata_kuliah&&e.dosen){let n=t.get(e.mata_kuliah.toLowerCase()),r=c.profiles.find(t=>t.role===`pj_matkul`&&(t.id===e.pj_matkul_id||e.pj_matkul_nama&&t.nama_lengkap.toLowerCase()===String(e.pj_matkul_nama).toLowerCase()));t.set(e.mata_kuliah.toLowerCase(),{mata_kuliah:e.mata_kuliah,dosen:e.dosen,sks:Number(e.sks||2),pj_matkul_id:r?.id||n?.pj_matkul_id||``,pj_matkul_nama:r?.nama_lengkap||n?.pj_matkul_nama||``})}}),Array.from(t.values())}function et(){return c.profiles.filter(e=>e.role===`pj_matkul`)}function tt(e=``,t=``){let n=et();if(n.length===0)return`<option value="">-- Belum ada akun berlabel PJ Mata Kuliah --</option>`;let r=e&&n.some(t=>t.id===e)?e:n.find(e=>e.nama_lengkap.toLowerCase()===String(t).toLowerCase())?.id||n[0].id;return n.map(e=>`<option value="${e.id}" data-nama="${_(e.nama_lengkap)}" ${e.id===r?`selected`:``}>${_(e.nama_lengkap)} (${_(e.npm)} · ${_(i[e.role]||e.role)})</option>`).join(``)}function nt(){let e=$e(),t=e[0]||{mata_kuliah:``,dosen:``,sks:2,pj_matkul_id:``,pj_matkul_nama:``},n=et(),r=l(new Date),a=new Intl.DateTimeFormat(`en-GB`,{timeZone:`Asia/Jakarta`,hour:`2-digit`,minute:`2-digit`,hour12:!1}).format(new Date),o=Number(t.sks||2),s=o*50,u=[...c.sesiAbsensi].sort((e,t)=>{let n=String(e.tanggal||l(new Date(e.created_at||0)));return String(t.tanggal||l(new Date(t.created_at||0))).localeCompare(n)||new Date(t.created_at||0)-new Date(e.created_at||0)});return`
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
              ${e.map((e,t)=>`<option value="${t}" data-matkul="${_(e.mata_kuliah)}" data-dosen="${_(e.dosen)}" data-sks="${e.sks}" data-pj-matkul-id="${_(e.pj_matkul_id||``)}" data-pj-matkul-nama="${_(e.pj_matkul_nama||``)}">${_(e.mata_kuliah)} — ${_(e.dosen)} (${e.sks} SKS)</option>`).join(``)}
              <option value="custom">-- Masukkan Mata Kuliah &amp; Dosen Baru --</option>
            </select>
          </div>

          <div class="grid-2" style="margin-bottom:0;">
            <div class="field-group">
              <label for="sesi-matkul">Nama Mata Kuliah</label>
              <input type="text" id="sesi-matkul" class="input-locked" value="${_(t.mata_kuliah)}" placeholder="Masukkan nama mata kuliah" readonly required />
            </div>
            <div class="field-group">
              <label for="sesi-dosen">Dosen Pengampu</label>
              <input type="text" id="sesi-dosen" class="input-locked" value="${_(t.dosen)}" placeholder="Masukkan nama dosen" readonly required />
            </div>
          </div>

          <div class="field-group">
            <label for="sesi-pj-matkul">Penanggung Jawab Mata Kuliah (Khusus Label PJ Mata Kuliah)</label>
            <select id="sesi-pj-matkul" required>
              ${tt(t.pj_matkul_id,t.pj_matkul_nama)}
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
              <input type="number" id="sesi-pertemuan" min="1" value="${Number(c.pengaturan?.pertemuan_berjalan??0)+1}" required />
            </div>
            <div class="field-group">
              <label for="sesi-pj">Penanggung Jawab Sesi (Akun Aktif · Terkunci)</label>
              <input
                type="text"
                id="sesi-pj"
                class="input-locked"
                value="${_(c.currentUser.nama_lengkap)} (${_(i[c.currentUser.role]||c.currentUser.role)})"
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

          <button type="submit" class="btn btn-primary btn-block" ${n.length===0?`disabled`:``}>Simpan &amp; Aktifkan Absensi</button>
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
              ${u.length===0?`<tr><td colspan="5" class="text-center">Belum ada sesi absensi.</td></tr>`:u.map(e=>{let t=e.is_active&&new Date(e.batas_waktu).getTime()>Date.now(),n=Number(e.sks||2),r=Number(e.durasi_menit||n*50),i=e.tanggal||l(new Date(e.created_at)),a=Qe(e);return`
                          <tr>
                            <td>
                              <strong>${_(e.mata_kuliah)}</strong>
                              <div class="meta-line">${_(e.dosen)} · Pert. ${e.pertemuan_ke}</div>
                            </td>
                            <td class="tabular-nums">
                              <strong>${_(h(i))}</strong>
                              <div class="meta-line">${n} SKS (${r} mnt) · s.d. ${_(d(e.batas_waktu))}</div>
                            </td>
                            <td>
                              <strong>${_(a)}</strong>
                              <div class="meta-line">Sesi: ${_(e.pj_nama||`-`)}</div>
                            </td>
                            <td><span class="status-tag ${t?`tag-success`:`tag-danger`}">${t?`Dibuka`:`Ditutup`}</span></td>
                            <td>
                              <button type="button" class="btn btn-secondary btn-sm btn-toggle-sesi" data-id="${e.id}" data-active="${e.is_active}">
                                ${e.is_active?`Tutup Sesi`:`Aktifkan`}
                              </button>
                            </td>
                          </tr>
                        `}).join(``)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `}function rt(){let e=e=>{let t=document.getElementById(`sesi-matkul`),n=document.getElementById(`sesi-dosen`),r=document.getElementById(`sesi-sks`);t&&(t.readOnly=!e,t.classList.toggle(`input-locked`,!e)),n&&(n.readOnly=!e,n.classList.toggle(`input-locked`,!e)),r&&(r.disabled=!e,r.classList.toggle(`input-locked`,!e))},t=()=>{let e=document.getElementById(`sesi-tanggal`)?.value,t=document.getElementById(`sesi-jam-mulai`)?.value,n=Number(document.getElementById(`sesi-sks`)?.value||2),r=n*50,i=document.getElementById(`sesi-durasi-label`),a=document.getElementById(`sesi-batas-preview`),o=document.getElementById(`sesi-batas`);if(i&&(i.textContent=`${n} SKS × 50 menit = ${r} menit`),!e||!t||!o)return;let s=new Date(`${e}T${t}:00`);if(Number.isNaN(s.getTime()))return;let c=new Date(s.getTime()+r*6e4);o.value=new Date(c.getTime()-c.getTimezoneOffset()*6e4).toISOString().slice(0,16),a&&(a.textContent=d(c.toISOString()))},n=document.getElementById(`sesi-matkul-preset`);e(n?.value===`custom`),t(),n?.addEventListener(`change`,n=>{let r=n.target.selectedOptions[0],i=document.getElementById(`sesi-matkul`),a=document.getElementById(`sesi-dosen`),o=document.getElementById(`sesi-sks`),s=document.getElementById(`sesi-pj-matkul`),c=n.target.value===`custom`;if(e(c),c)i.value=``,a.value=``,i.focus();else if(r){i.value=r.getAttribute(`data-matkul`)||``,a.value=r.getAttribute(`data-dosen`)||``;let e=r.getAttribute(`data-sks`);e&&o&&(o.value=e);let t=r.getAttribute(`data-pj-matkul-id`)||``,n=r.getAttribute(`data-pj-matkul-nama`)||``;if(s){if(t&&Array.from(s.options).some(e=>e.value===t))s.value=t;else if(n){let e=Array.from(s.options).find(e=>(e.getAttribute(`data-nama`)||``).toLowerCase()===n.toLowerCase());e&&(s.value=e.value)}}}t()}),[`sesi-tanggal`,`sesi-jam-mulai`,`sesi-sks`].forEach(e=>{document.getElementById(e)?.addEventListener(`change`,t)}),document.getElementById(`form-buka-sesi`)?.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`sesi-matkul`).value.trim(),n=document.getElementById(`sesi-dosen`).value.trim(),r=document.getElementById(`sesi-tanggal`).value,i=Number(document.getElementById(`sesi-sks`).value||2),a=i*50,o=Number(document.getElementById(`sesi-pertemuan`).value),s=c.currentUser.id,l=c.currentUser.nama_lengkap,u=document.getElementById(`sesi-pj-matkul`)?.value||``,d=c.profiles.find(e=>e.id===u&&e.role===`pj_matkul`);if(!d){b(`Hanya akun berlabel PJ Mata Kuliah yang boleh dicatat. Tetapkan role PJ Mata Kuliah di menu Kelola Anggota & Role.`,`warning`);return}let f=d.id,p=d.nama_lengkap,m=document.getElementById(`sesi-mode`)?.value||`Luring`,h=document.getElementById(`sesi-link-daring`)?.value.trim()||``,g=document.getElementById(`sesi-batas`).value;try{await N.insert(`sesi_absensi`,{mata_kuliah:t,dosen:n,pertemuan_ke:o,tanggal:r,sks:i,durasi_menit:a,batas_waktu:new Date(g).toISOString(),pj_id:s,pj_nama:l,pj_matkul_id:f,pj_matkul_nama:p,mode_kuliah:m,link_daring:h,dibuka_oleh:c.currentUser.id,is_active:!0}),await N.loadAll(),b(`Sesi ${t} (${m} · ${i} SKS) · PJ Matkul: ${p} · PJ Sesi: ${l} dibuka!`,`success`),R()}catch(e){b(e.message||`Gagal membuka sesi absensi.`,`danger`)}}),document.querySelectorAll(`.btn-toggle-sesi`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-id`),n=e.getAttribute(`data-active`)===`true`;try{await N.update(`sesi_absensi`,t,{is_active:!n}),await N.loadAll(),b(`Status sesi berhasil ${n?`ditutup`:`diaktifkan`}.`,`info`),R()}catch(e){b(e.message||`Gagal mengubah status sesi.`,`danger`)}})})}function it(){let e=c.absensi.filter(e=>e.status_verifikasi===`Menunggu`),t=Object.fromEntries(c.profiles.map(e=>[e.id,e])),n=Object.fromEntries(c.sesiAbsensi.map(e=>[e.id,e]));return`
    <div class="page-header">
      <div>
        <span class="meta-line">Periksa Foto Stempel Waktu &amp; Titik Koordinat GPS Mahasiswa</span>
        <h2>Antrean Verifikasi Kehadiran</h2>
      </div>
      <span class="status-tag tag-coral tabular-nums">${e.length} Menunggu Persetujuan</span>
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
            ${e.length===0?`<tr><td colspan="5" class="text-center">Antrean verifikasi kosong. Semua kiriman telah diproses.</td></tr>`:e.map(e=>{let r=t[e.user_id],i=n[e.sesi_id];return`
                        <tr>
                          <td>
                            <strong>${_(r?.nama_lengkap||`-`)}</strong>
                            <div class="meta-line tabular-nums">${_(r?.npm||`-`)}</div>
                          </td>
                          <td>
                            <strong>${_(i?.mata_kuliah||`-`)}</strong>
                            <div class="meta-line">Pertemuan ke-${i?.pertemuan_ke||`-`}</div>
                          </td>
                          <td>
                            <div class="tabular-nums">${_(d(e.waktu_kirim))}</div>
                            <div style="margin-top:5px;">${Ee(e)}</div>
                          </td>
                          <td>
                            ${e.foto_url?`<button type="button" class="btn btn-secondary btn-sm btn-view-img" data-url="${_(e.foto_url)}" data-title="Foto Stempel Waktu · ${_(r?.nama_lengkap||``)}">Periksa Foto</button>`:`<span class="meta-line">Tidak ada foto</span>`}
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
  `}function at(){$(),Oe(),document.querySelectorAll(`.btn-acc-absen`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-id`),n=e.getAttribute(`data-user`),r=c.absensi.find(e=>e.id===t),i=c.profiles.find(e=>e.id===n),a=r?c.sesiAbsensi.find(e=>e.id===r.sesi_id):null,o=a?`${a.mata_kuliah} (Pertemuan ke-${a.pertemuan_ke})`:`perkuliahan`,s=c.currentUser.nama_lengkap,l=c.currentUser.id;try{await N.update(`absensi`,t,{status_verifikasi:`Disetujui`,pj_id:l,pj_nama:s,dicatat_oleh:l});let e=[{user_id:n,judul:`Absensi Disetujui`,pesan:`Kehadiran Anda pada ${o} telah disetujui oleh ${s}.`,tipe:`success`}];S([`ketua`,`admin`]).forEach(t=>{e.push({user_id:t,judul:`Persetujuan Absensi Mahasiswa`,pesan:`Absensi ${i?.nama_lengkap||`Mahasiswa`} (${i?.npm||`-`}) pada ${o} telah disetujui oleh ${s}.`,tipe:`success`})}),await C(e),await N.loadAll(),b(`Kehadiran mahasiswa disetujui!`,`success`),L(),R()}catch(e){b(e.message||`Gagal menyetujui absensi.`,`danger`)}})}),document.querySelectorAll(`.btn-reject-absen`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-id`),n=e.getAttribute(`data-user`),r=c.absensi.find(e=>e.id===t),i=c.profiles.find(e=>e.id===n),a=r?c.sesiAbsensi.find(e=>e.id===r.sesi_id):null,o=a?`${a.mata_kuliah} (Pertemuan ke-${a.pertemuan_ke})`:`perkuliahan`,s=c.currentUser.nama_lengkap,l=c.currentUser.id;try{await N.update(`absensi`,t,{status_kehadiran:`Alpha`,status_verifikasi:`Ditolak`,pj_id:l,pj_nama:s,dicatat_oleh:l});let e=[{user_id:n,judul:`Absensi Ditolak`,pesan:`Kiriman absensi Anda pada ${o} ditolak oleh ${s}. Hubungi Ketua/Admin jika terjadi kekeliruan.`,tipe:`danger`}];S([`ketua`,`admin`]).forEach(t=>{e.push({user_id:t,judul:`Absensi Mahasiswa Ditolak`,pesan:`Absensi ${i?.nama_lengkap||`Mahasiswa`} (${i?.npm||`-`}) pada ${o} ditolak oleh ${s}.`,tipe:`danger`})}),await C(e),await N.loadAll(),b(`Absensi ditolak dan dicatat Alpha.`,`warning`),L(),R()}catch(e){b(e.message||`Gagal menolak absensi.`,`danger`)}})})}function ot(){let e=c.profiles.filter(e=>a(e.role)),t=c.currentUser,n=Array.from(new Set(c.sesiAbsensi.map(e=>e.mata_kuliah).filter(Boolean))),r=n[0]||``,o=[...c.sesiAbsensi].filter(e=>!r||e.mata_kuliah===r).sort((e,t)=>Number(e.pertemuan_ke||0)-Number(t.pertemuan_ke||0));return`
    <div class="page-header">
      <div>
        <span class="meta-line">Anti-Kecurangan · Wajib Foto Langsung Penanggung Jawab &amp; GPS</span>
        <h2>Absensi Manual</h2>
      </div>
    </div>

    <div class="card glass-panel" style="max-width:680px;">
      <div class="card-header">
        <div>
          <h3>Pencatatan Manual oleh ${_(i[t.role]||t.role)}</h3>
          <span class="meta-line">Pilih mata kuliah dan pertemuan secara terpisah untuk mencatat Alpha / Izin / Sakit / Hadir</span>
        </div>
      </div>

      <form id="form-manual-pj">
        <div class="grid-2" style="margin-bottom:0;">
          <div class="field-group">
            <label for="manual-matkul">Pilih Mata Kuliah</label>
            <select id="manual-matkul" required>
              ${n.length===0?`<option value="">Belum ada mata kuliah</option>`:n.map(e=>`<option value="${_(e)}">${_(e)}</option>`).join(``)}
            </select>
          </div>
          <div class="field-group">
            <label for="manual-pertemuan">Pilih Pertemuan</label>
            <select id="manual-pertemuan" required>
              ${o.length===0?`<option value="">Belum ada pertemuan</option>`:o.map(e=>`<option value="${e.id}">Pertemuan ${e.pertemuan_ke}</option>`).join(``)}
            </select>
          </div>
        </div>

        <div class="field-group">
          <label for="manual-student">Pilih Mahasiswa</label>
          <select id="manual-student" required>
            ${e.map(e=>`<option value="${e.id}">${_(e.nama_lengkap)} (${_(e.npm)})</option>`).join(``)}
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
              value="${_(t.nama_lengkap)} (${_(i[t.role]||t.role)})"
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
  `}function st(){document.getElementById(`manual-matkul`)?.addEventListener(`change`,e=>{let t=e.target.value,n=document.getElementById(`manual-pertemuan`);if(!n)return;let r=[...c.sesiAbsensi].filter(e=>e.mata_kuliah===t).sort((e,t)=>Number(e.pertemuan_ke||0)-Number(t.pertemuan_ke||0));n.innerHTML=r.length===0?`<option value="">Belum ada pertemuan</option>`:r.map(e=>`<option value="${e.id}">Pertemuan ${e.pertemuan_ke}</option>`).join(``)}),document.getElementById(`form-manual-pj`)?.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`manual-pertemuan`)?.value,n=document.getElementById(`manual-student`).value,r=document.getElementById(`manual-status`).value,i=c.currentUser.id,a=c.currentUser.nama_lengkap,o=document.getElementById(`manual-catatan`).value.trim();!t||!n?b(`Pilih mata kuliah, pertemuan, dan mahasiswa terlebih dahulu.`,`warning`):_e(`manual_pj`,{sesiId:t,studentId:n,studentName:c.profiles.find(e=>e.id===n)?.nama_lengkap||`Mahasiswa`,statusKehadiran:r,pjId:i,pjNama:a,catatan:o})})}function ct(){let e=Object.fromEntries(c.profiles.map(e=>[e.id,e])),t=Object.fromEntries(c.sesiAbsensi.map(e=>[e.id,e])),n=c.filters.riwayatSearch.toLowerCase(),r=c.filters.riwayatStatus,i=c.absensi.filter(i=>{let a=e[i.user_id],o=t[i.sesi_id],s=`${a?.nama_lengkap||``} ${a?.npm||``} ${o?.mata_kuliah||``} ${i.pj_nama||``}`.toLowerCase(),c=!n||s.includes(n),l=r===`Semua`||i.status_kehadiran===r;return c&&l});return`
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
          value="${_(c.filters.riwayatSearch)}"
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
                            <strong>${_(r?.nama_lengkap||`-`)}</strong>
                            <div class="meta-line tabular-nums">${_(r?.npm||`-`)}</div>
                          </td>
                          <td>
                            <strong>${_(i?.mata_kuliah||`-`)}</strong>
                            <div class="meta-line">Pert. ${i?.pertemuan_ke||`-`} · ${_(d(n.waktu_kirim))}</div>
                          </td>
                          <td>${Ee(n)}</td>
                          <td><span class="status-tag ${x(n.status_kehadiran)}">${_(n.status_kehadiran)}</span></td>
                          <td>
                            <span class="status-tag ${x(n.status_verifikasi)}">${_(n.status_verifikasi)}</span>
                            <div class="meta-line">${n.is_manual?`Manual PJ: `:`PJ: `}${_(n.pj_nama||`-`)}</div>
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
            ${c.pengajuanCuti.length===0?`<tr><td colspan="6" class="text-center">Belum ada pengajuan cuti masuk.</td></tr>`:c.pengajuanCuti.map(t=>{let n=e[t.user_id],r=t.waktu_pengajuan||t.created_at;return`
                        <tr>
                          <td>
                            <strong>${_(n?.nama_lengkap||`-`)}</strong>
                            <div class="meta-line tabular-nums">${_(n?.npm||`-`)}</div>
                          </td>
                          <td class="tabular-nums">${_(d(r))}</td>
                          <td class="tabular-nums">${_(h(t.tanggal_mulai))} s.d. ${_(h(t.tanggal_selesai))}</td>
                          <td>
                            <div>${_(t.alasan)}</div>
                            ${t.surat_url?`<button type="button" class="btn-link-inline btn-view-img" data-url="${_(t.surat_url)}" data-title="Surat Cuti · ${_(n?.nama_lengkap||``)}">Lihat Surat Resmi</button>`:``}
                          </td>
                          <td><span class="status-tag ${x(t.status)}">${_(t.status)}</span></td>
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
    ${(()=>{let t=c.pengajuanCuti.filter(e=>e.status===`Disetujui`).sort((e,t)=>new Date(t.waktu_pengajuan||t.created_at)-new Date(e.waktu_pengajuan||e.created_at));return`
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
                ${t.length===0?`<tr><td colspan="6" class="text-center">Belum ada pengajuan cuti yang disetujui.</td></tr>`:t.map(t=>{let n=e[t.user_id],r=t.ditinjau_oleh?e[t.ditinjau_oleh]?.nama_lengkap:`-`,i=h(l(new Date(t.waktu_pengajuan||t.created_at)));return`
                            <tr>
                              <td>
                                <strong>${_(n?.nama_lengkap||`-`)}</strong>
                                <div class="meta-line tabular-nums">${_(n?.npm||`-`)}</div>
                              </td>
                              <td class="tabular-nums">${_(i)}</td>
                              <td class="tabular-nums">${_(h(t.tanggal_mulai))} s.d. ${_(h(t.tanggal_selesai))}</td>
                              <td>${_(t.alasan)}</td>
                              <td><strong>${_(r||`-`)}</strong></td>
                              <td>
                                ${t.surat_url?`<button type="button" class="btn btn-secondary btn-sm btn-view-img" data-url="${_(t.surat_url)}" data-title="Surat Cuti · ${_(n?.nama_lengkap||``)}">Lihat Surat</button>`:`-`}
                              </td>
                            </tr>
                          `}).join(``)}
              </tbody>
            </table>
          </div>
        </div>
      `})()}
  `}function lt(){$(),Oe(),document.getElementById(`filter-riwayat-search`)?.addEventListener(`input`,e=>{c.filters.riwayatSearch=e.target.value,R();let t=document.getElementById(`filter-riwayat-search`);t&&(t.focus(),t.setSelectionRange(t.value.length,t.value.length))}),document.getElementById(`filter-riwayat-status`)?.addEventListener(`change`,e=>{c.filters.riwayatStatus=e.target.value,R()}),document.querySelectorAll(`.btn-detail-absen`).forEach(e=>{e.addEventListener(`click`,()=>{Ae(e.getAttribute(`data-absen-id`),e.getAttribute(`data-sesi-id`))})}),document.querySelectorAll(`.btn-edit-absen`).forEach(e=>{e.addEventListener(`click`,()=>{let t=c.absensi.find(t=>t.id===e.getAttribute(`data-id`));if(!t)return;let n=c.profiles.find(e=>e.id===t.user_id);document.getElementById(`edit-absen-id`).value=t.id,document.getElementById(`edit-absen-student`).textContent=`${n?.nama_lengkap||`-`} (${n?.npm||`-`})`,document.getElementById(`edit-absen-status`).value=t.status_kehadiran,document.getElementById(`edit-absen-verif`).value=t.status_verifikasi;let r=document.getElementById(`edit-absen-pj`);r&&(r.value=`${c.currentUser.nama_lengkap} (${i[c.currentUser.role]||c.currentUser.role})`),document.getElementById(`edit-absen-catatan`).value=t.catatan||``,document.getElementById(`modal-edit-absen`).classList.remove(`hidden`)})}),document.querySelectorAll(`.btn-del-absen`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-id`);try{await N.remove(`absensi`,t),await N.loadAll(),b(`Catatan absensi dihapus.`,`info`),L(),R()}catch(e){b(e.message||`Gagal menghapus data absensi.`,`danger`)}})}),document.querySelectorAll(`.btn-cuti-action`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-id`),n=e.getAttribute(`data-user`),r=e.getAttribute(`data-status`);try{await N.update(`pengajuan_cuti`,t,{status:r,ditinjau_oleh:c.currentUser.id}),await N.insert(`pemberitahuan`,{user_id:n,judul:`Pengajuan Cuti ${r}`,pesan:`Pengajuan cuti Anda telah ${r.toLowerCase()} oleh ${c.currentUser.nama_lengkap}.`,tipe:r===`Disetujui`?`success`:`danger`,dibaca:!1}),await N.loadAll(),b(`Status pengajuan cuti diubah menjadi ${r}.`,`success`),L(),R()}catch(e){b(e.message||`Gagal memperbarui status cuti.`,`danger`)}})})}function ut(){let e=c.pengaturan||{},[t,n]=l(new Date).split(`-`),r=Math.max(0,Math.min(11,Number(n||1)-1)),a=Number(t||2026),o=[`Januari`,`Februari`,`Maret`,`April`,`Mei`,`Juni`,`Juli`,`Agustus`,`September`,`Oktober`,`November`,`Desember`],s=o[r]||`Januari`,u=Array.from(new Set([2025,2026,2027,2028,2029,2030,a])).sort((e,t)=>e-t);return`
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
              <strong>${_(e.nama_bank||`BCA`)}</strong>
            </div>
            <div>
              <span class="meta-line">Atas Nama</span>
              <strong>${_(e.atas_nama_rekening||`-`)}</strong>
            </div>
          </div>
          <div class="bank-account-copy">
            <div>
              <span class="meta-line">Nomor Rekening</span>
              <strong class="tabular-nums">${_(e.no_rekening||`-`)}</strong>
            </div>
            <button type="button" id="btn-copy-rekening-bendahara" class="btn btn-secondary btn-sm" data-rek="${_(e.no_rekening||``)}">
              Salin Rekening
            </button>
          </div>
        </div>

        <div class="payment-channel-box">
          <div class="qris-header-row">
            <div>
              <strong>${_(e.qris_merchant_name||`Mas_hy, Fashion`)}</strong>
              <span class="meta-line tabular-nums">NMID: ${_(e.qris_nmid||`-`)}</span>
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
                  ${u.map(e=>`<option value="${e}" ${e===a?`selected`:``}>${e}</option>`).join(``)}
                </select>
              </div>
            </div>
          </div>
          <div class="field-group" style="margin-top:-2px;">
            <span class="meta-line">
              Format Periode Tagihan:
              <strong id="massal-periode-preview" class="text-cyan">Minggu 1 - ${_(s)} ${a}</strong>
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
                value="${_(c.currentUser.nama_lengkap)} (${_(i[c.currentUser.role]||c.currentUser.role)})"
                readonly
                disabled
              />
            </div>
          </div>
          <button type="submit" class="btn btn-primary btn-block">Sebarkan Tagihan Kas ke Semua Mahasiswa</button>
        </form>
      </div>
    </div>
  `}function dt(){document.getElementById(`btn-copy-rekening-bendahara`)?.addEventListener(`click`,e=>{let t=e.target.getAttribute(`data-rek`);navigator.clipboard?.writeText(t),b(`Nomor rekening ${t} disalin!`,`success`)}),document.getElementById(`btn-preview-qris-10m`)?.addEventListener(`click`,()=>{Fe({id:``,periode:`QRIS Pembayaran Resmi Kelas R3S`,nominal_tagihan:(c.pengaturan||{}).nominal_kas_default||1e4},{previewOnly:!0})});let e=document.getElementById(`massal-minggu`),t=document.getElementById(`massal-bulan`),n=document.getElementById(`massal-tahun`),r=document.getElementById(`massal-periode-preview`),i=()=>{let r=e?.value.trim()||``,i=t?.value.trim()||``,a=n?.value.trim()||``;return r&&i&&a?`${r} - ${i} ${a}`:``},a=()=>{r&&(r.textContent=i()||`-`)};e?.addEventListener(`change`,a),t?.addEventListener(`change`,a),n?.addEventListener(`change`,a),document.getElementById(`form-tagihan-massal`)?.addEventListener(`submit`,async e=>{e.preventDefault();let t=i(),n=Number(document.getElementById(`massal-nominal`).value),r=c.profiles.filter(e=>o(e.role));if(!t)b(`Pilih periode minggu, bulan, dan tahun terlebih dahulu.`,`danger`);else if(n<2e3)b(`Nominal tagihan kas minimal Rp 2.000.`,`danger`);else if(r.length===0)b(`Belum ada akun anggota kelas terdaftar.`,`warning`);else try{let i=c.currentUser.id,o=c.currentUser.nama_lengkap,s=r.map(e=>({user_id:e.id,periode:t,nominal_tagihan:n,nominal_dibayar:0,metode_bayar:null,bukti_url:``,pj_id:i,pj_nama:o,dicatat_oleh:i,status:`Belum Lunas`}));await N.insert(`iuran_kas`,s);let l=r.map(e=>({user_id:e.id,judul:`Tagihan Kas Baru: ${t}`,pesan:`Tagihan kas sebesar ${g(n)} telah diterbitkan oleh ${o}.`,tipe:`info`,dibaca:!1}));await N.insert(`pemberitahuan`,l),await N.loadAll(),b(`Tagihan Kas ${t} (PJ: ${o}) berhasil disebar ke ${r.length} anggota kelas!`,`success`),e.target.reset(),a()}catch(e){b(e.message||`Gagal membuat tagihan kas.`,`danger`)}})}function ft(){let e=c.profiles.filter(e=>o(e.role)),t=c.iuranKas.filter(e=>e.status===`Menunggu Verifikasi`),n=Object.fromEntries(c.profiles.map(e=>[e.id,e]));return`
    <div class="page-header">
      <div>
        <span class="meta-line">Verifikasi Bukti Transfer &amp; Pengingat Tunggakan</span>
        <h2>Daftar Pembayaran &amp; Pengingat WA</h2>
      </div>
      <span class="status-tag tag-coral tabular-nums">${t.length} Bukti Menunggu Verifikasi</span>
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
            ${t.length===0?`<tr><td colspan="5" class="text-center">Tidak ada bukti pembayaran menunggu verifikasi.</td></tr>`:t.map(e=>{let t=n[e.user_id];return`
                        <tr>
                          <td>
                            <strong>${_(t?.nama_lengkap||`-`)}</strong>
                            <div class="meta-line tabular-nums">${_(t?.npm||`-`)}</div>
                          </td>
                          <td>
                            <strong>${_(e.periode)}</strong>
                            <div class="meta-line">${_(e.metode_bayar||`-`)} · ${_(d(e.tanggal_bayar))}</div>
                          </td>
                          <td class="tabular-nums">${g(e.nominal_dibayar||e.nominal_tagihan)}</td>
                          <td>
                            ${e.bukti_url?`<button type="button" class="btn btn-secondary btn-sm btn-view-img" data-url="${_(e.bukti_url)}" data-title="Bukti Kas · ${_(t?.nama_lengkap||``)}">Lihat Bukti</button>`:`<span class="meta-line">Tanpa lampiran</span>`}
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
            ${e.map(e=>{let t=H(e.id),n=t.sudahBayar,r=t.tunggakan;return`
                  <tr>
                    <td>
                      <strong>${_(e.nama_lengkap)}</strong>
                      <div class="meta-line tabular-nums">${_(e.npm)}</div>
                    </td>
                    <td class="tabular-nums text-success">${g(n)}</td>
                    <td class="tabular-nums ${r>0?`text-danger`:`text-success`}">${g(r)}</td>
                    <td><span class="status-tag ${r>0?`tag-danger`:`tag-success`}">${r>0?`Belum Lunas`:`Aman / Lunas`}</span></td>
                    <td>
                      <div class="row-actions">
                        ${r>0?`<button type="button" class="btn btn-secondary btn-sm btn-remind-wa" data-user="${e.id}" data-nama="${_(e.nama_lengkap)}" data-sisa="${r}">Ingatkan via WhatsApp</button>
                               <button type="button" class="btn btn-coral btn-sm btn-remind-portal" data-user="${e.id}" data-nama="${_(e.nama_lengkap)}" data-sisa="${r}">Notif Portal</button>`:`<span class="meta-line">Tidak ada tunggakan</span>`}
                      </div>
                    </td>
                  </tr>
                `}).join(``)}
          </tbody>
        </table>
      </div>
    </div>
  `}function pt(){$(),document.querySelectorAll(`.btn-acc-kas`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-id`),n=c.iuranKas.find(e=>e.id===t);if(!n)return;let r=c.profiles.find(e=>e.id===n.user_id),i=Number(n.nominal_dibayar||n.nominal_tagihan),a=r?.nama_lengkap||`Mahasiswa`,o=c.currentUser.nama_lengkap,s=c.currentUser.id;try{await N.update(`iuran_kas`,t,{status:`Lunas`,nominal_dibayar:i,verified_by:s,pj_id:s,pj_nama:o}),await N.insert(`transaksi_kas`,{jenis:`Pemasukan`,kategori:`Iuran Kas`,tanggal:l(new Date),keterangan:`Iuran Kas ${n.periode} · Pengirim: ${a} (${n.metode_bayar||`Transfer`})`,pengirim_nama:a,nominal:i,nota_url:n.bukti_url||``,terkait_user_id:n.user_id,pj_id:null,pj_nama:``,dicatat_oleh:c.currentUser.id});let e=[{user_id:n.user_id,judul:`Pembayaran Kas Disetujui (Lunas)`,pesan:`Pembayaran kas ${n.periode} sebesar ${g(i)} telah disetujui oleh ${o} dan berstatus Lunas.`,tipe:`success`}];S([`admin`]).forEach(t=>{e.push({user_id:t,judul:`Pembayaran Kas Mahasiswa Disetujui`,pesan:`Pembayaran kas ${a} (${r?.npm||`-`}) untuk ${n.periode} (${g(i)}) telah disetujui oleh ${o}.`,tipe:`success`})}),S([`bendahara`]).forEach(t=>{e.push({user_id:t,judul:`Verifikasi Pembayaran Kas Berhasil`,pesan:`Iuran kas ${a} (${n.periode}) sebesar ${g(i)} resmi berstatus Lunas (PJ: ${o}).`,tipe:`success`})}),await C(e),await N.loadAll(),b(`Pembayaran kas diterima & saldo pemasukan bertambah!`,`success`),L(),R()}catch(e){b(e.message||`Gagal memverifikasi kas.`,`danger`)}})}),document.querySelectorAll(`.btn-tolak-kas`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-id`),n=c.iuranKas.find(e=>e.id===t);if(!n)return;let r=c.profiles.find(e=>e.id===n.user_id)?.nama_lengkap||`Mahasiswa`,i=c.currentUser.nama_lengkap,a=c.currentUser.id;try{try{await N.update(`iuran_kas`,t,{status:`Ditolak`,nominal_dibayar:0,pj_id:a,pj_nama:i})}catch(e){let n=String(e?.message||``).toLowerCase();if(n.includes(`check`)||n.includes(`iuran_kas_status_check`))await N.update(`iuran_kas`,t,{status:`Belum Lunas`,nominal_dibayar:0,metode_bayar:`Ditolak`,pj_id:a,pj_nama:i});else throw e}let e=[{user_id:n.user_id,judul:`Bukti Pembayaran Kas Ditolak`,pesan:`Bukti pembayaran kas ${n.periode} ditolak oleh ${i}. Silakan unggah ulang bukti yang valid.`,tipe:`danger`}];S([`admin`,`bendahara`]).forEach(t=>{e.push({user_id:t,judul:`Pembayaran Kas Ditolak`,pesan:`Bukti pembayaran kas ${r} untuk ${n.periode} ditolak oleh ${i}.`,tipe:`danger`})}),await C(e),await N.loadAll(),b(`Bukti pembayaran ditolak dan status diubah menjadi Ditolak.`,`warning`),L(),R()}catch(e){b(e.message||`Gagal menolak bukti pembayaran.`,`danger`)}})}),document.querySelectorAll(`.btn-remind-portal`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-user`),n=e.getAttribute(`data-nama`)||`Mahasiswa`,r=Number(e.getAttribute(`data-sisa`));try{await C([{user_id:t,judul:`Pengingat Tunggakan Kas Kelas`,pesan:`Anda memiliki sisa tunggakan kas sebesar ${g(r)}. Mohon segera melunasi di menu Pembayaran Kas.`,tipe:`warning`},{user_id:c.currentUser.id,judul:`Pengingat Portal Terkirim`,pesan:`Pengingat tunggakan kas sebesar ${g(r)} telah dikirim ke portal ${n}.`,tipe:`info`}]),await N.loadAll(),L(),b(`Notifikasi pengingat terkirim ke ${n}.`,`success`)}catch(e){b(e.message||`Gagal mengirim notifikasi.`,`danger`)}})}),document.querySelectorAll(`.btn-remind-wa`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-user`);t&&vt(t)})})}function mt(e){return!e||e.status===`Lunas`?0:e.status===`Menunggu Verifikasi`||e.status===`Ditolak`?Number(e.nominal_tagihan||0):Math.max(0,Number(e.nominal_tagihan||0)-Number(e.nominal_dibayar||0))}function ht(e,t){let n=c.pengaturan||{},r=(t.bills||[]).filter(e=>e.status!==`Lunas`).map((e,t)=>{let n=Number(e.nominal_tagihan||0),r=mt(e),i=e.status===`Ditolak`||e.status===`Belum Lunas`&&e.metode_bayar===`Ditolak`?`Bukti Ditolak`:e.status;return`${t+1}. ${e.periode} | Tagihan: ${g(n)} | Sisa: ${g(r)} (${i})`}),i=c.currentUser?.nama_lengkap||`Pengurus Kas Kelas`;return[`*PENGINGAT & BUKTI TUNGGAKAN KAS KELAS ${n.nama_kelas||`R3S`}*`,`--------------------------------`,`Nama  : ${e.nama_lengkap}`,`NIM   : ${e.npm||`-`}`,`Waktu : ${u(new Date)}`,``,`*Rincian Periode Tunggakan:*`,r.length?r.join(`
`):`- Total Tunggakan Berjalan: ${g(t.tunggakan)}`,``,`*Ringkasan Keuangan:*`,`- Total Sudah Dibayar : ${g(t.sudahBayar)}`,`- Total Sisa Tunggakan: *${g(t.tunggakan)}*`,``,`*Saluran Pembayaran Resmi:*`,`- Bank ${n.nama_bank||`BCA`}: ${n.no_rekening||`-`} (a.n. ${n.atas_nama_rekening||`Bendahara R3S`})`,`- QRIS: ${n.qris_merchant_name||`Mas_hy, Fashion`} (NMID: ${n.qris_nmid||`-`})`,``,`Mohon segera melakukan pembayaran melalui Portal Kas R3S dan mengunggah bukti pembayaran.`,`_(Terlampir gambar bukti rincian tunggakan kas resmi)_`,`Diterbitkan oleh: ${i}`].join(`
`)}function gt(e,t){let n=c.pengaturan||{},r=(t.bills||[]).filter(e=>e.status!==`Lunas`),a=r.slice(0,8),o=Math.max(0,r.length-8),s=450+Math.max(1,a.length+ +(o>0))*42,l=document.createElement(`canvas`);l.width=920,l.height=s;let d=l.getContext(`2d`);d.fillStyle=`#ffffff`,d.fillRect(0,0,920,s),d.strokeStyle=`#cbd5e1`,d.lineWidth=2,d.strokeRect(12,12,896,s-24),d.fillStyle=`#163a78`,d.fillRect(12,12,896,10),d.fillStyle=`#475569`,d.font=`bold 13px "Plus Jakarta Sans", Arial, sans-serif`,d.fillText(`AKTIVITAS KELAS RS · PUSAT ABSENSI & KAS KELAS ${String(n.nama_kelas||`R3S`).toUpperCase()}`,38,52),d.fillStyle=`#0f172a`,d.font=`bold 26px "Plus Jakarta Sans", Arial, sans-serif`,d.fillText(`BUKTI RINCIAN TUNGGAKAN KAS`,38,86),d.fillStyle=`#fee2e2`,d.strokeStyle=`#fca5a5`,d.lineWidth=1.5,d.fillRect(724,44,158,36),d.strokeRect(724,44,158,36),d.fillStyle=`#b91c1c`,d.font=`bold 14px "Plus Jakarta Sans", Arial, sans-serif`,d.textAlign=`center`,d.fillText(`BELUM LUNAS`,803,67),d.textAlign=`left`,d.strokeStyle=`#1e293b`,d.lineWidth=2,d.beginPath(),d.moveTo(38,104),d.lineTo(882,104),d.stroke(),d.fillStyle=`#f8fafc`,d.strokeStyle=`#e2e8f0`,d.lineWidth=1,d.fillRect(38,118,844,94),d.strokeRect(38,118,844,94);let f=[[`Nama Anggota`,e.nama_lengkap||`-`],[`NIM / NPM`,e.npm||`-`],[`No. WhatsApp`,e.no_wa||`-`]],p=[[`Tanggal Cetak`,u(new Date)],[`Diterbitkan Oleh`,`${c.currentUser?.nama_lengkap||`Bendahara`} (${i[c.currentUser?.role]||`Pengurus`})`],[`Status Tagihan`,`${r.length} Periode Belum Lunas`]];f.forEach(([e,t],n)=>{let r=142+n*26;d.fillStyle=`#475569`,d.font=`bold 13px Arial, sans-serif`,d.fillText(e,54,r),d.fillStyle=`#0f172a`,d.font=`13px Arial, sans-serif`,d.fillText(`: ${String(t).slice(0,34)}`,164,r)}),p.forEach(([e,t],n)=>{let r=142+n*26;d.fillStyle=`#475569`,d.font=`bold 13px Arial, sans-serif`,d.fillText(e,470,r),d.fillStyle=`#0f172a`,d.font=`13px Arial, sans-serif`,d.fillText(`: ${String(t).slice(0,34)}`,590,r)});let m=232,h=[38,76,405,530,655,775,882];return d.fillStyle=`#163a78`,d.fillRect(38,m,844,36),d.fillStyle=`#ffffff`,d.font=`bold 13px Arial, sans-serif`,d.fillText(`No`,h[0]+10,m+23),d.fillText(`Periode Tagihan`,h[1]+10,m+23),d.fillText(`Tagihan`,h[2]+10,m+23),d.fillText(`Terbayar`,h[3]+10,m+23),d.fillText(`Sisa`,h[4]+10,m+23),d.fillText(`Status`,h[5]+10,m+23),m+=36,a.length===0?(d.fillStyle=`#ffffff`,d.fillRect(38,m,844,42),d.strokeStyle=`#cbd5e1`,d.strokeRect(38,m,844,42),d.fillStyle=`#475569`,d.font=`13px Arial, sans-serif`,d.fillText(`Rincian tunggakan kas berjalan`,50,m+26),m+=42):(a.forEach((e,t)=>{let n=t%2==0?`#ffffff`:`#f8fafc`;d.fillStyle=n,d.fillRect(38,m,844,42),d.strokeStyle=`#cbd5e1`,d.lineWidth=1,d.strokeRect(38,m,844,42);let r=Number(e.nominal_tagihan||0),i=e.status===`Menunggu Verifikasi`||e.status===`Ditolak`?0:Number(e.nominal_dibayar||0),a=mt(e),o=e.status===`Ditolak`||e.status===`Belum Lunas`&&e.metode_bayar===`Ditolak`?`Ditolak`:e.status===`Menunggu Verifikasi`?`Menunggu`:`Blm Lunas`;d.fillStyle=`#0f172a`,d.font=`13px Arial, sans-serif`,d.fillText(String(t+1),h[0]+12,m+26),d.font=`bold 13px Arial, sans-serif`,d.fillText(String(e.periode||`-`).slice(0,36),h[1]+10,m+26),d.font=`13px "JetBrains Mono", monospace`,d.fillText(g(r),h[2]+10,m+26),d.fillText(g(i),h[3]+10,m+26),d.fillStyle=`#dc2626`,d.font=`bold 13px "JetBrains Mono", monospace`,d.fillText(g(a),h[4]+10,m+26),d.fillStyle=o===`Menunggu`?`#d97706`:`#dc2626`,d.font=`bold 12px Arial, sans-serif`,d.fillText(o,h[5]+10,m+26),m+=42}),o>0&&(d.fillStyle=`#f1f5f9`,d.fillRect(38,m,844,42),d.strokeStyle=`#cbd5e1`,d.strokeRect(38,m,844,42),d.fillStyle=`#334155`,d.font=`italic 13px Arial, sans-serif`,d.fillText(`+ ${o} periode tunggakan lainnya (lihat rincian lengkap di Portal Kas R3S)`,50,m+26),m+=42)),m+=14,d.fillStyle=`#f0fdf4`,d.strokeStyle=`#86efac`,d.fillRect(38,m,414,64),d.strokeRect(38,m,414,64),d.fillStyle=`#166534`,d.font=`bold 12px Arial, sans-serif`,d.fillText(`TOTAL SUDAH DIBAYAR`,54,m+24),d.font=`bold 20px "JetBrains Mono", monospace`,d.fillText(g(t.sudahBayar),54,m+50),d.fillStyle=`#fef2f2`,d.strokeStyle=`#fca5a5`,d.fillRect(468,m,414,64),d.strokeRect(468,m,414,64),d.fillStyle=`#991b1b`,d.font=`bold 12px Arial, sans-serif`,d.fillText(`TOTAL SISA TUNGGAKAN`,484,m+24),d.font=`bold 20px "JetBrains Mono", monospace`,d.fillText(g(t.tunggakan),484,m+50),m+=80,d.fillStyle=`#f8fafc`,d.strokeStyle=`#cbd5e1`,d.fillRect(38,m,844,72),d.strokeRect(38,m,844,72),d.fillStyle=`#0f172a`,d.font=`bold 13px Arial, sans-serif`,d.fillText(`Saluran Transfer: ${n.nama_bank||`BCA`} · No. Rek ${n.no_rekening||`-`} (a.n. ${n.atas_nama_rekening||`Bendahara R3S`})`,54,m+26),d.fillStyle=`#334155`,d.font=`13px Arial, sans-serif`,d.fillText(`QRIS Resmi: ${n.qris_merchant_name||`Mas_hy, Fashion`} · NMID: ${n.qris_nmid||`-`}`,54,m+50),d.fillStyle=`#64748b`,d.font=`11px Arial, sans-serif`,d.fillText(`Dokumen bukti tagihan resmi ini dibuat otomatis oleh Aktivitas Kelas RS · Kelas ${n.nama_kelas||`R3S`}.`,38,s-22),{dataUrl:l.toDataURL(`image/png`),blobPromise:new Promise(e=>l.toBlob(t=>e(t),`image/png`))}}function _t(e,t){let n=(e?.no_wa||``).replace(/\D/g,``),r=encodeURIComponent(t||``);return n?`https://wa.me/${n}?text=${r}`:`https://wa.me/?text=${r}`}function vt(e){let t=c.profiles.find(t=>t.id===e);if(!t)return;let n=H(t.id),r=ht(t,n),{dataUrl:i,blobPromise:a}=gt(t,n),o=`Bukti_Tunggakan_Kas_${String(t.nama_lengkap||`Mahasiswa`).replace(/[^a-zA-Z0-9_-]+/g,`_`).replace(/^_+|_+$/g,``)}.png`;c.waReminderContext={student:t,sisa:n.tunggakan,fileName:o,dataUrl:i,blobPromise:a},document.getElementById(`wa-reminder-subtitle`).textContent=`${t.nama_lengkap} (${t.npm}) · Sisa Tunggakan ${g(n.tunggakan)}`;let s=document.getElementById(`wa-proof-preview-img`);s&&(s.src=i);let l=document.getElementById(`btn-wa-download-proof`);l&&(l.href=i,l.setAttribute(`download`,o));let u=document.getElementById(`wa-reminder-text`);u&&(u.value=r);let d=document.getElementById(`btn-wa-open-chat`);d&&(d.href=_t(t,r));let f=(n.bills||[]).filter(e=>e.status!==`Lunas`&&e.bukti_url),p=document.getElementById(`wa-rejected-attachments`),m=document.getElementById(`wa-rejected-attachments-list`);p&&m&&(f.length>0?(m.innerHTML=f.map(e=>`<button type="button" class="btn btn-secondary btn-sm btn-view-img" data-url="${_(e.bukti_url)}" data-title="Lampiran ${_(e.periode)} (${_(e.status)})">Lihat Bukti ${_(e.periode)}</button>`).join(``),p.classList.remove(`hidden`),$()):(m.innerHTML=``,p.classList.add(`hidden`)));let h=document.getElementById(`btn-wa-share-native`);h&&h.classList.toggle(`hidden`,typeof navigator.share!=`function`),document.getElementById(`modal-wa-reminder`)?.classList.remove(`hidden`)}function yt(){let e=Object.fromEntries(c.profiles.map(e=>[e.id,e])),t=c.filters.kasSearch.toLowerCase(),n=c.filters.kasJenis,r=c.filters.kasKategori,a=c.transaksiKas.filter(i=>{let a=i.terkait_user_id?e[i.terkait_user_id]:null,o=i.pengirim_nama||a?.nama_lengkap||``,s=`${i.keterangan} ${i.kategori} ${i.pj_nama||``} ${o} ${a?.npm||``}`.toLowerCase();return(!t||s.includes(t))&&(n===`Semua`||i.jenis===n)&&(r===`Semua`||i.kategori===r)}).sort((e,t)=>{let n=String(e.tanggal||``);return String(t.tanggal||``).localeCompare(n)||new Date(t.created_at||0)-new Date(e.created_at||0)}),s=c.transaksiKas.filter(e=>e.jenis===`Pemasukan`).reduce((e,t)=>e+Number(t.nominal),0),u=c.transaksiKas.filter(e=>e.jenis===`Pengeluaran`).reduce((e,t)=>e+Number(t.nominal),0),d=c.profiles.filter(e=>o(e.role)),f=c.currentUser;return`
    <div class="page-header">
      <div>
        <span class="meta-line">Buku Besar Keuangan · Terbuka, PJ Tercatat &amp; Terverifikasi Nota</span>
        <h2>Catatan Pemasukan &amp; Pengeluaran Kas</h2>
      </div>
      <div style="display:flex;gap:14px;flex-wrap:wrap;">
        <span class="status-tag tag-success tabular-nums">Masuk: ${g(s)}</span>
        <span class="status-tag tag-danger tabular-nums">Keluar: ${g(u)}</span>
        <span class="status-tag tag-info tabular-nums">Saldo: ${g(s-u)}</span>
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
            <input type="date" id="kas-tanggal" value="${l(new Date)}" required />
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
            value="${_(f.nama_lengkap)} (${_(i[f.role]||f.role)})"
            readonly
            disabled
          />
        </div>

        <div class="field-group hidden" id="kas-pengirim-group">
          <label for="kas-pengirim">Pilih Nama Pengirim (Mahasiswa)</label>
          <select id="kas-pengirim">
            <option value="">-- Pilih Nama Mahasiswa --</option>
            ${d.map(e=>`<option value="${e.id}">${_(e.nama_lengkap)} (${_(e.npm)})</option>`).join(``)}
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
        <input type="search" id="filter-kas-search" placeholder="Cari nama, pengirim, PJ, atau keterangan..." value="${_(c.filters.kasSearch)}" />
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
            ${a.length===0?`<tr><td colspan="5" class="text-center">Tidak ada transaksi kas yang cocok.</td></tr>`:a.map(t=>{let n=t.jenis===`Pemasukan`,r=t.pj_nama&&String(t.pj_nama).trim()?_(t.pj_nama):n?`<span class="meta-line"><em>- (Dari Mahasiswa Sendiri)</em></span>`:`-`,i=t.pengirim_nama||(t.terkait_user_id?e[t.terkait_user_id]?.nama_lengkap:``)||``;return`
                        <tr>
                          <td class="tabular-nums">${_(h(t.tanggal))}</td>
                          <td>
                            <span class="status-tag ${n?`tag-success`:`tag-danger`}">${_(t.jenis)}</span>
                            <strong style="margin-left:6px;">${_(t.kategori)}</strong>
                            ${n&&i?`<div class="meta-line" style="color:var(--accent-cyan);margin-top:3px;">Pengirim: <strong>${_(i)}</strong></div>`:``}
                            <div class="meta-line">${_(t.keterangan)}</div>
                          </td>
                          <td>${r}</td>
                          <td class="tabular-nums ${n?`text-success`:`text-danger`}">
                            <strong>${n?`+`:`-`}${g(t.nominal)}</strong>
                          </td>
                          <td>
                            ${t.nota_url?`<button type="button" class="btn btn-secondary btn-sm btn-view-img" data-url="${_(t.nota_url)}" data-title="Nota · ${_(t.kategori)}">Detail Nota</button>`:`<span class="meta-line">-</span>`}
                          </td>
                        </tr>
                      `}).join(``)}
          </tbody>
        </table>
      </div>
    </div>
  `}function bt(){$();let e=document.getElementById(`kas-jenis`),t=document.getElementById(`kas-pengirim-group`),n=document.getElementById(`kas-pengirim`),r=()=>{let r=e?.value===`Pemasukan`;t?.classList.toggle(`hidden`,!r),n&&(n.required=r)};r(),e?.addEventListener(`change`,r),document.getElementById(`form-transaksi-kas`)?.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`kas-jenis`).value,n=document.getElementById(`kas-kategori`).value,r=document.getElementById(`kas-tanggal`).value,i=Number(document.getElementById(`kas-nominal`).value),a=c.currentUser.id,o=c.currentUser.nama_lengkap,s=t===`Pemasukan`&&document.getElementById(`kas-pengirim`)?.value||``,u=s?c.profiles.find(e=>e.id===s):null;if(t===`Pemasukan`&&!u){b(`Pilih nama mahasiswa pengirim terlebih dahulu.`,`warning`);return}let d=u?u.nama_lengkap:``,f=document.getElementById(`kas-keterangan`).value.trim(),p=t===`Pemasukan`&&d&&!f.toLowerCase().includes(d.toLowerCase())?`Pengirim: ${d} · ${f}`:f,h=document.getElementById(`kas-nota`).files[0];try{let e=h?await N.uploadFile(h,`nota_kas`):``;if(await N.insert(`transaksi_kas`,{jenis:t,kategori:n,tanggal:r,keterangan:p,terkait_user_id:u?u.id:null,pengirim_nama:d,nominal:i,nota_url:e,pj_id:a,pj_nama:o,dicatat_oleh:c.currentUser.id}),t===`Pemasukan`&&u){let t=i,n=new Date().toISOString(),s=[...c.iuranKas].filter(e=>e.user_id===u.id&&e.status!==`Lunas`).sort((e,t)=>new Date(e.created_at||0)-new Date(t.created_at||0));for(let e of s){if(t<=0)break;let r=Number(e.nominal_tagihan||0),i=e.status===`Menunggu Verifikasi`?0:Math.max(0,Number(e.nominal_dibayar||0)),s=Math.max(0,r-i);s<=0||(t>=s?(await N.update(`iuran_kas`,e.id,{status:`Lunas`,nominal_dibayar:r,metode_bayar:`Tunai`,tanggal_bayar:n,verified_by:a,pj_id:a,pj_nama:o}),t-=s):(await N.update(`iuran_kas`,e.id,{nominal_dibayar:i+t,metode_bayar:`Tunai`,tanggal_bayar:n,pj_id:a,pj_nama:o}),t=0))}if(t>0){let i=m((r||l(new Date)).slice(0,7));await N.insert(`iuran_kas`,{user_id:u.id,periode:`Setoran Kas - ${i}`,nominal_tagihan:t,nominal_dibayar:t,metode_bayar:`Tunai`,bukti_url:e||``,status:`Lunas`,tanggal_bayar:n,verified_by:a,pj_id:a,pj_nama:o})}await C([{user_id:u.id,judul:`Pembayaran Kas Dicatat`,pesan:`Pemasukan kas sebesar ${g(i)} atas nama Anda telah dicatat oleh ${o} dan otomatis menambah total kas Anda.`,tipe:`success`}])}await N.loadAll(),b(u?`Pemasukan ${g(i)} untuk ${d} berhasil dicatat & menambah kas mahasiswa!`:`${t} ${g(i)} (PJ: ${o}) berhasil dicatat!`,`success`),L(),R()}catch(e){b(e.message||`Gagal mencatat transaksi kas.`,`danger`)}}),document.getElementById(`filter-kas-search`)?.addEventListener(`input`,e=>{c.filters.kasSearch=e.target.value,R();let t=document.getElementById(`filter-kas-search`);t&&(t.focus(),t.setSelectionRange(t.value.length,t.value.length))}),document.getElementById(`filter-kas-jenis`)?.addEventListener(`change`,e=>{c.filters.kasJenis=e.target.value,R()}),document.getElementById(`filter-kas-kategori`)?.addEventListener(`change`,e=>{c.filters.kasKategori=e.target.value,R()})}function V(e){let t=c.absensi.filter(t=>t.user_id===e),n=t.filter(e=>e.status_kehadiran===`Hadir`).length,r=t.filter(e=>e.status_kehadiran===`Izin`).length,i=t.filter(e=>e.status_kehadiran===`Sakit`).length,a=t.filter(e=>e.status_kehadiran===`Alpha`||e.status_kehadiran===`Belum Absen!`).length,o=n+r+i+a;return{hadir:n,izin:r,sakit:i,alpha:a,total:o,pct:o>0?Math.round(n/o*100):0,recs:t}}function H(e){let t=c.iuranKas.filter(t=>t.user_id===e),n=t.reduce((e,t)=>t.status===`Lunas`?e+Number(t.nominal_dibayar||t.nominal_tagihan||0):t.status===`Belum Lunas`?e+Math.min(Number(t.nominal_tagihan||0),Math.max(0,Number(t.nominal_dibayar||0))):e,0),r=t.reduce((e,t)=>t.status===`Lunas`?e:t.status===`Menunggu Verifikasi`||t.status===`Ditolak`?e+Number(t.nominal_tagihan||0):e+Math.max(0,Number(t.nominal_tagihan||0)-Number(t.nominal_dibayar||0)),0),i=n+r,a=i>0?Math.round(n/i*100):100;return{totalTagihan:i,sudahBayar:n,tunggakan:r,pctBayar:a,pctTunggak:i>0?100-a:0,isLunas:r===0,bills:t}}function xt(){let e=c.profiles.filter(e=>a(e.role));if(e.length===0)return`<div class="card glass-panel" style="margin-bottom:20px;"><p class="meta-line">Belum ada mahasiswa untuk diagram absensi.</p></div>`;let t=e.some(e=>e.id===c.filters.selectedDiagramStudentId)?c.filters.selectedDiagramStudentId:e[0].id;c.filters.selectedDiagramStudentId=t;let n=e.find(e=>e.id===t),r=n?[n,...e.filter(e=>e.id!==t)]:e,i=V(t),o=Math.max(1,i.total),s=[{label:`Hadir`,count:i.hadir,color:`#22c55e`},{label:`Izin`,count:i.izin,color:`#00d4ff`},{label:`Sakit`,count:i.sakit,color:`#ff7b00`},{label:`Alpha / Belum`,count:i.alpha,color:`#ef4444`}],l=2*Math.PI*52,u=0,d=i.total===0?`<circle cx="74" cy="74" r="52" fill="none" stroke="var(--track-ring)" stroke-width="18"></circle>`:s.map(e=>{let t=e.count/o*l,n=`<circle cx="74" cy="74" r="52" fill="none" stroke="${e.color}" stroke-width="18" stroke-dasharray="${t} ${l-t}" stroke-dashoffset="${-u}" transform="rotate(-90 74 74)"></circle>`;return u+=t,n}).join(``);return`
    <div class="card glass-panel" style="margin-bottom:20px;">
      <div class="card-header">
        <div>
          <h3>Diagram Absensi Mahasiswa</h3>
          <span class="meta-line">Mahasiswa terpilih otomatis tampil paling atas · Klik nama untuk melihat detail donat</span>
        </div>
        <select id="diagram-student-select" class="card-header-select">
          ${e.map(e=>`<option value="${e.id}" ${e.id===t?`selected`:``}>${_(e.nama_lengkap)} (${_(e.npm)})</option>`).join(``)}
        </select>
      </div>

      <div class="grid-2 grid-2-start" style="margin-bottom:0;">
        <div class="student-chart-list student-scroll-5">
          ${r.map(e=>{let n=V(e.id),r=Math.max(1,n.total);return`
                <div class="student-bar-row ${e.id===t?`selected`:``}" data-diagram-student="${e.id}">
                  <div class="student-bar-head">
                    <strong>${_(e.nama_lengkap)} <span class="meta-line" style="display:inline;">(${_(e.npm)})</span></strong>
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
              <strong>${_(n?.nama_lengkap||`-`)}</strong>
              <span class="meta-line tabular-nums">NPM: ${_(n?.npm||`-`)}</span>
            </div>
            ${s.map(e=>`
              <div class="legend-row">
                <span class="legend-label">
                  <span class="legend-swatch" style="background:${e.color}"></span>
                  ${e.label}
                </span>
                <strong class="tabular-nums">${e.count} (${i.total===0?0:Math.round(e.count/o*100)}%)</strong>
              </div>
            `).join(``)}
          </div>
        </div>
      </div>
    </div>
  `}function St(){let e=c.profiles.filter(e=>o(e.role));if(e.length===0)return`<div class="card glass-panel" style="margin-bottom:20px;"><p class="meta-line">Belum ada mahasiswa untuk diagram kas.</p></div>`;let t=e.some(e=>e.id===c.filters.selectedKasDiagramStudentId)?c.filters.selectedKasDiagramStudentId:e[0].id;c.filters.selectedKasDiagramStudentId=t;let n=e.find(e=>e.id===t),r=n?[n,...e.filter(e=>e.id!==t)]:e,i=H(t),a=2*Math.PI*52,s=[{label:`Sudah Bayar`,amount:i.sudahBayar,pct:i.pctBayar,color:`#22c55e`},{label:`Tunggakan`,amount:i.tunggakan,pct:i.pctTunggak,color:`#ef4444`}],l=0,u=i.totalTagihan===0?`<circle cx="74" cy="74" r="52" fill="none" stroke="#22c55e" stroke-width="18"></circle>`:s.map(e=>{let t=e.amount/Math.max(1,i.totalTagihan)*a,n=`<circle cx="74" cy="74" r="52" fill="none" stroke="${e.color}" stroke-width="18" stroke-dasharray="${t} ${a-t}" stroke-dashoffset="${-l}" transform="rotate(-90 74 74)"></circle>`;return l+=t,n}).join(``);return`
    <div class="card glass-panel" style="margin-bottom:20px;">
      <div class="card-header">
        <div>
          <h3>Diagram Kas Per Mahasiswa</h3>
          <span class="meta-line">Persentase lunas (Hijau) vs sisa tunggakan (Merah) · Mahasiswa terpilih tampil paling atas</span>
        </div>
        <select id="diagram-kas-student-select" class="card-header-select">
          ${e.map(e=>`<option value="${e.id}" ${e.id===t?`selected`:``}>${_(e.nama_lengkap)} (${_(e.npm)})</option>`).join(``)}
        </select>
      </div>

      <div class="grid-2 grid-2-start" style="margin-bottom:0;">
        <div class="student-chart-list student-scroll-5">
          ${r.map(e=>{let n=H(e.id);return`
                <div class="student-bar-row ${e.id===t?`selected`:``}" data-kas-diagram-student="${e.id}">
                  <div class="student-bar-head">
                    <strong>
                      ${_(e.nama_lengkap)}
                      <span class="status-tag ${n.isLunas?`tag-success`:`tag-danger`}" style="margin-left:6px;">
                        ${n.isLunas?`Sudah Lunas`:`Belum Lunas`}
                      </span>
                    </strong>
                    <span class="tabular-nums ${n.isLunas?`text-success`:`text-danger`}">
                      ${g(n.sudahBayar)} (${n.pctBayar}%)
                    </span>
                  </div>
                  <div class="stacked-bar-track" title="Sudah Bayar: ${g(n.sudahBayar)} (${n.pctBayar}%), Tunggakan: ${g(n.tunggakan)} (${n.pctTunggak}%)">
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
                <strong>${_(n?.nama_lengkap||`-`)}</strong>
                <span class="meta-line tabular-nums">NPM: ${_(n?.npm||`-`)}</span>
              </div>
              <span class="status-tag ${i.isLunas?`tag-success`:`tag-danger`}">${i.isLunas?`Sudah Lunas`:`Belum Lunas`}</span>
            </div>
            ${s.map(e=>`
              <div class="legend-row">
                <span class="legend-label">
                  <span class="legend-swatch" style="background:${e.color}"></span>
                  ${e.label}
                </span>
                <strong class="tabular-nums">${g(e.amount)} (${e.pct}%)</strong>
              </div>
            `).join(``)}
            <div class="legend-row" style="border-top:1px solid var(--glass-border);padding-top:6px;margin-top:4px;">
              <span class="legend-label">Total Tagihan Kas</span>
              <strong class="tabular-nums text-cyan">${g(i.totalTagihan)}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  `}function Ct(){document.getElementById(`diagram-student-select`)?.addEventListener(`change`,e=>{c.filters.selectedDiagramStudentId=e.target.value,R()}),document.querySelectorAll(`[data-diagram-student]`).forEach(e=>{e.addEventListener(`click`,()=>{c.filters.selectedDiagramStudentId=e.getAttribute(`data-diagram-student`),R()})}),document.getElementById(`diagram-kas-student-select`)?.addEventListener(`change`,e=>{c.filters.selectedKasDiagramStudentId=e.target.value,R()}),document.querySelectorAll(`[data-kas-diagram-student]`).forEach(e=>{e.addEventListener(`click`,()=>{c.filters.selectedKasDiagramStudentId=e.getAttribute(`data-kas-diagram-student`),R()})})}function wt(){let e=c.profiles.filter(e=>a(e.role)),t=[...c.sesiAbsensi].sort((e,t)=>Number(e.pertemuan_ke||0)-Number(t.pertemuan_ke||0)||new Date(e.created_at||0)-new Date(t.created_at||0)),n=t.reduce((e,t)=>Math.max(e,Number(t.pertemuan_ke||0)),0),r=Math.max(14,Number(c.pengaturan?.total_pertemuan_semester||14),n),i=[];for(let e=1;e<=r;e+=1){let n=t.filter(t=>Number(t.pertemuan_ke||1)===e),r=n.length>0?n.map(t=>({pertemuan:e,session:t,label:t.mata_kuliah||`-`})):[{pertemuan:e,session:null,label:`-`}];i.push({pertemuan:e,sessions:n,slots:r})}let o=i.flatMap(e=>e.slots),s=i.flatMap(e=>e.sessions);return{groups:i,orderedSlots:o,orderedSessions:s,rows:e.map(e=>{let t=V(e.id),n=o.map(t=>{if(!t.session)return{session:null,record:null,label:`-`};let n=c.absensi.find(n=>n.sesi_id===t.session.id&&n.user_id===e.id)||null;return{session:t.session,record:n,label:n?n.status_kehadiran:`-`}}),r=n.filter(e=>!!e.session),i=s.length>0?r.filter(e=>e.label===`Hadir`).length:t.hadir,a=s.length>0?r.filter(e=>e.record).length:t.total,l=s.length>0?s.length:t.total;return{student:e,cells:n,totalCatatan:a,pctHadir:l>0?Math.round(i/l*100):0,hadirCount:i}})}}function Tt(){let e=[`Januari`,`Februari`,`Maret`,`April`,`Mei`,`Juni`,`Juli`,`Agustus`,`September`,`Oktober`,`November`,`Desember`],t=c.profiles.filter(e=>o(e.role)),n=[],r=new Set;c.iuranKas.forEach(e=>{let t=String(e.periode||``).trim();t&&!r.has(t)&&(r.add(t),n.push(t))});let i=n.map(t=>{let n=t.toLowerCase(),r=e.findIndex(e=>n.includes(e.toLowerCase())),i=r>=0?e[r]:`Periode Lainnya`,a=t.match(/(20\d{2})/),o=a?Number(a[1]):9999,s=t.match(/(?:minggu|pekan|m|ke[- ]?)\s*(\d+)/i)||t.match(/^(\d+)/),c=s?Number(s[1]):99;return{periode:t,monthIdx:r>=0?r:99,monthLabel:i,yearNum:o,slotOrder:c}}).sort((e,t)=>e.yearNum-t.yearNum||e.monthIdx-t.monthIdx||e.slotOrder-t.slotOrder),a=new Set(i.map(e=>e.yearNum).filter(e=>e!==9999)),s=new Map;i.forEach(e=>{let t=`${e.yearNum}-${e.monthLabel}`,n=e.yearNum!==9999&&a.size>1?`${e.monthLabel} ${e.yearNum}`:e.monthLabel;s.has(t)||s.set(t,{monthLabel:n,slots:[]});let r=s.get(t),i=e.slotOrder===99?String(r.slots.length+1):String(e.slotOrder);r.slots.push({periode:e.periode,subLabel:i})});let l=Array.from(s.values()),u=l.flatMap(e=>e.slots);return{monthGroups:l,orderedSlots:u,rows:t.map(e=>{let t=H(e.id);return{student:e,slotCells:u.map(t=>({slot:t,bill:c.iuranKas.find(n=>n.user_id===e.id&&n.periode===t.periode)||null})),totalDibayar:t.sudahBayar,tunggakan:t.tunggakan,isLunas:t.isLunas}})}}function Et(){let e=c.currentUser?.role||`admin`,t=e===`admin`,n=e===`bendahara`,r=t||e===`ketua`,i=t||n||e===`ketua`,a=t||n,{groups:s,orderedSlots:l,orderedSessions:u,rows:d}=wt(),{monthGroups:f,orderedSlots:p,rows:m}=Tt(),h=c.profiles.filter(e=>o(e.role)),v=m.reduce((e,t)=>e+t.totalDibayar,0),y=m.reduce((e,t)=>e+t.tunggakan,0),b=m.filter(e=>e.isLunas).length;return`
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

    ${r?xt():``}
    ${a?St():``}

    ${i?`
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
                    ${s.map(e=>`<th colspan="${e.slots.length}">Pertemuan ${e.pertemuan}</th>`).join(``)}
                    <th rowspan="2">Persentase Hadir</th>
                  </tr>
                  <tr>
                    ${l.map(e=>`<th class="grouped-matrix-subth">${_(e.label)}</th>`).join(``)}
                  </tr>
                </thead>
                <tbody>
                  ${d.length===0?`<tr><td colspan="${3+l.length}" class="text-center">Belum ada mahasiswa terdaftar.</td></tr>`:d.map(e=>`
                        <tr>
                          <td class="tabular-nums">${_(e.student.npm)}</td>
                          <td><strong>${_(e.student.nama_lengkap)}</strong></td>
                          ${e.cells.map(e=>e.record?`<td class="grouped-matrix-cell-center">
                                  <button type="button" class="status-tag ${x(e.label)} btn-detail-absen" style="cursor:pointer;" data-absen-id="${e.record.id}" data-sesi-id="${e.session.id}" title="Klik untuk melihat foto, PJ, dan GPS">
                                    ${_(e.label)}
                                  </button>
                                </td>`:`<td class="grouped-matrix-cell-center"><span class="${e.label===`-`?`meta-line`:`status-tag ${x(e.label)}`}">${_(e.label)}</span></td>`).join(``)}
                          <td class="tabular-nums grouped-matrix-cell-center" title="${e.hadirCount}/${u.length} sesi hadir"><strong>${e.pctHadir}%</strong></td>
                        </tr>
                      `).join(``)}
                </tbody>
              </table>
            </div>
          </div>
        `:``}

    ${a?`
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
                    ${f.length>0?f.map(e=>`<th colspan="${e.slots.length}">${_(e.monthLabel)}</th>`).join(``):`<th>Periode Kas</th>`}
                    <th rowspan="2">Total Dibayar</th>
                    <th rowspan="2">Tunggakan</th>
                    <th rowspan="2">Status</th>
                  </tr>
                  <tr>
                    ${p.length>0?p.map(e=>`<th class="grouped-matrix-subth" title="${_(e.periode)}">${_(e.subLabel)}</th>`).join(``):`<th class="grouped-matrix-subth">-</th>`}
                  </tr>
                </thead>
                <tbody>
                  ${m.length===0?`<tr><td colspan="${5+Math.max(1,p.length)}" class="text-center">Belum ada data kas mahasiswa.</td></tr>`:m.map(e=>`
                        <tr>
                          <td class="tabular-nums">${_(e.student.npm)}</td>
                          <td><strong>${_(e.student.nama_lengkap)}</strong></td>
                          ${p.length===0?`<td class="grouped-matrix-cell-center"><span class="meta-line">-</span></td>`:e.slotCells.map(e=>{let t=e.bill;return t?t.status===`Lunas`?`<td class="tabular-nums text-success grouped-matrix-cell-center" title="${_(e.slot.periode)}"><strong>${g(t.nominal_dibayar||t.nominal_tagihan)}</strong></td>`:t.status===`Menunggu Verifikasi`?`<td class="grouped-matrix-cell-center" title="${_(e.slot.periode)}"><span class="status-tag tag-coral">Menunggu</span></td>`:t.status===`Ditolak`?`<td class="grouped-matrix-cell-center" title="${_(e.slot.periode)}"><span class="status-tag tag-danger">Ditolak</span></td>`:Number(t.nominal_dibayar||0)>0?`<td class="tabular-nums text-warning grouped-matrix-cell-center" title="${_(e.slot.periode)}">${g(t.nominal_dibayar)}</td>`:`<td class="grouped-matrix-cell-center" title="${_(e.slot.periode)}"><span class="meta-line">-</span></td>`:`<td class="grouped-matrix-cell-center"><span class="meta-line">-</span></td>`}).join(``)}
                          <td class="tabular-nums text-success grouped-matrix-cell-center"><strong>${g(e.totalDibayar)}</strong></td>
                          <td class="tabular-nums ${e.tunggakan>0?`text-danger`:`text-success`} grouped-matrix-cell-center"><strong>${g(e.tunggakan)}</strong></td>
                          <td class="grouped-matrix-cell-center"><span class="status-tag ${e.isLunas?`tag-success`:`tag-danger`}">${e.isLunas?`Lunas`:`Belum Lunas`}</span></td>
                        </tr>
                      `).join(``)}
                </tbody>
                ${m.length>0?`
                      <tfoot>
                        <tr class="grouped-matrix-tfoot">
                          <td colspan="${2+Math.max(1,p.length)}"><strong>Total Akumulasi Kas Kelas (${m.length} Mahasiswa)</strong></td>
                          <td class="tabular-nums text-success grouped-matrix-cell-center"><strong>${g(v)}</strong></td>
                          <td class="tabular-nums ${y>0?`text-danger`:`text-success`} grouped-matrix-cell-center"><strong>${g(y)}</strong></td>
                          <td class="grouped-matrix-cell-center"><strong>${b}/${m.length} Lunas</strong></td>
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
                  ${h.length===0?`<tr><td colspan="5" class="text-center">Belum ada mahasiswa terdaftar.</td></tr>`:h.map(e=>{let t=H(e.id);return`
                              <tr>
                                <td class="tabular-nums">${_(e.npm)}</td>
                                <td><strong>${_(e.nama_lengkap)}</strong></td>
                                <td class="tabular-nums text-success"><strong>${g(t.sudahBayar)}</strong></td>
                                <td class="tabular-nums ${t.tunggakan>0?`text-danger`:`text-success`}"><strong>${t.tunggakan>0?g(t.tunggakan):`-`}</strong></td>
                                <td><span class="status-tag ${t.isLunas?`tag-success`:`tag-danger`}">${t.isLunas?`Lunas`:`Belum Lunas`}</span></td>
                              </tr>
                            `}).join(``)}
                </tbody>
              </table>
            </div>
          </div>
        `:``}
  `}function Dt(){Ct(),document.querySelectorAll(`.btn-detail-absen`).forEach(e=>{e.addEventListener(`click`,()=>{Ae(e.getAttribute(`data-absen-id`),e.getAttribute(`data-sesi-id`))})});let e=c.currentUser?.role||`admin`,t=e===`admin`,n=e===`bendahara`,r=()=>{let{groups:e,orderedSlots:t,rows:n}=wt(),r=[`NIM`,`Nama Mahasiswa`,...e.flatMap(e=>e.slots.map((t,n)=>n===0?`Pertemuan ${e.pertemuan}`:``)),`Persentase Hadir`],i=[``,``,...t.map(e=>e.label||`-`),``],a=[{r1:0,c1:0,r2:1,c2:0},{r1:0,c1:1,r2:1,c2:1}],o=2;e.forEach(e=>{e.slots.length>1&&a.push({r1:0,c1:o,r2:0,c2:o+e.slots.length-1}),o+=e.slots.length}),a.push({r1:0,c1:o,r2:1,c2:o});let s=n.map(e=>[e.student.npm,e.student.nama_lengkap,...e.cells.map(e=>e.label),`${e.pctHadir}%`]);return{name:`Matriks Kehadiran`,headerRows:[r,i],merges:a,rows:s}},i=()=>{let{orderedSlots:e,rows:t}=wt();return t.map(t=>{let n={NIM:t.student.npm,"Nama Mahasiswa":t.student.nama_lengkap};return e.forEach((e,r)=>{let i=e.session?`Pertemuan ${e.pertemuan} - ${e.label}`:`Pertemuan ${e.pertemuan}`;n[i]=t.cells[r]?.label||`-`}),n[`Persentase Hadir`]=`${t.pctHadir}%`,n})},s=()=>c.profiles.filter(e=>a(e.role)).map(e=>{let t=V(e.id);return{NIM:e.npm,"Nama Mahasiswa":e.nama_lengkap,Hadir:t.hadir,Izin:t.izin,Sakit:t.sakit,"Alpha / Belum Absen":t.alpha,"Total Catatan":t.total,"Persentase Hadir":`${t.pct}%`}}),u=()=>c.profiles.filter(e=>o(e.role)).map(e=>{let t=H(e.id);return{NIM:e.npm,"Nama Mahasiswa":e.nama_lengkap,"Total Dibayar":t.sudahBayar,Tunggakan:t.tunggakan,Status:t.isLunas?`Lunas`:`Belum Lunas`}}),d=()=>{let{monthGroups:e,orderedSlots:t,rows:n}=Tt();if(!t.length)return{name:`Matriks Kas Periode`,rows:n.map(e=>({NIM:e.student.npm,"Nama Mahasiswa":e.student.nama_lengkap,"Periode Kas":`Belum ada tagihan`,"Total Dibayar":e.totalDibayar,Tunggakan:e.tunggakan,Status:e.isLunas?`Lunas`:`Belum Lunas`}))};let r=[`NIM`,`Nama Mahasiswa`,...e.flatMap(e=>e.slots.map((t,n)=>n===0?e.monthLabel:``)),`Total Dibayar`,`Tunggakan`,`Status`],i=[``,``,...t.map(e=>`${e.subLabel}`),``,``,``],a=[{r1:0,c1:0,r2:1,c2:0},{r1:0,c1:1,r2:1,c2:1}],o=2;e.forEach(e=>{e.slots.length>1&&a.push({r1:0,c1:o,r2:0,c2:o+e.slots.length-1}),o+=e.slots.length}),a.push({r1:0,c1:o,r2:1,c2:o},{r1:0,c1:o+1,r2:1,c2:o+1},{r1:0,c1:o+2,r2:1,c2:o+2});let s=n.map(e=>[e.student.npm,e.student.nama_lengkap,...e.slotCells.map(({bill:e})=>e?e.status===`Menunggu Verifikasi`?`Menunggu`:e.status===`Ditolak`?`Ditolak`:Number(e.nominal_dibayar||0):0),e.totalDibayar,e.tunggakan,e.isLunas?`Lunas`:`Belum Lunas`]),l=n.reduce((e,t)=>e+t.totalDibayar,0),u=n.reduce((e,t)=>e+t.tunggakan,0),d=n.filter(e=>e.isLunas).length,f=[`TOTAL`,`${n.length} Mahasiswa`,...t.map(e=>c.iuranKas.filter(t=>t.periode===e.periode&&(t.status===`Lunas`||t.status===`Belum Lunas`)).reduce((e,t)=>e+Number(t.nominal_dibayar||0),0)),l,u,`${d}/${n.length} Lunas`];return{name:`Matriks Kas Periode`,headerRows:[r,i],merges:a,rows:s,footerRow:f}},f=()=>{let e=Object.fromEntries(c.profiles.map(e=>[e.id,e]));return c.transaksiKas.map((t,n)=>({No:n+1,Tanggal:h(t.tanggal),Jenis:t.jenis,Kategori:t.kategori,Keterangan:t.keterangan,"Nama Pengirim":t.pengirim_nama||`-`,"Penanggung Jawab":t.pj_nama||(t.jenis===`Pemasukan`&&!t.pj_id?`- (Dari Mahasiswa Sendiri)`:e[t.dicatat_oleh]?.nama_lengkap||`-`),Nominal:Number(t.nominal||0)}))};document.getElementById(`btn-export-xlsx`)?.addEventListener(`click`,()=>{if(n)return;let e=[r(),{name:`Rekap Absensi Mhs`,rows:s()}];t&&e.push(d(),{name:`Kas Per Mahasiswa`,rows:u()},{name:`Mutasi Kas`,rows:f()});let i=t?`Rekapan_Kelas_R3S_${l(new Date)}.xlsx`:`Rekap_Absensi_Kelas_R3S_${l(new Date)}.xlsx`;U(e,i),b(`File ${i} berhasil diunduh!`,`success`)}),document.getElementById(`btn-export-absensi-xlsx`)?.addEventListener(`click`,()=>{let e=`Matriks_Absensi_Keseluruhan_R3S_${l(new Date)}.xlsx`;U([r(),{name:`Rekap Absensi Mhs`,rows:s()}],e),b(`File ${e} berhasil diunduh!`,`success`)}),document.getElementById(`btn-export-rekap-mhs-xlsx`)?.addEventListener(`click`,()=>{if(n){let e=`Rekap_Kas_Per_Mahasiswa_R3S_${l(new Date)}.xlsx`;U([d(),{name:`Kas Per Mahasiswa`,rows:u()}],e),b(`File ${e} berhasil diunduh!`,`success`);return}let e=s(),t=`Rekap_Absensi_Per_Mahasiswa_R3S_${l(new Date)}.xlsx`;U([{name:`Rekap Per Mahasiswa`,rows:e}],t),b(`File ${t} berhasil diunduh!`,`success`)}),document.getElementById(`btn-export-kas-xlsx`)?.addEventListener(`click`,()=>{let e=`Rekap_Kas_Kelas_R3S_${l(new Date)}.xlsx`;U([d(),{name:`Kas Per Mahasiswa`,rows:u()},{name:`Mutasi Kas`,rows:f()}],e),b(`File ${e} berhasil diunduh!`,`success`)}),document.getElementById(`btn-export-csv`)?.addEventListener(`click`,()=>{if(n){let e=u(),t=`Rekap_Kas_Per_Mahasiswa_R3S_${l(new Date)}.csv`;Zt(e,t),b(`File ${t} berhasil diunduh!`,`success`);return}let e=i(),t=`Rekapan_Absensi_R3S_${l(new Date)}.csv`;Zt(e,t),b(`File ${t} berhasil diunduh!`,`success`)})}function Ot(e){return String(e??``).replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g,``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&apos;`)}function kt(e){return String(e||`Sheet1`).replace(/[\\/*?:\[\]]/g,` `).trim().slice(0,31)||`Sheet1`}var At=(()=>{let e=new Uint32Array(256);for(let t=0;t<256;t++){let n=t;for(let e=0;e<8;e++)n=n&1?3988292384^n>>>1:n>>>1;e[t]=n>>>0}return e})();function jt(e){let t=4294967295;for(let n=0;n<e.length;n++)t=At[(t^e[n])&255]^t>>>8;return(t^4294967295)>>>0}function Mt(e,t){let n=new TextEncoder,r=new Date,i=(r.getHours()&31)<<11|(r.getMinutes()&63)<<5|r.getSeconds()>>1&31,a=(Math.max(1980,r.getFullYear())-1980&127)<<9|(r.getMonth()+1&15)<<5|r.getDate()&31,o=[],s=[],c=0;e.forEach(e=>{let t=n.encode(e.path),r=e.content instanceof Uint8Array?e.content:n.encode(String(e.content??``)),l=jt(r),u=new Uint8Array(30+t.length),d=new DataView(u.buffer);d.setUint32(0,67324752,!0),d.setUint16(4,20,!0),d.setUint16(6,2048,!0),d.setUint16(8,0,!0),d.setUint16(10,i,!0),d.setUint16(12,a,!0),d.setUint32(14,l,!0),d.setUint32(18,r.length,!0),d.setUint32(22,r.length,!0),d.setUint16(26,t.length,!0),d.setUint16(28,0,!0),u.set(t,30);let f=new Uint8Array(46+t.length),p=new DataView(f.buffer);p.setUint32(0,33639248,!0),p.setUint16(4,20,!0),p.setUint16(6,20,!0),p.setUint16(8,2048,!0),p.setUint16(10,0,!0),p.setUint16(12,i,!0),p.setUint16(14,a,!0),p.setUint32(16,l,!0),p.setUint32(20,r.length,!0),p.setUint32(24,r.length,!0),p.setUint16(28,t.length,!0),p.setUint16(30,0,!0),p.setUint16(32,0,!0),p.setUint16(34,0,!0),p.setUint16(36,0,!0),p.setUint32(38,0,!0),p.setUint32(42,c,!0),f.set(t,46),o.push(u,r),s.push(f),c+=u.length+r.length});let l=s.reduce((e,t)=>e+t.length,0),u=new Uint8Array(22),d=new DataView(u.buffer);return d.setUint32(0,101010256,!0),d.setUint16(4,0,!0),d.setUint16(6,0,!0),d.setUint16(8,e.length,!0),d.setUint16(10,e.length,!0),d.setUint32(12,l,!0),d.setUint32(16,c,!0),d.setUint16(20,0,!0),new Blob([...o,...s,u],{type:t})}function Nt(e){let t=e+1,n=``;for(;t>0;){let e=(t-1)%26;n=String.fromCharCode(65+e)+n,t=Math.floor((t-1)/26)}return n}function Pt(e,t,n,r){let i=`${Nt(e)}${t}`;if(typeof n==`number`&&Number.isFinite(n))return`<c r="${i}" t="n" s="${r}"><v>${n}</v></c>`;let a=String(n??``),o=Ot(a);return`<c r="${i}" t="inlineStr" s="${r}"><is><t${/^\s|\s$/.test(a)?` xml:space="preserve"`:``}>${o}</t></is></c>`}function Ft(e){let t=[],n=[],r=[],i=null;if(Array.isArray(e.headerRows)&&e.headerRows.length)t=e.headerRows,n=Array.isArray(e.rows)?e.rows:[],r=Array.isArray(e.merges)?e.merges:[],i=Array.isArray(e.footerRow)?e.footerRow:null;else{let r=Array.isArray(e.rows)?e.rows:[],i=r.length?Object.keys(r[0]):[`Informasi`],a=r.length?r:[{Informasi:`Belum ada data tersedia`}];t=[i],n=a.map(e=>i.map(t=>e[t]??``))}let a=Math.max(1,...t.map(e=>e.length),...n.map(e=>e.length),i?i.length:0),o=`<cols>${Array.from({length:a},(e,r)=>{let a=[...t.map(e=>String(e[r]??``).length),...n.map(e=>String(e[r]??``).length),i?String(i[r]??``).length:0],o=Math.max(4,...a);return Math.min(44,Math.max(10,Math.round(o*1.15+4)))}).map((e,t)=>`<col min="${t+1}" max="${t+1}" width="${e}" customWidth="1"/>`).join(``)}</cols>`,s=[],c=1;if(t.forEach((e,t)=>{let n=t===0?1:2,r=Array.from({length:a},(t,r)=>Pt(r,c,e[r]??``,n)).join(``);s.push(`<row r="${c}" ht="24" customHeight="1">${r}</row>`),c+=1}),n.forEach(e=>{let t=Array.from({length:a},(t,n)=>Pt(n,c,e[n]??``,n>=2?3:0)).join(``);s.push(`<row r="${c}" ht="20" customHeight="1">${t}</row>`),c+=1}),i){let e=Array.from({length:a},(e,t)=>Pt(t,c,i[t]??``,4)).join(``);s.push(`<row r="${c}" ht="22" customHeight="1">${e}</row>`)}let l=r.length?`<mergeCells count="${r.length}">${r.map(e=>`<mergeCell ref="${Nt(e.c1)}${e.r1+1}:${Nt(e.c2)}${e.r2+1}"/>`).join(``)}</mergeCells>`:``;return`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetViews><sheetView workbookViewId="0"/></sheetViews><sheetFormatPr defaultRowHeight="20"/>`+o+`<sheetData>${s.join(``)}</sheetData>`+l+`</worksheet>`}function U(e,t){let n=(e&&e.length?e:[{name:`Data`,rows:[]}]).map((e,t)=>({...e,safeName:kt(e.name||`Sheet${t+1}`),sheetNum:t+1})),r=new Set;n.forEach(e=>{let t=e.safeName,n=2;for(;r.has(t.toLowerCase());){let r=` ${n++}`;t=`${e.safeName.slice(0,Math.max(1,31-r.length))}${r}`}r.add(t.toLowerCase()),e.safeName=t});let i=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>`+n.map(e=>`<Override PartName="/xl/worksheets/sheet${e.sheetNum}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join(``)+`</Types>`,a=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">`+n.map(e=>`<Relationship Id="rId${e.sheetNum}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${e.sheetNum}.xml"/>`).join(``)+`<Relationship Id="rId${n.length+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`,o=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>`+n.map(e=>`<sheet name="${Ot(e.safeName)}" sheetId="${e.sheetNum}" r:id="rId${e.sheetNum}"/>`).join(``)+`</sheets></workbook>`,s=[{path:`[Content_Types].xml`,content:i},{path:`_rels/.rels`,content:`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`},{path:`xl/_rels/workbook.xml.rels`,content:a},{path:`xl/workbook.xml`,content:o},{path:`xl/styles.xml`,content:`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="3"><font><sz val="10"/><color rgb="FF0F172A"/><name val="Calibri"/></font><font><b/><sz val="10"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font><font><b/><sz val="10"/><color rgb="FF0F172A"/><name val="Calibri"/></font></fonts><fills count="5"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF0B2647"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FF1D4ED8"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFF1F5F9"/></patternFill></fill></fills><borders count="2"><border><left/><right/><top/><bottom/><diagonal/></border><border><left style="thin"><color rgb="FFCBD5E1"/></left><right style="thin"><color rgb="FFCBD5E1"/></right><top style="thin"><color rgb="FFCBD5E1"/></top><bottom style="thin"><color rgb="FFCBD5E1"/></bottom><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="5"><xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf><xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf><xf numFmtId="0" fontId="1" fillId="3" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf><xf numFmtId="0" fontId="2" fillId="4" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>`},...n.map(e=>({path:`xl/worksheets/sheet${e.sheetNum}.xml`,content:Ft(e)}))],c=t.toLowerCase().endsWith(`.xlsx`)?t:`${t.replace(/\.xls$/i,``)}.xlsx`,l=Mt(s,`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`),u=URL.createObjectURL(l),d=document.createElement(`a`);d.href=u,d.download=c,d.click(),URL.revokeObjectURL(u)}function W(e){return c.profiles.find(t=>t.role===e)||c.currentUser||c.profiles[0]||{id:``,nama_lengkap:`-`}}function G(){let e=(c.pengaturan||{}).nama_kelas||`R3S`,t=W(`bendahara`),n=W(`ketua`),r=W(`admin`);return{bendahara:{id:t.id,nama:t.nama_lengkap||`-`,jabatan:`Bendahara Kelas ${e}`},ketua:{id:n.id,nama:n.nama_lengkap||`-`,jabatan:`Ketua Kelas ${e}`},admin:{id:r.id,nama:r.nama_lengkap||`-`,jabatan:`Admin Penandatangan`}}}function It(){let e=c.currentUser?.role||`admin`,t=e===`admin`,n=e===`ketua`,r=e===`bendahara`,s=c.profiles.filter(e=>r||t?o(e.role):a(e.role)),d=c.filters.pdfMonth||l(new Date).slice(0,7),f=s.some(e=>e.id===c.filters.pdfStudentId)?c.filters.pdfStudentId:s[0]?.id||``;c.filters.pdfStudentId=f;let p=G();c.filters.pdfBendaharaId=p.bendahara.id,c.filters.pdfKetuaId=p.ketua.id,c.filters.pdfAdminId=p.admin.id;let h=c.sesiAbsensi.filter(e=>(e.tanggal||l(new Date(e.created_at))).startsWith(d));return`
    <div class="page-header">
      <div>
        <span class="meta-line">Dokumen Resmi Siap Cetak · Tanggal Waktu Nyata WIB &amp; Lembar Pengesahan PJ Terkunci</span>
        <h2>Laporan PDF Bulanan &amp; Per Mahasiswa</h2>
      </div>
      <div class="status-tag tag-info tabular-nums" id="pdf-realtime-clock">${_(u(new Date))}</div>
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
          <input type="month" id="pdf-month-input" value="${_(d)}" class="tabular-nums" />
        </div>
        <div class="field-group">
          <label for="pdf-student-select">Pilih Mahasiswa (Untuk Laporan PDF Per Mahasiswa)</label>
          <select id="pdf-student-select">
            ${s.map(e=>`<option value="${e.id}" ${e.id===f?`selected`:``}>${_(e.nama_lengkap)} (${_(e.npm)})${e.role===`pj_matkul`?` · PJ Matkul`:``}</option>`).join(``)}
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
                  value="${_(p.bendahara.nama)} (${_(i.bendahara)})"
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
                  value="${_(p.ketua.nama)} (${_(i.ketua)})"
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
                value="${_(p.admin.nama)} (${_(i.admin)})"
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
        >${_(c.filters.pdfEvaluationNote||``)}</textarea>
      </div>

      <div class="pdf-report-grid">
        ${t||r?`<div class="pdf-report-card">
                <div>
                  <h4>Laporan Kas Bulanan — Matriks, Total Uang &amp; Mutasi (PDF)</h4>
                  <p class="meta-line" style="margin-top:4px;">
                    Berisi tabel Uang Kas Per Periode Keseluruhan Mahasiswa, Total Uang Keseluruhan Mahasiswa, &amp; Mutasi Kas periode ${_(m(d))}.
                  </p>
                  <p class="meta-line" style="margin-top:6px;color:var(--accent-cyan);">
                    Dibuat Oleh: <strong>Bendahara</strong> (${_(p.bendahara.nama)})<br/>
                    Mengetahui / Disetujui Oleh: <strong>Admin</strong> (${_(p.admin.nama)})
                  </p>
                </div>
                <button type="button" id="btn-pdf-kas-bulanan" class="btn btn-primary btn-block">Unduh PDF Kas Keseluruhan</button>
              </div>`:``}

        ${t||n?`<div class="pdf-report-card">
                <div>
                  <h4>Laporan Absensi Bulanan — Keseluruhan Mahasiswa (PDF)</h4>
                  <p class="meta-line" style="margin-top:4px;">
                    Matriks kehadiran mahasiswa per pertemuan &amp; mata kuliah beserta persentase hadir bulan ${_(m(d))} (${h.length} sesi).
                  </p>
                  <p class="meta-line" style="margin-top:6px;color:var(--accent-cyan);">
                    Dibuat Oleh: <strong>Ketua</strong> (${_(p.ketua.nama)})<br/>
                    Mengetahui / Disetujui Oleh: <strong>Admin</strong> (${_(p.admin.nama)})
                  </p>
                </div>
                <button type="button" id="btn-pdf-absensi-bulanan" class="btn btn-primary btn-block">Unduh PDF Absensi Keseluruhan</button>
              </div>`:``}

        ${t?`<div class="pdf-report-card">
                <div>
                  <h4>Laporan Keseluruhan Rekapan (PDF)</h4>
                  <p class="meta-line" style="margin-top:4px;">
                    Gabungan lengkap matriks absensi keseluruhan, matriks kas per periode, total uang kas mahasiswa, &amp; mutasi kas bulan ${_(m(d))}.
                  </p>
                  <p class="meta-line" style="margin-top:6px;color:var(--accent-coral);">
                    Dibuat Oleh: <strong>Bendahara</strong> (${_(p.bendahara.nama)})<br/>
                    Mengetahui: <strong>Ketua</strong> (${_(p.ketua.nama)}) · Disetujui Oleh: <strong>Admin</strong> (${_(p.admin.nama)})
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
              Dibuat Oleh: <strong>${r?`Bendahara`:`Ketua`}</strong> (${_(r?p.bendahara.nama:p.ketua.nama)})<br/>
              Mengetahui / Disetujui Oleh: <strong>Admin</strong> (${_(p.admin.nama)})
            </p>
          </div>
          <button type="button" id="btn-pdf-per-mahasiswa" class="btn btn-secondary btn-block">Unduh PDF Per Mahasiswa</button>
        </div>
      </div>
    </div>
  `}var Lt=`./assets/aistudio/Code_Generated_Image__1__6558f03f.png`,K=null,q=null;async function J(){if(K)return K;if(q)return q;q=new Promise(e=>{let t=new Image;t.crossOrigin=`anonymous`,t.onload=()=>{try{let n=t.naturalWidth||400,r=t.naturalHeight||400,i=Math.min(480,n),a=Math.max(1,Math.round(r/n*i)),o=document.createElement(`canvas`);o.width=i,o.height=a;let s=o.getContext(`2d`);s.fillStyle=`#ffffff`,s.fillRect(0,0,i,a),s.drawImage(t,0,0,i,a);let c=o.toDataURL(`image/jpeg`,.92).split(`,`)[1]||``,l=atob(c),u=new Uint8Array(l.length);for(let e=0;e<l.length;e+=1)u[e]=l.charCodeAt(e);K={width:i,height:a,bytes:u},e(K)}catch{e(null)}},t.onerror=()=>e(null),t.src=Lt});let e=await q;return q=null,e}var Rt=class{constructor(e={}){let t=e.orientation===`landscape`;this.pageWidth=t?841.89:595.28,this.pageHeight=t?595.28:841.89,this.pages=[[]],this.currentPageIndex=0,this.fontStyle=`normal`,this.fontSize=10,this.textColor=[15,23,42],this.drawColor=[15,23,42],this.fillColor=[11,38,71],this.lineWidth=.75,this.lastAutoTable={finalY:120},this.images=[],this.imageMap={}}addImageJpeg(e,t,n,r){if(this.imageMap[e])return this.imageMap[e];let i=`Im${this.images.length+1}`;return this.images.push({resName:i,width:Number(t),height:Number(n),bytes:r}),this.imageMap[e]=i,i}drawImage(e,t,n,r,i){let a=this.imageMap[e];if(!a)return this;let o=(this.pageHeight-n-i).toFixed(2);return this._pushCmd(`q ${r.toFixed(2)} 0 0 ${i.toFixed(2)} ${t.toFixed(2)} ${o} cm /${a} Do Q`),this}_sanitizeText(e){return String(e??``).replace(/[\u2013\u2014]/g,`-`).replace(/\u2022/g,`*`).replace(/\u00b7/g,`|`).replace(/\u00d7/g,`x`).replace(/[\u2018\u2019]/g,`'`).replace(/[\u201c\u201d]/g,`"`).replace(/[^\x20-\x7E]/g,` `)}_escapePdfLiteral(e){return this._sanitizeText(e).replace(/\\/g,`\\\\`).replace(/\(/g,`\\(`).replace(/\)/g,`\\)`)}_fontResourceName(e=this.fontStyle){return e===`bold`?`F2`:e===`italic`?`F3`:`F1`}_charWidthRatio(e){return e===` `?.28:`ilIjtf.,:;'"!|`.includes(e)?.27:"r-()[]/\\`".includes(e)?.34:`mwMW@%&`.includes(e)?.82:e>=`A`&&e<=`Z`?.67:e>=`0`&&e<=`9`?.56:.52}getTextWidth(e,t=this.fontSize,n=this.fontStyle){let r=this._sanitizeText(e),i=0;for(let e=0;e<r.length;e+=1)i+=this._charWidthRatio(r[e]);let a=n===`bold`?1.06:1;return i*t*a}splitTextToSize(e,t,n=this.fontSize,r=this.fontStyle){let i=this._sanitizeText(e).trim();if(!i)return[``];let a=i.split(/\r?\n/),o=[];return a.forEach(e=>{let i=e.split(/\s+/).filter(Boolean);if(!i.length){o.push(``);return}let a=``;i.forEach(e=>{let i=a?`${a} ${e}`:e;if(this.getTextWidth(i,n,r)<=t)a=i;else if(a)o.push(a),a=e;else{let i=``;for(let a=0;a<e.length;a+=1){let s=i+e[a];this.getTextWidth(s,n,r)>t&&i?(o.push(i),i=e[a]):i=s}a=i}}),a&&o.push(a)}),o.length?o:[``]}_pushCmd(e){this.pages[this.currentPageIndex].push(e)}_rgbStr(e){return e.map(e=>Math.max(0,Math.min(1,Number(e||0)/255)).toFixed(3)).join(` `)}_pdfY(e){return(this.pageHeight-e).toFixed(2)}addPage(){return this.pages.push([]),this.currentPageIndex=this.pages.length-1,this}getNumberOfPages(){return this.pages.length}setPage(e){let t=Math.max(0,Math.min(this.pages.length-1,e-1));return this.currentPageIndex=t,this}setFont(e,t=`normal`){return this.fontStyle=t||`normal`,this}setFontSize(e){return this.fontSize=Number(e)||10,this}setTextColor(e,t,n){return this.textColor=[e,t,n],this}setDrawColor(e,t,n){return this.drawColor=[e,t,n],this}setFillColor(e,t,n){return this.fillColor=[e,t,n],this}setLineWidth(e){return this.lineWidth=Number(e)||.5,this}line(e,t,n,r){return this._pushCmd(`q ${this.lineWidth.toFixed(2)} w ${this._rgbStr(this.drawColor)} RG ${e.toFixed(2)} ${this._pdfY(t)} m ${n.toFixed(2)} ${this._pdfY(r)} l S Q`),this}rect(e,t,n,r,i=`F`){let a=(this.pageHeight-t-r).toFixed(2);return i===`F`?this._pushCmd(`q ${this._rgbStr(this.fillColor)} rg ${e.toFixed(2)} ${a} ${n.toFixed(2)} ${r.toFixed(2)} re f Q`):i===`FD`?this._pushCmd(`q ${this.lineWidth.toFixed(2)} w ${this._rgbStr(this.fillColor)} rg ${this._rgbStr(this.drawColor)} RG ${e.toFixed(2)} ${a} ${n.toFixed(2)} ${r.toFixed(2)} re B Q`):this._pushCmd(`q ${this.lineWidth.toFixed(2)} w ${this._rgbStr(this.drawColor)} RG ${e.toFixed(2)} ${a} ${n.toFixed(2)} ${r.toFixed(2)} re S Q`),this}text(e,t,n,r={}){let i=Array.isArray(e)?e:[String(e??``)],a=r.align||`left`,o=this._fontResourceName(this.fontStyle),s=this.fontSize*1.28;return i.forEach((e,r)=>{let i=this._sanitizeText(e),c=this.getTextWidth(i,this.fontSize,this.fontStyle),l=t;a===`center`?l=t-c/2:a===`right`&&(l=t-c);let u=n+r*s;this._pushCmd(`BT /${o} ${this.fontSize.toFixed(2)} Tf ${this._rgbStr(this.textColor)} rg 1 0 0 1 ${l.toFixed(2)} ${this._pdfY(u)} Tm (${this._escapePdfLiteral(i)}) Tj ET`)}),this}autoTable(e={}){let t=e.margin?.left??40,n=e.margin?.right??40,r=this.pageHeight-46,i=this.pageWidth-t-n,a=e.styles||{},o=a.fontSize??8.5,s=a.cellPadding??5,c=a.lineColor||[30,41,59],l=a.lineWidth??.55,u=a.textColor||[15,23,42],d=e.alternateRowStyles?.fillColor||[255,255,255],f=e.headStyles?.fillColor||[22,58,120],p=e.subHeadStyles?.fillColor||[29,78,216],m=e.headStyles?.textColor||[255,255,255],h=e.headStyles?.lineColor||[30,41,59],g=e.head||[],_=e.body||[],v=e.foot||[],y=e.columnStyles||{},b=e=>e&&typeof e==`object`&&!Array.isArray(e)?{content:String(e.content??``),colSpan:Math.max(1,Number(e.colSpan||1)),rowSpan:Math.max(1,Number(e.rowSpan||1)),styles:e.styles||{}}:{content:String(e??``),colSpan:1,rowSpan:1,styles:{}},x=g.length?g[0].reduce((e,t)=>e+b(t).colSpan,0):0,S=Math.max(x,_[0]?.length||0,v[0]?.length||0);if(S===0)return this;let C=Array.from({length:g.length},()=>Array(S).fill(!1)),w=[];for(let e=0;e<g.length;e+=1){let t=0;g[e].forEach(n=>{for(;t<S&&C[e][t];)t+=1;if(t>=S)return;let r=b(n),i=Math.max(1,Math.min(r.colSpan,S-t)),a=Math.max(1,Math.min(r.rowSpan,g.length-e));for(let n=0;n<a;n+=1)for(let r=0;r<i;r+=1)C[e+n][t+r]=!0;w.push({row:e,col:t,colSpan:i,rowSpan:a,cell:r}),t+=i})}let T=Array(S).fill(null),E=Array(S).fill(28),D=i;for(let e=0;e<S;e+=1)y[e]?.cellWidth&&(T[e]=Number(y[e].cellWidth),D-=T[e]);w.forEach(({col:e,colSpan:t,cell:n})=>{let r=this.getTextWidth(n.content,o,`bold`)+s*2+6;if(t===1)E[e]=Math.max(E[e],Math.min(180,r));else{let n=r/t;for(let r=0;r<t;r+=1)E[e+r]=Math.max(E[e+r],Math.min(140,n))}});for(let e=0;e<S;e+=1)T[e]===null&&[..._.map(t=>b(t[e]).content),...v.map(t=>b(t[e]).content)].forEach(t=>{let n=this.getTextWidth(t,o,`bold`)+s*2+6;E[e]=Math.max(E[e],Math.min(185,n))});let O=E.reduce((e,t,n)=>T[n]===null?e+t:e,0)||1,k=T.map((e,t)=>e===null?Math.max(24,E[t]/O*Math.max(80,D)):e),A=i/(k.reduce((e,t)=>e+t,0)||i);for(let e=0;e<S;e+=1)k[e]*=A;let j=[t];for(let e=0;e<S;e+=1)j.push(j[e]+k[e]);let M=e.startY??95,N=o*1.24,P=()=>{if(!g.length)return;let t=Array(g.length).fill(o*1.3+s*2+4),n=new Map;w.forEach((e,r)=>{let i=j[e.col+e.colSpan]-j[e.col],a=Math.max(12,i-s*2),c=this.splitTextToSize(e.cell.content,a,o,`bold`);if(n.set(r,c),e.rowSpan===1){let n=c.length*N+s*2+2;t[e.row]=Math.max(t[e.row],n)}}),w.forEach((e,r)=>{if(e.rowSpan>1){let i=(n.get(r)||[e.cell.content]).length*N+s*2+2,a=0;for(let n=e.row;n<e.row+e.rowSpan;n+=1)a+=t[n];i>a&&(t[e.row+e.rowSpan-1]+=i-a)}});let i=t.reduce((e,t)=>e+t,0);M+i>r&&(this.addPage(),M=42);let a=[M];for(let e=0;e<g.length;e+=1)a.push(a[e]+t[e]);w.forEach((t,r)=>{let i=j[t.col],c=j[t.col+t.colSpan]-i,u=a[t.row],d=a[t.row+t.rowSpan]-u,g=t.row===0?f:p,_=t.cell.styles.fillColor||g,v=t.cell.styles.textColor||m,y=t.cell.styles.halign||e.headStyles?.halign||`center`,b=n.get(r)||[t.cell.content];this.setFillColor(..._),this.setDrawColor(...h),this.setLineWidth(l),this.rect(i,u,c,d,`FD`),this.setFont(`helvetica`,`bold`),this.setFontSize(o),this.setTextColor(...v);let x=i+s;y===`center`?x=i+c/2:y===`right`&&(x=i+c-s);let S=u+(d-b.length*N)/2+o*.85;b.forEach((e,t)=>{this.text(e,x,S+t*N,{align:y})})}),M+=i},F=(t,n,i=0)=>{let a=Array(S).fill(null).map((e,n)=>b(t[n])),f=a.map((e,t)=>{let r=Math.max(12,k[t]-s*2),i=e.styles.fontStyle||(n.isFoot?`bold`:y[t]?.fontStyle||`normal`);return this.splitTextToSize(e.content,r,o,i)}),p=Math.max(1,...f.map(e=>e.length))*N+s*2+2;M+p>r&&(this.addPage(),M=42,P());for(let t=0;t<S;t+=1){let r=a[t],m=j[t],h=k[t],g=r.styles.fillColor||n.fillColor||(i%2==1?d:[255,255,255]);this.setFillColor(...g),this.setDrawColor(...c),this.setLineWidth(l),this.rect(m,M,h,p,`FD`);let _=r.styles.halign||(n.isFoot?e.footStyles?.halign||y[t]?.halign||`center`:y[t]?.halign||`center`),v=r.styles.fontStyle||(n.isFoot?`bold`:y[t]?.fontStyle||`normal`),b=r.styles.textColor||n.textColor||u;this.setFont(`helvetica`,v),this.setFontSize(o),this.setTextColor(...b);let x=m+s;_===`center`?x=m+h/2:_===`right`&&(x=m+h-s);let S=f[t].length*N,C=M+(p-S)/2+o*.85;f[t].forEach((e,t)=>{this.text(e,x,C+t*N,{align:_})})}M+=p};return P(),_.forEach((e,t)=>{F(e,{isFoot:!1,textColor:u},t)}),v.forEach(t=>{F(t,{isFoot:!0,fillColor:e.footStyles?.fillColor||[241,245,249],textColor:e.footStyles?.textColor||[11,38,71]})}),this.lastAutoTable={finalY:M},this}toUint8Array(){let e=new TextEncoder,t=[],n=[0],r=0,i=n=>{let i=e.encode(n);t.push(i),r+=i.length},a=e=>{t.push(e),r+=e.length};i(`%PDF-1.4
%R3S
`);let o=this.pages.length,s=[3,4,5],c=this.images.map((e,t)=>6+t),l=6+this.images.length,u=[];for(let e=0;e<o;e+=1)u.push(l+e*2);let d=(e,t)=>{n[e]=r,i(`${e} 0 obj\n${t}\nendobj\n`)},f=(e,t,o)=>{n[e]=r,i(`${e} 0 obj\n${t}`),a(o),i(`
endstream
endobj
`)};d(1,`<< /Type /Catalog /Pages 2 0 R >>`),d(2,`<< /Type /Pages /Kids [${u.map(e=>`${e} 0 R`).join(` `)}] /Count ${o} >>`),d(s[0],`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>`),d(s[1],`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>`),d(s[2],`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>`),this.images.forEach((e,t)=>{let n=c[t];f(n,`<< /Type /XObject /Subtype /Image /Width ${e.width} /Height ${e.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${e.bytes.length} >>\nstream\n`,e.bytes)});let p=this.images.length?` /XObject << ${this.images.map((e,t)=>`/${e.resName} ${c[t]} 0 R`).join(` `)} >>`:``;this.pages.forEach((t,n)=>{let r=l+n*2,i=r+1,a=t.join(`
`),o=e.encode(a).length;d(r,`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${this.pageWidth.toFixed(2)} ${this.pageHeight.toFixed(2)}] /Resources << /Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R >>${p} >> /Contents ${i} 0 R >>`),d(i,`<< /Length ${o} >>\nstream\n${a}\nendstream`)});let m=l+o*2,h=r;i(`xref\n0 ${m}\n0000000000 65535 f \n`);for(let e=1;e<m;e+=1)i(`${String(n[e]||0).padStart(10,`0`)} 00000 n \n`);i(`trailer\n<< /Size ${m} /Root 1 0 R >>\nstartxref\n${h}\n%%EOF`);let g=new Uint8Array(r),_=0;return t.forEach(e=>{g.set(e,_),_+=e.length}),g}save(e){let t=this.toUint8Array(),n=new Blob([t],{type:`application/pdf`}),r=URL.createObjectURL(n),i=document.createElement(`a`);i.href=r,i.download=e,i.click(),URL.revokeObjectURL(r)}};function zt(){return c.transaksiKas.filter(e=>e.jenis===`Pemasukan`).reduce((e,t)=>e+Number(t.nominal||0),0)-c.transaksiKas.filter(e=>e.jenis===`Pengeluaran`).reduce((e,t)=>e+Number(t.nominal||0),0)}function Y(e,t,n=new Date,r={}){let i=new Rt({orientation:`landscape`}),a=c.pengaturan||{},o=a.nama_kelas||`R3S`,s=Number(a.semester_aktif||3),l=Number(a.pertemuan_berjalan??0),d=Math.max(1,Number(a.total_pertemuan_semester||14)),f=i.pageWidth-40;i.setFont(`helvetica`,`bold`),i.setFontSize(8.5),i.setTextColor(71,85,105),i.text(`AKTIVITAS KELAS RS · PUSAT ABSENSI & KAS KELAS ${o.toUpperCase()}`,40,38),i.setFont(`helvetica`,`bold`),i.setFontSize(17.5),i.setTextColor(15,23,42),i.text(e,40,56),i.setDrawColor(15,23,42),i.setLineWidth(1.25),i.line(40,65,f,65);let p=[{label:`Kelas / Program`,value:`Kelas ${o}`},{label:`Semester / Pertemuan`,value:`Semester ${s} (${l}/${d} Pertemuan)`},{label:`Periode Laporan`,value:r.periodeLabel||t||`-`},{label:`Tanggal Cetak (Real-Time)`,value:u(n)},...Array.isArray(r.extraRows)?r.extraRows:[]],m=80;return p.forEach(e=>{i.setFont(`helvetica`,`normal`),i.setFontSize(9.2),i.setTextColor(71,85,105),i.text(e.label,40,m),i.text(`:`,182,m),i.setFont(`helvetica`,`bold`),i.setFontSize(9.2),i.setTextColor(15,23,42),i.text(String(e.value??`-`),192,m),m+=14}),{doc:i,startY:m+8,now:n}}function X(e,t,n,r=``){n>e.pageHeight-110&&(e.addPage(),n=48);let i=e.pageWidth-40;e.setFont(`helvetica`,`bold`),e.setFontSize(14),e.setTextColor(15,23,42),e.text(t,40,n);let a=n+14;return r&&(e.setFont(`helvetica`,`bold`),e.setFontSize(9.5),e.setTextColor(71,85,105),e.text(r,40,a),a+=8),e.setDrawColor(15,23,42),e.setLineWidth(1),e.line(40,a,i,a),a+12}function Bt(e,t,n,r=new Date,i=null){let a=n+24;a>e.pageHeight-155&&(e.addPage(),a=48);let o=e.pageWidth,s=o-40;e.setFont(`helvetica`,`bold`),e.setFontSize(11),e.setTextColor(15,23,42),e.text(`Lembar Pengesahan & Penanggung Jawab`,40,a),e.setFont(`helvetica`,`normal`),e.setFontSize(9.2),e.setTextColor(51,65,85),e.text(`Jakarta, ${f(r)} · ${p(r)}`,s,a,{align:`right`}),a+=22,i&&i.bytes&&e.addImageJpeg(`admin_stamp`,i.width,i.height,i.bytes);let c=t.length===3?[o*.2,o*.5,o*.8]:t.length===2?[o*.28,o*.72]:[o*.5];return t.forEach((t,n)=>{let r=c[n];if(e.setFont(`helvetica`,`normal`),e.setFontSize(9.5),e.setTextColor(30,41,59),e.text(t.roleLabel,r,a,{align:`center`}),(t.showAdminLogo||/disetujui/i.test(t.roleLabel||``)||/admin/i.test(t.title||``))&&i&&i.bytes){let t=54*(i.width/Math.max(1,i.height));e.drawImage(`admin_stamp`,r-t/2,a+6,t,54)}let o=a+68;e.setFont(`helvetica`,`bold`),e.setFontSize(10),e.setTextColor(11,31,58),e.text(t.name,r,o,{align:`center`});let s=Math.max(105,e.getTextWidth(t.name)+16);e.setDrawColor(15,23,42),e.setLineWidth(.8),e.line(r-s/2,o+3,r+s/2,o+3),e.setFont(`helvetica`,`italic`),e.setFontSize(8.8),e.setTextColor(100,116,139),e.text(t.title,r,o+16,{align:`center`})}),a+94}function Z(e,t){let n=(c.pengaturan||{}).nama_kelas||`R3S`,r=e.getNumberOfPages(),i=e.pageWidth-40,a=e.pageHeight-36,o=e.pageHeight-22;for(let s=1;s<=r;s++)e.setPage(s),e.setDrawColor(203,213,225),e.setLineWidth(.6),e.line(40,a,i,a),e.setFont(`helvetica`,`normal`),e.setFontSize(8.2),e.setTextColor(100,116,139),e.text(`Aktivitas Kelas RS · ${t} — Kelas ${n}`,40,o),e.text(`Halaman ${s} dari ${r}`,i,o,{align:`right`})}function Vt(e){let t=String(e||`-`);return t===`Hadir`||t===`Lunas`?{content:t,styles:{textColor:[22,163,74],fontStyle:`bold`,halign:`center`}}:t===`Izin`?{content:t,styles:{textColor:[217,119,6],fontStyle:`bold`,halign:`center`}}:t===`Sakit`?{content:t,styles:{textColor:[2,132,199],fontStyle:`bold`,halign:`center`}}:t===`Alpha`||t===`Belum Absen!`||t===`Blm Lunas`||t===`Belum Lunas`?{content:t,styles:{textColor:[220,38,38],fontStyle:`bold`,halign:`center`}}:{content:t,styles:{textColor:[71,85,105],halign:`center`}}}function Ht(e){let t=c.profiles.filter(e=>a(e.role)),n=[...e].sort((e,t)=>Number(e.pertemuan_ke||0)-Number(t.pertemuan_ke||0)),r=new Map;n.forEach(e=>{let t=Number(e.pertemuan_ke||1);r.has(t)||r.set(t,{pertemuan:t,sessions:[]}),r.get(t).sessions.push(e)});let i=Array.from(r.values()).sort((e,t)=>e.pertemuan-t.pertemuan),o=i.flatMap(e=>e.sessions);if(o.length===0)return{head:[[`NIM`,`Nama Mahasiswa`,`Keterangan`,`Persentase Hadir`]],body:t.length===0?[[`-`,`-`,`Belum ada data sesi absensi`,`0%`]]:t.map(e=>[{content:e.npm,styles:{fontStyle:`bold`}},e.nama_lengkap,`Belum ada sesi absensi pada periode ini`,{content:`0%`,styles:{fontStyle:`bold`}}]),columnStyles:{1:{halign:`left`}}};let s=[{content:`NIM`,rowSpan:2},{content:`Nama Mahasiswa`,rowSpan:2},...i.map(e=>({content:`Pertemuan ${e.pertemuan}`,colSpan:e.sessions.length})),{content:`Persentase Hadir`,rowSpan:2}],l=o.map(e=>e.mata_kuliah||`-`),u=t.map(e=>{let t=0,n=0,r=o.map(r=>{let i=c.absensi.find(t=>t.sesi_id===r.id&&t.user_id===e.id)||null;return i&&(n+=1,i.status_kehadiran===`Hadir`&&(t+=1)),Vt(i?i.status_kehadiran:`-`)}),i=Math.max(n,o.length),a=i>0?Math.round(t/i*100):0;return[{content:e.npm,styles:{fontStyle:`bold`,halign:`center`}},{content:e.nama_lengkap,styles:{halign:`left`}},...r,{content:`${a}%`,styles:{fontStyle:`bold`,halign:`center`}}]}),d=3+o.length;return{head:[s,l],body:u,fontSize:d>11?7.2:d>8?7.8:8.5,columnStyles:{0:{cellWidth:68,halign:`center`},1:{halign:`left`}}}}function Ut(){let{monthGroups:e,orderedSlots:t,rows:n}=Tt();if(t.length===0)return{head:[[`NIM`,`Nama Mahasiswa`,`Keterangan Tagihan`]],body:n.map(e=>[{content:e.student.npm,styles:{fontStyle:`bold`}},{content:e.student.nama_lengkap,styles:{halign:`left`}},`Belum ada tagihan periode kas`]),fontSize:8.5};let r=[{content:`NIM`,rowSpan:2},{content:`Nama Mahasiswa`,rowSpan:2},...e.map(e=>({content:e.monthLabel,colSpan:e.slots.length}))],i=t.map(e=>e.subLabel),a=n.map(e=>[{content:e.student.npm,styles:{fontStyle:`bold`,halign:`center`}},{content:e.student.nama_lengkap,styles:{halign:`left`}},...e.slotCells.map(({bill:e})=>{if(!e)return`-`;let t=Number(e.nominal_dibayar||0);return t>0?g(t):`-`})]),o=2+t.length;return{head:[r,i],body:a,fontSize:o>12?7.2:o>9?7.8:8.5,columnStyles:{0:{cellWidth:72,halign:`center`},1:{halign:`left`}}}}function Wt(){let e=c.profiles.filter(e=>o(e.role)).map(e=>{let t=H(e.id);return[{content:e.npm,styles:{fontStyle:`bold`,halign:`center`}},{content:e.nama_lengkap,styles:{halign:`left`}},{content:g(t.sudahBayar),styles:{fontStyle:`bold`,halign:`center`}},{content:t.tunggakan>0?g(t.tunggakan):`-`,styles:{halign:`center`}},Vt(t.isLunas?`Lunas`:`Blm Lunas`)]});return{head:[[`NIM`,`Nama Mahasiswa`,`Total Dibayar`,`Tunggakan`,`Status`]],body:e.length?e:[[`-`,`-`,`Rp 0`,`Rp 0`,`-`]],fontSize:9,columnStyles:{0:{cellWidth:85,halign:`center`},1:{halign:`left`}}}}function Gt(e){let t=[...c.sesiAbsensi].sort((e,t)=>Number(e.pertemuan_ke||0)-Number(t.pertemuan_ke||0)),n=[],r=new Set;t.forEach(e=>{let t=String(e.mata_kuliah||``).trim();t&&!r.has(t)&&(r.add(t),n.push(t))});let i=Array.from(new Set(t.map(e=>Number(e.pertemuan_ke||1)))).sort((e,t)=>e-t);if(!n.length||!i.length)return{head:[[`Pertemuan`,`Keterangan`,`H`,`I`,`Z`,`A`,`Persentase Hadir`]],body:[[`-`,`Belum ada sesi absensi kelas`,`-`,`-`,`-`,`-`,`0%`]],fontSize:8.5};let a=[{content:`Pertemuan`,rowSpan:2},...n.map(e=>({content:e,rowSpan:2})),{content:`Total Catatan`,colSpan:4},{content:`Persentase Hadir`,rowSpan:2}],o=[`H`,`I`,`Z`,`A`],s=i.map(r=>{let i=0,a=0,o=0,s=0,l=0,u=n.map(n=>{let u=t.find(e=>Number(e.pertemuan_ke||1)===r&&e.mata_kuliah===n);if(!u)return`-`;let d=c.absensi.find(t=>t.sesi_id===u.id&&t.user_id===e);return d?(l+=1,d.status_kehadiran===`Hadir`?i+=1:d.status_kehadiran===`Izin`?a+=1:d.status_kehadiran===`Sakit`?o+=1:s+=1,Vt(d.status_kehadiran)):`-`}),d=Math.max(l,n.filter(e=>t.some(t=>Number(t.pertemuan_ke||1)===r&&t.mata_kuliah===e)).length),f=d>0?Math.round(i/d*100):0;return[{content:String(r),styles:{fontStyle:`bold`,halign:`center`}},...u,i>0?String(i):`-`,a>0?String(a):`-`,o>0?String(o):`-`,s>0?String(s):`-`,{content:`${f}%`,styles:{fontStyle:`bold`,halign:`center`}}]});return{head:[a,o],body:s,fontSize:n.length>4?7.6:8.5,columnStyles:{0:{cellWidth:64,halign:`center`}}}}function Kt(e){let t=[`Januari`,`Februari`,`Maret`,`April`,`Mei`,`Juni`,`Juli`,`Agustus`,`September`,`Oktober`,`November`,`Desember`],n=c.iuranKas.filter(t=>t.user_id===e);if(!n.length)return{head:[[`Bulan`,`Periode 1`,`Periode 2`,`Periode 3`,`Periode 4`,`Total Dibayar`,`Tunggakan`,`Status`]],body:[[`-`,`-`,`-`,`-`,`-`,`Rp 0`,`-`,`-`]],fontSize:8.8};let r=new Map;return n.forEach(e=>{let n=String(e.periode||``).trim(),i=n.toLowerCase(),a=t.findIndex(e=>i.includes(e.toLowerCase())),o=a>=0?t[a]:`Lainnya`,s=n.match(/(20\d{2})/),c=s?Number(s[1]):9999,l=n.match(/(?:minggu|pekan|m|ke[- ]?)\s*(\d+)/i)||n.match(/^(\d+)/),u=l?Number(l[1]):99;r.has(o)||r.set(o,{monthLabel:o,yearNum:c,monthIdx:a>=0?a:99,items:[]}),r.get(o).items.push({bill:e,slotOrder:u})}),{head:[[`Bulan`,`Periode 1`,`Periode 2`,`Periode 3`,`Periode 4`,`Total Dibayar`,`Tunggakan`,`Status`]],body:Array.from(r.values()).sort((e,t)=>e.yearNum-t.yearNum||e.monthIdx-t.monthIdx).map(e=>{let t=[...e.items].sort((e,t)=>e.slotOrder-t.slotOrder),n=[t[0]?.bill,t[1]?.bill,t[2]?.bill,t[3]?.bill],r=e.items.reduce((e,t)=>e+Number(t.bill.nominal_dibayar||0),0),i=e.items.reduce((e,t)=>e+Number(t.bill.nominal_tagihan||0),0),a=Math.max(0,i-r),o=a===0&&e.items.every(e=>e.bill.status===`Lunas`);return[{content:e.monthLabel,styles:{fontStyle:`bold`,halign:`center`}},...n.map(e=>e&&Number(e.nominal_dibayar||0)>0?g(e.nominal_dibayar):`-`),{content:g(r),styles:{fontStyle:`bold`,halign:`center`}},a>0?g(a):`-`,Vt(o?`Lunas`:`Blm Lunas`)]}),fontSize:8.8}}function qt(e,t,n=[]){let r=(document.getElementById(`pdf-catatan-evaluasi`)?.value||c.filters.pdfEvaluationNote||``).trim(),i=[];if((n||[]).forEach(e=>{e&&String(e).trim()&&i.push(`- ${String(e).trim()}`)}),r&&i.push(`- Catatan Tambahan Pengurus: ${r}`),!i.length)return t;let a=e.pageWidth-80,o=a-28,s=[];i.forEach(t=>{e.splitTextToSize(t,o,8.8,`normal`).forEach(e=>s.push(e))});let l=12.2,u=26+s.length*l+10,d=t+14;return d+u>e.pageHeight-52&&(e.addPage(),d=48),e.setFillColor(248,250,252),e.setDrawColor(148,163,184),e.setLineWidth(.6),e.rect(40,d,a,u,`FD`),e.setFillColor(22,58,120),e.rect(40,d,4,u,`F`),e.setFont(`helvetica`,`bold`),e.setFontSize(9.8),e.setTextColor(22,58,120),e.text(`Catatan & Evaluasi Singkat`,52,d+16),e.setFont(`helvetica`,`normal`),e.setFontSize(8.8),e.setTextColor(30,41,59),s.forEach((t,n)=>{e.text(t,52,d+31+n*l)}),d+u}function Jt(e,t={}){let n=c.profiles.filter(e=>a(e.role)),r=c.profiles.filter(e=>o(e.role));if(e===`kas_bulanan`){let e=r.filter(e=>H(e.id).isLunas).length,n=r.reduce((e,t)=>e+H(t.id).tunggakan,0),i=c.transaksiKas.filter(e=>e.jenis===`Pemasukan`&&(!t.monthVal||(e.tanggal||``).startsWith(t.monthVal))).reduce((e,t)=>e+Number(t.nominal||0),0),a=c.transaksiKas.filter(e=>e.jenis===`Pengeluaran`&&(!t.monthVal||(e.tanggal||``).startsWith(t.monthVal))).reduce((e,t)=>e+Number(t.nominal||0),0),o=i-a;return[`Periode ${t.monthLabel}: Pemasukan tercatat ${g(i)}, Pengeluaran ${g(a)}, selisih kas bulan ini ${g(o)}.`,`Evaluasi Kepatuhan Kas: ${e} dari ${r.length} anggota kas berstatus Lunas; total tunggakan berjalan ${g(n)}.`,n>0?`Tindak Lanjut: Bendahara disarankan mengirim pengingat WhatsApp berkala kepada mahasiswa yang masih memiliki tunggakan.`:`Evaluasi Baik: Seluruh tagihan kas mahasiswa telah terbayar lunas pada periode berjalan.`]}if(e===`absensi_bulanan`){let e=t.sessions||[],r=new Set(e.map(e=>e.id)),i=c.absensi.filter(e=>r.has(e.sesi_id)),a=i.filter(e=>e.status_kehadiran===`Hadir`).length,o=i.filter(e=>e.status_kehadiran===`Alpha`||e.status_kehadiran===`Belum Absen!`).length,s=i.filter(e=>e.status_verifikasi===`Menunggu`).length,l=Math.max(1,n.length*e.length),u=e.length>0&&n.length>0?Math.round(a/l*100):0;return[`Rekap ${t.monthLabel}: Terlaksana ${e.length} sesi perkuliahan dengan rata-rata tingkat kehadiran kelas ${u}% (${a} catatan Hadir).`,`Evaluasi Kedisiplinan: Tercatat ${o} Alpha/Belum Absen dan ${s} kiriman absensi menunggu verifikasi Ketua/Admin.`,s>0||o>0?`Tindak Lanjut: Mohon segera selesaikan verifikasi antrean kehadiran serta pembinaan bagi mahasiswa yang melewati batas sesi.`:`Evaluasi Baik: Seluruh presensi pada periode ini telah terverifikasi dengan tingkat kedisiplinan optimal.`]}if(e===`keseluruhan`){let e=t.sessions||[],i=new Set(e.map(e=>e.id)),a=c.absensi.filter(e=>i.has(e.sesi_id)).filter(e=>e.status_kehadiran===`Hadir`).length,o=Math.max(1,n.length*e.length),s=e.length>0&&n.length>0?Math.round(a/o*100):0,l=r.filter(e=>H(e.id).isLunas).length,u=r.reduce((e,t)=>e+H(t.id).tunggakan,0),d=c.transaksiKas.filter(e=>e.jenis===`Pemasukan`&&(!t.monthVal||(e.tanggal||``).startsWith(t.monthVal))).reduce((e,t)=>e+Number(t.nominal||0),0),f=c.transaksiKas.filter(e=>e.jenis===`Pengeluaran`&&(!t.monthVal||(e.tanggal||``).startsWith(t.monthVal))).reduce((e,t)=>e+Number(t.nominal||0),0);return[`Ringkasan Akademik (${t.monthLabel}): ${e.length} sesi kuliah terlaksana dengan rata-rata kehadiran kelas sebesar ${s}%.`,`Ringkasan Keuangan: Pemasukan bulan ini ${g(d)}, Pengeluaran ${g(f)}; ${l}/${n.length} mahasiswa berstatus kas Lunas (sisa piutang ${g(u)}).`,`Evaluasi Terpadu: Pengurus diharapkan menjaga konsistensi validasi kehadiran kamera+GPS dan ketertiban iuran kas kelas.`]}if(e===`per_mahasiswa`&&t.student){let e=V(t.student.id),n=H(t.student.id),r=`Evaluasi Kas: Total dibayar ${g(n.sudahBayar)}, sisa tunggakan ${g(n.tunggakan)} (${n.isLunas?`Lunas`:`Belum Lunas`}).`;if(t.excludeAbsensi)return[r,n.isLunas?`Catatan Singkat: Seluruh tagihan kas mahasiswa telah terbayar lunas tanpa tunggakan.`:`Catatan Singkat: Masih terdapat sisa tunggakan iuran kas yang perlu segera diselesaikan.`];let i=`Evaluasi Kehadiran: ${t.student.nama_lengkap} memiliki tingkat kehadiran ${e.pct}% (${e.hadir} Hadir, ${e.izin} Izin, ${e.sakit} Sakit, ${e.alpha} Alpha/Belum Absen).`;return t.excludeKas?[i,e.pct>=75?`Catatan Singkat: Kehadiran memenuhi syarat minimal perkuliahan (>=75%), pertahankan konsistensi.`:`Catatan Singkat: Persentase kehadiran di bawah 75%, mohon tingkatkan kehadiran pada pertemuan berikutnya.`]:[i,r,e.pct>=75&&n.isLunas?`Kesimpulan: Performa akademik dan administrasi kas mahasiswa berstatus Sangat Baik.`:`Kesimpulan: Perlu perhatian pada peningkatan persentase kehadiran dan/atau penyelesaian tunggakan kas.`]}return[]}function Yt(e,t){let n=Object.fromEntries(c.profiles.map(e=>[e.id,e])),r=c.transaksiKas.filter(t=>(t.tanggal||``).startsWith(e));return r.length===0?[[`-`,`-`,`-`,`-`,{content:`Belum ada mutasi transaksi kas pada bulan ${t}`,styles:{halign:`left`,fontStyle:`italic`}},`-`,`Rp 0`]]:r.map((e,t)=>[String(t+1),h(e.tanggal),e.jenis,e.kategori,{content:`${e.keterangan}${e.pengirim_nama?` (Pengirim: ${e.pengirim_nama})`:``}`,styles:{halign:`left`}},e.pj_nama||(e.jenis===`Pemasukan`&&!e.pj_id?`- (Dari Mahasiswa Sendiri)`:n[e.dicatat_oleh]?.nama_lengkap||`-`),{content:`${e.jenis===`Pemasukan`?`+`:`-`}${g(e.nominal)}`,styles:{fontStyle:`bold`,textColor:e.jenis===`Pemasukan`?[22,163,74]:[220,38,38],halign:`right`}}])}function Xt(){document.getElementById(`pdf-month-input`)?.addEventListener(`change`,e=>{c.filters.pdfMonth=e.target.value,R()}),document.getElementById(`pdf-student-select`)?.addEventListener(`change`,e=>{c.filters.pdfStudentId=e.target.value}),document.getElementById(`pdf-catatan-evaluasi`)?.addEventListener(`input`,e=>{c.filters.pdfEvaluationNote=e.target.value});let e={cellPadding:5,textColor:[15,23,42],lineColor:[30,41,59],lineWidth:.55},t={fillColor:[22,58,120],textColor:[255,255,255],fontStyle:`bold`,halign:`center`,lineColor:[30,41,59]},n={fillColor:[29,78,216],textColor:[255,255,255],fontStyle:`bold`,halign:`center`};document.getElementById(`btn-pdf-kas-bulanan`)?.addEventListener(`click`,async()=>{let r=await J(),i=new Date,a=document.getElementById(`pdf-month-input`).value,o=m(a),s=G(),l=Ut(),u=Wt(),d=c.transaksiKas.filter(e=>(e.tanggal||``).startsWith(a)),f=Yt(a,o),p=zt(),{doc:h,startY:_}=Y(`Laporan Rekapitulasi Kas Bulanan`,`Periode ${o}`,i,{periodeLabel:o,extraRows:[{label:`Jumlah Transaksi Bulan Ini`,value:`${d.length} Transaksi (Saldo Umum: ${g(p)})`}]}),v=X(h,`Tabel Uang Kas Per Periode Keseluruhan Mahasiswa`,_,`Rincian Iuran Kas Per Bulan & Minggu`);h.autoTable({startY:v,margin:{left:40,right:40},head:l.head,body:l.body,styles:{...e,fontSize:l.fontSize},headStyles:t,subHeadStyles:n,columnStyles:l.columnStyles||{}});let y=X(h,`Tabel Total Uang Keseluruhan Mahasiswa`,h.lastAutoTable.finalY+24,`Rekapitulasi Pembayaran Kas`);h.autoTable({startY:y,margin:{left:40,right:40},head:u.head,body:u.body,styles:{...e,fontSize:u.fontSize},headStyles:t,columnStyles:u.columnStyles||{}});let x=X(h,`Tabel Rekapitulasi Mutasi Kas`,h.lastAutoTable.finalY+22,`Mutasi Kas Bulan ${o}`);h.autoTable({startY:x,margin:{left:40,right:40},head:[[`No`,`Tanggal`,`Jenis`,`Kategori`,`Keterangan / Pengirim`,`PJ Pencatat`,`Nominal`]],body:f,styles:{...e,fontSize:8},headStyles:t,columnStyles:{0:{cellWidth:28,halign:`center`}}});let S=qt(h,h.lastAutoTable.finalY,Jt(`kas_bulanan`,{monthLabel:o,monthVal:a}));Bt(h,[{roleLabel:`Dibuat Oleh,`,name:s.bendahara.nama,title:s.bendahara.jabatan},{roleLabel:`Mengetahui / Disetujui Oleh,`,name:s.admin.nama,title:s.admin.jabatan,showAdminLogo:!0}],S,i,r),Z(h,`Laporan Rekapitulasi Kas Bulanan (${o})`),h.save(`Kas_Keseluruhan_Mahasiswa_R3S_${a}.pdf`),b(`Laporan Kas Keseluruhan ${o} (PDF) berhasil diunduh!`,`success`)}),document.getElementById(`btn-pdf-absensi-bulanan`)?.addEventListener(`click`,async()=>{let r=await J(),i=new Date,a=document.getElementById(`pdf-month-input`).value,o=m(a),s=G(),u=c.sesiAbsensi.filter(e=>(e.tanggal||l(new Date(e.created_at))).startsWith(a)),d=u.length>0?u:c.sesiAbsensi,f=Ht(d),p=new Set(d.map(e=>e.id)),h=c.absensi.filter(e=>p.has(e.sesi_id)).length,{doc:g,startY:_}=Y(`Laporan Rekapitulasi Absensi Bulanan`,`Periode ${o}`,i,{periodeLabel:o,extraRows:[{label:`Jumlah Sesi Bulan Ini`,value:`${d.length} Sesi Kuliah (${h} Catatan Kehadiran)`}]}),v=X(g,`Tabel Matriks Absensi Keseluruhan Mahasiswa`,_,`Periode ${o}`);g.autoTable({startY:v,margin:{left:40,right:40},head:f.head,body:f.body,styles:{...e,fontSize:f.fontSize||8.4},headStyles:t,subHeadStyles:n,columnStyles:f.columnStyles||{}});let y=qt(g,g.lastAutoTable.finalY,Jt(`absensi_bulanan`,{monthLabel:o,sessions:d}));Bt(g,[{roleLabel:`Dibuat Oleh,`,name:s.ketua.nama,title:s.ketua.jabatan},{roleLabel:`Mengetahui / Disetujui Oleh,`,name:s.admin.nama,title:s.admin.jabatan,showAdminLogo:!0}],y,i,r),Z(g,`Laporan Rekapitulasi Absensi Bulanan (${o})`),g.save(`Absensi_Keseluruhan_Mahasiswa_R3S_${a}.pdf`),b(`Laporan Absensi Keseluruhan ${o} (PDF) berhasil diunduh!`,`success`)}),document.getElementById(`btn-pdf-keseluruhan`)?.addEventListener(`click`,async()=>{let r=await J(),i=new Date,a=document.getElementById(`pdf-month-input`).value,o=m(a),s=G(),u=c.sesiAbsensi.filter(e=>(e.tanggal||l(new Date(e.created_at))).startsWith(a)),d=u.length>0?u:c.sesiAbsensi,f=Ht(d),p=Ut(),h=Wt(),_=c.transaksiKas.filter(e=>(e.tanggal||``).startsWith(a)),v=Yt(a,o),y=zt(),{doc:x,startY:S}=Y(`Laporan Keseluruhan Rekapan Bulanan`,`Periode ${o}`,i,{periodeLabel:o,extraRows:[{label:`Jumlah Sesi & Transaksi`,value:`${d.length} Sesi · ${_.length} Transaksi Kas (Saldo Umum: ${g(y)})`}]}),C=X(x,`Tabel Matriks Absensi Keseluruhan Mahasiswa`,S,`Periode ${o}`);x.autoTable({startY:C,margin:{left:40,right:40},head:f.head,body:f.body,styles:{...e,fontSize:f.fontSize||8.4},headStyles:t,subHeadStyles:n,columnStyles:f.columnStyles||{}});let w=X(x,`Tabel Uang Kas Per Periode Keseluruhan Mahasiswa`,x.lastAutoTable.finalY+24,`Rincian Iuran Kas Per Bulan & Minggu`);x.autoTable({startY:w,margin:{left:40,right:40},head:p.head,body:p.body,styles:{...e,fontSize:p.fontSize},headStyles:t,subHeadStyles:n,columnStyles:p.columnStyles||{}});let T=X(x,`Tabel Total Uang Keseluruhan Mahasiswa`,x.lastAutoTable.finalY+24,`Rekapitulasi Pembayaran Kas`);x.autoTable({startY:T,margin:{left:40,right:40},head:h.head,body:h.body,styles:{...e,fontSize:h.fontSize},headStyles:t,columnStyles:h.columnStyles||{}});let E=X(x,`Tabel Rekapitulasi Mutasi Kas`,x.lastAutoTable.finalY+22,`Mutasi Kas Bulan ${o}`);x.autoTable({startY:E,margin:{left:40,right:40},head:[[`No`,`Tanggal`,`Jenis`,`Kategori`,`Keterangan / Pengirim`,`PJ Pencatat`,`Nominal`]],body:v,styles:{...e,fontSize:8},headStyles:t,columnStyles:{0:{cellWidth:28,halign:`center`}}});let D=qt(x,x.lastAutoTable.finalY,Jt(`keseluruhan`,{monthLabel:o,monthVal:a,sessions:d}));Bt(x,[{roleLabel:`Dibuat Oleh,`,name:s.bendahara.nama,title:s.bendahara.jabatan},{roleLabel:`Mengetahui,`,name:s.ketua.nama,title:s.ketua.jabatan},{roleLabel:`Disetujui Oleh,`,name:s.admin.nama,title:s.admin.jabatan,showAdminLogo:!0}],D,i,r),Z(x,`Rekapan Keseluruhan Mahasiswa (${o})`),x.save(`Rekapan_Keseluruhan_R3S_${a}.pdf`),b(`Laporan Keseluruhan Rekapan (PDF) berhasil diunduh!`,`success`)}),document.getElementById(`btn-pdf-per-mahasiswa`)?.addEventListener(`click`,async()=>{let r=await J(),i=new Date,a=document.getElementById(`pdf-month-input`).value,o=m(a),s=c.currentUser?.role||`admin`,l=s===`ketua`,u=s===`bendahara`,d=document.getElementById(`pdf-student-select`).value,f=c.profiles.find(e=>e.id===d);if(!f){b(`Pilih mahasiswa terlebih dahulu.`,`warning`);return}let p=G(),h=Gt(f.id),_=Kt(f.id),v=V(f.id),y=H(f.id),x=u?`Laporan Rekapitulasi Kas Per Mahasiswa`:l?`Laporan Rekapitulasi Absensi Per Mahasiswa`:`Laporan Rekapitulasi Per Mahasiswa`,S=u?`Terbayar ${g(y.sudahBayar)} (Tunggakan: ${g(y.tunggakan)})`:l?`Kehadiran ${v.pct}% (${v.hadir} Hadir dari ${v.total} Catatan)`:`Hadir ${v.pct}% · Kas Terbayar ${g(y.sudahBayar)} (Tunggakan: ${g(y.tunggakan)})`,{doc:C,startY:w}=Y(x,`Permahasiswa · ${f.nama_lengkap} (${f.npm})`,i,{periodeLabel:o,extraRows:[{label:`Nama Mahasiswa`,value:`${f.nama_lengkap} (NIM: ${f.npm})`},{label:`Ringkasan Status`,value:S}]});if(u){let n=X(C,`Tabel Rekapitulasi Kas Per Mahasiswa`,w,`${f.nama_lengkap} (${f.npm})`);C.autoTable({startY:n,margin:{left:40,right:40},head:_.head,body:_.body,styles:{...e,fontSize:_.fontSize},headStyles:t})}else{let r=X(C,`Tabel Matriks Absensi Per Mahasiswa`,w,`${f.nama_lengkap} (${f.npm})`);if(C.autoTable({startY:r,margin:{left:40,right:40},head:h.head,body:h.body,styles:{...e,fontSize:h.fontSize},headStyles:t,subHeadStyles:n,columnStyles:h.columnStyles||{}}),!l){let n=X(C,`Tabel Rekapitulasi Kas Per Mahasiswa`,C.lastAutoTable.finalY+24,`${f.nama_lengkap} (${f.npm})`);C.autoTable({startY:n,margin:{left:40,right:40},head:_.head,body:_.body,styles:{...e,fontSize:_.fontSize},headStyles:t})}}let T=qt(C,C.lastAutoTable.finalY,Jt(`per_mahasiswa`,{student:f,excludeKas:l,excludeAbsensi:u}));Bt(C,[u?{roleLabel:`Dibuat Oleh,`,name:p.bendahara.nama,title:p.bendahara.jabatan}:{roleLabel:`Dibuat Oleh,`,name:p.ketua.nama,title:p.ketua.jabatan},{roleLabel:`Mengetahui / Disetujui Oleh,`,name:p.admin.nama,title:p.admin.jabatan,showAdminLogo:!0}],T,i,r),Z(C,`Laporan Permahasiswa — ${f.nama_lengkap} (${f.npm})`),C.save(`Laporan_Permahasiswa_${f.npm}_${f.nama_lengkap.replace(/\s+/g,`_`)}.pdf`),b(`Laporan PDF ${f.nama_lengkap} berhasil diunduh!`,`success`)})}function Zt(e,t){if(!e.length)return;let n=Object.keys(e[0]),r=[n.map(e=>`"${String(e).replace(/"/g,`""`)}"`).join(`,`),...e.map(e=>n.map(t=>`"${String(e[t]??``).replace(/"/g,`""`)}"`).join(`,`))],i=new Blob([`\uFEFF${r.join(`
`)}`],{type:`text/csv;charset=utf-8;`}),a=URL.createObjectURL(i),o=document.createElement(`a`);o.href=a,o.download=t,o.click(),URL.revokeObjectURL(a)}function Qt(){let e=Object.fromEntries(c.profiles.map(e=>[e.id,e])),t=c.filters.laporanSearch.toLowerCase(),n=c.filters.laporanKategori,r=c.laporanKendala.filter(r=>{let i=e[r.user_id],a=`${i?.nama_lengkap||``} ${i?.npm||``} ${r.keterangan} ${r.kategori}`.toLowerCase();return(!t||a.includes(t))&&(n===`Semua`||r.kategori===n)});return`
    <div class="page-header">
      <div>
        <span class="meta-line">Tindak Lanjut Kendala Mahasiswa &amp; Permintaan Rekapan Excel</span>
        <h2>Monitoring Laporan Masuk</h2>
      </div>
    </div>

    <div class="card glass-panel">
      <div class="toolbar-filters">
        <input type="search" id="filter-laporan-search" placeholder="Cari nama pelapor atau isi laporan..." value="${_(c.filters.laporanSearch)}" />
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
                            <strong>${_(n?.nama_lengkap||`-`)}</strong>
                            <div class="meta-line tabular-nums">${_(n?.npm||`-`)} · ${_(t.kategori)}</div>
                          </td>
                          <td>
                            <div>${_(t.keterangan)}</div>
                            ${t.bukti_url?`<button type="button" class="btn-link-inline btn-view-img" data-url="${_(t.bukti_url)}" data-title="Lampiran Laporan">Lihat Lampiran</button>`:``}
                          </td>
                          <td style="min-width:220px;">
                            <textarea class="laporan-reply-input" data-id="${t.id}" rows="2" placeholder="Tulis tanggapan Admin...">${_(t.tanggapan_admin||``)}</textarea>
                          </td>
                          <td>
                            <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-start;">
                              <span class="status-tag ${x(t.status)}">${_(t.status)}</span>
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
  `}function $t(){$(),document.getElementById(`filter-laporan-search`)?.addEventListener(`input`,e=>{c.filters.laporanSearch=e.target.value,R();let t=document.getElementById(`filter-laporan-search`);t&&(t.focus(),t.setSelectionRange(t.value.length,t.value.length))}),document.getElementById(`filter-laporan-kategori`)?.addEventListener(`change`,e=>{c.filters.laporanKategori=e.target.value,R()}),document.querySelectorAll(`.btn-save-tanggapan`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-id`),n=e.getAttribute(`data-user`),r=document.querySelector(`.laporan-reply-input[data-id="${t}"]`)?.value.trim()||``,i=c.laporanKendala.find(e=>e.id===t);try{await N.update(`laporan_kendala`,t,{tanggapan_admin:r,status:`Menunggu`,ditanggapi_oleh:c.currentUser.id}),n&&await C([{user_id:n,judul:`Tanggapan Laporan Masuk`,pesan:`Admin menanggapi laporan "${i?.kategori||`Kendala`}": "${r}"`,tipe:`info`}]),await N.loadAll(),b(`Tanggapan disimpan (Status tetap Menunggu sampai dikonfirmasi Selesai).`,`info`),L(),R()}catch(e){b(e.message||`Gagal menyimpan tanggapan.`,`danger`)}})}),document.querySelectorAll(`.btn-finish-laporan`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-id`),n=e.getAttribute(`data-user`),r=document.querySelector(`.laporan-reply-input[data-id="${t}"]`)?.value.trim()||`Laporan telah ditindaklanjuti.`,i=c.laporanKendala.find(e=>e.id===t),a=c.profiles.find(e=>e.id===n);try{await N.update(`laporan_kendala`,t,{tanggapan_admin:r,status:`Selesai`,ditanggapi_oleh:c.currentUser.id});let e=[{user_id:n,judul:`Laporan Kendala Selesai`,pesan:`Laporan "${i?.kategori||`Kendala`}" Anda telah dikonfirmasi Selesai oleh ${c.currentUser.nama_lengkap}: "${r}"`,tipe:`success`}];S([`admin`]).forEach(t=>{e.push({user_id:t,judul:`Laporan Masuk Telah Diselesaikan`,pesan:`Laporan "${i?.kategori||`Kendala`}" dari ${a?.nama_lengkap||`Anggota`} diselesaikan oleh ${c.currentUser.nama_lengkap}.`,tipe:`success`})}),await C(e),await N.loadAll(),b(`Laporan dikonfirmasi Selesai!`,`success`),L(),R()}catch(e){b(e.message||`Gagal menyelesaikan laporan.`,`danger`)}})})}function en(){let e=c.pengaturan||{},t=c.filters.akunSearch.toLowerCase(),r={admin:0,ketua:1,bendahara:2,pj_matkul:3,mahasiswa:4},a=[...c.profiles].sort((e,t)=>{let n=r[e.role]??9,i=r[t.role]??9;return n===i?String(e.npm||``).localeCompare(String(t.npm||``)):n-i}).filter(e=>{let n=`${e.npm} ${e.nama_lengkap} ${e.username} ${e.role} ${i[e.role]||``}`.toLowerCase();return!t||n.includes(t)});return`
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
              <input type="text" id="set-bank" value="${_(e.nama_bank||``)}" required />
            </div>
            <div class="field-group">
              <label for="set-norek">No. Rekening</label>
              <input type="text" id="set-norek" value="${_(e.no_rekening||``)}" required class="tabular-nums" />
            </div>
          </div>
          <div class="field-group">
            <label for="set-atasnama">Atas Nama Rekening</label>
            <input type="text" id="set-atasnama" value="${_(e.atas_nama_rekening||``)}" required />
          </div>
          <div class="grid-2" style="margin-bottom:0;">
            <div class="field-group">
              <label for="set-qris-merchant">Nama Toko QRIS</label>
              <input type="text" id="set-qris-merchant" value="${_(e.qris_merchant_name||`Mas_hy, Fashion`)}" required />
            </div>
            <div class="field-group">
              <label for="set-nmid">NMID QRIS</label>
              <input type="text" id="set-nmid" value="${_(e.qris_nmid||`ID1025463553806`)}" required class="tabular-nums" />
            </div>
          </div>
          <div class="field-group">
            <label for="set-qris-payload">Kode QRIS Statis / Data Dasar (Otomatis Dikonversi ke QRIS Dinamis)</label>
            <textarea id="set-qris-payload" rows="2" class="tabular-nums" required>${_(e.qris_payload||n)}</textarea>
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
        <input type="search" id="filter-akun-search" placeholder="Cari NPM, nama, nama pengguna, atau peran..." value="${_(c.filters.akunSearch)}" />
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
                <td class="tabular-nums">${_(e.npm)}</td>
                <td><strong>${_(e.nama_lengkap)}</strong></td>
                <td><span class="status-tag ${s(e.role)}">${_(i[e.role]||e.role)}</span></td>
                <td class="tabular-nums">${_(e.username)}</td>
                <td class="tabular-nums">${_(e.password)}</td>
                <td>
                  <div class="row-actions" style="flex-wrap:wrap;">
                    ${e.id!==c.currentUser.id&&e.role!==`admin`?`<select
                            class="select-change-role"
                            data-id="${e.id}"
                            data-nama="${_(e.nama_lengkap)}"
                            data-prev-role="${_(e.role)}"
                            aria-label="Ubah role ${_(e.nama_lengkap)}"
                          >
                            <option value="mahasiswa" ${e.role===`mahasiswa`?`selected`:``}>Mahasiswa Biasa</option>
                            <option value="pj_matkul" ${e.role===`pj_matkul`?`selected`:``}>PJ Mata Kuliah</option>
                            <option value="ketua" ${e.role===`ketua`?`selected`:``}>Ketua Kelas</option>
                            <option value="bendahara" ${e.role===`bendahara`?`selected`:``}>Bendahara Kelas</option>
                          </select>`:``}
                    ${e.id===c.currentUser.id?`<span class="meta-line">Akun Aktif</span>`:`<button type="button" class="btn btn-danger-soft btn-sm btn-delete-akun" data-id="${e.id}" data-nama="${_(e.nama_lengkap)}">Hapus</button>`}
                  </div>
                </td>
              </tr>
            `).join(``)}
          </tbody>
        </table>
      </div>
    </div>
  `}function tn(){document.getElementById(`filter-akun-search`)?.addEventListener(`input`,e=>{c.filters.akunSearch=e.target.value,R();let t=document.getElementById(`filter-akun-search`);t&&(t.focus(),t.setSelectionRange(t.value.length,t.value.length))}),document.getElementById(`form-buat-akun`)?.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`akun-npm`).value.trim(),n=document.getElementById(`akun-nama`).value.trim(),r=document.getElementById(`akun-username`).value.trim(),a=document.getElementById(`akun-password`).value,o=document.getElementById(`akun-role`).value,s=document.getElementById(`akun-nowa`).value.trim();if(!v(a).valid)b(`Password wajib maks 8 karakter, min 1 angka, dan min 1 simbol.`,`danger`);else if(c.profiles.find(e=>e.username.toLowerCase()===r.toLowerCase()||e.npm===t))b(`NPM atau Username sudah terdaftar.`,`danger`);else try{await N.insert(`profiles`,{npm:t,nama_lengkap:n,username:r,password:a,role:o,no_wa:s,avatar_url:``}),await N.loadAll(),b(`Akun ${n} (${i[o]}) berhasil dibuat!`,`success`),R()}catch(e){b(e.message||`Gagal membuat akun baru.`,`danger`)}}),document.getElementById(`form-pengaturan-kelas`)?.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`set-qris-payload`)?.value.trim()||n,r=Be(t),i=document.getElementById(`set-qris-merchant`)?.value.trim()||``,a=document.getElementById(`set-nmid`)?.value.trim()||``;try{await N.update(`pengaturan_kelas`,1,{semester_aktif:Number(document.getElementById(`set-semester`).value),pertemuan_berjalan:Number(document.getElementById(`set-berjalan`).value),total_pertemuan_semester:Number(document.getElementById(`set-total`).value),nama_bank:document.getElementById(`set-bank`).value.trim(),no_rekening:document.getElementById(`set-norek`).value.trim(),atas_nama_rekening:document.getElementById(`set-atasnama`).value.trim(),qris_merchant_name:i||r.merchantName||`Mas_hy, Fashion`,qris_nmid:a||r.nmid||`ID1025463553806`,qris_payload:t,nominal_kas_default:Number(document.getElementById(`set-nominal`).value)}),await N.loadAll(),b(`Pengaturan kelas, rekening & QRIS Dinamis berhasil disimpan!`,`success`),R()}catch(e){b(e.message||`Gagal menyimpan pengaturan kelas.`,`danger`)}}),document.querySelectorAll(`.select-change-role`).forEach(e=>{e.addEventListener(`change`,async()=>{let t=e.getAttribute(`data-id`),n=e.getAttribute(`data-nama`)||`Anggota`,r=e.getAttribute(`data-prev-role`)||`mahasiswa`,a=e.value;if(!new Set([`mahasiswa`,`pj_matkul`,`ketua`,`bendahara`]).has(a)||a===r)e.value=r;else{e.disabled=!0;try{await N.update(`profiles`,t,{role:a}),await C([{user_id:t,judul:`Perubahan Role Akun oleh Admin`,pesan:`Role akun Anda diubah oleh ${c.currentUser.nama_lengkap} dari ${i[r]||r} menjadi ${i[a]||a}.`,tipe:`info`}]),await N.loadAll(),b(`Role ${n} berhasil diubah menjadi ${i[a]||a}!`,`success`),L(),R()}catch(t){e.value=r,e.disabled=!1,b(t.message||`Gagal mengubah role anggota.`,`danger`)}}})}),document.querySelectorAll(`.btn-delete-akun`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-id`),n=e.getAttribute(`data-nama`);try{await N.remove(`profiles`,t),await N.loadAll(),b(`Akun ${n} berhasil dihapus.`,`info`),R()}catch(e){b(e.message||`Gagal menghapus akun.`,`danger`)}})})}function Q(e){let t=document.getElementById(e);t&&(t.classList.add(`hidden`),e===`modal-camera`&&we(),e===`modal-pay-kas`&&clearInterval(c.qrisTimerInterval))}function $(){document.querySelectorAll(`.btn-view-img`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-url`),n=e.getAttribute(`data-title`)||`Lampiran Gambar`;document.getElementById(`modal-image-title`).textContent=n,document.getElementById(`modal-image-meta`).textContent=`Pratinjau dokumen / bukti kelas R3S`,document.getElementById(`modal-image-src`).src=t,document.getElementById(`modal-image-preview`).classList.remove(`hidden`)})})}var nn=`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>`,rn=`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>`;function an(e){let t=e===`light`?`light`:`dark`;c.theme=t,document.documentElement.setAttribute(`data-theme`,t);try{localStorage.setItem(r.THEME,t)}catch{}let n=t===`dark`;document.querySelectorAll(`[data-theme-toggle]`).forEach(e=>{let t=e.querySelector(`.theme-toggle-icon`),r=e.querySelector(`.theme-toggle-label`);t&&(t.innerHTML=n?nn:rn),r&&(r.textContent=n?`Tema Terang`:`Tema Gelap`),e.setAttribute(`aria-label`,n?`Aktifkan Tema Terang (Langit Cerah)`:`Aktifkan Tema Gelap (Galaksi Malam)`),e.setAttribute(`title`,n?`Beralih ke Tema Terang`:`Beralih ke Tema Gelap`)})}function on(){let e=`dark`;try{let t=localStorage.getItem(r.THEME);(t===`light`||t===`dark`)&&(e=t)}catch{e=`dark`}an(e)}async function sn(){on(),F(),T(),te(),I(`login`),ne(),J(),document.querySelectorAll(`[data-theme-toggle]`).forEach(e=>{e.addEventListener(`click`,()=>{let e=c.theme===`light`?`dark`:`light`;an(e),b(e===`light`?`Tema Terang (Langit Cerah) diaktifkan.`:`Tema Gelap (Galaksi Malam) diaktifkan.`,`info`)})}),document.querySelectorAll(`[data-sky-hour]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-sky-hour`);c.skyPreviewHour=t===`live`?null:Number(t),document.querySelectorAll(`[data-sky-hour]`).forEach(e=>{e.classList.toggle(`active`,e.getAttribute(`data-sky-hour`)===t)}),ee(new Date)})}),document.getElementById(`login-form`).addEventListener(`submit`,re),document.getElementById(`btn-refresh-login-captcha`).addEventListener(`click`,()=>I(`login`)),document.getElementById(`btn-refresh-forgot-captcha`).addEventListener(`click`,()=>I(`forgot`)),document.getElementById(`btn-goto-forgot`).addEventListener(`click`,()=>se(`forgot`)),document.getElementById(`btn-back-to-login`).addEventListener(`click`,()=>se(`login`)),document.getElementById(`btn-verify-username`).addEventListener(`click`,ie),document.getElementById(`forgot-new-password`).addEventListener(`input`,e=>{ae(e.target.value,`#forgot-pw-rules`)}),document.getElementById(`forgot-form`).addEventListener(`submit`,oe),document.querySelectorAll(`.toggle-pw-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=document.getElementById(e.getAttribute(`data-target`));if(!t)return;let n=t.type===`password`;t.type=n?`text`:`password`,e.textContent=n?`Tutup`:`Lihat`})}),document.getElementById(`btn-mobile-menu`).addEventListener(`click`,()=>{document.getElementById(`app-sidebar`).classList.add(`open`),document.getElementById(`sidebar-overlay`).classList.remove(`hidden`)}),document.getElementById(`sidebar-overlay`).addEventListener(`click`,fe),document.getElementById(`btn-logout`).addEventListener(`click`,le),document.getElementById(`btn-topbar-notif`).addEventListener(`click`,()=>{c.currentUser&&(c.activeTab=`pusat_info`,L(),R())}),document.getElementById(`topbar-user-trigger`).addEventListener(`click`,()=>{c.currentUser&&(c.activeTab=`profil`,L(),R())}),document.querySelectorAll(`[data-close-modal]`).forEach(e=>{e.addEventListener(`click`,()=>Q(e.getAttribute(`data-close-modal`)))}),document.getElementById(`btn-capture-photo`).addEventListener(`click`,be),document.getElementById(`btn-retake-photo`).addEventListener(`click`,Se),document.getElementById(`btn-submit-attendance`).addEventListener(`click`,Ce),document.getElementById(`btn-switch-camera`)?.addEventListener(`click`,async()=>{c.cameraFacingMode=c.cameraFacingMode===`user`?`environment`:`user`,z(),(c.cameraMode===`kamera`||c.daringUseCamera)&&await B({needCamera:!0})}),document.getElementById(`btn-flip-camera`)?.addEventListener(`click`,()=>{c.cameraFlipHorizontal=!c.cameraFlipHorizontal,z()}),document.getElementById(`daring-bukti-file`)?.addEventListener(`change`,e=>{let t=e.target.files?.[0];t&&(c.daringUseCamera=!1,z(),c.cameraStream&&=(c.cameraStream.getTracks().forEach(e=>e.stop()),null),c.gpsCoords||B({needCamera:!1}),xe(t))}),document.getElementById(`daring-platform`)?.addEventListener(`change`,()=>{c.cameraMode===`daring`&&c.daringImageFile&&!c.daringUseCamera&&xe(c.daringImageFile)}),document.getElementById(`btn-daring-use-camera`)?.addEventListener(`click`,()=>{if(c.cameraMode!==`daring`)return;c.daringUseCamera=!c.daringUseCamera,c.capturedBlob=null;let e=document.getElementById(`camera-video`),t=document.getElementById(`captured-preview`),n=document.getElementById(`daring-stage-placeholder`),r=document.getElementById(`btn-daring-use-camera`);t.classList.add(`hidden`),document.getElementById(`btn-retake-photo`).classList.add(`hidden`),document.getElementById(`btn-submit-attendance`).classList.add(`hidden`),c.daringUseCamera?(n&&n.classList.add(`hidden`),e.classList.remove(`hidden`),document.getElementById(`btn-capture-photo`).classList.remove(`hidden`),r&&(r.textContent=`Kembali ke Unggah Bukti Foto`),z(),B({needCamera:!0})):(e.classList.add(`hidden`),n&&n.classList.remove(`hidden`),document.getElementById(`btn-capture-photo`).classList.add(`hidden`),r&&(r.textContent=`Atau Ambil Dari Kamera`),z(),B({needCamera:!1}))}),document.getElementById(`btn-copy-gps-coords`)?.addEventListener(`click`,()=>{let e=document.getElementById(`gps-map-coords`).textContent;navigator.clipboard?.writeText(e),b(`Koordinat ${e} disalin!`,`success`)}),document.getElementById(`wa-reminder-text`)?.addEventListener(`input`,e=>{let t=c.waReminderContext,n=document.getElementById(`btn-wa-open-chat`);t?.student&&n&&(n.href=_t(t.student,e.target.value))}),document.getElementById(`btn-wa-copy-text`)?.addEventListener(`click`,async()=>{let e=document.getElementById(`wa-reminder-text`)?.value||``;if(e)try{await navigator.clipboard?.writeText(e),b(`Pesan rincian tunggakan disalin ke clipboard!`,`success`)}catch{b(`Gagal menyalin teks. Silakan salin manual dari kotak pesan.`,`warning`)}}),document.getElementById(`btn-wa-copy-image`)?.addEventListener(`click`,async()=>{let e=c.waReminderContext;if(e?.blobPromise)try{let t=await e.blobPromise;t&&navigator.clipboard?.write&&typeof ClipboardItem<`u`?(await navigator.clipboard.write([new ClipboardItem({"image/png":t})]),b(`Gambar bukti disalin! Tinggal tempel (Paste) di chat WhatsApp.`,`success`)):(document.getElementById(`btn-wa-download-proof`)?.click(),b(`Browser tidak mendukung salin gambar langsung; bukti otomatis diunduh (.PNG).`,`info`))}catch{document.getElementById(`btn-wa-download-proof`)?.click(),b(`Gambar bukti otomatis diunduh (.PNG) untuk dilampirkan di WhatsApp.`,`info`)}}),document.getElementById(`btn-wa-share-native`)?.addEventListener(`click`,async()=>{let e=c.waReminderContext;if(!e?.blobPromise)return;let t=document.getElementById(`wa-reminder-text`)?.value||``;try{let n=await e.blobPromise,r=n?new File([n],e.fileName,{type:`image/png`}):null;r&&navigator.canShare?.({files:[r]})?await navigator.share({title:`Bukti Tunggakan Kas - ${e.student.nama_lengkap}`,text:t,files:[r]}):navigator.share&&await navigator.share({title:`Bukti Tunggakan Kas - ${e.student.nama_lengkap}`,text:t}),await C([{user_id:c.currentUser.id,judul:`Pengingat & Bukti WhatsApp Dibagikan`,pesan:`Anda membagikan bukti dan rincian tunggakan kas sebesar ${g(e.sisa)} untuk ${e.student.nama_lengkap}.`,tipe:`info`}]),await N.loadAll(),L()}catch(e){e?.name!==`AbortError`&&b(`Gunakan Unduh Bukti (.PNG) lalu klik Buka WhatsApp.`,`info`)}}),document.getElementById(`btn-wa-open-chat`)?.addEventListener(`click`,async()=>{let e=c.waReminderContext;if(e?.student&&c.currentUser)try{await C([{user_id:c.currentUser.id,judul:`Pengingat & Bukti WhatsApp Dibuka`,pesan:`Anda mengirim pengingat WhatsApp beserta rincian bukti tunggakan kas sebesar ${g(e.sisa)} kepada ${e.student.nama_lengkap}.`,tipe:`info`}]),await N.loadAll(),L()}catch{}}),document.querySelectorAll(`#modal-pay-kas .seg-btn`).forEach(e=>{e.addEventListener(`click`,()=>Ie(e.getAttribute(`data-method`)))}),document.getElementById(`pay-kas-nominal`).addEventListener(`input`,e=>{Ue(c.pengaturan?.qris_payload||n,e.target.value)}),document.getElementById(`btn-copy-qris-string`)?.addEventListener(`click`,async()=>{let e=c.currentDynamicQrisString||n;try{await navigator.clipboard?.writeText(e),b(`Kode QRIS Dinamis berhasil disalin!`,`success`)}catch{b(`Gagal menyalin kode QRIS.`,`warning`)}}),document.getElementById(`btn-download-qris-png`)?.addEventListener(`click`,()=>{let e=document.getElementById(`qris-qr-canvas`);if(!e)return;let t=c.pengaturan||{},n=Math.max(0,Math.round(Number(document.getElementById(`pay-kas-nominal`)?.value||0))),r=document.createElement(`canvas`);r.width=420,r.height=510;let i=r.getContext(`2d`);i.fillStyle=`#ffffff`,i.fillRect(0,0,r.width,r.height),i.strokeStyle=`#cbd5e1`,i.lineWidth=2,i.strokeRect(8,8,r.width-16,r.height-16),i.fillStyle=`#0f172a`,i.font=`bold 18px Arial, sans-serif`,i.textAlign=`center`,i.fillText(`QRIS DINAMIS PEMBAYARAN KAS`,r.width/2,42),i.fillStyle=`#163a78`,i.font=`bold 16px Arial, sans-serif`,i.fillText(t.qris_merchant_name||`Mas_hy, Fashion`,r.width/2,68),i.fillStyle=`#475569`,i.font=`13px monospace`,i.fillText(`NMID: ${t.qris_nmid||`ID1025463553806`}`,r.width/2,90),i.drawImage(e,(r.width-280)/2,108,280,280),i.fillStyle=`#0f172a`,i.font=`bold 20px monospace`,i.fillText(n>0?g(n):`Nominal Fleksibel`,r.width/2,426),i.fillStyle=`#64748b`,i.font=`12px Arial, sans-serif`,i.fillText(`Kelas ${t.nama_kelas||`R3S`} · Pindai via GoPay / DANA / OVO / Perbankan Seluler`,r.width/2,462);let a=document.createElement(`a`);a.href=r.toDataURL(`image/png`),a.download=`QRIS_Dinamis_${n>0?n:`R3S`}.png`,document.body.appendChild(a),a.click(),document.body.removeChild(a),b(`Gambar QRIS Dinamis (.PNG) diunduh!`,`success`)}),document.getElementById(`btn-copy-rekening`).addEventListener(`click`,()=>{let e=document.getElementById(`bank-number-display`).textContent;navigator.clipboard?.writeText(e),b(`Nomor rekening ${e} berhasil disalin!`,`success`)}),document.getElementById(`pay-kas-bukti`).addEventListener(`change`,e=>{let t=e.target.files[0],n=document.getElementById(`pay-kas-preview`);t?(n.src=URL.createObjectURL(t),n.classList.remove(`hidden`)):n.classList.add(`hidden`)}),document.getElementById(`form-pay-kas`).addEventListener(`submit`,We),document.getElementById(`form-edit-absen`).addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`edit-absen-id`).value;try{await N.update(`absensi`,t,{status_kehadiran:document.getElementById(`edit-absen-status`).value,status_verifikasi:document.getElementById(`edit-absen-verif`).value,catatan:document.getElementById(`edit-absen-catatan`).value.trim(),pj_id:c.currentUser.id,pj_nama:c.currentUser.nama_lengkap,dicatat_oleh:c.currentUser.id}),await N.loadAll(),Q(`modal-edit-absen`),b(`Data kehadiran berhasil diperbarui!`,`success`),L(),R()}catch(e){b(e.message||`Gagal memperbarui absensi.`,`danger`)}});let e=localStorage.getItem(r.SESSION_USER);if(e)try{await N.loadAll();let t=c.profiles.find(t=>t.id===e);t&&ce(t)}catch{}}document.addEventListener(`DOMContentLoaded`,sn);