import { trigger, state, animate, transition, style } from '@angular/animations';

export const fadeInAnimation =
    trigger('fadeInAnimation', [
        // route 'enter' transition 123
        transition('* => doAnimate', [

            // styles at start of transition
            style({ opacity: 0 }),

            // animation and styles at end of transition
            animate('0.5s', style({ opacity: 1 }))
        ]),
    ]);