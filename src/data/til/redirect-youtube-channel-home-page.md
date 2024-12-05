---
title: "Redirect YouTube channel's home page"
date: 2024-07-12 18:18:51+0200
description: "Avoid the useless YouTube channel home page and go directly to videos."
category: til
tags: email
---

I find a YouTube channel's "home"/"featured" page useless. Almost always I want to see the most recent videos of a channel. For this reason I created the following [userscript](https://greasyfork.org/en/scripts/500460-redirect-youtube-channel-to-videos) ([GitHub](https://github.com/psto/userscript-redirect-youtube-channel-to-videos)) to redirect directly to the `/videos` tab: 


```javascript
(function () {
    const excludedPaths = ['/community', '/live', '/playlists', '/podcasts', '/shorts', '/streams'];

    const currentPath = window.location.pathname;
    const channelMatch = currentPath.match(/^\/@([^/]+)/);

    if (channelMatch) {
        const channelName = channelMatch[1];
        const shouldRedirect = !excludedPaths.some(path => currentPath.startsWith(`/@${channelName}${path}`));
        if (shouldRedirect && !currentPath.endsWith('/videos') || currentPath.endsWith('/featured')) {
            window.location.href = `https://www.youtube.com/@${channelName}/videos`;
        }
    }
})();

```
The script triggers when you visit any channel e.g. `youtube.com/@channelname` or `youtube.com/@channelname/featured`. It will not redirect from the following paths: `'/community'`, `'/live'`, `'/playlists'`, `'/podcasts'`, `'/shorts'`, `'/streams'`.
