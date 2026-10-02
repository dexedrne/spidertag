Share card source. Render from this folder:

    chromium --headless=new --user-data-dir=<throwaway dir> --hide-scrollbars --force-device-scale-factor=1 \
      --window-size=1200,630 --virtual-time-budget=3000 --allow-file-access-from-files \
      --screenshot=$PWD/og.png file://$PWD/og.html
    magick og.png -quality 86 ../public/og.jpg

Fonts: Bebas Neue and VT323 (SIL OFL). `icon.html` renders `public/apple-touch-icon.png` the same way at 180x180.
