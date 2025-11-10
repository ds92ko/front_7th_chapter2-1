import { Footer, Header } from '@/components';

/**
 * 레이아웃 컴포넌트
 *
 * @param {{ children: string }} props
 * @returns {string}
 */
export const Layout = ({ children }) => {
  return /* HTML */ `
    <div class="min-h-screen bg-gray-50">
      ${Header()}
      <main class="max-w-md mx-auto px-4 py-4">${children}</main>
      ${Footer()}
    </div>
  `;
};
