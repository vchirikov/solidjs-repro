import { createContextProvider } from "@solid-primitives/context";
import { createResource } from "solid-js";

export interface Container {
  type: string;
};

export const [ContainerContext, useContainer] = createContextProvider(
  (props: { container: Container; }) => {
    const [resource, { refetch }] = createResource<Container>(() => {
      return props.container;
    }, {
      initialValue: props.container,
      ssrLoadFrom: 'server',
      onHydrated: () => { refetch(); },
    });

    return (): Container => resource();
  },
  () => undefined!);
