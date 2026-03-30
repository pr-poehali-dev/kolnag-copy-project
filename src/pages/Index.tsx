import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/b8f51606-6353-4880-b932-e8c85184bdfa/files/38c957c6-4aee-4fee-8725-df2a7c22f78d.jpg";
const SPRAYER_IMG = "https://cdn.poehali.dev/projects/b8f51606-6353-4880-b932-e8c85184bdfa/files/164a553f-5200-4f8a-9214-8278857646bd.jpg";
const SEEDER_IMG = "https://cdn.poehali.dev/projects/b8f51606-6353-4880-b932-e8c85184bdfa/files/94ca4794-a52c-400c-974c-be6a2cf12f71.jpg";
const HARROW_IMG = "https://cdn.poehali.dev/projects/b8f51606-6353-4880-b932-e8c85184bdfa/files/577cd196-ac6d-4603-a56c-927a4674e563.jpg";

const techCategories = [
  {
    id: "soil",
    label: "Обработка почвы",
    description: "Предпосевная и междурядная обработка почвы: дисковые бороны, культиваторы, фрезы.",
    img: HARROW_IMG,
    models: [
      { name: "БДМ-4×4П", desc: "Борона дисковая, ширина захвата 4 м" },
      { name: "БДМ-6×4П", desc: "Борона дисковая, ширина захвата 6 м" },
      { name: "КФО-5,6", desc: "Культиватор фрезерный овощной" },
      { name: "КФО-7,2", desc: "Культиватор фрезерный, ширина захвата 7,2 м" },
    ],
  },
  {
    id: "potato",
    label: "Посадка картофеля",
    description: "Картофелесажалки для посадки картофеля с шириной захвата до 4,2 м.",
    img: SEEDER_IMG,
    models: [
      { name: "КСМ-4", desc: "Картофелесажалка, 4 ряда" },
      { name: "КСМ-6", desc: "Картофелесажалка, 6 рядов" },
      { name: "КСМ-4СТ", desc: "Картофелесажалка с транспортёром" },
      { name: "КСМ-6СТ", desc: "Картофелесажалка 6-рядная с транспортёром" },
    ],
  },
  {
    id: "harvest",
    label: "Уборка урожая",
    description: "Картофелеуборочные комбайны и копатели для эффективной уборки урожая.",
    img: HARROW_IMG,
    models: [
      { name: "ККУ-2А", desc: "Комбайн картофелеуборочный, 2-рядный" },
      { name: "ККМ-2", desc: "Комбайн картофелеуборочный малогабаритный" },
      { name: "КВ-4", desc: "Копатель-валкоукладчик, 4-рядный" },
      { name: "КВ-2", desc: "Копатель-валкоукладчик, 2-рядный" },
    ],
  },
  {
    id: "storage",
    label: "Закладка на хранение",
    description: "Оборудование для транспортировки и закладки корнеплодов в хранилища.",
    img: SPRAYER_IMG,
    models: [
      { name: "ТЗК-30", desc: "Транспортёр загрузочный картофеля" },
      { name: "ТЗК-50", desc: "Транспортёр загрузочный, длина 50 м" },
      { name: "ТЗП-25", desc: "Транспортёр загрузочно-передвижной" },
      { name: "КПС-15", desc: "Конвейер передвижной складской" },
    ],
  },
  {
    id: "fodder",
    label: "Заготовка кормов",
    description: "Косилки, грабли, пресс-подборщики для заготовки сена и силоса.",
    img: SEEDER_IMG,
    models: [
      { name: "КДН-210", desc: "Косилка дисковая навесная, 2,1 м" },
      { name: "КДН-310", desc: "Косилка дисковая навесная, 3,1 м" },
      { name: "ГВР-6", desc: "Грабли-ворошилки ротационные, 6 м" },
      { name: "ПР-120", desc: "Пресс-подборщик рулонный" },
    ],
  },
  {
    id: "feeding",
    label: "Приготовление и раздача кормов",
    description: "Кормосмесители и раздатчики кормов для животноводческих ферм.",
    img: HARROW_IMG,
    models: [
      { name: "КС-1500", desc: "Кормосмеситель вертикальный, 15 м³" },
      { name: "КС-2200", desc: "Кормосмеситель прицепной, 22 м³" },
      { name: "РКС-12", desc: "Раздатчик кормов смеситель, 12 м³" },
      { name: "РКС-20", desc: "Раздатчик кормосмеситель, 20 м³" },
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
  const [activeCategory, setActiveCategory] = useState("soil");
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

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    setTechDropdown(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const selectCategory = (id: string) => {
    setActiveCategory(id);
    setTechDropdown(false);
    setMobileOpen(false);
    setMobileTechOpen(false);
    const el = document.getElementById("catalog");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const current = techCategories.find((c) => c.id === activeCategory)!;

  return (
    <div className="font-sans bg-white text-gray-800">

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-kolnag-dark shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">

          {/* Logo */}
          <button onClick={() => scrollTo("#home")} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-kolnag-green rounded flex items-center justify-center">
              <span className="text-white font-black text-lg leading-none">К</span>
            </div>
            <div>
              <div className="text-white font-bold text-base leading-tight font-montserrat">КОЛНАГ</div>
              <div className="text-gray-400 text-xs leading-tight">официальный дистрибьютер</div>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollTo("#home")} className="text-gray-300 hover:text-kolnag-green transition-colors text-sm font-medium font-montserrat">
              Главная
            </button>

            {/* Техника dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setTechDropdown(!techDropdown)}
                className="flex items-center gap-1 text-gray-300 hover:text-kolnag-green transition-colors text-sm font-medium font-montserrat"
              >
                Техника
                <Icon name="ChevronDown" size={14} className={`transition-transform ${techDropdown ? "rotate-180" : ""}`} />
              </button>

              {techDropdown && (
                <div className="absolute top-full left-0 mt-2 bg-white shadow-xl rounded border border-gray-100 min-w-[240px] z-50 py-1">
                  {techCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => selectCategory(cat.id)}
                      className={`w-full text-left px-5 py-2.5 text-sm hover:bg-gray-50 hover:text-kolnag-green transition-colors ${activeCategory === cat.id ? "text-kolnag-green font-semibold" : "text-gray-700"}`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={() => scrollTo("#advantages")} className="text-gray-300 hover:text-kolnag-green transition-colors text-sm font-medium font-montserrat">
              Преимущества
            </button>
            <button onClick={() => scrollTo("#contacts")} className="text-gray-300 hover:text-kolnag-green transition-colors text-sm font-medium font-montserrat">
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

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-kolnag-dark border-t border-gray-700 px-4 py-4 flex flex-col gap-1">
            <button onClick={() => scrollTo("#home")} className="text-gray-300 hover:text-kolnag-green text-left text-sm font-medium py-2.5 border-b border-gray-700">
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
                <div className="pl-4 flex flex-col gap-0">
                  {techCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => selectCategory(cat.id)}
                      className={`text-left text-sm py-2 border-b border-gray-800 ${activeCategory === cat.id ? "text-kolnag-green font-semibold" : "text-gray-400 hover:text-kolnag-green"}`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={() => scrollTo("#advantages")} className="text-gray-300 hover:text-kolnag-green text-left text-sm font-medium py-2.5 border-b border-gray-700">
              Преимущества
            </button>
            <button onClick={() => scrollTo("#contacts")} className="text-gray-300 hover:text-kolnag-green text-left text-sm font-medium py-2.5 border-b border-gray-700">
              Контакты
            </button>

            <a href="tel:+79950446117" className="flex items-center justify-center gap-2 bg-kolnag-green text-white px-4 py-3 rounded font-semibold text-sm mt-3">
              <Icon name="Phone" size={14} />
              +7 (995) 044-61-17
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
            <button onClick={() => scrollTo("#catalog")} className="bg-kolnag-green hover:bg-kolnag-greenDark text-white font-semibold px-8 py-4 rounded transition-colors text-lg font-montserrat">
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
            <p className="text-gray-500 max-w-2xl mx-auto">
              Полный ассортимент сельскохозяйственной техники ООО «Колнаг»
            </p>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {techCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded text-sm font-medium font-montserrat transition-colors ${
                  activeCategory === cat.id
                    ? "bg-kolnag-green text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-kolnag-green hover:text-kolnag-green"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Active category content */}
          <div className="grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-hidden">
              <img src={current.img} alt={current.label} className="w-full h-72 md:h-full object-cover" />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <h3 className="font-montserrat font-black text-2xl md:text-3xl text-kolnag-dark mb-3">{current.label}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{current.description}</p>

              <div className="mb-6">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 font-montserrat">Модели:</div>
                <div className="flex flex-col gap-2">
                  {current.models.map((model) => (
                    <div key={model.name} className="flex items-start gap-3 bg-gray-50 rounded-lg px-4 py-2.5 border border-gray-100">
                      <span className="text-kolnag-green font-bold font-montserrat text-sm min-w-[90px]">{model.name}</span>
                      <span className="text-gray-500 text-sm">{model.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="tel:+79950446117"
                className="inline-flex items-center gap-2 bg-kolnag-green text-white font-semibold px-6 py-3 rounded hover:bg-kolnag-greenDark transition-colors font-montserrat w-fit"
              >
                <Icon name="Phone" size={16} />
                Узнать цену
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section id="advantages" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="text-kolnag-green font-semibold text-sm uppercase tracking-wider mb-3 font-montserrat">Почему мы</div>
            <h2 className="font-montserrat font-black text-3xl md:text-4xl text-kolnag-dark mb-4">Наши преимущества</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Мы предлагаем только качественную технику с полным сервисным сопровождением
            </p>
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
            <p className="text-gray-400 max-w-2xl mx-auto">
              ИП ГКФХ Кичигин Л.П. — официальный дистрибьютер ООО «Колнаг» в Иркутской области
            </p>
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

            {/* Yandex Map */}
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
          <div className="text-gray-500 text-sm text-center">
            Иркутская область, Усольский район, с. Мальта, ул. Новая, 3
          </div>
          <div className="text-gray-600 text-xs">
            © 2024 ИП ГКФХ Кичигин Л.П.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
