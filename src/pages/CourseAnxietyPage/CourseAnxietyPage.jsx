import { memo } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Helmet } from 'react-helmet';


import { Button, ButtonConstants, Image } from '@/components';
import ebookLogo from '@/images/ebook-logo.png';
import kaioImgAbout from '@/images/kaio-hero-section.png';
import kaioPensando from '@/images/kaio-pensando.png';

import styles from './CourseAnxietyPage.module.scss';

const CourseAnxietyPage = () => {
  const itemsTargetAudience = [
    { title: 'Atletas', desc:  'Se você é um atleta profissional, de base ou até mesmo amador, aprender as técnicas descritas nesse curso fará com que você melhore seu rendimento.' },
    { title: 'Treinadores(as) e Psicólogos(as)', desc: 'Você entender como a ansiedade funciona para extrair o melhor de seus atletas é primordial, além de poder utilizar as técnicas e conhecimentos em você mesmo.' },
    { title: 'Pessoas que querem melhorar fora do esporte', desc: 'Independente se você é praticante de algum esporte, saber sobre a ansiedade e como ela se manifesta pode te ajudar em uma entrevista de emprego, encontro, prova e muitas outras situações.' },
  ];

  const testimonials = [
    { name: 'Ana Julia', text: 'Depois que eu aprendi as teorias da ansiedade, consegui pensar melhor nas minhas ações.' },
    { name: 'Felipe  Augusto', text: 'Esse curso não ensina apenas ansiedade aplicado no esporte, e sim na vida!' },
    { name: 'Caio Rosin', text: 'Controlar a ansiedade me fez performar melhor na competição.' },
  ];

  return (
    <div className={styles.CourseAnxietyPage} id='coursePageStatic'>
      <section className={styles.HeroSection}>
        <div className={styles.content}>
          <h1>Curso Ansiedade no Esporte</h1>
          <p>Saiba como controlar e quantificar suas ansiedade nas competições, afinal ela está diretamente vinculada ao seu rendimento.</p>
          <div dangerouslySetInnerHTML={{ __html: '<div id="ifr_68ed12ada083e65e2442f146_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 56.25% 0 0 0;" id="ifr_68ed12ada083e65e2442f146_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_68ed12ada083e65e2442f146" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src=\'https://scripts.converteai.net/5f9d0fca-f358-4c9c-9715-c2231cc8dc9d/players/68ed12ada083e65e2442f146/v4/embed.html\' +(location.search||\'?\') +\'&vl=\' +encodeURIComponent(location.href)"></iframe> </div> </div>' }} />
          <Helmet>
            <script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script>
          </Helmet>
          <br/>
          <Button className={styles.primary} category={ButtonConstants.ButtonCategories.SUCCESS}>
            <a target='_blank' href='https://pay.kiwify.com.br/4xQoMt3'>
              Adquira agora o seu curso
            </a>
          </Button>
        </div>
      </section>
      <section className={styles.About}>
        <div className={styles.container}>
          <Image className={styles.image} src={kaioPensando} alt="Kaio" />
          <div className={styles.text}>
            <h2>O que você aprenderá com o curso</h2>
            <ul>
              <li>Diferença entre ansiedade e transtorno de ansiedade</li>
              <li>Principais teorias sobre a ansiedade no esporte</li>
              <li>Como identificar sua ansiedade antes da competição</li>
              <li>Como controlar a ansiedade na competição</li>
              <li>Como identificar em seus colegas a ansiedade</li>
            </ul>
          </div>
        </div>
      </section>
      <section className={styles.Services}>
        <div className={styles.container}>
          <h2>Para quem é o curso</h2>
          <div className={styles.grid}>
            {itemsTargetAudience.map((item, i) => (
              <article key={i} className={styles.card}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className={styles.Testimonials}>
        <div className={styles.container}>
          <h2>Depoimentos</h2>
          <Swiper
            modules={[ Pagination, Autoplay ]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
            }}
            className={styles.swiper}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <blockquote className={styles.card}>
                  <p>“{testimonial.text}”</p>
                  <footer>— {testimonial.name}</footer>
                </blockquote>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <section className={styles.Contact}>
        <div className={styles.container}>
          <h2>Pronto para melhorar o seu rendimento?</h2>
          <Button className={styles.button} category={ButtonConstants.ButtonCategories.SUCCESS}>
            <a target='_blank' href='https://pay.kiwify.com.br/4xQoMt3'>
              Adquira agora o seu curso
            </a>
          </Button>
        </div>
      </section>
      <section className={`${styles.About} ${styles.aboutKaio}`}>
        <div className={styles.container}>
          <div className={styles.text}>
            <h2>Quem é o Kaio?!</h2>
            <p>Formado em Educação Física pela Unicamp, especialista, mestre e doutorando. Atua na área como personal trainer, treinador de basquete, consultor de performance esportiva e pesquisador.</p>
            <p>Pesquisa a mais de uma década sobre Psicologia do Esporte.</p>
            <p>Criador da <strong>única</strong> ferramenta no Brasil que quantifica de forma rápida e eficiente a ansiedade pré-competitiva, o <a target='_blank' href='https://ansiedometro-atleta.vercel.app/'>Ansiedômetro</a></p>
          </div>
          <Image className={styles.image} src={kaioImgAbout} alt="Kaio" />
        </div>
      </section>
    </div>
  );
};

const CoursePageStaticMemo = memo(CourseAnxietyPage);

export { CoursePageStaticMemo as CourseAnxietyPage };
