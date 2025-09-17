export declare class Dispatcher extends EventTarget {
    __listeners__: Record<string, boolean>;
    __debug__: boolean;
    dispatch(type: string, data?: any): void;
    dispatchAsync(type: string, data?: any, ms?: number): void;
    on(type: string, callback: EventListener): void;
    off(type: string, callback: EventListener): void;
    serialRegisterAvailableListener(type: string): void;
    get availableListeners(): {
        type: string;
        listening: boolean;
    }[];
}
export declare class SerialEvent extends CustomEvent<any> {
    constructor(type: string, detail: CustomEventInit);
}
//# sourceMappingURL=dispatcher.d.ts.map