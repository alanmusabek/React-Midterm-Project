const paths = {
  flask:
    "M9 3h6M10 3v6L4 19a1.3 1.3 0 0 0 1.2 2h13.6a1.3 1.3 0 0 0 1.2-2L14 9V3M7 15h10",
  search: "m21 21-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0",
  arrow: "M4 12h16m-6-6 6 6-6 6",
  back: "M20 12H4m6-6-6 6 6 6",
  bookmark: "M6 3h12v18l-6-4-6 4V3Z",
  clock: "M12 8v5l3 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0",
  plus: "M12 5v14M5 12h14",
  close: "m6 6 12 12M6 18 18 6",
  grid: "M3 3h7v7H3V3ZM14 3h7v7h-7V3ZM3 14h7v7H3v-7ZM14 14h7v7h-7v-7Z",
  sliders: "M4 7h16M4 17h16M8 4v6M16 14v6",
  check: "m5 12 4 4L19 6",
  spark: "m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z",
  info: "M12 11v6M12 7h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0",
  leaf: "M20 4C8 1 2 8 5 15s14 6 15-11ZM4 21 15 10",
  paper: "M5 3h10l4 4v14H5V3ZM15 3v5h4M8 12h8M8 16h6",
  pencil: "m15 3 6 6L8 22H2v-6L15 3ZM12 6l6 6M2 16l6 6",
  camera: "M8 5 10 2h4l2 3h5v16H3V5h5ZM17 13a5 5 0 1 1-10 0 5 5 0 0 1 10 0",
  code: "m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18",
  pen: "M5 20h14M15 3l6 6-9 9-7 1 1-7 9-9ZM12 6l6 6",
};
export default function Icon({ name, size = 20, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={paths[name] || paths.spark} />
    </svg>
  );
}
export const categoryIcon = {
  "Paper & print": "paper",
  Drawing: "pencil",
  Photography: "camera",
  Nature: "leaf",
  "Digital making": "code",
  Writing: "pen",
};
