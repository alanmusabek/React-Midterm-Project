const colors = {
  "Paper & print": ["#efe6d7", "#c3855d", "#fffaf1", "#254e40"],
  Drawing: ["#e7e9dd", "#6f8c70", "#faf8ec", "#b46848"],
  Photography: ["#e3e9ed", "#7592a3", "#f9f3e4", "#2b475a"],
  Nature: ["#e0e9df", "#61866b", "#f5ebd6", "#355944"],
  "Digital making": ["#e6e4ef", "#8d82b0", "#faf6eb", "#50466a"],
  Writing: ["#f1e4d6", "#bc9164", "#fffaf0", "#69513a"],
};

// Local vector artwork keeps the catalog complete offline, with no image API.
export default function ProjectArt({ category, variant = 0, hero = false }) {
  const [bg, accent, paper, ink] = colors[category] || colors["Paper & print"];
  return (
    <svg
      className={`project-art ${hero ? "hero-art" : ""}`}
      viewBox="0 0 420 240"
      role="img"
      aria-label={`${category} project illustration`}
    >
      <rect width="420" height="240" fill={bg} />
      <circle
        cx={variant % 2 ? 100 : 325}
        cy="66"
        r="60"
        fill={accent}
        opacity=".12"
      />
      <path d="M20 213h380" stroke={ink} strokeWidth="1" opacity=".12" />
      {category === "Paper & print" && (
        <g transform={`translate(${variant % 2 ? 5 : -8} 0)`}>
          <path d="m115 59 144-19 28 146-145 19Z" fill={accent} />
          <path
            d="m124 46 145-5 7 146-146 6Z"
            fill={paper}
            stroke={ink}
            strokeWidth="2"
          />
          <path
            d="m144 65 8 128M162 81l80-3m-79 20 79-3m-78 20 65-2"
            stroke={ink}
            strokeWidth="2"
            opacity=".35"
          />
          <path d="m202 155 36-39 29 38Z" fill={accent} opacity=".6" />
          <circle cx="220" cy="107" r="10" fill="#e7be72" />
          <g transform="rotate(28 303 140)">
            <rect x="298" y="70" width="10" height="122" rx="2" fill={ink} />
            <path d="m298 192 5 14 5-14" fill={accent} />
            <path d="M303 76v110" stroke={paper} opacity=".5" />
          </g>
        </g>
      )}
      {category === "Drawing" && (
        <g>
          <path
            d="m111 36 180 12-13 157-180-12Z"
            fill={paper}
            stroke={ink}
            strokeWidth="2"
          />
          <path
            d="M139 167c-5-41 38-28 30-66s48-32 51 2-26 27-15 54M132 170l109 7M169 140c21-14 38-12 58 3"
            fill="none"
            stroke={accent}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path d="m280 174 43-106 9 4-43 106-9 6Z" fill={ink} />
          <circle cx="316" cy="190" r="14" fill={accent} opacity=".5" />
        </g>
      )}
      {category === "Photography" && (
        <g>
          <path
            d="m88 50 122-13 13 151-122 13Z"
            fill={paper}
            stroke={ink}
            strokeWidth="2"
          />
          <path d="m101 65 98-10 10 99-98 11Z" fill={accent} opacity=".5" />
          <path d="m111 165 29-61 27 25 23-39 19 64Z" fill={ink} opacity=".6" />
          <circle cx="128" cy="86" r="12" fill={paper} />
          <rect x="218" y="96" width="123" height="86" rx="13" fill={ink} />
          <path d="m237 96 12-16h36l12 16" fill={ink} />
          <circle cx="277" cy="139" r="30" fill={accent} />
          <circle cx="277" cy="139" r="21" fill={ink} />
          <circle cx="271" cy="132" r="8" fill={paper} opacity=".55" />
          <rect x="316" y="107" width="14" height="7" rx="2" fill={paper} />
        </g>
      )}
      {category === "Nature" && (
        <g>
          <path
            d="M155 88h110l12 102q0 15-22 15h-90q-22 0-22-15Z"
            fill={paper}
            fillOpacity=".6"
            stroke={ink}
            strokeWidth="2"
          />
          <path
            d="m147 168 126-1 4 24q0 14-22 14h-90q-22 0-22-14Z"
            fill={accent}
            opacity=".7"
          />
          <path
            d="M209 172v-66m0 35c-30-1-44-16-38-38 27-1 38 18 38 38Zm0-17c0-30 15-47 37-41 3 25-13 41-37 41Z"
            stroke={ink}
            strokeWidth="2"
            fill={accent}
          />
          <path
            d="M149 88h122"
            stroke={ink}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M99 188c-20-24-14-38 5-42 20 12 23 29-5 42Zm212-57c-16-28-11-44 13-46 19 20 16 36-13 46Z"
            fill={accent}
            opacity=".7"
          />
          <circle cx="113" cy="69" r="21" fill="#e6c684" />
        </g>
      )}
      {category === "Digital making" && (
        <g>
          <rect x="100" y="43" width="220" height="144" rx="9" fill={ink} />
          <rect x="109" y="53" width="202" height="123" rx="2" fill={paper} />
          <path d="M109 73h202" stroke={accent} />
          <circle cx="120" cy="63" r="2" fill={accent} />
          <circle cx="129" cy="63" r="2" fill={accent} />
          <circle cx="138" cy="63" r="2" fill={accent} />
          <rect
            x="125"
            y="89"
            width="65"
            height="70"
            rx="4"
            fill={accent}
            opacity=".5"
          />
          <path
            d="m203 98 19 10-19 10m34-19 18 9-18 10M203 137h76m-76 12h50"
            stroke={ink}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="m100 187-22 15q-4 7 10 7h244q14-1 10-7l-22-15Z"
            fill={accent}
          />
          <path d="M182 199h56" stroke={ink} strokeWidth="2" />
        </g>
      )}
      {category === "Writing" && (
        <g>
          <path d="m111 44 172 9-8 151-172-9Z" fill={accent} />
          <path
            d="m122 36 166 13-11 143-166-13Z"
            fill={paper}
            stroke={ink}
            strokeWidth="2"
          />
          <path
            d="m143 67 112 8m-114 13 109 8m-111 14 84 6m-86 15 111 9m-112 13 75 6"
            stroke={ink}
            strokeWidth="2"
            opacity=".4"
          />
          <path d="m284 175 25-110 11 2-25 110-8 14Z" fill={ink} />
          <path d="m314 68-11 48" stroke={paper} strokeWidth="2" />
          <path d="M79 192q-18-18 2-32 20 11-2 32Z" fill={accent} />
        </g>
      )}
      <path
        d="M35 41h10m-5-5v10M373 188h10m-5-5v10"
        stroke={ink}
        opacity=".3"
        strokeWidth="1.5"
      />
    </svg>
  );
}
