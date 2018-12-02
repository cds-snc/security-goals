import { Grid, IsReady, Failed, ActionBar } from "./";
import { css } from "emotion";
import { theme, mediaQuery } from "./styles";
import React from "react";

const actions = css`
  width: 100%;

  span {
    padding-bottom: ${theme.spacing.lg};
  }

  svg {
    margin-bottom: ${theme.spacing.lg};
  }

  ${mediaQuery.lg(css`
    span {
      padding-bottom: ${theme.spacing.lg};
    }

    svg {
      margin-bottom: ${theme.spacing.lg};
    }
  `)};

  ${mediaQuery.sm(css`
    div[name="action-bar"] {
      padding-top: 0;
    }
    span {
      padding-bottom: ${theme.spacing.sm};
      padding-top: ${theme.spacing.sm};
    }

    svg {
      display: none;
    }
  `)};
`;

const actionsBottom = css`
  margin-top: ${theme.spacing.xl};
  svg {
    fill: ${theme.colour.white};
  }

  span {
    margin: ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md} 0;
    color: ${theme.colour.white};
    text-decoration: underline;
  }

  ${mediaQuery.sm(css`
    a[name="print-button"] {
      display: none;
    }
  `)}
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
        <div className={actions}>
          <ActionBar />
        </div>
        <IsReady
          data={data}
          statusRef={statusRef => {
            this.statusRef = statusRef;
          }}
        />

        <Grid controls={data} link={true} />
        <div className={actionsBottom}>
          <ActionBar click={this.clickHandler} backToTop={true} />
        </div>
      </div>
    );
  }
}
export default Home;
