import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Button, ButtonConstants, Image } from '@/components';

import styles from './CoursePageStatic.module.scss';

const CoursePageStatic = () => {
  const itemsTargetAudience = [
    { title: 'Atletas', desc:  'Se você é um atleta profissional, de base ou até mesmo amador, aprender as técnicas descritas nesse e-book fará com que você melhore seu rendimento.' },
    { title: 'Treinadores(as) e Psicólogos(as)', desc: 'Você entender como a ansiedade funciona para extrair o melhor de seus atletas é primordial, além de poder utilizar as técnicas e conhecimentos em você mesmo.' },
    { title: 'Pessoas que querem melhorar fora do esporte', desc: 'Independente se você é praticante de algum esporte, saber sobre a ansiedade e como ela se manifesta pode te ajudar em uma entrevista de emprego, encontro, prova e muitas outras situações.' },
  ];

  const testimonials = [
    { name: 'Ana Julia', text: 'Depois que eu aprendi as teorias da ansiedade, consegui pensar melhor nas minhas ações.' },
    { name: 'Felipe  Augusto', text: 'Esse e-book não ensina apenas ansiedade aplicado no esporte, e sim na vida!' },
    { name: 'Caio Rosin', text: 'Controlar a ansiedade me fez performar melhor na competição.' },
  ];

  return (
    <div className={styles.CoursePageStatic} id='coursePageStatic'>
      <section className={styles.HeroSection}>
        <div className={styles.content}>
          <h1>Transforme a Ansiedade em Performance <p>Técnicas comprovadas para atletas de todos os níveis</p></h1>
          <p>Aprenda métodos práticos, baseados em Psicologia do Esporte, para controlar a ansiedade antes de treinos, jogos e competições para render no seu máximo quando mais importa.</p>
          <Button className={styles.primary} category={ButtonConstants.ButtonCategories.SUCCESS}>
            <a target='_blank' href='https://pay.kiwify.com.br/YY8FoZp'>
              QUERO CONTROLAR MINHA ANSIEDADE AGORA
            </a>
          </Button>
        </div>
        <Image className={styles.img} src="/images/ansiedade_esporte_ebook.png" width='300px' />
      </section>
      <section className={styles.About}>
        <div className={styles.container}>
          <Image className={styles.image} src="https://images.unsplash.com/photo-1759787851041-0d45d2b2db84?w=600&fm=webp&q=80" alt="Jogadora de vôlei com ansiedade" />
          <div className={styles.text}>
            <h2>Por que este e-book existe?</h2>
            <p>Se você já sentiu o coração acelerar, as mãos suarem, a mente travar ou pensamentos negativos aparecerem momentos antes de competir… você não está sozinho.</p>
            <p>A ansiedade esportiva afeta atletas de todos os níveis — do iniciante ao profissional.</p>
            <p>O problema é que, sem técnicas corretas, ela sabota seu desempenho, faz você perder oportunidades e destrói sua confiança.</p>
            <p>Mas a verdade é: <span className={styles.strong}>ansiedade não é sinal de fraqueza. É um processo psicológico natural que pode ser controlado, treinado e usado ao seu favor.</span></p>
          </div>
        </div>
      </section>
      <section className={`${styles.About} ${styles.aboutKaio}`}>
        <div className={styles.container}>
          <div className={styles.text}>
            <h2>Você pode aprender a controlar a ansiedade... e este e-book vai te mostrar como!</h2>
            <p>Neste e-book, você vai descobrir como aplicar técnicas baseadas em Psicologia do Esporte, utilizadas por atletas, assessorias esportivas, psicólogos e grandes centros de treinamento.</p>
            <p>Tudo explicado de forma simples, prática e direta.</p>
            <p>Você vai aprender a:</p>
            <ul>
              <li><FontAwesomeIcon icon={faCheck} color='#22A442' /> Diferenciar a ansiedade e o transtorno de ansiedade</li>
              <li><FontAwesomeIcon icon={faCheck} color='#22A442' /> Reduzir o nervosismo pré-competição</li>
              <li><FontAwesomeIcon icon={faCheck} color='#22A442' /> Evitar pensamentos que tiram seu foco</li>
              <li><FontAwesomeIcon icon={faCheck} color='#22A442' /> Manter a calma em momentos decisivos</li>
              <li><FontAwesomeIcon icon={faCheck} color='#22A442' /> Treinar seu cérebro para reagir melhor sob pressão</li>
              <li><FontAwesomeIcon icon={faCheck} color='#22A442' /> Melhorar a autoconfiança e o controle emocional</li>
              <li><FontAwesomeIcon icon={faCheck} color='#22A442' /> Transformar ansiedade em energia útil para performance</li>
              <li><FontAwesomeIcon icon={faCheck} color='#22A442' /> Identificar a ansiedade em seus colegas de equipe e poder apoiá-los</li>
            </ul>
          </div>
          <Image className={`${styles.image} ${styles.aprendizados}`} src="/images/controle.jpg" alt="Aprendizados" />
        </div>
      </section>
      <section className={styles.Services}>
        <div className={styles.container}>
          <h2>Para quem é o e-book?</h2>
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
          <h2>Por que atletas e treinadores confiam nessas técnicas?</h2>
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
            <div>
              <p className={styles.prices}>Preço original: <span className={styles.oldPrice}>R$ 79,90</span></p>
              <p className={styles.prices}>Preço promocional: <span className={styles.newPrice}>R$ 37,90</span></p>
            </div>

            <p><FontAwesomeIcon icon={faCheck} color='#22A442' /> Acesso imediato</p>
            <p><FontAwesomeIcon icon={faCheck} color='#22A442' /> Arquivo PDF (celular, tablet ou computador)</p>

            <Button className={styles.button} category={ButtonConstants.ButtonCategories.SUCCESS}>
              <a target='_blank' href='https://pay.kiwify.com.br/YY8FoZp'>
                QUERO CONTROLAR MINHA ANSIEDADE AGORA
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
          <Image className={styles.image} src="/images/kaio-hero-section.png" alt="Kaio" />
        </div>
      </section>
    </div>
  );
};

const CoursePageStaticMemo = memo(CoursePageStatic);

export { CoursePageStaticMemo as CoursePageStatic };
