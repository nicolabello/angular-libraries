import {Observable, of} from 'rxjs';

export function fromIntersectionObserver(
  target: Element,
  options?: IntersectionObserverInit,
): Observable<Partial<IntersectionObserverEntry>> {

  if (window && 'IntersectionObserver' in window) {

    return new Observable<IntersectionObserverEntry>(observer => {

      const intersectionObserver = new IntersectionObserver(entries => entries.forEach(entry => observer.next(entry)), options);
      intersectionObserver.observe(target);

      // Cleanup
      return () => intersectionObserver.disconnect();

    });

  } else {

    return of({
      boundingClientRect: target.getBoundingClientRect(),
      intersectionRatio: 1,
      intersectionRect: undefined,
      isIntersecting: true,
      rootBounds: undefined,
      target,
      time: undefined,
    });

  }

}
