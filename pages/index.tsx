import React from 'react';
import Image from 'next/image';

import { Container, Title, Button, Grid, Link, Text } from '@components';
import styles from '@styles/Home.module.css';

const src = "/me.png";

const Home = () => (
  <Container>
    <Container
      justifyContent="center"
      alignContent="center"
      alignItems="center"
      textAlign="center"
      paddingY="25px"
      paddingBottom="40px"
      gridGap="4rem"
    >
    <Container alignItems="center" alignContent="center">
      <img
        src={src}
        alt="Kâmil Dietvorst"
        width={120}
        height={120}
        //objectFit="cover"
        className={styles.image}
      />
      <Title>Kâmil Dietvorst</Title>
      <Title
        fontSize="2rem"
        color="rgba(0, 0, 0, 0.6)"
        fontWeight="500"
        as="h2"
      >
        I build web application.
      </Title>
    </Container>
    <Container maxWidth="700px" gridGap="3rem">
      <Container>
        <Text textAlign="center">
          I&apos;m a Full Stack developer with experience in Backend,
          Frontend and mobile development.
        </Text>
      </Container>
      <Link href="/about">
        <Button>More about me &rarr;</Button>
      </Link>
    </Container>
  </Container>

    {/* <Container alignItems="center" paddingY="4rem">
      <Container maxWidth="600px" alignItems="center" alignContent="center">
        <Title fontSize="3rem" as="h3">
          Get in touch
        </Title>
        <Text textAlign="center">
          Although I&apos;m not actively looking for job opportunities, my inbox
          is still open for you. Feel free to ask me anything!
        </Text>
        <Grid
          gridGap="2rem"
          marginTop="2rem"
          gridTemplateColumns={['1fr', 'repeat(2, 1fr)']}
          justifyItems="stretch"
          alignItems="stretch"
        >
          <Link href="mailto:hello@KâmilDietvorst">
            <Button width="100%">
              <motion.span
                initial={{ display: 'inline-block' }}
                animate={{ rotate: [0, 14, -8, 14, -4, 10, 0, 0] }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'reverse',
                  duration: 2.5,
                }}
              >
                👋
              </motion.span>{' '}
              Say hello
            </Button>
          </Link>
          <Link
            target="_blank"
            href="https://calendly.com/KâmilDietvorst"
          >
            <Button
              width="100%"
              backgroundColor="rgb(226,232,240)"
              color="black"
              variant="secondary"
            >
              Schedule a meeting
            </Button>
          </Link>
        </Grid>
      </Container>
    </Container> */}
  </Container>
);

export default Home;
