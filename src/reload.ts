import { Env } from './modules/shared/infrastructure/config';

export const setReloadOnChanges = async () => {
  if (Env.ambient !== 'production') {
    console.log('connecting events');
    const eventSource = new EventSource('http://localhost:3000/events');

    eventSource.onopen = () => {
      console.log('Hot Reloading Active');
    };

    eventSource.onerror = () => {
      console.log('Fail Hot Reloading, retrying...');
      setTimeout(() => setReloadOnChanges(), 3000);
    };

    eventSource.addEventListener('custom', (e) => {
      const { hasChangesOnCSS, hasChangesOnJS } = JSON.parse(e.data);

      console.log('hot reloading...');

      // hot reloading for css
      if (!hasChangesOnCSS && hasChangesOnJS) {
        const links = document.getElementsByTagName ('link') as any;

        for (const link of links) {
          const url = new URL(link.href);

          if (url.host === location.host) {
            const next = link.cloneNode();
            next.href = '/bundle.css' + '?' + Math.random().toString(36).slice(2);
            next.onload = () => link.remove();
            link.parentNode.insertBefore(next, link.nextSibling);
          }
        }

        return;
      }

      location.reload();
    });
  }
};