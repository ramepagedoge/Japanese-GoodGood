// Comprehensive Japanese Kana Dataset with mnemonics, romaji, audio representations, and beginner examples

export const SEION_DATA = [
  // あ行
  { id: 'a', hiragana: 'あ', katakana: 'ア', romaji: 'a', row: 'a', mnemonic: '像一顆大寫「A」被繩子綁住', example: 'あさ (朝)', meaning: '早晨' },
  { id: 'i', hiragana: 'い', katakana: 'イ', romaji: 'i', row: 'a', mnemonic: '兩條垂掛的「以」字偏旁', example: 'いぬ (犬)', meaning: '狗' },
  { id: 'u', hiragana: 'う', katakana: 'ウ', romaji: 'u', row: 'a', mnemonic: '彎腰駝背的老人「嗚」了一聲', example: 'うみ (海)', meaning: '海洋' },
  { id: 'e', hiragana: 'え', katakana: 'エ', romaji: 'e', row: 'a', mnemonic: '像元旦老人騎著雪橇「誒」一聲走過', example: 'えき (駅)', meaning: '車站' },
  { id: 'o', hiragana: 'お', katakana: 'オ', romaji: 'o', row: 'a', mnemonic: '急躁的人在「哦」一聲轉身跑步', example: 'お茶 (おちゃ)', meaning: '綠茶' },

  // か行
  { id: 'ka', hiragana: 'か', katakana: 'カ', romaji: 'ka', row: 'ka', mnemonic: '大刀向右砍出一滴血花「卡」', example: 'かさ (傘)', meaning: '雨傘' },
  { id: 'ki', hiragana: 'き', katakana: 'キ', romaji: 'ki', row: 'ka', mnemonic: '像一把古老傳統的「Key」鑰匙', example: '木 (き)', meaning: '樹木' },
  { id: 'ku', hiragana: 'く', katakana: 'ク', romaji: 'ku', row: 'ka', mnemonic: '小鳥張大尖嘴發出「咕咕」聲', example: 'くるま (車)', meaning: '汽車' },
  { id: 'ke', hiragana: 'け', katakana: 'ケ', romaji: 'ke', row: 'ka', mnemonic: '像一把筆直站立的開門「鑰匙」', example: 'けさ (今朝)', meaning: '今晨' },
  { id: 'ko', hiragana: 'こ', katakana: 'コ', romaji: 'ko', row: 'ka', mnemonic: '上下兩條圓弧線「口口」相對', example: 'こども (子供)', meaning: '小孩' },

  // さ行
  { id: 'sa', hiragana: 'さ', katakana: 'サ', romaji: 'sa', row: 'sa', mnemonic: '像一個跳著草裙舞的女孩子', example: 'さくら (桜)', meaning: '櫻花' },
  { id: 'shi', hiragana: 'し', katakana: 'シ', romaji: 'shi', row: 'sa', mnemonic: '像一根吸管或一根長長捲起的「吸」水管', example: 'しろ (白)', meaning: '白色' },
  { id: 'su', hiragana: 'す', katakana: 'ス', romaji: 'su', row: 'sa', mnemonic: '像一條吊著搖擺的項鍊墜子', example: 'すし (寿司)', meaning: '壽司' },
  { id: 'se', hiragana: 'せ', katakana: 'セ', romaji: 'se', row: 'sa', mnemonic: '世界「世」的簡體草書', example: 'せんせい (先生)', meaning: '老師' },
  { id: 'so', hiragana: 'そ', katakana: 'ソ', romaji: 'so', row: 'sa', mnemonic: '閃電般曲折滑動的「Z」字型雪橇', example: 'そら (空)', meaning: '天空' },

  // た行
  { id: 'ta', hiragana: 'た', katakana: 'タ', romaji: 'ta', row: 'ta', mnemonic: '「太」平洋的太字簡化草寫', example: 'たべる (食べる)', meaning: '吃' },
  { id: 'chi', hiragana: 'ち', katakana: 'チ', romaji: 'chi', row: 'ta', mnemonic: '像一把精巧的啦啦隊彩球球桿', example: 'ちず (地図)', meaning: '地圖' },
  { id: 'tsu', hiragana: 'つ', katakana: 'ツ', romaji: 'tsu', row: 'ta', mnemonic: '海浪拍打掀起的滔天大浪「海嘯 (Tsunami)」', example: 'つき (月)', meaning: '月亮' },
  { id: 'te', hiragana: 'て', katakana: 'テ', romaji: 'te', row: 'ta', mnemonic: '手部「手 (Te)」伸出的彎曲手掌', example: 'て (手)', meaning: '手' },
  { id: 'to', hiragana: 'と', katakana: 'ト', romaji: 'to', row: 'ta', mnemonic: '像腳趾頭（Toe）踢進了一根刺', example: 'ともだち (友達)', meaning: '朋友' },

  // な行
  { id: 'na', hiragana: 'な', katakana: 'ナ', romaji: 'na', row: 'na', mnemonic: '雙手合十祈求「那」麼美好的心願', example: 'なつ (夏)', meaning: '夏天' },
  { id: 'ni', hiragana: 'に', katakana: 'ニ', romaji: 'ni', row: 'na', mnemonic: '左側站立一人，右邊兩橫代表數字「二 (Ni)」', example: 'にく (肉)', meaning: '肉類' },
  { id: 'nu', hiragana: 'ぬ', katakana: 'ヌ', romaji: 'nu', row: 'na', mnemonic: '一雙筷子捲著熱騰騰的「Noodle」拉麵', example: 'いぬ (犬)', meaning: '狗' },
  { id: 'ne', hiragana: 'ね', katakana: 'ネ', romaji: 'ne', row: 'na', mnemonic: '小貓尾巴（Neko）俏皮地捲在最後面', example: 'ねこ (猫)', meaning: '貓咪' },
  { id: 'no', hiragana: 'の', katakana: 'ノ', romaji: 'no', row: 'na', mnemonic: '交通禁制標誌「No」禁止通行', example: 'のみもの (飲み物)', meaning: '飲料' },

  // は行
  { id: 'ha', hiragana: 'は', katakana: 'ハ', romaji: 'ha', row: 'ha', mnemonic: '像戴著大圓草帽哈哈大笑的人', example: 'はな (花)', meaning: '花朵' },
  { id: 'hi', hiragana: 'ひ', katakana: 'ヒ', romaji: 'hi', row: 'ha', mnemonic: '一個嘴角上揚「嘻嘻」笑的大微笑臉', example: 'ひと (人)', meaning: '人' },
  { id: 'fu', hiragana: 'ふ', katakana: 'フ', romaji: 'fu', row: 'ha', mnemonic: '富士山（Mt. Fuji）的立體等高線山型', example: 'ふね (船)', meaning: '輪船' },
  { id: 'he', hiragana: 'へ', katakana: 'ヘ', romaji: 'he', row: 'ha', mnemonic: '像一個隆起的小山丘坡頂', example: 'へや (部屋)', meaning: '房間' },
  { id: 'ho', hiragana: 'ほ', katakana: 'ホ', romaji: 'ho', row: 'ha', mnemonic: '「は」字戴上了一頂高禮帽「Ho」', example: 'ほん (本)', meaning: '書本' },

  // ま行
  { id: 'ma', hiragana: 'ま', katakana: 'マ', romaji: 'ma', row: 'ma', mnemonic: '像一位美麗慈祥的媽媽（Mama）臉龐', example: 'まち (町)', meaning: '城鎮' },
  { id: 'mi', hiragana: 'み', katakana: 'ミ', romaji: 'mi', row: 'ma', mnemonic: '音樂中「Mi」代表數字 21 般旋轉的音符', example: 'みず (水)', meaning: '水' },
  { id: 'mu', hiragana: 'む', katakana: 'ム', romaji: 'mu', row: 'ma', mnemonic: '像一頭乳牛的牛頭與翹起的牛尾巴（Moo）', example: 'むし (虫)', meaning: '昆蟲' },
  { id: 'me', hiragana: 'め', katakana: 'メ', romaji: 'me', row: 'ma', mnemonic: '像一雙晶瑩剔透的大眼睛（目 - Me）', example: 'め (目)', meaning: '眼睛' },
  { id: 'mo', hiragana: 'も', katakana: 'モ', romaji: 'mo', row: 'ma', mnemonic: '像多了一橫的釣魚勾勾住更多（More）魚餌', example: 'もり (森)', meaning: '森林' },

  // や行
  { id: 'ya', hiragana: 'や', katakana: 'ヤ', romaji: 'ya', row: 'ya', mnemonic: '像一艘揚帆迎風航行的帆船（Yacht）', example: 'やま (山)', meaning: '山峰' },
  { id: 'yu', hiragana: 'ゆ', katakana: 'ユ', romaji: 'yu', row: 'ya', mnemonic: '像一隻優雅漂浮在熱溫泉（湯 - Yu）裡的小金魚', example: 'ゆき (雪)', meaning: '白雪' },
  { id: 'yo', hiragana: 'よ', katakana: 'ヨ', romaji: 'yo', row: 'ya', mnemonic: '像手上拎著一隻彈力溜溜球（Yo-yo）', example: 'よる (夜)', meaning: '夜晚' },

  // ら行
  { id: 'ra', hiragana: 'ら', katakana: 'ラ', romaji: 'ra', row: 'ra', mnemonic: '像一個蹲坐在馬桶上的人', example: 'らいげつ (来月)', meaning: '下個月' },
  { id: 'ri', hiragana: 'り', katakana: 'リ', romaji: 'ri', row: 'ra', mnemonic: '一對飄動的絲帶或兩根細竹竿', example: 'りんご (林檎)', meaning: '蘋果' },
  { id: 'ru', hiragana: 'る', katakana: 'ル', romaji: 'ru', row: 'ra', mnemonic: '尾巴帶有一顆小寶石圓圈的魔杖', example: 'くるま (車)', meaning: '車輛' },
  { id: 're', hiragana: 'れ', katakana: 'レ', romaji: 're', row: 'ra', mnemonic: '一個單膝跪地正在行禮的紳士', example: 'れきし (歴史)', meaning: '歷史' },
  { id: 'ro', hiragana: 'ろ', katakana: 'ロ', romaji: 'ro', row: 'ra', mnemonic: '「る」弄丟了它尾巴上的寶石圓圈', example: 'ろうそく', meaning: '蠟燭' },

  // わ・を・ん
  { id: 'wa', hiragana: 'わ', katakana: 'ワ', romaji: 'wa', row: 'wa', mnemonic: '一隻正在展翅歡呼的白鵝「哇！」', example: 'わたし (私)', meaning: '我' },
  { id: 'wo', hiragana: 'を', katakana: 'ヲ', romaji: 'wo', row: 'wa', mnemonic: '日語受格助詞，像一個大步滑雪的人', example: '〜を (助詞)', meaning: '動作受詞' },
  { id: 'n', hiragana: 'ん', katakana: 'ン', romaji: 'n', row: 'wa', mnemonic: '英文字母小寫「n」的潦草寫法', example: 'にほん (日本)', meaning: '日本' },
];

