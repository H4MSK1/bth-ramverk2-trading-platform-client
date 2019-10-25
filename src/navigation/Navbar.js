import React from 'react';
import { NavLink as ReactRouterNavLink } from 'react-router-dom';
import {
  Container,
  Collapse,
  Navbar as BaseNavbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from 'reactstrap';
import { NavLinks } from './NavLinks';
import { onlyAuth, onlyGuest } from 'api/utils';
import { logout } from 'actions/auth';
import { updateStocks } from 'actions/stocks';
import CurrencySelector from 'components/CurrencySelector';

const Navbar = ({ isOpen = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(isOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(state => !state);

  const NavItemLink = ({
    route: {
      to,
      name,
      exact = false,
      isGuest = false,
      isAuth = false,
      children = [],
      onClick = () => {},
    },
    ...props
  }) => {
    const item = (
      <React.Fragment {...props}>
        {!children.length ? (
          <NavItem>
            <NavLink
              tag={ReactRouterNavLink}
              exact={exact}
              to={to}
              activeClassName="active"
              onClick={onClick}
            >
              {name}
            </NavLink>
          </NavItem>
        ) : (
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              {name}
            </DropdownToggle>
            <DropdownMenu right>
              {children.map((child, index) => (
                <DropdownItem
                  key={index}
                  tag={ReactRouterNavLink}
                  to={child.to}
                >
                  {child.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        )}
      </React.Fragment>
    );

    if (isAuth) {
      return onlyAuth(() => item);
    } else if (isGuest) {
      return onlyGuest(() => item);
    }

    return item;
  };

  return (
    <BaseNavbar
      dark
      expand="md"
      className="bg-primary fixed-top navbar-shadow"
      fixed="top"
    >
      <Container>
        <NavbarBrand tag={ReactRouterNavLink} to="/">
          {process.env.REACT_APP_NAME}
        </NavbarBrand>
        <NavbarToggler onClick={toggleMobileMenu} />
        <Collapse isOpen={isMobileMenuOpen} navbar>
          <Nav className="ml-auto" navbar>
            {NavLinks.map((item, index) => (
              <NavItemLink route={item} key={index} />
            ))}

            {onlyAuth(() => (
              <NavItem>
                <NavLink href="#" onClick={logout}>
                  <b>Sign off</b>
                </NavLink>
              </NavItem>
            ))}

            <NavItem>
              <NavLink>
                <CurrencySelector />
              </NavLink>
            </NavItem>

            <NavItem>
              {/* temporary location of this button */}
              <NavLink>
                <Button
                  onClick={updateStocks}
                  size="sm"
                  outline
                  color="warning"
                >
                  Update Stocks
                </Button>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </BaseNavbar>
  );
};

export default Navbar;
