import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import OverlayText from './OverlayText';

export const OVERLAY_LOAD_KEY = 'overlayLoad';

export const hasGovernmentUsageConsent = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    return window.localStorage?.getItem(OVERLAY_LOAD_KEY) === 'true';
  } catch (error) {
    return false;
  }
};

const persistGovernmentUsageConsent = () => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage?.setItem(OVERLAY_LOAD_KEY, 'true');
  } catch (error) {
    // Storage may be disabled or unavailable. Consent still applies to the current page.
  }
};

const OverlayWindowRoot = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  font-family: 'Roboto', 'Lato', 'Inter', sans-serif;
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  background-color: #00000047;
  pointer-events: none;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 770px;
`;

const Dialog = styled.div`
  width: 100%;
  height: 620px;
  max-height: calc(100vh - 64px);
  border-radius: 5px;
  background-color: #ffffff;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  padding: 15px 15px 15px 0;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 22px;
  color: #000000;
  font-weight: 500;
  line-height: 1.6;
  letter-spacing: 0.0075em;
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: #e0e0e0;
`;

const Content = styled.div`
  padding: 20px 0 12px;
  color: #000000;
  font-size: 14px;
  flex: 1;
  min-height: 0;
  overflow: auto;
  letter-spacing: 0.00938em;
`;

const Paragraph = styled.p`
  font-size: 14px;
  color: #000000;
  margin: 0 0 10px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const Consent = styled.p`
  font-size: 14px;
  color: #000045;
  margin: -0.5px 0 10px;
  letter-spacing: 0.14994px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0 8px 0 0;
  list-style: none;
  font-size: 14px;
`;

const ListItem = styled.li`
  display: flex;
  align-items: flex-start;
  font-size: 14px;
  padding: 3px 0 0 26px;
  margin-top: 7px;

  &:first-child {
    margin-top: -7.5px;
  }
`;

const Bullet = styled.span`
  display: inline-block;
  margin: 7px 11.5px 0 0;
  height: 5.5px;
  width: 5.5px;
  min-width: 5.5px;
  border-radius: 50%;
  background-color: #000000;
  flex-shrink: 0;
`;

const Actions = styled.div`
  height: 75px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 30px 10px 25px 0;
`;

const Button = styled.button`
  width: 133px;
  height: 35px;
  background-color: #337ab7;
  color: #ffffff;
  text-transform: none;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  font-family: 'Roboto', 'Lato', 'Inter', sans-serif;
  font-size: 0.875rem;
  line-height: 1.6;
  letter-spacing: 0.02857em;
  cursor: pointer;

  &:hover {
    background-color: #2e6da4;
  }
`;

/**
 * Provides the Government Usage Warning banner and related logic.
 *
 * @param {object} props Component properties.
 * @param {boolean|null} props.consentRequired Controls initial visibility when provided.
 * @param {Function} props.onContinue Called after the user consents for the current page.
 * @returns The Government Usage banner component, conditionally rendered based on local storage.
 */
const OverlayWindow = ({ consentRequired, onContinue }) => {
  const [open, setOpen] = useState(() => (
    consentRequired === null ? !hasGovernmentUsageConsent() : consentRequired
  ));

  const handleClose = () => {
    persistGovernmentUsageConsent();
    setOpen(false);
    onContinue();
  };

  const content = useMemo(() => OverlayText.content.map((item) => (
    <Paragraph key={item.substring(0, 30)}>
      {item}
    </Paragraph>
  )), []);

  const list = useMemo(() => OverlayText.list.map((item) => (
    <ListItem
      key={item.substring(0, 30)}
    >
      <Bullet />
      <span>{item}</span>
    </ListItem>
  )), []);

  if (!open) {
    return null;
  }

  return (
    <OverlayWindowRoot
      role="dialog"
      aria-labelledby="government-usage-dialog-title"
      aria-modal="true"
    >
      <Backdrop />
      <Container>
        <Dialog>
          <Header>
            <Title id="government-usage-dialog-title">
              Warning
            </Title>
          </Header>
          <Divider />
          <Content>
            {content}
            <Consent>
              By using this system, you understand and consent to the following:
            </Consent>
            <List>
              {list}
            </List>
          </Content>
          <Divider />
          <Actions>
            <Button
              type="button"
              onClick={handleClose}
            >
              Continue
            </Button>
          </Actions>
        </Dialog>
      </Container>
    </OverlayWindowRoot>
  );
};

OverlayWindow.propTypes = {
  consentRequired: PropTypes.bool,
  onContinue: PropTypes.func,
};

OverlayWindow.defaultProps = {
  consentRequired: null,
  onContinue: () => {},
};

export default OverlayWindow;
