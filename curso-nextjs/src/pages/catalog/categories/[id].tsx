import { GetStaticPaths, GetStaticProps } from 'next';
import {useRouter} from 'next/router'

interface IProduct {
  id: string;
  title: string;
}

interface CategoryProps {
  products: IProduct[];
}

export default function Category({products}: CategoryProps) {
  const router = useRouter();
  return (
    <div>
      <h1>{router.query.id}</h1>

      <ul>
          {products.map(product => {
            return (
              <li key={product.id}>
                {product.title}
              </li>
            )
          })}
        </ul>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch('http://localhost:3333/categories');

  const categories = await response.json();

  const paths = categories.map(category => {
    return {
      params: {id: category.id}
    }
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<CategoryProps> = async (context) => {
  const {id} = context.params

  const response = await fetch(`http://localhost:3333/products?category_id=${id}`);
  const products = await response.json();

  return {
    props: {
      products
    },
    revalidate: 60,
  }
}