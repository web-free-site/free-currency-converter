
// ═══════════════════════════════════════════════════════
// TRANSLATIONS  (26 languages)
// ═══════════════════════════════════════════════════════
const LANGS = {
  en:{name:'EN',dir:'ltr',appTitle:'Free Currency Converter',appSub:'Live rates · No API key · RWF, CDF, XOF, KES & more',liveBadge:'LIVE',labelApiSource:'Data Source',labelAmount:'Amount',labelFrom:'From',labelTo:'To',btnText:'CONVERT',resultLabel:'Result',resultRate:(a,f,r,t)=>`${a} ${f} = <strong>${r} ${t}</strong>`,footer:'Indicative rates only — not for bank transfers · <a href="/about/">About</a> · UI from SeyyidKadir/fx-currency-converter (MIT)',statusFetching:'Fetching rates…',statusOk:(src,n)=>`${src} · ${n} currencies`,statusErr:'Failed to fetch',lastUpdate:'Updated',errGeneric:'Could not fetch rates.',errSuggestion:(cur)=>`Rates for ${cur} may be unavailable right now. The site tries <strong>open.er-api.com</strong> first, then <strong>Fawaz</strong> as backup — or switch the data source tab.`,fsLabel:'Font Size'},
  tr:{name:'TR',dir:'ltr',appTitle:'Döviz Çevirici',appSub:'Anlık · API anahtarı yok',liveBadge:'CANLI',labelApiSource:'Veri Kaynağı',labelAmount:'Miktar',labelFrom:'Kaynak',labelTo:'Hedef',btnText:'ÇEVİR',resultLabel:'Sonuç',resultRate:(a,f,r,t)=>`${a} ${f} = <strong>${r} ${t}</strong>`,footer:'API anahtarı yok · Açık kaynak · Kurlar tahminidir',statusFetching:'Kurlar alınıyor…',statusOk:(src,n)=>`${src} · ${n} para birimi`,statusErr:'Bağlantı başarısız',lastUpdate:'Güncellendi',errGeneric:'Kurlar alınamadı.',errSuggestion:(cur)=>`Bu API ${cur} birimini desteklemiyor olabilir veya geçici olarak erişilemiyor. Farklı bir veri kaynağı deneyin — genellikle en kararlı seçenek <strong>Frankfurter</strong>'dır.`,fsLabel:'Yazı Boyutu'},
  de:{name:'DE',dir:'ltr',appTitle:'Währungsrechner',appSub:'Echtzeit · Kein API-Schlüssel',liveBadge:'LIVE',labelApiSource:'Datenquelle',labelAmount:'Betrag',labelFrom:'Von',labelTo:'Nach',btnText:'UMRECHNEN',resultLabel:'Ergebnis',resultRate:(a,f,r,t)=>`${a} ${f} = <strong>${r} ${t}</strong>`,footer:'Kein API-Schlüssel · Open-Source-APIs · Kurse sind indikativ',statusFetching:'Kurse werden abgerufen…',statusOk:(src,n)=>`${src} · ${n} Währungen`,statusErr:'Abruf fehlgeschlagen',lastUpdate:'Aktualisiert',errGeneric:'Kurse konnten nicht abgerufen werden.',errSuggestion:(cur)=>`Diese API unterstützt möglicherweise ${cur} nicht. Versuchen Sie eine andere Quelle — <strong>Frankfurter</strong> ist meistens am zuverlässigsten.`,fsLabel:'Schriftgröße'},
  fr:{name:'FR',dir:'ltr',appTitle:'Convertisseur de devises gratuit',appSub:'Temps réel · Sans clé API · Franc CFA, RWF, CDF…',liveBadge:'EN DIRECT',labelApiSource:'Source de données',labelAmount:'Montant',labelFrom:'De',labelTo:'Vers',btnText:'CONVERTIR',resultLabel:'Résultat',resultRate:(a,f,r,t)=>`${a} ${f} = <strong>${r} ${t}</strong>`,footer:'Taux indicatifs — pas pour virements officiels · <a href="/fr/">Accueil FR</a> · Interface : SeyyidKadir/fx-currency-converter (MIT)',statusFetching:'Récupération des taux…',statusOk:(src,n)=>`${src} · ${n} devises`,statusErr:'Échec de la connexion',lastUpdate:'Mis à jour',errGeneric:'Impossible de récupérer les taux.',errSuggestion:(cur)=>`Les taux pour ${cur} sont peut-être indisponibles. Le site utilise <strong>open.er-api.com</strong> puis <strong>Fawaz</strong> en secours.`,fsLabel:'Taille de police'},
  es:{name:'ES',dir:'ltr',appTitle:'Conversor de Divisas',appSub:'Tiempo real · Sin clave API',liveBadge:'EN VIVO',labelApiSource:'Fuente de datos',labelAmount:'Cantidad',labelFrom:'De',labelTo:'A',btnText:'CONVERTIR',resultLabel:'Resultado',resultRate:(a,f,r,t)=>`${a} ${f} = <strong>${r} ${t}</strong>`,footer:'Sin clave API · APIs abiertas · Tipos indicativos',statusFetching:'Obteniendo tipos…',statusOk:(src,n)=>`${src} · ${n} divisas`,statusErr:'Error de conexión',lastUpdate:'Actualizado',errGeneric:'No se pudieron obtener los tipos.',errSuggestion:(cur)=>`Esta API puede no admitir ${cur}. Pruebe otra fuente — <strong>Frankfurter</strong> suele ser la más fiable.`,fsLabel:'Tamaño de fuente'},
  pt:{name:'PT',dir:'ltr',appTitle:'Conversor de Moeda',appSub:'Tempo real · Sem chave API',liveBadge:'AO VIVO',labelApiSource:'Fonte de dados',labelAmount:'Valor',labelFrom:'De',labelTo:'Para',btnText:'CONVERTER',resultLabel:'Resultado',resultRate:(a,f,r,t)=>`${a} ${f} = <strong>${r} ${t}</strong>`,footer:'Sem chave API · APIs abertas · Taxas indicativas',statusFetching:'Buscando taxas…',statusOk:(src,n)=>`${src} · ${n} moedas`,statusErr:'Falha na conexão',lastUpdate:'Atualizado',errGeneric:'Não foi possível obter as taxas.',errSuggestion:(cur)=>`Esta API pode não suportar ${cur}. Tente outra fonte — <strong>Frankfurter</strong> costuma ser a mais confiável.`,fsLabel:'Tamanho da fonte'},
  ru:{name:'RU',dir:'ltr',appTitle:'Конвертер валют',appSub:'В реальном времени · Без ключа',liveBadge:'LIVE',labelApiSource:'Источник данных',labelAmount:'Сумма',labelFrom:'Из',labelTo:'В',btnText:'КОНВЕРТИРОВАТЬ',resultLabel:'Результат',resultRate:(a,f,r,t)=>`${a} ${f} = <strong>${r} ${t}</strong>`,footer:'Без ключа API · Открытые API · Курсы ориентировочны',statusFetching:'Загрузка курсов…',statusOk:(src,n)=>`${src} · ${n} валют`,statusErr:'Ошибка подключения',lastUpdate:'Обновлено',errGeneric:'Не удалось получить курсы.',errSuggestion:(cur)=>`Этот API может не поддерживать ${cur}. Попробуйте другой источник — <strong>Frankfurter</strong> обычно самый надёжный.`,fsLabel:'Размер шрифта'},
  zh:{name:'ZH',dir:'ltr',appTitle:'货币换算器',appSub:'实时 · 无需API密钥',liveBadge:'实时',labelApiSource:'数据来源',labelAmount:'金额',labelFrom:'从',labelTo:'到',btnText:'换算',resultLabel:'结果',resultRate:(a,f,r,t)=>`${a} ${f} = <strong>${r} ${t}</strong>`,footer:'无需API密钥 · 开源API · 汇率仅供参考',statusFetching:'正在获取汇率…',statusOk:(src,n)=>`${src} · ${n}种货币`,statusErr:'连接失败',lastUpdate:'更新于',errGeneric:'无法获取汇率。',errSuggestion:(cur)=>`此API可能不支持${cur}。请尝试其他数据源——<strong>Frankfurter</strong>通常最为稳定。`,fsLabel:'字体大小'},
  ja:{name:'JA',dir:'ltr',appTitle:'通貨コンバーター',appSub:'リアルタイム · APIキー不要',liveBadge:'ライブ',labelApiSource:'データソース',labelAmount:'金額',labelFrom:'変換元',labelTo:'変換先',btnText:'変換する',resultLabel:'結果',resultRate:(a,f,r,t)=>`${a} ${f} = <strong>${r} ${t}</strong>`,footer:'APIキー不要 · オープンソースAPI · レートは参考値',statusFetching:'レートを取得中…',statusOk:(src,n)=>`${src} · ${n}通貨`,statusErr:'接続に失敗',lastUpdate:'更新',errGeneric:'レートを取得できませんでした。',errSuggestion:(cur)=>`このAPIは${cur}をサポートしていない可能性があります。別のソースをお試しください。<strong>Frankfurter</strong>が通常最も安定しています。`,fsLabel:'フォントサイズ'},
  ko:{name:'KO',dir:'ltr',appTitle:'환율 계산기',appSub:'실시간 · API 키 불필요',liveBadge:'실시간',labelApiSource:'데이터 소스',labelAmount:'금액',labelFrom:'기준 통화',labelTo:'환산 통화',btnText:'환산하기',resultLabel:'결과',resultRate:(a,f,r,t)=>`${a} ${f} = <strong>${r} ${t}</strong>`,footer:'API 키 불필요 · 오픈소스 API · 환율은 참고용',statusFetching:'환율 조회 중…',statusOk:(src,n)=>`${src} · ${n}개 통화`,statusErr:'연결 실패',lastUpdate:'업데이트됨',errGeneric:'환율을 가져오지 못했습니다.',errSuggestion:(cur)=>`이 API는 ${cur}을(를) 지원하지 않을 수 있습니다. 다른 소스를 사용해보세요. <strong>Frankfurter</strong>가 가장 안정적입니다.`,fsLabel:'글꼴 크기'},
  ar:{name:'AR',dir:'rtl',appTitle:'محول العملات',appSub:'فوري · بدون مفتاح API',liveBadge:'مباشر',labelApiSource:'مصدر البيانات',labelAmount:'المبلغ',labelFrom:'من',labelTo:'إلى',btnText:'تحويل',resultLabel:'النتيجة',resultRate:(a,f,r,t)=>`${a} ${f} = <strong>${r} ${t}</strong>`,footer:'بدون مفتاح API · واجهات مفتوحة · الأسعار استرشادية',statusFetching:'جارٍ جلب الأسعار…',statusOk:(src,n)=>`${src} · ${n} عملة`,statusErr:'فشل الاتصال',lastUpdate:'تم التحديث',errGeneric:'تعذّر الحصول على الأسعار.',errSuggestion:(cur)=>`قد لا تدعم هذه الواجهة ${cur}. جرّب مصدرًا آخر — <strong>Frankfurter</strong> هو الأكثر موثوقية عادةً.`,fsLabel:'حجم الخط'},
  hi:{name:'HI',dir:'ltr',appTitle:'मुद्रा परिवर्तक',appSub:'रियल-टाइम · API कुंजी नहीं',liveBadge:'लाइव',labelApiSource:'डेटा स्रोत',labelAmount:'राशि',labelFrom:'से',labelTo:'तक',btnText:'बदलें',resultLabel:'परिणाम',resultRate:(a,f,r,t)=>`${a} ${f} = <strong>${r} ${t}</strong>`,footer:'API कुंजी नहीं · खुले स्रोत API · दरें सांकेतिक',statusFetching:'दरें प्राप्त हो रही हैं…',statusOk:(src,n)=>`${src} · ${n} मुद्राएं`,statusErr:'कनेक्शन विफल',lastUpdate:'अपडेट किया',errGeneric:'दरें प्राप्त नहीं हो सकीं।',errSuggestion:(cur)=>`यह API ${cur} का समर्थन नहीं कर सकता। दूसरा स्रोत आज़माएं — <strong>Frankfurter</strong> सबसे विश्वसनीय है।`,fsLabel:'फ़ॉन्ट आकार'},
  id:{name:'ID',dir:'ltr',appTitle:'Konverter Mata Uang',appSub:'Real-time · Tanpa kunci API',liveBadge:'LANGSUNG',labelApiSource:'Sumber Data',labelAmount:'Jumlah',labelFrom:'Dari',labelTo:'Ke',btnText:'KONVERSI',resultLabel:'Hasil',resultRate:(a,f,r,t)=>`${a} ${f} = <strong>${r} ${t}</strong>`,footer:'Tanpa kunci API · API terbuka · Kurs bersifat indikatif',statusFetching:'Mengambil kurs…',statusOk:(src,n)=>`${src} · ${n} mata uang`,statusErr:'Koneksi gagal',lastUpdate:'Diperbarui',errGeneric:'Kurs tidak dapat diambil.',errSuggestion:(cur)=>`API ini mungkin tidak mendukung ${cur}. Coba sumber lain — <strong>Frankfurter</strong> biasanya paling andal.`,fsLabel:'Ukuran Font'},
  it:{name:'IT',dir:'ltr',appTitle:'Convertitore Valute',appSub:'Tempo reale · Nessuna chiave API',liveBadge:'LIVE',labelApiSource:'Fonte dati',labelAmount:'Importo',labelFrom:'Da',labelTo:'A',btnText:'CONVERTI',resultLabel:'Risultato',resultRate:(a,f,r,t)=>`${a} ${f} = <strong>${r} ${t}</strong>`,footer:'Nessuna chiave API · API aperte · Tassi indicativi',statusFetching:'Recupero tassi…',statusOk:(src,n)=>`${src} · ${n} valute`,statusErr:'Connessione fallita',lastUpdate:'Aggiornato',errGeneric:'Impossibile recuperare i tassi.',errSuggestion:(cur)=>`Questa API potrebbe non supportare ${cur}. Prova un\'altra fonte — <strong>Frankfurter</strong> è solitamente la più affidabile.`,fsLabel:'Dimensione font'},
  nl:{name:'NL',dir:'ltr',appTitle:'Valutaomrekener',appSub:'Realtime · Geen API-sleutel',liveBadge:'LIVE',labelApiSource:'Gegevensbron',labelAmount:'Bedrag',labelFrom:'Van',labelTo:'Naar',btnText:'OMREKENEN',resultLabel:'Resultaat',resultRate:(a,f,r,t)=>`${a} ${f} = <strong>${r} ${t}</strong>`,footer:'Geen API-sleutel · Open API\'s · Koersen zijn indicatief',statusFetching:'Koersen ophalen…',statusOk:(src,n)=>`${src} · ${n} valuta's`,statusErr:'Verbinding mislukt',lastUpdate:'Bijgewerkt',errGeneric:'Koersen konden niet worden opgehaald.',errSuggestion:(cur)=>`Deze API ondersteunt ${cur} mogelijk niet. Probeer een andere bron — <strong>Frankfurter</strong> is doorgaans het meest betrouwbaar.`,fsLabel:'Lettergrootte'},
  pl:{name:'PL',dir:'ltr',appTitle:'Przelicznik Walut',appSub:'Czas rzeczywisty · Bez klucza API',liveBadge:'NA ŻYWO',labelApiSource:'Źródło danych',labelAmount:'Kwota',labelFrom:'Z',labelTo:'Na',btnText:'PRZELICZ',resultLabel:'Wynik',resultRate:(a,f,r,t)=>`${a} ${f} = <strong>${r} ${t}</strong>`,footer:'Bez klucza API · Otwarte API · Kursy orientacyjne',statusFetching:'Pobieranie kursów…',statusOk:(src,n)=>`${src} · ${n} walut`,statusErr:'Błąd połączenia',lastUpdate:'Zaktualizowano',errGeneric:'Nie udało się pobrać kursów.',errSuggestion:(cur)=>`To API może nie obsługiwać ${cur}. Wypróbuj inne źródło — <strong>Frankfurter</strong> jest zazwyczaj najbardziej niezawodny.`,fsLabel:'Rozmiar czcionki'},
  uk:{name:'UK',dir:'ltr',appTitle:'Конвертер валют',appSub:'В реальному часі · Без ключа',liveBadge:'LIVE',labelApiSource:'Джерело даних',labelAmount:'Сума',labelFrom:'З',labelTo:'В',btnText:'КОНВЕРТУВАТИ',resultLabel:'Результат',resultRate:(a,f,r,t)=>`${a} ${f} = <strong>${r} ${t}</strong>`,footer:'Без ключа API · Відкриті API · Курси орієнтовні',statusFetching:'Завантаження курсів…',statusOk:(src,n)=>`${src} · ${n} валют`,statusErr:'Помилка з\'єднання',lastUpdate:'Оновлено',errGeneric:'Не вдалося отримати курси.',errSuggestion:(cur)=>`Цей API може не підтримувати ${cur}. Спробуйте інше джерело — <strong>Frankfurter</strong> зазвичай найнадійніший.`,fsLabel:'Розмір шрифту'},
  sv:{name:'SV',dir:'ltr',appTitle:'Valutaomvandlare',appSub:'Realtid · Ingen API-nyckel',liveBadge:'LIVE',labelApiSource:'Datakälla',labelAmount:'Belopp',labelFrom:'Från',labelTo:'Till',btnText:'OMVANDLA',resultLabel:'Resultat',resultRate:(a,f,r,t)=>`${a} ${f} = <strong>${r} ${t}</strong>`,footer:'Ingen API-nyckel · Öppna API:er · Kurser är vägledande',statusFetching:'Hämtar kurser…',statusOk:(src,n)=>`${src} · ${n} valutor`,statusErr:'Anslutning misslyckades',lastUpdate:'Uppdaterad',errGeneric:'Det gick inte att hämta kurser.',errSuggestion:(cur)=>`Detta API kanske inte stöder ${cur}. Försök med en annan källa — <strong>Frankfurter</strong> är vanligtvis mest tillförlitlig.`,fsLabel:'Teckenstorlek'},
  th:{name:'TH',dir:'ltr',appTitle:'แปลงสกุลเงิน',appSub:'เรียลไทม์ · ไม่ต้องใช้ API Key',liveBadge:'สด',labelApiSource:'แหล่งข้อมูล',labelAmount:'จำนวน',labelFrom:'จาก',labelTo:'เป็น',btnText:'แปลง',resultLabel:'ผลลัพธ์',resultRate:(a,f,r,t)=>`${a} ${f} = <strong>${r} ${t}</strong>`,footer:'ไม่ต้องใช้ API Key · API โอเพนซอร์ส · อัตราเป็นข้อมูลอ้างอิง',statusFetching:'กำลังดึงอัตราแลกเปลี่ยน…',statusOk:(src,n)=>`${src} · ${n} สกุลเงิน`,statusErr:'การเชื่อมต่อล้มเหลว',lastUpdate:'อัปเดตแล้ว',errGeneric:'ไม่สามารถดึงอัตราแลกเปลี่ยนได้',errSuggestion:(cur)=>`API นี้อาจไม่รองรับ ${cur} ลองเปลี่ยนแหล่งข้อมูล — <strong>Frankfurter</strong> มักเสถียรที่สุด`,fsLabel:'ขนาดตัวอักษร'},
  vi:{name:'VI',dir:'ltr',appTitle:'Chuyển Đổi Tiền Tệ',appSub:'Thời gian thực · Không cần API key',liveBadge:'TRỰC TIẾP',labelApiSource:'Nguồn dữ liệu',labelAmount:'Số tiền',labelFrom:'Từ',labelTo:'Sang',btnText:'CHUYỂN ĐỔI',resultLabel:'Kết quả',resultRate:(a,f,r,t)=>`${a} ${f} = <strong>${r} ${t}</strong>`,footer:'Không cần API key · API mã nguồn mở · Tỷ giá tham khảo',statusFetching:'Đang lấy tỷ giá…',statusOk:(src,n)=>`${src} · ${n} loại tiền`,statusErr:'Kết nối thất bại',lastUpdate:'Đã cập nhật',errGeneric:'Không thể lấy tỷ giá.',errSuggestion:(cur)=>`API này có thể không hỗ trợ ${cur}. Hãy thử nguồn khác — <strong>Frankfurter</strong> thường đáng tin cậy nhất.`,fsLabel:'Cỡ chữ'},
  el:{name:'EL',dir:'ltr',appTitle:'Μετατροπέας Νομισμάτων',appSub:'Σε πραγματικό χρόνο · Χωρίς κλειδί API',liveBadge:'ΖΩΝΤΑΝΑ',labelApiSource:'Πηγή δεδομένων',labelAmount:'Ποσό',labelFrom:'Από',labelTo:'Προς',btnText:'ΜΕΤΑΤΡΟΠΗ',resultLabel:'Αποτέλεσμα',resultRate:(a,f,r,t)=>`${a} ${f} = <strong>${r} ${t}</strong>`,footer:'Χωρίς κλειδί API · Ανοιχτά API · Ισοτιμίες ενδεικτικές',statusFetching:'Λήψη ισοτιμιών…',statusOk:(src,n)=>`${src} · ${n} νομίσματα`,statusErr:'Αποτυχία σύνδεσης',lastUpdate:'Ενημερώθηκε',errGeneric:'Δεν ήταν δυνατή η λήψη ισοτιμιών.',errSuggestion:(cur)=>`Αυτό το API ενδέχεται να μην υποστηρίζει ${cur}. Δοκιμάστε άλλη πηγή — το <strong>Frankfurter</strong> είναι συνήθως το πιο αξιόπιστο.`,fsLabel:'Μέγεθος γραμματοσειράς'},
  bn:{name:'BN',dir:'ltr',appTitle:'মুদ্রা রূপান্তরকারী',appSub:'রিয়েল-টাইম · API কী প্রয়োজন নেই',liveBadge:'লাইভ',labelApiSource:'ডেটা উৎস',labelAmount:'পরিমাণ',labelFrom:'থেকে',labelTo:'তে',btnText:'রূপান্তর করুন',resultLabel:'ফলাফল',resultRate:(a,f,r,t)=>`${a} ${f} = <strong>${r} ${t}</strong>`,footer:'API কী নেই · ওপেন সোর্স API · হার আনুমানিক',statusFetching:'হার আনা হচ্ছে…',statusOk:(src,n)=>`${src} · ${n}টি মুদ্রা`,statusErr:'সংযোগ ব্যর্থ',lastUpdate:'আপডেট হয়েছে',errGeneric:'হার আনা সম্ভব হয়নি।',errSuggestion:(cur)=>`এই API ${cur} সমর্থন নাও করতে পারে। অন্য উৎস ব্যবহার করুন — <strong>Frankfurter</strong> সাধারণত সবচেয়ে নির্ভরযোগ্য।`,fsLabel:'ফন্ট আকার'},
  fa:{name:'FA',dir:'rtl',appTitle:'تبدیل ارز',appSub:'آنی · بدون کلید API',liveBadge:'زنده',labelApiSource:'منبع داده',labelAmount:'مقدار',labelFrom:'از',labelTo:'به',btnText:'تبدیل',resultLabel:'نتیجه',resultRate:(a,f,r,t)=>`${a} ${f} = <strong>${r} ${t}</strong>`,footer:'بدون کلید API · APIهای آزاد · نرخ‌ها تقریبی هستند',statusFetching:'در حال دریافت نرخ‌ها…',statusOk:(src,n)=>`${src} · ${n} ارز`,statusErr:'اتصال ناموفق',lastUpdate:'به‌روزرسانی شد',errGeneric:'دریافت نرخ‌ها ممکن نشد.',errSuggestion:(cur)=>`این API ممکن است ${cur} را پشتیبانی نکند. منبع دیگری را امتحان کنید — <strong>Frankfurter</strong> معمولاً قابل‌اطمینان‌ترین است.`,fsLabel:'اندازه قلم'},
  cs:{name:'CS',dir:'ltr',appTitle:'Převodník měn',appSub:'Reálný čas · Bez API klíče',liveBadge:'LIVE',labelApiSource:'Zdroj dat',labelAmount:'Částka',labelFrom:'Z',labelTo:'Na',btnText:'PŘEVÉST',resultLabel:'Výsledek',resultRate:(a,f,r,t)=>`${a} ${f} = <strong>${r} ${t}</strong>`,footer:'Bez API klíče · Otevřená API · Kurzy jsou orientační',statusFetching:'Načítám kurzy…',statusOk:(src,n)=>`${src} · ${n} měn`,statusErr:'Připojení selhalo',lastUpdate:'Aktualizováno',errGeneric:'Kurzy se nepodařilo načíst.',errSuggestion:(cur)=>`Toto API nemusí podporovat ${cur}. Zkuste jiný zdroj — <strong>Frankfurter</strong> je obvykle nejspolehlivější.`,fsLabel:'Velikost písma'},
  ro:{name:'RO',dir:'ltr',appTitle:'Convertor Valutar',appSub:'Timp real · Fără cheie API',liveBadge:'LIVE',labelApiSource:'Sursă de date',labelAmount:'Sumă',labelFrom:'Din',labelTo:'În',btnText:'CONVERTEȘTE',resultLabel:'Rezultat',resultRate:(a,f,r,t)=>`${a} ${f} = <strong>${r} ${t}</strong>`,footer:'Fără cheie API · API-uri deschise · Cursuri orientative',statusFetching:'Se preiau cursurile…',statusOk:(src,n)=>`${src} · ${n} valute`,statusErr:'Conexiune eșuată',lastUpdate:'Actualizat',errGeneric:'Cursurile nu au putut fi preluate.',errSuggestion:(cur)=>`Acest API s-ar putea să nu suporte ${cur}. Încearcă altă sursă — <strong>Frankfurter</strong> este de obicei cel mai fiabil.`,fsLabel:'Dimensiunea fontului'},
  da:{name:'DA',dir:'ltr',appTitle:'Valutaomregner',appSub:'Realtid · Ingen API-nøgle',liveBadge:'LIVE',labelApiSource:'Datakilde',labelAmount:'Beløb',labelFrom:'Fra',labelTo:'Til',btnText:'OMREGN',resultLabel:'Resultat',resultRate:(a,f,r,t)=>`${a} ${f} = <strong>${r} ${t}</strong>`,footer:'Ingen API-nøgle · Åbne API\'er · Kurser er vejledende',statusFetching:'Henter kurser…',statusOk:(src,n)=>`${src} · ${n} valutaer`,statusErr:'Forbindelse mislykkedes',lastUpdate:'Opdateret',errGeneric:'Kurser kunne ikke hentes.',errSuggestion:(cur)=>`Denne API understøtter muligvis ikke ${cur}. Prøv en anden kilde — <strong>Frankfurter</strong> er normalt mest pålidelig.`,fsLabel:'Skriftstørrelse'},
};