export const DAKUON_DATA = [
  // が行 (G)
  { id: 'ga', hiragana: 'が', katakana: 'ガ', romaji: 'ga', row: 'ga', example: 'がっこう (学校)', meaning: '學校' },
  { id: 'gi', hiragana: 'ぎ', katakana: 'ギ', romaji: 'gi', row: 'ga', example: 'ぎんこう (銀行)', meaning: '銀行' },
  { id: 'gu', hiragana: 'ぐ', katakana: 'グ', romaji: 'gu', row: 'ga', example: 'ぐあい (具合)', meaning: '狀況/體感' },
  { id: 'ge', hiragana: 'げ', katakana: 'ゲ', romaji: 'ge', row: 'ga', example: 'げんき (元気)', meaning: '元氣/健康' },
  { id: 'go', hiragana: 'ご', katakana: 'ゴ', romaji: 'go', row: 'ga', example: 'ごはん (ご飯)', meaning: '米飯' },

  // ざ行 (Z/J)
  { id: 'za', hiragana: 'ざ', katakana: 'ザ', romaji: 'za', row: 'za', example: 'ざっし (雑誌)', meaning: '雜誌' },
  { id: 'ji', hiragana: 'じ', katakana: 'ジ', romaji: 'ji', row: 'za', example: 'じかん (時間)', meaning: '時間' },
  { id: 'zu', hiragana: 'ず', katakana: 'ズ', romaji: 'zu', row: 'za', example: 'ちず (地図)', meaning: '地圖' },
  { id: 'ze', hiragana: 'ぜ', katakana: 'ゼ', romaji: 'ze', row: 'za', example: 'ぜんぶ (全部)', meaning: '全部' },
  { id: 'zo', hiragana: 'ぞ', katakana: 'ゾ', romaji: 'zo', row: 'za', example: 'ぞう (象)', meaning: '大象' },

  // だ行 (D)
  { id: 'da', hiragana: 'だ', katakana: 'ダ', romaji: 'da', row: 'da', example: 'だいがく (大学)', meaning: '大學' },
  { id: 'di', hiragana: 'ぢ', katakana: 'ヂ', romaji: 'ji (di)', row: 'da', example: 'はなぢ (鼻血)', meaning: '流鼻血' },
  { id: 'du', hiragana: 'づ', katakana: 'ヅ', romaji: 'zu (du)', row: 'da', example: 'つづく (続く)', meaning: '持續' },
  { id: 'de', hiragana: 'で', katakana: 'デ', romaji: 'de', row: 'da', example: 'でんしゃ (電車)', meaning: '電車' },
  { id: 'do', hiragana: 'ど', katakana: 'ド', romaji: 'do', row: 'da', example: 'どこ (何処)', meaning: '哪裡' },

  // ば行 (B)
  { id: 'ba', hiragana: 'ば', katakana: 'バ', romaji: 'ba', row: 'ba', example: 'ばんごう (番号)', meaning: '號碼' },
  { id: 'bi', hiragana: 'び', katakana: 'ビ', romaji: 'bi', row: 'ba', example: 'びょういん (病院)', meaning: '醫院' },
  { id: 'bu', hiragana: 'ぶ', katakana: 'ブ', romaji: 'bu', row: 'ba', example: 'ぶた (豚)', meaning: '豬' },
  { id: 'be', hiragana: 'べ', katakana: 'ベ', romaji: 'be', row: 'ba', example: 'べんきょう (勉強)', meaning: '學習' },
  { id: 'bo', hiragana: 'ぼ', katakana: 'ボ', romaji: 'bo', row: 'ba', example: 'ぼうし (帽子)', meaning: '帽子' },

  // ぱ行 (P - 半濁音)
  { id: 'pa', hiragana: 'ぱ', katakana: 'パ', romaji: 'pa', row: 'pa', example: 'パン (麵包)', meaning: '麵包' },
  { id: 'pi', hiragana: 'ぴ', katakana: 'ピ', romaji: 'pi', row: 'pa', example: 'ピンク (粉紅)', meaning: '粉紅色' },
  { id: 'pu', hiragana: 'ぷ', katakana: 'プ', romaji: 'pu', row: 'pa', example: 'プール (泳池)', meaning: '游泳池' },
  { id: 'pe', hiragana: 'ぺ', katakana: 'ペ', romaji: 'pe', row: 'pa', example: 'ペン (筆)', meaning: '原子筆' },
  { id: 'po', hiragana: 'ぽ', katakana: 'ポ', romaji: 'po', row: 'pa', example: 'ポスト (郵筒)', meaning: '郵筒' },
];

