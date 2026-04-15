import {renderHook, act} from '@testing-library/react-native';
import {useDebouncedValue} from '../../src/hooks//useDebouncedValue';

describe('useDebouncedValue', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return initial value immediately', () => {
    const {result} = renderHook(() => useDebouncedValue('hello world', 500));
    expect(result.current.debouncedValue).toBe('hello world');
  });

  it('should debounce value correctly, only after time', () => {
    const {result, rerender} = renderHook(
      ({input, time}: {input: string; time: number}) =>
        useDebouncedValue(input, time),
      {initialProps: {input: 'h', time: 500}},
    );

    // value should not change before timeout
    rerender({input: 'he', time: 500});
    expect(result.current.debouncedValue).toBe('h');

    // after timeout, value should update
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(result.current.debouncedValue).toBe('he');
  });

  it('should reset timer on rapid input changes', () => {
    const {result, rerender} = renderHook(
      ({input, time}: {input: string; time: number}) =>
        useDebouncedValue(input, time),
      {initialProps: {input: '', time: 300}},
    );

    // Simulate rapid typing
    rerender({input: 'p', time: 300});
    act(() => jest.advanceTimersByTime(100));

    rerender({input: 'pi', time: 300});
    act(() => jest.advanceTimersByTime(100));

    rerender({input: 'pik', time: 300});
    act(() => jest.advanceTimersByTime(100));

    // Only 100ms after last change — still debouncing
    expect(result.current.debouncedValue).toBe('');

    // 300ms after last change — should update to final value
    act(() => jest.advanceTimersByTime(200));
    expect(result.current.debouncedValue).toBe('pik');
  });
});
