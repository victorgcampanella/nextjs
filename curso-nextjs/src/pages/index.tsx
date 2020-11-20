import { GetServerSideProps } from 'next';
import {Title} from '@/styles/pages/Home';
import SEO from '@/components/SEO'

interface IProducts {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProducts[];
}

export default function Home({recommendedProducts}: HomeProps) {
  return (
    <div>
      <section>
        <SEO 
        title="DevCommerce, your best e-commerce!" 
        image="boost.png"
        shouldExcludeTitleSuffix
        />

        <Title>Products</Title>

        <ul>
          {recommendedProducts.map(recommendedProduct => {
            return (
              <li key={recommendedProduct.id}>
                {recommendedProduct.title}
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`);

  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts
    }
  }
}