// ═══════════════════════════════════════════════════════
// CURRENCIES
// ═══════════════════════════════════════════════════════
const CURRENCIES=[
  {code:'AED',name:'UAE Dirham'},{code:'AFN',name:'Afghan Afghani'},{code:'ALL',name:'Albanian Lek'},
  {code:'AMD',name:'Armenian Dram'},{code:'ANG',name:'NL Antillean Guilder'},{code:'AOA',name:'Angolan Kwanza'},
  {code:'ARS',name:'Argentine Peso'},{code:'AUD',name:'Australian Dollar'},{code:'AWG',name:'Aruban Florin'},
  {code:'AZN',name:'Azerbaijani Manat'},{code:'BAM',name:'Bosnia Mark'},{code:'BBD',name:'Barbados Dollar'},
  {code:'BDT',name:'Bangladeshi Taka'},{code:'BGN',name:'Bulgarian Lev'},{code:'BHD',name:'Bahraini Dinar'},
  {code:'BIF',name:'Burundian Franc'},{code:'BMD',name:'Bermudian Dollar'},{code:'BND',name:'Brunei Dollar'},
  {code:'BOB',name:'Bolivian Boliviano'},{code:'BRL',name:'Brazilian Real'},{code:'BSD',name:'Bahamian Dollar'},
  {code:'BTN',name:'Bhutanese Ngultrum'},{code:'BWP',name:'Botswanan Pula'},{code:'BYN',name:'Belarusian Ruble'},
  {code:'BZD',name:'Belize Dollar'},{code:'CAD',name:'Canadian Dollar'},{code:'CDF',name:'Congolese Franc'},
  {code:'CHF',name:'Swiss Franc'},{code:'CLP',name:'Chilean Peso'},{code:'CNY',name:'Chinese Yuan'},
  {code:'COP',name:'Colombian Peso'},{code:'CRC',name:'Costa Rican Colón'},{code:'CUP',name:'Cuban Peso'},
  {code:'CVE',name:'Cape Verdean Escudo'},{code:'CZK',name:'Czech Koruna'},{code:'DJF',name:'Djiboutian Franc'},
  {code:'DKK',name:'Danish Krone'},{code:'DOP',name:'Dominican Peso'},{code:'DZD',name:'Algerian Dinar'},
  {code:'EGP',name:'Egyptian Pound'},{code:'ERN',name:'Eritrean Nakfa'},{code:'ETB',name:'Ethiopian Birr'},
  {code:'EUR',name:'Euro'},{code:'FJD',name:'Fijian Dollar'},{code:'GBP',name:'British Pound'},
  {code:'GEL',name:'Georgian Lari'},{code:'GHS',name:'Ghanaian Cedi'},{code:'GMD',name:'Gambian Dalasi'},
  {code:'GTQ',name:'Guatemalan Quetzal'},{code:'HKD',name:'Hong Kong Dollar'},{code:'HNL',name:'Honduran Lempira'},
  {code:'HRK',name:'Croatian Kuna'},{code:'HTG',name:'Haitian Gourde'},{code:'HUF',name:'Hungarian Forint'},
  {code:'IDR',name:'Indonesian Rupiah'},{code:'ILS',name:'Israeli Shekel'},{code:'INR',name:'Indian Rupee'},
  {code:'IQD',name:'Iraqi Dinar'},{code:'IRR',name:'Iranian Rial'},{code:'ISK',name:'Icelandic Króna'},
  {code:'JMD',name:'Jamaican Dollar'},{code:'JOD',name:'Jordanian Dinar'},{code:'JPY',name:'Japanese Yen'},
  {code:'KES',name:'Kenyan Shilling'},{code:'KGS',name:'Kyrgyzstani Som'},{code:'KHR',name:'Cambodian Riel'},
  {code:'KPW',name:'North Korean Won'},{code:'KRW',name:'South Korean Won'},{code:'KWD',name:'Kuwaiti Dinar'},
  {code:'KZT',name:'Kazakhstani Tenge'},{code:'LAK',name:'Laotian Kip'},{code:'LBP',name:'Lebanese Pound'},
  {code:'LKR',name:'Sri Lankan Rupee'},{code:'LYD',name:'Libyan Dinar'},{code:'MAD',name:'Moroccan Dirham'},
  {code:'MDL',name:'Moldovan Leu'},{code:'MKD',name:'Macedonian Denar'},{code:'MMK',name:'Myanmar Kyat'},
  {code:'MNT',name:'Mongolian Tögrög'},{code:'MUR',name:'Mauritian Rupee'},{code:'MVR',name:'Maldivian Rufiyaa'},
  {code:'MWK',name:'Malawian Kwacha'},{code:'MXN',name:'Mexican Peso'},{code:'MYR',name:'Malaysian Ringgit'},
  {code:'MZN',name:'Mozambican Metical'},{code:'NAD',name:'Namibian Dollar'},{code:'NGN',name:'Nigerian Naira'},
  {code:'NIO',name:'Nicaraguan Córdoba'},{code:'NOK',name:'Norwegian Krone'},{code:'NPR',name:'Nepalese Rupee'},
  {code:'NZD',name:'New Zealand Dollar'},{code:'OMR',name:'Omani Rial'},{code:'PAB',name:'Panamanian Balboa'},
  {code:'PEN',name:'Peruvian Sol'},{code:'PGK',name:'Papua New Guinean Kina'},{code:'PHP',name:'Philippine Peso'},
  {code:'PKR',name:'Pakistani Rupee'},{code:'PLN',name:'Polish Złoty'},{code:'PYG',name:'Paraguayan Guaraní'},
  {code:'QAR',name:'Qatari Riyal'},{code:'RON',name:'Romanian Leu'},{code:'RSD',name:'Serbian Dinar'},
  {code:'RUB',name:'Russian Ruble'},{code:'RWF',name:'Rwandan Franc'},{code:'SAR',name:'Saudi Riyal'},
  {code:'SDG',name:'Sudanese Pound'},{code:'SEK',name:'Swedish Krona'},{code:'SGD',name:'Singapore Dollar'},
  {code:'SOS',name:'Somali Shilling'},{code:'SYP',name:'Syrian Pound'},{code:'THB',name:'Thai Baht'},
  {code:'TJS',name:'Tajikistani Somoni'},{code:'TMT',name:'Turkmenistani Manat'},{code:'TND',name:'Tunisian Dinar'},
  {code:'TRY',name:'Turkish Lira'},{code:'TTD',name:'Trinidad & Tobago Dollar'},{code:'TWD',name:'New Taiwan Dollar'},
  {code:'TZS',name:'Tanzanian Shilling'},{code:'UAH',name:'Ukrainian Hryvnia'},{code:'UGX',name:'Ugandan Shilling'},
  {code:'USD',name:'US Dollar'},{code:'UYU',name:'Uruguayan Peso'},{code:'UZS',name:'Uzbekistani Som'},
  {code:'VES',name:'Venezuelan Bolívar'},{code:'VND',name:'Vietnamese Dong'},{code:'XAF',name:'Central African CFA'},
  {code:'XOF',name:'West African CFA'},{code:'YER',name:'Yemeni Rial'},{code:'ZAR',name:'South African Rand'},
  {code:'ZMW',name:'Zambian Kwacha'},{code:'ZWL',name:'Zimbabwean Dollar'},
];

