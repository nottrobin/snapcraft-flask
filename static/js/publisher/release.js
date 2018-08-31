import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import RevisionsList from './release/revisionsList';
import RevisionsTable from './release/revisionsTable';


const initReleases = (id, data, channelMaps, options) => {

  // init channel data in revisions list
  const revisionsMap = {};
  data.revisions.forEach(rev => {
    rev.channels = [];
    revisionsMap[rev.revision] = rev;
  });

  // go through releases from older to newest
  data.releases.slice().reverse().forEach(release => {
    if (release.revision) {
      const rev = revisionsMap[release.revision];

      if (rev) {
        const channel = release.track === 'latest'
          ? release.risk
          : `${release.track}/${release.risk}`;

        if (rev.channels.indexOf(`${release.track}/${release.risk}`) === -1) {
          rev.channels.push(channel);
        }
      }
    }
  });

  data.revisionsMap = revisionsMap;
  ReactDOM.render(
    <Fragment>
      <RevisionsTable data={data} channelMaps={channelMaps} options={options}/>
      <RevisionsList revisions={data.revisions} />
    </Fragment>,
    document.querySelector(id)
  );
};

export {
  initReleases
};
