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
        id: 101,
        name: "Картофелесажалка AVR Puma 3-рядная",
        excerpt: "Трёхрядная картофелесажалка AVR Puma обеспечивает точную посадку картофеля с регулируемым расстоянием между клубнями. Оснащена системой электронного контроля высева.",
        img: "https://kolnag.ru/wp-content/uploads/2017/05/AVR-Puma-1.jpg",
        link: "https://kolnag.ru/kartofelesazhalka-avr-puma.html",
      },
      {
        id: 102,
        name: "Картофелесажалка AVR Puma 4-рядная",
        excerpt: "Четырёхрядная картофелесажалка AVR Puma для высокопроизводительной посадки картофеля. Ширина захвата 3,0 м, производительность до 4 га/ч.",
        img: "https://kolnag.ru/wp-content/uploads/2017/05/AVR-Puma-4-1.jpg",
        link: "https://kolnag.ru/kartofelesazhalka-avr-puma-4.html",
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
        img: "https://kolnag.ru/wp-content/uploads/2017/05/AVR-Rafale-1.jpg",
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
        name: "Бункер приемный AVR Falcon",
        excerpt: "Приемные бункеры AVR Falcon предназначены для загрузки картофеля и корнеплодов, очистки от примесей, сортировки, калибровки и дозированной передачи на линию транспортировки продукции.",
        img: "https://kolnag.ru/wp-content/uploads/2017/05/AVR-Falcon-1.jpg",
        link: "https://kolnag.ru/bunker-priemnyj-avr-falcon.html",
      },
      {
        id: 178,
        name: "Конвейер ленточный загрузочный AVR CTK",
        excerpt: "Конвейеры ленточные загрузочные AVR CTK могут использоваться для самых разных транспортировочных целей. Высокая производительность и увеличенная длина делают этот конвейер одинаково удобным для работы в поле и на складе.",
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
        excerpt: "Измельчитель кормов Teagle Tomahawk 505M предназначен для измельчения сухих кормов (сено, солома), хранимых в тюках. Может измельчать сено и солому для кормовых смесей, а также выдувать измельченную массу для создания подстилки.",
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
    heroText: "Оборудование для приготовления и раздачи кормов",
    products: [
      {
        id: 12207,
        name: "Смеситель-кормораздатчик Trioliet Solomix 2 1200 VLL-B New Edition",
        excerpt: "Смеситель-кормораздатчик Trioliet Solomix 2 1200 VLL-B оснащен двумя усиленными (толщиной 22/25мм) вертикальными шнеками, смесительной камерой объемом 12 м³, одним выгрузным окном с гидроприводом.",
        img: "https://kolnag.ru/wp-content/uploads/2024/11/Kolnag-dlya-spiska-oborudovaniya-1200-VLL-B.jpg",
        link: "https://kolnag.ru/smesitel-kormorazdatchik-trioliet-solomix-2-12vll-b.html",
      },
      {
        id: 12158,
        name: "Смеситель-кормораздатчик Trioliet Solomix 2 1200 VLL-S New Edition",
        excerpt: "Смеситель-кормораздатчик Solomix 2 1200 VLL-S оснащен двумя усиленными вертикальными шнеками. Модель с боковой выгрузкой, идеально подходит для ферм с ограниченным пространством кормовых проходов.",
        img: "https://kolnag.ru/wp-content/uploads/2024/11/Kolnag-dlya-spiska-oborudovaniya-1200-VLL-S.jpg",
        link: "https://kolnag.ru/smesitel-kormorazdatchik-trioliet-solomix-2-12vll-s.html",
      },
    ],
  },
];

const advantages = [
  { icon: "Factory", title: "Собственное производство", text: "Вся техника производится на заводе ООО «Колнаг» в России с использованием качественных комплектующих." },
  { icon: "Wrench", title: "Гарантия и сервис", text: "Гарантийное и постгарантийное обслуживание. Наличие запасных частей на складе." },
  { icon: "TrendingUp", title: "Надёжность", text: "Техника прошла испытания в различных климатических зонах России, включая Сибирь и Дальний Восток." },
  { icon: "Handshake", title: "Официальный дистрибьютер", text: "ИП ГКФХ Кичигин Л.П. — официальный дистрибьютер ООО «Колнаг» в Иркутской области." },
  { icon: "PackageCheck", title: "Наличие техники", text: "Широкий ассортимент техники в наличии. Возможна поставка под заказ в короткие сроки." },
  { icon: "CreditCard", title: "Лизинг и рассрочка", text: "Возможность приобретения техники в лизинг через ведущие лизинговые компании России." },
];

const Index = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [techDropdown, setTechDropdown] = useState(false);
  const [mobileTechOpen, setMobileTechOpen] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState("soil");
  const [activeProductIdx, setActiveProductIdx] = useState(0);
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
    const el = document.getElementById("catalog");
    if (el) el.scrollIntoView({ behavior: "smooth" });
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
                <div className="absolute top-full left-0 mt-2 bg-white shadow-xl rounded border border-gray-100 min-w-[260px] z-50 py-1">
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
              Преимущества
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
            <button onClick={() => scrollTo("advantages")} className="text-gray-300 hover:text-kolnag-green text-left text-sm font-medium py-2.5 border-b border-gray-700">Преимущества</button>
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
                <a
                  href={currentProduct.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-600 font-medium px-6 py-3 rounded hover:border-kolnag-green hover:text-kolnag-green transition-colors font-montserrat text-sm"
                >
                  <Icon name="ExternalLink" size={14} />
                  Подробнее на kolnag.ru
                </a>
              </div>
            </div>
          </div>

          {/* Products grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentCat.products.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setActiveProductIdx(idx)}
                className={`text-left rounded-xl border p-4 transition-all ${
                  activeProductIdx === idx
                    ? "border-kolnag-green bg-kolnag-green/5 shadow-sm"
                    : "border-gray-100 bg-white hover:border-kolnag-green/50 hover:shadow-sm"
                }`}
              >
                <div className="flex items-start gap-3">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-16 h-12 object-cover rounded shrink-0"
                    onError={(e) => { (e.target as HTMLImageElement).src = HERO_IMG; }}
                  />
                  <div className="font-montserrat font-semibold text-sm text-kolnag-dark leading-snug">{p.name}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section id="advantages" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="text-kolnag-green font-semibold text-sm uppercase tracking-wider mb-3 font-montserrat">Почему мы</div>
            <h2 className="font-montserrat font-black text-3xl md:text-4xl text-kolnag-dark mb-4">Наши преимущества</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Мы предлагаем только качественную технику с полным сервисным сопровождением</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((adv) => (
              <div key={adv.title} className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:border-kolnag-green/30 hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-kolnag-green/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-kolnag-green/20 transition-colors">
                  <Icon name={adv.icon} size={24} className="text-kolnag-green" />
                </div>
                <h3 className="font-montserrat font-bold text-lg text-kolnag-dark mb-2">{adv.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{adv.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
