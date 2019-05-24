/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { theme, mediaQuery } from "../components/styles";
import ReleaseBox from "../components/ReleaseBox";
import { formatTimestamp } from "../util";
import { runtimeConfig } from '../config';

const releases = css`
  margin: ${theme.spacing.xl} ${theme.spacing.xxl} 0 ${theme.spacing.xxl};

  h1 {
    display: inline-block;
    font-size: ${theme.font.xl};
    color: ${theme.colour.blackLight};
    margin: 0;
  }

  ${mediaQuery.lg(css`
    margin: ${theme.spacing.xl} ${theme.spacing.xl} 0 ${theme.spacing.xl};
  `)};

  ${mediaQuery.sm(css`
    h1 {
      font-size: ${theme.font.lg};
    }
  `)};
`;

const releaseList = css`
  padding: 0;
  margin-bottom: ${theme.spacing.xxl};

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }
`;

const Home = ({ keyDownUL, sortedData, keyDownAllReleases }) => {
  return (
    <div css={releases}>
      <h1 data-testid="index-h1" tabIndex="0">
        {" "}
        Latest Releases:{" "}
      </h1>
      <ul
        onKeyDown={keyDownUL}
        css={releaseList}
        tabIndex="0"
        data-testid="release-list"
        aria-label={`This is a list of latest releases, press spacebar to enter the group and use your arrow keys to navigate through the list items.`}
      >
        {sortedData.map((singleRelease, index) => {
          var myDate = Number(singleRelease.timestamp);
          var formattedDate = formatTimestamp(myDate);
          const key = `${singleRelease.release}`;
          return (
            <ReleaseBox
              release={singleRelease.release}
              passed={singleRelease.passed}
              timestamp={formattedDate}
              keyDownAllReleases={keyDownAllReleases}
              passing={singleRelease.passing}
              total={singleRelease.total}
              link={`${runtimeConfig.relative_path}/singlerelease/${key}`}
              key={singleRelease.release}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
