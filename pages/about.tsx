import React from 'react';
import { Title, Text, Container, Grid, Link, Card } from '@components';
import { GetStaticProps } from 'next';
import Head from 'next/head';

import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiBootstrap,
  SiJquery,
  SiPhp,
  SiLaravel,
  SiSymfony,
  SiCodeigniter,
  SiAmazonaws,
  SiGooglecloud,
  SiPostgresql,
  SiTerraform,
  SiReact,
  SiNextdotjs,
  SiMysql,
  SiGraphql,
} from 'react-icons/si';
import { DiYii } from 'react-icons/di';
import { getPosts, Post } from '@posts';
import { TransparentLink } from '@components';

interface AboutProps {
  experiences: Post[];
}

const stacks = [
  {
    Icon: SiHtml5,
    url: 'https://www.Html5.org/',
  },
  {
    Icon: SiCss3,
    url: 'https://www.Css3.org/',
  },
  {
    Icon: SiJavascript,
    url: 'https://www.SiJavascriptlang.org/',
  },
  {
    Icon: SiTypescript,
    url: 'https://www.typescriptlang.org/',
  },
  {
    Icon: SiTailwindcss,
    url: 'https://www.Tailwindcss.org/',
  },
  {
    Icon: SiBootstrap,
    url: 'https://www.Bootstrap.org/',
  },
  {
    Icon: SiJquery,
    url: 'https://www.Jquery.org/',
  },
  {
    Icon: SiPhp,
    url: 'https://www.Php.org/',
  },
  {
    Icon: SiLaravel,
    url: 'https://www.Laravel.org/',
  },
  {
    Icon: SiSymfony,
    url: 'https://www.Symfony.org/',
  },
  {
    Icon: SiCodeigniter,
    url: 'https://www.Codeigniter.org/',
  },
  {
    Icon: DiYii,
    url: 'https://www.Yii.org/',
  },
  {
    Icon: SiReact,
    url: 'https://reactjs.org/',
  },
  {
    Icon: SiGraphql,
    url: 'https://graphql.org/',
  },
  {
    Icon: SiAmazonaws,
    url: 'https://aws.amazon.com/',
  },
  {
    Icon: SiNextdotjs,
    url: 'https://nextjs.org/',
  },
  {
    Icon: SiPostgresql,
    url: 'https://www.postgresql.org/',
  },
  {
    Icon: SiMysql,
    url: 'https://www.mysql.org/',
  },
];

const About = ({ experiences }: AboutProps): JSX.Element => (
  <Container>
    <Head>
      <title>About</title>
    </Head>
    <Container alignContent="center" alignItems="center">
      <Title fontSize={['3rem', '4rem']} as="h2">
        Full Stack Developer
      </Title>
      <Container maxWidth={['100%', '720px']} marginY="2rem">
        <Text>Hello! I&apos;m a seasoned Full-Stack developer living in Amsterdam.</Text>
        <Text>
          My journey in the world of technology has been a thrilling adventure, where each day brings new challenges and opportunities for growth.  In the dynamic realm of software development, I thrive on the constant evolution of technologies and methodologies. From architecting robust backend systems to crafting pixel-perfect frontend experiences, I've immersed myself in the intricacies of the full development stack.
          Beyond the lines of code, you'll often find me embracing the rhythm of daily life. Whether it's diving into the latest tech trends, collaborating with talented teams, or finding inspiration in the great outdoors, I believe in a holistic approach to personal and professional growth.  I am passionate about creating solutions that not only meet technical requirements but also enhance user experiences.   
          My commitment to excellence is fueled by a genuine love for problem-solving and a dedication to staying at the forefront of industry advancements.
          During my free time I like going gym, doing Bench Press, make design and make video edits on After Effects.
          Let's connect and explore the endless possibilities that technology and life have to offer!
        </Text>
      </Container>
    </Container>

    <Container
      paddingY="4rem"
      gridGap="2rem"
      alignContent="center"
      alignItems="center"
      textAlign="center"
      width="100%"
    >
      <Title fontSize="40px" as="h2">
        Technologies I frequently use
      </Title>
      <Grid
        gridTemplateColumns={['repeat(3 , 1fr)', 'repeat(6 , 1fr)']}
        gridGap="1rem"
        justifyItems="center"
        maxWidth="40rem"
      >
        {stacks.map(({ Icon, url }, i) => (
          <Link href={url} key={url}>
            <Card key={i}>
              <Icon size="2rem" />
            </Card>
          </Link>
        ))}
      </Grid>
    </Container>
    <Container
      alignContent="center"
      alignItems="center"
      textAlign="center"
      width="100%"
      paddingBottom="4rem"
      gridGap="3rem"
    >
      <Title fontSize="40px" as="h2">
        Work Experiences
      </Title>
      <Container width="100%">
        {experiences.map(({ data }, i) => (
          <TransparentLink href={`/about/${data.slug}`} key={data.slug}>
            <Grid
              key={i}
              gridTemplateColumns="1fr 4fr"
              justifyItems="flex-start"
              gridGap="1rem"
              paddingY="2rem"
              borderBottom="1px solid rgba(0,0,0,0.1)"
            >
              <Container width="100%">
                <Text>0{experiences.length - i}</Text>
              </Container>
              <Grid width="100%" gridTemplateColumns="4fr 1fr">
                <Container
                  width="100%"
                  alignItems="flex-start"
                  textAlign="start"
                >
                  <Grid
                    width="100%"
                    gridTemplateColumns="repeat(2, auto)"
                    justifyItems="flex-start"
                    justifyContent="flex-start"
                    gridGap="1rem"
                  >
                    <Title fontSize="1.5rem" margin={0} as="h3">
                      {data.title}
                    </Title>
                    <Text fontSize="smaller" margin={0}>
                      {data.date}
                    </Text>
                  </Grid>
                  <Text fontSize="1rem">{data.caption}</Text>
                </Container>
                <Text fontSize="1.5rem">&rarr;</Text>
              </Grid>
            </Grid>
          </TransparentLink>
        ))}
      </Container>
    </Container>
  </Container>
);

export const getStaticProps: GetStaticProps = async () => {
  const experiences = await getPosts('experiences');
  experiences.sort((a, b) =>
    b.data.date.toString().localeCompare(a.data.date.toString()),
  );

  return {
    props: {
      experiences,
    },
  };
};

export default About;
