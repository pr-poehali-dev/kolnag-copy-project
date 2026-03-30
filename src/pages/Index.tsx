import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/b8f51606-6353-4880-b932-e8c85184bdfa/files/38c957c6-4aee-4fee-8725-df2a7c22f78d.jpg";

interface Product {
  id: number;
  name: string;
  excerpt: string;
  img: string;
  link: string;
}

interface Category {
  id: string;
  label: string;
  heroText: string;
  products: Product[];
}

const techCategories: Category[] = [
  {
    id: "soil",
    label: "Обработка почвы",
    heroText: "Предпосевная и междурядная обработка почвы",
    products: [
      {
        id: 55,
        name: "Культиватор вертикально-фрезерный Celli Ranger/Energy/Maxi",
        excerpt: "Культиватор Celli — одна из самых популярных марок культиваторов для подготовки почвы благодаря разумному соотношению «цена-качество». Применяется для предпосевной обработки почвы под картофель и морковь.",
        img: "https://kolnag.ru/wp-content/uploads/2017/09/Celi-Ranger-1.jpg",
        link: "https://kolnag.ru/kultivator-vertikalno-frezernyj-celli-ranger-energy-maxi.html",
      },
      {
        id: 83,
        name: "Культиватор SIMON CULTIRATEAU",
        excerpt: "При возделывании моркови в промышленных масштабах (от 30 га) и в засушливых районах, где необходимо сохранить влагу в гряде, для подготовки к посеву применяется специализированный культиватор Cultirateau.",
        img: "https://kolnag.ru/wp-content/uploads/2017/05/SIMON-CULTIRATEAU-1.jpg",
        link: "https://kolnag.ru/kultivator-simon-cultirateau.html",
      },
      {
        id: 80,
        name: "Грядообразователь роликовый Rumptstad RSRR",
        excerpt: "Грядообразователь роликовый Rumptstad RSRR для предпосевной обработки почвы. Формирует гряды оптимальной формы для посадки картофеля и моркови с точным соблюдением геометрии.",
        img: "https://kolnag.ru/wp-content/uploads/2017/05/Rumptstad-RSRR-1.jpg",
        link: "https://kolnag.ru/gryadoobrazovatel-rolikovyj-rumptstad-rsrr.html",
      },
    ],
  },
  {
    id: "potato",
    label: "Посадка картофеля",
    heroText: "Техника для посадки картофеля",
    products: [
      {
        id: 113,
        name: "Картофелесажалка AVR CR450M",
        excerpt: "AVR CR450M — новая четырёхрядная картофелесажалка с механическим приводом от опорных колёс. Выпускается в модификациях 4×75 и 4×90. Бункер вмещает до 3000–3500 кг картофеля.",
        img: "https://kolnag.ru/wp-content/uploads/2023/05/Kartofelesazhalka-AVR-CR450M-2-1-1.jpg",
        link: "https://kolnag.ru/kartofelesazhalka-avr-cr450m.html",
      },
      {
        id: 5056,
        name: "Многофункциональный комплекс на базе картофелесажалки AVR CR450M",
        excerpt: "Многофункциональный комплекс на базе картофелесажалки AVR CR450M может быть оснащён комплектом опций для одновременной с посадкой картофеля нарезки борозд, внесения удобрений и препаратов химической защиты растений.",
        img: "https://kolnag.ru/wp-content/uploads/2023/05/Kartofelesazhalka-AVR-CR450M-kompleks-750x430-1.jpg",
        link: "https://kolnag.ru/mnogofunktsionalnyj-kompleks-avr-cr450m.html",
      },
    ],
  },
  {
    id: "harvest",
    label: "Уборка урожая",
    heroText: "Техника для уборки урожая",
    products: [
      {
        id: 10448,
        name: "Картофелеуборочный комбайн AVR Spirit 7200",
        excerpt: "Двухрядный картофелеуборочный комбайн AVR Spirit 7200 с боковым подкопом и бункером на 7 тонн. Следующая ступень в развитии комбайнов семейства Spirit с увеличенной площадью просеивания и онлайн-мониторингом.",
        img: "https://kolnag.ru/wp-content/uploads/2023/06/7200-2-1.jpg",
        link: "https://kolnag.ru/kartofeleuborochnyj-kombajn-avr-spirit-7200.html",
      },
      {
        id: 156,
        name: "Ботводробитель AVR Rafale",
        excerpt: "Ботводробитель AVR Rafale 4×75 / AVR Rafale 4×90. Некоторые модели картофелеуборочных комбайнов чувствительны к наличию ботвы во время уборки картофеля. Механический способ удаления ботвы наиболее надёжен.",
        img: "https://kolnag.ru/wp-content/uploads/2017/09/Botvodrobitel-AVR-Rafale-1-1-1.jpg",
        link: "https://kolnag.ru/botvodrobitel-avr-rafale.html",
      },
    ],
  },
  {
    id: "storage",
    label: "Закладка на хранение",
    heroText: "Техника для закладки на хранение",
    products: [
      {
        id: 184,
        name: "Бункер приёмный AVR Falcon",
        excerpt: "Приёмные бункеры AVR Falcon предназначены для загрузки картофеля и корнеплодов, очистки от примесей, сортировки, калибровки и дозированной передачи на линию транспортировки продукции.",
        img: "https://kolnag.ru/wp-content/uploads/2017/05/AVR-Falcon-1.jpg",
        link: "https://kolnag.ru/bunker-priemnyj-avr-falcon.html",
      },
      {
        id: 178,
        name: "Конвейер ленточный загрузочный AVR CTK",
        excerpt: "Конвейеры ленточные загрузочные AVR CTK могут использоваться для самых разных транспортировочных целей. Высокая производительность и увеличенная длина делают конвейер одинаково удобным для работы в поле и на складе.",
        img: "https://kolnag.ru/wp-content/uploads/2017/05/AVR-CTK-1.jpg",
        link: "https://kolnag.ru/konvejer-lentochnyj-avr-ctk.html",
      },
    ],
  },
  {
    id: "fodder",
    label: "Заготовка кормов",
    heroText: "Кормозаготовительная техника",
    products: [
      {
        id: 277,
        name: "Измельчитель кормов Teagle Tomahawk 505M",
        excerpt: "Измельчитель кормов Teagle Tomahawk 505M предназначен для измельчения сухих кормов (сено, солома), хранимых в тюках. Может измельчать сено и солому для кормовых смесей, а также выдувать измельчённую массу для создания подстилки.",
        img: "https://kolnag.ru/wp-content/uploads/2017/05/Teagle-Tomahawk-505M-1.jpg",
        link: "https://kolnag.ru/izmelchitel-kormov-teagle-tomahawk-505m.html",
      },
      {
        id: 225,
        name: "Измельчитель кормов TEAGLE Tomahawk 8100",
        excerpt: "Измельчитель кормов Teagle Tomahawk 8100 предназначен для измельчения сена и соломы в рулонах, а также силоса. Подходит для использования в хозяйствах с большим поголовьем скота.",
        img: "https://kolnag.ru/wp-content/uploads/2017/05/Teagle-Tomahawk-8100-1.jpg",
        link: "https://kolnag.ru/izmelchitel-kormov-teagle-tomahawk-8100.html",
      },
    ],
  },
  {
    id: "feeding",
    label: "Приготовление и раздача кормов",
    heroText: "Смесители-кормораздатчики для КРС",
    products: [
      {
        id: 197,
        name: "Смеситель-кормораздатчик Trioliet Solomix 1 10ZK",
        excerpt: "Trioliet Solomix 1 10ZK — смеситель-кормораздатчик, оснащённый одним вертикальным шнеком и смесительной камерой объёмом 10 м³, предназначен для приготовления и раздачи кормовых смесей.",
        img: "https://kolnag.ru/wp-content/uploads/2017/09/Trioliet-Solomix-1-10ZK-1-1.jpg",
        link: "https://kolnag.ru/smesitel-kormorazdatchik-solomix-1-10zk.html",
      },
      {
        id: 200,
        name: "Смеситель-кормораздатчик Trioliet Solomix 2 1200 ZK New Edition",
        excerpt: "Смеситель-кормораздатчик Trioliet Solomix 2 1200 ZK New Edition — с двумя вертикальными шнеками и смесительной камерой объёмом 12 м³. Оснащён системой автоматической дозировки компонентов корма.",
        img: "https://kolnag.ru/wp-content/uploads/2017/09/Trioliet-Solomix-2-1200-ZK-NE-4-2024.jpg",
        link: "https://kolnag.ru/smesitel-kormorazdatchik-trioliet-solomix-2-12zk.html",
      },
      {
        id: 1771,
        name: "Смеситель-кормораздатчик Trioliet Solomix 2 1800 ZK New Edition",
        excerpt: "Trioliet Solomix 2 1800 ZK — смеситель-кормораздатчик с двумя вертикальными шнеками и смесительной камерой объёмом 18 м³, предназначен для хозяйств с большим поголовьем КРС.",
        img: "https://kolnag.ru/wp-content/uploads/2017/09/Trioliet-Solomix-2-1800ZK-1.jpg",
        link: "https://kolnag.ru/smesitel-trioliet-solomix-2-18zk.html",
      },
      {
        id: 209,
        name: "Смеситель-кормораздатчик Trioliet Solomix 2 2400 ZK-T New Edition",
        excerpt: "Смеситель-кормораздатчик Trioliet Solomix 2 2400 ZK-T с двумя вертикальными шнеками и смесительной камерой объёмом 24 м³ предназначен для приготовления и раздачи кормовой смеси в крупных хозяйствах.",
        img: "https://kolnag.ru/wp-content/uploads/2017/09/Trioliet-Solomix-2-2400ZK-T-1.jpg",
        link: "https://kolnag.ru/smesitel-trioliet-solomix-2-24zk-t.html",
      },
      {
        id: 4920,
        name: "Стационарный смеситель-кормораздатчик Trioliet Solomix 12ZK Stat с электроприводом",
        excerpt: "Стационарный смеситель с электроприводом на базе самого популярного смесителя-кормораздатчика Trioliet Solomix 2 12ZK разработан на заводе «КОЛНАГ» специально для российских хозяйств.",
        img: "https://kolnag.ru/wp-content/uploads/2017/09/Trioliet-Solomix-STAT-2.jpg",
        link: "https://kolnag.ru/statsionarnyj-smesitel-kormorazdatchik-trioliet-solomix-12zk-stat-s-elektroprivodom.html",
      },
      {
        id: 312,
        name: "Стационарный смеситель кормов Trioliet Solomix STAT",
        excerpt: "Семейство стационарных смесителей кормов Trioliet Solomix STAT предназначено для хозяйств, где уже организована доставка корма к животным с помощью других технических средств.",
        img: "https://kolnag.ru/wp-content/uploads/2017/09/Trioliet-Solomix-STAT-2.jpg",
        link: "https://kolnag.ru/statsionarnye-smesiteli-kormov.html",
      },
      {
        id: 213,
        name: "Смеситель-кормораздатчик Trioliet Solomix P с выдувателем соломы",
        excerpt: "Многофункциональный смеситель-кормораздатчик Trioliet Solomix P специально предназначен для повышения эффективности содержания крупного рогатого скота. Оснащён выдувателем соломы для создания подстилки.",
        img: "https://kolnag.ru/wp-content/uploads/2017/05/Trioliet-Solomix-P-1.jpg",
        link: "https://kolnag.ru/smesitel-trioliet-solomix-p.html",
      },
      {
        id: 320,
        name: "Автоматический самоходный робот кормления Triomatic",
        excerpt: "Автоматическая система для раздачи корма Triomatic предназначена для автоматической подготовки корма и его раздачи. Полностью автономная работа без участия оператора.",
        img: "https://kolnag.ru/wp-content/uploads/2017/05/Triomatic-1.jpg",
        link: "https://kolnag.ru/avtomaticheskij-samohodnyj-robot-kormleniya.html",
      },
      {
        id: 322,
        name: "Система управления кормами TFM Tracker",
        excerpt: "TFM Tracker — интеллектуальная система управления и распределением корма, которая предоставляет животноводческим хозяйствам полное решение для контроля и оптимизации кормления.",
        img: "https://kolnag.ru/wp-content/uploads/2017/05/TFM-Tracker-1-1.jpg",
        link: "https://kolnag.ru/sistema-upravleniya-kormami-tfm-tracker.html",
      },
      {
        id: 12207,
        name: "Смеситель-кормораздатчик Trioliet Solomix 2 1200 VLL-B New Edition",
        excerpt: "Смеситель-кормораздатчик Trioliet Solomix 2 1200 VLL-B оснащён двумя усиленными (толщиной 22/25 мм) вертикальными шнеками, смесительной камерой объёмом 12 м³, одним выгрузным окном с гидроприводом.",
        img: "https://kolnag.ru/wp-content/uploads/2024/11/Kolnag-dlya-spiska-oborudovaniya-1200-VLL-B.jpg",
        link: "https://kolnag.ru/smesitel-kormorazdatchik-trioliet-solomix-2-12vll-b.html",
      },
      {
        id: 12158,
        name: "Смеситель-кормораздатчик Trioliet Solomix 2 1200 VLL-S New Edition",
        excerpt: "Смеситель-кормораздатчик Solomix 2 1200 VLL-S оснащён двумя усиленными вертикальными шнеками. Модель с боковой выгрузкой, идеально подходит для ферм с ограниченным пространством кормовых проходов.",
        img: "https://kolnag.ru/wp-content/uploads/2024/11/Kolnag-dlya-spiska-oborudovaniya-1200-VLl-S.jpg",
        link: "https://kolnag.ru/smesitel-kormorazdatchik-trioliet-solomix-2-12vll-s.html",
      },
    ],
  },
];

