import { createContext } from "solid-js";

export interface Container {
  type: string;
}

export const ContainerContext = createContext<Container>({ type: 'base' });