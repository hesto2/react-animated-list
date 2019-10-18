import * as React from "react";
import { useEffect } from "react";
import Grow from "@material-ui/core/Grow";
import { useArrayStateApi } from "use-state-api-hooks";

// function usePrevious(value: any) {
//   const ref = useRef();
//   useEffect(() => {
//     ref.current = value;
//   });
//   return ref.current;
// }
interface ItemProps {
  shown: boolean;
  children: any;
  index: number;
  onCompleteOutAnimation?: VoidFunction;
}
function AnimatedListItem({ shown, children }: ItemProps) {
  useEffect(() => {}, [shown]);
  return (
    <Grow in={shown}>
      <div>{children}</div>
    </Grow>
  );
}

interface ListProps {
  children: JSX.Element[];
}
export const AnimatedList = ({ children }: ListProps) => {
  // const prevChildren = usePrevious(children);
  const shownChildren = useArrayStateApi<{ item: any; shown: boolean }>([]);

  useEffect(() => {
    console.log(children, shownChildren.state);
    if (!shownChildren.state.length) {
      shownChildren.setState(convertToChildMap(children, true));
    }
    if (shownChildren.state.length > children.length) {
      const removedKeys = shownChildren.state
        .filter((shownChild: any) => {
          return (
            children.findIndex(
              (child: any) => child.key === shownChild.item.key
            ) === -1
          );
        })
        .map(c => c.item.key);
      shownChildren.state.forEach((c, i) => {
        const index = removedKeys.indexOf(c.item.key);
        console.log(removedKeys, c.item.key);
        if (index >= 0) {
          console.log("upsert at", index);
          shownChildren.upsertAt(
            {
              ...shownChildren.state[i],
              shown: false,
            },
            index
          );
        }
      });
    } else if (shownChildren.state.length < children.length) {
      const newChildren = children.filter((child: any) => {
        return (
          shownChildren.state.findIndex(
            (shownChild: any) => child.key === shownChild.item.key
          ) === -1
        );
      });
      console.log(newChildren);
      shownChildren.push(...convertToChildMap(newChildren, true));
    }
  }, [children]);

  return shownChildren.state.map((c, i: number) => (
    <AnimatedListItem shown={c.shown} key={c.item.key || i} index={i}>
      {c.item}
    </AnimatedListItem>
  ));
};

function convertToChildMap(array: any[], shown: boolean) {
  return array.map(item => ({ item, shown }));
}
