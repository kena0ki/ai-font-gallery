

type Props = {
  fontName: string,
  glyphs: { name: string, unicode: string, d: string } [],
}

export default function SvgFontTemplate({ fontName, glyphs }: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg">
      <defs>
        <font id={fontName} horizAdvX="1000" >
          <font-face fontFamily={fontName} fontWeight="400" fontStretch="normal" unitsPerEm="1000" ascent="850" descent="-150" />
          <missing-glyph horizAdvX="1000" />
          {
            glyphs.map(({ name, unicode, d }) =>
              <glyph horizAdvX="1000" key={unicode} glyphName={name}
                unicode={`&#x${unicode};`} d={d} />
            )
          }
        </font>
      </defs>
    </svg>
  );
}

