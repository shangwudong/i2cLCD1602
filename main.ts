/**
 * makecode I2C LCD1602 package for microbit.
 * From microbit/micropython Chinese community.
 * http://www.micropython.org.cn
 */

/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon="L" block="天枢扩展模块"
namespace LANDZO_TS {
    let i2cAddr: number // 0x3F: PCF8574A, 0x27: PCF8574
    let BK: number      // backlight control
    let RS: number      // command/data

    const BASE_BOARD_I2C_ADDR = 0x30
    const JOY_BOARD_I2C_ADDR = 0x20
    
    export enum Keys {
        K1 = 0x01,
        K2 = 0x02,
        K3 = 0x03,
        K4 = 0x04,
        K5 = 0x05,
        K6 = 0x06,
        K7 = 0x07,
        K8 = 0x08,
        Joystick1_key = 0x09,
        Joystick2_key = 0x0A,
        Joystick1_x = 0x0B,
        Joystick1_y = 0x0C,
        Joystick2_x = 0x0D,
        Joystick2_y = 0x0E,
    }
    
    function joy_read(cmd: number) :number {
        let buf = pins.createBuffer(1);
        buf[0] = cmd;
        pins.i2cWriteBuffer(JOY_BOARD_I2C_ADDR, buf);
        return pins.i2cReadNumber(JOY_BOARD_I2C_ADDR, NumberFormat.UInt8BE);
    }
    
    function read_byte() :number {
        return pins.i2cReadNumber(BASE_BOARD_I2C_ADDR, NumberFormat.UInt8BE);
    }
    
    function read_half_word() :number {
        return pins.i2cReadNumber(BASE_BOARD_I2C_ADDR, NumberFormat.UInt16BE);
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
    
    
    //% blockId="MAX7219_show_line" block="MAX7219显示行 l %l|n %n" icon="\uf00a"
    //% weight=90 blockGap=8
    export function MAX7219_show_line(line: number, point: number): void {
        write_byte2(0x72, line, point);
    }
    
    //% blockId="MAX7219_show" block="MAX7219显示多行 l1 %l1|l2 %l2|l3 %l3|l4 %l4|l5 %l5|l6 %l6|l7 %l7|l8 %l8" icon="\uf00a"
    //% weight=200 blockGap=8
    export function MAX7219_show(line1_dat: number, line2_dat: number, line3_dat: number, line4_dat: number, line5_dat: number, line6_dat: number, line7_dat: number, line8_dat: number): void {
        write_byte2(0x72, 1, line1_dat);
        basic.pause(1);
        write_byte2(0x72, 2, line2_dat);
        basic.pause(1);
        write_byte2(0x72, 3, line3_dat);
        basic.pause(1);
        write_byte2(0x72, 4, line4_dat);
        basic.pause(1);
        write_byte2(0x72, 5, line5_dat);
        basic.pause(1);
        write_byte2(0x72, 6, line6_dat);
        basic.pause(1);
        write_byte2(0x72, 7, line7_dat);
        basic.pause(1);
        write_byte2(0x72, 8, line8_dat);
        basic.pause(1);
    }
    
    //% blockId="RGB" block="RGB灯 r %r|g %g|b %b"
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
        write_byte0(0x69);
    }
    
    //% blockId="SMG" block="显示数码管 n %r"
    //% weight=90 blockGap=8
    export function SMG(num: number) :void {
        write_byte2(0x70, num&0xff, num>>8);
    }
    
    //% blockId="General_IO1_Read_Analog" block="通用IO1读取模拟值"
    //% weight=50
    export function General_IO1_Read_Analog() :number {
        write_byte1(0x01, 0xb2);
        return read_half_word();
    }
    
    //% blockId="General_IO1_Read_Digital" block="通用IO1读取数字值"
    //% weight=50
    export function General_IO1_Read_Digital() :number {
        write_byte1(0x02, 0xb2);
        return read_byte();
    }
    
    //% blockId="General_IO2_Read_Analog" block="通用IO2读取模拟值"
    //% weight=50
    export function General_IO2_Read_Analog() :number {
        write_byte1(0x01, 0xb3);
        return read_half_word();
    }
    
    //% blockId="General_IO2_Read_Digital" block="通用IO12读取数字值"
    //% weight=50
    export function General_IO2_Read_Digital() :number {
        write_byte1(0x02, 0xb3);
        return read_byte();
    }
    
