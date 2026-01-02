import styled from "styled-components";
import { CenteredColumn } from "./sharedStyles";

export const AppContainer = styled(CenteredColumn)`
  min-height: 100vh;
  background-color: #282c34;
  color: white;
`;

export const AppHeader = styled.header`
  font-size: 2rem;
  margin-top: 1rem;
  color: #61dafb;
`;
