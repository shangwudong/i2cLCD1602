/**
 * makecode I2C LCD1602 package for microbit.
 * From microbit/micropython Chinese community.
 * http://www.micropython.org.cn
 */

/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon="▀"
namespace LANDZO_TS {
    let i2cAddr: number // 0x3F: PCF8574A, 0x27: PCF8574
    let BK: number      // backlight control
    let RS: number      // command/data

    let BASE_BOARD_I2C_ADDR = 0x30
    
    function read_byte() :number {
        return pins.i2cReadNumber(BASE_BOARD_I2C_ADDR, NumberFormat.UInt8BE);
    }
    
    function write_byte0(cmd: number): void {
        let buf = pins.createBuffer(1);
        buf[0] = cmd;
        pins.i2cWriteBuffer(BASE_BOARD_I2C_ADDR, buf)
    }
    
    function write_byte1(cmd: number, dat: number): void {
        let buf = pins.createBuffer(2);
        buf[0] = cmd;
        buf[1] = dat;
        pins.i2cWriteBuffer(BASE_BOARD_I2C_ADDR, buf)
    }
    
    function write_byte2(cmd: number, dat0: number, dat1: number): void {
        let buf = pins.createBuffer(3);
        buf[0] = cmd;
        buf[1] = dat0;
        buf[2] = dat1;
        pins.i2cWriteBuffer(BASE_BOARD_I2C_ADDR, buf)
    }
    
    function write_byte3(cmd: number, dat0: number, dat1: number, dat2: number): void {
        let buf = pins.createBuffer(4);
        buf[0] = cmd;
        buf[1] = dat0;
        buf[2] = dat1;
        buf[3] = dat2;
        pins.i2cWriteBuffer(BASE_BOARD_I2C_ADDR, buf)
    }
    
    
    //% blockId="MAX7219_show_line" block="show line" icon="\uf00a"
    //% weight=90 blockGap=8
    export function MAX7219_show_line(line: number, point: number): void {
        write_byte2(0x72, line, point);
    }
    
    //% blockId="MAX7219_show" block="show line" icon="\uf00a"
    //% weight=90 blockGap=8
    export function MAX7219_show(line1_dat: number, line2_dat: number, line3_dat: number, line4_dat: number, line5_dat: number, line6_dat: number, line7_dat: number, line8_dat: number): void {
        write_byte2(0x72, 1, line1_dat);
        write_byte2(0x72, 2, line2_dat)
        write_byte2(0x72, 3, line3_dat)
        write_byte2(0x72, 4, line4_dat)
        write_byte2(0x72, 5, line5_dat)
        write_byte2(0x72, 6, line6_dat)
        write_byte2(0x72, 7, line7_dat)
        write_byte2(0x72, 8, line8_dat)
    }
    
    //% blockId="RGB" block="show RGB r %r|g %g|b %b"
    //% weight=90 blockGap=8
    //% r.min=0 r.max=1
    //% g.min=0 g.max=1
    //% b.min=0 b.max=1
    export function RGB(r: number, g: number, b: number) :void {
        write_byte3(0x71, r, g, b);
    }
    
    //% blockId="SMG_Off" block="关闭数码管"
    //% weight=90 blockGap=8
    export function SMG_Off() :void {
        write_byte(0x69);
    }
    
    //% blockId="SMG" block="显示数码管 n %r"
    //% weight=90 blockGap=8
    export function SMG(num: number) :void {
        write_byte2(0x70, number&0xff, number>>8);
    }
    
    export function General_IO1_Read_Analog() :number {
        write_byte1(0x01, 0xb2);
        return read_byte();
    }
    
    export function General_IO1_Read_Digital() :number {
        write_byte1(0x02, 0xb2);
        return read_byte();
    }
    
    export function General_IO2_Read_Analog() :number {
        write_byte1(0x01, 0xb3);
        return read_byte();
    }
    
    export function General_IO2_Read_Digital() :number {
        write_byte1(0x02, 0xb3);
        return read_byte();
    }
    
    export function P1_Read_Analog() :number {
        write_byte1(0x01, 0xb0);
        return read_byte();
    }
    
    export function P1_Read_Digital() :number {
        write_byte1(0x02, 0xb0);
        return read_byte();
    }
    
    export function P1_Write_Digital(value: number) :void {
        write_byte2(0x03, 0xb0, value);
    }
    
    export function P2_Read_Analog() :number {
        write_byte1(0x01, 0xb1);
        return read_byte();
    }
    
    export function P2_Read_Digital() :number {
        write_byte1(0x02, 0xb1);
        return read_byte();
    }
    
    export function P2_Write_Digital(value: number) :void {
        write_byte2(0x03, 0xb1, value);
    }
    
    export function P3_Read_Digital() :number {
        write_byte1(0x02, 0xc1);
        return read_byte();
    }
    
    export function P3_Write_Digital(value: number) :void {
        write_byte2(0x03, 0xc1, value);
    }
    
    export function P4_Read_Digital() :number {
        write_byte1(0x02, 0xc2);
        return read_byte();
    }
    
    export function P4_Write_Digital(value: number) :void {
        write_byte2(0x03, 0xc2, value);
    }
    
    export function P5_Read_Digital() :number {
        write_byte1(0x02, 0xc3);
        return read_byte();
    }
    
