# NihongoFlow (日語極速學習・手機跨裝置雲端同步)

專為日語零基礎與初學者打造的極速學習 Web App。結合五十音秒記口訣、3D 翻轉記憶卡 (SRS)、四選一聽力測驗、N5 實戰口語單字，並支援手機瀏覽器與電腦之間的 Google 帳號進度即時同步。

---

## ✨ 核心特色

1. **完整五十音學習系統**：
   - 清音 (46音)、濁音/半濁音 (25音)、拗音 (36音)。
   - 平假名 / 片假名 / 雙字對照即時切換。
   - 形象化**秒記口訣**與生活單字範例。
   - 原生日語發音（標準語速與 0.75x 慢速聽）。
2. **間隔重複記憶卡 (SRS Flashcards) & 四選一測驗**：
   - 擬真 3D 翻轉卡片、評分回饋。
   - 聽力辨音題、平假名羅馬音互轉、單字意義速測。
   - 測驗完成彩帶特效與連擊記錄。
3. **N5 常用生活單字與旅行自救句**：
   - 涵蓋 6 大必備情境：常用問候、美食點餐、交通問路、購物結帳、數字時間、生活必備。
   - 漢字附帶假名標註與旅行實用備註。
4. **手機與電腦無縫同步 (Google Account + Firestore)**：
   - **訪客模式 (無需註冊)**：本機 LocalStorage 即開即用，離線也能學。
   - **雲端同步 (Google 登入)**：一鍵綁定 Google 帳號，進度自動上傳 Google Cloud Firestore，在手機 Safari/Chrome 打開立刻接續電腦學習進度。
   - **JSON 匯入/匯出備份**：不想註冊也能單鍵下載進度檔備份。

---

## 🚀 本機啟動與測試

```bash
cd projects/japanese-learning-app
npm install
npm run dev
```

在電腦瀏覽器打開 `http://localhost:3004` 即可開始學習。

> 📱 **在同區網手機上測試**：
> 終端機顯示的 `Network: http://<你的電腦IP>:3004`，用手機連上相同 Wi-Fi 輸入該網址即可直接用手機體驗！

---

## ☁️ 如何啟用 Google 跨裝置同步？

本程式已支援**免重新部署直接在介面設定**：

1. 前往 [Firebase Console](https://console.firebase.google.com) 免費點擊「建立專案」。
2. 在左側選單進入 **Authentication** ➔ 點擊「開始使用」➔ 啟用 **Google** 提供者。
3. 在左側選單進入 **Firestore Database** ➔ 點擊「建立資料庫」➔ 選擇「以測試模式啟動 (Test Mode)」。
4. 點擊齒輪圖示 **專案設定 (Project Settings)** ➔ 在下方「您的應用程式」新增網頁應用程式 (Web App) ➔ 複製 `firebaseConfig` 物件。
5. 開啟 NihongoFlow 網頁右上角「⚙️ 設定」➔ 貼入 Firebase 金鑰即可！

---

## 🌐 免費發布至 GitHub Pages (推薦)

本專案已內建 GitHub Actions 自動部署腳本（`.github/workflows/deploy.yml`）與相對路徑支援（`base: './'`），每次推送程式碼至 GitHub 時都會自動構建並發布。

### 操作步驟：
1. 在 [GitHub 官網](https://github.com/new) 建立一個新的公開倉庫（Repository，例如命名為 `nihongo-flow`）。
2. 在電腦終端機專案目錄執行：
   ```bash
   git remote add origin https://github.com/<你的GitHub帳號>/nihongo-flow.git
   git push -u origin main
   ```
3. 前往 GitHub 倉庫頁面 ➔ 點擊 **Settings** ➔ 左側選單選擇 **Pages**。
4. 在 **Build and deployment** 下方的 **Source**，選單切換為 **`GitHub Actions`**。
5. 等待約 1 分鐘，GitHub Actions 執行完畢後，即可獲得免費的專屬 HTTPS 網址：
   `https://<你的GitHub帳號>.github.io/nihongo-flow/`

---

## 📱 手機端沉浸式 PWA 體驗
用手機 Safari (iOS) 或 Chrome (Android) 開啟網址後：
- **iPhone / iPad**：點擊分享按鈕 ➔ 選擇「加入主畫面」。
- **Android**：點擊右上角選單 ➔ 選擇「安裝應用程式」或「加到主螢幕」。
即可像原生 App 一樣以全螢幕、無網址列的乾淨介面沉浸式學習！
