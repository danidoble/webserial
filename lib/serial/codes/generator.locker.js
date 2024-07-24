export function make_cmd(fa_cmd) {
    const num = parseInt(new Date().getMilliseconds().toString().slice(-3));
    let array;
    try {
        array = new Uint8Array(fa_cmd.length + 8); // Ajuste para incluir todos los campos adicionales
        array.set(fa_cmd, 2);
        array[0] = 2;
        array[1] = fa_cmd.length + 4;
        array[array.length - 2] = 3; // Byte de fin

        let num2 = 0;
        for (let i = 1; i < fa_cmd.length; i++) {
            num2 += fa_cmd[i];
            num2 *= Math.pow(2, i - 1);
        }
        array[fa_cmd.length + 2] = num2 % 256;
        array[fa_cmd.length + 3] = (num * 3) % 256;
        array[fa_cmd.length + 4] = (num * 8) % 256;

        let num3 = 0;
        for (let i = 3; i < fa_cmd.length + 6; i++) { // Ajuste en el rango del bucle para calcular la suma de verificación
            num3 += array[i];
        }
        array[fa_cmd.length + 6] = num3 % 256;

        // Cálculo del XOR para todos los bytes excepto el último
        let xorValue = 0;
        for (let i = 0; i < array.length - 1; i++) {
            xorValue ^= array[i];
        }
        array[array.length - 1] = xorValue; // Establecer el último byte al valor de XOR calculado
    } catch (ex) {
        console.error("Error al generar el comando: " + ex.message);
        array = null; // Asegurar que devolvemos null en caso de error
    }
    return array;
}

function toHex(number) {
    if (typeof number == 'string') {
        number = parseInt(number);
    }
    return number.toString(16).padStart(2, '0').toUpperCase();
}

function hexCmd(command) {
    const cmd = make_cmd(command);
    const hex = [];
    for (let i = 0; i < cmd.length; i++) {
        hex.push(toHex(cmd[i]));
    }
    return hex;
}

export function makeBasicRequest(port = 3) {
    return hexCmd(new Uint8Array([0, port]));
}


export function makeCellRequest(port = 3, cell = 1) {
    return hexCmd(new Uint8Array([16, port, cell]));
}


export function makeConfigLightScan(port = 3, since = 0, until = 10) {
    return hexCmd(new Uint8Array([32, port, since, until]));
}

export function makeConfigCell(port = 1, column = 0, row = 10, status = 1) {
    return hexCmd(new Uint8Array([48, port, column, row, status]));
}

export function makeOpen(port = 3, cell = 1) {
    const time = new Date().getMilliseconds()
    const num = parseInt(time.toString());

    const p1 = num % 256;
    const p2 = Math.floor(num / 3) % 256;
    return hexCmd(new Uint8Array([64, port, cell, p1, p2]));
}