// 医薬品890品目 添付文書実務パッケージ 認証ガード ＆ 全ツール共通スリムヘッダー/展開式メニューシステム
(function() {
  const TARGET_HASH = "6a0170bd1bd0260cb3923a0b9a8c8a29b5191a911b08a9dac679cd3bbd80a554";
  const AUTH_KEY = "pharma_auth_token_890";

  // 現在のページ名を取得
  const currentPath = window.location.pathname;
  const isLoginPage = currentPath.endsWith('index.html') || currentPath.endsWith('/') || currentPath === '';

  const authToken = sessionStorage.getItem(AUTH_KEY);

  if (authToken !== TARGET_HASH) {
    if (!isLoginPage) {
      // 未認証アクセスを即座にブロックし、ログイン画面へ強制リダイレクト
      document.documentElement.style.display = 'none';
      alert('🔒 閲覧にはログインパスワードが必要です。ログイン画面へ移動します。');
      window.location.replace('index.html');
      return;
    }
  } else {
    // 認証済みの場合、ログインページを開いていればメインビューアへ自動転送
    if (isLoginPage) {
      window.location.replace('添付文書検索ビューア.html');
      return;
    }
  }
})();

function pharmaLogout() {
  if (confirm('ログアウトしますか？')) {
    sessionStorage.removeItem("pharma_auth_token_890");
    window.location.replace('index.html');
  }
}