export const YOON_DATA = [
  { id: 'kya', hiragana: 'きゃ', katakana: 'キャ', romaji: 'kya', example: 'きゃく (客)', meaning: '客人' },
  { id: 'kyu', hiragana: 'きゅ', katakana: 'キュ', romaji: 'kyu', example: 'きゅうり (胡瓜)', meaning: '小黃瓜' },
  { id: 'kyo', hiragana: 'きょ', katakana: 'キョ', romaji: 'kyo', example: 'きょう (今日)', meaning: '今天' },

  { id: 'sha', hiragana: 'しゃ', katakana: 'シャ', romaji: 'sha', example: 'しゃしん (写真)', meaning: '照片' },
  { id: 'shu', hiragana: 'しゅ', katakana: 'シュ', romaji: 'shu', example: 'しゅくだい (宿題)', meaning: '作業' },
  { id: 'sho', hiragana: 'しょ', katakana: 'ショ', romaji: 'sho', example: 'しょくどう (食堂)', meaning: '餐廳' },

  { id: 'cha', hiragana: 'ちゃ', katakana: 'チャ', romaji: 'cha', example: 'おちゃ (お茶)', meaning: '茶' },
  { id: 'chu', hiragana: 'ちゅ', katakana: 'チュ', romaji: 'chu', example: 'ちゅうごく (中国)', meaning: '中國' },
  { id: 'cho', hiragana: 'ちょ', katakana: 'チョ', romaji: 'cho', example: 'ちょっと', meaning: '稍微/一下' },

  { id: 'nya', hiragana: 'にゃ', katakana: 'ニャ', romaji: 'nya', example: 'にゃんこ', meaning: '貓咪叫聲' },
  { id: 'nyu', hiragana: 'にゅ', katakana: 'ニュ', romaji: 'nyu', example: 'ぎゅうにゅう (牛乳)', meaning: '牛奶' },
  { id: 'nyo', hiragana: 'にょ', katakana: 'ニョ', romaji: 'nyo', example: 'にょうぼう (女房)', meaning: '妻子' },

  { id: 'hya', hiragana: 'ひゃ', katakana: 'ヒャ', romaji: 'hya', example: 'ひゃく (百)', meaning: '一百' },
  { id: 'hyu', hiragana: 'ひゅ', katakana: 'ヒュ', romaji: 'hyu', example: 'ひゅうひゅう', meaning: '風呼呼吹' },
  { id: 'hyo', hiragana: 'ひょ', katakana: 'ヒョ', romaji: 'hyo', example: 'ひょう (豹)', meaning: '豹' },

  { id: 'mya', hiragana: 'みゃ', katakana: 'ミャ', romaji: 'mya', example: 'みゃく (脈)', meaning: '脈搏' },
  { id: 'myu', hiragana: 'みゅ', katakana: 'ミュ', romaji: 'myu', example: 'ミュージカル', meaning: '音樂劇' },
  { id: 'myo', hiragana: 'みょ', katakana: 'ミョ', romaji: 'myo', example: 'みょうじ (名字)', meaning: '姓氏' },

  { id: 'rya', hiragana: 'りゃ', katakana: 'リャ', romaji: 'rya', example: 'りゃく (略)', meaning: '簡稱' },
  { id: 'ryu', hiragana: 'りゅ', katakana: 'リュ', romaji: 'ryu', example: 'りゅう (竜)', meaning: '龍' },
  { id: 'ryo', hiragana: 'りょ', katakana: 'リョ', romaji: 'ryo', example: 'りょこう (旅行)', meaning: '旅行' },

  { id: 'gya', hiragana: 'ぎゃ', katakana: 'ギャ', romaji: 'gya', example: 'ギャグ', meaning: '笑話/梗' },
  { id: 'gyu', hiragana: 'ぎゅ', katakana: 'ギュ', romaji: 'gyu', example: 'ぎゅうにく (牛肉)', meaning: '牛肉' },
  { id: 'gyo', hiragana: 'ぎょ', katakana: 'ギョ', romaji: 'gyo', example: 'ぎょうざ (餃子)', meaning: '煎餃' },

  { id: 'ja', hiragana: 'じゃ', katakana: 'ジャ', romaji: 'ja', example: 'じゃあね', meaning: '待會見' },
  { id: 'ju', hiragana: 'じゅ', katakana: 'ジュ', romaji: 'ju', example: 'じゅぎょう (授業)', meaning: '上課' },
  { id: 'jo', hiragana: 'じょ', katakana: 'ジョ', romaji: 'jo', example: 'じょせい (女性)', meaning: '女性' }
];

export const KANA_ROWS = [
  { key: 'a', name: 'あ行 (a, i, u, e, o)' },
  { key: 'ka', name: 'か行 (ka, ki, ku, ke, ko)' },
  { key: 'sa', name: 'さ行 (sa, shi, su, se, so)' },
  { key: 'ta', name: 'た行 (ta, chi, tsu, te, to)' },
  { key: 'na', name: 'な行 (na, ni, nu, ne, no)' },
  { key: 'ha', name: 'は行 (ha, hi, fu, he, ho)' },
  { key: 'ma', name: 'ま行 (ma, mi, mu, me, mo)' },
  { key: 'ya', name: 'や行 (ya, yu, yo)' },
  { key: 'ra', name: 'ら行 (ra, ri, ru, re, ro)' },
  { key: 'wa', name: 'わ行 (wa, wo, n)' },
];
