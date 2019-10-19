import * as React from "react";
import { useEffect } from "react";
import Grow from "@material-ui/core/Grow";

function usePrevious(value: any) {
  const ref = React.useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current || [];
}

interface ItemProps {
  shown: boolean;
  children: any;
  onCompleteOutAnimation?: VoidFunction;
  onExited: VoidFunction;
  timeout?: { enter?: number; exit?: number };
}
function AnimatedListItem({ shown, children, timeout, onExited }: ItemProps) {
  useEffect(() => {}, [shown]);
  return (
    <Grow in={shown} onExiting={onExited} timeout={timeout}>
      <div>{children}</div>
    </Grow>
  );
}

interface ListProps {
  children: JSX.Element[];
}
export const AnimatedList = ({ children }: ListProps) => {
  const previousChildren: any = usePrevious(children);
  const [removed, setRemoved] = React.useState<{ [index: number]: any }>([]);
  const [removedShown, setRemovedShown] = React.useState<{
    [index: number]: any;
  }>([]);

  const removeChildren = () => {
    const newlyRemoved = previousChildren.filter(
      (c: any) => children.findIndex(oc => oc.key === c.key) === -1
    );
    newlyRemoved.forEach((r: any) => {
      const index = previousChildren.findIndex((rr: any) => r.key === rr.key);
      setRemoved({ ...removed, [index]: r });
      setRemovedShown({ ...removedShown, [index]: r });
      setTimeout(() => {
        delete removedShown[index];
        setRemovedShown({ ...removedShown });
      }, 100);
    });
  };

  useEffect(() => {
    if (previousChildren.length > children.length) {
      removeChildren();
    }
  }, [children]);

  const handleExit = (index: any) => {
    setTimeout(() => {
      console.log("ttttttttt", removed);
      delete removed[index];
      setRemoved({ ...removed });
    }, 300);
  };
  return children.length === 0 && removed[0] ? (
    <AnimatedListItem
      onExited={() => handleExit(0)}
      key={removed[0].key}
      shown={removedShown[0] !== undefined}
      timeout={{ enter: 0 }}
    >
      {removed[0]}
    </AnimatedListItem>
  ) : (
    children.map((Child, i: number) => (
      <>
        {i === 0 && removed[i] && (
          <AnimatedListItem
            onExited={() => handleExit(i)}
            key={removed[i].key}
            shown={removedShown[i] !== undefined}
            timeout={{ enter: 0 }}
          >
            {removed[i]}
          </AnimatedListItem>
        )}
        <AnimatedListItem
          shown={true}
          key={Child.key || i}
          onExited={() => handleExit(Child.key)}
        >
          {Child}
        </AnimatedListItem>
        {removed[i + 1] && (
          <AnimatedListItem
            onExited={() => handleExit(i + 1)}
            key={removed[i + 1].key}
            shown={removedShown[i + 1] !== undefined}
            timeout={{ enter: 0 }}
          >
            {removed[i + 1]}
          </AnimatedListItem>
        )}
      </>
    ))
  );
};
