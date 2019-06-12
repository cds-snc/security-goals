/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";
import { IsReady, GridSingleRelease, Failed, BackIcon } from "../components";
import { theme, mediaQuery } from "../components/styles";
import Layout from "../components/Layout";
import { controlStatus } from "../../api/index";
import { runtimeConfig } from "../config";
import { I18N } from "../components/I18N";

const back = css`
  display: inline-block;
  color: ${theme.colour.black};
  font-size: ${theme.font.md};
`;

const release = css`
  display: inline-block;
  color: ${theme.colour.black};
  font-size: ${theme.font.md};
  float: right;
  padding: 50px 80px 0 0;
`;

const singleReleasePage = css`
  span[name="back-text"] {
    margin-left: ${theme.spacing.xs};
  }
  a[name="back"]:first-of-type {
    margin: ${theme.spacing.xl} 0 0 ${theme.spacing.xxl};
  }

  a[name="back"]:last-of-type {
    margin: ${theme.spacing.lg} 0 3rem ${theme.spacing.xxl};
  }

  ${mediaQuery.lg(css`
    a[name="back"]:first-of-type {
      margin: ${theme.spacing.xl} 0 0 ${theme.spacing.xl};
    }

    a[name="back"]:last-of-type {
      margin: ${theme.spacing.lg} 0 3rem ${theme.spacing.xl};
    }
  `)};
  ${mediaQuery.sm(css`
    a[name="back"]:first-of-type {
      font-size: ${theme.font.sm};
      margin-top: ${theme.spacing.lg};

      svg {
        height: 0;
        display: none;
      }

      span[name="back-text"] {
        margin-left: -0.7rem;
      }
    }

    a[name="back"]:last-of-type {
      font-size: ${theme.font.sm};
      margin-bottom: ${theme.spacing.lg};
    }

    svg {
      height: 0;
      display: none;
    }

    span[name="back-text"] {
      margin-left: -0.7rem;
    }
  `)};
`;

class ReleasePage extends React.Component {
  constructor(props) {
    super(props);
    this.keyHandlerSingleRelease = this.keyHandlerSingleRelease.bind(this);
    this.keyHandlerUL = this.keyHandlerUL.bind(this);
    this.state = { data: [], releaseId: props.match.params.releaseId };
  }

  componentDidMount = async () => {
    const data = await controlStatus(this.props.match.params.releaseId);
    this.setState({ data: data.releases });
  };

  keyHandlerSingleRelease(event) {
    var items = Array.prototype.slice.call(
      document.getElementsByName("control-link")
    );

    var currentItem = document.activeElement;
    var currentItemIndex = items.indexOf(currentItem);
    var nextItem = currentItemIndex;
    var screenWidth = window.innerWidth;

    if (event.key === "ArrowRight") {
      nextItem++;
      if (nextItem >= items.length) {
        nextItem = 0;
      }
      items[nextItem].focus();
    }

    if (event.key === "ArrowLeft") {
      nextItem--;
      if (nextItem < 0) {
        nextItem = items.length - 1;
      }
      items[nextItem].focus();
    }

    if (event.key === "ArrowDown") {
      if (screenWidth <= 1050) {
        nextItem++;
      } else {
        nextItem += 2;
      }

      if (nextItem >= items.length) {
        nextItem = 0;
      }
      items[nextItem].focus();
    }

    if (event.key === "ArrowUp") {
      if (screenWidth <= 1050) {
        nextItem--;
      } else {
        nextItem -= 2;
      }
      if (nextItem < 0) {
        nextItem = items.length - 1;
      }
      items[nextItem].focus();
    }
  }

  keyHandlerUL(event) {
    var items = Array.prototype.slice.call(
      document.getElementsByName("control-link")
    );

    window.onkeydown = function(e) {
      return !(e.key === " ");
    };

    if (event.key === " ") {
      items[0].focus();
    }
  }

  repoLink() {
    const { releaseId } = this.state;
    if (releaseId.includes("-")) {
      const link = `https://github.com/${runtimeConfig.github_repo}/commit/${
        releaseId.split("-")[0]
      }`;
      return (
        <a
          data-testid="release-button"
          name="release"
          href={link}
          css={release}
          target="_blank"
        >
          <span name="view-release">View release on GitHub</span>
        </a>
      );
    } else {
      return false;
    }
  }

  render() {
    const { data, releaseId } = this.state;
    return (
      <Layout pdf={releaseId}>
        <div data-testid="home" css={singleReleasePage}>
          <a
            data-testid="back-button"
            name="back"
            href={`${runtimeConfig.relative_path}/`}
            css={back}
          >
            <BackIcon fill={theme.colour.blackLight} />
            <span name="back-text">
              <I18N t="back-to-home" />{" "}
            </span>
          </a>
          {runtimeConfig.github_repo != "" ? this.repoLink() : null}
          <IsReady data={data} />

          <GridSingleRelease
            keyDownSingleRelease={this.keyHandlerSingleRelease}
            keyDownUL={this.keyHandlerUL}
            releases={data}
            link={true}
            keyDown={this.keyHandler}
          />
          <a
            data-testid="back-button"
            name="back"
            href={`${runtimeConfig.relative_path}/`}
            css={back}
          >
            <BackIcon fill={theme.colour.blackLight} />
            <I18N t="back-to-home" />
          </a>
        </div>
      </Layout>
    );
  }
}
export default ReleasePage;
