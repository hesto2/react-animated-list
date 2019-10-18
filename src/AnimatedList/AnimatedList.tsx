import * as React from "react";
import { useEffect, useState } from "react";
import Grow from "@material-ui/core/Grow";

// function usePrevious(value: any) {
//   const ref = React.useRef();
//   useEffect(() => {
//     ref.current = value;
//   });
//   return ref.current;
// }

interface ItemProps {
  shown: boolean;
  children: any;
  onCompleteOutAnimation?: VoidFunction;
  onExited: VoidFunction;
}
function AnimatedListItem({ shown, children, onExited }: ItemProps) {
  useEffect(() => {}, [shown]);
  return (
    <Grow in={shown} unmountOnExit={true} onExited={onExited}>
      <div>{children}</div>
    </Grow>
  );
}

interface ListProps {
  children: JSX.Element[];
}
export const AnimatedList = ({ children }: ListProps) => {
  // const previousChildren = usePrevious(children);
  const [hiddenChildren, setHiddenChildren] = useState<any[]>([] as any);
  const [shownChildren, setShownChildren] = useState<any[]>([] as any);

  const addChildren = () => {
    const newChildren = children.filter(
      c => shownChildren.findIndex(sc => sc.key === c.key) === -1
    );
    true;
    setShownChildren([...shownChildren, ...newChildren]);
  };

  const removeChildren = () => {
    const keys: any[] = [];
    shownChildren.forEach(sc => {
      if (children.findIndex(c => c.key === sc.key) === -1) {
        keys.push(sc.key);
      }
    });

    setHiddenChildren([...hiddenChildren, ...keys]);
  };

  useEffect(() => {
    if (shownChildren.length < children.length) {
      addChildren();
    } else if (shownChildren.length > children.length) {
      removeChildren();
    }
  }, [children]);

  const handleExit = (key: any) => {
    console.log("exit", key);
  };
  return shownChildren.map((Child, i: number) => (
    <AnimatedListItem
      shown={hiddenChildren.indexOf(Child.key) === -1}
      key={Child.key || i}
      onExited={() => handleExit(Child.key)}
    >
      {Child}
    </AnimatedListItem>
  ));
};
