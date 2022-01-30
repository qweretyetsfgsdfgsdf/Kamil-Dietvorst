import React from 'react';
import Head from 'next/head';
import { GetStaticPropsResult } from 'next';
import Image from 'next/image';
import TimeAgo from 'javascript-time-ago';
import { compact } from 'lodash';
import { Title, Container, Text, Grid, Link, Card } from '@components';

import en from 'javascript-time-ago/locale/en.json';
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import { getBookmarks } from '../notion';

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

export interface Bookmark {
  id: string;
  created: string;
  name: string;
  url: string;
}

interface BookmarksProps {
  bookmarks: ReadonlyArray<Bookmark>;
}

const Bookmarks = ({ bookmarks }: BookmarksProps): JSX.Element => (
  <Container marginBottom="5rem">
    <Head>
      <title>Bookmarks</title>
    </Head>
    <Container alignItems="center" mb="3rem">
      <Title>Bookmarks</Title>
      <Text textAlign="center">
        Some interesting, useful and random stuff I want to read later.
      </Text>
    </Container>
    <Grid
      alignItems="baseline"
      gridTemplateColumns={['1fr 1fr', 'repeat(3, 1fr)']}
      gridGap={['1rem', '2rem']}
    >
      {bookmarks.map(({ id, name, created, url }) => (
        <Link target="_blank" rel="noreferrer noopener" key={id} href={url}>
          <Card padding={0} margin={0} borderRadius="5px" display="block">
            <Grid
              gridTemplateColumns="1fr"
              justifyItems={['center', 'flex-start']}
              gridGap={['.2rem', '1rem']}
            >
              <Container width="100%" height="150px" position="relative">
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={`https://rdl.ink/render/${encodeURIComponent(url)}`}
                  alt={name}
                />
              </Container>
              <Container
                width="100%"
                py=".5rem"
                px={['.3rem', '1rem']}
                gridGap={['.2rem', '.5rem']}
                alignItems="flex-start"
              >
                <Title
                  as="h2"
                  fontSize={['0.8rem', '1.2rem']}
                  textAlign="left"
                  margin={0}
                >
                  {name}
                </Title>
                <Text
                  margin={0}
                  fontWeight="initial"
                  fontSize={['.6rem', '.9rem']}
                >
                  {timeAgo.format(new Date(created))}
                </Text>
              </Container>
            </Grid>
          </Card>
        </Link>
      ))}
    </Grid>
  </Container>
);

const formatBookmarks = ({
  results,
}: QueryDatabaseResponse): ReadonlyArray<Bookmark> =>
  compact(
    results.map((result) => {
      if (
        result.object === 'page' &&
        'url' in result &&
        result.properties?.Created?.type === 'created_time' &&
        result.properties?.URL?.type == 'url' &&
        result.properties.URL.url &&
        result.properties?.Name?.type == 'title' &&
        result.properties.Name.title?.[0]?.type === 'text'
      ) {
        return {
          id: result.id,
          url: result.properties.URL.url,
          created: result.properties.Created.created_time,
          name: result.properties.Name.title[0].plain_text,
        };
      }
    }),
  );

export const getServerSideProps = async (): Promise<
  GetStaticPropsResult<BookmarksProps>
> => {
  const bookmarks = await getBookmarks();
  console.log(bookmarks);
  return {
    props: {
      bookmarks: formatBookmarks(bookmarks),
    },
  };
};

export default Bookmarks;
