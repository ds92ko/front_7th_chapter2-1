import { getProducts } from '@/api/productApi';
import Component from '@/core/component';

// TODO: 로직 확인 필요!!
export default class RelatedProducts extends Component {
  setup() {
    this.state = {
      products: [],
    };
    this.fetchProducts();
  }

  async fetchProducts() {
    const { category1, category2 } = this.props;
    const { products } = await getProducts({ category1, category2 });

    this.setState({ products });
  }

  template() {
    const { products } = this.state;

    return /* HTML */ `<div class="grid grid-cols-2 gap-3 responsive-grid">
      ${products
        .map(
          ({ productId, image, title, lprice }) => /* HTML */ `
            <div
              class="bg-gray-50 rounded-lg p-3 related-product-card cursor-pointer"
              data-product-id="${productId}"
            >
              <div class="aspect-square bg-white rounded-md overflow-hidden mb-2">
                <img
                  src="${image}"
                  alt="${title}"
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 class="text-sm font-medium text-gray-900 mb-1 line-clamp-2">${title}</h3>
              <p class="text-sm font-bold text-blue-600">${Number(lprice).toLocaleString()}원</p>
            </div>
          `
        )
        .join('')}
    </div>`;
  }
}
