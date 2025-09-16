import { Kernel, ConstructorParams, Internal } from './kernel';
type TypeDevice = 'esplus' | 'iceplus';
interface ConstructorParamsJofemar extends ConstructorParams {
    device_listen_on_channel?: number;
    type?: TypeDevice;
    support_cart?: boolean;
}
interface InternalJofemar extends Internal {
    device: Internal['device'] & {
        type: string;
        support_cart: boolean;
        withdraw: {
            in_process: boolean;
            seconds: number;
            interval: number;
        };
        cart: {
            in_process: boolean;
        };
        channels: {
            verification: {
                clear(): void;
                running: boolean;
                start: number;
                end: number;
                current: number;
                channels: {
                    selection: number;
                    active: boolean;
                }[];
            };
        };
        hex_number?: string;
        door_open: boolean;
        listen_on_port?: number;
    };
    dispense: Internal['dispense'] & {
        elevator: {
            locking_time: number;
            locking_interval: number;
            need_reset: boolean;
        };
        timeout: number;
        timeout_time: number;
        interval: number;
        interval_time: number;
    };
}
interface DeviceJofemar {
    type: TypeDevice;
    support_cart: boolean;
    withdraw: {
        in_process: boolean;
        seconds: number;
        interval: number;
    };
    cart: {
        in_process: boolean;
    };
    channels: {
        verification: {
            clear(): void;
            running: boolean;
            start: number;
            end: number;
            current: number;
            channels: {
                selection: number;
                active: boolean;
            }[];
        };
    };
}
export declare class Jofemar extends Kernel {
    #private;
    __internal__: InternalJofemar;
    __device: DeviceJofemar;
    constructor({ filters, config_port, no_device, device_listen_on_channel, type, support_cart, socket, }?: ConstructorParamsJofemar);
    set startChannelVerification(value: number | string);
    set endChannelVerification(value: number | string);
    set listenOnChannel(channel: number);
    /**
     * @deperecated
     * @param {string|number} channel
     */
    set listenOnPort(channel: number);
    set deviceType(type: TypeDevice);
    set supportCart(support_cart: boolean);
    serialSetConnectionConstant(listen_on_port?: number): string | Uint8Array<ArrayBufferLike> | string[];
    serialMessage(code: string[] | Uint8Array<ArrayBufferLike> | string | ArrayBuffer): void;
    productRemovedContinueDispensing(): void;
    dispense({ selection, cart }?: {
        selection?: number | undefined;
        cart?: boolean | undefined;
    }): Promise<import("./kernel").DispenseResponse>;
    internalClearSensing(): void;
    endDispense(): Promise<import("./kernel").DispenseResponse>;
    collect(): Promise<void>;
    resetSoldOutErrors(): Promise<void>;
    resetWaitingProductRemovedError(): Promise<void>;
    resetMachineErrors(): Promise<unknown>;
    resetAllErrors(): Promise<unknown>;
    status(): Promise<void>;
    lightsOn(): Promise<void>;
    lightsOff(): Promise<void>;
    program(param1: number, param2: number): Promise<void>;
    programDisplayLanguage({ language, }?: {
        language?: 'spanish' | 'english' | 'french';
    }): Promise<void>;
    programBeeper({ enable }?: {
        enable?: boolean | undefined;
    }): Promise<void>;
    programDisableWorkingTemperature(): Promise<void>;
    programDisableThermometer(): Promise<void>;
    programWorkingTemperature({ degrees }?: {
        degrees?: number | undefined;
    }): Promise<void>;
    programIsolationTray({ tray }?: {
        tray?: number | undefined;
    }): Promise<void>;
    programTimeToStandbyAfterCollect({ seconds }?: {
        seconds?: number | undefined;
    }): Promise<void>;
    programTimeToStandbyWithoutCollect({ minutes }?: {
        minutes?: number | undefined;
    }): Promise<void>;
    programElevatorSpeed({ speed, }?: {
        speed?: 'low' | 'high';
    }): Promise<void>;
    programTemperatureExpiration({ enable }?: {
        enable?: boolean | undefined;
    }): Promise<void>;
    programEnableTemperatureExpiration(): Promise<void>;
    programDisableTemperatureExpiration(): Promise<void>;
    programMachineAddress({ address }?: {
        address?: number | undefined;
    }): Promise<void>;
    programTemperatureBeforeExpiration({ degrees }?: {
        degrees?: number | undefined;
    }): Promise<void>;
    programTimeBeforeExpirationByTemperature({ minutes }?: {
        minutes?: number | undefined;
    }): Promise<void>;
    programTemperatureScale({ scale, }?: {
        scale?: 'celsius' | 'fahrenheit';
    }): Promise<void>;
    programVoltageEngine({ selection, voltage }?: {
        selection?: number | undefined;
        voltage?: number | undefined;
    }): Promise<void>;
    programPushOverProducts({ selection, enable }?: {
        selection?: number | undefined;
        enable?: boolean | undefined;
    }): Promise<void>;
    programChannelRunningAfterDispense({ selection, seconds }?: {
        selection?: number | undefined;
        seconds?: number | undefined;
    }): Promise<void>;
    checkData(type: number, aux?: number): Promise<void>;
    getDisplayLanguage(): Promise<void>;
    getBeeper(): Promise<void>;
    getWorkingTemperature(): Promise<void>;
    getIsolationTray(): Promise<void>;
    getProgramVersion(): Promise<void>;
    getFaults(): Promise<void>;
    getMachineId(): Promise<void>;
    getCurrentTemperature(): Promise<void>;
    getTimeToStandbyAfterCollect(): Promise<void>;
    getTimeToStandbyWithoutCollect(): Promise<void>;
    getElevatorSpeed(): Promise<void>;
    getTemperatureExpiration(): Promise<void>;
    getTemperatureBeforeExpiration(): Promise<void>;
    getTimeBeforeExpirationByTemperature(): Promise<void>;
    getTemperatureScale(): Promise<void>;
    getClockRegisters(): Promise<void>;
    getMachineActivity(): Promise<void>;
    getVoltageEngine({ selection }?: {
        selection?: number | undefined;
    }): Promise<void>;
    getChannelPresence({ selection }?: {
        selection?: number | undefined;
    }): Promise<void>;
    getPushOverProducts({ selection }?: {
        selection?: number | undefined;
    }): Promise<void>;
    getChannelRunningAfterDispense({ selection }?: {
        selection?: number | undefined;
    }): Promise<void>;
    setDisplayStandbyMessage({ message }?: {
        message?: string | undefined;
    }): Promise<void>;
    setDisplayMessageTemporarily({ message, seconds }: {
        message?: string | undefined;
        seconds?: number | undefined;
    }): Promise<void>;
    setDisplayMessageUnlimited({ message }: {
        message?: string | undefined;
    }): Promise<void>;
    programClock({ date }?: {
        date?: Date | undefined;
    }): Promise<void>;
    eventsConfig({ event, enable }?: {
        event?: null | undefined;
        enable?: boolean | undefined;
    }): Promise<void>;
    eventEnable({ event }?: {
        event?: null | undefined;
    }): Promise<void>;
    eventDisable({ event }?: {
        event?: null | undefined;
    }): Promise<void>;
    sendCustomCode({ code }?: {
        code: any;
    }): Promise<void>;
    assignChannels(): Promise<unknown>;
}
export {};
//# sourceMappingURL=jofemar.d.ts.map