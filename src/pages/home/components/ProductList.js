import { getProducts } from '@/api/productApi';
import Component from '@/core/component';
import ProductItem from '@/pages/home/components/ProductItem';
import ProductItemSkeleton from '@/pages/home/components/ProductItem.skeleton';
import ProductListLoading from '@/pages/home/components/ProductList.loading';

const SKELETON_COUNT = 4;

export default class ProductList extends Component {
  setup() {
    // TODO: 로딩 상태 처리 필요
    this.state = {
      products: [],
      pagination: null,
      filters: null,
    };
    this.fetchProducts();
  }

  // TODO: API 에러 처리 필요
  async fetchProducts() {
    const params = new URLSearchParams(location.search);
    const { products, pagination, filters } = await getProducts({
      page: params.get('page') ? Number(params.get('page')) : undefined,
      current: params.get('current') ? Number(params.get('current')) : undefined,
      limit: params.get('limit') ? Number(params.get('limit')) : undefined,
      search: params.get('search') || undefined,
      category1: params.get('category1') || undefined,
      category2: params.get('category2') || undefined,
      sort: /** @type {SortType} */ (params.get('sort')) || undefined,
    });

    this.setState({ products, pagination, filters });
  }

  template() {
    const { products, pagination } = this.state;

    return /* HTML */ `
      <!-- 상품 목록 -->
      <div class="mb-6">
        <div>
          ${pagination?.total
            ? /* HTML */ `
                <!-- 상품 개수 정보 -->
                <div class="mb-4 text-sm text-gray-600">
                  총 <span class="font-medium text-gray-900">${pagination.total}개</span>의 상품
                </div>
              `
            : ''}
          <!-- 상품 그리드 -->
          <div class="grid grid-cols-2 gap-4 mb-6" id="products-grid">
            ${products.length
              ? /* HTML */ `<div data-slot="product-item"></div>`.repeat(products.length)
              : /* HTML */ `<div data-slot="product-item-skeleton"></div>`.repeat(SKELETON_COUNT)}
          </div>

          <!-- TODO: 페이지네이션 구현 -->
          ${pagination?.total === products.length
            ? /* HTML */ `<div class="text-center py-4 text-sm text-gray-500">
                모든 상품을 확인했습니다
              </div>`
            : /* HTML */ `<div data-slot="product-list-loading"></div>`}
        </div>
      </div>
    `;
  }

  mounted() {
    const { products } = this.state;
    const $productItems = this.$target.querySelectorAll('[data-slot="product-item"]');
    const $productItemSkeletons = this.$target.querySelectorAll(
      '[data-slot="product-item-skeleton"]'
    );
    const $productListLoading = this.$target.querySelector('[data-slot="product-list-loading"]');

    $productItems.forEach(($productItem, index) => {
      new ProductItem($productItem, products[index]);
    });
    $productItemSkeletons.forEach(
      ($productItemSkeleton) => new ProductItemSkeleton($productItemSkeleton)
    );
    new ProductListLoading($productListLoading);
  }
}
