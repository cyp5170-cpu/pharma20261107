// 医薬品890品目 添付文書実務パッケージ 認証ガードシステム
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
