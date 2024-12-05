---
title: "Translate Scanned Documents with Ease"
date: 2024-08-31 09:17:22+0200
description: "Use this handy script to select an image area and get an instant translation. No more transcribing text from PDF images!"
category: til
tags: image
---

I sometimes need to translate text from scanned PDFs, which can be a hassle. So, I created this little [script](https://github.com/psto/.dotfiles/blob/main/scripts/.local/bin/translate-image) that's a translation ninja:

```bash
#!/bin/sh
IMAGE=/tmp/"$(date +%Y%m%d-%H%M%S)".png
grim -g "$(slurp)" "$IMAGE"
TRANSLATED="$(tesseract "$IMAGE" - -l swe | trans --indent 0 --brief :en --no-bidi)"
foot -H -a floating -e echo "$TRANSLATED"
rm -rf "$IMAGE"
```

Here's how it works:

- Select the area: make a global shortcut ([mine in Sway](https://github.com/psto/.dotfiles/blob/main/sway/.config/sway/bindsym)) to choose the part of the PDF you want to translate with [slurp](https://github.com/emersion/slurp).
- OCR magic: [Tesseract](https://github.com/tesseract-ocr/tessdata) scans the selected area and converts it into text.
- Translate: get a quick and accurate translation with Google Translate via [translate-shell](https://github.com/soimort/translate-shell).
- Terminal bliss: You get a [foot terminal](https://codeberg.org/dnkl/foot) window with the translated text screen.

It's like having a personal translator at your fingertips. No more transcribing text from PDF images.
