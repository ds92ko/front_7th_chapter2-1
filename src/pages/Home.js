import { ProductList, SearchForm } from '@/components';
import { Layout } from '@/pages/Layout';

/**
 * 홈페이지 컴포넌트
 *
 * @param {{
 *  filters: Filters,
 *  pagination: Pagination,
 *  products: Array<BaseProduct>,
 *  categories: Array<Category>,
 *  loading: boolean,
 * }} props
 * @returns {string}
 */
export const Home = ({ filters, pagination, products, categories, loading }) => {
  return Layout({
    children: /* HTML */ `
      ${SearchForm({ filters, pagination, categories, loading })}
      ${ProductList({ products, loading })}
    `,
  });
};
