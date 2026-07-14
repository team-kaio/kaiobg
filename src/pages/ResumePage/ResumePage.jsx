import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ExperienceCard } from '../../components/ExperienceCard/ExperienceCard';
import { Section } from '../../components/Section/Section';

import styles from './ResumePage.module.scss';

const ResumePage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.ResumePage}>
      <Section title={t('Professional Education')}>
        <ExperienceCard
          title="Doutorando em Psicologia do Esporte"
          subtitle="FEF - Unicamp"
          image="/images/resume-page/unicamp.png"
          description="Estudando para traçar o perfil das tendências psicológicas em treinadores e treinadoras de todas as modalidades e tempos de prática com o intuito de entender os padrões para melhorar o entendimento psicológico dos profissionais."
        />

        <ExperienceCard
          title="Mestrado em Psicologia do Esporte"
          subtitle="FEF - Unicamp"
          image="/images/resume-page/ansiedometro.jpeg"
          description="Com ênfase em motivação e ansiedade no esporte universitário. A pesquisa, na criação do Ansiedômetro, parte do pressuposto que cada atleta responde de forma diferente a um estímulo competitivo. Melhorando tais elementos no esporte, pode-se aplicar na vida. Sendo assim, pensando nas abordagens do técnico, gritar com todos os atletas pode não ser bom. Podendo gerar respostas diferentes, boas ou ruins."
        />

        <ExperienceCard
          title="Graduação"
          subtitle="FEF - Unicamp"
          image="/images/resume-page/unicamp.png"
          description="Graduado em licenciatura e bacharel em Educação Física pela Unicamp. Mestre em educação física pela Unicamp. Membro do Grupo de Estudos em Psicologia do Esporte e Neurociências (GEPEN)."
        />

        <ExperienceCard
          title="Intercâmbio Acadêmico - Dinamarca"
          description="Realizou intercâmbio acadêmico em 2017 na Viborg Idrætshøjskole - Dinamarca."
          image="/images/resume-page/giv.png"
        />

        <ExperienceCard
          title="Intercâmbio Acadêmico - Portugal"
          description="Realizou intercâmbio acadêmico, em 2018, no Instituto Politécnico de Leiria - Portugal."
          image="/images/resume-page/leiria.jpg"
        />

        <ExperienceCard
          title="Certificações em Basquete"
          description="Na modalidade de basquete possui certificação NBA School. Na Federação, certificação em arbitragem e estatística."
          image="/images/resume-page/nba.jpg"
        />
      </Section>

      <Section title={t('In activity')}>
        <ExperienceCard
          title="Treinador individual"
          description="Cada pessoa possui sua própria lista de objetivos e, quando relacionado ao corpo, exercício físico e as infinitas possibilidades que podem ser trabalhadas, estar com um profissional capacitado faz toda a diferença. Independente se a meta for melhoria na qualidade de vida, emagrecimento, ganho de força, hipertrofia, dentre outros, ter um profissional capacitado faz toda a diferença. Atuo nesta vertente, desde o ínico de minha formação, em 2013. Lá, a demanda inicial eram os estudantes universitários que moravam na Moradia - Unicamp, em um projeto chamado: Moradia, Esporte e Lazer."
          image="/images/resume-page/kaio_perfil.jpeg"
        />
        <ExperienceCard
          title="Consultor de performance"
          description="Ajustes técnicos e consultoria especializada em performance esportiva e otimização de movimento."
          image="/images/resume-page/kaio_perfil.jpeg"
        />
        <ExperienceCard
          title="Treinador personalizado de basquete"
          description="Com o objetivo de corrigir detalhes e focar nas defasagens do atleta, o trabalho pode ser realizado nas mais diversas situações e locais. Seja para praticantes amadores, atletas profissionais ou até mesmo atletas em desenvolvimento (jogador de categorias de base). O trabalho é extremamente personalizado de acordo com a dificuldade de cada atleta, podendo ter correções em arremesso, aspectos defensivos, coordenativos, entre outros."
          image="/images/resume-page/nba.jpeg"
        />
      </Section>

      <Section title={t('Event production')}>
        <ExperienceCard
          title="Produtor NBA House"
          description="O objetivo principal como produtor da quadra externa da NBA House foi coordenar as experiências das pessoas para que aconteça da melhor forma possivel. Gerenciando as empresas que fariam as ativações no espaço."
          image="/images/resume-page/nbahouse.jpeg"
        />

        <ExperienceCard
          title="Kaiopeonato"
          period="2018"
          description="O objetivo principal do Kaiopeonato é promover e fomentar o basquete na cidade de Campinas, em específico nos arredores da Unicamp. Além de fomentar o basquete feminino nos arredores da Unicamp e captar atletas para os times da instituição. A primeira edição contou com aproximadamente 30 atletas do sexo feminino, realizado em 2018."
          image="/images/resume-page/kaiopeonato1.png"
        />

        <ExperienceCard
          title="Segundo Kaiopeonato"
          description="Devido o sucesso do primeiro evento, o segundo aconteceu com as mesmas características. O objetivo foi fomentar o basquete feminino nos arredores da Unicamp e captar atletas para os times da instituição."
          period="2019"
          image="/images/resume-page/kaiopeonato2.png"
        />

        <ExperienceCard
          title="Terceiro Kaiopeonato"
          description="Pós pandemia, o evento que ocorreu no primeiro semestre de 2022, teve como objetivo fomentar o basquete universitário. Contando com a participação de 8 times, divididos em 2 chaves com 4 times cada. Totalizando aproximadamente 80 atletas."
          period="H1 2022"
          image="/images/resume-page/kaiopeonato3.png"
        />

        <ExperienceCard
          title="Primeiro Kaiopeonato 3x3"
          description="O objetivo principal deste kaiopeonato foi a diversão e ocupação de espaço em praças públicas. Contou com a presença de 21 atletas, sendo que a cada partida os trios eram sorteados, promovendo a parceria sem excluir a competitividade."
          period="2022"
          image="/images/resume-page/kaiopeonato5.png"
        />

        <ExperienceCard
          title="Quarto Kaiopeonato"
          description="O evento que ocorreu no segundo semestre de 2023 e teve como objetivo fomentar o basquete universitário. Contando com a participação de 8 times, divididos em 2 chaves com 4 times cada. Totalizando aproximadamente 90 atletas."
          period="H2 2023"
          image="/images/resume-page/kaiopeonato4.png"
        />

        <ExperienceCard
          title="Segundo Kaiopeonato 3x3"
          description="O objetivo principal deste kaiopeonato foi ajudar o time de basquete masculino da Unicamp. Primeira edição do Kaiopeonato que teve que pagar uma inscrição de 10 reais para ajudar o time. Contou com a presença de 10 trios formados, divididos em 2 grupos com 5 times cada grupo."
          period="H2 2023"
          image="/images/resume-page/kaiopeonato6.png"
        />
      </Section>

      <Section title={t('Previous experiences')}>
        <ExperienceCard
          title="Professor Universitário"
          subtitle="Faculdade Maria Imaculada"
          description="Professor universitário da Faculdade Maria Imaculada nas disciplinas de Basquetebol 1 e Basquetebol 2 para os alunos do último ano do curso de Educação Física. O objetivo das disciplinas integradas foi o ensino dos fundamentos e princípios do jogo da modalidade de basquete e como o profissional de educação física pode atuar nas diferentes vertentes."
          period="Início das atividades em 2023"
          image="/images/resume-page/fimi.png"
        />

        <ExperienceCard
          title="Coordenador de Basquete"
          subtitle="Sabis - NBA"
          description="Através de projetos extra-curriculares, a modalidade de basquete é popular nos alunos de ensino infantil e fundamental. A escola é respaldada pelo método de ensino da NBA School, fornecendo formações e materiais técnicos para conhecimento do professor/técnico."
          period="2022 até 2024"
          image="/images/resume-page/sabis.png"
        />

        <ExperienceCard
          title="Técnico de Basquete"
          subtitle="Bodytech - NBA"
          description="Através de projetos de criação de turmas nas idades entre 6 anos e adulto, o objetivo principal é a aprendizagem de valores por meio do basquete, diversão, competitividade entre outros. A academia é respaldada pelo método de ensino da NBA School, fornecendo formações e materiais técnicos para conhecimento do professor/técnico."
          period="2023 até 2024"
          image="/images/resume-page/bt.png"
        />

        <ExperienceCard
          title="Professor de Educação Física"
          subtitle="Colégio Elite"
          description="Com turma de Fundamental II e Ensino Médio. O desafio de mostrar a importância do corpo e sua relação com o espaço, modalidades esportivas, expressões corporais e outros elementos característicos do ensino escolar com a visão do Colégio Elite. Além de estruturar métodos avaliativos coerentes com o desenvolvimento de cada aluno na disciplina."
          period="2022 até 2024"
          image="/images/resume-page/elite.jpeg"
        />

        <ExperienceCard
          title="Auxiliar Técnico de basquete"
          subtitle="Vera Cruz Campinas"
          description="Através de dinâmicas multidisciplinares no basquete, meu trabalho no time de basquete profissional feminino do Vera Cruz Campinas foi vinculada às amplas tarefas existentes no dia a dia. Seja no planejamento e execução de treinos, análise de vídeos e até mesmo no respaldo individual às atletas, sempre buscando a excelência e cumprimento dos objetivos. O time é classificado como um dos favoritos do estado e sempre cotado entre os melhores do Brasil. Neste ano, ganhamos todos os campeonatos participados (Copa São Paulo e Campeonato Paulista)."
          period="2020"
          image="/images/resume-page/simbolovera.jpg"
        />

        <ExperienceCard
          title="Técnico de basquete"
          subtitle="Escola Porto Seguro - Valinhos"
          description="Através de projetos extra-curriculares, a modalidade de basquete vem ganhando popularidade entre os alunos de ensino fundamental II e médio. Com início no segundo semestre de 2019, na equipe de treinamento do ensino médio masculino, a implementação da filosofia de jogo e treino foi iniciada. A escola é respaldada pelo método de ensino da NBA School, fornecendo formações e materiais técnicos para conhecimento do professor/técnico."
          image="/images/resume-page/porto.jpg"
        />

        <ExperienceCard
          title="Técnico de basquete e xadrez"
          subtitle="Escola Maple Bear"
          description="A escola bilingue infantil Maple Bear possí tradição nas atividades extra-curriculares para os alunos e o meu papel como professor foi ensinar basquete e xadrez para os alunos no ano de 2022."
          period="2022"
          image="/images/resume-page/maple.png"
        />

        <ExperienceCard
          title="Liga das Engenharias da Unicamp (masculino)"
          period="2019 até 2023"
          achievements="Campeão do TUC 2023/ Semi-finalista do TUC 2019/ Semi-finalista Olimpíadas Unicamp 2019"
          image="/images/resume-page/leu.jpg"
        />

        <ExperienceCard
          title="Liga das Atléticas da Unicamp (masculino)"
          period="2019 até 2023"
          achievements="Terceiro lugar Copa Estações 2023/ Vice-campeão LIU 2022/ Semi-finalista CUB 2022/ Semi-finalista do JUBs estadual 2019"
          image="/images/resume-page/lau.jpg"
        />

        <ExperienceCard
          title="Liga Mackenzie (masculino)"
          period="2022 até 2023"
          achievements="Terceiro lugar JUC 2023/ Campeão TUC 2022/ Semifinalista LIU 2022"
          image="/images/resume-page/mack.png"
        />

        <ExperienceCard
          title="Faceca (feminino)"
          period="2023"
          achievements="Campeão Taça LAP 2023"
          image="/images/resume-page/faceca.jpeg"
        />

        <ExperienceCard
          title="Liga Mackenzie (feminino)"
          period="2022 até 2023"
          image="/images/resume-page/mack.png"
        />

        <ExperienceCard
          title="Economia da Unicamp (masculino)"
          period="2022"
          achievements="Vice-campeão Economiadas Caipira 2022"
          image="/images/resume-page/economia.png"
        />

        <ExperienceCard
          title="Engenharia de Controle e Automação (masculino)"
          period="2018 até 2022"
          achievements="Campeão Copa Four 2022/ Vice-campeão Kaiopeonato 2022/ Terceiro lugar 2Kaiopeonato 2022/ Vice-campeão Copa Four 2018 e 2019/ Vice-campeão LIPE 2019"
          image="/images/resume-page/eca.jpg"
        />

        <ExperienceCard
          title="Liga das Atléticas da PUC (feminino)"
          period="2019 até 2020"
          achievements="Campeã regional FUPE 2019/ Vice-campeã estadual FUPE 2019"
          image="/images/resume-page/lap.jpg"
        />

        <ExperienceCard
          title="Liga das Engenharias da Unicamp (feminino)"
          period="2014 até 2016"
          achievements="Campeã Tusca 2016/ Vice-campeã CUPA 2015 e 2016/ Vice-campeã G4 2016/ Vice-campeã Olimpíadas Unicamp 2015"
          image="/images/resume-page/leu.jpg"
        />

        <ExperienceCard
          title="Computação Estatística e Matemática (feminino)"
          period="2014 até 2016"
          achievements="Campeã Intercomp 2015 e 2016/ Terceiro lugar Olimpíadas Unicamp 2015/ Campeã Copa Four 2015"
          image="/images/resume-page/ceml.jpg"
        />

        <ExperienceCard
          title="Relações Internacionais Facamp (feminino)"
          period="2014 até 2016"
          achievements="Terceiro lugar Jopri 2014/ Vice campeã Jopri 2016"
          image="/images/resume-page/ri.jpg"
        />

        <ExperienceCard
          title="Relações Internacionais Facamp (masculino)"
          period="2014 até 2016"
          achievements="Terceiro lugar Jopri 2014"
          image="/images/resume-page/ri.jpg"
        />

        <ExperienceCard
          title="Biologia/ Liga das Ciências Naturais (feminino)"
          period="2013 até 2016"
          achievements="Campeã Copa Lau 2013/ Campeã Copa Four 2014/ Vice-campeã Copa Four 2015"
          image="/images/resume-page/lcnl.jpg"
        />

        <ExperienceCard
          title="Biologia/ Liga das Ciências Naturais (masculino)"
          period="2013 até 2016"
          achievements="Vice-campeão Copa Four 2015"
          image="/images/resume-page/lcnl.jpg"
        />

        <p className={styles.ObservationNote}>
          Observação: Em conjunto com resultados em campeonatos, elementos como construção
          e manutenção de time são alguns dos inúmeros resultados que devem ser
          pontuados.
        </p>
      </Section>
    </div>
  );
};

const ResumePageMemo = memo(ResumePage);

export { ResumePageMemo as ResumePage };
