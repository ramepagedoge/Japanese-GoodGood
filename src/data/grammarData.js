// Comprehensive Systematic Japanese Grammar & Particle Curriculum (N5 Level)
// Tailored for Duolingo-style sentence building, particle fill-in-the-blanks, and systematic grammar masteries.

export const GRAMMAR_UNITS = [
  {
    id: 'unit_1',
    title: 'Unit 1: 主題助詞「は」與判斷句',
    subtitle: '認識日語最核心的主題標記與自我介紹',
    icon: '👤',
    summary: '日語句子中最重要的骨架：「A は B です」（A 是 B）。學會主題助詞「は」、否定「ではありません」、疑問「ですか」、同類「も」與所屬「の」。',
    particles: [
      {
        particle: 'は',
        romaji: 'wa',
        name: '主題助詞',
        explanation: '讀作「wa」。用來提示整句話的「話題/主題」，就像在說「關於某件事...」。',
        example: '私は学生です。 (我是學生)',
        pitfall: '雖然寫作「は (ha)」，但作為助詞時發音必須讀作「wa」！'
      },
      {
        particle: 'も',
        romaji: 'mo',
        name: '並列助詞 (也)',
        explanation: '表示「也」，用來取代「は」或「が」，表示相同情況。',
        example: '田中さんも学生です。 (田中先生也是學生)',
        pitfall: '不要寫成「田中さんはも」，「も」會直接替換掉「は」！'
      },
      {
        particle: 'の',
        romaji: 'no',
        name: '連體助詞 (的/所屬)',
        explanation: '連接兩個名詞，相當於中文的「的」或表示所屬、產地、屬性。',
        example: '日本の車 (日本的車) / 私の先生 (我的老師)',
        pitfall: '日語名詞與名詞之間幾乎一定要用「の」連接，不能直接兩個名詞拼在一起。'
      }
    ],
    rules: [
      {
        formula: '名詞 A ＋ は ＋ 名詞 B ＋ です',
        meaning: 'A 是 B (肯定句)',
        examples: [
          { jp: '私は台湾人です。', furi: 'わたしはたいわんじんです。', romaji: 'watashi wa taiwanjin desu.', zh: '我是台灣人。' },
          { jp: '田中さんは先生です。', furi: 'たなかさんはせんせいです。', romaji: 'tanaka san wa sensei desu.', zh: '田中先生是老師。' }
        ]
      },
      {
        formula: '名詞 A ＋ は ＋ 名詞 B ＋ ではありません (じゃありません)',
        meaning: 'A 不是 B (否定句)',
        examples: [
          { jp: '私は日本人ではありません。', furi: 'わたしはにほんじんではありません。', romaji: 'watashi wa nihonjin dewa arimasen.', zh: '我不是日本人。' }
        ]
      },
      {
        formula: '句子 ＋ か？',
        meaning: '句尾加上「か」即變為疑問句（不需要問號，但口語常帶問號）',
        examples: [
          { jp: 'あなたは学生ですか。', furi: 'あなたはがくせいですか。', romaji: 'anata wa gakusei desu ka.', zh: '你是學生嗎？' }
        ]
      }
    ],
    // Duolingo-style exercises
    exercises: [
      {
        id: 'u1_e1',
        type: 'sentence_builder',
        prompt: '請將以下詞彙組合成：「我是學生。」',
        targetSentence: '私は学生です',
        targetFurigana: 'わたしはがくせいです',
        targetRomaji: 'watashi wa gakusei desu',
        targetMeaning: '我是學生。',
        correctTokens: ['私', 'は', '学生', 'です'],
        tokenPool: ['私', 'は', '学生', 'です', '田中', 'の', 'ではありません']
      },
      {
        id: 'u1_e2',
        type: 'particle_choice',
        prompt: '請填入正確的助詞：',
        sentenceTemplate: '田中さん [ ? ] 先生です。',
        chineseMeaning: '田中先生是老師。',
        correctParticle: 'は',
        options: ['は', 'を', 'に', 'で'],
        explanation: '此句主語主題是田中先生，提示話題需使用主題助詞「は（發音 wa）」。'
      },
      {
        id: 'u1_e3',
        type: 'sentence_builder',
        prompt: '請組合成：「這也是我的書。」',
        targetSentence: 'これも私の本です',
        targetFurigana: 'これもうちのほんです',
        targetRomaji: 'kore mo watashi no hon desu',
        targetMeaning: '這也是我的書。',
        correctTokens: ['これ', 'も', '私', 'の', '本', 'です'],
        tokenPool: ['これ', 'も', '私', 'の', '本', 'です', 'は', 'か']
      },
      {
        id: 'u1_e4',
        type: 'particle_choice',
        prompt: '請填入表示「也是...」的助詞：',
        sentenceTemplate: '李さん [ ? ] 台湾人です。',
        chineseMeaning: '李先生也是台灣人。',
        correctParticle: 'も',
        options: ['も', 'は', 'の', 'が'],
        explanation: '表示「也是...」時，使用助詞「も」直接取代主題助詞「は」。'
      },
      {
        id: 'u1_e5',
        type: 'particle_choice',
        prompt: '請選擇連接兩個名詞的助詞（相當於中文「的」）：',
        sentenceTemplate: '日本 [ ? ] 車を買いました。',
        chineseMeaning: '買了日本的車。',
        correctParticle: 'の',
        options: ['の', 'は', 'を', 'に'],
        explanation: '名詞修飾名詞（產地、所屬、屬性）時，必須使用連體助詞「の」。'
      }
    ]
  },

  {
    id: 'unit_2',
    title: 'Unit 2: 動作對象「を」與移動方向「へ」',
    subtitle: '日語日常動作的起手式！吃、喝、看與移動',
    icon: '🍱',
    summary: '動詞及物受詞用「を」（發音 o），去哪裡、來哪裡的移動方向用「へ」（發音 e）。學會及物動作與日常交通出發！',
    particles: [
      {
        particle: 'を',
        romaji: 'o',
        name: '賓格助詞 (受詞)',
        explanation: '讀作「o」。緊跟在動作的對象（受詞）後面。',
        example: 'ご飯を食べます (吃飯) / 水を飲みます (喝水)',
        pitfall: '寫作「を (wo)」，但發音一律唸「o」。'
      },
      {
        particle: 'へ',
        romaji: 'e',
        name: '方向助詞 (往...方向)',
        explanation: '讀作「e」。表示移動的方向（常與 行きます、来ます、帰ります 連用）。',
        example: '日本へ行きます (去日本) / 家へ帰ります (回家)',
        pitfall: '寫作「へ (he)」，作為助詞讀作「e」。口語中常與「に」互換。'
      }
    ],
    rules: [
      {
        formula: '名詞 (受詞) ＋ を ＋ 動詞 (ます形)',
        meaning: '做某動作，對象是該名詞',
        examples: [
          { jp: '水を飲みます。', furi: 'みずをのみます。', romaji: 'mizu o nomimasu.', zh: '喝水。' },
          { jp: '日本語を勉強します。', furi: 'にほんごをべんきょうします。', romaji: 'nihongo o benkyou shimasu.', zh: '學習日語。' }
        ]
      },
      {
        formula: '場所 ＋ へ (或 に) ＋ 行きます / 来ます / 帰ります',
        meaning: '朝向某地點移動（去、來、回）',
        examples: [
          { jp: '東京へ行きます。', furi: 'とうきょうへいきます。', romaji: 'toukyou e ikimasu.', zh: '去東京。' },
          { jp: '家へ帰ります。', furi: 'うちへかえります。', romaji: 'uchi e kaerimasu.', zh: '回家。' }
        ]
      }
    ],
    exercises: [
      {
        id: 'u2_e1',
        type: 'sentence_builder',
        prompt: '請將以下詞彙組合成：「吃拉麵。」',
        targetSentence: 'ラーメンを食べます',
        targetFurigana: 'ラーメンをたべます',
        targetRomaji: 'raamen o tabemasu',
        targetMeaning: '吃拉麵。',
        correctTokens: ['ラーメン', 'を', '食べます'],
        tokenPool: ['ラーメン', 'を', '食べます', 'へ', '飲みます', 'は']
      },
      {
        id: 'u2_e2',
        type: 'particle_choice',
        prompt: '請填入及物動作（喝茶）的受詞助詞：',
        sentenceTemplate: 'お茶 [ ? ] 飲みます。',
        chineseMeaning: '喝茶。',
        correctParticle: 'を',
        options: ['を', 'は', 'で', 'に'],
        explanation: '「飲（の）みます」是及物動詞，茶是動作的直接對象，必須接賓格助詞「を」。'
      },
      {
        id: 'u2_e3',
        type: 'sentence_builder',
        prompt: '請組合成：「去日本。」',
        targetSentence: '日本へ行きます',
        targetFurigana: 'にほんへいきます',
        targetRomaji: 'nihon e ikimasu',
        targetMeaning: '去日本。',
        correctTokens: ['日本', 'へ', '行きます'],
        tokenPool: ['日本', 'へ', '行きます', 'を', '来ます', 'で']
      },
      {
        id: 'u2_e4',
        type: 'particle_choice',
        prompt: '請填入表示移動方向（回學校）的助詞：',
        sentenceTemplate: '学校 [ ? ] 帰ります。',
        chineseMeaning: '回學校。',
        correctParticle: 'へ',
        options: ['へ', 'を', 'で', 'から'],
        explanation: '「帰（かえ）ります」是移動動詞，標記朝向的目的地需使用方向助詞「へ（讀作 e）」或「に」。'
      }
    ]
  },

  {
    id: 'unit_3',
    title: 'Unit 3: 助詞大魔王！「で」vs「に」徹底攻略',
    subtitle: '搞懂動作場所、工具手段，與固定著落點的差別',
    icon: '🎯',
    summary: '初學者最容易混淆的兩大助詞！「で」代表動態活動場所、工具手段或交通工具；「に」代表具體時間點、停留著落點或對象。',
    particles: [
      {
        particle: 'で',
        romaji: 'de',
        name: '手段/場所助詞',
        explanation: '1. 做動作的場所（在某地做某事） 2. 工具、手段、語言、交通工具（用某工具做某事）。',
        example: '図書館で本を読みます (在圖書館看書) / 電車で行きます (搭電車去)',
        pitfall: '只要在那個地方有「動作進行」，就用「で」！'
      },
      {
        particle: 'に',
        romaji: 'ni',
        name: '著落點/時間助詞',
        explanation: '1. 具體時間點（在幾點、在星期幾） 2. 存在/著落的靜止位置 3. 動作的接收對象。',
        example: '7時に起きます (7點起床) / 友達に会います (見朋友)',
        pitfall: '沒有具體數字的時間（如：今天、明天、每天）後面「不可」加「に」！'
      }
    ],
    rules: [
      {
        formula: '場所 ＋ で ＋ 動作動詞',
        meaning: '在某地進行某項動態活動',
        examples: [
          { jp: 'レストランでご飯を食べます。', furi: 'レストランでごはんをたべます。', romaji: 'resutoran de gohan o tabemasu.', zh: '在餐廳吃飯。' },
          { jp: '部屋でテレビを見ます。', furi: 'へやでテレビをみます。', romaji: 'heya de terebi o mimasu.', zh: '在房間看電視。' }
        ]
      },
      {
        formula: '工具 / 交通工具 ＋ で ＋ 動詞',
        meaning: '用某種工具、搭乘某交通工具或以某語言',
        examples: [
          { jp: '箸で寿司を食べます。', furi: 'はしですしをたべます。', romaji: 'hashi de sushi o tabemasu.', zh: '用筷子吃壽司。' },
          { jp: '新幹線で行きます。', furi: 'しんかんせんでいきます。', romaji: 'shinkansen de ikimasu.', zh: '搭新幹線去。' }
        ]
      },
      {
        formula: '具體時間點 ＋ に ＋ 動詞',
        meaning: '在幾點、幾號或特定時間做某事',
        examples: [
          { jp: '毎朝七時に起きます。', furi: 'まいあさしちじにおきます。', romaji: 'maiasa shichiji ni okimasu.', zh: '每天早上七點起床。' }
        ]
      }
    ],
    exercises: [
      {
        id: 'u3_e1',
        type: 'particle_choice',
        prompt: '請選擇正確助詞（在圖書館看書）：',
        sentenceTemplate: '図書館 [ ? ] 本を読みます。',
        chineseMeaning: '在圖書館看書。',
        correctParticle: 'で',
        options: ['で', 'に', 'を', 'へ'],
        explanation: '「看書（読みます）」是一項動態活動，動作發生的地點必須使用助詞「で」。'
      },
      {
        id: 'u3_e2',
        type: 'particle_choice',
        prompt: '請選擇交通工具的助詞（搭電車去）：',
        sentenceTemplate: '電車 [ ? ] 行きます。',
        chineseMeaning: '搭電車去。',
        correctParticle: 'で',
        options: ['で', 'に', 'を', 'から'],
        explanation: '表示交通工具、手段或媒介時，一律使用助詞「で」。'
      },
      {
        id: 'u3_e3',
        type: 'particle_choice',
        prompt: '請選擇時間點助詞（早上六點起床）：',
        sentenceTemplate: '朝六時 [ ? ] 起きます。',
        chineseMeaning: '早上六點起床。',
        correctParticle: 'に',
        options: ['に', 'で', 'を', 'は'],
        explanation: '帶有具體數字的精確時間點（六時），後面必須接時間標記助詞「に」。'
      },
      {
        id: 'u3_e4',
        type: 'sentence_builder',
        prompt: '請組合成：「用日語交談。」',
        targetSentence: '日本語で話します',
        targetFurigana: 'にほんごではなします',
        targetRomaji: 'nihongo de hanashimasu',
        targetMeaning: '用日語交談。',
        correctTokens: ['日本語', 'で', '話します'],
        tokenPool: ['日本語', 'で', '話します', 'を', 'に', 'へ']
      }
    ]
  },

  {
    id: 'unit_4',
    title: 'Unit 4: 存在句「あります」vs「います」與主語「が」',
    subtitle: '活體生物與靜態物品的空間存在表現',
    icon: '🐱',
    summary: '日語將「有/存在」嚴格分成兩大類：有自覺意識的人與動物用「います」；植物與無生命物品用「あります」。主語搭配助詞「が」。',
    particles: [
      {
        particle: 'が',
        romaji: 'ga',
        name: '主格助詞 (主語/焦點)',
        explanation: '標記客觀現象的主體、能力對象，或存在句中「存在的人事物」。',
        example: '猫がいます (有貓咪) / 本があります (有書本)',
        pitfall: '在「〜に〜があります/います」的存在句型中，存在的事物必須用「が」！'
      }
    ],
    rules: [
      {
        formula: '場所 ＋ に ＋ 人/動物 ＋ が ＋ います',
        meaning: '某處有某人或動物 (有生命、能自主活動)',
        examples: [
          { jp: '庭に犬がいます。', furi: 'にわにいぬがいます。', romaji: 'niwa ni inu ga imasu.', zh: '院子裡有一隻狗。' },
          { jp: '教室に先生がいます。', furi: 'きょうしつにせんせいがいます。', romaji: 'kyoushitsu ni sensei ga imasu.', zh: '教室裡有老師。' }
        ]
      },
      {
        formula: '場所 ＋ に ＋ 物品/植物 ＋ が ＋ あります',
        meaning: '某處有某物品或植物 (無生命、無法自主活動)',
        examples: [
          { jp: '机の上に本があります。', furi: 'つくえのうえにほんがあります。', romaji: 'tsukue no ue ni hon ga arimasu.', zh: '桌子上有書。' },
          { jp: '駅の前にコンビニがあります。', furi: 'えきのまえにコンビニがあります。', romaji: 'eki no mae ni konbini ga arimasu.', zh: '車站前有便利商店。' }
        ]
      }
    ],
    exercises: [
      {
        id: 'u4_e1',
        type: 'particle_choice',
        prompt: '請填入存在句中標記主語的助詞：',
        sentenceTemplate: '部屋に猫 [ ? ] います。',
        chineseMeaning: '房間裡有一隻貓。',
        correctParticle: 'が',
        options: ['が', 'を', 'で', 'へ'],
        explanation: '存在句的固定句型為「場所 ＋ に ＋ 主語 ＋ が ＋ います/あります」。'
      },
      {
        id: 'u4_e2',
        type: 'sentence_builder',
        prompt: '請組合成：「桌上有電腦。」',
        targetSentence: '机の上にパソコンがあります',
        targetFurigana: 'つくえのうえにパソコンがあります',
        targetRomaji: 'tsukue no ue ni pasokon ga arimasu',
        targetMeaning: '桌上有電腦。',
        correctTokens: ['机', 'の', '上', 'に', 'パソコン', 'が', 'あります'],
        tokenPool: ['机', 'の', '上', 'に', 'パソコン', 'が', 'あります', 'います', 'を']
      },
      {
        id: 'u4_e3',
        type: 'particle_choice',
        prompt: '朋友是人，請選出正確的動詞：「友達が [ ? ]」',
        sentenceTemplate: '公園に友達が [ ? ]。',
        chineseMeaning: '公園裡有朋友。',
        correctParticle: 'います',
        options: ['います', 'あります', 'します', '行きます'],
        explanation: '朋友是有自主活動生命的人，存在動詞必須使用「います」，物品植物才用「あります」。'
      }
    ]
  },

  {
    id: 'unit_5',
    title: 'Unit 5: 起點終點「から〜まで」與 伴隨「と」',
    subtitle: '時間範圍、營業時間與「和某人一起」日常會話',
    icon: '⏰',
    summary: '從幾點到幾點用「から〜まで」；和誰一起做某事、或完全列舉名詞用「と」。旅行問營業時間、約朋友最常用！',
    particles: [
      {
        particle: 'から',
        romaji: 'kara',
        name: '起點助詞 (從/自)',
        explanation: '表示時間、空間或順序的起點（從...開始）。',
        example: '九時から (從9點開始) / 台湾から (從台灣來)',
        pitfall: '也可放在句尾表示「因為...理由」（如：暑いですから）。'
      },
      {
        particle: 'まで',
        romaji: 'made',
        name: '終點助詞 (到...為止)',
        explanation: '表示時間或空間的終點（到...為止）。',
        example: '五時まで (到5點為止) / 東京まで (到東京)',
        pitfall: '「まで」表示持續到何時；「までに」則是期限（在...之前要完成）。'
      },
      {
        particle: 'と',
        romaji: 'to',
        name: '伴隨/並列助詞 (和/與)',
        explanation: '1. 和某人一起做某事 2. 名詞與名詞的完全列舉（A 和 B）。',
        example: '友達と行きます (和朋友一起去) / パンと卵 (麵包和蛋)',
        pitfall: '「と」表示全部列舉；若只列舉一部分要用「や」。'
      }
    ],
    rules: [
      {
        formula: '時間/地點 A ＋ から ＋ 時間/地點 B ＋ まで',
        meaning: '從 A 到 B',
        examples: [
          { jp: '銀行は九時から三時までです。', furi: 'ぎんこうはくじからさんじまでです。', romaji: 'ginkou wa kuji kara sanji made desu.', zh: '銀行營業時間是從 9 點到 3 點。' }
        ]
      },
      {
        formula: '人物 ＋ と ＋ 一緒に ＋ 動詞',
        meaning: '和某人一起做某事（一緒に 常可省略）',
        examples: [
          { jp: '家族と旅行へ行きます。', furi: 'かぞくとりょこうへいきます。', romaji: 'kazoku to ryokou e ikimasu.', zh: '和家人去旅行。' }
        ]
      }
    ],
    exercises: [
      {
        id: 'u5_e1',
        type: 'sentence_builder',
        prompt: '請組合成：「和朋友去吃壽司。」',
        targetSentence: '友達と寿司を食べに行きます',
        targetFurigana: 'ともだちとすしをたべにいきます',
        targetRomaji: 'tomodachi to sushi o tabe ni ikimasu',
        targetMeaning: '和朋友去吃壽司。',
        correctTokens: ['友達', 'と', '寿司', 'を', '食べに行きます'],
        tokenPool: ['友達', 'と', '寿司', 'を', '食べに行きます', 'から', 'まで', 'は']
      },
      {
        id: 'u5_e2',
        type: 'particle_choice',
        prompt: '請填入表示「到五點為止」的助詞：',
        sentenceTemplate: '仕事は九時から五時 [ ? ] です。',
        chineseMeaning: '工作是從九點到五點。',
        correctParticle: 'まで',
        options: ['まで', 'から', 'に', 'で'],
        explanation: '「から」是起點，「まで」是終點，固定搭配「A から B まで（從 A 到 B）」。'
      },
      {
        id: 'u5_e3',
        type: 'particle_choice',
        prompt: '請選擇表示「和某人一起」的助詞：',
        sentenceTemplate: '明日、田中さん [ ? ] 会います。',
        chineseMeaning: '明天和田中先生碰面。',
        correctParticle: 'と',
        options: ['と', 'を', 'で', 'から'],
        explanation: '表示動作的共同參與者或相互對象時，使用助詞「と」。'
      }
    ]
  },

  {
    id: 'unit_6',
    title: 'Unit 6: 願望「〜たいです」與 請求「〜てください」',
    subtitle: '日本旅遊點餐、購物、問路必備句型',
    icon: '✨',
    summary: '表達自己「想要做某事」用動詞ます形去ます＋「たいです」；禮貌請對方做某事用動詞て形＋「てください」。',
    particles: [
      {
        particle: 'を / が',
        romaji: 'o / ga',
        name: '願望句的受詞標記',
        explanation: '在「〜たいです」句型中，對象原本接「を」，但在表達強烈願望時也常改接「が」。',
        example: '水が飲みたいです = 水を飲みたいです (想喝水)',
        pitfall: '「〜たいです」只能用在「第一人稱（我自己）」想做某事，不能直接對別人說「你想不想」！'
      }
    ],
    rules: [
      {
        formula: '動詞ます形 (去ます) ＋ たいです',
        meaning: '我想做某事 (第一人稱願望)',
        examples: [
          { jp: '日本へ行きたいです。', furi: 'にほんへいきたいです。', romaji: 'nihon e ikitai desu.', zh: '我想去日本。' },
          { jp: 'ラーメンが食べたいです。', furi: 'ラーメンがたべたいです。', romaji: 'raamen ga tabetai desu.', zh: '我想吃拉麵。' }
        ]
      },
      {
        formula: '動詞て形 ＋ ください',
        meaning: '請做某事 (禮貌請求、點餐自救必備)',
        examples: [
          { jp: 'これをください。', furi: 'これをください。', romaji: 'kore o kudasai.', zh: '請給我這個。' },
          { jp: 'ちょっと待ってください。', furi: 'ちょっとまってください。', romaji: 'chotto matte kudasai.', zh: '請稍微等一下。' },
          { jp: 'メニューを見せてください。', furi: 'メニューをみせてください。', romaji: 'menyuu o misete kudasai.', zh: '請給我看菜單。' }
        ]
      }
    ],
    exercises: [
      {
        id: 'u6_e1',
        type: 'sentence_builder',
        prompt: '請組合成：「我想去日本。」',
        targetSentence: '日本へ行きたいです',
        targetFurigana: 'にほんへいきたいです',
        targetRomaji: 'nihon e ikitai desu',
        targetMeaning: '我想去日本。',
        correctTokens: ['日本', 'へ', '行きたいです'],
        tokenPool: ['日本', 'へ', '行きたいです', '行きます', 'を', 'で']
      },
      {
        id: 'u6_e2',
        type: 'sentence_builder',
        prompt: '請組合成超常用自救句：「請稍微等一下。」',
        targetSentence: 'ちょっと待ってください',
        targetFurigana: 'ちょっとまってください',
        targetRomaji: 'chotto matte kudasai',
        targetMeaning: '請稍微等一下。',
        correctTokens: ['ちょっと', '待って', 'ください'],
        tokenPool: ['ちょっと', '待って', 'ください', '待つ', 'ます', 'たいです']
      },
      {
        id: 'u6_e3',
        type: 'particle_choice',
        prompt: '點餐時說「請給我這個」：',
        sentenceTemplate: 'これ [ ? ] ください。',
        chineseMeaning: '請給我這個。',
        correctParticle: 'を',
        options: ['を', 'は', 'に', 'で'],
        explanation: '「これ（這個）」是祈求給予的對象受詞，接受詞助詞「を」。'
      }
    ]
  }
];

