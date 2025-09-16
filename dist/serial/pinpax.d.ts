import { ConstructorParams, Kernel } from './kernel';
interface PinPaxInternal {
    server: 'DEV' | 'PROD' | 'TEST';
    businessId: string | null;
    encryptionKey: string | null;
    apiKey: string | null;
    asyncResponses: {
        voucher: any | null;
        sale: any | null;
    };
    waiting: {
        voucher: boolean;
        sale: boolean;
    };
}
export declare class PinPax extends Kernel {
    #private;
    __pinpax__: PinPaxInternal;
    constructor({ filters, config_port, no_device, device_listen_on_channel, socket, }?: ConstructorParams);
    set businessId(businessId: string | null);
    get businessId(): string | null;
    set encryptionKey(encryptionKey: string | null);
    get encryptionKey(): string | null;
    set apiKey(apiKey: string | null);
    get apiKey(): string | null;
    set server(server: "DEV" | "PROD" | "TEST");
    get server(): "DEV" | "PROD" | "TEST";
    serialMessage(codex: string[] | Uint8Array<ArrayBufferLike> | string | ArrayBuffer): void;
    serialSetConnectionConstant(): Uint8Array<ArrayBufferLike>;
    softReload(): void;
    sendCustomCode(code?: any): Promise<void>;
    connectMessage(): Promise<void>;
    cancelSaleRequestInProcess(): void;
    makeSale({ amount, reference }?: {
        amount?: number | undefined;
        reference?: null | undefined;
    }): Promise<unknown>;
    getVoucher({ folio }?: {
        folio?: null | undefined;
    }): Promise<unknown>;
    info(): Promise<void>;
    keepAlive(): Promise<void>;
    restartApp(): Promise<void>;
    getConfig(): Promise<void>;
    hideButtons(): Promise<void>;
    showButtons(): Promise<void>;
    demo(): Promise<void>;
    refund({ amount, folio, auth }?: {
        amount?: number | undefined;
        folio?: null | undefined;
        auth?: null | undefined;
    }): Promise<void>;
    readProductionQR(): Promise<void>;
    readQualityAssuranceQR(): Promise<void>;
    exit(): Promise<void>;
    init(): Promise<void>;
    login(): Promise<void>;
}
export {};
//# sourceMappingURL=pinpax.d.ts.map