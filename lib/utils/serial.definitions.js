// create definition for serial port
navigator.serial = {
    getPorts: async function ({filters}) {
        return new Promise((resolve, reject) => {
            resolve([
                {
                    getInfo: function () {
                        return {
                            usbProductId: 0x1234,
                            usbVendorId: 0x5678
                        };
                    },
                    open: async function () {
                        return new Promise((resolve, reject) => {
                            resolve();
                        });
                    },
                    close: async function () {
                        return new Promise((resolve, reject) => {
                            resolve();
                        });
                    },
                    forget: async function () {
                        return new Promise((resolve, reject) => {
                            resolve();
                        });

                    }
                }
            ]);
        });
    },
    requestPort: async function ({filters}) {
        return new Promise((resolve, reject) => {
            resolve();
        });
    },
};

window.SerialPort = {
    prototype:{
        close(){},
        forget(){},
        getInfo(){},
        getSignals(){},
        onconnect(){},
        ondisconnect(){},
        open(){},
        readable(){},
        setSignals(){},
        writable(){},
    }
}