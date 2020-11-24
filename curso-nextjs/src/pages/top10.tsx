import {GetStaticProps} from 'next'
import {Title} from '@/styles/pages/Home';
import { client } from '@/lib/prismic';
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';
import {Document} from 'prismic-javascript/types/documents';

interface HomeProps {
  recommendedProducts: Document[];
}

export default function Top10({recommendedProducts}: HomeProps) {
  return (
    <div>
      <Title>Top 10</Title>

      <ul>
          {recommendedProducts.map(recommendedProduct => {
            return (
              <li key={recommendedProduct.id}>
                <h1>{PrismicDOM.RichText.asText(recommendedProduct.data.title)}</h1>
              </li>
            )
          })}
        </ul>
    </div>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async (context) => {
  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product')
  ])

  return {
    props: {
      recommendedProducts: recommendedProducts.results
    },
    revalidate: 5,
  }
} 