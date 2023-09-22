import { Opaque } from 'readable-types';

export type Time = Opaque<`${string}/${string}/${string}`, 'bp-time'>;