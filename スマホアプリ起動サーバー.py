# -*- coding: utf-8 -*-
import http.server
import socket
import socketserver
import os
import sys

if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

# カレントディレクトリをパッケージフォルダに変更
pkg_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(pkg_dir)

PORT = 8080

def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return 'localhost'

local_ip = get_local_ip()

print("================================================================================")
print(" 💊 医薬品890品目 添付文書実務パッケージ スマホアプリ化（PWA）配信サーバー ")
print("================================================================================")
print(f"\\n【スマホ（iPhone / Android）でのアプリ化・使用手順】")
print(f"1. スマホを、このパソコンと同じWi-Fiに接続してください。")
print(f"2. スマホのブラウザ（iPhoneならSafari、AndroidならChrome）を開きます。")
print(f"3. 次のURLにアクセスしてください：")
print(f"\\n   👉 http://{local_ip}:{PORT}/添付文書検索ビューア.html\\n")
print(f"4. 【ホーム画面に追加（アプリ化）】")
print(f"   ・iPhone (Safari) : 画面下の「共有ボタン（四角から上矢印）」➔「ホーム画面に追加」")
print(f"   ・Android (Chrome): 右上のメニュー（3点リーダー）➔「アプリをインストール」または「ホーム画面に追加」")
print(f"\\n5. ホーム画面に「医薬品890」の専用アイコンが追加され、以降はワンタップで")
print(f"   電波のないオフライン環境でもネイティブアプリ同様に高速起動します！")
print("================================================================================")
print(f"サーバー稼働中... (終了するには Ctrl + C を押してください)\\n")

Handler = http.server.SimpleHTTPRequestHandler
Handler.extensions_map.update({
    '.json': 'application/json',
    '.png': 'image/png',
    '.pdf': 'application/pdf',
    '.js': 'application/javascript'
})

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\\nサーバーを停止しました。")
