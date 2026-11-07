// Service Worker - 医薬品890品目 添付文書実務パッケージ PWA
const CACHE_NAME = 'drug890-cache-v1';

const PRECACHE_ASSETS = [
  './',
  './添付文書検索ビューア.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './災害時医療・BCP＆夜間休日輪番・備蓄医薬品管理完全実務マニュアル.html',
  './感染症・抗ウイルス薬・抗菌薬適正使用＆パキロビッド・ゾコーバ併用禁忌完全鑑査マニュアル.html',
  './簡易懸濁法・錠剤粉砕・脱カプセル＆経管投与（胃瘻）適否完全実務マニュアル.html',
  './吸入指導加算・自己注射・特殊デバイス実技鑑査＆指導料算定完全実務マニュアル.html',
  './長期収載品の選定療養＆後発品変更不可・患者自己負担完全実務マニュアル.html',
  './在宅訪問薬剤管理指導＆多職種連携（医師・ケアマネ報告書）完全実務マニュアル.html',
  './他科処方・広域処方鑑査＆門前外頻出薬・他院併用薬相互作用完全マニュアル.html',
  './薬歴記載（SOAP法）＆個別指導対策・指導料算定完全マニュアル.html',
  './疑義照会＆調剤過誤・ヒヤリハット防止・医療事故対策完全マニュアル.html',
  './高齢者・ポリファーマシー鑑査＆PTP誤飲・認知症・残薬調整完全マニュアル.html',
  './妊婦・授乳婦・生殖年齢患者_添付文書禁忌＆授乳移行・胎児安全性完全マニュアル.html',
  './運転制限（禁止・注意・安全薬）＆適用上の注意・定期検査義務完全マニュアル.html',
  './小児用量換算・禁忌＆透析・腎不全投与設計完全マニュアル.html',
  './麻薬・覚醒剤原料・毒薬劇薬_法的適正管理＆薬事監視・事故届完全マニュアル.html',
  './ハイリスク薬管理指導＆保管・特殊手技・パニック値完全ガイド.html',
  './処方鑑査＆保険請求_実務トラップ完全総まとめガイド.html',
  './配合剤vs単剤_適応症・用量上限・第一選択制限完全ガイド.html',
  './同一成分・別商品名・規格違い_適応不一致完全ガイド.html',
  './支払基金審査徹底対策_返戻査定防止＆公式審査事例完全マニュアル.html',
  './併用薬・相互作用＆用法用量影響_添付文書完全ガイド.html',
  './臨床トラップ＆ハイリスク相互作用_添付文書完全ガイド.html',
  './保険請求査定防止＆添付文書実務ガイド.html',
  './適応症・効能効果_厳格審査マニュアル.html',
  './適宜増減なし医薬品一覧_厳格用量マニュアル.html',
  './検査値用量調整_適正使用ガイド.html',
  './なぜ厳しい設定があるのか_医薬品適正使用と規制の歴史・医学的理由.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[PWA] Pre-caching offline assets');
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[PWA] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // キャッシュ優先（Cache First）戦略：完全オフラインでも爆速レスポンス
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        // PDFや動的取得リソースもキャッシュに追加
        if (networkResponse && networkResponse.status === 200 && event.request.method === 'GET') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // オフライン時のフォールバック
        if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('./添付文書検索ビューア.html');
        }
      });
    })
  );
});
