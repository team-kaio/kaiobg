import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';
import { Helmet } from 'react-helmet';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


import { Button, ButtonConstants, Image } from '@/components';
import kaioImgAbout from '@/images/kaio-hero-section.png';
import runnersImg from '@/images/runners.jpg';

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
          <h1>Domine sua Ansiedade no Esporte com o <span>Método ANSIEDÔMETRO</span></h1>
          <p>Transforme pressão em performance. Aprenda a controlar sua mente para competir com confiança, foco e alta execução.</p>
          <div dangerouslySetInnerHTML={{ __html: '<div id="ifr_68ed12ada083e65e2442f146_wrapper" style="margin: 0 auto; width: 100%; "> <div style="position: relative; padding: 56.25% 0 0 0;" id="ifr_68ed12ada083e65e2442f146_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_68ed12ada083e65e2442f146" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src=\'https://scripts.converteai.net/5f9d0fca-f358-4c9c-9715-c2231cc8dc9d/players/68ed12ada083e65e2442f146/v4/embed.html\' +(location.search||\'?\') +\'&vl=\' +encodeURIComponent(location.href)"></iframe> </div> </div>' }} />
          {/* <Helmet> */}
          {/* <script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> */}
          {/* </Helmet> */}
          <br/>
          <Button className={styles.primary} category={ButtonConstants.ButtonCategories.SUCCESS}>
            <a target='_blank' href='https://pay.kiwify.com.br/4xQoMt3'>
              Acessar o Curso Agora →
            </a>
          </Button>
        </div>
      </section>
      <section className={styles.About}>
        <div className={styles.container}>
          <Image className={styles.image} src={runnersImg} alt="Conquista" />
          <div className={styles.text}>
            <h2>📚 O QUE VOCÊ VAI APRENDER</h2>
            <p>Você vai descobrir como aplicar técnicas baseadas em Psicologia do Esporte, utilizadas por atletas, assessorias esportivas, psicólogos e grandes centros de treinamento.</p>
            <p>Tudo explicado de forma simples, prática e direta.</p>
            <ul>
              <li><FontAwesomeIcon icon={faCheck} color='#22A442' />Diferença entre ansiedade e transtorno de ansiedade</li>
              <li><FontAwesomeIcon icon={faCheck} color='#22A442' />Principais teorias sobre a ansiedade no esporte</li>
              <li><FontAwesomeIcon icon={faCheck} color='#22A442' />Como identificar sua ansiedade antes da competição</li>
              <li><FontAwesomeIcon icon={faCheck} color='#22A442' />Como controlar a ansiedade na competição</li>
              <li><FontAwesomeIcon icon={faCheck} color='#22A442' />Como identificar em seus colegas a ansiedade</li>
            </ul>
          </div>
        </div>
      </section>
      <section className={styles.Modules}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>7 Módulos Completos</h2>
          </div>

          <div className={styles.modulesGrid}>

            {/* <!-- Módulo 1 --> */}
            <div className={styles.module}>
              <div className={styles.moduleImage}>
                <Image src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=300&fm=webp&q=80" alt="" />
                <span className={styles.badge}>1</span>
              </div>
              <div className={styles.moduleContent}>
                <h3>Compreendendo a Ansiedade Esportiva</h3>
                <p>A diferença entre ansiedade normal e transtorno, e como ela influencia o desempenho.</p>
              </div>
            </div>

            {/* <!-- Módulo 2 --> */}
            <div className={styles.module}>
              <div className={styles.moduleImage}>
                <Image src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=300&fm=webp&q=80" alt="" />
                <span className={styles.badge}>2</span>
              </div>
              <div className={styles.moduleContent}>
                <h3>Teorias da Ansiedade no Esporte</h3>
                <p>Por que a ansiedade às vezes ajuda e às vezes prejudica o desempenho.</p>
              </div>
            </div>

            {/* <!-- Módulo 3 --> */}
            <div className={styles.module}>
              <div className={styles.moduleImage}>
                <Image src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&fm=webp&q=80" alt="" />
                <span className={styles.badge}>3</span>
              </div>
              <div className={styles.moduleContent}>
                <h3>Ansiedade Cognitiva, Somática e Autoconfiança</h3>
                <p>Reconheça seus sinais físicos, mentais e emocionais.</p>
              </div>
            </div>

            {/* <!-- Módulo 4 --> */}
            <div className={styles.module}>
              <div className={styles.moduleImage}>
                <Image src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&fm=webp&q=80" alt="" />
                <span className={styles.badge}>4</span>
              </div>
              <div className={styles.moduleContent}>
                <h3>ZFOI: Sua Zona de Performance Ótima</h3>
                <p>Encontre seu nível pessoal de ativação para a competição máxima.</p>
              </div>
            </div>

            {/* <!-- Módulo 5 --> */}
            <div className={styles.module}>
              <div className={styles.moduleImage}>
                <Image src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&fm=webp&q=80" alt="" />
                <span className={styles.badge}>5</span>
              </div>
              <div className={styles.moduleContent}>
                <h3>Usando o ANSIEDÔMETRO na Prática</h3>
                <p>Como medir, comparar e ajustar seu estado antes da competição.</p>
              </div>
            </div>

            {/* <!-- Módulo 6 --> */}
            <div className={styles.module}>
              <div className={styles.moduleImage}>
                <Image src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&fm=webp&q=80" alt="" />
                <span className={styles.badge}>6</span>
              </div>
              <div className={styles.moduleContent}>
                <h3>Técnicas para Controlar a Ansiedade</h3>
                <p>Ferramentas mentais e físicas para retomar o controle em tempo real.</p>
              </div>
            </div>

            {/* <!-- Módulo 7 --> */}
            <div className={styles.module}>
              <div className={styles.moduleImage}>
                <Image src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=300&fm=webp&q=80" alt="" />
                <span className={styles.badge}>7</span>
              </div>
              <div className={styles.moduleContent}>
                <h3>Plano de Treinamento Mental de Longo Prazo</h3>
                <p>Como manter uma mentalidade forte permanentemente.</p>
              </div>
            </div>

          </div>

          <div className={styles.ctaWrapper}>
            <Button className={styles.cta} category={ButtonConstants.ButtonCategories.SUCCESS}>
              <a target='_blank' href='https://pay.kiwify.com.br/4xQoMt3'>
              Adquira agora o seu curso
              </a>
            </Button>
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
          <div className={styles.text}>
            <h2>Pronto para melhorar o seu rendimento?</h2>
            <p>É hora de parar de ser refém da sua mente! <br /> Quando você controla sua ansiedade, seu desempenho muda.</p>
            <h3>Quando seu desempenho muda, sua carreira muda.</h3>

            <p className={styles.prices}>Por apenas: <span className={styles.newPrice}>R$ 197,90</span></p>

            <p><FontAwesomeIcon icon={faCheck} color='#22A442' /> Acesso imediato</p>
            <p><FontAwesomeIcon icon={faCheck} color='#22A442' /> Plataforma online (celular, tablet ou computador)</p>

            <Button className={styles.primary} category={ButtonConstants.ButtonCategories.SUCCESS}>
              <a target='_blank' href='https://pay.kiwify.com.br/4xQoMt3'>
              Adquira agora o seu curso
              </a>
            </Button>
          </div>
        </div>
      </section>
      <section className={`${styles.About} ${styles.aboutKaio}`}>
        <div className={styles.container}>
          <div className={styles.text}>
            <h2>Quem é o Kaio?!</h2>
            <p>Formado em Educação Física pela Unicamp, especialista, mestre e doutorando. Atua na área como personal trainer, treinador de basquete, consultor de performance esportiva e pesquisador.</p>
            <p>Pesquisa a mais de uma década sobre Psicologia do Esporte.</p>
            <p>Criador da <span className={styles.strong}>única</span> ferramenta no Brasil que quantifica de forma rápida e eficiente a ansiedade pré-competitiva, o <a target='_blank' href='https://ansiedometro-atleta.vercel.app/'>Ansiedômetro</a></p>
          </div>
          <Image className={styles.image} src={kaioImgAbout} alt="Kaio" />
        </div>
      </section>
    </div>
  );
};

const CoursePageStaticMemo = memo(CourseAnxietyPage);

export { CoursePageStaticMemo as CourseAnxietyPage };
