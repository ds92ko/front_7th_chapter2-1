import Component from '@/core/component';
import ProductList from '@/pages/home/components/ProductList';
import SearchForm from '@/pages/home/components/SearchForm';

export default class HomePage extends Component {
  template() {
    return /* HTML */ `
      <main class="max-w-md mx-auto px-4 py-4">
        <div data-slot="search-form"></div>
        <div data-slot="product-list"></div>
      </main>
    `;
  }

  mounted() {
    const $searchForm = this.$target.querySelector('[data-slot="search-form"]');
    const $productList = this.$target.querySelector('[data-slot="product-list"]');

    new SearchForm($searchForm);
    new ProductList($productList);
  }
}
