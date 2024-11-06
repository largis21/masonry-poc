export function masonry(nrOfColumns: number, margin: number, minWidth: 768) {
  const masonryRoot = document.getElementById("masonry-root");
  if (!masonryRoot) return;

  const columnAccumulated: number[] = [];
  const columnTotalHeight = Array(nrOfColumns).fill(0);

  const masonryItems = masonryRoot.children as HTMLCollectionOf<HTMLElement>;

  Array.from(masonryItems).forEach((item, index) => {
    if (window.innerWidth < minWidth) {
      item.style.transform = "";
      return;
    }

    const column = index % nrOfColumns;

    const columnHeight = columnAccumulated[column] || 0;

    requestAnimationFrame(() => {
      // We set the new translate value to the difference of the "wanted" value and the current value
      // If we don't the calculation only works every other calculation
      const matrix = new DOMMatrixReadOnly(
        window.getComputedStyle(item).transform,
      );
      item.style.transform = `translateY(-${columnHeight - matrix.m42}px)`;
    });

    const itemRect = item.getBoundingClientRect();
    columnTotalHeight[column] += itemRect.height + margin;

    const nextItemInColumnRect =
      masonryItems[index + nrOfColumns]?.getBoundingClientRect();
    if (!nextItemInColumnRect) {
      return;
    }

    const itemBottomY = itemRect.y + itemRect.height;
    const nextItemTopY = nextItemInColumnRect.y;
    const whitespace = nextItemTopY - itemBottomY - margin;

    columnAccumulated[column] = columnHeight + whitespace;
  });

  const highestColumnHeight = columnTotalHeight.sort((a, b) =>
    a > b ? -1 : 0,
  )[0];
  masonryRoot.style.height = `${highestColumnHeight}px`;
}