    export function P5_Write_Digital(value: number) :void {
        write_byte2(0x03, 0xc3, value);
    }
    
    export function P6_Read_Digital() :number {
        write_byte1(0x02, 0xc4);
        return read_byte();
    }
    
    export function P6_Write_Digital(value: number) :void {
        write_byte2(0x03, 0xc4, value);
    }
    
    export function DS18B20() :number {
        write_byte(0x04);
        return read_byte();
    }
    
    export function DHT11_temperature() :number {
        write_byte1(0x05);
        temp = read_byte();
        return temp & 0xff;
    }
    
    export function DHT11_humidity() :number {
        write_byte1(0x05);
        humi = read_byte();
        return humi >> 8;
    }

    export function Ultrasonic() :number {
        write_byte1(0x55);
        basic.pause(500)
        return read_byte();
    }
    
    export function BlackTraker_left() :number {
        write_byte1(0x52);
        left = read_byte();
        if (left & 0x01) {
            return 1;
        }
        return 0;
    }
    
    export function BlackTraker_right() :number {
        write_byte1(0x52);
        right = read_byte();
        if (right & 0x02) {
            return 1;
        }
        return 0;
    }
    
    
    
    
    
    
    
    
    
    
    // set LCD reg
    function setreg(d: number) {
        pins.i2cWriteNumber(i2cAddr, d, NumberFormat.Int8LE)
        basic.pause(1)
    }

    // send data to I2C bus
    function set(d: number) {
        d = d & 0xF0
        d = d + BK + RS
        setreg(d)
        setreg(d + 4)
        setreg(d)
    }

    // send command
    function cmd(d: number) {
        RS = 0
        set(d)
        set(d << 4)
    }

    // send data
    function dat(d: number) {
        RS = 1
        set(d)
        set(d << 4)
    }


    /**
     * initial LCD, set I2C address. Address is 39/63 for PCF8574/PCF8574A
     * @param Addr is i2c address for LCD, eg: 39, 63
     */
    //% blockId="I2C_LCD1620_SET_ADDRESS" block="LCD initialize with Address %addr"
    //% weight=100 blockGap=8
    export function LcdInit(Addr: number) {
        i2cAddr = Addr
        BK = 8
        RS = 0
        cmd(0x33)       // set 4bit mode
        basic.pause(5)
        set(0x30)
        basic.pause(5)
        set(0x20)
        basic.pause(5)
        cmd(0x28)       // set mode
        cmd(0x0C)
        cmd(0x06)
        cmd(0x01)       // clear
    }

    /**
     * show a number in LCD at given position
     * @param n is number will be show, eg: 10, 100, 200
     * @param x is LCD column position, eg: 0
     * @param y is LCD row position, eg: 0
     */
    //% blockId="I2C_LCD1620_SHOW_NUMBER" block="show number %n|at x %x|y %y"
    //% weight=90 blockGap=8
    //% x.min=0 x.max=15
    //% y.min=0 y.max=1
    export function ShowNumber(n: number, x: number, y: number): void {
        let s = n.toString()
        ShowString(s, x, y)
    }

    /**
     * show a string in LCD at given position
     * @param s is string will be show, eg: "Hello"
     * @param x is LCD column position, [0 - 15], eg: 0
     * @param y is LCD row position, [0 - 1], eg: 0
     */
    //% blockId="I2C_LCD1620_SHOW_STRING" block="show string %s|at x %x|y %y"
    //% weight=90 blockGap=8
    //% x.min=0 x.max=15
    //% y.min=0 y.max=1
    export function ShowString(s: string, x: number, y: number): void {
        let a: number

        if (y > 0)
            a = 0xC0
        else
            a = 0x80
        a += x
        cmd(a)

        for (let i = 0; i < s.length; i++) {
            dat(s.charCodeAt(i))
        }
    }

    /**
     * turn on LCD
     */
    //% blockId="I2C_LCD1620_ON" block="turn on LCD"
    //% weight=81 blockGap=8
    export function on(): void {
        cmd(0x0C)
    }

    /**
     * turn off LCD
     */
    //% blockId="I2C_LCD1620_OFF" block="turn off LCD"
    //% weight=80 blockGap=8
    export function off(): void {
        cmd(0x08)
    }

    /**
     * clear all display content
     */
    //% blockId="I2C_LCD1620_CLEAR" block="clear LCD"
    //% weight=85 blockGap=8
    export function clear(): void {
        cmd(0x01)
    }

    /**
     * turn on LCD backlight
     */
    //% blockId="I2C_LCD1620_BACKLIGHT_ON" block="turn on backlight"
    //% weight=71 blockGap=8
    export function BacklightOn(): void {
        BK = 8
        cmd(0)
    }

    /**
     * turn off LCD backlight
     */
    //% blockId="I2C_LCD1620_BACKLIGHT_OFF" block="turn off backlight"
    //% weight=70 blockGap=8
    export function BacklightOff(): void {
        BK = 0
        cmd(0)
    }

    /**
     * shift left
     */
    //% blockId="I2C_LCD1620_SHL" block="Shift Left"
    //% weight=61 blockGap=8
    export function shl(): void {
        cmd(0x18)
    }

    /**
     * shift right
     */
    //% blockId="I2C_LCD1620_SHR" block="Shift Right"
    //% weight=60 blockGap=8
    export function shr(): void {
        cmd(0x1C)
    }
}
