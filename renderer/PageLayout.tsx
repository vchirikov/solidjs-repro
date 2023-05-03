import { Component } from 'solid-js';
import { PageContextProvider, usePageContext } from './usePageContext';
import type { PageContext } from './types';
import type { Store } from 'solid-js/store';
import { Dynamic } from 'solid-js/web';
import { Container, ContainerContext, useContainer } from './ContainerContext';

export { PageLayout };

interface Props {
  pageContext: Store<PageContext>;
  container: Container;
}

const RenderedOn: Component = () => {
  const container = useContainer()!;
  return <>{container().type ?? 'uninitialized'}</>;
};

const PageLayout: Component<Props> = (props) => {

  return (
    <PageContextProvider pageContext={props.pageContext}>
      {console.log("render", props.container) == null ? '' : ''}
      <ContainerContext container={props.container}>
        <h2>Container value: <RenderedOn /></h2>
        <Page />
      </ContainerContext>
    </PageContextProvider>
  );
};

function Page() {
  const pageContext = usePageContext();
  return (<Dynamic component={pageContext.Page} {...(pageContext.pageProps ?? {})} />);
}

