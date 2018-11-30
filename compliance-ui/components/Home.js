import { Grid, IsReady, Failed } from "./";
import { css } from "emotion";
import { theme, mediaQuery } from "./styles";
import ActionBar from "./ActionBar";
import React from "react";

const actions = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.lg} ${theme.spacing.xxxl} ${theme.spacing.md}
    ${theme.spacing.xxxl};

  h2 {
    margin: 0;
    color: ${theme.colour.black};
    font-size: ${theme.font.xl};
    font-weight: 700;
  }

  ${mediaQuery.xl(css`
    padding: ${theme.spacing.lg} ${theme.spacing.xxl} ${theme.spacing.md}
      ${theme.spacing.xxl};
  `)};

  ${mediaQuery.lg(css`
    padding: ${theme.spacing.lg} ${theme.spacing.lg} ${theme.spacing.md}
      ${theme.spacing.lg};

    h2 {
      font-size: 18pt;
    }
  `)};

  ${mediaQuery.sm(css`
    padding: ${theme.spacing.lg} ${theme.spacing.lg} ${theme.spacing.md}
      ${theme.spacing.lg};

    h2 {
      font-size: ${theme.font.lg};
    }
  `)};
`;

const actionsBottom = css`
  padding: ${theme.spacing.lg} ${theme.spacing.xxxl} ${theme.spacing.xl}
    ${theme.spacing.xxxl};

  ${mediaQuery.xl(css`
    padding: ${theme.spacing.xl} ${theme.spacing.xxl};
  `)};

  ${mediaQuery.lg(css`
    padding: ${theme.spacing.xl} ${theme.spacing.xl};
  `)};

  ${mediaQuery.sm(css`
    display: flex;
    justify-content: flex-end;
    padding: ${theme.spacing.lg} ${theme.spacing.lg};
  `)};
`;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }
  clickHandler() {
    this.statusRef.focus();
  }
  render() {
    const { data, err } = this.props;
    if (err) {
      return <Failed />;
    }
    return (
      <div data-testid="home">
        <IsReady
          data={data}
          statusRef={statusRef => {
            this.statusRef = statusRef;
          }}
        />
        <div className={actions}>
          <h2>Verifications:</h2>
          <ActionBar />
        </div>
        <Grid controls={data} link={true} />
        <div className={actionsBottom}>
          <ActionBar click={this.clickHandler} backToTop={true} />
        </div>
      </div>
    );
  }
}
export default Home;