// Special Particles Cheat Sheet & Quick Reference
export const PARTICLES_SUMMARY = [
  {
    symbol: 'は',
    pronounce: 'wa',
    title: '提示主題',
    core: '標記句子話題、強調對比',
    example: '私は学生です。 (我是學生)',
    rules: '寫作「は」讀作「wa」。整句話的聚光燈照在它後面的內容。'
  },
  {
    symbol: 'が',
    pronounce: 'ga',
    title: '主格焦點',
    core: '標記主詞、客觀現象、存在主體、能力好惡',
    example: '猫がいます。 (有貓咪) / 日本語が分かります。 (懂日文)',
    rules: '聚光燈照在「が」前面的這個主語本身！'
  },
  {
    symbol: 'を',
    pronounce: 'o',
    title: '動作對象',
    core: '及物動詞的直接受詞、移動通過的場所',
    example: 'ご飯を食べます。 (吃飯) / 公園を散歩します。 (在公園散步)',
    rules: '寫作「を」讀作「o」。'
  },
  {
    symbol: 'に',
    pronounce: 'ni',
    title: '時間與著落點',
    core: '具體時間、目的地、靜止存在處、動作對象',
    example: '七時に起きます。 (七點起床) / 友達に会います。 (見朋友)',
    rules: '著落點與固定錨點。具體有數字的時間後面加「に」。'
  },
  {
    symbol: 'で',
    pronounce: 'de',
    title: '場所與手段',
    core: '動態動作發生地、交通工具、使用工具、原因',
    example: '家で勉強します。 (在家讀書) / バスで行きます。 (搭巴士去)',
    rules: '有「動作在進行」的地點用「で」；靜止不動的存在用「に」。'
  },
  {
    symbol: 'へ',
    pronounce: 'e',
    title: '移動方向',
    core: '朝向某個目的地前進（去、來、回）',
    example: '台湾へ帰ります。 (回台灣)',
    rules: '寫作「へ」讀作「e」。強調前進的方向感。'
  },
  {
    symbol: 'と',
    pronounce: 'to',
    title: '完全列舉與伴隨',
    core: '和某人一起、名詞完全列舉（A 和 B）',
    example: '友達と話します。 (和朋友說話)',
    rules: '「A と B」代表只有 A 和 B 兩者。'
  },
  {
    symbol: 'も',
    pronounce: 'mo',
    title: '並列同類',
    core: '也...（直接替換掉 は 或 が）',
    example: '私も行きます。 (我也要去)',
    rules: '不可跟 は 連用（不能寫成「私はも」）。'
  },
  {
    symbol: 'の',
    pronounce: 'no',
    title: '名詞連接與所屬',
    core: '的、產地、屬性、身分說明',
    example: '私の本。 (我的書) / 日本のカメラ。 (日本的相機)',
    rules: '名詞修飾名詞一定要用「の」串接。'
  },
  {
    symbol: 'から / まで',
    pronounce: 'kara / made',
    title: '起點與終點',
    core: '從...到...（時間、空間、順序）',
    example: '九時から五時まで。 (從9點到5點)',
    rules: '「から」是起點，「まで」是終點。'
  }
];