    //% blockId="P1_Read_Analog" block="P1读取模拟值"
    //% weight=50
    export function P1_Read_Analog() :number {
        write_byte1(0x01, 0xb0);
        return read_half_word();
    }
    
    //% blockId="P1_Read_Digital" block="P1读取数字值"
    //% weight=50
    export function P1_Read_Digital() :number {
        write_byte1(0x02, 0xb0);
        return read_byte();
    }
    
    //% blockId="P1_Write_Digital" block="P1数字值写 d %d"
    //% weight=50
    export function P1_Write_Digital(value: number) :void {
        write_byte2(0x03, 0xb0, value);
    }
    
    //% blockId="P2_Read_Analog" block="P2读取模拟值"
    //% weight=50
    export function P2_Read_Analog() :number {
        write_byte1(0x01, 0xb1);
        return read_half_word();
    }
    
    //% blockId="P2_Read_Digital" block="P2读取数字值"
    //% weight=50
    export function P2_Read_Digital() :number {
        write_byte1(0x02, 0xb1);
        return read_byte();
    }
    
    //% blockId="P2_Write_Digital" block="P2数字值写 d %d"
    //% weight=50
    export function P2_Write_Digital(value: number) :void {
        write_byte2(0x03, 0xb1, value);
    }
    
    //% blockId="P3_Read_Digital" block="P3读取数字值"
    //% weight=50
    export function P3_Read_Digital() :number {
        write_byte1(0x02, 0xc1);
        return read_byte();
    }
    
    //% blockId="P3_Write_Digital" block="P3数字值写 d %d"
    //% weight=50
    export function P3_Write_Digital(value: number) :void {
        write_byte2(0x03, 0xc1, value);
    }
    
    //% blockId="P4_Read_Digital" block="P4读取数字值"
    //% weight=50
    export function P4_Read_Digital() :number {
        write_byte1(0x02, 0xc2);
        return read_byte();
    }
    
    //% blockId="P4_Write_Digital" block="P4数字值写 d %d"
    //% weight=50
    export function P4_Write_Digital(value: number) :void {
        write_byte2(0x03, 0xc2, value);
    }
    
    //% blockId="P5_Read_Digital" block="P5读取数字值"
    //% weight=50
    export function P5_Read_Digital() :number {
        write_byte1(0x02, 0xc3);
        return read_byte();
    }
    
    //% blockId="P5_Write_Digital" block="P5数字值写 d %d"
    //% weight=50
    export function P5_Write_Digital(value: number) :void {
        write_byte2(0x03, 0xc3, value);
    }
    
    //% blockId="P6_Read_Digital" block="P6读取数字值"
    //% weight=50
    export function P6_Read_Digital() :number {
        write_byte1(0x02, 0xc4);
        return read_byte();
    }
    
    //% blockId="P6_Write_Digital" block="P6数字值写 d %d"
    //% weight=50
    export function P6_Write_Digital(value: number) :void {
        write_byte2(0x03, 0xc4, value);
    }
    
    //% blockId="DS18B20_read" block="DS18B20读取温度"
    //% weight=50
    export function DS18B20() :number {
        write_byte0(0x04);
        return read_half_word();
    }
    
    //% blockId="DHT11_read_temperature" block="DHT11读取温度"
    //% weight=50
    export function DHT11_temperature() :number {
        write_byte0(0x05);
        let temp = read_half_word();
        return temp & 0xff;
    }
    
    //% blockId="DHT11_read_humidity" block="DHT11读取湿度"
    //% weight=50
    export function DHT11_humidity() :number {
        write_byte0(0x05);
        let humi = read_half_word();
        return humi >> 8;
    }

    //% blockId="Ultrasonic_read" block="超声波值"
    //% weight=50
    export function Ultrasonic() :number {
        write_byte0(0x55);
        basic.pause(500)
        return read_byte();
    }
    
    //% blockId="BlackTraker_left" block="红外寻迹左"
    //% weight=50
    export function BlackTraker_left() :number {
        write_byte0(0x52);
        let left = read_byte();
        if (left & 0x01) {
            return 1;
        }
        return 0;
    }
    
    //% blockId="BlackTraker_right" block="红外寻迹右"
    //% weight=50
    export function BlackTraker_right() :number {
        write_byte0(0x52);
        let right = read_byte();
        if (right & 0x02) {
            return 1;
        }
        return 0;
    }
    
    //% blockId="Key_read" block="读取按键|%key|状态"
    //% weight=50
    export function Key_read(key: Keys) :number {
        return joy_read(key);
    }
}
