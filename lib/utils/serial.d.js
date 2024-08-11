navigator.serial = {
    // eslint-disable-next-line no-unused-vars
    getPorts: async function ({filters}) {
        // eslint-disable-next-line no-unused-vars
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
                        // eslint-disable-next-line no-unused-vars
                        return new Promise((resolve, reject) => {
                            resolve();
                        });
                    },
                    close: async function () {
                        // eslint-disable-next-line no-unused-vars
                        return new Promise((resolve, reject) => {
                            resolve();
                        });
                    },
                    forget: async function () {
                        // eslint-disable-next-line no-unused-vars
                        return new Promise((resolve, reject) => {
                            resolve();
                        });

                    }
                }
            ]);
        });
    },
    // eslint-disable-next-line no-unused-vars
    requestPort: async function ({filters}) {
        // eslint-disable-next-line no-unused-vars
        return new Promise((resolve, reject) => {
            resolve();
        });
    },
};

window.SerialPort = {
    prototype: {
        close() {
        },
        forget() {
        },
        getInfo() {
        },
        getSignals() {
        },
        onconnect() {
        },
        ondisconnect() {
        },
        open() {
        },
        readable() {
        },
        setSignals() {
        },
        writable() {
        },
    }
}