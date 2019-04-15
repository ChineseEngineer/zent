import {
  IUseField,
  FieldModel,
  useField as superUseField,
  IFieldMeta,
  IValidator,
  IErrors,
} from 'formulr';
import { useRef, useMemo, ReactNode } from 'react';

export function noopMapEventToValue<T>(e: T) {
  return e;
}

export interface IRenderError<T> {
  (errors: IErrors<T>): ReactNode;
}

export interface IFormFieldViewDrivenProps<T> {
  name: string;
  defaultValue?: T | (() => T);
  required?: boolean;
  validators?: Array<IValidator<T>>;
}

export interface IFormFieldModelDrivenProps<T> {
  model: FieldModel<T>;
}

export type IFormFieldModelProps<T> =
  | IFormFieldViewDrivenProps<T>
  | IFormFieldModelDrivenProps<T>;

export interface IFormComponentCommonPropsBase<T> {
  renderError?: IRenderError<T>;
}

export type IFormFieldCommonProps<T> = IFormFieldModelProps<T> &
  IFormComponentCommonPropsBase<T>;

export interface IZentFormChildProps<Value, Event> {
  value: Value;
  onChange(e: Event): void;
  onFocus: React.FocusEventHandler;
  onBlur: React.FocusEventHandler;
  onCompositionStart: React.CompositionEventHandler;
  onCompositionEnd: React.CompositionEventHandler;
}

interface IFormFieldSharedProps<Value, Event = Value> {
  onChange(e: Event): void;
  onFocus: React.FocusEventHandler;
  onBlur: React.FocusEventHandler;
  onCompositionStart: React.CompositionEventHandler;
  onCompositionEnd: React.CompositionEventHandler;
  defaultValue: Value;
  name: string;
  model: FieldModel<Value>;
}

export type IZentUseField<Value, Event> = [
  IZentFormChildProps<Value, Event>,
  IFieldMeta<Value>,
  FieldModel<Value>
];

function mapDefaultValue<Value, Event>(
  props: Partial<IFormFieldSharedProps<Value, Event>>,
  defaultDefaultValue: Value | (() => Value)
): Value {
  const maybeFactory = props.defaultValue || defaultDefaultValue;
  if (typeof maybeFactory === 'function') {
    return (maybeFactory as (() => Value))();
  }
  return maybeFactory;
}

export function useField<Value, Event = Value>(
  props: Partial<IFormFieldSharedProps<Value, Event>>,
  defaultDefaultValue: Value | (() => Value),
  mapEventToValue: (e: Event) => Value
): IZentUseField<Value, Event> {
  let field: IUseField<Value>;
  if (props.name) {
    field = superUseField<Value>(
      props.name,
      mapDefaultValue(props, defaultDefaultValue)
    );
  } else {
    field = superUseField<Value>(props.model as FieldModel<Value>);
  }
  const [childProps, meta, model] = field;
  const propsRef = useRef(props);
  propsRef.current = props;
  const proxy = useMemo<IZentFormChildProps<Value, Event>>(
    () => ({
      value: childProps.value,
      onChange(e) {
        const value = mapEventToValue(e);
        childProps.onChange(value);
        const { onChange } = propsRef.current;
        onChange && onChange(e);
      },
      onFocus(e) {
        childProps.onFocus(e);
        const { onFocus } = propsRef.current;
        onFocus && onFocus(e);
      },
      onBlur(e) {
        childProps.onBlur(e);
        const { onBlur } = propsRef.current;
        onBlur && onBlur(e);
      },
      onCompositionStart(e) {
        childProps.onCompositionStart(e);
        const { onCompositionStart } = propsRef.current;
        onCompositionStart && onCompositionStart(e);
      },
      onCompositionEnd(e) {
        childProps.onCompositionEnd(e);
        const { onCompositionEnd } = propsRef.current;
        onCompositionEnd && onCompositionEnd(e);
      },
    }),
    [childProps]
  );
  proxy.value = childProps.value;
  return [proxy, meta, model];
}