// --- 全ページ共通：スリムヘッダー ＆ 展開式ドロワーメニューの自動注入 ---
(function() {
  // CSSの注入
  const styleEl = document.createElement('style');
  styleEl.id = 'pharma-unified-nav-style';
  styleEl.textContent = `
    /* 古いベタ置きボタン群はPC・スマホ問わず絶対に非表示 */
    .nav-links {
      display: none !important;
    }

    /* スリムヘッダー（高さ48px固定） */
    .nav-bar {
      position: sticky !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      height: 48px !important;
      background: #ffffff !important;
      border-bottom: 1px solid #e2e8f0 !important;
      box-shadow: 0 1px 3px rgba(0,0,0,0.06) !important;
      z-index: 10000 !important;
      display: flex !important;
      align-items: center !important;
      padding: 0 14px !important;
      box-sizing: border-box !important;
    }
    .nav-inner {
      width: 100% !important;
      max-width: 1400px !important;
      margin: 0 auto !important;
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      flex-wrap: nowrap !important;
      gap: 10px !important;
      padding: 0 !important;
    }
    .nav-title {
      font-size: 13.5px !important;
      font-weight: 700 !important;
      color: #1e3a8a !important;
      display: flex !important;
      align-items: center !important;
      gap: 6px !important;
      white-space: nowrap !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
    }
    .nav-title a {
      color: inherit !important;
      text-decoration: none !important;
    }

    /* 右側ボタングループ */
    .unified-nav-actions {
      display: inline-flex !important;
      align-items: center !important;
      gap: 8px !important;
      flex-shrink: 0 !important;
    }
    .unified-menu-btn {
      display: inline-flex !important;
      align-items: center !important;
      gap: 5px !important;
      padding: 6px 12px !important;
      font-size: 12px !important;
      font-weight: 700 !important;
      color: #ffffff !important;
      background: #2563eb !important;
      border: none !important;
      border-radius: 6px !important;
      cursor: pointer !important;
      box-shadow: 0 1px 2px rgba(37,99,235,0.2) !important;
      transition: background 0.15s ease !important;
      white-space: nowrap !important;
    }
    .unified-menu-btn:hover {
      background: #1d4ed8 !important;
    }
    .unified-logout-btn {
      display: inline-flex !important;
      align-items: center !important;
      gap: 4px !important;
      padding: 6px 10px !important;
      font-size: 11.5px !important;
      font-weight: 600 !important;
      color: #dc2626 !important;
      background: #fee2e2 !important;
      border: 1px solid #fca5a5 !important;
      border-radius: 6px !important;
      cursor: pointer !important;
      white-space: nowrap !important;
    }

    /* 展開式全画面ドロワーモーダル */
    #pharmaUnifiedDrawer {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      background: rgba(15, 23, 42, 0.65) !important;
      backdrop-filter: blur(4px) !important;
      z-index: 99999 !important;
      display: none;
      align-items: flex-start !important;
      justify-content: center !important;
      padding: 30px 12px 20px 12px !important;
      box-sizing: border-box !important;
    }
    #pharmaUnifiedDrawer.open {
      display: flex !important;
    }
    .unified-drawer-sheet {
      background: #ffffff !important;
      width: 100% !important;
      max-width: 780px !important;
      max-height: calc(100vh - 50px) !important;
      border-radius: 12px !important;
      box-shadow: 0 12px 36px rgba(0,0,0,0.3) !important;
      display: flex !important;
      flex-direction: column !important;
      overflow: hidden !important;
      animation: unifiedDrawerSlide 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
    }
    @keyframes unifiedDrawerSlide {
      from { opacity: 0; transform: translateY(-14px) scale(0.98); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    .unified-drawer-header {
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      padding: 12px 16px !important;
      background: #0f172a !important;
      color: #ffffff !important;
      flex-shrink: 0 !important;
    }
    .unified-drawer-title {
      font-size: 13.5px !important;
      font-weight: 700 !important;
      display: flex !important;
      align-items: center !important;
      gap: 6px !important;
    }
    .unified-drawer-close {
      background: #334155 !important;
      color: #f8fafc !important;
      border: 1px solid #475569 !important;
      border-radius: 6px !important;
      padding: 5px 12px !important;
      font-size: 12px !important;
      font-weight: 600 !important;
      cursor: pointer !important;
    }
    .unified-drawer-body {
      padding: 14px 16px !important;
      overflow-y: auto !important;
      -webkit-overflow-scrolling: touch !important;
      flex: 1 !important;
    }
    .unified-tool-category {
      font-size: 11.5px !important;
      font-weight: 700 !important;
      color: #64748b !important;
      margin-top: 12px !important;
      margin-bottom: 6px !important;
      text-transform: uppercase !important;
      letter-spacing: 0.5px !important;
      border-bottom: 1px solid #f1f5f9 !important;
      padding-bottom: 3px !important;
    }
    .unified-tool-category:first-child { margin-top: 0 !important; }
    .unified-tool-grid {
      display: grid !important;
      grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)) !important;
      gap: 6px !important;
    }
    .unified-tool-card {
      display: flex !important;
      align-items: center !important;
      gap: 8px !important;
      padding: 8px 10px !important;
      background: #f8fafc !important;
      border: 1px solid #e2e8f0 !important;
      border-radius: 7px !important;
      text-decoration: none !important;
      color: #1e293b !important;
      font-size: 12px !important;
      font-weight: 600 !important;
      transition: all 0.15s ease !important;
      box-sizing: border-box !important;
    }
    .unified-tool-card:hover {
      background: #eff6ff !important;
      border-color: #93c5fd !important;
      color: #1d4ed8 !important;
    }
    .unified-tool-card.active {
      background: #dbeafe !important;
      border-color: #3b82f6 !important;
      color: #1e40af !important;
      font-weight: 700 !important;
    }
    .unified-tool-icon {
      font-size: 14px !important;
      flex-shrink: 0 !important;
    }
    .unified-tool-text {
      white-space: nowrap !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
    }

    /* スマホ画面（max-width: 768px）専用スタイル */
    @media (max-width: 768px) {
      .nav-title {
        font-size: 12.5px !important;
        max-width: 55% !important;
      }
      .unified-menu-btn {
        padding: 5px 8px !important;
        font-size: 11px !important;
      }
      .unified-logout-btn {
        padding: 5px 7px !important;
        font-size: 11px !important;
      }
      .logout-text-label {
        display: none !important; /* スマホではアイコンのみにして省スペース */
      }
      #pharmaUnifiedDrawer {
        padding: 0 !important; /* スマホでは画面ぴったり */
      }
      .unified-drawer-sheet {
        max-width: 100% !important;
        height: 100% !important;
        max-height: 100vh !important;
        border-radius: 0 !important;
      }
      .unified-tool-grid {
        grid-template-columns: 1fr !important; /* スマホは1列で押しやすい */
        gap: 6px !important;
      }
      .unified-tool-card {
        padding: 10px 12px !important;
        font-size: 13px !important;
      }
    }
  `;

    /* 全マニュアル共通：スマホ画面端まで100%フル幅活用 */
    @media (max-width: 768px) {
      html, body {
        width: 100% !important;
        max-width: 100% !important;
        overflow-x: hidden !important;
        margin: 0 !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
      }
      .container, .main-container, .content-container {
        width: 100% !important;
        max-width: 100% !important;
        padding-left: 8px !important;
        padding-right: 8px !important;
        box-sizing: border-box !important;
      }
    }

  document.head.appendChild(styleEl);

  // マニュアルリスト定義
  const TOOL_CATEGORIES = [
    {
      name: "🔍 検索・ビューア（基幹ツール）",
      tools: [
        { file: "添付文書検索ビューア.html", name: "添付文書検索ビューア（890品目）", icon: "🔍" },
        { file: "全890品目_用法用量・厳格投与設計完全マニュアル.html", name: "用法用量・厳格投与設計完全マニュアル（890品目全数）", icon: "⚖️" }
      ]
    },
    {
      name: "🚨 緊急・感染症・夜間休日",
      tools: [
        { file: "災害時医療・BCP＆夜間休日輪番・備蓄医薬品管理完全実務マニュアル.html", name: "災害時医療・BCP・夜間休日", icon: "🚨" },
        { file: "感染症・抗ウイルス薬・抗菌薬適正使用＆パキロビッド・ゾコーバ併用禁忌完全鑑査マニュアル.html", name: "感染症・抗ウイルス・抗菌薬", icon: "🦠" }
      ]
    },
    {
      name: "🥣 調剤手技・指導料・在宅",
      tools: [
        { file: "簡易懸濁法・錠剤粉砕・脱カプセル＆経管投与（胃瘻）適否完全実務マニュアル.html", name: "簡易懸濁・粉砕・経管投与", icon: "🥣" },
        { file: "吸入指導加算・自己注射・特殊デバイス実技鑑査＆指導料算定完全実務マニュアル.html", name: "吸入指導＆自己注射", icon: "💨" },
        { file: "在宅訪問薬剤管理指導＆多職種連携（医師・ケアマネ報告書）完全実務マニュアル.html", name: "在宅訪問＆多職種連携", icon: "🏠" },
        { file: "薬歴記載（SOAP法）＆個別指導対策・指導料算定完全マニュアル.html", name: "薬歴SOAP＆個別指導対策", icon: "📑" },
        { file: "長期収載品の選定療養＆後発品変更不可・患者自己負担完全実務マニュアル.html", name: "長期収載品・選定療養", icon: "🏷️" }
      ]
    },
    {
      name: "⚠️ 処方鑑査・トラップ・安全管理",
      tools: [
        { file: "処方鑑査＆保険請求_実務トラップ完全総まとめガイド.html", name: "処方鑑査・実務総まとめ", icon: "📑" },
        { file: "疑義照会＆調剤過誤・ヒヤリハット防止・医療事故対策完全マニュアル.html", name: "疑義照会＆調剤過誤防止", icon: "🚨" },
        { file: "臨床トラップ＆ハイリスク相互作用_添付文書完全ガイド.html", name: "臨床トラップ23選", icon: "⚠️" },
        { file: "ハイリスク薬管理指導＆保管・特殊手技・パニック値完全ガイド.html", name: "ハイリスク薬・特殊管理", icon: "⚡" },
        { file: "併用薬・相互作用＆用法用量影響_添付文書完全ガイド.html", name: "併用薬・用量影響", icon: "🔄" },
        { file: "配合剤vs単剤_適応症・用量上限・第一選択制限完全ガイド.html", name: "配合剤vs単剤ガイド", icon: "💊" },
        { file: "同一成分・別商品名・規格違い_適応不一致完全ガイド.html", name: "同一成分・別適応", icon: "🔀" },
        { file: "他科処方・広域処方鑑査＆門前外頻出薬・他院併用薬相互作用完全マニュアル.html", name: "他科・広域処方鑑査", icon: "🏥" }
      ]
    },
    {
      name: "👶 特殊患者・安全管理・検査値",
      tools: [
        { file: "高齢者・ポリファーマシー鑑査＆PTP誤飲・認知症・残薬調整完全マニュアル.html", name: "高齢者・ポリファーマシー", icon: "👴" },
        { file: "妊婦・授乳婦・生殖年齢患者_添付文書禁忌＆授乳移行・胎児安全性完全マニュアル.html", name: "妊婦・授乳婦・胎児安全性", icon: "🤰" },
        { file: "小児用量換算・禁忌＆透析・腎不全投与設計完全マニュアル.html", name: "小児・透析投与設計", icon: "👶" },
        { file: "運転制限（禁止・注意・安全薬）＆適用上の注意・定期検査義務完全マニュアル.html", name: "運転制限・適用注意・検査", icon: "🚗" },
        { file: "検査値用量調整_適正使用ガイド.html", name: "検査値用量調整", icon: "🧪" }
      ]
    },
    {
      name: "⚖️ 保険請求・支払基金・法規",
      tools: [
        { file: "保険請求査定防止＆添付文書実務ガイド.html", name: "保険請求査定防止", icon: "🛡️" },
        { file: "支払基金審査徹底対策_返戻査定防止＆公式審査事例完全マニュアル.html", name: "支払基金審査対策", icon: "⚖️" },
        { file: "適応症・効能効果_厳格審査マニュアル.html", name: "適応症・厳格審査", icon: "🎯" },
        { file: "適宜増減なし医薬品一覧_厳格用量マニュアル.html", name: "適宜増減なし263", icon: "📏" },
        { file: "麻薬・覚醒剤原料・毒薬劇薬_法的適正管理＆薬事監視・事故届完全マニュアル.html", name: "麻薬・法規管理", icon: "⚖️" },
        { file: "なぜ厳しい設定があるのか_医薬品適正使用と規制の歴史・医学的理由.html", name: "規制・医学的理由", icon: "📜" }
      ]
    }
  ];

  function buildUnifiedHeaderAndDrawer() {
    if (window.__pharmaNavBuilt) return;
    window.__pharmaNavBuilt = true;
    const navBar = document.querySelector('.nav-bar');
    if (!navBar) return;

    // ヘッダー内のボタン群を置換
    let navInner = navBar.querySelector('.nav-inner');
    if (!navInner) {
      navInner = navBar;
    }

    // 既存のベタ置き nav-links を非表示
    const oldNavLinks = navBar.querySelector('.nav-links');
    if (oldNavLinks) {
      oldNavLinks.style.display = 'none';
    }

    // タイトル取得または設定
    let titleEl = navInner.querySelector('.nav-title');
    if (!titleEl) {
      titleEl = document.createElement('div');
      titleEl.className = 'nav-title';
      titleEl.innerHTML = `<span>💊</span> <a href="添付文書検索ビューア.html">医薬品890品目 実務パッケージ</a>`;
      navInner.prepend(titleEl);
    } else {
      titleEl.innerHTML = `<span>💊</span> <a href="添付文書検索ビューア.html" style="color:inherit; text-decoration:none;">医薬品890品目 実務パッケージ</a>`;
    }

    // 右側ボタングループの設置
    let actionsEl = navInner.querySelector('.unified-nav-actions') || navInner.querySelector('.nav-controls');
    if (actionsEl) return; // すでにボタンがあれば重複作成しない
    if (!actionsEl) {
      actionsEl = document.createElement('div');
      actionsEl.className = 'unified-nav-actions';
      actionsEl.innerHTML = `
        <button type="button" class="unified-menu-btn" onclick="toggleUnifiedPharmaDrawer()">
          <span>📚</span> <span>実務メニュー (27)</span> <span id="unifiedMenuArrow">▾</span>
        </button>
        <button type="button" onclick="pharmaLogout()" class="unified-logout-btn" title="ログアウト">
          <span>🔒</span> <span class="logout-text-label">ログアウト</span>
        </button>
      `;
      navInner.appendChild(actionsEl);
    }

    // 全画面展開式ドロワーモーダルの作成
    let drawerModal = document.getElementById('pharmaUnifiedDrawer');
    if (!drawerModal) {
      drawerModal = document.createElement('div');
      drawerModal.id = 'pharmaUnifiedDrawer';
      drawerModal.onclick = function(e) {
        if (e.target.id === 'pharmaUnifiedDrawer') {
          toggleUnifiedPharmaDrawer();
        }
      };

      const currentFile = decodeURIComponent(window.location.pathname.split('/').pop() || '');

      let categoriesHtml = '';
      TOOL_CATEGORIES.forEach(cat => {
        categoriesHtml += `<div class="unified-tool-category">${cat.name}</div><div class="unified-tool-grid">`;
        cat.tools.forEach(tool => {
          const isActive = currentFile === tool.file;
          categoriesHtml += `
            <a href="${tool.file}" class="unified-tool-card ${isActive ? 'active' : ''}">
              <span class="unified-tool-icon">${tool.icon}</span>
              <span class="unified-tool-text">${tool.name}</span>
            </a>
          `;
        });
        categoriesHtml += `</div>`;
      });

      drawerModal.innerHTML = `
        <div class="unified-drawer-sheet">
          <div class="unified-drawer-header">
            <div class="unified-drawer-title">
              <span>📚</span> 全27実務マニュアル・業務ツール一覧
            </div>
            <button type="button" class="unified-drawer-close" onclick="toggleUnifiedPharmaDrawer()">✕ 閉じる</button>
          </div>
          <div class="unified-drawer-body">
            ${categoriesHtml}
          </div>
        </div>
      `;
      document.body.appendChild(drawerModal);
    }
  }

  window.toggleUnifiedPharmaDrawer = function() {
    const drawer = document.getElementById('pharmaUnifiedDrawer');
    const arrow = document.getElementById('unifiedMenuArrow');
    if (!drawer) return;
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      if (arrow) arrow.textContent = '▾';
    } else {
      drawer.classList.add('open');
      if (arrow) arrow.textContent = '▲';
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildUnifiedHeaderAndDrawer);
  } else {
    buildUnifiedHeaderAndDrawer();
  }
})();
