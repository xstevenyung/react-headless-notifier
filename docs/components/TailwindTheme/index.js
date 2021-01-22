import DemoTheme from './DemoTheme.mdx';
import NotyTheme from './NotyTheme.mdx';
import VueTheme from './VueTheme.mdx';

function Theme({ name }) {
  if (name === 'demo') return <DemoTheme />;
  if (name === 'noty') return <NotyTheme />;
  if (name === 'vue') return <VueTheme />;
  throw new Error(`Theme ${name} doesn't exists.`);
}

export default Theme;
export { DemoTheme, NotyTheme, VueTheme };