const aboutPoints = [
  "Один из крупнейших производителей овощей Иркутской области: картофель, морковь, лук, свёкла, редька, капуста. Наши объёмы производства таковы, что работаем по Восточной Сибири и Дальнему Востоку, и даже на экспорт в Монголию.",
  "ИП «Кичигин Л.П.» — стремительно развивающееся хозяйство, активно внедряющее агротехнологии в свою работу, и это во многом благодаря использованию техники «Колнаг».",
  "Наше предприятие — это не тот партнёр, который всеми правдами и неправдами будет «втюхивать» позиции по каталогу. Напротив, на нашем примере, воочию, можно убедиться в возможностях той техники, которую вы планируете купить.",
  "На базе предприятия ИП «Кичигин Л.П.» работает инженерная служба по вводу в эксплуатацию и обслуживанию техники «Колнаг».",
];

const Index = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [techDropdown, setTechDropdown] = useState(false);
  const [mobileTechOpen, setMobileTechOpen] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState("soil");
  const [activeProductIdx, setActiveProductIdx] = useState(0);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setTechDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    setTechDropdown(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const selectCategory = (id: string) => {
    setActiveCategoryId(id);
    setActiveProductIdx(0);
    setTechDropdown(false);
    setMobileOpen(false);
    setMobileTechOpen(false);
    setTimeout(() => {
      const el = document.getElementById("catalog");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const currentCat = techCategories.find((c) => c.id === activeCategoryId)!;
  const currentProduct = currentCat.products[activeProductIdx];

  return (
    <div className="font-sans bg-white text-gray-800">

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-kolnag-dark shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-kolnag-green rounded flex items-center justify-center">
              <span className="text-white font-black text-lg leading-none">К</span>
            </div>
            <div>
              <div className="text-white font-bold text-base leading-tight font-montserrat">КОЛНАГ</div>
              <div className="text-gray-400 text-xs leading-tight">официальный дистрибьютер</div>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollTo("home")} className="text-gray-300 hover:text-kolnag-green transition-colors text-sm font-medium font-montserrat">
              Главная
            </button>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setTechDropdown(!techDropdown)}
                className="flex items-center gap-1 text-gray-300 hover:text-kolnag-green transition-colors text-sm font-medium font-montserrat"
              >
                Техника
                <Icon name="ChevronDown" size={14} className={`transition-transform duration-200 ${techDropdown ? "rotate-180" : ""}`} />
              </button>
              {techDropdown && (
                <div className="absolute top-full left-0 mt-2 bg-white shadow-xl rounded border border-gray-100 min-w-[280px] z-50 py-1">
                  {techCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => selectCategory(cat.id)}
                      className={`w-full text-left px-5 py-2.5 text-sm hover:bg-gray-50 transition-colors ${activeCategoryId === cat.id ? "text-kolnag-green font-semibold bg-gray-50" : "text-gray-700 hover:text-kolnag-green"}`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => scrollTo("advantages")} className="text-gray-300 hover:text-kolnag-green transition-colors text-sm font-medium font-montserrat">
              О нас
            </button>
            <button onClick={() => scrollTo("contacts")} className="text-gray-300 hover:text-kolnag-green transition-colors text-sm font-medium font-montserrat">
              Контакты
            </button>
          </nav>

          <a href="tel:+79950446117" className="hidden md:flex items-center gap-2 bg-kolnag-green text-white px-4 py-2 rounded font-semibold text-sm hover:bg-kolnag-greenDark transition-colors">
            <Icon name="Phone" size={14} />
            +7 (995) 044-61-17
          </a>

          <button className="md:hidden text-white p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            <Icon name={mobileOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-kolnag-dark border-t border-gray-700 px-4 py-4 flex flex-col gap-1">
            <button onClick={() => scrollTo("home")} className="text-gray-300 hover:text-kolnag-green text-left text-sm font-medium py-2.5 border-b border-gray-700">
              Главная
            </button>
            <div>
              <button
                onClick={() => setMobileTechOpen(!mobileTechOpen)}
                className="w-full flex items-center justify-between text-gray-300 hover:text-kolnag-green text-left text-sm font-medium py-2.5 border-b border-gray-700"
              >
                Техника
                <Icon name="ChevronDown" size={14} className={`transition-transform ${mobileTechOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileTechOpen && (
                <div className="pl-4 flex flex-col">
                  {techCategories.map((cat) => (
                    <button key={cat.id} onClick={() => selectCategory(cat.id)} className={`text-left text-sm py-2 border-b border-gray-800 ${activeCategoryId === cat.id ? "text-kolnag-green font-semibold" : "text-gray-400 hover:text-kolnag-green"}`}>
                      {cat.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => scrollTo("advantages")} className="text-gray-300 hover:text-kolnag-green text-left text-sm font-medium py-2.5 border-b border-gray-700">О нас</button>
            <button onClick={() => scrollTo("contacts")} className="text-gray-300 hover:text-kolnag-green text-left text-sm font-medium py-2.5 border-b border-gray-700">Контакты</button>
            <a href="tel:+79950446117" className="flex items-center justify-center gap-2 bg-kolnag-green text-white px-4 py-3 rounded font-semibold text-sm mt-3">
              <Icon name="Phone" size={14} />+7 (995) 044-61-17
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
        style={{ backgroundImage: `url(${HERO_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <div className="inline-block bg-kolnag-green text-white text-xs font-semibold px-3 py-1 rounded mb-6 font-montserrat tracking-wider uppercase">
            Официальный дистрибьютер ООО «Колнаг»
          </div>
          <h1 className="font-montserrat font-black text-4xl md:text-6xl leading-tight mb-6">
            Сельскохозяйственная<br />
            <span className="text-kolnag-green">техника КОЛНАГ</span><br />
            в Иркутской области
          </h1>
          <p className="text-gray-200 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Обработка почвы, посадка, уборка урожая, заготовка кормов.<br />
            Российское производство. Гарантия завода. Поставка по Сибири.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => scrollTo("catalog")} className="bg-kolnag-green hover:bg-kolnag-greenDark text-white font-semibold px-8 py-4 rounded transition-colors text-lg font-montserrat">
              Посмотреть каталог
            </button>
            <a href="tel:+79950446117" className="border-2 border-white text-white hover:bg-white hover:text-kolnag-dark font-semibold px-8 py-4 rounded transition-colors text-lg font-montserrat">
              Позвонить нам
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={32} className="text-white/60" />
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="text-kolnag-green font-semibold text-sm uppercase tracking-wider mb-3 font-montserrat">Наша продукция</div>
            <h2 className="font-montserrat font-black text-3xl md:text-4xl text-kolnag-dark mb-4">Каталог техники</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Полный ассортимент сельскохозяйственной техники ООО «Колнаг»</p>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {techCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategoryId(cat.id); setActiveProductIdx(0); }}
                className={`px-4 py-2 rounded text-sm font-medium font-montserrat transition-colors ${
                  activeCategoryId === cat.id
                    ? "bg-kolnag-green text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-kolnag-green hover:text-kolnag-green"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Category title */}
          <h3 className="font-montserrat font-black text-xl text-kolnag-dark mb-6">{currentCat.heroText}</h3>

          {/* Active product card */}
          <div className="grid md:grid-cols-2 gap-0 bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
            <div className="overflow-hidden bg-gray-100">
              <img
                key={currentProduct.id}
                src={currentProduct.img}
                alt={currentProduct.name}
                className="w-full h-72 md:h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = HERO_IMG; }}
              />
            </div>
            <div className="p-8 flex flex-col justify-between">
              <div>
                <div className="inline-block bg-kolnag-green/10 text-kolnag-green text-xs font-semibold px-2 py-1 rounded mb-3 font-montserrat">
                  {currentCat.label}
                </div>
                <h3 className="font-montserrat font-black text-xl md:text-2xl text-kolnag-dark mb-4 leading-tight">
                  {currentProduct.name}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm mb-6">{currentProduct.excerpt}</p>
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href="tel:+79950446117"
                  className="inline-flex items-center justify-center gap-2 bg-kolnag-green text-white font-semibold px-6 py-3 rounded hover:bg-kolnag-greenDark transition-colors font-montserrat"
                >
                  <Icon name="Phone" size={16} />
                  Узнать цену
                </a>
                <button
                  onClick={() => setModalProduct(currentProduct)}
                  className="inline-flex items-center justify-center gap-2 border border-kolnag-green text-kolnag-green font-medium px-6 py-3 rounded hover:bg-kolnag-green hover:text-white transition-colors font-montserrat text-sm"
                >
                  <Icon name="Info" size={14} />
                  Подробнее о товаре
                </button>
                <a
                  href={currentProduct.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-600 font-medium px-6 py-3 rounded hover:border-kolnag-green hover:text-kolnag-green transition-colors font-montserrat text-sm"
                >
                  <Icon name="ExternalLink" size={14} />
                  На сайте kolnag.ru
                </a>
              </div>
            </div>
          </div>

          {/* Products grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {currentCat.products.map((p, idx) => (
              <div
                key={p.id}
                className={`rounded-xl border transition-all ${
                  activeProductIdx === idx
                    ? "border-kolnag-green bg-kolnag-green/5 shadow-sm"
                    : "border-gray-100 bg-white hover:border-kolnag-green/50 hover:shadow-sm"
                }`}
              >
                <button
                  onClick={() => setActiveProductIdx(idx)}
                  className="w-full text-left p-4"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-16 h-12 object-cover rounded shrink-0 bg-gray-100"
                      onError={(e) => { (e.target as HTMLImageElement).src = HERO_IMG; }}
                    />
                    <div className="font-montserrat font-semibold text-sm text-kolnag-dark leading-snug">{p.name}</div>
                  </div>
                </button>
                <div className="px-4 pb-3">
                  <button
                    onClick={() => setModalProduct(p)}
                    className="w-full text-xs text-kolnag-green font-medium font-montserrat border border-kolnag-green/30 rounded py-1.5 hover:bg-kolnag-green hover:text-white transition-colors"
                  >
                    Подробнее
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="advantages" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-montserrat font-black text-3xl md:text-4xl text-kolnag-dark mb-4">ИП «Кичигин Л.П.»</h2>
            <p className="text-gray-500">Дилер ООО «Колнаг» | Мальта</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-100">
            <div className="text-kolnag-dark font-semibold text-base mb-6 font-montserrat">Кто мы?</div>
            <div className="flex flex-col gap-5">
              {aboutPoints.map((point, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-kolnag-green mt-2 shrink-0" />
                  <p className="text-gray-700 leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-10">
              <button
                onClick={() => scrollTo("catalog")}
                className="flex-1 border-2 border-kolnag-green text-kolnag-green font-semibold px-6 py-3 rounded hover:bg-kolnag-green hover:text-white transition-colors font-montserrat text-center"
              >
                В каталог / на главную
              </button>
              <a
                href="tel:+79950446117"
                className="flex-1 bg-kolnag-green text-white font-semibold px-6 py-3 rounded hover:bg-kolnag-greenDark transition-colors font-montserrat text-center"
              >
                Позвонить
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT MODAL */}
      {modalProduct && (
        <div
          className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4"
          onClick={() => setModalProduct(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={modalProduct.img}
                alt={modalProduct.name}
                className="w-full h-64 object-cover rounded-t-2xl bg-gray-100"
                onError={(e) => { (e.target as HTMLImageElement).src = HERO_IMG; }}
              />
              <button
                onClick={() => setModalProduct(null)}
                className="absolute top-4 right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
              >
                <Icon name="X" size={18} className="text-gray-700" />
              </button>
            </div>
            <div className="p-8">
              <div className="inline-block bg-kolnag-green/10 text-kolnag-green text-xs font-semibold px-2 py-1 rounded mb-3 font-montserrat">
                {techCategories.find(c => c.products.some(p => p.id === modalProduct.id))?.label}
              </div>
              <h2 className="font-montserrat font-black text-2xl text-kolnag-dark mb-4 leading-tight">
                {modalProduct.name}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">{modalProduct.excerpt}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:+79950446117"
                  className="flex-1 flex items-center justify-center gap-2 bg-kolnag-green text-white font-semibold px-6 py-3 rounded hover:bg-kolnag-greenDark transition-colors font-montserrat"
                >
                  <Icon name="Phone" size={16} />
                  Узнать цену
                </a>
                <a
                  href={modalProduct.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 border border-gray-200 text-gray-600 font-medium px-6 py-3 rounded hover:border-kolnag-green hover:text-kolnag-green transition-colors font-montserrat text-sm"
                >
                  <Icon name="ExternalLink" size={14} />
                  Подробнее на kolnag.ru
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONTACTS */}
      <section id="contacts" className="py-20 bg-kolnag-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="text-kolnag-green font-semibold text-sm uppercase tracking-wider mb-3 font-montserrat">Свяжитесь с нами</div>
            <h2 className="font-montserrat font-black text-3xl md:text-4xl text-white mb-4">Контакты</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">ИП ГКФХ Кичигин Л.П. — официальный дистрибьютер ООО «Колнаг» в Иркутской области</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="flex flex-col gap-5">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-kolnag-green rounded-lg flex items-center justify-center shrink-0">
                  <Icon name="Phone" size={22} className="text-white" />
                </div>
                <div>
                  <div className="text-gray-400 text-sm mb-1">Телефон для звонков</div>
                  <a href="tel:+79950446117" className="text-white text-xl font-bold font-montserrat hover:text-kolnag-green transition-colors">
                    +7 (995) 044-61-17
                  </a>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-kolnag-green rounded-lg flex items-center justify-center shrink-0">
                  <Icon name="Mail" size={22} className="text-white" />
                </div>
                <div>
                  <div className="text-gray-400 text-sm mb-1">Электронная почта</div>
                  <a href="mailto:maltaovoshi@gmail.com" className="text-white text-lg font-semibold font-montserrat hover:text-kolnag-green transition-colors">
                    maltaovoshi@gmail.com
                  </a>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-kolnag-green rounded-lg flex items-center justify-center shrink-0">
                  <Icon name="MapPin" size={22} className="text-white" />
                </div>
                <div>
                  <div className="text-gray-400 text-sm mb-1">Адрес</div>
                  <div className="text-white font-semibold font-montserrat leading-snug">
                    Иркутская область,<br />
                    Усольский район,<br />
                    с. Мальта, ул. Новая, 3
                  </div>
                </div>
              </div>
              <a
                href="tel:+79950446117"
                className="mt-2 flex items-center justify-center gap-3 bg-kolnag-green hover:bg-kolnag-greenDark text-white font-bold px-8 py-4 rounded-xl transition-colors font-montserrat text-lg"
              >
                <Icon name="Phone" size={20} />
                Позвонить сейчас
              </a>
            </div>
            <div className="rounded-xl overflow-hidden border border-white/10 min-h-[400px]">
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=103.276000%2C52.989000&z=14&pt=103.276000%2C52.989000~Иркутская+область%2C+Усольский+район%2C+с.+Мальта%2C+ул.+Новая+3&text=с.+Мальта+ул.+Новая+3"
                width="100%"
                height="100%"
                style={{ minHeight: "400px", border: "none" }}
                allowFullScreen
                title="Карта — с. Мальта, ул. Новая, 3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-kolnag-green rounded flex items-center justify-center">
              <span className="text-white font-black text-sm">К</span>
            </div>
            <div>
              <div className="text-white font-bold text-sm font-montserrat">ИП ГКФХ Кичигин Л.П.</div>
              <div className="text-gray-500 text-xs">Официальный дистрибьютер ООО «Колнаг»</div>
            </div>
          </div>
          <div className="text-gray-500 text-sm text-center">Иркутская область, Усольский район, с. Мальта, ул. Новая, 3</div>
          <div className="text-gray-600 text-xs">© 2024 ИП ГКФХ Кичигин Л.П.</div>
        </div>
      </footer>
    </div>
  );
};

export default Index;