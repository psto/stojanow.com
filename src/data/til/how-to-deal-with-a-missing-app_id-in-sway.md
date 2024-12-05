---
title: "How to deal with a missing app_id in Sway"
date: 2024-07-08 15:06:02+0200
description: "Fix missing `app_id` in Sway in Wayland-native apps like Spotify by creating a desktop file with a `StartupWMClass`."
category: til
tags: linux
---

In [Sway](https://swaywm.org/), some apps have no `app_id` even though they are [Wayland](https://wayland.freedesktop.org/) native. For example, Spotify's [app_id isn't set correctly](https://community.spotify.com/t5/Desktop-Linux/No-window-icon-in-wayland-because-app-id-is-not-correctly-set/td-p/5626427).

One way to fix this is to create a desktop file in your `applications` directory:

```zsh
nvim ~/.local/share/applications/spotify.desktop
```

And set the `StartupWMClass` option:

```desktop
[Desktop Entry]
Type=Application
Name=Spotify
GenericName=Music Player
Icon=spotify-client
Exec=spotify
Terminal=false
MimeType=x-scheme-handler/spotify;
Categories=Audio;Music;Player;AudioVideo;
StartupWMClass=spotify
```

Next, we can configure the app according to our needs in the Sway config:

```sway
for_window [class="Spotify"] move to scratchpad
```

