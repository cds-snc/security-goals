import { css } from "emotion";
import { theme, mediaQuery } from "../components/styles";
import React from "react";
import { UpArrowCircle } from "../components/icons/UpArrowCircle";
import { MainDescription } from "./";

const collapse = css`
  display: none;
`;

const collapseIn = css`
  display: block;
`;

const arrowUp = css`
  svg {
    margin-bottom: -${theme.spacing.xxs};
    width: 1rem;
    height: 1rem;
    transform: rotate(180deg);
  }
`;

const arrowDown = css`
  svg {
    margin-bottom: -${theme.spacing.xxs};
    width: 1rem;
    height: 1rem;
  }
`;

const toggleContainer = css`
  cursor: pointer;
`;

const container = css`
  border: 1px solid ${theme.colour.grayOutline};
  background: ${theme.colour.white};
  padding: ${theme.spacing.lg};
  line-height: 1.6rem;
  margin-bottom: ${theme.spacing.xl};
  h1[name="collapsible-h1"] {
    margin-top: 0;
    color: ${theme.colour.blackLight};
    margin-bottom: ${theme.spacing.md};
    width: 100%;
    font-size: ${theme.font.xl};
  }

  ${mediaQuery.sm(css`
    h1[name="collapsible-h1"] {
      font-size: ${theme.font.lg};
    }
  `)};
`;

const toggle = css`
  p {
    font-size: ${theme.font.md};
    margin: 0;
    margin-right: 10px;
    font-weight: 700;
    color: ${theme.colour.blackLight};
  }
  width: 100%;
  display: flex;
  align-items: center;
`;

export class Collapsible extends React.Component {
  constructor() {
    super();

    // Initial state
    this.state = { open: false };
  }

  toggle() {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    const { title, description, control } = this.props;
    return (
      <div>
        <div className={container}>
          <div className={toggleContainer}>
            <h1 name="collapsible-h1">{title}</h1>
            <div className={this.state.open ? collapseIn : collapse}>
              <MainDescription description={description} />
            </div>

            {this.state.open ? (
              <div className={toggle} onClick={this.toggle.bind(this)}>
                <p>Hide the {control} description</p>
                <span className={arrowDown}>
                  <UpArrowCircle />
                </span>
              </div>
            ) : (
              <div className={toggle} onClick={this.toggle.bind(this)}>
                <p>Read the {control} description</p>
                <span className={arrowUp}>
                  <UpArrowCircle />
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
