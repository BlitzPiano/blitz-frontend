export type Event = (...args: any) => any;

export class EventEmitter {
    public _events: Record<string, Event[]> = {};

    public on(evtn: string, fn: Event) {
        if (!this._events.hasOwnProperty(evtn)) this._events[evtn] = [];
    }

    public off(evtn: string, fn: Event) {
        if (!this._events.hasOwnProperty(evtn)) return;
        const idx = this._events[evtn].indexOf(fn);
        if (idx < 0) return;
        this._events[evtn].splice(idx, 1);
    }

    public emit(evtn: string, ...args: []) {
        if (!this._events.hasOwnProperty(evtn)) return;
        const fns = this._events[evtn].slice(0);
        if (fns.length < 1) return;
        args: [] = args.slice(1);
        for (let i = 0; i < fns.length; i++) fns[i].apply(this, args);
    }
}
