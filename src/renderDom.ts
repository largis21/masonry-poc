const getRandomSize = (multiplier: number) =>
  Math.floor((0.5 + Math.random()) * multiplier);

const items = Array(6)
  .fill(0)
  .map(() => {
    const width = getRandomSize(500);
    const height = getRandomSize(300);

    return {
      imageUrl: `https://picsum.photos/${width}/${height}?${Math.random()}`,
      dimensions: {
        width: width,
        height: height,
      },
    };
  });

const renderItem = (
  item: (typeof items)[number],
  row: number,
  column: number,
) => {
  return `
    <div class="h-fit">
      <div class="flex flex-col bg-neutral-200 transition-all duration-500" style="opacity: 0; transform: translateY(40px)">
        <img src="${item.imageUrl}" width=${item.dimensions.width} height=${item.dimensions.height} class="w-full h-auto" />
        <div class="p-4">
          <h4 class="text-2xl">
            Article title
          </h4>
          <p class="mt-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also
          </p>
        </div>
      </div>
    </div>
  `;
};

export function renderDom(margin: number) {
  document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <div 
      id="masonry-root"
      class="md:mx-4 mx-16 md:grid grid-cols-3"
      style="gap: ${margin}px"
    >
      ${items.map((item, index) => renderItem(item, Math.floor(index / 3), index % 3)).join("")}
    </div>
    <div>
      Hello
    </div>
  `;
}
