export function observe() {
  const masonryRoot = document.getElementById("masonry-root");
  if (!masonryRoot) return;
  const masonryItems = masonryRoot.children as HTMLCollectionOf<HTMLElement>;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target.children[0] as HTMLDivElement).style.transform =
            "translateY(0px)";
          (entry.target.children[0] as HTMLDivElement).style.opacity = "1";
        }
      });
    },
    {
      root: null,
      rootMargin: "10px",
      threshold: 0.1
    },
  );

  Array.from(masonryItems).forEach((item) => {
    observer.observe(item);
  });
}
