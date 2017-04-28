import styled from 'styled-components';
import { Link } from 'react-router';

const Logo = styled(Link)`
  font-weight: bold;
  text-transform: uppercase;
  border-bottom: 2px solid #fff;
  // color: rgba(0, 0, 0, 0.4);
  font-size: 14px;
  letter-spacing: 0.1em;
  margin-top: 20px;
  margin-bottom: 20px;
  display: inline-block;
`;

export default Logo;
