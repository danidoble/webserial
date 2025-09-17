import { Kernel, ConstructorParams, DispenseResponse } from './kernel';
interface MessageSerial {
    code: string[] | Uint8Array<ArrayBufferLike> | string | ArrayBuffer;
    name: string | null;
    description: string | null;
    request: string | null;
    no_code: number;
    additional?: any;
    finished_test?: boolean;
}
export declare class Boardroid extends Kernel {
    #private;
    __coin_purse: {
        available: boolean;
    };
    __banknote_purse: {
        available: boolean;
        isRecycler: boolean;
        recycler: {
            ict: boolean;
            banknote: number;
        };
    };
    __sale: {
        price: number;
        change: number;
        change_verified: number;
        dispense_all: boolean;
        last_change: number;
        clear(): void;
    };
    __money_session: {
        inserted: number;
        retired: number;
        clear(): void;
    };
    coins: {
        tubes: {
            g50: number;
            c50: number;
            p1: number;
            p2: number;
            p5: number;
            p10: number;
        };
        box: {
            g50: number;
            c50: number;
            p1: number;
            p2: number;
            p5: number;
            p10: number;
        };
        totals: {
            g50: number;
            c50: number;
            p1: number;
            p2: number;
            p5: number;
            p10: number;
        };
        total: number;
    };
    banknotes: {
        stacker: {
            p20: number;
            p50: number;
            p100: number;
            p200: number;
            p500: number;
            p1000: number;
        };
        recycler: {
            p20: number;
            p50: number;
            p100: number;
            p200: number;
            p500: number;
            p1000: number;
        };
        out: {
            p20: number;
            p50: number;
            p100: number;
            p200: number;
            p500: number;
            p1000: number;
        };
        totals: {
            p20: number;
            p50: number;
            p100: number;
            p200: number;
            p500: number;
            p1000: number;
        };
        total: number;
    };
    card_reader: {
        available: boolean;
        max_pre_credit: number;
    };
    constructor({ filters, config_port, no_device, socket }?: ConstructorParams);
    get totalInTubes(): number;
    get totalInRecycler(): number;
    get hasRecycler(): boolean;
    set hasRecycler(value: boolean);
    get hasICT(): boolean;
    set hasICT(value: boolean);
    set banknoteICT(value: number);
    get banknoteICT(): number;
    get hasCoinPurse(): boolean;
    set hasCoinPurse(value: boolean);
    set price(value: number);
    get price(): number;
    get change(): number;
    softReload(): void;
    serialMessage(code: string[] | Uint8Array<ArrayBufferLike> | string | ArrayBuffer): void;
    serialSetConnectionConstant(listen_on_port?: number): string | string[] | Uint8Array<ArrayBufferLike>;
    coinPurseConfigure({ enable, high, low }?: {
        enable?: boolean | undefined;
        high?: number | undefined;
        low?: number | undefined;
    }): Promise<void>;
    coinPurseEnable(): Promise<void>;
    coinPurseDisable(): Promise<void>;
    coinPurseDispense({ $_50c, $_1, $_2, $_5, $_10 }?: {
        $_50c?: number | undefined;
        $_1?: number | undefined;
        $_2?: number | undefined;
        $_5?: number | undefined;
        $_10?: number | undefined;
    }): Promise<void>;
    coinPurseReadTubes(): Promise<void>;
    banknotePurseConfigure({ enable, scrow }?: {
        enable?: boolean | undefined;
        scrow?: boolean | undefined;
    }): Promise<void>;
    banknotePurseDispense({ $_20, $_50, $_100, $_200, $_500, $_1000 }?: {
        $_20?: number | undefined;
        $_50?: number | undefined;
        $_100?: number | undefined;
        $_200?: number | undefined;
        $_500?: number | undefined;
        $_1000?: number | undefined;
    }): Promise<void>;
    banknotePurseEnable({ scrow }: {
        scrow?: boolean | undefined;
    }): Promise<void>;
    banknotePurseDisable(): Promise<void>;
    banknotePurseAcceptInScrow(): Promise<void>;
    banknotePurseRejectInScrow(): Promise<void>;
    banknotePurseSaveMemory({ channel, $_20, $_50, $_100, $_200, $_500, $_1000, }?: {
        channel?: null | undefined;
        $_20?: null | undefined;
        $_50?: null | undefined;
        $_100?: null | undefined;
        $_200?: null | undefined;
        $_500?: null | undefined;
        $_1000?: null | undefined;
    }): Promise<void>;
    banknotePurseReadRecycler(): Promise<void>;
    cardReaderDisable(): Promise<void>;
    cardReaderDispense({ channel, second_channel, sensor, seconds, price }?: {
        channel?: number | undefined;
        second_channel?: null | undefined;
        sensor?: boolean | undefined;
        seconds?: null | undefined;
        price?: number | undefined;
    }): Promise<void>;
    paymentPursesDisable({ coin, banknote, cardReader }?: {
        coin?: boolean | undefined;
        banknote?: boolean | undefined;
        cardReader?: boolean | undefined;
    }): Promise<void>;
    paymentPursesEnable({ coin, banknote, scrowBanknote }?: {
        coin?: boolean | undefined;
        banknote?: boolean | undefined;
        scrowBanknote?: boolean | undefined;
    }): Promise<void>;
    coolingRelayConfigure({ enable }?: {
        enable?: boolean | undefined;
    }): Promise<void>;
    coolingRelayEnable(): Promise<void>;
    coolingRelayDisable(): Promise<void>;
    readTemperature(): Promise<void>;
    dispense({ selection, second_selection, sensor, seconds, retry, }?: {
        selection: number;
        second_selection?: number | null;
        sensor?: boolean;
        seconds?: number | null;
        retry?: boolean;
    }): Promise<DispenseResponse>;
    testEngines({ singleEngine }?: {
        singleEngine?: boolean | undefined;
    }): Promise<void>;
    sendCustomCode({ code, }?: {
        code: string[];
    }): Promise<void>;
    hasToReturnChange(money?: number): boolean;
    returnChange(): Promise<boolean>;
    returnInsertedMoney(): Promise<boolean>;
    serialCorruptMessage(data: Uint8Array | number[] | string[] | never | null | string | ArrayBuffer, message: MessageSerial): Promise<void>;
}
export {};
//# sourceMappingURL=boardroid.d.ts.map