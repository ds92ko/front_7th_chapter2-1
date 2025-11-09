import { ProductList, SearchForm } from '@/components';
import { Layout } from '@/pages/Layout';

/**
 * 홈페이지 컴포넌트
 *
 * @param {{
 *  filters: Filters,
 *  pagination: Pagination,
 *  products: Array<BaseProduct>,
 *  loading: boolean,
 * }} props
 * @returns {string}
 */
export const Home = ({ filters, pagination, products, loading }) => {
  return Layout({
    children: /* html */ `
      ${SearchForm({ filters, pagination, loading })}
      ${ProductList({ products, loading })}
    `,
  });
};
