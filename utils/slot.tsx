// Note: This utility has been copied from the Radix UI library.
// Source: https://github.com/radix-ui/primitives/blob/main/packages/react/slot/src/Slot.tsx
// Docs: https://www.radix-ui.com/primitives/docs/utilities/slot

// Note: I have made some modifications to it to make it work with react-native
// If you are facing any issue with merging styles or other props, please look
// into the `mergeProps` function.

import React, { forwardRef } from 'react';

import { composeRefs } from '@/utils/composeRefs';

type AnyProps = Record<string, any>;

type SlotProps = AnyProps & {
  children?: React.ReactNode;
};

const Slot = forwardRef<any, SlotProps>(
  ({ children, ...slotProps }: SlotProps, forwardedRef) => {
    const childrenArray = React.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);

    if (slottable) {
      // the new element to render is the one passed as a child of `Slottable`
      const newElement = slottable.props.children as React.ReactNode;

      const newChildren = childrenArray.map(child => {
        if (child === slottable) {
          // because the new element will be the one rendered, we are only interested
          // in grabbing its children (`newElement.props.children`)
          if (React.Children.count(newElement) > 1)
            return React.Children.only(null);
          return React.isValidElement(newElement)
            ? (newElement.props.children as React.ReactNode)
            : null;
        } else {
          return child;
        }
      });

      return (
        <SlotClone {...slotProps} ref={forwardedRef}>
          {React.isValidElement(newElement)
            ? React.cloneElement(newElement, undefined, newChildren)
            : null}
        </SlotClone>
      );
    }

    return (
      <SlotClone {...slotProps} ref={forwardedRef}>
        {children}
      </SlotClone>
    );
  },
);

Slot.displayName = 'Slot';

/* -------------------------------------------------------------------------------------------------
 * SlotClone
 * -----------------------------------------------------------------------------------------------*/

interface SlotCloneProps {
  children: React.ReactNode;
}

const SlotClone = React.forwardRef<any, SlotCloneProps>(
  (props, forwardedRef) => {
    const { children, ...slotProps } = props;

    if (React.isValidElement(children)) {
      const childrenRef = getElementRef(children);
      return React.cloneElement(children, {
        ...mergeProps(slotProps, children.props),
        // @ts-ignore
        ref: forwardedRef
          ? composeRefs(forwardedRef, childrenRef)
          : childrenRef,
      });
    }

    return React.Children.count(children) > 1
      ? React.Children.only(null)
      : null;
  },
);

SlotClone.displayName = 'SlotClone';

/* -------------------------------------------------------------------------------------------------
 * Slottable
 * -----------------------------------------------------------------------------------------------*/

const Slottable = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

/* ---------------------------------------------------------------------------------------------- */

function isSlottable(child: React.ReactNode): child is React.ReactElement {
  return React.isValidElement(child) && child.type === Slottable;
}

function mergeProps(slotProps: AnyProps, childProps: AnyProps) {
  // all child props should override
  const overrideProps = { ...childProps };

  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];

    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      // if the handler exists on both, we compose them
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args: unknown[]) => {
          childPropValue(...args);
          slotPropValue(...args);
        };
      }
      // but if it exists only on the slot, we use only this one
      else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    }
    // if it's `style`, we merge them
    // !!Attention: if there's any other style prop, you can merge it here
    else if (
      propName === 'style' ||
      propName === 'contentContainerStyle' ||
      propName === 'imageStyle'
    ) {
      overrideProps[propName] = mergeStyles(slotPropValue, childPropValue);
    } else if (propName === 'className') {
      overrideProps[propName] = [slotPropValue, childPropValue]
        .filter(Boolean)
        .join(' ');
    }
  }

  return { ...slotProps, ...overrideProps };
}

function mergeStyles(slotProp: any, childProp: any) {
  // Style prop can be an object or a function (like Pressable's style prop)
  const isSlotPropFunction = typeof slotProp === 'function';
  const isChildPropFunction = typeof childProp === 'function';
  // If one of the style prop is a function
  // it means the style prop of the component accepts a function, so we must return a function
  if (isSlotPropFunction || isChildPropFunction) {
    return (...args: unknown[]) => [
      isSlotPropFunction ? slotProp(...args) : slotProp,
      isChildPropFunction ? childProp(...args) : childProp,
    ];
  }
  return [slotProp, childProp];
}

// Before React 19 accessing `element.props.ref` will throw a warning and suggest using `element.ref`
// After React 19 accessing `element.ref` does the opposite.
// https://github.com/facebook/react/pull/28348
//
// Access the ref using the method that doesn't yield a warning.
function getElementRef(element: React.ReactElement) {
  // React <=18 in DEV
  let getter = Object.getOwnPropertyDescriptor(element.props, 'ref')?.get;
  let mayWarn = getter && 'isReactWarning' in getter && getter.isReactWarning;
  if (mayWarn) {
    return (element as any).ref;
  }

  // React 19 in DEV
  getter = Object.getOwnPropertyDescriptor(element, 'ref')?.get;
  mayWarn = getter && 'isReactWarning' in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }

  // Not DEV
  return element.props.ref || (element as any).ref;
}

export { Slot, Slottable };
