import { ConstructorParams, Kernel } from './kernel';
interface PinPadInternal {
    buffer: string | null;
    about: {
        EMV: string | null;
        model: string | null;
        serial: string | null;
        brand: string | null;
        appVersion: string | null;
        printer: string | null;
        hasCashback: boolean;
        supportInjection: boolean;
        supportSign: boolean;
        supportContactlessCollisionCard: boolean;
        supportContactless: boolean;
        supportDUKPT: string;
        injectedValues: boolean;
        pp: {
            brand: string | null;
            appVersion: string | null;
            versionInt: number;
            hasCashback: boolean;
            supportInjection: boolean;
            supportSign: boolean | null;
            supportContactlessCollisionCard: boolean | null;
            supportContactless: boolean;
            supportDUKPT: boolean | null;
            hasDUKPTKeys: boolean | null;
            EMV: string | null;
            serial: string | null;
            printer: string | null;
            model: string | null;
        } | null;
    };
    config: {
        defaultEnvironment: string;
        environment: string;
        currency: string;
        currencyCode: string;
        timeoutPinPad: string;
        signSupport: string;
        CTLSSupport: string;
        userTRX: string;
        tp_operation: string;
        requireCVVAmex: string;
        forceOnline: string;
        emvCard: string;
        validateQPS: string;
        username: string | null;
        password: string | null;
        country: string | null;
        idBranch: string | null;
        idCompany: string | null;
        latitude: number | string | null;
        longitude: number | string | null;
        publicKeyRSA: string | null;
        publicIP: string | null;
        internal: {
            stTokenization: boolean;
            qpsDomestic: string;
            qpsInternational: string;
            cvmlVMCDomestic: string;
            cvmlVMCInternational: string;
            cvmlAmex: string;
            translimitCTLSVMC: string;
            translimitCTLSAmex: string;
            emv: Record<string, string>;
        };
        terminal: Record<string, string>;
        loginResponse: Record<string, any> | null;
        otherLogin: Record<string, string>;
        RC4Key: string;
        read: {
            EMV: string;
            PIN: string;
            POSEM: string;
            AppId: string;
            AppIdLabel: string;
            Arqc: string;
            Chip: string;
            ChipName: string;
            ChipNameEnc: string;
            ReadCTLS: string;
            NB_Data: string;
            NB_ksn: string;
            Tags: string;
            Type: string;
        };
        tokenizeTRX: boolean;
    };
    constants: {
        appVersion: string;
        appName: string;
        STX: string;
        ETX: string;
        FS: string;
        getNULL: string;
        appChannel: string;
        typeChannel: string;
        urls: {
            development: string;
            qa: string;
            production: string;
            productionAlternative: string;
        };
        uris: {
            login: string;
            RSAKey: string;
            merchant: string;
            consult: string;
            keysDUKPT: string;
            reverse: string;
            rePrint: string;
            checkInMoto: string;
            checkOutMoto: string;
            reAuthorizationMoto: string;
            cancellation: string;
            sale: string;
        };
    };
    operation: {
        amount: string;
        reference: string | null;
        folio: string | null;
        authorization: string | null;
        errors: number;
        last_error: object | null;
        commerceVoucher: string;
        clientVoucher: string;
        consultDate: string | null;
        ignore: {
            responseGlobal: any;
            counter: boolean;
            counterSale: boolean;
            isError92TRX: boolean;
            C93Global: boolean | string;
            error: string;
        };
        finalResult: Record<string, any>;
        moto: {
            ccType: string;
            ccName: string;
            ccNumber: string;
            ccExpMonth: string;
            ccExpYear: string;
            ccCvvCsc: string;
            txRoom: string;
        };
        bin: string;
        bin8: string;
        hasQPS: boolean;
        onlyMerchant: string;
        merchant: Record<string, any> | null;
        typeOperation: string;
        typeResponse: string;
        responseMit: Record<string, any>;
        applyReverse: boolean;
    };
    finishCommand: {
        A: string;
        B: string;
        C: string;
        D: string;
        E: string;
        F: string;
        G: string;
        H: string;
        I: string;
        J: string;
        K: string;
    };
    waiting: {
        statusAboutWaiting: 'pending' | 'resolved' | 'rejected' | null;
        statusInjectWaiting: 'pending' | 'resolved' | 'rejected' | null;
        statusinitDUKPTWaiting: 'pending' | 'resolved' | 'rejected' | null;
        statuswritingDUKPTWaiting: 'pending' | 'resolved' | 'rejected' | null;
        statusReadCardWaiting: 'pending' | 'resolved' | 'rejected' | null;
        statusSecondGenerateWaiting: 'pending' | 'resolved' | 'rejected' | null;
    };
}
interface ConstructorParamsPinPad extends ConstructorParams {
    username?: string | null;
    password?: string | null;
    environment?: string;
}
export declare class PinPad extends Kernel {
    #private;
    __pinPad__: PinPadInternal;
    constructor({ filters, config_port, no_device, device_listen_on_channel, username, password, environment, socket, }?: ConstructorParamsPinPad);
    timeout(bytes: string | Uint8Array | Array<string> | Array<number>, event: string): Promise<void>;
    serialMessage(original_code: string[] | Uint8Array<ArrayBufferLike> | string | ArrayBuffer): void;
    serialSetConnectionConstant(): string[];
    sendCustomCode({ code }?: any): Promise<void>;
    set username(username: string | null);
    get username(): string | null;
    set password(password: string | null);
    get password(): string | null;
    set amount(amount: string | number);
    get amount(): string | number;
    set reference(reference: string);
    get reference(): string;
    get url(): string;
    get version(): {
        name: string;
        version: string;
        environment: string;
        type: string;
    };
    set environment(value: string);
    get defaultEnvironment(): string;
    get environment(): string;
    get latitudeLongitude(): {
        latitude: string | number | null;
        longitude: string | number | null;
    };
    set timeoutPinPad(timeout: string | number);
    get timeoutPinPad(): string | number;
    login({ force }?: {
        force?: boolean | undefined;
    }): Promise<Record<string, string>>;
    clearSession(): void;
    checkPositionPermission(): Promise<unknown>;
    getPosition(): Promise<unknown>;
    cancelReadCard(): Promise<void>;
    print(voucherType?: string): Promise<void>;
    getClientVoucher(): string;
    getCommerceVoucher(): string;
    /**
     * @param {null|string} reference
     * @return {Promise<any>}
     */
    consult({ reference }?: {
        reference?: null | string;
    }): Promise<any>;
    /**
     * @param {number|string|null} folio
     * @return {Promise<any>}
     */
    rePrint({ folio }?: {
        folio?: null | undefined;
    }): Promise<any>;
    cancelPurchase({ amount, authorization, folio }?: {
        amount?: number | undefined;
        authorization?: string | undefined;
        folio?: string | undefined;
    }): Promise<string>;
    /**
     * @param {number} amount
     * @param {null|string} reference
     * @returns {Promise<{error: boolean, message: null, approved: boolean, object: {}}>}
     */
    makeSale({ amount, reference }?: {
        amount?: number | undefined;
        reference?: null | undefined;
    }): Promise<{
        error: boolean;
        message: null;
        approved: boolean;
        object: {};
    }>;
}
export {};
//# sourceMappingURL=pinpad.d.ts.map