// ═══════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════
let currentLang = 'en';
let currentApi  = 'auto';
let ratesCache  = {};   // { from: { rates:{}, timestamp:'' } }
let lastSourceLabel = 'open.er-api.com';

// ═══════════════════════════════════════════════════════
// FONT SIZE
// ═══════════════════════════════════════════════════════
function setFs(cls, btn) {
  document.body.classList.remove('fs-md','fs-lg');
  if (cls !== 'fs-sm') document.body.classList.add(cls);
  document.querySelectorAll('.fs-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// ═══════════════════════════════════════════════════════
// LANG
// ═══════════════════════════════════════════════════════
function detectLang() {
  const code = (navigator.language||'en').split('-')[0].toLowerCase();
  return LANGS[code] ? code : 'en';
}
function applyLang(lang) {
  currentLang = lang;
  const t = LANGS[lang];
  document.documentElement.lang = lang;
  document.documentElement.dir = t.dir;
  document.getElementById('appTitle').textContent     = t.appTitle;
  document.getElementById('appSub').textContent       = t.appSub;
  document.getElementById('liveBadge').textContent    = t.liveBadge;
  document.getElementById('labelApiSource').textContent = t.labelApiSource;
  document.getElementById('labelAmount').textContent  = t.labelAmount;
  document.getElementById('labelFrom').textContent    = t.labelFrom;
  document.getElementById('labelTo').textContent      = t.labelTo;
  document.getElementById('btnText').textContent      = t.btnText;
  document.getElementById('resultLabel').textContent  = t.resultLabel;
  const foot = document.getElementById('footerText');
  if (foot) {
    foot.innerHTML = t.footer;
  }
  document.getElementById('fsLabel').textContent      = t.fsLabel;
  document.querySelectorAll('.lang-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.lang === lang));
  // Re-render status if we have cache
  const from = document.getElementById('from').value;
  if (ratesCache[from]) updateStatusOk(from);
}
function buildLangBar() {
  const bar = document.getElementById('langBar');
  Object.entries(LANGS).forEach(([code,t]) => {
    const btn = document.createElement('button');
    btn.className = 'lang-btn'; btn.dataset.lang = code; btn.textContent = t.name;
    btn.onclick = () => applyLang(code);
    bar.appendChild(btn);
  });
}

// ═══════════════════════════════════════════════════════
// SELECTS
// ═══════════════════════════════════════════════════════
function buildSelects() {
  ['from','to'].forEach(id => {
    const sel = document.getElementById(id);
    CURRENCIES.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.code; opt.textContent = `${c.code} — ${c.name}`;
      sel.appendChild(opt);
    });
  });
  const preset = window.PAGE_PRESET || {};
  document.getElementById('from').value = preset.from || 'USD';
  document.getElementById('to').value   = preset.to || 'RWF';
  if (preset.amount) document.getElementById('amount').value = preset.amount;
}

// ═══════════════════════════════════════════════════════
// API FETCH
// ═══════════════════════════════════════════════════════
async function fetchRatesFromOpenEr(from) {
  const r = await fetch(`https://open.er-api.com/v6/latest/${from}`);
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const d = await r.json();
  const rates = d.rates || {};
  if (!Object.keys(rates).length) throw new Error('Empty rates');
  rates[from] = 1;
  return { rates, source: 'open.er-api.com' };
}

async function fetchRatesFromFawaz(from) {
  const fromLower = from.toLowerCase();
  let r = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromLower}.json`);
  if (!r.ok) {
    r = await fetch(`https://latest.currency-api.pages.dev/v1/currencies/${fromLower}.json`);
  }
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const d = await r.json();
  const raw = d[fromLower] || {};
  const rates = {};
  Object.keys(raw).forEach(k => { rates[k.toUpperCase()] = raw[k]; });
  rates[from] = 1;
  return { rates, source: 'Fawaz API' };
}

