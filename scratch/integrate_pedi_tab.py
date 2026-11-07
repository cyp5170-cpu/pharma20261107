# -*- coding: utf-8 -*-
"""
添付文書検索ビューアのナレッジハブに「小児・透析投与設計」タブを追加するスクリプト
"""
import sys

desktop_dir = 'C:/Users/froze/OneDrive/デスクトップ/医薬品840品目_添付文書パッケージ'
viewer_path = f"{desktop_dir}/添付文書検索ビューア.html"

with open(viewer_path, 'r', encoding='utf-8') as f:
    text = f.read()

# 1. タブボタンの追加
tab_needle = '<button class="k-tab-btn" onclick="switchKTab(\'k-law-narcotics\')">⚖️ 麻薬・法規管理</button>'
new_tab_btn = '<button class="k-tab-btn" onclick="switchKTab(\'k-pedi-dialysis\')">👶 小児・透析投与設計</button>\n          ' + tab_needle

# 2. タブコンテンツの追加
new_tab_content = '''
        <!-- Tab: 小児・透析投与設計 -->
        <div id="k-pedi-dialysis" class="k-tab-content">
          <h3>👶 小児用量換算・小児禁忌＆血液透析（HD）投与タイミング・末期腎不全禁忌</h3>
          <p>小児体重換算リミット、小児禁忌薬（キノロン等）、透析で抜ける薬（透析後投与）vs 抜けない薬まとめ。</p>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:10px; margin-top:8px;">
            <div style="background:#fff7ed; border:1px solid #fdba74; border-radius:6px; padding:10px;">
              <strong style="color:#c2410c;">👶 小児用量計算＆成人間引きリミット</strong>
              <ul style="font-size:11.5px; padding-left:16px; margin-top:4px; line-height:1.6;">
                <li><strong>体重別換算最優先:</strong> 添付文書のmg/kg/日規定に従う。</li>
                <li><strong>成人用量超過リミット:</strong> 体重計算値が成人極量を超える場合は成人用量を上限とする。</li>
                <li><strong>年齢換算（Augsberger式）:</strong> (4×年齢＋20)/100 × 成人用量。</li>
              </ul>
            </div>
            <div style="background:#fef2f2; border:1px solid #fca5a5; border-radius:6px; padding:10px;">
              <strong style="color:#991b1b;">🚫 小児絶対禁忌医薬品</strong>
              <ul style="font-size:11.5px; padding-left:16px; margin-top:4px; line-height:1.6;">
                <li><strong>キノロン系抗菌薬:</strong> 関節軟骨障害のため原則小児禁忌。</li>
                <li><strong>テトラサイクリン系:</strong> 8歳未満で恒久的な歯牙着色・エナメル質形成不全。</li>
                <li><strong>アスピリン:</strong> 水痘・インフルエンザ時のライ症候群（急性脳症）。</li>
                <li><strong>コデイン類:</strong> 12歳未満でCYP2D6超代謝による呼吸抑制死亡。</li>
              </ul>
            </div>
            <div style="background:#fff7ed; border:1px solid #fdba74; border-radius:6px; padding:10px;">
              <strong style="color:#c2410c;">🩸 血液透析（HD）で抜ける薬 vs 抜けない薬</strong>
              <ul style="font-size:11.5px; padding-left:16px; margin-top:4px; line-height:1.6;">
                <li><strong>抜ける薬（透析後投与必須）:</strong> アモキシシリン、バンコマイシン、アシクロビル、プレガバリン等（透析前投与は全量捨てられ無効）。</li>
                <li><strong>抜けない薬:</strong> アムロジピン、ワルファリン、スタチン等（透析性低く過量蓄積注意）。</li>
              </ul>
            </div>
            <div style="background:#fef2f2; border:1px solid #fca5a5; border-radius:6px; padding:10px;">
              <strong style="color:#991b1b;">⛔ 透析患者（HD / 末期腎不全）絶対禁忌</strong>
              <ul style="font-size:11.5px; padding-left:16px; margin-top:4px; line-height:1.6;">
                <li><strong>メトホルミン:</strong> 致死性乳酸アシドーシス（死亡率50%）。</li>
                <li><strong>DOAC全種:</strong> 腎廃絶で異常血中濃度・大出血クライシス（ワルファリンのみ可）。</li>
                <li><strong>アマンタジン:</strong> 透析で除去されず中枢神経毒性（昏睡・痙攣）。</li>
              </ul>
            </div>
          </div>
          <div style="margin-top:10px; text-align:right;">
            <a href="小児用量換算・禁忌＆透析・腎不全投与設計完全マニュアル.html" target="_blank" style="color:#ea580c; font-weight:bold; text-decoration:underline;">小児・透析投与設計 完全マニュアルを別画面で開く ↗</a>
          </div>
        </div>
'''

if 'k-pedi-dialysis' not in text:
    text = text.replace(tab_needle, new_tab_btn, 1)
    text = text.replace('<!-- Tab: 麻薬・法規管理 -->', f'{new_tab_content}\n        <!-- Tab: 麻薬・法規管理 -->', 1)

    with open(viewer_path, 'w', encoding='utf-8') as f:
        f.write(text)
    print("Integrated pedi tab to 添付文書検索ビューア.html successfully!")
else:
    print("Tab already exists.")
