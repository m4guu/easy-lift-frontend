import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";
import { FixedSizeList } from "react-window";
import {
  FetchNextPageOptions,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";

import { styled } from "@mui/system";

interface InfiniteListProps<T> {
  items: T[];
  Item: ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => JSX.Element;
  isFetchingNextPage: boolean | undefined;
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<UseInfiniteQueryResult>;
  hasNextPage: boolean | undefined;
  itemSize: number;
  customHeight?: number;
}

const InfiniteList = <T,>({
  items,
  Item,
  isFetchingNextPage,
  fetchNextPage,
  hasNextPage,
  itemSize,
  customHeight,
}: InfiniteListProps<T>) => {
  // if there are more items to be loaded then add an extra row to hold a loading indicator
  const itemCount = hasNextPage ? items.length + 1 : items.length;
  const loadMoreItems = isFetchingNextPage ? () => {} : fetchNextPage;
  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = (index: number) => !hasNextPage || index < items.length;

  return (
    <AutoSizer>
      {({ height, width }) => (
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={itemCount}
          loadMoreItems={loadMoreItems}
        >
          {({ onItemsRendered, ref }) => (
            <List
              height={customHeight || height}
              width={width}
              itemCount={itemCount}
              itemSize={itemSize}
              onItemsRendered={onItemsRendered}
              ref={ref}
            >
              {Item}
            </List>
          )}
        </InfiniteLoader>
      )}
    </AutoSizer>
  );
};

const List = styled(FixedSizeList)(({ theme }) => ({
  flexDirection: "column-reverse",
  // Add custom scrollbar styles
  "::-webkit-scrollbar": {
    width: "4px",
    height: "4px",
  },
  "::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "8px",
  },
  "::-webkit-scrollbar-track": {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "8px",
  },
}));

export default InfiniteList;