async function fetchRatesFrankfurter(from) {
  const r = await fetch(`https://api.frankfurter.app/latest?from=${from}`);
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const d = await r.json();
  const rates = d.rates || {};
  rates[from] = 1;
  return { rates, source: 'Frankfurter' };
}

async function fetchRates(from) {
  setStatus('loading', LANGS[currentLang].statusFetching, '');
  try {
    let payload;
    if (currentApi === 'frankfurter') {
      payload = await fetchRatesFrankfurter(from);
    } else if (currentApi === 'fawaz') {
      payload = await fetchRatesFromFawaz(from);
    } else {
      try {
        payload = await fetchRatesFromOpenEr(from);
      } catch (_) {
        payload = await fetchRatesFromFawaz(from);
        payload.source += ' (fallback)';
      }
    }
  lastSourceLabel = payload.source;
    ratesCache[from] = { rates: payload.rates, timestamp: new Date(), source: payload.source };
    updateStatusOk(from);
    return payload.rates;
  } catch (e) {
    setStatus('err', LANGS[currentLang].statusErr, '');
    throw e;
  }
}


function updateStatusOk(from) {
  const t = LANGS[currentLang];
  const cache = ratesCache[from];
  if (!cache) return;
  const n = Object.keys(cache.rates).length;
  const apiLabel = cache.source || lastSourceLabel;
  const time = cache.timestamp.toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit'});
  setStatus('ok', t.statusOk(apiLabel, n), `${t.lastUpdate} ${time}`);
}

