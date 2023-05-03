import { JSX, Component, useContext, createEffect } from 'solid-js';
import { PageContextProvider, usePageContext } from './usePageContext';
import type { PageContext } from './types';
import type { Store } from 'solid-js/store';
import { Dynamic } from 'solid-js/web';
import { Container, ContainerContext } from './ContainerContext';

export { PageLayout };

interface Props {
  pageContext: Store<PageContext>;
  container: Container;
}

const RenderedOn: Component = () => {
  const ctx = useContext(ContainerContext);
  return <>{ctx.type}</>;
};

const PageLayout: Component<Props> = (props) => {

  createEffect(() => console.log('container changed to', props.container.type));
  return (
    <PageContextProvider pageContext={props.pageContext}>
      <ContainerContext.Provider value={props.container}>
        <h2>Container value: <RenderedOn /></h2>
        <Page />
      </ContainerContext.Provider>
    </PageContextProvider>
  );
};

function Page() {
  const pageContext = usePageContext();
  return (<Dynamic component={pageContext.Page} {...(pageContext.pageProps ?? {})} />);
}

