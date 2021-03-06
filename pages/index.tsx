import { GetStaticProps } from 'next';
import pokeApi from '../api/pokeApi';
import { PokemonListResponse, SmallPokemon } from '../interfaces';

import type { NextPage } from 'next';
import { Layout } from '../components/layouts';
import { Card, Grid, Row, Text } from '@nextui-org/react';

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  console.log(pokemons);
  return (
    <Layout title="Lista de Pokémons">
      <Grid.Container gap={2} justify="flex-start">
        {pokemons.map(({ id, name, img }) => (
          <Grid xs={6} sm={3} md={2} xl={1} key={id}>
            <Card hoverable clickable>
              <Card.Body css={{ p: 1 }}>
                <Card.Image src={img} width="100%" height={140} />
              </Card.Body>
              <Card.Footer>
                <Row justify="space-between">
                  <Text transform="capitalize">{name}</Text>
                  <Text>#{id}</Text>
                </Row>
              </Card.Footer>
            </Card>
          </Grid>
        ))}
      </Grid.Container>
    </Layout>
  );
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151'); // your fetch function here
  // console.log(data);

  const pokemons: SmallPokemon[] = data.results.map((pokemon, index) => {
    return {
      ...pokemon,
      id: index + 1,
      img:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' +
        (index + 1) +
        '.png',
    };
  });

  return {
    props: {
      pokemons: pokemons,
    },
  };
};

export default HomePage;