function setStatus(type, text, time) {
  const dot  = document.getElementById('statusDot');
  const txt  = document.getElementById('statusText');
  const tEl  = document.getElementById('statusTime');
  dot.className  = 'status-dot ' + (type==='loading'?'loading':type==='ok'?'ok':'err');
  txt.textContent = text;
  tEl.textContent = time;
}

// ═══════════════════════════════════════════════════════
// EVENTS
// ═══════════════════════════════════════════════════════
function switchApi(api, btn) {
  currentApi = api;
  document.querySelectorAll('.api-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  ratesCache = {};
  clearResult();
  const from = document.getElementById('from').value;
  fetchRates(from);
}

function onFromChange() {
  ratesCache = {};
  clearResult();
  const from = document.getElementById('from').value;
  fetchRates(from);
}

async function refreshRates() {
  const from = document.getElementById('from').value;
  ratesCache = {};
  clearResult();
  const btn = document.getElementById('refreshBtn');
  btn.classList.add('spinning');
  try { await fetchRates(from); } finally { btn.classList.remove('spinning'); }
}

function swapCurrencies() {
  const f = document.getElementById('from'), t = document.getElementById('to');
  const tmp = f.value; f.value = t.value; t.value = tmp;
  onFromChange();
}

// ═══════════════════════════════════════════════════════
// CONVERT
// ═══════════════════════════════════════════════════════
async function convert() {
  const raw = document.getElementById('amount').value.replace(/[^0-9.,]/g, '');
  const normalized = raw.replace(/,/g, '.');
  const amount = parseFloat(normalized.replace(/\.(?=.*\.)/g, ''));
  const from   = document.getElementById('from').value;
  const to     = document.getElementById('to').value;
  const t      = LANGS[currentLang];

  if (!amount || isNaN(amount) || amount <= 0) {
    clearResult(); showError(t.errGeneric, ''); return;
  }

  clearResult();
  document.getElementById('convertBtn').disabled = true;

  try {
    let rate;

    // Try cache first
    if (ratesCache[from] && ratesCache[from].rates[to] !== undefined) {
      rate = ratesCache[from].rates[to];
    } else {
      // Fetch all
      const rates = await fetchRates(from);
      rate = rates[to];
    }

    if (!rate) throw new Error(`Rate for ${to} not available from this source.`);

    const converted = amount * rate;
    document.getElementById('resultAmount').textContent = fmt(converted) + ' ' + to;
    document.getElementById('resultRate').innerHTML = t.resultRate(fmt(amount), from, fmt(rate), to);
    document.getElementById('result').className = 'result show';

  } catch(e) {
    showError(t.errGeneric, t.errSuggestion(to));
    setStatus('err', LANGS[currentLang].statusErr, '');
  } finally {
    document.getElementById('convertBtn').disabled = false;
  }
}

// ═══════════════════════════════════════════════════════
// UI HELPERS
// ═══════════════════════════════════════════════════════
function clearResult() {
  document.getElementById('result').className  = 'result';
  document.getElementById('errorBox').className = 'error-box';
}
function showError(msg, suggestion) {
  document.getElementById('errorMsg').textContent        = msg;
  document.getElementById('errorSuggestion').innerHTML   = suggestion || '';
  document.getElementById('errorBox').className          = 'error-box show';
}
function fmt(n) {
  const num = Number(n);
  if (isNaN(num)) return "0";
  // For very large numbers reduce decimals, for small numbers show more
  const decimals = num >= 1000 ? 2 : num >= 1 ? 4 : 6;
  return num.toLocaleString(undefined, {maximumFractionDigits: decimals});
}

// ═══════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════
function setQuickPair(from, to) {
  document.getElementById('from').value = from;
  document.getElementById('to').value = to;
  onFromChange();
}

function wireQuickPicks() {
  document.querySelectorAll('[data-quick-from][data-quick-to]').forEach(btn => {
    btn.addEventListener('click', () => setQuickPair(btn.dataset.quickFrom, btn.dataset.quickTo));
  });
}

buildLangBar();
buildSelects();
wireQuickPicks();
const bootLang = window.PAGE_LANG || detectLang();
applyLang(bootLang);
fetchRates(document.getElementById('from').value);

document.getElementById('amount').addEventListener('keydown', e => {
  if (e.key === 'Enter') convert();
});
