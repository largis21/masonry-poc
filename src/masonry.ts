export function masonry(nrOfColumns: number, margin: number, minWidth: 768) {
  const masonryRoot = document.getElementById("masonry-root");
  if (!masonryRoot) return;

  const columnHeights: number[] = [];

  const masonryItems = masonryRoot.children as HTMLCollectionOf<HTMLElement>;

  Array.from(masonryItems).forEach((item, index) => {
    if (window.innerWidth < minWidth) {
      item.style.transform = ""
      return
    }

    const column = parseInt(item.getAttribute("data-column-index") || "-1");
    if (column === -1) return;

    const columnHeight = columnHeights[column] || 0;

    requestAnimationFrame(() => {
      // We set the new translate value to the difference of the "wanted" value and the current value
      // If we don't the calculation only works every other calculation
      const matrix = new DOMMatrixReadOnly(window.getComputedStyle(item).transform)
      item.style.transform = `translateY(-${columnHeight - matrix.m42}px)`;
    });

    const nextItemInColumnRect =
      masonryItems[index + nrOfColumns]?.getBoundingClientRect();
    if (!nextItemInColumnRect) {
      return;
    }

    const itemRect = item.getBoundingClientRect();

    const itemBottomY = itemRect.y + itemRect.height;
    const nextItemTopY = nextItemInColumnRect.y;
    const whitespace = nextItemTopY - itemBottomY - margin;

    columnHeights[column] = columnHeight + whitespace;
  });
}
