import { useEffect, useRef, useState } from "react";
import "./CardsCarousel.css";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";
import { Link } from "react-router-dom";
import { Card, Rate, Button } from "antd";


const { Meta } = Card;

const Description = ({ item }) => (
  <div>
    <h3>{item.title}</h3>
    <p>{item.description}</p>
  </div>
);
const calculateTimeUntil = (timeClosest) => {
  const now = Date.now();
  const diff = timeClosest - now;
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return hours > 0 ? `${hours}ч ${remainingMinutes}м` : `${remainingMinutes}м`;
};

const CardsCarousel = ({items, regime}) => {
  // Мы используем хук useRef, чтобы получить ссылку на контейнер слайдера
  const sliderRef = useRef(null);
  const scrollAmount = 200; // The amount to scroll when clicking the navigation buttons
  const [openHisotry, setOpenHistory] = useState(false); // Состояние для хранине статуса модального окна
  const [contents, setContents] = useState([
    {
      image: "barber_interview.jpg",
      title: "Про мастера",
    },
    {
      image: "master_interview1.jpg",
      title: "Марина",
    },
    {
      image: "colorful_hairstyle2.jpg",
      title: "Ксения М.",
    },
  ]);
  const [services, setServices] = useState([
    {
      image: process.env.PUBLIC_URL + "/assets/barber_interview.jpg",
      title: "Барбер, стрижка",
      price: "от 500-1000 руб.",
      rating: "4.5", // TODO: добавить рейтинг на backend
      master: "Марина",
      time_closest: Date.now() + 1000 * 60 * 60, // считать до ближайшего время в компоненте, чтобы было актуально
      time_closest_str: "1 час",
      categories: ["мужской", "стрижка", "бритье", "парикмахерские"],
    },
    {
      image: "https://sun9-26.userapi.com/impg/bF5iPU1JbjLuZvBb3i3gqi0VJ-GWgqzlU-lcHA/81dpG7jinog.jpg?size=1280x1280&quality=95&sign=65b71b73303e59d39c9638fa7e57e919&type=album",
      title: "Педикюр с покрытием",
      price: "от 1200 руб.",
      rating: "4.8", // TODO: добавить рейтинг на backend
      master: "Ирина",
      time_closest: Date.now() + 1000 * 60 * 120,
      time_closest_str: "2 часа",
      categories: ["ногти", "педикюр", "женский"],
    },
    {
      image: "hair_coloring.jpg",
      title: "Окрашивание волос",
      price: "от 2500 руб.",
      rating: "4.9", // TODO: добавить рейтинг на backend
      master: "Светлана",
      time_closest: Date.now() + 1000 * 60 * 150,
      time_closest_str: "2.5 часа",
      categories: ["волосы", "окрашивание", "женский"],
    },
    {
      image: "https://sun9-26.userapi.com/impg/bF5iPU1JbjLuZvBb3i3gqi0VJ-GWgqzlU-lcHA/81dpG7jinog.jpg?size=1280x1280&quality=95&sign=65b71b73303e59d39c9638fa7e57e919&type=album",
      title: "Маникюр классический ",
      price: "от 800 руб.",
      rating: "4.7", // TODO: добавить рейтинг на backend
      master: "Елена",
      time_closest: Date.now() + 1000 * 60 * 90,
      time_closest_str: "1.5 часа",
      categories: ["ногти", "маникюр", "женский"],
    },
    {
      image: "facial_cleaning.jpg",
      title: "Чистка лица",
      price: "от 1500 руб.",
      rating: "4.6", // TODO: добавить рейтинг на backend
      master: "Ольга",
      time_closest: Date.now() + 1000 * 60 * 90,
      time_closest_str: "1.5 часа",
      categories: ["кожа", "уход за кожей", "женский"],
    },
    {
      image: "massage.jpg",
      title: "Расслабляющий массаж",
      price: "от 2000 руб.",
      rating: "4.7", // TODO: добавить рейтинг на backend
      master: "Алексей",
      time_closest: Date.now() + 1000 * 60 * 75,
      time_closest_str: "1.25 часа",
      categories: ["массаж", "релакс", "унисекс"],
    },
    {
      image: "lash_extension.jpg",
      title: "Наращивание ресниц",
      price: "от 1800 руб.",
      rating: "4.8", // TODO: добавить рейтинг на backend
      master: "Дарья",
      time_closest: Date.now() + 1000 * 60 * 120,
      time_closest_str: "2 часа",
      categories: ["ресницы", "брови и ресницы", "женский"],
    },
    {
      image: "https://sun9-12.userapi.com/impg/9wPwKncLaRpBIr9HGURx1lrI8ORDbospV0E3ug/vUo_yDdYbRU.jpg?size=1280x1280&quality=95&sign=c7c855c36474669d4eeb61fa87f8f097&type=album",
      title: "Коррекция бровей",
      price: "от 500 руб.",
      rating: "4.5", // TODO: добавить рейтинг на backend
      master: "Анна",
      time_closest: Date.now() + 1000 * 60 * 45,
      time_closest_str: "45 минут",
      categories: ["брови", "брови и ресницы", "женский"],
    },
    {
      image: "keratin_treatment.jpg",
      title: "Кератиновое выпрямление",
      price: "от 3000 руб.",
      rating: "4.9", // TODO: добавить рейтинг на backend
      master: "Наталья",
      time_closest: Date.now() + 1000 * 60 * 180,
      time_closest_str: "3 часа",
      categories: ["волосы", "выпрямление", "женский"],
    },
    {
      image: "sugaring.jpg",
      title: "Шугаринг",
      price: "от 1000 руб.",
      rating: "4.6", // TODO: добавить рейтинг на backend
      master: "Мария",
      time_closest: Date.now() + 1000 * 60 * 60,
      time_closest_str: "1 час",
      categories: ["эпиляция", "шугаринг", "женский"],
    },
    {
      image: "makeup.jpg",
      title: "https://sun9-12.userapi.com/impg/9wPwKncLaRpBIr9HGURx1lrI8ORDbospV0E3ug/vUo_yDdYbRU.jpg?size=1280x1280&quality=95&sign=c7c855c36474669d4eeb61fa87f8f097&type=album",
      price: "от 2000 руб.",
      rating: "4.8", // TODO: добавить рейтинг на backend
      master: "Екатерина",
      time_closest: Date.now() + 1000 * 60 * 90,
      time_closest_str: "1.5 часа",
      categories: ["макияж", "вечерний", "женский"],
    },
    {
      image: "tattoo.jpg",
      title: "Татуировка",
      price: "от 5000 руб.",
      rating: "4.9", // TODO: добавить рейтинг на backend
      master: "Иван",
      time_closest: Date.now() + 1000 * 60 * 240,
      time_closest_str: "4 часа",
      categories: ["татуировки", "арт", "унисекс"],
    },
    {
      image: "piercing.jpg",
      title: "Пирсинг",
      price: "от 1500 руб.",
      rating: "4.7", // TODO: добавить рейтинг на backend
      master: "Юлия",
      time_closest: Date.now() + 1000 * 60 * 30,
      time_closest_str: "30 минут",
      categories: ["пирсинг", "арт", "унисекс"],
    },
    {
      image: "spa_treatment.jpg",
      title: "SPA-процедуры",
      price: "от 2500 руб.",
      rating: "4.8", // TODO: добавить рейтинг на backend
      master: "Виктория",
      time_closest: Date.now() + 1000 * 60 * 150,
      time_closest_str: "2.5 часа",
      categories: ["релакс", "спа", "унисекс"],
    },
    {
      image: "bio_epilation.jpg",
      title: "Биоэпиляция",
      price: "от 1200 руб.",
      rating: "4.6", // TODO: добавить рейтинг на backend
      master: "Оксана",
      time_closest: Date.now() + 1000 * 60 * 60,
      time_closest_str: "1 час",
      categories: ["эпиляция", "биоэпиляция", "женский"],
    }
  ]);
  const [updatedServices, setUpdatedServices] = useState([]);

  useEffect(() => {
    console.log('Time until:');
    const updated = services.map(service => ({
      ...service,
      time_until: calculateTimeUntil(service.time_closest),
    }));
    setUpdatedServices(updated);
  }, []);
  
  useEffect(() => {
    console.log(items?.items?.contents);
    if (items?.items?.contents) setContents(items.items.contents);

  }, [items]);

  useEffect(() => {
    console.log('regime', regime);
  })
  const handleStory = () => {
    console.log("story");
    setOpenHistory(!openHisotry);
  };

  // TODO: опредлелнно стоит прокинут картинки в пропсы,
  // а также метод отображения товарный или в формате сторис
  // мб можно определить эти компоненты отдельно но посмотрим
  return (
    <div className="Carousel">
      <Modal open={openHisotry} onOk={handleStory} onCancel={handleStory}>
        <h3>История мастеров</h3>
        <iframe
          src="https://www.youtube.com/embed/Inc_m5aA6ik?si=c05pHQQ3ETt-fZc_"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </Modal>
      {/* Left navigation button */}
      <div className="nav-btn-container">
        <button
          className="nav-btn"
          onClick={() => {
            const container = sliderRef.current;
            container.scrollLeft -= scrollAmount; // Scroll left by the specified amount
          }}
        >
          <LeftOutlined />
        </button>
      </div>
      {/* Image container */}
      {regime == "story" ? (
        <div className="images-container" ref={sliderRef}>
          {contents &&
            contents.map((content) => (
              <section
                className="story_section image-fluid"
                style={{
                  backgroundImage: `url(${process.env.PUBLIC_URL}/assets/${content.image})`,
                }}
                onClick={handleStory}
              >
                <Link onClick={handleStory} className="story image-fluid">
                  <h3 className="image-title">{content.title}</h3>
                </Link>
              </section>
            ))}
        </div>
      ) : (
        <div className="images-container" ref={sliderRef}>
          {updatedServices &&
            updatedServices.map((service) => (
              <Card
                key={service.title}
                className="card-fluid"
                bordered={false}
                hoverable
                // loading={true}
                style={{ width: 240 }}
                cover={
                  <img
                    alt="example"
                    src={service.image}
                  />
                }
              >
              <Meta
              style={{ textAlign: "center", marginTop: "10px", padding: '0 10px' }}
              title={service.title}
              
            />
              </Card>
            ))}
        </div>
      )}

      {/* Right navigation button */}
      <div
        className="nav-btn-container"
        onClick={() => {
          const container = sliderRef.current;
          container.scrollLeft += scrollAmount; // Scroll right by the specified amount
        }}
      >
        <button
          className="nav-btn"
          onClick={() => {
            const container = sliderRef.current;
            container.scrollLeft += scrollAmount; // Scroll right by the specified amount
          }}
        >
          <RightOutlined />
        </button>
      </div>
    </div>
  );
};

CardsCarousel.propTypes = {};

export default CardsCarousel;
