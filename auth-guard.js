// 医薬品890品目 添付文書実務パッケージ 認証ガード ＆ レスポンシブナビ統合システム
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
    }
  } else {
    // 認証済みの場合、ログインページを開いていればメインビューアへ自動転送
    if (isLoginPage) {
      window.location.replace('添付文書検索ビューア.html');
    }
  }
})();

function pharmaLogout() {
  if (confirm('ログアウトしますか？')) {
    sessionStorage.removeItem("pharma_auth_token_890");
    window.location.replace('index.html');
  }
}

// --- スマホ表示 (レスポンシブ) ナビゲーション最適化 ---
(function() {
  const styleEl = document.createElement('style');
  styleEl.id = 'pharma-responsive-nav-fix';
  styleEl.textContent = `
    .mobile-nav-actions {
      display: none;
    }
    #pharmaMobileDrawer {
      display: none;
    }

    @media (max-width: 768px) {
      body {
        padding-top: 52px !important;
      }
      .nav-bar {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        height: 50px !important;
        background: #ffffff !important;
        border-bottom: 1px solid #cbd5e1 !important;
        box-shadow: 0 2px 4px rgba(0,0,0,0.06) !important;
        z-index: 1500 !important;
        display: flex !important;
        align-items: center !important;
      }
      .nav-inner {
        width: 100% !important;
        max-width: 100% !important;
        padding: 0 10px !important;
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
        flex-wrap: nowrap !important;
        margin: 0 !important;
        gap: 6px !important;
      }
      .nav-title {
        font-size: 13px !important;
        font-weight: 700 !important;
        color: #1e40af !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        display: flex !important;
        align-items: center !important;
        gap: 4px !important;
        max-width: 52% !important;
      }
      /* スマホではヘッダー内の27個のボタン群は完全に非表示 */
      .nav-links {
        display: none !important;
      }
      /* スマホ用ボタングループ */
      .mobile-nav-actions {
        display: inline-flex !important;
        align-items: center !important;
        gap: 6px !important;
        flex-shrink: 0 !important;
      }
      .mobile-menu-toggle-btn {
        display: inline-flex !important;
        align-items: center !important;
        gap: 4px !important;
        padding: 6px 10px !important;
        font-size: 11.5px !important;
        font-weight: 700 !important;
        color: #ffffff !important;
        background: #2563eb !important;
        border: none !important;
        border-radius: 6px !important;
        cursor: pointer !important;
        box-shadow: 0 1px 2px rgba(0,0,0,0.15) !important;
      }
      .mobile-logout-btn {
        display: inline-flex !important;
        align-items: center !important;
        padding: 6px 8px !important;
        font-size: 11px !important;
        font-weight: 600 !important;
        color: #dc2626 !important;
        background: #fee2e2 !important;
        border: 1px solid #fca5a5 !important;
        border-radius: 6px !important;
        cursor: pointer !important;
      }

      /* 画面全体を覆う専用ドロワー（最前面 z-index: 99999） */
      #pharmaMobileDrawer {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        background: #0f172a !important;
        z-index: 99999 !important;
        flex-direction: column !important;
        overflow: hidden !important;
      }
      #pharmaMobileDrawer.open {
        display: flex !important;
        animation: pharmaDrawerSlide 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
      }
      @keyframes pharmaDrawerSlide {
        from { opacity: 0; transform: translateY(-12px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .drawer-top-bar {
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
        padding: 14px 16px !important;
        background: #1e293b !important;
        border-bottom: 1px solid #334155 !important;
      }
      .drawer-title {
        color: #f8fafc !important;
        font-size: 14px !important;
        font-weight: 700 !important;
        display: flex !important;
        align-items: center !important;
        gap: 6px !important;
      }
      .drawer-close-btn {
        background: #334155 !important;
        color: #f8fafc !important;
        border: 1px solid #475569 !important;
        border-radius: 6px !important;
        padding: 6px 14px !important;
        font-size: 13px !important;
        font-weight: 600 !important;
        cursor: pointer !important;
      }
      .drawer-body {
        flex: 1 !important;
        overflow-y: auto !important;
        -webkit-overflow-scrolling: touch !important;
        padding: 16px 14px 40px 14px !important;
        display: flex !important;
        flex-direction: column !important;
        gap: 8px !important;
      }
      .drawer-item-btn {
        display: flex !important;
        align-items: center !important;
        width: 100% !important;
        padding: 12px 14px !important;
        font-size: 13.5px !important;
        font-weight: 600 !important;
        color: #f1f5f9 !important;
        background: #1e293b !important;
        border: 1px solid #334155 !important;
        border-radius: 8px !important;
        text-decoration: none !important;
        box-sizing: border-box !important;
        box-shadow: 0 1px 3px rgba(0,0,0,0.2) !important;
      }
      .drawer-item-btn:active {
        background: #334155 !important;
      }
      .drawer-item-btn.active {
        background: #2563eb !important;
        color: #ffffff !important;
        border-color: #60a5fa !important;
      }
      .drawer-logout-btn {
        margin-top: 14px !important;
        background: #dc2626 !important;
        color: #ffffff !important;
        border: 1px solid #ef4444 !important;
        border-radius: 8px !important;
        padding: 13px !important;
        text-align: center !important;
        font-size: 14px !important;
        font-weight: 700 !important;
        text-decoration: none !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
      }
    }
  `;
  document.head.appendChild(styleEl);

  function setupMobileMenu() {
    const navInner = document.querySelector('.nav-inner');
    const navLinks = document.querySelector('.nav-links');
    if (!navInner || !navLinks) return;

    // ヘッダー内のスマホボタン追加
    if (!document.querySelector('.mobile-nav-actions')) {
      const actionsDiv = document.createElement('div');
      actionsDiv.className = 'mobile-nav-actions';
      actionsDiv.innerHTML = `
        <button type="button" class="mobile-menu-toggle-btn" onclick="openPharmaDrawer()">
          📚 実務ツール(27) ▾
        </button>
        <button type="button" class="mobile-logout-btn" onclick="pharmaLogout()" title="ログアウト">
          🔒
        </button>
      `;
      navInner.appendChild(actionsDiv);
    }

    // body直下に専用ドロワーを作成
    let drawer = document.getElementById('pharmaMobileDrawer');
    if (!drawer) {
      drawer = document.createElement('div');
      drawer.id = 'pharmaMobileDrawer';

      const currentFile = decodeURIComponent(window.location.pathname.split('/').pop() || '');

      let linksHtml = '';
      const originalLinks = navLinks.querySelectorAll('a');
      originalLinks.forEach(link => {
        const href = link.getAttribute('href') || '';
        const text = link.textContent.trim();
        const isCurrent = (currentFile === href) || (currentFile === '' && href === '添付文書検索ビューア.html');
        if (link.getAttribute('onclick') && link.getAttribute('onclick').includes('pharmaLogout')) {
          return; // ログアウトは下部に別配置
        }
        linksHtml += `<a href="${href}" class="drawer-item-btn ${isCurrent ? 'active' : ''}">${text}</a>`;
      });

      drawer.innerHTML = `
        <div class="drawer-top-bar">
          <div class="drawer-title">
            <span>💊</span> 医薬品890 実務ツール一覧 (全27種)
          </div>
          <button type="button" class="drawer-close-btn" onclick="closePharmaDrawer()">✕ 閉じる</button>
        </div>
        <div class="drawer-body">
          ${linksHtml}
          <a href="javascript:void(0)" onclick="pharmaLogout()" class="drawer-logout-btn">🔒 ログアウト</a>
        </div>
      `;
      document.body.appendChild(drawer);
    }
  }

  window.openPharmaDrawer = function() {
    const drawer = document.getElementById('pharmaMobileDrawer');
    if (drawer) drawer.classList.add('open');
  };

  window.closePharmaDrawer = function() {
    const drawer = document.getElementById('pharmaMobileDrawer');
    if (drawer) drawer.classList.remove('open');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupMobileMenu);
  } else {
    setupMobileMenu();
  }
})();
