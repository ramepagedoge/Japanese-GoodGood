// Essential Beginner & Survival Japanese Vocabulary (N5 Level)
// Rich with kanji, furigana, romaji, practical usage notes, and Chinese meaning

export const VOCAB_CATEGORIES = [
  { id: 'all', name: '全部單字', icon: '🌟' },
  { id: 'greetings', name: '常用問候', icon: '👋' },
  { id: 'dining', name: '美食點餐', icon: '🍜' },
  { id: 'transport', name: '交通問路', icon: '🚆' },
  { id: 'shopping', name: '購物結帳', icon: '🛍️' },
  { id: 'numbers', name: '數字時間', icon: '⏰' },
  { id: 'daily', name: '生活必備', icon: '💡' },
];

export const VOCAB_DATA = [
  // 常用問候 (Greetings)
  {
    id: 'v_greet_1',
    category: 'greetings',
    japanese: 'おはようございます',
    furigana: 'おはようございます',
    kanji: 'お早うございます',
    romaji: 'ohayou gozaimasu',
    chinese: '早安 (禮貌說法)',
    note: '早上遇到前輩、同事、店家皆適用'
  },
  {
    id: 'v_greet_2',
    category: 'greetings',
    japanese: 'こんにちは',
    furigana: 'こんにちは',
    kanji: '今日は',
    romaji: 'konnichiwa',
    chinese: '你好 / 午安',
    note: '白天最泛用的招呼語'
  },
  {
    id: 'v_greet_3',
    category: 'greetings',
    japanese: 'こんばんは',
    furigana: 'こんばんは',
    kanji: '今晩は',
    romaji: 'konbanwa',
    chinese: '晚上好',
    note: '太陽下山後的見面問候'
  },
  {
    id: 'v_greet_4',
    category: 'greetings',
    japanese: 'ありがとうございます',
    furigana: 'ありがとうございます',
    kanji: '有難うございます',
    romaji: 'arigatou gozaimasu',
    chinese: '非常感謝你 (禮貌說法)',
    note: '日常必備感謝句型'
  },
  {
    id: 'v_greet_5',
    category: 'greetings',
    japanese: 'すみません',
    furigana: 'すみません',
    kanji: '済みません',
    romaji: 'sumimasen',
    chinese: '不好意思 / 請問 / 抱歉',
    note: '搭話、借過、引起店員注意時最萬用神器'
  },
  {
    id: 'v_greet_6',
    category: 'greetings',
    japanese: 'おねがいします',
    furigana: 'おねがいします',
    kanji: 'お願いします',
    romaji: 'onegaishimasu',
    chinese: '拜託你了 / 請幫我...',
    note: '點餐結尾、委託他人時必加'
  },
  {
    id: 'v_greet_7',
    category: 'greetings',
    japanese: 'ごめんなさい',
    furigana: 'ごめんなさい',
    kanji: '御免なさい',
    romaji: 'gomennasai',
    chinese: '對不起',
    note: '真心道歉時使用'
  },
  {
    id: 'v_greet_8',
    category: 'greetings',
    japanese: 'いただきます',
    furigana: 'いただきます',
    kanji: '頂きます',
    romaji: 'itadakimasu',
    chinese: '開動了 (領受生命之意)',
    note: '飯前雙手合十禮貌語'
  },
  {
    id: 'v_greet_9',
    category: 'greetings',
    japanese: 'ごちそうさまでした',
    furigana: 'ごちそうさまでした',
    kanji: 'ご馳走様でした',
    romaji: 'gochisousama deshita',
    chinese: '多謝款待 / 我吃飽了',
    note: '吃完飯結帳時跟店家說'
  },
  {
    id: 'v_greet_10',
    category: 'greetings',
    japanese: 'さようなら',
    furigana: 'さようなら',
    kanji: '左様なら',
    romaji: 'sayounara',
    chinese: '再見 (長時間告別)',
    note: '朋友平日告別更常用「またね (Matane)」'
  },

  // 美食點餐 (Dining)
  {
    id: 'v_din_1',
    category: 'dining',
    japanese: 'メニューをください',
    furigana: 'メニューをください',
    kanji: 'メニューを下さい',
    romaji: 'menyuu o kudasai',
    chinese: '請給我菜單',
    note: '入座後必用'
  },
  {
    id: 'v_din_2',
    category: 'dining',
    japanese: 'これをおねがいします',
    furigana: 'これをおねがいします',
    kanji: 'これをお願いします',
    romaji: 'kore o onegaishimasu',
    chinese: '請給我這個 (手指菜單)',
    note: '出國點餐最強一句話'
  },
  {
    id: 'v_din_3',
    category: 'dining',
    japanese: 'おすすめはなんですか',
    furigana: 'おすすめはなんですか',
    kanji: 'お勧めは何ですか',
    romaji: 'osusume wa nan desu ka',
    chinese: '請問有推薦的嗎？',
    note: '不知道點什麼時問店員'
  },
  {
    id: 'v_din_4',
    category: 'dining',
    japanese: 'お水をおねがいします',
    furigana: 'おみずをおねがいします',
    kanji: 'お水をお願いします',
    romaji: 'omizu o onegaishimasu',
    chinese: '請給我水',
    note: '日本餐廳多免費提供冰水 (お冷 - Ohya)'
  },
  {
    id: 'v_din_5',
    category: 'dining',
    japanese: 'おかいけいをおねがいします',
    furigana: 'おかいけいをおねがいします',
    kanji: 'お会計をお願いします',
    romaji: 'okaikei o onegaishimasu',
    chinese: '請買單 / 結帳',
    note: '亦可雙手食指比叉叉做手勢'
  },
  {
    id: 'v_din_6',
    category: 'dining',
    japanese: 'おいしいです',
    furigana: 'おいしいです',
    kanji: '美味しいです',
    romaji: 'oishii desu',
    chinese: '很好吃！',
    note: '向廚師或店家表達讚美'
  },
  {
    id: 'v_din_7',
    category: 'dining',
    japanese: 'ひとつ',
    furigana: 'ひとつ',
    kanji: '一つ',
    romaji: 'hitotsu',
    chinese: '一個',
    note: '點餐數量詞：ひとつ、ふたつ、みっつ'
  },
  {
    id: 'v_din_8',
    category: 'dining',
    japanese: 'ふたつ',
    furigana: 'ふたつ',
    kanji: '二つ',
    romaji: 'futatsu',
    chinese: '兩個',
    note: '點餐常用'
  },

  // 交通問路 (Transport)
  {
    id: 'v_tra_1',
    category: 'transport',
    japanese: 'トイレはどこですか',
    furigana: 'トイレはどこですか',
    kanji: 'トイレは何処ですか',
    romaji: 'toire wa doko desu ka',
    chinese: '請問洗手間在哪裡？',
    note: '急用必背！'
  },
  {
    id: 'v_tra_2',
    category: 'transport',
    japanese: 'えきはどこですか',
    furigana: 'えきはどこですか',
    kanji: '駅は何処ですか',
    romaji: 'eki wa doko desu ka',
    chinese: '請問車站在哪裡？',
    note: '迷路時開口詢問'
  },
  {
    id: 'v_tra_3',
    category: 'transport',
    japanese: 'この電車は〜へ行きますか',
    furigana: 'このでんしゃは〜へいきますか',
    kanji: 'この電車は〜へ行きますか',
    romaji: 'kono densha wa ... e ikimasu ka',
    chinese: '這班電車有到...嗎？',
    note: '搭車前確認月台方向'
  },
  {
    id: 'v_tra_4',
    category: 'transport',
    japanese: 'きっぷ',
    furigana: 'きっぷ',
    kanji: '切符',
    romaji: 'kippu',
    chinese: '車票',
    note: '電車/新幹線票券'
  },
  {
    id: 'v_tra_5',
    category: 'transport',
    japanese: 'ここに行きたいです',
    furigana: 'ここにいきたいです',
    kanji: 'ここに行きたいです',
    romaji: 'koko ni ikitai desu',
    chinese: '我想去這裡 (拿手機地圖給對方看)',
    note: '搭計程車或問路超好用'
  },

  // 購物結帳 (Shopping)
  {
    id: 'v_sho_1',
    category: 'shopping',
    japanese: 'いくらですか',
    furigana: 'いくらですか',
    kanji: '幾らですか',
    romaji: 'ikura desu ka',
    chinese: '請問多少錢？',
    note: '結帳詢價核心句'
  },
  {
    id: 'v_sho_2',
    category: 'shopping',
    japanese: 'クレジットカードは使えますか',
    furigana: 'クレジットカードはつかえますか',
    kanji: 'クレジットカードは使えますか',
    romaji: 'kurejitto kaado wa tsukaemasu ka',
    chinese: '可以用信用卡嗎？',
    note: '確認付款方式'
  },
  {
    id: 'v_sho_3',
    category: 'shopping',
    japanese: 'ふくろはいりません',
    furigana: 'ふくろはいりません',
    kanji: '袋は要りません',
    romaji: 'fukuro wa irimasen',
    chinese: '我不用塑膠袋',
    note: '便利商店減塑日常用語'
  },
  {
    id: 'v_sho_4',
    category: 'shopping',
    japanese: 'これを見せてください',
    furigana: 'これをみせてください',
    kanji: 'これを見せて下さい',
    romaji: 'kore o misete kudasai',
    chinese: '請讓我看這個 (櫥窗商品)',
    note: '買精品或電器時看樣品'
  },
  {
    id: 'v_sho_5',
    category: 'shopping',
    japanese: 'めんぜいはできますか',
    furigana: 'めんぜいはできますか',
    kanji: '免税はできますか',
    romaji: 'menzei wa dekimasu ka',
    chinese: '可以免稅 (Tax Free) 嗎？',
    note: '藥妝店與百貨購物必問'
  },

  // 數字時間 (Numbers & Time)
  {
    id: 'v_num_1',
    category: 'numbers',
    japanese: 'いち、に、さん、し (よん)、ご',
    furigana: 'いち、に、さん、し、ご',
    kanji: '一、二、三、四、五',
    romaji: 'ichi, ni, san, shi (yon), go',
    chinese: '數字 1 ~ 5',
    note: '四常唸成 yon'
  },
  {
    id: 'v_num_2',
    category: 'numbers',
    japanese: 'ろく、なな、はち、きゅう、じゅう',
    furigana: 'ろく、なな、はち、きゅう、じゅう',
    kanji: '六、七、八、九、十',
    romaji: 'roku, nana, hachi, kyuu, juu',
    chinese: '數字 6 ~ 10',
    note: '七常唸成 nana'
  },
  {
    id: 'v_num_3',
    category: 'numbers',
    japanese: 'ひゃく、せん、まん',
    furigana: 'ひゃく、せん、まん',
    kanji: '百、千、万',
    romaji: 'hyaku, sen, man',
    chinese: '百、千、萬 (貨幣單位)',
    note: '例如：三千日圓 (さんぜんえん)'
  },
  {
    id: 'v_num_4',
    category: 'numbers',
    japanese: 'いま何時ですか',
    furigana: 'いまなんじですか',
    kanji: '今何時ですか',
    romaji: 'ima nanji desu ka',
    chinese: '現在幾點？',
    note: '詢問時間'
  },
  {
    id: 'v_num_5',
    category: 'numbers',
    japanese: 'きょう、あした、きのう',
    furigana: 'きょう、あした、きのう',
    kanji: '今日、明日、昨日',
    romaji: 'kyou, ashita, kinou',
    chinese: '今天、明天、昨天',
    note: '日常時間三概念'
  },

  // 生活必備 (Daily Core)
  {
    id: 'v_dai_1',
    category: 'daily',
    japanese: 'はい、いいえ',
    furigana: 'はい、いいえ',
    kanji: 'はい、いいえ',
    romaji: 'hai, iie',
    chinese: '是 / 不是',
    note: '最基礎的答覆詞'
  },
  {
    id: 'v_dai_2',
    category: 'daily',
    japanese: 'わかりました',
    furigana: 'わかりました',
    kanji: '分かりました',
    romaji: 'wakarimashita',
    chinese: '我明白了 / 知道了',
    note: '聽懂對方指示時回覆'
  },
  {
    id: 'v_dai_3',
    category: 'daily',
    japanese: 'わかりません',
    furigana: 'わかりません',
    kanji: '分かりません',
    romaji: 'wakarimasen',
    chinese: '我不知道 / 我聽不懂',
    note: '聽不懂時誠懇回覆'
  },
  {
    id: 'v_dai_4',
    category: 'daily',
    japanese: '日本語が話せません',
    furigana: 'にほんごがはなせません',
    kanji: '日本語が話せません',
    romaji: 'nihongo ga hanasemasen',
    chinese: '我不會說日文',
    note: '外國旅行自救句'
  },
  {
    id: 'v_dai_5',
    category: 'daily',
    japanese: '英語が話せますか',
    furigana: 'えいごがはなせますか',
    kanji: '英語が話せますか',
    romaji: 'eigo ga hanasemasu ka',
    chinese: '請問您會說英文嗎？',
    note: '尋求英文協助'
  },
  {
    id: 'v_dai_6',
    category: 'daily',
    japanese: '大丈夫です',
    furigana: 'だいじょうぶです',
    kanji: '大丈夫です',
    romaji: 'daijoubu desu',
    chinese: '沒關係 / 不用擔心 / 很好',
    note: '非常萬用的安慰或委婉拒絕語'
  }
];
