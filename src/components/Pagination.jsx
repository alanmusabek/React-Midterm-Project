import Icon from "./Icon";
export default function Pagination({ page, pages, onChange }) {
  if (pages <= 1) return null;
  const visible = [...new Set([1, page - 1, page, page + 1, pages])]
    .filter((n) => n >= 1 && n <= pages)
    .sort((a, b) => a - b);
  return (
    <nav className="pagination" aria-label="Project pages">
      <button
        aria-label="Previous page"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      >
        <Icon name="back" size={17} />
      </button>
      <div>
        {visible.map((n, i) => (
          <span key={n}>
            {i > 0 && n - visible[i - 1] > 1 && (
              <span className="ellipsis">…</span>
            )}
            <button
              aria-label={`Page ${n}`}
              aria-current={page === n ? "page" : undefined}
              onClick={() => onChange(n)}
            >
              {n}
            </button>
          </span>
        ))}
      </div>
      <button
        aria-label="Next page"
        disabled={page === pages}
        onClick={() => onChange(page + 1)}
      >
        <Icon name="arrow" size={17} />
      </button>
    </nav>
  );
}
